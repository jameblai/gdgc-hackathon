import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db" // adjust to your db client
 
// ==============================
// GET /api/claims
// Query params: ?claimant_id=xxx&domain=xxx&status=xxx
// ==============================
 
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const claimant_id = searchParams.get("claimant_id")
  const domain = searchParams.get("domain")
  const status = searchParams.get("status")
 
  try {
    let query = `
      SELECT
        c.id,
        c.claimant_id,
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
      WHERE 1=1
    `
    const values: unknown[] = []
    let idx = 1
 
    if (claimant_id) { query += ` AND c.claimant_id = $${idx++}`; values.push(claimant_id) }
    if (domain)      { query += ` AND c.domain = $${idx++}`;      values.push(domain) }
    if (status)      { query += ` AND c.status = $${idx++}`;      values.push(status) }
 
    query += ` GROUP BY c.id ORDER BY c.created_at DESC`
 
    const { rows } = await db.query(query, values)
    return NextResponse.json(rows)
  } catch (err) {
    console.error("[GET /api/claims]", err)
    return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 })
  }
}
 
// ==============================
// POST /api/claims
// Body: { claimant_id, domain, claim_type, content }
// ==============================
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { claimant_id, domain, claim_type, content } = body
 
    if (!claimant_id || !domain || claim_type === undefined || !content) {
      return NextResponse.json(
        { error: "Missing required fields: claimant_id, domain, claim_type, content" },
        { status: 400 }
      )
    }
 
    // Verify user exists
    const userCheck = await db.query("SELECT id FROM users WHERE id = $1", [claimant_id])
    if (userCheck.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
 
    const { rows } = await db.query(
      `INSERT INTO claims (id, claimant_id, domain, claim_type, content, status, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, 'PENDING', NOW())
       RETURNING *`,
      [claimant_id, domain, claim_type, content]
    )
 
    return NextResponse.json(rows[0], { status: 201 })
  } catch (err) {
    console.error("[POST /api/claims]", err)
    return NextResponse.json({ error: "Failed to create claim" }, { status: 500 })
  }
}
 