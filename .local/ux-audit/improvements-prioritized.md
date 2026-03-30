# Improvements — Prioritized

> Organized by impact × effort. P0 = do this week. P1 = this month. P2 = next month.

---

## P0 — Critical (Do This Week)

### 1. Add a Product Screenshot or Video to the Hero

**Impact:** Highest. The #1 reason visitors bounce is they can't visualize the product.
**Effort:** Low-Medium. Take a screenshot of the chat interface. Record a 30-second Loom of the agent creating content.
**Where:** Homepage hero, right side or below the subheader.
**How:** Even a static PNG mockup of the chat UI with an agent response is better than nothing.

### 2. Add Pricing Page (Even Minimal)

**Impact:** High. Visitors with budget questions leave immediately when there's no pricing.
**Effort:** Low. A simple page with 2-3 tiers:
- Free: X credits/month, 1 artist
- Pro: $20/month, more credits, more artists
- Enterprise: "Talk to us" — custom pricing
**Where:** New page at `/pricing`, add to nav.

### 3. Change CTA from "Get started" to "Start free"

**Impact:** High. Reduces friction and answers the implicit question "does this cost money?"
**Effort:** Trivial. One line change in `home.ts`.

### 4. Remove Empty Learn Pages from Navigation

**Impact:** Medium. Empty pages destroy credibility.
**Effort:** Trivial. Remove Use Cases, Playbooks, Demos from nav until content exists.
**Alternative:** Collapse Learn into just Blog in the nav.

### 5. Fix Human/Machine Toggle Visibility

**Impact:** Medium. It's confusing for 99% of visitors.
**Effort:** Low. Hide it by default. Add a small "View as markdown" link in the footer for those who want it.

---

## P1 — Important (This Month)

### 6. Add Real Visuals to Every Page

- **Homepage:** Product screenshot in hero, example content outputs (show a generated video thumbnail, a social post)
- **Platform:** Diagram showing how data flows (connect → agents → output)
- **Solutions:** Show example output per persona (artist social post, label dashboard view)
- **Developers:** Code snippet (actual curl/npm example), architecture diagram
- **Records:** Show Gatsby Grace content — screenshots of the 22 videos, link to socials

### 7. Create One Real Case Study

Even anonymized: "A mid-size label with 15 artists used Recoupable to generate 22 album visualizers in 2 hours. Before: Stephanie spent 10 hours/week on content. After: 2 hours."

Put it at `/company/case-studies` or on the Solutions page.

### 8. Add Customer Logos (Real Images)

Replace the text-only "Trusted by" section with actual logo images. Even small, gray, opacity-reduced logos are standard social proof.

### 9. Add a "Book a Demo" CTA for Enterprise

The Solutions page should have a "Talk to us" or "Book a demo" button for labels/distributors/catalog owners. This separates the enterprise funnel from the self-serve funnel.

### 10. Consolidate Homepage Sections

Current: 11 sections. Target: 7-8.
- Merge "Pain" into the hero (make it a subheader list)
- Cut "Why not just use ChatGPT?" (raises doubt)
- Merge "Logos" into "Proof" section
- Keep: Hero → Stats → Outcomes → Use Cases → How It Works → Proof + Logos → Blog → Subscribe + Closing

### 11. Add Page-Level Visual Variety

- Alternate between full-width and contained sections
- Use the brand color (#345A5D) as a background for one section per page
- Add subtle borders, shadows, or background textures to break up the text walls
- Icons next to feature headings (even simple SVG icons)

### 12. Write 3-5 More Blog Posts

Target keywords:
- "AI music marketing tools 2026"
- "How to automate music content"
- "Label operations software"
- "AI content creation for artists"
- "Recoupable vs CoManager" (comparison)

---

## P2 — Nice to Have (Next Month)

### 13. Add Scroll Animations

Fade-in sections on scroll. Staggered list item entrance. Number counter animation for stats. These are cosmetic but they make the difference between "this feels alive" and "this feels static."

### 14. Build an Interactive Product Tour

A "See how it works" section that walks through the 3 steps with animated mockups or an embedded product sandbox. Even fake/static mockups that switch on click.

### 15. Add a "Who is this for?" Quiz

A simple 3-question quiz: "Are you an artist, label, or developer?" → routes to the right Solutions section or a personalized CTA.

### 16. Developer-Specific Improvements

- npm install snippet with copy button
- curl example for the API
- Architecture diagram
- GitHub link (if public)
- "Built with Recoupable" showcase section

### 17. Footer Social Icons

Replace "𝕏 IG in YT" text with real SVG icons. This is a small detail but it's the kind of thing that makes a site feel finished vs. in-progress.

### 18. Mobile Hamburger Menu

Replace the horizontal scroll nav with a proper hamburger menu for mobile. More scalable and standard.

### 19. SEO Comparison Pages

- "Recoupable vs CoManager"
- "Recoupable vs ChatGPT for music"
- "Recoupable vs hiring a social media manager"

### 20. Newsletter Value Prop

"Stay in the loop" is generic. Change to something specific: "Get the weekly rundown: one AI music insight, one agent workflow idea, one industry number. Every Tuesday."

---

## Design Debt (Technical Cleanup)

- [ ] Tailwind v4 shorthand warnings (103 instances of `text-[var(--foreground)]` → `text-(--foreground)`)
- [ ] CTA button style inconsistency (rounded-full vs rounded-md)
- [ ] Nav dropdown behavior inconsistency on desktop
- [ ] Human/Machine toggle overlapping content on mobile
- [ ] Empty Learn sub-pages in sitemap (bad for SEO)
- [ ] Missing `alt` attributes for any future images
- [ ] No `<meta name="robots">` on placeholder pages
