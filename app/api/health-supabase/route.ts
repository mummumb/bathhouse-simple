import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabase = await createClient()

    // Attempt to fetch a small piece of data to check connectivity
    // For example, check if the 'events' table exists and is accessible
    const { count, error } = await supabase.from("events").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Supabase health check failed:", error.message)
      return NextResponse.json({ status: "unhealthy", message: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { status: "healthy", message: `Supabase connected. Events count: ${count}` },
      { status: 200 },
    )
  } catch (e) {
    if (e instanceof Error) {
      console.error("Supabase health check exception:", e.message)
      return NextResponse.json({ status: "unhealthy", message: e.message }, { status: 500 })
    }
    return NextResponse.json(
      { status: "unhealthy", message: "An unknown error occurred during health check" },
      { status: 500 },
    )
  }
}
