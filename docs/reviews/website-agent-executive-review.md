# Website agent executive review — 2026-09-21

Local preview only. This is not a production release or a claim that every company receives accurate investment advice.

## Interface review update — September 21, 2026, evening

The conversation interface was rebuilt and retested live after the earlier review below. Seeker and WMG both keep the first message at the top, reveal real tool activity beneath it and show compact questions inside the bottom input. Multi-turn findings, source expansion, manual collapse, mid-response follow-ups, cancellation, reload, mobile overflow and an actual report download were exercised. Follow-ups now receive their answer after the most recent message, including Eve's in-place response updates. Structured findings/reports are no longer repeated in prose. AI Elements, shadcn and JSON Render are all used in the live experience.

Current checks: 353 tests across 94 files, TypeScript, scoped ESLint and the Turbopack production build pass. Command Line Tools Git is available; the historical Xcode-license obstacle below does not block this update. These checks establish interface behavior, not the statistical-method validation described in the earlier content review. See `docs/website-agent.md` for the current implementation and deployment boundaries.

## Live tests completed

Input: https://seekermusic.com, followed by a hypothetical CEO request for a one-analyst Excel/Python pilot without buying software.

- Baseline failed: generic reporting/royalty/sync menu.
- Deeper website reading found company-specific catalog reuse activity, but the first recommendation was routine tracking. Failed the decision-value test.
- A proposed ranking method assumed data availability and undefined scoring. Failed the implementation test.
- Revised opening connected catalog reuse to measuring original-song performance separately. Passed relevance and explicit-uncertainty checks.
- Revised report included source IDs, complete reporting periods, calculations, separate rights types, human review, manual comparison, staged rollout and stop rules. It also correctly made AI optional for arithmetic.
- A statistical control-selection formula still combined incompatible scales. This remains a review failure, not validated analytics. Instructions now prohibit mixed-unit scores, but the correction has not been retested live.
- A Recoup services question received a sourced answer and did not reset the report. It explicitly said hiring Recoup was not required.

Company facts independently checked against Seeker's about-us and Samplémoose pages. Exact source excerpts are checked against pages actually read by the tool. This does not mechanically verify the reasoning derived from those excerpts.

## Implementation

- AI Elements messages; shadcn scrolling and answer buttons; JSON Render report.
- ask_user_question replaces present_choices; existing stored present_choices messages remain readable.
- Current AI use, tools, data sources, previous attempts, pilot owner and access constraints have explicit nullable saved fields. Only visitor-confirmed answers belong here.
- One context question at a time, free text always available; no assumed Excel/Python/AI platform.
- Research cards, quieter answered choices, reduced-motion support, implementation details collapsed.
- Default model GPT-5.4; bounded session limits: 200K input tokens, 20K output tokens, $3 maximum token cost. Earlier limits interrupted a research/report conversation.

## Validation and remaining gate

Full suite passed 332 tests before the final setup schema addition; final focused suite passed 23 tests including two new setup cases. Typecheck and scoped lint passed before that addition and were rerun afterward.

Live browser testing of ask_user_question, saved context behavior, and the final visual treatment is pending: automatic approval review blocked browser execution because the workspace had no credits. Do not mark the full CEO review passed until those tests and the statistical-method challenge pass.

Previously observed release blockers remain: unaccepted local Xcode license prevents Git operations; production webpack build fails in Eve's private-class syntax. No commit, PR, or deployment is claimed.
