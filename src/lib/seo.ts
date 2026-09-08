import { useEffect } from 'react'

type SeoOptions = {
  title: string
  description: string
  path?: string
}

const SITE_NAME = 'Collision Center'
const SITE_URL_PLACEHOLDER = 'https://REPLACE-WITH-YOUR-DOMAIN.com'

/**
 * Lightweight document-head manager. Avoids pulling in react-helmet just
 * to set a title and a few meta tags for a handful of routes.
 */
export function useSeo({ title, description, path = '/' }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    document.title = fullTitle

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', `${SITE_URL_PLACEHOLDER}${path}`)
    setMeta('name', 'twitter:card', 'summary_large_image')

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL_PLACEHOLDER}${path}`)
  }, [title, description, path])
}
