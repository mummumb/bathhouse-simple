"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" 
          : "bg-white/90 backdrop-blur-sm py-5"
      )}
    >
      <div className="bathhouse-container">
        <nav className="flex items-center justify-center">
          {/* Logo Only - Centered */}
          <Link href="/" className="relative z-10">
            <Image
              src="/images/BathhouseStudio_Logo_RGB_Black.svg"
              alt="Bathhouse Studio"
              width={180}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>
        </nav>
      </div>
    </header>
  )
}
