import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/answers:
 *   post:
 *     summary: Save or update an answer for a question
 *     description: Inserts a new answer or updates if already exists for that assessment & question
 *     tags:
 *       - Answers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - entity_assessment_id
 *               - question_id
 *               - answer
 *             properties:
 *               entity_assessment_id:
 *                 type: string
 *               question_id:
 *                 type: integer
 *               answer:
 *                 type: string
 *               plan_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answer saved successfully
 *       500:
 *         description: Server error
 */
router.post("/", async (req,res)=>{
  const db = req.app.get("db");
  const {question_id, answer, plan_text, entity_assessment_id} = req.body;
  try {
    await db("answers")
      .insert({entity_assessment_id, question_id, answer_value: answer, comment: plan_text})
      .onConflict(["entity_assessment_id","question_id"])
      .merge();

    res.json({success: true});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

export default router;
