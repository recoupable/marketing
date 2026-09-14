#!/usr/bin/env python3
"""Pull question-shaped lines out of Music Moneyball transcripts for the hosting playbook."""

from __future__ import annotations

import re
from pathlib import Path

TRANSCRIPTS = Path(__file__).resolve().parent / "transcripts"
OUT = Path(__file__).resolve().parent / "harvested-questions.md"


def main() -> None:
    chunks: list[str] = []
    for path in sorted(TRANSCRIPTS.glob("*.txt")):
        lines = path.read_text().splitlines()
        title = lines[0].lstrip("# ").strip() if lines else path.stem
        qs = []
        for line in lines:
            if "?" not in line:
                continue
            if line.startswith("#"):
                continue
            qs.append(line)
        chunks.append(f"## {title}\n\n" + "\n".join(qs) + "\n")
    OUT.write_text("# Question harvest (ASR)\n\n" + "\n".join(chunks))
    print(f"wrote {OUT} from {len(list(TRANSCRIPTS.glob('*.txt')))} transcripts")


if __name__ == "__main__":
    main()
