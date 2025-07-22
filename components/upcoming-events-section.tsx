import type { Event } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getMappedImageUrl } from "@/lib/image-utils"

export default function UpcomingEventsSection({ events = [] }: { events?: Event[] }) {
  // Safely filter events with null checks
  const upcomingEvents = (events || [])
    .filter((event) => event && event.date && new Date(event.date) >= new Date())
    .slice(0, 3)

  return (
    <section id="upcoming-events" className="py-12 md:py-24 bg-bathhouse-stone">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-12">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-bathhouse-cream rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-bathhouse-stone">
                  <Image
                    src={getMappedImageUrl(event.image)}
                    alt={event.title || "Event"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading text-bathhouse-black mb-2">{event.title}</h3>
                  <p className="text-bathhouse-teal text-sm mb-3">
                    {event.date ? new Date(event.date).toLocaleDateString() : "Date TBD"}
                  </p>
                  <p className="text-bathhouse-slate text-sm mb-4 line-clamp-3">{event.description}</p>
                  <Button asChild className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                    <Link href={`/events/${event.slug}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-bathhouse-slate">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}
