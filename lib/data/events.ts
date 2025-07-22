import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/lib/types"
import { logger } from "@/lib/logger"

/**
 * Fetches all published events ordered by date
 */
export async function getEvents(): Promise<Event[]> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: true })

    if (error) {
      logger.error("Error fetching events", error)
      return []
    }

    return data || []
  } catch (error) {
    logger.error("Error fetching events", error)
    return []
  }
}

/**
 * Fetches a single published event by its slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error) {
      logger.error("Error fetching event", error)
      return null
    }

    return data
  } catch (error) {
    logger.error("Error fetching event", error)
    return null
  }
}