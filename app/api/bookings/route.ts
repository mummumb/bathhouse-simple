import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { bookingSchema } from "@/lib/validation/schemas"
import { z } from "zod"
import DOMPurify from "isomorphic-dompurify"
import { verifyCSRFToken } from "@/lib/csrf"

export async function POST(request: Request) {
  try {
    const rawData = await request.json()
    
    // Verify CSRF token
    const csrfToken = request.headers.get('x-csrf-token')
    if (!csrfToken || !(await verifyCSRFToken(csrfToken))) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      )
    }
    
    // Validate input data
    let validatedData
    try {
      validatedData = bookingSchema.parse(rawData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: "Validation failed", 
            details: error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message
            }))
          },
          { status: 400 }
        )
      }
      throw error
    }

    // Sanitize text fields
    const sanitizedData = {
      ...validatedData,
      name: DOMPurify.sanitize(validatedData.name),
      notes: validatedData.notes ? DOMPurify.sanitize(validatedData.notes) : null
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("bookings")
      .insert([{
        service_id: sanitizedData.service,
        booking_date: sanitizedData.date,
        booking_time: sanitizedData.time,
        participants: sanitizedData.participants,
        customer_name: sanitizedData.name,
        customer_email: sanitizedData.email,
        customer_phone: sanitizedData.phone,
        notes: sanitizedData.notes,
        status: "confirmed",
        total_price: 0 // This would be calculated based on service price
      }])

    if (error) {
      console.error("Error creating booking:", error)
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      )
    }

    // In a real app, you'd send a confirmation email here

    return NextResponse.json(
      { success: true, message: "Booking created successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Booking API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}