# Business and buyers

Prepared 2026-09-14. This separates the audience Sidney selected from working sales ideas and product experiments.

## Who we are trying to reach

Sidney's instruction was: “music rightsholders and music funds. executive levels at those companies.” He selected worldwide coverage. That is the enterprise research and paid-audience scope for this workspace.

Start with companies that own, acquire, publish, or actively operate music rights. Relevant roles may include founders, CEOs, presidents, partners, and leaders of operations, finance, royalties, catalog management, or technology. Verify the current role and who owns the specific problem; a title alone does not establish buying authority.

The research also identifies advisers, service operators, and institutional capital providers. They can be useful partners or sources of introductions. They are separate from the core rights-owner/fund audience. A parent, subsidiary, and operating brand may share a buying decision even when all are useful employer targets.

Existing Recoup app users are another audience. Their signup and usage behavior can inform activation work; it does not show that they are executives at target companies. The imported app-user tools belong to that separate motion.

## What Recoup does

Recoup combines a consulting practice with software and a research effort focused on music. The practice helps teams improve real work; the platform and API provide reusable tools. Keep these connected in the story without claiming every consulting deliverable is a general product.

**Working enterprise message:** help music companies turn scattered AI experiments into reliable workflows their teams can run and maintain.

This is a message to test, not a proven winning pitch. Lead with an expensive recurring task and the result the buyer needs. “AI” by itself is not a sufficiently specific customer problem.

Useful signs to investigate include repeated manual reconciliation, fragmented catalog information, teams rebuilding the same analysis, and an internal champion trying to organize existing AI use. Treat these as research hypotheses until the buyer confirms them.

A sales opportunity needs evidence of a problem, consequences, an involved decision-maker, usable data/access, and a realistic budget and timeline. Record unknowns. Do not infer a funded project from company size or a podcast appearance.

## Offers and claims

Consulting advice, implementation, ongoing support, platform access, and API usage can be different things a customer buys. Describe the actual scope and commercial terms; do not combine them into an invented subscription offer.

For **current public offers**, inspect the marketing repository's detailed service/pricing pages, [copy registry](../../lib/copy/), and [pricing logic](../../lib/pricing.ts). [Homepage offer copy](../../lib/copy/home-offers.ts) summarizes them. Do not copy old sequence prices, old brand-document assumptions, or private customer terms into a campaign. A public list price is not a customer's signed agreement.

For **product claims**, check current documentation and released behavior. A proposed workflow, a merged change, or a successful internal demo does not establish adoption, reliability, savings, or willingness to pay. Use only approved public customer proof from the marketing repository when making named customer claims.

## Existing marketing connections to reuse

These paths are relative links within the same marketing repository; no consulting checkout is needed.

| Need | Existing home | Why inspect it |
|---|---|---|
| Site, app, API, and booking URLs | [lib/config.ts](../../lib/config.ts) | Avoid hardcoded old domains |
| Lead submission | [lib/leads/postLead.ts](../../lib/leads/postLead.ts) | Uses the central Recoup API lead intake |
| Inquiry submission | [app/api/inquiries/route.ts](../../app/api/inquiries/route.ts), [lib/inquiries](../../lib/inquiries/) | Existing validation and server-side handling |
| Acquisition source | [lib/attribution](../../lib/attribution/) | Preserves source context across the website journey |
| Website events | [lib/analytics/trackEvent.ts](../../lib/analytics/trackEvent.ts) | Current Vercel analytics event wrapper |
| Website conventions | [root AGENTS.md](../../AGENTS.md), [content status](../../content/STATUS.md) | Current architecture and release rules |

The old app-user CRM sync is a separate imported tool. Do not assume it is the same as current website lead intake. Confirm CRM ownership and deduplication before enabling either path for a new workflow.
