import type { Service } from '@/data/services'
import { LinkButton } from './Button'

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <article className="flex flex-col rounded border border-ink-200 bg-white p-6 h-full">
      <ServiceIcon slug={service.slug} />
      <h3 className="mt-4 font-display font-semibold text-xl text-ink-800">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.summary}</p>
      {!compact && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">{service.detail}</p>
          <ul className="mt-4 space-y-1.5">
            {service.benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-ink-600">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rust" />
                {b}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-5 pt-1">
        <LinkButton href="/estimate" variant="ghost" size="md">
          Get an estimate
        </LinkButton>
      </div>
    </article>
  )
}

function ServiceIcon({ slug }: { slug: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded bg-ink-800 text-paper">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        {slug === 'paintless-dent-repair' ? (
          <>
            <path d="M4 15c3-1 5-4 8-4s5 3 8 4" />
            <path d="M4 10c3-1 5-4 8-4s5 3 8 4" strokeOpacity="0.4" />
          </>
        ) : slug === 'door-dings' ? (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M9 12a3 3 0 0 1 6 0" />
          </>
        ) : slug === 'hail-damage-repair' ? (
          <>
            <path d="M6 10a4 4 0 1 1 7.5-2 4.5 4.5 0 0 1 4 6.5H6a3.5 3.5 0 0 1 0-7z" />
            <path d="M8 17v3M12 17v3M16 17v3" strokeOpacity="0.6" />
          </>
        ) : (
          <path d="M3 13l2-6h14l2 6M5 13h14v5H5zM7 18v2M17 18v2" />
        )}
      </svg>
    </div>
  )
}
