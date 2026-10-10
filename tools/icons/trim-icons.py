#!/usr/bin/env python3
"""Normalize six existing transparent icons without changing their illustration."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "assets"
ICON_NAMES = (
    "property-icon.png",
    "gichul-icon.png",
    "exam-icon.png",
    "core-card-icon.png",
    "law-search-icon.png",
    "concept-quiz-icon.png",
)

for filename in ICON_NAMES:
    path = ASSETS / filename
    with Image.open(path) as source:
        image = source.convert("RGBA")
    bbox = image.getbbox()
    if not bbox:
        raise ValueError(f"{filename} has no visible pixels")
    visible = image.crop(bbox)
    width, height = visible.size
    padding = round(max(width, height) * 0.07)
    side = max(width, height) + padding * 2
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.alpha_composite(visible, ((side - width) // 2, (side - height) // 2))
    result = square.resize((768, 768), Image.Resampling.LANCZOS)
    result.save(path, format="PNG", optimize=True)
    if path.stat().st_size >= 450_000:
        raise ValueError(f"{filename} did not reach target size: {path.stat().st_size}")
    print(f"{filename}: visible bbox={bbox}, optimized={path.stat().st_size} bytes")
