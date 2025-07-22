import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Calendar, FileText, Layers, Files, Users, TrendingUp } from "lucide-react"

// Add dynamic configuration to prevent static rendering
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  try {
    const supabase = await createClient()
    
    // Get counts for dashboard with individual error handling
    const [eventsResult, journalResult, ritualsResult, pagesResult] = await Promise.allSettled([
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('journal_posts').select('*', { count: 'exact', head: true }),
      supabase.from('rituals').select('*', { count: 'exact', head: true }),
      supabase.from('standalone_pages').select('*', { count: 'exact', head: true })
    ])

    // Extract counts with error handling for each query
    const eventCount = eventsResult.status === 'fulfilled' && eventsResult.value.count !== null 
      ? eventsResult.value.count 
      : 0
    const journalCount = journalResult.status === 'fulfilled' && journalResult.value.count !== null 
      ? journalResult.value.count 
      : 0
    const ritualCount = ritualsResult.status === 'fulfilled' && ritualsResult.value.count !== null 
      ? ritualsResult.value.count 
      : 0
    const pageCount = pagesResult.status === 'fulfilled' && pagesResult.value.count !== null 
      ? pagesResult.value.count 
      : 0

  const dashboardCards = [
    {
      title: "Events",
      count: eventCount || 0,
      icon: Calendar,
      href: "/admin/dashboard/events",
      color: "bg-bathhouse-teal"
    },
    {
      title: "Journal Posts",
      count: journalCount || 0,
      icon: FileText,
      href: "/admin/dashboard/journal",
      color: "bg-bathhouse-pink"
    },
    {
      title: "Rituals",
      count: ritualCount || 0,
      icon: Layers,
      href: "/admin/dashboard/rituals",
      color: "bg-bathhouse-green"
    },
    {
      title: "Pages",
      count: pageCount || 0,
      icon: Files,
      href: "/admin/dashboard/pages",
      color: "bg-bathhouse-blue"
    }
  ]

    return (
      <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-light mb-2">Welcome to Bathhouse Studio Admin</h1>
        <p className="text-bathhouse-slate">Manage your content, events, and website pages from here.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="dashboard-card cursor-pointer group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-bathhouse-slate">{card.title}</h3>
                  <p className="text-3xl font-heading mt-2">{card.count}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg bg-opacity-10`}>
                  <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="mt-4 text-sm text-bathhouse-slate group-hover:text-bathhouse-teal transition-colors">
                View all →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-bathhouse-cream rounded-lg p-6">
        <h2 className="text-xl font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/dashboard/events/new">
            <div className="bg-white p-4 rounded-md hover:shadow-md transition-shadow">
              <Calendar className="w-5 h-5 text-bathhouse-teal mb-2" />
              <h3 className="font-medium">Create Event</h3>
              <p className="text-sm text-bathhouse-slate">Add a new event or retreat</p>
            </div>
          </Link>
          <Link href="/admin/dashboard/journal/new">
            <div className="bg-white p-4 rounded-md hover:shadow-md transition-shadow">
              <FileText className="w-5 h-5 text-bathhouse-pink mb-2" />
              <h3 className="font-medium">Write Journal Post</h3>
              <p className="text-sm text-bathhouse-slate">Share insights and updates</p>
            </div>
          </Link>
          <Link href="/admin/dashboard/rituals/new">
            <div className="bg-white p-4 rounded-md hover:shadow-md transition-shadow">
              <Layers className="w-5 h-5 text-bathhouse-green mb-2" />
              <h3 className="font-medium">Add Ritual</h3>
              <p className="text-sm text-bathhouse-slate">Create a new ritual offering</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    )
  } catch (error) {
    console.error("Error loading admin dashboard:", error)
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h1 className="text-2xl font-heading text-red-700 mb-4">Error Loading Dashboard</h1>
        <p className="text-red-600 mb-4">There was a problem loading the admin dashboard. Please try again later or contact support.</p>
        <pre className="bg-white p-4 rounded text-sm overflow-auto">{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }
}