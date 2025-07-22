const values = [
  {
    icon: "/icons/lounge.png",
    title: "Inclusive by Design",
    description: "Every ritual is crafted to welcome and support, regardless of experience level.",
  },
  {
    icon: "/icons/aufguss.png",
    title: "Authentic Tradition",
    description: "Honoring ancient practices while embracing contemporary accessibility.",
  },
  {
    icon: "/icons/breathwork.png",
    title: "Mindful Presence",
    description: "Creating spaces for genuine connection with yourself and others.",
  },
  {
    icon: "/icons/sauna.png",
    title: "Expert Guidance",
    description: "Led by certified masters with deep knowledge and compassionate approach.",
  },
]

export default function ValuesSimple() {
  return (
    <section className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="bathhouse-heading text-4xl md:text-5xl mb-6 text-bathhouse-black">Our Promise</h2>
          <p className="text-xl text-bathhouse-black max-w-3xl mx-auto bathhouse-text-balance">
            Rituals that welcome everyone. Every session is designed to support, nurture, and include—no experience
            required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="bg-bathhouse-stone rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img src={value.icon} alt={value.title} className="w-12 h-12" />
              </div>
              <h3 className="bathhouse-subheading text-lg font-medium mb-3 text-bathhouse-black">{value.title}</h3>
              <p className="text-bathhouse-slate text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}