import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const VERSION_SNIPPET = `<script>
(function () {
  var version = new Date().getTime();
  window.IP_VERSION = version;

  function withVersion(url) {
    if (!url || /^https?:\\/\\//i.test(url) || url.indexOf("//") === 0) {
      return url;
    }
    return url.split("?")[0] + "?v=" + version;
  }

  window.ipVersionLocalAsset = withVersion;

  window.ipLoadScript = function (src) {
    var script = document.createElement("script");
    script.src = withVersion(src);
    script.async = false;
    document.head.appendChild(script);
    return script;
  };

  window.ipLoadStylesheet = function (href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = withVersion(href);
    document.head.appendChild(link);
    return link;
  };
})();
</script>`;

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

function escapeForJsString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function hasVersionHelper(html) {
  return html.includes("window.ipLoadScript") || html.includes("ipLoadStylesheet");
}

function injectVersionHelper(html) {
  if (hasVersionHelper(html)) return html;
  const headMatch = html.match(/<head([^>]*)>/i);
  if (!headMatch) return html;
  return html.replace(headMatch[0], `${headMatch[0]}\n${VERSION_SNIPPET}`);
}

function replaceDynamicLoaders(html) {
  return html.replace(/<script>\s*\(function\s*\(\)\s*\{[\s\S]*?\}\)\(\);\s*<\/script>/gi, (block) => {
    if (block.includes("window.ipLoadScript") || block.includes("withVersion")) {
      return block;
    }
    if (!block.includes("getTime()") || !block.includes('createElement("script")')) {
      return block;
    }
    const srcMatch = block.match(/script\.src\s*=\s*["']([^"']+)["']\s*\+\s*version/);
    if (!srcMatch) {
      return block;
    }
    const pathValue = normalizeAssetPath(srcMatch[1]);
    return `<script>ipLoadScript("${escapeForJsString(pathValue)}");</script>`;
  });
}

function replaceStaticScripts(html) {
  return html.replace(
    /<script([^>]*)\ssrc=["']([^"']+)["']([^>]*)>\s*<\/script>/gi,
    (full, before, src, after) => {
      if (!isLocalAsset(src)) return full;
      if (before.includes("ip-version") || src.includes("ip-version.js")) return full;
      const attrs = `${before}${after}`.trim();
      if (/type=["']module["']/i.test(attrs)) return full;
      const pathValue = normalizeAssetPath(src);
      return `<script>ipLoadScript("${escapeForJsString(pathValue)}");</script>`;
    }
  );
}

function replaceLocalStylesheets(html) {
  return html.replace(
    /<link([^>]*)\srel=["']stylesheet["']([^>]*)\shref=["']([^"']+)["']([^>]*)\/?>/gi,
    (full, a, b, href, c) => {
      if (!isLocalAsset(href)) return full;
      const pathValue = normalizeAssetPath(href);
      return `<script>ipLoadStylesheet("${escapeForJsString(pathValue)}");</script>`;
    }
  ).replace(
    /<link([^>]*)\shref=["']([^"']+)["']([^>]*)\srel=["']stylesheet["']([^>]*)\/?>/gi,
    (full, a, href, b, c) => {
      if (!isLocalAsset(href)) return full;
      const pathValue = normalizeAssetPath(href);
      return `<script>ipLoadStylesheet("${escapeForJsString(pathValue)}");</script>`;
    }
  );
}

function transformHtml(html) {
  let output = html;
  output = injectVersionHelper(output);
  output = replaceDynamicLoaders(output);
  output = replaceStaticScripts(output);
  output = replaceLocalStylesheets(output);
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

const htmlFiles = walkHtmlFiles(rootDir);
let updated = 0;

for (const filePath of htmlFiles) {
  const original = fs.readFileSync(filePath, "utf8");
  const transformed = transformHtml(original);
  if (transformed !== original) {
    fs.writeFileSync(filePath, transformed, "utf8");
    updated += 1;
    console.log("Updated:", path.relative(rootDir, filePath));
  }
}

console.log(`Done. Updated ${updated} of ${htmlFiles.length} HTML files.`);
