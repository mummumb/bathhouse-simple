"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import type { JournalPost } from "@/lib/types"

import { createJournalPost, updateJournalPost } from "@/app/admin/actions"
import { ImageUpload } from "./image-upload"
import { EnhancedEditor } from "./enhanced-editor"
import { SimpleEditor } from "./simple-editor"

interface JournalPostFormProps {
  post?: JournalPost
}

export function JournalPostForm({ post }: JournalPostFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState(post?.content || "")
  const [imageUrl, setImageUrl] = useState(post?.image || post?.image_url || "")

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.set("content", content)
    formData.set("imageUrl", imageUrl)

    let result
    if (post) {
      formData.set("id", post.id)
      result = await updateJournalPost(formData)
    } else {
      result = await createJournalPost(formData)
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
      // Small delay to show success message
      setTimeout(() => {
        router.push("/admin/dashboard/journal")
      }, 1000)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          defaultValue={post?.title}
          id="title"
          name="title"
          required
          type="text"
          placeholder="Enter the post title..."
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          defaultValue={post?.slug}
          id="slug"
          name="slug"
          required
          type="text"
          placeholder="url-friendly-version-of-title"
        />
        <p className="text-sm text-gray-500 mt-1">This will be the URL: /journal/your-slug-here</p>
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt (Optional)</Label>
        <Input
          defaultValue={post?.excerpt}
          id="excerpt"
          name="excerpt"
          type="text"
          placeholder="Brief summary for previews..."
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <EnhancedEditor 
          content={content} 
          onContentChange={setContent}
          placeholder="Write your journal post content here..."
          minHeight="400px"
        />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          defaultValue={post?.author_name || post?.author || "Amanda Berger"}
          id="author"
          name="author"
          required
          type="text"
          placeholder="Author name"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image</Label>
        <ImageUpload defaultValue={imageUrl} onUploadComplete={setImageUrl} />
      </div>
      <div>
        <Label htmlFor="publishedAt">Published At</Label>
        <Input
          defaultValue={post?.published_at ? new Date(post.published_at).toISOString().split('T')[0] : ''}
          id="publishedAt"
          name="publishedAt"
          required
          type="date"
        />
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  )
}
