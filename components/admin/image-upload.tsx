"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { UploadCloud, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  defaultValue?: string
  onUploadComplete: (url: string) => void
  fieldName?: string
}

export function ImageUpload({ defaultValue, onUploadComplete, fieldName = "imageUrl" }: ImageUploadProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue || null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
      setUploadProgress(0)
    } else {
      setFile(null)
      setPreviewUrl(defaultValue || null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Create FormData to send the file
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }))
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`)
      }

      const uploadResult = await response.json()
      onUploadComplete(uploadResult.url)
      setPreviewUrl(uploadResult.url)
      setFile(null) // Clear the file input
      toast({
        title: "Upload successful!",
        description: "Your image has been uploaded.",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      
      let errorMessage = "There was an error uploading your image. Please try again."
      if (error instanceof Error && error.message.includes("not configured")) {
        errorMessage = "Supabase storage is not configured. Please use the URL option to add images."
        setShowUrlInput(true)
      }
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(100) // Ensure progress bar completes
    }
  }

  const handleRemove = () => {
    setFile(null)
    setPreviewUrl(null)
    onUploadComplete("") // Clear the URL in the parent form
    setUploadProgress(0)
    setIsUploading(false)
    toast({
      title: "Image removed",
      description: "The image has been cleared from the input.",
    })
  }

  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState("")

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreviewUrl(urlInput.trim())
      onUploadComplete(urlInput.trim())
      setUrlInput("")
      setShowUrlInput(false)
      toast({
        title: "URL added!",
        description: "Image URL has been set.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input accept="image/*" id="file" onChange={handleFileChange} type="file" className="flex-1" />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setShowUrlInput(!showUrlInput)}
          size="sm"
        >
          URL
        </Button>
      </div>
      
      {showUrlInput && (
        <div className="flex gap-2">
          <Input 
            placeholder="Enter image URL..." 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button type="button" onClick={handleUrlSubmit} size="sm">
            Add
          </Button>
        </div>
      )}
      
      {previewUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-md border">
          <Image 
            alt="Image preview" 
            className="object-cover" 
            fill 
            src={previewUrl || "/placeholder.svg"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Button
            className="absolute right-2 top-2 rounded-full"
            onClick={handleRemove}
            size="icon"
            variant="destructive"
          >
            <XCircle className="h-5 w-5" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      )}
      {file && (
        <Button className="w-full" disabled={isUploading} onClick={handleUpload} type="button">
          {isUploading ? (
            <>
              <UploadCloud className="mr-2 h-4 w-4 animate-bounce" /> Uploading ({uploadProgress}%)
            </>
          ) : (
            <>
              <UploadCloud className="mr-2 h-4 w-4" /> Upload Image
            </>
          )}
        </Button>
      )}
      {isUploading && <Progress value={uploadProgress} className="w-full" />}
      {!file && !previewUrl && (
        <div className="text-sm text-gray-500">
          <p>No image selected.</p>
          <p>Upload a file or click "URL" to enter an image URL directly.</p>
        </div>
      )}
      {/* Hidden input to pass the final URL to the form action */}
      <input type="hidden" name={fieldName} value={previewUrl || ""} />
    </div>
  )
}
