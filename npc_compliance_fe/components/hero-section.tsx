"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// export default function HeroSection() {
//   return (
//     <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground py-16 md:py-32 overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 right-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="mb-8 animate-fade-in">
//           <h1 className="text-2xl md:text-3xl font-bold mb-2">Hello Ali (Ministry of Health)</h1>
//           <p className="text-primary-foreground/80 text-sm">Welcome back to your compliance dashboard</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//           {/* Left Content */}
//           <div className="animate-slide-up">
//             <div className="mb-6">
//               <span className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
//                 New Assessment Available
//               </span>
//             </div>

//             <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ensure Your Organization's Compliance</h2>

//             <p className="text-primary-foreground/90 mb-8 text-lg leading-relaxed max-w-xl">
//               Evaluate your organization's adherence to Qatar's national laws and regulations. This comprehensive
//               assessment will help identify compliance gaps and provide actionable insights.
//             </p>

//             <div className="space-y-3 mb-8">
//               <div className="flex items-center gap-3">
//                 <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-primary-foreground/90">Comprehensive compliance evaluation</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-primary-foreground/90">Actionable recommendations</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-primary-foreground/90">Real-time progress tracking</span>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link href="/assessment">
//                 <Button
//                   className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-base hover-lift"
//                   size="lg"
//                 >
//                   Start Assessment
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </Link>
//               <Button
//                 variant="outline"
//                 className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-base bg-transparent"
//                 size="lg"
//               >
//                 Learn More
//               </Button>
//             </div>

//             <div className="mt-8 pt-8 border-t border-primary-foreground/20">
//               <p className="text-sm text-primary-foreground/70 mb-2">Due Date</p>
//               <p className="text-2xl font-bold">September 30, 2024</p>
//             </div>
//           </div>

//           {/* Right Visual */}
//           <div className="relative hidden lg:block animate-scale-in">
//             <div className="relative w-full aspect-square">
//               {/* Decorative cards */}
//               <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 rounded-3xl backdrop-blur-sm border border-primary-foreground/20"></div>

//               {/* Floating elements */}
//               <div
//                 className="absolute top-8 right-8 w-32 h-32 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center animate-bounce"
//                 style={{ animationDelay: "0s" }}
//               >
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-primary-foreground">15</div>
//                   <div className="text-xs text-primary-foreground/70">Questions</div>
//                 </div>
//               </div>

//               <div
//                 className="absolute bottom-8 left-8 w-32 h-32 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center animate-bounce"
//                 style={{ animationDelay: "0.5s" }}
//               >
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-primary-foreground">100%</div>
//                   <div className="text-xs text-primary-foreground/70">Completion</div>
//                 </div>
//               </div>

//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary-foreground/20 rounded-full blur-2xl"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
export default function HeroSection() {
  return (
      <section
        className="text-white pt-24 pb-16"
        style={{
          background: "linear-gradient(180deg, #3B0712 0%,rgb(255, 255, 255) 100%)"
        }}
      >
      <div className="container mx-auto px-4">
        
        <h1 className="text-xl md:text-2xl font-semibold mb-6">
          Hello Ahmad (PWC)
        </h1>

        {/* Announcement card */}
        <div className="bg-gradient-to-r from-[#7A1D2F] to-[#3B0712] rounded-2xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Right side image overlay shape */}
          <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block opacity-60">
            <img 
              src="/hero-hand.png" 
              className="object-cover h-full w-full"
              alt="AI hand decoration"
            />
          </div>

          <div className="max-w-xl relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              New Assessment Has been Added For ministry of health
            </h2>

            <p className="text-sm md:text-base text-[#F1E6E8] mb-1">
              Due Date: <span className="font-medium">September 30, 2024</span>
            </p>

            <p className="text-sm md:text-base text-[#E8D8DA] font-semibold mb-6 leading-relaxed">
              As an external auditor, you are responsible for evaluating this ministry’s adherence to Qatar’s national 
              laws and regulatory requirements. This assessment will help identify any compliance gaps and provide 
              insights to ensure the ministry meets the required standards.
            </p>

            <a 
              href="/assessment" 
              className="inline-flex px-6 py-3 bg-white text-[#7A1D2F] rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Assessment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
