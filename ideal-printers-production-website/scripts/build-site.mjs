import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OLD_NAV = path.resolve(
  ROOT,
  '..',
  'Ideal-printers-updated-website-v2',
  'scripts',
  'navbar.js'
);

const SITE = {
  name: 'Ideal Printers & Packages',
  shortName: 'Ideal Printers',
  domain: 'https://idealprinters.pk',
  tagline: 'Printing, packaging & branding for Lahore businesses',
  phoneLandline: '+92 42 3597 9285',
  phoneLandlineTel: '+924235979285',
  phoneMobile: '+92 30 0460 2749',
  phoneMobileTel: '+923004602749',
  whatsapp: '923004602749',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=923004602749&text=Hello!',
  email: 'idealprinter41@gmail.com',
  address: 'G-2, Al-Rehman Centre, Shama Metro Station, 70-Ferozepur Road, Lahore',
  hours: [
    '9:00 am to 2:00 pm',
    '3:00 pm to 10:00 pm',
    '2:00 pm to 3:00 pm (Lunch Break)',
    'Monday to Sunday',
  ],
  mapsEmbed:
    'https://www.google.com/maps?q=Ideal+Printers,+G-2,+Al-Rehman+Centre,+Shama+Metro+Station,+Lahore&output=embed',
  mapsSearch:
    'https://www.google.com/maps/search/?api=1&query=Ideal+Printers+Al-Rehman+Centre+Lahore',
  facebook: 'https://www.facebook.com/idealprinters41/',
  instagram: 'https://www.instagram.com/idealprinters/',
  founded: '1999',
};

const CATEGORY_META = {
  'print-marketing': {
    id: 'print-marketing',
    title: 'Print & Marketing',
    slug: 'print-marketing',
    hubFile: 'digital-printing-services.html',
    oldHub: 'digital-printing-services.html',
    blurb: 'Stationery, stickers, brochures, seals, and promotional print for everyday brand work.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1400&q=80',
  },
  'fashion-textile': {
    id: 'fashion-textile',
    title: 'Fashion & Textile',
    slug: 'fashion-textile',
    hubFile: 'fabric-and-fashion-printing.html',
    oldHub: 'fabric-and-fashion-printing.html',
    blurb: 'Custom fashion pieces, soft furnishings, pouches, and fabric printing.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80',
  },
  'office-store': {
    id: 'office-store',
    title: 'Office & Store Branding',
    slug: 'office-store',
    hubFile: 'office-store-branding-printing.html',
    oldHub: 'office-store-branding-printing.html',
    blurb: 'Window films, wall graphics, POS stands, posters, and vehicle branding.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
  },
  signages: {
    id: 'signages',
    title: 'Signages',
    slug: 'signages',
    hubFile: 'signage-company-in.html',
    oldHub: 'signage-company-in.html',
    blurb: '3D letters, light boxes, name plates, wayfinding, and safety signs.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80',
  },
  flags: {
    id: 'flags',
    title: 'Flags',
    slug: 'flags',
    hubFile: 'flags-printing-branding.html',
    oldHub: 'flags-printing-branding.html',
    blurb: 'Event flags, office flags, outdoor flags, and decorative flag systems.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  },
  backdrops: {
    id: 'backdrops',
    title: 'Backdrops & Exhibition',
    slug: 'backdrops',
    hubFile: 'backdrop-stand.html',
    oldHub: 'backdrop-stand.html',
    blurb: 'Roll-ups, stands, fabric backdrops, exhibition counters, and event props.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
  },
  gifts: {
    id: 'gifts',
    title: 'Corporate Gifts & Bags',
    slug: 'gifts',
    hubFile: 'promotional-corporate-gifts.html',
    oldHub: 'promotional-corporate-gifts.html',
    blurb: 'Branded gifts, apparel, tech items, drinkware, and promotional bags.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=80',
  },
};

const FLYOUT_TO_CAT = {
  fly_digital_printing_services: 'print-marketing',
  'fly-digital_printing_services': 'print-marketing',
  fly_fabric_and_fashion_printing: 'fashion-textile',
  'fly-fabric_and_fashion_printing': 'fashion-textile',
  fly_office_store_branding_printing: 'office-store',
  'fly-office_store_branding_printing': 'office-store',
  fly_signage_company_in: 'signages',
  'fly-signage_company_in': 'signages',
  fly_flags_printing_branding: 'flags',
  'fly-flags_printing_branding': 'flags',
  fly_backdrop_stand: 'backdrops',
  'fly-backdrop_stand': 'backdrops',
  fly_promotional_corporate_gifts: 'gifts',
  'fly-promotional_corporate_gifts': 'gifts',
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(file) {
  return file
    .replace(/\.html$/i, '')
    .replace(/#.*$/, '')
    .toLowerCase();
}

function parseCatalog(navSource) {
  const categories = Object.values(CATEGORY_META).map((c) => ({
    ...c,
    groups: [],
  }));
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));
  const products = new Map();

  const flyoutRegex =
    /<div class="ip-flyout" id="([^"]+)"[\s\S]*?<div class="ip-fly-cols">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
  let flyMatch;
  while ((flyMatch = flyoutRegex.exec(navSource))) {
    const flyId = flyMatch[1];
    const body = flyMatch[2];
    const catId = FLYOUT_TO_CAT[flyId];
    if (!catId || !byId[catId]) continue;

    let currentGroup = 'Featured';
    const tokenRegex =
      /<p class="ip-fly-heading">([^<]+)<\/p>|<a href="([^"]+)" class="ip-fly-link">([^<]+)<\/a>/g;
    let token;
    while ((token = tokenRegex.exec(body))) {
      if (token[1]) {
        currentGroup = token[1].trim();
        if (!byId[catId].groups.find((g) => g.name === currentGroup)) {
          byId[catId].groups.push({ name: currentGroup, products: [] });
        }
        continue;
      }
      const href = token[2];
      const name = token[3].replace(/\s+/g, ' ').trim();
      const file = href.split('#')[0];
      const hash = href.includes('#') ? href.split('#')[1] : '';
      const slug = slugify(file);
      if (!file || file.includes(' ')) continue;

      let group = byId[catId].groups.find((g) => g.name === currentGroup);
      if (!group) {
        group = { name: currentGroup, products: [] };
        byId[catId].groups.push(group);
      }

      const key = `${slug}${hash ? '#' + hash : ''}`;
      if (!group.products.includes(key)) group.products.push(key);

      if (!products.has(slug)) {
        products.set(slug, {
          slug,
          name,
          file: `${slug}.html`,
          oldFile: file,
          category: catId,
          aliases: hash ? [name] : [],
          description: `Order custom ${name} from Ideal Printers in Lahore. Quality print and branding with quick quotes via WhatsApp or our inquiry form.`,
        });
      } else {
        const existing = products.get(slug);
        if (name && !existing.aliases.includes(name) && name !== existing.name) {
          existing.aliases.push(name);
        }
      }
    }
  }

  // Extra business-card subtypes common on old site (hub depth)
  const extras = [
    ['business-cards-printing', 'Standard Business Cards', 'print-marketing'],
    ['bristol-business-cards', 'Bristol Business Cards', 'print-marketing'],
    ['laminated-business-cards', 'Executive Laminated Cards', 'print-marketing'],
    ['pearl-white-business-cards-printing', 'Pearl White Business Cards', 'print-marketing'],
    ['pvc-plastic-business-cards-printing', 'PVC Plastic Business Cards', 'print-marketing'],
    ['kraft-business-cards-in', 'Kraft Business Cards', 'print-marketing'],
    ['velvet-business-cards', 'Velvet Business Cards', 'print-marketing'],
    ['uv-business-cards', '3D Spot UV Business Cards', 'print-marketing'],
    ['luxury-business-cards', '3D Foil Business Cards', 'print-marketing'],
    ['royal-business-cards', 'UV + Foil Business Cards', 'print-marketing'],
    ['offset-business-cards', 'Textured Business Cards', 'print-marketing'],
    ['translucent_business_cards', 'Translucent Business Cards', 'print-marketing'],
    ['classic-business-cards', 'Classic Business Cards', 'print-marketing'],
    ['classic-ice-gold-business-cards', 'Ice Gold Business Cards', 'print-marketing'],
    ['stickers-printing', 'Stickers Printing', 'print-marketing'],
    ['textile-roll-printing', 'Textile Roll Printing', 'fashion-textile'],
    ['usb-printing', 'USB Printing', 'gifts'],
    ['bags-printing', 'Bags Printing', 'gifts'],
  ];

  for (const [slug, name, category] of extras) {
    if (!products.has(slug)) {
      products.set(slug, {
        slug,
        name,
        file: `${slug}.html`,
        oldFile: `${slug}.html`,
        category,
        aliases: [],
        description: `Order custom ${name} from Ideal Printers in Lahore. Quality print and branding with quick quotes via WhatsApp or our inquiry form.`,
      });
      const cat = byId[category];
      let group = cat.groups.find((g) => g.name === 'More options');
      if (!group) {
        group = { name: 'More options', products: [] };
        cat.groups.push(group);
      }
      group.products.push(slug);
    }
  }

  return {
    categories,
    products: [...products.values()].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

function assetPrefix(depth) {
  return depth ? '../'.repeat(depth) : '';
}

function pageShell({ title, description, canonical, depth = 0, active = '', body, extraHead = '', scripts = [] }) {
  const p = assetPrefix(depth);
  const scriptTags = scripts.map((s) => `<script src="${p}${s}"></script>`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="${p}assets/logo.png" />
  <link rel="stylesheet" href="${p}css/brand.css" />
  <link rel="stylesheet" href="${p}css/layout.css" />
  <link rel="stylesheet" href="${p}css/catalog.css" />
  ${extraHead}
</head>
<body data-active="${active}" data-depth="${depth}">
  <div id="site-header"></div>
  <main>
${body}
  </main>
  <div id="site-footer"></div>
  <div id="site-widgets"></div>
  <script>window.IP_ASSET_PREFIX = ${JSON.stringify(p)};</script>
  <script src="${p}data/catalog.js"></script>
  <script src="${p}data/site-config.js"></script>
  <script src="${p}js/site-chrome.js"></script>
  <script src="${p}js/contact-form.js"></script>
  <script src="${p}js/main.js"></script>
  <script src="${p}js/catalog-ui.js"></script>
  ${scriptTags}
</body>
</html>
`;
}

function productPage(product, cat) {
  const related = [];
  for (const g of cat.groups) {
    for (const key of g.products) {
      const slug = key.split('#')[0];
      if (slug !== product.slug && !related.includes(slug)) related.push(slug);
      if (related.length >= 6) break;
    }
    if (related.length >= 6) break;
  }

  const aliasLine =
    product.aliases && product.aliases.length
      ? `<p class="product-aliases">Also listed as: ${product.aliases.slice(0, 4).join(', ')}</p>`
      : '';

  const relatedHtml = related
    .map(
      (slug) =>
        `<a class="product-chip" href="${slug}.html" data-product-link="${slug}">${slug.replace(/[-_]+/g, ' ')}</a>`
    )
    .join('\n            ');

  const body = `
    <section class="page-hero page-hero--compact">
      <div class="bg" aria-hidden="true">
        <img src="${cat.image}" alt="" />
      </div>
      <div class="inner">
        <p class="eyebrow"><a href="../services/${cat.slug}.html">${cat.title}</a></p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="hero-actions" style="margin-top:1.25rem;">
          <button class="btn btn-primary" type="button" data-inquiry-open data-requirement="${product.name}">Get a Free Quote</button>
          <a class="btn btn-ghost" href="${SITE.whatsappUrl}" target="_blank" rel="noopener">WhatsApp Us</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container product-layout">
        <article class="product-copy reveal">
          <h2>About this product</h2>
          <p>Ideal Printers produces <strong>${product.name}</strong> for businesses, event agencies, and retail brands across Lahore and Pakistan. Share your artwork, size, quantity, and finish preferences — we’ll recommend the right material path and turnaround.</p>
          ${aliasLine}
          <ul class="check-list">
            <li>Quote support by phone, WhatsApp, or inquiry form</li>
            <li>Production focused on color consistency and clean finishing</li>
            <li>Local studio support in Lahore since ${SITE.founded}</li>
          </ul>
          <h3>How to order</h3>
          <ol class="steps-list">
            <li>Send your brief or artwork via WhatsApp or the quote form.</li>
            <li>Confirm size, quantity, material, and delivery timing.</li>
            <li>Approve proof (when needed) and we produce & deliver.</li>
          </ol>
        </article>
        <aside class="product-aside reveal">
          <div class="quote-card" id="inquiry-form">
            <h3>Get your <span class="accent">FREE</span> Quote</h3>
            <form id="reused_form" class="inquiry-form" novalidate>
              <div class="form-field"><label for="name">Name</label><input id="name" name="name" type="text" required placeholder="Your Name" /></div>
              <div class="form-field"><label for="email">Email</label><input id="email" name="email" type="email" required placeholder="Your Email" /></div>
              <div class="form-field"><label for="mobile">Contact Number</label><input id="mobile" name="mobile" type="tel" required placeholder="Your Contact Number" /></div>
              <div class="form-field"><label for="requirement">Required Item</label><input id="requirement" name="requirement" type="text" required value="${product.name}" /></div>
              <div class="form-field"><label for="message">Message</label><textarea id="message" name="message" required placeholder="Quantity, size, deadline…"></textarea></div>
              <div class="captcha-row">
                <img id="captcha_image" alt="Captcha" width="100" height="34" />
                <button type="button" id="captcha_reload" class="link-btn">Refresh</button>
                <input id="captcha" name="captcha" type="text" required placeholder="Enter captcha" />
              </div>
              <button class="btn btn-primary" type="submit" disabled>Send Message</button>
              <p class="form-note captcha-status">Solve captcha to enable Send Message.</p>
            </form>
          </div>
          <div class="contact-mini">
            <a href="tel:${SITE.phoneMobileTel}">${SITE.phoneMobile}</a>
            <a href="tel:${SITE.phoneLandlineTel}">${SITE.phoneLandline}</a>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </aside>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Related in ${cat.title}</p>
          <h2>You may also need</h2>
        </div>
        <div class="chip-row reveal" data-related-products>
            ${relatedHtml}
        </div>
      </div>
    </section>
`;

  return pageShell({
    title: `${product.name} | ${SITE.shortName} Lahore`,
    description: product.description,
    canonical: `${SITE.domain}/products/${product.file}`,
    depth: 1,
    active: 'services',
    body,
  });
}

function categoryPage(cat) {
  const groupsHtml = cat.groups
    .map((g) => {
      const links = g.products
        .map((key) => {
          const slug = key.split('#')[0];
          const hash = key.includes('#') ? '#' + key.split('#')[1] : '';
          return `<a class="product-card" href="../products/${slug}.html${hash}" data-product-link="${slug}">
            <span class="product-card-title" data-name-for="${slug}">${slug.replace(/[-_]+/g, ' ')}</span>
            <span class="product-card-cta">View details →</span>
          </a>`;
        })
        .join('\n          ');
      return `<div class="catalog-group reveal">
        <h3>${g.name}</h3>
        <div class="product-grid">
          ${links}
        </div>
      </div>`;
    })
    .join('\n');

  const body = `
    <section class="page-hero">
      <div class="bg" aria-hidden="true"><img src="${cat.image}" alt="" /></div>
      <div class="inner">
        <p class="eyebrow">Craft Line</p>
        <h1>${cat.title}</h1>
        <p>${cat.blurb}</p>
        <div class="hero-actions" style="margin-top:1.25rem;">
          <button class="btn btn-primary" type="button" data-inquiry-open data-requirement="${cat.title}">Request a Quote</button>
          <a class="btn btn-ghost" href="${SITE.whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container catalog-page" data-category="${cat.id}">
        ${groupsHtml}
      </div>
    </section>
`;

  return pageShell({
    title: `${cat.title} | ${SITE.shortName}`,
    description: cat.blurb,
    canonical: `${SITE.domain}/services/${cat.slug}.html`,
    depth: 1,
    active: 'services',
    body,
    scripts: ['js/catalog-ui.js'],
  });
}

function writeCorePages(catalog) {
  const catCards = catalog.categories
    .map(
      (c) => `<a class="service-card reveal" href="services/${c.slug}.html">
        <div class="thumb"><img src="${c.image}" alt="${c.title}" loading="lazy" /></div>
        <div class="body">
          <h3>${c.title}</h3>
          <p>${c.blurb}</p>
        </div>
      </a>`
    )
    .join('\n');

  const featured = catalog.products.slice(0, 12);
  const featuredCards = featured
    .map(
      (p) => `<article class="carousel-card">
        <img src="${CATEGORY_META[p.category]?.image || catalog.categories[0].image}" alt="${p.name}" loading="lazy" />
        <div class="overlay">
          <h3>${p.name}</h3>
          <p><a href="products/${p.file}">View product →</a></p>
        </div>
      </article>`
    )
    .join('\n');

  const indexBody = `
    <section class="hero">
      <div class="hero-media" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1626785774573-4b7993141ae6?auto=format&fit=crop&w=2000&q=80" alt="" />
      </div>
      <div class="hero-content">
        <p class="eyebrow">Lahore · Since ${SITE.founded}</p>
        <h1 class="hero-brand"><span class="accent">ideal</span> <span class="soft">Printers</span></h1>
        <p class="hero-lead">${SITE.tagline}. From business cards to exhibition backdrops — produced with care.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="services/print-marketing.html">Browse Products</a>
          <a class="btn btn-ghost" href="contact.html">Get a Free Quote</a>
        </div>
      </div>
      <div class="hero-scroll" aria-hidden="true"><span>Scroll</span><span class="line"></span></div>
    </section>

    <section class="section carousel-section">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Popular picks</p>
          <h2>Products teams ask for every week</h2>
          <p>Smooth carousel across our production lanes — tap through or let it glide.</p>
        </div>
        <div class="carousel" data-carousel>
          <div class="carousel-track" tabindex="0" aria-label="Popular products">
            ${featuredCards}
          </div>
          <div class="carousel-controls">
            <button class="carousel-btn" data-prev aria-label="Previous">←</button>
            <button class="carousel-btn" data-next aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section capabilities">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Full catalog</p>
          <h2>Seven production lanes. Hundreds of products.</h2>
          <p>Everything from our existing range — organized for faster browsing.</p>
        </div>
        <div class="service-grid">
          ${catCards}
        </div>
      </div>
    </section>

    <section class="split-band">
      <div class="visual reveal">
        <img src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=1400&q=80" alt="Print studio" />
      </div>
      <div class="copy">
        <p class="eyebrow reveal">Why Ideal</p>
        <h2 class="reveal">Your printing & event branding partner in Lahore</h2>
        <p class="reveal">Founded in ${SITE.founded}, Ideal Printers grew from a stationery print house into a multi-disciplinary facility for SMEs, corporates, retail, and event agencies across Pakistan.</p>
        <ul class="process-list">
          <li class="reveal"><span class="num">1</span><div><strong>Quick inquiry</strong><p>Form, phone, or WhatsApp — same day response focus.</p></div></li>
          <li class="reveal"><span class="num">2</span><div><strong>Material guidance</strong><p>We match finish and substrate to your use case.</p></div></li>
          <li class="reveal"><span class="num">3</span><div><strong>Produce & deliver</strong><p>Local production with reliable turnaround.</p></div></li>
        </ul>
        <a class="btn btn-primary reveal" href="about.html">Our Studio Story</a>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="cta-ribbon reveal">
          <div>
            <p class="eyebrow">Talk to production</p>
            <h2>Need a quote today?</h2>
            <p>Call ${SITE.phoneMobile} or message us on WhatsApp — ${SITE.address}.</p>
          </div>
          <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
            <a class="btn btn-primary" href="${SITE.whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a>
            <a class="btn btn-ghost" href="contact.html">Contact Form</a>
          </div>
        </div>
      </div>
    </section>
`;

  fs.writeFileSync(
    path.join(ROOT, 'index.html'),
    pageShell({
      title: `${SITE.name} | Print Studio Lahore`,
      description: SITE.tagline,
      canonical: `${SITE.domain}/`,
      active: 'home',
      body: indexBody,
      scripts: ['js/carousel.js'],
    })
  );

  const aboutBody = `
    <section class="page-hero">
      <div class="bg" aria-hidden="true"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80" alt="" /></div>
      <div class="inner">
        <p class="eyebrow">Our Studio</p>
        <h1>Trusted printing & event branding in Lahore</h1>
        <p>Ideal Printers serves Event Agencies & Corporates with print, signage, textile, and promotional solutions — since ${SITE.founded}.</p>
      </div>
    </section>
    <section class="section">
      <div class="container about-grid">
        <div class="reveal">
          <p class="eyebrow">Story</p>
          <h2>From paper stationery to multi-disciplinary production</h2>
          <p>We began as a focused print house and expanded into large-format, textile, signage, store branding, exhibition graphics, and corporate gifting — still rooted in Lahore craft and service.</p>
          <p>Today we support SMEs, corporates, retail brands, and event agencies across Pakistan with practical production advice and reliable delivery.</p>
        </div>
        <div class="reveal info-panel">
          <h3>Visit / Sales Office</h3>
          <p>${SITE.address}</p>
          <h3>Working Hours</h3>
          <ul>${SITE.hours.map((h) => `<li>${h}</li>`).join('')}</ul>
          <h3>Contact</h3>
          <p><a href="tel:${SITE.phoneMobileTel}">${SITE.phoneMobile}</a><br>
          <a href="tel:${SITE.phoneLandlineTel}">${SITE.phoneLandline}</a><br>
          <a href="mailto:${SITE.email}">${SITE.email}</a></p>
        </div>
      </div>
    </section>
    <section class="section capabilities">
      <div class="container">
        <div class="section-head reveal"><p class="eyebrow">Capabilities</p><h2>Where we help most</h2></div>
        <div class="service-grid">${catCards}</div>
      </div>
    </section>
`;

  fs.writeFileSync(
    path.join(ROOT, 'about.html'),
    pageShell({
      title: `About Us | ${SITE.shortName}`,
      description: `Learn about Ideal Printers — Lahore printing & branding studio since ${SITE.founded}.`,
      canonical: `${SITE.domain}/about.html`,
      active: 'about',
      body: aboutBody,
    })
  );

  const contactBody = `
    <section class="page-hero">
      <div class="bg" aria-hidden="true"><img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1800&q=80" alt="" /></div>
      <div class="inner">
        <p class="eyebrow">Connect</p>
        <h1>Contact Ideal Printers</h1>
        <p>Questions, quotes, or project planning — reach us by form, phone, WhatsApp, or visit our Lahore studio.</p>
      </div>
    </section>
    <section class="section">
      <div class="container contact-grid">
        <aside class="contact-panel reveal">
          <p class="eyebrow">Studio desk</p>
          <h2>Get in touch</h2>
          <div class="info-row">
            <div><strong>Mobile / WhatsApp</strong><a href="tel:${SITE.phoneMobileTel}">${SITE.phoneMobile}</a><br><a href="${SITE.whatsappUrl}" target="_blank" rel="noopener">Chat on WhatsApp</a></div>
            <div><strong>Landline</strong><a href="tel:${SITE.phoneLandlineTel}">${SITE.phoneLandline}</a></div>
            <div><strong>Email</strong><a href="mailto:${SITE.email}">${SITE.email}</a></div>
            <div><strong>Address</strong>${SITE.address}</div>
            <div><strong>Hours</strong>${SITE.hours.join('<br>')}</div>
          </div>
          <iframe class="maps-embed" title="Ideal Printers location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${SITE.mapsEmbed}"></iframe>
          <a class="btn btn-primary" style="margin-top:1rem;" href="${SITE.mapsSearch}" target="_blank" rel="noopener">Open in Google Maps</a>
        </aside>
        <div class="contact-form reveal" id="inquiry-form">
          <h3>Get your <span class="accent">FREE</span> Quote</h3>
          <form id="reused_form" class="inquiry-form" novalidate>
            <div class="form-field"><label for="name">Name</label><input id="name" name="name" type="text" required placeholder="Your Name" /></div>
            <div class="form-field"><label for="email">Email</label><input id="email" name="email" type="email" required placeholder="Your Email" /></div>
            <div class="form-field"><label for="mobile">Contact Number</label><input id="mobile" name="mobile" type="tel" required placeholder="Your Contact Number" /></div>
            <div class="form-field"><label for="requirement">Required Item</label><input id="requirement" name="requirement" type="text" required placeholder="Required Item" /></div>
            <div class="form-field"><label for="message">Message</label><textarea id="message" name="message" required placeholder="Message"></textarea></div>
            <div class="captcha-row">
              <img id="captcha_image" alt="Captcha" width="100" height="34" />
              <button type="button" id="captcha_reload" class="link-btn">Refresh</button>
              <input id="captcha" name="captcha" type="text" required placeholder="Enter captcha" />
            </div>
            <button class="btn btn-dark" type="submit" disabled>Send Message</button>
            <p class="form-note captcha-status">Solve captcha to enable Send Message.</p>
          </form>
        </div>
      </div>
    </section>
`;

  fs.writeFileSync(
    path.join(ROOT, 'contact.html'),
    pageShell({
      title: `Contact Us | ${SITE.shortName}`,
      description: 'Contact Ideal Printers for quotes and project support in Lahore.',
      canonical: `${SITE.domain}/contact.html`,
      active: 'contact',
      body: contactBody,
    })
  );

  const faqBody = `
    <section class="page-hero page-hero--compact">
      <div class="bg" aria-hidden="true"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80" alt="" /></div>
      <div class="inner"><p class="eyebrow">Help</p><h1>FAQs</h1><p>Quick answers before you send a brief.</p></div>
    </section>
    <section class="section"><div class="container faq-list">
      ${[
        ['How do I get a quote?', 'Use the Free Quote form, WhatsApp, or call our mobile number. Share product, size, quantity, and deadline.'],
        ['Where are you located?', SITE.address],
        ['What are your working hours?', SITE.hours.join(' · ')],
        ['Do you deliver across Pakistan?', 'Yes — we support customers across Pakistan. Delivery options depend on product type and location.'],
        ['Can you help if I only have a rough idea?', 'Absolutely. Tell us the use case and we will suggest materials and finishes.'],
      ]
        .map(
          ([q, a]) => `<details class="faq-item reveal"><summary>${q}</summary><p>${a}</p></details>`
        )
        .join('')}
    </div></section>
`;

  fs.writeFileSync(
    path.join(ROOT, 'faq.html'),
    pageShell({
      title: `FAQs | ${SITE.shortName}`,
      description: 'Frequently asked questions about Ideal Printers services in Lahore.',
      canonical: `${SITE.domain}/faq.html`,
      active: 'faq',
      body: faqBody,
    })
  );

  const legal = (name, paras) => `
    <section class="page-hero page-hero--compact">
      <div class="bg" aria-hidden="true"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80" alt="" /></div>
      <div class="inner"><p class="eyebrow">Legal</p><h1>${name}</h1></div>
    </section>
    <section class="section"><div class="container prose reveal">${paras.map((p) => `<p>${p}</p>`).join('')}</div></section>`;

  fs.writeFileSync(
    path.join(ROOT, 'terms.html'),
    pageShell({
      title: `Terms | ${SITE.shortName}`,
      description: 'Terms of use for Ideal Printers website and services.',
      canonical: `${SITE.domain}/terms.html`,
      active: '',
      body: legal('Terms of Use', [
        'By using this website and engaging Ideal Printers for production services, you agree to provide accurate project details and approve proofs where requested before final printing.',
        'Quotes are based on the specifications you share. Changes to quantity, size, material, or finish may update pricing and timelines.',
        'For questions, contact us at ' + SITE.email + ' or ' + SITE.phoneMobile + '.',
      ]),
    })
  );

  fs.writeFileSync(
    path.join(ROOT, 'privacy.html'),
    pageShell({
      title: `Privacy Policy | ${SITE.shortName}`,
      description: 'Privacy policy for Ideal Printers.',
      canonical: `${SITE.domain}/privacy.html`,
      active: '',
      body: legal('Privacy Policy', [
        'We collect inquiry details (name, email, phone, message) solely to respond to your print and branding requests.',
        'Contact form submissions are processed through our server mail endpoint and are not sold to third parties.',
        'For privacy questions, email ' + SITE.email + '.',
      ]),
    })
  );

  const showcaseBody = `
    <section class="page-hero">
      <div class="bg" aria-hidden="true"><img src="https://images.unsplash.com/photo-1558618047-f4b511aab612?auto=format&fit=crop&w=1800&q=80" alt="" /></div>
      <div class="inner">
        <p class="eyebrow">Showcase</p>
        <h1>Selected production frames</h1>
        <p>A modern gallery surface for Ideal work — replace these placeholders with your own project photography anytime.</p>
      </div>
    </section>
    <section class="section"><div class="container">
      <div class="mosaic">
        ${[
          'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
        ]
          .map((src, i) => `<div class="mosaic-item reveal"><img src="${src}" alt="Showcase ${i + 1}" loading="lazy" /><span>Project frame</span></div>`)
          .join('')}
      </div>
    </div></section>
`;

  fs.writeFileSync(
    path.join(ROOT, 'showcase.html'),
    pageShell({
      title: `Showcase | ${SITE.shortName}`,
      description: 'Project showcase from Ideal Printers Lahore.',
      canonical: `${SITE.domain}/showcase.html`,
      active: 'showcase',
      body: showcaseBody,
    })
  );

  // All-products index
  const allLinks = catalog.products
    .map((p) => `<a class="product-card" href="products/${p.file}"><span class="product-card-title">${p.name}</span><span class="product-card-cta">${CATEGORY_META[p.category]?.title || ''}</span></a>`)
    .join('\n');

  fs.writeFileSync(
    path.join(ROOT, 'all-products.html'),
    pageShell({
      title: `All Products | ${SITE.shortName}`,
      description: 'Complete Ideal Printers product catalog.',
      canonical: `${SITE.domain}/all-products.html`,
      active: 'services',
      body: `
        <section class="page-hero page-hero--compact">
          <div class="bg" aria-hidden="true"><img src="${catalog.categories[0].image}" alt="" /></div>
          <div class="inner"><p class="eyebrow">Catalog</p><h1>All products</h1><p>${catalog.products.length}+ products from our production lanes.</p></div>
        </section>
        <section class="section"><div class="container"><div class="product-grid">${allLinks}</div></div></section>`,
    })
  );
}

function main() {
  if (!fs.existsSync(OLD_NAV)) {
    console.error('Missing old navbar.js at', OLD_NAV);
    process.exit(1);
  }

  ensureDir(path.join(ROOT, 'data'));
  ensureDir(path.join(ROOT, 'services'));
  ensureDir(path.join(ROOT, 'products'));
  ensureDir(path.join(ROOT, 'css'));
  ensureDir(path.join(ROOT, 'js'));
  ensureDir(path.join(ROOT, 'assets'));

  const navSource = fs.readFileSync(OLD_NAV, 'utf8');
  const catalog = parseCatalog(navSource);

  fs.writeFileSync(
    path.join(ROOT, 'data', 'site-config.js'),
    `window.IP_SITE = ${JSON.stringify(SITE, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(ROOT, 'data', 'catalog.js'),
    `window.IP_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`
  );

  fs.writeFileSync(
    path.join(ROOT, 'data', 'catalog.json'),
    JSON.stringify(catalog, null, 2)
  );

  writeCorePages(catalog);

  for (const cat of catalog.categories) {
    fs.writeFileSync(path.join(ROOT, 'services', `${cat.slug}.html`), categoryPage(cat));
  }

  const byCat = Object.fromEntries(catalog.categories.map((c) => [c.id, c]));
  for (const product of catalog.products) {
    const cat = byCat[product.category] || catalog.categories[0];
    fs.writeFileSync(path.join(ROOT, 'products', product.file), productPage(product, cat));
  }

  console.log(
    JSON.stringify(
      {
        categories: catalog.categories.length,
        products: catalog.products.length,
        groups: catalog.categories.reduce((n, c) => n + c.groups.length, 0),
      },
      null,
      2
    )
  );
}

main();
