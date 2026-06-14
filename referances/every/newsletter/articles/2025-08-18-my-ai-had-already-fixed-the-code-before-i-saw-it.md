---
title: "My AI Had Already Fixed the Code Before I Saw It"
subtitle: "Compounding engineering turns every pull request, bug fix, and code review into permanent lessons your development tools apply automatically"
author: "Kieran Klaassen"
date: 2025-08-18
column: source-code
url: https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it
paywalled: true
scraped_at: 2026-06-11T16:07:37.049Z
---

# My AI Had Already Fixed the Code Before I Saw It

*Compounding engineering turns every pull request, bug fix, and code review into permanent lessons your development tools apply automatically*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Before I opened my laptop, the code had reviewed itself.

I launched GitHub expecting to dive into my usual routine—flag poorly named [variables](https://every.to/c/compounding-engineering), trim excessive tests, and suggest simpler ways to handle errors. Instead, I found a few strong comments from [Claude Code](https://www.anthropic.com/claude-code), the AI that writes and edits in my terminal:

"Changed variable naming to match pattern from PR [pull request] #234, removed excessive test coverage per feedback on PR #219, added error handling similar to approved approach in PR #241."

In other words, Claude had learned from three prior months of code reviews and applied those lessons without being asked. It had picked up my tastes thoroughly, the way a sharp new teammate would—and with receipts.

It [felt like cheating](https://every.to/working-overtime/ai-phobia-is-really-just-fear-that-easier-equals-cheating), but it wasn't—it was compounding. Every time we fix something, the system learns. Every time we review something, the system learns. Every time we fail in an avoidable way, the system learns. That's how we build **[Cora](https://cora.computer/)**, Every’s AI-enabled email assistant, now: Create systems that create systems, then get out of the way.

I call this **compounding engineering**: building self-improving development systems where each iteration makes the next one faster, safer, and better.

Typical AI engineering is about short-term gains. You prompt, it codes, you ship. Then you start over. Compounding engineering is about building systems with memory, where every pull request teaches the system, every bug becomes a permanent lesson, and every code review updates the defaults. AI engineering makes you faster today. Compounding engineering makes you faster tomorrow, and each day after.

Three months of compounding engineering on Cora have completely changed the way I think about code. I can't write a function anymore without thinking about whether I'm teaching the system or just solving today's problem. Every bug fix feels half-done if it doesn't prevent its entire category going forward, and code reviews without extractable lessons seem like wasted time.

When you're done reading this, you'll have the same affliction.

## The 10-minute investment that pays dividends forever

Compounding engineering asks for an upfront investment: You have to teach your tools before they can teach themselves.

Here’s an example of how this works in practice: I’m building a “frustration detector” for Cora; the goal is for our AI assistant to notice when users get annoyed with the app’s behavior and automatically file improvement reports. A traditional approach would be to write the detector, test it manually, tweak, and repeat. This takes significant expertise and time, a lot of which is spent context-switching between thinking like a user and thinking like a developer. It’d be better if the system could teach itself.

So I start with a sample conversation where I express frustration—like repeatedly asking the same question with increasingly terse language. Then I hand it off to Claude with a simple prompt: "This conversation shows frustration. Write a test that checks if our tool catches it."

Claude writes the test. The test fails—the natural first step in [test-driven development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). Next, I tell Claude to write the actual detection logic. Once written, it still doesn't work perfectly, which is also to be expected. Now here's the beautiful part: I can tell Claude to *iterate on the frustration detection prompt *until the test passes.

Not only that—it can keep iterating. Claude adjusts the prompt and runs the test again. It reads the logs, sees why it missed a frustration signal, and adjusts again. After a few rounds, the test passes.

But AI outputs aren't deterministic—a prompt that works once might fail the next time.

So I have Claude run the test 10 times. When it only identifies frustration in four out of 10 passes, Claude analyzes why it failed the other six times. It studies the [chain of thought](https://every.to/also-true-for-humans/7-22) (the step-by-step thinking Claude showed when deciding whether someone was frustrated) from each failed run and discovers a pattern: It's missing hedged language a user might use, like, "Hmm, not quite," which actually signals frustration when paired with repeated requests. Claude then updates the original frustration-detection prompt to specifically look for this polite-but-frustrated language.

On the next iteration, it’s able to identify a frustrated user nine times out of 10. Good enough to ship.

We codify this entire workflow—from identifying frustration patterns to iterating prompts to validation—in CLAUDE.md, the special file Claude pulls in for context before each conversation. The next time we need to detect a user's emotion or behavior, we don’t start from scratch. We say: "Use the prompt workflow from the frustration detector." The system already knows what to do.

[PAYWALL]
