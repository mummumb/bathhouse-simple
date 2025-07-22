/**
 * Simple logger utility for consistent logging
 */
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${message}`, ...args)
  },
  
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`)
    if (error) {
      if (error instanceof Error) {
        console.error(`Details: ${error.message}`)
        console.error(error.stack)
      } else {
        console.error('Details:', error)
      }
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args)
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  }
}