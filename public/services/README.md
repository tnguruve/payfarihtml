# Service card images

Drop your Figma-exported images here, then add the path in `src/app/page.tsx` to each service.

**Suggested filenames** (PNG or WebP, ~400px wide is enough):

- `global-accounts.png`
- `prepaid-cards.png`
- `checkout.png`
- `payment-links.png`
- `invoicing.png`
- `payroll.png`
- `bank-transfers.png`
- `subscriptions.png`
- `local-payments.png`

**In Figma:** Select each card mockup → Export as PNG (1x or 2x) → save here.

**In code:** In `SERVICES` in `page.tsx`, add `image: "/services/global-accounts.png"` (etc.) to the matching service. If the file is missing, the placeholder icon still shows.
