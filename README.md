# PayFari Waitlist Landing Page

Responsive Next.js landing page with Tailwind CSS: hero section (“One multi-currency account”) and email signup form.

## Summary

This repo is the **PayFari waitlist site** — the public signup page at [waitlist.payfari.com](https://waitlist.payfari.com). It explains PayFari (multi-currency accounts, global payments, local spending), shows the nine product areas, and collects name + email via a form that sends signups to Kit (ConvertKit). Used to build the launch email list before “Launching in June 2026.”

## Tech stack

| Component | Purpose |
|-----------|--------|
| **Next.js 16** | App Router, static/SSR, API routes |
| **React 19** | UI components |
| **Tailwind CSS 4** | Styling, layout, design tokens |
| **TypeScript** | Typing |
| **Kit (ConvertKit)** | Waitlist form embed, subscriber list |
| **Vercel** | Hosting (waitlist.payfari.com) |

- **Node.js 20+** required (see [.nvmrc](.nvmrc) if using nvm).

## Run locally

```bash
cd payfari/waitlist-landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design variables

Colors and spacing use CSS variables in `src/app/globals.css` so you can align with your Figma design:

- `--primary` / `--primary-hover` – CTA and accent
- `--background` / `--foreground` – page and text
- `--muted` / `--muted-foreground` – secondary text and surfaces
- `--border` / `--input-bg` – form borders and input background
- `--radius` / `--radius-sm` / `--radius-lg` – border radius

To match **PayFari Waitlist V1** exactly, share the Figma file URL (e.g. `https://figma.com/design/XXXXX/PayFari-Waitlist-V1?node-id=...`) and the design tokens can be updated from the file.

## Join the waitlist (kit link)

1. Copy `.env.example` to `.env.local`.
2. Set `WAITLIST_FORM_URL` to your kit form URL (ConvertKit, Loops, Resend, etc.).
3. The form POSTs `email` and `name` (and `first_name`) to that URL. If your service expects different field names or JSON, say so and we can adjust the API route.
