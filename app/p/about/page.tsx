import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, Leaf, Shield } from "lucide-react"
import { getMappedImageUrl } from "@/lib/image-utils"

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Wellness First",
      description: "We prioritize holistic health through authentic practices that nurture body, mind, and spirit."
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Building meaningful relationships through shared experiences in our warm, welcoming space."
    },
    {
      icon: Leaf,
      title: "Natural Harmony",
      description: "Embracing sustainable practices and natural elements in every aspect of our sanctuary."
    },
    {
      icon: Shield,
      title: "Safe Space",
      description: "Creating an inclusive environment where everyone feels respected, valued, and comfortable."
    }
  ]

  const team = [
    {
      name: "Sarah Martinez",
      role: "Founder & Head of Wellness",
      bio: "With over 15 years of experience in holistic health practices, Sarah brings authentic Finnish sauna traditions to modern wellness seekers.",
      image: "/images/team/sarah.jpg"
    },
    {
      name: "James Chen",
      role: "Lead Aufgussmeister",
      bio: "Certified in traditional Aufguss techniques from Germany, James creates transformative heat experiences that engage all the senses.",
      image: "/images/team/james.jpg"
    },
    {
      name: "Emma Wilson",
      role: "Community Manager",
      bio: "Emma ensures every member feels at home, organizing events and workshops that foster connection and growth.",
      image: "/images/team/emma.jpg"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-bathhouse-cream">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">
              About Bathhouse Studio
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              A sanctuary for wellness seekers, bringing authentic sauna traditions to modern life
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-bathhouse-slate">
            <p>
              Founded in 2020, Bathhouse Studio emerged from a simple vision: to create a space where ancient wellness traditions meet contemporary community needs. Our founders, inspired by transformative experiences in Finnish saunas and European bathhouses, recognized the profound impact these practices could have on modern urban life.
            </p>
            <p>
              What began as a small sauna space has evolved into a comprehensive wellness sanctuary. We've carefully curated each element of our studio to honor traditional practices while making them accessible and relevant to today's wellness seekers. From our authentic Aufguss ceremonies to our innovative sound bath sessions, every experience is designed to promote deep relaxation and genuine connection.
            </p>
            <p>
              Today, Bathhouse Studio serves as a gathering place for those seeking respite from the demands of daily life. Our community has grown to include wellness practitioners, busy professionals, artists, and anyone drawn to the transformative power of heat, cold, and mindful practice.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-bathhouse-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-bathhouse-teal" />
                </div>
                <h3 className="text-xl font-heading text-bathhouse-black mb-2">
                  {value.title}
                </h3>
                <p className="text-bathhouse-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-bathhouse-stone">
                  <Image
                    src={getMappedImageUrl(member.image)}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-heading text-bathhouse-black mb-1">
                  {member.name}
                </h3>
                <p className="text-bathhouse-teal mb-3">{member.role}</p>
                <p className="text-bathhouse-slate">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-bathhouse-slate text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading mb-8">
            Our Mission
          </h2>
          <p className="text-xl mb-8 text-white/90">
            To create transformative wellness experiences that honor traditional practices while fostering modern community connections. We believe in the power of heat, cold, and mindful practice to restore balance, promote healing, and build meaningful relationships.
          </p>
          <Link href="/p/contact">
            <Button className="bg-white text-bathhouse-slate hover:bg-bathhouse-cream">
              Join Our Community
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading text-bathhouse-black mb-4">
            Experience the Difference
          </h2>
          <p className="text-xl text-bathhouse-slate mb-8 max-w-2xl mx-auto">
            Ready to begin your wellness journey? Book your first visit and discover why our community keeps coming back.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/rituals">
              <Button className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                Explore Rituals
              </Button>
            </Link>
            <Link href="/p/book">
              <Button variant="outline" className="border-bathhouse-teal text-bathhouse-teal hover:bg-bathhouse-teal hover:text-white">
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}