"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, FileUp, HelpCircle, RefreshCcw } from "lucide-react"
import Link from "next/link"
import UploadFileModal from "@/components/upload-file-modal"
import DocumentScopeModal from "@/components/document-scope-modal"

interface Question {
  id: number
  text: string
  hasReference: boolean
  hasPlan: boolean
  is_ans: boolean
  is_docs: boolean
}

interface AssessmentData {
  id: string
  title: string
  totalQuestions: number
  questions: Question[]
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function AssessmentFormPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string

  const [assessment, setAssessment] = useState<AssessmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, string>>({})
  const [plans, setPlans] = useState<Record<number, string>>({})
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [scopeModalOpen, setScopeModalOpen] = useState(false)
  const [selectedQuestionForUpload, setSelectedQuestionForUpload] = useState<number | null>(null)
  const [selectedFileForScope, setSelectedFileForScope] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loadingQuestionId, setLoadingQuestionId] = useState<number | null>(null)

  // 🔹 Load Assessment and Questions
  useEffect(() => {
    if (!assessmentId) return
    const fetchAssessment = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${API_BASE}/api/assessment/476cf119-36de-4681-b184-d81e73f5cb5c?domain_id=${assessmentId}`
        )
        if (!res.ok) throw new Error("Failed to fetch assessment")
        const data = await res.json()

        setAssessment({
          id: data.entity_assessment_id,
          title: data.title || "",
          totalQuestions: data.questions.length,
          questions: data.questions.map((q: any) => ({
            id: q.id,
            text: q.text,
            hasPlan: q.hasPlan,
            hasReference: q.hasReference,
            is_ans: q.is_ans,
            is_docs: q.is_docs,
          })),
        })

        const initialAnswers: Record<number, string> = {}
        data.questions.forEach((q: any) => {
          if (q.answer) initialAnswers[q.id] = q.answer
        })
        setAnswers(initialAnswers)
      } catch (err) {
        console.error("Fetch assessment error:", err)
        setSaveError(err instanceof Error ? err.message : "Failed to load assessment")
      } finally {
        setLoading(false)
      }
    }
    fetchAssessment()
  }, [assessmentId])

  // 🔹 Fetch IDMC Answer (from backend → external API)
  const handleGetIDMCAnswer = async (questionId: number) => {
    setLoadingQuestionId(questionId)
    try {
      const res = await fetch(`${API_BASE}/api/questions/${questionId}/idmc-answer`)
      const data = await res.json()

      if (res.ok) {
        const formatted =
          typeof data.answer === "object"
            ? JSON.stringify(data.answer, null, 2)
            : data.answer || "No data found"
        setAnswers((prev) => ({
          ...prev,
          [questionId]: formatted,
        }))
      } else {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: data.message || "Error fetching answer",
        }))
      }
    } catch (err) {
      console.error("Error fetching IDMC answer:", err)
      setAnswers((prev) => ({
        ...prev,
        [questionId]: "Error fetching answer",
      }))
    } finally {
      setLoadingQuestionId(null)
    }
  }

  // 🔹 Handle manual Yes/No answers
  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  // 🔹 Save Answers
  const handleSaveAndContinue = async () => {
    if (!assessment) return
    setIsSaving(true)
    setSaveError(null)

    try {
      const answerQuestionIds = Object.keys(answers).map(Number)
      for (const qId of answerQuestionIds) {
        const answer = answers[qId]
        const plan = plans[qId] || ""

        const response = await fetch(`${API_BASE}/api/answers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assessment_id: assessment.id,
            question_id: qId,
            answer,
            plan_text: plan,
            entity_assessment_id: "476cf119-36de-4681-b184-d81e73f5cb5c",
          }),
        })

        if (!response.ok) {
          const msg = await response.text()
          throw new Error(`Failed to save answer for question ${qId}: ${msg}`)
        }
      }

      alert("Assessment saved successfully!")
      router.push("/assessment")
    } catch (error) {
      console.error("Save error:", error)
      setSaveError("Failed to save assessment")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading assessment...</p>
      </main>
    )

  if (!assessment)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Assessment not found</p>
      </main>
    )

  const completedQuestions = Object.keys(answers).length ?? 0
  const progressPercentage = Math.round((completedQuestions / assessment.totalQuestions) * 100)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ---------- Header ---------- */}
      <section className="bg-primary text-primary-foreground py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/assessment">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Compliance Assessment</h1>
                <p className="text-primary-foreground/80 text-sm">{assessment.title}</p>
              </div>
            </div>
            <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Export</span>
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Assessment Progress: {assessment.title}</span>
              <span className="font-semibold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-primary-foreground/20 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-6">
            {assessment.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex gap-4 flex-col sm:flex-row sm:items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <p className="text-gray-900 font-medium mb-4 break-words">{question.text}</p>

                    {/* ---------- For IDMC based Questions ---------- */}
                    {question.is_ans === false ? (
                      <div className="space-y-3">
                        <Button
                          onClick={() => handleGetIDMCAnswer(question.id)}
                          disabled={loadingQuestionId === question.id}
                          className="bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2"
                          size="sm"
                        >
                          {loadingQuestionId === question.id ? (
                            <>
                              <RefreshCcw className="w-4 h-4 animate-spin" /> Fetching...
                            </>
                          ) : (
                            <>
                              <RefreshCcw className="w-4 h-4" /> Get Answer from IDMC
                            </>
                          )}
                        </Button>

                        {answers[question.id] &&
                          answers[question.id].toLowerCase() !== "no" &&
                          answers[question.id].toLowerCase() !== "answer not found" && (
                            <div className="mt-2 space-y-3">
                              <pre className="text-sm text-green-700 bg-gray-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                                {answers[question.id]}
                              </pre>

                              {question.is_docs && (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-primary text-primary hover:bg-primary/5 bg-transparent"
                                    onClick={() => setSelectedQuestionForUpload(question.id)}
                                  >
                                    <FileUp className="w-4 h-4 mr-2" />
                                    Upload Supporting File
                                  </Button>

                                  {uploadedFiles[question.id] && (
                                    <span className="text-sm text-gray-600 flex items-start gap-1 whitespace-normal break-all sm:break-words max-w-[200px] sm:max-w-none">
                                      <span className="text-green-600">✓</span>
                                      <span className="whitespace-normal break-all">
                                        {uploadedFiles[question.id]}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    ) : (
                      // ---------- Manual (Yes/No) Questions ----------
                      <div className="flex items-center gap-6 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value="yes"
                            checked={answers[question.id] === "yes"}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value="no"
                            checked={answers[question.id] === "no"}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                      </div>
                    )}

                    {question.hasReference && (
                      <button className="text-primary text-sm font-medium flex items-center gap-1 mb-4 hover:underline">
                        <HelpCircle className="w-4 h-4" />
                        Show Reference
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- Bottom Buttons ---------- */}
          <div className="flex gap-4 mt-8 justify-end">
            <Link href="/assessment">
              <Button variant="outline">Back</Button>
            </Link>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleSaveAndContinue}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>

          {saveError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error saving assessment:</p>
              <p className="text-sm">{saveError}</p>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Modals ---------- */}
      <UploadFileModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onFileSelected={() => {}}
        questionId={selectedQuestionForUpload || 0}
      />

      <DocumentScopeModal
        isOpen={scopeModalOpen}
        onClose={() => setScopeModalOpen(false)}
        onSelectScope={() => {}}
        fileName={selectedFileForScope?.name || ""}
      />

      <Footer />
    </main>
  )
}
