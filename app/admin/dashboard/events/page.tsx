import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { EventsTable } from "@/components/admin/EventsTable"
import { deleteEvent } from "@/app/admin/actions"

export default async function AdminEventsPage() {
  const supabase = await createClient()
  
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching events:", error)
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link href="/admin/dashboard/events/new">
          <Button>Create New Event</Button>
        </Link>
      </div>

      {events && events.length > 0 ? (
        <EventsTable 
          data={events} 
          onDelete={deleteEvent}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No events found</p>
          <Link href="/admin/dashboard/events/new">
            <Button>Create Your First Event</Button>
          </Link>
        </div>
      )}
    </div>
  )
}