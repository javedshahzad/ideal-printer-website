#!/usr/bin/env python3
"""Regenerate remaining flat images from photoreal masters (unique variants)."""

from __future__ import annotations

import hashlib
import re
import shutil
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website"
    r"-Ideal-printers-updated-website-v2\assets"
)
MASTERS_DIR = ROOT / "_ai_masters"
FLAT_LIST = ROOT / "_flat_audit_remaining.txt"

SKIP_SUBSTRINGS = (
    "/icons/",
    "secure-payment",
    "delivery_icon",
    "google_icon",
    "production-icon",
    "bg_footer-map",
    "founder",
    "wallpaper_brading_instruction",
    "pos_size_chart",
    "carousel-images",
    "companies-logos",
    "ideal-printers-logo",
    "logo-mark",
    "favicon",
)

RULES: list[tuple[str, str]] = [
    (r"letterhead|compliment|envelope|stationery|delivery_orders|orders_books", "master_letterhead_stationery"),
    (r"chrome_base", "master_chrome_flag_base"),
    (r"feature_0[1-6]|feature_print", "master_feature_print_shop"),
    (r"picture_frame|floating_dubai|single_mount", "master_picture_frames"),
    (r"partition|floor_standing|pos_display|promotion_table", "master_floor_pos_partition"),
    (r"bc_\d+_big|velvet_business|digital-business|business_card", "bc_master_01_minimal"),
    (r"metal_sticker|paper_sticker|white_ink|frosted_sticker|sticker", "master_stickers"),
    (r"metal_name|metal art|metal_art|Wooden|acrylic_name|acrylic_label|name_plate", "cat_master_3d_signage"),
    (r"half_wrap|vehicle", "master_vehicle_branding"),
    (r"notebook|PU_Notebook", "cat_master_notebooks"),
    (r"paper_bag", "cat_master_bags"),
    (r"napkin", "master_napkins"),
    (r"lanyard", "cat_master_lanyards"),
    (r"caps?\b", "cat_master_caps"),
    (r"bottle_wrap|Bottle|bottle", "cat_master_bottles"),
    (r"blade_flag|tear_drop|telescopic|sail_flag|l_shape|L Shape", "cat_master_blade_flags"),
    (r"table_flag|conference_flag|wall_mounted|bunting|hand.?flag|chrome", "cat_master_hand_flags"),
    (r"Tent|parasol|umbrella", "master_tent"),
    (r"x_banner|rollup|roll.?up", "cat_master_rollup"),
    (r"standee|cutout|totem|snapfold|backlit_standee", "cat_master_standee"),
    (r"backdrop|booth", "cat_master_backdrop"),
    (r"flag", "cat_master_blade_flags"),
]


def seed_of(path: str) -> int:
    return int(hashlib.md5(path.encode("utf-8")).hexdigest()[:8], 16)


def load_masters() -> dict[str, Path]:
    out: dict[str, Path] = {}
    for folder in (ASSETS, MASTERS_DIR):
        if not folder.exists():
            continue
        for p in folder.iterdir():
            if p.is_file() and p.suffix.lower() in {".webp", ".jpg", ".jpeg", ".png"}:
                out[p.stem] = p
    if not out:
        raise SystemExit("No masters found")
    return out


def resolve_master(key: str, masters: dict[str, Path]) -> Path | None:
    if key in masters:
        return masters[key]
    for stem, path in masters.items():
        if stem == key or stem.endswith(key) or key in stem:
            return path
    return None


def pick_master(rel: str, masters: dict[str, Path]) -> Path:
    name = Path(rel).name
    s = f"{rel} {name}".lower()
    for pat, key in RULES:
        if re.search(pat, s, re.I):
            m = resolve_master(key, masters)
            if m:
                # rotate bc masters for templates
                if "bc_" in name.lower() and "_big" in name.lower():
                    bc_keys = sorted(k for k in masters if k.startswith("bc_master_") or k.startswith("regen_dbc_"))
                    if bc_keys:
                        return masters[bc_keys[seed_of(rel) % len(bc_keys)]]
                return m
    keys = sorted(k for k in masters if k.startswith(("cat_master_", "master_", "bc_master_", "pm_master_")))
    return masters[keys[seed_of(rel) % len(keys)]]


_CACHE: dict[str, Image.Image] = {}


def get_master_image(master: Path) -> Image.Image:
    key = str(master)
    if key not in _CACHE:
        im = Image.open(master).convert("RGB")
        if max(im.size) > 1800:
            im.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        _CACHE[key] = im
    return _CACHE[key]


def unique_variant(master: Path, dest: Path, seed: int) -> None:
    img = get_master_image(master).copy()
    w, h = img.size

    crop_frac = 0.05 + (seed % 14) / 100.0
    left = int(w * ((seed >> 3) % 20) / 100.0 * crop_frac)
    top = int(h * ((seed >> 7) % 20) / 100.0 * crop_frac)
    right = w - int(w * ((seed >> 11) % 20) / 100.0 * crop_frac)
    bottom = h - int(h * ((seed >> 15) % 20) / 100.0 * crop_frac)
    if right - left > 40 and bottom - top > 40:
        img = img.crop((left, top, right, bottom))

    if seed & 1:
        img = ImageOps.mirror(img)

    hue_shift = ((seed >> 2) % 21) - 10
    if hue_shift:
        r, g, b = img.split()
        if hue_shift > 0:
            r = r.point(lambda x, hs=hue_shift: min(255, x + hs))
            b = b.point(lambda x, hs=hue_shift: max(0, x - hs // 2))
        else:
            b = b.point(lambda x, hs=hue_shift: min(255, x - hs))
            r = r.point(lambda x, hs=hue_shift: max(0, x + hs // 2))
        img = Image.merge("RGB", (r, g, b))

    bright = 0.88 + ((seed >> 5) % 24) / 100.0
    contrast = 0.92 + ((seed >> 8) % 20) / 100.0
    color = 0.88 + ((seed >> 12) % 28) / 100.0
    sharp = 0.95 + ((seed >> 16) % 30) / 100.0
    img = ImageEnhance.Brightness(img).enhance(bright)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(color)
    img = ImageEnhance.Sharpness(img).enhance(sharp)

    angle = ((seed >> 18) % 5) - 2
    if angle:
        img = img.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
        cw, ch = img.size
        tw, th = int(cw * 0.93), int(ch * 0.93)
        x0 = (cw - tw) // 2
        y0 = (ch - th) // 2
        img = img.crop((x0, y0, x0 + tw, y0 + th))

    if max(img.size) > 1600:
        img.thumbnail((1600, 1600), Image.Resampling.LANCZOS)

    dest.parent.mkdir(parents=True, exist_ok=True)
    ext = dest.suffix.lower()
    if ext in {".jpg", ".jpeg"}:
        img.save(dest, "JPEG", quality=88, optimize=True)
    elif ext == ".png":
        img.save(dest, "PNG", optimize=True)
    else:
        img.save(dest, "WEBP", quality=86, method=4)


def should_skip(rel: str) -> bool:
    low = rel.replace("\\", "/").lower()
    return any(s.lower() in low for s in SKIP_SUBSTRINGS)


def main() -> None:
    masters = load_masters()
    print(f"Loaded {len(masters)} masters")
    rows = FLAT_LIST.read_text(encoding="utf-8").strip().splitlines()
    targets: list[str] = []
    skipped: list[str] = []
    for line in rows:
        parts = line.split("\t")
        if len(parts) < 3:
            continue
        rel = parts[2].replace("\\", "/")
        if should_skip(rel):
            skipped.append(rel)
            continue
        targets.append(rel)

    done = []
    for i, rel in enumerate(targets, 1):
        dest = ROOT / rel
        if not dest.exists():
            print(f"MISSING target {rel}")
            continue
        master = pick_master(rel, masters)
        unique_variant(master, dest, seed_of(rel + "|v2"))
        done.append((rel, master.stem))
        if i % 10 == 0 or i == len(targets):
            print(f"  ... {i}/{len(targets)}", flush=True)

    report = ROOT / "_remaining_flats_regen_report.txt"
    report.write_text(
        "\n".join(f"{rel}\t{m}" for rel, m in done) + "\n",
        encoding="utf-8",
    )
    print(f"Regenerated {len(done)}; skipped {len(skipped)}")
    print(f"Wrote {report}")
    for s in skipped:
        print(f"SKIP {s}")


if __name__ == "__main__":
    main()
