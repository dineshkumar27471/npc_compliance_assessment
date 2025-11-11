"use client"

import Link from "next/link"
import { Bell, Settings, HelpCircle, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (  
    // <header className="bg-[#4A0A19] text-primary-foreground border-b border-primary/20">
    //   <div className="container mx-auto px-4 py-4">
    //     <div className="flex items-center justify-between">
    //       {/* Logo */}
    //       <div className="flex items-center gap-2">
    //         <div className="w-8 h-8 bg-primary-foreground rounded flex items-center justify-center">
    //           <span className="text-primary font-bold text-sm">D</span>
    //         </div>
    //         <div className="text-sm font-semibold leading-tight">
    //           <div>DATA REGULATIONS,</div>
    //           <div>COMPLIANCE AND STATISTICS</div>
    //         </div>
    //       </div>

    //       {/* Navigation - Desktop */}
    //       <nav className="hidden md:flex items-center gap-8">
    //         <Link href="/compliance" className="text-sm hover:opacity-80 transition">
    //           Compliance Assessment
    //         </Link>
    //         <Link href="/statistical" className="text-sm hover:opacity-80 transition">
    //           Statistical Assessment
    //         </Link>
    //         <Link href="/dashboard" className="text-sm hover:opacity-80 transition">
    //           Dashboard
    //         </Link>
    //       </nav>

    //       {/* Right Actions */}
    //       <div className="flex items-center gap-2 md:gap-4">
    //         <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
    //           <HelpCircle className="w-5 h-5" />
    //         </Button>
    //         <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
    //           <Settings className="w-5 h-5" />
    //         </Button>
    //         <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
    //           <Bell className="w-5 h-5" />
    //         </Button>
    //         <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-primary/20">
    //           <div className="text-right text-sm">
    //             <div className="font-semibold">Ask Bayan</div>
    //           </div>
    //           <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
    //             <User className="w-5 h-5" />
    //           </div>
    //         </div>

    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="md:hidden text-primary-foreground hover:bg-primary/80"
    //           onClick={toggleMenu}
    //         >
    //           {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    //         </Button>
    //       </div>
    //     </div>

    //     {isMenuOpen && (
    //       <nav className="md:hidden mt-4 pb-4 border-t border-primary/20 pt-4 space-y-3 animate-slide-up">
    //         <Link
    //           href="/compliance"
    //           className="block text-sm hover:opacity-80 transition py-2 px-2 rounded hover:bg-primary/80"
    //           onClick={() => setIsMenuOpen(false)}
    //         >
    //           Compliance Assessment
    //         </Link>
    //         <Link
    //           href="/statistical"
    //           className="block text-sm hover:opacity-80 transition py-2 px-2 rounded hover:bg-primary/80"
    //           onClick={() => setIsMenuOpen(false)}
    //         >
    //           Statistical Assessment
    //         </Link>
    //         <Link
    //           href="/dashboard"
    //           className="block text-sm hover:opacity-80 transition py-2 px-2 rounded hover:bg-primary/80"
    //           onClick={() => setIsMenuOpen(false)}
    //         >
    //           Dashboard
    //         </Link>
    //       </nav>
    //     )}
    //   </div>
    // </header>
    <header className="bg-[#3B0712] font-[Lusail+] text-white backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-[#7A1D2F] rounded flex items-center justify-center font-bold">
            D
          </div>

          <div className="text-[11px] leading-tight font-medium tracking-wide">
            <div>DATA REGULATIONS,</div>
            <div>COMPLIANCE AND STATISTICS</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-md font-medium">
          <Link href="/compliance" className="hover:text-[#F9CED8] transition">
            Compliance Assessment
          </Link>
          <Link href="/statistical" className="hover:text-[#F9CED8] transition">
            Statistical Assessment
          </Link>
          <Link href="/dashboard" className="hover:text-[#F9CED8] transition">
            Dashboard
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/20">
            <div className="text-right text-xs">
              <div className="font-medium">Ask Bayan</div>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <nav className="md:hidden border-t border-white/10 bg-[#3B0712]/95 backdrop-blur-sm px-4 pt-4 pb-4 space-y-2">
      <Link href="/compliance" className="block py-2 text-sm hover:text-[#F9CED8]" onClick={() => setIsMenuOpen(false)}>
        Compliance Assessment
      </Link>
      <Link href="/statistical" className="block py-2 text-sm hover:text-[#F9CED8]" onClick={() => setIsMenuOpen(false)}>
        Statistical Assessment
      </Link>
      <Link href="/dashboard" className="block py-2 text-sm hover:text-[#F9CED8]" onClick={() => setIsMenuOpen(false)}>
        Dashboard
      </Link>
    </nav>
  )}
    </header>
    
      

  )
}
