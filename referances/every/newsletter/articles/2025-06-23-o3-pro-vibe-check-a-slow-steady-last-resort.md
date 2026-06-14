---
title: "o3-pro Vibe Check—A Slow, Steady Last Resort"
subtitle: "OpenAI’s latest model trades speed for occasional brilliance—when nothing else works, it might"
author: "Dan Shipper"
date: 2025-06-23
column: vibe-check
url: https://every.to/vibe-check/o3-pro-vibe-check-a-slow-steady-last-resort
paywalled: true
scraped_at: 2026-06-11T16:07:40.841Z
---

# o3-pro Vibe Check—A Slow, Steady Last Resort

*OpenAI’s latest model trades speed for occasional brilliance—when nothing else works, it might*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Sometimes the only way to solve a hard problem is to surrender. It’s 9 p.m., and you've worn down your whiteboard, emptied your coffee pot, and thrown your [Oblique Strategy](https://en.wikipedia.org/wiki/Oblique_Strategies) cards across the room. So you pop a melatonin, crawl into bed, mutter “fuck it” into your pillow, and conk out. If you’re lucky, you jump out of bed at 4:15 a.m. with the answer fully formed in your head.

That’s what using [o3-Pro](https://every.to/c/ai-frontiers)—the more powerful version of [o3](https://every.to/chain-of-thought/vibe-check-o3-is-out-and-it-s-great)—is like: You take a quick pass with every other model first, and when you’re stuck, you head to o3-pro, type your prompt, hit “return,” and surrender. It’s very slow and doesn’t work every time, but sometimes it’s smart enough to one-shot an answer you wouldn’t have gotten with any other model.

It’s been out for about two weeks, so this vibe check violates our day-zero promise—sorry about that! I have a good excuse: I went on a week-long meditation retreat and OpenAI dropped the model while I was, presumably, [deep in a Jhana](https://x.com/danshipper/status/1933990021767352462). Rude.

But, as they say about both o3-pro’s responses and tardy reviews: Better late than never. So let’s get into it. As always, we’ll start with the Reach Test.

## The Reach Test: Do we reach for o3-pro over other models? No.

Every’s **[Alex Duffy](https://every.to/@AlxAi)** summed up o3-pro well when he told me that it’s the last model he tries with a basic prompt before he spends time making a more complex, detailed prompt with [prompt engineering](https://every.to/p/the-ultimate-guide-to-prompt-engineering). ”It does a good chunk of prompt engineering for me, so it raises the floor of the responses I get without putting in effort,” he said.

That’s a common o3-pro pattern after two weeks: No one is using it all of the time, but a lot of us are using it every once in a while.

### For day-to-day tasks: no

It takes 5-20 minutes to get a response, so it’s *way* too slow to be usable for day-to-day tasks, like quick searches or basic document analysis.

### For coding: no

[Claude Code](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code) is by far my most reached-for coding tool, and it (obviously) doesn’t include o3-pro. It’s the same thing for everyone else at Every—the whole company has been Claude Code-pilled for the last few weeks, so o3-pro hasn’t been incorporated into our development workflows.

Part of the problem is that in order to use o3-pro with Claude Code, you need to copy and paste its responses into your editor. **[Cora](https://cora.computer)** general manager **[Kieran Klaassan](https://every.to/source-code/the-three-ways-i-work-with-llms)** told me, “It’s too hard to use. Copy and pasting code out of ChatGPT feels so 2023.”

o3 Pro also doesn’t yet natively support Canvas (ChatGPT’s version of Anthropic’s Artifacts that renders codes and documents) in ChatGPT, which makes it even harder to use for quick coding tasks.

### For writing and editing: no

Its writing and editing aren’t noticeably better than o3, but it takes noticeably longer to get results, so it fails here. I tested it on one of the prompts we use inside of our content automation tool **[Spiral](https://spiral.computer)** to judge whether or not writing is engaging, and it failed.

So far, only [Claude Opus 4](https://every.to/chain-of-thought/vibe-check-claude-4-sonnet) passes this one.

### For research tasks: yes

This is where o3 Pro shines. If you have a* ton* of context that you want a model to sift through, it will give you a well-thought-out answer that’s concise and to the point. (This makes it a better first option than [deep research](https://every.to/chain-of-thought/we-tried-openai-s-new-deep-research-here-s-what-we-found), which tends to write dissertations.) o3-pro seems to be able to use more of its context window and reason more effectively than other models.

For example, when I asked it to [predict my future career trajectory](https://chatgpt.com/share/6858634c-10e8-8012-b513-f992f32413ce), it returned some interesting ideas:

“Dan Shipper has repeatedly fused clear writing with hands‑on product building. If he sustains operational focus, Every could mature into a small‑cap ‘AI Bloomberg for operators,’ with Shipper evolving into a public intellectual‑founder bridging journalism, product design and responsible AI. Failure to execute, however, could see him back in the role of prolific essayist/EIR—still influential, but sans scaled platform.”

o3-pro’s response stood out because in its full response (not shown above), it considered three cases: upside, average, and downside. It felt like it was reasoning through likely options rather than just giving me what I wanted to hear (which is what [Claude Opus 4’s response felt like](https://claude.ai/public/artifacts/2dfc1927-8416-46f0-b3e3-9a02b4d971dd).)

It’s possible I liked this test because it was complimentary (actually, it’s probable), but it predicted a few things that we’re doing but haven’t announced yet.

I also fed it a draft of the book I’ve been writing—about 45,000 words—and asked it to tell me what it thought the book was about. I typically say that it’s about how the history of AI is speed-running the history of philosophy, and the same changes that AI and philosophy went through are coming for the rest of culture. o3-Pro told me it was about my own internal journey:

[PAYWALL]
