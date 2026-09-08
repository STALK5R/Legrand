export type Service = {
  slug: string
  name: string
  summary: string
  detail: string
  benefits: string[]
}

/**
 * This shop's scope is paintless dent repair, door dings, hail damage,
 * and minor collision repair — not full structural/frame work. Edit
 * copy freely; keep `slug` unique and URL-safe.
 */
export const services: Service[] = [
  {
    slug: 'paintless-dent-repair',
    name: 'Paintless Dent Repair',
    summary: 'Removes dents without repainting, filling, or sanding — as long as the factory paint is intact.',
    detail:
      'A technician works the metal back into shape from behind or beside the panel using specialized rods and tools, so the factory finish stays untouched. Most dents where the paint hasn\u2019t cracked or chipped are a good candidate.',
    benefits: ['Keeps your factory paint finish', 'Usually same-day', 'No fillers, sanding, or repainting'],
  },
  {
    slug: 'door-dings',
    name: 'Door Dings',
    summary: 'The everyday dents — shopping cart dings, parking lot mishaps, and creases from minor bumps.',
    detail: 'These are the most common repairs we do. Most are quick, affordable, and finished well within a day.',
    benefits: ['Fast turnaround', 'Straightforward, itemized pricing', 'No impact on paint history'],
  },
  {
    slug: 'hail-damage-repair',
    name: 'Hail Damage Repair',
    summary: 'Panel-by-panel dent removal for hail-damaged vehicles, coordinated with your insurance company.',
    detail:
      'Hail claims are common enough that our estimators know what an adjuster\u2019s report typically covers and where it commonly misses damage — especially on roofs and hoods.',
    benefits: ['Full-panel damage mapping', 'Insurance claim coordination', 'High-volume capacity during hail season'],
  },
  {
    slug: 'minor-collision-repair',
    name: 'Minor Collision Repair',
    summary: 'Small bumper scuffs, scratches, and light impact damage that don\u2019t require structural or frame work.',
    detail:
      'For damage beyond what paintless repair alone can fix — a cracked bumper cover, a scraped panel, a scratch through the clear coat — we handle the smaller-scope bodywork and paint matching in-house. Larger structural damage gets referred out honestly rather than taken on.',
    benefits: ['Color-matched touch-up and blending', 'Honest repair-vs-refer assessment', 'Insurance coordination available'],
  },
]
