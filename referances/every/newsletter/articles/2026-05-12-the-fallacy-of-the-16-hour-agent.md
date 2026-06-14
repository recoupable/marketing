---
title: "The Fallacy of the 16-hour Agent"
subtitle: "Plus: Perplexity’s rules for agent skills, the office politics of dictation, and creating a weekend AI piano coach"
author: "Katie Parrott"
date: 2026-05-12
column: context-window
url: https://every.to/context-window/the-fallacy-of-the-16-hour-agent
paywalled: false
scraped_at: 2026-06-11T16:07:16.243Z
---

# The Fallacy of the 16-hour Agent

*Plus: Perplexity’s rules for agent skills, the office politics of dictation, and creating a weekend AI piano coach*

New data on long-horizon AI reliability just dropped, and depending on which chart you saw, you either think autonomous AI has arrived or it’s still years away. Today, we break down which version of the research to trust, plus Perplexity shares its methodology for building agent skills that don’t rot in production, Every CEO **[Dan Shipper](https://every.to/@danshipper)** turns his piano keyboard into a real-time Codex-powered music coach, and Gusto co-founder **Edward Kim** warns that the office of the future is going to sound more like a sales floor.—*[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*
[Subscribe](https://every.to/subscribe?source=post_button)

---

## Signal

#### The 24/7 agent is nearly upon us—or is it?

The [holy grail](https://every.to/chain-of-thought/toward-a-definition-of-agi) of agentic AI has been long-horizon reliability—an agent to which you can hand a task and trust to still be on the right thread hours later, when context has decayed and there’s no human in the loop to catch a wrong turn. [METR](https://metr.org/), a nonprofit that measures AI capabilities, released an update to its research showing how close we are to that autonomous future.
One chart from the update circulating online shows an early preview of Anthropic’s next model, [Mythos](https://every.to/context-window/every-is-half-agent-now#signal), blowing past existing models and the 16-hour range that METR’s benchmark suite can reliably test—literally breaking the scale.

[![Claude Mythos Preview reaches the edge of METR’s current measurement range at 50 percent success. METR cautions that results above 16 hours are unreliable with its current task suite. (Image courtesy of METR.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4193/optimized_89f043c6-b30d-4d6d-b251-48a071db1ed0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4193/optimized_89f043c6-b30d-4d6d-b251-48a071db1ed0.png)
*Claude Mythos Preview reaches the edge of METR’s current measurement range at 50 percent success. METR cautions that results above 16 hours are unreliable with its current task suite. (Image courtesy of METR.)*

It’s important to note, however, that how many human hours a task takes is not the same as how long a model takes to run those same tasks. Duration, the way that METR’s benchmark uses it, stands in for *difficulty*. As the nonprofit writes in the report’s FAQ: “AI agents are typically several times faster than humans on tasks they complete successfully.”
That last bit—tasks completed *successfully*—adds another twist to the benchmark. The 16-plus hour measurement is based on a 50 percent success rate. A separate measurement of how LLMs perform at 80 percent reliability shows that Mythos can run tasks that would take humans a little over three hours. It’s a significant step up from the closest competitor measured, Gemini 3.1 Pro (METR doesn’t currently have measurements for [Opus 4.7](https://every.to/vibe-check/opus-4-7) or [GPT-5.5](https://every.to/vibe-check/gpt-5-5)). But it brings Mythos back down to earth.

[![LLMs measured against METR’s time horizon test for completing tasks with 80 percent success, presented on a logarithmic scale. (Image courtesy of METR.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4193/optimized_265b34c9-1357-49eb-9eb5-2ad018d2e9c1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4193/optimized_265b34c9-1357-49eb-9eb5-2ad018d2e9c1.png)
*LLMs measured against METR’s time horizon test for completing tasks with 80 percent success, presented on a logarithmic scale. (Image courtesy of METR.)*

Both these things are true: Duration can be a useful proxy for difficulty, and benchmarks don’t reflect reality. “[They] don’t measure model capability alone,” [says](https://x.com/danshipper/status/2053191885116571935) Dan. “They measure model capability after a human has done the work of finding a prompt that lets the model’s capability appear.”

##### What to do this week:

1. **Figure out your longest agent run. **METR teaches us that duration might be a good approximation of difficulty. Ask: What’s the longest stretch you’ve trusted an agent on autopilot? If you don’t know, you can’t extend it.
**2. Extend your agent’s runtime by giving it a goal.** Last month, OpenAI shipped a new [/goals](https://developers.openai.com/codex/use-cases/follow-goals) command in Codex that allows agents to pursue objectives across multiple turns without checking in. Yesterday, Anthropic [introduced](https://code.claude.com/docs/en/goal) a similar command to the latest Claude Code version. Both are apt for long-running loops with clear criteria for success—and very much in line with what we’ve heard [from Claude’s platform team](https://every.to/context-window/ai-work-is-splitting-in-two#ai-i-the-secrets-of-claudes-platform-from-the-team-that-built-it). Try it out today.
**3. Audit the effectiveness of your existing loops.** If you already have agents running overnight, “How long did your agent run?” is still a useful diagnostic—but ask it alongside, “With what guardrails, against what feedback signal, and at what verified accuracy?”

##

## Steal this workflow

#### Build your next agent skill like Perplexity does

Creating a skill these days is relatively easy. Creating one that keeps working is not. We’ve seen skills that were running fine one day suddenly fire on the wrong request, fail to load when needed, or yield reports that weren’t as useful as they used to be. So the skill files get patched, growing longer every time the agent makes a mistake. But nobody can tell whether the latest edit helped or hurt.
**Perplexity**, the AI search company building agentic research and browsing tools, recently [published its methodology](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity) for designing agent skills. The main lesson: Instead of starting with the skill, start the tests. Highlights from the post:

-
**Write the evals first.** Pull five to 10 cases from production queries, known failures, and edge cases. Include negative examples—queries that should not invoke this skill.

-
**Phrase triggers like a human would.** Start with, “Load when…” and use the language your users use. Perplexity’s example: Instead of “monitors pull requests,” try “babysit a PR,” “watch CI,” or “make sure this lands.” This way, the skill loads without your team having to use a specific command or technical phrase.

-
**Write the body in principles, not procedures.** The model already knows commands; it needs direction on how to apply them. Instead of listing detailed steps to, say, checkout a new code branch, then cherry-pick files to edit, then check for conflicts, and so on, Perplexity recommends instructions like, “Cherry-pick the commit onto a clean branch. Resolve conflicts preserving intent.”

-
**Codify failures into lessons.** When the agent fails in production, write the failure mode to the skill file. The mistake becomes a standing instruction that guards against future mistakes.

-
**Edit instructions rigorously. **Ask with every line you add: “Would the agent get this wrong without this?” If not, cut it. Every extra line adds context cost.

**Try it this week:** Pick one skill your team wants to improve. Write 10 test cases—five it should handle, five it should refuse or route elsewhere. Run the current skill against them. The gap is your backlog.

---

## Discuss

> “The office of the future will sound more like a sales floor.”—**Edward Kim**, cofounder of Gusto, in the* Wall Street Journal*

A *Wall Street Journal* article this week about [AI dictation tools entering the workplace](https://www.wsj.com/tech/typing-is-being-replaced-by-whisperingand-its-way-more-annoying-a804fee7) treats verbal prompting and composition as a manners problem—an angle that shows that the more things change, the more they stay the same.
Every new work interface eventually creates etiquette. Email created reply-all politics. Slack created notification politics. Voice AI is about to create room-tone politics: when you can talk to your computer, how loudly, and around whom. Great news for nosy office neighbors, but for the rest of us, it’s one more reason to curse the invention of open floor plans.

---

## Inside Every

This week, [Thinking Machines Lab](https://thinkingmachines.ai/blog/interaction-models/) and [OpenAI](https://x.com/openaidevs/status/2053964133570412826) both announced bets on the same future: AI that watches and responds in real time, instead of waiting for its turn. OpenAI shipped its Realtime-2 voice models; Thinking Machines previewed an interaction model that watches video and audio simultaneously.
While we’re all waiting to see how the labs’ visions roll, Dan used Codex to jerry-rig his own version.
On Saturday, he plugged his MIDI keyboard—a keyboard that translates notes into data a computer can read—into his laptop, opened [Codex](https://x.com/danshipper/status/2053551046299959760), and asked it to build a piano app that would identify the chord he played—then keep watching and coach him as he practiced. The pattern generalizes to any live medium: writing in a document, drawing on a tablet, deadlifting in front of a phone. This is also the promise of hardware like Meta’s AR/VR glasses or [Apple’s](https://every.to/napkin-math/don-t-dismiss-the-apple-vision-pro) [Vision](https://every.to/napkin-math/don-t-dismiss-the-apple-vision-pro) [Pro](https://every.to/napkin-math/ai-and-the-vision-pro-don-t-need-a-killer-app): AI that sees what you’re doing and responds in a way that’s useful.
Here’s how you can do it too:

1.
**Find the input pipe. **MIDI for instruments. Screen capture for writing or design. Camera plus a vision model for drawing or movement. Microphone for languages.

2.
**Have the agent build the watcher. **Ask Codex (or Claude Code) to write the app based on how you like to be coached. (For example, tell it to only provide one piece of feedback at a time, or to focus on one aspect of your technique and ignore another.)

3.
**Tune the feedback as you go.** First responses will be generic (“good chord progression”). Tell the watcher what’s useful and what’s not—“flag wrong notes only,” “ignore dynamics,” “let me finish a phrase before cutting in.”

[![Dan’s Codex-native piano coach setup, with the coaching app pulled up in the in-app browser. (Image courtesy of Dan Shipper.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4193/optimized_b28be645-54f0-4c0c-81a5-a4ab7d26ad7f.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4193/optimized_b28be645-54f0-4c0c-81a5-a4ab7d26ad7f.png)
*Dan’s Codex-native piano coach setup, with the coaching app pulled up in the in-app browser. (Image courtesy of Dan Shipper.)*

**Try it this week:** Pick a skill you want to get better at. Open the medium where you practice. Spend an evening with your coding agent building the smallest watcher you can—input in, feedback out. Next thing you know, you’ll have a tutor you can summon on demand.

---

***[Katie Parrott](https://every.to/@katie.parrott12)*** *is a staff writer at Every. You can read more of her work in* *[her newsletter](https://katieparrott.substack.com/).*
*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://writewithspiral.com/)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer/)****. Dictate effortlessly with ****[Monologue](https://monologue.to/)****. Collaborate with agents on documents with ****[Proof](https://www.proofeditor.ai/)****. *
*Help us scale the only subscription you need to stay at the edge of AI. Explore [open roles at Every](https://www.notion.so/Jobs-Every-25cca4f355ac80c5ad6ee7a6e93d6b4e?pvs=21).*
[Subscribe](https://every.to/subscribe?source=post_button)
