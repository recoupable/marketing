---
title: "Compound Engineering: How Every Codes With Agents "
subtitle: "A four-step engineering process for software teams that don’t write code"
author: "Dan Shipper, Kieran Klaassen"
date: 2025-12-11
column: chain-of-thought
url: https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents
paywalled: true
scraped_at: 2026-06-11T16:07:27.540Z
---

# Compound Engineering: How Every Codes With Agents 

*A four-step engineering process for software teams that don’t write code*

O*ur last coding camp of the year is [Codex Camp](https://0ab9ee3d.click.convertkit-mail2.com/lmulv69l7gimhnwokkkt6h8k52600bghd2pg2/z2hghnhewvk8m9ap/aHR0cHM6Ly9ldmVyeS50by9jb3Vyc2VzL2NvZGV4LWNhbXAvcHVyY2hhc2U=)—a live workshop about building with OpenAI’s coding agent, open to all Every subscribers on Friday, December 12 at 12 p.m. ET. [Learn more and reserve your spot](https://every.to/courses/codex-camp/purchase)***.**

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

What happens to software engineering when 100 percent of your code is written by agents? This is a question we’ve had to confront head-on at Every as [AI coding has become so powerful](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for). Nobody is writing code manually. It feels weird to be typing code into your computer or staring at a blinking cursor in a code editor.

So much of engineering until now assumed that coding is hard and engineers are scarce. Removing those bottlenecks makes traditional engineering practices—like manually writing tests, or laboriously typing human readable code with lots of documentation—feel slow and outdated. In order to deal with these new powers and changing constraints, we’ve created a [new style of engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) at Every that we call **compound engineering**.

In traditional engineering, you expect each feature to make the next feature harder to build—more code means more edge cases, more interdependencies, and more issues that are hard to anticipate. By contrast, in compound engineering, you expect each feature to make the next feature *easier *to build. This is because compound engineering creates a learning loop for your agents and members of your team, so that each bug, failed test, or *a-ha* problem-solving insight gets documented and used by future agents. The complexity of your codebase still grows, but now so does the AI’s knowledge of it, which makes future development work faster.

And it works. We run five software products in-house (and are incubating a few more), each of which is primarily built and run by a single person. These products are used by thousands of people every day for important work—they’re not just nice demos.

This shift has huge implications for how software is built at every company, and how ambitious and productive every developer can be: Today, if your AI is used right, a single developer can do the work of five developers a few years ago, based on our experience at Every. They just need a good system to harness its power.

The rest of this piece will give you a high-level sense of how we practice compound engineering inside of Every. By the time you’re done, you should be able to start doing the basics yourself—and you’ll be primed to go much deeper.

## Compound engineering loop

A compound engineer orchestrates agents running in parallel, who plan, write, and evaluate code. This process happens in a loop that looks like this:

1.
**Plan:** Agents read issues, research approaches, and synthesize information into detailed implementation plans.

2.
**Work:** Agents write code and create tests according to those plans.

3.
**Review: **The engineer reviews the output itself and the lessons learned from the output.

4.
**Compound:** The engineer feeds the results back into the system, where they make the next loop better by helping the whole system learn from successes and failures. This is where the magic happens.

We use Anthropic’s [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) primarily for compound engineering, but it is tool-agnostic—some members of our team also use startup Factory’s [Droid](https://every.to/vibe-check/vibe-check-i-canceled-two-ai-max-plans-for-factory-s-coding-agent-droid) and OpenAI’s [Codex CLI](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent). If you want to get more hands-on with how we do this, we’ve built a [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin) for Claude Code that lets you run the exact workflow we use internally yourself.

Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound.

Let’s dive in.

### 1. Plan

In a world where agents are writing all of your code, *planning* is where most of a developer’s time is spent. A good plan starts with research: We ask the agent to look through the current codebase and [its commit history](https://chatgpt.com/share/693adca4-af24-8012-afc6-8ec5e9146be2)to understand the codebase’s structure, existing best practices, and how it was built. We also ask it to scour the internet for best practices relevant to the problem we’re trying to solve. That way when we begin to plan the agent is primed to do good work.

[PAYWALL]
