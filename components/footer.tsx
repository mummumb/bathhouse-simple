import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-bathhouse-black text-white">
      <div className="bathhouse-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-heading tracking-tighter mb-4">Bathhouse Studio</h2>
            <p className="text-sm text-white/80 mb-6 max-w-xs">
              Authentic Finnish sauna rituals and mindful wellness practices in Berlin Neukölln.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/bathhousestudio.berlin/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/bathhousestudio.berlin/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-heading uppercase tracking-wider mb-4 text-white/70">Experience</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/rituals" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Rituals
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/events" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/journal" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Journal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/p/book" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Booking
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-heading uppercase tracking-wider mb-4 text-white/70">About</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/p/about" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/p/about#our-team" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/p/contact" 
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-heading uppercase tracking-wider mb-4 text-white/70">Info</h3>
                <address className="not-italic">
                  <p className="text-sm text-white/80 mb-1">Bathhouse Studio</p>
                  <p className="text-sm text-white/80 mb-1">Flughafenstraße 52</p>
                  <p className="text-sm text-white/80 mb-4">12053 Berlin, Germany</p>
                  <p className="text-sm">
                    <a 
                      href="mailto:info@bathhousestudio.berlin" 
                      className="text-bathhouse-teal hover:text-white transition-colors"
                    >
                      info@bathhousestudio.berlin
                    </a>
                  </p>
                </address>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/60 mb-4 md:mb-0">
            © {currentYear} Bathhouse Studio. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/p/privacy" 
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/p/terms" 
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/p/imprint" 
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
