import type { ReactNode } from 'react'

type HighlightVariant = 'warm' | 'hot' | 'ink' | 'gold'

const variantClassMap: Record<HighlightVariant, string> = {
  warm: 'highlight-warm',
  hot: 'highlight-hot',
  ink: 'highlight-ink',
  gold: 'highlight-gold',
}

export function HighlightWord({
  children,
  variant = 'warm',
  className = '',
}: {
  children: ReactNode
  variant?: HighlightVariant
  className?: string
}) {
  return <span className={`highlight-word ${variantClassMap[variant]} ${className}`.trim()}>{children}</span>
}
