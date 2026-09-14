"""Validate and collect the 18 background variations in round 02."""

import argparse
import hashlib
import json
import struct
from collections import Counter
from pathlib import Path


def collect(require_complete=False):
    root = Path(__file__).resolve().parents[1]
    families = {"gradient": "gradients", "airbrush": "airbrush", "forest": "forest"}
    expected = {f"exp02-{name}-{i:02d}" for name in families for i in range(1, 7)}
    assets = []
    for suffix in ["gradients", "airbrush", "forest"]:
        path = root / f"round-02-{suffix}.json"
        if path.exists():
            assets.extend(json.loads(path.read_text()))

    ids, hashes = set(), set()
    for asset in assets:
        asset_id = asset["id"]
        if asset_id not in expected or asset_id in ids:
            raise ValueError(f"Unexpected or repeated ID: {asset_id}")
        ids.add(asset_id)
        if asset["status"] != "proposed" or asset["category"] != "explorations-02":
            raise ValueError(f"Incorrect collection or review status: {asset_id}")
        if not asset.get("prompt") or not asset.get("source"):
            raise ValueError(f"Missing generation provenance: {asset_id}")
        image = (root / asset["preview"]).read_bytes()
        if image[:8] != b"\x89PNG\r\n\x1a\n":
            raise ValueError(f"Not a PNG: {asset_id}")
        if struct.unpack(">II", image[16:24]) != (asset["width"], asset["height"]):
            raise ValueError(f"Incorrect image dimensions: {asset_id}")
        if image != Path(asset["source"]).read_bytes():
            raise ValueError(f"Image differs from generation source: {asset_id}")
        digest = hashlib.sha256(image).hexdigest()
        if digest in hashes:
            raise ValueError(f"Repeated image: {asset_id}")
        hashes.add(digest)
        for file in asset["files"]:
            if not (root / file["path"]).is_file():
                raise ValueError(f"Missing download: {file['path']}")

    if require_complete and ids != expected:
        raise ValueError(f"Missing backgrounds: {sorted(expected - ids)}")
    order = {name: i for i, name in enumerate(families.values())}
    assets.sort(key=lambda a: (order[a["family"]], a["id"]))
    destination = root / "exploration-manifest.json"
    temporary = destination.with_suffix(".tmp")
    temporary.write_text(json.dumps(assets, indent=2) + "\n")
    temporary.replace(destination)
    print(f"Round 02: {len(assets)}/18 backgrounds. {dict(Counter(a['family'] for a in assets))}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--complete", action="store_true")
    collect(parser.parse_args().complete)
