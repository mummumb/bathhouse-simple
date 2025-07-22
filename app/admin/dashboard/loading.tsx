import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24" />
      </header>
      <div className="flex flex-1">
        <nav className="w-64 border-r bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
          <ul className="space-y-2">
            <li>
              <Skeleton className="h-6 w-40" />
            </li>
            <li>
              <Skeleton className="h-6 w-36" />
            </li>
            <li>
              <Skeleton className="h-6 w-44" />
            </li>
            <li>
              <Skeleton className="h-6 w-32" />
            </li>
            <li>
              <Skeleton className="h-6 w-48" />
            </li>
            <li>
              <Skeleton className="h-6 w-40" />
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-4">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-40 w-full" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
