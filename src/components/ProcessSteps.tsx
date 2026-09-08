import { processSteps } from '@/data/process'

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, i) => (
        <li key={step.title} className="relative rounded border border-ink-200 bg-white p-6">
          <span className="font-mark text-sm text-rust">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 font-display font-semibold text-lg text-ink-800">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
