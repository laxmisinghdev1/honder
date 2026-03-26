import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type UseInViewOptions = {
  once?: boolean
  threshold?: number
  rootMargin?: string
  ignoreReducedMotion?: boolean
}

export function useInView<T extends HTMLElement>({
  once = true,
  threshold = 0.08,
  rootMargin = '0px 0px -6% 0px',
  ignoreReducedMotion = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldIgnoreReducedMotion = ignoreReducedMotion
  const [isInView, setIsInView] = useState(shouldIgnoreReducedMotion ? false : prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion && !shouldIgnoreReducedMotion) {
      setIsInView(true)
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [once, prefersReducedMotion, rootMargin, shouldIgnoreReducedMotion, threshold])

  return { ref, isInView, prefersReducedMotion: shouldIgnoreReducedMotion ? false : prefersReducedMotion }
}
