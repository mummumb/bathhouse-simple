"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Oops! Something went wrong.
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-500">Error details: {error.message}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
            href="/"
          >
            Go to Homepage
          </Link>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
