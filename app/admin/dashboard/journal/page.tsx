import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import JournalTable from "@/components/admin/JournalTable"

export default async function AdminJournalPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("journal_posts")
    .select("*")
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching journal posts:", error)
  }

  const deleteJournalPost = async (id: string) => {
    'use server'
    const { deleteJournalPost } = await import("@/app/admin/actions")
    return deleteJournalPost(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Journal Posts</h1>
        <Link href="/admin/dashboard/journal/new">
          <Button>Create New Post</Button>
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <JournalTable
          data={posts}
          onDelete={deleteJournalPost}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No journal posts found</p>
          <Link href="/admin/dashboard/journal/new">
            <Button>Create Your First Post</Button>
          </Link>
        </div>
      )}
    </div>
  )
}