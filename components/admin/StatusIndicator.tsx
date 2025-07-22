interface StatusIndicatorProps {
  isPublished: boolean
  id?: string
  className?: string
}

export default function StatusIndicator({
  isPublished,
  id,
  className = '',
}: StatusIndicatorProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  const publishedClasses = 'bg-green-100 text-green-800'
  const unpublishedClasses = 'bg-gray-100 text-gray-800'
  
  return (
    <span
      className={`${baseClasses} ${isPublished ? publishedClasses : unpublishedClasses} ${className}`}
      data-id={id}
    >
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${isPublished ? 'bg-green-600' : 'bg-gray-400'}`}></span>
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}