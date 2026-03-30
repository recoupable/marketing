# Swipe File Design Analysis — Brand Guidelines Source

> Deep technical analysis of the current Recoupable website, platform, sales deck, and 18 moodboard reference images. This document extracts every design pattern, technique, and principle worth adopting. Use this as the foundation for Recoupable's brand design system.

---

## What We Have

### Sources Analyzed
- `current-website.png` — Live Recoupable.com (Studio Ghibli-style hero, AI record label positioning)
- `current-platform.png` — chat.recoupable.com Agents page (light theme, card-based agent marketplace)
- `Recoupable SMB Sales Deck.pdf` — 18-slide pitch deck (image-based, text not extractable)
- 18 moodboard screenshots from D.scribe, Kinetic AI, Nodum OS, Oasis Protocol, Mosaic, Composio, Vercel, Linear, and two Recoupable concept designs

---

## Part 1: Current Recoupable Identity

### Current Website (current-website.png)
**What it communicates:** "Meet Your New AI Record Label" — warm, approachable, consumer-friendly. The Studio Ghibli-style illustration (child sitting with a robot in a flower field) communicates wonder, friendliness, creativity. The chat input field in the hero ("Ask me anything about your artist...") positions the product as a conversational tool.

**Design language:**
- Warm cream/white background
- Serif + sans-serif type mix ("Meet Your New AI" in sans, "Record Label" in italic serif)
- Rounded UI elements (pill buttons, rounded input)
- Illustrated hero (Ghibli-inspired, AI-generated)
- Product screenshot below (macOS browser chrome showing the Agents page)
- Clean, consumer-grade SaaS aesthetic

**What works:** The illustration is emotionally warm and distinctive. The serif "Record Label" in italic is elegant. The chat input gives immediate interactivity. The product screenshot proves it's real.

**What doesn't work for where we're going:** Too consumer/friendly for an infrastructure positioning. The Ghibli illustration is memorable but doesn't signal "serious enterprise infrastructure." The chat input implies "chatbot" which the strategy docs explicitly reject.

### Current Platform (current-platform.png)
**What it communicates:** A clean marketplace of pre-built AI agents organized by category (Recommended, Create, Connect, Report, Plan, Research).

**Design language:**
- Light mode, white background
- Card-based grid layout
- Minimal chrome — sidebar (Agents, Tasks, Files, Recent Chats) + main content area
- Category pill filters at top
- Each card: colored category tag + title + description + action icons
- Right sidebar: avatar stack (team/user presence)

**What works:** Clean, scannable, no cognitive overload. The category filters (Create, Connect, Report, Plan, Research) immediately communicate the capability set. The card descriptions are specific enough to understand what each agent does.

**What we should carry forward:** The category taxonomy (Create, Connect, Report, Plan, Research) is a strong information architecture. The card-as-agent pattern is intuitive. The sidebar structure is clean.

---

## Part 2: Moodboard Analysis — Design Patterns by Source

### 1. D.scribe (mood-1)
**What it is:** AI writing/content platform.
**Key technique:** Full-bleed cinematic hero illustration with the brand name rendered as a glowing neon sign in the sky. The illustration is photorealistic (not cartoonish). Typography is hand-drawn/organic — unusual for a tech company.

**What to extract:**
- **Full-bleed hero imagery** that is cinematic, not corporate stock
- **Brand name as a visual element** — not just text, but integrated into the environment
- **Warm glow effects** on type — the brand name has a neon halation effect
- The illustration communicates the product's purpose (people working with books/screens under stars = knowledge work)

### 2. Kinetic AI / OMNI-01 (mood-2)
**What it is:** An AI system interface showing ASCII art of a face/head constructed from small circles, with system telemetry (COORD, FREQUENCY, MEM) and mode tabs (NEUTRAL, THINK, LISTEN, ALERT).

**Key techniques:**
- **ASCII art as brand illustration** — the face made of `o` characters is computational, not decorative
- **Telemetry bar** at bottom with real-time data (COORD: 00,00 | FREQUENCY: 44.1KHZ | MEM: 8.42GB)
- **Mode switching UI** — tabs that change the system's behavior state
- **Monospace throughout** — everything is one typeface, one weight
- **Near-black background** with off-white elements only

**What to extract:**
- Telemetry/status bars as a design element (not just decoration — they communicate system state)
- ASCII/generative art instead of stock imagery
- The idea that the interface IS the brand — no separate "marketing" layer
- Single typeface discipline

### 3. Nodum OS (mood-3)
**What it is:** Knowledge graph / content intelligence platform.

**Key techniques:**
- **Three-panel floating card layout** — left panel (Knowledge Graph tree), center panel (hero copy on glassmorphism card), right panel (System Operations flow)
- **Glass-morphism cards** — semi-transparent with backdrop blur on dark background
- **Numbered workflow** in the right panel: 01 — COLLECT, 02 — PROCESS, 03 — GENERATE
- **I/O Telemetry section** — JOB_ID: 984-X, status indicators, node counts
- **"Initialize Workspace"** as the CTA — not "Sign up" or "Get started"

**What to extract:**
- **Glass-morphism on dark backgrounds** — cards with `backdrop-blur` and semi-transparent borders create depth without images
- **Floating card composition** — multiple overlapping panels at different depths create visual interest
- **System-native language** — "Initialize Workspace" > "Get started"
- **Numbered workflow with system labels** (01 — COLLECT) is exactly what we're doing with INGEST/CREATE/DEPLOY
- **Telemetry sections** that show real system output (job IDs, completion status, node counts)

### 4. Oasis Protocol (mood-4)
**What it is:** A protocol/crypto project with pixel art aesthetic.

**Key techniques:**
- **Pure black and white** — no color, no gray
- **Pixel font logo** — "oasis" rendered in 8-bit style
- **Generative art** — right panel shows a growing pixel structure with data matrix at the bottom
- **System labels** — "SYS.INIT // CORE.01", "V 1.0.4 AESTHETIC PROTOCOL", "SIMULATION: STABLE // CYCLE RUNNING"
- **Extreme minimalism** — mostly black space with sparse white elements

**What to extract:**
- **The power of negative space** — black background with tiny white elements creates gravitas
- **System identifiers as design chrome** — version numbers, module labels, status indicators
- **Pixel art as a legitimate design language** for tech infrastructure brands
- **The "less is more" principle** — two elements (logo + generative art) communicate more than ten sections of copy

### 5. Mosaic (mood-5)
**What it is:** AI data structuring company ("Truth, extracted").

**Key techniques:**
- **Warm muted palette** — dusty blue/steel blue with coral accent
- **Serif headlines** — elegant, editorial feel. "Truth, extracted." in a large serif font
- **Asymmetric layout** — headline left, large coral circle shape right
- **ALL CAPS monospace** for nav and labels ("DATASETS", "PLATFORM", "RESEARCH", "COMPANY")
- **Category tag** above headline: "HIGH-FIDELITY STRUCTURE" in bordered pill

**What to extract:**
- **Serif headlines** can create sophistication without being old-fashioned — if paired with monospace labels
- **Bold geometric accent shapes** (the coral circle) create visual interest without images
- **The "verb + noun" headline pattern** — "Truth, extracted." is the same structure as "Your label. Run by agents."
- **Color as meaning** — the coral shape is the ONLY color, making it the focal point

### 6. Tidal Shift / Data Viz Poster (mood-6)
**What it is:** A data visualization poster showing pixelated ocean/wave patterns.

**Key techniques:**
- **Grid-based data visualization** — the "illustration" is actually data rendered as colored squares on a grid
- **Editorial/print design** — this looks like a publication, not a website
- **Serif headline** paired with monospace data ("Current Velocity: 12.4 kn")
- **Ticker/marquee** at bottom: "ANOMALIES DETECTED — SEAS ARE RISING — DATA STREAM 04-B"

**What to extract:**
- **Data as art** — the visualization IS the brand imagery
- **Ticker/marquee strips** as design elements (we already have this from the brutalist branch)
- **The poster format** — sometimes a single strong visual is worth more than a scrolling page
- **Mixing serif (headlines) with monospace (data)** creates sophistication

### 7. Recoupable Module Grid (mood-7)
**What it is:** A Recoupable concept showing three infrastructure modules with pixel art icons.

**Key techniques:**
- **Three-column module grid** — MOD.01 PREDICTIVE A&R, MOD.02 SMART CONTRACTS, MOD.03 AUTO-RECOUP
- **Custom pixel art icons** above each module — each is a unique 4-color (black, white, blue, pink) abstract symbol
- **ALL CAPS monospace** for labels and descriptions
- **Yellow-green (#c8ff00) top border** accent
- **Light gray background** with vertical dividers

**What to extract:**
- **Custom iconography per module** — even simple abstract pixel icons differentiate each capability
- **Module numbering** (MOD.01, MOD.02, MOD.03) creates a sense of system architecture
- **The copy style** — "NEURAL NETWORKS SCANNING TIKTOK, SOUNDCLOUD, AND UNDERGROUND NODES 24/7 TO IDENTIFY VIRAL VELOCITY BEFORE HUMAN INTERVENTION." — specific, technical, confident, ALL CAPS monospace

### 8. Recoupable Vision Overlay (mood-8)
**What it is:** A Recoupable concept showing the "AI vision" aesthetic — a B&W photo of an artist with a neon yellow bounding box and terminal readout.

**Key techniques:**
- **B&W photography + neon overlay** — the photo is desaturated, the bounding box and text are electric yellow (#c8ff00)
- **AI bounding box** — corner marks at each vertex of the rectangle, "SUBJECT_08X" label at top
- **Terminal readout** — "> VIBE_ANALYSIS: IN PROGRESS", "> AESTHETIC_SCORE: 94.2%", "> GENRE_PROB: HYPERPOP (88%)"
- **"[ READY FOR DEPLOYMENT ]"** status badge
- **Pixel font** for all overlay text

**What to extract:**
- **This is the single most distinctive visual in the entire moodboard.** The B&W photo + yellow AI bounding box = "the system is analyzing the real world." It communicates AI + music + infrastructure in one image.
- **This should become a signature Recoupable visual pattern** — photos of artists with AI overlay analysis
- **The terminal readout over imagery** creates "system looking at culture" — exactly the Recoupable thesis
- **Corner marks on bounding boxes** are a small detail that creates huge technical credibility
- **Pixel font for system output** differentiates agent/machine text from human text

### 9. Recoupable "Logic Layer" (mood-9)
**What it is:** A full Recoupable website concept — dark mode with grid background, massive white headline, yellow accent.

**Key techniques:**
- **"THE LOGIC LAYER FOR MODERN POP CULTURE."** — clear, confrontational headline
- **"MODERN" highlighted in yellow box** within the headline — one word pops
- **Grid background** (thin white lines on black)
- **System status bar** — "SYS.STATUS: ONLINE" (left), "V. 2.0.4 // AI_CORE" (right)
- **Monospace nav** — "[01] INITIATE_A&R [02] LEDGER [03] ROSTER"
- **"INITIALIZE WORKSPACE >"** as CTA
- **"CONNECT_WALLET"** button (Web3-native)

**What to extract:**
- **Highlighting one word in the headline** with a colored box creates emphasis without changing font size
- **System status indicators** at the edges of sections (version numbers, status labels)
- **Numbered nav items** — [01], [02], [03] — infrastructure-coded navigation
- **"Initialize" > "Get started"** — the vocabulary choices signal technical sophistication
- **The grid background** is subtle but ever-present — creates a "blueprint" feeling

### 10. Recoupable "Sign the Algorithm" (mood-10)
**What it is:** Another Recoupable concept — white background with black typography, live ingest feed, green accents.

**Key techniques:**
- **Split layout** — left side massive headline ("SIGN THE ALGORITHM" with glitch/ASCII art), right side live data feed
- **"LIVE INGEST FEED [REC]"** — real-time data with timestamps
- **Green accents** for status indicators ("Spotify_Viral_50", "87.4 (HIGH_VELOCITY)", "Fingerprint_Found")
- **"SUBMIT AUDIO FILE [WAV]"** — a CTA that looks like a system input, not a marketing button
- **Version/status bar** — "[VERSION 2.4.1] DATA_INGEST: OK LOC: GLOBAL"
- **"SYS.AGENT_NETWORK_ACTIVE"** status in header with green dot

**What to extract:**
- **Live data feeds as design elements** — showing real-time agent activity proves the system is alive
- **System-native CTAs** — "SUBMIT AUDIO FILE [WAV]" is more memorable than "Get started"
- **Agent network status** in the header — a single green dot + "ACTIVE" text communicates system health
- **The headline uses ASCII art/glitch** in the word "ALGORITHM" — mixing clean type with computed/degraded type
- **Timestamps on data** make it feel real, not decorative

### 11-12. Composio (mood-11, mood-12)
**What it is:** Agent infrastructure platform. "Your agent decides what to do. We handle the rest."

**Key techniques:**
- **Three-panel product showcase** — left (COMPOSIO_SEARCH_TOOLS), center (Claude Cowork chat), right (COMPOSIO_MANAGE_CONNECTIONS)
- **Real product UI embedded** — not mockups, actual interface panels
- **Monospace for all system labels** — "COMPOSIO_SEARCH_TOOLS", "COMPOSIO_EXECUTE_TOOL", "AGENT_CONFIG"
- **Status badges** — "MATCH" in green pills, "Connected" with green dot
- **"ADD TO MY AGENT"** CTA — system-native language
- **SDK section** (mood-13) with pixel font headline "COMPOSIO SDK", code snippets, iridescent 3D icons

**What to extract:**
- **Embedding real product UI panels** on the marketing site (not screenshots — actual component-like panels)
- **Monospace labels for everything system-related** — this creates a consistent "machine" voice
- **Connection status indicators** with green dots — small detail, big trust signal
- **"ADD TO MY AGENT"** is better than "Get started" — it assumes you already have an agent
- **Iridescent/holographic 3D icons** for technical concepts (auth, triggers) — playful but premium

### 13-16. Vercel (mood-14, mood-15, mood-16)
**What it is:** Frontend deployment platform.

**Key techniques:**
- **Clean multi-column dropdown nav** — "AI Cloud / Core Platform / Security" organized with icons + descriptions
- **Light mode with minimal color** — black nav, white content, no unnecessary color
- **Globe visualization** — animated globe showing edge network with Vercel logo markers
- **"Deploy once, deliver everywhere."** — clean, direct copy
- **Massive multi-column footer** — 6 columns (Get Started, Build, Scale, Secure, Resources, Learn) with comprehensive links
- **Status indicator in footer** — "■ NO STATUS AVAILABLE." with system theme toggle icons

**What to extract:**
- **Footer as a serious information architecture** — Vercel's footer has ~50 links organized into 6 clear categories. It's a sitemap, not decoration.
- **Dropdown nav with descriptions** — each nav item has a small icon + name + one-line description
- **The globe** as an interactive visualization — data-driven visuals that move
- **System status in the footer** — small detail that shows operational transparency
- **Restraint with color** — Vercel uses almost no color. The black ▲ logo and black CTAs are the only visual weight.

### 17-18. Linear (mood-17, mood-18)
**What it is:** Product development system.

**Key techniques:**
- **"FIG 0.2, FIG 0.3, FIG 0.4"** — figure labels as technical document references
- **Isometric line-art illustrations** — architectural, blueprint-like, monochrome. Each represents a concept (purpose, agents, speed) without being literal.
- **Bold serif + dimmed serif** — "A new species of product tool." in bright white, rest in 50% opacity gray. One clause pops, the rest provides context.
- **Customer testimonial cards** — large format. Left card: glassmorphic white/lavender with OpenAI logo. Right card: solid electric yellow with Ramp logo. The contrast between the two creates visual interest.
- **"Linear powers over 25,000 product teams."** — social proof as a simple stat.

**What to extract:**
- **Figure labels (FIG 0.1, FIG 0.2)** — treating the website like a technical paper/documentation creates intellectual authority
- **Isometric line-art illustrations** — more sophisticated than icons, cheaper to produce than 3D renders, scalable, on-brand
- **Dim-bright typography** — making one sentence fragment bright and the rest dimmed creates reading hierarchy within a single heading
- **Testimonial cards with different background colors** — one light/transparent, one solid accent color. The asymmetry makes both more interesting.
- **Social proof as a simple number** — "powers 25,000 teams" is more credible than listing logos

---

## Part 3: Patterns to Adopt for Recoupable Brand Guidelines

### Color System
- **Primary background:** Near-black (#09090b) — used by Linear, Composio, Nodum OS, the Recoupable concepts
- **Primary foreground:** Warm white (#fafaf9) — not pure white, slightly warm
- **Accent:** Electric yellow-green (#c8ff00) — used in the Recoupable concepts, Linear's testimonial card, the bounding box overlay. This is now our signature color.
- **Status green:** For "ONLINE" / "ACTIVE" / "CONNECTED" indicators — a slightly different green from the accent
- **Muted gray:** #a1a1aa for secondary text, system labels, descriptions
- **Surface elevation:** #18181b for cards/panels on the black background

### Typography System
Three typefaces, each with a role:
1. **Display sans-serif** (bold, tight tracking) — for headlines, hero text. The "YOUR LABEL. RUN BY AGENTS." voice.
2. **Monospace** — for ALL system-related text: labels, module numbers, status indicators, code, terminal output, data. This is the "machine voice."
3. **Pixel font** (optional) — for AI overlay text, bounding box labels, status badges. Differentiates agent/computed output from static text. Used in the vision overlay, module icons, and system identifiers.

### Visual Language

**The Vision Overlay (mood-8) should become a signature pattern:**
- B&W photography of real artists/scenes + electric yellow bounding box + terminal readout
- This communicates: "Our system analyzes real music culture"
- Use it for hero sections, social media, pitch decks, everywhere

**Infrastructure Modules:**
- Numbered (01, 02, 03 or MOD.01, MOD.02, MOD.03)
- Each with a unique pixel art icon or abstract symbol
- ALL CAPS monospace labels
- Hover-inversion (dark → light on hover)
- Yellow accent on tags/numbers

**System Status Elements:**
- Version numbers in corners ("V. 2.0.4 // AI_CORE")
- Status indicators ("SYS.STATUS: ONLINE" with green dot)
- Telemetry bars (COORD, FREQUENCY, MEM)
- Live data feeds with timestamps

**Glass-morphism Cards (from Nodum OS):**
- Semi-transparent backgrounds with backdrop blur
- Subtle white/gray borders
- Multiple overlapping at different depths
- Used for product UI panels embedded in marketing pages

**Data as Art:**
- Visualizer bar charts (our CREATE module already does this)
- Grid backgrounds (blueprint feeling)
- ASCII/generative art instead of stock imagery
- Live terminal output as a living design element

### Interaction Patterns

**From the moodboard, these interactive patterns are the bar:**
- Scroll-triggered fade-in animations
- Hover-inversion on cards (our module cards already do this)
- Animated terminal with line-by-line appearance
- Progress bars that animate
- Live data feeds that update
- Mode tabs (NEUTRAL / THINK / LISTEN / ALERT from Kinetic AI)

### Copy Voice

**The moodboard reveals a consistent copy voice across the references we admire:**
- System-native language: "Initialize Workspace", "Deploy Agent Pipeline", "Submit Audio File [WAV]"
- NOT marketing language: "Get Started", "Sign Up", "Learn More"
- Confrontational headlines: "The Logic Layer for Modern Pop Culture", "Sign the Algorithm", "Truth, extracted."
- Short declarative sentences. Period-heavy.
- ALL CAPS monospace for system/machine text
- Mixed case serif/sans for human text

### Layout Principles

1. **Full-bleed dark hero** with ONE strong visual element (not multiple)
2. **Grid/blueprint background texture** — always present, very subtle
3. **Three-column module grids** with equal-height cards
4. **Split panels** — text left, product/data right (or reversed)
5. **Horizontal dividers** with thin borders between major sections
6. **System labels at edges** — version numbers, status indicators in corners
7. **Dense footer** — comprehensive, organized, functional (Vercel-style)
8. **Figure labels** — "FIG 0.1" to treat the page like documentation (Linear-style)

---

## Part 4: The Quality Bar

The moodboard sets a clear quality bar. Every design element on recoupable.com should be measured against these questions:

1. **Does it look like it belongs on Linear, Vercel, or Composio?** If not, it's not good enough.
2. **Could this be a poster?** The best sections (mood-6 Tidal Shift, mood-8 Vision Overlay) work as standalone prints.
3. **Is the typography doing work?** Every type choice should be intentional — display for headlines, monospace for system, pixel for AI.
4. **Does it feel alive?** Terminals animate. Status dots blink. Data feeds update. Static pages are dead.
5. **Would a developer respect this?** Code snippets, API references, system architecture — technical substance, not marketing fluff.
6. **Is every element load-bearing?** If you removed it, would the page lose meaning? If not, remove it.

---

## Part 5: What Our Current Website Gets Right (vs. the Bar)

| Element | Current State | Moodboard Bar | Gap |
|---------|--------------|---------------|-----|
| Hero headline | Mixed-type "YOUR LABEL. RUN BY AGENTS." | "THE LOGIC LAYER FOR MODERN POP CULTURE." | Close — could highlight one word in a yellow box |
| Agent chat mockup | CSS-animated chat with Gatsby Grace | Real product UI panels (Composio) or B&W photo + bounding box | Replace with vision overlay or real product screenshot |
| Terminal | Animated logs with syntax coloring | Live ingest feed with timestamps (mood-10) | Add timestamps, more realistic agent actions |
| Module grid | 3-column INGEST/CREATE/DEPLOY | MOD.01 with pixel icons (mood-7) | Add custom icons per module |
| System diagram | CONNECT → PROCESS → DEPLOY with arrows | Numbered workflow with system labels (Nodum OS) | Already good — add figure labels |
| Status indicators | None | "SYS.STATUS: ONLINE", version numbers | Add to header or hero |
| Footer | Simple 4-column | Vercel's 6-column mega-footer | Expand with more links |
| Social proof | Text names only | Linear's customer cards with company logos | Need real testimonials with logos |
| Grid background | Subtle white lines on dark | Present in all Recoupable concepts | Already have it |
| Color | #c8ff00 accent | Same across moodboard | Consistent |
