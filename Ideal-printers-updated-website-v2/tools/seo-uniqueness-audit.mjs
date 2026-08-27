/**
 * SEO uniqueness audit for Ideal Printers & Packages.
 * Reports duplicate titles/descriptions/canonicals and weak/cloned patterns.
 * Run: node tools/seo-uniqueness-audit.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "tools", "images", "videos", "css", "scripts", "fontawesome", "owl-carousel", "lightbox", "flickity"].includes(entry.name)) {
      // still allow html in root only for speed — also scan nested html if any
      if (entry.name === "images" || entry.name === "tools" || entry.name === "node_modules" || entry.name === ".git") continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".git", "tools"].includes(entry.name)) continue;
      walkHtml(full, out);
    } else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].trim().replace(/\s+/g, " ") : "";
}

const pages = [];
for (const file of walkHtml(ROOT)) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  pages.push({
    file: rel,
    title: pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: pick(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      pick(html, /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i),
    keywords: pick(html, /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i) ||
      pick(html, /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']keywords["']/i),
    canonical: pick(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i),
    ogTitle: pick(html, /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i),
    ogDesc: pick(html, /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i),
    ogUrl: pick(html, /<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i),
    h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, ""),
  });
}

function dups(key) {
  const map = new Map();
  for (const p of pages) {
    const v = (p[key] || "").toLowerCase();
    if (!v) continue;
    if (!map.has(v)) map.set(v, []);
    map.get(v).push(p.file);
  }
  return [...map.entries()].filter(([, files]) => files.length > 1);
}

const report = {
  totalPages: pages.length,
  emptyTitle: pages.filter((p) => !p.title).map((p) => p.file),
  emptyDescription: pages.filter((p) => !p.description).map((p) => p.file),
  emptyCanonical: pages.filter((p) => !p.canonical).map((p) => p.file),
  duplicateTitles: dups("title"),
  duplicateDescriptions: dups("description"),
  duplicateKeywords: dups("keywords"),
  duplicateCanonicals: dups("canonical"),
  duplicateOgTitles: dups("ogTitle"),
  titleNeOgMismatch: pages.filter((p) => p.title && p.ogTitle && p.title !== p.ogTitle).slice(0, 30),
  stillGeneric: pages.filter((p) =>
    /best printing company|top 10 printing|us\$\s*\d+|printing companies in lahore\s*$/i.test(p.title + " " + p.description)
  ).slice(0, 40),
  missingBrandSuffix: pages.filter((p) => p.title && !/ideal printers/i.test(p.title)).slice(0, 40),
  shortDescription: pages.filter((p) => p.description && p.description.length < 70).slice(0, 40),
  longTitle: pages.filter((p) => p.title && p.title.length > 70).slice(0, 40),
};

// filename uniqueness among *-in-lahore.html
const names = pages.map((p) => path.basename(p.file).toLowerCase());
const nameMap = new Map();
for (const n of names) {
  nameMap.set(n, (nameMap.get(n) || 0) + 1);
}
report.duplicateFilenames = [...nameMap.entries()].filter(([, c]) => c > 1);

fs.writeFileSync(
  path.join(ROOT, "tools", "seo-audit-report.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

console.log("Pages:", report.totalPages);
console.log("Empty titles:", report.emptyTitle.length);
console.log("Empty descriptions:", report.emptyDescription.length);
console.log("Empty canonicals:", report.emptyCanonical.length);
console.log("Duplicate titles:", report.duplicateTitles.length);
console.log("Duplicate descriptions:", report.duplicateDescriptions.length);
console.log("Duplicate keywords groups:", report.duplicateKeywords.length);
console.log("Duplicate canonicals:", report.duplicateCanonicals.length);
console.log("Duplicate og:titles:", report.duplicateOgTitles.length);
console.log("Generic/cloned SEO leftovers:", report.stillGeneric.length);
console.log("Titles missing Ideal Printers:", report.missingBrandSuffix.length);
console.log("Duplicate filenames:", report.duplicateFilenames.length);
if (report.duplicateTitles.length) {
  console.log("\nSample duplicate titles:");
  for (const [t, files] of report.duplicateTitles.slice(0, 8)) {
    console.log("-", t.slice(0, 90));
    console.log(" ", files.slice(0, 5).join(", "));
  }
}
if (report.duplicateDescriptions.length) {
  console.log("\nSample duplicate descriptions:");
  for (const [t, files] of report.duplicateDescriptions.slice(0, 8)) {
    console.log("-", t.slice(0, 90));
    console.log(" ", files.slice(0, 5).join(", "));
  }
}
