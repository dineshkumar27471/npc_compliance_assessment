import { Pool, type QueryResult } from "pg"

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Handle pool errors
pool.on("error", (err) => {
  console.error("[v0] Unexpected error on idle client", err)
  console.error("[v0] Check your DATABASE_URL in .env.local")
})

/**
 * Execute a query on the database
 */
export async function query(text: string, params?: any[]): Promise<QueryResult> {
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("[v0] Executed query", { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error("[v0] Database query error", { text, error })
    throw error
  }
}

/**
 * Get a single row from the database
 */
export async function getOne<T>(text: string, params?: any[]): Promise<T | null> {
  const result = await query(text, params)
  return result.rows[0] || null
}

/**
 * Get multiple rows from the database
 */
export async function getMany<T>(text: string, params?: any[]): Promise<T[]> {
  const result = await query(text, params)
  return result.rows
}

/**
 * Execute an insert query and return the inserted row
 */
export async function insert<T>(text: string, params?: any[]): Promise<T> {
  const result = await query(text, params)
  return result.rows[0]
}

/**
 * Close the database connection pool
 */
export async function closePool(): Promise<void> {
  await pool.end()
}

export async function testConnection(): Promise<boolean> {
  try {
    const result = await pool.query("SELECT NOW()")
    console.log("[v0] Database connection successful:", result.rows[0])
    return true
  } catch (error) {
    console.error("[v0] Database connection failed:", error)
    return false
  }
}

export default pool
