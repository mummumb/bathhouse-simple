"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Ritual {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  image_alt: string
  duration: string
  temperature: string
  benefits: string[]
  published: boolean
  created_at: string
}

export default function RitualsList() {
  const [rituals, setRituals] = useState<Ritual[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRituals() {
      try {
        const { data, error } = await supabaseBrowser
          .from("rituals")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        setRituals(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRituals()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="h-3 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading rituals: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (rituals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No rituals available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rituals.map((ritual) => (
        <Card key={ritual.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image
              src={ritual.image_url || "/placeholder.svg?height=200&width=300"}
              alt={ritual.image_alt || ritual.name}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{ritual.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{ritual.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              {ritual.duration && <span>{ritual.duration}</span>}
              {ritual.temperature && <span>{ritual.temperature}</span>}
            </div>

            {ritual.benefits && ritual.benefits.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Benefits:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {ritual.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={`/rituals/${ritual.slug}`}>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
