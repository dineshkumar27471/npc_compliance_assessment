"use client"

import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const scoreData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 85 },
  { month: "May", score: 88 },
  { month: "Jun", score: 92 },
]

const categoryData = [
  { category: "Data Protection", score: 92 },
  { category: "Security", score: 85 },
  { category: "Governance", score: 78 },
  { category: "Compliance", score: 88 },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border border-border p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-2">Overall Score</p>
            <p className="text-3xl font-bold text-primary">92%</p>
          </Card>
          <Card className="bg-card border border-border p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-2">Assessments Completed</p>
            <p className="text-3xl font-bold text-primary">12</p>
          </Card>
          <Card className="bg-card border border-border p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-2">In Progress</p>
            <p className="text-3xl font-bold text-primary">3</p>
          </Card>
          <Card className="bg-card border border-border p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-2">Pending</p>
            <p className="text-3xl font-bold text-primary">2</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-6">Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-card border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-6">Category Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip />
                <Bar dataKey="score" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </main>
  )
}
