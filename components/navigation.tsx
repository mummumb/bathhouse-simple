"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { X, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isMenuOpen 
          ? "bg-white shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="bathhouse-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src={scrolled || isMenuOpen ? "/images/BathhouseStudio_Logo_RGB_Black.svg" : "/images/BathhouseStudio_Logo_RGB_Black.svg"}
              alt="Bathhouse Studio"
              width={180}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link 
                href="/rituals" 
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-bathhouse-teal",
                  pathname?.startsWith("/rituals") 
                    ? "text-bathhouse-teal" 
                    : scrolled ? "text-bathhouse-black" : "text-bathhouse-black"
                )}
              >
                Rituals
              </Link>
            </li>
            <li>
              <Link 
                href="/events" 
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-bathhouse-teal",
                  pathname?.startsWith("/events") 
                    ? "text-bathhouse-teal" 
                    : scrolled ? "text-bathhouse-black" : "text-bathhouse-black"
                )}
              >
                Events
              </Link>
            </li>
            <li>
              <Link 
                href="/journal" 
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-bathhouse-teal",
                  pathname?.startsWith("/journal") 
                    ? "text-bathhouse-teal" 
                    : scrolled ? "text-bathhouse-black" : "text-bathhouse-black"
                )}
              >
                Journal
              </Link>
            </li>
            <li>
              <Link 
                href="/p/about" 
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-bathhouse-teal",
                  pathname === "/p/about" 
                    ? "text-bathhouse-teal" 
                    : scrolled ? "text-bathhouse-black" : "text-bathhouse-black"
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/p/book" 
                className={cn(
                  "border border-bathhouse-teal px-4 py-2 rounded-md text-sm transition-colors",
                  scrolled 
                    ? "bg-bathhouse-teal text-white hover:bg-bathhouse-slate" 
                    : "bg-bathhouse-teal text-white hover:bg-bathhouse-slate"
                )}
              >
                Book Now
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-bathhouse-black" />
            ) : (
              <Menu className="h-6 w-6 text-bathhouse-black" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fadeIn">
            <nav className="flex flex-col p-8 h-full">
              <ul className="flex flex-col space-y-6 text-center pt-8">
                <li className="animate-slideUp" style={{ animationDelay: "100ms" }}>
                  <Link 
                    href="/rituals" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-bathhouse-teal",
                      pathname?.startsWith("/rituals") ? "text-bathhouse-teal" : "text-bathhouse-black"
                    )}
                  >
                    Rituals
                  </Link>
                </li>
                <li className="animate-slideUp" style={{ animationDelay: "150ms" }}>
                  <Link 
                    href="/events" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-bathhouse-teal",
                      pathname?.startsWith("/events") ? "text-bathhouse-teal" : "text-bathhouse-black"
                    )}
                  >
                    Events
                  </Link>
                </li>
                <li className="animate-slideUp" style={{ animationDelay: "200ms" }}>
                  <Link 
                    href="/journal" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-bathhouse-teal",
                      pathname?.startsWith("/journal") ? "text-bathhouse-teal" : "text-bathhouse-black"
                    )}
                  >
                    Journal
                  </Link>
                </li>
                <li className="animate-slideUp" style={{ animationDelay: "250ms" }}>
                  <Link 
                    href="/p/about" 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-bathhouse-teal",
                      pathname === "/p/about" ? "text-bathhouse-teal" : "text-bathhouse-black"
                    )}
                  >
                    About
                  </Link>
                </li>
                <li className="pt-6 animate-slideUp" style={{ animationDelay: "300ms" }}>
                  <Link 
                    href="/p/book" 
                    className="w-full block bg-bathhouse-teal text-white hover:bg-bathhouse-slate px-4 py-3 rounded-md text-center transition-colors"
                  >
                    Book Now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
