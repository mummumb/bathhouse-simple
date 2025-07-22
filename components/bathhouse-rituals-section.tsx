import type { Ritual } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getMappedImageUrl } from "@/lib/image-utils"

export default function BathhouseRitualsSection({ rituals }: { rituals: Ritual[] | null | undefined }) {
  // Early return if no rituals
  if (!rituals || rituals.length === 0) {
    return (
      <section id="rituals" className="bathhouse-section bg-white">
        <div className="bathhouse-container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl mb-4 text-bathhouse-black">Bathhouse Rituals</h2>
            <p className="text-bathhouse-slate text-lg max-w-2xl mx-auto bathhouse-text-balance">
              Our transformative rituals are being prepared. Check back soon for healing experiences that honor traditional practices.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rituals" className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-6 text-bathhouse-black">Bathhouse Rituals</h2>
          <p className="text-responsive-lg text-bathhouse-slate max-w-3xl mx-auto">
            Experience our carefully curated rituals, each designed to restore, rejuvenate, and reconnect you with ancient wellness traditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {rituals.slice(0, 6).map((ritual) => (
            <div key={ritual.id} className="bathhouse-card group">
              <div className="bathhouse-card-image h-48">
                <Image
                  src={getMappedImageUrl(ritual.image)}
                  alt={ritual.image_alt || ritual.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="bathhouse-card-content">
                <div className="mb-3">
                  {ritual.number && (
                    <span className="text-sm font-medium text-bathhouse-peach">{ritual.number}</span>
                  )}
                  <h3 className="font-heading text-xl md:text-2xl mt-1 text-bathhouse-black">{ritual.title}</h3>
                  {ritual.subtitle && (
                    <p className="text-bathhouse-slate text-sm mt-1">{ritual.subtitle}</p>
                  )}
                </div>
                
                <p className="text-bathhouse-slate text-responsive-base leading-relaxed mb-4 line-clamp-3">
                  {ritual.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {ritual.duration && (
                    <span className="text-xs text-bathhouse-slate bg-bathhouse-cream px-2 py-1 rounded">
                      {ritual.duration}
                    </span>
                  )}
                  <Link href={`/rituals/${ritual.slug}`}>
                    <Button variant="outline" size="sm" className="bathhouse-btn-secondary text-sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {rituals.length > 6 && (
          <div className="text-center mt-12">
            <Link href="/rituals">
              <Button className="bathhouse-btn-primary">
                View All Rituals
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
