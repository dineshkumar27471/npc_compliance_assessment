import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local";
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const fontProject = localFont({
  src: "../public/fonts/Lusail+ Regular.ttf",
  display: "swap",
  variable: "--font-lusail",
  weight: "400",
  fallback: ["Inter", "Arial", "sans-serif"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Font combination with Lusail as primary
export const fontClassNames = `${fontProject.variable} ${inter.variable} font-sans antialiased`;

export const metadata: Metadata = {
  title: "NPC Compliance Assessment",
  description: "Data Regulations, Compliance and Statistics Platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontClassNames}>{children}</body>
    </html>
  )
}
