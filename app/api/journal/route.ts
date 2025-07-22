import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from("journal_posts")
    .select("*")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching journal posts:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const postData = await request.json()

  const { data, error } = await supabase.from("journal_posts").insert(postData).select().single()

  if (error) {
    console.error("Error creating journal post:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
