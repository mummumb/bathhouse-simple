/**
 * Utility function to handle image URLs
 * Supports both Supabase URLs and local fallbacks
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return '/placeholder.svg'
  }

  // If it's already a full URL (http/https), return as is
  // This handles Supabase storage URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // For local paths, return as is
  return imagePath
}

// Temporary fallback mapping for local images
// This is now only used as a backup when Supabase URLs aren't available
export const imageUrlMapping: Record<string, string> = {
  // Keep a minimal set of mappings for local development
  '/images/hero-cover.png': '/images/aufguss-beach-towel.jpg',
  '/placeholder.svg': '/placeholder.svg'
}

export function getMappedImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return '/placeholder.svg'
  }

  // If it's already a full URL (Supabase), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Check if we have a local mapping (for development)
  if (imageUrlMapping[imagePath]) {
    return imageUrlMapping[imagePath]
  }

  // For local paths that exist, return them
  // In production, these should all be Supabase URLs from the database
  return imagePath
}