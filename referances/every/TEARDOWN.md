# Every Teardown — every.to

Screenshots captured 2026-06-11. See `ABOUT.md` for context, `DESIGN.md` / `COPY.md` for the systems. Companions: `../pm-world/TEARDOWN.md` (solo creator), `../tenex/TEARDOWN.md` (consultancy).

---

## The Business in One Paragraph

A subscription media company that turned itself into an AI conglomerate-in-miniature. One ~consumer-priced subscription buys the content (newsletter, columns, podcast) AND a suite of AI apps (Cora, Spiral, Sparkle, Monologue, Proof, Plus One). The editorial operation manufactures trust and distribution; the product studio converts ideas into apps; the consulting arm sells the same expertise to enterprises (Disney, Ogilvy, Lionsgate, FAA); events (Power User Camps) keep paid members activated. Every surface feeds the others — they say so explicitly: "writing, podcasts, products, and consulting projects are a positive feedback loop."

## The Flywheel

```
Daily editorial (newsletter, columns, Vibe Checks, podcast)
   ↓ builds audience + trust + ideas
Product Studio (EIRs build apps the writers dream up / dogfood)
   ↓ apps become subscriber benefits → subscription gets harder to cancel
Open source (compound engineering plugin, 16K+ GitHub stars)
   ↓ proof-of-builder credibility
Consulting ("from makers, not management consultants") + Events (camps)
   ↓ revenue + war stories
...which become editorial ("How We Run a 25-person Company on Four AI Agents")
```

The content is the R&D log of the company itself. Their best-performing stories are about their own operations — "We Gave Every Employee an AI Agent," "The Folder Is the Agent" (44 agents), "How We Run a 25-Person Company on Four AI Agents."

---

## Page-by-Page Notes

### Landing (`landing/1-12.png`)

| # | Section | What's working |
|---|---------|----------------|
| 1 | Hero | "The Only Subscription You Need to Stay at the Edge of AI" + "Trusted by 100,000 builders." Below: six postage stamps — Read, Email, Speak, Listen, Write, Organize — each verb = one product/surface. The bundle visualized as a stamp collection. |
| 2 | Front page as newspaper | Live editorial grid (Vibe Check: "Fable 5 Is the Best Coding Model in the World"), plus a persistent "EXPLORE THE EVERY UNIVERSE" sidebar widget that routes to every surface: read, Discord, podcast, Cora, Sparkle, Spiral, Monologue, Proof, teams. One nav object that carries the whole bundle. |
| 3 | "Built by Every" product row | App cards each with screenshot + one-line value prop + "Try it": Spiral ("AI writing assistant with taste—publish with confidence"), Cora ("AI assistant for your email—for $15/month"), Sparkle, Monologue. |
| 4 | Paywall popup | The bundle pitch in checklist form: "Reviews of new AI models on release day / Playbooks for integrating AI into your work / Insights from top operators / AI productivity apps: Monologue, Sparkle, Spiral, Cora." CTA: "Unlock the Every universe." Apps as subscriber benefits = the killer retention argument. |
| 5 | Every Studio rail | "Lessons from engineers shipping AI products" — operational war stories as content. |
| 6-9 | Themed editorial rails | "Dispatches From the Frontiers of AI," "Putting AI to Work," "The Future of Programming: Build more. Code less.," "The New Rules of Writing: Exploring how writers and models make meaning together." Each rail = a beat with its own promise. |
| 10 | Columnists | Dan Shipper front and center (CEO + lead columnist + podcast host — founder as main character). |
| 11 | Podcast rail | "AI & I" — guest-driven (OpenAI Codex team, Figma execs, founders who sold for $300M). |
| 12 | Consulting banner + footer capture | "Stop Planning Your AI Strategy. Start Executing It. AI training, adoption, and innovation — from makers, not management consultants." Footer newsletter: "What Comes Next. New ideas to help you build the future—in your inbox, every day." |

### Products / Product Studio (`products/1-3.png`)

- Thesis stated outright: writing/podcasts/products/consulting are "a positive feedback loop." Built with **entrepreneurs in residence**.
- Six shipped apps + "More coming soon... sign up to be a beta tester" + **"Build with us: Got an idea? Work with us to validate, fund, and launch it as an Every product"** — the studio is an open funnel for founders.
- **Experiments** section: numbered lab projects (#001 Machcast → #005 Kairos, TLDR, Extendable Media, MindTune) with "we don't support these—they are tests for our Early Adopters." Public experimentation as both content and product pipeline.

### Consulting (`consulting/1-5.png`)

| # | Section | What's working |
|---|---------|----------------|
| 1 | Hero | "Transform Your Company With AI — Training, adoption, and innovation from the team that **writes the playbooks, ships the products, and trains top teams in AI**." Logo bar: Disney, Ogilvy, Lionsgate, FAA, Hugh James, Krasdale, CoverGenius, Metris, ConsumerAffairs. Vintage-engraving human+robot handshake. |
| 2 | Stats + method | "$175B+ AUM our clients represent / 16K+ GitHub stars / 130K+ newsletter subscribers" — media + code metrics repurposed as consulting credentials. "As seen in" NYT, New Yorker, TechCrunch, Axios. How we work: 1. Executive Alignment ("an organization can only go as far as its leaders do") → 2. Set a Strategy → 3. Train Teams → 4. AI Transformation. Plus "Executive Offsite" productized day. |
| 3 | Differentiation | "**Work with builders, not followers.**" Three proof pillars: "We write the bleeding edge" (when journalists need to explain Claude Code, they call us), "We build AI-native products," "We open-source what works" (compound engineering plugin, 7,000+ stars, endorsed by the creator of Claude Code). Verticalized: hedge funds/PE + tech. |
| 4 | Testimonials | Star ratings + visceral quotes: "This is insane work. We pretty much built a whole new product in two days." And the give-away-the-keys line: "rather than relying on an outside firm to make us AI native, Every enabled our team to do it ourselves... gave us the know-how and tools to keep building without them." |
| 5 | Qualified form | "Ready to go AI-native? We work with organizations ready to transform, not experiment. If that's you, let's talk." Project-size dropdown. Statues flank the form. |

### Events (`events/1.png`)

- "Power User Camps" — model-specific live trainings within DAYS of release ("Fable 5 Power User Camp: A Frontier Model for Builders," June 12 — model dropped ~June 9). Codex Camp, Compound Engineering Camp, IRL #NYTechWeek, Executive AI Sessions. Camps are paid-member benefits → activation + retention.

### Guides (`guides/1.png`)

- Evergreen flagship guides as a library: Agent-native Architectures, Claw School, The Eight Levels of AI Adoption, An Executive's Guide to Implementing AI ("a playbook... from Every's consulting team" — content as consulting funnel), Codex for Knowledge Work, Agent-native Product Management, AI Style Guides, Every's Editorial Guidelines (they publish their own internal standards), Compound Engineering ("The AI-native engineering philosophy").

### Newsletter (`newsletter/1.png` + `articles/`)

- Archive sorted Popular/Newest/Oldest. Camp announcements live next to essays ("My Editor Caught Me Sounding Like AI. Now AI Catches Me First.").
- The `articles/` folder holds ~2,000 scraped posts (back through the 2015-2019 Praxis/Tiago Forte era — PARA, progressive summarization, BASB) via `scrape-every-newsletter.mjs` — a full corpus of their editorial voice for study.

### Menu (`menu/1.png`)

- Slide-out drawer: Home, Newsletter, Columnists, Columns, Podcast, Products, Events, Guides, Consulting. The whole conglomerate in nine links.

---

## Tactics Worth Stealing

1. **Apps as subscriber benefits.** The paywall popup sells software, not just content. Bundling apps into the sub makes cancellation feel like losing tools, not just newsletters. (Recoup: the plugin/skills could be a membership benefit, not only a one-off zip.)
2. **One verb per product.** Read / Email / Speak / Listen / Write / Organize. If a product can't claim a verb, it isn't distinct enough.
3. **Operational war stories as flagship content.** Their own company is the case study ("How We Run a 25-Person Company on Four AI Agents"). Recoup equivalent: run an artist/label on Recoup agents and publish everything.
4. **Release-day velocity as brand.** Vibe Checks on launch day + Power User Camps within 72 hours of a model drop. Speed itself is the editorial differentiator.
5. **Open source as consulting credential.** 16K GitHub stars + "endorsed by the creator of Claude Code" converts to "$175B+ AUM clients." Code in public, sell to enterprises.
6. **"Makers, not management consultants."** Same anti-consultant blade as Tenex, but backed by shipped product.
7. **The universe widget.** One persistent sidebar that cross-sells every surface from any page.
8. **Experiments in public.** Numbered lab projects with explicit "unsupported, for early adopters" framing — pipeline + content + community status all at once.
9. **Founder as main character.** Dan Shipper is CEO, lead columnist, and podcast host. The media trains the audience to trust the person, the person sells everything else.
10. **Enable, don't gatekeep** (consulting testimonial): "gave us the know-how and tools to keep building without them" — the teach-them-to-fish promise is the differentiator vs. agency lock-in.

## Recoup Translation

| Every element | Recoup equivalent |
|---------------|-------------------|
| One subscription = content + apps | Recoup membership = Sidney's content + the plugin + camps |
| Stamp verbs (Read, Email, Write...) | Release / Research / Pitch / Promote / Track — one verb per Recoup workflow surface |
| Vibe Check on release day | Model/tool vibe-checks for music workflows the day they drop ("Can Fable 5 run your release campaign?") |
| Power User Camps | "Release Camp" / "Fan Data Camp" live sessions for members |
| Every Studio + EIRs | Artists/managers-in-residence building on Recoup; their campaigns become case studies |
| "How We Run a 25-Person Company on Four AI Agents" | "How We Run a Record Label on Recoup Agents" — the Gatsby Grace operation IS this content |
| Consulting: "from makers, not management consultants" | Label services: "from people who run artists on this stack daily, not agency account managers" |
| Open-source compound engineering plugin | recoupable/skills public repo as the credibility engine |
| Experiments (#001-#005) | Numbered public experiments (viral hook engine, content pipelines) for early adopters |

**Trio synthesis (the funnel Recoup can run):**
- **Top (all three do this):** teach publicly, daily/weekly, under a personal voice (Sidney = the George/Dan role — already decided).
- **Self-serve floor (pm-world):** $99-tier plugin zip.
- **Membership middle (Every):** subscription bundling content + plugin updates + camps.
- **Enterprise ceiling (Tenex/Every consulting):** qualified-form label deals, "from makers not consultants."
