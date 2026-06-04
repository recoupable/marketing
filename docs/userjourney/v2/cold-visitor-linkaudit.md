# Cold Visitor + Link / IA Audit — v2

**Auditor hats:** (1) skeptical first-time visitor running the 5-second test; (2) IA/link auditor mapping every nav path.
**Scope:** READ-ONLY. No site source modified.
**Files read:** `app/page.tsx`, `lib/nav.ts`, `components/layout/Footer.tsx`, `next.config.ts`, `lib/copy/platform.ts`, `lib/config.ts`, `lib/customerLogos.ts`, `app/solutions/page.tsx`, `app/resources/page.tsx`, `app/results/page.tsx`, plus full `app/**/page.tsx` route inventory.

---

## Score: 7.5 / 10  (v1 was 6/10 — **improved**)

The four dead-ends and the header gap that dragged v1 down are genuinely fixed: every internal link on the homepage, header, and footer now resolves to a real route, the open-tools shelf and Build section have working CTAs, the `/platform` CTA points to `/partners`, and Platform + Pricing are promoted into the header. Trust is also stronger. The remaining drag is **information architecture**: route sprawl is unresolved (and slightly worse), several real pages are orphaned, logos are still unclickable, and a "Coming soon" stub still ships.

---

## 5-Second Test (current)

**Verdict: clear pass** (v1 was a marginal pass).

- **What is this?** "Put AI to work inside your music business." + subhead "Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack." → unambiguous. (`app/page.tsx` §1, lines 228–233)
- **Who is it for?** Explicitly named: labels, catalogs, platforms. → clear.
- **Why trust it?** Two trust signals now land in the first viewport region: a customer-logo row ("Used by teams at" — Atlantic, Warner, 300, Rostrum, Fat Beats, ONErpm, Duetti, Big Ass Kids; `customerLogos.ts`) and the reassurance line "You own what we build. We never train on your data." (line 243). Trust moved from *weak* (v1) to *adequate*.
- **Residual nit:** the logos read as a clickable trust wall but are static `<img>` inside `<span>` with no link (§2, lines 255–265). A skeptic who tries to click a logo for proof gets nothing.

---

## Full Link Table

Every internal href in the homepage, header, and footer. External links (research/app/docs/social/mailto subdomains) noted but not route-checked.

| Link text | Destination | Exists? | Content matches? |
|---|---|---|---|
| **Header** | | | |
| Research | `research.recoupable.com` | n/a (external) | Yes |
| Platform | `/platform` | ✅ | Yes — product overview |
| Pricing | `/pricing` | ✅ | Yes |
| Consulting | `/consulting` | ✅ | Yes |
| **Homepage** | | | |
| Talk to us (hero) | `/consulting` | ✅ | Yes |
| Read our research (hero) | `research.recoupable.com` | n/a (external) | Yes |
| Read our research (Research lane) | `research.recoupable.com` | n/a (external) | Yes |
| See the tools (Build lane) | `/platform` | ✅ | ⚠️ Partial — lane promises "tools"; `/platform` is a conceptual Agents/Workflows/Data overview, not an installable tool list |
| Talk to us (Partner lane) | `/consulting` | ✅ | Yes |
| Read the latest (Research §4) | `research.recoupable.com` | n/a (external) | Yes |
| Read the API docs (Build §6) | `developers.recoupable.com` | n/a (external) | Yes |
| Talk to partnerships (Build §6) | `/partners` | ✅ | Yes |
| we never train on your data (Shelf) | `/trust` | ✅ | Yes |
| View on GitHub / Browse all skills | `github.com/recoupable/skills` | n/a (external, parent-verified 200) | Yes |
| Chat (Shelf) | `chat.recoupable.com` | n/a (external) | Yes |
| we'll set them up for you (Shelf) | `/consulting` | ✅ | Yes |
| Talk to us (Consulting band) | `/consulting` | ✅ | Yes |
| See what an AI readiness audit surfaces | `/audit` | ✅ | Yes |
| See how we dogfood (Proof) | `/company/recoup-records` | ✅ | Yes |
| Talk to us (Final CTA) | `/consulting` | ✅ | Yes |
| Read our research (Final CTA) | `research.recoupable.com` | n/a (external) | Yes |
| **Footer** | | | |
| Consulting | `/consulting` | ✅ | Yes |
| Research | `research.recoupable.com` | n/a (external) | Yes |
| Recoup Records | `/company/recoup-records` | ✅ | Yes |
| Contact | `mailto:hi@recoupable.com` | n/a (mailto) | Yes |
| Platform | `/platform` | ✅ | Yes |
| Partners | `/partners` | ✅ | Yes |
| Developers | `/developers` | ✅ | Yes |
| API Docs | `developers.recoupable.com` | n/a (external) | Yes |
| Pricing | `/pricing` | ✅ | Yes |
| About | `/company/about` | ✅ | Yes |
| Vision | `/company/vision` | ✅ | Yes |
| Trust & Governance | `/trust` | ✅ | Yes |
| Open app | `chat.recoupable.com` | n/a (external) | Yes |
| Privacy | `/privacy-policy` | ✅ | Yes |
| Terms | `/terms-of-use` | ✅ | Yes |

**Result: 0 broken internal links.** Every internal destination on the homepage, header, and footer resolves to a real route. The only soft flag is the "See the tools" → `/platform` promise-vs-content slippage.

---

## v1 Dead-Ends: Resolved or Not

- **(a) Open-tools shelf broken commands** — ✅ **Resolved.** Single working install (`npx skills add recoupable/skills`, line 23), a per-skill GitHub deep link, and a "Browse all skills" repo link (§7, lines 437–474). Parent verified HTTP 200.
- **(b) Build §6 dead-end (no CTA)** — ✅ **Resolved.** Now has two CTAs: "Read the API docs" (docs) and "Talk to partnerships" → `/partners` (§6, lines 381–396).
- **(c) `/platform` CTA pointed at chat app** — ✅ **Resolved.** `platformCopy.ctaHref = "/partners"` (`lib/copy/platform.ts` line 42).
- **(d) Header missing Platform/Developers/Pricing** — ✅ **Mostly resolved.** Header is now Research / Platform / Pricing / Consulting (`lib/nav.ts`). Platform + Pricing promoted. (Developers remains footer-only — acceptable; it's a niche audience.)
- **Duplicate/orphan routes (redirects)** — ⚠️ **Partially resolved.** `next.config.ts` now 301s `/records → /company/recoup-records` and `/advisory → /consulting` (plus `/company/recoupable-records`). But the broader sprawl (below) is untouched, and no redirects exist for `/solutions`, `/calculator`, `/resources`, `/results`, or the `/learn` cluster.

---

## Remaining IA / Route-Sprawl Issues (ranked)

Full route inventory (28 page files): `/` `/advisory` `/advisory/book` `/audit` `/blog` `/blog/[slug]` `/calculator` `/company` `/company/about` `/company/recoup-records` `/company/vision` `/consulting` `/developers` `/learn` `/learn/demos` `/learn/playbooks` `/learn/use-cases` `/partners` `/platform` `/playbook` `/playbook/download` `/pricing` `/privacy-policy` `/resources` `/results` `/solutions` `/terms-of-use` `/trust`.

1. **Learn/content cluster is sprawling and partly orphaned (worst).** `/learn`, `/learn/demos`, `/learn/playbooks`, `/learn/use-cases`, `/playbook`, `/playbook/download`, `/resources`, `/results`, `/blog` all coexist. The task's expected route list didn't even include `/learn/playbooks` and `/learn/use-cases` — so the sprawl has *grown*, not shrunk. None of these are surfaced in header or footer, so they're orphans reachable only by URL.
2. **`/resources` ships a "Coming soon" stub.** `app/resources/page.tsx` (lines 12–23) is a bare placeholder — yet its metadata claims "Blog & Demos." A live "Coming soon" page is worse than no page; it should be removed or redirected to `/blog`.
3. **`/platform` vs `/solutions` overlap, `/solutions` orphaned.** `solutionsCopy` ("AI-powered solutions for artists, labels, distributors…") covers nearly the same conceptual ground as `platformCopy`. Only `/platform` is in the nav now; `/solutions` is an orphan duplicate. Redirect `/solutions → /platform`.
4. **`/audit` vs `/calculator` still duplicated.** Both exist. `/audit` is linked (homepage pull quote); `/calculator` is orphaned and conceptually overlaps. Pick one canonical; redirect the other.
5. **`/results` is a polished, orphaned case-study page.** `app/results/page.tsx` is a real, well-built results page with case studies and CTAs — but nothing links to it. It's the single best "why trust" asset on the site and it's invisible. Either surface it in nav/homepage or fold it into the proof section.
6. **`/advisory/book` orphan.** `/advisory` now 301s to `/consulting`, but the child `/advisory/book` page still exists with no redirect and no inbound link — a stranded booking page.
7. **`/company` vs `/company/about` overlap.** Both index-level company pages exist; clarify which is canonical.
8. **Logos still unlinked.** Carried over from v1 — the trust wall (§2) is non-interactive `<img>` markup.

---

## The One Structural Thing That Would Most Improve the Site

**Collapse the duplicate intent routes with 301 redirects and stand up a single content hub.** Right now intent is split across near-identical pages (`/platform`≈`/solutions`, `/audit`≈`/calculator`) and content is scattered across six+ routes (`/learn/*`, `/playbook`, `/playbook/download`, `/resources`, `/results`, `/blog`). One canonical page per intent — redirect `/solutions → /platform`, `/calculator → /audit`, `/resources → /blog`, and consolidate the learn/playbook/results pages under one hub — would eliminate the orphans, kill the "Coming soon" stub, surface the strong `/results` proof, and give crawlers and cold visitors a single clear path per question. This is the highest-leverage fix because the link-level problems are already solved; the remaining damage is purely structural duplication.
