import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// ==============================
// GET /api/users/[id]
// Returns full user profile: scores + domain trust + claim/attestation summary
// ==============================

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    // User + domain trust
    const userRes = await db.query(
      `SELECT
        u.id,
        u.base_trust,
        u.claim_accuracy_score,
        u.attestation_accuracy_score,
        u.participation_score,
        u.reciprocity_penalty_factor,
        u.created_at,
        COALESCE(
          json_object_agg(dt.domain, dt.trust) FILTER (WHERE dt.domain IS NOT NULL),
          '{}'
        ) AS domain_trust
       FROM users u
       LEFT JOIN domain_trust dt ON dt.user_id = u.id
       WHERE u.id = $1
       GROUP BY u.id`,
      [id]
    )

    if (userRes.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = userRes.rows[0]

    // Claims summary
    const claimsRes = await db.query(
      `SELECT
        c.id,
        c.domain,
        c.claim_type,
        c.content,
        c.status,
        c.created_at,
        COUNT(a.id)::int AS attestation_count,
        COALESCE(SUM(CASE WHEN a.stand = 'support' THEN 1 ELSE 0 END), 0)::int AS support_count,
        COALESCE(SUM(CASE WHEN a.stand = 'oppose'  THEN 1 ELSE 0 END), 0)::int AS oppose_count
       FROM claims c
       LEFT JOIN attestations a ON a.claim_id = c.id
       WHERE c.claimant_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [id]
    )

    // Attestations summary
    const attestationsRes = await db.query(
      `SELECT
        a.id,
        a.claim_id,
        a.stand,
        a.graph_distance,
        a.created_at,
        c.domain,
        c.content AS claim_content
       FROM attestations a
       JOIN claims c ON c.id = a.claim_id
       WHERE a.attestant_id = $1
       ORDER BY a.created_at DESC`,
      [id]
    )

    return NextResponse.json({
      ...user,
      claims:       claimsRes.rows,
      attestations: attestationsRes.rows,
    })
  } catch (err) {
    console.error("[GET /api/users/[id]]", err)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}