import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'
import { ReviewBanner } from '@/components/ReviewBanner'
import { TestimonialCard } from '@/components/TestimonialCard'
import { LinkButton } from '@/components/Button'
import { testimonials } from '@/data/testimonials'
import { getReviewUrl } from '@/lib/maps'

export function Testimonials() {
  useSeo({
    title: 'Testimonials',
    description: `What customers say about their repair experience at ${business.name}.`,
    path: '/testimonials',
  })

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-rust">Testimonials</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-bold tracking-tightest text-ink-800">
            Told by the people who drove away.
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">
            The reviews below are placeholder examples until real customer feedback replaces them. For the current,
            verified reviews, see our Google Business Profile.
          </p>
        </div>

        <div className="mt-8 max-w-2xl">
          <ReviewBanner />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name + t.quote.slice(0, 10)} testimonial={t} />
          ))}
        </div>

        <div className="mt-12 rounded border border-ink-200 bg-paper-soft p-8 text-center">
          <h2 className="font-display font-semibold text-xl text-ink-800">Had work done with us?</h2>
          <p className="mt-2 text-ink-500">A review helps other drivers in the area find us.</p>
          <div className="mt-5">
            <LinkButton href={getReviewUrl()} external size="md">
              Leave a review on Google
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
