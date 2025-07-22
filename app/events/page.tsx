import { getEvents } from "@/lib/data-utils"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { getMappedImageUrl } from "@/lib/image-utils"

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const events = await getEvents()
  
  // Separate upcoming and past events
  const now = new Date()
  const upcomingEvents = events.filter(event => new Date(event.date) >= now)
  const pastEvents = events.filter(event => new Date(event.date) < now)

  return (
    <main className="min-h-screen bg-bathhouse-cream">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-bathhouse-black mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl md:text-2xl text-bathhouse-slate max-w-3xl mx-auto">
            Join our community gatherings, workshops, and special ceremonies
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading text-bathhouse-black mb-8">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full group">
                    <div className="relative h-48 bg-bathhouse-stone">
                      <Image
                        src={getMappedImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-bathhouse-teal text-white px-3 py-1 rounded-full text-sm">
                        ${event.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading text-bathhouse-black mb-3">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-bathhouse-slate">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('en-AU', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center text-sm text-bathhouse-slate">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-bathhouse-slate">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-bathhouse-slate">
                          <Users className="w-4 h-4 mr-2" />
                          {event.capacity} spots available
                        </div>
                      </div>
                      
                      <p className="text-bathhouse-slate mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <Button className="w-full bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Upcoming Events */}
      {upcomingEvents.length === 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-heading text-bathhouse-black mb-4">
              No upcoming events at the moment
            </h2>
            <p className="text-bathhouse-slate mb-8">
              Check back soon or join our newsletter to be notified of new events.
            </p>
            <Link href="/p/contact">
              <Button className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                Get Notified
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading text-bathhouse-black mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.slice(0, 6).map((event) => (
                <div key={event.id} className="opacity-75">
                  <div className="bg-bathhouse-cream rounded-lg p-6">
                    <h3 className="text-lg font-heading text-bathhouse-black mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-bathhouse-slate">
                      {new Date(event.date).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-bathhouse-slate text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join our community to receive updates on upcoming events, workshops, and wellness tips.
          </p>
          <Link href="/p/contact">
            <Button className="bg-white text-bathhouse-slate hover:bg-bathhouse-cream">
              Join Our Community
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}