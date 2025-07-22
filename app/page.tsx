import { Suspense } from "react"
import HeroVideoSection from "@/components/hero-video-section"
import AufgussSimple from "@/components/aufguss-simple"
import ValuesSimple from "@/components/values-simple"
import ContactSection from "@/components/contact-section"
import { IMAGE_URLS } from "@/lib/constants/images"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // For now, use the hardcoded video URL until we fix the database fetch
  const videoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video-KwV1ZpWXgu439152qhwevLRFsdnBvK.MP4"
  const posterImage = IMAGE_URLS.hero.main

  return (
    <>
      <HeroVideoSection 
        videoUrl={videoUrl} 
        posterImage={posterImage}
        title="Bathhouse Rituals"
      />
      
      {/* What Is Aufguss Section */}
      <section className="bathhouse-section bg-bathhouse-cream">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-8 text-bathhouse-black">The Aufguss Ritual</h2>
          <p className="text-lg md:text-xl text-center max-w-3xl mx-auto text-bathhouse-slate leading-relaxed">
            A five-step, multi-sensory experience—steam, aromatherapy, curated music, towel work, and the mindful guidance of a master. 
            Crafted with expertise and creativity, inviting you into an authentic journey of presence and renewal.
          </p>
        </div>
      </section>

      {/* Meet the Sauna Master */}
      <section className="bathhouse-section bg-white">
        <div className="bathhouse-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <img 
                src="/images/amanda-sauna-peaceful.jpg" 
                alt="Amanda - Sauna Master" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="bathhouse-heading text-4xl md:text-5xl mb-4 text-bathhouse-black">Meet the Sauna Master</h2>
              <h3 className="bathhouse-heading text-2xl md:text-3xl mb-8 text-bathhouse-black">Amanda</h3>
              <blockquote className="relative">
                <span className="text-6xl text-bathhouse-teal/20 absolute -top-4 -left-2 leading-none">"</span>
                <p className="text-xl md:text-2xl italic text-bathhouse-slate relative z-10">
                  A sauna master does with their rituals as a sommelier does with their wine.
                </p>
                <span className="text-6xl text-bathhouse-teal/20 absolute -bottom-8 right-0 leading-none">"</span>
              </blockquote>
              <p className="mt-4 text-lg text-bathhouse-slate">— Amanda Berger</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aufguss Icons and Benefits */}
      <AufgussSimple />

      {/* Values Section */}
      <ValuesSimple />

      {/* Upcoming Events */}
      <section className="bathhouse-section bg-bathhouse-cream">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">Ritual Events</h2>
          <p className="text-lg text-center max-w-3xl mx-auto text-bathhouse-slate mb-12">
            Join us for transformative wellness experiences across Australia and internationally.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-sm text-bathhouse-slate/70 mb-2">August 15, 2025</p>
              <p className="text-sm text-bathhouse-slate mb-4">Melbourne, VIC</p>
              <h3 className="bathhouse-heading text-2xl mb-4 text-bathhouse-black">Aufguss, A Sauna Ritual</h3>
              <p className="text-bathhouse-slate mb-6">An immersive, multi-sensory experience guided by a Sauna Master to the rhythm of music, heat, and aromatherapy.</p>
              <div className="space-y-3">
                <a href="/book" className="block w-full text-center bg-bathhouse-black text-bathhouse-white px-6 py-3 rounded-md hover:bg-bathhouse-slate transition-colors">
                  Find Out More
                </a>
                <a href="/book" className="block w-full text-center border border-bathhouse-black text-bathhouse-black px-6 py-3 rounded-md hover:bg-bathhouse-cream transition-colors">
                  Register Interest
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-sm text-bathhouse-slate/70 mb-2">September 5, 2025</p>
              <p className="text-sm text-bathhouse-slate mb-4">Sydney, NSW</p>
              <h3 className="bathhouse-heading text-2xl mb-4 text-bathhouse-black">Cold Water Immersion</h3>
              <p className="text-bathhouse-slate mb-6">Build resilience and unlock your potential with guided cold plunge sessions. Learn techniques to control your breath and mind in the face of stress.</p>
              <div className="space-y-3">
                <a href="/book" className="block w-full text-center bg-bathhouse-black text-bathhouse-white px-6 py-3 rounded-md hover:bg-bathhouse-slate transition-colors">
                  Find Out More
                </a>
                <a href="/book" className="block w-full text-center border border-bathhouse-black text-bathhouse-black px-6 py-3 rounded-md hover:bg-bathhouse-cream transition-colors">
                  Register Interest
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection />
    </>
  )
}

function PageSectionSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
        <Skeleton className="h-8 w-3/4 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </section>
  )
}
