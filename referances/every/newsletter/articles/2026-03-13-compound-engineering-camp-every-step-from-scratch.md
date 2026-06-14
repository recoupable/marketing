---
title: "Compound Engineering Camp: Every Step, From Scratch "
subtitle: "Kieran Klaassen turned a prompt into a working app in an hour and shows you how"
author: "Katie Parrott"
date: 2026-03-13
column: source-code
url: https://every.to/source-code/compound-engineering-camp-every-step-from-scratch
paywalled: true
scraped_at: 2026-06-11T16:07:21.230Z
---

# Compound Engineering Camp: Every Step, From Scratch 

*Kieran Klaassen turned a prompt into a working app in an hour and shows you how*

*TL;DR: ****[Cora](https://cora.computer/)**** general manager ****[Kieran Klaassen](https://every.to/@kieran_1355)**** has written prolifically about [compound engineering](https://every.to/source-code/compound-engineering-the-definitive-guide), his philosophy of software engineering for the AI age. In this piece, based on a camp he gave for paid subscribers a few weeks ago, we get an inside look at how exactly Kieran builds with the compound engineering plugin for the first time. He walks through, step by step, the process of going from a single prompt to a working app in under an hour. If you’ve been curious about how to build with compound engineering, this is the piece to read.—[Kate Lee](https://residenceinnbymarriottphiladelphiabalacynwyd.reservationstays.com/hotels/lMVXOwZj?utm_source=adwords_semro&utm_campaign=G%3ARS%3AUS%3APMAX%3ADSA-Chains%3AUS%3AEN&gad_source=1&gad_campaignid=21191562182&gbraid=0AAAAAo1QcNk9-_L5jMXja7zRKGllt1NBQ&gclid=CjwKCAjw687NBhB4EiwAQ645dmbNhmZp29zw6xIQJVuhLZo6e0f98Lfj638CAlZ8EQfzpy7hQxr2vhoC3-oQAvD_BwE&redirect_auth_retry=true&expand_params=false)*

*Was this newsletter forwarded to you?[Sign up](https://every.to/account) to get it in your inbox.*

---

This time last year, any time **[Kieran Klaassen](https://every.to/@kieran_1355)** opened a new session in Claude Code, he started from scratch. The lessons from his past code reviews, the style preferences he’d painstakingly explained, and the bugs he’d already flagged—Kieran remembered them all, but from the machine’s perspective, it was like it had never happened.

He’d been building **[Cora](https://cora.computer/)**, Every’s AI email assistant, and getting tired of copy-pasting the same prompts, correcting the same overengineered tests, and flagging the same bugs. “A human would remember,” Kieran said. “The AI wouldn’t.”

So he decided to create a system that *would *remember—one that plans before it codes, reviews outputs to enforce his taste, and stores every lesson so the AI applies it next time. The result is what we now know as [compound engineering](https://every.to/guides/compound-engineering), a signature approach to coding with AI where every bug, fix, and code review makes the system permanently smarter. The official [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin) has more than 10,000 GitHub stars and is used by a growing community of builders, including engineers at Google and Amazon, who say it changed how they think about software.

At our first [Compound Engineering Camp](https://every.to/events/compound-engineering-camp), Kieran walked subscribers through the full loop live, building an app from a one-line prompt to a working product in under an hour. Below is the workflow as Kieran demo-ed it, plus what it means for how software gets built from here.

##### Key takeaways

1.
**Brainstorm before you plan.** The plugin has a brainstorm step that interviews you collaboratively and fills the gap between your vague idea and a detailed spec.

2.
**Planning should run without you.** Once the requirements of the project are clear, the plugin has a plan step that researches your codebase, checks for existing patterns, surfaces past learnings, and produces an implementation plan with zero additional input needed.

3.
**Use different models for different steps.** Kieran uses faster models—such as [Claude Haiku 4.5](https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked) or [Gemini 2.5 Flash](https://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash)—for brainstorming, [Opus](https://every.to/vibe-check/opus-4-6) for planning, [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) for implementation, and sometimes Gemini for code review.

4.
**Compound when the context is fresh.** The plugin’s compounding step stores lessons as artifacts that future agents can discover, the core of compound engineering. Run it right after something breaks or works—before the AI compacts your conversation and you lose the specifics of what you were talking about.

## The compound engineering loop

A founder who does everything themselves hits a ceiling, Kieran says. The ones who scale are the ones who build systems—hiring, documenting, and training—so the work happens without them in the room.

Compound engineering applies that logic to coding with AI. “You remove yourself from as many places as you can,” Kieran said. “That forces you to extract things, automate things. And that’s where the compounding happens.”

The core idea is a four-step loop: Plan, work, review, compound. Each step has a specific input and a specific output. The output of one step becomes the input of the next.

**Plan** takes a problem and produces a detailed implementation plan—a markdown file (a simple text document with formatting) containing data models, file references, architectural decisions, and sources. The plan is specific enough that an AI agent or a human engineer could pick it up and execute it without asking questions.

**Work** takes that plan and produces a pull request (a proposed set of code changes ready for review). The code gets written, tests get generated, and documentation gets updated.

**Review** takes the pull request and produces findings—comments, suggestions, and flagged issues stored as to-do items in the file system. Different AI models can review the same code and surface different problems.

**Compound** captures whatever the system learned during planning, working, or reviewing—a new coding preference, a bug pattern to avoid, or an architectural decision worth preserving—and stores it in files that future sessions can reference. This is what makes the loop self-improving.

There’s also an optional upstream step—**brainstorming**—for when you have a vague idea rather than a clear requirement. “Brainstorming is when the idea isn’t super detailed yet,” Kieran said. “If you have a very clear requirement—like adding a new authentication provider—you skip brainstorming and go straight to planning. Planning is about the details and not making mistakes.”

## From a blank prompt to a working app

[PAYWALL]
