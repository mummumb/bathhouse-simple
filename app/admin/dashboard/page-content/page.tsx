import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { PageContentTable } from "@/components/admin/PageContentTable"
import { deletePageContent } from "@/app/admin/actions"

export default async function AdminPageContentPage() {
  const supabase = await createClient()
  
  const { data: pageContent, error } = await supabase
    .from("page_content")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching page content:", error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700">Error loading page content: {error.message}</p>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Page Content Blocks</h1>
        <Link href="/admin/dashboard/page-content/new">
          <Button>Create New Block</Button>
        </Link>
      </div>

      {pageContent && pageContent.length > 0 ? (
        <PageContentTable 
          data={pageContent} 
          onDelete={deletePageContent}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No page content blocks found</p>
          <Link href="/admin/dashboard/page-content/new">
            <Button>Create Your First Content Block</Button>
          </Link>
        </div>
      )}
    </div>
  )
}