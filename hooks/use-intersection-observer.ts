"use client"

import { useEffect, useRef, useState } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    // Provide default options with safe fallbacks
    const observerOptions: IntersectionObserverInit = {
      threshold: options?.threshold ?? 0.1,
      root: options?.root ?? null,
      rootMargin: options?.rootMargin ?? "0px",
    }

    const observer = new IntersectionObserver(([entry]) => {
      const isCurrentlyIntersecting = entry.isIntersecting
      setIsIntersecting(isCurrentlyIntersecting)

      if (isCurrentlyIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
    }, observerOptions)

    observer.observe(target)

    return () => {
      observer.unobserve(target)
      observer.disconnect()
    }
  }, [options?.threshold, options?.root, options?.rootMargin, hasIntersected])

  return {
    targetRef,
    isIntersecting,
    hasIntersected,
  }
}
