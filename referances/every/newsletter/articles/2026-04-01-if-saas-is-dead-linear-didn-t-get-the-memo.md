---
title: " If SaaS Is Dead, Linear Didn’t Get the Memo"
subtitle: "The product management tool has successfully reinvented itself as an agent-native business"
author: "Laura Entis"
date: 2026-04-01
column: context-window
url: https://every.to/context-window/if-saas-is-dead-linear-didn-t-get-the-memo
paywalled: true
scraped_at: 2026-06-11T16:07:19.712Z
---

#  If SaaS Is Dead, Linear Didn’t Get the Memo

*The product management tool has successfully reinvented itself as an agent-native business*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

## ‘AI & I’: Slowing down to speed up

Today, we’re releasing a new episode of our podcast* [AI & I](https://every.to/podcast)***. [Dan Shipper](https://every.to/@danshipper)** sits down with **Karri Saarinen**, cofounder and CEO of Linear, a product management tool designed for agent-native software development, to discuss what the “SaaS is dead” narrative gets right—and wrong—and why conviction can be the best product strategy.

Watch on [X](https://x.com/danshipper/status/2039357127903350960) or [YouTube](https://youtu.be/8QcW9-dal0g), or listen on [Spotify](https://open.spotify.com/episode/4YX4enhm6QgqTz388Ezqpu?si=8aBRh6sWTXqPQKyp0hfvBA) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/if-saas-is-dead-linear-didnt-get-the-memo/id1719789201?i=1000758668076). You can also read [the transcript](https://every.to/podcast/transcript-if-saas-is-dead-linear-didn-t-get-the-memo).

Here are the highlights:

-
**Just because the technology has changed doesn’t mean your mission should. **Founded in 2019, Linear is the rare company that started pre-ChatGPT to have successfully reinvented itself as [an agent-native business](https://every.to/guides/agent-native). Saarinen attributes Linear’s success to never losing sight of what it’s always cared about: helping companies build great software. Whereas competitors chased AI trends, Linear focused on understanding how the technology was impacting customers’ workflows, and updating its service accordingly.

-
**SaaS winners are building for agents. **Linear started as an excellent product management tool for humans. Opening up the tool to agents instantly increased the available user base. Today, agents are first-class users inside of Linear, and companies like OpenAI and Coinbase are using its platform to manage their own agents.

-
**Speed means decisions matter more, not less. **AI makes it easy to have an idea and build it without considering whether it justifies its existence. When ChatGPT was released, SaaS companies were launching their own chatbots left, right, and center. Instead of jumping on the bandwagon, Linear stopped to consider whether the application was useful. Turns out it really wasn’t, Saarinen says, a realization that freed up resources to focus on what mattered, like making it easy for humans and agents to collaborate on software development.

Miss an episode? Catch up on Dan’s recent conversations with LinkedIn cofounder **[Reid Hoffman](https://every.to/podcast/reid-hoffman-makes-five-predictions-about-ai-in-2026)**; the team that built Claude Code, **[Cat Wu](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it)** [and](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it) **[Boris Cherny](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it)**; Vercel cofounder **[Guillermo Rauch](https://every.to/podcast/vercel-s-guillermo-rauch-on-what-comes-after-coding)**; podcaster **[Dwarkesh Patel](https://every.to/podcast/dwarkesh-patel-s-quest-to-learn-everything)**; and others, and learn how they use AI to think, create, and relate.

## Dissecting Claude Code

On Tuesday, Anthropic inadvertently leaked the entire source code for Claude Code. Naturally, Cora general manager Kieran was curious to see what was happening under the hood.

In an impromptu livestream, Kieran dug deep into how Claude Code works, unpacking its approach to memory, tools, skills versus slash commands, and prompt structure.

Here are three things he found particularly interesting:

-
**Kairos, one of Claude Code’s most advanced and autonomous features. **It’s often called “Assistant Mode.” Where the standard command line interface waits for you to type, Kairos represents a shift to a proactive, always-on background assistant that keeps running when you leave your laptop. (The name Kairos is ancient Greek for “opportune moment.”) It’s currently internal-only at Anthropic, but the infrastructure is fully built.

-
**The “Buddy” companion. **Similar to Kairos, the infrastructure for Buddy is built, but not yet shipped to users. Buried inside the source code is a virtual pet for your command line. Each Buddy has its own species, personality stats (including ones called CHAOS and SNARK), and little ASCII art animations that respond to what you’re doing. Kieran’s a chaos snail—take from that what you will.

-
**AutoDream, Claude’s nightly closet clean. **This was the feature that most impressed Kieran. It’s a background process that runs when you go idle and consolidates everything that happened—daily logs, session notes—into a better-performing memory for when you come back. Kieran says this is the first [compound engineering-style](https://every.to/guides/compound-engineering) capability he’s seen built into the Claude Code, referring to his philosophy of AI-native software engineering, where each session makes the next one easier. While he’s already been doing this manually, AutoDream is Anthropic’s first move to baking this into Claude Code by default.

[PAYWALL]
