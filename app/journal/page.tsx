import JournalCard from "@/components/journal-card"
import { getJournalPosts } from "@/lib/data-utils"

export const dynamic = 'force-dynamic'

export default async function JournalPage() {
  try {
    const posts = await getJournalPosts()

    return (
    <main className="min-h-screen bg-white">
      <header className="bg-bathhouse-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-heading text-bathhouse-black tracking-tight">Our Journal</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-bathhouse-slate">
            Insights, stories, and inspiration from the world of wellness and community.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-bathhouse-slate">No journal posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
    )
  } catch (error) {
    console.error('Error loading journal posts:', error)
    return (
      <main className="min-h-screen bg-white">
        <header className="bg-bathhouse-cream py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-heading text-bathhouse-black tracking-tight">Our Journal</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-bathhouse-slate">
              We're having trouble loading our journal posts. Please try again later.
            </p>
          </div>
        </header>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <p className="text-lg text-bathhouse-slate">Unable to load journal posts at this time.</p>
          </div>
        </div>
      </main>
    )
  }
}
