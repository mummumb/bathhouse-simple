import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import StandalonePageForm from "@/components/admin/standalone-page-form"

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: page, error } = await supabase
    .from("standalone_pages")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !page) {
    notFound()
  }

  // Convert snake_case to camelCase for the form
  const formattedPage = {
    ...page,
    metaDescription: page.meta_description,
    isPublished: page.is_published,
    createdAt: page.created_at,
    updatedAt: page.updated_at
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Page</h1>
        <p className="text-gray-600">
          Editing: <span className="font-medium">{page.title}</span>
        </p>
      </div>
      
      <StandalonePageForm page={formattedPage} />
    </div>
  )
}