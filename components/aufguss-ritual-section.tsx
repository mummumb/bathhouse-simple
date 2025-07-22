import { getPageContent } from "@/lib/data-utils"
import type { PageContent } from "@/lib/types"
import Image from "next/image"

export default async function AufgussRitualSection({ content }: { content: PageContent[] | null }) {
  let aufgussContent: PageContent | null = null
  
  if (content && content.length > 0) {
    aufgussContent = content[0]
  } else {
    const fetchedContent = await getPageContent("aufguss-ritual")
    aufgussContent = fetchedContent?.[0] || null
  }

  if (!aufgussContent) {
    return (
      <section id="aufguss-ritual" className="relative">
        {/* Full-width image section */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          <Image
            src="/images/aufguss-ceremony.png"
            alt="Aufguss ceremony in progress"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">Aufguss Ritual</h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Experience the invigorating Aufguss ritual, a traditional sauna ceremony that combines heat, humidity,
                and aromatherapy for a truly immersive and revitalizing experience.
              </p>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="py-12 md:py-16 bg-bathhouse-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <p className="text-bathhouse-slate text-responsive-base leading-relaxed">
                    The Aufguss ritual is a cornerstone of traditional sauna culture, originating from German and Austrian 
                    wellness traditions. During this ceremony, essential oils are combined with water and poured over heated 
                    stones, creating aromatic steam that envelops the sauna.
                  </p>
                  
                  <p className="text-bathhouse-slate text-responsive-base leading-relaxed">
                    Our certified Aufguss masters guide you through this transformative experience, using specialized 
                    towel techniques to circulate the infused air and create waves of therapeutic heat that promote 
                    deep relaxation and detoxification.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-heading text-bathhouse-teal">15-20</div>
                    <div className="text-responsive-sm text-bathhouse-slate">Minutes</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-heading text-bathhouse-teal">80-90°C</div>
                    <div className="text-responsive-sm text-bathhouse-slate">Temperature</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="aufguss-ritual" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {aufgussContent.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-bathhouse-slate mb-6">
                {aufgussContent.title}
              </h2>
            )}
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div 
                className="prose prose-lg max-w-none prose-gray"
                dangerouslySetInnerHTML={{ __html: aufgussContent.content }} 
              />
            </div>
            
            {aufgussContent.image_url && (
              <div className="relative">
                <Image
                  src={aufgussContent.image_url}
                  alt={aufgussContent.image_alt || "Aufguss Ritual"}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
