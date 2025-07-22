import Link from "next/link"
import { ResponsiveImage } from "./responsive-image"
import { cn } from "@/lib/utils"

interface ContentCardProps {
  href: string
  image: string
  imageAlt: string
  title: string
  subtitle?: string
  description?: string
  metadata?: {
    icon?: React.ComponentType<{ className?: string }>
    text: string
  }[]
  badge?: string
  className?: string
  imageClassName?: string
}

export function ContentCard({
  href,
  image,
  imageAlt,
  title,
  subtitle,
  description,
  metadata,
  badge,
  className,
  imageClassName
}: ContentCardProps) {
  return (
    <Link href={href}>
      <div className={cn(
        "bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full group",
        className
      )}>
        <div className={cn("relative h-64 bg-bathhouse-stone", imageClassName)}>
          <ResponsiveImage
            src={image}
            alt={imageAlt}
            fill
            className="group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <div className="absolute top-4 left-4 bg-white/90 text-bathhouse-black px-3 py-1 rounded-full text-sm font-heading">
              {badge}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-heading text-bathhouse-black mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-bathhouse-teal mb-4 italic">{subtitle}</p>
          )}
          {description && (
            <p className="text-bathhouse-slate mb-4 line-clamp-3">
              {description}
            </p>
          )}
          {metadata && metadata.length > 0 && (
            <div className="space-y-2">
              {metadata.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center text-sm text-bathhouse-slate">
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}