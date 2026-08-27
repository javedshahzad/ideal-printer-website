/**
 * Replace favicon / apple-touch / manifest tags site-wide with Google-ready icons.
 * Run: node tools/apply-google-favicon-tags.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VER = "v=4.0.0";
const SITE = "https://idealprinters.pk";

const FAVICON_BLOCK = `    <!-- Favicon — Ideal Printers & Packages brand mark (Google Search icon) -->
    <link rel="icon" href="favicon.ico?${VER}" sizes="any">
    <link rel="icon" type="image/png" sizes="48x48" href="images/favicon-48x48.png?${VER}">
    <link rel="icon" type="image/png" sizes="96x96" href="images/favicon-96x96.png?${VER}">
    <link rel="icon" type="image/png" sizes="192x192" href="favicon-192.png?${VER}">
    <link rel="shortcut icon" href="images/favicon-48x48.png?${VER}" type="image/png">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png?${VER}">
    <link rel="manifest" href="site.webmanifest?${VER}">
    <meta name="theme-color" content="#E85A1B">
    <meta name="msapplication-TileImage" content="${SITE}/android-chrome-512x512.png?${VER}">
    <meta name="msapplication-TileColor" content="#E85A1B">`;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function replaceFaviconBlock(html) {
  // Remove existing icon / apple-touch / shortcut / manifest / tile meta lines
  html = html.replace(/\s*<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*>/gi, "");
  html = html.replace(/\s*<link[^>]*rel=["']apple-touch-icon["'][^>]*>/gi, "");
  html = html.replace(/\s*<link[^>]*rel=["']manifest["'][^>]*>/gi, "");
  html = html.replace(/\s*<meta[^>]*name=["']msapplication-Tile(?:Image|Color)["'][^>]*>/gi, "");
  html = html.replace(/\s*<meta[^>]*name=["']theme-color["'][^>]*>/gi, "");
  html = html.replace(/\s*<!--\s*Favicon[^>]*-->/gi, "");
  html = html.replace(/\s*<!-- Favicon and apple touch icons-->/gi, "");

  // Insert after charset or viewport / before first stylesheet
  if (/<link[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(
      /(<link[^>]*rel=["']canonical["'][^>]*>)/i,
      `$1\n${FAVICON_BLOCK}`
    );
  } else if (/<\/title>/i.test(html)) {
    html = html.replace(/<\/title>/i, `</title>\n${FAVICON_BLOCK}`);
  } else {
    html = html.replace(/<head[^>]*>/i, (m) => `${m}\n${FAVICON_BLOCK}`);
  }

  // Point structured-data / OG images at square brand mark
  html = html.replace(
    /https:\/\/idealprinters\.pk\/images\/ideal-printers-logo-small\.png/g,
    `${SITE}/images/ideal-printers-icon.png`
  );
  html = html.replace(
    /content=["']images\/ideal-printers-logo-small\.png["']/g,
    `content="${SITE}/images/ideal-printers-icon.png"`
  );

  return html;
}

let n = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, "utf8");
  const after = replaceFaviconBlock(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    n++;
  }
}
console.log("Updated favicon tags on", n, "pages");
