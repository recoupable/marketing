"""Collect the ten proposed editorial images and verify their preserved originals."""

import hashlib
import json
import struct
from pathlib import Path

root = Path(__file__).resolve().parents[1]
assets = []
for part in ["a", "b"]:
    assets.extend(json.loads((root / f"round-03-editorial-{part}.json").read_text()))

expected = {f"editorial03-{i:02d}" for i in range(1, 11)}
assert len(assets) == 10 and {a["id"] for a in assets} == expected, "Need ten distinct IDs"
hashes = set()
for asset in assets:
    assert asset["status"] == "proposed" and asset["category"] == "editorial-lab"
    for key in ["prompt", "source", "sampleTitle", "useFor", "family", "composition"]:
        assert asset.get(key), f"Missing {key}: {asset['id']}"
    image = (root / asset["preview"]).read_bytes()
    assert image[:8] == b"\x89PNG\r\n\x1a\n"
    assert struct.unpack(">II", image[16:24]) == (asset["width"], asset["height"])
    assert image == Path(asset["source"]).read_bytes(), "Image differs from original"
    digest = hashlib.sha256(image).hexdigest()
    assert digest not in hashes, "Duplicate image"
    hashes.add(digest)
    for file in asset["files"]:
        assert (root / file["path"]).is_file(), "Missing download"

assets.sort(key=lambda a: a["id"])
destination = root / "editorial-lab-manifest.json"
temporary = destination.with_suffix(".tmp")
temporary.write_text(json.dumps(assets, indent=2) + "\n")
temporary.replace(destination)
print("Verified 10 unique editorial images, dimensions, downloads, prompts, and original sources.")
