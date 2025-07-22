import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PagesTable from "@/components/admin/PagesTable"
import { PageContentTable } from "@/components/admin/PageContentTable"

export default async function AllPagesPage() {
  const supabase = await createClient()
  
  // Fetch standalone pages
  const { data: standalonePages, error: pagesError } = await supabase
    .from("standalone_pages")
    .select("*")
    .order("created_at", { ascending: false })

  // Fetch page content sections
  const { data: pageContent, error: contentError } = await supabase
    .from("page_content")
    .select("*")
    .order("created_at", { ascending: false })

  if (pagesError) {
    console.error("Error fetching standalone pages:", pagesError)
  }

  if (contentError) {
    console.error("Error fetching page content:", contentError)
  }

  const deleteStandalonePage = async (id: string) => {
    'use server'
    const { deleteStandalonePage } = await import("@/app/admin/actions")
    return deleteStandalonePage(id)
  }

  const deletePageContent = async (id: string) => {
    'use server'
    const { deletePageContent } = await import("@/app/admin/actions")
    return deletePageContent(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Pages & Content</h1>
        <div className="flex gap-2">
          <Link href="/admin/dashboard/pages/new">
            <Button>Create New Page</Button>
          </Link>
          <Link href="/admin/dashboard/page-content/new">
            <Button variant="outline">Add Page Content</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="standalone" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standalone">
            Standalone Pages ({standalonePages?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="content">
            Page Content Sections ({pageContent?.length || 0})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="standalone" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Standalone Pages</h2>
              <p className="text-gray-600">Full pages with their own URLs (e.g., /p/about, /p/contact)</p>
            </div>
            <Link href="/admin/dashboard/pages/new">
              <Button>Create New Page</Button>
            </Link>
          </div>
          
          {standalonePages && standalonePages.length > 0 ? (
            <PagesTable 
              data={standalonePages} 
              onDelete={deleteStandalonePage}
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No standalone pages found</p>
              <Link href="/admin/dashboard/pages/new">
                <Button>Create Your First Page</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Page Content Sections</h2>
              <p className="text-gray-600">Reusable content sections used throughout the site</p>
            </div>
            <Link href="/admin/dashboard/page-content/new">
              <Button>Add Content Section</Button>
            </Link>
          </div>
          
          {pageContent && pageContent.length > 0 ? (
            <PageContentTable 
              data={pageContent} 
              onDelete={deletePageContent}
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No page content sections found</p>
              <Link href="/admin/dashboard/page-content/new">
                <Button>Create Your First Content Section</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Total Pages</h3>
          <p className="text-2xl font-bold text-blue-600">
            {(standalonePages?.length || 0) + (pageContent?.length || 0)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900">Published Pages</h3>
          <p className="text-2xl font-bold text-green-600">
            {(standalonePages?.filter(p => p.is_published).length || 0) + 
             (pageContent?.filter(p => p.is_published).length || 0)}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-900">Draft Pages</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {(standalonePages?.filter(p => !p.is_published).length || 0) + 
             (pageContent?.filter(p => !p.is_published).length || 0)}
          </p>
        </div>
      </div>
    </div>
  )
}