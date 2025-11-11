"use client"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <p className="text-foreground/60 text-sm">
              © 2025 Data Regulations, Compliance and Statistics. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition">
              Terms of Service
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition">
              Contact Us
            </a>
          </div>

          <div className="mt-8 md:mt-0 text-center md:text-right">
            <p className="text-foreground/40 text-xs">IONS CEANI</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
