"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { Event } from "@/lib/types"

import { createEvent, updateEvent } from "@/app/admin/actions"
import { ImageUpload } from "./image-upload"
import { EnhancedEditor } from "./enhanced-editor"

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [description, setDescription] = useState(event?.description || "")
  const [imageUrl, setImageUrl] = useState(event?.image || "")

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.set("description", description)
    // imageUrl is already set by the ImageUpload component's hidden input
    console.log("Form data imageUrl:", formData.get("imageUrl"))
    console.log("State imageUrl:", imageUrl)

    try {
      let result
      if (event) {
        formData.set("id", event.id)
        result = await updateEvent(formData)
      } else {
        result = await createEvent(formData)
      }

      if (result?.message) {
        toast({
          title: result.success ? "Success!" : "Error!",
          description: result.message,
          variant: result.success ? "default" : "destructive",
        })
      }

      if (result?.success) {
        router.push("/admin/dashboard/events")
        router.refresh()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error!",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{event ? "Edit Event" : "Create New Event"}</h2>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input defaultValue={event?.title} id="title" name="title" required type="text" />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input defaultValue={event?.slug} id="slug" name="slug" required type="text" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <EnhancedEditor 
          content={description} 
          onContentChange={setDescription}
          placeholder="Describe the event..."
          minHeight="300px"
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input defaultValue={event?.date} id="date" name="date" required type="date" />
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input defaultValue={event?.time} id="time" name="time" required type="time" />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input defaultValue={event?.location} id="location" name="location" required type="text" />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image</Label>
        <ImageUpload defaultValue={imageUrl} onUploadComplete={setImageUrl} />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input defaultValue={event?.price} id="price" name="price" required type="number" />
      </div>
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input defaultValue={event?.capacity} id="capacity" name="capacity" required type="number" />
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : event ? "Update Event" : "Create Event"}
      </Button>
    </form>
  )
}
