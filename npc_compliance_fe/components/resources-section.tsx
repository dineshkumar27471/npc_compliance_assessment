"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Scale, BookMarked, ArrowRight } from "lucide-react"

const resources = [
  {
    icon: FileText,
    title: "Explore Policies",
    description:
      "Ensure your organization adheres to PDPL regulations with thorough assessment and actionable recommendations.",
    gradient: "from-blue-500/20 to-blue-600/20",
    iconGradient: "from-blue-600 to-blue-700",
  },
  {
    icon: Scale,
    title: "Data Standards",
    description: "Receive expert legal guidance on data protection laws and regulatory requirements for compliance.",
    gradient: "from-purple-500/20 to-purple-600/20",
    iconGradient: "from-purple-600 to-purple-700",
  },
  {
    icon: BookMarked,
    title: "Guidelines",
    description: "Access comprehensive regulatory texts on data sharing policies to ensure full compliance.",
    gradient: "from-emerald-500/20 to-emerald-600/20",
    iconGradient: "from-emerald-600 to-emerald-700",
  },
]

export default function ResourcesSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Explore Our Resources</h2>
          <p className="text-foreground/60 text-lg max-w-2xl">
            Comprehensive tools and guidance to support your compliance journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <Card
                key={index}
                className={`bg-white border border-border p-8 rounded-2xl hover-lift transition-all duration-300 group overflow-hidden relative`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    {/* <div
                      className={`w-12 h-12 bg-gradient-to-br ${resource.iconGradient} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div> */}
                    <h3 className="text-xl font-bold text-foreground">{resource.title}</h3>
                  </div>

                  <p className="text-foreground/70 mb-8 leading-relaxed">{resource.description}</p>

                  <Button className="bg-white border border-[#8A1538] text-[#8A1538] hover:bg-[#8A1538] hover:text-white px-4 py-1 group/btn">
                    Explore
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
