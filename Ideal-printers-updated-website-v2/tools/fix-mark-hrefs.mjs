import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

let n = 0;
for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html.replace(/images\/true/g, "images/ideal-printers-mark.png?v=3.0.1");
  html = html.replace(/href=["']true["']/g, 'href="images/ideal-printers-mark.png?v=3.0.1"');
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    n++;
  }
}
console.log("fixed", n, "files");
