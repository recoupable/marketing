# Skills × Plugins Consolidation + Website Ship Plan

> **Status:** DRAFT — needs one decision from Sidney (see Part D) before the consolidation track starts. The website track (Part A) can ship immediately and does **not** depend on that decision.

**Goal:** Ship the marketing site fast *without* baking in a skills/plugins story we'll have to redo, and separately fix the real problem — our skills and plugins are drifting because the same skill content is hand-maintained in multiple repos.

**Approach:** Decouple. Treat "ship the website" and "fix the drift" as two independent tracks. The website uses framing that is true under every possible consolidation outcome, so launch is never blocked on the architecture call.

**Scope:** Cross-repo. Touches `marketing/` (website), and — for the consolidation track — `recoupable/skills`, `recoupable/marketplace`, `recoupable/plugins`, and the four plugin repos.

---

## TL;DR

1. **The drift is real and already happening** — not just across repos, but *inside* the open skills repo (its README lists `chartmetric`/`songwriting`/`brand-guidelines`, but the folders are `chart-metric`/`song-writing` and there's no `brand-guidelines` dir). Across repos, `recoup-platform-plugin` and `recoup-content-plugin` ship **byte-identical copies** of open skills (verified with `diff` — zero differences).
2. **Skills and plugins are NOT redundant in purpose.** A *skill* is a `SKILL.md` folder. A *plugin* bundles skills **+ commands + subagents + hooks + evals** and installs through a runtime's plugin system. A skill is a strict subset of a plugin. The redundancy is only in the *duplicated skill files*, not in the two distribution mechanisms.
3. **The real differentiators live only in plugins** — the `recoup-research-*` (API-backed) and `recoup-catalog-*` (M&A diligence) skills don't exist in the open repo at all.
4. **We have three overlapping registries** (`recoupable/skills` is itself a marketplace; `recoupable/plugins` is the old registry; `recoupable/marketplace` is the new one). That alone is a cleanup.
5. **Website ships now.** Architecture decision happens on its own clock.

---

# PART A — Ship the website now (no dependency on the architecture decision)

The only place the website touches this topic is *how it describes* skills vs. plugins. We can describe them in a way that's correct regardless of how we consolidate the repos later.

## A.1 The framing that survives any outcome

- **Open skills** (hero, `npx skills add recoupable/skills`) = portable skills you drop into *any* agent — Claude, Cursor, Codex, your own stack. The universal quick start.
- **Plugins / marketplace** (section) = native bundles that add **commands, subagents, and the deeper API-backed research & catalog workflows**, packaged for Claude Code, Cowork, Codex, and Cursor.

Why this is safe: it describes the two by **what the user gets** (portable skills vs. richer native bundles), not by **where the files live**. Whatever we decide in Part D, this stays true.

## A.2 Decision for the hero (the original question)

**Keep `npx skills add recoupable/skills` as the hero install.** It is the lowest-friction, most universal entry point and matches the surface chips (Claude/Cursor/API/MCP/Chat) and the "bring your own agent" line. The marketplace stays as the section beneath it, representing the *deeper* capabilities — not a parallel copy of the same thing.

## A.3 Concrete website tasks

**Task A1 — Reframe the marketplace section so it reads as "deeper," not "duplicate."**
- Modify: `marketing/lib/copy/platform.ts` (the `plugins` block, lines ~50–77).
- Sharpen `plugins.description` to emphasize the delta over raw skills, e.g.:
  > "Native bundles for Claude Code, Cowork, Codex, and Cursor — the open skills **plus** commands, subagents, and deeper API-backed research and catalog workflows. Add the marketplace once, then install any plugin."
- Keep the four items; make `Research` and `Catalog deals` explicitly "API-backed" / "buy-side" so the unique value is legible.

**Task A2 — Add a one-line connector between the two installs.**
- Modify: `marketing/app/platform/page.tsx` (hero install callout).
- Under the hero command, add a subtle link: "Prefer ready-made bundles? Browse the plugins marketplace ↓" anchoring to `#plugins`.

**Task A3 — Verify the hero command actually resolves.**
- `recoupable/skills` resolves 200 (confirmed in `marketing/docs/userjourney/_link-verification.md`), and the `skills` CLI maps `recoupable/<x>` → `github.com/recoupable/<x>`. The repo's own README documents `/plugin marketplace add` + manual clone but NOT `npx skills add` — confirm `npx skills add recoupable/skills` works end-to-end before relying on it as the hero. If it doesn't, fall back to `/plugin marketplace add recoupable/skills`.
- Files that hardcode it: `marketing/lib/copy/developers.ts:10`, `marketing/app/page.tsx:23`, `marketing/app/platform/page.tsx:15`.

**Task A4 — Build + lint + visual check.**
- Run: `pnpm --filter marketing build && pnpm --filter marketing lint` (or `cd marketing && pnpm build && pnpm lint`).
- Visual check `/platform` in light + dark; confirm hero → marketplace anchor scroll works.

**Task A5 — Commit to the active feature branch (`feat/research-consulting-site`).**

**Done = the site is shippable.** Everything below is a separate track.

---

# PART B — The drift problem (evidence)

## B.1 Inventory

**`recoupable/skills`** (open repo; installs via `npx skills add recoupable/skills` *and* `/plugin marketplace add recoupable/skills` — it is itself a marketplace). 13 skill folders:
`artist-workspace`, `chart-metric`, `content-creation`, `create-artist`, `getting-started`, `music-industry-research`, `recoup-api`, `release-management`, `setup-sandbox`, `short-video`, `song-writing`, `streaming-growth`, `trend-to-song`

**`recoupable/marketplace`** (new registry) — 4 plugins:

| Plugin | Skills | Overlap with open repo |
|---|---|---|
| `recoup-platform-plugin` | artist-workspace, create-artist, getting-started, recoup-api, setup-sandbox | **5/5 byte-identical copies** |
| `recoup-content-plugin` | content-creation, short-video, recoup-content-create | 2 identical copies + 1 new |
| `recoup-research-plugin` | 10 `recoup-*` (artist-research, audience-analysis, competitive-analysis, people-outreach, playlist-intelligence, release-pack, tiktok-per-song, trend-detection, web-intelligence, weekly-brief) | **All net-new**, API-backed |
| `recoup-catalogs-plugin` | 17 `recoup-catalog-*` / deal skills (ingest, royalty-audit, rights-review, ic-memo-package, financing-underwrite, seller-prep…) | **All net-new** |

**`recoupable/plugins`** (OLD registry, still the `plugins/` submodule in this monorepo) — README + `.gitmodules` list only `music-catalog-diligence`, but the working tree also contains the four newer plugin folders. The monorepo points at the stale registry.

## B.2 Evidence of active drift

- **Within the open repo:** README ↔ folder-name mismatches (`chartmetric` vs `chart-metric`, `songwriting` vs `song-writing`, README references `brand-guidelines` with no matching dir; README omits `create-artist`, `short-video`).
- **Across repos:** `diff -rq skills/skills/artist-workspace plugins/recoup-platform-plugin/skills/artist-workspace` → identical *today*. They will diverge the first time anyone edits one side, with no mechanism to catch it.
- **Three registries** (`skills`, `plugins`, `marketplace`) with overlapping membership and one (`plugins`) already stale.

## B.3 Skills in the open repo not packaged in any plugin

`chart-metric`, `music-industry-research`, `release-management`, `song-writing`, `streaming-growth`, `trend-to-song` — these exist only in the open repo. (Note: `music-industry-research` is the open/lite cousin of the deeper `recoup-research-*` plugin skills — likely intentional tiering, which matters for the decision below.)

---

# PART C — Options to fix the drift

The atomic unit across every channel is a `skills/<name>/SKILL.md` folder. Every distribution path (`npx skills add`, Claude Code marketplace, Codex, Cursor) just packages `skills/` differently. So the real question is **where each skill's canonical file lives** and **how channels assemble them**.

| Option | What it is | Drift safety | Effort | Contributor workflow | Distribution flexibility |
|---|---|---|---|---|---|
| **1. Status quo** | Keep editing copies in each repo | ❌ none (drift continues) | none | familiar | fine |
| **2. Skills repo = source of truth; plugins reference it** | Generic skills live once in `recoupable/skills`; platform/content plugins pull them (submodule/sync); research/catalog plugins keep their net-new skills | ✅ for generic skills | medium | edit generic skills in one place | good |
| **3. Plugins = source of truth; open repo is generated** | Each domain plugin owns its skills; `recoupable/skills` becomes a *generated* roll-up of the open-tier skills for `npx skills add` | ✅ | medium-high | edit in plugins, never in open repo | good |
| **4. One skills monorepo → multiple outputs** | All skills in one repo with a manifest mapping skill→tier/plugin; a build emits the open marketplace, each plugin bundle, and the registry | ✅✅ (eliminated) | high (upfront) | one PR, one place | best |
| **5. Rationalize topology** | Collapse 3 registries → 1; delete the duplicate platform/content skill copies (those plugins depend on / fold into the open tier) | ✅ for the duplicates | low-medium | fewer repos | medium |

**Cross-cutting cleanup (do regardless of option):** retire/redirect the stale `recoupable/plugins` registry and repoint the monorepo `plugins/` submodule at `recoupable/marketplace`; fix the open repo's README ↔ folders mismatch.

---

# PART D — Decision needed (one question)

The right option hinges on a single product question:

> **Is a "plugin" just packaging for skills, or is it a product tier (e.g., API-backed / premium) that's meant to diverge from the open skills?**

- **If plugins are just packaging** → there should be ONE source of truth and a build that emits both channels. **Option 4** (or Option 2 as a lighter first step) wins. Duplicated files are pure liability.
- **If plugins are a product tier** → divergence is intentional for the *deep* skills (`recoup-research-*`, `recoup-catalog-*`), and we only need to de-dupe the *generic* skills that got copied into `platform`/`content` plugins. **Option 2 or 5** wins, and we should stop copying generic skills into plugins at all.

**My recommendation (yours to overrule):** Plugins are a product tier *for the deep skills*, but the generic ones got copied by accident. So: **Option 2 now** (open `skills` = source of truth for generic skills; `platform`/`content` plugins reference rather than copy; `research`/`catalog` plugins keep owning their net-new skills), **leaving the door open to Option 4** later if plugin packaging becomes the primary channel. Pair it with the Part C cross-cutting cleanup (one registry, fix the README).

I'm flagging this as a recommendation, not a conclusion — the decision is yours and changes the work below.

---

# PART E — Sequencing

| Track | When | Blocks launch? | Owner |
|---|---|---|---|
| **A. Website** (A1–A5) | This week | — | marketing |
| **D. Decision** (one question) | Async, whenever | No | Sidney |
| **B/C. Consolidation** (chosen option + registry cleanup) | After the decision | No | platform |

- The website ships on Track A regardless of D.
- Once D is answered, expand Part C's chosen option into its own bite-sized implementation plan (TDD where there's tooling — e.g., a sync/build script gets tests; a "no duplicate skill names across published channels" CI check).
- First consolidation PR regardless of option: **fix the open `skills` README ↔ folders drift** and **add a CI check that fails if README and `skills/` dirs disagree** — cheap, stops the most visible bleeding immediately.

---

## Appendix — commands used to gather evidence

```bash
ls -1 skills/skills/                      # open repo skills
ls -1 plugins/*/skills                    # plugin skills
diff -rq skills/skills/artist-workspace plugins/recoup-platform-plugin/skills/artist-workspace   # → identical
cat skills/README.md skills/.claude-plugin/marketplace.json   # open repo is itself a marketplace
cat plugins/README.md plugins/.gitmodules # stale registry (music-catalog-diligence only)
```
