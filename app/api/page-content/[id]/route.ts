import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()

  const { data: content, error } = await supabase.from("page_content").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching page content:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!content) {
    return NextResponse.json({ error: "Page content not found" }, { status: 404 })
  }

  return NextResponse.json(content)
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

  const contentData = await request.json()

  const { data, error } = await supabase.from("page_content").update(contentData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating page content:", error)
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

  const { error } = await supabase.from("page_content").delete().eq("id", id)

  if (error) {
    console.error("Error deleting page content:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Page content deleted successfully" })
}
