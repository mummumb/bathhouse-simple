import { Droplets, Wind, Music, Waves, Brain } from "lucide-react"

export default function AufgussSimple() {
  const icons = [
    {
      icon: <Wind className="w-12 h-12 mx-auto mb-4 text-bathhouse-teal" />,
      title: "Steam",
      description: "Carefully controlled heat and humidity"
    },
    {
      icon: <Droplets className="w-12 h-12 mx-auto mb-4 text-bathhouse-teal" />,
      title: "Aromatherapy",
      description: "Essential oils chosen for their therapeutic properties"
    },
    {
      icon: <Music className="w-12 h-12 mx-auto mb-4 text-bathhouse-teal" />,
      title: "Curated Music",
      description: "Soundscapes that guide the journey"
    },
    {
      icon: <Waves className="w-12 h-12 mx-auto mb-4 text-bathhouse-teal" />,
      title: "Towel Work",
      description: "Choreographed movements that distribute heat"
    },
    {
      icon: <Brain className="w-12 h-12 mx-auto mb-4 text-bathhouse-teal" />,
      title: "Mindful Guidance",
      description: "The presence and expertise of a master"
    }
  ]

  const benefits = [
    "Deep Detoxification",
    "Improved Circulation",
    "Calm & Clarity",
    "Mindful Presence"
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
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">Aufguss Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-bathhouse-teal rounded-full mt-2 mr-4 flex-shrink-0" />
                <p className="text-lg text-bathhouse-slate">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}