# Eve for the Recoup website

Research date: September 21, 2026. Recommendation only; Eve has not been installed or deployed by this research.

## Decision

Build one public-facing Recoup website agent inside the marketing repository, with planner and FAQ entry modes. Give both the same approved public knowledge and the same visitor-scoped conversation. Use skills and explicit application state to vary the job. Start without delegated subagents. Separate agents later when permissions, ownership, release cadence or workloads require separate boundaries.

Eve is the runtime framework. Recoup remains the product identity. This website agent should not inherit the authenticated Recoup app's tools or private customer access.

## Why Eve fits

Official Next.js integration supports `withEve(nextConfig)` and `useEveAgent` from `eve/react`. The web app and agent can share one Vercel project and origin, with separate runtime services. The hook supports streaming, pending input, cancellation and resumable sessions. A custom UI can render structured tool output or stream events as plan cards instead of raw messages.

Eve's durable per-session state can hold the current goal, known constraints, open questions and latest plan. Dynamic instructions can vary by session or turn; skills provide optional procedures. None of these require a separately addressable agent for every page.

The live documentation changelog starts at v0.63.0. Eve remains beta. Pin the version selected for implementation and use its bundled documentation; do not copy older integrations uncritically. This research does not establish compatibility through an installed build.

## Experience

Keep the existing headline. Replace the start button with a real composer and a short invitation: “Tell us what is slowing your team down. We’ll work out where AI could help.” Placeholder: “We spend too much time putting catalog reports together…” Offer optional short starter prompts for visitors who do not want to type.

The submitted text starts the conversation immediately. No separate start screen after submission. Ask one useful follow-up at a time, only for missing information. If the first message already explains the work and tools, do not re-ask those questions. Show a first recommendation early, then refine it with the visitor. Do not promise exactly three questions if the conversation is adaptive.

Render a real plan artifact containing the recommended workflow, why it fits the information supplied, tangible deliverable, inputs, first test and review point. Let the visitor say “we use DISCO” or “focus on pitching instead” and see an updated plan. A typed application schema, not arbitrary generated HTML, controls presentation.

Desktop can show conversation and plan alongside each other; mobile can show an inline plan card with an expand action. Keep answers short and preserve the existing visual language. Avoid decorative fake processing or pretend claims of having examined a catalog.

If asked “What does Recoup do?”, answer from public sources and retain the unfinished planning state. A FAQ visit should answer the question directly and should not force qualification. It can offer a plan when relevant and requested.

Recommend showing the useful result before asking for contact details. “Email me this plan” makes capture a delivery action. This changes the existing gate and should be treated as a proposed product decision, not an implemented change. Delivery must be configured and verified before promising email.

## Reuse already present

- `lib/agent-content/searchAgentContent.ts`: validated public search with bounded results and excerpts.
- `lib/agent-content/readAgentContent.ts`: bounded document reads using registry IDs and public URLs.
- `lib/workflow-plan/schema.ts`: structured result contract.
- `lib/workflow-plan/planText.ts`: downloadable/email text representation.
- Existing lead capture and signed email delivery routes: reusable after checking semantics, idempotency and delivery configuration.

The current answer schema requires fixed-choice arrays. It needs an explicit conversational brief representation for unknowns, free-text context, corrections and provenance. Do not silently coerce arbitrary conversation into the old three-answer form.

Public content search is a useful starting point, not proof that the source corpus is complete, current or an effective FAQ retrieval system. Evaluate actual buyer questions against it before adding a vector database.

## Proposed structure

- `agent/instructions.md`: identity, tone, boundaries and conversation behavior.
- `agent/skills/workflow-planning.md`: discovery and plan revision procedure.
- `agent/skills/recoup-questions.md`: grounded answers with public links.
- `agent/tools/search_recoup.ts` and `read_recoup.ts`: wrappers around current public registry.
- `agent/tools/update_brief.ts`: validated visitor context updates.
- `agent/tools/publish_plan.ts`: validates and emits the latest structured artifact.
- `agent/lib/`: per-session state and policy helpers.
- `agent/channels/eve.ts`: website identity, authorization and inbound context.
- `evals/`: multi-turn planning, FAQ and security checks.
- Shared React conversation components, with planner and FAQ layouts.

These names are a proposal, not a scaffolding claim. Entry context is a small allowlisted application field, such as planner or FAQ plus the public page ID. It does not grant extra privileges. Shared agent definition does not mean shared visitor memory.

## Production requirements

Eve route authentication does not automatically enforce session ownership. Use an opaque signed visitor cookie and server-side session ownership checks without requiring an account. Protect transcript reads, streams, continuation, cancellation, artifacts and delivery endpoints. Test cross-visitor access explicitly.

Use `defaultTools: false` and add only the needed authored tools. No arbitrary shell, unrestricted web access, private CRM reading or authenticated catalog access for this public experience. Authored tools run in the trusted runtime; sandbox policy does not secure those tools for us.

Define transcript retention and deletion, trace redaction and contact handling. Existing copy that says answers only stay in the browser will become inaccurate with durable server sessions and must change. Never persist all visitors in one global memory namespace.

Use shared production rate/spend controls, bounded turns and outputs, idempotent delivery and a useful failure state. The current per-instance request limiter is not sufficient to enforce a distributed spend ceiling. Prewarm after interaction (such as input focus), not automatically for every ad impression. Measure first response latency and cost; no cost or latency estimates have been validated here. Disabling default tools does not establish that runtime sandbox costs are zero.

## Acceptance checks

1. A vague request gets one understandable follow-up; a detailed request is not asked to repeat itself.
2. Planner → Recoup FAQ → planner retains context without forcing the visitor back through a script.
3. Multiple workflow interests result in an explained first recommendation; users can correct it.
4. Plan visibly uses supplied inputs and labels unknowns; no invented savings, integrations, results or client claims.
5. FAQ answers cite approved public material or acknowledge unavailable information.
6. Refresh/reconnect recovers only the visitor's own session and artifact.
7. One visitor cannot read or continue another visitor's session.
8. Email is sent only on request, to the submitted recipient, once per intended delivery; failures are honest.
9. Track time to first useful recommendation, plan creation, revisions, requested emails, qualified inquiries, abandonment, latency and cost per useful plan.

Ship a preview first, exercise Eve evals against the real HTTP surface, and compare against the present form. A chat UI is a product hypothesis, not evidence of higher conversion.

## Sources

- [Eve project structure](https://eve.dev/docs/concepts/project-structure)
- [Next.js integration](https://eve.dev/docs/guides/frontend/nextjs)
- [Frontend hook and custom rendering](https://eve.dev/docs/guides/frontend/overview)
- [Dynamic capabilities](https://eve.dev/docs/guides/dynamic-capabilities)
- [Durable state](https://eve.dev/docs/concepts/state)
- [Authentication and session ownership](https://eve.dev/docs/guides/auth-and-route-protection)
- [Built-in tool controls](https://eve.dev/docs/concepts/built-in-tools)
- [Typed tools and streamed results](https://eve.dev/docs/tools)
- [Security model](https://eve.dev/docs/concepts/security-model)
- [Sandbox lifecycle and policy](https://eve.dev/docs/sandbox)
- [Evals](https://eve.dev/docs/evals/overview)
- [Deployment](https://eve.dev/docs/guides/deployment/vercel)
- [Changelog](https://eve.dev/changelog)
- [Repository and beta status](https://github.com/vercel/eve)
