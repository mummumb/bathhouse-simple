"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"
import Image from "next/image"

interface PageContent {
  id: string
  section: string
  title: string
  content: string
  image_url?: string
  image_alt?: string
  meta_title?: string
  meta_description?: string
  published: boolean
}

interface ManagedContentDisplayProps {
  section: string
  className?: string
  fallbackTitle?: string
  fallbackContent?: string
}

export function ManagedContentDisplay({
  section,
  className = "",
  fallbackTitle = "",
  fallbackContent = "",
}: ManagedContentDisplayProps) {
  const [content, setContent] = useState<PageContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const supabase = supabaseBrowser()
        const { data, error } = await supabase
          .from("page_content")
          .select("*")
          .eq("section", section)
          .eq("published", true)
          .single()

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "not found"
          throw error
        }

        setContent(data)
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [section])

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    )
  }

  // Use managed content if available, otherwise fall back to provided content
  const displayTitle = content?.title || fallbackTitle
  const displayContent = content?.content || fallbackContent
  const displayImage = content?.image_url
  const displayImageAlt = content?.image_alt || displayTitle

  if (!displayTitle && !displayContent) {
    return null
  }

  return (
    <div className={className}>
      {displayImage && (
        <div className="mb-6">
          <Image
            src={displayImage || "/placeholder.svg"}
            alt={displayImageAlt}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {displayTitle && <h2 className="text-2xl font-bold mb-4">{displayTitle}</h2>}

      {displayContent && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      )}
    </div>
  )
}
