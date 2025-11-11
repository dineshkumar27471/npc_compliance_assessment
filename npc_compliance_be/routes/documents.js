import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Upload or update a document for a question
 *     tags:
 *       - Documents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - entity_assessment_id
 *               - question_id
 *               - file_path
 *             properties:
 *               entity_assessment_id:
 *                 type: string
 *               question_id:
 *                 type: integer
 *               file_path:
 *                 type: string
 *               uploaded_by:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Document saved successfully
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  const db = req.app.get("db");
  const { entity_assessment_id, question_id, file_path, uploaded_by, description } = req.body;

  try {
    const existingDoc = await db("documents as d")
      .leftJoin("document_question_mapping as dqm", "d.id", "dqm.document_id")
      .where({
        "d.entity_assessment_id": entity_assessment_id,
        "dqm.question_id": question_id
      })
      .select("d.id")
      .first();

    let document;

    if (existingDoc) {
      [document] = await db("documents")
        .where({ id: existingDoc.id })
        .update({
          file_path,
          description,
          uploaded_by,
          updated_at: db.fn.now()
        })
        .returning("*");
    } else {
      [document] = await db("documents")
        .insert({
          id: db.raw("gen_random_uuid()"),
          file_path,
          description,
          uploaded_by,
          entity_assessment_id
        })
        .returning("*");

      await db("document_question_mapping").insert({
        document_id: document.id,
        question_id
      });
    }

    res.json({ success: true, document });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
