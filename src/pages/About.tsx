import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'
import { SectionHeader } from '@/components/SectionHeader'
import { TrustBadges } from '@/components/TrustBadges'
import { LinkButton } from '@/components/Button'

export function About() {
  useSeo({
    title: 'About Us',
    description: `The story, people, and standards behind ${business.name}.`,
    path: '/about',
  })

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page max-w-2xl">
          <p className="text-sm font-semibold text-rust">About us</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-bold tracking-tightest text-ink-800">
            A local shop, built around getting it right.
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">{business.shortDescription}</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-paper-soft border-y border-ink-100">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="aspect-[4/3] rounded border border-ink-200 bg-ink-100 flex items-center justify-center text-ink-400 text-sm">
            [Owner photo placeholder]
          </div>
          <div>
            <SectionHeader title={business.owner.name} />
            <p className="mt-4 text-ink-600 leading-relaxed">{business.owner.bio}</p>
            <p className="mt-4 text-sm text-ink-400">{business.owner.title}</p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeader title="What we hold ourselves to" />
          <div className="mt-6">
            <TrustBadges />
          </div>
          <p className="mt-4 text-xs text-ink-400 max-w-lg leading-relaxed">
            Credentials above are placeholders until confirmed — replace them in{' '}
            <code className="font-mark">src/config/business.ts</code> once verified.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-ink-800 text-paper">
        <div className="container-page">
          <SectionHeader title="Our team" tone="light" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {business.team.map((member) => (
              <div key={member.name} className="rounded border border-paper/15 p-6">
                <div className="aspect-square rounded bg-paper/10 flex items-center justify-center text-paper/40 text-xs mb-4">
                  [Team photo placeholder]
                </div>
                <p className="font-display font-semibold">{member.name}</p>
                <p className="text-sm text-paper/60">{member.role}</p>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-6 rounded border border-ink-200 bg-paper-soft p-8">
          <div>
            <h2 className="font-display font-semibold text-2xl text-ink-800">Want to see the shop for yourself?</h2>
            <p className="mt-2 text-ink-500">Stop by, or start with an online estimate first.</p>
          </div>
          <LinkButton href="/contact" size="lg">
            Get Directions & Contact
          </LinkButton>
        </div>
      </section>
    </>
  )
}
