"use client"

import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

const assessments = [
  {
    id: 1,
    title: "Data Protection and Privacy",
    status: "completed",
    score: 92,
    dueDate: "September 15, 2024",
  },
  {
    id: 2,
    title: "Information Security",
    status: "in-progress",
    score: 78,
    dueDate: "September 30, 2024",
  },
  {
    id: 3,
    title: "Regulatory Compliance",
    status: "pending",
    score: null,
    dueDate: "October 15, 2024",
  },
]

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Compliance Assessments</h1>

        <div className="grid gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="bg-card border border-border p-6 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {assessment.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {assessment.status === "in-progress" && <Clock className="w-5 h-5 text-blue-600" />}
                    {assessment.status === "pending" && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                    <h3 className="text-xl font-bold text-foreground">{assessment.title}</h3>
                  </div>
                  <p className="text-foreground/60 text-sm mb-4">Due: {assessment.dueDate}</p>

                  {assessment.score && (
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">{assessment.score}%</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${assessment.score}%` }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {assessment.status === "completed" ? "View Results" : "Continue"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
