# Build the shared GTM engine here

Plan created 2026-09-14. This is the implementation starting point, not a claim of a running outbound system. New engine code belongs in [engine/](engine/).

## First useful result

Given a verified target company and a sourced industry observation, produce a useful content or outreach draft with the evidence and selection reasoning attached. Put it in a review queue. After an authorized release, connect actual responses and opportunities back to the originating account and content.

Start with the path from **account → evidence → draft → review** using public research and fictional contact fixtures. That can be built and checked without CRM credentials, scraping accounts, or sending anything.

## Current state

| Piece | State in this directory |
|---|---|
| Business context and working methods | Included |
| Company evidence, audience CSVs, interviews, principles | Included as dated research |
| App-user export and local report | Imported tools; see engine limitations |
| CRM person sync | Imported with default preview; live compatibility unverified |
| App-user email templates | Imported legacy drafts; no sender |
| Account-to-draft workflow and review queue | To build |
| Team-owned publishing, engagement collection, prospect enrichment | To build/configure after the offline workflow |
| Conversation and opportunity attribution | To build around CRM records |
| LinkedIn company matching and paid campaigns | Not completed |
| Scheduled GTM workers | Not created by this consolidation |

## Implementation sequence

### 1. Load and select accounts without external calls

Read the evidence CSV and relationship map. Preserve the original fields and source paths. Exclude held records; keep advisers and institutional teams separate from the core audience. Attach an explicit reason for selection. Do not convert a heuristic score into buying intent.

Produce a shortlist with stable account IDs, business descriptions, supporting evidence, research dates, relationship warnings, and unanswered questions. Make selection rules visible and configurable; the initial priority field is a research judgment, not a validated predictive model.

**Done when:** a fixture run is repeatable, held companies cannot enter the selected audience, parent/brand overlap is visible, and missing facts are shown rather than filled in.

### 2. Produce evidence-backed drafts and a review queue

Use the [content](playbooks/evidence-to-content.md) and [account research](playbooks/account-research-and-followup.md) methods. Start with a small local pipeline and structured records rather than a large dashboard. Keep the model provider behind a replaceable interface and use a fixture response for offline checks.

Each draft must identify its account or audience, source observation, evidence references, proposed message, unknowns, and intended channel. The queue should make it easy to approve, edit, or reject an exact version. The first implementation ends here.

**Done when:** another teammate can run the example from a fresh clone, trace each factual assertion, review the output without reading private consulting files, and see that no external write occurred.

### 3. Connect approved private records

Agree which CRM objects own companies, people, opportunities, and contact preferences. Inspect current Recoup lead intake before enabling the legacy direct Attio tool or adding a new writer. Verify API contracts, matching, pagination, rate limits, duplicate handling, and retry behavior with fixtures and a controlled authorized test.

Use private record IDs in runtime state. Public research remains in Git; personal data, actual outreach drafts with recipients, and sales records remain in private storage. The public repository needs examples with fictional data, not production exports.

**Done when:** a controlled record maps correctly, re-running does not create duplicates, declines/customer exclusions are honored, and a failed call leaves a clear retryable state without logging contact details.

### 4. Release approved messages and observe responses

Add a team-owned channel adapter only after the sender, destination, exact copy, approval process, and access are agreed. Separate approval from execution. Save the result returned by the channel and verify publication before marking an item live. Retry without duplicate sends.

Paid LinkedIn distribution is a separate channel: company matching and executive audience review come before a campaign plan and spend authorization. Do not infer live reach from the size of a CSV.

**Done when:** the approved version is the released version, its live ID/URL is stored, failures are visible, and responses can be connected to the original item. A schedule is optional later.

### 5. Learn which activity creates opportunities

Use the CRM for actual stage changes. Connect conversations to source material with explicit attribution labels: buyer mentioned it, tracking link observed, or unknown. Track qualified conversations, opportunities, proposals, wins/losses, and attributable revenue in private reporting. Keep content volume and website traffic as supporting measures.

Services revenue, software subscriptions, and API usage should remain distinguishable. Do not claim software growth from consulting invoices or forecast revenue from company counts. Delivery cost and customer capacity belong in private operating analysis.

**Done when:** a teammate can trace a reported opportunity to its evidence and actual CRM event, and unknown attribution remains unknown.

## Minimum records to design

| Record | Required context |
|---|---|
| Account | Stable ID, name, domain, segment, status, source evidence, checked date, relationships |
| Observation | ID, source URL/path, precise evidence reference, date, fact, interpretation, intended audience |
| Draft | ID, version, observation/account IDs, content, channel, status, reviewer, approved version |
| Release | Approved draft/version, channel result ID/URL, actual release time, execution status |
| Outcome | Source/release IDs, private CRM IDs, event type/time, attribution basis, next owner |

The team can choose the storage implementation. Keep workflow logic, credentials, schedule configuration, and runtime records separate so a script can be tested without its production services. Do not put a new database in front of a workflow that has not yet produced a useful reviewed draft.

## First-run handoff

Deliver the account-to-draft command, fictional fixtures, a sample review bundle, setup instructions, and checks for held accounts, unsupported claims, repeatability, and no external writes. Document remaining gaps. Then decide which live connection would answer the next business question.
