# Recoupable.com — v3 Audit

**Persona:** IP-sensitive rights/catalog company owner (grounded in `strategy/transcripts/may-2026-seeker.md`)
**Audited:** 2026-06-02, live at `http://localhost:3000`
**v2 score:** 8/10 → **v3 score:** 9/10

---

## Who I am and what I'm looking for

I own a rights/catalog company. I've watched my finance lead (Darren) quietly build a stack of Claude skills that save days of work, and I want to turn that into an org-wide capability. Everything in my buying decision routes through five questions, and they're not negotiable:

1. **Will you train models on my catalog/royalty data?** (My answer has to be: no, never.)
2. **Do I own what gets built?** (It has to be mine, not licensed back to me.)
3. **Can the skills/workflows live in a repo *my org* controls?** (So they're shareable across finance, and so they don't sit on one person's laptop.)
4. **Can access be scoped and revoked?** (Sensitive systems — royalty data, Drive, distributors.)
5. **What happens at offboarding?** (When Darren leaves, the skills stay with the company — "no knowledge walks out the door.")

In v2 you closed my core objection (8/10). My three remaining complaints were:

- **(1)** No distinct, *named* private / org-owned build track — every "you own it" promise dumped onto the same generic consulting page.
- **(2)** `/trust` was footer-only, not in the header nav.
- **(3)** The decisive hero ownership line ("You own what we build. We never train on your data.") was tiny (~12px / 40% opacity) and not linked to `/trust`.

Here's how v3 holds up.

---

## Section-by-section walkthrough

### Homepage (`/`) — *untouched this round, and it shows*

The hero still leads with "Put AI to work inside your music business" and the subhead frames you as "a research lab and implementation partner." Fine. Then the ownership line — the single sentence that decides whether I keep reading — is still rendered as:

```242:244:marketing/app/page.tsx
          <p className={`font-ui text-[12px] text-(--foreground)/40 mt-7 ...`} ...>
            You own what we build. We never train on your data.
          </p>
```

`text-[12px]` at 40% opacity, a plain `<p>` with **no link**. This is my single most important sentence and it's styled like fine print and dead-ends. **Complaint #3: not fixed on the homepage.** (Expected — I was told the homepage wasn't changed this round.)

One nuance I'll give credit for: the homepage is *not* entirely devoid of a trust link anymore. The "In the open" tools shelf links "we never train on your data" to `/trust`:

```412:416:marketing/app/page.tsx
              <Link href="/trust" className="underline ...">
                we never train on your data
              </Link>
```

Rendered HTML confirms exactly **2** `/trust` links on the homepage — the shelf link and the footer. The hero line is neither. So the *page* points to trust; the *hero* still doesn't.

**Trust moment:** the open-tools shelf with `npx skills add recoupable/skills` and per-card "View on GitHub" links. This is the proof I actually care about — the tools are real and inspectable before I ever talk to a human. Good.

**Confusion:** none new. The homepage reads as a consulting/research pitch; it doesn't surface the governance story up top, which is the thing that converts *me* specifically.

### `/trust` — the big v3 win (and it's buried)

This page is, frankly, written for me. Six principles, and they map 1:1 to my five questions plus a sixth I'd have asked:

- **"You own what we build"** — built in your stack or a repo your org controls, "not locked inside our platform."
- **"We never train on your data"** — catalog, royalty figures, contracts, audience data; never trained on, never folded into the open skills.
- **"Org-owned skill repositories"** — *"Custom skills can live in a private repo your organization owns. Add or remove access like any other repo."* This is verbatim what I asked for in my call.
- **"Access is scoped and revocable"** — "Nothing connects itself."
- **"Offboarding keeps your ownership intact"** — *"When someone leaves your team … the skills, repos, and agents stay with your organization. No knowledge walks out the door."* This is my Darren fear, answered directly.
- **"Open by default, private when it matters."**

```32:35:marketing/app/trust/page.tsx
  {
    title: "Offboarding keeps your ownership intact",
    body: "When someone leaves your team — or when an engagement with us ends — the skills, repos, and agents stay with your organization. No knowledge walks out the door.",
  },
```

**This is the most important page on the site for my segment, and v3 nailed the content.** The closing CTA even says "Have a specific data, security, or ownership requirement? We'll put it in writing before any engagement starts." That sentence alone is worth more to me than the entire homepage.

**The problem is discoverability.** `/trust` lives only in the footer, under the "Company" column:

```32:33:marketing/components/layout/Footer.tsx
      { href: "/company/about", label: "About" },
      { href: "/trust", label: "Trust & Governance" },
```

…and it is **not** in the header nav, which is exactly four items:

```11:16:marketing/lib/nav.ts
export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Research", href: siteConfig.researchUrl, external: true },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Consulting", href: "/consulting" },
];
```

A rights owner navigating by the header will never see it unless they scroll to the footer or happen to click the small shelf link. **Complaint #2: not fixed.** The decisive page exists but is hidden one level below where my eyes go.

### `/consulting` — meaningfully better; partially closes complaint #1

This is the page I land on from almost every "Talk to us" CTA, so it matters. Two real improvements for me:

1. **A named org-owned build offering.** The "Custom agents & skills" engagement card:

```31:34:marketing/app/consulting/page.tsx
    title: "Custom agents & skills",
    body: "Private, organization-owned skills for the work generic tools can't do — diligence, royalty analysis, release ops. They live in a repo you control.",
```

That's the language I wanted — "private, organization-owned … a repo you control." It's no longer a generic "we'll build you stuff" blob.

2. **The hero ownership line is linked here** (unlike the homepage):

```122:130:marketing/app/consulting/page.tsx
          <p className="font-ui text-[12px] text-(--foreground)/40 mt-7">
            You own what we build.{" "}
            <Link href="/trust" ...>We never train on your data</Link>.
          </p>
```

Still 12px/40% (same fine-print styling problem), but at least the no-train claim is now a path to `/trust`. There's also an explicit "Read our trust & governance" link in the "Why us" section, and the FAQ has *"Who owns what we build — and do you train on our data?"* answered cleanly. Rendered HTML shows **3** `/trust` links on this page.

The "Catalogs & rights owners" audience line speaks to me directly: "Diligence, royalty intelligence, and audience development on top of the data you already hold."

**Why complaint #1 is only *partially* fixed:** the concept is now *named* (here, on `/pricing`, and on `/trust`), which is a real upgrade. But there's still no standalone "org-owned build track" page with its own scoping/intake — the org-owned offering is a *card* inside the generic consulting page, and both `/trust` CTAs funnel back to the same generic "Talk to us" consulting contact. So the promise is named but the conversion path is still undifferentiated. Better, not done.

### `/pricing` — quietly does heavy lifting for me

The implementation/partner tier explicitly lists "Custom, organization-owned skills," "You own what we build," and "We never train on your data" as line items, and the FAQ repeats the ownership + scoped/revocable guarantees (`marketing/lib/copy/pricing.ts:83-86, 104-105, 113`). For a buyer like me who reads pricing pages closely, seeing "organization-owned skills" as a *tier feature* (not just prose) is reassuring.

### `/partners` — not my page, but reinforces ownership

Partners is aimed at distributors/DSPs/platforms embedding Recoup — not me (I want to build internal skills, not resell agents). Still, the "Co-built agents" model — "hand them off into a repo your organization controls" — and the "Do you train on our or our users' data? No." FAQ reinforce the same posture. No harm; minor relevance.

### `/platform`, `/developers`, `/company/*`, `/blog`, `/audit`

- **Platform/Developers:** the open-skills + `npx skills add recoupable/skills` + API/MCP story. This is the "it works across Claude, Cursor, Codex, my own stack" portability I explicitly wanted in my call. Good.
- **Company/Vision/About:** carry the "You own what we build, and we never train on your data" line in copy (`marketing/lib/copy/company.ts`). Consistent.
- **Recoup Records:** the dogfooding proof. I trust tools that the vendor runs on their own roster.
- **Blog:** 10+ posts present, label/catalog-oriented (e.g. `ai-for-record-labels`, `ai-catalog-marketing-passive-revenue`). Renders 200.
- **Audit:** scrubbed, scored "against the same workflows we run on our own label and with implementation clients."

---

## Links / status table

| Path / target | Status | Notes |
|---|---|---|
| `/` | 200 | Untouched; hero ownership line still 12px/40%, unlinked |
| `/consulting` | 200 | Rebuilt; named "Custom agents & skills"; 3 `/trust` links |
| `/platform` | 200 | Open tools / API / MCP |
| `/pricing` | 200 | Tier lists "organization-owned skills"; ownership FAQ |
| `/developers` | 200 | One-command skill install |
| `/partners` | 200 | Distributor/platform focused (not my persona) |
| `/trust` | 200 | **Excellent content; footer-only, not in header nav** |
| `/company`, `/company/about`, `/company/vision`, `/company/recoup-records` | 200 | Ownership line consistent |
| `/blog` (+ posts) | 200 | 10+ label/catalog posts |
| `/audit` | 200 | Scrubbed |
| `/privacy-policy`, `/terms-of-use` | 200 | Live |
| `/advisory → /consulting` | 308 | Redirect OK |
| `/solutions → /platform` | 308 | Redirect OK |
| `/results → /company/recoup-records` | 308 | Redirect OK |
| `/resources → /developers` | 308 | Redirect OK |
| `/calculator → /consulting` | 308 | Redirect OK |
| `/playbook → /platform` | 308 | Redirect OK |
| `/learn → /blog` | 308 | Redirect OK |
| `/records → /company/recoup-records` | 308 | Redirect OK |
| research.recoupable.com | 200 | Reachable |
| chat.recoupable.com | 200 | Reachable |
| developers.recoupable.com | 200 | Reachable |
| github.com/recoupable/skills | 200 | Reachable |
| x.com/recoupable | 200 | Reachable |

No dead links (404s) found. All redirects resolve to sensible destinations.

---

## v2 → v3 complaint scorecard

| # | v2 complaint | v3 status | Evidence |
|---|---|---|---|
| 1 | No named private/org-owned build track | **Partially fixed** | Named on `/trust` ("Org-owned skill repositories"), `/consulting` ("Custom agents & skills" card, `page.tsx:31-34`), `/pricing` tier. Still no standalone track page; CTAs funnel to generic consulting. |
| 2 | `/trust` footer-only, not in header | **Not fixed** | `nav.ts:11-16` has 4 items, none is Trust; `/trust` lives in Footer "Company" column (`Footer.tsx:33`). |
| 3 | Hero ownership line tiny + unlinked | **Not fixed on homepage; mitigated site-wide** | `page.tsx:242-244` still 12px/40%, no link. But `/consulting` hero links it to `/trust` (`page.tsx:122-130`) and the homepage shelf links to `/trust` (`page.tsx:412-416`). |

---

## Score: 9/10 (up from 8/10)

**Why up one point despite 2 of 3 complaints not technically "fixed":** v3 shipped the single piece of content that closes my entire buying decision — the `/trust` page. It doesn't just gesture at ownership; it names org-owned private repos, scoped/revocable access, and offboarding ("no knowledge walks out the door") in the exact terms I used on my call. Add the named "Custom agents & skills" offering on `/consulting` and the "organization-owned skills" tier on `/pricing`, and my substantive doubts are gone. The only thing standing between v3 and a 10 is **discoverability and polish, not substance** — the best page on the site is hidden in the footer, and the decisive hero line still reads like fine print.

**Why not 10:** A rights owner who navigates by the header nav can complete an entire visit and never see `/trust`. That's a conversion leak on the exact segment this page was written for. The substance is a 10; the placement is a 6.

**No regressions** observed. The doubled-title and low-contrast body bugs called out for this round are not present in the pages I read; redirects and external links are all healthy.

---

## Top fixes, ranked

1. **Put Trust in the header nav.** Add `{ label: "Trust", href: "/trust" }` to `marketing/lib/nav.ts`. This is the highest-leverage change for my entire segment — it makes the one page that closes the deal reachable in one click. (Fixes complaint #2.)
2. **Link the homepage hero ownership line to `/trust`.** Wrap "We never train on your data" in a `<Link href="/trust">` in `marketing/app/page.tsx:242-244`, mirroring what `/consulting` already does. Tiny diff, removes a dead-end on the most important sentence.
3. **Bump the legibility of the hero ownership line.** 12px/40% reads as boilerplate. Raise to ~13–14px and ~60% opacity (or add an icon/lockup) so it registers as a *promise*, not a disclaimer. Applies to both `/` and `/consulting`.
4. **Give the org-owned build track its own page (or anchored section) with a dedicated intake.** Promote the "Custom agents & skills" card into a real destination (e.g. `/consulting#org-owned` or a standalone page) that `/trust` and `/pricing` CTAs deep-link to, so the "you own it" promise converts into a track instead of dumping onto generic "Talk to us." (Finishes complaint #1.)
5. **Add a one-line offboarding/ownership reassurance near the primary CTA on `/consulting`.** I have to dig into `/trust` to find the offboarding guarantee; surfacing one sentence ("Skills live in your repo and stay with your org at offboarding — see Trust") next to "Talk to us" would close my last hesitation at the point of action.
