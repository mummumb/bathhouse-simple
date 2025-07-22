import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()

  const { data: ritual, error } = await supabase.from("rituals").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching ritual:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!ritual) {
    return NextResponse.json({ error: "Ritual not found" }, { status: 404 })
  }

  return NextResponse.json(ritual)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const ritualData = await request.json()

  const { data, error } = await supabase.from("rituals").update(ritualData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating ritual:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { error } = await supabase.from("rituals").delete().eq("id", id)

  if (error) {
    console.error("Error deleting ritual:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Ritual deleted successfully" })
}
