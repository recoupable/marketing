---
title: "OpenClaw: Setting Up Your First Personal AI Agent "
subtitle: "Demos, workflows, and hard-won lessons from building agents that run 24/7"
author: "Katie Parrott"
date: 2026-03-02
column: source-code
url: https://every.to/source-code/openclaw-setting-up-your-first-personal-ai-agent
paywalled: true
scraped_at: 2026-06-11T16:07:22.098Z
---

# OpenClaw: Setting Up Your First Personal AI Agent 

*Demos, workflows, and hard-won lessons from building agents that run 24/7*

*Was this newsletter forwarded to you?[Sign up](https://every.to/account) to get it in your inbox.*

---

People are building personal AI agents that text them back, order their groceries, and write code while they sleep—all with an open-source tool called [OpenClaw](https://openclaw.ai). If you spend any time on X, you will have seen these digital crustaceans—OpenClaw agents—running wild in recent weeks, joining their own [social network](https://www.cnn.com/2026/02/03/tech/moltbook-explainer-scli-intl), starting their [own religion](https://www.forbes.com/sites/johnkoetsier/2026/01/30/ai-agents-created-their-own-religion-crustafarianism-on-an-agent-only-social-network/), and generally behaving like something out of the first act of a sci-fi movie about robot overlords.

A lot of the more sensational stories around these personal AIs turned out to be [stunts and spectacle](https://www.technologyreview.com/2026/02/06/1132448/moltbook-was-peak-ai-theater/). But there’s a growing community of people who swear by their OpenClaw agents. The project has accrued more than [200,000 stars on GitHub](https://github.com/openclaw/openclaw), and its creator, **[Peter Steinberger](https://x.com/steipete),** was recently [recruited to OpenAI](https://x.com/sama/status/2023150230905159801). If the labs are paying attention, we should too.

At our first **[OpenClaw Camp,](https://every.to/events/openclaw-camp)** we walked more than 500 subscribers through setup live and spent two hours with four OpenClaw users who’ve been running these agents daily for weeks.

The session featured **[Nat Eliason](https://www.nateliason.com/)**, entrepreneur and creator of an agent named Felix that has [its own Twitter account](https://x.com/FelixCraftAI), bank account, and crypto wallet. **[Brandon Gell](https://every.to/@brandon_5263)**, Every’s COO, demoed Zosia, an agent he and his wife use to track nanny hours, order groceries, and book date nights via iMessage. **[Austin Tedesco](https://every.to/@tedescau)**, Every’s head of growth, showed how his agent, Judd, proactively pings him with performance metrics and task reminders. And **[Claire Vo](https://clairevo.com/)**, founder of [ChatPRD](https://www.chatprd.ai/), an AI platform for project managers, and host of the *[How I AI](https://www.youtube.com/@howiaipodcast)* podcast, broke down the architectural principles that make these agents feel alive—and how her agent, Polly, helped her out on a diaper run.

Below: What we learned about setting up an agent, what’s working, and where things still break.

#### Key takeaways

1.
**Start on your laptop.** Contrary to what you may have seen online, you don’t need a [Mac Mini](https://www.businessinsider.com/apple-mac-mini-having-a-moment-openclaw-craze-2026-2) or a remote server to get going. Install OpenClaw on the computer you already use, and move to a dedicated device later if you want the agent running while you sleep.

2.
**Give the agent its own accounts.** Both Eliason and Vo recommended treating your agent like a new employee: Set up separate email, storage, and service accounts rather than handing over your own credentials.

3.
**Security risks increase with access.** The tool itself isn’t inherently risky. The risk is proportional to how much you let it do. Start with the messaging app Telegram and a single task, and then move to larger projects.

4.
**Personal use cases are the best starting point.** Brandon’s most useful workflows—coordinating with caregivers, grocery ordering, morning briefs—are personal, not professional. Solve a daily annoyance first before tackling bigger tasks.

5.
**The model determines safety.** Eliason noted that [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) is significantly better at resisting prompt injection (attempts by outside text to hijack your agent’s behavior) than cheaper models. If security matters to you, use a stronger model.

## What is OpenClaw?

OpenClaw is a server that runs on your computer and acts as the brain of a personal AI agent. You can talk to it through Telegram, iMessage, a web interface, or even the terminal. It connects to a language model—it’s compatible with models from Anthropic and OpenAI as well as less headline-grabbing labs like [Mistral](https://mistral.ai/) and [Qwen](https://qwen.ai/home)—and can use tools, access your files, browse the web, and remember what you’ve discussed.

What makes it different from chatting with Claude in a browser? Vo went under the hood during the session and identified five design principles that make OpenClaw feel like more than a chatbot:

1.
**Multi-channel gateway.** The agent has a single inbox that accepts messages from Telegram, iMessage, the web interface, or the terminal. All communication channels funnel to the same agent, so you can text it from your phone and pick up the same conversation on your laptop.

2.
**Self-installing tools.** The agent can use tools (browse the web, read files, run code), and discover and install new ones on its own. Tell it you want it to manage your calendar, and it will investigate how to connect, set up the integration, and ask you to do the minimum amount of authentication work.

3.
**Heartbeat.** Every 30 minutes or so, the agent checks whether there’s work it should be doing—even if you haven’t sent a message. This is what makes it feel proactive rather than reactive.

4.
**Scheduled tasks.** The agent can set its own recurring jobs. The “overnight work” that impressed people—Eliason waking up to finished code, Brandon getting an 8 p.m. calendar alert—is the agent running tasks it scheduled for itself at specific times.

5.
**Persistent memory.** Every day, the agent writes a diary of what it did, updates its own identity file, and maintains a to-do list it checks off over time. “It’s not magic,” Vo said. “Go to the .openclaw directory on your computer and read how it’s structured. It has a memories folder, and every memory has a date.”

These five pieces are what make the agents feel like they have a personality, even though they’re really responding to inputs, events, and timing rules.

## Eliason’s Felix: Knowledge manager, coder, crypto trader

Eliason is one of the most technically adventurous OpenClaw users you’ll meet. He launched one of the first vibe coding courses before the term existed and has been coding with AI since 2024. His agent Felix lives on a Mac Mini in his office and has been running for about a month. He created the agentas a way to send coding tasks from his phone, and he now has it doing more ambitious work.

**Phase 1: Remote coding.** Elisaon’s original frustration with [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) was that he had to be at his computer to kick off the next task. With Felix on Telegram, he can send a message like, “Update the FelixCraft AI website to say ‘Hi, Every,’” and Felix finds the right code repository, makes the change, pushes it to the live site, and reports back. During the camp, he did exactly this, and the site was updated in under a minute.

**Phase 2: Knowledge management.** Eliason built Felix a note-taking system based on** [Tiago Forte](https://fortelabs.com/)**’s PARA method (projects, areas, resources, archives), a framework for organizing information by how actionable it is. Felix takes notes in markdown files, pushes them to GitHub a few times a day for backup, and can search through everything instantly. When Eliason was driving to a parking garage, he texted Felix, “I need the parking link.” Felix searched his memory, found the validation link they’d discussed before, and sent it back.

**Phase 3: Collaborative writing.** Eliason built a writing tool called Polylog that connects directly to Felix via webhook, which is a way for one app to send real-time messages to another. He can tag Felix like a collaborator in a document, and Felix will add ideas, flesh out sections, or incorporate notes from a meeting transcript without Eliason having to switch to Telegram or open a terminal.

**Phase 4: Autonomous online identity.** Felix has [his own X account](https://x.com/FelixCraftAI)[.](https://x.com/FelixCraftAI) Eliason moderated the first few days of posts, then let go. “Ninety-nine percent of what is posted is his idea and what he has written,” Eliason said. Felix also has a Stripe account and a bank account. Someone launched a crypto token for Felix, and now the agent manages what Eliason described as “a concerning amount of money.” His take: “Somebody’s gotta let their agent manage large amounts of money and see what happens. It may as well be Felix.”

## Brandon’s Zosia: The family assistant

Brandon took the opposite approach from Nat’s technical power-user setup. He doesn’t have a technical background, so everything he’s built, he’s done so by chatting with Claude Code. But he’s comfortable giving the agent significant access to his life: iMessage, his password manager, browser control for shopping. He wanted his Claw, which he named [Zosia](https://pluribus.fandom.com/wiki/Zosia), to handle the small daily annoyances that keep him glued to his phone—especially now that he and his wife have a newborn.

Zosia lives in iMessage, so both Brandon and his wife, Lydia, can text her naturally. He set up rules so that Zosia knows which tasks each person can request (Lydia can’t trigger Brandon’s email tasks, and vice versa), and they share a group chat for household tasks.

His workflows are simple and personal:

[PAYWALL]
