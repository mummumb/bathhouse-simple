export default function PreparationSection() {
  const preparations = [
    {
      icon: "/icons/cold-plunge.png",
      title: "Shower before entering",
      description: "Cleanse your body to prepare for the ritual"
    },
    {
      icon: "/icons/lounge.png",
      title: "Use a towel",
      description: "Always sit on a clean towel in the sauna"
    },
    {
      icon: "/icons/breathwork.png",
      title: "Bare feet",
      description: "Remove shoes and socks for the authentic experience"
    },
    {
      icon: "/icons/hot-plunge.png",
      title: "Hydrate before & after",
      description: "Drink plenty of water to support your body"
    }
  ]

  const stats = [
    {
      value: "15-20",
      label: "Minutes"
    },
    {
      value: "80-90°C",
      label: "Temperature"
    }
  ]

  return (
    <section className="bathhouse-section bg-white">
      <div className="bathhouse-container">
        <div className="text-center mb-12">
          <h2 className="bathhouse-heading text-4xl md:text-5xl mb-6 text-bathhouse-black">
            How to Prepare for an Aufguss Experience
          </h2>
          <p className="text-lg text-bathhouse-slate max-w-3xl mx-auto">
            A gentle guide to help you feel comfortable and prepared for your ritual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {preparations.map((item, index) => (
            <div key={index} className="bg-bathhouse-stone/20 rounded-lg p-8 text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img src={item.icon} alt={item.title} className="w-12 h-12" />
              </div>
              <h3 className="bathhouse-subheading text-lg font-medium mb-3 text-bathhouse-black">
                {item.title}
              </h3>
              <p className="text-bathhouse-slate text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-bathhouse-stone/20 rounded-lg px-12 py-8 text-center">
              <p className="bathhouse-heading text-3xl md:text-4xl mb-2 text-bathhouse-black">
                {stat.value}
              </p>
              <p className="text-bathhouse-slate">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}