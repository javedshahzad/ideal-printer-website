const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter((f) => /business.?card/i.test(f) && f.endsWith('.html'));
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const imgs = [...html.matchAll(/src="(images\/[^"]+(?:banner|business_card|laminated|velvet|spot_uv|royal|pearl|pvc|craft|classic|translucent|foil|bristol|standard|offset|pantone)[^"]*)"/gi)].map((m) => m[1]);
  const banners = [...html.matchAll(/src="(images\/[^"]*[Bb]anner[^"]*)"/g)].map((m) => m[1]);
  const unique = [...new Set([...imgs, ...banners])];
  if (unique.length) {
    console.log('\n==', f);
    unique.forEach((u) => console.log(' ', u));
  }
}
