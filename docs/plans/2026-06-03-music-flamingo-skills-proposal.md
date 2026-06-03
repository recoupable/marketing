# Music Flamingo Skills Proposal

> Status: proposal from code/docs research on 2026-06-03.

## Goal

Recoup already has a working audio-language-model endpoint:

- REST: `POST /api/songs/analyze`
- REST preset discovery: `GET /api/songs/analyze/presets`
- CLI: `recoup songs analyze` and `recoup songs presets`
- MCP: `analyze_music`

What is missing is an installable skill layer that teaches agents when to use it, how to call it, what the presets mean, what outputs to save, and how to turn raw model results into useful music-industry work.

Recommendation: ship one core skill first, then split the highest-value workflows into focused skills once the call pattern is proven.

## Endpoint Research

### Entry points

`POST /api/songs/analyze` lives at `api/app/api/songs/analyze/route.ts` and delegates to `postFlamingoGenerateHandler`.

`GET /api/songs/analyze/presets` lives at `api/app/api/songs/analyze/presets/route.ts` and returns preset summaries from `getPresetSummaries`.

The MCP tool is registered in `api/lib/mcp/tools/flamingo/registerAnalyzeMusicTool.ts` as `analyze_music`; it uses the same `flamingoGenerateBodySchema` and shared `processAnalyzeMusicRequest` function as REST.

The CLI wraps the same REST routes in `cli/src/commands/songs.ts`.

### Auth

REST requires exactly one auth mechanism:

- `x-api-key: $RECOUP_API_KEY`
- `Authorization: Bearer $RECOUP_ACCESS_TOKEN` or another valid bearer token

MCP requires Bearer auth. The MCP verifier accepts either Privy JWTs or API keys as bearer tokens.

Skills should not put `account_id` in request bodies. This endpoint derives account context from auth and does not accept account overrides.

### Request contract

Schema: `api/lib/flamingo/validateFlamingoGenerateBody.ts`.

Fields:

- `preset`: optional enum of all preset names, including `full_report`
- `prompt`: optional string, 1 to 24000 chars
- `audio_url`: optional public URL
- `max_new_tokens`: int 1 to 2048, default 512
- `temperature`: number 0 to 2, default 1.0
- `top_p`: number 0 to 1, default 1.0
- `do_sample`: boolean, default false

Rules:

- Provide exactly one of `preset` or `prompt`.
- Do not provide both.
- All current individual presets require `audio_url`.
- `full_report` also requires `audio_url`.
- Custom prompts can technically omit `audio_url`, but the useful product behavior is audio analysis, so skills should request or resolve a public audio URL unless the user is asking a general music question.

### Response contract

Single preset or custom prompt:

```json
{
  "status": "success",
  "preset": "catalog_metadata",
  "response": {},
  "elapsed_seconds": 8.0
}
```

`response` may be text or parsed JSON, depending on the preset. JSON-like model outputs are parsed by postprocessors where available; if parsing fails, the API falls back to the raw response.

Full report:

```json
{
  "status": "success",
  "preset": "full_report",
  "report": {},
  "elapsed_seconds": 30.5
}
```

`full_report` runs all 13 individual presets in parallel. If one section fails, the API inserts an error object for that section instead of failing the whole report.

### Presets

| Preset | Format | What it gives |
|---|---:|---|
| `catalog_metadata` | JSON | genre, subgenres, mood, BPM, key, time signature, instruments, vocal type/style, production style, energy, danceability, themes, similar artists, one-line description |
| `mood_tags` | JSON | 8-10 mood/vibe/energy tags and one primary mood |
| `lyric_transcription` | text | lyrics with section headers, with repetition condensing |
| `mix_feedback` | text | mix engineer critique: low end, vocals, air/harshness, stereo image, dynamics, concrete processing fixes |
| `song_description` | text | sub-100-word marketing description for playlist, press, or blog use |
| `music_theory` | JSON | key, scale, BPM, time signature, chord cycle, sections, duration, harmonic notes |
| `similar_artists` | JSON | five comparable artists with reasoning |
| `sample_detection` | text | possible samples/interpolations/references and confidence |
| `sync_brief_match` | JSON | visual scenes, emotional arc, energy curve, sync moments, searchable genres, avoid-for contexts |
| `audience_profile` | JSON | age range, gender skew, lifestyle tags, contexts, platforms, playlist types, comparable fanbases, marketing hook |
| `content_advisory` | JSON | explicit flag, profanity, thematic flags, brand safety rating, radio friendliness, content summary |
| `playlist_pitch` | text | Spotify editorial pitch: summary, why it fits, suggested playlists, comparable tracks |
| `artist_development_notes` | text | A&R notes: vocal, songwriting, production, commercial potential, next steps |
| `full_report` | JSON | all 13 sections combined as overview, mood, description, lyrics, content advisory, theory, mix, similar artists, sample detection, audience, sync, playlist pitch, development |

### Current Gaps and Stale Docs

- There is no top-level installable skill for the Music Flamingo endpoint in `skills/skills`.
- `skills/skills/recoup-api` mentions "Songs" but does not teach the analysis workflow, preset choice, or output handling.
- `skills/skills/music-industry-research` is for `/api/research/*` Chartmetric/web data, not audio understanding.
- `docs/cli.mdx` says some presets like `catalog_metadata` work from metadata alone, but the implementation marks every preset as `requiresAudio: true`.
- `skills/skills/recoup-setup/SKILL.md` says "Recoup is REST-only. There is no MCP integration," but the API exposes `/mcp` and registers `analyze_music`.
- Public docs and skills alternate between `https://api.recoupable.com/api` and `https://recoup-api.vercel.app/api`; the skill should support `RECOUP_API_URL` and the docs should settle on the canonical host.
- The endpoint requires a public `audio_url`; it does not accept a local file directly. The skill can handle Recoup/chat attachment URLs immediately, but local workspace MP3s need a product follow-up (`recoup songs analyze --file` or an API multipart/file upload path).

## Proposed Skill Set

### Naming rule

All Music Flamingo skills should use `recoup-song-*`. The user-facing object is the song/audio file, even when the downstream job is playlist pitching, sync, release planning, or catalog diligence.

Pattern: `recoup-song-{job}`.

Do not split the namespace into `recoup-playlist-*`, `recoup-sync-*`, `recoup-mix-*`, `recoup-release-*`, or `recoup-catalog-*` for this family. Those are output contexts, not the thing being analyzed.

### P0: `recoup-song-analyzer`

Purpose: the core installable skill for "analyze this song/track/audio" requests.

Trigger examples:

- "analyze this song"
- "what does this track sound like?"
- "run Music Flamingo"
- "get a full report on this audio"
- "what key/BPM/mood/genre is this?"
- "transcribe the lyrics"
- "use the audio language model"

What it should do:

1. Resolve the audio input. If the user gives a URL, use it. If the user gives a local file, explain that the current endpoint needs a public URL and ask for/upload support rather than pretending the file can be sent directly.
2. Choose the smallest useful preset. Do not default to `full_report` unless the user asks for a complete analysis.
3. Prefer MCP `analyze_music` when the host exposes it; otherwise use `recoup songs analyze`; otherwise use REST.
4. Use `recoup songs presets --json` or `GET /api/songs/analyze/presets` when uncertain.
5. Return interpretation, not raw JSON dumps.
6. If inside an artist workspace, save durable outputs under `songs/{song-slug}/analysis/`:
   - `music-flamingo-full-report.json` for `full_report`
   - `{preset}.json` or `{preset}.md` for targeted presets
   - `analysis-summary.md` for human-readable synthesis

Recommended contents:

- `SKILL.md`: decision tree, auth handling, CLI/MCP/REST call patterns, output rules.
- `references/presets.md`: the preset table above, full report section map, gotchas.
- Optional `scripts/analyze_music.py`: small REST wrapper that detects `$RECOUP_ACCESS_TOKEN` vs `$RECOUP_API_KEY`, validates preset/prompt exclusivity, writes output files, and prints a concise summary.

This should be the first PR. It gives users immediate value and creates a reusable pattern for the focused skills.

### P1: `recoup-song-metadata-tagger`

Purpose: enrich a track or small catalog with metadata useful for DSPs, catalog systems, search, and release docs.

Trigger examples:

- "tag this song"
- "generate catalog metadata"
- "get BPM, key, genre, mood"
- "create searchable metadata for these tracks"
- "fill release metadata from audio"

Preset chain:

- Required: `catalog_metadata`
- Usually add: `mood_tags`, `music_theory`, `content_advisory`
- Optional: `lyric_transcription`

Outputs:

- `metadata.json` with normalized genre, mood, BPM, key, energy, danceability, instruments, vocals, content rating.
- `lyrics.md` when transcription is requested.
- Suggested updates for `RELEASE.md` Section 2 (identifiers/metadata), Section 3 (narrative), and Section 6 (DSP strategy).

Why it matters:

This turns raw audio into structured data. It is the easiest skill to sell to labels, distributors, catalog owners, and agents with artist workspaces.

### P1: `recoup-song-lyrics-transcriber`

Purpose: turn a song audio URL into a draft lyric sheet with section headers.

Trigger examples:

- "transcribe the lyrics"
- "get the lyrics from this song"
- "make a lyric sheet"
- "write out the words"
- "find explicit lines in the lyrics"
- "make a clean/radio lyric reference"

Preset chain:

- Required: `lyric_transcription`
- Usually add: `content_advisory` when the user asks about explicit content, brand safety, clean edits, or radio readiness.
- Optional: `song_description` or a custom prompt when the user asks for lyrical themes, hook summary, or story interpretation.

Outputs:

- `lyrics.md` with `[Verse]`, `[Chorus]`, `[Bridge]`, and other section headers.
- Optional `lyrics-review.md` with uncertain lines, explicit terms, and manual verification notes.
- Optional `content_advisory.json` for profanity/theme/radio-friendliness fields.
- If inside an artist workspace, save under `songs/{song-slug}/lyrics/`.

Guardrails:

- Treat the output as a draft transcription. Ask for human review before publishing, registering, distributing, or sending to DSPs.
- Preserve uncertainty as `[inaudible]` or `[unclear: ...]`; do not invent lines to make the sheet feel complete.
- Do not quote or reproduce third-party copyrighted lyrics unless the user owns or supplied the song; for reference tracks, summarize instead.

Why it matters:

Lyrics are a common first ask from artists, managers, labels, and content teams. This skill gives them a clean deliverable and connects naturally to content advisory, radio edits, captions, lyric videos, and release docs.

### P1: `recoup-song-playlist-pitch-maker`

Purpose: convert a track into playlist/editorial pitch materials.

Trigger examples:

- "write a playlist pitch"
- "pitch this to Spotify"
- "what playlists does this fit?"
- "make a DSP pitch from this audio"
- "give me positioning for this single"

Preset chain:

- Required: `playlist_pitch`
- Usually add: `song_description`, `audience_profile`, `similar_artists`, `mood_tags`
- Optional: `catalog_metadata` for factual grounding

Outputs:

- Spotify/editorial pitch under 500 chars and a longer internal rationale.
- Suggested playlist lanes and comparable tracks.
- Marketing hook and audience notes.
- Optional `RELEASE.md` updates for Sections 3, 5, and 6.

Why it matters:

This is a direct workflow users already understand. It connects the endpoint to an immediate deliverable rather than just an analysis result.

### P1: `recoup-song-sync-brief-maker`

Purpose: make a music-supervisor-ready sync brief from a track.

Trigger examples:

- "make a sync brief"
- "where could this song be placed?"
- "is this brand safe for sync?"
- "find scenes this track fits"
- "audit this for licensing risks"

Preset chain:

- Required: `sync_brief_match`
- Usually add: `content_advisory`, `sample_detection`, `mood_tags`
- Optional: `music_theory`, `song_description`

Outputs:

- Visual placement ideas with scene types.
- Timestamped sync moments.
- Brand-safety notes and avoid-for contexts.
- Sample/interpolation risk notes with confidence.
- Supervisor search tags.

Why it matters:

This is one of the clearest "audio model beats text model" workflows because it uses waveform-level qualities, not just metadata.

### P1: `recoup-song-mix-feedback-reviewer`

Purpose: give artists/producers a technical mix critique.

Trigger examples:

- "critique this mix"
- "what should I fix in the mix?"
- "is the low end muddy?"
- "give me mix notes"
- "review this master"

Preset chain:

- Required: `mix_feedback`
- Usually add: `music_theory` if the user also asks about arrangement/harmony.
- Optional custom prompt for a specific concern such as "focus on vocal harshness and mono compatibility."

Outputs:

- Mix notes by low end, vocal range, high end, stereo image, dynamics, and concrete fixes.
- Prioritized revision checklist.
- Caveat that the model is a critique aid, not a replacement for engineer judgment or metering.

Why it matters:

It is a fast creator-facing use case that can make the endpoint feel magical without needing catalog infrastructure.

### P2: `recoup-song-ar-reviewer`

Purpose: turn a song into A&R development feedback.

Trigger examples:

- "give A&R notes"
- "is this song ready?"
- "how should the artist improve this track?"
- "evaluate commercial potential"
- "what should we do next with this artist?"

Preset chain:

- Required: `artist_development_notes`
- Usually add: `audience_profile`, `similar_artists`, `song_description`
- Optional: `content_advisory`, `mix_feedback`

Outputs:

- Direct but constructive notes on vocal, songwriting, production, commercial potential, and next steps.
- Audience hypothesis and comparable fanbases.
- 3-5 action items for the artist/team.

Why it matters:

This fits Recoupable's artist-management positioning and pairs naturally with `artist-workspace` and `release-management`.

### P2: `recoup-song-release-brief`

Purpose: analyze one or more tracks in a release and turn the outputs into release-management artifacts.

Trigger examples:

- "analyze this release"
- "fill the RELEASE.md from the songs"
- "make a release brief from the audio"
- "summarize the EP sonically"
- "prepare release positioning from these tracks"

Preset chain:

- Per track: `catalog_metadata`, `mood_tags`, `song_description`, `content_advisory`
- For focus tracks: `playlist_pitch`, `audience_profile`, `similar_artists`
- Use `full_report` only for lead singles or when explicitly requested.

Outputs:

- Release-level sonic summary.
- Per-track metadata table.
- Focus-track pitch.
- Gaps to fill manually: ISRC, UPC, writers, producers, distributor, release dates.
- Suggested updates to `RELEASE.md`.

Why it matters:

This joins Music Flamingo to the existing `release-management` skill without overloading that skill with endpoint details.

### P2: `recoup-song-catalog-auditor`

Purpose: batch-audit tracks in a catalog or deal room for metadata, brand-safety, sync, and sample-risk signals.

Trigger examples:

- "audit this catalog"
- "run audio diligence"
- "find risky songs"
- "which tracks are syncable?"
- "tag this catalog for licensing"

Preset chain:

- Batch baseline: `catalog_metadata`, `content_advisory`, `sample_detection`, `sync_brief_match`
- Optional: `mood_tags`, `music_theory`
- Avoid `full_report` across an entire catalog by default because it fans out to 13 model calls per track.

Outputs:

- Track-level risk matrix.
- Sync-fit shortlist.
- Content advisory flags.
- Sample/interpolation watchlist.
- Metadata completeness table.

Placement:

- If the deals plugin is the active packaging direction, this can live in `plugins/deals/skills/`, but keep the skill name `recoup-song-catalog-auditor` because the capability is song/audio analysis.
- If shipped as a public top-level skill, keep it generic and avoid deal-room assumptions.

Why it matters:

It turns Music Flamingo into a diligence workflow, which is more valuable than one-off analysis for catalog buyers.

## Call Patterns for Skills

### CLI preferred path

```bash
recoup songs presets --json
recoup songs analyze --preset catalog_metadata --audio "$AUDIO_URL" --json
recoup songs analyze --preset full_report --audio "$AUDIO_URL" --json
recoup songs analyze --prompt "Focus on vocal mix issues and mono compatibility." --audio "$AUDIO_URL" --json
```

### REST fallback

```bash
if [ -n "$RECOUP_API" ]; then
  API_BASE="${RECOUP_API%/}"
else
  RAW_API_URL="${RECOUP_API_URL:-https://recoup-api.vercel.app}"
  API_BASE="${RAW_API_URL%/api}/api"
fi

if [ -n "$RECOUP_ACCESS_TOKEN" ]; then
  AUTH=(-H "Authorization: Bearer $RECOUP_ACCESS_TOKEN")
elif [ -n "$RECOUP_API_KEY" ]; then
  AUTH=(-H "x-api-key: $RECOUP_API_KEY")
else
  echo "Missing RECOUP_ACCESS_TOKEN or RECOUP_API_KEY"
  exit 1
fi

curl -sS -X POST "$API_BASE/songs/analyze" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg audio "$AUDIO_URL" '{preset:"catalog_metadata", audio_url:$audio}')" | jq
```

### MCP path

When the host exposes Recoup MCP tools, call:

```json
{
  "name": "analyze_music",
  "arguments": {
    "preset": "catalog_metadata",
    "audio_url": "https://example.com/song.mp3"
  }
}
```

Do not include `account_id`.

## Recommended Rollout

### PR 1: Docs and setup cleanup

- Fix `docs/cli.mdx` to say current presets require audio.
- Add `analyze_music` to `docs/mcp.mdx`.
- Fix `skills/skills/recoup-setup/SKILL.md` so it no longer says Recoup has no MCP integration.
- Decide canonical API host and update examples consistently.

### PR 2: Core skill

- Add `skills/skills/recoup-song-analyzer/SKILL.md`.
- Add `references/presets.md`.
- Optionally add `scripts/analyze_music.py`.
- Update `skills/README.md`.
- Validate skill packaging/portability.

### PR 3: High-value workflow skills

Add:

- `recoup-song-metadata-tagger`
- `recoup-song-lyrics-transcriber`
- `recoup-song-playlist-pitch-maker`
- `recoup-song-sync-brief-maker`
- `recoup-song-mix-feedback-reviewer`

Each should be self-contained. Do not make them depend on `recoup-song-analyzer`; copy the small API call contract or vendor a generated reference into each skill.

### PR 4: Workspace/release integrations

Add:

- `recoup-song-ar-reviewer`
- `recoup-song-release-brief`

Coordinate with `artist-workspace` and `release-management` conventions for where outputs are saved.

### PR 5: Catalog/deals integration

Add `recoup-song-catalog-auditor`.

Also add a batch helper so the skill can run selected presets across many audio URLs without hand-rolled shell loops.

### Product follow-up: local audio files

The endpoint is URL-only. To make skills feel complete, add one of:

- CLI: `recoup songs analyze --file ./song.mp3 --preset catalog_metadata`
- REST: multipart upload support directly on `/api/songs/analyze`
- Helper: `recoup files stage ./song.mp3` returning a temporary public blob URL

Until then, skills should be honest: they need a public audio URL.

## Verification

Focused endpoint test run from `api` on 2026-06-03:

```bash
pnpm test lib/flamingo
```

Result: 7 test files passed, 65 tests passed.
