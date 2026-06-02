import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function normalizeAssetPath(url) {
  let value = url.trim().split("?")[0].split("#")[0];
  if (value.startsWith("./")) value = value.slice(2);
  if (value.startsWith("/")) value = value.slice(1);
  return value;
}

function escapeForJsString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
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

function walkHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "tools") continue;
      walkHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

let updated = 0;
for (const filePath of walkHtmlFiles(rootDir)) {
  const original = fs.readFileSync(filePath, "utf8");
  const transformed = replaceDynamicLoaders(original);
  if (transformed !== original) {
    fs.writeFileSync(filePath, transformed, "utf8");
    updated += 1;
    console.log("Fixed:", path.relative(rootDir, filePath));
  }
}
console.log(`Fixed ${updated} files.`);
