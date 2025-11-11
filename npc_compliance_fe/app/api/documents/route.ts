import { type NextRequest, NextResponse } from "next/server"
import { query, getOne, insert } from "@/lib/db"

/**
 * POST /api/documents - Save document metadata
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessment_id, question_id, file_name, file_path } = body

    if (!assessment_id || !question_id || !file_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const assessment = await getOne("SELECT id FROM assessments WHERE assessment_id = $1", [assessment_id])

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    const result = await insert(
      `INSERT INTO documents (assessment_id, question_id, file_name, file_path, file_size, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [assessment.id, question_id, file_name, file_path || `/uploads/${assessment_id}/${file_name}`, 0, "user"],
    )

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("[v0] POST document error", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}

/**
 * GET /api/documents?assessment_id=xxx - Get all documents for an assessment
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

    const result = await query("SELECT * FROM documents WHERE assessment_id = $1 ORDER BY created_at DESC", [
      assessment.id,
    ])

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("[v0] GET documents error", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

/**
 * DELETE /api/documents/[id] - Delete a document
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const document_id = searchParams.get("id")

    if (!document_id) {
      return NextResponse.json({ error: "Missing document id" }, { status: 400 })
    }

    // Get document info
    const document = await getOne("SELECT * FROM documents WHERE id = $1", [document_id])

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Delete from database
    await query("DELETE FROM documents WHERE id = $1", [document_id])

    // Delete mappings
    await query("DELETE FROM document_question_mapping WHERE document_id = $1", [document_id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] DELETE document error", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
