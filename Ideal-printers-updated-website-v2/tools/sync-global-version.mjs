import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const versionFile = path.join(rootDir, "scripts", "global-version.js");

const VERSION_RE = /window\.GLOBAL_VERSION\s*=\s*["']([^"']+)["']/;
const INLINE_VERSION_BLOCK_RE =
  /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?window\.ipLoadStylesheet[\s\S]*?\}\)\(\);\s*<\/script>\s*/gi;

const IMAGE_EXT = "png|jpe?g|webp|gif|svg|ico|avif|bmp";
const IMAGE_PATH_RE = new RegExp(`\\.(?:${IMAGE_EXT})$`, "i");
const SKIP_DIRS = new Set(["node_modules", ".git", "tools", ".cursor"]);

function readGlobalVersion() {
  const source = fs.readFileSync(versionFile, "utf8");
  const match = source.match(VERSION_RE);
  if (!match) {
    throw new Error(`Could not read GLOBAL_VERSION from ${versionFile}`);
  }
  return match[1];
}

function isVersionableAsset(url) {
  if (!url) return false;
  const value = url.trim();
  if (!value || value.startsWith("data:") || value.startsWith("blob:")) return false;
  if (value.startsWith("//")) return false;
  if (/^https?:\/\/(?:www\.)?idealprinters\.pk\//i.test(value)) return true;
  if (/^https?:\/\//i.test(value)) return false;
  return true;
}

function isImageAsset(url) {
  const clean = url.trim().split("?")[0].split("#")[0];
  return IMAGE_PATH_RE.test(clean);
}

function normalizeAssetPath(url) {
  let value = url.trim().split("?")[0].split("#")[0];
  if (value.startsWith("./")) value = value.slice(2);
  if (value.startsWith("/")) value = value.slice(1);
  return value;
}

function withQueryVersion(assetPath, version) {
  const trimmed = assetPath.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    const [beforeHash, hash = ""] = trimmed.split("#");
    const base = beforeHash.split("?")[0];
    return `${base}?v=${version}${hash ? `#${hash}` : ""}`;
  }
  const base = normalizeAssetPath(trimmed);
  return `${base}?v=${version}`;
}

function versionSrcset(srcset, version) {
  return srcset
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return trimmed;
      const tokens = trimmed.split(/\s+/);
      const url = tokens[0];
      const descriptors = tokens.slice(1).join(" ");
      if (!isImageAsset(url) || !isVersionableAsset(url)) return trimmed;
      const versioned = withQueryVersion(url, version);
      return descriptors ? `${versioned} ${descriptors}` : versioned;
    })
    .join(", ");
}

function removeInlineVersionHelper(html) {
  return html.replace(INLINE_VERSION_BLOCK_RE, "");
}

function replaceIpLoadScript(html, version) {
  return html.replace(
    /<script>\s*ipLoadScript\(\s*["']([^"']+)["']\s*\)\s*;\s*<\/script>/gi,
    (_full, src) => {
      if (!isVersionableAsset(src)) return _full;
      const href = withQueryVersion(src, version);
      return `<script src="${href}"></script>`;
    }
  );
}

function replaceIpLoadStylesheet(html, version) {
  return html.replace(
    /<script>\s*ipLoadStylesheet\(\s*["']([^"']+)["']\s*\)\s*;\s*<\/script>/gi,
    (_full, href) => {
      if (!isVersionableAsset(href)) return _full;
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
      if (!isVersionableAsset(src)) return full;
      const attrs = `${before}${after}`.trim();
      if (/type=["']module["']/i.test(attrs)) return full;
      const url = withQueryVersion(src, version);
      return `<script${before} src="${url}"${after}></script>`;
    }
  );

  output = output.replace(
    /<link([^>]*)\srel=["']stylesheet["']([^>]*)\shref=["']([^"']+\.css)(?:\?v=[^"']*)?["']([^>]*)\/?>/gi,
    (full, a, b, href, c) => {
      if (!isVersionableAsset(href)) return full;
      const url = withQueryVersion(href, version);
      return `<link${a} rel="stylesheet"${b} href="${url}"${c}>`;
    }
  );

  output = output.replace(
    /<link([^>]*)\shref=["']([^"']+\.css)(?:\?v=[^"']*)?["']([^>]*)\srel=["']stylesheet["']([^>]*)\/?>/gi,
    (full, a, href, b, c) => {
      if (!isVersionableAsset(href)) return full;
      const url = withQueryVersion(href, version);
      return `<link${a} href="${url}"${b} rel="stylesheet"${c}>`;
    }
  );

  return output;
}

function refreshVersionedImages(content, version) {
  let output = content;

  // src / href / poster / content / data-src pointing at images
  output = output.replace(
    /\b(src|href|poster|content|data-src)=["']([^"']+)["']/gi,
    (full, attr, url) => {
      if (!isImageAsset(url) || !isVersionableAsset(url)) return full;
      return `${attr}="${withQueryVersion(url, version)}"`;
    }
  );

  // srcset (single or comma-separated descriptors)
  output = output.replace(
    /\b(srcset)=["']([^"']+)["']/gi,
    (full, attr, srcset) => `${attr}="${versionSrcset(srcset, version)}"`
  );

  // Quoted image paths in JSON-LD / inline JS strings
  output = output.replace(
    /(["'])((?:https?:\/\/(?:www\.)?idealprinters\.pk\/|(?:\.\.\/)*(?:images|img|assets)\/)[^"'\\]+\.(?:png|jpe?g|webp|gif|svg|ico|avif|bmp))(?:\?v=[^"']*)?\1/gi,
    (full, quote, url) => `${quote}${withQueryVersion(url, version)}${quote}`
  );

  return output;
}

function refreshVersionedCssUrls(css, version) {
  return css.replace(
    /url\(\s*(['"]?)([^)'"]+)\1\s*\)/gi,
    (full, quote, url) => {
      const cleaned = url.trim();
      if (!isImageAsset(cleaned) || !isVersionableAsset(cleaned)) return full;
      const versioned = withQueryVersion(cleaned, version);
      const q = quote || "";
      return `url(${q}${versioned}${q})`;
    }
  );
}

function transformHtml(html, version) {
  let output = html;
  output = removeInlineVersionHelper(output);
  output = replaceIpLoadStylesheet(output, version);
  output = replaceIpLoadScript(output, version);
  output = refreshExistingVersionedAssets(output, version);
  output = refreshVersionedImages(output, version);
  return output;
}

function transformJs(js, version) {
  return refreshVersionedImages(js, version);
}

function transformCss(css, version) {
  return refreshVersionedCssUrls(css, version);
}

function walkFiles(dir, extensions, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkFiles(fullPath, extensions, files);
    } else if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function processFiles(files, transform, version, label) {
  let updated = 0;
  for (const filePath of files) {
    const original = fs.readFileSync(filePath, "utf8");
    const transformed = transform(original, version);
    if (transformed !== original) {
      fs.writeFileSync(filePath, transformed, "utf8");
      updated += 1;
      console.log(`Updated ${label}:`, path.relative(rootDir, filePath));
    }
  }
  return updated;
}

const version = readGlobalVersion();
const htmlFiles = walkFiles(rootDir, new Set([".html"]));
const jsFiles = walkFiles(rootDir, new Set([".js", ".mjs"])).filter(
  (filePath) => !filePath.includes(`${path.sep}tools${path.sep}`)
);
const cssFiles = walkFiles(rootDir, new Set([".css"]));

const htmlUpdated = processFiles(htmlFiles, transformHtml, version, "HTML");
const jsUpdated = processFiles(jsFiles, transformJs, version, "JS");
const cssUpdated = processFiles(cssFiles, transformCss, version, "CSS");

console.log(
  `GLOBAL_VERSION=${version}. Updated HTML ${htmlUpdated}/${htmlFiles.length}, JS ${jsUpdated}/${jsFiles.length}, CSS ${cssUpdated}/${cssFiles.length}.`
);
