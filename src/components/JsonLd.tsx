import { useEffect } from 'react'
import { business } from '@/config/business'

/**
 * Injects AutoBodyShop/LocalBusiness structured data. All values are
 * read from business.ts placeholders — replace those, not this file.
 */
export function JsonLd() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      name: business.name,
      image: 'https://REPLACE-WITH-YOUR-DOMAIN.com/og-image.jpg',
      telephone: business.phone.display,
      email: business.email.display,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
      },
      openingHoursSpecification: business.hours
        .filter((h) => h.open)
        .map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.day,
          opens: h.open,
          closes: h.close,
        })),
      sameAs: Object.values(business.social).filter(Boolean),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'business-jsonld'
    script.textContent = JSON.stringify(data)

    const existing = document.getElementById('business-jsonld')
    if (existing) existing.remove()
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}
