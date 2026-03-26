import type { ReactNode } from 'react'

type BadgeColor = 'accent' | 'accent-hot' | 'accent-soft' | 'muted'

export function BadgePill({
  children,
  color = 'accent',
  className = '',
  onClick,
  active = false,
}: {
  children: ReactNode
  color?: BadgeColor
  className?: string
  onClick?: () => void
  active?: boolean
}) {
  const Element = onClick ? 'button' : 'span'

  return (
    <Element
      className={`badge-pill badge-pill--${color} ${active ? 'badge-pill--active' : ''} ${className}`.trim()}
      {...(onClick ? { onClick, type: 'button' as const } : {})}
    >
      {children}
    </Element>
  )
}
