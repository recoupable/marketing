# I stopped prompting my AI. I started giving it goals.

Every night at 1 AM, an AI agent reads my company's content strategy, picks the highest-priority thing to build, builds it, tests it, and sends me a report by morning. At 2:30 AM, a second agent checks infrastructure: database connections, broken scripts, the content pipeline end-to-end. It fixes what it can and files a report on what it couldn't. I wake up to a summary. Neither agent waits for my input. They have defined outcomes. They run until those outcomes are met.

For months, my workflow looked like everyone else's. Prompt. Review. "Keep going." Prompt again. Review again. I was the slowest part of a process I'd built to save time. Every time I stepped away, the work stopped.

Then I started writing goals instead of prompts, and the work kept going while I slept.

OpenAI shipped a feature in Codex called `/goal` that does exactly this. You describe an outcome with a measurable finish line. The AI works in a loop: execute, verify against the criteria, decide the next step, repeat. It keeps going until it can prove the goal is met, or it gets stuck and asks for help.

The feature lives in Codex, but the pattern works anywhere an AI tool supports looping and self-verification. At Recoup, where we build AI infrastructure for the music business, this is already how our agents operate.

## Prompts vs. goals

You prompt: "Rewrite this function." The AI rewrites it and waits. You say "okay, what's next?" It tells you. You say "do it." This continues until you run out of patience or the task is done, whichever comes first.

You goal: "Reduce P95 checkout latency below 200ms. Verify with the checkout benchmark. Keep the correctness suite green." The AI plans, executes, checks the benchmark, adjusts, and repeats until the latency number is below 200ms with passing tests. You review the final result.

One requires your attention for the entire session. The other requires your attention twice: once to define the outcome, once to review.

## Writing a good goal

OpenAI published a 6-part framework. Product managers will recognize OKR structure:

1. *Outcome.* What should be true when the work is done?
2. *Verification.* How do you test it? A benchmark, a test suite, an observable behavior.
3. *Constraints.* What can't break? (Deleting the checkout page would reduce its latency to zero. That's not what you want.)
4. *Boundaries.* What tools and files are in scope?
5. *Iteration policy.* How should the AI decide what to try next?
6. *Stop condition.* When should it give up and come back to you?

This is a spec, not a chat message. Writing good goals is closer to writing good tickets than writing good prompts.

## 3,900 emails, 68 left

Codex connected to Gmail through an MCP plugin. The goal was one sentence: "Categorize all bulk/promotion/spam emails. Unsubscribe from unnecessary emails and clean up your inbox. Ask for help when needing judgment."

3 hours and 52 minutes. About 6 million tokens. It read every email, built labels, clicked unsubscribe links, and flagged the ones that needed a human decision. 3,900 emails went in. 68 came out the other side.

No 6-part framework here. A sentence and a half, and it worked because the finish line was obvious: count uncategorized emails. When the count is low enough, you're done.

That tells you when the full framework matters. Complex problems with many failure modes need constraints and verification spelled out. Problems with natural finish lines work with rough goals.

## What this looks like in music

Most music businesses I talk to are still in the turn-based loop. They tried ChatGPT, got generic answers about "building your brand" and "engaging your audience," and moved on. The missing piece was goals that know what "done" looks like for their actual work.

Here's what a goal looks like for catalog operations: a manager drops a deal room folder into their AI workspace. The goal is already defined in the plugin: extract the advance, royalty split, territory, term length, and reversion clause. Flag anything that's missing or below market rate. Produce a summary the manager can actually use in a negotiation. One deal folder in, one actionable brief out. The manager spends 10 minutes reviewing instead of 2 hours reading.

Or artist research: a label A&R says `/recoup-research [artist name]`. The agent pulls streaming data, social metrics, audience demographics, playlist placements, and comparable artists. It produces an executive brief with specific numbers. That used to be a junior employee's entire afternoon. Now it's a command and a 5-minute read.

These are the kinds of goals we build into Recoup's tools. Domain-specific outcomes with clear finish lines. The AI knows what a deal summary needs, what market-rate terms look like for a given catalog size, what an A&R brief should contain. That domain knowledge is what turns a generic AI loop into something a 3-person label can hand real work to.

## When goals don't work

Goals need three properties: the objective stays steady, the finish line is measurable, and reaching it requires multiple steps. Missing any one of those, a regular prompt is better. "Make customers happy" and "refactor this code" both fail because the AI can't verify when it's done. Single-step tasks fail because the loop overhead costs more than a one-turn prompt.

Every goal I've written that failed had the same root cause: I couldn't describe "done" in terms the agent could check.

## Goal engineering

The pattern across every implementation we've done at Recoup: the quality of the outcome definition determines the quality of the output.

Product managers already know how to write measurable outcomes, define constraints, and set success criteria. That's an OKR. The new application is writing that OKR for an AI agent. The level of specificity that goal-based loops require (verification methods, constraint lists, stop conditions) pushes you to be precise about what you actually want.

A prompt is an instruction: do this. A goal is a contract: here's what done looks like, here's how you prove it, here's what you can't break, here's when to stop. One goal can replace dozens of prompts and hours of supervision. And the skill compounds. The better you get at defining outcomes, the more work runs without you.

## What's left for humans

When nightly builds run themselves, when the content pipeline drafts and reviews without you, when the infrastructure agent catches bugs at 2:30 AM, you start to wonder what your job is.

I've been spending that time on strategy, customer relationships, and product decisions that need taste and context that doesn't fit in a goal definition. The work that requires knowing what to build.

Codex's `/goal` is one product. The pattern underneath it is going to be how most teams work with AI within a few years. The rate limiter on how much you can delegate is how well you can describe what "done" means.

Get specific enough, and you can walk away for 6 hours. This is what we build at Recoup: AI agents with domain-specific goals for the music business. If you're running a label, management company, or distributor and want your AI doing real operations instead of answering questions, I'd like to hear what you're working on. [Reach out here.](https://recoup.com/advisory)
