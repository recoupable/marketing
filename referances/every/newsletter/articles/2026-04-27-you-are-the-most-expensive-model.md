---
title: "You Are the Most Expensive Model"
subtitle: "The real cost of AI agents is your time. A four-step framework for keeping your AI costs in check. "
author: "Mike Taylor"
date: 2026-04-27
column: also-true-for-humans
url: https://every.to/also-true-for-humans/you-are-the-most-expensive-model
paywalled: true
scraped_at: 2026-06-11T16:07:17.409Z
---

# You Are the Most Expensive Model

*The real cost of AI agents is your time. A four-step framework for keeping your AI costs in check. *

*Not every step in an AI workflow needs the smartest AI. That may sound obvious, but it’s not how most people are working. The default is to route entire tasks through frontier models, which is expensive, slow, and usually unnecessary. Incremental determinism starts from a different question: How much intelligence does this task really need?? The answer is almost always less than you’d expect, and the savings add up.—[Mike Taylor](https://every.to/@mike_2114)*

---

There is a reason McDonald’s would never ask its CEO to man the burger grill: It would cost the company [$9,230.77 an hour](https://www.restaurantbusinessonline.com/financing/mcdonalds-ceo-chris-kempczinski-got-raise-last-year). It’s the same as using frontier [AI models](https://every.to/vibe-check/gpt-5-5) to do every task—you don’t need to pay [75 cents every half hour](https://x.com/BenjaminDEKR/status/2017644773356548532) ($1,095 per month!) for Claude Opus to check your to-do list in [OpenClaw](https://every.to/guides/claw-school).

This tension isn’t really about the pricing of AI models—it’s about the value of human attention. Now that you have a cheaper alternative for many tasks that used to require it, you need to figure out the optimal way to deploy AI in a way that frees up your most expensive model—you. Most businesses are getting this balance wrong in both directions: overpaying for AI on simple tasks and underusing it on ones that would free up their best people.

The solution is a process of optimization that I call incremental determinism. Every time you repeat a task, build it into a repeatable process by creating a [skill file](https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button). Identify which parts of that process need the most expensive model, which can be delegated to cheaper, less powerful models, and which tasks repeat often enough to justify turning them into reusable code. And finally, get better at delegating so you can stay focused on the work that needs you.

I call it incremental determinism because the more you repeat a task, the more it pays to nail down exactly how it should be done. The first time, you figure the task out as you go, but after doing it a few times, you can document the best approach. “Deterministic” is a programming term for code that always produces the same output given the same input. The goal is to push as much of your workflow towards that end of the spectrum as possible, because deterministic steps are faster, cheaper, and more reliable. The tradeoff is the upfront investment needed to systematize the task.

There are four levels for achieving this balance and optimizing AI costs. Depending on your technical fluency, you don’t have to go to the final step, but understanding how they each support each other will help you manage how you can control AI costs across your entire organization.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4134/optimized_e2dd67a8-2638-42ea-b62f-7a5e3fe65d5b.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4134/optimized_e2dd67a8-2638-42ea-b62f-7a5e3fe65d5b.png)

## Level 1: Turn sessions into skills

The first level is the easiest. Let’s say you are often asking AI to generate a PowerPoint pitch deck. The first step toward systematizing it is to make a [skill](https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button). A skill can be as simple as a text file detailing how to do a task that the model follows each time it’s asked. It’s the McDonald’s handbook that tells every employee how to make the perfect burger, over and over again. Even less experienced cooks can get a good result.

Once you’re done with the normal back and forth of giving the AI the necessary data and context for the presentation, ask it, “What information would have been useful to know at the start of this task that would have eliminated several steps or mistakes?” Claude knows what it is capable of, so you can ask it to turn its response into a PowerPoint deck creation skill to use next time. Anthropic has been [releasing plugins](https://github.com/anthropics/knowledge-work-plugins) (collections of skills) for various industries to serve as a starting point. They even provide a [“skill-creator” skill](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) that teaches Claude how to guide you through making one when you ask.

Once you have a skill, test it. Ask Claude to test the efficacy of the skill with the following prompt: “Run the task using subagents, one with the skill, one without, and compare the results.”* *If the skill is doing its job, you should see an improvement in quality, cost, and speed. Now try running it with a cheaper model—“Run this test again with [Sonnet](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5)/[Haiku](https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked)”*—*and compare the results. If you’re happy with the output, ask Claude to “Use a [subagent](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell) with Sonnet/Haiku when calling this skill.” You are using a subagent because you don’t want the model that you are using for your main session—the more expensive one—to be the model executing the task, so the separate, cheaper subagent does the work. You just decreased the cost of running that task by 10 to 100 times.

It doesn’t make sense to write skills for throwaway tasks you won’t do again. But if you find yourself doing something for the third time, it’s probably worth formalizing it. If you’re using it multiple times per week, try getting it working with a smaller model.

[PAYWALL]
