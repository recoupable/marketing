# Website Audit — Catalog-Fund Diligence Buyer (v3)

**Persona:** Catalog acquisition / music-fund operator (grounded in `strategy/transcripts/may-2026-dealguy.md`). London-based, solo consultant + exclusive buy-side client doing ~140 catalogs/year. Lives in Power Query / Power BI. Just signed up for Claude this week, hasn't even installed the desktop app yet. Came from a LinkedIn post about **"agentic catalog diligence"** / the open-sourced **catalog plugin**.

**What I actually need:** A first-pass diligence engine — ingest a messy data room, spit out 3–4 years of income, top tracks, vintage, rights coverage, a ballpark valuation input — fast. I tune away ~90% of "can you do a quick valuation?" requests because the data-aggregation lift is brutal. I am the highest-value buyer and the hardest to convince. **I do not trust a tool until I SEE a real (even anonymized) diligence/income output.** I also can't deploy AI for my buy-side client unless I can guarantee nothing trains on their data (their fund is licensed).

**Audited:** Tuesday Jun 2, 2026, against `http://localhost:3000` (latest code).

---

## TL;DR

- **v2 score: 5/10 → v3 score: 6/10.**
- **One-line why:** The copy finally says my words — "diligence" and "royalty intelligence" now appear on `/consulting` and `/partners`, and `/trust` nails my no-train objection cold — but the single thing that converts me, **a sample diligence output I can SEE, still does not exist anywhere**, and the homepage's one catalog-diligence hook *still* dead-ends in a generic marketing-ops quiz.
- The site got more credible and more honest. It did not get more *provable* for my use case.

---

## Section-by-section walkthrough

### Homepage (`/`) — NOT changed this round, so I re-checked the v2 findings

The hero — *"Put AI to work inside your music business… a research lab and implementation partner for labels, catalogs, and platforms"* — is clean and I'm in the named audience ("catalogs"). Good. The sub-line *"You own what we build. We never train on your data."* is exactly the promise my licensed client needs — but it renders at `text-[12px]` / `opacity 40%` and is **unlinked** (`marketing/app/page.tsx:242-244`). The single most important sentence for a fund buyer is the smallest, faintest, least-clickable text on the page. **v2 finding stands.**

- **§2 logos** ("Used by teams at") are still bare `<img>` in a `<span>` — **no links** (`page.tsx:255-265`). I can't click through to verify a single one. As a diligence guy, unverifiable logos read as decoration, not proof. **v2 finding stands.**
- **§3 lanes** — "Research / Build / Partner." The **Partner** lane CTA "Talk to us" → `/consulting` (`page.tsx:184`). It resolves (200), not broken. Fine.
- **§5 "The gap"** lists *"Diligence, A&R, content ops — none of it built in"* (`page.tsx:345`). Seeing "Diligence" named as a first-class workflow is a small trust bump — the site knows my job exists.
- **§9 pull-quote** — this is the one built for me: *"Catalog diligence is one of the biggest pain points I have. Cut it down to minutes and it changes how we buy." — Catalog fund operator.* That is **my exact sentiment** (it could be a paraphrase of my own transcript). And then the CTA underneath it says **"See what an AI readiness audit surfaces" → `/audit`** (`page.tsx:530`). I clicked expecting a sample diligence read. Instead (see `/audit` below) I got a 7-question marketing-ops lead quiz. **This is the same bait-and-switch from v2, 100% intact** — verified in rendered HTML: the quote, the CTA text, and `href="/audit"` are all still there. This is the most damaging single moment on the site for me, because it's positioned as *the* catalog-diligence proof point and it delivers a content-marketing quiz.
- **§10 "The proof — We run our own labels"** → `/company/recoup-records`. Good instinct (dogfooding builds trust), but the proof shown is release planning, content, audience growth for their artist Gatsby Grace — **not diligence or valuation**. So the "proof" doesn't prove *my* use case.

**Homepage verdict for me: unchanged. The hook that's literally about catalog diligence still leads to a marketing quiz.**

### `/consulting` — the page everything funnels to (rebuilt this round)

This is the biggest real improvement for me, and credit where due:

- **Personal-résumé credentials are gone** — I verified there is no "10+ Platinum," "$2.5M," "Beyoncé," or "US patent" anywhere. v2's cringe is fixed. Company-first now.
- It **names my work twice**: "Custom agents & skills — *the work generic tools can't do — diligence, royalty analysis, release ops*" (`consulting/page.tsx:33`) and an audience card "**Catalogs & rights owners** — *Diligence, royalty intelligence, and audience development on top of the data you already hold*" (`:45`). In v2 every path funneled to a *generic* consulting page; now the consulting page explicitly speaks to catalog diligence. **v2 complaint #4 is partially fixed** — the destination is no longer generic.
- The no-train guarantee is restated in the hero and FAQ, and the ownership line here *is* linked to `/trust` (`:122-130`), unlike the homepage.
- Transparent floor: "Sessions start at **$500**" (`:243`). I like a number; it tells me this is a real services engagement, not a mystery enterprise dance.

**But:** the primary CTA is a `mailto:` (`consulting/page.tsx:14`). There is still **nothing to look at** before I email a stranger. For a buyer who explicitly said "I have a sense when the output's wrong" and won't trust a black box, "email us" with zero artifact is a big ask. The page tells me they *can* do diligence; it never *shows* me diligence.

### `/audit` — re-read closely per instructions

Scrubbed of personal creds and hardcoded prices (good hygiene), but **the scrub did not change what it is**: a 7-question AI-readiness lead quiz about *marketing ops*. Questions are roster size, "hours per week on **marketing** ops," "content per week," "biggest operational bottleneck," "monthly **marketing ops** budget" (`marketing/lib/copy/audit.ts:38-97`). The only catalog option in the whole quiz is **"Catalog marketing (back catalog)"** (`:82`) — i.e., reactivating dormant tracks, the *opposite* of acquisition diligence. The result tiers route to `/platform`, `/consulting`, `/pricing`. **Nothing here serves diligence intent.** So the §9 catalog-diligence quote pointing here remains a true mismatch — arguably worse, because the quote raised my hopes specifically.

### `/platform` & `/developers` — where I'd hunt for the plugin I came for

The skill shelf (homepage + platform + developers) lists exactly five packs: **Music Research, Chart Metrics, Content Creation, Release Management, Streaming Growth** (`page.tsx:34-70`, `lib/copy/platform.ts:19`, `lib/copy/developers.ts:17`). **There is no catalog / diligence / valuation skill on the shelf.** The LinkedIn post that brought me here was about the *catalog plugin* ("agentic catalog diligence"); the Music Research pack only mentions it obliquically ("the groundwork for catalog and deal research"). So the one artifact I was promised — the thing I could `npx skills add` tonight and run against a data room — **is not findable or installable from this site.** That's a NEW, sharper version of my "nothing to see" complaint: it's not just no sample output, it's no *product* for my use case on the shelf at all.

### `/pricing`

Three clear tiers: Open (free), Chat (from $19/mo), Implementation (Custom, "For labels, catalogs & platforms"). Honest, no fake enterprise pricing. FAQ names "catalog analysis." Fine for me, but Implementation = "Talk to us," so same wall: no artifact, no scoped diligence offer.

### `/trust` — the page that closes my #1 objection (and I almost didn't find it)

This is genuinely strong for me. It opens with *"For labels, catalogs, and rights owners, the first question is always the same: who owns this, and is my proprietary data safe?"* (`trust/page.tsx:58`) and answers: you own it, **we never train on your catalog/royalty/contracts**, org-owned private repos, scoped+revocable access, *"we'll put it in writing before any engagement starts."* That is exactly what my licensed buy-side client's compliance needs to hear (matches my transcript almost verbatim). **The problem: `/trust` is not in the header nav** (`lib/nav.ts` = Research, Platform, Pricing, Consulting). The page that resolves my single biggest blocker is buried — reachable only via a tiny homepage shelf link or from inside `/consulting`. **v2 finding stands.**

### `/company`, `/company/about`, `/company/vision`, `/company/recoup-records`

Consistent "research lab + implementation partner" positioning, dogfooding story is believable. Recoup Records page lists what the label runs on — release planning, artist/catalog research, content, audience growth (`lib/copy/company.ts:61-82`) — but again, **no diligence/valuation workflow shown**, so it's proof of a different job than mine.

### `/blog` (+ posts)

Renders fine (13 posts, all 200). `ai-catalog-marketing-passive-revenue.mdx` and `how-labels-use-ai.mdx` are about *catalog marketing / reactivation*, not acquisition diligence — relevant to a label, tangential to me. `how-labels-use-ai.mdx:131` links "Book an advisory session →" to `/advisory`, which 308-redirects to `/consulting` (works, but via redirect). Blog CTA is now a clean email capture (de-crufted) — fine.

### `/privacy-policy`, `/terms-of-use`

Live (200). Didn't block me.

---

## Links / status table

| Path | Status | Notes for me |
|---|---|---|
| `/` | 200 | §9 catalog-diligence quote CTA still → `/audit` (mismatch) |
| `/consulting` | 200 | Names diligence + royalty intelligence; CTA is `mailto:`; no sample |
| `/platform` | 200 | No catalog/diligence skill on the shelf |
| `/pricing` | 200 | Implementation = "Custom / Talk to us" |
| `/developers` | 200 | Same 5 skills; no catalog plugin listed |
| `/partners` | 200 | "Catalog & rights platforms" names diligence — but for platforms embedding, not me |
| `/trust` | 200 | Closes my no-train objection; **not in header nav** |
| `/company` `/about` `/vision` `/recoup-records` | 200 | Dogfood proof is release/content, not diligence |
| `/blog` (+ 2 posts) | 200 | Catalog *marketing* content, not acquisition diligence |
| `/audit` | 200 | Generic marketing-ops quiz; only catalog option = "back catalog marketing" |
| `/privacy-policy` `/terms-of-use` | 200 | Live |
| `/advisory` → `/consulting` | 308 | Clean redirect |
| `/solutions` → `/platform` | 308 | Clean |
| `/results` → `/company/recoup-records` | 308 | Clean |
| `/resources` → `/developers` | 308 | Clean |
| `/calculator` → `/consulting` | 308 | Clean (note: not an actual calculator) |
| `/playbook` → `/platform` | 308 | Clean |
| `/learn` → `/blog` | 308 | Clean |
| `/records` → `/company/recoup-records` | 308 | Clean |
| `/diligence` `/catalog` `/catalog-diligence` `/skills` | 404 | The framing I came for is not a destination |
| research.recoupable.com | 200 | Reachable |
| chat.recoupable.com | 200 | Reachable |
| developers.recoupable.com | 200 | Reachable |
| github.com/recoupable/skills | 200 | Reachable (but no catalog skill surfaced from the site) |
| x.com/recoupable | 200 | Reachable |

All redirects and externals are healthy. No dead internal links found.

---

## v2 → v3 scorecard

| My 4 v2 complaints | v3 status |
|---|---|
| 1. No visible sample diligence/income output anywhere | **Unchanged.** Still nothing to SEE. |
| 2. No "diligence" home/page — the framing I came for isn't on the shelf | **Unchanged at the page level** (`/diligence`, `/catalog` = 404) but **softened**: "diligence" is now named on `/consulting` and `/partners`. Still no installable catalog skill. |
| 3. §9 catalog-diligence quote → `/audit` marketing quiz = bait-and-switch | **Unchanged.** Quote, CTA text, and `/audit` target verified intact; `/audit` is still a marketing-ops quiz. |
| 4. Every path funnels into one generic consulting page | **Partially fixed.** `/consulting` is rebuilt and now explicitly addresses catalogs, diligence, and royalty analysis — no longer generic. |

**Score: v2 5/10 → v3 6/10 (+1).**

Reasoning: +1 for the consulting rebuild speaking my language (diligence + royalty intelligence named, credentials scrubbed) and for `/trust` directly answering my no-train objection. **No further points** because the conversion-defining gap is wholly unaddressed: there is still zero artifact to look at, the catalog plugin I was promised on LinkedIn isn't on the shelf, and the homepage's one catalog-diligence hook still routes me into a content-marketing quiz. Framing improved; proof did not. A diligence buyer scores on proof.

---

## Top fixes, ranked (for me to convert)

1. **Ship a visible, anonymized sample diligence output.** A real (redacted) artifact: data-room → income summary (3–4 yrs), top tracks, vintage, rights coverage, ballpark valuation inputs. Put it on a real `/diligence` (or `/catalog-diligence`) page. This is the single thing that moves me from 6 to 9. *Right now nothing on the site lets me SEE the work.*
2. **Repoint the §9 catalog-diligence CTA away from `/audit`.** The quote is about catalog diligence; the CTA must go to the diligence sample/page from fix #1 — not a marketing-ops quiz (`marketing/app/page.tsx:530`). Until #1 exists, at minimum point it to `/consulting`.
3. **Put the catalog/diligence skill on the shelf and link it.** The LinkedIn hook was the catalog plugin; the shelf (`page.tsx:34-70`) has no catalog skill. Add it with a one-command install and a GitHub deep-link so I can run it against a data room tonight — exactly the "install it on your local Claude, make it your own" flow I was promised on the call.
4. **Put `/trust` in the header nav** (`marketing/lib/nav.ts`). It resolves my biggest compliance blocker (licensed-fund no-train) and is currently buried.
5. **Make the homepage ownership line bigger and link it to `/trust`** (`page.tsx:242-244`), and **make the customer logos clickable** (`page.tsx:255-265`). The most important promise shouldn't be the faintest text, and "trusted by" should be verifiable.
