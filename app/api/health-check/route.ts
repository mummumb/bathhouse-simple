import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabase = await createClient()
    // Perform a simple query to check the connection.
    // .rpc('version') is a simple way to check connection and auth.
    const { data, error } = await supabase.rpc("version")

    if (error) {
      console.error("Supabase connection error:", error)
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to Supabase.",
          error: error.message,
        },
        { status: 500 },
      )
    }

    console.log("Supabase connection successful. PostgreSQL version:", data)
    return NextResponse.json({
      status: "ok",
      message: "Supabase connection is healthy.",
      postgres_version: data,
    })
  } catch (e) {
    const error = e as Error
    console.error("An unexpected error occurred during health check:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "An unexpected error occurred.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
