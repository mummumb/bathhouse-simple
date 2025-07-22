export default function PlaceholderImage({ 
  text = "Image", 
  className = "" 
}: { 
  text?: string
  className?: string 
}) {
  return (
    <div className={`flex items-center justify-center bg-bathhouse-stone/20 text-bathhouse-slate ${className}`}>
      <div className="text-center p-4">
        <svg
          className="w-16 h-16 mx-auto mb-2 text-bathhouse-slate/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  )
}