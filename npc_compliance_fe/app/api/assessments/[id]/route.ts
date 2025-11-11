import { type NextRequest, NextResponse } from "next/server"
import { query, getOne } from "@/lib/db"

/**
 * GET /api/assessments/[id] - Get a specific assessment
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const assessment = await getOne("SELECT * FROM assessments WHERE assessment_id = $1", [params.id])

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Get answers for this assessment
    const answers = await query("SELECT * FROM assessment_answers WHERE assessment_id = $1", [assessment.id])

    // Get documents for this assessment
    const documents = await query("SELECT * FROM documents WHERE assessment_id = $1", [assessment.id])

    return NextResponse.json({
      ...assessment,
      answers: answers.rows,
      documents: documents.rows,
    })
  } catch (error) {
    console.error("[v0] GET assessment error", error)
    return NextResponse.json({ error: "Failed to fetch assessment" }, { status: 500 })
  }
}

/**
 * PUT /api/assessments/[id] - Update assessment progress
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { progress_percentage, status } = body

    const result = await query(
      `UPDATE assessments 
       SET progress_percentage = COALESCE($1, progress_percentage),
           status = COALESCE($2, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE assessment_id = $3
       RETURNING *`,
      [progress_percentage, status, params.id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("[v0] PUT assessment error", error)
    return NextResponse.json({ error: "Failed to update assessment" }, { status: 500 })
  }
}
