"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
// import { WysiwygEditor } from "./wysiwyg-editor" // Removed for stability
import { ImageUpload } from "./image-upload"
import type { StandalonePage } from "@/lib/types"
import { createStandalonePage, updateStandalonePage } from "@/app/admin/actions"

interface StandalonePageFormProps {
  page?: StandalonePage
}

export default function StandalonePageForm({ page }: StandalonePageFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState(page?.content || "")
  const [imageUrl, setImageUrl] = useState(page?.image_url || "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    // Add content data
    formData.set("content", content)
    formData.set("image_url", imageUrl)

    try {
      if (page) {
        formData.set("id", page.id)
        await updateStandalonePage(formData)
      } else {
        await createStandalonePage(formData)
      }
      
      router.push("/admin/dashboard/pages")
      router.refresh()
    } catch (error) {
      console.error("Error saving page:", error)
      alert("An error occurred while saving the page")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={page?.title}
              required
              placeholder="About Us"
            />
          </div>
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={page?.slug}
              required
              placeholder="about-us"
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens allowed"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={page?.excerpt}
            placeholder="Brief excerpt or summary of the page"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            name="meta_description"
            defaultValue={page?.meta_description}
            placeholder="Brief description for search engines (150-160 characters)"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="image_url">Featured Image</Label>
          <ImageUpload
            defaultValue={page?.image_url}
            onUploadComplete={setImageUrl}
            fieldName="image_url"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            name="is_published"
            defaultChecked={page?.is_published ?? true}
          />
          <Label htmlFor="is_published">Published</Label>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Page Content</h2>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
              <strong>Formatting Tips:</strong> Use **bold**, *italic*, ## Headings, > Quotes, - Lists, [Links](url)
            </div>
            <Textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Enter your page content here..."
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : page ? "Update Page" : "Create Page"}
        </Button>
      </div>
    </form>
  )
}