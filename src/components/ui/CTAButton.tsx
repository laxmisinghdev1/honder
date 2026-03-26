import type { ReactNode } from 'react'

type CTAButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: ReactNode
  className?: string
  target?: string
  rel?: string
  disabled?: boolean
}

export function CTAButton({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  target,
  rel,
  disabled = false,
}: CTAButtonProps) {
  const classes = [
    'cta-button',
    `cta-button--${variant}`,
    `cta-button--${size}`,
    fullWidth ? 'cta-button--full' : '',
    disabled ? 'cta-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} target={target} rel={rel}>
        <span>{children}</span>
        {icon}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {icon}
    </button>
  )
}
