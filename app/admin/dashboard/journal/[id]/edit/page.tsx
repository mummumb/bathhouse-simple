import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { JournalPostForm } from "@/components/admin/journal-post-form"

export default async function EditJournalPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <JournalPostForm post={post} />
    </div>
  )
}