import { Droplets, Wind, Music, Waves, Brain, Sparkles, Heart, Zap, Eye } from "lucide-react"

export default function AufgussSimple() {
  const icons = [
    {
      icon: <Wind className="w-12 h-12 mx-auto mb-4 text-bathhouse-black" />,
      title: "Steam",
      description: "Carefully controlled heat and humidity"
    },
    {
      icon: <Droplets className="w-12 h-12 mx-auto mb-4 text-bathhouse-black" />,
      title: "Aromatherapy",
      description: "Essential oils chosen for their therapeutic properties"
    },
    {
      icon: <Music className="w-12 h-12 mx-auto mb-4 text-bathhouse-black" />,
      title: "Curated Music",
      description: "Soundscapes that guide the journey"
    },
    {
      icon: <Waves className="w-12 h-12 mx-auto mb-4 text-bathhouse-black" />,
      title: "Towel Work",
      description: "Choreographed movements that distribute heat"
    },
    {
      icon: <Brain className="w-12 h-12 mx-auto mb-4 text-bathhouse-black" />,
      title: "Mindful Guidance",
      description: "The presence and expertise of a master"
    }
  ]

  const benefits = [
    {
      icon: <Sparkles className="w-8 h-8 text-bathhouse-black" />,
      title: "Deep Detoxification"
    },
    {
      icon: <Heart className="w-8 h-8 text-bathhouse-black" />,
      title: "Improved Circulation"
    },
    {
      icon: <Zap className="w-8 h-8 text-bathhouse-black" />,
      title: "Calm & Clarity"
    },
    {
      icon: <Eye className="w-8 h-8 text-bathhouse-black" />,
      title: "Mindful Presence"
    }
  ]

  return (
    <>
      {/* Aufguss Icons Section */}
      <section className="bathhouse-section bg-white">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">The Aufguss Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {icons.map((item, index) => (
              <div key={index} className="text-center">
                {item.icon}
                <h3 className="bathhouse-subheading text-lg font-medium mb-2 text-bathhouse-black">{item.title}</h3>
                <p className="text-sm text-bathhouse-slate">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aufguss Benefits Section */}
      <section className="bathhouse-section bg-bathhouse-cream">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-bathhouse-cream border border-bathhouse-stone w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="bathhouse-subheading text-lg font-medium text-bathhouse-black">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}