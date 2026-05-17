import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, userDomains } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

// ==============================
// GET /api/users
// Query params: ?domain=xxx  (optional — filters to users with domain trust in that domain)
// ==============================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  try {
    // Fetch users (optionally filtered by domain)
    const usersQuery = db
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
      })
      .from(users);

    if (domain) {
      usersQuery
        .innerJoin(userDomains, eq(userDomains.userId, users.id))
        .where(eq(userDomains.domain, domain));
    }

    const userRows = await usersQuery.orderBy(sql`${users.baseTrust} DESC`);

    if (userRows.length === 0) return NextResponse.json([]);

    // Fetch all domain trust entries for the returned users and group client-side
    const userIds = userRows.map((u) => u.id);
    const domainRows = await db
      .select({
        userId: userDomains.userId,
        domain: userDomains.domain,
        trust: userDomains.trust,
      })
      .from(userDomains)
      .where(
        sql`${userDomains.userId} = ANY(${sql.raw(`ARRAY[${userIds.map((id) => `'${id}'`).join(",")}]`)})`,
      );

    const domainMap = domainRows.reduce<Record<string, Record<string, number>>>(
      (acc, row) => {
        if (!acc[row.userId]) acc[row.userId] = {};
        acc[row.userId][row.domain] = row.trust;
        return acc;
      },
      {},
    );

    const result = userRows.map((u) => ({
      ...u,
      domainTrust: domainMap[u.id] ?? {},
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/users]", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
