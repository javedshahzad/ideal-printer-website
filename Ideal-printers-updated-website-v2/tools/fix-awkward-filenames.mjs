/**
 * Fix awkward *-in-in-lahore.html filenames and generic cloned page names.
 * Run: node tools/fix-awkward-filenames.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://idealprinters.pk";

const SPECIAL = {
  "best-printing-company-in-in-lahore.html": "lahore-print-studio-overview-in-lahore.html",
  "why-custom-fabric-printing-is-the-future-of-fashion-in-in-lahore.html":
    "custom-fabric-printing-fashion-future-in-lahore.html",
};

function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "tools"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.test(entry.name)) out.push(full);
  }
  return out;
}

const renameMap = new Map();

// Special renames first
for (const [from, to] of Object.entries(SPECIAL)) {
  const src = path.join(ROOT, from);
  if (fs.existsSync(src)) renameMap.set(from, to);
}

// Collapse -in-in-lahore -> -in-lahore
for (const file of fs.readdirSync(ROOT)) {
  if (!/-in-in-lahore\.html$/i.test(file)) continue;
  if (renameMap.has(file)) continue;
  const to = file.replace(/-in-in-lahore\.html$/i, "-in-lahore.html");
  if (fs.existsSync(path.join(ROOT, to))) {
    // target exists — use a distinct studio suffix
    const alt = file.replace(/-in-in-lahore\.html$/i, "-studio-in-lahore.html");
    renameMap.set(file, alt);
  } else {
    renameMap.set(file, to);
  }
}

console.log("Renames:", renameMap.size);
for (const [from, to] of renameMap) {
  const src = path.join(ROOT, from);
  const dest = path.join(ROOT, to);
  if (!fs.existsSync(src)) {
    console.warn("missing", from);
    continue;
  }
  if (fs.existsSync(dest)) {
    console.warn("target exists", to);
    continue;
  }
  fs.renameSync(src, dest);
  console.log(from, "->", to);
}

// Rewrite references
const pairs = [...renameMap.entries()].sort((a, b) => b[0].length - a[0].length);
const refFiles = walk(ROOT, /\.(html|js|xml|css|txt|mjs|json|webmanifest)$/i);
const ht = path.join(ROOT, ".htaccess");
if (fs.existsSync(ht)) refFiles.push(ht);

let touched = 0;
for (const file of refFiles) {
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [from, to] of pairs) {
    text = text.split(from).join(to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    touched++;
  }
}
console.log("Updated refs in", touched, "files");

// Canonicals on renamed pages
for (const to of renameMap.values()) {
  const full = path.join(ROOT, to);
  if (!fs.existsSync(full)) continue;
  let html = fs.readFileSync(full, "utf8");
  const url = `${SITE}/${to}`;
  html = html.replace(
    /(<link[^>]*rel=["']canonical["'][^>]*href=["'])([^"']*)(["'][^>]*>)/i,
    `$1${url}$3`
  );
  html = html.replace(
    /(<meta[^>]*property=["']og:url["'][^>]*content=["'])([^"']*)(["'][^>]*>)/i,
    `$1${url}$3`
  );
  fs.writeFileSync(full, html, "utf8");
}

// Append redirects
let htaccess = fs.existsSync(ht) ? fs.readFileSync(ht, "utf8") : "RewriteEngine On\n";
htaccess += "\n# Collapse awkward -in-in-lahore names\n";
for (const [from, to] of pairs) {
  const line = `Redirect 301 /${from} /${to}`;
  if (!htaccess.includes(line)) htaccess += line + "\n";
  // also redirect mid forms without double-in if useful
  const mid = from.replace(/-in-in-lahore\.html$/i, "-in-lahore.html");
  if (mid !== to && mid !== from) {
    const line2 = `Redirect 301 /${mid} /${to}`;
    if (!htaccess.includes(`/${from} `) && !htaccess.includes(line2)) {
      // skip noisy mid if mid file exists as different page
    }
  }
}
fs.writeFileSync(ht, htaccess, "utf8");
console.log("Updated .htaccess");
