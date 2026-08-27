/**
 * Make every page's SEO unique: title, description, keywords, OG/Twitter.
 * Based on filename slug so each URL owns distinct search tags.
 * Run: node tools/make-seo-unique.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://idealprinters.pk";
const BRAND = "Ideal Printers & Packages";

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "tools"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function humanize(slug) {
  let s = slug.replace(/\.html$/i, "");
  s = s.replace(/-in-lahore$/i, "");
  s = s.replace(/-in$/i, ""); // leftover clone suffix e.g. fashion-in
  s = s.replace(/[_-]+/g, " ");
  s = s.replace(/\b\w/g, (c) => c.toUpperCase());
  s = s.replace(/\s+/g, " ").trim();
  // Avoid "Foo In Lahore" when we already append Lahore in the title template
  s = s.replace(/\s+In Lahore$/i, "");
  return s;
}

function shortHash(s) {
  return crypto.createHash("md5").update(s).digest("hex").slice(0, 4);
}

/** Distinct angle phrases so similar products don't share wording */
const ANGLES = [
  "fast local turnaround",
  "studio-quality finishes",
  "brand-ready print runs",
  "Punjab-wide delivery options",
  "colour-accurate production",
  "event and retail ready",
  "custom sizes available",
  "quote within one business day",
  "durable outdoor options",
  "premium packaging focus",
];

function angleFor(slug) {
  const n = parseInt(shortHash(slug), 16);
  return ANGLES[n % ANGLES.length];
}

function uniqueTitle(base, product) {
  if (base === "index.html") {
    return `${BRAND} | Custom Print, Signage & Packaging Studio in Lahore`;
  }
  // Keep under ~65–70 chars where possible, but uniqueness first
  let title = `${product} in Lahore | ${BRAND}`;
  if (title.length > 70) {
    title = `${product} | ${BRAND} Lahore`;
  }
  // Portfolio / hashed variants get explicit unique labels
  if (/^portfolio/i.test(base)) {
    const tag = shortHash(base).toUpperCase();
    title = `Print Portfolio ${tag} | ${BRAND} Lahore`;
  }
  if (/sales-|career|executive|specialist/i.test(base)) {
    title = `Careers: ${product} | Join ${BRAND} Lahore`;
  }
  return title;
}

function uniqueDescription(base, product) {
  if (base === "index.html") {
    return `${BRAND} is a Lahore print and packaging studio for signage, fabric branding, corporate gifts, and marketing print — serving businesses across Punjab with clear timelines and reliable delivery.`;
  }
  const angle = angleFor(base);
  if (/^portfolio/i.test(base)) {
    const tag = shortHash(base).toUpperCase();
    return `Browse portfolio set ${tag} from ${BRAND}: real print, packaging and branding projects produced in Lahore for local businesses and events.`;
  }
  if (/sales-|career|executive|specialist/i.test(base)) {
    return `Apply for ${product} at ${BRAND} in Lahore. Email idealprinter41@gmail.com or call +92 42 3597 9285 to join our print and packaging team.`;
  }
  return `Order ${product} from ${BRAND} in Lahore — ${angle}. Request a quote for custom sizes, finishes and delivery across Pakistan.`.slice(0, 230);
}

function uniqueKeywords(base, product) {
  const slug = base.replace(/\.html$/i, "").toLowerCase();
  const productKw = product.toLowerCase();
  const extras = [
    `${productKw} lahore`,
    `${productKw} printing pakistan`,
    `ideal printers packages ${productKw}`,
    `custom ${productKw} ferozepur road`,
    angleFor(base),
    shortHash(slug),
  ];
  const baseKw = [
    "ideal printers & packages",
    "printing company lahore",
    "custom packaging lahore",
    "signage printing lahore",
    productKw,
    "ichra printing",
  ];
  return [...new Set([...baseKw, ...extras])].join(", ");
}

function setMetaByName(html, name, value) {
  const re1 = new RegExp(
    `(<meta[^>]*name=["']${name}["'][^>]*content=["'])([^"']*)(["'][^>]*>)`,
    "i"
  );
  if (re1.test(html)) return html.replace(re1, `$1${value}$3`);
  const re2 = new RegExp(
    `(<meta[^>]*content=["'])([^"']*)(["'][^>]*name=["']${name}["'][^>]*>)`,
    "i"
  );
  if (re2.test(html)) return html.replace(re2, `$1${value}$3`);
  // insert before canonical if missing
  if (/rel=["']canonical["']/i.test(html)) {
    return html.replace(
      /(<link[^>]*rel=["']canonical["'][^>]*>)/i,
      `<meta name="${name}" content="${value}"/>\n    $1`
    );
  }
  return html;
}

function setMetaByProperty(html, prop, value) {
  const re1 = new RegExp(
    `(<meta[^>]*property=["']${prop}["'][^>]*content=["'])([^"']*)(["'][^>]*>)`,
    "i"
  );
  if (re1.test(html)) return html.replace(re1, `$1${value}$3`);
  const re2 = new RegExp(
    `(<meta[^>]*content=["'])([^"']*)(["'][^>]*property=["']${prop}["'][^>]*>)`,
    "i"
  );
  if (re2.test(html)) return html.replace(re2, `$1${value}$3`);
  return html;
}

function process(file) {
  let html = fs.readFileSync(file, "utf8");
  const base = path.basename(file);
  const product = humanize(base);
  const title = uniqueTitle(base, product);
  const desc = uniqueDescription(base, product);
  const keywords = uniqueKeywords(base, product);
  const pageUrl = base === "index.html" ? `${SITE}/` : `${SITE}/${base}`;

  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = setMetaByName(html, "description", desc);
  html = setMetaByName(html, "keywords", keywords);
  html = setMetaByName(html, "robots", "index, follow");
  html = setMetaByName(html, "twitter:title", title);
  html = setMetaByName(html, "twitter:description", desc);
  html = setMetaByName(html, "twitter:card", "summary_large_image");
  html = setMetaByName(html, "twitter:site", "@idealprinterspk");
  html = setMetaByName(html, "twitter:image:alt", `${product} — ${BRAND} Lahore`);
  html = setMetaByProperty(html, "og:title", title);
  html = setMetaByProperty(html, "og:description", desc);
  html = setMetaByProperty(html, "og:url", pageUrl);
  html = setMetaByProperty(html, "og:type", base === "index.html" ? "website" : "article");
  html = setMetaByProperty(html, "og:site_name", BRAND);
  html = setMetaByProperty(html, "og:locale", "en_PK");

  // Canonical
  if (/rel=["']canonical["']/i.test(html)) {
    html = html.replace(
      /(<link[^>]*rel=["']canonical["'][^>]*href=["'])([^"']*)(["'][^>]*>)/i,
      `$1${pageUrl}$3`
    );
  } else {
    html = html.replace(
      /<\/title>/i,
      `</title>\n    <link rel="canonical" href="${pageUrl}"/>`
    );
  }

  // Strip leftover generic clone phrases in visible H1 if exact match junk
  html = html.replace(
    /(<h1[^>]*>)\s*Printing Companies in Lahore\s*(<\/h1>)/i,
    `$1${BRAND} — Lahore Print Studio$2`
  );

  fs.writeFileSync(file, html, "utf8");
}

let n = 0;
for (const file of walkHtml(ROOT)) {
  process(file);
  n++;
}
console.log("Unique SEO applied to", n, "pages");
