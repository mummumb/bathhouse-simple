"use client"

import { useState, useEffect } from "react"
import { useVideoPreloader } from "@/hooks/use-video-preloader"
import { useUserInteraction } from "@/hooks/use-user-interaction"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import { PlayCircle, PauseCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroVideoSectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  videoUrl?: string
  posterImage?: string
  overlayOpacity?: number
}

export default function HeroVideoSection({
  title = "Transform Mind & Body",
  subtitle = "Experience authentic Finnish sauna rituals and mindful wellness practices in Berlin Neukölln.",
  ctaText = "Explore Rituals",
  ctaLink = "/rituals",
  videoUrl = "",
  posterImage = "/images/hero-cover.png",
  overlayOpacity = 0.4,
}: HeroVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const { hasInteracted } = useUserInteraction()
  const { isVisible } = useIntersectionObserver(videoRef, { threshold: 0.3 })
  const { isLoaded, isLoading } = useVideoPreloader(videoUrl)

  // Update play state based on visibility and user interaction
  useEffect(() => {
    if (!videoRef) return
    
    if (isVisible && hasInteracted && isLoaded) {
      videoRef.play().catch(() => {
        // Autoplay was prevented
        setIsPlaying(false)
      })
      setIsPlaying(true)
    } else if (!isVisible && isPlaying) {
      videoRef.pause()
      setIsPlaying(false)
    }
  }, [isVisible, hasInteracted, isLoaded, videoRef, isPlaying])

  const togglePlayPause = () => {
    if (!videoRef) return
    
    if (isPlaying) {
      videoRef.pause()
      setIsPlaying(false)
    } else {
      videoRef.play().catch(() => {
        // Play was prevented
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Video/Image background */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            ref={setVideoRef}
            poster={posterImage}
            muted
            loop
            playsInline
            autoPlay
            className="absolute object-cover w-full h-full"
            aria-hidden="true"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={posterImage || "/images/hero-cover.png"}
            alt="Bathhouse Studio"
            fill
            className="object-cover object-center"
            priority
          />
        )}
        
        {/* Video overlay with adjustable opacity */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bathhouse-container text-center px-4 sm:px-6">
          <div className="max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: "300ms" }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-heading font-light tracking-tight">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 bathhouse-text-balance max-w-2xl mx-auto">
              {subtitle}
            </p>
            
            {(ctaText || videoUrl) && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {ctaText && (
                  <Link href={ctaLink} className="w-full sm:w-auto">
                    <Button className="bg-bathhouse-teal hover:bg-bathhouse-teal/90 text-white border-none px-8 py-6 text-base font-normal tracking-wide rounded-md w-full sm:w-auto">
                      {ctaText}
                    </Button>
                  </Link>
                )}
                
              </div>
            )}
          </div>
        </div>
      </div>
      
    </section>
  )
}
