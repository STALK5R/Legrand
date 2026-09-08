import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { business } from '@/config/business'
import { footerServiceLinks } from '@/data/nav'
import { services } from '@/data/services'
import { getDirectionsUrl } from '@/lib/maps'
import { LinkButton } from './Button'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 text-paper/85">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="font-display font-bold text-lg text-paper">
            {business.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-paper/60 max-w-xs">{business.shortDescription}</p>
          <div className="mt-5 flex gap-3">
            {business.social.facebook && (
              <SocialLink href={business.social.facebook} label="Facebook">
                <path d="M13 22v-8h3l1-4h-4V7.5C13 6.5 13.5 6 14.7 6H17V2.2C16.6 2.1 15.3 2 14 2 11 2 9 3.8 9 7v3H6v4h3v8z" />
              </SocialLink>
            )}
            {business.social.instagram && (
              <SocialLink href={business.social.instagram} label="Instagram">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="0.9" />
              </SocialLink>
            )}
          </div>
        </div>

        <div>
          <p className="font-display font-semibold text-paper text-sm mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            {footerServiceLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-paper/70 hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-paper text-sm mb-4">Services</p>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug} className="text-paper/70">
                {s.name}
              </li>
            ))}
            <li>
              <Link to="/services" className="text-rust-300 hover:text-rust-100">
                View all services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-paper text-sm mb-4">Visit</p>
          <address className="not-italic text-sm text-paper/70 leading-relaxed">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </address>
          <p className="mt-3 text-sm">
            <a href={business.phone.href} className="text-paper/70 hover:text-paper">
              {business.phone.display}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={business.email.href} className="text-paper/70 hover:text-paper break-all">
              {business.email.display}
            </a>
          </p>
          <div className="mt-4">
            <LinkButton href={getDirectionsUrl()} external variant="ghost" size="md" className="border-paper/25 text-paper hover:border-paper">
              Get Directions
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/50">
          <p>
            © {year} {business.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-paper/80">
              Privacy Policy
            </Link>
            <Link to="/estimate" className="hover:text-paper/80">
              Get an Estimate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded border border-paper/20 text-paper/70 hover:border-paper hover:text-paper"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  )
}
