import Image from "next/image"
import { getMappedImageUrl } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export function ResponsiveImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  sizes,
  objectFit = "cover"
}: ResponsiveImageProps) {
  const mappedSrc = getMappedImageUrl(src)

  if (fill) {
    return (
      <Image
        src={mappedSrc}
        alt={alt}
        fill
        className={cn(`object-${objectFit}`, className)}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
    )
  }

  return (
    <Image
      src={mappedSrc}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  )
}