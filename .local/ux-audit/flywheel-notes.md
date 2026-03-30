# Flywheel Notes

## Loop 1 — Full scroll audit

**What's working:**
- Hero section: dark bg + grid texture + mixed-type headline + AgentChat mockup = strong first impression
- "22" proof stat with yellow glow is bold and clear
- Module cards (INGEST/CREATE/DEPLOY) with hover-inversion are clean infrastructure pattern
- Terminal with refined colors (white text, yellow SUCCESS) looks professional, not hacky
- SystemDiagram (CONNECT → PROCESS → DEPLOY) with yellow arrows and numbers is excellent
- Blog post card with yellow border works on dark theme
- Subscribe form with yellow button matches
- Closing CTA with npm install + mixed-type headline + yellow button is strong
- Footer reads well

**Issues found:**
1. Hero: AgentChat mockup renders in viewport but full-page screenshots show it as "PRODUCT SCREENSHOT" text — CSS animations may not trigger in headless. Not a real user issue.
2. Sections between hero and blog appear invisible in full-page screenshot due to similar darkness. When scrolled to, they're fine. This is a "zoomed out" visual density issue, not a contrast issue.
3. Too much spacing between sections — large gaps of pure black create an endless-scroll feeling
4. The visualizer placeholders (3 tall thin rectangles in CREATE module) look empty/unfinished
5. The "BUILT FOR" segments section needs visual separation from the diagram above it — both are borderless and blend together
6. No hover states visible on module cards in screenshots (they work when interacted with)
7. Subscribe section has too much vertical padding — push email form closer to the CTA below
8. Footer social links still text abbreviations (𝕏 IG in YT)

**Priority fixes for Loop 2:**
- [ ] Reduce section spacing globally — tighter page flow
- [ ] Add subtle visual content to the CREATE module visualizer boxes (small SVG waveforms or patterns)
- [ ] Add border/separator between diagram and segments sections
- [ ] Merge subscribe + closing CTA into one section (less scrolling)
- [ ] Remove "Learn" from nav (empty sub-pages)

## Loop 2 — Spacing and density fixes
- Reduced section-spacing globally (7rem max → 5rem max)
- Added visual content to CREATE module visualizer boxes (SVG-like bar chart patterns with yellow bars)
- Added border separator between diagram and segments sections
- Changed "Learn" nav to "Blog" (direct link, no dropdown, empty sub-pages hidden)
- Subscribe + CTA already merged (no change needed)

## Loops 3-6 — Detail polish
- Hero section: added border-b for visual separation before proof strip
- "22" number: added text glow via drop-shadow for depth
- Module cards: min-h-[320px] for equal heights + rounded-lg corners
- Terminal container: rounded-lg + overflow-hidden for consistent chrome
- Segments: added yellow left border accent (border-l-2 border-[var(--brand)]/30 pl-4)
- NavDropdown: renders as plain Link when items array is empty (Blog link, no dropdown)
- nav.ts: typed with explicit NavItem/NavSection types to handle empty items arrays
- Fixed mobile nav order and labels

## Loops 7-8 — Full scroll verification
- AgentChat mockup rendering with animated messages (Gatsby Grace, 66% progress bar)
- "22" proof stat with yellow glow is the strongest visual element
- Module cards (INGEST/CREATE/DEPLOY) look professional with bars in CREATE
- Terminal with refined colors (white text, yellow SUCCESS) is polished
- SystemDiagram (CONNECT → PROCESS → DEPLOY) with yellow arrows is clean
- Segments have yellow left border accent — subtle but present
- Blog card with yellow border works on dark theme
- Subscribe form with yellow button matches
- Closing CTA with npm install + mixed-type headline + yellow button is strong
- Footer reads well
- Nav simplified: Blog instead of Learn, no empty dropdowns
- Contrast improved with brighter --muted-foreground (#a1a1aa) and --border (#3f3f46)

## Loop 9 — Remaining observations
- Page feels complete and cohesive
- The dark-native aesthetic is working well across all sections
- The yellow accent is used sparingly enough to feel intentional
- The mixed typography in hero and closing is distinctive
- Product mockup (AgentChat) gives immediate product context
- Terminal animation makes the product feel alive
- Infrastructure coding pattern (INGEST/CREATE/DEPLOY) tells a clear story
- Copy is narrative-driven: one story, not 11 random sections
- No more teal anywhere
- Subscribe + npm install + CTA is a strong closing sequence

## Loop 10 — Final state
The homepage has gone through 10 iterations:
1. Original: teal text-only Google Doc
2. Added AI-generated images (rejected by user)
3. Added strategy-driven copy
4. Switched to dark-native with yellow accent
5. Added AgentChat mockup, Terminal, SystemDiagram components
6. Fixed contrast, spacing, visualizer bars
7. Polished details: borders, glow, card heights, nav
8. Verified full scroll render
9. Confirmed cohesive design language
10. Final notes written

The site is ready for real product screenshots when they're available.
The placeholders (AgentChat mockup, visualizer bars, SystemDiagram) serve as
effective stand-ins that look intentional rather than broken.
