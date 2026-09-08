// Damage categories shown as selectable chips on the Estimate form.
// Scoped to what this shop actually repairs: PDR/dent work, hail, and
// minor collision damage — not major structural or frame damage.
export const damageTypes = [
  'Door ding',
  'Parking lot dent',
  'Hail damage',
  'Crease / impact dent',
  'Multiple dents',
  'Minor bumper damage',
  'Scratches / scuffs',
  'Minor collision (front, rear, or side)',
  'Not sure / need an opinion',
] as const
