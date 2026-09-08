import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { damageTypes } from '@/data/damageTypes'
import { isValidEmail, isValidPhone, validatePhotos, MAX_PHOTO_COUNT, MAX_PHOTO_SIZE_MB } from '@/lib/validation'
import { Button } from './Button'
import { cn } from '@/lib/cn'

type FormState = {
  firstName: string
  lastName: string
  phone: string
  email: string
  preferredContact: 'phone' | 'email' | 'text'
  year: string
  make: string
  model: string
  vin: string
  color: string
  damageTypes: string[]
  damageDescription: string
  insuranceCompany: string
  claimNumber: string
  claimOpen: 'yes' | 'no' | 'not-sure'
  adjusterName: string
  drivable: 'yes' | 'no' | 'not-sure'
  warningLights: 'yes' | 'no'
  doorsOperateNormally: 'yes' | 'no'
  paintCracked: 'yes' | 'no' | 'not-sure'
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  preferredContact: 'phone',
  year: '',
  make: '',
  model: '',
  vin: '',
  color: '',
  damageTypes: [],
  damageDescription: '',
  insuranceCompany: '',
  claimNumber: '',
  claimOpen: 'not-sure',
  adjusterName: '',
  drivable: 'yes',
  warningLights: 'no',
  doorsOperateNormally: 'yes',
  paintCracked: 'not-sure',
}

type Errors = Partial<Record<keyof FormState | 'photos', string>>

const ENDPOINT = import.meta.env.VITE_ESTIMATE_FORM_ENDPOINT as string | undefined

export function EstimateForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [photos, setPhotos] = useState<File[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const toggleDamageType = (type: string) => {
    setForm((f) => ({
      ...f,
      damageTypes: f.damageTypes.includes(type) ? f.damageTypes.filter((t) => t !== type) : [...f.damageTypes, type],
    }))
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const incoming = Array.from(fileList)
    const combined = [...photos, ...incoming]
    const err = validatePhotos(combined)
    if (err) {
      setErrors((e) => ({ ...e, photos: err }))
      return
    }
    setErrors((e) => ({ ...e, photos: undefined }))
    setPhotos(combined)
  }

  const removePhoto = (index: number) => {
    setPhotos((p) => p.filter((_, i) => i !== index))
  }

  const validate = (): Errors => {
    const e: Errors = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.phone.trim() || !isValidPhone(form.phone)) e.phone = 'Enter a valid phone number.'
    if (!form.email.trim() || !isValidEmail(form.email)) e.email = 'Enter a valid email address.'
    if (!form.year.trim() || !/^(19|20)\d{2}$/.test(form.year.trim())) e.year = 'Enter a 4-digit model year.'
    if (!form.make.trim()) e.make = 'Vehicle make is required.'
    if (!form.model.trim()) e.model = 'Vehicle model is required.'
    if (form.vin.trim() && form.vin.trim().length !== 17) e.vin = 'A VIN is normally 17 characters. Leave blank if unsure.'
    if (form.damageTypes.length === 0) e.damageTypes = 'Select at least one damage type.'
    if (!form.damageDescription.trim() || form.damageDescription.trim().length < 10) {
      e.damageDescription = 'Please add a few words describing the damage.'
    }
    if (form.damageDescription.length > 2000) e.damageDescription = 'Please keep the description under 2000 characters.'
    return e
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors((prev) => ({ ...prev, ...validationErrors }))
    if (Object.keys(validationErrors).length > 0) {
      const firstKey = Object.keys(validationErrors)[0]
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setStatus('submitting')

    if (!ENDPOINT) {
      // Demo mode: no real endpoint configured. Simulate the round trip
      // so the UI can be reviewed, but never claim data was sent anywhere.
      await new Promise((r) => setTimeout(r, 700))
      setStatus('success')
      return
    }

    try {
      const payload = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, Array.isArray(value) ? value.join(', ') : String(value))
      })
      photos.forEach((file, i) => payload.append(`photo_${i + 1}`, file))

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-ink-200 bg-white p-8 sm:p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rust text-paper">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-5 font-display font-bold text-2xl text-ink-800">Thanks — we've received your request.</h2>
        <p className="mt-3 text-ink-500 max-w-md mx-auto leading-relaxed">
          A member of our team will reach out within one business day using your preferred contact method to schedule
          an inspection. If your damage affects drivability or safety, please call the shop directly.
        </p>
        {!ENDPOINT && (
          <p className="mt-4 text-xs text-steel-500 bg-steel-50 border border-steel-100 rounded px-4 py-2 inline-block">
            Demo mode — no submission endpoint is configured yet, so nothing was actually sent. See README "Form Setup."
          </p>
        )}
        <div className="mt-6">
          <Button variant="ghost" onClick={() => { setForm(initialState); setPhotos([]); setStatus('idle') }}>
            Submit another request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      {!ENDPOINT && (
        <p className="text-sm text-steel-600 bg-steel-50 border border-steel-100 rounded px-4 py-3">
          This form is running in demo mode — no submission endpoint is configured, so it will validate but won't send
          data anywhere. See <code className="font-mark">README.md → Form Setup</code> to connect it.
        </p>
      )}

      <Fieldset legend="Your information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="firstName" label="First name" error={errors.firstName}>
            <input
              id="field-firstName"
              className={inputCls(!!errors.firstName)}
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              autoComplete="given-name"
            />
          </Field>
          <Field id="lastName" label="Last name" error={errors.lastName}>
            <input
              id="field-lastName"
              className={inputCls(!!errors.lastName)}
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              autoComplete="family-name"
            />
          </Field>
          <Field id="phone" label="Phone" error={errors.phone}>
            <input
              id="field-phone"
              type="tel"
              className={inputCls(!!errors.phone)}
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input
              id="field-email"
              type="email"
              className={inputCls(!!errors.email)}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              autoComplete="email"
            />
          </Field>
        </div>
        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-ink-700 mb-2">Preferred contact method</legend>
          <div className="flex gap-4">
            {(['phone', 'email', 'text'] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm text-ink-700 capitalize">
                <input
                  type="radio"
                  name="preferredContact"
                  checked={form.preferredContact === opt}
                  onChange={() => update('preferredContact', opt)}
                  className="accent-rust"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      </Fieldset>

      <Fieldset legend="Vehicle information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="year" label="Year" error={errors.year}>
            <input
              id="field-year"
              inputMode="numeric"
              className={inputCls(!!errors.year)}
              value={form.year}
              onChange={(e) => update('year', e.target.value)}
              placeholder="2021"
            />
          </Field>
          <Field id="color" label="Vehicle color">
            <input id="field-color" className={inputCls(false)} value={form.color} onChange={(e) => update('color', e.target.value)} />
          </Field>
          <Field id="make" label="Make" error={errors.make}>
            <input id="field-make" className={inputCls(!!errors.make)} value={form.make} onChange={(e) => update('make', e.target.value)} />
          </Field>
          <Field id="model" label="Model" error={errors.model}>
            <input id="field-model" className={inputCls(!!errors.model)} value={form.model} onChange={(e) => update('model', e.target.value)} />
          </Field>
          <Field id="vin" label="VIN (optional)" error={errors.vin} className="sm:col-span-2">
            <input
              id="field-vin"
              className={inputCls(!!errors.vin)}
              value={form.vin}
              onChange={(e) => update('vin', e.target.value.toUpperCase())}
              maxLength={17}
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Damage information">
        <div id="field-damageTypes">
          <p className="text-sm font-medium text-ink-700 mb-2">What kind of damage does the vehicle have?</p>
          <div className="flex flex-wrap gap-2">
            {damageTypes.map((type) => {
              const active = form.damageTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleDamageType(type)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    active ? 'bg-rust text-paper border-rust' : 'border-ink-300 text-ink-700 hover:border-ink-800',
                  )}
                >
                  {type}
                </button>
              )
            })}
          </div>
          {errors.damageTypes && <p className="mt-2 text-sm text-rust-600">{errors.damageTypes}</p>}
        </div>

        <Field id="damageDescription" label="Tell us about the damage" error={errors.damageDescription} className="mt-5">
          <textarea
            id="field-damageDescription"
            rows={5}
            className={inputCls(!!errors.damageDescription)}
            value={form.damageDescription}
            onChange={(e) => update('damageDescription', e.target.value)}
            placeholder="What happened, when, and anything the technician should know before the inspection."
          />
        </Field>

        <div className="mt-6">
          <p className="text-sm font-medium text-ink-700 mb-1">Photos</p>
          <p className="text-sm text-ink-500 mb-3">
            If you can, include: the overall vehicle, a wide shot of the damaged area, a close-up of the damage, and
            the opposite angle. Up to {MAX_PHOTO_COUNT} photos, {MAX_PHOTO_SIZE_MB}MB each.
          </p>
          <div
            className="rounded border-2 border-dashed border-ink-300 bg-paper-soft p-6 text-center cursor-pointer hover:border-ink-500"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              handleFiles(e.dataTransfer.files)
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
            }}
          >
            <p className="text-sm text-ink-600">Tap to choose photos, or drag and drop</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          {errors.photos && <p className="mt-2 text-sm text-rust-600">{errors.photos}</p>}
          {photos.length > 0 && (
            <ul className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {photos.map((file, i) => (
                <li key={`${file.name}-${i}`} className="relative aspect-square overflow-hidden rounded border border-ink-200">
                  <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    aria-label={`Remove photo ${i + 1}`}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-800/80 text-paper text-xs"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Fieldset>

      <Fieldset legend="Insurance">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="insuranceCompany" label="Insurance company">
            <input id="field-insuranceCompany" className={inputCls(false)} value={form.insuranceCompany} onChange={(e) => update('insuranceCompany', e.target.value)} />
          </Field>
          <Field id="claimNumber" label="Claim number (if known)">
            <input id="field-claimNumber" className={inputCls(false)} value={form.claimNumber} onChange={(e) => update('claimNumber', e.target.value)} />
          </Field>
          <Field id="adjusterName" label="Insurance adjuster name (optional)">
            <input id="field-adjusterName" className={inputCls(false)} value={form.adjusterName} onChange={(e) => update('adjusterName', e.target.value)} />
          </Field>
          <RadioField
            label="Is a claim already open?"
            name="claimOpen"
            value={form.claimOpen}
            onChange={(v) => update('claimOpen', v as FormState['claimOpen'])}
            options={[
              ['yes', 'Yes'],
              ['no', 'No'],
              ['not-sure', 'Not sure'],
            ]}
          />
        </div>
      </Fieldset>

      <Fieldset legend="Vehicle condition">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <RadioField
            label="Is the paint cracked, chipped, or scratched at the damage site?"
            name="paintCracked"
            value={form.paintCracked}
            onChange={(v) => update('paintCracked', v as FormState['paintCracked'])}
            options={[
              ['yes', 'Yes'],
              ['no', 'No'],
              ['not-sure', 'Not sure'],
            ]}
          />
          <RadioField
            label="Is the vehicle currently drivable?"
            name="drivable"
            value={form.drivable}
            onChange={(v) => update('drivable', v as FormState['drivable'])}
            options={[
              ['yes', 'Yes'],
              ['no', 'No'],
              ['not-sure', 'Not sure'],
            ]}
          />
          <RadioField
            label="Are any warning lights illuminated?"
            name="warningLights"
            value={form.warningLights}
            onChange={(v) => update('warningLights', v as FormState['warningLights'])}
            options={[
              ['yes', 'Yes'],
              ['no', 'No'],
            ]}
          />
          <RadioField
            label="Do doors, trunk, and hood operate normally?"
            name="doorsOperateNormally"
            value={form.doorsOperateNormally}
            onChange={(v) => update('doorsOperateNormally', v as FormState['doorsOperateNormally'])}
            options={[
              ['yes', 'Yes'],
              ['no', 'No'],
            ]}
          />
        </div>
      </Fieldset>

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? 'Sending…' : 'Submit estimate request'}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-rust-600">
            Something went wrong sending your request. Please try again, or call the shop directly and we'll take
            your information over the phone.
          </p>
        )}
        <p className="text-xs text-ink-400 leading-relaxed max-w-md">
          By submitting, you agree to be contacted about your estimate request using the information provided. We
          don't share your information with third parties for marketing.
        </p>
      </div>
    </form>
  )
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink-200 pt-8 first:border-t-0 first:pt-0">
      <legend className="font-display font-semibold text-xl text-ink-800 mb-5">{legend}</legend>
      {children}
    </fieldset>
  )
}

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={`field-${id}`} className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-rust-600">{error}</p>}
    </div>
  )
}

function RadioField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  options: [string, string][]
}) {
  return (
    <div>
      <p className="text-sm font-medium text-ink-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-4">
        {options.map(([val, text]) => (
          <label key={val} className="flex items-center gap-2 text-sm text-ink-700">
            <input type="radio" name={name} checked={value === val} onChange={() => onChange(val)} className="accent-rust" />
            {text}
          </label>
        ))}
      </div>
    </div>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink-800 placeholder:text-ink-300',
    'focus-visible:outline-2 focus-visible:outline-offset-1',
    hasError ? 'border-rust-500' : 'border-ink-300',
  )
}
