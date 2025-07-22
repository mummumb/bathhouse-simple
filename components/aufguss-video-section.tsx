"use client"

import type { PageContent } from "@/lib/types"
import OptimizedVideo from "./optimized-video"
import { Button } from "./ui/button"
import Link from "next/link"

export default function AufgussVideoSection({ videoContent }: { videoContent: PageContent[] | null }) {
  const content = videoContent?.[0]

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <OptimizedVideo
        src="/videos/aufguss-ritual.mp4"
        poster="/images/aufguss-video-poster.png"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 p-4">
        <h2 className="text-4xl md:text-6xl font-bold">{content?.title || "Experience Aufguss"}</h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">{content?.content || "A unique sauna ritual."}</p>
        <Button asChild className="mt-8">
          <Link href="/rituals/aufguss">Book Now</Link>
        </Button>
      </div>
    </section>
  )
}
