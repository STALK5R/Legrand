import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-display font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-rust text-paper hover:bg-rust-600 active:bg-rust-700',
  secondary: 'bg-ink-800 text-paper hover:bg-ink-700',
  ghost: 'bg-transparent text-ink-800 border border-ink-300 hover:border-ink-800',
  light: 'bg-paper text-ink-800 hover:bg-white',
}

const sizes: Record<Size, string> = {
  md: 'text-[0.95rem] px-5 py-3 rounded',
  lg: 'text-base px-6 py-4 rounded',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkProps = CommonProps & { href: string; external?: boolean }
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

export function LinkButton({ href, external, variant = 'primary', size = 'md', className, children }: LinkProps) {
  const cls = cn(base, variants[variant], sizes[size], className)
  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={cls} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={cls}>
      {children}
    </Link>
  )
}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}
