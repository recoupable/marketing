---
title: "OpenAI Gave Us a Glimpse Into Their AI Coding Playbook"
subtitle: "Lessons from the team that built Codex and launched a number-one app with it"
author: "Katie Parrott"
date: 2025-12-19
column: source-code
url: https://every.to/source-code/openai-gave-us-a-glimpse-into-their-ai-coding-playbook
paywalled: true
scraped_at: 2026-06-11T16:07:26.803Z
---

# OpenAI Gave Us a Glimpse Into Their AI Coding Playbook

*Lessons from the team that built Codex and launched a number-one app with it*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Four OpenAI engineers built the Android version of the [image generation app Sora](https://every.to/vibe-check/openai-made-video-creation-effortless-here-s-what-happened-next) in 28 days. Naturally, they built it using [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent), their AI coding agent.

Partway through that sprint, one of those engineers, **[RJ Marsan](https://x.com/RJMarsan)**, shattered his wrist in a bike race, leaving him unable to type. So he cobbled together a speech-to-text system and started talking to Codex instead of typing commands himself.

That forced constraint—having to tell the computer what to do rather than execute the instructions via his keyboard—taught him something the rest of the team eventually adopted: Treating Codex like a new coworker you’re onboarding delivers stronger results than treating it like a tool you’re configuring (Codex doesn’t remember previous conversations automatically). “Every session is onboarding this new coworker [anew].”

Marsan and **[Alexander Embiricos](https://x.com/embirico)**, who leads the Codex product team, joined us for Every’s first-ever Codex Camp to share this and other insights learned building Sora with Codex and how generally to think about working with AI.

Here’s what we learned.

## Key takeaways

1.
**Onboard your AI like a new hire. **Start with quick, interactive prompts. Build trust. Let it learn your preferences. Then delegate longer tasks.

2.
**Don’t overload context. **If you’d overwhelm a coworker with 6,000 facts about your codebase, you’ll overwhelm the AI too. Give it what it needs for the task at hand.

3.
**Narrow beats broad. **An agent with one focused job outperforms a generalist trying to catch everything.

4.
**It doesn’t get easier—you go faster. **AI tools shift the bottleneck; they don’t eliminate it. Architecture and code review become more important, not less.

## How to think about working with AI

Building Codex changed how the OpenAI team thinks about AI agents. When they started work on the product late last year, the team assumed agents would function best by mimicking humans—watching your screen, moving a mouse, and clicking buttons. After all, if AI is intelligent, shouldn’t it interact with computers the way we do?

“I was like, ‘Oh, next year we’re just going to be screen sharing with AI, and it’s just going to be doing stuff,’” Alexander said. “I guess we were super wrong about that.”

The team discovered that AI executes tasks better when you let it work like a computer rather than mimicking human behavior. Think about the difference between manually sorting through your downloads looking for a specific file versus writing a one-line script that does it instantly. Code is faster, more predictable, and easier to automate. But you can’t feed code to a human.

That said, even though AI works best when you let the computer be a computer, you still interact with it like a human. You describe what you want in natural language, and it translates your goals into code. Embiricos made an apt analogy: “If you had to hire a teammate, and you were never allowed to get on a call with them or have them sit next to you looking at your computer, and you could only email back and forth once every 20 minutes, it would just suck to onboard that teammate.” The same is true of onboarding an AI—you need to talk to your AI like a human, not a robot.

## Onboard before you delegate

During the camp, Marsan demonstrated how he still applies the approach of treating the AI like an employee you are onboarding that he developed during his injury. He showed a prompt from the Sora build: implementing content reporting for user posts that violate Sora’s terms of service. He knew the feature existed in the iOS app and similar patterns existed elsewhere in the Android codebase. Rather than track it all down himself, he handed Codex an assignment to review the iOS version and learn about how it works—exactly what you’d give a new hire on day one.

The agent spent several minutes doing research—scanning the codebase, finding related implementations, and identifying the right data structures. This research phase, he emphasized, is the most important step. Codex caught details that would have tripped him up. For example, the codebase used an internal label called “Sora 2” for the content reporting feature; Marsan would have guessed “Sora,” and his code would have failed to connect to the right system. Without having Codex complete the research phase first, the AI might have built something that looked right but broke in ways that would be difficult for a human engineer to track down and fix.

[PAYWALL]
