import Link from "next/link"
import Image from "next/image"
import type { JournalPost } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { getMappedImageUrl } from "@/lib/image-utils"

interface JournalCardProps {
  post: JournalPost
}

export default function JournalCard({ post }: JournalCardProps) {
  // Use the date field from the transformed data, fallback to published_at if available
  const dateToFormat = (post as any).date || post.published_at || new Date().toISOString()
  const formattedDate = new Date(dateToFormat).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 group-hover:shadow-lg">
        <div className="relative h-56 w-full bg-bathhouse-stone">
          <Image
            src={getMappedImageUrl(post.image)}
            alt={`Image for ${post.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <p className="mb-2 text-sm text-bathhouse-teal">{formattedDate}</p>
          <h3 className="mb-3 text-xl md:text-2xl font-heading text-bathhouse-black leading-tight group-hover:text-bathhouse-teal transition-colors">
            {post.title}
          </h3>
          <p className="mb-4 text-bathhouse-slate text-responsive-base line-clamp-3">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {(post.tags || post.categories)?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
