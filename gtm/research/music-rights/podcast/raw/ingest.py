#!/usr/bin/env python3
"""Download Music Moneyball episodes from the Anchor RSS feed.

Audio stays local (gitignored). Transcripts are written separately by transcribe.py.
"""

from __future__ import annotations

import json
import re
import subprocess
import xml.etree.ElementTree as ET
from html import unescape
from pathlib import Path

ITUNES = "{http://www.itunes.com/dtds/podcast-1.0.dtd}"
RSS_URL = "https://anchor.fm/s/10b8b2e94/podcast/rss"
RAW_DIR = Path(__file__).resolve().parent
AUDIO_DIR = RAW_DIR / "audio"
INDEX_PATH = RAW_DIR / "episode-index.json"
RSS_PATH = RAW_DIR / "rss.xml"


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"['’]", "", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:80]


def strip_html(html: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    text = re.sub(r"</p>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_field(plain: str, label: str) -> str | None:
    pattern = rf"(?:^|\n)\s*{label}:\s*(.+?)(?=\n\s*(?:Hosts?|Guests?|Guest|Theme|Brought)\s*:|\Z)"
    match = re.search(pattern, plain, flags=re.I | re.S)
    if not match:
        return None
    return re.sub(r"\s+", " ", match.group(1)).strip(" .")


def parse_rss(xml_bytes: bytes) -> list[dict]:
    root = ET.fromstring(xml_bytes)
    episodes: list[dict] = []
    items = list(root.findall("./channel/item"))
    total = len(items)
    for offset, item in enumerate(items):
        title = (item.findtext("title") or "").strip()
        desc_html = item.findtext("description") or ""
        plain = strip_html(desc_html)
        enclosure = item.find("enclosure")
        pub = item.findtext("pubDate") or ""
        date_slug = ""
        # RSS dates look like: Tue, 08 Sep 2026 12:48:05 GMT
        date_match = re.search(r"(\d{2}) (\w{3}) (\d{4})", pub)
        months = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12",
        }
        if date_match:
            day, mon, year = date_match.groups()
            date_slug = f"{year}-{months[mon]}-{day}"
        n = total - offset
        slug = f"{n:02d}-{date_slug}-{slugify(title)}"
        episodes.append(
            {
                "n": n,
                "slug": slug,
                "title": title,
                "pubDate": pub,
                "date": date_slug,
                "duration": item.findtext(f"{ITUNES}duration"),
                "page_url": item.findtext("link"),
                "audio_url": enclosure.get("url") if enclosure is not None else None,
                "bytes": int(enclosure.get("length") or 0) if enclosure is not None else 0,
                "guests": extract_field(plain, r"Guests?"),
                "hosts": extract_field(plain, r"Hosts?"),
                "description": plain,
                "audio_file": f"audio/{slug}.mp3",
                "transcript_file": f"transcripts/{slug}.txt",
            }
        )
    episodes.sort(key=lambda ep: ep["n"])
    return episodes


def curl_get(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".part")
    cmd = [
        "curl",
        "-fsSL",
        "--retry",
        "3",
        "-A",
        "Recoup-MusicMoneyball-Ingest/1.0",
        "-o",
        str(tmp),
        url,
    ]
    subprocess.run(cmd, check=True)
    tmp.replace(dest)


def main() -> None:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    curl_get(RSS_URL, RSS_PATH)
    xml_bytes = RSS_PATH.read_bytes()
    episodes = parse_rss(xml_bytes)
    INDEX_PATH.write_text(json.dumps(episodes, indent=2) + "\n")
    print(f"index {len(episodes)} episodes → {INDEX_PATH}")

    for ep in episodes:
        dest = RAW_DIR / ep["audio_file"]
        if dest.exists() and dest.stat().st_size > 100_000:
            print(f"skip  {ep['slug']}")
            continue
        if not ep["audio_url"]:
            print(f"NO AUDIO  {ep['slug']}")
            continue
        print(f"get   {ep['slug']}")
        curl_get(ep["audio_url"], dest)
        print(f"done  {dest.stat().st_size} bytes")


if __name__ == "__main__":
    main()
