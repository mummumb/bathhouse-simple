"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { StandalonePage } from "@/lib/types"

export default function StandalonePageList() {
  const [pages, setPages] = useState<StandalonePage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/standalone-pages")
      const data = await response.json()
      setPages(data)
    } catch (error) {
      console.error("Error fetching standalone pages:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return

    try {
      await fetch(`/api/standalone-pages/${id}`, { method: "DELETE" })
      setPages(pages.filter((page) => page.id !== id))
    } catch (error) {
      console.error("Error deleting standalone page:", error)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading standalone pages...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Standalone Pages</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{page.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={page.published ? "default" : "secondary"}>
                    {page.published ? "Published" : "Draft"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deletePage(page.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{page.excerpt}</p>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>Created: {new Date(page.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>Updated: {new Date(page.updated_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
