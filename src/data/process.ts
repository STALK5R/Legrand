export type ProcessStep = {
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Request an estimate',
    description: 'Tell us about the dent and add a photo online, or call the shop directly. A photo often lets us confirm PDR will work before you arrive.',
  },
  {
    title: 'Vehicle inspection',
    description: 'A technician looks at each dent in person to confirm the paint is intact and the metal can be reshaped.',
  },
  {
    title: 'Repair plan & insurance',
    description: 'For hail claims, we write up the full scope and coordinate directly with your insurance company on approval.',
  },
  {
    title: 'Repair work begins',
    description: 'Dents are worked back into shape from behind the panel with specialized tools; minor collision damage gets bodywork and color-matched paint where needed.',
  },
  {
    title: 'Quality check under light',
    description: 'Every panel is checked under direct light from multiple angles before the vehicle is called done.',
  },
  {
    title: 'Back on the road',
    description: 'We walk through the finished panels with you at pickup and answer any remaining questions.',
  },
]
