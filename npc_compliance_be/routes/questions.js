import express from "express";
const router = express.Router();

/**
 * @route GET /api/questions/:questionId/idmc-answer
 * @desc Fetch external API data based on idmc_api_url column in DB
 */
router.get("/:questionId/idmc-answer", async (req, res) => {
  const db = req.app.get("db");
  const { questionId } = req.params;

  try {
    // 1️⃣ Fetch question details
    const question = await db("questions")
      .where({ id: questionId })
      .select("id", "idmc_api_url", "default_answer", "is_ans")
      .first();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // 2️⃣ Only non-manual (is_ans = false) questions should trigger API
    if (question.is_ans === true) {
      return res.status(400).json({ message: "Manual question, no API call needed" });
    }

    // 3️⃣ Validate that API URL exists
    if (!question.idmc_api_url || question.idmc_api_url.trim() === "") {
      return res.json({ message: "No API URL found for this question" });
    }

    // 4️⃣ Fetch data from the API URL
    const apiRes = await fetch(question.idmc_api_url);

    if (!apiRes.ok) {
      return res
        .status(502)
        .json({ message: `External API returned ${apiRes.status}: ${apiRes.statusText}` });
    }

    const apiData = await apiRes.json();

    // 5️⃣ Return the API response to frontend
    return res.json({
      from: "idmc_api",
      answer: apiData,
    });
  } catch (err) {
    console.error("Error fetching IDMC data:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
