"""
Typographic portrait — reference detail style.
Multi-segment scanlines: fine shadow text + large highlight words.
"""

import os
import numpy as np
from PIL import Image, ImageOps, ImageFilter

SRC = r"C:\Users\DHRUV SAXENA\.cursor\projects\c-Users-DHRUV-SAXENA-dhruv-portfolio-new\assets\c__Users_DHRUV_SAXENA_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_1706461598178-removebg-preview-7e96dffe-1cf1-492e-a68e-3f3e59acc579.png"
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "components", "ui", "portrait-data.ts")

COLS = 96
ROWS = 112

PATTERNS = [
    "SAXENA // DHRUV // ",
    "DHRUV // SAXENA // ",
    "SAXENA // DHRUV // SA",
    "DHRUV SAXENA // ",
    "DHRUV // ",
    "SAXENA // ",
]


def find_legs_start(alpha: np.ndarray) -> int:
    h, _ = alpha.shape
    widths = [int((alpha[y] > 0.08).sum()) for y in range(h)]
    if not widths:
        return h
    peak = max(widths)
    threshold = peak * 0.68
    waist = h - 1
    for y in range(h - 1, int(h * 0.38), -1):
        if widths[y] >= threshold:
            waist = y
            break
    return min(h, waist + max(8, int(h * 0.10)))


def load_and_prepare(path):
    img = Image.open(path).convert("RGBA")
    arr = np.asarray(img, dtype=np.float32) / 255.0
    rgb = arr[..., :3]
    alpha = arr[..., 3]

    ys, xs = np.where(alpha > 0.05)
    if len(ys) == 0:
        raise ValueError("No subject found in image")
    y0, y1 = int(ys.min()), int(ys.max())
    x0, x1 = int(xs.min()), int(xs.max())

    alpha_crop = alpha[y0 : y1 + 1, x0 : x1 + 1]
    rgb_crop = rgb[y0 : y1 + 1, x0 : x1 + 1]
    sh, sw = alpha_crop.shape

    y_end = find_legs_start(alpha_crop)
    alpha = alpha_crop[:y_end, 0:sw]
    lum = (
        0.299 * rgb_crop[:y_end, 0:sw, 0]
        + 0.587 * rgb_crop[:y_end, 0:sw, 1]
        + 0.114 * rgb_crop[:y_end, 0:sw, 2]
    )
    lum = ImageOps.autocontrast(Image.fromarray((lum * 255).astype(np.uint8)), cutoff=1)
    lum = np.asarray(lum, dtype=np.float32) / 255.0
    return lum, alpha


def segment_style(r_norm: float, vv: float) -> tuple[float, float, int]:
    """Wide scale range: small text in shadows, large on highlights."""
    if r_norm < 0.14:
        boost = 0.84
    elif r_norm < 0.28:
        boost = 1.0
    elif r_norm < 0.45:
        boost = 0.90
    elif r_norm < 0.68:
        boost = 0.78
    else:
        boost = 0.70

    o = min(1.0, 0.20 + 0.62 * vv * boost + 0.26 * boost)

    if vv < 0.14:
        s = 0.48 + 0.55 * vv
    elif vv < 0.36:
        s = 0.62 + 0.72 * vv
    elif vv < 0.58:
        s = 0.88 + 0.55 * vv
    else:
        s = 1.08 + 0.38 * vv

    if r_norm < 0.30 and vv > 0.22:
        tone = 2 if vv > 0.40 else 1
    elif vv > 0.56:
        tone = 2
    elif vv > 0.20:
        tone = 1
    else:
        tone = 0

    return round(o, 3), round(s, 3), tone


def build():
    lum, alpha = load_and_prepare(SRC)
    h_src, w_src = lum.shape

    lum_small = np.asarray(
        Image.fromarray((lum * 255).astype(np.uint8)).resize(
            (COLS, ROWS), Image.Resampling.LANCZOS
        ),
        dtype=np.float32,
    ) / 255.0
    alpha_small = np.asarray(
        Image.fromarray((alpha * 255).astype(np.uint8)).resize(
            (COLS, ROWS), Image.Resampling.LANCZOS
        ),
        dtype=np.float32,
    ) / 255.0

    ink = lum_small * alpha_small
    blur = np.asarray(
        Image.fromarray((ink * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=0.75))
    ) / 255.0
    ink = np.clip(ink + 1.15 * (ink - blur), 0.0, 1.0)
    ink = ink * (alpha_small > 0.08).astype(np.float32)

    active = ink[ink > 0]
    if active.size:
        ink = (ink - active.min()) / (active.max() - active.min() + 1e-6)
    ink = np.nan_to_num(ink, nan=0.0)
    ink = np.power(np.clip(ink, 0.0, 1.0), 0.62)

    ALPHA_MIN = 0.08
    rows_out = []

    for r in range(ROWS):
        row_ink = ink[r]
        row_alpha = alpha_small[r]
        r_norm = r / max(ROWS - 1, 1)
        ink_min = 0.04 if r_norm < 0.32 else 0.07

        segments = []
        in_seg = False
        start = 0
        for c in range(COLS):
            on = row_alpha[c] >= ALPHA_MIN and row_ink[c] >= ink_min
            if on:
                if not in_seg:
                    start = c
                    in_seg = True
            else:
                if in_seg:
                    segments.append((start, c - 1))
                    in_seg = False
        if in_seg:
            segments.append((start, COLS - 1))

        for c0, c1 in segments:
            if c1 - c0 + 1 < 1:
                continue
            seg = row_ink[c0 : c1 + 1]
            vv = float(0.28 * seg.mean() + 0.72 * seg.max())
            vv = max(0.0, min(1.0, vv))

            o, s, tone = segment_style(r_norm, vv)
            w = 700 if tone == 2 else (600 if tone == 1 else 500)

            rows_out.append({
                "r": r,
                "c0": c0,
                "c1": c1,
                "o": o,
                "s": s,
                "w": w,
                "tone": tone,
                "p": (r * 2 + c0) % len(PATTERNS),
            })

    if rows_out:
        min_r = min(row["r"] for row in rows_out)
        max_r = max(row["r"] for row in rows_out)
        min_c = min(row["c0"] for row in rows_out)
        max_c = max(row["c1"] for row in rows_out)
        pad_r, pad_c = 1, 1
        out_rows = max_r - min_r + 1 + pad_r * 2
        out_cols = max_c - min_c + 1 + pad_c * 2
        for row in rows_out:
            row["r"] = row["r"] - min_r + pad_r
            row["c0"] = row["c0"] - min_c + pad_c
            row["c1"] = row["c1"] - min_c + pad_c
    else:
        out_rows, out_cols = ROWS, COLS

    pattern_export = ", ".join(f'"{p}"' for p in PATTERNS)
    lines = [
        "// AUTO-GENERATED by scripts/gen_text_portrait.py — do not edit by hand.",
        "export type PortraitRow = { r: number; c0: number; c1: number; o: number; s: number; w: number; tone: 0 | 1 | 2; p: number };",
        f"export const PORTRAIT_COLS = {out_cols};",
        f"export const PORTRAIT_ROWS = {out_rows};",
        "export const PORTRAIT_LINES: PortraitRow[] = [",
    ]
    for row in rows_out:
        lines.append(
            f'{{r:{row["r"]},c0:{row["c0"]},c1:{row["c1"]},o:{row["o"]},s:{row["s"]},w:{row["w"]},tone:{row["tone"]},p:{row["p"]}}},'
        )
    lines.append("];")
    lines.append(f"export const PORTRAIT_PATTERNS = [{pattern_export}];")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    preview_dir = os.path.join(os.path.dirname(__file__), "..", ".analysis-frames")
    os.makedirs(preview_dir, exist_ok=True)
    prev = (ink * 255).astype(np.uint8)
    Image.fromarray(prev).resize((COLS * 6, ROWS * 6), Image.Resampling.NEAREST).save(
        os.path.join(preview_dir, "portrait_ink_preview.png")
    )
    print(f"wrote {OUT}: {len(rows_out)} lines, view {out_cols}x{out_rows}, src {w_src}x{h_src}")


if __name__ == "__main__":
    build()
