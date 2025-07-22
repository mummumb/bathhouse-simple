'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'

interface FileUploadProps {
  onUploadComplete?: (url: string, filename: string) => void
  accept?: string
  maxSizeMB?: number
  className?: string
  buttonText?: string
}

export function FileUpload({
  onUploadComplete,
  accept = "image/*,application/pdf",
  maxSizeMB = 5,
  className = "",
  buttonText = "Upload File"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    
    // Validate file size
    if (file.size > maxSizeBytes) {
      toast.error(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }
    
    setIsUploading(true)
    setProgress(0)
    
    try {
      // Create a safe filename
      const fileExtension = file.name.split('.').pop()
      const safeFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
      
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      
      // Simulate progress (since fetch doesn't provide upload progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15
          return newProgress > 90 ? 90 : newProgress
        })
      }, 500)
      
      // Upload file
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(safeFilename)}`, {
        method: 'POST',
        body: formData,
      })
      
      clearInterval(progressInterval)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }
      
      const blob = await response.json()
      setProgress(100)
      setUploadedUrl(blob.url)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
      toast.success('File uploaded successfully')
      
      // Call callback if provided
      if (onUploadComplete) {
        onUploadComplete(blob.url, blob.pathname)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload file')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept={accept}
          disabled={isUploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors
            ${isUploading 
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isUploading ? 'Uploading...' : buttonText}
        </label>
        
        {isUploading && (
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {uploadedUrl && !isUploading && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Uploaded File:</p>
          <div className="flex items-center gap-2">
            <a 
              href={uploadedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 text-sm truncate hover:underline"
            >
              {uploadedUrl.split('/').pop()}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(uploadedUrl);
                toast.success('URL copied to clipboard');
              }}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Copy URL
            </button>
          </div>
          
          {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
            <div className="mt-2 border rounded-md p-2 max-w-xs">
              <img 
                src={uploadedUrl} 
                alt="Uploaded file preview" 
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}