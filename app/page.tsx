import { Suspense, lazy } from "react"
import dynamic from "next/dynamic"
import HeroVideoSection from "@/components/hero-video-section"
import AboutSection from "@/components/about-section"
import { IMAGE_URLS } from "@/lib/constants/images"

// Lazy load sections that are below the fold
const ValuesSection = lazy(() => import("@/components/values-section"))
const ServicesSection = lazy(() => import("@/components/services-section"))
const BathhouseRitualsSection = lazy(() => import("@/components/bathhouse-rituals-section"))
const AufgussRitualSection = lazy(() => import("@/components/aufguss-ritual-section"))
const HowToPrepareSection = lazy(() => import("@/components/how-to-prepare-section"))
const UpcomingEventsSection = lazy(() => import("@/components/upcoming-events-section"))
const JournalSection = lazy(() => import("@/components/journal-section"))
const CommunityTestimonialsSection = lazy(() => import("@/components/community-testimonials-section"))
const ContactSection = lazy(() => import("@/components/contact-section"))
import { Skeleton } from "@/components/ui/skeleton"
import { getEvents, getJournalPosts, getRituals } from "@/lib/data-utils"
import { logger } from "@/lib/logger"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch data with error handling
  let events = []
  let posts = []
  let rituals = []
  let heroConfig = null

  try {
    events = await getEvents()
  } catch (error) {
    logger.error("Error fetching events", error)
  }

  try {
    posts = await getJournalPosts()
  } catch (error) {
    logger.error("Error fetching journal posts", error)
  }

  try {
    rituals = await getRituals()
  } catch (error) {
    logger.error("Error fetching rituals", error)
  }

  // For now, use the hardcoded video URL until we fix the database fetch
  const videoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video-KwV1ZpWXgu439152qhwevLRFsdnBvK.MP4"
  const posterImage = IMAGE_URLS.hero.main

  return (
    <>
      <HeroVideoSection 
        videoUrl={videoUrl} 
        posterImage={posterImage}
      />
      <Suspense fallback={<PageSectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<PageSectionSkeleton />}>
        <ValuesSection />
      </Suspense>
      <Suspense fallback={<PageSectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<PageSectionSkeleton />}>
        <BathhouseRitualsSection rituals={rituals} />
      </Suspense>
      <Suspense fallback={<PageSectionSkeleton />}>
        <AufgussRitualSection />
      </Suspense>
      <HowToPrepareSection />
      <Suspense fallback={<PageSectionSkeleton />}>
        <UpcomingEventsSection events={events} />
      </Suspense>
      <Suspense fallback={<PageSectionSkeleton />}>
        <JournalSection posts={posts} />
      </Suspense>
      <Suspense fallback={<PageSectionSkeleton />}>
        <CommunityTestimonialsSection />
      </Suspense>
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
