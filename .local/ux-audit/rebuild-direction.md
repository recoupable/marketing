# Rebuild Direction — Blended Design

> This doc captures the design direction before we build. The critique comes after.

## What's Wrong Now (User Feedback)

- Copy is confusing and random — bunch of random phrases
- No clear narrative — nothing ties together
- Nothing clearly explains what the product does
- Design is overly confusing
- The green (teal #345A5D) is hated
- Too many sections, too much text, not enough showing

## Design Direction: Blend of All Three

Take the best from each branch variant:

### From Brutalist
- Mixed typography (pixel font + sans) for visual tension
- Infrastructure-coded modules (INGEST/CREATE/DEPLOY pattern)
- Terminal component with live log animation
- Marquee ticker for energy
- Grid background texture
- Hover-inversion on cards
- Crosshair cursor aesthetic

### From Editorial
- Framed viewport with thick borders
- Split-panel layout ("The Culture" vs "The Stack")
- Data tables showing real DSP data
- JSON code block showing agent config
- Magazine-meets-terminal aesthetic

### From Cinematic
- Full black background — dark mode native
- Massive condensed white headlines
- Neon accent color (NOT teal — use electric yellow #c8ff00 or warm white)
- Full-bleed photography with AI bounding boxes
- Terminal analysis readout over images
- "We don't guess hits. We compute them." — confrontational, clear copy

## Color Decision

Kill the teal. The new palette:
- Background: black (#000) or near-black (#0a0a0a)
- Foreground: white (#fff) or warm white (#f5f5f0)
- Accent: electric yellow-green (#c8ff00) — used sparingly for status indicators, labels, CTAs
- Muted: gray (#666, #999)
- No teal. No green. No #345A5D.

## Copy Direction

The narrative must be ONE clear story, not 11 disjointed sections:

1. **What we are** (1 sentence): "AI-native label infrastructure."
2. **What that means** (1 sentence): "You create the music. Agents run strategy, content, fans, revenue."
3. **Proof** (1 number): "22 videos. One session. Zero editing."
4. **Three capabilities** (brief): Intel → Content → Deploy
5. **Who it's for** (brief): Artists / Labels / Developers
6. **How to start** (brief): Get an API key or sign up
7. **Closing** (1 line): "Your label. Run by agents."

That's it. No "Why not just use ChatGPT?" section. No "Hustle by default" philosophy. No differentiator grid. Just: here's what it is, here's proof, here's how to use it.

## Page Strategy

- **Homepage**: The cinematic hero + brutalist modules + terminal. Dark. Bold. Clear.
- **Platform**: NOT needed as separate page yet — fold into homepage
- **Solutions**: Simplify to 3 cards on homepage, not a separate page
- **Developers**: Keep as separate page — this audience needs depth
- **Company pages**: Keep but simplify
- **Learn sub-pages**: Remove from nav (empty)

## What to Keep From Current Site

- The copy file architecture (lib/copy/*.ts → pages)
- The machine markdown view (useful, just hide the toggle)
- The blog system
- The subscribe form
- The footer structure
- Next.js Image optimization
