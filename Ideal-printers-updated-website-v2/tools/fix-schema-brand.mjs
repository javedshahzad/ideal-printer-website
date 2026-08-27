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
  html = html.replace(/"name":\s*"Ideal Printers"/g, '"name": "Ideal Printers & Packages"');
  html = html.replace(
    /"streetAddress":\s*"Al-Murar"/g,
    '"streetAddress": "G-2, Al-Rehman Centre, Shama Metro Station, 70-Ferozepur Road, Lahore"'
  );
  html = html.replace(/"addressLocality":\s*"Ichra"/g, '"addressLocality": "Lahore"');
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    n++;
  }
}
console.log("patched", n, "files");
