import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, userDomains, claims, attestations } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

// ==============================
// GET /api/users/[id]
// Returns: user profile + domain trust map + claims + attestations
// ==============================

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    // User
    const userRow = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        dateOfBirth: users.dateOfBirth,
        occupation: users.occupation,
        company: users.company,
        avatarUrl: users.avatarUrl,
        baseTrust: users.baseTrust,
        claimAccuracyScore: users.claimAccuracyScore,
        attestationAccuracyScore: users.attestationAccuracyScore,
        participationScore: users.participationScore,
        reciprocityPenaltyFactor: users.reciprocityPenaltyFactor,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (userRow.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Domain trust, claims (with attestation counts), and attestations in parallel
    const [domainRows, claimRows, attestationRows] = await Promise.all([
      // Domain trust map
      db
        .select({ domain: userDomains.domain, trust: userDomains.trust })
        .from(userDomains)
        .where(eq(userDomains.userId, id)),

      // Claims with support/oppose/unsure counts
      db
        .select({
          id: claims.id,
          details: claims.details,
          domain: claims.domain,
          claimType: claims.claimType,
          status: claims.status,
          createdAt: claims.createdAt,
          attestationCount: sql<number>`COUNT(${attestations.id})::int`,
          supportCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'support' THEN 1 END)::int`,
          opposeCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'oppose'  THEN 1 END)::int`,
          unsureCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'unsure'  THEN 1 END)::int`,
          // Confidence = support / (support + oppose), ignoring unsure
          confidenceScore: sql<number>`
            CASE
              WHEN COUNT(CASE WHEN ${attestations.type} IN ('support','oppose') THEN 1 END) = 0 THEN 0
              ELSE COUNT(CASE WHEN ${attestations.type} = 'support' THEN 1 END)::float
                 / COUNT(CASE WHEN ${attestations.type} IN ('support','oppose') THEN 1 END)
            END
          `,
        })
        .from(claims)
        .leftJoin(attestations, eq(attestations.claimId, claims.id))
        .where(eq(claims.userId, id))
        .groupBy(claims.id)
        .orderBy(sql`${claims.createdAt} DESC`),

      // Attestations made by this user
      db
        .select({
          id: attestations.id,
          claimId: attestations.claimId,
          type: attestations.type,
          graphDistance: attestations.graphDistance,
          createdAt: attestations.createdAt,
          claimDetails: claims.details,
          claimDomain: claims.domain,
          claimUserId: claims.userId,
        })
        .from(attestations)
        .innerJoin(claims, eq(claims.id, attestations.claimId))
        .where(eq(attestations.userId, id))
        .orderBy(sql`${attestations.createdAt} DESC`),
    ]);

    const domainTrust = domainRows.reduce<Record<string, number>>(
      (acc, row) => {
        acc[row.domain] = row.trust;
        return acc;
      },
      {},
    );

    return NextResponse.json({
      ...userRow[0],
      domainTrust,
      claims: claimRows,
      attestations: attestationRows,
    });
  } catch (err) {
    console.error("[GET /api/users/[id]]", err);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
