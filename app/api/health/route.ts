import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check required environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'NEXT_PUBLIC_SITE_URL'
    ]
    
    const missing = requiredEnvVars.filter(key => !process.env[key])
    
    if (missing.length > 0) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Missing environment variables',
        missing,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
    
    // Test database connection
    try {
      const supabase = await createClient()
      const { error } = await supabase.from('events').select('id').limit(1)
      
      if (error) {
        return NextResponse.json({ 
          status: 'error',
          message: 'Database connection failed',
          error: error.message,
          timestamp: new Date().toISOString()
        }, { status: 500 })
      }
    } catch (dbError) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Failed to initialize database client',
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
    
    // All checks passed
    return NextResponse.json({ 
      status: 'ok',
      message: 'All systems operational',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}