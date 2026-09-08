/**
 * ============================================================================
 * CENTRAL BUSINESS CONFIGURATION
 * ============================================================================
 * Every business-specific detail on the site is read from this file.
 * Replace the placeholder values below with the real business information
 * and the entire site — navigation, footer, contact page, structured data,
 * map links, phone links — updates automatically.
 *
 * Nothing in src/pages or src/components should contain a hardcoded phone
 * number, address, or URL. If you find one, it's a bug — move it here.
 * ============================================================================
 */

export const business = {
  // ---- Identity ------------------------------------------------------------
  name: '[SHOP NAME]',
  legalName: '[SHOP NAME] LLC',
  tagline: '[Short tagline — e.g. "Dent, ding, and hail repair, done right."]',
  shortDescription:
    '[One or two sentences describing the shop for the footer and SEO meta description. Written from the customer’s point of view — e.g. "We fix door dings, hail damage, and minor collision damage — most of it without ever touching your factory paint."]',
  founded: '[YEAR FOUNDED]',
  serviceArea: '[SERVICE AREA — e.g. "Springfield and the surrounding county"]',

  // ---- Contact ---------------------------------------------------------
  phone: {
    display: '(555) 555-5555',
    // Digits only, with country code, for tel: links.
    href: 'tel:+15555555555',
  },
  email: {
    display: '[email protected]',
    href: 'mailto:[email protected]',
  },

  // ---- Location --------------------------------------------------------
  address: {
    street: '[STREET ADDRESS]',
    city: '[CITY]',
    state: '[STATE]',
    zip: '[ZIP]',
    // Full one-line format, used in structured data and footer.
    full: '[STREET ADDRESS], [CITY], [STATE] [ZIP]',
  },

  // Replace with the shop's real Google Maps share link (Maps app > Share).
  googleMapsUrl: 'https://maps.google.com/?q=REPLACE_WITH_SHOP_ADDRESS',
  // Replace with the shop's Google Business Profile / "leave a review" link.
  googleBusinessProfileUrl: 'https://g.page/r/REPLACE_WITH_PLACE_ID/review',

  // ---- Hours -------------------------------------------------------------
  // Shown on Contact page, footer, and used for structured data.
  hours: [
    { day: 'Monday', open: '8:00 AM', close: '5:30 PM' },
    { day: 'Tuesday', open: '8:00 AM', close: '5:30 PM' },
    { day: 'Wednesday', open: '8:00 AM', close: '5:30 PM' },
    { day: 'Thursday', open: '8:00 AM', close: '5:30 PM' },
    { day: 'Friday', open: '8:00 AM', close: '5:30 PM' },
    { day: 'Saturday', open: '9:00 AM', close: '1:00 PM' },
    { day: 'Sunday', open: null, close: null }, // null = closed
  ],

  // ---- Social --------------------------------------------------------------
  social: {
    facebook: 'https://facebook.com/REPLACE_WITH_HANDLE',
    instagram: 'https://instagram.com/REPLACE_WITH_HANDLE',
    // Add or remove entries as needed — the Footer and Contact page render
    // whatever is present here.
  },

  // ---- Trust / credentials --------------------------------------------
  // Everything here is a placeholder. Do not display any of these as real
  // until the shop actually holds the credential — see README "Trust
  // badges" section. isPlaceholder controls the "placeholder" styling/label
  // used in the TrustBadges component.
  credentials: [
    { label: '[PDR-Certified Technicians — placeholder]', isPlaceholder: true },
    { label: '[Minor Collision & Refinish Training — placeholder]', isPlaceholder: true },
    { label: '[Lifetime Warranty on Repairs — placeholder]', isPlaceholder: true },
    { label: '[Locally Owned & Operated — placeholder]', isPlaceholder: true },
  ],

  warrantyStatement:
    '[Placeholder — describe the shop’s actual warranty here once defined (many PDR/minor-collision shops offer a warranty against a repaired dent reappearing or a paint-match issue). Do not publish a warranty claim until it is confirmed.]',

  owner: {
    name: '[OWNER NAME]',
    title: '[Owner / General Manager]',
    bio: '[Placeholder — a few sentences of the real owner story: background, why they opened the shop, what they care about.]',
  },

  team: [
    // Add real team members here. Photos live in src/assets/team/ —
    // see README "Images" section for the expected file naming.
    { name: '[TEAM MEMBER]', role: '[Role]', bio: '[Placeholder bio.]' },
  ],
} as const

export type Business = typeof business
