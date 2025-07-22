import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getJournalPostBySlug } from "@/lib/data-utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function JournalPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const post = await getJournalPostBySlug(slug)

    if (!post) {
      notFound()
    }

  const authorName = post.author_name || post.author || 'Anonymous'
  const postImage = post.image_url || post.image
  const publishDate = post.published_at || post.date || post.created_at

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto overflow-hidden border-none shadow-lg bg-bathhouse-cream">
          {postImage && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={postImage || "/placeholder.svg"}
                alt={post.image_alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <CardHeader className="p-6 md:p-8">
            <CardTitle className="text-3xl md:text-4xl font-heading text-bathhouse-black leading-tight tracking-tight">{post.title}</CardTitle>
            <div className="flex items-center space-x-4 mt-4 text-sm text-bathhouse-slate">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author_avatar || undefined} alt={authorName} />
                  <AvatarFallback className="bg-bathhouse-stone text-bathhouse-black">{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{authorName}</span>
              </div>
              <span>•</span>
              <span>{format(new Date(publishDate), "PPP")}</span>
              {post.read_time && (
                <>
                  <span>•</span>
                  <span>{post.read_time}</span>
                </>
              )}
            </div>
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.categories.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-bathhouse-stone text-bathhouse-black border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-0">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
  } catch (error) {
    console.error('Error loading journal post:', error)
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-heading text-bathhouse-black mb-4">Error Loading Journal Post</h1>
            <p className="text-bathhouse-slate mb-8">We're having trouble loading this article. Please try again later.</p>
            <Link href="/journal" className="button-primary">
              Back to Journal
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
