import { cn } from '@/lib/cn'

type Props = {
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeader({ title, description, align = 'left', tone = 'dark', className }: Props) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <h2
        className={cn(
          'text-3xl sm:text-4xl font-display font-bold tracking-tightest',
          tone === 'dark' ? 'text-ink-800' : 'text-paper',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-3 text-base sm:text-lg leading-relaxed', tone === 'dark' ? 'text-ink-500' : 'text-paper/80')}>
          {description}
        </p>
      )}
    </div>
  )
}
