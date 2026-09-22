# Public website agent

`/workflow-plan` and `/ask` use one Eve agent (`agent/`) with different entry hints. The former starts with the visitor's work; the latter starts with Recoup questions. Both can produce a downloadable structured plan. Existing FAQ sections link to `/ask`.

The browser streams through `/api/website-agent`. Signed HttpOnly cookies bind access to one active session per browser. Only validated text messages, a planner/FAQ entry hint, cancellation, owned-session streaming and `turnPolicy: "steer"` on an owned session are forwarded. Approval responses, tool permissions, model overrides and arbitrary context are not accepted. Eve's channel separately requires a short-lived signed server grant. Default framework tools are disabled.

Approved tools: public-content search/read, session brief update and structured plan publication. There is no private Recoup account access, general browser, shell, email delivery or meeting booking. Plan downloads are text files. Contact links use the existing contact page. The old questionnaire components and endpoints remain for compatibility but do not render at `/workflow-plan`.

## Local development

Node 24+, `pnpm install`, `pnpm dev --port 3017`. Eve starts alongside Next. Set `WEBSITE_AGENT_SECRET` to a random value of at least 32 characters in `.env.local`; never commit it. Configure AI Gateway credentials supported by Eve. Optional `WEBSITE_AGENT_MODEL` defaults to `openai/gpt-5.4`.

Use default `pnpm build` (Turbopack). Eve 0.63.0 uses explicit resource-management syntax that the current Webpack build cannot parse. For local production runtime, run `pnpm exec eve build` before `pnpm start`. Runtime and generated artifacts are ignored in `.eve/` and `.output/`.

## Before production traffic

- Configure the same `WEBSITE_AGENT_SECRET` for the Next service and Eve service.
- Set `WEBSITE_AGENT_ORIGIN` to the canonical deployed origin when needed; Vercel preview origin is otherwise derived from `VERCEL_URL`. For local testing the gateway targets port 3017.
- Configure `KV_REST_API_URL` and `KV_REST_API_TOKEN` for shared Redis REST rate limits. Production fails closed without them. Current limits are 40 POSTs/IP/hour and 1,000 POSTs globally/hour; cancellations count too. These are abuse controls, not a hard infrastructure-spend ceiling.
- Provision Eve's Vercel runtime, storage and model credentials using the pinned version's deployment guide. Production sandbox denies network access; the agent's tools execute server-side and only expose public sources.
- Verify deployed streaming, source reads, session isolation, cancellation, reload and plan download. Local success does not prove the Vercel service deployment.
- Set the storage retention/deletion policy for visitor transcripts and align the privacy policy. The UI says messages are processed by AI and stored. Closing the tab does not delete server transcripts. Cookies expire after 24 hours; this is not a data-retention policy.
- Enable provider/infrastructure spending controls and evaluate response quality with representative executives. Per-session model limits are configured; public visitors cannot approve quota increases.

One active cookie-bound session is supported per browser. Starting a new conversation leaves prior server records intact but replaces browser access when the new session starts. Sessions are not shared across devices. Budget pauses show a contact/download fallback.

## Validation

### Conversation interface, September 21, 2026

`WebsiteAgent` owns session and entry state. `getConversationTurns` groups messages under user anchors, including Eve's in-place updates when a running turn receives a follow-up. `ChatTurn` retains activity, findings and reports in the transcript; `ChatComposer` holds only the compact question and reply controls. Do not move activity into the input dock. The shadcn Message Scroller anchors each user turn, rather than separate tool or assistant fragments.

Official AI Elements power messages, streaming Markdown, the prompt input, chain-of-thought presentation, sources, suggestions and report artifacts. The activity trail shows observed tool actions, not private model reasoning or simulated progress. It starts with a Thinking shimmer, reveals real work as it arrives, and preserves the user's open/closed choice through subsequent replies. Failed source reads are never counted as checked sources. JSON Render continues to render the validated report schema.

Context questions do not block public research. The opening turn asks about current AI use alongside the homepage read, then follows 2–4 relevant observed links while that question remains unanswered (six pages maximum). Keep the same question available until answered or skipped; incoming answers refine the remaining research without restarting completed reads. Verified locally with WMG: five sources were checked with no answer submitted, and the original question remained in the composer.

Source failures apply to individual pages. The reader preserves known HTTP statuses and safe failure reasons; a missing page does not discard successful research or instruct the agent to abandon it. Activity names the specific path, with a page-not-found label for new 404/410 results. Older saved results retain the generic failure reason but now show the full page path. September 22 investigation confirmed that Seeker's linked `/hiphop50` page returned HTTP 404 after four other pages had been read. The focused suite covers HTTP failures, retained evidence and safe error details (51 tests).

Structured question/report tools own their presentation. The client suppresses the model's subsequent prose restatement, while retaining ordinary conversational replies and errors. The visitor can answer during research, stop, continue, copy a response, collapse question choices, inspect source quotes and download the report as a text file. File/voice attachments are not exposed because the gateway accepts text only.

The question composer follows the supplied chat reference: a quiet Question header, vertical answers with circular numbers, and a custom reply row with Skip and Send. Selecting an option stages the answer; Send submits it. Typing a custom reply clears the option, and selections are scoped to the current question. Its information button reveals the question's context without occupying a separate row; Skip explicitly leaves the answer unknown. Questions remain collapsible, and a separate Stop control is available while research runs. September 22 browser checks covered selection without submission, custom typing, collapse/reopen, explanation and Escape dismissal, plus a 390 CSS-pixel viewport without horizontal overflow.

Verified in the live local browser: Seeker and WMG first-message placement; Thinking-to-research transition; compact mobile questions; multi-turn findings; expandable evidence; stop; a follow-up submitted during a running response; report generation and an actual downloaded text file. Tested responsive widths through the browser viewport override; the user's browser zoom makes 390 device pixels approximately 433 CSS pixels. No horizontal overflow was observed. Full suite: 353 tests across 94 files. TypeScript, scoped ESLint and `pnpm build` pass. The sandboxed build stalled; the identical build passed with normal local process access. No production deployment is implied.

### Earlier runtime validation

Verified locally: live plan generation and browser plan card, public-source Recoup answer in the same conversation, mobile 390px layout, FAQ entry, quarterly correction preserving the spreadsheet-only constraint, token/session ownership tests. Live unauthenticated Eve access returned 401; unowned session streaming returned 403. All 315 tests across 86 files passed; changed agent/UI code passed ESLint. App production and separate Eve runtime builds pass. Eve's MDX bundler emits non-fatal directive warnings. No production deployment or email delivery was performed.
