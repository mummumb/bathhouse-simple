import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logger } from "@/lib/logger"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { is_published } = await request.json()
    
    const supabase = await createClient()
    
    // Update the ritual's publish status
    const { data, error } = await supabase
      .from("rituals")
      .update({ is_published })
      .eq("id", id)
      .select()
      .single()
    
    if (error) {
      logger.error("Error updating ritual publish status", error)
      return NextResponse.json(
        { error: "Failed to update ritual publish status" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: `Ritual ${is_published ? "published" : "unpublished"} successfully`,
      data
    })
  } catch (error) {
    logger.error("Error in ritual publish API", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}