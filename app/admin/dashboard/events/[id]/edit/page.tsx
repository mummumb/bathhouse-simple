import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { EventForm } from "@/components/admin/event-form"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !event) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <EventForm event={event} />
    </div>
  )
}