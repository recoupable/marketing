# AGENTS.md

Guidance for AI agents working in the Recoupable **marketing** repo.

## Repo purpose

This repo contains the marketing site (Next.js), content (blog, copy, SEO), and supporting context used for GTM, positioning, and all marketing output.

---

## Transcripts folder

### Location and purpose

- **Path:** `transcripts/`
- **Purpose:** Store call transcripts (engineering, customers, leads) so they can be used as **context for marketing work** — positioning, copy, GTM funnels, assets, videos, lead magnets, blogs, posts, etc.

When working on marketing copy, positioning, or GTM assets in this repo, **read relevant transcripts** for voice-of-customer, pain language, proof points, and decisions.

### Naming convention: `subject-date.md`

**All transcript files must use this format:**

```
<subject>-<YYYY-MM-DD>.md
```

- **Subject:** Short, lowercase slug describing the call (e.g. `customer-acme`, `lead-demo-indie-label`, `eng-positioning-sync`). Use hyphens; no spaces.
- **Date:** ISO date of the call: `YYYY-MM-DD`.

**Examples:**

- `customer-acme-2026-03-18.md`
- `lead-demo-indie-label-2026-03-17.md`
- `eng-positioning-sync-2026-03-16.md`

**Why this format:**

- **Recency:** Filenames sort by date; the same subject over time (e.g. `eng-positioning-sync-2026-03-16.md`, `eng-positioning-sync-2026-03-18.md`) makes the **most recent** transcript obvious.
- **Grep-friendly:** You can `grep` across `transcripts/` for decisions, keywords, or context and quickly see which file (and date) they came from. Prefer this over one big blob of transcripts.

### When the user gives you a transcript

1. **Create a new file** in `transcripts/` (do not append to an existing file unless the user asks).
2. **Name it** using the convention above: `subject-date.md`. Infer subject from the call (e.g. customer name, “lead demo”, “eng positioning”) and use the call date; if no date is given, use today’s date.
3. **Paste the transcript** into the file. Optionally add a one-line heading with subject and date.
4. **Commit** the new file so it’s versioned and easy to grep later.

### Finding current context

- **Most recent transcripts:** List or sort files in `transcripts/` by name; later dates = more recent.
- **Decisions or themes:** `grep -r "decision\|we decided\|agreed\|positioning\|pain" transcripts/` (or similar terms) to find the latest, most relevant context for copy and positioning.

---

## Other context

- **Brand/positioning:** See `content/brand/` and related context files (e.g. positioning, voice, audience) referenced in this repo.
- **Copy:** Site and campaign copy often lives in `lib/copy/` or content modules; keep voice and positioning consistent with brand docs and transcripts.
