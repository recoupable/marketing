# Page-by-Page Notes

> Raw notes for each page. What works, what doesn't, what's missing.

---

## Homepage (`/`)

**First impression (3 seconds):** "Your label. Run by agents." — I think this is a talent agency or management company. The word "agents" is ambiguous. It takes reading the subheader to understand this is AI. The lack of any visual makes it feel like a concept site, not a product.

**Above the fold:**
- ✅ Headline is bold and memorable
- ✅ Dual CTA (primary + secondary link) is good pattern
- ❌ No visual — hero is 100% text
- ❌ "agents" could mean human agents to a music person
- ❌ Subheader tries to do too much — "strategy, content, fans, revenue" is four separate things

**Stats section:**
- ✅ "22 videos in one session" is compelling
- ❌ "120k+ tracks hit DSPs daily" is an industry stat, not about Recoupable — confusing placement
- ❌ "$15-25k per hire" only resonates with label operators, not artists
- ❌ No visual context for these numbers

**Pain section:**
- ✅ "You got into music. You're stuck in ops." is the best line on the site
- ✅ Two-column grid works well
- ❌ Fifth item makes the grid uneven (5 items in 2 cols = orphan)

**Outcomes section:**
- ✅ "Content that runs" is the strongest outcome — correctly emphasized with accent border
- ❌ "Agents work it. You see the picture." (Catalog) is too vague
- ❌ These descriptions are still abstract — no specifics about what the agent actually produces

**Differentiators section:**
- ⚠️ "Why not just use ChatGPT?" — risky framing, see audit findings
- ❌ The us-vs-them cards are all text, no visual comparison

**Use cases section:**
- ✅ Three clear personas
- ❌ No visual differentiation — just three text blocks
- ❌ Artist description buries the lead — "The agent reads your brand docs" should be first

**How it works:**
- ✅ Three-step numbered flow is clean and effective
- ✅ Numbered circles with black background are visually strong
- ❌ Steps are so high-level they could describe any SaaS product

**Proof section:**
- ✅ The quote is good — specific, vivid
- ❌ Founder quoting himself weakens social proof
- ❌ No customer testimonial

**Logos section:**
- ❌ Text-only names look like placeholders
- ❌ No context — "Rostrum Records" means nothing to most visitors

**Blog section:**
- ❌ One post makes this section feel empty
- ✅ Card design is clean

**Subscribe section:**
- ✅ Form works, clean design
- ❌ "Music ops. Agent infrastructure." is inside-baseball language

**Closing section:**
- ✅ Strong closing line
- ❌ Third "Get started" CTA on the page — CTA fatigue

---

## Platform (`/platform`)

**Overall:** A feature list with no visuals. Reads like product documentation, not a marketing page.

- ✅ "Deep Artist Context" section explains the moat well
- ✅ "Content Pipeline" section is specific (22 videos, zero editing)
- ✅ "What this is not" section is good differentiation
- ❌ Every section is identical: `<h2>` + `<p>`. No visual variety.
- ❌ No screenshots of the platform
- ❌ No diagram showing how pieces connect
- ❌ 7 feature sections + 1 "not" section = too much scrolling of identical format
- ❌ Single "Get started" CTA at the bottom — no intermediate CTAs

**Key question a visitor would ask:** "What does this actually look like when I use it?"

---

## Solutions (`/solutions`)

**Overall:** Best page on the site conceptually. Per-persona cards with pain → objection → answer is a smart pattern.

- ✅ Four distinct personas with specific copy
- ✅ Objection handling ("Will it sound like me?") is excellent
- ✅ Answers are specific and concrete
- ❌ All four cards look identical — no icons, no persona imagery
- ❌ No "Book a demo" CTA for enterprise personas
- ❌ Pain text in italic blockquote is subtle — might be skipped
- ❌ The gray background objection box blends into the page

---

## Developers (`/developers`)

**Overall:** Lists capabilities but doesn't show any code. Developers want to see code before they read marketing copy.

- ✅ Good section coverage (API, CLI, MCP, Skills, Multi-Model, Sandboxes, Docs)
- ✅ "Not a wrapper around ChatGPT" is the right opening
- ❌ Zero code examples. No `npm install`, no `curl`, no JSON response sample
- ❌ No architecture diagram
- ❌ No mention of rate limits, pricing, or free tier
- ❌ "View docs" as primary CTA sends people away from the site
- ❌ `recoup` CLI mentioned but not linked or shown

---

## Vision (`/company/vision`)

**Overall:** Five paragraphs of philosophy. Reads like an internal memo, not a public-facing vision page.

- ✅ "Imagine if a major record label was run by code" is a strong anchor
- ✅ The code-to-music analogy is interesting
- ❌ Pure text wall — no timeline, no roadmap visual, no team photo
- ❌ Feels like reading someone's manifesto, not a company's vision
- ❌ No call to action at the end

---

## About (`/company/about`)

**Overall:** Feels incomplete. A founder section with no photo and a one-line bio.

- ✅ Founder bio is authentic and personal
- ❌ No founder photo — misses the human connection
- ❌ No team information (is this a 2-person company? 20-person?)
- ❌ No funding/stage info (early-stage companies should be transparent)
- ❌ Mission statement is a run-on sentence
- ❌ No press mentions, awards, or milestones

---

## Recoupable Records (`/company/recoupable-records`)

**Overall:** The best story on the site — but told entirely in text with no visual proof.

- ✅ "We don't just build tools for labels. We are a label." — strongest positioning on the site
- ✅ Gatsby Grace proof point (22 videos, A&R couldn't tell)
- ✅ The branded accent card for the proof point looks good
- ❌ I can't see Gatsby Grace. No link to their music, socials, or any of the 22 videos.
- ❌ No images of any kind
- ❌ The "5-10 human artists + unlimited AI artists" is interesting but feels like fundraise pitch

---

## Blog (`/blog`)

**Overall:** One post. The page layout is fine — the problem is content volume.

- ✅ Post card design is clean
- ✅ Tags work
- ❌ One post makes the blog look abandoned
- ❌ Blog description ("Insights on AI-powered music marketing...") promises a lot for one post
- ❌ No sidebar, no categories, no "popular posts" — these are fine for now but will be needed

---

## Learn (`/learn` + subpages)

**Overall:** Empty placeholder pages. Remove from nav.

- ❌ Use Cases → "Check back soon" + points to Blog
- ❌ Playbooks → "Check back soon" + points to Blog  
- ❌ Demos → "Try the product" link
- ❌ These pages actively hurt credibility by showing there's nothing here
