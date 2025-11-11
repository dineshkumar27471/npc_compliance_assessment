import fs from "fs/promises"
import path from "path"
import crypto from "crypto"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ["application/pdf"]

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: "Only PDF files are allowed" }
  }

  return { valid: true }
}

/**
 * Generate a unique file name
 */
export function generateFileName(originalName: string): string {
  const ext = path.extname(originalName)
  const name = path.basename(originalName, ext)
  const hash = crypto.randomBytes(8).toString("hex")
  return `${name}-${hash}${ext}`
}

/**
 * Save uploaded file to disk
 */
export async function saveFile(file: File, assessmentId: string): Promise<string> {
  try {
    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    // Generate unique filename
    const fileName = generateFileName(file.name)
    const filePath = path.join(UPLOAD_DIR, assessmentId, fileName)
    const dirPath = path.dirname(filePath)

    // Create assessment-specific directory
    await fs.mkdir(dirPath, { recursive: true })

    // Convert file to buffer and save
    const buffer = await file.arrayBuffer()
    await fs.writeFile(filePath, Buffer.from(buffer))

    // Return relative path for database storage
    return `/uploads/${assessmentId}/${fileName}`
  } catch (error) {
    console.error("[v0] File save error", error)
    throw new Error("Failed to save file")
  }
}

/**
 * Delete a file from disk
 */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath)
    await fs.unlink(fullPath)
  } catch (error) {
    console.error("[v0] File delete error", error)
    throw new Error("Failed to delete file")
  }
}

/**
 * Get file info
 */
export async function getFileInfo(filePath: string): Promise<{ size: number; exists: boolean }> {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath)
    const stats = await fs.stat(fullPath)
    return { size: stats.size, exists: true }
  } catch {
    return { size: 0, exists: false }
  }
}
