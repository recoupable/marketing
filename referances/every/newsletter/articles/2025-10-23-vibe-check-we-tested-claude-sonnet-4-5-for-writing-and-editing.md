---
title: "We Tested Claude Sonnet 4.5 for Writing and Editing"
subtitle: "Five tests across blind comparisons, editorial standards, and deadlines—here's what changed our setup"
author: "Katie Parrott"
date: 2025-10-23
column: vibe-check
url: https://every.to/vibe-check/vibe-check-we-tested-claude-sonnet-4-5-for-writing-and-editing
paywalled: true
scraped_at: 2026-06-11T16:07:31.635Z
---

# We Tested Claude Sonnet 4.5 for Writing and Editing

*Five tests across blind comparisons, editorial standards, and deadlines—here's what changed our setup*

*Early bird pricing for our ****[Claude Code for Beginners](https://claude101.every.to/)**** class taught by ****[Dan Shipper](https://every.to/@danshipper)**** on November 19 ends tonight. Save $500 and reserve your spot today.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

[Register for Claude Code for Beginners](https://claude101.every.to/?source=post_button)

---

Since [GPT-5 came out](https://every.to/vibe-check/gpt-5) three months ago, my writing workflow has been straddling LLM providers: ChatGPT for drafting, Claude for editing. The setup works, but the back-and-forth is tedious: Copy a draft from one window, paste it into another, wait for feedback, then hop back to revise. I’ve been starting to feel a bit like a glorified traffic conductor.

Then Anthropic dropped Sonnet 4.5, and within 48 hours my workflow collapsed from two chat interfaces into one.

Our Vibe Check on [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) focused on coding. The model shined in [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five), wowing with its speed and handling long agentic tasks and multi-file reasoning without getting lost. And Anthropic followed Sonnet 4.5 closely with [Haiku 4.5](https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked)—a smaller, cheaper model that got our engineers excited for its building implications.

But as much as code and writing have in common—they’re both arranging letters and symbols in rows to achieve specific tasks, after all—code has *some *objective standards, namely, “Does it run?” Writing is different. There's no "Does it compile?"—the clear signal in programming that tells you if the code works or not—for good prose. Writing is subjective, [taste-driven](https://every.to/working-overtime/i-taught-claude-every-s-standards-it-taught-me-mine), and full of edge cases where two editors will disagree about what "better" even means.

We spend *a lot* of time working with AI in writing contexts at Every, whether it’s **[Spiral](https://spiral.computer/)** general manager **Danny Aziz** training models to produce stellar copy inside the app, or me [yapping at my computer](https://every.to/working-overtime/i-didn-t-know-typing-held-me-back-until-i-started-thinking-out-loud) to hammer out first drafts of my [essays](https://every.to/working-overtime) about work and technology. A byproduct is that we’ve developed a set of benchmarks by assessing how well the new model works within our systems. They aren't objective measures, but they're what we use when we're deciding which model to reach for

So how do we decide whether a model is worth the switch? We run five tests based on our own workflows and what *we* need the model to do. As a result, they matter more to us than any benchmarks. The tests fall into two categories:

**Output (Can it write?)**: Tests that tell Danny if he can trust Spiral to produce great copy, or I can trust my Working Overtime project to sound “like me” while keeping “AI smell” to a minimum.

**Judgment (Can it recognize good writing?)**: Tests to see if the model has the taste to make existing writing better, again for Spiral as well as our internal editorial needs.

If you've ever wondered how a company built on words and AI tests how AI does with words, here's what happened when we put Sonnet 4.5 to the test.

## The blind taste test: Controlling for recency bias

When AI companies release new models, they publish benchmark scores—standardized tests measuring performance on tasks like coding, math, reasoning, tool use, and so on. The scores get packaged into charts showing how the new model stacks up against competitors.

[![The benchmark chart Anthropic included in its Sonnet 4.5 announcement. (Source: Anthropic.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3799/optimized_dce62c31-fcd5-48bf-9e43-59c8804d7e1e.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3799/optimized_dce62c31-fcd5-48bf-9e43-59c8804d7e1e.png)
*The benchmark chart Anthropic included in its Sonnet 4.5 announcement. (Source: Anthropic.)*

When a new model launches with better benchmarks, it's easy to assume the output must be better, too—especially when you're eager for an upgrade. But "better" in writing is subjective, and recency bias is real. So we run blind taste tests to keep ourselves honest: Do we really think this model is better, or is it just a shiny new object?

For Sonnet 4.5, Danny ran a quick experiment with Spiral in our [Every Discord](https://discord.com/invite/UbaeY5zHRa) server. He gave the same prompt (Spiral’s system prompt for producing ) and the same task (summarize [this article](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) in an X post) and got six outputs, three each generated by GPT-5 and Sonnet 4.5. (Note: This is a core part of how Spiral works—it produces three options of each draft so users can choose the one they like best.) No labels, obviously—just emojis to register your vote and a couple of guiding questions to get at the heart of the issue: Which one is written better?

[![Danny posted outputs from six different models given the same prompt and asked the team to select their favorites. Both of the top two were generated with Sonnet 4.5. (Source: Danny Aziz.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3799/optimized_de899b17-1083-44bf-8793-a7b147316d82.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3799/optimized_de899b17-1083-44bf-8793-a7b147316d82.png)
*Danny posted outputs from six different models given the same prompt and asked the team to select their favorites. Both of the top two were generated with Sonnet 4.5. (Source: Danny Aziz.)*

Sonnet 4.5 came in first *and *second. It struck the right balance of providing context while also identifying and articulating the most interesting points of the article we asked it to summarize. GPT-5 either jumbled the context, misidentified the main lessons, or both.

## General writing quality: Does it ‘sound like AI’?

Beyond blind preference tests, we need to assess the draft quality we'd encounter in daily use: Does the writing sound natural? Does the model respond well when you ask it to adjust tone or style? How much editorial work does a typical draft require?

In other words: How likely is someone to read the output and say, “This sounds like AI”?

I generated a 1,500-word draft about my experiences with Notion’s new AI features with Sonnet 4.5 and read through it looking for some of my personal AI-writing pet peeves:

**Correlative constructions** ("Not X, but Y"/"Not just X. It's also Y"): Only two instances. Previous models would pepper these throughout, using them as crutches whenever they needed to add emphasis or contrast.

**Rhetorical questions as filler**: Mostly absent, although there were a few—"And honestly? It was impressive"—that I had to smooth out. There was also no "Here's the thing:" followed by a pivot that goes nowhere.

**Profound-sounding nonsense**: Still present but less frequent. I caught one phrase that sounded smart on first pass but meant nothing on examination: "the kind of optimism reserved for things you've been dreading." What does that even mean? But fewer slipped through than with earlier models.

[![Sonnet 4.5 does a solid job of developing writing that reflects the information it’s gathered and the language I used to talk about it. (Source: Katie Parrott.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3799/optimized_0135cf4a-9633-435d-80bb-f05632527b72.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3799/optimized_0135cf4a-9633-435d-80bb-f05632527b72.png)
*Sonnet 4.5 does a solid job of developing writing that reflects the information it’s gathered and the language I used to talk about it. (Source: Katie Parrott.)*

When I used Sonnet 4.5 inside [my Working Overtime project](https://every.to/working-overtime/i-fed-my-essays-to-chatgpt-until-it-learned-my-voice)—the one trained on my voice and patterns—the output was a solid A or A-minus, whereas GPT-5 I’d put at an A- or B+. GPT-5 doesn’t appear to like producing large quantities of text at a time and tends to collapse into bullet points when asked to generate more than a few paragraphs at once. By contrast, Sonnet 4.5 can draft for days. It picks up direct language from my dictation and keeps the quirks and corners of my natural style instead of smoothing it into [generic AI voice](https://every.to/working-overtime/how-to-keep-your-writing-weird-in-the-age-of-ai).

Also notable is that Sonnet 4.5 shows better judgment about what “good” means. When I gave it two versions of a draft—one I'd written outside my Working Overtime project, using what I refer to as “straight Claude,” and the other generated within the project with my context—and asked it to keep the best parts of each, its interpretation of “good” mostly matched my own.

[PAYWALL]
