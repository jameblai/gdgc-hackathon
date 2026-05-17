import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// ==============================
// GET /api/users
// Query params: ?domain=xxx  (optional — filters by users who have domain trust in that domain)
// ==============================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const domain = searchParams.get("domain")

  try {
    let query = `
      SELECT
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
    `
    const values: unknown[] = []

    if (domain) {
      query += `
        WHERE u.id IN (
          SELECT user_id FROM domain_trust WHERE domain = $1
        )
      `
      values.push(domain)
    }

    query += ` GROUP BY u.id ORDER BY u.base_trust DESC`

    const { rows } = await db.query(query, values)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("[GET /api/users]", err)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}