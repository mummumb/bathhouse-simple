"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Ritual } from "@/lib/types"

import { createRitual, updateRitual } from "@/app/admin/actions"
import { ImageUpload } from "./image-upload"
import { EnhancedEditor } from "./enhanced-editor"

interface RitualFormProps {
  ritual?: Ritual
}

export function RitualForm({ ritual }: RitualFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [description, setDescription] = useState(ritual?.description || "")
  const [imageUrl, setImageUrl] = useState(ritual?.image || ritual?.image_url || "")

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.set("description", description)
    formData.set("imageUrl", imageUrl)

    let result
    if (ritual) {
      formData.set("id", ritual.id)
      result = await updateRitual(formData)
    } else {
      result = await createRitual(formData)
    }

    if (result?.message) {
      toast({
        title: result.success ? "Success!" : "Error!",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    }

    setIsSubmitting(false)
    if (result?.success) {
      router.push("/admin/dashboard/rituals")
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input defaultValue={ritual?.title} id="title" name="title" required type="text" />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input defaultValue={ritual?.slug} id="slug" name="slug" required type="text" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <EnhancedEditor 
          content={description} 
          onContentChange={setDescription}
          placeholder="Describe the ritual..."
          minHeight="300px"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image</Label>
        <ImageUpload defaultValue={imageUrl} onUploadComplete={setImageUrl} />
      </div>
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input defaultValue={ritual?.duration} id="duration" name="duration" type="text" />
      </div>
      <div>
        <Label htmlFor="benefits">Benefits</Label>
        <Textarea defaultValue={ritual?.benefits} id="benefits" name="benefits" />
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : ritual ? "Update Ritual" : "Create Ritual"}
      </Button>
    </form>
  )
}
