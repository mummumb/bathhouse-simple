export default function ProcessJourney() {
  const steps = [
    {
      icon: "/icons/arrow.png",
      title: "Arrival",
      description: "Begin with intention. Settle in and prepare mind and body for the journey ahead."
    },
    {
      icon: "/icons/sauna.png",
      title: "Heat",
      description: "Enter the sauna chamber. Let the warmth envelope you as the ritual begins."
    },
    {
      icon: "/icons/aufguss.png",
      title: "Aufguss",
      description: "Experience the multi-sensory journey guided by our certified sauna master."
    },
    {
      icon: "/icons/cold-plunge.png",
      title: "Cool",
      description: "Refresh and invigorate with cold therapy, bringing balance to your system."
    },
    {
      icon: "/icons/lounge.png",
      title: "Rest",
      description: "Integration time. Allow your body and mind to absorb the benefits."
    }
  ]

  return (
    <section className="bathhouse-section bg-bathhouse-slate">
      <div className="bathhouse-container">
        <div className="text-center mb-16">
          <h2 className="bathhouse-heading text-4xl md:text-5xl mb-6 text-white">Your Journey</h2>
          <p className="text-xl text-bathhouse-cream max-w-3xl mx-auto">
            Each session follows a thoughtfully crafted sequence designed to maximize benefits and ensure safety for all experience levels.
          </p>
        </div>

        <div className="relative">
          {/* Desktop: Horizontal timeline */}
          <div className="hidden lg:block">
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-bathhouse-cream/30"></div>
            <div className="grid grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-bathhouse-teal rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <img src={step.icon} alt={step.title} className="w-12 h-12 filter brightness-0 invert" />
                  </div>
                  <h3 className="bathhouse-subheading text-lg font-medium mb-3 text-white">{step.title}</h3>
                  <p className="text-bathhouse-cream/80 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-bathhouse-teal rounded-full w-16 h-16 flex items-center justify-center">
                    <img src={step.icon} alt={step.title} className="w-10 h-10 filter brightness-0 invert" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-20 bg-bathhouse-cream/30 mx-auto mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="bathhouse-subheading text-lg font-medium mb-2 text-white">{step.title}</h3>
                  <p className="text-bathhouse-cream/80 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}