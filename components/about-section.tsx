import { getPageContent } from "@/lib/data-utils"
import type { PageContent } from "@/lib/types"
import ManagedContent from "./managed-content"

export default async function AboutSection() {
  const aboutContent: PageContent[] = await getPageContent("about")

  return (
    <section id="about" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {aboutContent && aboutContent.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {aboutContent.map((content) => (
              <div key={content.id} className="mb-8">
                {content.title && (
                  <h2 className="text-3xl font-heading text-bathhouse-black text-center mb-8">{content.title}</h2>
                )}
                <div
                  className="prose prose-lg max-w-none mx-auto"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-bathhouse-black text-center mb-8">About Bathhouse Studio</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-responsive-lg text-bathhouse-slate leading-relaxed">
                  Welcome to Bathhouse Studio, where ancient wellness traditions meet modern mindfulness. Our sanctuary
                  offers a transformative journey through the healing power of heat, cold, and breath.
                </p>
                <p className="text-bathhouse-slate leading-relaxed">
                  Founded on the principles of holistic wellness, we provide a space for deep relaxation, community
                  connection, and personal transformation through traditional sauna rituals and mindful practices.
                </p>
              </div>
              <div className="relative h-96 bg-bathhouse-stone rounded-lg">
                <img
                  src="/images/bathhouse-interior.jpg"
                  alt="Bathhouse Studio Interior"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
