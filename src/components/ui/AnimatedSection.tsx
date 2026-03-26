import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

function getTransform(direction: Direction, distance: number) {
  if (direction === 'up') {
    return `translate3d(0, ${distance}px, 0)`
  }

  if (direction === 'down') {
    return `translate3d(0, ${distance * -1}px, 0)`
  }

  if (direction === 'left') {
    return `translate3d(${distance * -1}px, 0, 0)`
  }

  if (direction === 'right') {
    return `translate3d(${distance}px, 0, 0)`
  }

  return 'none'
}

function buildTransition(duration: number, delay: number) {
  return `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s, filter ${duration}s ease-out ${delay}s`
}

export function AnimatedSection({
  children,
  direction = 'up',
  duration = 0.6,
  distance = 24,
  delay = 0,
  once = false,
  scale = 1,
  blur = 0,
  ignoreReducedMotion = true,
  className = '',
}: {
  children: ReactNode
  direction?: Direction
  duration?: number
  distance?: number
  delay?: number
  once?: boolean
  scale?: number
  blur?: number
  ignoreReducedMotion?: boolean
  className?: string
}) {
  const { ref, isInView, prefersReducedMotion } = useInView<HTMLDivElement>({ once, ignoreReducedMotion })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const hiddenTransform = getTransform(direction, distance)
  const transition = buildTransition(duration, delay)

  const hiddenStyle: CSSProperties = {
    opacity: 0,
    filter: blur > 0 ? `blur(${blur}px)` : 'none',
    transform: `${hiddenTransform} scale(${scale})`,
    transition,
    willChange: 'opacity, transform, filter',
  }

  const visibleStyle: CSSProperties = {
    opacity: 1,
    filter: 'none',
    transform: 'translate3d(0, 0, 0) scale(1)',
    transition,
    willChange: 'auto',
  }

  return (
    <div
      ref={ref}
      className={`animated-section ${className}`.trim()}
      style={isInView ? visibleStyle : hiddenStyle}
    >
      {children}
    </div>
  )
}
