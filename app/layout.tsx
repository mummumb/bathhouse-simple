import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter_Tight, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import ServiceWorkerRegister from "@/components/service-worker-register"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  preload: true,
})

export const metadata: Metadata = {
  title: "Bathhouse Studio | Rituals for Modern Life",
  description: "Inspired by timeless traditions through sauna, sound and breath for the way we live now.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Bathhouse Studio",
    description: "Rituals for Modern Life",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Bathhouse Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A serene image representing Bathhouse Studio's wellness rituals.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bathhouse Studio",
    description: "Rituals for Modern Life",
    images: ["/og-image.png"],
  },
  // Temporarily removing icons until we have proper favicon files
  // icons: {
  //   icon: "/icon-192.png",
  //   shortcut: "/icon-192.png",
  //   apple: "/icon-192.png",
  // },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#F2EBDE",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} ${inter.variable} font-sans antialiased bg-white text-black`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <Toaster />
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  )
}
