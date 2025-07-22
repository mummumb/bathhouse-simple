import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { contactSchema } from "@/lib/validation/schemas"
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
      validatedData = contactSchema.parse(rawData)
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
      subject: DOMPurify.sanitize(validatedData.subject),
      message: DOMPurify.sanitize(validatedData.message),
      phone: validatedData.phone ? DOMPurify.sanitize(validatedData.phone) : null
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("contacts")
      .insert([{
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        newsletter_opt_in: sanitizedData.newsletter || false,
        status: "new"
      }])

    if (error) {
      console.error("Error saving contact:", error)
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}