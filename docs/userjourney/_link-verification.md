# Link Verification (parent — live checks the persona agents could not run)

_Checked 2026-06-01 against the live web. Persona agents had no internet; this file is the ground truth for external links and install commands referenced on the homepage._

## External domains — ALL LIVE ✅
| URL | Status |
|---|---|
| https://research.recoupable.com | 200 |
| https://chat.recoupable.com | 200 |
| https://developers.recoupable.com | 200 |
| https://recoupable.com | 200 |

## `npx skills add` install commands — BROKEN ❌ (critical)
The "Open tools shelf" (homepage §7, "The tools we build, free to install") shows five install commands. The `skills` CLI resolves `recoupable/<x>` to `github.com/recoupable/<x>`. Results:

| Command on the page | Resolves to | Status |
|---|---|---|
| `npx skills add recoupable/diligence` | github.com/recoupable/diligence | **404** |
| `npx skills add recoupable/ar` | github.com/recoupable/ar | **404** |
| `npx skills add recoupable/content` | github.com/recoupable/content | **404** |
| `npx skills add recoupable/operator` | github.com/recoupable/operator | **404** |
| `npx skills add recoupable/fan` | github.com/recoupable/fan | **404** |
| `npx skills add recoupable/skills` (the REAL repo) | github.com/recoupable/skills | **200** |

**Conclusion:** Every install command in the builder-proof section would fail. The pack names (diligence / ar / content / operator / fan) are fictional — they exist neither as standalone repos nor as skill names in the real repo.

## The REAL repo: `recoupable/skills` (200)
Default branch `main`. Actual installable skills:
`artist-workspace`, `chart-metric`, `content-creation`, `create-artist`, `getting-started`, `music-industry-research`, `recoup-api`, `recoup-setup`, `release-management`, `setup-sandbox`, `short-video`, `song-writing`, `streaming-growth`, `trend-to-song`.

README documents `getting-started` as the entry point (install CLI, get API key, connect via MCP/REST).

## Fix options
1. **Fastest:** point all shelf cards at the real repo — `npx skills add recoupable/skills` — and reframe the cards as "skills inside our open repo" rather than separate installable packs.
2. **Best long-term:** create real, separately-installable packs (or map cards to real skill names, e.g. Diligence→`music-industry-research`, A&R→`chart-metric`/`streaming-growth`, Content→`content-creation`/`short-video`, Operator→`release-management`/`artist-workspace`, Fan→`streaming-growth`) and verify each `npx skills add ...` works before shipping.
3. Until fixed, this section actively damages the "tools in the open" credibility pitch — a developer or technical operator who copy-pastes any command gets a 404 on first contact.
