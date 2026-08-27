#!/usr/bin/env python3
"""Apply clean master images onto May-dated watermarked product files."""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

from PIL import Image

ROOT = Path(r"D:\Workplace\Angular-apps\ideal-printers-website\Ideal-printers-updated-website-v2")
MASTERS = Path(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website-Ideal-printers-updated-website-v2\assets"
)
CORP = ROOT / "images" / "corporate_gift&bags"
FAB = ROOT / "images" / "fabric&fashion"
NAV_CORP = ROOT / "images" / "navbarImages" / "corporate_gift&bags"
NAV_FAB = ROOT / "images" / "navbarImages" / "fashion&fabric"
EXTS = {".webp", ".jpg", ".jpeg", ".png"}

# Ordered rules: first match wins. Only May-dated files are processed.
CORP_RULES: list[tuple[str, list[str]]] = [
    ("master_pens_bamboo.png", [r"bamboo_pens"]),
    ("master_pens_crystal.png", [r"crystal_pens"]),
    ("master_cork_stationery.png", [r"cork_pens"]),
    ("master_pens_metal.png", [r"(?<![a-z])pens?(?![a-z])", r"_pen", r"pen_", r"pen-", r"-pen"]),
    ("master_coins_lifestyle.png", [r"acrylic-coins", r"challenge.coin", r"challenge_coin"]),
    ("master_coins.png", [r"coin"]),
    ("master_bluetooth_speaker2.png", [r"speaker_dubai_0[6-9]", r"speaker_dubai_1[0-2]", r"speaker_dubai_main"]),
    ("master_bluetooth_speaker.png", [r"speaker", r"bluetooth"]),
    ("master_bamboo_gift2.png", [r"bamboo_corporate_girf_dubai_(1[5-9]|2[0-9])", r"bamboo_girf_dubai_main"]),
    ("master_bamboo_gift.png", [r"bamboo_corporate", r"bamboo_girf", r"bamboo_keychain"]),
    ("master_cork_stationery.png", [r"cork_notebook", r"cork_foldable_mouse"]),
    ("master_cork_gift.png", [r"cork_corporate", r"cork_girf", r"cork_mug", r"cork_tumbler", r"cork_"]),
    ("master_napkins.png", [r"napkin"]),
    ("master_wireless_charger.png", [r"wireless"]),
    ("master_keychains.png", [r"keychain"]),
    ("master_notebooks.png", [r"notebook", r"pu_notebook"]),
    ("master_organizer.png", [r"organizer"]),
    ("master_mousepads.png", [r"mouse"]),
    ("master_cufflinks.png", [r"cufflink"]),
    ("master_medals.png", [r"medal"]),
    ("master_ties.png", [r"tie[-_]", r"^tie", r"Tie_"]),
    ("master_tumblers.png", [r"tumbler"]),
    ("master_jerseys.png", [r"jersey"]),
    ("master_coasters.png", [r"coaster"]),
    ("master_coffee_stencils.png", [r"stancil", r"stencil", r"coffee_stan"]),
    ("master_badges_pins.png", [r"badge", r"lapel", r"colar_lapel", r"lapel_pin", r"_pin_", r"-pin-", r"pins_"]),
    ("master_tumblers.png", [r"(?<![a-z])mugs?(?![a-z])", r"_mug", r"mug_"]),
]

FAB_RULES: list[tuple[str, list[str]]] = [
    ("master_apron.png", [r"apron"]),
    ("master_umbrella.png", [r"umbrella"]),
    ("master_beach_towel.png", [r"beach_towel", r"beach-towel"]),
    ("master_towels.png", [r"towel"]),
    ("master_cushion_bolster.png", [r"bolster"]),
    ("master_cushions.png", [r"cushion", r"pillow", r"Decorative"]),
    ("master_beach_chair.png", [r"beach-chair", r"beach_chair", r"chair"]),
    ("master_beach_shorts.png", [r"beach-short", r"beach_short", r"shorts"]),
    ("master_curtains.png", [r"curtain"]),
    ("master_blanket.png", [r"blanket"]),
    ("master_beanbags.png", [r"bean.bag", r"bean_bag", r"bean-bag"]),
    ("master_template_arabic.png", [r"arabic_template"]),
    ("master_template_floral.png", [r"template_[0-4]"]),
    ("master_template_geo.png", [r"template"]),
]


def is_may(path: Path) -> bool:
    ts = datetime.fromtimestamp(path.stat().st_mtime)
    return ts.year == 2026 and ts.month == 5


def match_master(name: str, rules: list[tuple[str, list[str]]]) -> str | None:
    for master, patterns in rules:
        for pat in patterns:
            if re.search(pat, name, re.IGNORECASE):
                return master
    return None


def save_like(src_master: Image.Image, dest: Path, size: tuple[int, int]) -> None:
    img = src_master.convert("RGB").resize(size, Image.Resampling.LANCZOS)
    suffix = dest.suffix.lower()
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    if suffix == ".webp":
        img.save(tmp, format="WEBP", quality=85, method=4)
    elif suffix in {".jpg", ".jpeg"}:
        img.save(tmp, format="JPEG", quality=88, optimize=True)
    else:
        img.save(tmp, format="PNG", optimize=True)
    tmp.replace(dest)


def process_folder(
    folder: Path,
    rules: list[tuple[str, list[str]]],
    nav: Path | None,
    cache: dict[str, Image.Image],
) -> tuple[int, Counter, list[str]]:
    replaced = 0
    by_family: Counter = Counter()
    unmatched: list[str] = []
    files = [p for p in folder.iterdir() if p.suffix.lower() in EXTS and p.name != "desktop.ini"]
    for path in files:
        if not is_may(path):
            continue
        master_name = match_master(path.name, rules)
        if not master_name:
            unmatched.append(path.name)
            continue
        master_path = MASTERS / master_name
        if not master_path.exists():
            unmatched.append(f"MISSING_MASTER:{master_name}:{path.name}")
            continue
        if master_name not in cache:
            cache[master_name] = Image.open(master_path)
        with Image.open(path) as existing:
            size = existing.size
        save_like(cache[master_name], path, size)
        # navbar sync by exact filename
        if nav and nav.exists():
            nav_dest = nav / path.name
            if nav_dest.exists():
                save_like(cache[master_name], nav_dest, size)
        family = master_name.replace("master_", "").replace(".png", "")
        by_family[family] += 1
        replaced += 1
    return replaced, by_family, unmatched


def main() -> None:
    cache: dict[str, Image.Image] = {}
    corp_n, corp_fam, corp_un = process_folder(CORP, CORP_RULES, NAV_CORP, cache)
    fab_n, fab_fam, fab_un = process_folder(FAB, FAB_RULES, NAV_FAB, cache)

    # Also sync navbar files that match masters even if name differs slightly for fashion
    # Count navbar May-dated overwritten via exact names already handled.

    report = {
        "corporate_replaced": corp_n,
        "corporate_by_family": dict(corp_fam),
        "corporate_unmatched_may_sample": corp_un[:40],
        "corporate_unmatched_may_count": len(corp_un),
        "fabric_replaced": fab_n,
        "fabric_by_family": dict(fab_fam),
        "fabric_unmatched_may_sample": fab_un[:40],
        "fabric_unmatched_may_count": len(fab_un),
        "total_replaced": corp_n + fab_n,
    }
    out = ROOT / "_preview" / "batch_replace_report.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
