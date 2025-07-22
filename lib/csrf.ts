import { cookies } from 'next/headers'
import { createHash, randomBytes } from 'crypto'

const CSRF_TOKEN_NAME = 'csrf-token'
const CSRF_SECRET_NAME = 'csrf-secret'

// Generate a random CSRF token
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

// Create a CSRF token hash using the secret
export function createCSRFHash(token: string, secret: string): string {
  return createHash('sha256')
    .update(`${token}:${secret}`)
    .digest('hex')
}

// Get or create CSRF token and secret
export async function getCSRFToken(): Promise<{ token: string; hash: string }> {
  const cookieStore = await cookies()
  
  let token = cookieStore.get(CSRF_TOKEN_NAME)?.value
  let secret = cookieStore.get(CSRF_SECRET_NAME)?.value
  
  if (!token || !secret) {
    token = generateCSRFToken()
    secret = generateCSRFToken()
    
    // Set cookies with secure options
    cookieStore.set(CSRF_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })
    
    cookieStore.set(CSRF_SECRET_NAME, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })
  }
  
  const hash = createCSRFHash(token, secret)
  return { token, hash }
}

// Verify CSRF token
export async function verifyCSRFToken(submittedToken: string): Promise<boolean> {
  if (!submittedToken) return false
  
  const cookieStore = await cookies()
  const storedToken = cookieStore.get(CSRF_TOKEN_NAME)?.value
  const storedSecret = cookieStore.get(CSRF_SECRET_NAME)?.value
  
  if (!storedToken || !storedSecret) return false
  
  // Compare the submitted token with the stored hash
  const expectedHash = createCSRFHash(storedToken, storedSecret)
  const submittedHash = createCSRFHash(submittedToken, storedSecret)
  
  // Use timing-safe comparison
  return timingSafeEqual(expectedHash, submittedHash)
}

// Timing-safe string comparison
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}