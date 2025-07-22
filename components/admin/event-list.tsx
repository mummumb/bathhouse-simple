"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { Event } from "@/lib/types"
import { EventForm } from "./event-form"

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | undefined>()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" })
      setEvents(events.filter((event) => event.id !== id))
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingEvent(undefined)
    setShowForm(true)
  }

  if (loading) {
    return <div className="animate-pulse">Loading events...</div>
  }

  if (showForm) {
    return (
      <div className="space-y-4">
        <Button onClick={() => setShowForm(false)} variant="outline">
          ← Back to Events
        </Button>
        <EventForm event={editingEvent} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={event.is_published ? "default" : "secondary"}>
                    {event.is_published ? "Published" : "Draft"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteEvent(event.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{event.description}</p>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>Category: {event.category}</span>
                <span>•</span>
                <span>Location: {event.location}</span>
                <span>•</span>
                <span>Price: ${event.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
