const values = [
  {
    title: "Inclusive by Design",
    description: "Every ritual is crafted to welcome and support, regardless of experience level.",
  },
  {
    title: "Authentic Tradition",
    description: "Honoring ancient practices while embracing contemporary accessibility.",
  },
  {
    title: "Mindful Presence",
    description: "Creating spaces for genuine connection with yourself and others.",
  },
  {
    title: "Expert Guidance",
    description: "Led by certified masters with deep knowledge and compassionate approach.",
  },
]

export default function ValuesSimple() {
  return (
    <section className="bathhouse-section bg-bathhouse-cream">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="bathhouse-heading text-4xl md:text-5xl mb-6 text-bathhouse-black">Our Promise</h2>
          <p className="text-xl text-bathhouse-slate max-w-3xl mx-auto bathhouse-text-balance">
            Rituals that welcome everyone. Every session is designed to support, nurture, and include—no experience
            required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h3 className="bathhouse-subheading text-lg font-medium mb-3 text-bathhouse-black">{value.title}</h3>
              <p className="text-bathhouse-slate text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}