import { type NextRequest, NextResponse } from "next/server"
import { query, insert, getOne } from "@/lib/db"

/**
 * POST /api/answers - Save or update an answer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessment_id, question_id, answer, plan_text } = body

    if (!assessment_id || !question_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the internal assessment ID
    const assessment = await getOne("SELECT id FROM assessments WHERE assessment_id = $1", [assessment_id])

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Check if answer already exists
    const existingAnswer = await getOne(
      "SELECT id FROM assessment_answers WHERE assessment_id = $1 AND question_id = $2",
      [assessment.id, question_id],
    )

    let result
    if (existingAnswer) {
      // Update existing answer
      result = await query(
        `UPDATE assessment_answers 
         SET answer = $1, plan_text = $2, updated_at = CURRENT_TIMESTAMP
         WHERE assessment_id = $3 AND question_id = $4
         RETURNING *`,
        [answer, plan_text, assessment.id, question_id],
      )
    } else {
      // Insert new answer
      result = await insert(
        `INSERT INTO assessment_answers (assessment_id, question_id, answer, plan_text)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [assessment.id, question_id, answer, plan_text],
      )
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("[v0] POST answer error", error)
    return NextResponse.json({ error: "Failed to save answer" }, { status: 500 })
  }
}

/**
 * GET /api/answers?assessment_id=xxx - Get all answers for an assessment
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const assessment_id = searchParams.get("assessment_id")

    if (!assessment_id) {
      return NextResponse.json({ error: "Missing assessment_id parameter" }, { status: 400 })
    }

    const assessment = await getOne("SELECT id FROM assessments WHERE assessment_id = $1", [assessment_id])

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    const result = await query("SELECT * FROM assessment_answers WHERE assessment_id = $1 ORDER BY question_id", [
      assessment.id,
    ])

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("[v0] GET answers error", error)
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 })
  }
}
