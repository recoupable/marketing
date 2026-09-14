# Sources and update ownership

Consolidation date: 2026-09-14. The team authorized the shared home in the public `recoupable/marketing` repository. This directory contains public research, portable source code, and purpose-written context. It does not depend on access to Sidney's consulting workspace.

## Import origins

| Shared material | Original home | Treatment |
|---|---|---|
| `engine/` runtime and legacy sequences | `recoupable/gtm`, commit `57b45f03e92c27079af366b6bd76f7693d5946d3` | Tracked source imported; command safety and independent checks added; see engine README |
| Company evidence, audience projections, executive/relationship/podcast maps | Consulting `integrations/linkedin/2026-09-13-music-executive-*` | Copied; internal paths made relative to this package |
| Company audience builder | Consulting `integrations/linkedin/_work/build_company_audience.py` | Imported standalone helper; no credentials or integration cache |
| Podcast corpus and interview methods | Consulting `library/playbooks/music-moneyball/` | Public-source transcript research, RSS/index, guest notes, hosting guide, and maintenance scripts imported |
| Music-rights principles and fund reference | Consulting `knowledge/music-rights/principles.md` and `funds.md` | Copied with portable source links |

The [research import manifest](research/music-rights/SOURCE_INDEX.csv) records exact source paths and SHA-256 checksums before and after portable-link changes. The original sources remain in consulting. The manifest records the initial import, while Git records subsequent team edits.

## Adapted operating methods

These paths identify the originals for Sidney, not reading requirements for the team. The shared documents restate the useful methods and resolve older contradictions. They do not import personal automation identities, client examples, or unverified template pricing/results.

| Shared document | Original consulting references |
|---|---|
| Business and buyers | `positioning/icp.md`; `positioning/positioning.md`; user instructions selecting worldwide music-rights executives |
| Discovery and proposals | `library/scripts/discovery-questions.md`; `library/proposal/situational-assessment-template.md`; `library/scripts/negotiation-and-walkaway.md`; `library/pricing/three-tier-pricing.md` for scope distinctions only; `library/email-templates/` for follow-up structure |
| Evidence to content | `workflows/demand-engine.md`; `signals/AGENTS.md`; `consulting-content-extraction`, `consulting-copy-writer`, `consulting-linkedin-post-architect`, and `consulting-product-engine` source instructions |
| Account research and follow-up | `consulting-linkedin-audience` and `consulting-linkedin-engage` source instructions; `integrations/linkedin/AGENTS.md`; company-audience methodology |
| Build plan | `workflows/demand-engine.md`; `workflows/AGENTS.md`; the team's consolidation objective |
| Conversation decisions | This research and strategy conversation; general conclusions from the 2026-09-14 defensibility/engineer exploration work; private commercial figures and client-call details omitted |

The newer post-first demand workflow informed the shared content method. Older article-first diagrams and historical deployed-worker claims were not carried over as current team behavior. Likewise, legacy app-user templates do not override the enterprise audience or current website offers.

## Ownership going forward

- **Marketing GTM team:** edit shared context, research, playbooks, and engine code here. Update dates and evidence when facts change. Record tested behavior and missing work in the build plan.
- **Sidney's consulting practice:** continues to own personal/client material and its original copies. There is no automatic write-back or synchronization from this directory.
- **Marketing website:** owns current published offers, copy, URLs, website forms, and attribution code. Link to those sources rather than maintaining a second price or endpoint registry.
- **Team CRM and private records:** own live people, contact preferences, deals, customer terms, private delivery evidence, and financial results. Public files may describe methods and schemas, not duplicate those records.

When importing future useful material, check whether the same truth already has a shared home. Update that home or add a source reference. A new copy should have a clear purpose, provenance, and maintainer.
