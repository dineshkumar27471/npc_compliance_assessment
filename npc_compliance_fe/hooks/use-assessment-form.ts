"use client"

import { useState, useCallback } from "react"

interface FormData {
  answers: Record<number, string>
  plans: Record<number, string>
  uploadedFiles: Record<number, string>
}

export function useAssessmentForm(assessmentId: string) {
  const [formData, setFormData] = useState<FormData>({
    answers: {},
    plans: {},
    uploadedFiles: {},
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnswerChange = useCallback((questionId: number, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }))
  }, [])

  const handlePlanChange = useCallback((questionId: number, plan: string) => {
    setFormData((prev) => ({
      ...prev,
      plans: { ...prev.plans, [questionId]: plan },
    }))
  }, [])

  const handleFileUpload = useCallback((questionId: number, fileName: string) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: { ...prev.uploadedFiles, [questionId]: fileName },
    }))
  }, [])

  const saveAnswer = useCallback(
    async (questionId: number) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/answers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assessment_id: assessmentId,
            question_id: questionId,
            answer: formData.answers[questionId],
            plan_text: formData.plans[questionId],
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save answer")
        }

        console.log("[v0] Answer saved successfully")
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("[v0] Error saving answer:", err)
      } finally {
        setLoading(false)
      }
    },
    [assessmentId, formData],
  )

  const uploadDocument = useCallback(
    async (questionId: number, file: File, scope: "single" | "multiple" = "single") => {
      setLoading(true)
      setError(null)
      try {
        const formDataObj = new FormData()
        formDataObj.append("file", file)
        formDataObj.append("assessment_id", assessmentId)
        formDataObj.append("question_id", questionId.toString())
        formDataObj.append("upload_scope", scope)

        const response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formDataObj,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to upload document")
        }

        const data = await response.json()
        handleFileUpload(questionId, file.name)
        console.log("[v0] Document uploaded successfully")
        return data.document
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("[v0] Error uploading document:", err)
      } finally {
        setLoading(false)
      }
    },
    [assessmentId, handleFileUpload],
  )

  return {
    formData,
    loading,
    error,
    handleAnswerChange,
    handlePlanChange,
    handleFileUpload,
    saveAnswer,
    uploadDocument,
  }
}
