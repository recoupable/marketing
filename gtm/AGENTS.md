# Shared GTM instructions

## Mission and reading order

Build Recoup's shared go-to-market engine here. Begin with [README.md](README.md), [business and buyers](context/business-and-buyers.md), [conversation decisions](context/conversation-decisions.md), and [BUILD_PLAN.md](BUILD_PLAN.md). Consult [the inventory](context/inventory.md) before creating a duplicate tool or document.

The active enterprise audience is executives at music rightsholders and music funds worldwide. Existing app users are a separate audience. Do not mix product activation emails, company targeting, and qualified sales opportunities into one list or success metric.

## Source authority

- Public company evidence: [music-rights research](research/music-rights/README.md). Read its date, review status, source quote, and company relationships. A research match is not a qualified lead or a unique buying organization.
- Podcast identity: the RSS-derived episode index. Spoken claims: transcript timestamp, with audio verification for important quotations. Transcripts are machine generated.
- Current website offers, URLs, prices, and lead intake: the marketing code and copy identified in [business and buyers](context/business-and-buyers.md). Older email templates and brand notes do not override them.
- Business hypotheses: [conversation decisions](context/conversation-decisions.md). Experiments are not shipped features or proven customer outcomes.
- Live people, consent/contact preferences, customer exclusions, deal stage, and agreed commercial terms: the team's configured CRM and private records. Never invent them from research.
- Imported source locations are recorded in [SOURCES.md](SOURCES.md) for provenance. Access to consulting or the old GTM repo is not required to follow these instructions.

## Build and storage rules

1. Put executable GTM work in `engine/`. It is an independent Node package; use its own install, typecheck, and tests. Keep server credentials out of website/browser code.
2. Reuse the marketing website's existing lead and attribution flow before creating a parallel intake endpoint. Read the current implementation first.
3. Make new workflows runnable with local fixtures before connecting live services. Default to previews. State clearly when a preview still reads a live account.
4. Keep public source material and software in Git. Keep runtime personal/customer data outside Git; `engine/exports/` and `engine/runs/` are ignored local conveniences, not a production database or shared team record.
5. Preserve source URLs, observation dates, evidence, and the distinction between fact and interpretation through every generated draft. Missing information stays missing.
6. Show the exact draft, recipients or destination, sender identity, and intended action before a human approves sending, publishing, or ad spend. Approval of this consolidation does not approve those future actions.
7. Do not create recurring workers until there is a tested workflow, an owner, and authorization for its live behavior.
8. Update the build plan's status when behavior is verified. Do not inherit old claims that something is deployed merely because a copied document says so.

Follow the parent repository's Git and build instructions. Run the marketing production build after changes; run the independent engine checks when changing its code. Use a feature branch and PR. Do not put research files in `public/` or automatically add them to the website's content/discovery feeds.
