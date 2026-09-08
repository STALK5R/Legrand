# Collision Center Website

A production-ready marketing site for a paintless dent repair (PDR) shop that also handles door dings, hail damage, and minor collision repair. Built with React, Vite, TypeScript, and Tailwind CSS. Every business-specific detail — name, phone, address, hours, Google links, services, testimonials — lives in a small number of editable files, so the site can go from placeholder to launch-ready without touching component code.

## Project

Pages: Home, Services, Testimonials, About, Contact, Get an Estimate (a full multi-section damage/insurance intake form with photo upload), plus Thank You, Privacy Policy, and a 404.

## Installation

Requires Node.js 18+.

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the site locally with hot reload, usually at `http://localhost:5173`.

## Production Build

```bash
npm run build
```

Type-checks and builds to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deployment

The build output is a static `dist/` folder — any static host works.

**Vercel**
1. Push this repo to GitHub.
2. Import it in Vercel. Framework preset: Vite. No extra config needed.
3. Add any environment variables (see "Form Setup" below) in Project Settings → Environment Variables.

**Netlify**
1. Push this repo to GitHub, or drag-and-drop the `dist/` folder after building.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Because this is a single-page app with client-side routing, add a `public/_redirects` file containing:
   ```
   /*    /index.html   200
   ```

**GitHub Pages**
Works, but needs a base path configured in `vite.config.ts` (`base: '/your-repo-name/'`) and a routing workaround for SPAs (e.g. a `404.html` that redirects to `index.html`). Vercel or Netlify are simpler for this project.

**Cloudflare Pages**
Build command: `npm run build`. Build output directory: `dist`. Add the same SPA fallback as Netlify (a `_redirects` file with `/* /index.html 200`, or configure it in the Pages dashboard).

## Customization — where to edit things

Almost everything business-specific lives in **`src/config/business.ts`**:

- Name, tagline, description
- Phone, email
- Street address, city, state, zip
- Google Maps URL (for every "Get Directions" button/link on the site)
- Google Business Profile / review URL (for every "See reviews" link)
- Hours
- Social links
- Credentials/trust badges (each flagged `isPlaceholder: true` until you confirm it's real — set to `false` once verified, and only claim a credential the shop actually holds)
- Owner bio and team list

Other editable data files:

- `src/data/services.ts` — the service catalog shown on Services and the homepage
- `src/data/testimonials.ts` — placeholder reviews (see "Testimonials" below)
- `src/data/faqs.ts` — FAQ content on the Services page
- `src/data/process.ts` — the "What happens next" steps
- `src/data/nav.ts` — navigation links (footer reuses the same list)
- `src/data/damageTypes.ts` — the damage-type chips on the Estimate form

Colors and type live in `tailwind.config.js` under `theme.extend.colors` / `fontFamily` — change the hex values there to re-theme the whole site.

## Form Setup

Both the Estimate form (`/estimate`) and the Contact form (`/contact`) run in **demo mode** by default: they validate normally but don't send data anywhere, and the confirmation screen says so explicitly. This is intentional — there's no backend included, so the app never pretends a submission was sent when it wasn't.

To connect them to a real inbox, copy `.env.example` to `.env` and set:

```
VITE_ESTIMATE_FORM_ENDPOINT=https://your-endpoint-here
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint-here
```

Either endpoint can point to any of these (pick one per form, or the same one for both):

- **Formspree** — create a form at formspree.io, use the endpoint it gives you (`https://formspree.io/f/xxxxxxx`). Works as-is with the `FormData` POST this app sends.
- **Web3Forms** — similar flow; use their submission endpoint and access key per their docs.
- **Netlify Forms** — if deploying on Netlify, this needs a slightly different setup (a hidden static HTML form for Netlify's build-time form detection, since this is a client-rendered SPA). See Netlify's docs on "JavaScript-rendered forms."
- **Resend / a serverless function** — write a small serverless function (Vercel/Netlify Function) that receives the POST and sends an email via Resend or similar, then point the env var at that function's URL.

On Vercel or Netlify, set the same environment variables in the project's dashboard (Environment Variables) so they're available at build time — remember Vite only exposes variables prefixed `VITE_` to the client.

## Images

Image placeholders (owner photo, team photos, shop photos) currently render as labeled gray boxes in `src/pages/About.tsx`. To add real photos:

1. Add image files under `src/assets/` (create subfolders as you like, e.g. `src/assets/team/`).
2. Import them at the top of the relevant page/component (e.g. `import ownerPhoto from '@/assets/team/owner.jpg'`) and swap the placeholder `<div>` for an `<img src={ownerPhoto} alt="..." loading="lazy" />`.
3. Write real, specific `alt` text for each photo — not the generic placeholder text.

Do not use stock photography of people as if they were real employees.

## Testimonials

`src/data/testimonials.ts` contains clearly marked demo content (`isPlaceholder: true` on every entry) — it is not real customer feedback. Replace the array with actual reviews once you have them (either quoted with the customer's permission, or simply remove the placeholder cards and rely on the "See reviews on Google" link, which already points at `business.googleBusinessProfileUrl`).

## Trust badges / credentials

`business.credentials` in `src/config/business.ts` lists placeholder certifications (PDR training, minor-collision/refinish training, etc.) with `isPlaceholder: true`. These render with a visible "Placeholder" tag on the site. Do not remove that tag or flip `isPlaceholder` to `false` until the credential is actually confirmed — the goal is to never imply a certification the shop doesn't hold.

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, EstimateForm, ServiceCard, etc.
  pages/        One file per route
  config/       business.ts — the single source of truth for business info
  data/         Editable content arrays (services, testimonials, faqs, nav, process)
  lib/          Small utilities: validation, the SEO hook, maps link helper, cn()
```

## A note on this build

This project was generated in an environment without package-registry network access, so the dependency install and `npm run build` could not be executed here to confirm a clean compile. The code was written and manually reviewed for correctness (imports, exports, prop types, Tailwind class names against the config), but you should run `npm install && npm run build` yourself as the first step after downloading — and treat any TypeScript error that surfaces as a real bug report, not an edge case to ignore.
