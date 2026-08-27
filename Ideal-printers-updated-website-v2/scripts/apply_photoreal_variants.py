#!/usr/bin/env python3
"""Apply unique photoreal variants from category masters onto target image folders."""

from __future__ import annotations

import hashlib
import re
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / "_ai_masters"
SKIP_NAME_RE = re.compile(
    r"(ideal-printers-logo|logo-mark|favicon|apple-touch-icon)", re.I
)


SEED_SALT = "fresh-v3-20260805"


def seed_of(path: str) -> int:
    return int(hashlib.md5((SEED_SALT + "|" + path).encode("utf-8")).hexdigest()[:8], 16)


def pick_master(name: str, masters: dict[str, Path]) -> Path:
    s = name.lower()
    rules = [
        (r"foil|gold_foil|3d_foil|3d_gold", "foil_bc"),
        (r"spot_uv|raised", "spot_uv"),
        (r"translucent", "translucent"),
        (r"boat|yacht|yatch|marine", "boat"),
        (r"sticker|decal|label|vinyl|helmet|windshield|stencil", "stickers"),
        (r"stamp|self_ink", "stamps"),
        (r"notebook|journal|scribble|diary|diaries|notepad|glue_binding", "notebooks"),
        (r"brochure|flyer|catalogue|catalog|booklet", "brochure"),
        (r"hang_tag", "hangtag"),
        (r"wax", "wax"),
        (r"envelope", "envelope"),
        (r"calendar", "calendar"),
        (r"tent|name_tent|table_top|table-mat|table_mat|cat_mat|wooden_cube|acrylic_table", "tabletop"),
        (r"scratch|coupon", "scratch"),
        (r"thank_you", "thankyou"),
        (r"certificate", "certificate"),
        (r"binding|comb_|saddle|wire_|sewing", "binding"),
        (r"craft|kraft|bristol|pearl|velvet|royal|pvc|laminated|pantone|colored_edge|ice_gold|recycled|white_craft|classic|standard.*business|business_card|compliment", "bc_general"),
        (r"banner|Craft-Business|Bristol-Pack", "bc_general"),
    ]
    for pat, key in rules:
        if re.search(pat, s, re.I):
            if key in masters:
                return masters[key]
    # fallback rotation across available masters
    keys = sorted(masters.keys())
    return masters[keys[seed_of(name) % len(keys)]]


def load_masters() -> dict[str, Path]:
    mapping = {
        "foil_bc": "pm_master_foil_bc.webp",
        "spot_uv": "pm_master_spot_uv.webp",
        "translucent": "pm_master_translucent.webp",
        "boat": "pm_master_boat.webp",
        "stickers": "pm_master_stickers.webp",
        "stamps": "pm_master_stamps.webp",
        "notebooks": "pm_master_notebooks.webp",
        "brochure": "pm_master_brochure.webp",
        "hangtag": "pm_master_hangtag.webp",
        "wax": "pm_master_wax.webp",
        "envelope": "pm_master_envelope.webp",
        "calendar": "pm_master_calendar.webp",
        "tabletop": "pm_master_tabletop.webp",
        "scratch": "pm_master_scratch.webp",
        "thankyou": "pm_master_thankyou.webp",
        "certificate": "pm_master_certificate.webp",
        "binding": "pm_master_binding.webp",
        "bc_general": "pm_master_bc_general.webp",
    }
    # also absorb leftover bc masters as extras for uniqueness
    extras = {
        "bc_min": "bc_master_01_minimal.webp",
        "bc_foil": "bc_master_02_foil.webp",
        "bc_color": "bc_master_03_color.webp",
        "bc_navy": "bc_master_04_navy.webp",
        "bc_bg": "bc_master_05_blackgold.webp",
        "bc_kraft": "bc_master_06_kraft.webp",
        "bc_geo": "bc_master_07_geo.webp",
        "bc_pastel": "bc_master_08_pastel.webp",
    }
    out: dict[str, Path] = {}
    for k, fn in {**mapping, **extras}.items():
        p = MASTERS / fn
        if p.exists():
            out[k] = p
    if not out:
        raise SystemExit(f"No masters found in {MASTERS}")
    return out


def unique_variant(master: Path, dest: Path, seed: int) -> None:
    img = Image.open(master).convert("RGB")
    w, h = img.size

    # deterministic crop (5–18%)
    crop_frac = 0.05 + (seed % 14) / 100.0
    left = int(w * ((seed >> 3) % 20) / 100.0 * crop_frac)
    top = int(h * ((seed >> 7) % 20) / 100.0 * crop_frac)
    right = w - int(w * ((seed >> 11) % 20) / 100.0 * crop_frac)
    bottom = h - int(h * ((seed >> 15) % 20) / 100.0 * crop_frac)
    if right - left > 40 and bottom - top > 40:
        img = img.crop((left, top, right, bottom))

    if seed & 1:
        img = ImageOps.mirror(img)
    if (seed >> 1) & 1:
        img = ImageOps.flip(img)

    # color / tone
    hue_shift = ((seed >> 2) % 21) - 10  # -10..10
    if hue_shift:
        # approximate via RGB channel bias
        r, g, b = img.split()
        if hue_shift > 0:
            r = r.point(lambda x: min(255, x + hue_shift))
            b = b.point(lambda x: max(0, x - hue_shift // 2))
        else:
            b = b.point(lambda x: min(255, x - hue_shift))
            r = r.point(lambda x: max(0, x + hue_shift // 2))
        img = Image.merge("RGB", (r, g, b))

    bright = 0.85 + ((seed >> 5) % 30) / 100.0  # 0.85–1.14
    contrast = 0.90 + ((seed >> 8) % 25) / 100.0
    color = 0.85 + ((seed >> 12) % 35) / 100.0
    sharp = 0.90 + ((seed >> 16) % 40) / 100.0
    img = ImageEnhance.Brightness(img).enhance(bright)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(color)
    img = ImageEnhance.Sharpness(img).enhance(sharp)

    # slight rotate ±3 deg then recrop center
    angle = ((seed >> 18) % 7) - 3
    if angle:
        img = img.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
        # trim expand borders by taking center
        cw, ch = img.size
        tw, th = int(cw * 0.92), int(ch * 0.92)
        x0 = (cw - tw) // 2
        y0 = (ch - th) // 2
        img = img.crop((x0, y0, x0 + tw, y0 + th))

    # normalize output size for web (max 1600)
    max_side = 1600
    if max(img.size) > max_side:
        img.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)

    dest.parent.mkdir(parents=True, exist_ok=True)
    ext = dest.suffix.lower()
    if ext in {".jpg", ".jpeg"}:
        img.save(dest, "JPEG", quality=88, optimize=True)
    else:
        # default webp (also for .png targets we overwrite as webp-compatible content;
        # keep extension but encode appropriately)
        if ext == ".png":
            img.save(dest, "PNG", optimize=True)
        else:
            img.save(dest, "WEBP", quality=86, method=4)


def apply_folder(folder: Path, masters: dict[str, Path]) -> tuple[int, int]:
    done = skipped = 0
    files = [
        p
        for p in folder.rglob("*")
        if p.is_file()
        and p.suffix.lower() in {".webp", ".jpg", ".jpeg", ".png"}
        and not SKIP_NAME_RE.search(p.name)
        and "companies-logos" not in str(p).replace("\\", "/")
    ]
    for p in files:
        rel = str(p.relative_to(ROOT)).replace("\\", "/")
        master = pick_master(p.name, masters)
        # for business-card named files prefer rotating bc extras when available
        if re.search(r"business_card|bristol|craft|pearl|velvet|royal|pvc|pantone|classic|standard", p.name, re.I):
            bc_keys = [k for k in masters if k.startswith("bc_") or k in {"foil_bc", "spot_uv", "translucent", "bc_general"}]
            if bc_keys:
                master = masters[bc_keys[seed_of(rel) % len(bc_keys)]]
        unique_variant(master, p, seed_of(rel))
        done += 1
        if done % 50 == 0:
            print(f"  ... {done}/{len(files)}", flush=True)
    return done, skipped


def main() -> None:
    targets = sys.argv[1:] or ["images/print&marketing"]
    masters = load_masters()
    print(f"Loaded {len(masters)} masters")
    total = 0
    for t in targets:
        folder = ROOT / t
        if not folder.exists():
            print(f"SKIP missing {t}")
            continue
        print(f"Applying -> {t}")
        done, _ = apply_folder(folder, masters)
        print(f"  wrote {done} unique variants")
        total += done
    print(f"TOTAL {total}")


if __name__ == "__main__":
    main()
