import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'

export function PrivacyPolicy() {
  useSeo({ title: 'Privacy Policy', description: `Privacy policy for ${business.name}.`, path: '/privacy-policy' })

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page max-w-2xl prose-basic">
        <h1 className="text-4xl font-display font-bold text-ink-800">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-400">Last updated: [DATE — set when this page is finalized]</p>

        <div className="mt-8 space-y-6 text-ink-600 leading-relaxed">
          <p>
            [Placeholder — this page is a starting template, not legal advice. Replace this content with a privacy
            policy reviewed for your business, your state's requirements, and the actual data your forms collect.]
          </p>
          <div>
            <h2 className="font-display font-semibold text-lg text-ink-800">Information we collect</h2>
            <p className="mt-2">
              [Placeholder — describe what the Estimate and Contact forms collect: name, contact details, vehicle
              information, damage description, and any photos submitted.]
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg text-ink-800">How we use it</h2>
            <p className="mt-2">
              [Placeholder — describe that submissions are used only to prepare and follow up on repair estimates
              and shop communication, and are not sold or shared for marketing purposes.]
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg text-ink-800">Contact us</h2>
            <p className="mt-2">
              Questions about this policy can be sent to{' '}
              <a href={business.email.href} className="text-ink-800 font-semibold hover:text-rust">
                {business.email.display}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
