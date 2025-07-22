"use client"

import { useState, useEffect } from "react"
import { getManagedContentBySectionNameClient } from "@/lib/data-utils-client"
import type { PageContent } from "@/lib/types"
import Image from "next/image"

interface ManagedContentWithImageProps {
  sectionName: string
  fallbackContent?: string
  fallbackImage?: string
  className?: string
  imageClassName?: string
}

export default function ManagedContentWithImage({
  sectionName,
  fallbackContent = "",
  fallbackImage = "",
  className = "",
  imageClassName = "",
}: ManagedContentWithImageProps) {
  const [content, setContent] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getManagedContentBySectionNameClient(sectionName)
        setContent(data)
      } catch (error) {
        console.error("Error fetching managed content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [sectionName])

  if (loading) {
    return (
      <div className={className}>
        <div className="animate-pulse">
          <div className={`bg-gray-200 rounded mb-4 ${imageClassName}`} style={{ height: "200px" }} />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className={className}>
        {fallbackImage && (
          <Image
            src={fallbackImage || "/placeholder.svg"}
            alt="Fallback"
            width={400}
            height={200}
            className={imageClassName}
          />
        )}
        {fallbackContent && <div dangerouslySetInnerHTML={{ __html: fallbackContent }} />}
      </div>
    )
  }

  return (
    <div className={className}>
      {content.image_url && (
        <Image
          src={content.image_url || "/placeholder.svg"}
          alt={content.title || "Content image"}
          width={400}
          height={200}
          className={imageClassName}
        />
      )}
      {content.title && <h2 className="text-2xl font-bold mb-4">{content.title}</h2>}
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  )
}
