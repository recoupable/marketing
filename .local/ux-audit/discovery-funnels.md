# Discovery Funnels — How Users Find and Navigate the Site

---

## Current Funnel (What Exists)

```
[Traffic source] → Homepage → ??? → "Get started" → chat.recoupable.com
```

That's it. There is one funnel. Every visitor lands on the homepage, scrolls through text, and either clicks "Get started" (goes to app) or bounces. There's no intermediate step — no demo, no video, no pricing page, no self-selection path.

### Conversion Killers in This Funnel

1. **No intermediate engagement.** It's all-or-nothing: sign up or leave.
2. **No lead capture before CTA.** The subscribe form exists but it's buried at the bottom and only captures email for a newsletter — not for product interest.
3. **No retargeting hook.** No quiz, no tool, no calculator, no "see what agents can do for your artist" interactive element.
4. **The CTA is ambiguous.** "Get started" could mean anything. No mention of free trial, no-credit-card, or what happens next.

---

## Proposed Funnels

### Funnel A: Indie Artist (Low-Touch, Self-Serve)

```
Instagram/X ad → Homepage → "See it in action" (demo video) → Pricing page → "Start free" → App
                                                              ↳ Subscribe form (if not ready)
```

**Missing pieces:**
- [ ] Demo video or interactive product tour
- [ ] Pricing page with a free tier
- [ ] "Start free" CTA (instead of generic "Get started")
- [ ] Content gallery showing real agent output

### Funnel B: Label/Distributor (High-Touch, Enterprise)

```
Referral/conference → Homepage → Solutions (For Labels) → Case Study → "Talk to us" → Meeting
                                                                      ↳ Download whitepaper (lead capture)
```

**Missing pieces:**
- [ ] Case study page (even one anonymized case study)
- [ ] "Talk to us" / "Book a demo" CTA on Solutions page
- [ ] Enterprise-specific landing page
- [ ] Lead capture form (not just newsletter subscribe)
- [ ] ROI calculator ("How much are you spending on marketing staff?")

### Funnel C: Developer (API-First)

```
Google/HN/X → Developers page → Code example → Docs site → API key signup → Build
```

**Missing pieces:**
- [ ] Code snippet on the marketing page (curl, npm install, quick start)
- [ ] Direct link to get API key
- [ ] "Free for developers" messaging
- [ ] Architecture diagram or system overview

### Funnel D: Content/SEO (Organic Discovery)

```
Google "AI music marketing" → Blog post → Internal link to product → Homepage → CTA
```

**Missing pieces:**
- [ ] More than 1 blog post (need 10-20 for SEO traction)
- [ ] In-post CTAs linking to product features mentioned
- [ ] Comparison pages (Recoupable vs CoManager, vs ChatGPT for music)
- [ ] SEO landing pages for key terms

---

## Traffic Source Analysis (Gaps)

| Source | Status | Gap |
|--------|--------|-----|
| Organic search | 1 blog post. Essentially zero SEO presence. | Need 10+ posts targeting "AI music marketing", "music content automation", etc. |
| Social (X, IG) | Unknown — no tracking visible beyond Plausible | Need UTM-tagged social campaigns with specific landing pages |
| Referral (word of mouth) | Primary source based on strategy docs | Site needs to support "my friend told me about this" visitors with a quick explainer |
| Direct (investors/fundraise) | April podcast → site traffic spike likely | Need an investor-facing page or at least a press/media section |
| Paid ads | None currently | Not recommended until activation funnel is figured out |

---

## Key Metric Gaps

The site has Plausible analytics but likely isn't tracking:

- [ ] CTA click rates (which "Get started" button converts?)
- [ ] Scroll depth (do people see the proof section? the subscribe form?)
- [ ] Time on page by section (what do people read vs. skip?)
- [ ] Exit pages (where do people leave?)
- [ ] Subscribe form conversion rate
- [ ] Nav dropdown interaction rates
