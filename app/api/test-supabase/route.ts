import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const startTime = Date.now()
    const supabase = await createClient()

    // Test 1: Basic connectivity
    const { data: connectionTest, error: connectionError } = await supabase.from("events").select("count()", { count: "exact", head: true })
    
    if (connectionError) {
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to Supabase",
        error: connectionError.message,
        details: connectionError
      }, { status: 500 })
    }

    // Test 2: Authentication
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    // Test 3: Query performance
    const { data: tables, error: tablesError } = await supabase
      .from("pg_catalog.pg_tables")
      .select("tablename")
      .eq("schemaname", "public")
      .limit(10)
    
    // Test 4: Database URL format
    const dbUrlValid = process.env.DATABASE_URL?.includes("supabase.co")
    
    const endTime = Date.now()
    const responseTime = endTime - startTime

    return NextResponse.json({
      status: "success",
      message: "Supabase connection tests completed",
      responseTimeMs: responseTime,
      tests: {
        basicConnectivity: {
          status: connectionError ? "failed" : "passed",
          message: connectionError ? connectionError.message : "Successfully connected to Supabase"
        },
        authentication: {
          status: authError ? "failed" : "passed",
          message: authError ? authError.message : "Authentication working",
          sessionExists: !!authData.session
        },
        queryPerformance: {
          status: tablesError ? "failed" : "passed",
          message: tablesError ? tablesError.message : "Query executed successfully",
          tableCount: tables?.length || 0
        },
        databaseUrl: {
          status: dbUrlValid ? "passed" : "warning",
          message: dbUrlValid 
            ? "DATABASE_URL appears to be correctly formatted" 
            : "DATABASE_URL may not be correctly formatted"
        }
      },
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + "..." || "Not set",
        anonKeySet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        serviceRoleKeySet: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        databaseUrlSet: !!process.env.DATABASE_URL
      }
    })
  } catch (e) {
    console.error("Supabase test exception:", e)
    return NextResponse.json({
      status: "error",
      message: "An exception occurred during Supabase connection test",
      error: e instanceof Error ? e.message : "Unknown error"
    }, { status: 500 })
  }
}