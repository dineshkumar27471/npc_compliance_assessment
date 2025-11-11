import { query, getOne, insert } from "./db"

/**
 * Create a new assessment in the database
 */
export async function createAssessment(
  assessment_id: string,
  title: string,
  entity_name: string,
  entity_type: string,
  total_questions: number,
) {
  return await insert(
    `INSERT INTO assessments (assessment_id, title, entity_name, entity_type, total_questions)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [assessment_id, title, entity_name, entity_type, total_questions],
  )
}

/**
 * Save an answer for a question
 */
export async function saveAnswer(assessment_id: string, question_id: number, answer: string, plan_text?: string) {
  const assessment = await getOne("SELECT id FROM assessments WHERE assessment_id = $1", [assessment_id])

  if (!assessment) {
    throw new Error("Assessment not found")
  }

  const existingAnswer = await getOne(
    "SELECT id FROM assessment_answers WHERE assessment_id = $1 AND question_id = $2",
    [assessment.id, question_id],
  )

  if (existingAnswer) {
    return await query(
      `UPDATE assessment_answers 
       SET answer = $1, plan_text = $2, updated_at = CURRENT_TIMESTAMP
       WHERE assessment_id = $3 AND question_id = $4
       RETURNING *`,
      [answer, plan_text, assessment.id, question_id],
    )
  } else {
    return await insert(
      `INSERT INTO assessment_answers (assessment_id, question_id, answer, plan_text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [assessment.id, question_id, answer, plan_text],
    )
  }
}

/**
 * Get assessment progress
 */
export async function getAssessmentProgress(assessment_id: string) {
  const assessment = await getOne("SELECT * FROM assessments WHERE assessment_id = $1", [assessment_id])

  if (!assessment) {
    throw new Error("Assessment not found")
  }

  const answers = await query(
    "SELECT COUNT(*) as count FROM assessment_answers WHERE assessment_id = $1 AND answer IS NOT NULL",
    [assessment.id],
  )

  const progress = Math.round((answers.rows[0].count / assessment.total_questions) * 100)

  return {
    assessment_id,
    total_questions: assessment.total_questions,
    completed_questions: answers.rows[0].count,
    progress_percentage: progress,
  }
}

/**
 * Submit assessment
 */
export async function submitAssessment(assessment_id: string) {
  return await query(
    `UPDATE assessments 
     SET status = 'submitted', submitted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE assessment_id = $1
     RETURNING *`,
    [assessment_id],
  )
}
