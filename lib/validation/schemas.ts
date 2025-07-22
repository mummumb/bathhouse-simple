import { z } from 'zod'

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), {
      message: 'Phone number can only contain numbers, spaces, and standard formatting characters'
    }),
  
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  
  newsletter: z.boolean().optional().default(false)
})

// Booking form validation schema
export const bookingSchema = z.object({
  service: z.string()
    .min(1, 'Please select a service')
    .max(100, 'Service ID too long'),
  
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Date must be today or in the future'),
  
  time: z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
  
  participants: z.number()
    .int('Participants must be a whole number')
    .min(1, 'At least 1 participant required')
    .max(20, 'Maximum 20 participants allowed'),
  
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  
  notes: z.string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
})

// Newsletter signup schema
export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
})

// Admin login schema
export const adminLoginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
})

// Event schema for admin forms
export const eventSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  
  time: z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
  
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must be less than 200 characters'),
  
  image: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  price: z.number()
    .min(0, 'Price cannot be negative')
    .max(10000, 'Price seems too high'),
  
  capacity: z.number()
    .int('Capacity must be a whole number')
    .min(1, 'Capacity must be at least 1')
    .max(1000, 'Capacity seems too high')
})

// Page content schema
export const pageContentSchema = z.object({
  content: z.string()
    .max(50000, 'Content must be less than 50000 characters'),
  
  content_blocks: z.array(z.object({
    block_name: z.string().max(100),
    content: z.string().max(10000)
  })).optional()
})

// Upload schema
export const uploadSchema = z.object({
  file: z.any().refine((file) => {
    if (!file) return false
    if (!(file instanceof File)) return false
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) return false
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    return allowedTypes.includes(file.type)
  }, {
    message: 'File must be an image (JPEG, PNG, GIF, or WebP) under 10MB'
  })
})

// Type exports
export type ContactFormData = z.infer<typeof contactSchema>
export type BookingFormData = z.infer<typeof bookingSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
export type AdminLoginData = z.infer<typeof adminLoginSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type PageContentData = z.infer<typeof pageContentSchema>
export type UploadData = z.infer<typeof uploadSchema>