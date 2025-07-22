import type { JournalPost } from "@/lib/types"
import JournalCard from "./journal-card"

export default function JournalSection({ posts = [] }: { posts?: JournalPost[] }) {
  // Safely slice posts with null checks
  const displayPosts = (posts || []).slice(0, 3)

  return (
    <section id="journal" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-bathhouse-black text-center mb-12">From the Journal</h2>
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-bathhouse-slate">No journal posts available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
