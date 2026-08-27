#!/usr/bin/env python3
"""Apply clean masters to May-dated print&marketing + leftover corp/fabric files."""
from __future__ import annotations

import json
import re
from collections import Counter
from datetime import datetime
from pathlib import Path

from PIL import Image

ROOT = Path(r"D:\Workplace\Angular-apps\ideal-printers-website\Ideal-printers-updated-website-v2")
MASTERS = Path(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website-Ideal-printers-updated-website-v2\assets"
)
EXTS = {".webp", ".jpg", ".jpeg", ".png"}
SKIP_RE = re.compile(
    r"apple-touch|favicon|(?<![a-z])logo(?![a-z])|ideal[-_]?logo|client[-_]?logo|"
    r"size[-_]?guide|sizing[-_]?guide|size[-_]?chart|size_measurement",
    re.I,
)

PM = ROOT / "images" / "print&marketing"
CORP = ROOT / "images" / "corporate_gift&bags"
FAB = ROOT / "images" / "fabric&fashion"
NAV_PM = ROOT / "images" / "navbarImages" / "print&marketing"
NAV_CORP = ROOT / "images" / "navbarImages" / "corporate_gift&bags"
NAV_FAB = ROOT / "images" / "navbarImages" / "fashion&fabric"

# First match wins
PM_RULES: list[tuple[str, list[str]]] = [
    ("master_pm_stickers_epoxy.png", [r"epoxy", r"3d_spot_uv_sticker", r"domed"]),
    ("master_pm_stickers_metal.png", [r"metal.?sticker", r"chrome.?sticker", r"brushed.?metal"]),
    ("master_pm_stickers_kraft.png", [r"kraft.?paper.?sticker", r"kraft.?sticker", r"brown.?kraft"]),
    ("master_pm_stickers_pvc.png", [r"pvc.?sticker", r"pvc.?lable", r"pvc.?label", r"vinyl.?sticker", r"waterproof.?sticker"]),
    ("master_pm_helmet_stickers.png", [r"helmet"]),
    ("master_pm_stencil_stickers.png", [r"stencil.?sticker", r"stencil.?vinyl", r"cut.?vinyl", r"print_cut_sticker", r"window.?lettering"]),
    ("master_pm_stickers.png", [r"sticker", r"decal(?!.*boat)", r"hologram", r"foil.?sticker", r"die.?cut.?sticker"]),
    ("master_pm_boat_decals.png", [r"boat.?decal", r"boat.?letter", r"boat_"]),
    ("master_pm_stamps_selfink.png", [r"self.?ink", r"selfink", r"flash.?stamp", r"pre.?ink"]),
    ("master_pm_stamps_acrylic.png", [r"stamp", r"numbering"]),
    ("master_pm_business_cards.png", [r"business.?card", r"bristol.?pack", r"pearl.?white.?business", r"executive.?business"]),
    ("master_pm_hang_tags.png", [r"hang.?tag", r"swing.?tag", r"garment.?tag"]),
    ("master_pm_vouchers.png", [r"voucher", r"coupon", r"payment.?voucher", r"petty.?cash", r"receipt.?voucher"]),
    ("master_pm_scratch_cards.png", [r"scratch"]),
    ("master_pm_envelopes.png", [r"envelope"]),
    ("master_pm_calendars.png", [r"calendar"]),
    ("master_pm_brochures.png", [r"brochure"]),
    ("master_pm_flyers.png", [r"flyer", r"leaflet"]),
    ("master_pm_booklets.png", [r"booklet", r"saddle", r"available_sizes_book"]),
    ("master_pm_binding.png", [r"comb.?binding", r"perfect.?binding", r"spiral.?binding", r"binding_"]),
    ("master_pm_folders.png", [r"folder"]),
    ("master_pm_notepads.png", [r"notepad", r"note.?pad", r"note.?cube", r"sticky.?note"]),
    ("master_pm_invoice_books.png", [r"invoice", r"receipt.?book", r"ncr"]),
    ("master_pm_order_books.png", [r"delivery.?order", r"lpo.?book", r"purchase.?order", r"lpo_"]),
    ("master_pm_tent_cards.png", [r"tent.?card", r"name.?tent"]),
    ("master_pm_table_talkers.png", [r"table.?talker", r"table.?tent"]),
    ("master_pm_compliment_slips.png", [r"compliment"]),
    ("master_pm_notebooks.png", [r"notebook", r"scribble.?book", r"hand.?made.?book", r"kraft.?scribble"]),
    ("master_pm_catalogues.png", [r"catalog"]),
    ("master_pm_letterheads.png", [r"letterhead"]),
    ("master_pm_certificates.png", [r"certificate", r"diploma"]),
    ("master_pm_cd_dvd.png", [r"dvd", r"cd_cover", r"cd.?cover", r"cd.?print", r"cd.?duplic", r"jewel.?case"]),
    ("master_pm_table_tops.png", [r"table.?top", r"acrylic.?table", r"menu.?holder"]),
    ("master_pm_name_plates.png", [r"name.?plate", r"table.?name"]),
    ("master_pm_wax_seals.png", [r"wax.?seal", r"wax.?stick"]),
    ("master_pm_car_mats.png", [r"car.?mat", r"cat.?mat", r"floor.?mat", r"table-mat", r"table.?mat"]),
    ("master_pm_thankyou_cards.png", [r"thank.?you.?card"]),
    ("master_pm_diaries.png", [r"diar", r"yearly.?diar"]),
    ("master_pm_wooden_cubes.png", [r"wooden.?cube", r"wooden-cube"]),
    ("master_pm_embossing.png", [r"emboss", r"deboss", r"foil(?!.?sticker)", r"spot.?uv(?!.?sticker)", r"raised.?spot"]),
    ("master_pm_stickers.png", [r"label", r"lable", r"product-banner"]),
]

CORP_RULES: list[tuple[str, list[str]]] = [
    ("master_corp_safety_vest.png", [r"safety.?vest", r"safety-vest", r"hi.?vis", r"hivis", r"reflective.?vest", r"net_safety"]),
    ("master_corp_apparel.png", [r"tshirt", r"t-shirt", r"t_shirt", r"polo", r"hoodie", r"jersey", r"apparel", r"uniform", r"dtf.?tshirt", r"branding_on_arm", r"shirt", r"types-of-collar", r"swatch.?color", r"silkprint", r"sublimation.?tshirt", r"screen_printing_t", r"sticker_sublimation_printing_tshirt", r"vinyl_transfer", r"laser_printing_dtf", r"screen_printing_dubai"]),
    ("master_corp_diecast.png", [r"die.?cast", r"diecast"]),
    ("master_corp_paper_bags.png", [r"paper.?bag", r"non.?woven.?bag", r"landscape_paper_bag", r"screen_printing_bags", r"sublimation_printing_bags", r"dtf_printing_bags"]),
    ("master_corp_pouches.png", [r"pouch", r"pouche", r"(?<![a-z])bags?(?![a-z])", r"tote"]),
    ("master_corp_bottles.png", [r"bottle", r"flask", r"dew.?bott"]),
    ("master_corp_powerbanks.png", [r"power.?bank", r"power_bank"]),
    ("master_corp_usb.png", [r"usb", r"flash.?drive", r"twister"]),
    ("master_corp_id_cards.png", [r"identity.?card", r"membership.?card", r"id.?card"]),
    ("master_fab_fabric_types.png", [r"fabric-material", r"fabric_material", r"color-and-size", r"plate_colors", r"ribbon-options"]),
    ("master_pm_embossing.png", [r"embossed_printing", r"matt_finish_with_chrome"]),
    ("master_pm_stickers.png", [r"bottle.?label", r"label.?printing", r"sillicone.?label", r"silicone.?label", r"sticker_sublimation_printing_dubai"]),
]

FAB_RULES: list[tuple[str, list[str]]] = [
    ("master_fab_armbands.png", [r"armband"]),
    ("master_fab_sashes.png", [r"sash"]),
    ("master_fab_masks.png", [r"mask", r"face.?cover", r"smart-fit"]),
    ("master_fab_pouches.png", [r"pouch", r"pouche", r"string-bags", r"zipper_pouch", r"tote_pouch"]),
    ("master_fab_handkerchiefs.png", [r"handkerchief", r"handherchief", r"pocket.?hand"]),
    ("master_fab_sarongs.png", [r"sarong", r"fabric.?wrap", r"fabric_wrap"]),
    ("master_fab_scrunchies.png", [r"scrunchie"]),
    ("master_fab_napkins_placemats.png", [r"napkin", r"placemat", r"place.?mat"]),
    ("master_fab_table_linen.png", [r"table.?cloth", r"tablecloth", r"table.?cover", r"table.?runner", r"table.?linen", r"dining.?table", r"organza_table", r"rayon_linen_table", r"velvet_table", r"viscose_cotton_table", r"whisper_smooth_table", r"size_table_cover", r"trimmed_corner", r"regular_corner"]),
    ("master_fab_couture.png", [r"couture", r"combination_custom", r"combination_solid", r"printing_finishing", r"side_stitching"]),
    ("master_fab_fabric_types.png", [r"fabric", r"cotton", r"satin", r"polyester", r"canvas", r"linen", r"silk", r"velvet", r"damask", r"crepe", r"blackout", r"duchess", r"butterfly", r"clothins", r"textile", r"fleece", r"jersey-fabric", r"monroe", r"nautica", r"net-fabric", r"organza", r"plush", r"voile", r"whisper", r"stetch", r"poly_cotton", r"gloss-satin", r"matt-satin"]),
]

NAV_PM_MAP = {
    "Booklets.webp": "master_pm_booklets.png",
    "Brochures.webp": "master_pm_brochures.png",
    "Envelope.webp": "master_pm_envelopes.png",
    "Flyers.webp": "master_pm_flyers.png",
    "Folders.webp": "master_pm_folders.png",
    "PVC Stickers.webp": "master_pm_stickers_pvc.png",
    "binding.webp": "master_pm_binding.png",
    "business_card.webp": "master_pm_business_cards.png",
    "calendar.webp": "master_pm_calendars.png",
    "car_mat.webp": "master_pm_car_mats.png",
    "cd_cover.webp": "master_pm_cd_dvd.png",
    "cd_printing.webp": "master_pm_cd_dvd.png",
    "certificates.webp": "master_pm_certificates.png",
    "compliment_slips.webp": "master_pm_compliment_slips.png",
    "delivery_orders_books.webp": "master_pm_order_books.png",
    "die_cut_sticker.webp": "master_pm_stickers.png",
    "embossing_seal.webp": "master_pm_embossing.png",
    "epoxy_stickers.webp": "master_pm_stickers_epoxy.png",
    "foil_stickers.webp": "master_pm_stickers_epoxy.png",
    "hang_tag.webp": "master_pm_hang_tags.png",
    "helmet_stickers.webp": "master_pm_helmet_stickers.png",
    "hologram_stickers.webp": "master_pm_stickers_epoxy.png",
    "invoice_books.webp": "master_pm_invoice_books.png",
    "kraft_paper_stickers.webp": "master_pm_stickers_kraft.png",
    "letterhead.webp": "master_pm_letterheads.png",
    "lpo_books.webp": "master_pm_order_books.png",
    "metal_sticker.webp": "master_pm_stickers_metal.png",
    "notebooks.webp": "master_pm_notebooks.png",
    "notepad.webp": "master_pm_notepads.png",
    "paper_stickers.webp": "master_pm_stickers.png",
    "payment_vouchers.webp": "master_pm_vouchers.png",
    "petty_cash_vouchers.webp": "master_pm_vouchers.png",
    "print_cut_sticker.webp": "master_pm_stencil_stickers.png",
    "pvc_stickers.webp": "master_pm_stickers_pvc.png",
    "receipt_vouchers.webp": "master_pm_vouchers.png",
    "scratch_win_coupons.webp": "master_pm_scratch_cards.png",
    "self_ink_stamps.webp": "master_pm_stamps_selfink.png",
    "stencil_stickers.webp": "master_pm_stencil_stickers.png",
    "table_mat.webp": "master_pm_car_mats.png",
    "tent_card.webp": "master_pm_tent_cards.png",
}

NAV_FAB_MAP = {
    "Face_Mask.webp": "master_fab_masks.png",
    "face_mask.webp": "master_fab_masks.png",
    "Sash.webp": "master_fab_sashes.png",
    "Armband.webp": "master_fab_armbands.png",
    "Pouch.webp": "master_fab_pouches.png",
    "Table_cloth.webp": "master_fab_table_linen.png",
    "table_runner.webp": "master_fab_table_linen.png",
    "Placemat.webp": "master_fab_napkins_placemats.png",
    "table_napkin.webp": "master_fab_napkins_placemats.png",
}


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
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    suffix = dest.suffix.lower()
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
    if not folder.exists():
        return 0, by_family, unmatched
    files = [p for p in folder.iterdir() if p.suffix.lower() in EXTS and p.name != "desktop.ini"]
    for path in files:
        if not is_may(path):
            continue
        if SKIP_RE.search(path.name):
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
        if nav and nav.exists():
            nav_dest = nav / path.name
            if nav_dest.exists():
                save_like(cache[master_name], nav_dest, size)
        family = master_name.replace("master_", "").replace(".png", "")
        by_family[family] += 1
        replaced += 1
    return replaced, by_family, unmatched


def apply_nav_map(nav: Path, mapping: dict[str, str], cache: dict[str, Image.Image]) -> int:
    n = 0
    if not nav.exists():
        return 0
    for name, master_name in mapping.items():
        dest = nav / name
        if not dest.exists() or not is_may(dest):
            continue
        master_path = MASTERS / master_name
        if not master_path.exists():
            continue
        if master_name not in cache:
            cache[master_name] = Image.open(master_path)
        with Image.open(dest) as existing:
            size = existing.size
        save_like(cache[master_name], dest, size)
        n += 1
    return n


def main() -> None:
    cache: dict[str, Image.Image] = {}
    pm_n, pm_fam, pm_un = process_folder(PM, PM_RULES, NAV_PM, cache)
    corp_n, corp_fam, corp_un = process_folder(CORP, CORP_RULES, NAV_CORP, cache)
    fab_n, fab_fam, fab_un = process_folder(FAB, FAB_RULES, NAV_FAB, cache)
    nav_pm_n = apply_nav_map(NAV_PM, NAV_PM_MAP, cache)
    nav_fab_n = apply_nav_map(NAV_FAB, NAV_FAB_MAP, cache)

    report = {
        "print_replaced": pm_n,
        "print_by_family": dict(pm_fam.most_common()),
        "print_unmatched_count": len(pm_un),
        "print_unmatched_sample": pm_un[:50],
        "corporate_replaced": corp_n,
        "corporate_by_family": dict(corp_fam.most_common()),
        "corporate_unmatched_count": len(corp_un),
        "corporate_unmatched_sample": corp_un[:40],
        "fabric_replaced": fab_n,
        "fabric_by_family": dict(fab_fam.most_common()),
        "fabric_unmatched_count": len(fab_un),
        "fabric_unmatched_sample": fab_un[:40],
        "navbar_print_alias_synced": nav_pm_n,
        "navbar_fabric_alias_synced": nav_fab_n,
        "total_replaced": pm_n + corp_n + fab_n + nav_pm_n + nav_fab_n,
    }
    out = ROOT / "_preview" / "batch_pm_replace_report.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
