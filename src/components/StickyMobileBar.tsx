import { business } from '@/config/business'
import { getDirectionsUrl } from '@/lib/maps'
import { Link } from 'react-router-dom'

/**
 * Fixed bottom action bar shown on small screens only. Kept to three
 * unambiguous actions per the brief: Call, Directions, Get Estimate.
 */
export function StickyMobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-ink-700 bg-ink-800 text-paper [padding-bottom:env(safe-area-inset-bottom)]">
      <a href={business.phone.href} className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold active:bg-ink-700">
        <PhoneIcon />
        Call
      </a>
      <a
        href={getDirectionsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold border-x border-ink-700 active:bg-ink-700"
      >
        <PinIcon />
        Directions
      </a>
      <Link to="/estimate" className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold bg-rust active:bg-rust-600">
        <EstimateIcon />
        Estimate
      </Link>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function EstimateIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15h6M9 11h6M9 19h3" />
    </svg>
  )
}
