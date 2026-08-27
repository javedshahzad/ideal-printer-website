import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cat = JSON.parse(fs.readFileSync(path.join(root, 'data/catalog.json'), 'utf8'));
const urls = [
  '',
  'about.html',
  'contact.html',
  'faq.html',
  'terms.html',
  'privacy.html',
  'showcase.html',
  'all-products.html',
];
cat.categories.forEach((c) => urls.push(`services/${c.slug}.html`));
cat.products.forEach((p) => urls.push(`products/${p.file}`));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>https://idealprinters.pk/${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log('urls', urls.length);
