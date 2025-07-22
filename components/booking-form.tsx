"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Event } from "@/lib/types"

async function handleBooking(prevState: any, formData: FormData): Promise<{ message: string; error?: boolean }> {
  // Here you would handle the form submission, e.g., send an email,
  // save to a database, or integrate with a payment gateway.
  // For this example, we'll just simulate a successful submission.
  const name = formData.get("name")
  const email = formData.get("email")
  console.log("Booking submitted for:", { name, email })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { message: "Thank you for your booking! We've sent a confirmation to your email." }
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Confirming..." : "Confirm Booking"}
    </Button>
  )
}

export function BookingForm({ event }: { event: Event }) {
  const [state, formAction] = useFormState(handleBooking, { message: "" })

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
        <CardDescription>Book your spot for this event.</CardDescription>
      </CardHeader>
      <CardContent>
        {state.message ? (
          <div className="text-center py-8">
            <p className="text-lg text-green-700">{state.message}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Date:</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Time:</h3>
                <p>{event.time}</p>
              </div>
              <div>
                <h3 className="font-semibold">Location:</h3>
                <p>{event.location}</p>
              </div>
              <div>
                <h3 className="font-semibold">Price:</h3>
                <p>${event.price}</p>
              </div>
            </div>
            <form action={formAction} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea id="message" name="message" placeholder="Any special requests or questions?" />
              </div>
              <SubmitButton />
            </form>
          </>
        )}
      </CardContent>
    </Card>
  )
}
