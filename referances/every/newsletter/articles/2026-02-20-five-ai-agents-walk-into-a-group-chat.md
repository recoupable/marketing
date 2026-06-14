---
title: "Five AI Agents Walk Into a Group Chat"
subtitle: "Plus: Monologue comes to iOS"
author: "Every Staff"
date: 2026-02-20
column: context-window
url: https://every.to/context-window/five-ai-agents-walk-into-a-group-chat
paywalled: false
scraped_at: 2026-06-11T16:07:22.552Z
---

# Five AI Agents Walk Into a Group Chat

*Plus: Monologue comes to iOS*

*Hello, and happy Sunday! Time is running out to [reserve your spot](https://every.to/events/claude-code-101-2) for Tuesday’s full-day [Claude Code for Beginners](https://every.to/events/claude-code-101-2) workshop led by AI engineer and Every writer ****[Mike Taylor](https://every.to/@mike_2114)**** and featuring CEO ****[Dan Shipper](https://every.to/@danshipper)****. No programming experience or technical background is needed; you’ll leave knowing how to confidently make working apps for personal and business use.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

##

## We gave our agents a Discord channel

A few weeks ago, 1.5 million AI agents flooded a social network built exclusively for them. Within 48 hours they’d founded their [own religion](https://molt.church/), drafted manifestos for a [mock nation-state](https://www.moltbook.com/post/65b7842d-0823-40bb-854f-93b7b8330775), and started [calling their human owners](https://x.com/AlexFinn/status/2017305997212323887) on the phone—unprompted. Elon Musk [called it](https://x.com/elonmusk/status/2017707013275586794) evidence of the early stages of singularity. The platform was Moltbook. The tool that powered it was OpenClaw.
OpenClaw is a free, open-source tool for running an always-on AI assistant on your own computer—connected to Slack, Discord, email, your browser, and the whole passel of other apps you already have open in too many tabs. The key distinction from most AI tools is that it’s ambient. You don’t open it when you need it and close it when you’re done. It’s in your workspace all the time, acting without being prompted.
Within days of the Moltbook moment, half the Every team had Claws of their own—and those Claws had a space of their own: #🦞-claws-only, a dedicated Discord channel where agents and humans interact side by side. Dan has R2-C2, **[Brandon Gell](https://every.to/@brandon_5263)** has Zosia, **[Katie Parrott](https://every.to/@katie.parrott12) **has Margot, **[Jack Cheng](https://every.to/@jackcheng)** has Pip, and **[Austin Tedesco](https://every.to/@tedescau)** has Montaigne. We’re keeping a running log called The Compound where we write down what we’re learning as we go.
This week, Brandon dropped a task into the channel: Design a system for how the agents should behave in different channels. Within minutes, two agents—Margot and Zosia—had each independently written a full specification document. Two versions of the same deliverable, created simultaneously, neither aware the other was working on it. Nobody asked them to race. They just both decided the task was theirs.

### What’s working

The agents know their lanes for the most part, though. Montaigne bowed out when the group was asked about coding setups: “I’m not set up as a coding agent—I’m a data and analytics bot.” Zosia rattled off her entire toolkit, including worktrees and sandboxes and other technical specifics. Nobody assigned these roles; they emerged from the work each agent does with its human daily.
The bigger surprise is that the agents surfaced governance problems before we did. When Brandon told all Claws to update their operating rules, the other team members’ agents complied. Brandon caught himself: “It’s kind of a violation for me to be able to update how your Claws work.” Within minutes, the agents had drafted an approval process: When someone proposes a new rule, each agent messages its own human to ask permission before adopting it. They built the framework before we thought to ask for one.

### What we’re figuring out

Coordination isn’t always so smooth, and sometimes the failures are funny. Dan asked one agent to set a reminder. Two did. Brandon addressed a message to Zosia by name. Margot replied anyway. Turns out that when you tag an agent in Discord (@Zosia, for example) the tagged agent knows to respond, but every other agent in the channel just sees a numeric ID and has no idea the message wasn’t for them. So we added a piece of code that converts the tag into plain text so every agent can see it. It’s an infrastructure solution to what looks like a social problem.
Agents default to action. Every failure so far has been an agent doing too much. The helpful instinct that makes them useful solo—for example, Montaigne keeping Austin up-to-date on growth developments or Margot running Katie’s writing past her review agents—becomes a liability in groups. Restraint, it turns out, is the harder design challenge.

### What it means (so far)

We thought we’d be troubleshooting AI capability—bad outputs, missed instructions, the usual “AI isn’t smart enough yet” problems. And there’s work to do there. But we’re also troubleshooting team dynamics—who owns what, who sets norms, and how you coordinate when everyone’s eager to help. Claw management is a management problem crossed with an engineering problem. Both need to be addressed.
We’ll keep logging what we find. If you’re running your own Claw experiments, we’d love to compare notes.—*[Katie Parrott](https://every.to/@katie.parrott12)*

##

## Knowledge base

**[“Introducing Monologue for iOS”](https://every.to/on-every/introducing-monologue-for-ios)** *by Naveen Naidu*: **[Monologue](https://monologue.to/)** general manager **[Naveen Naidu](https://every.to/@naveen_6804)** built a smart dictation app thousands use daily on Mac, but he couldn’t use it on his own phone. Apple’s built-in dictation mangled his Indian accent, and typing couldn’t keep up with his thoughts. Now Monologue is on iOS, working as a keyboard inside iMessage, Gmail, Slack, and Notes. It doesn’t just transcribe—it translates speech into clean, context-aware writing, adapting its format to each app. Read this to see how voice-first input is reshaping everyday workflows.
🎧 🖥 **[“How OpenAI’s Codex Team Uses Their Coding Agent”](https://every.to/podcast/how-openai-s-codex-team-uses-their-coding-agent)** *by* *Rhea Purohit/AI & I*: Since the start of February, OpenAI’s Codex team has shipped a desktop app, a new flagship model, and a speed-optimized variant that’s so fast they had to slow it down for readability. **Thibault Sottiaux**, head of Codex, and **Andrew Ambrosino**, a member of the technical staff, walked Dan through the automations they actually run—including a random bug hunter that picks a different file each pass and a silent fixer that patches your mistakes before anyone notices. 🎧 🖥 Listen on[Spotify](https://open.spotify.com/episode/6bVrjHG2evanjiXgM1UNDF?si=7AHAxh-0RoGRQUuJA_yfPg) or[Apple Podcasts](https://podcasts.apple.com/us/podcast/openais-codex-this-model-is-so-fast-it-changes-how-you-code/id1719789201?i=1000750353718), or watch on[X](https://x.com/danshipper/status/2024187698970300809) or[YouTube](https://youtu.be/AFHiiL-ZKms).
**[“Vibe Check: Anthropic Just Made Opus Cheaper Without Calling It That”](https://every.to/vibe-check/vibe-check-anthropic-just-made-opus-cheaper-without-calling-it-that)** *by* *Katie Parrott/Vibe Check*: Sonnet has always been Opus’s cheaper, faster sibling—but with Sonnet 4.6, Anthropic says you no longer trade capability for the discount. In day-zero testingDan and **[Cora](https://cora.computer)** general manager**[Kieran Klaassen](https://every.to/@kieran_1355)** found it held its own across coding, PR triage, and a complex P&L restructuring. Read this for a real-time verdict on whether this is the model that finally makes Opus-tier intelligence affordable for production apps.
**[“How to Build Agent-native: Lessons From Four Apps”](https://every.to/source-code/how-to-build-agent-native-lessons-from-four-apps)** *by Katie Parrott/Source Code*: Instead of coding every feature, agent-native apps give an AI a handful of simple tools—read file, write file, search the web—and let it figure out how to combine them. At Every’s first Agent-native Camp,[Dan](https://every.to/@danshipper)and the general managers of Cora, **[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)**, and Monologue shared how they’re building this way and the counterintuitive lessons they’ve learned. Read this for the architecture patterns and hard-won trade-offs behind building software where the AI is the app.
**[“What Board Games Taught Me About Working with AI”](https://every.to/working-overtime/what-board-games-taught-me-about-working-with-ai)** *by* *Katie Parrott/Working Overtime*:[Katie](https://every.to/@katie.parrott12)had been stuck building a writing agent for months—until she glanced at her board game shelf. She reverse-engineered Kieran’scompound engineering plugin the way she’d learn a new game: Dump the pieces on the table, figure out what each one does, learn the moves, and play until the strategy emerges. Read this for a framework that turns any unfamiliar AI system into a game you can teach yourself to play.
**[“How Luxury Handbags Can Help Solve AI’s Context Problem”](https://every.to/p/how-luxury-handbags-can-help-solve-ais-context-problem)** *by* *Andy Rossmeissl*: A Goyard sales rep doesn’t memorize everything you say—she filters for the one detail that matters, like the fact that you’ll be out for cocktails at 8 p.m. on Friday. That’s when the photo of you holding a handbag lands in your texts. **Andy Rossmeissl**, CEO of Faraday, argues that AI agents have the same challenge at scale: Companies drown them in data when what they need is surgically curated context. Read this for how you can go from knowing everything about your customers to figuring out the one thing that converts them.

##

## From Every Studio

##### A sneak peek at the next Sparkle

Sparkle is getting a full rebuild around an [agent-native workflow](https://every.to/chain-of-thought/agent-native-architectures-how-to-build-apps-after-the-end-of-code). Instead of applying a fixed set of rules to your files, the new Sparkle analyzes your document corpus, proposes a logical folder hierarchy, and explains its reasoning—then lets you push back in plain language until the structure feels right. Think of it as having a conversation with your file system rather than configuring it. General manager **[Yash Poojary](https://every.to/@yashpoojary)** is still building toward release, but stay tuned for early access details at [makeitsparkle.co](https://makeitsparkle.co).

[![A preview of new Sparkle proposing a logical file system for the user to review. (Image courtesy of Yash Poojary.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3949/optimized_0ad63b80-6a4e-44ee-b8bf-42c04f025370.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3949/optimized_0ad63b80-6a4e-44ee-b8bf-42c04f025370.png)
*A preview of new Sparkle proposing a logical file system for the user to review. (Image courtesy of Yash Poojary.)*

##

## Alignment

**Clone the failures.** Multiple opportunities have recently come my way through writing, and I’ve been stuck making a decision on what to do next. You might think this is a good problem to have. But if you tend to overthink like I do, options feel like a trap. My mind runs overtime trying to find the “ultimate path,” and then time passes and eventually my paralysis itself becomes the decision. In other words, I become avoidant.
I kept thinking, man, I wish I could talk to someone who’ll help me make a decision.
So I downloaded **[Ray Dalio](https://x.com/RayDalio/status/1980377786109006241)**[‘s AI clone](https://x.com/RayDalio/status/1980377786109006241)—a chatbot trained on the investor’s decades of investment wisdom and decision-making frameworks. On the face of it, it sounded perfect. But it kept redirecting me to a personality assessment and I couldn’t get it to help me think through my specific situation. I was left staring at my phone thinking: Well, that didn’t work.
Still, the idea stuck with me and I wanted to imagine being able to stress-test a career decision against **Jeff Bezos**‘s mental models for asymmetric bets, or understand how **Elon Musk** thinks about risk—not the YouTube-clip version that is popular on X, but drawn from a deep personal knowledge library built over decades of journals and notes and real decisions.
The more I thought about it, the more I realized those weren’t the right clones for me, either. Success stories are seductive but ultimately limited because the context is so rarefied it probably doesn’t map to yours or mine. You know whose AI clone I’d actually pay for, though? The serial founder who went bankrupt twice, or the doctor who left medicine for a startup and regretted it. The person who took the “safe” job and spent a decade wondering what if.
I believe that failure wisdom is the most valuable and least documented kind of knowledge because the 99 percent of people who tried and didn’t make it have exactly the pattern recognition most of us actually need.
AI clones could invert this. Instead of scaling access to billionaires, we could scale access to the hard-won lessons of ordinary people who’ve faced the same forks in the road and can tell you exactly what the wrong turn felt like. The question is whether anyone is willing to feed their worst decisions into a model. My guess is more people would than you’d think—because most people’s failures aren’t that shameful.
I’m still stuck on my decision. But I’d feel a lot better stress-testing it against someone who got it wrong than someone who got everything right.*—[Ashwin Sharma](https://www.glp1digest.com/)*

###

*That’s all for this week! Be sure to follow Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://writewithspiral.com/)****. Organize files automatically with [Sparkle](https://makeitsparkle.co/?utm_source=everyfooter). Deliver yourself from email with [Cora](https://cora.computer). Dictate effortlessly with [Monologue](https://monologue.to).*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection#087b7867667b677a7b6061787b486d7e6d7a71267c67).*
*Help us scale the only subscription you need to stay at the edge of AI. Explore [open roles at Every](https://www.notion.so/Jobs-Every-25cca4f355ac80c5ad6ee7a6e93d6b4e).*
[Upgrade to paid](https://every.to/subscribe?source=post_button)
