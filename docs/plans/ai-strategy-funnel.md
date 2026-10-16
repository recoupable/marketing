# Recoup first-project funnel

## Offer

Help music-company leaders choose one piece of work, identify missing prerequisites, and define a test they can evaluate. The method is expressed as Recoup's operating approach. All examples and copy are original; no borrowed results, testimonials, proprietary framework names, or third-party branding are used.

## Entry and conversion

- Resources menu, resources page, and Advisory link to `/ai-strategy`.
- A free team worksheet helps a leader gather concrete examples before the engagement.
- Three form steps produce a brief without email capture or an AI call.
- The form starts beside the plain-language offer and an example download. Reporting, catalog cleanup, and release-prep starters fill only the editable task and expected result; they never assert readiness or ownership.
- The result lists unresolved prerequisites explicitly and gives measurement guidance suited to the purpose.
- Download works without contact details. An explicit inquiry action stores the reviewed brief in the existing one-hour browser draft store, then opens Contact. The visitor chooses **Use prepared brief**, adds contact details, and sends.
- The existing ROI planner covers numerical assumptions. The conversational workflow planner remains available for deeper exploration.

## Article sequence

Drafts are in `content/drafts/ai-strategy/`. They are deliberately absent from the published blog registry, RSS, and sitemap. Review copy and create approved artwork before publishing them; keep the existing featured article. Proposed sequence:

1. `choose-an-ai-project-your-music-team-can-finish`: project selection → toolkit.
2. `measure-ai-after-the-report-is-checked`: measurement → toolkit + ROI planner.
3. `ask-your-team-to-show-you-last-weeks-work`: team discovery → worksheet + toolkit.

Each draft includes metadata and links to existing articles. No publication date has been invented.

## Consulting handoff

The separate Skills PR adds `recoup-internal-consulting-team-workflow-discovery`, `recoup-internal-consulting-ai-project-selection`, and `recoup-internal-consulting-ai-pilot-review`. These create private discovery records, project decisions, and evidence reviews in the selected Business workspace. Their instructions and blank templates are public. Neither repository publishes the other.

## Measurement

Use `strategy_brief_created {purpose, ready}`, `strategy_brief_downloaded {purpose}`, and the existing `cta_clicked {cta: strategy_inquiry, placement: ai_strategy_result}`. No answer text, names, dates, or client details enter analytics. These events measure tool use and intent; the existing inquiry-submitted event is the lead receipt. Do not claim causal conversion lift without a comparison.

## Validation and release

Validate unknown and negative prerequisites, invalid dates, download contents, focus changes, narrow-screen reflow, editing/reset, and manual inquiry import. Check public discovery and metadata alongside the production build. Do not send a test inquiry to production. A feature PR and article drafts are reviewable deliverables; merge, deployment, and article publication are separate release steps.

### Local verification — October 16, 2026

- Production `pnpm build` passed with Node 24 and the existing public Privy app configuration; 355 pages generated. No environment file was copied into this worktree.
- TypeScript and scoped ESLint passed. Five focused test files passed all 38 tests, covering the new decisions and the existing discovery, funnel, and blog contracts.
- Browser checks passed for all missing prerequisites, all confirmed prerequisites, past-date rejection, step/result focus, editing, reset, brief download, and manual Contact import. No inquiry was sent.
- Desktop and narrow-screen layouts were inspected; the browser's actual narrow viewport was 355px, with no horizontal overflow.
- Article links resolve to existing registered posts; the three new articles remain unpublished drafts.
- Design revision: replaced the tall hero and abstract method row with the offer, form, and concrete plan example in one desktop workspace. Verified editable starter selection, step progression, all four unresolved requirements, reset, and phone reflow at an actual 355px width. The revision passed 35 focused tests, scoped lint, and the production build.
