import Image from "next/image"

interface FullWidthMediaSectionProps {
  imageUrl?: string
  videoUrl?: string
  title: string
  subtitle?: string
  description?: string
  imageAlt?: string
  height?: string
  overlay?: boolean
  overlayOpacity?: number
}

export default function FullWidthMediaSection({
  imageUrl,
  videoUrl,
  title,
  subtitle,
  description,
  imageAlt = "",
  height = "h-[600px]",
  overlay = true,
  overlayOpacity = 0.3
}: FullWidthMediaSectionProps) {
  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      {/* Full-width media background */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      ) : null}
      
      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}