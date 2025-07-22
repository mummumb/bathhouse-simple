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
    
    // Update the journal post's publish status
    const { data, error } = await supabase
      .from("journal_posts")
      .update({ is_published })
      .eq("id", id)
      .select()
      .single()
    
    if (error) {
      logger.error("Error updating journal post publish status", error)
      return NextResponse.json(
        { error: "Failed to update journal post publish status" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: `Journal post ${is_published ? "published" : "unpublished"} successfully`,
      data
    })
  } catch (error) {
    logger.error("Error in journal post publish API", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}