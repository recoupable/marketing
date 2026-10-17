# Recoup automation examples funnel

## Offer and conversion

Music-business visitors see a proposed royalty-reporting system immediately. They can
switch to catalog cleanup or release prep with one click. Each example names what Recoup
would build, shows the output, and explains the human review. There are no questionnaire
fields, contact gates, AI calls, or invented estimates of savings.

Resources, Advisory, and the three companion article drafts link to `/ai-strategy`.
“Talk to Recoup” opens Contact with the selected example ID. The server accepts only
known IDs and prefills an editable note. Contact details and a separate Send action are
still required. No browser draft import or repeated project description is needed.

“Save this example” downloads Markdown without contact details. “How we’d get started”
keeps every prerequisite and the measurement plan available without making the visitor
fill them in. The examples do not assert which prerequisites a visitor has satisfied.
The existing team worksheet remains available at its stable download URL for article
readers who want to run discovery themselves.

## Content ownership

`lib/copy/ai-strategy.ts` supplies the page, example download, inquiry wording, and public
agent summary. `getStrategyProject` rejects arbitrary or repeated URL values. The old
form, date validation, readiness assessment, and answer-to-brief exporter were removed.

Three original article drafts remain in `content/drafts/ai-strategy/`, outside the
published blog registry, RSS, and sitemap. Their CTAs lead to the examples. Review copy
and artwork before publishing; preserve the existing featured article.

The separate Skills PR adds `recoup-internal-consulting-team-workflow-discovery`,
`recoup-internal-consulting-ai-project-selection`, and
`recoup-internal-consulting-ai-pilot-review`. Detailed discovery, project prerequisites,
and measurement belong to that consulting delivery process. Client records stay in the
selected private Business workspace; the skills and blank templates are public.

## Measurement and validation

Events are `strategy_example_selected {project}`, `strategy_example_downloaded {project}`,
and `cta_clicked {cta: strategy_inquiry, placement: ai_strategy_example, project}`. They
contain only allowlisted example IDs. Existing inquiry events measure submitted leads;
example clicks are not qualified leads or evidence of conversion lift.

Validate all three selections, the complete download, known/invalid/repeated inquiry
parameters, mobile reading burden, keyboard operation, and human/agent copy parity. Run
the focused tests, scoped lint, TypeScript, and production build. Never send a live test
inquiry. A PR, merge, deployment, and article publication are distinct release steps.

## Local verification — October 16, 2026

- Production build and TypeScript passed with Node 24; 355 pages generated.
- All 38 focused tests across four files passed; scoped ESLint passed.
- Browser verified all three task choices, keyboard selection, optional prerequisites,
  the actual Markdown download, and the prefilled unsent Contact form.
- HTTP checks confirmed each selected task reaches the correct editable inquiry note.
- The narrow browser viewport was 355px after browser scaling, with no horizontal
  overflow and no inputs in the page’s main content. Desktop was restored for review.
- Local preview remains at port 3047 under the existing independent user-session service.
- Articles remain drafts. No live inquiry was sent or production deployment performed.
