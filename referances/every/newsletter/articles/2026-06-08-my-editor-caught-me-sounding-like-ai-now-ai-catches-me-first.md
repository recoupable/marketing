---
title: "My Editor Caught Me Sounding Like AI. Now AI Catches Me First."
subtitle: "Turning a list of my writing foibles into a skill that stops me from getting away with them"
author: "Katie Parrott"
date: 2026-06-08
column: working-overtime
url: https://every.to/working-overtime/my-editor-caught-me-sounding-like-ai-now-ai-catches-me-first
paywalled: true
scraped_at: 2026-06-11T16:07:13.703Z
---

# My Editor Caught Me Sounding Like AI. Now AI Catches Me First.

*Turning a list of my writing foibles into a skill that stops me from getting away with them*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Before a recent one-on-one with **[Kate Lee](https://every.to/@kate_1767)**, Every’s editor in chief, I opened our shared document and found a list of my own writing fails staring back at me. My drafts had picked up too many of the AI tells that both I—and you—know how to spot from across the room: the symmetrical sentence structures, the little rhetorical throat-clears, the phrases that sound profound on first pass but on closer inspection contain nothing but air, and those pesky sets of three.

The worst part was that I should know better. I am the person at Every who writes about writing with AI while using AI to write about writing with AI. I have custom agents, [style guides](https://every.to/guides/ai-style-guide?source=post_button), editorial workflows, and an apparently bottomless appetite for turning every lesson into a system. And still, I had [let the machine’s smoothness](https://every.to/working-overtime/we-need-to-talk-about-ai-autopilot) pass for my own judgment enough times that my editors felt the need to intervene.

After the meeting, I did what I generally do when I learn something new, embarrassing or otherwise: I baked it into documentation for my agents. I opened the notes, pulled out the patterns Kate had flagged, and listed them in a new skill called /guardrails, which turns any agent I write with into an exacting editorial specialist that keeps me honest.

I’ll never be completely done with /guardrails, or any of the review skills like it that I’ve built, because my human tics and tendencies will move around like a squirmy toddler. But I’d rather make new mistakes than keep repeating the old ones. Review skills are the mechanism by which I do that. They’re another form of editor, one that can catch a draft’s more annoying weak spots before they become a human editor’s problem.

[![The start of my guardrails skill, where I’ve compiled all the particular ways that content I submit can fall below par. (All images courtesy of Katie Parrott.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4270/optimized_f33ae1cf-f442-4546-ba0c-fe99a49747c8.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4270/optimized_f33ae1cf-f442-4546-ba0c-fe99a49747c8.png)
*The start of my guardrails skill, where I’ve compiled all the particular ways that content I submit can fall below par. (All images courtesy of Katie Parrott.)*

Writing with AI tends to be portrayed as a bargain: The machine does more, so the human does less. But in my experience—a microcosm of Every CEO **[Dan Shipper](https://every.to/@danshipper)**’s argument in [“After Automation”](https://every.to/p/after-automation)—it changes what the human does instead of reducing the workload. I have to be clear about defining my standards so a model can understand them. That creates more work—but it helps me [understand them better myself](https://every.to/working-overtime/i-taught-claude-every-s-standards-it-taught-me-mine).

Setting up reviews like /guardrails takes time, attention, and a certain comfort with a tool like [Codex](https://every.to/guides/codex-for-knowledge-work) or Claude Code. But once the reviewers are in place and working, I can spend more of my time pushing the draft from good to great. My drafts are now much cleaner and my own preferences are less of a mystery to myself, because I’ve had to think and talk about them enough that they’ve worn new grooves into my brain.

I’m going to show you a few of the reviewers I rely on and what goes into them (I’ll share a set on Every’s GitHub along with this piece). But it should serve as an example, not a blueprint; the special sauce of this process comes from setting and enforcing your own collection of style requirements.

## Skills rule everything around me

In the beginning of any good guardrail system, there are **skills. **

At the mechanical level, a skill is a Markdown file with instructions inside it. Practically, it’s a way of packaging judgment. When I invoke the guardrails skill, I am asking the model to read a draft through a set of lenses: Look for AI tells, vague claims, hedges, limp openings, and all the little ways a zombie draft can pass as finished without a pulse.

I’ve become fanatical about naming conventions. After all, skill names have to be sticky enough that you remember them when you need them—although this gets less true with every model release, as AI becomes better at deciding which tools it needs to do the job. Still, “assess narrative momentum” sounds like a task someone puts in a project management tool shortly before everyone involved loses the will to live. Instead of clinical descriptors, I’ve given my more editorial skills their own personas: **Sorkin** is a reviewer with a job. He wants to keep the piece walking and talking, not mired in unnecessary specifics. Similarly, **Mom** wants to know where a reader who’s not as AI-pilled as I am might get lost. **Asshole** wants to attack the weakest version of the argument, which is annoying because sometimes the weakest version of the argument is the one I wrote.

Each of these reviewers asks a different question. Together, they give me a way to pressure-test a draft before I hand it to a human editor whose attention I would prefer is spent on problems only a human editor can solve. Our brains belong on the piece’s angle, claim, storytelling, and audience fit. You know, the fun stuff, with some stakes attached.

## Running the guardrail gauntlet

Here’s an image to give you a sense of what a typical final review looks like before I hand a piece to an editor:

[![A comprehensive rundown of 12 agents reviewing a draft ahead of submitting to an editor.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4270/optimized_71237c30-fb2d-4ab6-9541-53b5daa1c778.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4270/optimized_71237c30-fb2d-4ab6-9541-53b5daa1c778.png)
*A comprehensive rundown of 12 agents reviewing a draft ahead of submitting to an editor.*

[PAYWALL]
