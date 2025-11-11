"use client"

import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StatisticalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Statistical Assessment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card border border-border p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">Data Analysis</h3>
            <p className="text-foreground/70 mb-6">
              Comprehensive statistical analysis of your compliance data to identify trends and patterns.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Analysis</Button>
          </Card>

          <Card className="bg-card border border-border p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">Report Generation</h3>
            <p className="text-foreground/70 mb-6">
              Generate detailed statistical reports for your organization's compliance metrics.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Generate Report</Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
