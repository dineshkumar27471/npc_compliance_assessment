"use client"

import { Card } from "@/components/ui/card"

export default function ScoringSection() {
  return (
    <Card className="bg-secondary text-secondary-foreground p-8 rounded-2xl border-0" style={{
          background: "linear-gradient(90deg, #56492C 0%,#A29475 100%)"
        }}>
      <h3 className="text-2xl font-bold mb-6">How we calculate your score</h3>

      <p className="leading-relaxed">
        Understanding your compliance score is essential to evaluate your organization's readiness and adherence to
        regulatory standards. Our scoring system is designed to give you clear, actionable insights into your compliance
        performance across multiple dimensions.
      </p>

      <div className="mt-8 pt-8 border-t border-secondary-foreground/20">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">85%</div>
            <p className="text-sm opacity-80">Overall Score</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">12</div>
            <p className="text-sm opacity-80">Assessments</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <p className="text-sm opacity-80">Pending</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
