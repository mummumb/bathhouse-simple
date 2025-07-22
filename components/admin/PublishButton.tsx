import { useState } from 'react'
import { toast } from 'sonner'

interface PublishButtonProps {
  id: string
  type: 'event' | 'ritual' | 'journal' | 'page' | 'post'
  isPublished: boolean
  onStatusChange?: (newStatus: boolean) => void
  className?: string
}

export default function PublishButton({
  id,
  type,
  isPublished,
  onStatusChange,
  className = '',
}: PublishButtonProps) {
  const [loading, setLoading] = useState(false)
  const [published, setPublished] = useState(isPublished)

  const handleClick = async () => {
    setLoading(true)
    
    try {
      // Determine the API endpoint based on item type
      let endpoint = ''
      switch (type) {
        case 'event':
          endpoint = `/api/events/${id}/publish`
          break
        case 'ritual':
          endpoint = `/api/rituals/${id}/publish`
          break
        case 'journal':
        case 'post':
          endpoint = `/api/journal/${id}/publish`
          break
        case 'page':
          endpoint = `/api/pages/${id}/publish`
          break
      }
      
      // Make API request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_published: !published }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        // Update local state
        setPublished(!published)
        
        // Notify parent component
        if (onStatusChange) {
          onStatusChange(!published)
        }
        
        // Show success message
        toast.success(data.message || `${type} ${!published ? 'published' : 'unpublished'} successfully`)
      } else {
        throw new Error(data.error || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating publish status:', error)
      toast.error(`Failed to update status: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const baseClasses = 'px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const publishedClasses = 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
  const unpublishedClasses = 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseClasses} ${published ? publishedClasses : unpublishedClasses} ${className}`}
      data-id={id}
      data-type={type}
    >
      {loading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : published ? (
        'Unpublish'
      ) : (
        'Publish'
      )}
    </button>
  )
}