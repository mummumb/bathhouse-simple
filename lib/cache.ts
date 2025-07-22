import { NextResponse } from 'next/server'

export interface CacheOptions {
  public?: boolean
  maxAge?: number
  sMaxAge?: number
  staleWhileRevalidate?: number
  noStore?: boolean
  noCache?: boolean
  mustRevalidate?: boolean
}

export function setCacheHeaders(response: NextResponse, options: CacheOptions = {}) {
  const {
    public: isPublic = false,
    maxAge = 0,
    sMaxAge,
    staleWhileRevalidate,
    noStore = false,
    noCache = false,
    mustRevalidate = false
  } = options

  const directives: string[] = []

  if (noStore) {
    directives.push('no-store')
  } else if (noCache) {
    directives.push('no-cache')
  } else {
    if (isPublic) {
      directives.push('public')
    } else {
      directives.push('private')
    }

    if (maxAge > 0) {
      directives.push(`max-age=${maxAge}`)
    }

    if (sMaxAge !== undefined) {
      directives.push(`s-maxage=${sMaxAge}`)
    }

    if (staleWhileRevalidate !== undefined) {
      directives.push(`stale-while-revalidate=${staleWhileRevalidate}`)
    }

    if (mustRevalidate) {
      directives.push('must-revalidate')
    }
  }

  response.headers.set('Cache-Control', directives.join(', '))
  return response
}

// Common cache configurations
export const cacheConfigs = {
  // No caching
  noCache: { noStore: true },
  
  // Cache for 1 hour, serve stale content while revalidating
  oneHour: { 
    public: true, 
    maxAge: 3600, 
    staleWhileRevalidate: 60 
  },
  
  // Cache for 1 day
  oneDay: { 
    public: true, 
    maxAge: 86400, 
    staleWhileRevalidate: 3600 
  },
  
  // Cache for 1 week
  oneWeek: { 
    public: true, 
    maxAge: 604800, 
    staleWhileRevalidate: 86400 
  },
  
  // Static assets (images, fonts, etc.)
  static: { 
    public: true, 
    maxAge: 31536000, // 1 year
    mustRevalidate: true 
  }
}