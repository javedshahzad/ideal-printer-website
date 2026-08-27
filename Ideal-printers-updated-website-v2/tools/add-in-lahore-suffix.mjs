/**
 * Rename all HTML pages to *-in-lahore.html (except index.html)
 * and rewrite every internal reference + sitemap + .htaccess 301s.
 *
 * Example: print-and-marketing-solutions.html
 *       -> print-and-marketing-solutions-in-lahore.html
 *
 * Run: node tools/add-in-lahore-suffix.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://idealprinters.pk";
const SKIP = new Set(["index.html"]);

function walkFiles(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "tools") {
      // still scan tools? skip tools to avoid rewriting this script itself mid-run
      if (entry.name === "tools" || entry.name === "node_modules" || entry.name === ".git") continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, exts, out);
    else if (exts.test(entry.name)) out.push(full);
  }
  return out;
}

function newName(filename) {
  if (SKIP.has(filename)) return null;
  if (!filename.toLowerCase().endsWith(".html")) return null;
  if (/-in-lahore\.html$/i.test(filename)) return null; // already done
  return filename.replace(/\.html$/i, "-in-lahore.html");
}

// 1) Build rename map for root HTML + nested HTML (e.g. images/*.html)
const htmlFiles = walkFiles(ROOT, /\.html$/i);
const renameMap = new Map(); // oldBasename -> newBasename (root-level preferred)

for (const full of htmlFiles) {
  const base = path.basename(full);
  const next = newName(base);
  if (!next) continue;
  // Only rename files that live in project root OR keep relative path rename
  const rel = path.relative(ROOT, full);
  const dir = path.dirname(rel);
  const destRel = dir === "." ? next : path.join(dir, next);
  renameMap.set(rel.replace(/\\/g, "/"), destRel.replace(/\\/g, "/"));
}

console.log("Will rename", renameMap.size, "HTML files");

// 2) Rename files (deepest paths first not needed for flat; do it)
for (const [fromRel, toRel] of renameMap) {
  const from = path.join(ROOT, fromRel);
  const to = path.join(ROOT, toRel);
  if (!fs.existsSync(from)) {
    console.warn("missing", fromRel);
    continue;
  }
  if (fs.existsSync(to)) {
    console.warn("target exists, skip", toRel);
    continue;
  }
  fs.renameSync(from, to);
}

// 3) Rewrite references in html/js/xml/css/txt/htaccess/mjs/json/webmanifest
const refFiles = walkFiles(ROOT, /\.(html|js|xml|css|txt|mjs|json|webmanifest|htaccess)$/i);
// also include .htaccess explicitly
const ht = path.join(ROOT, ".htaccess");
if (fs.existsSync(ht) && !refFiles.includes(ht)) refFiles.push(ht);

// Sort replacements by longest old name first to avoid partial collisions
const pairs = [...renameMap.entries()].sort((a, b) => b[0].length - a[0].length);

let touched = 0;
for (const file of refFiles) {
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [fromRel, toRel] of pairs) {
    const fromBase = path.basename(fromRel);
    const toBase = path.basename(toRel);
    // Replace basename occurrences (href, sitemap loc, js strings, etc.)
    // Avoid double-suffix if somehow already rewritten
    const re = new RegExp(fromBase.replace(/\./g, "\\."), "g");
    text = text.replace(re, toBase);
  }
  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    touched++;
  }
}
console.log("Updated references in", touched, "files");

// 4) Fix canonical + og:url on renamed pages to absolute new URLs
for (const toRel of renameMap.values()) {
  const full = path.join(ROOT, toRel);
  if (!fs.existsSync(full)) continue;
  let html = fs.readFileSync(full, "utf8");
  const base = path.basename(toRel);
  const url = `${SITE}/${base}`;
  html = html.replace(
    /(<link[^>]*rel=["']canonical["'][^>]*href=["'])([^"']*)(["'][^>]*>)/i,
    `$1${url}$3`
  );
  html = html.replace(
    /(<meta[^>]*property=["']og:url["'][^>]*content=["'])([^"']*)(["'][^>]*>)/i,
    `$1${url}$3`
  );
  // Fix broken og:url without slash if any
  html = html.replace(
    new RegExp(`https://idealprinters\\.pk(?!/)${base.replace(/\./g, "\\.")}`, "gi"),
    url
  );
  fs.writeFileSync(full, html, "utf8");
}

// 5) Rebuild .htaccess with 301s: old -> new, plus previous category redirects
const previousCategory = {
  "digital-printing-services.html": "print-and-marketing-solutions.html",
  "fabric-and-fashion-printing.html": "fashion-and-textile-printing.html",
  "office-store-branding-printing.html": "workspace-and-store-branding.html",
  "signage-company-in.html": "custom-signage-solutions.html",
  "flags-printing-branding.html": "custom-flags-and-banners.html",
  "backdrop-stand.html": "exhibition-backdrops-and-stands.html",
  "promotional-corporate-gifts.html": "branded-gifts-and-packages.html",
  "about-company.html": "about-ideal-printers-packages.html",
  "why-choose-ideal-printers.html": "why-choose-ideal-packages.html",
  "blog.html": "print-insights.html",
  "signage-company.html": "lahore-signage-studio.html",
  "printing-solutions.html": "end-to-end-print-solutions.html",
  "printing-shops-in.html": "lahore-print-studio.html",
};

const lines = [
  "RewriteEngine On",
  "",
  "# Ideal Printers & Packages — 301 redirects after -in-lahore rename",
];

// Direct old basename -> new -in-lahore
for (const [fromRel, toRel] of pairs) {
  const fromBase = path.basename(fromRel);
  const toBase = path.basename(toRel);
  lines.push(`Redirect 301 /${fromBase} /${toBase}`);
}

// Older category names -> final -in-lahore names
lines.push("");
lines.push("# Legacy category URLs (pre-rename) -> final -in-lahore pages");
for (const [legacy, mid] of Object.entries(previousCategory)) {
  const finalName = mid.replace(/\.html$/i, "-in-lahore.html");
  lines.push(`Redirect 301 /${legacy} /${finalName}`);
}

lines.push("");
fs.writeFileSync(path.join(ROOT, ".htaccess"), lines.join("\n"), "utf8");
console.log("Wrote .htaccess with redirects");

// Sanity
const sampleOld = path.join(ROOT, "print-and-marketing-solutions.html");
const sampleNew = path.join(ROOT, "print-and-marketing-solutions-in-lahore.html");
console.log("old exists?", fs.existsSync(sampleOld), "new exists?", fs.existsSync(sampleNew));
console.log("index exists?", fs.existsSync(path.join(ROOT, "index.html")));
