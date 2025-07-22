import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: pages, error } = await supabase.from("pages").select("*")

  if (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(pages)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const pageData = await request.json()

  const { data, error } = await supabase.from("pages").insert(pageData).select().single()

  if (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
