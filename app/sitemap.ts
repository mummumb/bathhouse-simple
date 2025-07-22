import { getEvents } from "@/lib/events-data"
import { getJournalPosts } from "@/lib/journal-data"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bathhousestudio.com"

  const staticRoutes = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/journal`, lastModified: new Date() },
  ]

  const events = await getEvents()
  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.created_at),
  }))

  const journalPosts = await getJournalPosts()
  const journalRoutes = journalPosts.map((post) => ({
    url: `${siteUrl}/journal/${post.slug}`,
    lastModified: new Date(post.published_at),
  }))

  return [...staticRoutes, ...eventRoutes, ...journalRoutes]
}
