import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/admin/DataTable"

export default async function AdminRitualsPage() {
  const supabase = await createClient()
  
  const { data: rituals, error } = await supabase
    .from("rituals")
    .select("*")
    .order("number", { ascending: true })

  if (error) {
    console.error("Error fetching rituals:", error)
  }

  const columns = [
    {
      key: "number",
      label: "Number",
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "subtitle",
      label: "Subtitle",
    },
    {
      key: "duration",
      label: "Duration",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rituals</h1>
        <Link href="/admin/dashboard/rituals/new">
          <Button>Create New Ritual</Button>
        </Link>
      </div>

      {rituals && rituals.length > 0 ? (
        <DataTable 
          data={rituals} 
          columns={columns}
          searchKey="title"
          editPath="/admin/dashboard/rituals"
          deleteAction={async (id: string) => {
            'use server'
            const { deleteRitual } = await import("@/app/admin/actions")
            return deleteRitual(id)
          }}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No rituals found</p>
          <Link href="/admin/dashboard/rituals/new">
            <Button>Create Your First Ritual</Button>
          </Link>
        </div>
      )}
    </div>
  )
}