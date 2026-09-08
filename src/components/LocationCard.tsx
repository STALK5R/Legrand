import { business } from '@/config/business'
import { getDirectionsUrl } from '@/lib/maps'
import { LinkButton } from './Button'

/**
 * The homepage's "major component" location splash called for in the
 * brief — styled as a stylized panel-and-route graphic rather than an
 * embedded map, so there's no dependency on a paid Maps API key.
 */
export function LocationCard() {
  return (
    <section className="bg-ink-800 text-paper">
      <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rust-300">Find your way to us</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-tightest">{business.name}</h2>
          <address className="mt-4 not-italic text-lg text-paper/85 leading-relaxed">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </address>
          <p className="mt-3 text-paper/70">{business.serviceArea}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href={getDirectionsUrl()} external size="lg">
              Get Directions
            </LinkButton>
            <LinkButton href={business.phone.href} variant="ghost" size="lg" className="border-paper/30 text-paper hover:border-paper">
              Call {business.phone.display}
            </LinkButton>
          </div>
        </div>

        <RouteGraphic />
      </div>
    </section>
  )
}

function RouteGraphic() {
  return (
    <svg viewBox="0 0 480 320" className="w-full h-auto" role="img" aria-label="Stylized map showing the route to the shop">
      <rect x="0" y="0" width="480" height="320" rx="4" fill="#2C2A25" />
      <g stroke="#39362F" strokeWidth="1">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 46 + 20} x2="480" y2={i * 46 + 20} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 56 + 20} y1="0" x2={i * 56 + 20} y2="320" />
        ))}
      </g>
      <path
        d="M40 280 C 120 280, 140 180, 220 170 S 340 90, 420 60"
        fill="none"
        stroke="#9A3324"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
      <circle cx="40" cy="280" r="6" fill="#8CA0B3" />
      <g transform="translate(410, 40)">
        <path d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 20 10 20s10-12.5 10-20c0-5.5-4.5-10-10-10z" fill="#9A3324" />
        <circle cx="10" cy="10" r="4" fill="#EDEAE3" />
      </g>
    </svg>
  )
}
