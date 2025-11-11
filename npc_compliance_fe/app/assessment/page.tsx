"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface AssessmentQuestion {
  id: string
  title: string
  description?: string
  progress: string
  status: "not-started" | "in-progress" | "completed"
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "1",
    title: "Coordinating the national statistical system",
    progress: "0/5",
    status: "not-started",
  },
  {
    id: "2",
    title: "Managing relationships with data providers and stakeholders",
    progress: "0/10",
    status: "not-started",
  },
  {
    id: "3",
    title: "Managing statistical information",
    progress: "0/5",
    status: "not-started",
  },
  {
    id: "4",
    title: "Assuring Professional Competence",
    progress: "0/7",
    status: "not-started",
  },
  {
    id: "5",
    title: "Assuring Impartiality and Objectivity",
    progress: "0/20",
    status: "not-started",
  },
  {
    id: "6",
    title: "Assuring Transparency",
    progress: "0/10",
    status: "not-started",
  },
  {
    id: "7",
    title: "Assuring Statistical Confidentiality and Data Security",
    progress: "0/30",
    status: "not-started",
  },
  {
    id: "8",
    title: "Assuring Commitment to Quality",
    progress: "0/7",
    status: "not-started",
  },
  {
    id: "9",
    title: "Managing the Respondent Burden",
    progress: "0/32",
    status: "not-started",
  },
  {
    id: "10",
    title: "Assuring Relevance",
    progress: "0/12",
    status: "not-started",
  },
  {
    id: "11",
    title: "Assuring Accuracy and Reliability",
    progress: "0/10",
    status: "not-started",
  },
  {
    id: "12",
    title: "Assuring Timeliness and Punctuality",
    progress: "0/5",
    status: "not-started",
  },
  {
    id: "13",
    title: "Assuring Accessibility and Clarity",
    progress: "0/32",
    status: "not-started",
  },
  {
    id: "14",
    title: "Assuring Coherence and Comparability",
    progress: "0/12",
    status: "not-started",
  },
  {
    id: "15",
    title: "Managing Metadata",
    progress: "0/10",
    status: "not-started",
  },
]

export default function AssessmentPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200"
      case "in-progress":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      default:
        return "text-primary"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Statistical Assessment Principles</h1>
              <p className="text-primary-foreground/80">Assessment Progress: 0%</p>
            </div>
            <div className="bg-primary-foreground/20 rounded-lg px-4 py-2">
              <p className="text-sm font-semibold">0/15 Completed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assessmentQuestions.map((question) => (
                <Link
                  key={question.id}
                  href={`/assessment/${question.id}`}
                  className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer ${getStatusColor(
                    question.status,
                  )}`}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="font-semibold text-gray-900 mb-4 text-sm leading-tight">{question.title}</h3>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-bold ${getProgressColor(question.status)}`}>
                          {question.progress}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{question.status}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent"
                      >
                        Start
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
