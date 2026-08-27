#!/usr/bin/env python3
"""Regenerate unique product images for every file that shares a content hash."""

from __future__ import annotations

import hashlib
import math
import random
import re
from collections import defaultdict
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "images"
SKIP_PARTS = {
    "icons",
    "companies-logos",
    "apple-touch",
    "ideal-printers-logo",
    "favicon",
}

PALETTES = [
    ((245, 242, 236), (28, 48, 72), (196, 92, 54), (232, 196, 120)),
    ((236, 244, 248), (18, 70, 92), (40, 150, 140), (240, 180, 70)),
    ((250, 246, 240), (62, 44, 34), (140, 90, 50), (210, 160, 100)),
    ((240, 240, 245), (30, 30, 40), (90, 90, 200), (220, 80, 120)),
    ((248, 248, 246), (20, 55, 40), (60, 140, 90), (220, 190, 80)),
    ((245, 238, 230), (70, 35, 50), (180, 70, 90), (230, 170, 90)),
    ((235, 242, 235), (35, 55, 45), (80, 120, 70), (180, 200, 90)),
    ((242, 240, 248), (45, 35, 75), (120, 90, 180), (230, 140, 100)),
]


def seed_from(path: Path) -> int:
    return int(hashlib.md5(str(path.as_posix()).encode()).hexdigest()[:12], 16)


def clean_label(name: str) -> str:
    n = Path(name).stem.lower()
    n = re.sub(r"[_-]+", " ", n)
    n = re.sub(
        r"\b(dubai|uae|printing|print|thumb|customized|custom|ready|color|colours?)\b",
        " ",
        n,
    )
    n = re.sub(r"\b\d+\b", " ", n)
    n = re.sub(r"\s+", " ", n).strip()
    if not n:
        n = Path(name).stem.replace("_", " ")
    words = n.split()
    return " ".join(w.capitalize() for w in words[:5])


def detect_kind(name: str, folder: str) -> str:
    n = name.lower()
    f = folder.lower()
    rules = [
        ("hang_tag", "hang tag" in n or "hangtag" in n),
        ("sticker", "sticker" in n or "decal" in n or "label" in n and "woven" not in n),
        ("business_card", "business_card" in n or "business-card" in n),
        ("bottle", "bottle" in n or "tumbler" in n or "mug" in n),
        ("pen", "pen" in n and "open" not in n),
        ("usb", "usb" in n or "flash" in n),
        ("cap", "cap" in n or "hat" in n),
        ("tshirt", "tshirt" in n or "t_shirt" in n or "polo" in n or "jersey" in n),
        ("bag", "bag" in n or "tote" in n or "jute" in n or "kraft_bag" in n),
        ("lanyard", "lanyard" in n),
        ("flag", "flag" in n or "teardrop" in n or "blade" in n or "sail" in n),
        ("banner", "banner" in n or "rollup" in n or "roll_up" in n),
        ("backdrop", "backdrop" in n or "shell_scheme" in n or "booth" in n),
        ("standee", "standee" in n or "cutout" in n),
        ("signage", "sign" in n or "lightbox" in n or "neon" in n or "acrylic" in n),
        ("wristband", "wristband" in n or "tyvek" in n or "silicone_wrist" in n),
        ("notebook", "notebook" in n or "diary" in n or "scribble" in n),
        ("keychain", "keychain" in n or "key_chain" in n),
        ("coaster", "coaster" in n),
        ("patch", "patch" in n),
        ("scarf", "scarf" in n or "bandana" in n or "abaya" in n or "sheila" in n),
        ("apron", "apron" in n),
        ("umbrella", "umbrella" in n),
        ("towel", "towel" in n),
        ("cushion", "cushion" in n or "pillow" in n),
        ("vest", "vest" in n),
        ("id_card", "id_card" in n or "badge" in n or "pvc_id" in n),
        ("envelope", "envelope" in n),
        ("flyer", "flyer" in n or "brochure" in n or "leaflet" in n),
        ("poster", "poster" in n),
        ("stamp", "stamp" in n),
        ("tent", "tent" in n),
        ("canvas", "canvas" in n and "hang" not in n),
        ("window", "window" in n or "frosted" in n or "cling" in n),
        ("magnet", "magnet" in n),
        ("vehicle", "vehicle" in n or "bus" in n or "van" in n or "car_" in n),
        ("template", "template" in n or "floral" in n),
    ]
    for kind, ok in rules:
        if ok:
            return kind
    if "flag" in f:
        return "flag"
    if "backdrop" in f:
        return "backdrop"
    if "signage" in f:
        return "signage"
    if "fabric" in f or "fashion" in f:
        return "scarf"
    if "corporate" in f:
        return "gift"
    if "print" in f:
        return "print"
    return "product"


def font(size: int) -> ImageFont.ImageFont:
    for name in (
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
    ):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def bg_gradient(w: int, h: int, c1, c2, rng: random.Random) -> Image.Image:
    # Fast vertical/diagonal gradient via resized 2px strip
    top = Image.new("RGB", (2, 2), c1)
    top.putpixel((1, 0), c2)
    top.putpixel((0, 1), tuple((a + b) // 2 for a, b in zip(c1, c2)))
    top.putpixel((1, 1), c2)
    im = top.resize((w, h), Image.Resampling.BILINEAR)
    if rng.random() > 0.5:
        im = im.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    return im


def shadow(draw: ImageDraw.ImageDraw, box, rng: random.Random, blur=18):
    # drawn later via filter on layer
    pass


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_label(draw, xy, text, fill, size=28):
    f = font(size)
    draw.text(xy, text, font=f, fill=fill)


def make_sticker(w, h, label, colors, rng, name):
    bg, ink, accent, gold = colors
    im = bg_gradient(w, h, bg, tuple(min(255, c + 12) for c in bg), rng)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    n = name.lower()
    shapes = []
    if "round" in n or "circle" in n or "oval" in n:
        shapes = ["ellipse"] * 5
    elif "square" in n or "rect" in n:
        shapes = ["rect"] * 5
    elif "kraft" in n:
        shapes = ["ellipse", "rect", "ellipse", "rect"]
        accent = (180, 130, 70)
        bg = (235, 220, 195)
        im = bg_gradient(w, h, bg, (245, 235, 215), rng)
        overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        d = ImageDraw.Draw(overlay)
    elif "hologram" in n or "foil" in n or "metal" in n:
        shapes = ["ellipse", "rect", "ellipse"]
        accent = gold
    elif "epoxy" in n or "domed" in n or "spot_uv" in n:
        shapes = ["ellipse"] * 6
    elif "helmet" in n:
        shapes = ["ellipse", "rect"]
    elif "windshield" in n or "car" in n or "boat" in n or "yacht" in n or "yatch" in n:
        shapes = ["rect", "rect", "ellipse"]
    else:
        shapes = rng.choice([["ellipse"] * 4, ["rect"] * 4, ["ellipse", "rect"] * 3])

    # sheet
    sheet = [int(w * 0.12), int(h * 0.16), int(w * 0.88), int(h * 0.82)]
    sheet_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sheet_layer)
    sd.rounded_rectangle(sheet, radius=18, fill=(255, 255, 255, 235))
    sheet_layer = sheet_layer.filter(ImageFilter.GaussianBlur(0.2))
    im = Image.alpha_composite(im.convert("RGBA"), sheet_layer)

    d = ImageDraw.Draw(im)
    cols = 3 if len(shapes) > 3 else 2
    rows = math.ceil(len(shapes) / cols)
    pad_x, pad_y = int(w * 0.18), int(h * 0.24)
    cell_w = int(w * 0.64 / cols)
    cell_h = int(h * 0.52 / rows)
    for i, shape in enumerate(shapes):
        r, c = divmod(i, cols)
        cx = pad_x + c * cell_w + cell_w // 2 + rng.randint(-8, 8)
        cy = pad_y + r * cell_h + cell_h // 2 + rng.randint(-8, 8)
        rw = int(cell_w * 0.34) + rng.randint(-6, 10)
        rh = int(cell_h * 0.34) + rng.randint(-6, 10)
        fill = rng.choice([accent, ink, gold, (230, 90, 70), (50, 140, 180)])
        if "clear" in n or "transparent" in n:
            fill = (*fill[:3],)  # keep
            outline = ink
            if shape == "ellipse":
                d.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], outline=outline, width=4)
                d.ellipse([cx - rw + 8, cy - rh + 8, cx + rw - 8, cy + rh - 8], outline=accent, width=2)
            else:
                d.rounded_rectangle([cx - rw, cy - rh, cx + rw, cy + rh], 12, outline=outline, width=4)
        else:
            if shape == "ellipse":
                d.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], fill=fill)
            else:
                d.rounded_rectangle([cx - rw, cy - rh, cx + rw, cy + rh], 14, fill=fill)
            # mini mark
            d.text((cx - 10, cy - 12), rng.choice(["IP", "★", "•"]), font=font(22), fill=(255, 255, 255))

    title = label if label else "Stickers"
    d.text((int(w * 0.14), int(h * 0.08)), title[:28], font=font(34), fill=ink)
    return im.convert("RGB")


def make_hang_tag(w, h, label, colors, rng, name):
    bg, ink, accent, gold = colors
    im = bg_gradient(w, h, bg, tuple(min(255, c + 10) for c in bg), rng)
    d = ImageDraw.Draw(im)
    n = name.lower()
    # string
    d.line([(w // 2, int(h * 0.05)), (w // 2, int(h * 0.18))], fill=(120, 120, 120), width=3)
    # tag shape variants
    tw, th = int(w * 0.34), int(h * 0.55)
    x0, y0 = w // 2 - tw // 2, int(h * 0.18)
    if "circle" in n or "oval" in n or "round" in n:
        box = [x0, y0, x0 + tw, y0 + th]
        fill = (235, 220, 190) if "kraft" in n else (255, 255, 255)
        if "kraft" in n:
            fill = (196, 150, 95)
        elif "velvet" in n:
            fill = (90, 40, 70)
        elif "plastic" in n or "translucent" in n:
            fill = (220, 235, 245)
        elif "foil" in n:
            fill = (40, 40, 45)
        else:
            fill = (255, 255, 255)
        d.rounded_rectangle(box, radius=tw // 2 if "circle" in n else 40, fill=fill, outline=ink, width=2)
    elif "square" in n:
        fill = (255, 255, 255)
        d.rounded_rectangle([x0, y0, x0 + tw, y0 + tw], 16, fill=fill, outline=ink, width=2)
        th = tw
    else:
        fill = (196, 150, 95) if "kraft" in n else (255, 255, 255)
        if "canvas" in n or "cotton" in n:
            fill = (230, 220, 200)
        if "foil" in n or "gloss" in n:
            fill = rng.choice([(35, 35, 40), (250, 248, 240)])
        # classic hang tag with notch
        pts = [
            (x0 + tw // 2, y0),
            (x0 + tw, y0 + 30),
            (x0 + tw, y0 + th),
            (x0, y0 + th),
            (x0, y0 + 30),
        ]
        d.polygon(pts, fill=fill, outline=ink)
    # hole
    hx, hy, hr = w // 2, y0 + 28, 10
    d.ellipse([hx - hr, hy - hr, hx + hr, hy + hr], fill=bg, outline=ink, width=2)
    # content
    text_fill = (255, 255, 255) if sum(fill) < 300 else ink
    d.text((x0 + 24, y0 + th // 3), "BRAND", font=font(28), fill=accent if sum(fill) > 300 else gold)
    d.text((x0 + 24, y0 + th // 3 + 40), label[:18], font=font(22), fill=text_fill)
    if "foil" in n or "spot_uv" in n or "emboss" in n:
        d.rectangle([x0 + 30, y0 + th - 70, x0 + tw - 30, y0 + th - 40], outline=gold, width=3)
    # second tag peek
    d.rounded_rectangle([x0 + tw + 20, y0 + 40, x0 + tw + 20 + int(tw * 0.7), y0 + 40 + int(th * 0.75)], 20, fill=accent)
    d.text((int(w * 0.08), int(h * 0.88)), label[:32], font=font(26), fill=ink)
    return im


def make_generic_product(w, h, label, colors, rng, kind, name):
    bg, ink, accent, gold = colors
    im = bg_gradient(w, h, bg, tuple(min(255, c + 14) for c in bg), rng)
    d = ImageDraw.Draw(im)
    cx, cy = w // 2, int(h * 0.48)

    if kind in {"bottle", "mug"}:
        bw, bh = int(w * 0.18), int(h * 0.55)
        d.rounded_rectangle([cx - bw, cy - bh // 2, cx + bw, cy + bh // 2], 40, fill=accent)
        d.rectangle([cx - int(bw * 0.55), cy - bh // 2 - 30, cx + int(bw * 0.55), cy - bh // 2 + 10], fill=ink)
        d.rectangle([cx - int(bw * 0.7), cy - 20, cx + int(bw * 0.7), cy + 40], fill=(255, 255, 255))
        d.text((cx - 40, cy - 5), "LOGO", font=font(20), fill=ink)
    elif kind == "pen":
        for i, yy in enumerate([-80, 0, 80]):
            col = [accent, ink, gold][i % 3]
            d.rounded_rectangle([cx - 220, cy + yy - 14, cx + 220, cy + yy + 14], 10, fill=col)
            d.ellipse([cx + 210, cy + yy - 10, cx + 235, cy + yy + 10], fill=gold)
    elif kind == "usb":
        d.rounded_rectangle([cx - 90, cy - 40, cx + 90, cy + 40], 12, fill=ink)
        d.rectangle([cx + 90, cy - 18, cx + 140, cy + 18], fill=(180, 180, 180))
        d.text((cx - 50, cy - 12), "USB", font=font(28), fill=gold)
    elif kind == "cap":
        d.ellipse([cx - 140, cy - 40, cx + 140, cy + 100], fill=accent)
        d.ellipse([cx - 150, cy - 70, cx + 150, cy + 20], fill=ink)
        d.text((cx - 30, cy - 20), "CAP", font=font(24), fill=(255, 255, 255))
    elif kind in {"tshirt", "vest"}:
        d.polygon(
            [(cx, cy - 160), (cx - 160, cy - 80), (cx - 120, cy - 40), (cx - 120, cy + 140), (cx + 120, cy + 140), (cx + 120, cy - 40), (cx + 160, cy - 80)],
            fill=accent,
        )
        d.text((cx - 40, cy), "TEE", font=font(30), fill=(255, 255, 255))
    elif kind == "bag":
        d.rounded_rectangle([cx - 120, cy - 100, cx + 120, cy + 140], 20, fill=(180, 130, 70) if "kraft" in name.lower() else accent)
        d.arc([cx - 80, cy - 180, cx - 20, cy - 80], 0, 180, fill=ink, width=6)
        d.arc([cx + 20, cy - 180, cx + 80, cy - 80], 0, 180, fill=ink, width=6)
        d.text((cx - 40, cy), "BAG", font=font(28), fill=(255, 255, 255))
    elif kind == "flag":
        d.polygon([(cx - 20, cy - 180), (cx - 20, cy + 160), (cx + 160, cy + 40), (cx - 20, cy - 40)], fill=accent)
        d.rectangle([cx - 30, cy - 180, cx - 18, cy + 180], fill=ink)
    elif kind in {"banner", "backdrop", "standee", "tent"}:
        d.rounded_rectangle([cx - 200, cy - 140, cx + 200, cy + 140], 16, fill=(255, 255, 255), outline=ink, width=3)
        d.rectangle([cx - 180, cy - 100, cx + 180, cy + 40], fill=accent)
        d.text((cx - 70, cy - 70), kind.upper()[:10], font=font(28), fill=(255, 255, 255))
    elif kind == "signage":
        d.rounded_rectangle([cx - 220, cy - 80, cx + 220, cy + 80], 10, fill=ink)
        d.text((cx - 90, cy - 20), "SIGNAGE", font=font(36), fill=gold)
    elif kind == "wristband":
        for i, col in enumerate([accent, ink, gold, (200, 80, 90)]):
            y = cy - 90 + i * 55
            d.rounded_rectangle([cx - 230, y, cx + 230, y + 36], 18, fill=col)
    elif kind == "business_card":
        d.rounded_rectangle([cx - 180, cy - 110, cx + 180, cy + 110], 12, fill=ink)
        d.text((cx - 100, cy - 20), "BUSINESS", font=font(28), fill=gold)
        d.rounded_rectangle([cx - 40, cy + 40, cx + 160, cy + 160], 12, fill=(255, 255, 255), outline=accent, width=3)
    elif kind == "notebook":
        d.rounded_rectangle([cx - 120, cy - 150, cx + 120, cy + 150], 8, fill=accent)
        d.rectangle([cx - 120, cy - 150, cx - 90, cy + 150], fill=ink)
        d.text((cx - 40, cy - 10), "NOTE", font=font(26), fill=(255, 255, 255))
    elif kind == "keychain":
        d.ellipse([cx - 30, cy - 140, cx + 30, cy - 80], outline=ink, width=6)
        d.rounded_rectangle([cx - 70, cy - 70, cx + 70, cy + 90], 16, fill=accent)
        d.text((cx - 25, cy), "KEY", font=font(22), fill=(255, 255, 255))
    elif kind in {"scarf", "apron", "towel", "cushion", "template"}:
        d.rounded_rectangle([cx - 180, cy - 140, cx + 180, cy + 140], 20, fill=accent)
        for i in range(6):
            x = cx - 140 + i * 50
            d.ellipse([x, cy - 40, x + 36, cy + 20], fill=gold if i % 2 == 0 else ink)
        d.text((cx - 60, cy + 70), kind.upper()[:10], font=font(24), fill=(255, 255, 255))
    elif kind == "id_card":
        d.rounded_rectangle([cx - 130, cy - 90, cx + 130, cy + 90], 14, fill=(255, 255, 255), outline=ink, width=3)
        d.ellipse([cx - 100, cy - 50, cx - 40, cy + 10], fill=(200, 200, 200))
        d.rectangle([cx - 20, cy - 40, cx + 100, cy - 10], fill=accent)
        d.rectangle([cx - 20, cy, cx + 100, cy + 20], fill=(220, 220, 220))
    elif kind == "window":
        d.rounded_rectangle([cx - 200, cy - 130, cx + 200, cy + 130], 8, fill=(210, 225, 230), outline=ink, width=4)
        d.line([(cx, cy - 130), (cx, cy + 130)], fill=ink, width=3)
        d.text((cx - 70, cy - 10), "FROSTED", font=font(26), fill=ink)
    elif kind == "magnet":
        d.rounded_rectangle([cx - 100, cy - 100, cx + 100, cy + 100], 24, fill=accent)
        d.text((cx - 45, cy - 10), "MAGNET", font=font(22), fill=(255, 255, 255))
    elif kind == "stamp":
        d.ellipse([cx - 120, cy - 120, cx + 120, cy + 120], outline=accent, width=10)
        d.text((cx - 50, cy - 10), "STAMP", font=font(28), fill=accent)
    elif kind == "lanyard":
        for i, col in enumerate([accent, ink, gold]):
            d.rectangle([cx - 200 + i * 20, cy - 160, cx - 170 + i * 20, cy + 120], fill=col)
        d.ellipse([cx - 40, cy + 100, cx + 40, cy + 160], fill=gold)
    elif kind == "patch":
        d.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], fill=ink)
        d.ellipse([cx - 80, cy - 80, cx + 80, cy + 80], outline=gold, width=6)
        d.text((cx - 40, cy - 10), "PATCH", font=font(24), fill=gold)
    elif kind == "coaster":
        d.ellipse([cx - 130, cy - 130, cx + 130, cy + 130], fill=accent)
        d.ellipse([cx - 100, cy - 100, cx + 100, cy + 100], outline=(255, 255, 255), width=4)
    elif kind == "flyer":
        d.rounded_rectangle([cx - 120, cy - 160, cx + 120, cy + 160], 8, fill=(255, 255, 255), outline=ink, width=2)
        d.rectangle([cx - 100, cy - 140, cx + 100, cy - 40], fill=accent)
        d.rectangle([cx - 100, cy - 20, cx + 100, cy + 20], fill=(220, 220, 220))
        d.rectangle([cx - 100, cy + 40, cx + 100, cy + 120], fill=(230, 230, 230))
    elif kind == "poster":
        d.rounded_rectangle([cx - 140, cy - 180, cx + 140, cy + 180], 6, fill=ink)
        d.text((cx - 55, cy - 10), "POSTER", font=font(30), fill=gold)
    elif kind == "envelope":
        d.polygon([(cx - 180, cy - 80), (cx + 180, cy - 80), (cx + 180, cy + 100), (cx - 180, cy + 100)], fill=(255, 255, 255), outline=ink)
        d.polygon([(cx - 180, cy - 80), (cx, cy + 20), (cx + 180, cy - 80)], outline=accent, width=3)
    elif kind == "vehicle":
        d.rounded_rectangle([cx - 200, cy - 40, cx + 200, cy + 60], 30, fill=accent)
        d.ellipse([cx - 130, cy + 40, cx - 70, cy + 100], fill=ink)
        d.ellipse([cx + 70, cy + 40, cx + 130, cy + 100], fill=ink)
        d.rectangle([cx - 60, cy - 20, cx + 100, cy + 30], fill=(255, 255, 255))
    else:
        # abstract unique product card
        d.rounded_rectangle([cx - 180, cy - 140, cx + 180, cy + 140], 24, fill=(255, 255, 255), outline=ink, width=3)
        d.rectangle([cx - 160, cy - 120, cx + 160, cy - 20], fill=accent)
        d.text((cx - 80, cy - 80), kind.upper()[:12], font=font(28), fill=(255, 255, 255))
        d.text((cx - 100, cy + 30), label[:22], font=font(22), fill=ink)

    d.text((int(w * 0.07), int(h * 0.08)), label[:34], font=font(30), fill=ink)
    # uniqueness marks from seed
    for _ in range(8):
        x, y = rng.randint(20, w - 20), rng.randint(20, h - 20)
        r = rng.randint(2, 6)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(*gold, ) if False else gold)
    return im


def generate_for_path(rel: str) -> tuple[str, str]:
    path = ROOT / rel
    try:
        rng = random.Random(seed_from(path))
        colors = PALETTES[seed_from(path) % len(PALETTES)]
        # slight palette jitter per file
        colors = tuple(
            tuple(max(0, min(255, c + rng.randint(-15, 15))) for c in col) for col in colors
        )
        label = clean_label(path.name)
        kind = detect_kind(path.name, path.parent.name)
        # preserve roughly previous aspect if possible
        try:
            with Image.open(path) as old:
                w, h = old.size
        except Exception:
            w, h = 1000, 1000
        w = max(640, min(w, 1600))
        h = max(640, min(h, 1600))
        # normalize very odd sizes
        if w * h > 2_500_000:
            scale = (2_500_000 / (w * h)) ** 0.5
            w, h = int(w * scale), int(h * scale)

        if kind == "sticker":
            im = make_sticker(w, h, label, colors, rng, path.name)
        elif kind == "hang_tag":
            im = make_hang_tag(w, h, label, colors, rng, path.name)
        else:
            im = make_generic_product(w, h, label, colors, rng, kind, path.name)

        # mild unique grade
        im = ImageEnhance.Color(im).enhance(0.95 + (seed_from(path) % 20) / 100)
        im = ImageEnhance.Contrast(im).enhance(1.05)
        path.parent.mkdir(parents=True, exist_ok=True)
        im.save(path, "WEBP", quality=82, method=4)
        return rel, "ok"
    except Exception as e:
        return rel, f"err:{e}"


def collect_duplicate_targets() -> list[str]:
    by_hash: dict[str, list[Path]] = defaultdict(list)
    for p in IMAGES.rglob("*"):
        if p.suffix.lower() not in {".webp", ".png", ".jpg", ".jpeg"}:
            continue
        parts = {x.lower() for x in p.parts}
        if parts & SKIP_PARTS:
            continue
        if "apple-touch" in p.name.lower():
            continue
        try:
            h = hashlib.md5(p.read_bytes()).hexdigest()
            by_hash[h].append(p)
        except Exception:
            continue
    targets: list[Path] = []
    for paths in by_hash.values():
        if len(paths) > 1:
            targets.extend(paths)
    # Prefer regenerating non-navbar first for nicer primary assets
    targets.sort(key=lambda p: ("navbarimages" in str(p).lower(), str(p).lower()))
    return [str(p.relative_to(ROOT)).replace("\\", "/") for p in targets]


def main():
    targets = collect_duplicate_targets()
    print(f"targets={len(targets)}", flush=True)
    ok = err = 0
    # ProcessPool can be heavy on Windows; use chunked workers
    workers = 6
    with ProcessPoolExecutor(max_workers=workers) as ex:
        futs = {ex.submit(generate_for_path, rel): rel for rel in targets}
        done = 0
        for fut in as_completed(futs):
            rel, status = fut.result()
            done += 1
            if status == "ok":
                ok += 1
            else:
                err += 1
                print(status, rel, flush=True)
            if done % 100 == 0 or done == len(targets):
                print(f"progress {done}/{len(targets)} ok={ok} err={err}", flush=True)
    print(f"DONE ok={ok} err={err}", flush=True)


if __name__ == "__main__":
    main()
