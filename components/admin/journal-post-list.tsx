"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { JournalPost } from "@/lib/types"

export default function JournalPostList() {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/journal")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching journal posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this journal post?")) return

    try {
      await fetch(`/api/journal/${id}`, { method: "DELETE" })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("Error deleting journal post:", error)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading journal posts...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Journal Posts</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={post.is_published ? "default" : "secondary"}>
                    {post.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deletePost(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.excerpt}</p>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>Read time: {post.read_time}</span>
                <span>•</span>
                <span>Author: {post.author.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
