import { createClient } from "@/lib/supabase/server"
import type { Event, Ritual, JournalPost, PageContent, StandalonePage } from "@/lib/types"
import { logger } from "@/lib/logger"

export async function getEvents(): Promise<Event[]> {
  const supabase = await createClient()

  try {
    // Try with is_published first (snake_case)
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: true })

    // If there's an error, try with isPublished (camelCase)
    if (error && error.message.includes("column")) {
      logger.warn("Retrying events query with camelCase field", error)
      const result = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: true })
      
      data = result.data
      error = result.error
    }

    if (error) {
      // Log detailed error information
      logger.error("Error fetching events", {
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // Try without the filter as a fallback
      logger.info("Attempting to fetch events without filters")
      const fallbackResult = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
      
      return fallbackResult.data || []
    }

    return data || []
  } catch (error) {
    logger.error("Exception fetching events", error)
    return []
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying event by slug query with camelCase field", error)
      const result = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()
      
      data = result.data
      error = result.error
    }

    // If still error, try without the published filter
    if (error && error.message.includes("column")) {
      logger.warn("Retrying event by slug query without published filter", error)
      const result = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single()
      
      data = result.data
      error = result.error
    }

    if (error) {
      logger.error("Error fetching event by slug", {
        slug,
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      return null
    }

    return data
  } catch (error) {
    logger.error("Exception fetching event by slug", { slug, error })
    return null
  }
}

export async function getRituals(): Promise<Ritual[]> {
  const supabase = await createClient()

  try {
    // Try with is_published first (snake_case)
    let { data, error } = await supabase
      .from("rituals")
      .select("*")
      .eq("is_published", true)
      .order("number", { ascending: true })

    // If there's an error with the column name, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying rituals query with camelCase field", error)
      const result = await supabase
        .from("rituals")
        .select("*")
        .eq("is_published", true)
        .order("number", { ascending: true })
      
      data = result.data
      error = result.error
    }

    // If there's still an error or issue with the order column
    if (error) {
      // Log detailed error information
      logger.error("Error fetching rituals", {
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // Try without filters as a fallback
      logger.info("Attempting to fetch rituals without filters")
      const fallbackResult = await supabase
        .from("rituals")
        .select("*")
      
      data = fallbackResult.data
      error = fallbackResult.error
    }

    if (error) {
      logger.error("All attempts to fetch rituals failed", error)
      return []
    }

    // Parse JSON fields safely
    return (data || []).map(ritual => ({
      ...ritual,
      instructor: typeof ritual.instructor === 'string' ? JSON.parse(ritual.instructor || '{}') : ritual.instructor || {},
      schedule: typeof ritual.schedule === 'string' ? JSON.parse(ritual.schedule || '[]') : ritual.schedule || [],
      faqs: typeof ritual.faqs === 'string' 
        ? JSON.parse(ritual.faqs || '[]') 
        : (typeof ritual.faq === 'string'
            ? JSON.parse(ritual.faq || '[]')
            : ritual.faqs || ritual.faq || []),
      benefits: typeof ritual.benefits === 'string' ? JSON.parse(ritual.benefits || '[]') : ritual.benefits || []
    }))
  } catch (error) {
    logger.error("Exception fetching rituals", error)
    return []
  }
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("rituals")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying ritual by slug query with camelCase field", error)
      const result = await supabase
        .from("rituals")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()
      
      data = result.data
      error = result.error
    }

    // If still error, try without the published filter
    if (error && error.message.includes("column")) {
      logger.warn("Retrying ritual by slug query without published filter", error)
      const result = await supabase
        .from("rituals")
        .select("*")
        .eq("slug", slug)
        .single()
      
      data = result.data
      error = result.error
    }

    if (error) {
      logger.error("Error fetching ritual by slug", {
        slug,
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      return null
    }

    if (!data) {
      logger.error("No ritual found with slug", { slug })
      return null
    }

    try {
      // Parse JSON fields safely with better error handling
      return {
        ...data,
        instructor: typeof data.instructor === 'string' 
          ? JSON.parse(data.instructor || '{}') 
          : data.instructor || {},
        schedule: typeof data.schedule === 'string' 
          ? JSON.parse(data.schedule || '[]') 
          : data.schedule || [],
        faqs: typeof data.faqs === 'string' 
          ? JSON.parse(data.faqs || '[]') 
          : (typeof data.faq === 'string'
              ? JSON.parse(data.faq || '[]')
              : data.faqs || data.faq || []),
        benefits: typeof data.benefits === 'string' 
          ? JSON.parse(data.benefits || '[]') 
          : data.benefits || []
      }
    } catch (parseError) {
      logger.error(`Error parsing ritual data for slug ${slug}`, parseError)
      // Return the original data if parsing fails
      return data
    }
  } catch (error) {
    logger.error("Exception fetching ritual by slug", { slug, error })
    return null
  }
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("journal_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying journal posts query with camelCase field", error)
      const result = await supabase
        .from("journal_posts")
        .select("*")
        .eq("is_published", true)
        .order("publishedAt", { ascending: false })
      
      data = result.data
      error = result.error
    }

    // If still error, try without filters
    if (error) {
      logger.error("Error fetching journal posts", {
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      
      logger.info("Attempting to fetch journal posts without filters")
      const fallbackResult = await supabase
        .from("journal_posts")
        .select("*")
      
      data = fallbackResult.data
      error = fallbackResult.error
    }

    if (error) {
      logger.error("All attempts to fetch journal posts failed", error)
      return []
    }

    // Transform data to match expected format with additional error handling
    return (data || []).map(post => {
      try {
        return {
          ...post,
          image: post.image_url || post.image || post.imageUrl || '',
          author: post.author_name || post.author || post.authorName || '',
          categories: typeof post.categories === 'string' 
            ? JSON.parse(post.categories || '[]') 
            : (Array.isArray(post.categories) ? post.categories : []),
          date: post.published_at || post.publishedAt || post.created_at || post.createdAt || new Date().toISOString(),
        }
      } catch (parseError) {
        logger.error(`Error parsing journal post data for post ${post.id || 'unknown'}`, parseError)
        // Return a minimal valid object if parsing fails
        return {
          ...post,
          image: '',
          author: '',
          categories: [],
          date: post.created_at || new Date().toISOString()
        }
      }
    })
  } catch (error) {
    logger.error("Exception fetching journal posts", error)
    return []
  }
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("journal_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying journal post by slug query with camelCase field", error)
      const result = await supabase
        .from("journal_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()
      
      data = result.data
      error = result.error
    }

    // If still error, try without the published filter
    if (error && error.message.includes("column")) {
      logger.warn("Retrying journal post by slug query without published filter", error)
      const result = await supabase
        .from("journal_posts")
        .select("*")
        .eq("slug", slug)
        .single()
      
      data = result.data
      error = result.error
    }

    if (error) {
      logger.error("Error fetching journal post by slug", {
        slug,
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      return null
    }

    if (!data) {
      logger.error("No journal post found with slug", { slug })
      return null
    }

    try {
      // Transform data to match expected format with better error handling
      return {
        ...data,
        image: data.image_url || data.image || data.imageUrl || '',
        author: data.author_name || data.author || data.authorName || '',
        categories: typeof data.categories === 'string' 
          ? JSON.parse(data.categories || '[]') 
          : (Array.isArray(data.categories) ? data.categories : []),
        date: data.published_at || data.publishedAt || data.created_at || data.createdAt || new Date().toISOString(),
      }
    } catch (parseError) {
      logger.error(`Error parsing journal post data for slug ${slug}`, parseError)
      // Return the original data if parsing fails
      return data
    }
  } catch (error) {
    logger.error("Exception fetching journal post by slug", { slug, error })
    return null
  }
}

export async function getPageContent(sectionName?: string): Promise<PageContent[]> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let query = supabase
      .from("page_content")
      .select("*")
      .eq("published", true)
      .order("order_index", { ascending: true })

    if (sectionName) {
      query = query.eq("section", sectionName)
    }

    let { data, error } = await query

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying page content query with camelCase fields", error)
      
      let camelCaseQuery = supabase
        .from("page_content")
        .select("*")
        .eq("published", true)
        .order("orderIndex", { ascending: true })
      
      if (sectionName) {
        camelCaseQuery = camelCaseQuery.eq("section", sectionName)
      }
      
      const result = await camelCaseQuery
      data = result.data
      error = result.error
    }

    // If still error, try section_name column as fallback
    if (error && sectionName) {
      logger.warn("Retrying with section_name column", error)
      
      // Try with section_name column
      const sectionNameResult = await supabase
        .from("page_content")
        .select("*")
        .eq("section_name", sectionName)
        .eq("published", true)
        .order("order_index", { ascending: true })
      
      if (!sectionNameResult.error) {
        data = sectionNameResult.data
        error = null
      }
    }

    // If still error, try without filters
    if (error) {
      logger.error("Error fetching page content", {
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      
      logger.info("Attempting to fetch page content without filters")
      const fallbackResult = await supabase
        .from("page_content")
        .select("*")
      
      data = fallbackResult.data
      error = fallbackResult.error
    }

    if (error) {
      logger.error("All attempts to fetch page content failed", error)
      return []
    }

    // Transform data to handle potential field name differences
    return (data || []).map(content => {
      try {
        return {
          ...content,
          section_name: content.section_name || content.sectionName || content.section || '',
          content: typeof content.content === 'string' && content.content.startsWith('{') 
            ? JSON.parse(content.content) 
            : content.content || '',
          image_url: content.image_url || content.imageUrl || content.image || '',
          order_index: content.order_index || content.orderIndex || 0
        }
      } catch (parseError) {
        logger.error(`Error parsing page content data for section ${content.section_name || content.sectionName || 'unknown'}`, parseError)
        return content
      }
    })
  } catch (error) {
    logger.error("Exception fetching page content", error)
    return []
  }
}

export async function getManagedContentBySectionName(sectionName: string): Promise<PageContent | null> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("section_name", sectionName)
      .eq("published", true)
      .order("order_index", { ascending: true })
      .limit(1)

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying managed content query with camelCase fields", error)
      const result = await supabase
        .from("page_content")
        .select("*")
        .eq("sectionName", sectionName)
        .eq("published", true)
        .order("orderIndex", { ascending: true })
        .limit(1)
      
      data = result.data
      error = result.error
    }

    // If still error, try without the published filter
    if (error) {
      logger.error("Error fetching managed content", {
        sectionName,
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      
      logger.info("Attempting to fetch managed content without filters", { sectionName })
      const fallbackResult = await supabase
        .from("page_content")
        .select("*")
        .eq("section_name", sectionName)
        .limit(1)
      
      data = fallbackResult.data
      error = fallbackResult.error
      
      // If still error, try with camelCase section name
      if (error) {
        const camelFallbackResult = await supabase
          .from("page_content")
          .select("*")
          .eq("sectionName", sectionName)
          .limit(1)
        
        data = camelFallbackResult.data
        error = camelFallbackResult.error
      }
    }

    if (error) {
      logger.error("All attempts to fetch managed content failed", { sectionName, error })
      return null
    }

    if (!data || data.length === 0) {
      logger.warn("No managed content found for section", { sectionName })
      return null
    }

    try {
      // Transform data to handle potential field name differences
      const content = data[0]
      return {
        ...content,
        section_name: content.section_name || content.sectionName || content.section || sectionName,
        content: typeof content.content === 'string' && content.content.startsWith('{') 
          ? JSON.parse(content.content) 
          : content.content || '',
        image_url: content.image_url || content.imageUrl || content.image || '',
        order_index: content.order_index || content.orderIndex || 0
      }
    } catch (parseError) {
      logger.error(`Error parsing managed content data for section ${sectionName}`, parseError)
      return data[0]
    }
  } catch (error) {
    logger.error("Exception fetching managed content", { sectionName, error })
    return null
  }
}

export async function getStandalonePages(): Promise<StandalonePage[]> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("standalone_pages")
      .select("*")
      .eq("is_published", true)
      .order("title", { ascending: true })

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying standalone pages query with camelCase field", error)
      const result = await supabase
        .from("standalone_pages")
        .select("*")
        .eq("is_published", true)
        .order("title", { ascending: true })
      
      data = result.data
      error = result.error
    }

    // If still error, try without filters
    if (error) {
      logger.error("Error fetching standalone pages", {
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      
      logger.info("Attempting to fetch standalone pages without filters")
      const fallbackResult = await supabase
        .from("standalone_pages")
        .select("*")
        .order("title", { ascending: true })
      
      data = fallbackResult.data
      error = fallbackResult.error
    }

    if (error) {
      logger.error("All attempts to fetch standalone pages failed", error)
      return []
    }

    return data || []
  } catch (error) {
    logger.error("Exception fetching standalone pages", error)
    return []
  }
}

export async function getStandalonePageBySlug(slug: string): Promise<StandalonePage | null> {
  const supabase = await createClient()

  try {
    // Try with snake_case column names first
    let { data, error } = await supabase
      .from("standalone_pages")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    // If there's an error with column names, try with camelCase
    if (error && error.message.includes("column")) {
      logger.warn("Retrying standalone page by slug query with camelCase field", error)
      const result = await supabase
        .from("standalone_pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()
      
      data = result.data
      error = result.error
    }

    // If still error, try without the published filter
    if (error && error.message.includes("column")) {
      logger.warn("Retrying standalone page by slug query without published filter", error)
      const result = await supabase
        .from("standalone_pages")
        .select("*")
        .eq("slug", slug)
        .single()
      
      data = result.data
      error = result.error
    }

    if (error) {
      logger.error("Error fetching standalone page by slug", {
        slug,
        errorCode: error.code,
        errorMessage: error.message,
        details: error.details,
        hint: error.hint
      })
      return null
    }

    return data
  } catch (error) {
    logger.error("Exception fetching standalone page by slug", { slug, error })
    return null
  }
}
