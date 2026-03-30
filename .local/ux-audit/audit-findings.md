# UX Audit — Recoupable Marketing Website

> Audited: 2026-03-30. Fresh-eyes perspective — no prior context about the company.
> Screenshots in `./screenshots/`

---

## Executive Summary

The site reads like a **manifesto, not a product page.** It tells me what Recoupable believes (music businesses should be autonomous) but never *shows* me the product, what it looks like, or what happens after I click "Get started." As a first-time visitor, I leave with a vague sense of ambition but no concrete understanding of what I'd actually be using.

The design is clean but **monotone** — every page uses the same visual rhythm (heading, paragraph, heading, paragraph) with zero imagery, zero product screenshots, zero video, zero animation. It reads like a well-formatted Google Doc, not a product website competing for attention.

**The biggest problem:** I can't tell if this is a real product or a landing page for something being built. There's no product screenshot, no demo, no video, no pricing, no customer logos (just names in text), and no way to see what I'd be getting before signing up.

---

## Critical Issues (Dealbreakers)

### 1. No Product Visuals — Anywhere

Not a single screenshot, GIF, mockup, or video of the actual product exists on any page. The hero section is just text. Every internal page is just text. A first-time visitor has to take a complete leap of faith clicking "Get started" — they have no idea what the interface looks like, what the agent chat experience is, or what content output looks like.

**What I expected:** A hero screenshot or video showing the agent creating content, a chat interface in action, or a before/after of agent-generated output.

**Impact:** Massive. This alone likely kills conversion. People don't sign up for products they can't picture themselves using.

### 2. "Get Started" Goes to... What?

The primary CTA "Get started" links to `chat.recoupable.com` with zero context about what happens next. Is it free? Do I need a credit card? Will I see a product tour? The CTA gives me no confidence about what I'm clicking into.

**What I expected:** "Start free" or "Try for free" or "See a demo" — something that tells me the risk level.

### 3. No Pricing Information

There's no pricing page. There's no mention of what it costs anywhere. The solutions page mentions "$5-10k/month for agents instead of $15-25k per hire" which implies enterprise pricing, but if I'm an indie artist, I have no idea if I can afford this. The about page says nothing about pricing tiers.

**Impact:** I don't know if this is for me (budget-wise), so I leave.

### 4. No Social Proof Beyond Text

The "Trusted by music companies" section lists four names in plain text with no logos, no links, no context. This reads like someone typed company names, not like actual partnerships. The founder quote is self-referential — the founder quoting himself isn't credible social proof.

**What I expected:** Real logos. A short customer quote from someone who isn't the founder. A case study link. Something that proves other people use this.

### 5. Blog Has One Post

The blog has exactly one article. This makes the entire "Latest" section on the homepage, and the dedicated blog page, feel empty and undermines credibility. An "Insights" section with one post is worse than no section at all.

---

## Major Issues (Significantly Hurt Conversion/Perception)

### 6. Wall-of-Text Pages

Platform, Solutions, Developers, Vision, About, Records — every page is exclusively text in the same format: `<h2>` + `<p>`, repeated. No icons, no illustrations, no diagrams, no code snippets (developers page), no visual hierarchy beyond font weight. Every page looks identical. The content is good, but the presentation is a Google Doc.

### 7. "Human / Machine" Toggle is Confusing

There's a fixed bottom bar with "Human / Machine" tabs. I have no idea what this does. Clicking "Machine" gives me... a markdown dump? Why? Who is this for? It's visible on every single page and takes up valuable screen real estate.

**If this is for LLM crawlers**, it shouldn't be user-facing. If it's a feature demo, it needs explanation. Right now it's just confusing.

### 8. The Homepage is Too Long

The homepage has 11 distinct sections: Hero → Stats → Pain → Outcomes → Differentiators → Use Cases → How It Works → Proof → Logos → Blog → Subscribe → Closing. That's at least 4-5 sections too many. By the time someone scrolls to "How it works," they've already read two value prop sections and a differentiator section. Fatigue sets in.

### 9. "Why Not Just Use ChatGPT?" Section Backfires

This section raises a doubt the user may not have had. If they weren't comparing to ChatGPT, now they are — and the answers ("Deep artist context", "One system") are abstract enough that a skeptic would think "I could probably do this with ChatGPT and some prompts." This section needs concrete proof, not abstract claims.

### 10. Navigation Dropdowns Are Empty

Platform, Solutions, Developers, Learn, Company all have dropdown menus in the nav, but clicking them just navigates to the page. The dropdown behavior (hover) is inconsistent — sometimes it opens a dropdown panel, sometimes it's just a link. On mobile, they collapse to simple links which is fine, but the desktop experience feels half-built.

### 11. No Clear Funnel for Different Audiences

The site talks to artists, labels, distributors, catalog owners, AND developers all on the same homepage. Each audience has very different needs, budgets, and decision processes. There's no way to self-select into a path. The Solutions page separates them, but the homepage mixes everything together.

---

## Design Issues (Cheap / Forgettable)

### 12. Zero Color

The entire site is black text on white background with one accent color (`#345A5D`, a dark teal) that only appears in borders and link text. No gradients, no brand color blocks, no colored sections, no hover effects worth noticing. The dark mode toggle exists but the light mode is so austere it feels unfinished.

### 13. No Imagery or Media of Any Kind

Not a single image on any page (except the favicon and logo). No hero image, no product screenshots, no team photos, no artist imagery, no album art, no content examples. For a product that creates visual content (album visualizers, social posts), showing zero visual content is ironic and damaging.

### 14. Footer Social Links Are Text Abbreviations

The social media links in the footer are plain text: "𝕏 IG in YT". These look like a placeholder, not a finished design. They should be recognizable icons or at minimum styled consistently.

### 15. No Animations or Transitions

Nothing animates on scroll. No fade-ins, no parallax, no entrance effects. Elements just exist statically. The site feels like it was built for speed (which is good) but the result is that nothing draws the eye or creates moments of delight.

### 16. Inconsistent CTA Styling

The hero CTA is a rounded black pill button. The closing CTA is a smaller rounded black pill. Internal page CTAs are square-cornered dark buttons. This inconsistency makes the CTAs feel unintentional rather than designed.

### 17. Cards and Sections Lack Visual Distinction

The "Content that runs" outcome card has a teal left border. The other three outcome cards have thin gray borders. The differentiator cards have thin gray borders. The solution cards have thin gray borders with a hover that turns teal. Everything is variations of "thin border box" — nothing stands out.

---

## Content Issues (Confusing / Unclear)

### 18. "Agents" is Never Defined

The word "agents" appears in every section — hero, outcomes, use cases, how it works. But nowhere does the site explain what an "agent" actually is or does in practical terms. An indie artist visiting this site likely thinks "agent" means a music manager/booking agent, not an AI process. This terminology gap could lose the primary audience.

### 19. Stat Section Raises Questions It Doesn't Answer

- "22 videos in one session" — What kind of videos? Of what quality? Can I see one?
- "120k+ tracks hit DSPs daily" — This is an industry stat, not about Recoupable. Why is it in the company's stats section?
- "$15-25k per hire, per month" — This framing only resonates with someone who manages a label, not an indie artist.

### 20. "Deep Artist Context" Means Nothing to a New Visitor

The concept of "face guide, brand docs, songs, audience data" stored in a context system is the moat — but it's described so abstractly that a visitor doesn't understand what they'd actually DO. Show me: "Upload your music. Add your face. The agent creates content that looks and sounds like you."

### 21. Company Pages Are Skeleton Thin

- **Vision:** Five paragraphs of philosophy, no images, no timeline, no roadmap visual.
- **About:** One paragraph, a founder bio with no photo, and a mission statement. Feels like a placeholder.
- **Recoupable Records:** Mentions "Gatsby Grace" and "22 videos" but I can't see Gatsby Grace, hear any music, or see any of the videos. The proof point has no proof.

### 22. Learn Pages Are Empty

Use Cases, Playbooks, and Demos are all placeholder pages that say "coming soon" or point to the blog (which has one post). These shouldn't be in the navigation if there's no content.

---

## Mobile-Specific Issues

### 23. Stats Section Stacks Poorly

On mobile (375px), the three stats stack vertically which is fine, but they take up a lot of vertical space before the user gets to any actual content. The stats feel less impactful when you can only see one at a time.

### 24. Human/Machine Bar Covers Content

The fixed-position Human/Machine toggle bar at the bottom of the viewport overlaps content on mobile. This is especially problematic on shorter screens.

### 25. No Hamburger Menu

On mobile, the nav items collapse into a horizontal scrollable row under the header. This works but doesn't scale — if more nav items are added, it'll overflow. A hamburger menu is more scalable.

---

## What's Actually Good

- **The copy is strong.** The pain points are specific and real. "You got into music. You're stuck in ops." is genuinely good.
- **The messaging hierarchy is correct.** Hero → problem → solution → proof → CTA is the right flow.
- **Performance is excellent.** Pages load in under 200ms. No layout shift. No unnecessary JS.
- **The domain structure is clean.** Good URL patterns, proper metadata, RSS feed.
- **Dark mode exists** and works without flash.
- **The Machine view** is actually innovative (LLM-readable markdown) — just needs to not be a confusing UI element.
