import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()

  const { data: page, error } = await supabase.from("pages").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 })
  }

  return NextResponse.json(page)
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

  const pageData = await request.json()

  const { data, error } = await supabase.from("pages").update(pageData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating page:", error)
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

  const { error } = await supabase.from("pages").delete().eq("id", id)

  if (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Page deleted successfully" })
}
