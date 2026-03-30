# Brutal Critique — Current Site vs Swipe Files

## The Gap Is Enormous

Looking at mood-9 ("THE LOGIC LAYER FOR MODERN POP CULTURE") and mood-10 ("SIGN THE ALGORITHM") vs what we have — we're not even in the same league. Here's why:

### 1. Our headline is TINY compared to the references

Mood-9 headline fills 70% of the viewport height. Ours fills maybe 30%. The references use `clamp(6rem, 15vw, 18rem)` — edge-to-edge type that DEMANDS attention. Our `text-display` maxes out at 5rem. That's a heading, not a statement. 

**Fix:** The headline needs to be MASSIVE. Like, uncomfortable big. `font-size: clamp(4rem, 12vw, 12rem)`. Take up the whole screen.

### 2. The AgentChat mockup looks like a homework project

The references don't have fake chat UIs. They have: glitch typography (mood-10), live ingest feeds with timestamps, massive type, and split-panel layouts with real data. Our AgentChat is a gray box with tiny text that pretends to be a product. It looks like a Figma wireframe, not a real product.

**Fix:** Kill the AgentChat. Replace the hero right-side with either: (a) the live ingest feed pattern from mood-10, or (b) nothing — just let the massive headline breathe. The best hero in our swipe files (mood-9) has NO right-side visual. Just massive type + grid background.

### 3. The VisionOverlay says "ARTIST PROFILE" in plain text

The reference (mood-8) has an actual photograph of an artist on a road — B&W, cinematic, emotional. Our version has a dark rectangle that says "ARTIST PROFILE" in gray text. That's the OPPOSITE of what makes the reference powerful. The reference works because there's a REAL HUMAN inside the bounding box. Without the photo, the bounding box is just a rectangle.

**Fix:** Either add a real photo (or a very good AI-generated one), or remove this section entirely. An empty bounding box is worse than no bounding box.

### 4. Too many sections — the page has no BREATHING ROOM

Mood-9 has: hero → 3 modules → footer. That's it. Four sections. Our page has ELEVEN sections. The best websites are RESTRAINED. Every section we add dilutes the ones before it. The page scrolls forever and every section looks the same — dark background, white text, yellow accent.

**Fix:** Cut the page in half. Keep: Hero, Marquee, Modules, Terminal. Kill or radically simplify: Proof stat, VisionOverlay, SystemDiagram, Segments. Merge: Subscribe + CTA into the footer.

### 5. The copy is still corporate

"AI-native label infrastructure. You create the music. Agents run strategy, content, fans, revenue." — this reads like a LinkedIn post. Compare to mood-9: "Recoupable is an AI-native record label and agent infrastructure. We algorithmicize A&R, automate global royalty routing, and execute artist growth via immutable smart contracts." — THAT sounds like infrastructure. Or mood-10: "We replace gut feelings with predictive modeling, and manual royalty accounting with smart contracts. We fund music, calculated by machines." — THAT sounds dangerous and real.

**Fix:** Rewrite the subheader. Less "you create the music" (patronizing), more "we compute hits" (confrontational).

### 6. The color scheme is ONE-DIMENSIONAL

Every section: black background + white text + yellow accents. There's no variation. The references use:
- Mood-10: white background + black text + green accents (inverted!)
- Mood-5: steel blue + coral (warm, editorial)
- Mood-3: dark glass-morphism (depth, layers)

Our site is monotone. Every section looks the same from a distance.

**Fix:** Introduce a SECOND mode — at least one section should have a white/light background with dark text. The split between dark and light creates rhythm. The mood-10 reference is white with a dark data panel — that contrast is what makes it visually interesting.

### 7. The typography is not distinctive enough

We use `.mix` with italic vs bold weights. The references use:
- Mood-9: mixed pixel font + condensed sans (actual different typefaces)
- Mood-10: outlined/stroke letters + filled letters + ASCII art glitch overlay
- Mood-1: hand-drawn neon glow lettering

Our ".mix" is just italic DM Sans vs bold Plus Jakarta Sans. They look too similar. There's no real tension.

**Fix:** Import a pixel/retro font (Silkscreen, Press Start 2P, or VT323) and actually MIX it with the sans-serif in the headline. Alternating individual letters between fonts, like the brutalist branch did: R[pixel E]C[pixel O]U.

### 8. No WHITE SPACE anywhere

The references — especially Linear (mood-17, 18) — use ENORMOUS amounts of white space. Between the headline and the next section, there's BREATHING ROOM. Our sections are packed tight with `section-spacing` which tops out at 5rem. The references have 10-20rem between sections.

**Fix:** More space. Let the page breathe. The hero should stand alone with massive padding below it. The modules should have generous space around them.

## The Real Problem

We've been adding things. Components, sections, animations, utilities. But the best websites SUBTRACT. They have fewer sections, fewer words, fewer colors, more space, more impact.

The mood-9 design has:
- ONE massive headline
- ONE subheader paragraph  
- ONE CTA button
- ONE grid background
- THREE module cards

That's it. Five elements. And it's more powerful than our eleven sections combined.

## What To Do Next

Stop adding. Start removing. Then make what remains PERFECT.

1. Kill sections: VisionOverlay, SystemDiagram, Segments, Blog (move blog to its own page only)
2. Hero: make the headline 3x bigger, kill the AgentChat, add a real live ingest feed instead
3. One white/light section for contrast (the modules)
4. Import a pixel font and use it in the headline
5. Double the spacing between sections
6. Rewrite the copy to be confrontational, not corporate
