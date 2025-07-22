import { Suspense } from "react"
import HeroVideoSection from "@/components/hero-video-section"
import AufgussSimple from "@/components/aufguss-simple"
import ProcessJourney from "@/components/process-journey"
import ContactFormSimple from "@/components/contact-form-simple"
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
        subtitle=""
        ctaText=""
        ctaLink=""
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
              <h3 className="bathhouse-heading text-2xl md:text-3xl mb-6 text-bathhouse-black">Amanda</h3>
              <div className="space-y-4 text-bathhouse-slate">
                <p className="text-lg leading-relaxed">
                  With nearly two decades of experience in movement, health and human connection, Amanda has supported hundreds of people on their personal wellness journeys. As a wife and mother of two, she stays true to her belief that balance is the key to lasting success, a mindset that led her to shift her focus from fitness toward more restorative practices.
                </p>
                <p className="text-lg leading-relaxed">
                  An Aufguss (Sauna) Master, Personal Trainer, Pilates Instructor, Breathwork Facilitator & Sound Healer, Amanda brings deep knowledge and grounded intuition to every session. Her Bathhouse Rituals are an invitation to slow down, reconnect, and feel totally relaxed.
                </p>
                <p className="text-lg leading-relaxed">
                  As the global sauna movement gains momentum, Amanda is helping bring this powerful, Aufguss sensory experience to Melbourne, one ritual at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aufguss Icons and Benefits */}
      <AufgussSimple />

      {/* Process Journey Section */}
      <ProcessJourney />

      {/* Upcoming Events */}
      <section className="bathhouse-section bg-bathhouse-cream">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">Ritual Events</h2>
          <p className="text-lg text-center max-w-3xl mx-auto text-bathhouse-slate mb-12">
            Join us for transformative wellness experiences across Australia and internationally.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-bathhouse-stone/20">
              <p className="text-sm text-bathhouse-slate/70 mb-2">September 14, 2025</p>
              <p className="text-sm text-bathhouse-slate mb-4">Melbourne</p>
              <h3 className="bathhouse-heading text-2xl mb-4 text-bathhouse-black">Aufguss Sauna Ritual</h3>
              <p className="text-bathhouse-slate mb-6">Join us for a powerful 90-minute journey with Aufguss Master Amanda for a transformative ritual combining breathwork, three rounds of traditional Aufguss, and cold plunges between each heat cycle. The experience ends with a hot plunge, herbal tea and nourishing snacks, leaving you grounded, clear and deeply restored.</p>
              <a href="/book" className="block w-full text-center border border-bathhouse-black text-bathhouse-black px-6 py-3 rounded-md hover:bg-bathhouse-stone/10 transition-colors font-normal">
                Register Interest
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-bathhouse-stone/20">
              <p className="text-sm text-bathhouse-slate/70 mb-2">November 16, 2025</p>
              <p className="text-sm text-bathhouse-slate mb-4">Melbourne</p>
              <h3 className="bathhouse-heading text-2xl mb-4 text-bathhouse-black">Sound, Sauna & Ice Ritual</h3>
              <p className="text-bathhouse-slate mb-6">Drop into deep presence with this immersive 90-minute journey. Begin with a grounding sauna session, followed by a refreshing ice plunge to awaken the body. Then surrender into restorative sound healing, where bowls and vibration guide you into stillness. Leave feeling balanced, clear, and deeply reset.</p>
              <a href="/book" className="block w-full text-center border border-bathhouse-black text-bathhouse-black px-6 py-3 rounded-md hover:bg-bathhouse-stone/10 transition-colors font-normal">
                Register Interest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSimple />
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
