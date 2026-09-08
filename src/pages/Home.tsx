import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'
import { LinkButton } from '@/components/Button'
import { SectionHeader } from '@/components/SectionHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { ProcessSteps } from '@/components/ProcessSteps'
import { LocationCard } from '@/components/LocationCard'
import { ReviewBanner } from '@/components/ReviewBanner'
import { TestimonialCard } from '@/components/TestimonialCard'
import { TrustBadges } from '@/components/TrustBadges'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'

export function Home() {
  useSeo({
    title: 'Paintless Dent Repair & Minor Collision',
    description: business.shortDescription,
    path: '/',
  })

  return (
    <>
      <Hero />
      <ValueStrip />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <SectionHeader
            title="What we repair"
            description="Door dings, hail damage, and minor collision damage — each estimate starts with an in-person look at the vehicle, not a guess."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-4xl">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} compact />
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/services" variant="ghost">
              More on each service
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-paper-soft border-y border-ink-100">
        <div className="container-page">
          <SectionHeader title="What happens next" description="A straightforward path from first call to driving away." />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader title="Why drivers choose us" />
            <ul className="mt-6 space-y-5">
              {[
                ['Direct insurance coordination', 'For hail and minor collision claims, we deal with the adjuster on scope, so you aren\u2019t the messenger.'],
                ['Paint-safe by default', 'If PDR will fix it, that\u2019s what we use — no filler, no repaint, no reason to touch a finish that doesn\u2019t need it.'],
                ['Honest eligibility calls', 'If a dent or scratch is outside what PDR or minor repair can fix, we\u2019ll say so up front instead of taking on a repair that won\u2019t hold.'],
                ['Plain-language updates', 'You\u2019ll know what stage the repair is at without having to chase us for it.'],
              ].map(([title, body]) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-rust" />
                  <div>
                    <p className="font-display font-semibold text-ink-800">{title}</p>
                    <p className="mt-1 text-sm text-ink-500 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <TrustBadges />
            <p className="text-xs text-ink-400 leading-relaxed">
              Credentials shown above are placeholders pending confirmation — see the README before launch.
            </p>
          </div>
        </div>
      </section>

      <LocationCard />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <SectionHeader title="What customers say" description="Real reviews will replace the examples below as they come in." />
          <div className="mt-8">
            <ReviewBanner />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name + t.quote.slice(0, 10)} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-800 text-paper">
      <div className="container-page grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div className="fade-up">
          <p className="text-sm font-semibold text-rust-300">{business.serviceArea}</p>
          <h1 className="mt-3 text-[2.5rem] sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.02] tracking-tightest">
            Dents, dings, and hail damage — gone, without touching your paint.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-paper/75 leading-relaxed">
            {business.name} specializes in paintless dent repair, door dings, hail damage, and minor collision
            repair — so a bad parking lot moment doesn't have to turn into a complicated one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/estimate" size="lg">
              Get a Free Estimate
            </LinkButton>
            <LinkButton href={business.phone.href} variant="ghost" size="lg" className="border-paper/30 text-paper hover:border-paper">
              Call {business.phone.display}
            </LinkButton>
          </div>
        </div>
        <PanelGraphic />
      </div>
    </section>
  )
}

function PanelGraphic() {
  return (
    <svg viewBox="0 0 480 380" className="w-full h-auto max-w-md mx-auto lg:max-w-none" role="img" aria-label="Illustration of an overlapping body panel repair diagram">
      <defs>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#45586B" />
          <stop offset="1" stopColor="#293441" />
        </linearGradient>
      </defs>
      <rect x="30" y="30" width="420" height="320" rx="4" fill="#2C2A25" />
      <rect x="60" y="60" width="180" height="130" rx="3" fill="url(#panelGrad)" />
      <rect x="250" y="60" width="170" height="80" rx="3" fill="#39362F" />
      <rect x="250" y="150" width="170" height="40" rx="3" fill="#9A3324" />
      <rect x="60" y="200" width="360" height="120" rx="3" fill="#39362F" />
      <g stroke="#EDEAE3" strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="60" y1="130" x2="420" y2="130" />
        <line x1="250" y1="60" x2="250" y2="320" />
      </g>
      <g stroke="#EDEAE3" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M90 240 h60 M90 260 h100 M90 280 h80" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function ValueStrip() {
  const items = [
    ['Free', 'estimates'],
    ['Direct', 'insurance coordination'],
    [business.founded === '[YEAR FOUNDED]' ? 'Locally' : `Since ${business.founded}`, 'owned & operated'],
  ]
  return (
    <div className="border-b border-ink-200 bg-white">
      <div className="container-page grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink-100">
        {items.map(([a, b]) => (
          <div key={a + b} className="py-6 text-center">
            <p className="font-display font-bold text-lg text-ink-800">{a}</p>
            <p className="text-sm text-ink-500">{b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinalCta() {
  return (
    <section className="bg-rust text-paper">
      <div className="container-page py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl">Ready to get your car looked at?</h2>
          <p className="mt-2 text-paper/85">Tell us what happened — most estimate requests get a response same day.</p>
        </div>
        <LinkButton href="/estimate" variant="light" size="lg" className="whitespace-nowrap">
          Get a Free Estimate
        </LinkButton>
      </div>
    </section>
  )
}
