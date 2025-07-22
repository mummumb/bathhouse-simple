"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { Clock, Users, CreditCard, CheckCircle } from "lucide-react"
import { getMappedImageUrl } from "@/lib/image-utils"
import { useCSRFToken } from "@/hooks/use-csrf-token"
import { IMAGE_URLS } from "@/lib/constants/images"

export default function BookPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const { csrfToken } = useCSRFToken()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    participants: 1,
    name: "",
    email: "",
    phone: "",
    notes: ""
  })

  const services = [
    {
      id: "aufguss",
      title: "Aufguss Ceremony",
      duration: "45 minutes",
      price: 65,
      description: "Traditional towel-waving ceremony with essential oils",
      image: IMAGE_URLS.services.aufguss
    },
    {
      id: "sound-bath",
      title: "Sound Bath Session",
      duration: "60 minutes",
      price: 75,
      description: "Deep relaxation through healing sound frequencies",
      image: IMAGE_URLS.services.soundBath
    },
    {
      id: "private-sauna",
      title: "Private Sauna",
      duration: "2 hours",
      price: 150,
      description: "Exclusive use of our premium sauna facilities",
      image: IMAGE_URLS.services.privateSauna
    },
    {
      id: "wellness-day",
      title: "Full Wellness Day",
      duration: "Full day",
      price: 250,
      description: "Complete access to all facilities and services",
      image: IMAGE_URLS.services.wellnessDay
    }
  ]

  const timeSlots = [
    "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
  ]

  const handleServiceSelect = (serviceId: string) => {
    setBookingData({ ...bookingData, service: serviceId })
    setStep(2)
  }

  const handleDateTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate && bookingData.time) {
      setBookingData({
        ...bookingData,
        date: selectedDate.toISOString().split('T')[0]
      })
      setStep(3)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || ""
        },
        body: JSON.stringify(bookingData)
      })

      if (response.ok) {
        setStep(4)
      } else {
        throw new Error("Failed to create booking")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedService = services.find(s => s.id === bookingData.service)

  return (
    <main className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-bathhouse-cream">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= i
                      ? "bg-bathhouse-teal text-white"
                      : "bg-white text-bathhouse-slate"
                  }`}
                >
                  {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-16 md:w-32 h-1 ${
                      step > i ? "bg-bathhouse-teal" : "bg-white"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-8 text-center">
              Select Your Experience
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-bathhouse-stone rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="relative h-48 bg-bathhouse-stone">
                    <Image
                      src={getMappedImageUrl(service.image)}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading text-bathhouse-black mb-2">
                      {service.title}
                    </h3>
                    <p className="text-bathhouse-slate mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-bathhouse-slate">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                      <div className="text-2xl font-heading text-bathhouse-teal">
                        ${service.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-8 text-center">
              Choose Date & Time
            </h1>
            {selectedService && (
              <div className="bg-bathhouse-cream rounded-lg p-4 mb-8">
                <h3 className="font-heading text-bathhouse-black">
                  {selectedService.title}
                </h3>
                <p className="text-sm text-bathhouse-slate">
                  {selectedService.duration} • ${selectedService.price}
                </p>
              </div>
            )}
            <form onSubmit={handleDateTimeSubmit} className="space-y-8">
              <div>
                <Label className="text-lg font-heading mb-4 block">Select Date</Label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-lg font-heading mb-4 block">Select Time</Label>
                <RadioGroup
                  value={bookingData.time}
                  onValueChange={(value) => setBookingData({ ...bookingData, time: value })}
                >
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <div key={time}>
                        <RadioGroupItem
                          value={time}
                          id={time}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={time}
                          className="flex items-center justify-center rounded-md border-2 border-bathhouse-stone bg-white p-3 hover:bg-bathhouse-cream cursor-pointer peer-data-[state=checked]:border-bathhouse-teal peer-data-[state=checked]:bg-bathhouse-teal peer-data-[state=checked]:text-white"
                        >
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="participants" className="text-lg font-heading mb-4 block">
                  Number of Participants
                </Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  max="10"
                  value={bookingData.participants}
                  onChange={(e) => setBookingData({ ...bookingData, participants: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!selectedDate || !bookingData.time}
                  className="flex-1 bg-bathhouse-teal hover:bg-bathhouse-slate text-white"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-8 text-center">
              Your Information
            </h1>
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Special Requests or Notes</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Any health conditions, preferences, or special requests..."
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-bathhouse-cream rounded-lg p-6 mt-8">
                <h3 className="font-heading text-bathhouse-black mb-4">Booking Summary</h3>
                {selectedService && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-bathhouse-slate">Service:</span>
                      <span className="font-medium">{selectedService.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bathhouse-slate">Date:</span>
                      <span className="font-medium">
                        {selectedDate?.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bathhouse-slate">Time:</span>
                      <span className="font-medium">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bathhouse-slate">Participants:</span>
                      <span className="font-medium">{bookingData.participants}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-heading">
                        <span>Total:</span>
                        <span className="text-bathhouse-teal">
                          ${selectedService.price * bookingData.participants}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-bathhouse-teal hover:bg-bathhouse-slate text-white"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-bathhouse-teal rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading text-bathhouse-black mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-bathhouse-slate mb-8">
              Thank you for booking with Bathhouse Studio. We've sent a confirmation email to {bookingData.email}.
            </p>
            
            <div className="bg-bathhouse-cream rounded-lg p-8 mb-8 text-left">
              <h3 className="font-heading text-bathhouse-black mb-4">What's Next?</h3>
              <ul className="space-y-3 text-bathhouse-slate">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-bathhouse-teal mr-2 mt-0.5" />
                  <span>Check your email for booking details and preparation instructions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-bathhouse-teal mr-2 mt-0.5" />
                  <span>Arrive 15 minutes early for check-in and orientation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-bathhouse-teal mr-2 mt-0.5" />
                  <span>Bring a water bottle and swimsuit (optional)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-bathhouse-teal mr-2 mt-0.5" />
                  <span>Contact us if you need to reschedule or have questions</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
              <Link href="/events">
                <Button className="bg-bathhouse-teal hover:bg-bathhouse-slate text-white">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}