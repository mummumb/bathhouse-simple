import Image from "next/image"
import { notFound } from "next/navigation"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getStandalonePageBySlug } from "@/lib/data-utils"

export default async function StandalonePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getStandalonePageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <article className="prose prose-lg mx-auto max-w-3xl">
          {page.image_url && (
            <Image
              alt={page.title}
              className="mb-8 h-64 w-full rounded-lg object-cover"
              height={400}
              src={page.image_url || "/placeholder.svg"}
              width={800}
            />
          )}
          <h1 className="mb-4 text-4xl font-bold">{page.title}</h1>
          <div className="page-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
        </article>
      </div>
      <Footer />
    </>
  )
}
