import { getPageContent } from "@/lib/data-utils"
import type { PageContent } from "@/lib/types"

// Icon components for the values
const IconSteam = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M8 17c0 1.657 2.686 3 6 3s6-1.343 6-3M8 17c0-1.657 2.686-3 6-3s6 1.343 6 3M8 17v-4c0-1.657 2.686-3 6-3s6 1.343 6 3v4M12 5v6" />
  </svg>
)

const IconAromatherapy = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M7 21h10M12 3v5m0 0l3-3m-3 3l-3-3m3 8c0 2.5-2 6-2 6s-2-3.5-2-6c0-1.657 1.343-3 3-3s3 1.343 3 3z" />
  </svg>
)

const IconMusic = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
)

const IconTowel = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a6 6 0 00-2-4l-2-2m-5 12h8m-8 0v-5m0 0V8a2 2 0 012-2h2" />
  </svg>
)

const IconHeart = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

// Benefit icons
const IconDetox = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const IconCirculation = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const IconClarity = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const IconPresence = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

interface ValuesData {
  title: string
  description: string
  elements: Array<{
    icon: string
    label: string
    description: string
  }>
  benefits: Array<{
    icon: string
    label: string
  }>
  quote?: {
    text: string
    author: string
  }
}

export default async function ValuesSection({ content }: { content?: PageContent[] | null }) {
  if (!content) {
    const valuesContent = await getPageContent("values")
    content = valuesContent
  }

  // Parse the content if it exists and is structured
  let valuesData: ValuesData | null = null
  
  if (content && content.length > 0 && content[0].content) {
    try {
      // Check if content is already parsed or needs parsing
      let contentData = content[0].content
      
      // If it's a string, check if it looks like JSON before parsing
      if (typeof contentData === 'string') {
        // Check if the string starts with { or [ (JSON) or < (HTML)
        const trimmedContent = contentData.trim()
        if (trimmedContent.startsWith('{') || trimmedContent.startsWith('[')) {
          try {
            contentData = JSON.parse(contentData)
          } catch (parseError) {
            // If JSON parsing fails, keep it as string (HTML)
            console.log('Content appears to be JSON but failed to parse, treating as HTML')
          }
        } else {
          // Content is HTML, keep as string
          console.log('Content is HTML, not attempting JSON parse')
        }
      }
      
      // Check if we have structured data with elements
      if (contentData && typeof contentData === 'object' && 'elements' in contentData) {
        valuesData = contentData as ValuesData
      } else if (contentData && typeof contentData === 'object' && 'values' in contentData) {
        // Handle case where the data has a 'values' property instead of 'elements'
        valuesData = {
          title: contentData.title || 'Our Values',
          description: contentData.description || '',
          elements: contentData.values || [],
          benefits: contentData.benefits || []
        }
      }
    } catch (e) {
      console.error('Failed to parse values content as structured data:', e)
    }
  }

  // Icon mapping for dynamic rendering
  const iconComponents: { [key: string]: React.ComponentType } = {
    steam: IconSteam,
    aromatherapy: IconAromatherapy,
    music: IconMusic,
    towel: IconTowel,
    heart: IconHeart,
    detox: IconDetox,
    circulation: IconCirculation,
    clarity: IconClarity,
    presence: IconPresence
  }

  // If we have structured data, render the new design
  if (valuesData) {
    return (
      <section id="values" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title and Description */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading text-bathhouse-slate mb-6">
                {valuesData.title}
              </h2>
              <p className="text-lg text-bathhouse-slate max-w-3xl mx-auto leading-relaxed">
                {valuesData.description}
              </p>
            </div>

            {/* Elements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
              {valuesData.elements.map((element, index) => {
                const IconComponent = iconComponents[element.icon] || IconHeart
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-bathhouse-cream rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent />
                    </div>
                    <h3 className="text-base font-medium text-bathhouse-slate mb-2">
                      {element.label}
                    </h3>
                    <p className="text-sm text-bathhouse-slate/80">
                      {element.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Benefits Section */}
            {valuesData.benefits && valuesData.benefits.length > 0 && (
              <div className="bg-bathhouse-cream rounded-2xl p-8 md:p-12 mb-16">
                <h3 className="text-center text-2xl font-heading text-bathhouse-slate mb-8">Benefits</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {valuesData.benefits.map((benefit, index) => {
                    const BenefitIcon = iconComponents[benefit.icon] || IconHeart
                    return (
                      <div key={index} className="bg-white rounded-lg px-4 py-3 flex items-center space-x-3">
                        <BenefitIcon />
                        <span className="text-sm font-medium text-bathhouse-slate">
                          {benefit.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quote */}
            {valuesData.quote && (
              <div className="text-center">
                <blockquote className="text-xl md:text-2xl font-light text-bathhouse-slate italic mb-4">
                  "{valuesData.quote.text}"
                </blockquote>
                <cite className="text-base text-bathhouse-slate/80 not-italic">
                  — {valuesData.quote.author}
                </cite>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Fallback: if content exists but isn't structured, render as HTML
  if (content && content.length > 0) {
    return (
      <section id="values" className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {content.map((item) => (
                <div key={item.id} className="text-center">
                  {item.title && (
                    <h2 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-6">{item.title}</h2>
                  )}
                  <div 
                    className="prose prose-lg max-w-none mx-auto mb-12"
                    dangerouslySetInnerHTML={{ __html: item.content }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default fallback content
  return (
    <section id="values" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading text-bathhouse-black mb-6">Our Core Values</h2>
            <p className="text-responsive-lg text-bathhouse-slate max-w-3xl mx-auto">
              These fundamental principles guide everything we do at Bathhouse Studio, shaping our approach to
              wellness, community, and personal transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bathhouse-stone rounded-full flex items-center justify-center mx-auto mb-6">
                <IconHeart />
              </div>
              <h3 className="text-xl md:text-2xl font-heading text-bathhouse-black mb-4">Integrity</h3>
              <p className="text-bathhouse-slate">
                We uphold the highest standards of integrity in all our actions, creating a foundation of trust and
                authenticity in our community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bathhouse-peach rounded-full flex items-center justify-center mx-auto mb-6">
                <IconPresence />
              </div>
              <h3 className="text-xl md:text-2xl font-heading text-bathhouse-black mb-4">Innovation</h3>
              <p className="text-bathhouse-slate">
                We embrace innovation and constantly seek new and better ways to serve our clients, blending ancient
                wisdom with modern approaches.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bathhouse-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <IconCirculation />
              </div>
              <h3 className="text-xl md:text-2xl font-heading text-bathhouse-black mb-4">Collaboration</h3>
              <p className="text-bathhouse-slate">
                We believe in the power of collaboration and teamwork to achieve common goals, fostering a supportive
                and inclusive community environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}