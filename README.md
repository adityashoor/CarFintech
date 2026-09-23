# Car Fintech — website redesign

Modern rebuild of [carfintech.com.au](https://carfintech.com.au) for AUSSIE FINANCIALS PTY LTD (trading as Car Fintech), Melbourne.
Every headline, paragraph, review, FAQ, lender logo, team bio and blog article is the published copy and imagery from
the current site; the design, interaction layer and lead pipeline are new.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer) ·
GSAP + ScrollTrigger · Lenis · React Hook Form + Zod · lucide-react.

## Run

```bash
npm install
cp .env.example .env.local   # optional; defaults work for local dev
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## What is on the site

| Route | Content |
| --- | --- |
| `/` | Hero + live repayment estimator, stats, lender marquee, highlights, services bento, process, reviews, about, FAQ, multi-step quote form, articles, CTA |
| `/asset-finance` … `/secured--unsecured-personal-loans` | The ten service pages (same slugs as the original), each with its full published copy, its own process (3-step or 7-step), sticky estimator + callback form, reviews, FAQ and quote form |
| `/about-us`, `/chirag-babbar` | Company story and the four team profiles |
| `/get-quote` | Standalone quote request (pre-filled from the estimator via `?type=&amount=&term=`) |
| `/book-appointment` | The same Calendly booking widget as the original site |
| `/refer-a-friend` | $200 referral program with the published terms and a referral form |
| `/blog`, `/blog/[slug]` | All 47 published articles (`lib/content/articles.json`) with outline navigation |
| `/privacy-policy` | Verbatim privacy policy |

## Where things are

```
app/                      routes (App Router), API route handlers under app/api/*
components/
  hero/ calculator/       homepage hero and the repayment estimator
  sections/               reusable page sections (PageHero, ServiceBody, Process, Testimonials, FAQ, …)
  quote/ forms/           multi-step quote form, callback form, referral form, Calendly embed
  animations/             Reveal, TextReveal, BlurFade, Stagger, ImageReveal, Parallax, NumberTicker, Marquee, RotatingText, Spotlight
  ui/                     Button (magnetic + shimmer), form fields, accordion, badges, icons
  navigation/ footer/     floating glass navbar with mega menus, sticky mobile CTA, footer
lib/
  site.ts                 company facts only (phone, address, ABN, credit licence, socials)
  content/                services, FAQs, reviews, team, lenders, process steps, privacy policy, articles.json
  leads/                  lead pipeline: types, LeadService interface + console implementation, route-handler helper
  validation/leads.ts     Zod schemas shared by the forms and the API routes
  finance/repayments.ts   amortising-loan maths for the estimator
  analytics/track.ts      one `track(event)` call site for GA4 / GTM
public/images/            all photography, lender logos, team portraits and article images from the original site
```

## Lead pipeline

The website never talks to a CRM directly. The three forms post JSON to `/api/quotes`, `/api/callbacks` and
`/api/referrals`. Each route validates with the shared Zod schema, drops honeypot submissions with a fake success,
and calls `getLeadService()`. `LEAD_SERVICE=console` (default) logs every lead to the server console; implement
`LeadService` (`lib/leads/service.ts`) for a database, HubSpot, or an email relay and select it by env var. No
frontend change is needed.

Conversion events fired from the UI: `quote_started`, `quote_step_completed`, `quote_completed`, `calculator_used`,
`calculator_cta_clicked`, `phone_clicked`, `appointment_viewed`, `callback_submitted`, `referral_submitted`,
`service_viewed`. Set `NEXT_PUBLIC_GA_ID` to send them to GA4; they are also pushed to `dataLayer` for GTM.

## Colour and dark mode

The palette is the original site's own: slate blue `#718093` (its `--Button_Colour`, also the logo's squares) for
buttons, links and highlights; charcoal `#1d262d` / `#0f1519` for reviews, quote form and footer surfaces; light
greys for content sections; yellow `#ffe234` only for the review stars, exactly as on the original.

Dark mode is class-based via `next-themes` (system default, toggle in the navbar). Themed tokens (`bg`, `surface`,
`ink`, `muted`, `line`, `accent-deep`, `accent-soft`) are re-pointed under `.dark` in `app/globals.css`; the
fixed-dark sections use `bg-dark` and never change. Rule of thumb in components: `bg-ink text-surface` for small
chips and buttons (they flip), `bg-dark text-white` for sections that stay dark, `text-dark` for text on an
element that is white in both modes (logo tiles, white-on-hover buttons).

## Facts, claims and what is deliberately not invented

- Rating (5.0), review count (26), the 38 lender logos, the 24–48 hour approval window and every process step are the
  figures published on the original site. No new statistics were added.
- The repayment estimator is labelled as indicative; the visitor sets the rate. It never quotes a rate as an offer.
- The compliance statement and the general-advice disclaimer appear in the footer on every page and under every article.
- The privacy policy is transcribed verbatim, including the placeholder text
  `[INSERT ANALYTICS PROVIDERS, e.g., Google Analytics]` that exists on the live site; the company should replace it.
- The blog categories (Equipment Finance, Business Loans, Asset Finance) follow the original index page.

## Motion rules

Level 1 micro (200–400 ms) · Level 2 reveals (0.6–1.0 s, once) · Level 3 scroll-linked · Level 4 hero intro
(line reveals, once). Scroll-linked pieces: reading-progress line, hero photograph drift and scale, stacking
highlight cards (`Highlights`), sticky process rail with active-step tracking (`Process`), word-by-word statement
reveal (`ScrollTextReveal`), image clip-path reveals with parallax, counters. Everything honours
`prefers-reduced-motion`; Lenis is disabled on touch devices and for reduced-motion users.

## Tone

Built for business owners: light editorial heroes, charcoal and slate blue, semi-bold headings on a restrained
type scale, squared-off buttons and cards, no shimmer, glow or novelty effects. Dark surfaces are reserved for
reviews, the quote form and the footer to give the page rhythm.

## Demo protection

A browser can always save what it renders, so no setting makes a preview impossible to copy. Demo mode makes
copying impractical and unattractive instead. Set these on the demo deployment only (Netlify / Vercel env vars):

| Variable | Effect |
| --- | --- |
| `DEMO_ACCESS_CODE` | Every page is gated by `proxy.ts`. Share `https://demo-url/?access=CODE` once; a signed, httpOnly cookie admits the visitor for `DEMO_COOKIE_DAYS` (default 7). Wrong or missing code shows `/demo-access`. |
| `DEMO_EXPIRES` | ISO date after which every page shows `/demo-expired`. The link stops working on the day you choose. |
| `NEXT_PUBLIC_DEMO=1` | Copyright meta tag, footer ownership notice, `noindex, noarchive` and `no-store` headers. |

Always on: `X-Frame-Options: DENY` and `frame-ancestors 'none'` (the site cannot be embedded in another domain),
no `X-Powered-By`, and the `LICENSE` file states that the design and code are proprietary and provided for
evaluation only. Keep the GitHub repository private, never share the source, and rotate `DEMO_ACCESS_CODE` when
the evaluation ends. To retire a demo, set `DEMO_EXPIRES` to a past date or delete the deployment.

## Deploy

Vercel or Netlify with Node 22. Set `NEXT_PUBLIC_SITE_URL` to the real domain (metadata, sitemap, JSON-LD) and
remove `NEXT_PUBLIC_NOINDEX` on the production deployment.
