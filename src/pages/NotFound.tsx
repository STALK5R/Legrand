import { useSeo } from '@/lib/seo'
import { LinkButton } from '@/components/Button'

export function NotFound() {
  useSeo({ title: 'Page Not Found', description: 'The page you were looking for could not be found.', path: '/404' })

  return (
    <section className="py-24 text-center">
      <div className="container-page max-w-lg">
        <p className="font-mark text-rust text-sm">404</p>
        <h1 className="mt-2 text-4xl font-display font-bold text-ink-800">Page not found.</h1>
        <p className="mt-4 text-ink-500 leading-relaxed">
          The page you're looking for may have moved. Try the homepage, or get a repair estimate directly.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href="/estimate" variant="ghost">
            Get an estimate
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
