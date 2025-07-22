import { createClient } from "@/lib/supabase/server"
import { logger } from "@/lib/logger"

/**
 * Debug utility to test Supabase connection and log table information
 */
export async function debugSupabaseConnection() {
  try {
    const supabase = await createClient()
    
    // Test connection by fetching table information
    const tables = ['events', 'rituals', 'journal_posts', 'page_content', 'standalone_pages']
    
    logger.info('🔍 Testing Supabase connection...')
    
    for (const table of tables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact' })
          .limit(1)
        
        if (error) {
          logger.error(`❌ Error accessing table ${table}:`, error)
        } else {
          logger.info(`✅ Table ${table} accessible, count: ${count}`)
        }
      } catch (tableError) {
        logger.error(`❌ Exception accessing table ${table}:`, tableError)
      }
    }
    
    return { success: true, message: 'Debug complete' }
  } catch (error) {
    logger.error('❌ Failed to create Supabase client:', error)
    return { success: false, message: 'Failed to create Supabase client', error }
  }
}