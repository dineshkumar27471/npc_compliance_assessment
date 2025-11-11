"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"

export default function ComplianceGuide() {
  return (
    <Card className="bg-white to-muted border border-border p-8 md:p-12 rounded-2xl hover-lift group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Your Compliance Guide</h3>
          </div>
        </div>

        <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
          Ensuring that your organization adheres to the latest legal and regulatory standards. This section provides
          you with resources and tools to understand and implement compliance measures effectively.
        </p>

        {/* <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold group/btn">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button> */}
      </div>
    </Card>
  )
}
