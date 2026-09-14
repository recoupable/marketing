# What was consolidated

Inventory dated 2026-09-14. The old repositories remain available; this is the shared development home. [SOURCES.md](../SOURCES.md) records origins and update ownership.

## From the old mono/gtm repository

| Material | Current home | Actual use and limits |
|---|---|---|
| Recoup admin API client, user segmentation, CSV export | [engine](../engine/README.md) | Existing app-user analysis; not music-company prospect discovery |
| Local growth dashboard | [engine](../engine/README.md) | App-user report; not a sales or campaign attribution dashboard |
| Attio person sync | [engine](../engine/README.md) | Imported integration, now preview by default; live compatibility and CRM ownership need validation |
| Welcome, activation, and reengagement email sequences | [engine/sequences](../engine/sequences/) | Legacy draft material; no sending system and no current approval of its offers or claims |

## From consulting

| Material | Current home | Why it matters |
|---|---|---|
| Music Moneyball transcripts, episode index, feed, guest dossiers, interview questions, hosting playbook | [podcast](../research/music-rights/podcast/README.md) | Buyer vocabulary, operating models, interview preparation, and company discovery |
| Music-rights principles and fund reference | [reference](../research/music-rights/reference/) | Explains how ownership, operations, financing, and growth differ across buyers |
| Buyer qualification and positioning | [business and buyers](business-and-buyers.md) | Separates a company that fits the audience from an actual opportunity |
| Discovery questions, proposal structure, and follow-up methods | [discovery and proposals](../playbooks/discovery-and-proposals.md) | Turns a conversation into an evidence-backed scope and next step |
| Sourced insights, post-first content process, and evidence review | [evidence to content](../playbooks/evidence-to-content.md) | Gives the team a repeatable way to teach buyers something useful |
| Account research and response workflow | [account research and follow-up](../playbooks/account-research-and-followup.md) | Connects research, relevant people, drafts, and CRM outcomes |

Consulting also has integration scripts for engagement collection, enrichment, lead scoring, CRM cross-reference, and publication. They depend on personal configuration and were **not migrated or verified here**. The methods are included; the engine should implement team-owned adapters when needed. No consulting service or secret is a hidden dependency of this directory.

## From this research conversation

| Material | Current home | Status |
|---|---|---|
| Worldwide company evidence and audience projections | [company research](../research/music-rights/README.md) | Dated source-backed snapshot; matching and campaign reach pending |
| Selected executive leads, corporate relationships, and podcast-to-company map | [company files](../research/music-rights/companies/) | Research starting points; current roles and buyer ownership require rechecking |
| Business model, recurring workflow, and product defensibility discussion | [conversation decisions](conversation-decisions.md) | General conclusions and experiments; private economics omitted |
| Engineer exploration discussion | [conversation decisions](conversation-decisions.md) | Public summary of useful experiments; private engineering handoff and call excerpts remain in consulting |
| Team operating model and implementation sequence | [build plan](../BUILD_PLAN.md) | Proposed next work; no claim that the full engine is deployed |

## Intentionally retained only in the original private workspace

Private client calls, the exact customer-call prompt used for the royalty tracker, contracts, correspondence, customer fees, salary information, forecast spreadsheets, CRM exports, and personal account configuration remain in consulting or their existing private system. They are not required to understand this shared plan.

No source was deleted from consulting. Imported public research has a checksum manifest. Adapted methods are written for this team and do not inherit the personal workspace's automation instructions or historical deployment claims.
