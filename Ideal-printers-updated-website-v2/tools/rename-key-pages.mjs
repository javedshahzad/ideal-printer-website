/**
 * Rename key category/marketing pages to unique slugs (de-clone)
 * and rewrite internal links + sitemap + .htaccess 301s.
 * Run: node tools/rename-key-pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://idealprinters.pk";

const RENAMES = {
  "print-and-marketing-solutions.html": "print-and-marketing-solutions.html",
  "fashion-and-textile-printing.html": "fashion-and-textile-printing.html",
  "workspace-and-store-branding.html": "workspace-and-store-branding.html",
  "custom-signage-solutions.html": "custom-signage-solutions.html",
  "custom-flags-and-banners.html": "custom-flags-and-banners.html",
  "exhibition-backdrops-and-stands.html": "exhibition-backdrops-and-stands.html",
  "branded-gifts-and-packages.html": "branded-gifts-and-packages.html",
  "about-ideal-printers-packages.html": "about-ideal-printers-packages.html",
  "why-choose-ideal-packages.html": "why-choose-ideal-packages.html",
  "print-insights.html": "print-insights.html",
  "lahore-signage-studio.html": "lahore-signage-studio.html",
  "end-to-end-print-solutions.html": "end-to-end-print-solutions.html",
  "lahore-print-studio.html": "lahore-print-studio.html",
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && /\.(html|js|xml|css|txt|mjs)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function renameFiles() {
  for (const [from, to] of Object.entries(RENAMES)) {
    const src = path.join(ROOT, from);
    const dest = path.join(ROOT, to);
    if (!fs.existsSync(src)) {
      console.warn("Missing:", from);
      continue;
    }
    if (fs.existsSync(dest)) {
      console.warn("Target exists, skip rename:", to);
      continue;
    }
    fs.renameSync(src, dest);
    console.log("Renamed", from, "→", to);
  }
}

function rewriteReferences() {
  const files = walk(ROOT);
  let touched = 0;
  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    const before = text;
    for (const [from, to] of Object.entries(RENAMES)) {
      // href / src / canonical / sitemap URL style
      const re = new RegExp(from.replace(/\./g, "\\."), "g");
      text = text.replace(re, to);
    }
    if (text !== before) {
      fs.writeFileSync(file, text, "utf8");
      touched++;
    }
  }
  console.log("Updated references in", touched, "files");
}

function writeHtaccess() {
  const lines = [
    "RewriteEngine On",
    "",
    "# Ideal Printers & Packages — permanent redirects for renamed pages",
  ];
  for (const [from, to] of Object.entries(RENAMES)) {
    lines.push(`Redirect 301 /${from} /${to}`);
  }
  lines.push("");
  fs.writeFileSync(path.join(ROOT, ".htaccess"), lines.join("\n"), "utf8");
  console.log("Wrote .htaccess redirects");
}

function patchCanonicalOnRenamed() {
  for (const to of Object.values(RENAMES)) {
    const full = path.join(ROOT, to);
    if (!fs.existsSync(full)) continue;
    let html = fs.readFileSync(full, "utf8");
    html = html.replace(
      /(<link[^>]*rel=["']canonical["'][^>]*href=["'])([^"']*)(["'][^>]*>)/i,
      `$1${SITE}/${to}$3`
    );
    html = html.replace(
      /(<meta[^>]*property=["']og:url["'][^>]*content=["'])([^"']*)(["'][^>]*>)/i,
      `$1${SITE}/${to}$3`
    );
    fs.writeFileSync(full, html, "utf8");
  }
}

renameFiles();
rewriteReferences();
patchCanonicalOnRenamed();
writeHtaccess();
