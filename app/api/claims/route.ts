import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { claims, users, attestations } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";

// ==============================
// GET /api/claims
// Query params: ?user_id=xxx&domain=xxx&status=xxx&claim_type=xxx
// ==============================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  const domain = searchParams.get("domain");
  const status = searchParams.get("status");
  const claimType = searchParams.get("claim_type");

  try {
    const conditions = [
      userId ? eq(claims.userId, userId) : undefined,
      domain ? eq(claims.domain, domain) : undefined,
      status ? eq(claims.status, status) : undefined,
      claimType ? eq(claims.claimType, claimType as any) : undefined,
    ].filter(Boolean) as Parameters<typeof and>;

    const rows = await db
      .select({
        id: claims.id,
        userId: claims.userId,
        details: claims.details,
        domain: claims.domain,
        claimType: claims.claimType,
        status: claims.status,
        createdAt: claims.createdAt,
        updatedAt: claims.updatedAt,
        attestationCount: sql<number>`COUNT(${attestations.id})::int`,
        supportCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'support' THEN 1 END)::int`,
        opposeCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'oppose'  THEN 1 END)::int`,
        unsureCount: sql<number>`COUNT(CASE WHEN ${attestations.type} = 'unsure'  THEN 1 END)::int`,
      })
      .from(claims)
      .leftJoin(attestations, eq(attestations.claimId, claims.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(claims.id)
      .orderBy(sql`${claims.createdAt} DESC`);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/claims]", err);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 },
    );
  }
}

// ==============================
// POST /api/claims
// Body: { user_id, details, domain?, claim_type? }
// ==============================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, details, domain, claim_type } = body;

    if (!user_id || !details) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, details" },
        { status: 400 },
      );
    }

    const userExists = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, user_id))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [inserted] = await db
      .insert(claims)
      .values({
        userId: user_id,
        details,
        domain: domain ?? null,
        claimType: claim_type ?? null,
        status: "PENDING",
      })
      .returning();

    return NextResponse.json(inserted, { status: 201 });
  } catch (err) {
    console.error("[POST /api/claims]", err);
    return NextResponse.json(
      { error: "Failed to create claim" },
      { status: 500 },
    );
  }
}
