import { business } from '@/config/business'

/**
 * Renders the shop's credentials. Each entry is visually flagged as a
 * placeholder until isPlaceholder is set to false in business.ts, so
 * a demo build never implies a credential the shop doesn't hold.
 */
export function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {business.credentials.map((c) => (
        <li
          key={c.label}
          className="flex flex-col gap-1 rounded border border-ink-200 bg-paper-soft px-4 py-4 text-center"
        >
          <span className="font-display font-semibold text-sm text-ink-700">{c.label}</span>
          {c.isPlaceholder && (
            <span className="text-[11px] uppercase tracking-wide text-steel-400">Placeholder</span>
          )}
        </li>
      ))}
    </ul>
  )
}
