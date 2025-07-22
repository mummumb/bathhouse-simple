import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">404 - Page Not Found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
          href="/"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
