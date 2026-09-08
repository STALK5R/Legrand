import { useSeo } from '@/lib/seo'
import { LinkButton } from '@/components/Button'
import { business } from '@/config/business'

export function ThankYou() {
  useSeo({ title: 'Thank You', description: 'Your request has been received.', path: '/thank-you' })

  return (
    <section className="py-24 text-center">
      <div className="container-page max-w-lg">
        <h1 className="text-4xl font-display font-bold text-ink-800">Thank you.</h1>
        <p className="mt-4 text-ink-500 leading-relaxed">
          We've received your request and will be in touch soon. If it's urgent, call the shop directly at{' '}
          <a href={business.phone.href} className="font-semibold text-ink-800 hover:text-rust">
            {business.phone.display}
          </a>
          .
        </p>
        <div className="mt-8">
          <LinkButton href="/">Back to home</LinkButton>
        </div>
      </div>
    </section>
  )
}
