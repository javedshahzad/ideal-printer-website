import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const versionFile = path.join(rootDir, "scripts", "global-version.js");

const VERSION_RE = /window\.GLOBAL_VERSION\s*=\s*["']([^"']+)["']/;
const INLINE_VERSION_BLOCK_RE =
  /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?window\.ipLoadStylesheet[\s\S]*?\}\)\(\);\s*<\/script>\s*/gi;

function readGlobalVersion() {
  const source = fs.readFileSync(versionFile, "utf8");
  const match = source.match(VERSION_RE);
  if (!match) {
    throw new Error(`Could not read GLOBAL_VERSION from ${versionFile}`);
  }
  return match[1];
}

function isLocalAsset(url) {
  if (!url) return false;
  const value = url.trim();
  if (!value || value.startsWith("data:")) return false;
  if (/^https?:\/\//i.test(value)) return false;
  if (value.startsWith("//")) return false;
  return true;
}

function normalizeAssetPath(url) {
  let value = url.trim().split("?")[0].split("#")[0];
  if (value.startsWith("./")) value = value.slice(2);
  if (value.startsWith("/")) value = value.slice(1);
  return value;
}

function withQueryVersion(assetPath, version) {
  const base = normalizeAssetPath(assetPath);
  return `${base}?v=${version}`;
}

function removeInlineVersionHelper(html) {
  return html.replace(INLINE_VERSION_BLOCK_RE, "");
}

function replaceIpLoadScript(html, version) {
  return html.replace(
    /<script>\s*ipLoadScript\(\s*["']([^"']+)["']\s*\)\s*;\s*<\/script>/gi,
    (_full, src) => {
      if (!isLocalAsset(src)) return _full;
      const href = withQueryVersion(src, version);
      return `<script src="${href}"></script>`;
    }
  );
}

function replaceIpLoadStylesheet(html, version) {
  return html.replace(
    /<script>\s*ipLoadStylesheet\(\s*["']([^"']+)["']\s*\)\s*;\s*<\/script>/gi,
    (_full, href) => {
      if (!isLocalAsset(href)) return _full;
      const url = withQueryVersion(href, version);
      return `<link rel="stylesheet" href="${url}">`;
    }
  );
}

function refreshExistingVersionedAssets(html, version) {
  let output = html;

  output = output.replace(
    /<script([^>]*)\ssrc=["']([^"']+\.(?:js|mjs))(?:\?v=[^"']*)?["']([^>]*)>\s*<\/script>/gi,
    (full, before, src, after) => {
      if (!isLocalAsset(src)) return full;
      const attrs = `${before}${after}`.trim();
      if (/type=["']module["']/i.test(attrs)) return full;
      const url = withQueryVersion(src, version);
      return `<script src="${url}"></script>`;
    }
  );

  output = output.replace(
    /<link([^>]*)\srel=["']stylesheet["']([^>]*)\shref=["']([^"']+\.css)(?:\?v=[^"']*)?["']([^>]*)\/?>/gi,
    (full, a, b, href, c) => {
      if (!isLocalAsset(href)) return full;
      const url = withQueryVersion(href, version);
      return `<link rel="stylesheet" href="${url}">`;
    }
  );

  output = output.replace(
    /<link([^>]*)\shref=["']([^"']+\.css)(?:\?v=[^"']*)?["']([^>]*)\srel=["']stylesheet["']([^>]*)\/?>/gi,
    (full, a, href, b, c) => {
      if (!isLocalAsset(href)) return full;
      const url = withQueryVersion(href, version);
      return `<link rel="stylesheet" href="${url}">`;
    }
  );

  return output;
}

function transformHtml(html, version) {
  let output = html;
  output = removeInlineVersionHelper(output);
  output = replaceIpLoadStylesheet(output, version);
  output = replaceIpLoadScript(output, version);
  output = refreshExistingVersionedAssets(output, version);
  return output;
}

function walkHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "tools") {
        continue;
      }
      walkHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

const version = readGlobalVersion();
const htmlFiles = walkHtmlFiles(rootDir);
let updated = 0;

for (const filePath of htmlFiles) {
  const original = fs.readFileSync(filePath, "utf8");
  const transformed = transformHtml(original, version);
  if (transformed !== original) {
    fs.writeFileSync(filePath, transformed, "utf8");
    updated += 1;
    console.log("Updated:", path.relative(rootDir, filePath));
  }
}

console.log(`GLOBAL_VERSION=${version}. Updated ${updated} of ${htmlFiles.length} HTML files.`);
