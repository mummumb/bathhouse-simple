import { Suspense } from "react"
import HeroVideoSection from "@/components/hero-video-section"
import AufgussSimple from "@/components/aufguss-simple"
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-8">What Is Aufguss</h2>
          <p className="text-lg text-center max-w-3xl mx-auto text-gray-700">
            Aufguss is a traditional sauna ritual that combines aromatherapy, rhythmic towel waving, 
            and intentional heat distribution to create a transformative wellness experience.
          </p>
        </div>
      </section>

      {/* Meet the Sauna Master */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8">Meet the Sauna Master</h2>
            <h3 className="text-2xl font-light mb-6">Amanda</h3>
            <blockquote className="text-xl italic text-gray-700 mb-8">
              "A Sauna is not just about heat—it's about community, ritual, and the transformative power of intentional wellness."
            </blockquote>
            <img 
              src="/images/amanda-sauna-peaceful.jpg" 
              alt="Amanda - Sauna Master" 
              className="mx-auto rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Aufguss Icons and Benefits */}
      <AufgussSimple />

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-light mb-4">Aufguss: September</h3>
              <p className="text-gray-700 mb-4">90 Min Ritual</p>
              <p className="text-gray-600 mb-6">Location TBC</p>
              <a 
                href="/book" 
                className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Click to Register
              </a>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-light mb-4">Bathhouse Ritual: November</h3>
              <p className="text-gray-700 mb-4">2 hours of Breathwork, Sound Healing, Sauna & Ice</p>
              <p className="text-gray-600 mb-6">Location TBC</p>
              <a 
                href="/book" 
                className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Click to Register
              </a>
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
