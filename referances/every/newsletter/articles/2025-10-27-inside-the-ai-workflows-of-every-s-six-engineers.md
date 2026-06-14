---
title: "Inside the AI Workflows of Every’s Six Engineers"
subtitle: "Each person on the team has tailored their stack to their individual tastes"
author: "Rhea Purohit"
date: 2025-10-27
column: source-code
url: https://every.to/source-code/inside-the-ai-workflows-of-every-s-six-engineers
paywalled: false
scraped_at: 2026-06-11T16:07:31.205Z
---

# Inside the AI Workflows of Every’s Six Engineers

*Each person on the team has tailored their stack to their individual tastes*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Working alongside the engineers at Every, I sometimes wonder: What do they actually do all day? Building software, just like writing, is a creative act, and by definition, that means the process is messy. When I write, I go between Google Docs and whichever LLM I’m leaning on at the moment (currently, [GPT-5](https://every.to/vibe-check/gpt-5)). But what does that look like for the people building software?
Sure, I hear about the products they’re shipping in standup, and I get snippets of their workflows when we run [Vibe Checks](https://every.to/vibe-check). But those moments are always in isolation, scattered whispers of a bigger conversation.
So I asked: What does the workflow of each of our engineers really look like? What stack have they built that makes it possible for six people to run four AI products, a consulting business, and a daily newsletter read by more than 100,000 people?

### Experimenting at the edge: Yash Poojary, general manager of Sparkle

**Yash Poojary** used to be the kind of developer who insisted on doing everything from one lone laptop. A few weeks ago, he caved and added a [Mac Studio](https://en.wikipedia.org/wiki/Mac_Studio#Overview)—Apple’s high-performance desktop—to his setup. “I wanted to use my laptop for everything,” he admits, “but I felt bottleneck[ed] for testing things faster.”
The upgrade has paid off. Now he runs [Claude Code](https://every.to/source-code/claude-code-camp) on one machine and [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) on the other, feeding them the same prompt and codebase to see how they respond. He’s finding that the two models have distinct personalities. Claude Code is the “friendly developer,” great at breaking things down and explaining its reasoning, while Codex is the “technical developer,” more literal, more precise, and often able to land the right solution on the first try.

####

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/916/optimized_8e549b34-2809-457a-83b0-f09e3dc0be7d.png)](wealthfront.com/every)

#### Stop leaving money on the table

A careful investor knows that the real edge is keeping uninvested cash in a high-yield account—so your money works just as hard as you do. Try Wealthfront's Cash Account, which gives you 3.75% APY from program banks on your uninvested cash. No monthly fees, no minimum balance required, and instant withdrawals to eligible accounts 24/7. Let your short-term cash work hard while you figure out your next move.

Right now, you can get an 0.65% boost for three months on up to $150,000 for a total 4.40% variable APY when you open your first Cash Account. Go to [wealthfront.com/every](http://wealthfront.com/every) to sign up today.

*This is a paid endorsement for Wealthfront. It may not reflect the experience of other clients, and similar outcomes are not guaranteed. Wealthfront Brokerage is not a bank. Rate is subject to change. Promo terms and conditions apply.*

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#3c4f4c53524f534e4f54554c4f7c594a594e45124853).

Yash also [recently launched](https://every.to/source-code/i-inherited-a-broken-app-and-made-it-mine) a new version of **[Sparkle](https://makeitsparkle.co/)**, our AI file organizer, complete with a redesigned interface that he worked on in Figma. Back in the dark ages (aka five months ago), Yash would take screenshots of the design and paste them into Claude so it could write the code. Now, with a [Figma MCP](https://www.figma.com/mcp-catalog/) integration, Claude can plug directly into the Figma file so it can read the design system itself—the colors, spacing, components—and translate that into working code. It saves steps and keeps Claude working from the real source of truth.
Outside of agents, Yash leans on [Warp](https://www.warp.dev/terminal)—a modern version of the developer’s command line, the text-based interface developers use to control their computers. Every time he pushes code, he jots down two lines about what he learned in a “learnings doc” and stores them in the cloud. After a few days, he has a rolling memory of recent context to feed back into his AI tools.
Even with all this experimentation, Yash emphasizes the importance of guardrails. He structures his day around one big task and a handful of smaller background ones, and he’s careful not to let AI-generated suggestions derail him. As he puts it: “The problem with CLIs [command line interfaces] is it’s easy to get derailed and lose focus on what you’re actually trying to build… so building guardrails into the system is essential.”
One way he’s doing that is with [AgentWatch](https://agentwatch.lovable.app/), an app he built that pings him when a Claude Code session finishes, letting him run multiple sessions simultaneously without losing track of them. Yash—and a [smattering of others](https://x.com/akiffpremjee/status/1963231217639199163)—have been using it of late; if you give it a try, [DM](https://x.com/poojary_yash) him.
He’s also split his day into two modes: Mornings are for focused execution—just Codex and Claude Code, no new tools allowed—so shipping doesn’t stall. Afternoons are for exploration, when he experiments with new agents, apps, and features. That separation between “build” and “discover” has removed the productivity drag he used to feel when testing new tools.

[![Every illustrations.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_7c4d709e-4d81-4638-adf9-218316e58c8d.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_7c4d709e-4d81-4638-adf9-218316e58c8d.png)
*Every illustrations.*

### Orchestrating the loop: Kieran Klaassen, general manager of Cora

For Kieran, everything with **[Cora](https://cora.computer)** starts with a plan[generated](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) [in Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) with a set of custom agents and workflows. He scopes programming plans at three levels, depending on the feature:

1.
Small features: simple enough to one-shot

2.
Medium features: span a few files and go through a review step (usually by Kieran)

3.
Large features: complex builds that require manual typing, deeper research, and lots of back-and-forth

The point of planning, he says, is to ground the work in truth—best practices, known solutions online, and reliable context pulled in through [Context 7 MCP](https://github.com/upstash/context7), a tool that pulls up-to-date, version-specific documentation and code examples straight from the official source and places them directly into your prompt.
Once the plan is set, it gets sent to GitHub. From there, he uses a work command—a prompt that takes the plan and turns it into coding tasks for the AI agent. For most projects, Claude Code is his go-to, because it gives him more control and autonomy. But he’ll sometimes turn to Codex or the agentic coding tool [Amp](https://ampcode.com/) for more traditional or “nerdier” features.
After the work is done, he has a command that reviews the code. Here, too, Claude often leads, though he also uses a mix of other AI tools, including Cursor and [Charlie](https://www.charlielabs.ai/). The process loops until Kieran decides that the feature is ready to ship.
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_1f007068-635f-4ed3-be6d-6cbd9c5ac271.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_1f007068-635f-4ed3-be6d-6cbd9c5ac271.png)

### Turning complexity into milestones: Danny Aziz, general manager of Spiral

**Danny Aziz**’s current workflow runs almost entirely inside [Droid](https://factory.ai/product/cli)—the command line interface owned by [Factory](https://factory.ai/), a startup building coding agents, that lets him use Anthropic and OpenAI models side by side. About 70 percent of his work happens here, relying on GPT-5 Codex for the big feature builds, and then switches to Anthropic models to refine and nail down the details.
During his planning phase, Danny spends time talking with GPT-5 Codex to make implementation plans concrete and specific—asking it about second- and third-order consequences of his choices, and having it turn those insights into milestones for the project. For example, if the agent implements a feature, but in a way that slows the app down because of how it pulls data from the database, Danny wants to catch that in advance.
Droid was instrumental in helping Danny build the brand-new version of **[Spiral](https://writewithspiral.com)**. Other tools have largely fallen away. “I don’t use Cursor anymore,” he says. “I haven’t opened it in months.” Instead, his main interface is Warp, where he can split the screen into different views and switch quickly between tasks. Behind it, he uses [Zed](https://zed.dev/)—a fast, lightweight code editor—for reviewing plan files and specific bits of code.
As for his physical work setup, Danny keeps it simple: A majority of the time he’s on a single monitor or just his laptop. The only time he adds a second desktop is when he’s deep in the throes of implementing a design, and having the Figma file side-by-side with the build makes it easier to lock the visuals in.
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_27477754-274b-4da2-8c3d-daeeba4d61b6.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_27477754-274b-4da2-8c3d-daeeba4d61b6.png)

### Making process the source of truth: Naveen Naidu, general manager of Monologue

For Naveen, everything begins with the project management tool [Linear](https://linear.app/). Feature requests come in from everywhere—Discord, email, Featurebase, live user calls—but they all end up in the same place. “If it’s not in Linear, it doesn’t exist,” he says. Every ticket carries links back to the original source, so he can always trace who asked and why.
Over the past few weeks, Naveen has [migrated from Claude Code to Codex](https://x.com/naveennaidu_m/status/1977706278110765481) for his day-to-day work.
From there, Naveen shifts into planning mode, which he runs in two different ways. For small bugs or quick improvements, he adds context directly to the Linear ticket and then copies it into [Codex Cloud](https://developers.openai.com/codex/cloud/) to kick off an agent task—no fancy MCP integration, just manual copy-paste. For bigger features, though, he steps outside Linear and into Codex CLI, where he writes a local plan.md—a simple text file that serves as the blueprint for the project. It lays out the steps, scope, and decisions, and becomes the authoritative spec he iterates on with agents as the work unfolds.
Execution also happens on two tracks. In Codex cloud, he brainstorms approaches and generates draft pull requests, usually not to merge, but to explore ideas, surface edge cases, and get potential fixes in parallel. He prefers the cloud because it lets him kick off background tasks asynchronously, whether from the iOS ChatGPT app or on the web.
Once he’s confident in a direction, he moves to Codex CLI for the real build, refining plan.md and letting the agent drive file edits step by step in [Ghostty](https://ghostty.org/), his terminal of choice, all the while keeping a close eye on the agent’s work. Along the way, he uses [Xcode](https://developer.apple.com/xcode/) for native macOS development and Cursor for backend work. MCP integrations with Linear, Figma, and [Sentry](https://sentry.io/welcome/) keep issues, designs, and error tracking wired into the loop.
Review is its own discipline for Naveen. First, he runs Codex’s built-in /review command, which gives him an automated scan for obvious bugs or issues. Then he double-checks the changes himself by comparing the “before” and “after” versions of the code side by side. And when it’s a bug fix, he goes one step further: looking at the error logs in Sentry both before and after the change, to make sure the problem is happening less often.
One tool woven through Naveen’s stack is **[Monologue](https://www.monologue.to/)**, a speech-to-text app he built himself, [incubated at Every](https://every.to/source-code/launch-day-lies-day-two-tells-the-truth), and [launched just last month](https://every.to/on-every/introducing-monologue-effortless-voice-dictation). He uses it to dictate prompts, write ticket descriptions, and update his plans—turning his thoughts into context for his agents. You can [give it a try](https://www.monologue.to/?source=post_button).
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_8cf0f172-1d25-40dc-82ea-cd5cde69b602.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_8cf0f172-1d25-40dc-82ea-cd5cde69b602.png)

### Perfecting what works: Andrey Galko, engineering lead

**Andrey Galko **keeps his workflow simple. He’s not the kind of developer who chases every shiny new tool—and in AI, there are a lot. If something works, he sticks with it. For a long time, that meant using [Cursor](https://cursor.com/), which he still calls the best user experience out there. But when the company changed its pricing, he started hitting the monthly usage limit in just a week, and was forced to look elsewhere.
He found his answer in Codex (and would’ve probably kept paying for Cursor if the former hadn’t been released). For quite some time, Andrey says, OpenAI’s models generated suboptimal code. They’d produce snippets that technically worked but weren’t consistent with the existing codebase, skipped steps, and felt “lazy.” Then came GPT-4.5 and [GPT-5](https://every.to/vibe-check/gpt-5), and things changed: The models started to read code and could complete tasks all the way to a functional MVP.
Codex was always good at non-visual logic—the behind-the-scenes rules and processes that make software run, as opposed to the user interface you click on—and when GPT-5-Codex arrived, it finally got good at the user interface, too. Claude might still produce more creative (and sometimes too creative) UIs, but Andrey finds little need to switch between the two anymore. “I applaud the people at OpenAI for becoming a real menace to Anthropic’s code generation reign,” he says.
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_db937cd2-93f3-4415-9513-783bb34a3f56.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_db937cd2-93f3-4415-9513-783bb34a3f56.png)

### Focusing on one thing: Nityesh Agarwal, engineer at Cora

**Nityesh Agarwal** likes to keep things tight, focused, and clean. His entire agentic stack runs on a MacBook Air M1—no big monitors necessary. “I’m the kind of developer who doesn’t like changing my tools often,” he says. “I like to focus on one thing at a time.”
That one thing is Claude Code. He runs it on the Max plan and uses it for all of his AI-assisted coding. Before he writes a single line, he spends hours researching the codebase and sketching out a detailed plan for how everything should work—with Claude’s help. Once he starts coding he stays in a single terminal, laser-focused on the task at hand. “I’ve realized that what works best for me is to give 100 percent attention to the one thing that Claude is working on,” he says. If a research question pops up, he might spin up a quick session in a separate tab, but as a rule, he avoids juggling multiple agents. He prefers to watch Claude’s work “like a hawk,” finger on the Escape key, ready to step in the moment something looks off.
Lately, he’s actually shortened Claude’s leash, often interrupting it mid-process to ask for explanations. It slows things down, but it pays off in two ways: Claude hallucinates less, and Nityesh feels like he’s sharpening his own developer skills. “I realize that I’ve placed too much of my trust in Anthropic, which leaves me vulnerable,” he admits. When Claude glitched for two days, he tried other tools, but none of them matched what he was used to. “Claude Code has spoiled me,” he says. “So now I just pray it never goes rogue again.”
Another key part of Nityesh’s workflow is GitHub, which has become an interface for how he works with Claude Code. For [Cora](https://cora.computer/), the AI email assistant that Nityesh works on, the engineering team reviews pull requests that Claude Code creates. They leave line-by-line comments in GitHub, then have Claude Code fetch and read those comments into the terminal so the team (which includes both the human engineers and Claude Code) can make the required fixes together.
In terms of other tools, Nityesh calls Cursor and Warp “solid nice-to-haves,” though he wouldn’t mind if he couldn’t access them anymore tomorrow.
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_ceff9a3e-3833-4e0e-b1a5-2138dc21526c.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3802/optimized_ceff9a3e-3833-4e0e-b1a5-2138dc21526c.png)

---

***Rhea Purohit**** is a contributing writer for Every focused on research-driven storytelling in tech. You can follow her on X at [@RheaPurohit1](https://twitter.com/RheaPurohit1) and on [LinkedIn](https://www.linkedin.com/in/rhea-purohit-517441198/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://writewithspiral.com/)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer)****. Dictate effortlessly with ****[Monologue](https://monologue.to)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*
[Subscribe](https://every.to/subscribe?source=post_button)
If you are eligible for the overall boosted rate of 4.40% offered in connection with this promo, your boosted rate is also subject to change if the base rate decreases during the three-month promotional period.
*The Cash Account, which is not a deposit account, is offered by Wealthfront Brokerage LLC ("Wealthfront Brokerage"), Member FINRA/SIPC. Wealthfront Brokerage is not a bank. ****The Annual Percentage Yield ("APY") on cash deposits as of September 26, 2025, is representative, requires no minimum, and may change at any time. ****The APY reflects the weighted average of deposit balances at participating Program Banks, which are not allocated equally. Funds in the Cash Account are swept to Program Banks where they earn a variable APY and are eligible for FDIC insurance. Conditions apply. For a list of Program Banks, see:[www.wealthfront.com/programbanks](http://www.wealthfront.com/programbanks). FDIC pass-through insurance, which protects against the failure of Program Banks, not Wealthfront, is not provided until the funds arrive at the Program Banks. While funds are at Wealthfront Brokerage, and while they are transitioning to and/or from Wealthfront Brokerage to the Program Banks, the funds are eligible for SIPC protection up to the $250,000 limit for cash. FDIC insurance is limited to $250,000 per customer, per bank, regardless of whether those deposits are placed through Wealthfront Brokerage. You are responsible for monitoring your total deposits at each Program Bank to stay within FDIC limits. Wealthfront works with multiple Program Banks to make available up to $8 million ($16 million for joint accounts) of pass-through FDIC coverage for your cash deposits. For more info on FDIC insurance coverage, visit [www.FDIC.gov](http://www.fdic.gov).*
Instant and same-day withdrawals use the Real-Time Payments (RTP) network or FedNow service. Transfers may be limited by your receiving institution, daily caps, or participating entities. New Cash Account deposits have a 2–4 day hold before transfer. Wealthfront does not charge fees for these services, but receiving institutions may impose an RTP or FedNow Fee. Processing times may vary.
