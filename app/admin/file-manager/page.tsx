'use client'

import { useState, useEffect } from 'react'
import { FileUpload } from '@/components/ui/file-upload'
import { toast } from 'sonner'

interface FileItem {
  id: string
  url: string
  filename: string
  contentType: string | null
  size: number | null
  createdAt: string
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files')
        if (!response.ok) throw new Error('Failed to fetch files')
        const data = await response.json()
        setFiles(data)
      } catch (error) {
        console.error('Error fetching files:', error)
        toast.error('Failed to load files')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [])

  const handleUploadComplete = (url: string, filename: string) => {
    // Add the new file to the list
    const newFile: FileItem = {
      id: Math.random().toString(36).substring(2, 15),
      url,
      filename,
      contentType: null,
      size: null,
      createdAt: new Date().toISOString()
    }
    setFiles(prev => [newFile, ...prev])
  }

  const handleDeleteFile = async (url: string, id: string) => {
    try {
      const response = await fetch('/api/delete-blob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete file')
      }

      // Remove file from list
      setFiles(prev => prev.filter(file => file.id !== id))
      toast.success('File deleted successfully')
    } catch (error) {
      console.error('Error deleting file:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete file')
    }
  }

  const formatFileSize = (bytes: number | null) => {
    if (bytes === null) return 'Unknown size'
    if (bytes < 1024) return `${bytes} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const isImageFile = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">File Manager</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New File</h2>
        <FileUpload 
          onUploadComplete={handleUploadComplete}
          accept="image/*,application/pdf"
          maxSizeMB={5}
          buttonText="Upload File"
        />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Files</h2>
        
        {isLoading ? (
          <div className="text-center py-8">Loading files...</div>
        ) : files.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No files uploaded yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map(file => (
              <div key={file.id} className="border rounded-lg overflow-hidden bg-white">
                {isImageFile(file.url) ? (
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img 
                      src={file.url} 
                      alt={file.filename} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center bg-gray-100">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="font-medium text-sm truncate" title={file.filename}>
                    {file.filename.split('/').pop()}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="mt-4 flex justify-between">
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDeleteFile(file.url, file.id)}
                      className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}