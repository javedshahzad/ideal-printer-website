/**
 * Strip cloned third-party verification + shared analytics tags site-wide.
 * Leaves a short HTML comment so the owner can paste THEIR own tags.
 * Run: node tools/strip-cloned-tracking.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = walkHtml(ROOT);
let n = 0;
for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  html = html.replace(/<meta[^>]*name=["']msvalidate\.01["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta[^>]*name=["']p:domain_verify["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta[^>]*name=["']facebook-domain-verification["'][^>]*>\s*/gi, "");

  // Remove shared GA4 block
  html = html.replace(
    /<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-4RV8CVV4KC"><\/script>\s*<script>[\s\S]*?gtag\('config',\s*'G-4RV8CVV4KC'\);[\s\S]*?<\/script>\s*/gi,
    "<!-- GA4: add your own Measurement ID for idealprinters.pk (cloned tag G-4RV8CVV4KC removed) -->\n"
  );
  // Fallback if comment missing
  html = html.replace(
    /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-4RV8CVV4KC"><\/script>\s*<script>[\s\S]*?gtag\('config',\s*'G-4RV8CVV4KC'\);[\s\S]*?<\/script>\s*/gi,
    "<!-- GA4: add your own Measurement ID for idealprinters.pk -->\n"
  );

  // Remove Microsoft Clarity shared ID
  html = html.replace(
    /<script type="text\/javascript">\s*\(function\(c,l,a,r,i,t,y\)\{[\s\S]*?clarity[\s\S]*?"qa2if0uioa"\);?\s*<\/script>\s*/gi,
    "<!-- Clarity: add your own project id for idealprinters.pk -->\n"
  );

  // Bump CSS cache for theme
  html = html.replace(/css\/ideal-theme\.css\?v=[^"']+/g, "css/ideal-theme.css?v=3.0.0");
  html = html.replace(/css\/navbar\.css\?v=[^"']+/g, "css/navbar.css?v=3.0.0");
  html = html.replace(/css\/footer\.css\?v=[^"']+/g, "css/footer.css?v=3.0.0");
  html = html.replace(/css\/main\.css\?v=[^"']+/g, "css/main.css?v=3.0.0");
  html = html.replace(/css\/index\.css\?v=[^"']+/g, "css/index.css?v=3.0.0");

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    n++;
  }
}
console.log("Cleaned tracking/cache on", n, "pages");
