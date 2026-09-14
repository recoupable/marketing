"""Collect proposed layered covers and verify the preserved generated originals."""

import hashlib
import json
import struct
from pathlib import Path

root = Path(__file__).resolve().parents[1]
families = ["hand", "review", "flower", "cables"]
treatments = ["gradient", "headline", "color"]
assets = []
for part in ["a", "b"]:
    assets.extend(json.loads((root / f"round-04-layered-{part}.json").read_text()))

expected = {f"layered04-{family}-{treatment}" for family in families for treatment in treatments}
assert len(assets) == 12 and {a["id"] for a in assets} == expected, "Need twelve distinct covers"
hashes = set()
for asset in assets:
    assert asset["status"] == "proposed" and asset["category"] == "layered-editorial"
    for key in ["prompt", "source", "sampleTitle", "family", "treatment", "referenced_image_paths"]:
        assert asset.get(key), f"Missing {key}: {asset['id']}"
    original = (root / asset["preview"]).read_bytes()
    assert original[:8] == b"\x89PNG\r\n\x1a\n"
    assert struct.unpack(">II", original[16:24]) == (asset["width"], asset["height"])
    assert original == Path(asset["source"]).read_bytes(), "Image differs from original"
    digest = hashlib.sha256(original).hexdigest()
    assert digest not in hashes, "Duplicate image"
    hashes.add(digest)
    assert bool(asset.get("headline")) == (asset["treatment"] == "headline")
    for file in asset["files"]:
        assert (root / file["path"]).is_file(), "Missing download"

assets.sort(key=lambda a: (families.index(a["family"]), treatments.index(a["treatment"])))
destination = root / "layered-editorial-manifest.json"
temporary = destination.with_suffix(".tmp")
temporary.write_text(json.dumps(assets, indent=2) + "\n")
temporary.replace(destination)
print("Verified 12 distinct covers, dimensions, prompts, downloads, and preserved originals.")
