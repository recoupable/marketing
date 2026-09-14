# Music Moneyball research corpus

This folder contains the existing research on **Music Moneyball, brought to you by Standard Innovation**. It covers the 28 episodes in the [RSS-derived episode index](raw/episode-index.json), through the episode dated 2026-09-08. The text corpus was prepared in consulting and imported here; it is not a fresh check for newly released episodes.

## Reading paths

| Material | Use |
|---|---|
| [Guest roster](guests/_index.md) and [guest notes](guests/) | Identify people, companies, and distinctive operating approaches |
| [Principles](../reference/principles.md) | Read the recurring themes and disagreements, then follow the evidence |
| [Fund reference](../reference/funds.md) | Compare how different buyers own and finance rights |
| [Hosting playbook](hosting-playbook.md) | Interview structure and questions worth learning from |
| [Harvested questions](raw/harvested-questions.md) | Source questions to adapt for useful buyer conversations |
| [Episode index](raw/episode-index.json) and [source RSS](raw/rss.xml) | Credits, episode URLs, audio URLs, and dates |
| [Transcripts](raw/transcripts/) | Timestamped machine transcripts for all indexed episodes |
| [Episode-to-company map](../companies/2026-09-13-music-executive-podcast-map.csv) | See how episodes informed audience inclusion or exclusion |

Use RSS credits for names and identity; automatic speech recognition can mishear them. Cite an episode and timestamp for a spoken claim. Before publishing a consequential quotation or financial figure, check the original recording. Guest opinions and Recoup interpretations are not interchangeable.

Standard Innovation and the named speakers are the source, not Recoup endorsers. Preserve attribution when using this research. The source index and episode links remain available in the package.

## Optional maintenance tools

`raw/ingest.py` fetches the public podcast feed and audio. `raw/transcribe.py` runs local transcription and needs its documented transcription dependencies/model. `raw/harvest_questions.py` extracts questions from the local transcript text. Read each script before execution; ingestion/transcription may download substantial files.

The audio files referenced by the episode index are intentionally not included. They can be obtained from the indexed source URLs when needed; their local paths are relative to `raw/`. Existing transcript text and episode metadata are sufficient to explore the corpus. Audio and processing caches are ignored by Git.
