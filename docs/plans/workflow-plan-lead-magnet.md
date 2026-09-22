# Workflow-plan lead magnet

Entry: `/workflow-plan`. Existing audit and inquiry routes are preserved. The Resources page, sitemap and machine-readable tool summaries include the new page.

## Sequence

Workflow choices (multi-select) → information sources → desired result → name and email → lead capture → plan → optional follow-up → download or inquiry.

The three-question interview does not call a model. Answers and the generated plan are retained in sessionStorage with a one-hour expiration, validated on restore. Storage failure does not prevent use. Start again clears the draft. Anonymous answers are not added to the CRM. The visitor can carry the plan into the existing `/contact` review/submit flow, which retains the site's acquisition attribution. No inquiry is submitted automatically.

Download provides a plain-text copy. Automatic email delivery is not implemented: the existing lead endpoint captures inquiries, not transactional plan delivery. Do not label a lead capture as “email sent.”

## AI configuration

- Install dependencies with the pinned pnpm version (`corepack pnpm install`).
- `AI_GATEWAY_API_KEY` or Vercel OIDC supplies server-only Gateway authentication.
- `WORKFLOW_PLAN_MODEL` defaults to `openai/gpt-4.1-mini`.
- Set `WORKFLOW_PLAN_AI_ENABLED=true` to enable AI generation and follow-ups. Otherwise the endpoint returns a clearly labeled workflow-specific starter template.
- AI SDK `generateText` uses validated structured output for the plan and bounded text for follow-ups. A provider failure returns the starter plan; follow-up errors preserve the plan and question.
- Before production activation, add an edge rate-limit rule for POST `/api/workflow-plan` and configure a Gateway spending limit. The local 12 requests/hour per IP hash limiter is a bounded per-instance backstop, not a distributed spending limit. No credentials or raw answers are included in analytics or application logs.
- Requests require a matching Origin/Host, bounded 14KB body, schema validation, and a 25-second model timeout. Inputs and generated text are rendered as text, never HTML. No tools, source access, email sending or autonomous actions are given to the model.

## Measurement

`workflow_plan_started`, `workflow_plan_step_completed {step}`, `workflow_plan_completed {focus, mode}`, `workflow_plan_failed {stage}`, `workflow_plan_followup`, `workflow_plan_downloaded`, `workflow_plan_inquiry_started` use the existing analytics wrapper. No free text, email, company or other visitor details are event properties. Actual submissions remain tracked by the existing inquiry events. Returning to and completing a step again can create another event; events are not unique-lead counts.

## Verification

Production build, TypeScript and focused unit tests pass. Browser checks covered the three-question path, starter result, refresh restoration, mobile result layout and inquiry brief handoff without submitting a lead. Provider errors, disabled AI, invalid requests, rate limiting and generated/follow-up handler paths are covered with injected tests. Live production-server checks using synthetic inputs returned HTTP 200 for both a personalized Gateway plan and a follow-up answer. No production deployment or transactional email delivery was performed.

Name/email capture uses the existing postLead service and /workflow-plan source. Structured answers accompany the lead; contact details are not sent to the model. The plan is shown on-page, with no email-delivery promise.

Generation now precedes contact capture. Configure RESEND_API_KEY and WORKFLOW_PLAN_EMAIL_FROM (verified Resend sender) to enable email copy and delivery. Email route accepts only signed generated plans with a one-hour expiry, validates recipients, bounds request size, applies request limits and uses provider idempotency. Configure production edge limits before enabling. Verify real delivery separately; local tests mock the provider.
