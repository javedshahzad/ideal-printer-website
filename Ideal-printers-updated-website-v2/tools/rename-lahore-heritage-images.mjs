import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "tools"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(html|js|css|xml)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const reps = [
  ["images/ideal-printers-dubai-skyline.webp", "images/ideal-printers-lahore-heritage-skyline.webp"],
  ["images/ideal-printers-exhibition-booth.webp", "images/ideal-printers-lahore-historic-landmark.webp"],
  ["ideal-printers-dubai-skyline.webp", "ideal-printers-lahore-heritage-skyline.webp"],
  ["ideal-printers-exhibition-booth.webp", "ideal-printers-lahore-historic-landmark.webp"],
];

let n = 0;
for (const file of walk(ROOT)) {
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  text = text.replace(
    /src="images\/ideal-printers-lahore-heritage-skyline\.webp"\s+alt="[^"]*"/g,
    'src="images/ideal-printers-lahore-heritage-skyline.webp" alt="Badshahi Mosque heritage skyline in Lahore, Pakistan"'
  );
  text = text.replace(
    /src="images\/ideal-printers-lahore-historic-landmark\.webp"\s+alt="[^"]*"/g,
    'src="images/ideal-printers-lahore-historic-landmark.webp" alt="Minar-e-Pakistan historic landmark in Lahore"'
  );
  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    n++;
  }
}
console.log("updated", n, "files");
