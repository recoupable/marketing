# Platform / Distribution Lead — User Journey Audit (v3)

**Persona:** Daniel Rowland archetype — Head of Strategy & Partnerships at a broad creator-tools company / DSP (grounded in `strategy/transcripts/may-2026-landr.md`). I run a music distribution platform. I am evaluating **embedding Recoup into our product** (OEM / API / MCP) so our users get music-aware agents without us standing up a model team.

**My job-to-be-done on this site:** (a) find the partner story without spelunking, and (b) see enough commercial structure plus **at least one number** to take a deal back to my CEO and size it.

**My deal questions:** embed/OEM vs API vs co-built? who pays for tokens? rev-share or licensing economics? do they train on our or our users' data? agent discovery? Who keeps the customer relationship?

**Audit date:** 2026-06-02 · **Build:** localhost:3000 (latest) · **v2 score:** 8/10

---

## TL;DR

The partner story is strong and answers 5 of my 6 deal questions clearly — `/partners` is genuinely good content and it's now reachable from `/platform` (the page I'd actually land on as a tech buyer). But **all three of my v2 complaints are still open**: the homepage "Partner" lane still routes me to `/consulting`, there's still no Partners entry in the header nav, and the commercials are still 100% qualitative — not a single illustrative number to size a deal. The homepage was untouched by design, so my two navigation blockers persist exactly as flagged. The one number I asked for still isn't there, and that's what caps a B2D embed deal: I can't walk into a partnership meeting with "directionally, it's X% rev-share or ~$Y per run."

**v3 score: 8/10** (unchanged). The partner narrative quality and the new `/platform → /partners` path are real gains, but they're offset by zero movement on the three issues I explicitly raised.

---

## The path I actually take (homepage → partner story)

I don't read a homepage top to bottom. As a platform/tech buyer I scan for the word that matches my intent — "Partner," "API," "embed," "integrate."

1. **Land on `/`.** Hero is consulting-first: "Put AI to work inside your music business… research lab and implementation partner." Primary CTA is **"Talk to us" → `/consulting`**. Nothing partner/OEM-flavored above the fold.
2. **Header nav** (`lib/nav.ts`): `Research · Platform · Pricing · Consulting`. **No "Partners."** My most natural click — there isn't one. So I either click **Platform** (tech instinct) or scroll.
3. **"How we work" lanes** — three cards: Research / Build / **Partner**. I see "**Partner** — We implement it with you" and click it expecting OEM/embed terms… → it sends me to **`/consulting`** (advisory). `/consulting` doesn't even list platforms/DSPs as a buyer type. **Dead end relative to my intent.** This is the single most intuitive door and it misroutes me — exactly my #1 v2 complaint.
4. **Recovery path (this is the v3 improvement):** If instead I clicked **Platform** (or scrolled to the dark "One harness, many workflows" BUILD band), I find a **"Talk to partnerships" → `/partners`** CTA. The rewritten `/platform` page now carries the same link. So a tech buyer who follows the API/MCP scent *does* reach the partner story — just not through the door labeled "Partner."
5. **`/partners`** finally speaks to me directly: "Put music intelligence inside your product… keep your brand, your customer, and your data boundary." This is the page I wanted.

**Verdict on the path:** It works *if* I behave like a developer and follow "Platform." It breaks if I behave like a partnerships lead and follow "Partner." For my persona that's a coin flip, and the coin is mislabeled.

---

## `/partners` — does it answer my deal questions?

Source: `marketing/app/partners/page.tsx` (standalone page; not in `lib/copy/`). Content holds up well.

| My deal question | Answered? | What the page says |
|---|---|---|
| Embed/OEM vs API vs co-built? | ✅ Yes | Three explicit "Ways to partner": **Embed / OEM** (run behind your UI/brand), **API & MCP** (call directly or over MCP), **Co-built agents** (built with your team, handed to a repo you control). |
| Who pays for tokens? | ✅ Yes | "Your choice. Bring your own model keys… fold usage into your plans, or have us meter and bill it back. Transparent about per-run cost either way." |
| Do you train on our / our users' data? | ✅ Yes | "No. We never train models on your catalog, your users' data, or anything that runs through a partnership." Matches the core promise. |
| Agent discovery? | ✅ Yes | "Skills are open and MCP-native — agents discover and call your integration the way they discover any tool." |
| Who keeps the customer relationship? | ✅ Yes | "You keep the customer relationship and the data boundary" (Embed/OEM card + hero). |
| **Rev-share / licensing economics with a real number?** | ❌ **No** | "Usage-based by default… for embed/OEM we also do rev-share or platform licensing. We scope it to your volume on the first call; nothing here is a fixed public tier." **Zero figures — no illustrative %, no per-run $, no per-seat.** |

5 of 6. Same as v2. The sixth is the one that determines whether I can size a deal.

---

## Re-checking my three v2 complaints

### 1. Homepage "Partner" lane links to `/consulting`, not `/partners` — ❌ NOT FIXED
`marketing/app/page.tsx`, `LANES` array: the **Partner** lane is `{ k: "Partner", h: "We implement it with you.", href: "/consulting", cta: "Talk to us" }`. Rendered homepage shows **8× `href="/consulting"`** and only **2× `href="/partners"`** (both from the dark BUILD band's "Talk to partnerships"). The card literally labeled "Partner" still funnels me into advisory that doesn't mention platforms. Homepage was untouched this cycle, so this is unchanged — and it's still my biggest friction point.

### 2. No Partners entry in the header nav — ❌ NOT FIXED
`marketing/lib/nav.ts`: `Research · Platform · Pricing · Consulting`. `grep -i partner lib/nav.ts` → no match. A partnerships lead's most natural global click still doesn't exist. I have to infer that "Platform" is my door.

### 3. Commercials are all qualitative — zero numbers — ❌ NOT FIXED
`/partners` "Commercials & data" section is four `<details>` accordions, all prose. Stripped-body scan for `$`, `%`, `bps`, `per-seat` finds **no pricing figures** (the `$1–$99` matches in raw HTML are minified-JS/chunk-hash noise, not copy). The words "per-run cost" and "rev-share" appear but with **no value attached**. I still cannot anchor a deal. One illustrative line — "embed deals typically land around X–Y% rev-share, or ~$Z per agent run at your volume" — would move this from 8 to 9–10 for me.

**Summary: 0 of 3 fixed.** Two are a direct consequence of the homepage/nav being out of scope this cycle; the third (numbers) was in scope for `/partners` and still wasn't added.

---

## What genuinely improved in v3 (credit where due)

- **`/platform` now routes to `/partners`.** `marketing/app/platform/page.tsx:121` has `href="/partners"` + "Talk to partnerships." Combined with the page's "music layer for agents / bring your own agent, Recoup plugs in / MCP" framing, the tech-buyer path to the partner story is materially stronger than relying on the homepage alone. This is the path my persona is *most* likely to actually walk.
- **`/platform` itself reads like an embed pitch:** open skills, API, MCP ("any agent — yours, your team's, or your customers' — can securely call Recoup's music tools with no custom glue code"), integrations with explicit allow-listing, and Chat as the non-technical on-ramp. That MCP/"bring your own agent" language is exactly what I'd want to forward internally.
- **Hygiene is clean:** every target page is live, all legacy URLs redirect (308), all external surfaces resolve (see tables below). Nothing broke.

---

## Link & status verification

### Core pages (all 200)
| Path | Status |
|---|---|
| `/` | 200 |
| `/consulting` | 200 |
| `/platform` | 200 |
| `/pricing` | 200 |
| `/developers` | 200 |
| `/partners` | 200 |
| `/trust` | 200 |
| `/company` | 200 |
| `/company/about` | 200 |
| `/company/vision` | 200 |
| `/company/recoup-records` | 200 |
| `/blog` | 200 |
| `/audit` | 200 |
| `/privacy-policy` | 200 |
| `/terms-of-use` | 200 |

### Redirects (all 308 → correct target)
| From | Status | → To |
|---|---|---|
| `/advisory` | 308 | `/consulting` |
| `/solutions` | 308 | `/platform` |
| `/results` | 308 | `/company/recoup-records` |
| `/resources` | 308 | `/developers` |
| `/calculator` | 308 | `/consulting` |
| `/playbook` | 308 | `/platform` |
| `/learn` | 308 | `/blog` |
| `/records` | 308 | `/company/recoup-records` |

### External surfaces (all 200)
| URL | Status |
|---|---|
| research.recoupable.com | 200 |
| chat.recoupable.com | 200 |
| developers.recoupable.com | 200 |
| github.com/recoupable/skills | 200 |
| x.com/recoupable | 200 |

### Partner-path link integrity
| Source | Link | Notes |
|---|---|---|
| `/` hero CTA | `/consulting` | consulting-first |
| `/` "Partner" lane card | `/consulting` | ❌ misroute for my intent |
| `/` dark BUILD band | `/partners` | ✅ "Talk to partnerships" |
| `/platform` | `/partners` | ✅ NEW/strengthened path |
| header nav | — | ❌ no Partners entry |
| `/partners` CTAs | `mailto:` partnership inquiry | functional |

---

## v2 → v3 score

**v2: 8/10 → v3: 8/10 (no change).**

**Reasoning:** The deliverable that decides an embed deal for me — a single directional economic number — still isn't on `/partners`, and the two navigation issues I flagged are untouched because the homepage and nav were out of scope. I'm giving real credit for the `/platform → /partners` link (it makes the partner story reliably findable via the path my persona actually uses) and for `/partners` content quality (5/6 questions, clean data-boundary promise). But those gains were already largely reflected in my 8. Nothing closed a blocker, so the number holds. I'm not at 9 because I still can't size a deal without scheduling a call, and the most intuitively-labeled door on the homepage still sends platform leads to advisory.

---

## Top fixes, ranked (what gets me to 9–10)

1. **Add one illustrative number to `/partners` commercials.** Even a guarded range — "embed/OEM deals typically land around X–Y% rev-share, or roughly $Z per agent run at platform volume; we scope exact terms on the first call." This is the difference between "interesting" and "I can pitch this internally." *(Highest leverage; `/partners` is in scope — no homepage dependency.)*
2. **Repoint the homepage "Partner" lane to `/partners`** (`app/page.tsx` `LANES`). One-line `href` change. The card literally says "Partner"; it should not land on advisory that omits platforms. *(Requires touching the homepage, which was held this cycle — flag it for the next homepage pass.)*
3. **Add "Partners" to the header nav** (`lib/nav.ts`). A partnerships lead's most natural global click currently doesn't exist; "Platform" is doing double duty as the partner door by accident.
4. **List "Distributors / DSPs / platforms" as a named buyer on `/consulting`,** or cross-link `/consulting → /partners`. Right now the misroute in (2) drops me onto a page with no info scent for my segment — a cross-link would soften the damage until (2) ships.
5. **Surface "you keep the customer relationship" and "we never train on partner data" higher on `/partners`** (they're correct but live below the fold / inside accordions). These are the trust lines my CEO asks about first.
