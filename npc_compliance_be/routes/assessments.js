import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/assessment/{entity_assessment_id}:
 *   get:
 *     summary: Get all questions and answers for an assessment by domain
 */
router.get("/:entity_assessment_id", async (req, res) => {
  const db = req.app.get("db");
  const entity_assessment_id = req.params.entity_assessment_id;
  const domain_id = Number(req.query.domain_id);

  if (isNaN(domain_id)) {
    return res.status(400).json({ error: "Invalid domain_id" });
  }

  try {
    const questions = await db("questions as q")
      .leftJoin("answers as a", function () {
        this.on("q.id", "=", "a.question_id")
          .andOn("a.entity_assessment_id", "=", db.raw("?", [entity_assessment_id]));
      })
      .leftJoin("document_question_mapping as dqm", "q.id", "dqm.question_id")
      .leftJoin("documents as d", function () {
        this.on("dqm.document_id", "=", "d.id")
          .andOn("d.entity_assessment_id", "=", db.raw("?", [entity_assessment_id]));
      })
      .where("q.domain_id", domain_id)
      .select(
  "q.id",
  "q.question_text",
  "q.requires_document",
  "q.is_ans",           // ✅ make sure this line is here
  "q.default_answer",   // ✅ also include this if you added default answer
  db.raw("a.answer_value::text as answer_value"),
  db.raw("COALESCE(a.comment, '') as comment"),
  db.raw("COALESCE(d.file_path, '') as file_path")
);


    res.json({
      entity_assessment_id,
      domain_id,
      totalQuestions: questions.length,
      questions: questions.map(q => ({
        id: q.id,
        text: q.question_text,
        hasUpload: q.requires_document,
        is_ans: q.is_ans,
        default_answer: q.default_answer,
        answer: q.answer_value ?? "",
        plan: q.comment,
        document: q.file_path,
      })),
    });
  } catch (err) {
    console.error("Error fetching assessment:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
