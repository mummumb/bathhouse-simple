export interface Event {
  id: string
  slug: string
  title: string
  category: string
  description: string
  image: string
  date: string
  time: string
  location: string
  capacity: number
  price: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface JournalPost {
  id: string
  slug: string
  title: string
  excerpt: string
  published_at: string
  date?: string // Transformed field from data-utils
  read_time: string
  categories: string[]
  author: string
  author_name?: string // Database field
  author_avatar?: string // Database field
  image: string
  image_url?: string // Database field
  image_alt?: string
  content: string
  is_published: boolean
  tags?: string[] // For UI display
  created_at?: string // Database field
  created_at: string
  updated_at: string
  date?: string // For compatibility
}

export interface Ritual {
  id: string
  slug: string
  number: string
  title: string
  subtitle: string
  description: string
  full_description: string
  image: string
  image_alt: string
  date: string
  location: string
  icon?: string
  duration: string
  instructor: {
    name: string
    title: string
    bio: string
    image: string
  }
  schedule: Array<{
    time: string
    activity: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  benefits: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface PageContent {
  id: string
  section: string
  title: string
  content: string
  created_at?: string
  last_updated?: string
  // Additional fields from the actual database
  image_url?: string | null
  meta_title?: string | null
  meta_description?: string | null
  published?: boolean
  section_name?: string | null
  order_index?: number
  published?: boolean
  image_alt?: string | null
  is_published?: boolean
  section_name?: string | null
  order_index?: number
}

export interface StandalonePage {
  id: string
  slug: string
  title: string
  content: string
  image_url?: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
  is_published: boolean
  published?: boolean // for compatibility
  created_at: string
  updated_at: string
}
