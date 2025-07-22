import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Skeleton */}
      <header className="flex h-16 items-center justify-between px-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-10" />
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 p-4 text-center">
          <Skeleton className="h-12 w-3/4 max-w-lg" />
          <Skeleton className="h-6 w-1/2 max-w-md" />
          <Skeleton className="h-12 w-40" />
        </div>
      </section>

      {/* Section Skeletons */}
      <section className="container mx-auto px-4 py-12">
        <Skeleton className="mb-8 h-10 w-1/3 mx-auto" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Skeleton className="mb-8 h-10 w-1/2 mx-auto" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-100 p-8 text-center">
        <Skeleton className="h-6 w-1/4 mx-auto" />
        <Skeleton className="mt-4 h-4 w-1/3 mx-auto" />
      </footer>
    </div>
  )
}
