import express from "express";
import cors from "cors";
import knexfile from "./knexfile.js";
import knex from "knex";
import assessmentRoutes from "./routes/assessments.js";
import answerRoutes from "./routes/answers.js";
import documentRoutes from "./routes/documents.js";
import swaggerDocs from "./swagger.js";   // ✅ Add this
import questionsRoutes from "./routes/questions.js";


const app = express();
app.use(express.json());
app.use(cors());

const db = knex(knexfile.development);
app.set("db", db);

app.use("/api/assessment", assessmentRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/questions", questionsRoutes); // ✅ register it here


// ✅ Initialize Swagger docs
swaggerDocs(app);

app.get("/", (req, res) => res.send("Backend running"))

app.listen(5000, () => console.log("Server running on 5000"));
