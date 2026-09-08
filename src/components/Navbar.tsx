import { useEffect, useState } from 'react'
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { navLinks } from '@/data/nav'
import { business } from '@/config/business'
import { LinkButton } from './Button'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink-200">
      <div className="container-page flex h-[72px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-ink-800" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded bg-ink-800 text-paper text-sm">
            {business.name
              .replace(/[[\]]/g, '')
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')}
          </span>
          <span className="hidden sm:inline">{business.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((link) => (
            <RouterNavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'text-[0.95rem] font-medium transition-colors hover:text-rust',
                  isActive ? 'text-rust' : 'text-ink-700',
                )
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={business.phone.href} className="text-sm font-semibold text-ink-700 hover:text-rust">
            {business.phone.display}
          </a>
          <LinkButton href="/estimate" size="md">
            Get an Estimate
          </LinkButton>
        </div>

        <button
          type="button"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded border border-ink-300"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                'absolute left-0 top-0 h-[2px] w-5 bg-ink-800 transition-transform',
                open && 'top-1.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1.5 h-[2px] w-5 bg-ink-800 transition-opacity',
                open && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-3 h-[2px] w-5 bg-ink-800 transition-transform',
                open && 'top-1.5 -rotate-45',
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-ink-200 bg-paper">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'py-3 text-lg font-medium border-b border-ink-100 last:border-b-0',
                    isActive ? 'text-rust' : 'text-ink-800',
                  )
                }
              >
                {link.label}
              </RouterNavLink>
            ))}
            <div className="flex flex-col gap-3 pt-5">
              <LinkButton href="/estimate" size="lg" className="w-full">
                Get a Free Estimate
              </LinkButton>
              <LinkButton href={business.phone.href} variant="ghost" size="lg" className="w-full">
                Call {business.phone.display}
              </LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
