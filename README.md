# Pure Cleaning Services

A responsive Next.js website and WhatsApp quote-request experience for Pure Cleaning Services in Kandivali, Mumbai.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run build
npm start
```

## Business configuration

Contact details, page content, the equipment examples, image paths, FAQ answers and `pricingConfig` live in `data/site.ts`. Replace the supplied images in `public/images/` and update their paths in the `images` map when the business has approved photography.

Pricing is intentionally disabled until confirmed rates are provided. Set `ratesConfigured` to `true` and configure the relevant BHK starting prices, per-square-foot or room-specific rates, optional service charges, minimum charge and tax rate. A price is only shown when configured rates cover the selected services; otherwise the calculator sends an enquiry to WhatsApp without inventing a price. Optional service availability and booking dates still need confirmation by the business.

Set `NEXT_PUBLIC_SITE_URL` to the verified canonical production website URL to enable absolute sitemap links and social metadata. It is left unset in development so the site does not publish a fabricated business domain.