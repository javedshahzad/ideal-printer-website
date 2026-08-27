#!/usr/bin/env python3
import re
from pathlib import Path
from html import unescape
from urllib.parse import unquote
from PIL import Image

SKIP = (
    "ideal-printers-logo",
    "ideal-printers-logo-mark",
    "favicon",
    "companies-logos",
    "dlxprint",
    "apple-touch",
)

heroes = []
for html in Path(".").glob("*.html"):
    text = html.read_text(encoding="utf-8", errors="ignore")
    m = re.search(
        r'id="product-img"[^>]*src="([^"]+)"|src="([^"]+)"[^>]*id="product-img"',
        text,
    )
    if not m:
        continue
    src = unquote(unescape(m.group(1) or m.group(2))).replace("%26", "&")
    heroes.append((html.name, src))

print("heroes", len(heroes))
flat_heroes = []
ok_heroes = []
bad = []
for page, src in heroes:
    low = src.lower()
    if any(s in low for s in SKIP):
        continue
    p = Path(src)
    if not p.exists():
        bad.append((page, src, "missing"))
        continue
    try:
        im = Image.open(p).convert("RGB").resize((64, 64))
        uniq = len(set(im.getdata()))
    except Exception as e:
        bad.append((page, src, str(e)))
        continue
    row = (uniq, page, src)
    if uniq < 900:
        flat_heroes.append(row)
    else:
        ok_heroes.append(row)

print("flat_heroes", len(flat_heroes), "photoish", len(ok_heroes), "bad", len(bad))
Path("_flat_heroes.txt").write_text(
    "\n".join(f"{u}\t{page}\t{src}" for u, page, src in sorted(flat_heroes)),
    encoding="utf-8",
)
for row in sorted(flat_heroes)[:40]:
    print(row)
for row in bad[:15]:
    print("BAD", row)
