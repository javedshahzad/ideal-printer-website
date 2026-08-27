# Ideal Printers — Production Website

Original modern website for **Ideal Printers & Packages** (Lahore).  
Built from the new brand layout — not a Deluxe Printing clone.

## What’s included

- **231 product pages** under `products/`
- **7 category hubs** under `services/`
- Shared modern chrome: header, mega menu, footer, floating WhatsApp, bottom contact bar, Quick Inquiry modal
- Contact form with captcha → `api/contact.php` (same endpoint pattern as the live site)
- Business details: phones, WhatsApp, email, address, hours, maps
- Animations + smooth carousels on home
- `sitemap.xml` + `robots.txt`

## Key pages

| Page | Path |
|------|------|
| Home | `index.html` |
| Our Studio | `about.html` |
| Contact / Quote | `contact.html` |
| All products | `all-products.html` |
| Categories | `services/*.html` |
| Products | `products/*.html` |
| Showcase | `showcase.html` |
| FAQs / Terms / Privacy | `faq.html`, `terms.html`, `privacy.html` |

## Contact details (from existing site)

- Mobile / WhatsApp: `+92 30 0460 2749` → `https://api.whatsapp.com/send?phone=923004602749&text=Hello!`
- Landline: `+92 42 3597 9285`
- Email: `idealprinter41@gmail.com`
- Address: G-2, Al-Rehman Centre, Shama Metro Station, 70-Ferozepur Road, Lahore
- Hours: 9am–2pm, 3pm–10pm (lunch 2–3), Monday–Sunday

## Local preview

```bash
npx --yes serve .
```

## Regenerate catalog pages

If the old navbar product list changes:

```bash
node scripts/build-site.mjs
```

## Deploy notes

1. Upload the whole folder to your web host (PHP required for the contact form).
2. Ensure `vendor/PHPMailer` is present (already copied for form mail).
3. Confirm SMTP settings in `api/contact.php` still match your mailbox.
4. Replace Unsplash placeholders with your product photography when ready.
5. Point DNS / hosting document root to this folder.

## Brand

Logo: `assets/logo.png`  
Colors: orange `#F28C38`, green `#409B7A`, slate `#3F4B5B`
