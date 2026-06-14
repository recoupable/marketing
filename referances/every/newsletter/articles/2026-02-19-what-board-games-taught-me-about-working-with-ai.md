---
title: "What Board Games Taught Me About Working With AI "
subtitle: "The skills I transferred to my writing agent from playing Settlers of Catan"
author: "Katie Parrott"
date: 2026-02-19
column: working-overtime
url: https://every.to/working-overtime/what-board-games-taught-me-about-working-with-ai
paywalled: true
scraped_at: 2026-06-11T16:07:22.640Z
---

# What Board Games Taught Me About Working With AI 

*The skills I transferred to my writing agent from playing Settlers of Catan*

*TL;DR: In case you missed it, you can now see all of Every’s upcoming camps and workshops [in one place](https://every.to/events). Coming up this Friday: our [Compound Engineering Camp](https://every.to/events/compound-engineering-camp), where ****[Kieran Klaassen](https://every.to/@kieran_1355)**** introduces the AI-native philosophy that helps Every ship products with single-person teams, and on February 24, learn Claude Code in one day in our [live, beginner-friendly workshop](https://claude101.every.to/) taught by ****[Mike Taylor](https://every.to/@mike_2114)****.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief) *

---

I’d been stuck on trying to build my own writing agent for months when I found myself scanning my board game shelf. Suddenly, the problem wasn’t about AI anymore.

It was the end of [Think Week](https://every.to/context-window/give-yourself-a-promotion), Every’s twice-yearly retreat where we break to explore possibilities outside the flow of our regular work. The team was in a beach house in Panama, decked out in shorts and sunglasses with palm trees swaying in the background. I was under 10 inches of snow in Ohio, locked in a battle of wills with my dog about going outside.

From my laptop, I watched **[Austin Tedesco](https://every.to/@tedescau)**, Every’s head of growth, demo a dashboard he built in one day that pulls data from PostHog and Stripe and gives him a complete view of signups and subscription revenue. COO **[Brandon Gell](https://every.to/@brandon_5263)** showed off an AI CFO that helps him steer the company. Head of consulting **[Natalia Quintero](https://every.to/@natalia_2944)** shared Claudie, an AI agent that she and applied AI engineer **[Nityesh Agarwal](https://every.to/@nityesh)** had built in two weeks with nothing but Claude Code and a dream.

Meanwhile, my momentum had stalled out as badly as my attempt to get my passport renewed in time for the trip. It was a stark contrast to how I’d felt six months earlier. In July, I was on a roll: I’d built a [custom ChatGPT project](https://every.to/working-overtime/i-fed-my-essays-to-chatgpt-until-it-learned-my-voice) that ran my entire drafting process. I’d developed an AI editor that could [enforce Every’s editorial sensibilities](https://every.to/working-overtime/i-taught-claude-every-s-standards-it-taught-me-mine) and written specialized Claude prompts called [Skills](https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button) that the whole editorial team used. But around September the wind fell out of my sails, and it hadn’t quite been back since.

Watching my coworkers demo these systems made me want to take advantage of all [the new capabilities of Opus and Codex](https://every.to/vibe-check/codex-vs-opus), of [agent-native architectures](https://every.to/source-code/how-to-build-agent-native-lessons-from-four-apps) and the seemingly infinite possibilities popping up on all sides like Whac-A-Mole moles. I just had no clue where to start.

At the same time, my best friend and I were playing chicken about whether we’d brave the snow to get together. I scanned my board game shelf, stocked with everything from crowd pleasers like Wingspan and Codenames to five-hour behemoths that no one wants to play with me, ever. I was trying to decide what we’d play if she did come over… and then I was thinking about worker placement and area control and victory conditions.

What ensued was that strange, slightly vertigo-inducing feeling when two unrelated ideas fuse together in your head: What if I thought about my AI project as a board game?

## The art and science of ‘the teach’

I spent the holidays teaching my nephews board games. Over four days, the four of us—a nine-year-old, a seven-year-old, my mom, and me—played five different games. It’s not everyone’s idea of a good time, but it is mine.

I like to think I have what’s called “the teach” in board game lingo down to a science. Before you go into strategy, before “here’s how you beat your brother,” there’s a more basic question: What are the pieces, and what do they do? This little wooden person is called a meeple. When you place it, you’re claiming that road. This gem chip means you can afford more expensive cards. This sushi card is worth points if you collect three of them.

I knew I wanted to build a writing system that could take advantage of all these new capabilities and tools, but I wasn’t even clear on the parts I was working with. I had a Claude project with some custom instructions and a few Google Docs that I’d manually edit whenever I wanted to change something. It worked well enough. But it didn’t feel magical like those Think Week projects did.

I needed an example, a game I could study to help me understand the parts and what they might do. Fortunately, I already had one in mind.

## The game on the shelf

**[Cora](https://cora.computer/) **general manager **[Kieran Klaassen](https://every.to/@kieran_1355)** built a [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)—a software development system for Claude Code that gets smarter the more you use it. Every time you fix a bug or have a new insight, you write it down and feed it back to the AI. Over time, the system learns your preferences and grows more capable.

[PAYWALL]
