# Skills & Plugins Packaging Landscape — Deep Reference

> **Status:** Reference doc (research output), 2026-06-02. Companion to `2026-06-02-skills-plugins-consolidation.md` (the decision/plan). This doc is the *evidence base* behind the plan: a deep read of how the frontier packs (gstack, compound-engineering, Anthropic FSI, OpenAI Codex marketplace, gbrain) are actually built and installed, what the `npx skills` CLI really does, traced user journeys for every install path, and concrete recommendations for making Recoup's skills+plugins cutting-edge **and** work for every user type and harness.
>
> **How this was built:** five parallel deep-dive agents each read both the analysis wiki page *and* the full source clone for one artifact, plus a sixth investigation of the `skills` CLI + an audit of our own consolidated worktree. Sources are the research wiki at `~/Documents/Projects/research/` (pattern + artifact pages) and the pinned source clones under `research/sources/`. Where a claim is inferred rather than executed, it's flagged.

---

## 0. TL;DR — the seven things that matter for us

1. **There is a convergent, cross-lab "skill core" and a divergent "distribution layer."** `SKILL.md` frontmatter + body + `references/`/`scripts/`/`assets/`, `hooks.json`, `.mcp.json`, and `marketplace.json` are now near-identical across Anthropic (`.claude-plugin/`) and OpenAI (`.codex-plugin/`). Author to that shared core and a skill runs on both with **zero transform** (proven by `superpowers`). The bets diverge only at connectors (`.app.json` hosted apps vs self-hosted `.mcp.json`), storefront metadata, and path variables. (`concepts/convergent-agent-plugin-spec`)
2. **There are exactly four ways to ship one capability to many surfaces** — and the frontier uses all four: **reference** (FSI: one prompt file, two runtimes), **convert** (CE: one Claude source → ~11 harnesses via a CLI), **run-native** (superpowers: same files, no copy), and **vendor** (FSI: copy the skill into each plugin, fail CI on drift). (`patterns/composition/single-source-multi-surface-distribution`)
3. **"Self-containment" is the load-bearing rule for portability.** Every serious pack that ships a skill into multiple places makes each skill reference **only its own directory** and **duplicates** shared files rather than cross-linking — then adds a **drift check** that fails the build if copies diverge (FSI `check.py`; CE byte-identical support-file tests). (`patterns/structural/thin-harness-fat-skills`, FSI, CE)
4. **`npx skills` and the Claude Code marketplace are two different channels** reading the same repo. The CLI ships **bare skills** (cross-harness, no commands/agents/hooks) and only discovers `skills/` + `.agents/skills/`-style dirs — **not** `plugins/*/skills/` unless the manifest declares them. The marketplace ships **whole plugins** (skills + commands + agents + hooks + scripts), Claude-Code-only.
5. **Our feared failure ("catalog skills installed bare without their scripts") does NOT happen on the default `npx skills add recoupable/skills`** — only the 14 self-contained library skills install. It **does** happen if anyone uses `--full-depth` or installs a single catalog/research skill by direct path: those break silently (missing `scripts/`, `templates/`, plugin-root `references/`).
6. **Version is the update-delivery trigger, and it must be release-automation-owned.** Installs are cached by version; hand-bumps cause delivery drift. FSI (pre-commit hook + CI `--check`) and CE (release-please + `linked-versions`) both forbid manual bumps. (`patterns/quality-bar/version-as-update-gate`)
7. **A pack compounds when every session raises the floor.** Tested skill bundles (markdown + code + unit/LLM/contract tests), a knowledge store that reloads into context (`docs/solutions/`), and resolver evals are what separate a real product from a folder of prompts. (`patterns/quality-bar/skill-pack-bundle`, `complexity-ratchet`)

---

## 1. The landscape at a glance

| Artifact | Creator | Shape | Install unit | Distribution mechanism | Self-contained skills? | Tests/evals | Cross-harness story |
|---|---|---|---|---|---|---|---|
| **anthropic/skills** | Anthropic | Marketplace, 3 plugins / 17 skills | plugin | marketplace-as-multi-plugin | yes (flat, no shared deps) | demo only | Claude Code (reference shape) |
| **gstack** | Garry Tan | git-clone skill monorepo, ~23 skills + tools | the whole repo (de-facto) | run-native + per-host **codegen** (`gen:skill-docs --host`) | **no** (skills need repo-root `bin/`, preamble, `browse/`) | ~158 test files; diff-gated paid E2E + resolver unit tests | 10 host adapters; full pack = Claude Code; others get artifacts/subsets |
| **compound-engineering** | Every / Kieran Klaassen | 2-plugin marketplace, 38 skills + 43 agents | plugin (native) **or** converter output | **convert** (parser → per-target writers) + native | **yes** (rule enforced + byte-identical support-file tests) | ~1,395 tests incl. behavioral contract tests | native (Claude/Cursor/Codex/Copilot/Droid/Qwen) + convert (OpenCode/Pi/Gemini/Kiro) |
| **anthropic/financial-services (FSI)** | Anthropic | Marketplace, 20 plugins | plugin (à-la-carte) | **vendor** (skill copied into each agent plugin) + **reference** (one prompt → Cowork plugin + Managed Agents API) | **yes** (vendored copies) | `check.py` drift gate; `validate.py` schema | dual *runtime* (plugin vs API), not dual *IDE* |
| **openai/plugins (Codex marketplace)** | OpenAI | Marketplace, 167 plugins / ~479 skills | plugin (à-la-carte) | run-native (skills) + hosted-connector (`.app.json`) | mixed (skill-only plugins yes; connector plugins need the hosted app) | `plugin-eval` meta-skill (token-budgeted scoring) | first non-Claude marketplace; productized storefront |
| **gbrain** | Garry Tan | One engine, three surfaces | per-surface | **single-source-multi-surface** (CLI + MCP + skillpack from one engine) | skillpack scaffolds self-contained copies | BrainBench, LongMemEval, `routing-eval.jsonl` + `check-resolvable` | CLI + MCP (any MCP client) + skillpack (OpenClaw/Hermes) |

**Read the table as two families:**
- **Marketplaces of many à-la-carte plugins** (anthropic/skills, FSI, Codex) — one repo, `marketplace.json` registers N independently-installable plugins.
- **One pack, many internal skills / surfaces** (gstack, gbrain, CE) — the install unit is the pack (or a per-surface emission), and the internal skills compose into a workflow.

Our repo is currently a **hybrid**: one library (à-la-carte skills via `npx skills`) + three rich plugins (à-la-carte via the Claude marketplace). That hybrid is legitimate and matches the convergent-spec direction — but only if the coupling is handled deliberately (§8–9).

---

## 2. The two-axis mental model

Everything below collapses into two axes. Put every design decision on this grid.

### Axis A — the convergent skill core vs the divergent distribution layer

```
SHARED CORE (author once, runs everywhere)        DIVERGENT BETS (branch per target)
────────────────────────────────────────         ──────────────────────────────────
SKILL.md frontmatter (name + "Use when…")          .app.json hosted connector  ── Codex
markdown body                                       vs self-hosted .mcp.json    ── both
references/ scripts/ assets/ (in-skill)             interface{} storefront block ─ Codex
hooks.json (PostToolUse/matcher/command)            ${CLAUDE_PLUGIN_ROOT} path var ─ Claude
.mcp.json (mcpServers{})                            agents/ semantics (subagent vs
marketplace.json (registry of N plugins)              presentation manifest)
                                                    per-harness tool names
                                                      (AskUserQuestion / ask_user / …)
```

Keep the **value** in the left column. Branch only where the right column forces you to. (`concepts/convergent-agent-plugin-spec` "What we'd steal": *author to the lab-agnostic core; treat the overlap as a portability checklist; use the divergences as a buyer's lens.*)

### Axis B — the coupling spectrum (how self-contained is a skill?)

```
BARE-INSTALLABLE  ───────────────────────────────────────►  PACK-COUPLED
(works if you copy just the skill dir)                       (needs sibling files)

library skills        FSI vendored        CE skills          research skills      catalog skills
(own scripts/+refs)   (copied per plugin) (own dir + dup     (../../references)   (plugin-root scripts/,
                                          support files)                          templates/, fixtures/,
                                                                                   cross-skill refs)
```

The further right a skill sits, the **fewer channels can ship it safely**. Bare-installable skills work through *every* channel (CLI, marketplace, à-la-carte, cross-harness). Pack-coupled skills work *only* through a channel that ships the whole tree (Claude marketplace) — and break silently otherwise.

**The single most important design lever we have is moving skills left on Axis B**, or being explicit about which channel each skill is allowed to ship through.

---

## 3. Distribution mechanics decoded

### 3.1 The four single-source → multi-surface mechanisms

| Mechanism | Who | How it works | Drift guard | Use when |
|---|---|---|---|---|
| **Reference** | FSI | One canonical prompt file; `agent.yaml` points at it (`system.file`) and `from_plugin:` pulls skills at deploy | `check.py` resolves all refs | Two runtimes, same org, shared source tree |
| **Convert** | CE | `parsers/claude.ts` reads Claude format once; `converters/claude-to-*.ts` + `targets/*.ts` emit per-harness trees | `release:validate` keeps 3 manifests in parity | Target harness is **outside** the convergent grammar (Gemini, Kiro, Pi) |
| **Run-native** | superpowers (Codex) | Same `SKILL.md` files live in both ecosystems; per-harness tool names handled by `references/*-tools.md` sidecars | identity — one tree, no copy | You stay inside the convergent core (skills/hooks/mcp/marketplace) |
| **Vendor** | FSI | Author skill once in a "vertical" plugin; **copy** it into each consuming agent plugin so each install is self-contained | `check.py` `filecmp.dircmp` fails CI on any diff | À-la-carte installs must each work standalone |

**The punchline:** prefer **run-native** (cheapest, zero machinery) when you stay in the shared core. Use **vendor** when you need à-la-carte plugins to each stand alone. Use **convert** only for harnesses outside the grammar. Use **reference** when one org owns the whole tree and ships to multiple runtimes.

### 3.2 The two install channels (this is the crux for us)

| | `npx skills add` (Vercel Labs `skills` CLI, v1.5.9) | Claude Code marketplace (`/plugin marketplace add`) |
|---|---|---|
| **Unit** | individual **skills** | whole **plugins** |
| **Discovers** | root `skills/`, `skills/.curated/`, `.agents/skills/`, `.claude/skills/`, `.cursor/skills/`… (walks 1–2 levels). **NOT `plugins/*/skills/`** unless the manifest declares `"skills": [...]`, or `--full-depth` | every plugin in `.claude-plugin/marketplace.json`; installs the plugin's entire `source` dir |
| **What lands** | just the skill dir(s) → symlinked into the agent's skills dir | full plugin tree (skills + commands + agents + hooks + scripts + references) |
| **Commands/agents/hooks** | **not installed** | **installed** (work natively) |
| **Cross-harness** | yes — 55+ agents | Claude Code only |
| **Install-all / one** | `--all` / `--skill '*'`; one via `--skill <name>` or direct GitHub path | pick plugins from the registry list |
| **Best for** | portable, self-contained skills | coupled plugins that need their sibling files |

**Key mechanism:** the CLI installs a **single canonical copy** (`~/.agents/skills/<name>`) and **symlinks** it into each detected agent's dir (`~/.cursor/skills/`, `~/.claude/skills/`). Verified locally on this machine. `--copy` makes independent copies instead.

---

## 4. Per-artifact findings (condensed; full reports in agent transcripts)

### 4.1 gstack — the "skills as versioned software" extreme
- **Install:** `git clone … ~/.claude/skills/gstack && ./setup`. No `plugin.json`, no `npx skills`, no marketplace. `./setup` builds compiled CLIs (`browse`, `design`, `make-pdf`), installs Playwright, and **fans out** each skill to a top-level `~/.claude/skills/<name>/` with only `SKILL.md` symlinked.
- **Codegen pipeline:** edit `*/SKILL.md.tmpl` → `bun run gen:skill-docs --host <harness>` → generated `SKILL.md`. `scripts/resolvers/` is a registry of ~50 placeholder generators (`{{PREAMBLE}}`, `{{REVIEW_ARMY}}`, …) tiered by `preamble-tier: 1–4`. **Never hand-edit generated files.**
- **Routing:** description-as-resolver (rich multi-line descriptions + voice triggers + `(gstack)` suffix) + a heavy per-invocation bash preamble. **No** gbrain-style `RESOLVER.md`/`check-resolvable`; routing is guarded by **resolver unit tests** (cheap) + diff-gated paid E2E.
- **Journeys:** install-all = a persona "virtual engineering team" (`/office-hours` → `/plan-*-review` → `/ship`) wired by shared preamble + `benefits-from:` DAG + artifact handoff + optional gbrain memory. **À-la-carte is name-only** — fan-out *looks* per-skill but every skill's preamble hardcodes `~/.claude/skills/gstack/bin/...`, so an isolated skill breaks. Cross-harness is first-class via `hosts/*.ts` (10 adapters), but full fidelity is Claude-Code; Codex/others get suppressed features or methodology-only subsets.
- **Steal:** persona naming, `benefits-from:` skill DAG, multi-tier skills (`/qa` Quick/Standard/Exhaustive = a cost dial = `skill-as-method-call`), `(gstack)` branding suffix, template+resolver codegen, diff-gated eval economics, `/scrape → /skillify` latent→deterministic loop.
- **Don't steal:** 80-line per-invocation bash preamble ("skill OS" — strains *thin* harness), ETHOS philosophy injection as a hard dependency, ~41 MB install for "just one skill."

### 4.2 compound-engineering — the "author once, convert many" reference
- **Install:** native marketplace on Claude/Cursor/Codex/Copilot/Droid/Qwen; `bunx @every-env/compound-plugin install … --to <opencode|pi|gemini|kiro>` for converter-only targets. Codex is a **hybrid** (native skills + a Bun step for custom agents until the spec supports them).
- **The converter (centerpiece):** `src/parsers/claude.ts` `loadClaudePlugin` reads the Claude tree once; `filterSkillsByPlatform` drops skills whose frontmatter `ce_platforms` excludes the target; `converters/claude-to-*.ts` + `targets/*.ts` emit per-harness trees. Content transforms rewrite tool/agent/slash references per target (`Task foo()` → `spawn_agent`/`$skill`, `.claude/` → `.codex/`, `AskUserQuestion` → `ask_user`). Sidecar `references/`/`scripts/`/`assets/` copy **verbatim** (vendoring).
- **Self-containment:** enforced by `AGENTS.md` ("a SKILL.md must only reference files within its own directory tree", no `../`, no absolute cache paths) + **byte-identical support-file tests** (`compound-support-files.test.ts`) that duplicate shared refs across skills and fail on drift. **Legacy-cleanup registries** (`STALE_*`, install manifests) sweep removed skills on upgrade.
- **Version-as-update-gate:** `release-please` + `linked-versions` ties CLI + plugin to one version; `extra-files` bumps all three plugin.json manifests together; hand-bumps forbidden (policy + CI). Recovery playbook in `docs/solutions/`.
- **Compounding:** `/ce-compound` writes a learning to `docs/solutions/` after each fix (5-dimension dedup-before-create: update existing doc rather than duplicate), and a Discoverability Check edits the project's `AGENTS.md` so fresh agents find the store. Built with itself: 27 brainstorms → 57 plans → 30 solutions. ~1,395 tests incl. behavioral **contract tests** that pin skill prose.
- **Journeys:** install-all (Claude) = 38 `/ce-*` orchestrator skills + 43 never-user-invoked `ce-*` subagents in the ideate→brainstorm→plan→work→review→compound loop. À-la-carte works (`/ce-debug` alone) but loses loop context and, on thin installs, loses subagents. Cross-harness = one source tree, native installs share the repo, converter targets get generated copies — no hand-forking, but a permanent **authoring tax** (tool-name fallbacks in every skill).
- **Steal:** `/ce-compound` shape (parallel latent research → single deterministic write → dedup → discoverability edit), "skills are guardrails not controllers; calibrate prescription to failure mode," `CLAUDE.md = @AGENTS.md` shim, mode tokens (`mode:headless`/`mode:autofix`), `disable-model-invocation` on beta skills, `ce-` namespace enforced by test.
- **Don't steal:** the converter unless you actually target harnesses outside the grammar (run-native is cheaper); the authoring tax if you only ship to Claude+Cursor+Codex.

### 4.3 Anthropic FSI — the multi-plugin marketplace + vendoring + trust tiers
- **Structure:** one repo, `marketplace.json` registers **20** à-la-carte plugins (7 vertical, 10 agent, 2 partner, 1 admin). Per-plugin `plugin.json` is minimal; components auto-discovered. Each plugin versioned independently (à-la-carte updates).
- **Vendoring + drift (centerpiece):** skills authored once under `vertical-plugins/*/skills/`; `sync-agent-skills.py` **copies** them into each consuming `agent-plugins/*/skills/`; `check.py` runs `filecmp.dircmp` and **fails CI** if any bundled copy drifts from source. This is *why* installing one agent plugin gives a fully working, self-contained tool.
- **Trust-tiered subagents (standout):** for untrusted-document workflows, a `reader` (only one that touches untrusted docs; tools = Read/Grep; **output bound to a length/charclass-restricted `output_schema`** so injected text can't survive) → `critic` (re-verifies against trusted MCPs only) → `resolver` (the **only** worker with Write; never reads outside files). Orchestrator wires them; `orchestrate.py` allowlists handoffs.
- **Dual runtime via reference:** the same `agents/<slug>.md` prompt powers the Cowork plugin and the Managed Agents API (`agent.yaml` `system.file` + `skills.from_plugin` + `append:` for headless output). Same source, two runtimes.
- **Version-as-update-gate:** `.githooks/pre-commit` runs `version_bump.py --apply` (auto-patch-bump changed plugins); CI runs `--check`.
- **Journeys:** install-all = ~20 separate installs (no "install all" command); `financial-analysis` first because it holds the MCP connectors. À-la-carte = one agent plugin works standalone (vendoring) but **does not** get the MCP pack unless you also install the core vertical. Dual-runtime = same prompt+skills, different packaging/tool-enforcement.
- **Steal:** marketplace-as-multi-plugin, **vendor + filecmp drift gate**, trust-tier table in the README ("bold leaf = only Write-holder"), structured-output-as-injection-defense, sibling-disambiguating descriptions ("…not for X; use Y for that"), provenance-first data hierarchy ("never use web search as a primary source"), `${ENV}` safe interpolation in deploy.
- **Don't steal:** the dual-runtime wrapper if you'll only ever have one consumer; empty `hooks.json` stubs; note the shipped `.mcp.json` is actually invalid JSON and `check.py` doesn't catch it — **validate your connector manifests**.

### 4.4 OpenAI Codex marketplace + gbrain — convergence + three-surface
- **Convergent spec:** `.codex-plugin/` ≈ `.claude-plugin/` — identical `hooks.json` grammar (figma's hook is valid Claude hook JSON verbatim), identical `SKILL.md` anatomy, same `.mcp.json` shape, same marketplace mechanism. Codex *adds* `.app.json` (hosted-app connector by opaque id, OAuth on install — 144/167 plugins) and a productized `interface{}` storefront block (category, brandColor, screenshots, `defaultPrompt`). `plugin-creator` even normalizes names via "skill-creator naming rules" → partly deliberate compatibility.
- **Two plugin shapes in one marketplace:** (A) hosted-app connector + skill (144/167; "app = capability, skill = competence"; skills have a "Step 0: connect the app" graceful-degradation preflight); (B) skill-only / build-kit (no `.app.json`, e.g. superpowers, plugin-eval). Plus 2 raw-MCP escape hatches. **No `INSTALLED_BY_DEFAULT`** — every plugin is à-la-carte; there is no "install all 167."
- **No-transform portability (proof):** `superpowers` ships the **same SKILL.md files** in both ecosystems; per-harness tool names live in `references/codex-tools.md` / `copilot-tools.md` sidecars; the body is shared. Contrast CE's converter — superpowers is cheaper because it stays in the convergent core and has no `.app.json`.
- **gbrain — one engine, three surfaces:** `src/core/engine.ts` + `operations.ts` (the contract) authored once; exposed as **CLI** (`bin: gbrain`, trusted `remote=false`), **MCP** (`gbrain serve` stdio / `--http` OAuth, untrusted `remote=true`), and **skillpack** (`gbrain skillpack scaffold` copies `skills/*` + `shared_deps` + `RESOLVER.md` into the host workspace; refuses to overwrite; no lockfile — user owns files). `openclaw.plugin.json` adds manifest extensions (`shared_deps`, `excluded_from_install`, `contracts.contextEngines`).
- **Routing:** explicit `skills/RESOLVER.md` dispatcher + `_brain-filing-rules.md` ("primary subject determines where it goes") + `routing-eval.jsonl` + `check-resolvable.ts` reachability audit. `AGENTS.md` (agent installer persona) is separate from `CLAUDE.md`. `[AGENT]` cost-matrix banner forces human-in-the-loop before cost-bearing config (25× spread). `llms.txt` + `llms-full.txt` for LLM discoverability.
- **Steal:** hosted-app connector binding as "integration as product," storefront metadata in the manifest, `policy.installation`/`authentication` vocabulary, connect-the-app Step-0 preflight, PostToolUse hook for invariants, `plugin-creator` meta-skill (scaffold + register + deeplink), gbrain's three-surface architecture, `RESOLVER.md` + `check-resolvable` for >~40 skills, `AGENTS.md`-separate-from-`CLAUDE.md`, underscore-prefixed universal rules, `llms.txt`/`llms-full.txt`.
- **Don't steal:** assume total portability (`.app.json` ≠ `.mcp.json`; `agents/` means different things per lab); hooks are 1/167 used — slot exists but barely exercised; "emerging" standard at n=2.

### 4.5 OpenAI Codex "for every role, tool, and workflow" — the role-as-plugin turn (2026-06-02)
*Source: [openai.com/index/codex-for-every-role-tool-workflow](https://openai.com/index/codex-for-every-role-tool-workflow/) (Jun 2, 2026), with the companion knowledge-work report [codex-for-knowledge-work](https://openai.com/index/codex-for-knowledge-work/) and [VentureBeat coverage](https://venturebeat.com/orchestration/openais-codex-update-lets-agents-build-interactive-enterprise-workspaces-via-sites-and-role-specific-plugins). Published the same day as this research — it directly extends §4.4.*

This is the productization beat after the §4.4 spec analysis: OpenAI moved from "167 à-la-carte plugins in a storefront" to **role-as-the-packaging-unit**, and made explicit the bundle composition we'd inferred.

- **The packaging unit is now the *role*, not the app.** Six role-specific plugins shipped: **data analytics, creative production, sales, product design, public equity investing, investment banking** (with Corporate Finance, Private Equity, Marketing Strategy, Strategy Consulting, and Legal "coming soon"). Each plugin **"bundles the relevant apps, skills, instructions, and workflows"** — together **62 apps + 110 skills** across the six. This confirms §4.4's "app = capability, skill = competence" framing and adds two layers: **instructions** and **workflows** travel *inside the plugin* too. The plugin is the unit a buyer recognizes ("I'm in sales") — apps/skills are implementation detail underneath.
- **"Works out of the box," then customize, then build-your-own.** Three tiers stated explicitly: (1) install the role plugin and it works; (2) "adapt them to their workflows"; (3) "build and share **custom plugins** for their own systems and processes." Plus the strategic line: *"we're building toward an **open ecosystem where partners can create and deploy their own plugins** directly in Codex and ChatGPT."* The storefront is becoming a third-party developer platform — same trajectory a Recoup marketplace would ride.
- **Sites — agent-generated, hosted, shareable web apps.** Codex now turns analysis/plans into interactive hosted pages (dashboards, planners, review workspaces, project boards, galleries) shareable by URL within a workspace, kept live as data changes. Preview for Business/Enterprise, hosted by OpenAI; partner ecosystem forming with **Vercel, Wix, Base44, Replit, Lovable, Figma, Webflow, Emergent**. This is a *new output surface* for a plugin's work — the artifact a skill produces can now be a living app, not just a file.
- **Annotations — point-and-refine on any artifact.** In-place editing (select a chart/nav-bar/claim → tell Codex what to change) extended from code/markdown to documents, spreadsheets, slides, and sites. The "iterate after the first draft" loop, now harness-native.
- **The demand signal that justifies all of it:** 5M+ weekly actives; non-developers (analysts, marketers, operators, designers, researchers, investors, bankers) are ~**20% of users and growing 3× faster than developers**. Fastest-growing tasks: data analysis, research, knowledge-artifact creation. Translation: the audience for *role-shaped, non-coding, tool-connected* agent packs is the fastest-growing segment — exactly Recoup's "label/manager/analyst," not just "engineer."

**What this changes for us (net-new vs §4.4):**
1. **Consider a role lens over (or alongside) our capability lens.** Today our plugins are capability-shaped (research, catalog/deals, content). Codex's bet is that **role-shaped bundles** ("for the A&R analyst," "for the label finance lead," "for the content marketer") convert better because the buyer self-identifies by role. Our existing plugins map cleanly onto roles — a thin re-presentation (role-named storefront entries that bundle the same apps+skills+instructions+workflows) may be higher-leverage than re-architecting.
2. **"Instructions + workflows" belong *in* the plugin bundle.** Validates packaging commands/agents/`AGENTS.md`-style instructions alongside skills — and is an argument for the rich Claude-marketplace channel for our coupled plugins, not just bare skills.
3. **An artifact surface (Sites-like) is now table stakes for "knowledge work" agents.** Recoup skills that produce dashboards/one-pagers (chart-metric, catalog analysis, research briefs) would benefit from a shareable hosted-artifact output, not just markdown. Flag as a product direction, not a packaging change.
4. **Open partner ecosystem is the destination.** Both Anthropic (FSI partners) and OpenAI now state the same goal: third parties publish plugins into the store. A Recoup marketplace should be designed so *labels/partners* can publish their own role/catalog plugins later — reinforces the manifest-validator + version-gate + self-containment recommendations in §9.

**Boundary:** Sites/annotations are Codex *product* features (hosted by OpenAI), not portable packaging primitives — don't model our distribution on them. The portable lesson is the **role-bundle** and the **open-ecosystem** direction.

---

## 5. User journeys — the matrix you asked for

For each ecosystem: **install-everything**, **à-la-carte (one capability)**, and **cross-harness**. This is the heart of "works for all types of users."

### 5.1 gstack
- **Install-all:** `git clone … && ./setup` → full persona team; optimized for the install-all user (flat slash namespace, sequential sprint narrative, team-mode sync). **This is the only well-supported journey.**
- **À-la-carte:** *not real* — isolating one skill breaks its preamble (`bin/` paths). Codex gets partial per-skill installs; OpenClaw gets a curated 4-skill subset.
- **Cross-harness:** designed (10 host adapters) but **fidelity degrades** off Claude Code.
- **Lesson for us:** a deeply-wired "team" optimizes the install-all user at the cost of à-la-carte. If we want à-la-carte to be real, we cannot couple skills to repo-root infrastructure the way gstack does.

### 5.2 compound-engineering
- **Install-all:** native marketplace install (Claude) → full ideate→…→compound loop; optimized for the install-all user.
- **À-la-carte:** works (`/ce-debug`), with graceful degradation (routes you to brainstorm/plan if scope is large; subagents may be missing on thin installs).
- **Cross-harness:** one source, native + converter; no hand-forking; authoring tax.
- **Lesson for us:** self-containment + a converter is what makes both install-all *and* à-la-carte *and* cross-harness all work. The price is the authoring discipline (no `../`, tool-name fallbacks, drift tests).

### 5.3 Anthropic FSI
- **Install-all:** ~20 separate installs, core vertical first (for MCP connectors); optimized for the power user wanting full surface area.
- **À-la-carte:** **first-class** — one agent plugin works standalone thanks to vendoring (but no MCP pack without the core vertical).
- **Cross-harness:** N/A as IDEs; instead dual *runtime* (Cowork plugin + Managed Agents API) from one prompt.
- **Lesson for us:** vendoring + drift-check is the cleanest way to make à-la-carte plugin installs each work standalone. This is the most directly applicable model for our catalog/research plugins.

### 5.4 OpenAI Codex marketplace
- **Install-all:** does not exist (no default-install); each plugin à-la-carte from a productized storefront.
- **À-la-carte:** the *primary* journey — browse store → install one → OAuth the hosted app → skill teaches the workflow (Step-0 preflight if connector missing).
- **Cross-harness:** skill-only plugins (superpowers) run-native on Codex + Claude; connector plugins do not port (hosted-app brokering).
- **Lesson for us:** à-la-carte + storefront metadata + "app = capability, skill = competence" is the modern consumer-install shape. Our marketplace.json `interface{}` block is the seed of this.

### 5.5 gbrain
- **Install-all:** one engine install (`bun install -g`) + three activation steps (init, scaffold, MCP config) — *not* one command for all three surfaces.
- **À-la-carte (single surface):** CLI-only, MCP-only, or skillpack-only — but skillpack alone isn't a working brain without the engine.
- **Cross-harness:** CLI (shell) + MCP (any MCP client) + skillpack (OpenClaw/Hermes).
- **Lesson for us:** if a capability has a runtime (like our API), the "one core, many surfaces" model (CLI + MCP + skill) is the ceiling to aim for — but each surface needs the core present.

### 5.6 Recoup today (audited) — the journeys that matter most
| Journey | Command | What lands | Works? |
|---|---|---|---|
| **Library, default** | `npx skills add recoupable/skills` | the **14 library skills only** (each self-contained) | ✅ clean, cross-harness |
| **Library, install-all** | `… --all` / `--skill '*'` | same 14 to all detected agents | ✅ |
| **Catalog plugin (full)** | `/plugin marketplace add recoupable/skills` → install `recoup-catalogs-plugin` | whole catalog tree (17 skills + scripts/templates/fixtures/refs/agents/commands/hooks) | ✅ on Claude Code; ⚠️ scripts use bare relative paths not `${CLAUDE_PLUGIN_ROOT}` (CWD-dependent) |
| **À-la-carte library skill** | `… --skill chart-metric` | one self-contained skill | ✅ |
| **À-la-carte plugin skill** | direct path to `plugins/catalog/skills/recoup-catalog-ingest` | bare skill dir, **no** scripts/templates/refs | ❌ silent runtime break |
| **`--full-depth`** | `… --full-depth` | recurses into `plugins/*/skills/`, surfaces ~27 coupled skills | ❌ coupled ones break |

**Coupling audit:** 15 bare-installable (14 library + content's 1 self-contained skill); 27 plugin-coupled (10 research → `../../references/*`; 17 catalog → plugin-root `scripts/`+`templates/`+`fixtures/`+`references/` + one cross-skill dep). Catalog plugins are only safe via the Claude marketplace channel today.

---

## 6. Patterns to steal, ranked (with wiki citations)

1. **★ Author to the convergent core; branch only at connectors.** (`concepts/convergent-agent-plugin-spec`) — our library skills already do this; extend the discipline to plugin skills.
2. **★ Vendor + drift-check for à-la-carte plugins.** (FSI `sync-agent-skills.py` + `check.py`; CE `compound-support-files.test.ts`) — the fix for our catalog/research coupling if we want their skills to ship through the CLI too.
3. **★ Self-containment rule + CI lint.** (`patterns/structural/thin-harness-fat-skills`; CE `AGENTS.md`) — "a SKILL.md references only its own directory; duplicate shared files, never cross-link," enforced by a test.
4. **★ Version-as-update-gate, release-automation-owned.** (`patterns/quality-bar/version-as-update-gate`; FSI hook, CE release-please) — never hand-bump; one automated bump per release.
5. **★ Skill-pack-bundle: a skill ships with tests.** (`patterns/quality-bar/skill-pack-bundle`) — markdown + thin code + unit/LLM/contract/resolver tests. Start with resolver/contract tests (cheap) before paid E2E.
6. **Resolver-routing-table + reachability audit** for when we exceed ~30–40 skills. (`patterns/composition/resolver-routing-table`; gbrain `RESOLVER.md` + `check-resolvable`) — not needed yet; flag the threshold.
7. **Compounding loop / knowledge store.** (`patterns/quality-bar/complexity-ratchet`; CE `/ce-compound` + `docs/solutions/`) — our `PROGRESS.md` is a seed; a `docs/solutions/`-style store would compound.
8. **Sibling-disambiguating descriptions + audience-segmented output + provenance hierarchy.** (FSI) — directly applicable to catalog/research skill descriptions.
9. **Storefront metadata + "app = capability, skill = competence."** (Codex) — our `.agents/plugins/marketplace.json` `interface{}` block; pair connector setup with a Step-0 preflight in API-backed skills.
10. **Mode tokens, `disable-model-invocation` on beta, namespace-by-test.** (CE) — cheap hygiene wins.

---

## 7. Boundaries — what NOT to steal (and why)

- **gstack's heavy per-invocation bash preamble** — strains "thin harness," adds latency/token cost; our skills should not require a "skill OS" to run. (`patterns/structural/thin-harness-fat-skills` "When NOT to use".)
- **A converter (CE-style)** — only worth it for harnesses *outside* the convergent grammar. We target Claude Code + Cursor + Codex, which share the core → prefer **run-native**. (`single-source-multi-surface` — *don't single-source when only one consumer / no build tooling acceptable.*)
- **Dual-runtime wrapper (FSI)** — dead weight unless we genuinely run the same capability on two runtimes. We don't yet.
- **Marketplace-as-multi-plugin at scale (20–167 plugins)** — we have 3 plugins + a library; don't over-fragment. The pattern's counter-example is exactly the "one pack, many internal skills" shape (gbrain) — fine for cohesive packs.
- **Hosted-app `.app.json` connectors** — Codex-only, opaque trust model; our API-backed skills use self-hosted/`x-api-key` calls, which is the auditable/control side of the buyer's lens. Keep it.
- **Foxconn-factory over-testing** — tests should be **contracts** that raise the floor, not distrust scaffolding policing a capable model. (`concepts/compound-engineering` Tensions; `garrytan--foxconn-factories`.)

---

## 8. Our repo: the precise problem statement

The consolidation (one repo: library + 3 plugins + one registry) is **sound** and matches the convergent-spec direction. The open issue is **Axis B coupling**, and it's narrower than feared:

- **Good:** the default `npx skills add recoupable/skills` is clean — only the 14 self-contained library skills install. The feared "catalog skills without scripts" does **not** happen on the default path.
- **Real risks:**
  1. **Silent breakage on non-default paths** — `--full-depth` or a direct-path single plugin skill surfaces the 27 coupled skills, which break (missing `scripts/`/`templates/`/`../../references/`). Silent: installs fine, fails only at runtime.
  2. **Bare relative paths** in catalog skills (`python3 scripts/...`, `../../references/...`) instead of `${CLAUDE_PLUGIN_ROOT}/...` — CWD-dependent even in the correct marketplace channel.
  3. **Cross-skill coupling** inside catalog (`recoup-royalty-audit` → `recoup-catalog-analysis`'s references) — breaks even careful per-skill installs.
  4. **No `skills[]` in the manifests** — this is *why* the default path is safe (plugin skills stay hidden from the CLI), but it also means there's **no curated way to offer a plugin's skills through the CLI**. It's all-or-nothing: library via CLI, full plugin via marketplace.
  5. **Two marketplace manifests** (`.claude-plugin/` + `.agents/plugins/`) must be hand-kept in sync → drift risk.

---

## 9. Recommendations — making ours cutting-edge, independent *and* together

Ordered by leverage. Each maps to a stolen pattern.

### Tier 1 — correctness & safety (do first; cheap)
1. **Add a self-containment CI lint** (steal: CE/FSI). Fail the build if any `SKILL.md` references a path outside its own dir *unless* that skill is explicitly marked plugin-only. This is the single highest-leverage guardrail — it makes Axis B coupling *visible and intentional* instead of silent.
2. **Decide per skill: bare-installable or plugin-only**, and enforce it. Library skills MUST be bare-installable. Plugin skills MAY be coupled — but then they must be **excluded from CLI discovery** (don't add them to `skills[]`) and marked so the lint passes.
3. **Replace bare relative paths with `${CLAUDE_PLUGIN_ROOT}`** in catalog skills, with a fallback, so they're CWD-independent in the marketplace channel. (steal: convergent-spec path-variable discipline.)
4. **Add a connector/manifest validator** (steal: FSI's gap — their `.mcp.json` is invalid and uncaught). Parse every `marketplace.json`/`plugin.json`/`.mcp.json` in CI.
5. **Keep the two marketplace manifests in sync via a generator or a parity test** (steal: CE `release:validate`), so `.claude-plugin/` and `.agents/plugins/` can't drift.

### Tier 2 — make à-la-carte real where we want it (medium)
6. **For any catalog/research skill we want shippable through the CLI, vendor it self-contained** (steal: FSI vendoring + drift check): move its required `scripts/`/`references/` *into the skill dir*, then add a `filecmp`-style drift test so the canonical copy and the vendored copy can't diverge. This converts a pack-coupled skill into a bare-installable one without giving up the plugin packaging.
7. **Resolve the cross-skill catalog dependency** (`recoup-royalty-audit` → `recoup-catalog-analysis`) by duplicating the referenced reference file into both skills (drift-checked), per the self-containment rule.
8. **If we want plugin skills discoverable in the CLI, declare them in `skills[]`** — but *only* the ones that are bare-installable after step 6. Coupled ones stay marketplace-only.

### Tier 3 — cutting-edge productization (higher; do when the above is stable)
9. **Version-as-update-gate:** adopt release automation (release-please or a pre-commit bump hook) across the library + 3 plugins; forbid hand-bumps; one bump per release. (steal: FSI + CE.) This is required before we treat any of this as "distributable updates."
10. **Skill-pack-bundle:** add resolver/trigger evals + behavioral contract tests for the highest-value skills (start with research/catalog flows). Cheap tests first (does the description route? does the skill body contain its contract?), paid E2E later. (steal: gstack economics + CE contract tests.)
11. **Storefront metadata + Step-0 connector preflight:** flesh out the `interface{}` block (category, brandColor, defaultPrompt) and add an "ensure API key / connect" Step-0 to every API-backed skill so it degrades gracefully. (steal: Codex.)
12. **A compounding store:** evolve `PROGRESS.md` toward a `docs/solutions/`-style knowledge store with a discoverability check, so each fix raises the floor. (steal: CE `/ce-compound`.)
13. **Resolver + `check-resolvable`** *only if* we cross ~30–40 skills in one install surface. Not now; flagged.
14. **Add a role lens over our capability plugins** (steal: Codex "for every role" §4.5). Our plugins are capability-shaped (research / catalog / content); add **role-named storefront entries** (e.g. "A&R Analyst," "Label Finance," "Content Marketer") in the `interface{}` block that bundle the same underlying apps+skills+instructions+workflows. The buyer self-identifies by role; the implementation stays capability-shaped. Cheap re-presentation, not a re-architecture. Design the registry so partners/labels can publish their own role plugins later (open-ecosystem direction — Anthropic + OpenAI both state this goal).
15. **(Product direction, not packaging) shareable hosted artifacts** — Codex Sites makes agent-generated dashboards/one-pagers a first-class output. Recoup skills that produce charts/briefs (chart-metric, catalog analysis, research) would benefit from a shareable hosted-artifact surface, not just markdown. Track separately from distribution work.

### The product shape this produces (independent *and* together)
- **Independent:** every library skill (and every *vendored* plugin skill) is bare-installable → works through `npx skills add` on any harness, à-la-carte, no breakage.
- **Together:** the three plugins still ship as rich bundles (commands + agents + hooks + scripts) through the Claude marketplace, where the whole tree is present → the deep workflows compose.
- **One source of truth:** a skill's canonical `SKILL.md` lives in exactly one folder; vendored copies are drift-checked, not hand-maintained.
- **Cutting-edge:** run-native cross-harness (no converter tax), storefront-grade metadata, version-gated updates, tested skill bundles, a compounding knowledge store.

This is the "modern product package that works for all types of users and harnesses": the **convergent core** makes it portable, **self-containment + vendoring** makes à-la-carte safe, the **marketplace** makes the rich bundles composable, and **version-gating + tests + compounding** make it a product rather than a folder.

---

## 10. Open questions / gaps to verify before relying on this

1. **`skills` CLI behavior is doc-derived, not executed.** Confirm with a live `npx skills add recoupable/skills --list` that only the 14 library skills surface, and test `--full-depth` reach into `plugins/*/skills/`. (CLI is v1.5.9; behavior is version-specific.)
2. **`${CLAUDE_PLUGIN_ROOT}` / CWD for catalog scripts** — run the catalog plugin in Claude Code and confirm what CWD `python3 scripts/...` executes in. Determines whether step 3 (Tier 1) is mandatory or just hardening.
3. **Non-Claude plugin consumption** — the repo carries `.cursor-plugin/`/`.codex-plugin/` stubs + `.agents/plugins/marketplace.json`, but we have not verified Cursor/Codex actually install these as *full plugins* (with commands/agents/hooks). Treat cross-harness *plugin* support as aspirational until tested; cross-harness *skill* support (library) is solid.
4. **Convergent spec is n=2** (Anthropic + OpenAI). If Cursor ships a native plugin format, re-check portability assumptions. (`concepts/convergent-agent-plugin-spec` status: emerging.)
5. **Wiki currency** — pattern pages and artifact analyses are dated 2026-06-01/02; clones are pinned (commits in `research/sources/repos.manifest.tsv`). Re-ingest before treating counts (e.g. CE's 1,395 tests vs wiki's 1,094) as current.

---

## Appendix — source map

- **Research wiki:** `~/Documents/Projects/research/` — start at `index.md` / `for-builders.md`. Pattern pages under `patterns/`, artifact analyses under `artifacts/plugins/`, concepts under `concepts/`.
- **Pinned clones:** `~/Documents/Projects/research/sources/<creator>--<repo>/` (rebuild via `sources/clone-all.sh`; commits in `repos.manifest.tsv`).
- **Full deep-dive reports** (gstack, FSI, Codex+gbrain, compound-engineering, `npx skills`+our-repo) were produced by parallel agents on 2026-06-02; their detailed citations (file paths + line ranges) live in this session's subagent transcripts.
- **Our consolidated repo:** worktree at `~/Documents/Projects/Recoup/skills-worktree` (branch `feat/unified-skills-marketplace`, off `recoupable/skills`).
- **Companion plan:** `marketing/docs/plans/2026-06-02-skills-plugins-consolidation.md` (the decision; this doc is its evidence base).
