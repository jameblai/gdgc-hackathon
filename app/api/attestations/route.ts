import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { attestations, claims, users, userDomains } from "@/lib/db/schema"
import { and, eq, sql } from "drizzle-orm"

// ==============================
// GET /api/attestations
// Query params: ?claim_id=xxx&user_id=xxx&type=support|oppose|unsure
// ==============================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const claimId = searchParams.get("claim_id")
  const userId  = searchParams.get("user_id")
  const type    = searchParams.get("type")

  try {
    const conditions = [
      claimId ? eq(attestations.claimId, claimId)          : undefined,
      userId  ? eq(attestations.userId,  userId)            : undefined,
      type    ? eq(attestations.type,    type as any)       : undefined,
    ].filter(Boolean) as Parameters<typeof and>

    const rows = await db
      .select({
        id:            attestations.id,
        claimId:       attestations.claimId,
        userId:        attestations.userId,
        type:          attestations.type,
        graphDistance: attestations.graphDistance,
        createdAt:     attestations.createdAt,
        // Final weight mirrors calculateWeight(): baseTrust * domainTrust * (1 / (1 + graphDistance))
        finalWeight: sql<number>`
          ${users.baseTrust}
          * COALESCE(${userDomains.trust}, 0.5)
          * (1.0 / (1 + ${attestations.graphDistance}))
        `,
      })
      .from(attestations)
      .innerJoin(users,  eq(users.id,  attestations.userId))
      .innerJoin(claims, eq(claims.id, attestations.claimId))
      .leftJoin(
        userDomains,
        and(
          eq(userDomains.userId, attestations.userId),
          eq(userDomains.domain, claims.domain)
        )
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(sql`${attestations.createdAt} DESC`)

    return NextResponse.json(rows)
  } catch (err) {
    console.error("[GET /api/attestations]", err)
    return NextResponse.json({ error: "Failed to fetch attestations" }, { status: 500 })
  }
}

// ==============================
// POST /api/attestations
// Body: { claim_id, user_id, type, graph_distance }
// Side-effects: updates attestant's scores + domain trust via EMA
// ==============================

const ALPHA = 0.2
const BETA  = 0.4

function ema(val: number, positive: boolean): number {
  return positive ? val + ALPHA * (1 - val) : val - BETA * val
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { claim_id, user_id, type, graph_distance } = body

    if (!claim_id || !user_id || !type || graph_distance === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: claim_id, user_id, type, graph_distance" },
        { status: 400 }
      )
    }

    if (!["support", "oppose", "unsure"].includes(type)) {
      return NextResponse.json(
        { error: "type must be 'support', 'oppose', or 'unsure'" },
        { status: 400 }
      )
    }

    // Fetch claim and attestant
    const [claim, attestant] = await Promise.all([
      db.select().from(claims).where(eq(claims.id, claim_id)).limit(1),
      db.select().from(users).where(eq(users.id, user_id)).limit(1),
    ])

    if (claim.length === 0)     return NextResponse.json({ error: "Claim not found" },     { status: 404 })
    if (attestant.length === 0) return NextResponse.json({ error: "User not found" },      { status: 404 })

    const claimRow    = claim[0]
    const attestantRow = attestant[0]

    if (claimRow.userId === user_id) {
      return NextResponse.json({ error: "Cannot attest your own claim" }, { status: 400 })
    }

    // Get current domain trust for attestant (for this claim's domain)
    const domainRow = claimRow.domain
      ? await db
          .select({ trust: userDomains.trust })
          .from(userDomains)
          .where(and(eq(userDomains.userId, user_id), eq(userDomains.domain, claimRow.domain)))
          .limit(1)
      : []

    const currentDomainTrust = domainRow[0]?.trust ?? 0.5

    // EMA updates — "unsure" is treated as a mild negative (no confidence signal)
    const isPositive = type === "support"
    const isNeutral  = type === "unsure"

    const newBaseTrust         = isNeutral ? attestantRow.baseTrust            : ema(attestantRow.baseTrust,             isPositive)
    const newAttestAccuracy    = isNeutral ? attestantRow.attestationAccuracyScore : ema(attestantRow.attestationAccuracyScore, isPositive)
    const newParticipation     = ema(attestantRow.participationScore, true) // participation always nudges up on any action
    const newDomainTrust       = isNeutral ? currentDomainTrust                : ema(currentDomainTrust,                 isPositive)

    // Calculate final weight for response
    const finalWeight =
      newBaseTrust * newDomainTrust * (1 / (1 + graph_distance))

    // Transaction: insert attestation + update scores
    const result = await db.transaction(async (tx) => {
      // Insert attestation (unique index on user_id + claim_id will catch duplicates)
      const [inserted] = await tx
        .insert(attestations)
        .values({
          userId:        user_id,
          claimId:       claim_id,
          type,
          graphDistance: graph_distance,
        })
        .returning()

      // Update attestant scores
      await tx
        .update(users)
        .set({
          baseTrust:                newBaseTrust,
          attestationAccuracyScore: newAttestAccuracy,
          participationScore:       newParticipation,
          updatedAt:                new Date(),
        })
        .where(eq(users.id, user_id))

      // Upsert domain trust (only if claim has a domain)
      if (claimRow.domain) {
        await tx
          .insert(userDomains)
          .values({
            userId: user_id,
            domain: claimRow.domain,
            trust:  newDomainTrust,
          })
          .onConflictDoUpdate({
            target: [userDomains.userId, userDomains.domain],
            set:    { trust: newDomainTrust, updatedAt: new Date() },
          })
      }

      return inserted
    })

    return NextResponse.json({ ...result, finalWeight }, { status: 201 })
  } catch (err: any) {
    // Unique constraint = duplicate attestation
    if (err?.code === "23505") {
      return NextResponse.json({ error: "Already attested this claim" }, { status: 409 })
    }
    console.error("[POST /api/attestations]", err)
    return NextResponse.json({ error: "Failed to create attestation" }, { status: 500 })
  }
}