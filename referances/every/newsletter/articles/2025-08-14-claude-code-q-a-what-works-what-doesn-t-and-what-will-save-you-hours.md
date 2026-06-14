---
title: "Claude Code Q&A: What Works, What Doesn't, and What Will Save You Hours"
subtitle: "Every's engineering team shares the workflows they use to ship"
author: "Katie Parrott"
date: 2025-08-14
column: source-code
url: https://every.to/source-code/claude-code-q-a-what-works-what-doesn-t-and-what-will-save-you-hours
paywalled: false
scraped_at: 2026-06-11T16:07:37.257Z
---

# Claude Code Q&A: What Works, What Doesn't, and What Will Save You Hours

*Every's engineering team shares the workflows they use to ship*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Last month, we held our inaugural Claude Code Camp, where builders from Every Studio hopped on a Zoom with Every subscribers to share how they're using Claude [Code](https://every.to/c/compounding-engineering) to build real products at Every—**[Spiral](https://spiral.computer), [Cora](https://cora.computer/), [Sparkle](https://makeitsparkle.co)**, and Monologue.
What unfolded was part show-and-tell, part group debugging session, and part philosophical discussion about what it means to build software alongside AI. Over two hours, we explored custom commands, parallel workflows, and the messy reality of working with agents that sometimes go rogue.
Some patterns that emerged from the conversation:

1.
Planning is paramount—not as rigid doctrine, but as a way to keep Claude from wandering off into expensive tangents. **[Kieran Klaassen](https://every.to/@kieran_1355)**, general manager of [Cora](https://cora.computer/), treats plans like detailed maps for a journey, rather than instructions for how to walk.

2.
Structure helps more than it constrains. Even solo developers were curious about how practices from traditional coding, like pull requests (drafts of proposed code changes), could be used in AI-assisted workflows to maintain order and ensure steady progress.

3.
When it comes to working with AI, providing context from the start is essential. It’s what allows the AI to act like an informed teammate—understanding your goals and constraints—instead of a stranger dropped into the project midstream.

Our team has uncovered some cool tricks, and some principles we believe will become essential to AI-enabled coding. But we’re still experimenting, failing, and iterating in real time. And with new releases, like Claude Code’s [new agents](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell), which dropped about a week after this session, the landscape keeps shifting beneath our feet.
Want to follow along as we keep testing Claude’s capabilities? The next subscriber-only Claude Code Camp is scheduled for August 22. [Subscribe to Every](http://every.to/subscribe) and keep an eye on your inbox for when the invite drops.
[Subscribe](https://every.to/subscribe?source=post_button)

### Read the Q&A for yourself

Kieran led the session, fielding questions about his intricate GitHub-integrated Claude workflow while **[Dan Shipper](https://every.to/@danshipper)**, Every's CEO, facilitated the conversation.
The session featured a parade of hacks and workflows: custom slash commands that launch multiple AI instances to research problems in parallel, workflows that let you run three features simultaneously without conflicts, context files that teach Claude your codebase's architecture, and even an experimental logging system Kieran once tried that "fined" Claude $100 for failures. Team members demonstrated everything from using voice-to-text for faster prompting to running Claude Code on mobile phones via SSH tunnels.
Here are the highlights of the Q&A.

### Planning and prompting

Before any code is written, the team focuses on planning—writing a detailed, high-level description of the work so Claude doesn’t wander into irrelevant (and costly) territory.
**Q:** *What makes a “good plan”? You said a good plan is important but also not to have a mega-prompt. I would have expected a good plan is a mega-prompt.*
**Kieran Klaassen:** The mega-prompt still works for a good plan. But I think the question was more about priming the model. I lean into the agentic aspect for research or coding—it’s better to give Claude a mega-prompt for the plan (so it knows every step to follow) but not for *how* to work. The “how” should be left flexible.

### Workflow and delegation

In AI-assisted development, a pull request (PR) isn’t just for code review—it’s a checkpoint that lets the AI complete a full pass before a human steps in. This prevents wasteful mid-course corrections.
**Q:** *How often are you correcting Claude’s work?*
**Kieran:** It depends on the initial research and feature complexity. I’m rarely correcting mid-flight. Planning and reviewing are the most important steps.
**Q:** *When I delegate to Claude Code, it sometimes gets a bit rogue. How do you prevent that?*
**Kieran:** If you have a precise, detailed plan, it never goes rogue.

### Technical practices

Test-driven development (TDD) flips the normal process: Write the test first, then code until the test passes. With Claude, you can build this into the plan so it codes, tests, and fixes in a loop.
**Q:** *How does TDD work in practice with Claude Code?*
**Kieran:** You define the tests clearly, then say “Use TDD.” Claude will write code, check against the tests, and iterate until it passes. You just have to remind it not to implement the full solution before running the tests—it gets a little eager.

### Architecture and maintenance

Good architecture keeps software stable even as features change. For Claude Code projects, the basics still apply: clean code, thorough tests, and thoughtful reviews.
**Q:** *How do you ensure the app architecture remains stable?*
**Kieran:** Add tests, write good code, and do good reviews.
**Q:** *Can you consolidate all feedback into one PR comment for Claude to address?*
**Kieran:** Yes—I have a command that pulls in all comments and resolves them together.

### Advanced techniques

Claude can run “sub-agents” in parallel for unrelated tasks, or switch into “think ultra hard” mode for problems that need more reasoning time.
**Q:** *When do you use sub-agents vs. “think ultra hard”?*
**Kieran:** Sub-agents for many unrelated small things, “think ultra hard” for a genuinely hard question.
**Q: ***Have you seen evidence that manipulation (for lack of a better word) like "I will give you $1000" or "I will fine you $100" significantly affects the quality of output?*
**Klaassen:** I don't think these hacks work anymore. They are funny, though.

### Context management

A CLAUDE.md file works like a personal briefing document for the AI. It contains the essentials about your codebase so Claude can “think” like a teammate who’s been on the project for months.
**Q:** *Do you use one CLAUDE.md file or separate ones?*
**Kieran:** Both. You can even have them tied to specific directories so Claude loads the right one for that part of the codebase.

### Integration and tools

Model Context Protocol (MCP) tools are like adapters that let Claude plug into other systems—GitHub, Todoist, even browsers—so it can take action instead of just suggesting code.
**Q:** *Are MCP tools worth the time right now?*
**Kieran:** Yes, 100 percent. Add one for anything you do manually.

### Safety and best practices

Normally, Claude Code asks permission before each action—"Can I edit this file?" "Can I run this command?"—to prevent accidental damage. There's a command called "dangerously-skip-permissions" that bypasses these safety checks for speed, but it's risky. The safe way: Run it inside a "container," a sealed-off environment where mistakes can't harm the rest of your system.
**Q: ***Any suggestions/best practices to set up your projects so that it's "safer" to run it with the —dangerously-skip-permissions?*
**Klaassen:** If you use containers, this is very safe.
**Q: ***What's the best way to work with GitHub branches while developing? Should features be developed in branches?*
**Klaassen:** Yes, I would follow best practices with Git feature branches that will be merged to main when everything is reviewed. You can tell Claude to revert or undo the last change, and it will do that pretty well.

### Working style

Switching between different kinds of AI agents can be mentally draining. Batching similar tasks together helps keep energy up.
**Q:** *Do you hit a fatigue wall working with multiple AI agents?*
**Kieran:** I use the Pomodoro method and group work by type—code reviews for an hour, research for an hour—so my brain doesn’t fry.

### Learning and reviews

Sometimes Kieran lets different AI reviewers critique the same pull request without picking a winner immediately. Seeing competing perspectives helps him spot better approaches. The good ideas get written into automated style rules so Claude applies them next time.
**Q: ***Your method of generating “nice tension” from distinct AI reviewers and incorporating those varied perspectives without immediate resolution—is that a deliberate strategy to preserve multiple viewpoints for deeper insight?*
**Klaassen:** I think it's mostly for me to learn if there are other ways that are better or nicer. I have a strong opinion, but there might be a better way. I think it's more of a learning experience.

### Error handling

Dumping every error message into Claude can overwhelm it. Letting the AI decide how much context it needs keeps it focused.
**Q: ***When sending error logs to Claude, how much context tends to be effective?*
**Klaassen:** Let the agent decide instead of pasting it. The agent is good at deciding.

## What we’re learning

These workflows borrow from traditional software development but use its rituals differently. Branches, PRs, and tests provide checkpoints where human judgment can amplify AI speed. Each iteration teaches the system something new, making the next one faster and more reliable. That’s the essence of “compounding engineering.”
**Join us for the next Claude Code Camp**
This was just our first session—we’ve only scratched the surface of what’s possible when you combine human judgment with AI speed. The next subscriber-only Claude Code Camp is on **August 22**.
[Subscribe](https://every.to/subscribe?source=post_button)
Keep an eye on your inbox for the invite, and come ready with your own “How would you…?” questions. We’ll answer them live, break down the workflows, and maybe even discover a few new tricks together.

---

***Katie Parrott**** is a writer, editor, and content marketer focused on the intersection of technology, work, and culture. You can read more of her work in [her newsletter](https://katieparrott.substack.com/).*
*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Automate repeat writing with [Spiral](https://spiral.computer/?utm_source=everyfooter). Organize files automatically with [Sparkle](https://makeitsparkle.co/?utm_source=everyfooter). Deliver yourself from email with [Cora](https://cora.computer/).*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
[Subscribe](https://every.to/subscribe?source=post_button)
