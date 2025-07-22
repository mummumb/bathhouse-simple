"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { PageContent } from "@/lib/types"

export default function PageContentList() {
  const [content, setContent] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/page-content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching page content:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page content?")) return

    try {
      await fetch(`/api/page-content/${id}`, { method: "DELETE" })
      setContent(content.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting page content:", error)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading page content...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Page Content</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      <div className="grid gap-4">
        {content.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">Section: {item.section_name}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={item.is_published ? "default" : "secondary"}>
                    {item.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteContent(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 200) + "..." }} />
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>Order: {item.order_index}</span>
                <span>•</span>
                <span>Updated: {new Date(item.last_updated).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
