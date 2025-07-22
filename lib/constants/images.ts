// Centralized image URLs
// Using environment variable for Supabase URL to ensure consistency across environments

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://thuupvufqykorqhvuiae.supabase.co'
const getImageUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${path}`

export const IMAGE_URLS = {
  hero: {
    main: getImageUrl('images/hero/aufguss-beach-towel.jpg'),
    sauna: getImageUrl('images/hero/sauna-peaceful.jpg'),
    community: getImageUrl('images/hero/community-aufguss.jpg'),
  },
  services: {
    aufguss: getImageUrl('images/services/aufguss-ceremony.jpg'),
    soundBath: getImageUrl('images/services/sound-bath.jpg'),
    privateSauna: getImageUrl('images/services/private-sauna.jpg'),
    wellnessDay: getImageUrl('images/hero/community-aufguss.jpg'),
  },
  team: {
    professional: getImageUrl('images/team/professional-1.jpg'),
  },
  brand: {
    logoBlack: getImageUrl('images/brand/logo-black.png'),
    logoWhite: getImageUrl('images/brand/logo-white.png'),
    logoSmallBlack: getImageUrl('images/brand/logo-small-black.png'),
    logoSmallWhite: getImageUrl('images/brand/logo-small-white.png'),
  },
  // Fallback local images for development
  local: {
    hero: '/images/aufguss-beach-towel.jpg',
    sauna: '/images/amanda-sauna-peaceful.jpg',
    community: '/images/amanda-community-aufguss.JPG',
    soundBath: '/images/sound-bowls-beach.JPG',
    professional: '/images/amanda-linkedin-professional.jpeg',
  }
}