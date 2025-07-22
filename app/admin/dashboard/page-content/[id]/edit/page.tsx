import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PageContentForm } from "@/components/admin/page-content-form"

export default async function EditPageContentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: content, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !content) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageContentForm content={content} />
    </div>
  )
}