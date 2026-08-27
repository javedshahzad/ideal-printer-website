"""Build Google-ready square favicons from brand mark (transparent bg)."""
from PIL import Image
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(
    r"C:\Users\USER\.cursor\projects\d-Workplace-Angular-apps-ideal-printers-website-Ideal-printers-updated-website-v2\assets",
    "c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Logo_1-78c047c7-537a-4af8-bfcb-b582023ab713.png",
)


def flood_transparent(img, threshold=40):
    """Remove near-black background connected to edges; keep internal strokes."""
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    visited = [[False] * w for _ in range(h)]
    stack = []

    def is_bg(x, y):
        r, g, b, a = px[x, y]
        return a > 0 and r <= threshold and g <= threshold and b <= threshold

    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        if not is_bg(x, y):
            continue
        px[x, y] = (0, 0, 0, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    return img


def content_bbox(img, alpha_min=8):
    px = img.load()
    w, h = img.size
    minx, miny, maxx, maxy = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            if px[x, y][3] >= alpha_min:
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if maxx < 0:
        return (0, 0, w, h)
    return (minx, miny, maxx + 1, maxy + 1)


def to_square(img, size, pad_ratio=0.1):
    bbox = content_bbox(img)
    cropped = img.crop(bbox)
    cw, ch = cropped.size
    side = max(cw, ch)
    pad = int(side * pad_ratio)
    canvas_side = side + pad * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    ox = (canvas_side - cw) // 2
    oy = (canvas_side - ch) // 2
    canvas.paste(cropped, (ox, oy), cropped)
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def main():
    src = Image.open(SRC)
    print("source", src.size, src.mode)
    cleared = flood_transparent(src, threshold=40)
    print("corner after flood", cleared.getpixel((0, 0)))

    master = to_square(cleared, 512)
    paths = {
        "images/ideal-printers-mark.png": master,
        "images/ideal-printers-logo-small.png": master,
        "images/ideal-printers-icon.png": master,
        "android-chrome-512x512.png": master,
        "apple-touch-icon.png": to_square(cleared, 180),
        "favicon-192.png": to_square(cleared, 192),
        "favicon.png": to_square(cleared, 48),
    }
    for rel, im in paths.items():
        full = os.path.join(ROOT, rel)
        im.save(full, "PNG")
        print("wrote", rel, im.size)

    for s in (16, 32, 48, 96, 180, 192, 512):
        rel = f"images/favicon-{s}x{s}.png"
        im = to_square(cleared, s)
        im.save(os.path.join(ROOT, rel), "PNG")
        print("wrote", rel)

    # ICO for legacy / some crawlers
    ico16 = to_square(cleared, 16)
    ico_path = os.path.join(ROOT, "favicon.ico")
    ico16.save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print("wrote favicon.ico")
    print("done")


if __name__ == "__main__":
    main()
