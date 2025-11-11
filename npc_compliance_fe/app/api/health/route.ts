import { testConnection } from "@/lib/db"

export async function GET() {
  try {
    const isConnected = await testConnection()

    if (isConnected) {
      return Response.json({ status: "ok", message: "Database connected successfully" }, { status: 200 })
    } else {
      return Response.json({ status: "error", message: "Database connection failed" }, { status: 500 })
    }
  } catch (error) {
    return Response.json({ status: "error", message: String(error) }, { status: 500 })
  }
}
