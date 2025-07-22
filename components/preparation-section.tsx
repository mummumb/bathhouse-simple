export default function PreparationSection() {
  const benefits = [
    {
      title: "Deep Detoxification",
      description: "Enhanced sweating promotes the elimination of toxins and metabolic waste"
    },
    {
      title: "Improved Circulation",
      description: "Heat therapy dilates blood vessels, improving oxygen and nutrient delivery"
    },
    {
      title: "Stress Relief",
      description: "The ritual creates a meditative state that calms the nervous system"
    },
    {
      title: "Enhanced Recovery",
      description: "Alternating heat and cold accelerates muscle recovery and reduces inflammation"
    },
    {
      title: "Better Sleep",
      description: "Regular sauna use helps regulate circadian rhythms and improve sleep quality"
    },
    {
      title: "Community Connection",
      description: "Shared rituals foster meaningful connections and social wellbeing"
    }
  ]

  return (
    <section className="bathhouse-section bg-bathhouse-cream">
      <div className="bathhouse-container">
        <div className="text-center mb-12">
          <h2 className="bathhouse-heading text-4xl md:text-5xl mb-6 text-bathhouse-black">
            Benefits
          </h2>
          <p className="text-lg text-bathhouse-slate max-w-3xl mx-auto">
            Experience the transformative power of traditional sauna rituals for body and mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <h3 className="bathhouse-subheading text-xl font-medium mb-3 text-bathhouse-black">
                {benefit.title}
              </h3>
              <p className="text-bathhouse-slate leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}