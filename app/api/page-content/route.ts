import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: content, error } = await supabase
    .from("page_content")
    .select("*")
    .order("order_index", { ascending: true })

  if (error) {
    console.error("Error fetching page content:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(content)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentData = await request.json()

  const { data, error } = await supabase.from("page_content").insert(contentData).select().single()

  if (error) {
    console.error("Error creating page content:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
