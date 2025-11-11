import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ComplianceGuide from "@/components/compliance-guide"
import ScoringSection from "@/components/scoring-section"
import ResourcesSection from "@/components/resources-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-[#3B011F] to-[#5B0029]">
        <Header />
        <div>
          <HeroSection />
        </div>
</div>
      <div className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <ComplianceGuide />
            <ScoringSection />
          </div>
        </div>
      </div>
      <ResourcesSection />
      <Footer />
    </main>
  )
}
