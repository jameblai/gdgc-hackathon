import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// ==============================
// GET /api/attestations
// Query params: ?claim_id=xxx&attestant_id=xxx&stand=support|oppose
// ==============================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const claim_id     = searchParams.get("claim_id")
  const attestant_id = searchParams.get("attestant_id")
  const stand        = searchParams.get("stand")

  try {
    let query = `
      SELECT
        a.id,
        a.claim_id,
        a.attestant_id,
        a.stand,
        a.graph_distance,
        a.created_at,
        u.base_trust,
        COALESCE(dt.trust, 0.5) AS domain_trust,
        u.base_trust
          * COALESCE(dt.trust, 0.5)
          * (1.0 / (1 + a.graph_distance)) AS final_weight
      FROM attestations a
      JOIN users u ON u.id = a.attestant_id
      JOIN claims c ON c.id = a.claim_id
      LEFT JOIN domain_trust dt ON dt.user_id = a.attestant_id AND dt.domain = c.domain
      WHERE 1=1
    `
    const values: unknown[] = []
    let idx = 1

    if (claim_id)     { query += ` AND a.claim_id = $${idx++}`;     values.push(claim_id) }
    if (attestant_id) { query += ` AND a.attestant_id = $${idx++}`; values.push(attestant_id) }
    if (stand)        { query += ` AND a.stand = $${idx++}`;        values.push(stand) }

    query += ` ORDER BY a.created_at DESC`

    const { rows } = await db.query(query, values)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("[GET /api/attestations]", err)
    return NextResponse.json({ error: "Failed to fetch attestations" }, { status: 500 })
  }
}

// ==============================
// POST /api/attestations
// Body: { claim_id, attestant_id, stand, graph_distance }
// Side-effects: updates user scores + domain trust via resolveClaim / resolveAttestation
// ==============================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { claim_id, attestant_id, stand, graph_distance } = body

    if (!claim_id || !attestant_id || !stand || graph_distance === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: claim_id, attestant_id, stand, graph_distance" },
        { status: 400 }
      )
    }

    if (!["support", "oppose"].includes(stand)) {
      return NextResponse.json({ error: "stand must be 'support' or 'oppose'" }, { status: 400 })
    }

    // Fetch claim + claimant + attestant in parallel
    const [claimRes, attestantRes] = await Promise.all([
      db.query(
        `SELECT c.*, u.base_trust AS claimant_base_trust
         FROM claims c JOIN users u ON u.id = c.claimant_id
         WHERE c.id = $1`,
        [claim_id]
      ),
      db.query("SELECT * FROM users WHERE id = $1", [attestant_id]),
    ])

    if (claimRes.rowCount === 0)     return NextResponse.json({ error: "Claim not found" },     { status: 404 })
    if (attestantRes.rowCount === 0) return NextResponse.json({ error: "Attestant not found" }, { status: 404 })

    const claim    = claimRes.rows[0]
    const attestant = attestantRes.rows[0]

    // Prevent self-attestation
    if (claim.claimant_id === attestant_id) {
      return NextResponse.json({ error: "Cannot attest your own claim" }, { status: 400 })
    }

    // Prevent duplicate attestation
    const dupCheck = await db.query(
      "SELECT id FROM attestations WHERE claim_id = $1 AND attestant_id = $2",
      [claim_id, attestant_id]
    )
    if (dupCheck.rowCount! > 0) {
      return NextResponse.json({ error: "Already attested this claim" }, { status: 409 })
    }

    // Get attestant domain trust
    const dtRes = await db.query(
      "SELECT trust FROM domain_trust WHERE user_id = $1 AND domain = $2",
      [attestant_id, claim.domain]
    )
    const domainTrust: number = dtRes.rowCount! > 0 ? dtRes.rows[0].trust : 0.5

    // Calculate final weight (mirrors calculateWeight() in your TS model)
    const finalWeight =
      attestant.base_trust * domainTrust * (1 / (1 + graph_distance))

    // EMA constants (mirrors your TS update functions)
    const alpha = 0.2
    const beta  = 0.4

    const isPositive = stand === "support"

    const bump = (val: number, positive: boolean) =>
      positive ? val + alpha * (1 - val) : val - beta * val

    // Updated scores for attestant
    const newBaseTrust            = bump(attestant.base_trust,             isPositive)
    const newAttestAccuracy       = bump(attestant.attestation_accuracy_score, isPositive)
    const newParticipation        = bump(attestant.participation_score,    isPositive)
    const newDomainTrust          = bump(domainTrust,                      isPositive)

    // Run everything in a transaction
    await db.query("BEGIN")
    try {
      // Insert attestation
      const { rows } = await db.query(
        `INSERT INTO attestations (id, claim_id, attestant_id, stand, graph_distance, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())
         RETURNING *`,
        [claim_id, attestant_id, stand, graph_distance]
      )
      const attestation = rows[0]

      // Update attestant user scores
      await db.query(
        `UPDATE users
         SET base_trust = $1,
             attestation_accuracy_score = $2,
             participation_score = $3
         WHERE id = $4`,
        [newBaseTrust, newAttestAccuracy, newParticipation, attestant_id]
      )

      // Upsert domain trust for attestant
      await db.query(
        `INSERT INTO domain_trust (user_id, domain, trust)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, domain) DO UPDATE SET trust = $3`,
        [attestant_id, claim.domain, newDomainTrust]
      )

      await db.query("COMMIT")

      return NextResponse.json(
        { ...attestation, final_weight: finalWeight },
        { status: 201 }
      )
    } catch (inner) {
      await db.query("ROLLBACK")
      throw inner
    }
  } catch (err) {
    console.error("[POST /api/attestations]", err)
    return NextResponse.json({ error: "Failed to create attestation" }, { status: 500 })
  }
}