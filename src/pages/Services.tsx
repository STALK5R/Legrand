import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'
import { SectionHeader } from '@/components/SectionHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { LinkButton } from '@/components/Button'
import { services } from '@/data/services'
import { faqs } from '@/data/faqs'

export function Services() {
  useSeo({
    title: 'Services',
    description: `Paintless dent repair, door dings, hail damage, and minor collision repair at ${business.name}.`,
    path: '/services',
  })

  return (
    <>
      <section className="py-14 sm:py-20 bg-ink-800 text-paper">
        <div className="container-page max-w-2xl">
          <p className="text-sm font-semibold text-rust-300">Services</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-bold tracking-tightest">
            A focused shop, not a general one.
          </h1>
          <p className="mt-4 text-lg text-paper/75 leading-relaxed">
            We specialize in paintless dent repair, door dings, hail damage, and minor collision repair. Not sure
            which applies to your car? An estimate covers the diagnosis — you don't need to know ahead of time.
          </p>
          <div className="mt-6">
            <LinkButton href="/estimate" size="lg">
              Get a Free Estimate
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 max-w-4xl">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-paper-soft border-t border-ink-100">
        <div className="container-page max-w-2xl">
          <SectionHeader title="Common questions" />
          <dl className="mt-8 divide-y divide-ink-200">
            {faqs.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="font-display font-semibold text-ink-800">{f.question}</dt>
                <dd className="mt-2 text-sm text-ink-500 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
