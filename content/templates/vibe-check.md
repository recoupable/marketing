# Vibe Check — content template & process (W-27)

The **Vibe Check** beat (see `lib/beats.ts`) is our release-day model/tool
verdict for music teams. Every's edge is velocity: a hands-on review published
the day a model drops. This is the standing template so anyone can ship one in
under an hour.

## When to publish

- A frontier model ships (Claude, GPT, Gemini, open-weights) → within 72h.
- A music-relevant tool ships or makes a major change.
- A model we run in production changes behavior enough to matter.

## Format

A new MDX post in `content/posts/` with:

```yaml
---
title: "Vibe Check: Can [model] run your release campaign?"
slug: "vibe-check-[model-slug]"
date: "[ISO date — publish day]"
author: "Sidney Swift"
excerpt: "[One-line verdict — take a side.]"
type: "article"
series: "vibe-check"            # ties it to the Vibe Check beat
seo:
  title: "Vibe Check: [model] for Music Teams"
  description: "[50–170 chars — the verdict + what we tested.]"
  keywords: ["[model]", "AI music", "..."]
tags: ["vibe-check", "[model]"]
category: "essay"
status: "published"
---
```

> `series: "vibe-check"` is read by `beatForSlug()` and overrides the slug map,
> so new posts get the beat automatically.

## Body skeleton (verdict-first, Every-style)

1. **The verdict (1 sentence).** Take a side. "Should've rounded up to 5."
2. **What we actually ran.** The real music workflow we threw at it (a release
   plan, a diligence pass, a content batch) — with the prompt.
3. **Where it won / where it broke.** Concrete, with output snippets.
4. **Does it change our stack?** Are we switching the agents to it or not.
5. **Replicable artifact.** The prompt or skill so the reader can re-run it.

## Surfacing

- The newest Vibe Check should be featured in the homepage Research section.
  Today that section pulls from `siteConfig.researchUrl` (`/blog?type=essay`);
  the Vibe Check beat color/kicker already renders on the card.
- Cross-post the verdict as a thread; the post is the canonical version.
