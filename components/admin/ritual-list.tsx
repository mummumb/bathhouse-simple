"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { Ritual } from "@/lib/types"

export default function RitualList() {
  const [rituals, setRituals] = useState<Ritual[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRituals()
  }, [])

  const fetchRituals = async () => {
    try {
      const response = await fetch("/api/rituals")
      const data = await response.json()
      setRituals(data)
    } catch (error) {
      console.error("Error fetching rituals:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteRitual = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ritual?")) return

    try {
      await fetch(`/api/rituals/${id}`, { method: "DELETE" })
      setRituals(rituals.filter((ritual) => ritual.id !== id))
    } catch (error) {
      console.error("Error deleting ritual:", error)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading rituals...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rituals</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Ritual
        </Button>
      </div>

      <div className="grid gap-4">
        {rituals.map((ritual) => (
          <Card key={ritual.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    {ritual.number}. {ritual.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{ritual.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={ritual.is_published ? "default" : "secondary"}>
                    {ritual.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteRitual(ritual.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{ritual.description}</p>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>Location: {ritual.location}</span>
                <span>•</span>
                <span>Instructor: {ritual.instructor.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
