import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEventBySlug } from "@/lib/data-utils"
import Link from "next/link"

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const event = await getEventBySlug(slug)

    if (!event) {
      notFound()
    }

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4">
        <Card className="w-full border-none shadow-lg bg-bathhouse-cream">
          {event.image && (
            <div className="relative h-96 w-full overflow-hidden rounded-t-lg">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-4xl font-heading text-bathhouse-black">{event.title}</CardTitle>
            <CardDescription className="text-lg text-bathhouse-slate">{event.difficulty}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading text-xl mb-2 text-bathhouse-black">Details</h3>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
              </div>
              <div className="space-y-3">
                <p className="text-bathhouse-slate">
                  <span className="font-heading text-bathhouse-black">Date:</span> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-bathhouse-slate">
                  <span className="font-heading text-bathhouse-black">Time:</span> {event.time}
                </p>
                <p className="text-bathhouse-slate">
                  <span className="font-heading text-bathhouse-black">Location:</span> {event.location}
                </p>
                <p className="text-bathhouse-slate">
                  <span className="font-heading text-bathhouse-black">Price:</span> ${event.price}
                </p>
                <p className="text-bathhouse-slate">
                  <span className="font-heading text-bathhouse-black">Capacity:</span> {event.capacity}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="lg" asChild className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                <Link href={`/events/${event.slug}/book`}>Book Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
  } catch (error) {
    console.error('Error loading event:', error)
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-heading text-bathhouse-black mb-4">Error Loading Event</h1>
            <p className="text-bathhouse-slate mb-8">We're having trouble loading this event. Please try again later.</p>
            <Link href="/events" className="button-primary">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
