#!/usr/bin/env python3
"""Build professional product-photo prompts from image paths."""

from __future__ import annotations

import re
from pathlib import Path


def humanize(name: str) -> str:
    n = Path(name).stem.lower()
    n = re.sub(r"[_-]+", " ", n)
    n = re.sub(
        r"\b(dubai|uae|printing|print|thumb|customized|custom|ready)\b",
        " ",
        n,
    )
    n = re.sub(r"\b\d+\b", " ", n)
    n = re.sub(r"\s+", " ", n).strip()
    return n or "printed product"


def prompt_for(path: str) -> str:
    p = Path(path)
    label = humanize(p.name)
    folder = p.parent.name.lower()

    base = (
        f"Ultra-realistic professional ecommerce product photograph of {label}. "
        "Shot on a real camera in a commercial photo studio, natural materials, "
        "accurate textures, soft directional lighting, gentle contact shadows, "
        "shallow depth of field, clean neutral backdrop. "
        "Looks like a premium catalog photo for a printing company website. "
        "No watermarks, no logos of printing companies, no text overlays, "
        "no captions, no graphic icons, no flat vector illustration, no cartoon style."
    )

    extras = {
        "sticker": "Die-cut adhesive stickers on release liner, crisp edges, print detail visible.",
        "hang tag": "Cardboard clothing hang tags with string holes and twine, paper texture visible.",
        "flag": "Printed outdoor advertising flag on pole, fabric texture, slight natural drape.",
        "usb": "Branded USB flash drives on matte surface, metal/plastic/wood materials look real.",
        "bottle": "Custom branded drink bottles, condensation optional, studio tabletop.",
        "mug": "Ceramic branded mugs, glaze highlights, realistic ceramic material.",
        "pen": "Branded promotional pens close-up on wood or marble surface.",
        "bag": "Branded tote or kraft paper bags standing, paper/fabric texture.",
        "lanyard": "Custom woven lanyards coiled and laid flat, fabric weave visible.",
        "sign": "Commercial signage installation or studio product shot of sign letters/board.",
        "backdrop": "Exhibition backdrop or booth graphic in showroom/studio setting.",
        "notebook": "Branded notebooks stacked, cover material texture clear.",
        "cap": "Embroidered or printed caps, fabric and stitching detail.",
        "frame": "Picture frames with sample artwork, wood/metal/acrylic materials.",
        "vest": "High-visibility safety vest with custom print, fabric realism.",
        "keychain": "Custom acrylic or metal keychains, reflective highlights.",
        "scarf": "Soft fabric scarf with custom print, drapery and textile weave.",
        "canvas": "Gallery-wrapped canvas print leaning, canvas texture visible.",
        "stamp": "Self-inking rubber stamp product shot, plastic housing realism.",
        "card": "Stack of premium business cards, paper edge and finish detail.",
    }
    for key, extra in extras.items():
        if key in label or key in folder:
            return f"{base} {extra}"
    if "corporate" in folder:
        return f"{base} Corporate promotional merchandise product shot."
    if "fabric" in folder or "fashion" in folder:
        return f"{base} Soft-goods textile product photography."
    if "print" in folder:
        return f"{base} Printed marketing collateral product photography."
    if "flag" in folder:
        return f"{base} Printed flag product photography outdoors or studio."
    if "signage" in folder:
        return f"{base} Commercial signage product photography."
    if "backdrop" in folder:
        return f"{base} Exhibition display product photography."
    if "office" in folder:
        return f"{base} Office branding and display product photography."
    return base


if __name__ == "__main__":
    lines = Path("_flat_heroes.txt").read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines[:15]):
        _, page, src = line.split("\t")
        print("---", page)
        print(prompt_for(src)[:220])
