import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { RitualForm } from "@/components/admin/ritual-form"

export default async function EditRitualPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: ritual, error } = await supabase
    .from("rituals")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !ritual) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <RitualForm ritual={ritual} />
    </div>
  )
}