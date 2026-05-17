import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { claims, users, attestations, userDomains } from "@/lib/db/schema"
import { and, eq, ne, sql } from "drizzle-orm"

// ==============================
// GET /api/claims/feed
// Returns up to 10 claims ranked by relevance to the current user.
//
// Relevance rules (in priority order):
//
//   PRIMARY — Domain affinity: how much trust the user has in the claim's domain.
//     • If the user has a userDomains entry for that domain, use that trust value (0–1).
//     • If not, treat as 0 (unknown domain = not relevant).
//
//   TIEBREAKER — Unattested first: claims the user hasn't weighed in on yet
//     are surfaced before ones they've already attested, at equal domain affinity.
//     Both sets are included so a high-affinity attested claim still beats a
//     low-affinity unattested one.
//
// Never shows:
//   • The user's own claims
//   • Claims with status other than PENDING
//
// Required query param: ?user_id=xxx
// ==============================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("user_id")

  if (!userId) {
    return NextResponse.json(
      { error: "Missing required query param: user_id" },
      { status: 400 }
    )
  }

  try {
    const userRow = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (userRow.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const feed = await db
      .select({
        id:        claims.id,
        userId:    claims.userId,
        details:   claims.details,
        domain:    claims.domain,
        claimType: claims.claimType,
        status:    claims.status,
        createdAt: claims.createdAt,

        supportCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'support' THEN 1 END)::int`,
        opposeCount:  sql<number>`COUNT(CASE WHEN ${attestations.type} = 'oppose'  THEN 1 END)::int`,
        unsureCount:  sql<number>`COUNT(CASE WHEN ${attestations.type} = 'unsure'  THEN 1 END)::int`,

        // User's trust in this claim's domain (0 if no entry).
        domainAffinity: sql<number>`
          COALESCE(
            (
              SELECT ud.trust
              FROM ${userDomains} ud
              WHERE ud.user_id = ${userId}
                AND ud.domain  = ${claims.domain}
              LIMIT 1
            ),
            0
          )
        `,

        // 1 if the user has NOT yet attested this claim, 0 if they have.
        // Used as a tiebreaker — unattested claims surface first at equal affinity.
        notAttested: sql<number>`
          CASE
            WHEN EXISTS (
              SELECT 1 FROM ${attestations} a
              WHERE a.claim_id = ${claims.id}
                AND a.user_id  = ${userId}
            ) THEN 0
            ELSE 1
          END
        `,
      })
      .from(claims)
      .leftJoin(attestations, eq(attestations.claimId, claims.id))
      .where(
        and(
          ne(claims.userId, userId),
          eq(claims.status, "PENDING"),
          // Only include claims where the user has some domain affinity OR hasn't attested yet.
          // This filters out domains the user has no relation to at all.
          sql`
            EXISTS (
              SELECT 1 FROM ${userDomains} ud
              WHERE ud.user_id = ${userId}
                AND ud.domain  = ${claims.domain}
            )
            OR NOT EXISTS (
              SELECT 1 FROM ${attestations} a
              WHERE a.claim_id = ${claims.id}
                AND a.user_id  = ${userId}
            )
          `
        )
      )
      .groupBy(claims.id)
      // Sort: highest domain affinity first, unattested before attested at equal affinity
      .orderBy(sql`domain_affinity DESC, not_attested DESC, ${claims.createdAt} DESC`)
      .limit(10)

    return NextResponse.json(feed)
  } catch (err) {
    console.error("[GET /api/claims/feed]", err)
    return NextResponse.json({ error: "Failed to fetch claim feed" }, { status: 500 })
  }
}