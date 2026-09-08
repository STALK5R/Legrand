import { business } from '@/config/business'
import { getDirectionsUrl } from '@/lib/maps'

export function ContactCard() {
  return (
    <div className="rounded border border-ink-200 bg-white p-6 sm:p-8 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Phone</p>
        <a href={business.phone.href} className="text-xl font-display font-semibold text-ink-800 hover:text-rust">
          {business.phone.display}
        </a>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Email</p>
        <a href={business.email.href} className="text-lg text-ink-800 hover:text-rust break-all">
          {business.email.display}
        </a>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Address</p>
        <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="block text-lg text-ink-800 hover:text-rust">
          {business.address.street}
          <br />
          {business.address.city}, {business.address.state} {business.address.zip}
        </a>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Hours</p>
        <ul className="mt-1 text-sm text-ink-600 space-y-0.5">
          {business.hours.map((h) => (
            <li key={h.day} className="flex justify-between gap-6">
              <span>{h.day}</span>
              <span>{h.open ? `${h.open} – ${h.close}` : 'Closed'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
