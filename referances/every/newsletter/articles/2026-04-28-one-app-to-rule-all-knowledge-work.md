---
title: "One App to Rule All Knowledge Work"
subtitle: "Plus: Agent-designed automations, why final review belongs in the destination app, and how to use our compound knowledge plugin"
author: "Katie Parrott"
date: 2026-04-28
column: context-window
url: https://every.to/context-window/one-app-to-rule-all-knowledge-work
paywalled: false
scraped_at: 2026-06-11T16:07:17.186Z
---

# One App to Rule All Knowledge Work

*Plus: Agent-designed automations, why final review belongs in the destination app, and how to use our compound knowledge plugin*

*OpenAI’s [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) desktop app has become Every’s head of growth ****[Austin Tedesco](https://every.to/@tedescau)****’s [daily driver](https://every.to/p/the-agent-that-saved-my-brain), handling everything from email triage and go-to-market planning to KPI tracking and recruiting. Last week, he and CEO ****[Dan Shipper](https://every.to/@danshipper)**** showed more than 250 paid subscribers exactly how they use it in our [Codex Knowledge Work Camp](https://every.to/events/codex-for-knowledge-work). Read to the end for how to review business documents with Austin’s [compound knowledge plugin](https://github.com/EveryInc/compound-knowledge-plugin).—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

## Signal

##### Coding apps are the new operating system for knowledge work

**What happened: **OpenAI’s [Codex desktop app](https://every.to/vibe-check/codex-vibe-check) may have started life as a product for senior engineers pair programming with AI, but these days it’s equally good for powering other types of knowledge work. Every’s head of growth, **[Austin Tedesco](https://every.to/@tedescau),** now runs roughly 80 percent of his daily workflow through Codex—a tool that, at our Codex Knowledge Work Camp, he said was “trash” for non-engineers just three-to-six months ago.
**Why it matters: **OpenAI, Anthropic, and [Cursor](https://every.to/vibe-check/cursor) are all racing to ship a unified product for handling code and knowledge work, and they’re [converging](https://every.to/vibe-check/codex-vs-opus) on a single standard: an agentic terminal or chat interface with a left-hand project sidebar, plus connections to all the tools you already use like Gmail, Slack, Notion, and Stripe. These connections, for many non-engineers, were the missing piece of the puzzle.
**What it means:** Switching between ChatGPT and Claude based on the models’ personality differences might become a less-common occurrence. Instead, your desktop AI app has your API keys, your project files, and your daily workflows. Businesses, especially, with custom skills and plugins and months of company data in Codex won’t casually swap to [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa) or [Cowork](https://every.to/vibe-check/vibe-check-claude-cowork-is-claude-code-for-the-rest-of-us) next quarter—and vice versa.
Watch for the desktop apps to converge further on shared patterns beyond project folders that load themselves and plugin connectors to your most-commonly used tools. These new patterns may define the next decade of office software.

##### What to do this week:

- If you’ve been working in the web interface, download one of the desktop apps—Codex or Claude Code/Cowork—and spend a session there. The work feels different once you’re outside the browser tab.

- If you’re already on a desktop app, poke around its integrations and capabilities section. There’s almost always something useful lurking, like Anthropic’s design and marketing plugins, or Codex’s PDF creation skill. Pick one and try it.

---

####

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/934/optimized_2e873b79-bc52-4253-a02a-e834ffb7bb03.png)](https://www.monologue.to/?utm_source=standalonead&source=post_button)

#### Write at the speed of thought

That gap between your brain and your fingers kills momentum. Monologue lets you speak naturally and get perfect text three times faster, and your tone, vocabulary, and style are kept intact. It auto-learns proper nouns, handles multilingual code-switching mid-sentence, and edits for accuracy. Free 1,000 words to start.

[Download Monologue for Mac](https://www.monologue.to/?utm_source=standalonead&source=post_button)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#2754574849544855544f4e575467425142555e095348).

## Now, next, nixed

**Now: Documents written for both humans and agents.** In the past, anything you wrote at work fell into one of two buckets: polished prose for people or structured data for machines. Agents are the first readers that need both. At Every, our guides on [compound engineering](https://every.to/guides/compound-engineering) and [agent-native architectures](https://every.to/guides/agent-native) exemplify this hybrid.
**Next: Documents that write back. **The latest internal version of **[Proof](https://every.to/on-every/introducing-proof)**, our document editor for AI-human collaboration, supports agentic loops: The agent continuously monitors the document for changes and comments and suggests edits without you needing to interrupt your writing flow. The document seems [to come alive](https://every.to/p/living-software), growing around your words in real time.
**Nixed: Pretending the human wrote it.** The pretense that an agent-written document has to sound like the human who sent it is a relic of a bygone era—especially if other agents are reading too. Provenance matters less if you’ve reviewed it and stand behind it.

---

## Steal this workflow

##### Let the agent tell you what to automate

Some people hesitate to delegate work to agents because they struggle to think of a good use case. Try flipping it: Hand the agent the keys and ask it what to do.

1.
**Open Codex (or Claude Code).** Connect your top three tools, like Notion, Slack, and Gmail. Give the agent full permissions—it can’t find patterns in what it can’t see.

2.
**Prompt:** “Look at how I use my connected tools. Suggest five automations that would save me time, and rank them by how much friction they’d remove.” It might suggest a morning briefing based on your calendar, or ways to triage your inbox.

3.
**Pick the easiest one first.** Have the agent draft replies to unanswered messages at the end of each day. Run the automation for a week, then audit the misses.

You won’t know the agent’s capabilities until it has access to your real tools and a reason to use them. Skip the guesswork and let it show you.—*[Laura Entis](https://every.to/@laura_27bbaf_1)*

---

## Skill share

##### Reviewing work with the compound knowledge plugin

[Compound engineering](https://every.to/source-code/compound-engineering-the-definitive-guide) turns every coding session into training data for the next one, so that the agent gets a little smarter about your codebase each time you use it. [Compound knowledge](https://github.com/EveryInc/compound-knowledge-plugin) does the same thing for memos, plans, and KPI sheets. The review step, launched with the `/kw:review` command, ensures that the AI doesn’t start off on the wrong foot.
**What it does. **The plugin reviews any Codex or Claude Code plans for strategic alignment with your company’s strategy and the project’s goals—and to verify the underlying numbers—before the agent gets to work. It’s the difference between “the agent wrote a plan” and “the agent wrote a plan that doesn’t contradict the last three executive meetings.”
**Why it matters. **Most plugins for agents are built for engineers reviewing code. Code review happens after the code’s already written and tested. Compound knowledge assumes operators are reviewing memos, KPI sheets, or recruiting lists, where the verifiable failure might be a confidently wrong data point—which has to be caught before a plan is enacted.
**Steal it. **Compound knowledge is [public on Every’s GitHub](https://github.com/EveryInc/compound-knowledge-plugin). Install it, drop your company context into the project files, and, with some practice and calibration, you’ll have a reviewer that knows your business.

---

## Inside Every

##### Final approval in the final context

Austin runs his compound knowledge loops in Codex, but he always signs off on the agents’ work in the destination app. He approves Slack drafts in Slack, where he can see the channel’s recipients. He checks agent-produced email drafts in Gmail, and strategy memos in Notion or **[Proof](https://proofeditor.ai/)**.
This is context-switching as a safety feature. The destination app reminds you that AI is now acting on something real—that the message is going to a person, or the document is about to anchor a launch—in a way a chat window can’t.
As agents move deeper into the stack, though, the question becomes: Is the destination app the right venue for the final pass forever, or does the approval step need its own surface? And as OpenAI, Anthropic, and others race to own the management layer, will it become another part of the archetypal user interface for knowledge work?—*LE*

---

***[Katie Parrott](https://every.to/@katie.parrott12)*** *is a staff writer at Every. You can read more of her work in* *[her newsletter](https://katieparrott.substack.com/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://writewithspiral.com/)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer/)****. Dictate effortlessly with ****[Monologue](https://monologue.to/)****. Collaborate with agents on documents with [Proof](https://www.proofeditor.ai/). *
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*
[Subscribe](https://every.to/subscribe?source=post_button)
