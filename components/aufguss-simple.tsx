export default function AufgussSimple() {
  const icons = [
    {
      icon: "/icons/sauna.png",
      title: "Steam",
      description: "Carefully controlled heat and humidity"
    },
    {
      icon: "/icons/exhale.png",
      title: "Aromatherapy",
      description: "Essential oils chosen for their therapeutic properties"
    },
    {
      icon: "/icons/aufguss.png",
      title: "Curated Music",
      description: "Soundscapes that guide the journey"
    },
    {
      icon: "/icons/breathwork.png",
      title: "Towel Work",
      description: "Choreographed movements that distribute heat"
    },
    {
      icon: "/icons/lounge.png",
      title: "Mindful Guidance",
      description: "The presence and expertise of a master"
    }
  ]

  const benefits = [
    {
      icon: "/icons/hot-plunge.png",
      title: "Deep Detoxification"
    },
    {
      icon: "/icons/cold-plunge.png",
      title: "Improved Circulation"
    },
    {
      icon: "/icons/compression.png",
      title: "Calm & Clarity"
    },
    {
      icon: "/icons/exhale.png",
      title: "Mindful Presence"
    }
  ]

  return (
    <>
      {/* Aufguss Icons Section */}
      <section className="bathhouse-section bg-bathhouse-stone">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">The Aufguss Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {icons.map((item, index) => (
              <div key={index} className="text-center">
                <img src={item.icon} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="bathhouse-subheading text-lg font-medium mb-2 text-bathhouse-black">{item.title}</h3>
                <p className="text-sm text-bathhouse-slate">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aufguss Benefits Section */}
      <section className="bathhouse-section bg-white">
        <div className="bathhouse-container">
          <h2 className="bathhouse-heading text-4xl md:text-5xl text-center mb-12 text-bathhouse-black">Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white border-2 border-bathhouse-stone w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <img src={benefit.icon} alt={benefit.title} className="w-12 h-12" />
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