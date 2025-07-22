import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Disallow crawling of the admin dashboard
    },
    sitemap: "https://your-domain.com/sitemap.xml", // Replace with your actual domain
  }
}
