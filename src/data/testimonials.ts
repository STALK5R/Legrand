export type Testimonial = {
  name: string
  vehicle?: string
  rating: 1 | 2 | 3 | 4 | 5
  quote: string
  isPlaceholder: true
}

/**
 * DEMO CONTENT — every entry below is a placeholder, not a real review.
 * Replace with actual customer reviews once available (copy them
 * verbatim with permission, or link out to Google instead of
 * paraphrasing). Do not leave isPlaceholder content live on a
 * production site — see README "Testimonials" section.
 */
export const testimonials: Testimonial[] = [
  {
    name: '[Placeholder reviewer]',
    vehicle: '[Vehicle, e.g. 2021 Honda Accord]',
    rating: 5,
    quote:
      '[Placeholder review text. Replace with a real customer quote — e.g. how a door ding or hail dent turned out, or how fast the repair was.]',
    isPlaceholder: true,
  },
  {
    name: '[Placeholder reviewer]',
    vehicle: '[Vehicle]',
    rating: 5,
    quote: '[Placeholder review text.]',
    isPlaceholder: true,
  },
  {
    name: '[Placeholder reviewer]',
    vehicle: '[Vehicle]',
    rating: 4,
    quote: '[Placeholder review text.]',
    isPlaceholder: true,
  },
  {
    name: '[Placeholder reviewer]',
    vehicle: '[Vehicle]',
    rating: 5,
    quote: '[Placeholder review text.]',
    isPlaceholder: true,
  },
  {
    name: '[Placeholder reviewer]',
    vehicle: '[Vehicle]',
    rating: 5,
    quote: '[Placeholder review text.]',
    isPlaceholder: true,
  },
  {
    name: '[Placeholder reviewer]',
    vehicle: '[Vehicle]',
    rating: 5,
    quote: '[Placeholder review text.]',
    isPlaceholder: true,
  },
]

// Placeholder aggregate rating shown next to the Google mark on the
// Testimonials page. Replace with the real figures from the Google
// Business Profile once reviews exist.
export const googleRatingPlaceholder = {
  average: 4.9,
  count: 0,
  isPlaceholder: true,
}
