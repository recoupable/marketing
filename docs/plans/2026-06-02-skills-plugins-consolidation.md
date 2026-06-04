# Skills × Plugins Consolidation + Website Ship Plan

> **Status:** Website track (Part A) SHIPPED. Architecture (Part D) RESOLVED + REFINED 2026-06-02 — simplest design: **one public skills library + self-contained rich plugins + one registry; every skill authored once; plugins never copy library skills (they inline API usage).** No submodules, no sync, no build step. Ready to expand into an implementation plan.

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
- **Plugins / marketplace** (section) = native bundles that add **commands, subagents, and the deeper API-backed research & catalog workflows**, packaged for Claude Code, Cowork, and Codex. Cursor stays covered by the portable open-skills install until its plugin packaging path is verified.

Why this is safe: it describes the two by **what the user gets** (portable skills vs. richer native bundles), not by **where the files live**. Whatever we decide in Part D, this stays true.

## A.2 Decision for the hero (the original question)

**Keep `npx skills add recoupable/skills` as the hero install.** It is the lowest-friction, most universal entry point and matches the surface chips (Claude/Cursor/API/MCP/Chat) and the "bring your own agent" line. The marketplace stays as the section beneath it, representing the *deeper* capabilities — not a parallel copy of the same thing.

## A.3 Concrete website tasks

**Task A1 — Reframe the marketplace section so it reads as "deeper," not "duplicate."**
- Modify: `marketing/lib/copy/platform.ts` (the `plugins` block, lines ~50–77).
- Sharpen `plugins.description` to emphasize the delta over raw skills, e.g.:
  > "Native bundles for Claude Code, Cowork, and Codex — the open skills **plus** commands, subagents, and deeper API-backed research and catalog workflows. Add the marketplace once, then install any plugin."
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
| **5. Rationalize topology** ⭐ | Collapse 3 registries → 1; delete duplicate platform/content skill copies; rich plugins stay self-contained (inline API usage, never copy library skills) | ✅ for the duplicates | low-medium | fewer repos, no machinery | medium |

⭐ **Chosen** — see refined approach in Part D. Options 2 (submodule/sync) and 4 (build step) were rejected because they solve a non-problem: plugins don't need to re-bundle library skills (they inline what they need).

**Cross-cutting cleanup (do regardless of option):** retire/redirect the stale `recoupable/plugins` registry and repoint the monorepo `plugins/` submodule at `recoupable/marketplace`; fix the open repo's README ↔ folders mismatch.

---

# PART D — Decision (RESOLVED, vendor-grounded)

**Decided 2026-06-02.** The earlier "packaging vs. product tier" question is resolved by how Anthropic and OpenAI define these primitives — and they define them identically.

**Anthropic (Claude Code):** a skill is "the most flexible extension… a markdown file"; a plugin is **"the packaging layer"** that bundles skills + hooks + subagents + MCP for sharing/versioning/marketplace distribution. ([features-overview](https://code.claude.com/docs/en/features-overview), [skills](https://code.claude.com/docs/en/skills))

**OpenAI (Codex):** **"Skills remain the authoring format; plugins are the installable distribution unit."** ([skills](https://developers.openai.com/codex/skills), [plugins](https://developers.openai.com/codex/plugins))

Both consume the **same open Agent Skills standard** (`SKILL.md`), so one skill works across both ecosystems.

### Conclusion

1. **A plugin is packaging, not a tier.** There is no "packaging tier" to preserve. The duplicate generic skills hand-copied into `recoup-platform-plugin` / `recoup-content-plugin` are an anti-pattern by both vendors' own definitions.
2. **"API-backed" is a per-skill property, not a plugin property.** Research and catalog skills call the (paid/gated) Recoup API today; **content can be API-backed too** — those endpoints exist, the skills just haven't been authored yet. So the split is NOT "shallow open skills vs. deep plugin skills." It's: *every skill is authored once, and some skills call the paid API.*
3. **The only real "tier" is commercial, and it's gated at the API** (the key the skill calls), independent of which channel ships the skill.

### Chosen approach (final, 2026-06-02): ONE repo — library + plugins + registry in one tree

Two reasoning passes simplified this twice. **Pass 1** killed the referencing machinery: the broken assumption was *"a plugin must re-bundle the generic skills it uses."* It doesn't — the real `recoup-artist-research` skill is self-contained, it **inlines** its API usage (base URL, `x-api-key`, endpoints) and does not depend on the `recoup-api` skill. So plugins never copy library skills → no submodules, sync, or build step. **Pass 2** killed the multi-repo split: the three reasons to keep research/catalog as separate repos all failed — clone weight is negligible (a few MB of markdown/scripts; large fixtures get `.gitignore`d), per-plugin semver is YAGNI for a small team, and the catalog moat is the **API + data room, not the `SKILL.md`** (so the skills can be public like everything else). The only thing that would force a separate repo is a genuinely **closed-source** plugin.

**The architecture — a single repo that is library, plugins, and registry at once:**

```
recoupable/skills/
├── skills/                          ← the open library (flat). `npx skills add` reads this.
│   └── <skill>/SKILL.md  …
├── plugins/                         ← rich bundles as folders, each self-contained
│   ├── research/{.claude-plugin,.codex-plugin}/plugin.json + skills/ commands/ agents/ evals/
│   └── catalog/{.claude-plugin,.codex-plugin}/plugin.json + skills/ commands/ agents/ hooks/
├── .claude-plugin/marketplace.json  ← lists library + research + catalog by relative ./path
└── .agents/plugins/marketplace.json ← same, for Codex
```

**All install paths work from this one repo:**
- `npx skills add recoupable/skills` → installs the top-level `skills/` library.
- `/plugin marketplace add recoupable/skills` → lists library + research + catalog; install any (Claude Code supports relative-path plugin sources in a registry repo — the old `recoupable/plugins` already did this with `"source": "./music-catalog-diligence"`).
- Codex reads `.agents/plugins/marketplace.json`; Cursor adds the repo.

**Four rules (zero machinery):**
1. A skill's `SKILL.md` exists in **exactly one** folder.
2. A plugin **never copies** a library skill — it inlines what it needs (as research already does).
3. **Public/generic/lightweight → `skills/`. Rich domain bundle → `plugins/<name>/`. Closed-source → its own private repo** (the only reason to leave the monorepo). Not "API-backed vs not" — that never matters.
4. **One** repo, **one** registry.

**Why one repo wins:** one CI, one README, one PR surface, no submodule-pointer churn; author-once is enforced by the filesystem (every `SKILL.md` is one folder in one tree). Earlier objections to a monorepo (clone weight, versioning) were overweighted; the build step and submodule approaches solved a non-problem.

**Migration from today:**
- **Merge** `recoup-research-plugin` + `recoup-catalogs-plugin` repos into `plugins/research/` and `plugins/catalog/` folders of `recoupable/skills`.
- **Delete `recoup-platform-plugin`** — 100% duplicate of the library (skills + README, no commands/agents).
- **Fold** content's generic skills (`content-creation`, `short-video`) into `skills/`; keep a `plugins/content/` only if it has real commands/agents.
- **One `marketplace.json`** pointing at relative paths; retire `recoupable/plugins` AND the separate `recoupable/marketplace` registry; repoint the monorepo `plugins/` submodule (or drop it in favor of `skills`).
- **Gate premium at the API key**, not at packaging or repo location.
- Fix the README ↔ folders mismatch + add a CI check that fails when they disagree.
- **Verify during execution:** whether `npx skills` reads only top-level `skills/` or recurses into `plugins/*/skills/`. Either behavior is fine (library-only vs install-everything); not a blocker.

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

## Catalog → Deals rename + naming cleanup (DONE 2026-06-02)

**Verdict (shipped):** renamed plugin `catalog` → `deals` ("Recoup Deals"). The job is *executing deals*; the catalog is the asset. Skills already wrote to `deals/{deal-id}/`; marketplace keywords already included `catalog-deals`.

**Decisions locked (user vote 2026-06-02):**
- **Path A — skills-only.** Dropped all `commands/*.md`; slash commands are auto-exposed from skill names. Maximizes cross-harness portability.
- **Plugin = "Recoup Deals"** (`recoup-deals-plugin`), dir `plugins/deals/`.
- **Singular `recoup-deal-*`** — the user analyzes one deal at a time.
- **Plain-English, self-evident slugs** (final naming pass) — names optimize purely for "a busy user reads the slash menu and knows what each does," not grammar consistency. The full-run orchestrator is `recoup-deal-get-started` (the one entry point users actually invoke; workspace-setup-only is not a thing anyone runs standalone).

**Problem this solved:** the 17 catalog skills were two indistinguishable layers — 9 command skills + 8 library skills — with two prefixes and 3 near-twin stub↔logic collisions (`catalog-analyze`↔`catalog-analysis`, `catalog-kickoff`↔`deal-kickoff`, `catalog-package`↔`ic-memo-package`). Path A removes the stub layer entirely; the 3 collisions merged into single skills. Result: **17 → 14 skills**, one prefix, no layer ambiguity.

**Final map (executed):**

| Was (catalog) | → Final slug | Note |
|---|---|---|
| `recoup-catalog-deal` | `recoup-deal-get-started` | orchestrator (full run) |
| `recoup-catalog-kickoff` + `recoup-deal-kickoff` | `recoup-deal-workspace-setup` | **merged** |
| `recoup-catalog-analyze` + `recoup-catalog-analysis` | `recoup-deal-valuation-analyzer` | **merged** |
| `recoup-catalog-package` + `recoup-ic-memo-package` | `recoup-deal-memo-maker` | **merged** |
| `recoup-catalog-ingest` | `recoup-deal-data-cleaner` | rename |
| `recoup-catalog-dashboard` | `recoup-deal-dashboard-creator` | rename |
| `recoup-catalog-qc` | `recoup-deal-quality-checker` | rename |
| `recoup-catalog-report` | `recoup-deal-report-generator` | rename |
| `recoup-catalog-demo` | `recoup-deal-demo-run` | rename |
| `recoup-royalty-audit` | `recoup-deal-royalties-auditor` | rename |
| `recoup-rights-review` | `recoup-deal-rights-reviewer` | rename |
| `recoup-financing-underwrite` | `recoup-deal-financing-underwriter` | rename |
| `recoup-seller-prep` | `recoup-deal-seller-prep` | rename |
| `recoup-post-close-admin` | `recoup-deal-post-close-admin` | rename |

**Slug naming rule (locked):** Path A auto-exposes each skill `name` as the slash command, so the slug must be understandable on its own (the `description` carries trigger phrases). **One rule: optimize each name so a busy user reading the slash menu instantly knows what it does — clarity over grammar consistency.** Use descriptive object+role names (`valuation-analyzer`, `dashboard-creator`, `memo-maker`, `report-generator`, `data-cleaner`, `quality-checker`, `rights-reviewer`, `royalties-auditor`, `financing-underwriter`); only stay terse when the bare word is already plain-English (`seller-prep`, `post-close-admin`). The full pipeline is `get-started` because that is the natural "begin here" entry. Bare nouns that left the reader guessing (the old `check`) were the failure mode this pass fixed.

**Surface touched:** skill dirs + `name:` frontmatter, deleted `commands/`, all 3 `plugin.json` variants + both `marketplace.json`s (name/displayName "Recoup Deals", `commands` key removed), `scripts/vendored.json` copy paths, cross-skill body references, eval `skill_name` fields, and de-`Catalog`-ed all skill H1 headers. Also fixed a prior global-replace that had corrupted the `seller-prep` **workflow enum** value to `recoup-seller-prep`.

**Verified green:** `check_vendored.py` (92 copies / 26 groups), `validate_manifests.py` (13 files, dual-manifest parity), `portability_lint.py` (39 skills portable). Worktree-wide sweep: zero lingering `recoup-catalog-*` / `plugins/catalog` references; runtime smoke confirmed vendored scripts' sibling imports resolve.

---

## 14 → 6 workflow-stage fold (DONE 2026-06-03)

**Verdict (shipped):** collapsed the 14 deal skills into **6 workflow-stage skills**. The user's priority shifted from per-skill trigger words to *customer experience in the slash menu* — fewer, broader steps that read as a natural workflow. Most users only run the orchestrator anyway, so granular skills became modes, parameters, and bundled reference playbooks inside the survivors.

**Final 6 skills:**

| Skill | Stage | Absorbed |
|---|---|---|
| `recoup-deal-start` | orchestrator + setup | `recoup-deal-workspace-setup`; carries deal-type modes (buy-side / seller-prep / financing / post-close) |
| `recoup-deal-ingest` | data-room normalization | (rename of `data-cleaner`) |
| `recoup-deal-analysis` | rights + royalty + valuation diligence | `rights-reviewer`, `royalties-auditor`, `financing-underwriter`, `seller-prep`, `post-close-admin` → bundled as `references/*.md` playbooks |
| `recoup-deal-dashboard` | DASHBOARD.html + pre-share QC gate | `quality-checker` (run-deal-checks battery) |
| `recoup-deal-report` | memo + shareable PDF | `memo-maker` (owns written narrative + packages) |
| `recoup-deal-demo` | end-to-end on synthetic data | (rename of `demo-run`) |

**Technique:** "modes + bundled references." Deal-type-specific logic became a `--workflow` parameter on `start` that selects an analysis deep-dive + report package; the folded skills' prose moved into the survivor's `references/` (progressive disclosure), their evals merged (ID-prefixed) into the survivor's `evals.json`, and their vendored scripts/templates re-pointed at the survivor via a slug-remap of `vendored.json` (self-copies dropped, copies deduped — auto-deriving the correct closure).

**Surface touched:** 6 survivor dirs renamed (`git mv`); 8 absorbed dirs `git rm`'d; analysis gained `rights-review / royalty-audit / financing-underwrite / seller-prep / post-close-admin / red-flags` references; dashboard gained the QC-gate section + validator scripts; report gained the memo-assembly section + memo templates; `start` rewrote phases (setup folded in, sub-skill calls renamed, deal-type modes table, escape hatches → 6); `hooks.json` Gate B fixed (removed the `workspace-setup→start` collision from the single-phase list); plugin `README.md` command + skill tables rewritten from the mechanically-collapsed duplicates to the true 6.

**Verified green:** `portability_lint.py` (31 skills portable), `check_vendored.py` (85 copies / 25 groups), `validate_manifests.py` (13 files, dual-manifest parity). Worktree + repo-wide sweep: zero lingering old deal slugs (`get-started`, `data-cleaner`, `valuation-analyzer`, `dashboard-creator`, `report-generator`, `demo-run`, `workspace-setup`, `quality-checker`, `memo-maker`, `rights-reviewer`, `royalties-auditor`, `financing-underwriter`).

---

## Appendix — commands used to gather evidence

```bash
ls -1 skills/skills/                      # open repo skills
ls -1 plugins/*/skills                    # plugin skills
diff -rq skills/skills/artist-workspace plugins/recoup-platform-plugin/skills/artist-workspace   # → identical
cat skills/README.md skills/.claude-plugin/marketplace.json   # open repo is itself a marketplace
cat plugins/README.md plugins/.gitmodules # stale registry (music-catalog-diligence only)
```
