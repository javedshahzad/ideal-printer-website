#!/usr/bin/env python3
"""Fill all missing HTML-referenced images using photoreal AI masters + unique variants."""

from __future__ import annotations

import hashlib
import re
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website-Ideal-printers-updated-website-v2\assets"
)
MISSING_FILE = ROOT / "_missing_images.txt"

# keyword -> master filename in assets (and fallbacks under images/)
MASTERS = {
    "bc_template": ["miss_bc_templates_grid.png", "p1_bc_templates.png", "p1_bc_foil.png"],
    "business_card": ["miss_bc_qrcode.png", "p1_bc_foil.png", "hero_velvet_cards.png"],
    "neon": ["miss_neon_banner.png", "hero_neon.png"],
    "faq": ["miss_faq_banner.png"],
    "blog_tips": ["miss_blog_tips.png"],
    "blog_why": ["miss_blog_why.png"],
    "fabric_popup": ["miss_fabric_popup.png", "hero_popup_banner.png", "hero_backdrop.png"],
    "party": ["miss_party_props.png"],
    "booth": ["miss_exhibition_booth.png", "hero_backdrop.png"],
    "skyline": ["miss_dubai_skyline.png"],
    "about": ["miss_about_mobile.png", "p1_about_us_branded.png"],
    "flag": ["hero_blade_flags.png", "hero_sail_flags.png", "hero_table_flags.png"],
    "bottle": ["hero_bottles.png"],
    "bag": ["hero_kraft_bags.png", "hero_drawstring.png"],
    "pen": ["hero_pens.png"],
    "usb": ["hero_metal_usb.png", "hero_wooden_usb.png"],
    "mug": ["hero_mugs.png"],
    "sticker": ["hero_stickers_diecut.png", "hero_stickers_clear.png"],
    "hang_tag": ["hero_hangtags_kraft.png"],
    "banner": ["hero_rollup.png", "hero_popup_banner.png"],
    "standee": ["hero_lama_standee.png", "hero_photobooth.png"],
    "tent": ["hero_outdoor_tent.png"],
    "sign": ["hero_metal_letters.png", "hero_hanging_sign.png"],
    "frame": ["hero_acrylic_frames.png", "hero_wood_frames.png"],
    "canvas": ["hero_canvas.png"],
    "window": ["hero_frosted.png", "hero_repositionable_cling.png"],
    "vehicle": ["hero_magnetic_car.png"],
    "table": ["hero_promo_table.png"],
    "default": [
        "miss_fabric_popup.png",
        "hero_backdrop.png",
        "p1_ss08.png",
        "hero_mugs.png",
        "hero_pens.png",
    ],
}


def load_master(names: list[str]) -> Image.Image | None:
    for name in names:
        for base in (ASSETS, ROOT / "assets", ROOT):
            p = base / name if base != ROOT else ROOT / "images" / name
            # try assets path first
            cand = ASSETS / name
            if cand.exists():
                return Image.open(cand).convert("RGB")
            cand2 = ROOT / "assets" / name
            if cand2.exists():
                return Image.open(cand2).convert("RGB")
    # fallback any existing photographic webp
    for folder in ("corporate_gift&bags", "print&marketing", "backdrops&exhibition"):
        d = ROOT / "images" / folder
        if d.exists():
            for p in d.glob("*.webp"):
                try:
                    im = Image.open(p).convert("RGB")
                    if len(set(im.resize((32, 32)).getdata())) > 200:
                        return im
                except Exception:
                    continue
    return None


_master_cache: dict[str, Image.Image] = {}


def get_master(key: str) -> Image.Image:
    if key not in _master_cache:
        im = load_master(MASTERS.get(key, MASTERS["default"]))
        if im is None:
            im = load_master(MASTERS["default"])
        if im is None:
            im = Image.new("RGB", (1000, 1000), (240, 240, 240))
        _master_cache[key] = im
    return _master_cache[key]


def pick_key(path: str) -> str:
    n = path.lower().replace("\\", "/")
    name = Path(n).name
    if "templates/" in n or re.search(r"\bbc_\d+", name):
        return "bc_template"
    if "business_card" in n or "qrcode" in name:
        return "business_card"
    if "neon" in n:
        return "neon"
    if "faq" in n:
        return "faq"
    if "essential_printing" in n or "printing_tips" in n:
        return "blog_tips"
    if "why_choose" in n:
        return "blog_why"
    if "party" in n or "balloon" in n or "napkin" in n:
        return "party"
    if "popup" in n or "pop_up" in n or "fabric_popup" in n or "fabric-popup" in n:
        return "fabric_popup"
    if "booth" in n or "shell_scheme" in n or "exhibition" in n:
        return "booth"
    if "skyline" in n:
        return "skyline"
    if "about_us" in n:
        return "about"
    if "flag" in n or "bunting" in n or "teardrop" in n or "sail" in n or "blade" in n:
        return "flag"
    if "bottle" in n or "tumbler" in n:
        return "bottle"
    if "bag" in n or "tote" in n or "jute" in n or "kraft_bag" in n:
        return "bag"
    if "pen" in n:
        return "pen"
    if "usb" in n or "flash" in n:
        return "usb"
    if "mug" in n or "cup" in n:
        return "mug"
    if "hang_tag" in n or "hangtag" in n:
        return "hang_tag"
    if "sticker" in n or "decal" in n or "cling" in n:
        return "sticker"
    if "standee" in n or "cutout" in n or "totem" in n or "lama" in n:
        return "standee"
    if "banner" in n or "rollup" in n or "roll_up" in n:
        return "banner"
    if "tent" in n:
        return "tent"
    if "sign" in n or "letter" in n or "lightbox" in n or "label" in n and "signage" in n:
        return "sign"
    if "frame" in n:
        return "frame"
    if "canvas" in n:
        return "canvas"
    if "window" in n or "frosted" in n or "film" in n:
        return "window"
    if "vehicle" in n or "car_" in n or "van" in n or "wrap" in n:
        return "vehicle"
    if "table" in n or "cloth" in n or "counter" in n:
        return "table"
    if "backdrop" in n:
        return "fabric_popup"
    return "default"


def unique_variant(master: Image.Image, dest: Path) -> Image.Image:
    seed = int(hashlib.md5(str(dest.as_posix()).encode()).hexdigest()[:10], 16)
    im = master.copy()
    w, h = im.size
    m = 0.05 + (seed % 12) / 200
    l = int((seed % 40) / 40 * w * m)
    t = int(((seed >> 3) % 40) / 40 * h * m)
    r = w - int(((seed >> 6) % 40) / 40 * w * m)
    b = h - int(((seed >> 9) % 40) / 40 * h * m)
    im = im.crop((l, t, max(l + 40, r), max(t + 40, b)))
    # target size heuristics
    name = dest.name.lower()
    if "mobile" in name or "banner" in name and "neon" in name:
        tw, th = 1200, 600
    elif "templates/" in str(dest).replace("\\", "/") or re.search(r"bc_\d+", name):
        tw, th = 800, 500
    elif dest.suffix.lower() in {".jpg", ".jpeg"}:
        tw, th = 1600, 900
    else:
        tw, th = 1000, 1000
    if "banner" in name or "skyline" in name or "booth" in name:
        tw, th = 1600, 900
    if "mobile" in name and "about" in str(dest):
        tw, th = 900, 1200
    im = im.resize((tw, th), Image.Resampling.LANCZOS)
    if seed % 2:
        im = ImageOps.mirror(im)
    im = ImageEnhance.Color(im).enhance(0.88 + (seed % 28) / 100)
    im = ImageEnhance.Contrast(im).enhance(0.94 + (seed % 20) / 100)
    im = ImageEnhance.Brightness(im).enhance(0.92 + (seed % 18) / 100)
    # tiny uniqueness pixels
    px = im.load()
    for i in range(16):
        x = (seed * 17 + i * 41) % tw
        y = (seed * 13 + i * 37) % th
        r0, g0, b0 = px[x, y]
        px[x, y] = (min(255, r0 + 1 + i % 3), g0, b0)
    return im


def save_image(im: Image.Image, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix.lower() in {".jpg", ".jpeg"}:
        im.save(dest, "JPEG", quality=88, optimize=True)
    elif dest.suffix.lower() == ".png":
        im.save(dest, "PNG")
    else:
        # webp default; svg skipped
        if dest.suffix.lower() == ".svg":
            return False
        im.save(dest, "WEBP", quality=85, method=4)
    return True


def main():
    if not MISSING_FILE.exists():
        raise SystemExit("missing list not found; run find_missing_images.py first")
    paths = []
    for line in MISSING_FILE.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        src = line.split("\t")[0].strip().lstrip("/")
        paths.append(Path(src))
    print(f"to_fill={len(paths)}", flush=True)
    ok = skip = err = 0
    for i, dest in enumerate(paths, 1):
        if dest.exists():
            skip += 1
            continue
        if dest.suffix.lower() == ".svg":
            skip += 1
            continue
        try:
            key = pick_key(str(dest))
            # fix buggy "if popup or" - pick_key already handles
            im = unique_variant(get_master(key), dest)
            if save_image(im, dest):
                ok += 1
            else:
                skip += 1
        except Exception as e:
            err += 1
            print(f"ERR {dest}: {e}", flush=True)
        if i % 100 == 0 or i == len(paths):
            print(f"progress {i}/{len(paths)} ok={ok} skip={skip} err={err}", flush=True)
    print(f"DONE ok={ok} skip={skip} err={err}", flush=True)


if __name__ == "__main__":
    main()
