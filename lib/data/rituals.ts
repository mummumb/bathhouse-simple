import { createClient } from "@/lib/supabase/server"
import type { Ritual } from "@/lib/types"
import { logger } from "@/lib/logger"

/**
 * Fetches all published rituals ordered by number
 */
export async function getRituals(): Promise<Ritual[]> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("rituals")
      .select("*")
      .eq("is_published", true)
      .order("number", { ascending: true })

    if (error) {
      logger.error("Error fetching rituals", error)
      return []
    }

    // Parse JSON fields safely
    return (data || []).map((ritual) => ({
      ...ritual,
      instructor: ritual.instructor || {},
      schedule: ritual.schedule || [],
      faqs: ritual.faqs || [],
      benefits: ritual.benefits || [],
    }))
  } catch (error) {
    logger.error("Error fetching rituals", error)
    return []
  }
}

/**
 * Fetches a single published ritual by its slug
 */
export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("rituals")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error) {
      logger.error("Error fetching ritual", error)
      return null
    }

    if (!data) return null

    // Parse JSON fields safely
    return {
      ...data, // Assuming data is already the correct type or can be cast
      instructor: data.instructor || {},
      schedule: data.schedule || [],
      faqs: data.faqs || [],
      benefits: data.benefits || [],
    }
  } catch (error) {
    logger.error("Error fetching ritual", error)
    return null
  }
}