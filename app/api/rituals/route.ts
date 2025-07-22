import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: rituals, error } = await supabase.from("rituals").select("*")

  if (error) {
    console.error("Error fetching rituals:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(rituals)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const ritualData = await request.json()

  const { data, error } = await supabase.from("rituals").insert(ritualData).select().single()

  if (error) {
    console.error("Error creating ritual:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
