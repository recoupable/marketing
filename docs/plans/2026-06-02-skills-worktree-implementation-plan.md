# Skills Worktree — Implementation Plan (Portability-Everything)

> **Status:** Plan v2, 2026-06-02. **Phase 1 COMPLETE; Phase 2 functionally complete pending Task 2.5 live install verification** (all 42 skills portable; lint + drift + manifests green; CI wired). Supersedes the "two-channel / coupling-allowed" v1. Executes the recommendations from `2026-06-02-skills-plugins-packaging-landscape.md` with one overriding directive: **make every skill cross-harness portable.**
>
> **Done (2026-06-02):** portability lint / drift check / manifest validator built (`scripts/`); 10 research + 17 catalog + 14 library + 1 content skills made self-contained (94 vendored copies, drift-checked across 27 groups); markdown links → backtick paths; CI workflow `.github/workflows/validate.yml`. Catalog scripts vendored as **per-skill dependency closures** (not the full 17-set) — each skill ships only the scripts it invokes plus their transitive `subprocess`/`importlib`/`_helpers` deps; verified to execute from the skill dir.
>
> **Open (needs live CLI/network):** declare `skills[]` in plugin manifests + verify `npx skills add` surfaces plugin skills (Task 2.5); live install spot-check; Phase 3 productization.
> **Target:** worktree at `/Users/sidneyswift/Documents/Projects/Recoup/skills-worktree`, branch `feat/unified-skills-marketplace` (off `recoupable/skills`).
> **Companion docs:** `2026-06-02-skills-plugins-consolidation.md` (decision) · `2026-06-02-skills-plugins-packaging-landscape.md` (evidence + recs).

---

## The directive (and why v1 changed)

**Every skill must be cross-harness portable** — bare-installable via `npx skills` on any harness (Claude Code, Codex, Cursor, …), not just shippable as a Claude marketplace plugin. FSI (`anthropic--financial-services`) is an **Anthropic-developed, Claude-Code-specific** plugin; it leans on `${CLAUDE_PLUGIN_ROOT}`. We are explicitly **not** following the FSI pattern — we follow the **compound-engineering (CE) portable pattern**.

### Task 0 result (verified 2026-06-02) — this is why

1. **`${CLAUDE_PLUGIN_ROOT}` only expands in JSON** (hooks, `.mcp.json`), **not in skill/command markdown bodies** (Anthropic `claude-code` issue #9354). So a skill body that writes `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/x.py"` ships a literal, unexpanded string on Claude Code — and the var doesn't exist on other harnesses at all.
2. **It's Claude-only.** Codex/Cursor/`npx skills` installs have no such variable. Any platform var fails portability by definition.
3. **Runtime CWD is the user's project, not the skill dir** (CE `AGENTS.md` line 243, empirical). So bare `python3 scripts/x.py` *can* fail too — unless the script is **co-located inside the skill** and the skill instructs the agent that scripts live alongside it (CE line 210–212: "all platforms resolve script paths relative to the skill's directory").

**Conclusion:** the only portable contract is **self-containment** — each skill references *only its own directory* via **relative / backtick paths**, **no platform variables**, and **shared material is duplicated into each skill and drift-checked** (CE + FSI both do this for their support files).

---

## The portable skill contract (the standard we enforce)

A skill is portable iff:
1. **Self-contained** — every file it reads/executes lives inside its own dir (`references/`, `scripts/`, `templates/`, `fixtures/`). No `../`, no `../../references/`, no `skills/<other>/…`, no plugin-root `scripts/`.
2. **No platform variables** in the body — no `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_SKILL_DIR}`, etc. Use plain relative paths.
3. **Doc references use backtick paths** (`` `references/foo.md` ``), **never markdown links** (`[foo](./references/foo.md)`) — agents read markdown links as CWD-relative `Read` calls that fail (CE `AGENTS.md` line 145).
4. **Scripts are co-located** and invoked relatively (`python3 scripts/foo.py`), with a one-line note in the body that scripts ship alongside the skill.
5. **Shared/duplicated files are drift-checked** against a single canonical copy (byte-identical), so vendoring can't silently diverge.

This is the CE pattern verbatim, adapted to our repo. Everything below makes our 42 skills satisfy it.

---

## Ground-truth coupling (verified in worktree, 2026-06-02)

| Group | Count | Portable today? | Coupling to fix |
|---|---|---|---|
| `skills/` library | 14 | ✅ yes | none |
| `plugins/content` | 1 (`recoup-content-create`) | ✅ yes | prose-only refs to library skills |
| `plugins/research` | 10 | ❌ no | all → `../../references/{endpoints,response-shapes,workflows}.md` (3 shared md, **no scripts**) |
| `plugins/catalog` | 17 | ❌ no | 8 script-bearing skills → relative `scripts/*.py` that live at **plugin root**, not in-skill; 2 → `../../references/`; `templates/`+`fixtures/`; 1 cross-skill dep |

Catalog script facts (verified): scripts import siblings via `Path(__file__).resolve().parent / "other.py"` and a shared `_helpers.py`; the `references/*.md` appear only in **docstrings** (not runtime); script paths in `SKILL.md` are **already relative** (`scripts/foo.py`) — so **co-locating the scripts inside each skill makes those refs correct with zero body edits**. Per-skill script counts: deal 11, analyze/ingest 4, package/qc 3, report 2, dashboard/kickoff 1; the rest 0.

---

## Phase 1 — Standard + tooling (no skill-content risk)

> Build the enforcement first so vendoring in Phase 2 is provably correct and can't regress.

### Task 1.1 — Write the portable standard
- Add the contract above to `AGENTS.md` (authoring rules) and `contributing.md` (PR checklist). Mirror CE's wording on backtick-vs-markdown-link and co-located scripts.
- **Acceptance:** `AGENTS.md` has a "Portable skill contract" section; PR template references it.

### Task 1.2 — Portability lint (highest-leverage guardrail)
- New `scripts/portability_lint.py` (stdlib only). For every `SKILL.md` flag:
  - escapes: `../`, `../../references/`, `skills/<other>/…`, plugin-root `scripts/`/`templates/`/`fixtures/` (i.e., a referenced path that doesn't exist inside the skill dir);
  - platform vars: `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_SKILL_DIR}`, `$CLAUDE_*`;
  - markdown links to sibling files (`](./` or `](../` or `](references/`).
- Exit non-zero with `file:line` on any violation. **Every skill must pass** (no "plugin exception" — that was v1).
- **Acceptance:** reports today's violations precisely; goal is green after Phase 2.

### Task 1.3 — Vendor drift check
- New `scripts/check_vendored.py`: reads a small `scripts/vendored.json` map (`canonical_path → [vendored_copy, …]`) and asserts each copy is byte-identical (`filecmp.cmp(shallow=False)`). Fails CI on drift.
- **Acceptance:** runs green once Phase 2 populates the map; flipping one byte in a copy fails it.

### Task 1.4 — Manifest + connector validator (+ parity)
- New `scripts/validate_manifests.py`:
  - JSON-validate every `marketplace.json` / `plugin.json` / `.mcp.json` (catches the FSI invalid-JSON class of bug);
  - assert each plugin `source` exists + has a plugin shape; `version` semver; names unique; required fields present;
  - **parity:** `.claude-plugin/marketplace.json` and `.agents/plugins/marketplace.json` list the same plugins/sources/versions (diff only shared fields; ignore `interface{}`).
- **Acceptance:** exits 0 (or reports real issues); parity drift fails.

### Task 1.5 — Wire CI
- `.github/workflows/validate.yml` runs 1.2 + 1.3 + 1.4 on PR (Python 3 stdlib; no deps).
- **Acceptance:** checks show on PR; a deliberately-broken skill fails the build.

**Phase 1 done:** `python3 scripts/portability_lint.py` enumerates exactly what Phase 2 must fix; manifest/parity green.

---

## Phase 2 — Make every skill self-contained (the actual portability work)

> Vendor shared material into each skill so all 42 satisfy the contract. Order: cheapest → heaviest.

### Task 2.1 — Content (verify only)
- `recoup-content-create` already refs library skills by **prose name** (no path coupling). Confirm lint passes it; no change expected.

### Task 2.2 — Research (10 skills, cheap: 3 shared md)
- Copy `plugins/research/references/{endpoints,response-shapes,workflows}.md` into **each** research skill's own `references/`. Rewrite every `../../references/x.md` markdown link to a **backtick** `` `references/x.md` `` path.
- Register all copies in `vendored.json` (canonical = `plugins/research/references/*`).
- **Acceptance:** lint passes all 10; drift check covers 30 copies; `grep -rn "\.\./\.\./references" plugins/research/skills` → empty.

### Task 2.3 — Catalog references + cross-skill dep (medium)
- The 2 catalog skills using `../../references/` → vendor those files into their own `references/`, switch to backtick paths.
- **Cross-skill dep:** `recoup-royalty-audit/SKILL.md:22` reads `recoup-catalog-analysis/references/pro-performance-income.md` → copy that file into `recoup-royalty-audit/references/`, repoint to backtick local path, add to `vendored.json`.
- **Acceptance:** `grep -rn "skills/recoup-catalog-analysis\|\.\./\.\./references" plugins/catalog/skills` → empty; drift covers the copies.

### Task 2.4 — Catalog scripts (heaviest: co-locate per-skill dependency closures)
- Because scripts cross-invoke siblings via `__file__` + import `_helpers.py`, each **script-bearing** skill must carry the scripts it invokes plus transitive sibling/helper dependencies. Do **not** vendor the full production script set into every skill; use the smallest per-skill dependency closure that executes from the skill directory.
- SKILL.md script refs are **already** `scripts/foo.py` → now correct, co-located. Add a one-line body note: "Scripts ship alongside this skill in `scripts/`; run them from the skill directory."
- Keep `plugins/catalog/scripts/` as the **canonical** source; register every co-located dependency-closure copy in `vendored.json` so the drift check keeps them in lockstep.
- Vendor any `templates/`/`fixtures/` a skill reads into that skill (same drift treatment).
- **Acceptance:** lint passes all 17 catalog skills; `grep -rn "python3 scripts/" plugins/catalog/skills` still matches (now resolving to in-skill copies); drift check green across all duplicated scripts.

### Task 2.5 — Declare skills in manifests + default-install surface
- Now that all plugin skills are self-contained, add `"skills": [...]` arrays to each plugin manifest so `npx skills` can discover them, and confirm the default `npx skills add recoupable/skills` install surface is what we want (library + plugin skills, all portable).
- **Acceptance:** live `npx skills … --list` against the worktree shows the intended set; coupled-by-design no longer exists.

---

## Phase 3 — Cutting-edge productization (after 1–2 stable)

### Task 3.1 — Version-as-update-gate
- Release automation across library + 3 plugins. Light: `scripts/version_bump.py --check/--apply` + pre-commit patch-bump of changed plugins; CI runs `--check`. Heavy: release-please `linked-versions` (CE). Forbid hand-bumps (policy in `contributing.md` + CI).
- **Acceptance:** changing a plugin's files without a bump fails CI.

### Task 3.2 — Skill-pack evals + contract tests (extend, don't invent)
- Research has 7 eval YAMLs; catalog has `evals/scenarios`. Add cheap-first: (a) trigger/resolver evals, (b) contract tests asserting each body contains required steps. Run in CI.

### Task 3.3 — Role lens in the storefront (Codex §4.5)
- Add role-named presentation entries to `.agents/plugins/marketplace.json` `interface{}` mapping onto capability plugins ("A&R Analyst" → research, "Label Finance / Catalog Deals" → catalog, "Content Marketer" → content). No internal changes.

### Task 3.4 — Compounding store (optional)
- `docs/solutions/`-style store + `AGENTS.md` pointer (CE pattern), seeded from monorepo `PROGRESS.md`.

---

## Sequencing

```
Phase 1 (standard + tooling):  1.1 → 1.2 ─┬─ 1.3 ─┬─→ 1.5 (CI)
                                           └─ 1.4 ─┘
                                                  ▼
Phase 2 (vendor to self-contained):  2.1 → 2.2 → 2.3 → 2.4 → 2.5
   (lint from 1.2 + drift from 1.3 gate every vendoring step)
                                                  ▼
Phase 3: 3.1 (prereq for shippable updates) → 3.2 / 3.3 / 3.4 (by leverage)
```

- **Tooling before vendoring** — lint enumerates the work; drift check makes duplication safe.
- **Cheapest→heaviest in Phase 2** — content (free) → research (3 md) → catalog refs → catalog scripts.

---

## What "done" looks like

- **All 42 skills** pass `portability_lint.py` — self-contained, no platform vars, backtick refs.
- `npx skills add recoupable/skills` installs the full portable set on any harness; coupled-by-design no longer exists.
- Every duplicated file is drift-checked byte-for-byte against one canonical source.
- Manifests validated + parity-locked in CI; versions release-automation-owned; high-value skills guarded by evals.

---

## Remaining open questions

1. **Live `npx skills` discovery (v1.5.9)** — confirm `--list` against the repo surfaces the intended set once `skills[]` arrays are declared (gates 2.5).
2. **Catalog script duplication footprint** — co-locating the full production set into ~8 skills is the only correct option given `__file__` sibling imports; acceptable cost, fully drift-checked. (Decided: yes.)
3. **Version scheme** — independent per-plugin (FSI) vs linked (CE)? Affects 3.1.
4. **Canonical CI repo** — `recoupable/skills` gets `.github/workflows/`? This worktree is off it; confirm before 1.5.
