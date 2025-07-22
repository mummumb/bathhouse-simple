import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { newsletterSchema } from "@/lib/validation/schemas"
import { z } from "zod"

export async function POST(request: Request) {
  try {
    const rawData = await request.json()
    
    // Validate input data
    let validatedData
    try {
      validatedData = newsletterSchema.parse(rawData)
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

    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", validatedData.email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      )
    }

    // Insert new subscriber
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{
        email: validatedData.email,
        subscribed_at: new Date().toISOString(),
        is_active: true
      }])

    if (error) {
      console.error("Error saving newsletter subscription:", error)
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to newsletter" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}