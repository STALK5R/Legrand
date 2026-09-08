import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'
import { EstimateForm } from '@/components/EstimateForm'

export function Estimate() {
  useSeo({
    title: 'Get a Free Estimate',
    description: `Request a dent, hail, or minor collision repair estimate from ${business.name}. Tell us about the damage and add photos — we'll follow up to schedule an inspection.`,
    path: '/estimate',
  })

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page max-w-3xl">
        <p className="text-sm font-semibold text-rust">Get an estimate</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-display font-bold tracking-tightest text-ink-800">
          Tell us what happened to your car.
        </h1>
        <p className="mt-4 text-lg text-ink-500 leading-relaxed max-w-xl">
          Fill out as much as you can below — the more detail, the better we can prepare before your vehicle arrives.
          In a hurry or dealing with something urgent? Call the shop directly at{' '}
          <a href={business.phone.href} className="font-semibold text-ink-800 hover:text-rust">
            {business.phone.display}
          </a>
          .
        </p>

        <div className="mt-10">
          <EstimateForm />
        </div>
      </div>
    </section>
  )
}
