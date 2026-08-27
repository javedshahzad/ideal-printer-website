#!/usr/bin/env python3
"""Build carousel banners matched to site CSS aspect ratios + readable English text.

Desktop carousel (.cls-banner): aspect-ratio 1300/300 ≈ 4.33:1
Mobile carousel (.cls-banner @ max-width 600): aspect-ratio 900/650 ≈ 1.38:1
Images use object-fit: cover, so wrong ratios crop and clip titles.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "images" / "carousel-images"
ASSETS = Path(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website"
    r"-Ideal-printers-updated-website-v2\assets"
)

# Match css/main.css .cls-banner aspect ratios (scaled up for sharpness)
DESKTOP = (1950, 450)   # 1300/300
MOBILE = (900, 650)     # 900/650


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = []
    if bold:
        candidates += [
            "C:/Windows/Fonts/segoeuib.ttf",
            "C:/Windows/Fonts/arialbd.ttf",
            "C:/Windows/Fonts/calibrib.ttf",
        ]
    candidates += [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def load_bg(name: str, size: tuple[int, int], bias_right: bool = True) -> Image.Image:
    """Cover-crop background; bias toward right so product stays visible beside text."""
    path = ASSETS / name
    if not path.exists():
        # soft fallback gradient
        im = Image.new("RGB", size, (28, 36, 48))
        return im

    im = Image.open(path).convert("RGB")
    tw, th = size
    sw, sh = im.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale + 0.5), int(sh * scale + 0.5)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)

    if bias_right and nw > tw:
        left = max(0, nw - tw)  # keep right side of photo
    else:
        left = max(0, (nw - tw) // 2)
    top = max(0, (nh - th) // 2)
    return im.crop((left, top, left + tw, top + th))


def dark_panel(im: Image.Image, mobile: bool = False) -> Image.Image:
    """Strong readable panel without crushing the whole photo."""
    w, h = im.size
    base = im.convert("RGBA")
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    if mobile:
        # Top-to-bottom scrim for stacked text
        band = int(h * 0.62)
        for y in range(band):
            t = y / max(1, band - 1)
            a = int(200 * (1 - t) ** 0.55)
            d.line([(0, y), (w, y)], fill=(8, 14, 24, a))
    else:
        # Left-to-right scrim — denser on left for text
        band = int(w * 0.58)
        for x in range(band):
            t = x / max(1, band - 1)
            a = int(210 * (1 - t) ** 0.55)
            d.line([(x, 0), (x, h)], fill=(8, 14, 24, a))
        # slight full vignette so edges stay premium
        edge = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        ed = ImageDraw.Draw(edge)
        ed.rectangle([0, 0, w, h], outline=(0, 0, 0, 40), width=12)
        edge = edge.filter(ImageFilter.GaussianBlur(10))
        overlay = Image.alpha_composite(overlay, edge)

    return Image.alpha_composite(base, overlay).convert("RGB")


def draw_button(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fill: tuple[int, int, int],
    font_size: int = 22,
) -> int:
    x, y = xy
    f = font(font_size, bold=True)
    bbox = draw.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 22, 10
    box = [x, y, x + tw + pad_x * 2, y + th + pad_y * 2]
    draw.rounded_rectangle(box, radius=6, fill=fill)
    draw.text((x + pad_x, y + pad_y - 1), text, font=f, fill=(255, 255, 255))
    return box[3]


def wrap_text(
    draw: ImageDraw.ImageDraw, text: str, f, max_w: int
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textbbox((0, 0), test, font=f)[2] > max_w and line:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)
    return lines


def compose(
    bg_name: str,
    lines: list[tuple[str, int, bool]],
    subtitle: str,
    button: str,
    accent: tuple[int, int, int] = (75, 130, 191),
    mobile: bool = False,
) -> Image.Image:
    size = MOBILE if mobile else DESKTOP
    im = load_bg(bg_name, size, bias_right=not mobile)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(1.05)
    im = dark_panel(im, mobile=mobile)
    d = ImageDraw.Draw(im)
    w, h = im.size

    if mobile:
        x = 40
        max_w = w - 80
        # Measure block height then vertically center in upper 55%
        block_h = 0
        sized_lines = []
        for text, size_pt, bold in lines:
            # scale titles for short mobile height
            size_pt = max(28, min(size_pt, 42))
            sized_lines.append((text, size_pt, bold))
            f = font(size_pt, bold=bold)
            bb = d.textbbox((0, 0), text, font=f)
            block_h += (bb[3] - bb[1]) + 8
        sub_f = font(20, bold=False)
        sub_lines = wrap_text(d, subtitle, sub_f, max_w) if subtitle else []
        block_h += 12 + len(sub_lines) * 28 + (48 if button else 0)
        y = max(36, int(h * 0.10))
        lines = sized_lines
        btn_size = 18
    else:
        x = 64
        max_w = int(w * 0.42)
        # Desktop: center text block vertically with safe padding
        block_h = 0
        sized_lines = []
        for text, size_pt, bold in lines:
            size_pt = max(28, min(size_pt, 46))  # never too tall for 450px height
            sized_lines.append((text, size_pt, bold))
            f = font(size_pt, bold=bold)
            bb = d.textbbox((0, 0), text, font=f)
            block_h += (bb[3] - bb[1]) + 6
        sub_f = font(20, bold=False)
        sub_lines = wrap_text(d, subtitle, sub_f, max_w) if subtitle else []
        block_h += 10 + len(sub_lines) * 26 + (44 if button else 0)
        y = max(28, (h - block_h) // 2)
        lines = sized_lines
        btn_size = 18

    for text, size_pt, bold in lines:
        f = font(size_pt, bold=bold)
        # soft shadow for readability
        d.text((x + 2, y + 2), text, font=f, fill=(0, 0, 0, 120) if False else (0, 0, 0))
        d.text((x, y), text, font=f, fill=(255, 255, 255))
        bbox = d.textbbox((x, y), text, font=f)
        y = bbox[3] + (8 if bold else 6)

    if subtitle:
        y += 6
        f = font(20 if not mobile else 18, bold=False)
        for line in wrap_text(d, subtitle, f, max_w):
            d.text((x + 1, y + 1), line, font=f, fill=(0, 0, 0))
            d.text((x, y), line, font=f, fill=(220, 228, 235))
            y += 26 if not mobile else 24

    if button:
        y += 10
        # keep button inside frame
        if y > h - 55:
            y = h - 55
        draw_button(d, (x, y), button, accent, font_size=btn_size)

    return im


BANNERS = [
    # Prefer fresh wide masters when present; fall back to older bg_*.png
    (
        ["print_and_marketing_banner.webp"],
        ["print_and_marketing_banner_mobile.webp"],
        "car_bg_print.png",
        [("PRINT & MARKETING", 42, True), ("THAT STANDS OUT", 36, True)],
        "Business cards, flyers, brochures — premium printing in Lahore.",
        "EXPLORE PRODUCTS",
        (0, 150, 200),
        "bg_print.png",
    ),
    (
        ["fashin_and_fabric_banner.webp"],
        ["fashin_and_fabric_mobile_banner.webp"],
        "car_bg_fashion.png",
        [("FABRIC & FASHION", 42, True), ("PRINTING", 36, True)],
        "Custom apparel, scarves and textile printing made to impress.",
        "SHOP FASHION",
        (180, 80, 90),
        "bg_fashion.png",
    ),
    (
        ["office_and_store_branding.webp"],
        ["office_and_store_branding_mobile_banner.webp"],
        "car_bg_office.png",
        [("OFFICE & STORE", 42, True), ("BRANDING", 36, True)],
        "Wall graphics, frosted glass, window branding and retail displays.",
        "VIEW BRANDING",
        (60, 100, 140),
        "bg_office.png",
    ),
    (
        ["signages_banner.webp"],
        ["signages_banner_mobile.webp"],
        "car_bg_signage.png",
        [("CUSTOM SIGNAGE", 42, True), ("THAT GETS NOTICED", 34, True)],
        "Neon, acrylic letters, lightboxes and storefront signs.",
        "SHOP SIGNAGE",
        (220, 140, 40),
        "bg_signage.png",
    ),
    (
        ["flags_banner.webp", "flags_banner_banner.webp", "flag_printing_banner.webp"],
        ["flag_printing_banner_mobile.webp"],
        "car_bg_flags.png",
        [("FLAGS TO MAKE YOU", 32, False), ("STAND OUT", 44, True)],
        "High quality flags for any event, promotion or location.",
        "SHOP FLAGS",
        (120, 180, 40),
        "bg_flags.png",
    ),
    (
        ["backdrops_and_exhibition_banner.webp"],
        ["backdrops_and_exhibition_mobile_banner.webp"],
        "car_bg_expo.png",
        [("BACKDROPS &", 40, True), ("EXHIBITION", 40, True)],
        "Trade show booths, pop-ups, roll-ups and event displays.",
        "VIEW DISPLAYS",
        (90, 70, 160),
        "bg_expo.png",
    ),
    (
        ["corporate_and_gifts_banner.webp", "awareness_banner.webp"],
        ["corporate_and_gifts_mobile_banner.webp", "awareness_banner_mobile.webp"],
        "car_bg_gifts.png",
        [("CORPORATE GIFTS", 40, True), ("THAT IMPRESS", 36, True)],
        "Premium branded merchandise for clients and employees.",
        "EXPLORE GIFTS",
        (30, 70, 120),
        "bg_gifts.png",
    ),
    (
        ["national_day.webp"],
        ["national_day_mobile.webp"],
        "car_bg_flags.png",
        [("CELEBRATE WITH", 32, False), ("CUSTOM FLAGS", 42, True)],
        "National day flags, buntings and event branding printed fast.",
        "ORDER NOW",
        (0, 120, 90),
        "bg_national.png",
    ),
    (
        ["ramdam_offers_banner_dubai.webp"],
        ["ramdam_offers_banner_dubai_mobile.webp"],
        "car_bg_gifts.png",
        [("SPECIAL OFFERS", 40, True), ("ON PRINTING", 36, True)],
        "Limited-time deals on corporate gifts, banners and branding.",
        "VIEW OFFERS",
        (180, 100, 40),
        "bg_gifts.png",
    ),
    (
        ["slider_background.webp"],
        [],
        "car_bg_print.png",
        [("IDEAL PRINTERS", 44, True)],
        "Your trusted printing partner in Lahore, Pakistan.",
        "GET STARTED",
        (200, 40, 40),
        "bg_print.png",
    ),
]


def resolve_bg(preferred: str, fallback: str) -> str:
    if (ASSETS / preferred).exists():
        return preferred
    return fallback


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    count = 0
    for desktop_files, mobile_files, preferred, lines, subtitle, button, accent, fallback in BANNERS:
        bg = resolve_bg(preferred, fallback)
        print(f"bg={bg}")
        for name in desktop_files:
            im = compose(bg, lines, subtitle, button, accent, mobile=False)
            im.save(OUT / name, "WEBP", quality=92, method=4)
            print("OK", name, im.size)
            count += 1
        for name in mobile_files:
            m_lines = [(t, max(28, s - 4), b) for t, s, b in lines]
            im = compose(bg, m_lines, subtitle, button, accent, mobile=True)
            im.save(OUT / name, "WEBP", quality=92, method=4)
            print("OK", name, im.size)
            count += 1

    webp = OUT / "slider_background.webp"
    if webp.exists():
        Image.open(webp).convert("RGB").save(OUT / "slider_background.jpg", "JPEG", quality=92)
        print("OK slider_background.jpg")
        count += 1
    print("DONE", count)


if __name__ == "__main__":
    main()
