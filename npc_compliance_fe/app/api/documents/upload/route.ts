import { type NextRequest, NextResponse } from "next/server"
import { saveFile, validateFile } from "@/lib/file-upload"
import { query, insert, getOne } from "@/lib/db"

/**
 * POST /api/documents/upload - Upload a document
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const assessment_id = formData.get("assessment_id") as string
    const question_id = formData.get("question_id") as string
    const upload_scope = (formData.get("upload_scope") as string) || "single"
    const uploaded_by = formData.get("uploaded_by") as string

    if (!file || !assessment_id || !question_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Get the internal assessment ID
    const assessment = await getOne("SELECT id FROM assessments WHERE assessment_id = $1", [assessment_id])

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Save file to disk
    const filePath = await saveFile(file, assessment_id)

    // Save document record to database
    const document = await insert(
      `INSERT INTO documents (assessment_id, question_id, file_name, file_path, file_size, file_type, upload_scope, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [assessment.id, question_id, file.name, filePath, file.size, file.type, upload_scope, uploaded_by],
    )

    // If upload_scope is 'multiple', we'll handle linking to other questions later
    if (upload_scope === "single") {
      // Link document to the specific question
      await query(
        `INSERT INTO document_question_mapping (document_id, question_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [document.id, question_id],
      )
    }

    return NextResponse.json(
      {
        success: true,
        document: {
          id: document.id,
          file_name: document.file_name,
          file_path: document.file_path,
          file_size: document.file_size,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Document upload error", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
