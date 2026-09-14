#!/usr/bin/env python3
"""Transcribe downloaded Music Moneyball MP3s with mlx-whisper."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import mlx_whisper

RAW_DIR = Path(__file__).resolve().parent
INDEX_PATH = RAW_DIR / "episode-index.json"
TRANSCRIPTS_DIR = RAW_DIR / "transcripts"
MODEL = "mlx-community/whisper-large-v3-turbo"


def fmt_ts(seconds: float) -> str:
    total = int(seconds)
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def write_transcript(path: Path, ep: dict, result: dict) -> None:
    lines = [
        f"# {ep['title']}",
        f"# Date: {ep.get('date')}",
        f"# Duration: {ep.get('duration')}",
        f"# Guests: {ep.get('guests') or '[see title]'}",
        f"# Hosts: {ep.get('hosts') or 'Standard Innovation'}",
        f"# Source: {ep.get('page_url')}",
        f"# Model: {MODEL}",
        "",
    ]
    for seg in result.get("segments") or []:
        text = (seg.get("text") or "").strip()
        if not text:
            continue
        lines.append(f"[{fmt_ts(seg.get('start') or 0)}] {text}")
    path.write_text("\n".join(lines) + "\n")


def main() -> None:
    TRANSCRIPTS_DIR.mkdir(parents=True, exist_ok=True)
    episodes = json.loads(INDEX_PATH.read_text())
    only = sys.argv[1:]
    for ep in episodes:
        if only and ep["slug"] not in only and str(ep["n"]) not in only:
            continue
        audio = RAW_DIR / ep["audio_file"]
        dest = RAW_DIR / ep["transcript_file"]
        if dest.exists() and dest.stat().st_size > 500:
            print(f"skip  {ep['slug']}")
            continue
        if not audio.exists():
            print(f"missing audio  {ep['slug']}")
            continue
        print(f"asr   {ep['slug']}", flush=True)
        result = mlx_whisper.transcribe(
            str(audio),
            path_or_hf_repo=MODEL,
            word_timestamps=False,
            verbose=False,
        )
        write_transcript(dest, ep, result)
        print(f"wrote {dest} ({dest.stat().st_size} bytes)", flush=True)


if __name__ == "__main__":
    main()
