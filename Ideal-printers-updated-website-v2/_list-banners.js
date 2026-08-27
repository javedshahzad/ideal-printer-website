const fs = require('fs');
const files = fs.readdirSync('.').filter((f) => /business.?card/i.test(f) && f.endsWith('.html'));
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const lines = html.split('\n');
  lines.forEach((line, i) => {
    if (/header-banner/i.test(line) && /src=/.test(line) && !/<!--/.test(line)) {
      console.log(f, i + 1, line.trim().slice(0, 180));
    }
  });
}
