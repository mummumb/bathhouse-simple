import { notFound } from "next/navigation"
import { getEventBySlug } from "@/lib/data-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Calendar, Clock, MapPin, CreditCard } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function EventBookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  try {
    const event = await getEventBySlug(slug)

    if (!event) {
      notFound()
    }

    return (
      <div className="bg-bathhouse-cream min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Event Summary */}
            <Card className="mb-8 border-none shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-bathhouse-black">Booking: {event.title}</CardTitle>
                <CardDescription className="text-bathhouse-slate">
                  Complete your booking for this transformative experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-bathhouse-slate">
                    <Calendar className="w-4 h-4 mr-2 text-bathhouse-teal" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-bathhouse-slate">
                    <Clock className="w-4 h-4 mr-2 text-bathhouse-teal" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-bathhouse-slate">
                    <MapPin className="w-4 h-4 mr-2 text-bathhouse-teal" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-bathhouse-slate">
                    <CreditCard className="w-4 h-4 mr-2 text-bathhouse-teal" />
                    <span className="font-semibold">${event.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="border-none shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-bathhouse-black">Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-bathhouse-black">First Name *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        required 
                        className="border-bathhouse-stone focus:border-bathhouse-teal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-bathhouse-black">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        required 
                        className="border-bathhouse-stone focus:border-bathhouse-teal"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-bathhouse-black">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      className="border-bathhouse-stone focus:border-bathhouse-teal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-bathhouse-black">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      className="border-bathhouse-stone focus:border-bathhouse-teal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-bathhouse-black">Previous Experience</Label>
                    <Textarea 
                      id="experience" 
                      name="experience" 
                      placeholder="Have you attended similar events before? Any health considerations we should know about?"
                      className="border-bathhouse-stone focus:border-bathhouse-teal min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-bathhouse-black">Number of Guests *</Label>
                    <Input 
                      id="guests" 
                      name="guests" 
                      type="number" 
                      min="1" 
                      max={event.capacity} 
                      defaultValue="1" 
                      required 
                      className="border-bathhouse-stone focus:border-bathhouse-teal"
                    />
                    <p className="text-sm text-bathhouse-slate">
                      {event.capacity} spots available
                    </p>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-heading text-bathhouse-black">Total Amount:</span>
                      <span className="text-2xl font-heading text-bathhouse-teal">${event.price}</span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-bathhouse-cream p-4 rounded-lg">
                        <p className="text-sm text-bathhouse-slate">
                          <strong>Cancellation Policy:</strong> Full refund if cancelled 48 hours before the event. 
                          50% refund if cancelled 24-48 hours before. No refund within 24 hours of the event.
                        </p>
                      </div>

                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="terms" 
                          name="terms" 
                          required 
                          className="mt-1 mr-2"
                        />
                        <Label htmlFor="terms" className="text-sm text-bathhouse-slate">
                          I agree to the terms and conditions and understand the cancellation policy *
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="flex-1 bg-bathhouse-teal hover:bg-bathhouse-slate text-white"
                    >
                      Complete Booking
                    </Button>
                    <Button 
                      type="button" 
                      size="lg" 
                      variant="outline" 
                      asChild
                      className="border-bathhouse-stone hover:bg-bathhouse-cream"
                    >
                      <Link href={`/events/${event.slug}`}>Back to Event</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="mt-8 text-center">
              <p className="text-bathhouse-slate">
                Need help? Contact us at{' '}
                <a href="mailto:hello@bathhousestudio.com" className="text-bathhouse-teal hover:underline">
                  hello@bathhousestudio.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading event for booking:', error)
    return (
      <div className="min-h-screen bg-bathhouse-cream py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-heading text-bathhouse-black mb-4">Booking Error</h1>
            <p className="text-bathhouse-slate mb-8">We're having trouble loading this booking page. Please try again later.</p>
            <Link href="/events" className="button-primary">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
