---
title: "Vibe Check: Cursor 2.0 and Composer 1 Alpha"
subtitle: "Two new things: A code editor designed to manage agents and a lightning-fast model"
author: "Rhea Purohit"
date: 2025-10-29
column: vibe-check
url: https://every.to/vibe-check/vibe-check-cursor-2-0-and-composer-1-alpha
paywalled: true
scraped_at: 2026-06-11T16:07:30.935Z
---

# Vibe Check: Cursor 2.0 and Composer 1 Alpha

*Two new things: A code editor designed to manage agents and a lightning-fast model*

*Our AI writing partner ****[Spiral](https://writewithspiral.com)**** is [live on Product Hunt](https://www.producthunt.com/products/spiral-8?bc=1). We’d be grateful if you could [upvote it and leave a comment](https://www.producthunt.com/products/spiral-8?bc=1) about how you use it.*—*[Danny Aziz](https://every.to/@dannyaziz97)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

At Every, we measure excitement for a new AI product by the velocity of messages in our #early-access channel on Discord.

We got early access to Cursor 2.0—a new version of the [OG AI code editor](https://cursor.com/)—a week ago, and the vibes were…polite. People were curious, interested, but not exactly fired up. Then, less than 24 hours ago, we got our hands on the new LLM Cursor also released today, and the group chat has been *popping off*. The excitement for the new model seems to be rubbing off on the code editor as well.

[![Source: Every’s Discord server.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3807/optimized_1a2b2672-4428-441a-8847-ea3b4a463068.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3807/optimized_1a2b2672-4428-441a-8847-ea3b4a463068.png)
*Source: Every’s Discord server.*

## What’s new

Cursor launched two things today:

**Cursor 2.0:** A refreshed version of its AI code editor, with a push to add more of the primitives of command line interfaces (CLIs, or the text-based tools developers use to type commands directly, rather than clicking around in a graphical editor) like Claude Code directly into the interface. Cursor 2.0 includes a new agent view where you can spin up and manage agents in a three-panel layout: agent status on the left, AI thought process in the middle, code on the right. (It resembles an inbox of sorts, reminiscent of [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) on the web; we dig into this interface more below.)

**Composer 1 Alpha: **Cursor’s very own LLM that is, indeed, as my colleagues said, very, very fast. The model is available inside Cursor 2.0 as well as its CLI. It will cost the same as GPT-5 (which, as we noted in our [GPT-5 Vibe Check](https://every.to/vibe-check/gpt-5), is priced to make rivals sweat: GPT-5-mini undercuts Google’s [Gemini 2.5 Flash](https://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash), and GPT-5 Standard comes in at one-twelfth the cost of [Claude 4 Opus](https://every.to/vibe-check/vibe-check-claude-4-sonnet)).

#### Our day-zero verdict:

Cursor 2.0 is a solid evolution of the integrated development environment (IDE) experience for 2025: Its agent view prioritizes what programmers *actually* spend time on (delegating to and managing agents) rather than reading and writing code by hand. It also has a lot of bells and whistles—like the ability to put multiple models on the same problem simultaneously and an integrated web browser so AI can test out its code end-to-end. *But* because Cursor 2.0 can do anything, it feels overwhelming, and if you’re coming back from using a CLI, it’s going to feel hard to use.

Composer 1 Alpha is fast, capable, and genuinely fun to use—but inside Cursor 2.0, it feels limited by how cluttered the interface feels. The fact that Cursor has its own model though makes Cursor genuinely interesting again, and we’ll keep coming back to see how it improves over time.

## The Reach Test

#### Dan Shipper, the multi-threaded CEO

##### Cursor 2.0 🟥

It’s a good step forward for Cursor, but it would have to be significantly better than Codex CLI or Claude Code to get me to switch back. As it is, the interface feels too cluttered, and GPT-5 and [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) don’t seem to run with as much autonomy as they do in the CLI. I do like the integrated browser and the ability to read code when I need to, though I still think code feels like too much of a first-class citizen.

##### Composer 1 Alpha 🟨

It’s super fast, which is great. But it doesn’t feel as smart as Sonnet 4.5 and GPT-5 in my side-by-side tests. A highly technical programmer who understands exactly what he or she wants would probably love it, but if you’re diving into a codebase that you don’t fully understand (like me), you wouldn’t reach for it.

#### Kieran Klaassen, the Rails-pilled master of Claude Code

##### Cursor 2.0 🟨

I went from red (haven’t touched it since [version 0.45](https://x.com/kieranklaassen/status/1904679017443410046) in February) to yellow because I’m genuinely curious if I can get it into my groove. I’m an engineer, so an IDE should feel natural, but after living in the CLI it suddenly feels clunky. It might be a skill issue that I need more time to figure out. The UI still fights me: Command+W closes the wrong pane, Command+T nukes my agent context, and I’m drowning in redundant controls. But I have a feeling that I shouldn’t disregard the tool: Agent mode is there, and the power features like parallel agents in work trees are surprisingly smooth. I’m still on the fence but intrigued to see where this goes.

##### Composer 1 Alpha 🟩

It just feels good. Fast enough that it makes me more productive—despite being less smart than Sonnet 4.5, because speed keeps you in flow, which is its own kind of intelligence. Since I typically know exactly what I want from the model, Composer is pretty good at executing without making me wait. It’s perfect for iterative work, which is what Cursor is built for. This model will be great for a lot of people.

#### Andrey Galko, the cautious vibe coder

##### Cursor 2.0 🟨

I’m pretty sure that IDEs are the way for the future of coding to go—they’re easier to use, and there are a lot of useful features that are easily accessible. CLIs feel clunky for me. It’s nice that Cursor has added new features (that we’ll discuss below) and has a very fast model. But I’d like to see them integrating with the Codex CLI and Claude Code like its competitor [Zed](https://zed.dev/) does, instead of locking people in on their platform. I still use Cursor, but mostly to run CLIs in its terminal.

##### Composer 1 Alpha 🟨 🟩

The model is fast, and I can say that it gets more right than wrong. So I’m optimistic about where it could bring us and how others may try to start competing with it. But I’m not necessarily going to switch from the slower Codex CLI. It’s still more well-rounded, and it manages to go that extra mile that Composer shies away from (without overdoing it like Claude did at some point.)

## Putting Cursor 2.0 through its paces

Cursor 2.0 features an inbox-like interface with an agents panel on the left—where you can see all the agents that are currently running, along with the status of completed updates—the AI’s thought process in the middle, and code on the right. This view represents a new style of coding, one focused on delegating to and managing agents.

Cursor 2.0’s interface is reminiscent of Codex on the web. It builds on a trend that Claude Code sparked a half year ago, when it deprioritized the code itself to focus on prompting agents to execute for you. The primitives were already there—Cursor just seems to have cherry-picked the best ones.

The upside is power: You can do almost anything from one place. The downside is... the same. Having everything in one interface can feel overwhelming. It demands spending time configuring a whole new workflow, and there’s friction in doing that when it’s not yet clear that it’s substantially better than existing tools. And when using OpenAI or Anthropic models, the experience is less autonomous than expected. The agent stops often, suggesting that the harness—or the layer of software that connects the model to the application it’s being used inside of, in this case, Cursor 2.0—isn’t quite there yet.

Cursor 2.0 did not, as we alluded to in the introduction, catch our team’s fancy at once. Kieran questioned the choice to make it an IDE. Claude Code-pilled as he is, he prefers the simplicity of coding in a terminal. And **[Danny Aziz](https://every.to/@dannyaziz97)**, general manager of [Spiral](https://writewithspiral.com/), was turned off from trying the product out at all because “being inside an IDE is so Q1 2025.” But the excitement around Composer 1 Alpha has started to chip away at some of their skepticism. “There are definitely good ideas in there, especially the agent mode,” Kieran says. “I need more time to find a workflow…especially with the new model, the speed feels great.”

[PAYWALL]
