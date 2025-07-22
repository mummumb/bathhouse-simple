"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { PageContent } from "@/lib/types"

import { createPageContent, updatePageContent } from "@/app/admin/actions"
// import { WysiwygEditor } from "./wysiwyg-editor" // Removed for stability
import { ImageUpload } from "./image-upload"
import dynamic from "next/dynamic"
import { Textarea } from "../ui/textarea"

const StructuredContentEditor = dynamic(
  () => import("./StructuredContentEditor").then(mod => ({ default: mod.StructuredContentEditor })),
  {
    ssr: false,
    loading: () => <div className="p-4 bg-gray-100 rounded animate-pulse">Loading editor...</div>
  }
)

interface PageContentFormProps {
  content?: PageContent
}

export function PageContentForm({ content }: PageContentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle both string and object content
  const initialContent = content?.content
    ? typeof content.content === 'object'
      ? JSON.stringify(content.content, null, 2)
      : content.content
    : ""
  const [htmlContent, setHtmlContent] = useState(initialContent)

  // Initialize section from existing content
  const [section, setSection] = useState(content?.section || "")
  const [title, setTitle] = useState(content?.title || "")
  const [sectionName, setSectionName] = useState(content?.section_name || "")
  const [orderIndex, setOrderIndex] = useState(content?.order_index?.toString() || "0")
  const [published, setPublished] = useState(content?.published ?? true)
  const [imageUrl, setImageUrl] = useState(content?.image_url || "")

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.set("content", htmlContent)
    formData.set("image_url", imageUrl)

    let result
    if (content) {
      formData.set("id", content.id)
      result = await updatePageContent(formData)
    } else {
      result = await createPageContent(formData)
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
      router.push("/admin/dashboard/page-content")
    }
  }

  // Check if we should use structured editor
  const useStructuredEditor = section === 'values' || section === 'aufguss'

  return (
    <form action={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{content ? "Edit Page Content" : "Create New Page Content"}</h2>
      <div>
        <Label htmlFor="section">Section</Label>
        <Input
          id="section"
          name="section"
          required
          type="text"
          placeholder="e.g., hero, about, services, contact"
          onChange={(e) => setSection(e.target.value)}
          value={section}
        />
        <p className="text-sm text-gray-500 mt-1">The section identifier for this content block</p>
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          required
          type="text"
          placeholder="Section title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        {/* Use structured editor for values/aufguss sections */}
        {useStructuredEditor ? (
          <StructuredContentEditor
            content={htmlContent}
            onChange={setHtmlContent}
            section={section}
          />
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
              <strong>Formatting Tips:</strong> Use **bold**, *italic*, ## Headings, > Quotes, - Lists, [Links](url)
            </div>
            <Textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Enter your content here..."
            />
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="image_url">Section Image</Label>
        <ImageUpload
          defaultValue={content?.image_url}
          onUploadComplete={setImageUrl}
          fieldName="image_url"
        />
        <p className="text-sm text-gray-500 mt-1">Optional image for this content section</p>
      </div>
      <div>
        <Label htmlFor="section_name">Section Name (Display)</Label>
        <Input
          id="section_name"
          name="section_name"
          type="text"
          placeholder="e.g., Hero Section, About Us"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">Human-readable name for this section</p>
      </div>
      <div>
        <Label htmlFor="order_index">Order Index</Label>
        <Input
          id="order_index"
          name="order_index"
          type="number"
          placeholder="0"
          value={orderIndex}
          onChange={(e) => setOrderIndex(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
      </div>
      <div>
        <Label className="flex items-center">
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mr-2"
          />
          Published
        </Label>
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : content ? "Update Content" : "Create Content"}
      </Button>
    </form>
  )
}