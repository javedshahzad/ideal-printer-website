/**
 * Ideal Printers & Packages — site-wide rebrand / de-clone pass
 * Run: node tools/rebrand-site.mjs
 *
 * Goals:
 * - Swap logos / favicon query bump
 * - Unique SEO titles, descriptions, OG/Twitter tags
 * - Fix Dubai geo leftovers + broken og:url
 * - Point structured data logos at new mark
 * - Strip Dubai district keyword stuffing
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSET_VER = "v=3.0.0";
const SITE = "https://idealprinters.pk";
const BRAND = "Ideal Printers & Packages";
const LAHORE_LAT = "31.5203696";
const LAHORE_LNG = "74.3587473";
const ZIP = "54000";

const DUBAI_GEO = /25\.277244317330453/g;
const DUBAI_LNG = /55\.308104241433554/g;

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function humanizeSlug(slug) {
  return slug
    .replace(/\.html$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function uniqueTitle(file, currentTitle) {
  const base = path.basename(file);
  if (base === "index.html") {
    return `${BRAND} | Custom Print, Signage & Packaging in Lahore`;
  }
  const product = humanizeSlug(base);
  // Avoid repeating clone-style "Lahore, Pakistan" closers
  const cleaned = (currentTitle || product)
    .replace(/\s*\|\s*Ideal Printers.*$/i, "")
    .replace(/\s*-\s*Ideal Printers.*$/i, "")
    .replace(/Ideal Printers/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[,|]\s*$/, "")
    .trim();
  const head = cleaned.length > 8 ? cleaned : product;
  return `${head} | ${BRAND} Lahore`;
}

function uniqueDescription(file, currentDesc) {
  const base = path.basename(file);
  if (base === "index.html") {
    return `${BRAND} delivers custom printing, packaging, signage, fabric branding and corporate gifts from Lahore, Pakistan — fast turnaround for businesses across Punjab.`;
  }
  const product = humanizeSlug(base);
  const seed = (currentDesc || "")
    .replace(/Dubai/gi, "Lahore")
    .replace(/UAE|United Arab Emirates/gi, "Pakistan")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (seed.length > 80 && !/Jumeirah|Business bay|JLT/i.test(seed)) {
    // Make it brand-distinct without inventing false claims
    if (!seed.includes("Ideal Printers")) {
      return `${seed} Order with ${BRAND}.`.slice(0, 220);
    }
    return seed.replace(/Ideal Printers(?! & Packages)/g, BRAND).slice(0, 220);
  }
  return `Order ${product} from ${BRAND} in Lahore — premium print quality, packaging options, and local delivery across Pakistan.`.slice(0, 220);
}

function uniqueKeywords(file, current) {
  const product = humanizeSlug(path.basename(file)).toLowerCase();
  const base = [
    "ideal printers & packages",
    "printing company lahore",
    "custom packaging lahore",
    "signage printing lahore",
    "corporate gifts lahore",
    product,
    "ferozepur road printing",
    "ichra printing services",
  ];
  const kept = String(current || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .filter((k) => !/jumeirah|business bay|jlt|downtown dubai|dubai marina|internet city|media city/i.test(k))
    .filter((k) => !/dubai/i.test(k))
    .slice(0, 8);
  return [...new Set([...base, ...kept])].join(", ");
}

function replaceTagContent(html, tagName, attrName, attrValue, newInner) {
  // Replace <meta name="description" content="..."/> style
  const re = new RegExp(
    `(<meta[^>]*${attrName}=["']${attrValue}["'][^>]*content=["'])([^"']*)(["'][^>]*>)`,
    "i"
  );
  if (re.test(html)) return html.replace(re, `$1${newInner}$3`);
  // content before name
  const re2 = new RegExp(
    `(<meta[^>]*content=["'])([^"']*)(["'][^>]*${attrName}=["']${attrValue}["'][^>]*>)`,
    "i"
  );
  if (re2.test(html)) return html.replace(re2, `$1${newInner}$3`);
  return html;
}

function replaceProperty(html, prop, value) {
  const re = new RegExp(
    `(<meta[^>]*property=["']${prop}["'][^>]*content=["'])([^"']*)(["'][^>]*>)`,
    "i"
  );
  if (re.test(html)) return html.replace(re, `$1${value}$3`);
  const re2 = new RegExp(
    `(<meta[^>]*content=["'])([^"']*)(["'][^>]*property=["']${prop}["'][^>]*>)`,
    "i"
  );
  if (re2.test(html)) return html.replace(re2, `$1${value}$3`);
  return html;
}

function replaceNameMeta(html, name, value) {
  return replaceTagContent(html, "meta", "name", name, value);
}

function fixOgUrl(html, file) {
  const base = path.basename(file);
  const url = base === "index.html" ? `${SITE}/` : `${SITE}/${base}`;
  html = replaceProperty(html, "og:url", url);
  html = html.replace(
    /https:\/\/idealprinters\.pk(?!\/)([a-z0-9_-]+\.html)/gi,
    `${SITE}/$1`
  );
  return html;
}

function processHtml(file) {
  let html = fs.readFileSync(file, "utf8");
  const original = html;
  const base = path.basename(file);

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const currentTitle = titleMatch ? titleMatch[1].trim() : "";
  const newTitle = uniqueTitle(file, currentTitle);

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const currentDesc = descMatch ? descMatch[1] : "";
  const newDesc = uniqueDescription(file, currentDesc);

  const kwMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']keywords["']/i);
  const newKeywords = uniqueKeywords(file, kwMatch ? kwMatch[1] : "");

  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${newTitle}</title>`);
  html = replaceNameMeta(html, "description", newDesc);
  html = replaceNameMeta(html, "keywords", newKeywords);
  html = replaceNameMeta(html, "twitter:title", newTitle);
  html = replaceNameMeta(html, "twitter:description", newDesc);
  html = replaceNameMeta(html, "twitter:image", `images/ideal-printers-logo-small.png`);
  html = replaceNameMeta(html, "twitter:image:alt", `${BRAND} — printing & packaging Lahore`);
  html = replaceNameMeta(html, "twitter:site", "@idealprinterspk");
  html = replaceProperty(html, "og:title", newTitle);
  html = replaceProperty(html, "og:description", newDesc);
  html = replaceProperty(html, "og:image", `images/ideal-printers-logo-small.png`);
  html = fixOgUrl(html, file);

  // Geo + postal
  html = replaceNameMeta(html, "zipcode", ZIP);
  html = replaceNameMeta(html, "geo.position", `${LAHORE_LAT};${LAHORE_LNG}`);
  html = replaceNameMeta(html, "geo.placename", "Lahore, Pakistan");
  html = replaceNameMeta(html, "geo.region", "PK-PB");
  html = replaceNameMeta(html, "city", "Lahore, Pakistan");
  html = replaceNameMeta(html, "state", "Punjab");
  html = replaceNameMeta(html, "country", "Pakistan");

  // Favicon + apple touch → brand mark
  html = html.replace(
    /href=["']favicon\.png(\?v=[^"']*)?["']/gi,
    `href="favicon.png?${ASSET_VER}"`
  );
  html = html.replace(
    /href=["']images\/print%26marketing\/apple-touch-icon[^"']*["']/gi,
    `href="images/ideal-printers-mark.png?${ASSET_VER}"`
  );

  // Structured data logos / images
  html = html.replace(
    /https:\/\/idealprinters\.pk\/images\/ideal-printers-logo-small\.png/g,
    `${SITE}/images/ideal-printers-logo-small.png`
  );
  html = html.replace(DUBAI_GEO, LAHORE_LAT);
  html = html.replace(DUBAI_LNG, LAHORE_LNG);
  html = html.replace(/"postalCode"\s*:\s*"181284"/g, `"postalCode": "${ZIP}"`);

  // Soft de-dubai on visible alt leftovers that still say Dubai in copy
  html = html.replace(/\bDubai\b/g, "Lahore");
  html = html.replace(/\bUAE\b/g, "Pakistan");
  // Avoid breaking image filenames that contain _dubai — restore those
  html = html.replace(/_Lahore\./g, "_dubai.");
  html = html.replace(/-Lahore\./g, "-dubai.");
  html = html.replace(/\/Lahore_/g, "/dubai_");
  html = html.replace(/%26Lahore/g, "%26dubai");

  // LinkedIn clone URL
  html = html.replace(
    /https:\/\/ae\.linkedin\.com\/company\/[^"'\s]+/gi,
    "https://www.linkedin.com/"
  );

  // Remove competitor-looking scrape stamp comments
  html = html.replace(/<!-- Source:\/[^>]*-->\s*/g, "");

  // Ensure brand name in Organization JSON where plain Ideal Printers appears as legalName alone
  if (base === "index.html") {
    html = html.replace(
      /"legalName":\s*"Ideal Printers"/g,
      `"legalName": "${BRAND}"`
    );
    html = html.replace(
      /"alternateName":\s*"Ideal Printers"/g,
      `"alternateName": "Ideal Printers Lahore"`
    );
  }

  if (html !== original) {
    fs.writeFileSync(file, html, "utf8");
    return true;
  }
  return false;
}

function recolorCssFiles() {
  const map = [
    ["#4b82bf", "#2A9B8F"],
    ["#214f86", "#2F3E4E"],
    ["#1a3f6e", "#1A242F"],
    ["#122c52", "#1A242F"],
    ["#7aaee0", "#5cb8ad"],
    ["#0c1e38", "#121920"],
    ["#0a1e3a", "#121920"],
    ["#5a3e00", "#1A242F"],
    ["#d4a030", "#E85A1B"],
  ];
  const files = [
    "css/main.css",
    "css/navbar.css",
    "css/footer.css",
    "css/index.css",
    "css/product-page.css",
    "css/category-page.css",
    "css/blog-page.css",
    "css/about-us.css",
    "css/carousel.css",
  ];
  for (const rel of files) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    let css = fs.readFileSync(full, "utf8");
    const before = css;
    for (const [from, to] of map) {
      const re = new RegExp(from.replace("#", "#"), "gi");
      css = css.replace(re, to);
    }
    // Update main.css :root block if present
    css = css.replace(
      /--brand-primary:\s*#[0-9a-fA-F]{3,8}/g,
      "--brand-primary: #2A9B8F"
    );
    css = css.replace(
      /--brand-primary-dark:\s*#[0-9a-fA-F]{3,8}/g,
      "--brand-primary-dark: #1A242F"
    );
    css = css.replace(
      /--brand-primary-light:\s*#[0-9a-fA-F]{3,8}/g,
      "--brand-primary-light: #5cb8ad"
    );
    css = css.replace(
      /--brand-primary-soft:\s*rgba\([^)]+\)/g,
      "--brand-primary-soft: rgba(42, 155, 143, 0.10)"
    );
    css = css.replace(/--ip-accent:\s*#[0-9a-fA-F]{3,8}/g, "--ip-accent: #E85A1B");
    if (css !== before) fs.writeFileSync(full, css, "utf8");
  }
}

function patchNavbarJs() {
  const full = path.join(ROOT, "scripts", "navbar.js");
  if (!fs.existsSync(full)) return;
  let js = fs.readFileSync(full, "utf8");
  js = js.replace(
    /images\/ideal-printers-logo-horizontal\.png/g,
    "images/ideal-printers-logo-horizontal.png"
  );
  js = js.replace(/alt="Ideal Printers"/g, `alt="${BRAND}"`);
  js = js.replace(/alt="Ideal Printers Lahore"/g, `alt="${BRAND} Lahore"`);
  js = js.replace(/aria-label="Ideal Printers"/g, `aria-label="${BRAND}"`);
  fs.writeFileSync(full, js, "utf8");
}

function stripDuplicateInlineStylesFromIndex() {
  const full = path.join(ROOT, "index.html");
  if (!fs.existsSync(full)) return;
  let html = fs.readFileSync(full, "utf8");
  // Remove the large duplicate trustbar / line / scrollbar block that also lives in navbar.css
  html = html.replace(
    /<style>\s*\.line:after[\s\S]*?\/\* trustbar css \*\/[\s\S]*?<\/style>/i,
    "<!-- trustbar/line styles live in css/navbar.css + css/ideal-theme.css -->"
  );
  fs.writeFileSync(full, html, "utf8");
}

function main() {
  recolorCssFiles();
  patchNavbarJs();
  const files = walkHtml(ROOT);
  let changed = 0;
  for (const file of files) {
    if (processHtml(file)) changed++;
  }
  stripDuplicateInlineStylesFromIndex();
  // bump index once more after strip
  processHtml(path.join(ROOT, "index.html"));
  console.log(`Rebranded ${changed}/${files.length} HTML files.`);
}

main();
