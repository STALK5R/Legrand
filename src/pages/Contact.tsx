import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSeo } from '@/lib/seo'
import { business } from '@/config/business'
import { ContactCard } from '@/components/ContactCard'
import { Button } from '@/components/Button'
import { isValidEmail, isValidPhone } from '@/lib/validation'

const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined

export function Contact() {
  useSeo({
    title: 'Contact',
    description: `Phone, email, address, and hours for ${business.name}.`,
    path: '/contact',
  })

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-rust">Contact</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-bold tracking-tightest text-ink-800">
            Reach us however's easiest.
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">
            For anything about an active repair, calling the shop directly is fastest. For a new estimate, the form
            below or our{' '}
            <a href="/estimate" className="text-ink-800 font-semibold hover:text-rust">
              estimate page
            </a>{' '}
            both work.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactCard />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!name.trim()) nextErrors.name = 'Name is required.'
    if (!email.trim() || !isValidEmail(email)) nextErrors.email = 'Enter a valid email address.'
    if (phone.trim() && !isValidPhone(phone)) nextErrors.phone = 'Enter a valid phone number, or leave it blank.'
    if (!message.trim() || message.trim().length < 5) nextErrors.message = 'Add a short message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    if (!ENDPOINT) {
      await new Promise((r) => setTimeout(r, 600))
      setStatus('success')
      return
    }
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-ink-200 bg-white p-8 text-center">
        <h2 className="font-display font-bold text-xl text-ink-800">Message sent — thanks for reaching out.</h2>
        <p className="mt-2 text-ink-500">We'll get back to you shortly.</p>
        {!ENDPOINT && (
          <p className="mt-4 text-xs text-steel-500 bg-steel-50 border border-steel-100 rounded px-4 py-2 inline-block">
            Demo mode — no submission endpoint configured yet. See README "Form Setup."
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded border border-ink-200 bg-white p-6 sm:p-8 space-y-5" noValidate>
      {!ENDPOINT && (
        <p className="text-sm text-steel-600 bg-steel-50 border border-steel-100 rounded px-4 py-3">
          Demo mode — this form validates but won't send anywhere until an endpoint is configured. See README.
        </p>
      )}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-ink-700 mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-ink-300 px-3.5 py-2.5 text-[0.95rem]"
        />
        {errors.name && <p className="mt-1 text-sm text-rust-600">{errors.name}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-ink-700 mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-ink-300 px-3.5 py-2.5 text-[0.95rem]"
          />
          {errors.email && <p className="mt-1 text-sm text-rust-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-ink-700 mb-1.5">
            Phone (optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border border-ink-300 px-3.5 py-2.5 text-[0.95rem]"
          />
          {errors.phone && <p className="mt-1 text-sm text-rust-600">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-ink-700 mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded border border-ink-300 px-3.5 py-2.5 text-[0.95rem]"
        />
        {errors.message && <p className="mt-1 text-sm text-rust-600">{errors.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
      {status === 'error' && <p className="text-sm text-rust-600">Something went wrong — please try again or call the shop.</p>}
    </form>
  )
}
