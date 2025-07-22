import { ShowerHead, Shirt, Footprints, Droplets } from "lucide-react"
import { getPageContent } from "@/lib/data-utils"

// Icon mapping
const iconMap = {
  shower: ShowerHead,
  towel: Shirt,
  barefoot: Footprints,
  hydrate: Droplets
}

// Fallback data if database fetch fails
const fallbackData = {
  title: "How to Prepare for an Aufguss Experience",
  subtitle: "A gentle guide to help you feel comfortable and prepared for your ritual.",
  steps: [
    {
      icon: "shower",
      title: "Shower before entering",
      description: "Cleanse your body to prepare for the ritual"
    },
    {
      icon: "towel",
      title: "Use a towel",
      description: "Always sit on a clean towel in the sauna"
    },
    {
      icon: "barefoot",
      title: "Bare feet",
      description: "Remove shoes and socks for the authentic experience"
    },
    {
      icon: "hydrate",
      title: "Hydrate before & after",
      description: "Drink plenty of water to support your body"
    }
  ],
  duration: {
    time: "15-20",
    unit: "Minutes"
  },
  temperature: {
    degrees: "80-90°C",
    unit: "Temperature"
  }
}

export default async function HowToPrepareSection() {
  let prepData = fallbackData
  
  try {
    const content = await getPageContent("aufguss_preparation")
    
    if (content && content.length > 0 && content[0].content) {
      const contentStr = content[0].content
      if (typeof contentStr === 'string' && (contentStr.trim().startsWith('{') || contentStr.trim().startsWith('['))) {
        try {
          const parsedContent = JSON.parse(contentStr)
          prepData = { ...fallbackData, ...parsedContent }
        } catch (e) {
          console.error("Failed to parse preparation content:", e)
        }
      }
    }
  } catch (error) {
    console.error("Error fetching preparation content:", error)
  }
  return (
    <section className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-6 text-bathhouse-black">
            {prepData.title}
          </h2>
          <p className="text-responsive-lg text-bathhouse-slate max-w-2xl mx-auto">
            {prepData.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {prepData.steps.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || ShowerHead
            return (
              <div key={index} className="bg-bathhouse-cream rounded-lg p-6 text-center">
                <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <Icon className="h-8 w-8 text-bathhouse-slate" />
                </div>
                <h3 className="font-heading text-lg md:text-xl mb-2 text-bathhouse-black">
                  {item.title}
                </h3>
                <p className="text-responsive-sm text-bathhouse-slate">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Duration and Temperature info */}
        <div className="flex justify-center gap-8 md:gap-16">
          <div className="bg-bathhouse-cream rounded-lg px-8 py-6 text-center">
            <div className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-1">
              {prepData.duration.time}
            </div>
            <div className="text-sm text-bathhouse-slate">{prepData.duration.unit}</div>
          </div>
          <div className="bg-bathhouse-cream rounded-lg px-8 py-6 text-center">
            <div className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-1">
              {prepData.temperature.degrees}
            </div>
            <div className="text-sm text-bathhouse-slate">{prepData.temperature.unit}</div>
          </div>
        </div>
      </div>
    </section>
  )
}