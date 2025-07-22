import { getRituals } from "@/lib/data-utils"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getMappedImageUrl } from "@/lib/image-utils"

export const dynamic = 'force-dynamic'

export default async function RitualsPage() {
  const rituals = await getRituals()

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-bathhouse-cream">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">
              Our Rituals
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Transform your wellness journey through authentic Finnish sauna traditions and mindful practices
            </p>
          </div>
        </div>
      </section>

      {/* Rituals Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {rituals.map((ritual, index) => (
              <div key={ritual.id} className="group">
                <Link href={`/rituals/${ritual.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64 bg-bathhouse-stone">
                      <Image
                        src={getMappedImageUrl(ritual.image)}
                        alt={ritual.image_alt || ritual.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {ritual.number && (
                        <div className="absolute top-4 left-4 bg-white/90 text-bathhouse-black px-3 py-1 rounded-full text-sm font-heading">
                          {ritual.number}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-heading text-bathhouse-black mb-2">
                        {ritual.title}
                      </h2>
                      {ritual.subtitle && (
                        <p className="text-bathhouse-teal mb-4 italic">{ritual.subtitle}</p>
                      )}
                      <p className="text-bathhouse-slate mb-4 line-clamp-3">
                        {ritual.description}
                      </p>
                      <div className="flex items-center justify-between">
                        {ritual.duration && (
                          <span className="text-sm text-bathhouse-slate">
                            {ritual.duration}
                          </span>
                        )}
                        <span className="text-bathhouse-teal group-hover:text-bathhouse-black transition-colors">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-heading text-bathhouse-black mb-4">
              Ready to begin your journey?
            </h3>
            <p className="text-bathhouse-slate mb-8 max-w-2xl mx-auto">
              Join us for a transformative experience that honors traditional practices while embracing modern wellness.
            </p>
            <Link href="/p/contact">
              <Button className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white px-8 py-6 text-lg">
                Book Your First Ritual
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}