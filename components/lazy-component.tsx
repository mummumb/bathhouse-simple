"use client"

import { ComponentType, lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface LazyComponentProps {
  loader: () => Promise<{ default: ComponentType<any> }>
  height?: string | number
  props?: Record<string, any>
}

export function LazyComponent({ loader, height = 400, props = {} }: LazyComponentProps) {
  const Component = lazy(loader)
  
  return (
    <Suspense fallback={<Skeleton style={{ height }} />}>
      <Component {...props} />
    </Suspense>
  )
}