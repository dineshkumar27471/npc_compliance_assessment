import { type NextRequest, NextResponse } from "next/server"
import { query, insert } from "@/lib/db"

/**
 * GET /api/assessments - Get all assessments
 */
export async function GET(request: NextRequest) {
  try {
    const result = await query("SELECT * FROM assessments ORDER BY created_at DESC")
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("[v0] GET assessments error", error)
    return NextResponse.json({ error: "Failed to fetch assessments" }, { status: 500 })
  }
}

/**
 * POST /api/assessments - Create a new assessment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessment_id, title, entity_name, entity_type, total_questions } = body

    if (!assessment_id || !title || !total_questions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await insert(
      `INSERT INTO assessments (assessment_id, title, entity_name, entity_type, total_questions)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [assessment_id, title, entity_name, entity_type, total_questions],
    )

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("[v0] POST assessment error", error)
    return NextResponse.json({ error: "Failed to create assessment" }, { status: 500 })
  }
}
