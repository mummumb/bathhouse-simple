import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Users, Sparkles, Heart } from "lucide-react"
import { getMappedImageUrl } from "@/lib/image-utils"
import { IMAGE_URLS } from "@/lib/constants/images"

const services = [
  {
    id: "aufguss",
    title: "Aufguss Ceremony",
    duration: "45 minutes",
    price: 65,
    description: "Experience our signature towel-waving ritual where skilled masters choreograph heat, essential oils, and airflow to create an immersive sensory journey.",
    features: ["Essential oil infusions", "Expert towel techniques", "Guided breathing", "Group experience"],
    image: IMAGE_URLS.services.aufguss,
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: "sound-bath",
    title: "Sound Bath Session",
    duration: "60 minutes",
    price: 75,
    description: "Immerse yourself in healing frequencies from crystal bowls, gongs, and other resonant instruments designed to induce deep relaxation and meditation.",
    features: ["Crystal bowl therapy", "Tibetan singing bowls", "Guided meditation", "Private sessions available"],
    image: IMAGE_URLS.services.soundBath,
    icon: <Heart className="w-6 h-6" />
  },
  {
    id: "private-sauna",
    title: "Private Sauna",
    duration: "2 hours",
    price: 150,
    description: "Reserve our premium sauna facilities for an intimate wellness experience. Perfect for couples or small groups seeking privacy and tranquility.",
    features: ["Exclusive facility access", "Temperature control", "Aromatherapy options", "Complimentary refreshments"],
    image: IMAGE_URLS.services.privateSauna,
    icon: <Users className="w-6 h-6" />
  },
  {
    id: "wellness-day",
    title: "Full Wellness Day",
    duration: "Full day",
    price: 250,
    description: "Indulge in a complete day of restoration with unlimited access to all facilities, classes, and treatments. Your journey to complete wellness starts here.",
    features: ["All facility access", "Group classes included", "Lunch included", "Priority booking"],
    image: IMAGE_URLS.services.wellnessDay,
    icon: <Clock className="w-6 h-6" />
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="bathhouse-section bg-bathhouse-cream">
      <div className="bathhouse-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-6 text-bathhouse-black">
            Our Services
          </h2>
          <p className="text-responsive-lg text-bathhouse-slate max-w-3xl mx-auto">
            From traditional ceremonies to modern wellness practices, discover transformative experiences 
            designed to restore balance and nurture your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src={getMappedImageUrl(service.image)}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-lg font-heading text-bathhouse-teal">${service.price}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-bathhouse-teal">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-heading text-bathhouse-black">{service.title}</h3>
                      <p className="text-sm text-bathhouse-slate flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-bathhouse-slate mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-bathhouse-slate">
                      <div className="w-1.5 h-1.5 bg-bathhouse-peach rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Link href={`/p/book?service=${service.id}`}>
                  <Button className="bathhouse-btn-primary w-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-bathhouse-slate mb-6">
            Looking for something specific? We offer customized wellness experiences.
          </p>
          <Link href="/p/contact">
            <Button variant="outline" className="bathhouse-btn-secondary">
              Contact Us for Custom Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}