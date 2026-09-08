import type { Testimonial } from '@/data/testimonials'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col rounded border border-ink-200 bg-white p-6 h-full">
      <Stars count={testimonial.rating} />
      <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-4 pt-4 border-t border-ink-100 text-sm">
        <span className="font-semibold text-ink-800">{testimonial.name}</span>
        {testimonial.vehicle && <span className="text-ink-400"> — {testimonial.vehicle}</span>}
        {testimonial.isPlaceholder && (
          <span className="ml-2 text-[11px] uppercase tracking-wide text-steel-400">Demo content</span>
        )}
      </figcaption>
    </figure>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-rust" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
        </svg>
      ))}
    </div>
  )
}
