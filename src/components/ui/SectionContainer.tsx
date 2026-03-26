import type { ReactNode } from 'react'

export function SectionContainer({
  children,
  as = 'section',
  id,
  className = '',
  narrow = false,
}: {
  children: ReactNode
  as?: 'section' | 'div'
  id?: string
  className?: string
  narrow?: boolean
}) {
  const Component = as

  return (
    <Component className={`section-container ${narrow ? 'section-container--narrow' : ''} ${className}`.trim()} id={id}>
      <div className="section-container__inner">{children}</div>
    </Component>
  )
}
