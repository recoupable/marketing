"""Collect the 50 selected studies without discarding any generated originals."""

import argparse
import hashlib
import json
from collections import Counter
from pathlib import Path


def collect(require_complete=False):
    root = Path(__file__).resolve().parents[1]
    selection = {
        1: [1, 2, 4, 5, 6],
        4: [1, 2, 3, 4, 5],
    }
    expected = {
        f"bg-{style:02d}-{variant:02d}"
        for style in range(1, 11)
        for variant in selection.get(style, [1, 2, 5, 9, 10])
    }
    completed = {}
    for path in sorted(root.glob("background-part-*.json")):
        for asset in json.loads(path.read_text()):
            if asset["id"] in completed:
                raise ValueError(f"Duplicate asset ID: {asset['id']}")
            completed[asset["id"]] = asset

    missing = sorted(expected - completed.keys())
    if require_complete and missing:
        raise ValueError(f"Still missing {len(missing)} backgrounds: {missing}")

    selected = [completed[asset_id] for asset_id in sorted(expected & completed.keys())]
    hashes = set()
    for asset in selected:
        asset["source"] = asset.get("source") or asset.get("generatedSource") or asset.get("generationSource")
        preview = root / asset["preview"]
        digest = hashlib.sha256(preview.read_bytes()).hexdigest()
        if digest in hashes:
            raise ValueError(f"Repeated image: {asset['id']}")
        hashes.add(digest)
        for file in asset["files"]:
            if not (root / file["path"]).is_file():
                raise ValueError(f"Missing download: {file['path']}")

    # Replace the index only after validation, so readers never see partial JSON.
    destination = root / "background-manifest.json"
    temporary = destination.with_suffix(".tmp")
    temporary.write_text(json.dumps(selected, indent=2) + "\n")
    temporary.replace(destination)
    print(f"Gallery: {len(selected)}/50 backgrounds")
    print(dict(Counter(asset["style"] for asset in selected)))
    print(f"Preserved outside selection: {sorted(completed.keys() - expected)}")
    if missing:
        print(f"Awaiting: {', '.join(missing)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--complete", action="store_true", help="Require all 50 before updating.")
    collect(parser.parse_args().complete)
