"use client"

import { useState, useEffect } from 'react'

export function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/csrf')
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token')
        }
        const data = await response.json()
        setCSRFToken(data.token)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCSRFToken()
  }, [])

  return { csrfToken, loading, error }
}