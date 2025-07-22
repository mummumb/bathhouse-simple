"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"
import type { PageContent } from "@/lib/types"

interface ManagedContentProps {
  sectionName: string
  fallbackContent?: string
  className?: string
}

export default function ManagedContent({ sectionName, fallbackContent = "", className = "" }: ManagedContentProps) {
  const [content, setContent] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true)
        setError(null)
        
        const supabase = supabaseBrowser()
        const { data, error } = await supabase
          .from("page_content")
          .select("*")
          .eq("section_name", sectionName)
          .eq("published", true)
          .order("order_index", { ascending: true })
          .limit(1)

        if (error) {
          throw new Error(error.message)
        }

        setContent(data?.[0] || null)
      } catch (err) {
        console.error("Error fetching managed content:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch content")
      } finally {
        setLoading(false)
      }
    }

    if (sectionName) {
      fetchContent()
    } else {
      setLoading(false)
    }
  }, [sectionName])

  if (loading) {
    return <div className={`animate-pulse bg-bathhouse-stone h-4 rounded ${className}`} />
  }

  if (error) {
    console.warn(`Failed to load content for section "${sectionName}":`, error)
    return fallbackContent ? <div className={className} dangerouslySetInnerHTML={{ __html: fallbackContent }} /> : null
  }

  if (!content) {
    return fallbackContent ? <div className={className} dangerouslySetInnerHTML={{ __html: fallbackContent }} /> : null
  }

  return (
    <div className={className}>
      {content.title && <h2 className="text-2xl font-heading text-bathhouse-black mb-4">{content.title}</h2>}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: typeof content.content === 'string' ? content.content : JSON.stringify(content.content) }} />
    </div>
  )
}
