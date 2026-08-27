#!/usr/bin/env python3
import re
from pathlib import Path
from html import unescape
from urllib.parse import unquote
from collections import defaultdict

missing = defaultdict(list)
all_refs = 0
pat = re.compile(
    r"""(?:src|href|content|srcset)=["']([^"']+)["']|url\((?:["']?)([^"')]+)(?:["']?)\)""",
    re.I,
)

def candidates_from_match(m):
    raw = m.group(1) or m.group(2) or ""
    # srcset can contain multiple
    parts = re.split(r"\s*,\s*", raw)
    out = []
    for part in parts:
        token = part.strip().split()[0] if part.strip() else ""
        if re.search(r"\.(?:webp|png|jpg|jpeg|gif|svg)(?:$|\?)", token, re.I):
            out.append(token)
    return out

for html in Path(".").glob("*.html"):
    text = html.read_text(encoding="utf-8", errors="ignore")
    for m in pat.finditer(text):
        for src0 in candidates_from_match(m):
            src = unquote(unescape(src0)).replace("%26", "&").split("?")[0]
            if src.startswith("http") or src.startswith("//") or src.startswith("data:"):
                continue
            src = src.lstrip("/")
            all_refs += 1
            p = Path(src)
            if not p.exists():
                missing[str(p).replace("\\", "/")].append(html.name)

print("total local image refs", all_refs)
print("missing unique", len(missing))

about_miss = []
for src, pages in sorted(missing.items()):
    if any("about" in p.lower() for p in pages) or src.startswith("images/about"):
        about_miss.append((src, pages))
print("about-related missing", len(about_miss))
for src, pages in about_miss:
    print(src, "<-", pages[:6])

Path("_missing_images.txt").write_text(
    "\n".join(f"{k}\t{','.join(sorted(set(v)))}" for k, v in sorted(missing.items())),
    encoding="utf-8",
)

# folder breakdown
by_folder = defaultdict(int)
for src in missing:
    parts = Path(src).parts
    folder = parts[1] if len(parts) > 1 and parts[0] == "images" else (parts[0] if parts else "?")
    by_folder[folder] += 1
print("--- missing by folder ---")
for k, v in sorted(by_folder.items(), key=lambda kv: -kv[1]):
    print(f"{k}: {v}")
