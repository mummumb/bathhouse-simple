import type { PageContent } from "@/lib/types"
import ManagedContent from "./managed-content"

export default function CommunityTestimonialsSection({ content }: { content: PageContent[] | null }) {
  return (
    <section id="testimonials" className="bg-bathhouse-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading text-bathhouse-black text-center mb-12">What Our Community Says</h2>
        {content && content.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.map((testimonial) => (
              <div key={testimonial.id} className="bg-bathhouse-cream p-8 rounded-lg">
                <div 
                  className="text-bathhouse-slate mb-4 italic"
                  dangerouslySetInnerHTML={{ __html: testimonial.content }} 
                />
                {testimonial.title && (
                  <p className="font-heading text-bathhouse-black">— {testimonial.title}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-bathhouse-cream p-8 rounded-lg">
              <p className="text-bathhouse-slate mb-4 italic">
                "The Aufguss ritual at Bathhouse Studio completely transformed my understanding of wellness. 
                It's not just a sauna experience—it's a journey."
              </p>
              <p className="font-heading text-bathhouse-black">— Sarah M.</p>
            </div>
            <div className="bg-bathhouse-cream p-8 rounded-lg">
              <p className="text-bathhouse-slate mb-4 italic">
                "I've never felt more connected to a wellness community. The rituals here are profound and 
                the atmosphere is incredibly nurturing."
              </p>
              <p className="font-heading text-bathhouse-black">— Michael K.</p>
            </div>
            <div className="bg-bathhouse-cream p-8 rounded-lg">
              <p className="text-bathhouse-slate mb-4 italic">
                "Every visit feels like a reset for my mind and body. The team's expertise and care make 
                all the difference."
              </p>
              <p className="font-heading text-bathhouse-black">— Emma L.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
