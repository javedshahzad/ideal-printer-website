#!/usr/bin/env python3
"""Apply unique photoreal variants from category masters onto product image folders."""

from __future__ import annotations

import hashlib
import re
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website"
    r"-Ideal-printers-updated-website-v2\assets"
)
MASTERS_DIR = ROOT / "_ai_masters"
SKIP_NAME_RE = re.compile(
    r"(ideal-printers-logo|logo-mark|favicon|apple-touch-icon|desktop\.ini)", re.I
)

# Ordered rules: first regex match wins. Values are preferred master basenames
# (without requiring exact extension — resolved against loaded masters).
RULES: list[tuple[str, str]] = [
    # USB / tech
    (r"crystal.?usb|3d.?usb|3d_flash|3d_engraving", "cat_master_usb"),
    (r"wooden.?usb|wood.?usb", "master_wooden_usb"),
    (r"metal.?usb|twister.?usb|rubber.?usb|card.?usb|usb|flash_drive|pendrive", "cat_master_usb"),
    (r"power.?bank|wireless.?charg|charging.?cable|bluetooth.?speaker", "master_corp_powerbanks"),
    # Drinkware
    (r"mug|cork.?mug|white.?mug", "cat_master_mugs"),
    (r"paper.?cup|papar.?cup", "master_paper_cups"),
    (r"bottle|tumbler|flask|aqua", "cat_master_bottles"),
    # Writing / notebooks
    (r"pen|stylus", "cat_master_pens"),
    (r"notebook|journal|diary|organizer|scribble", "cat_master_notebooks"),
    # Bags
    (r"jute", "master_jute_bag"),
    (r"kraft.?bag|paper.?bag|non.?woven|drawstring|tote|pouch|canvas.?pouch|string.?bag|bag", "cat_master_bags"),
    # Wearables
    (r"lanyard", "cat_master_lanyards"),
    (r"keychain|key_chain", "cat_master_keychains"),
    (r"cap|hat|beanie|trucker", "cat_master_caps"),
    (r"t.?shirt|polo|hoodie|jersey|corp.?apparel|basketball", "cat_master_tshirts"),
    (r"safety.?vest|vest", "master_corp_safety_vest"),
    (r"apron", "master_apron"),
    (r"umbrella", "cat_master_umbrella"),
    (r"tie\b|cufflink", "master_ties"),
    # Awards / ID
    (r"medal|trophy|plaque|coin|challenge|lapel.?pin|pin_dubai|badge", "cat_master_awards"),
    (r"id.?card|name.?badge|membership", "master_corp_id_cards"),
    # Table / misc gifts
    (r"coffee.?stancil|coffee.?stencil|stancil", "cat_master_coffee_stencil"),
    (r"coaster", "master_coasters"),
    (r"napkin", "master_napkins"),
    (r"mouse.?pad", "master_mousepads"),
    (r"bamboo|cork.?gift|gift.?set|corporate.?girf|girf|gift", "master_bamboo_gift"),
    # Fabric & fashion
    (r"arabic.?template|template_", "master_template_arabic"),
    (r"scarf|bandana|sarong|hijab|abaya|shawl|headscarf|fan.?scarf|hair.?scarf", "cat_master_scarves"),
    (r"beach.?short|shorts", "master_beach_shorts"),
    (r"beach.?chair", "master_beach_chair"),
    (r"towel|blanket", "cat_master_towels"),
    (r"curtain", "master_curtains"),
    (r"bean.?bag|cushion|pillow|bolster", "master_cushions"),
    (r"label|patch|embroidery|woven", "master_labels"),
    (r"mask|scrunchie|sash|handkerchief|armband|table.?linen|placemat", "master_fab_masks"),
    (r"fabric|textile|crepe|silk|cotton|velvet|linen|roll|cut.?piece|swatch", "cat_master_fabrics"),
    # Flags
    (r"blade.?flag|teardrop|feather.?flag|sail.?flag|telescopic|pole.?flag|advertising.?flag", "cat_master_blade_flags"),
    (r"hand.?flag|table.?flag|desk.?flag|toothpick|pennant|bunting|body.?flag|car.?flag|wall.?flag|festival|finish.?line|flag", "cat_master_hand_flags"),
    # Signages
    (r"neon", "cat_master_neon"),
    (r"lightbox|light.?box|backlit|backtlit", "master_lightbox"),
    (r"channel|3d.?letter|acrylic.?letter|ss.?|stainless|push.?through|frontlit|outlit", "cat_master_3d_signage"),
    (r"acp|aluminum|aluminium|powder.?coat|signboard|sign.?board|signage|wayfinding|name.?plate|metal.?plate|wooden.?sign", "master_acp"),
    (r"frosted|window.?film|vinyl.?sign|decal", "master_frosted_glass"),
    (r"vehicle|car.?brand|magnetic.?car", "master_vehicle_branding"),
    # Backdrops & exhibition
    (r"shell.?scheme|booth|exhibition", "cat_master_booth"),
    (r"rollup|roll.?up|retractable", "cat_master_rollup"),
    (r"standee|cutout|a.?board|spring.?a", "cat_master_standee"),
    (r"foam.?board|forex", "master_foam_board"),
    (r"tent|gazebo|parasol", "master_tent"),
    (r"promo.?table|promotion.?table|counter|podium", "master_promo_table"),
    (r"arch|balloon|party.?prop|face.?mask|photobooth|cheque", "master_arch_balloon"),
    (r"backdrop|pop.?up|popup|fabric.?wall|barricade|toblerone", "cat_master_backdrop"),
    # Office & store
    (r"wallpaper", "master_wallpaper"),
    (r"poster|canvas|gallery", "cat_master_canvas_posters"),
    (r"pos|shelf.?display|table.?pos|acrylic.?table", "cat_master_pos"),
    (r"partition|desk.?divider|acrylic.?frame|frame", "master_partition"),
    (r"sticker|cling|wall.?decal|window", "master_wall_decals"),
    (r"office|store.?brand|retail", "cat_master_office"),
    # Portfolio / gifts fallback
    (r"portfolio|project", "cat_master_corp_gifts"),
]

FOLDER_DEFAULTS = {
    "corporate_gift&bags": "cat_master_corp_gifts",
    "fabric&fashion": "cat_master_fabrics",
    "fashion&fabric": "cat_master_fabrics",
    "signages": "cat_master_3d_signage",
    "flags": "cat_master_blade_flags",
    "backdrops&exhibition": "cat_master_backdrop",
    "backdrop&exhibition": "cat_master_backdrop",
    "office&store_branding": "cat_master_office",
    "office&signages": "cat_master_3d_signage",
    "portfolio": "cat_master_corp_gifts",
    "print&marketing": "pm_master_bc_general",
}

NAVBAR_MAP = {
    "corporate_gift&bags": "corporate_gift&bags",
    "fabric&fashion": "fashion&fabric",
    "signages": "office&signages",
    "flags": "flags",
    "backdrops&exhibition": "backdrop&exhibition",
    "office&store_branding": "office&signages",
    "print&marketing": "print&marketing",
}


SEED_SALT = "fresh-v3-20260805"


def seed_of(path: str) -> int:
    return int(hashlib.md5((SEED_SALT + "|" + path).encode("utf-8")).hexdigest()[:8], 16)


def load_masters() -> dict[str, Path]:
    out: dict[str, Path] = {}
    for folder in (ASSETS, MASTERS_DIR):
        if not folder.exists():
            continue
        for p in folder.iterdir():
            if not p.is_file():
                continue
            if p.suffix.lower() not in {".webp", ".jpg", ".jpeg", ".png"}:
                continue
            stem = p.stem
            # prefer newer/cat_ masters; first write wins then overwrite with assets priority
            out[stem] = p
            # also index without common prefixes for fuzzy match
    if not out:
        raise SystemExit("No masters found")
    return out


def resolve_master(key: str, masters: dict[str, Path]) -> Path | None:
    if key in masters:
        return masters[key]
    # try alternate extensions via stem already keyed
    for stem, path in masters.items():
        if stem == key or stem.endswith(key) or key in stem:
            return path
    return None


def pick_master(name: str, folder_key: str, masters: dict[str, Path]) -> Path:
    s = name.lower()
    for pat, key in RULES:
        if re.search(pat, s, re.I):
            m = resolve_master(key, masters)
            if m:
                return m
    # folder default
    default = FOLDER_DEFAULTS.get(folder_key, "cat_master_corp_gifts")
    m = resolve_master(default, masters)
    if m:
        return m
    # rotate all cat_/master_ keys
    keys = sorted(k for k in masters if k.startswith(("cat_master_", "master_", "hero_")))
    if not keys:
        keys = sorted(masters.keys())
    return masters[keys[seed_of(name) % len(keys)]]


_MASTER_CACHE: dict[str, Image.Image] = {}


def get_master_image(master: Path) -> Image.Image:
    key = str(master)
    if key not in _MASTER_CACHE:
        im = Image.open(master).convert("RGB")
        # Downscale masters once for speed (variants still unique via crop/tone)
        max_side = 1800
        if max(im.size) > max_side:
            im.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        _MASTER_CACHE[key] = im
    return _MASTER_CACHE[key]


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

    # Only mirror (not flip) — flip often looks wrong for product photos
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

    max_side = 1600
    if max(img.size) > max_side:
        img.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)

    dest.parent.mkdir(parents=True, exist_ok=True)
    ext = dest.suffix.lower()
    if ext in {".jpg", ".jpeg"}:
        img.save(dest, "JPEG", quality=88, optimize=True)
    elif ext == ".png":
        img.save(dest, "PNG", optimize=True)
    else:
        img.save(dest, "WEBP", quality=86, method=4)


def apply_folder(folder: Path, folder_key: str, masters: dict[str, Path]) -> int:
    files = [
        p
        for p in folder.rglob("*")
        if p.is_file()
        and p.suffix.lower() in {".webp", ".jpg", ".jpeg", ".png"}
        and not SKIP_NAME_RE.search(p.name)
        and "companies-logos" not in str(p).replace("\\", "/")
    ]
    for i, p in enumerate(files, 1):
        rel = str(p.relative_to(ROOT)).replace("\\", "/")
        master = pick_master(p.name, folder_key, masters)
        unique_variant(master, p, seed_of(rel))
        if i % 75 == 0 or i == len(files):
            print(f"  ... {i}/{len(files)}", flush=True)
    return len(files)


def sync_navbar(src_folder: Path, folder_key: str) -> int:
    # Never sync when source is already a navbarImages path (avoids self-copy locks)
    src_norm = str(src_folder).replace("\\", "/").lower()
    if "navbarimages" in src_norm:
        return 0
    nav_key = NAVBAR_MAP.get(folder_key)
    if not nav_key:
        return 0
    nav_dir = ROOT / "images" / "navbarImages" / nav_key
    if not nav_dir.exists():
        return 0
    # Build lookup of regenerated source files by basename
    src_by_name: dict[str, Path] = {}
    for p in src_folder.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".webp", ".jpg", ".jpeg", ".png"}:
            src_by_name[p.name.lower()] = p

    synced = 0
    for dest in nav_dir.rglob("*"):
        if not dest.is_file():
            continue
        if dest.suffix.lower() not in {".webp", ".jpg", ".jpeg", ".png"}:
            continue
        if SKIP_NAME_RE.search(dest.name):
            continue
        if "companies-logos" in str(dest).replace("\\", "/"):
            continue
        src = src_by_name.get(dest.name.lower())
        if src and src.exists():
            shutil.copy2(src, dest)
            synced += 1
    return synced


def main() -> None:
    targets = sys.argv[1:] or [
        "images/corporate_gift&bags",
        "images/fabric&fashion",
        "images/signages",
        "images/flags",
        "images/backdrops&exhibition",
        "images/office&store_branding",
        "images/portfolio",
    ]
    masters = load_masters()
    print(f"Loaded {len(masters)} masters from assets/_ai_masters")
    totals: dict[str, int] = {}
    for t in targets:
        folder = ROOT / t
        if not folder.exists():
            print(f"SKIP missing {t}")
            continue
        folder_key = folder.name
        print(f"Applying -> {t}")
        done = apply_folder(folder, folder_key, masters)
        nav = sync_navbar(folder, folder_key)
        print(f"  wrote {done} variants; synced {nav} navbarImages")
        totals[t] = done
        totals[f"navbar:{folder_key}"] = nav
    print("TOTALS", totals)
    # write report
    report = ROOT / "_category_regen_report.txt"
    lines = [f"{k}\t{v}" for k, v in totals.items()]
    report.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {report}")


if __name__ == "__main__":
    main()
