---
title: "Vibe Check: Claude Skills Need a ‘Share’ Button"
subtitle: "The feature is powerful for individuals and tricky for teams—but it does lighten the cognitive load"
author: "Katie Parrott"
date: 2025-11-03
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button
paywalled: true
scraped_at: 2026-06-11T16:07:30.488Z
---

# Vibe Check: Claude Skills Need a ‘Share’ Button

*The feature is powerful for individuals and tricky for teams—but it does lighten the cognitive load*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Within hours of the launch of **[Skills](https://www.anthropic.com/news/skills)** over two weeks ago, the newest Claude feature from Anthropic, I’d built six of them—and I was already imagining more. I saw uses for these sets of custom instructions all over my [writing workflow](https://every.to/working-overtime/i-fed-my-essays-to-chatgpt-until-it-learned-my-voice), and I couldn’t wait to build skills for the rest of the Every team, too.

A skill is a folder containing instructions, scripts, and resources that teaches Claude how to perform a specific task, like creating a report in a particular format or conducting competitive research that targets specific information. Skills perform those tasks according to your instructions without you having to re-explain your preferences every time. You package up the knowledge you want it to have—instructions in a Markdown file, reference documents, even Python scripts—upload it, and Claude boots up those instructions automatically when it detects a relevant task.

The first batch of skills I created covered the [editorial checks](https://every.to/working-overtime/i-taught-claude-every-s-standards-it-taught-me-mine) I routinely run. First was an Every style guide enforcer that remembers all of Every’s 400 grammar and mechanics rules. Next came a hook-checker that spots when a story’s real opening is hiding deep within my draft. Then there was a thesis sharpener, an angle-finder, a fact-checker, and an ELI5 (“explain like I’m 5”) tool that flags jargon I need to translate for readers. Together, they handle the hundreds of micro-decisions that drain the attention and energy I’d rather reserve for higher-level thinking.

[![My growing collection of custom skills, all waiting to be invoked. (Source: Katie Parrott.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3811/optimized_937b70f7-3273-4dfa-b8c6-9762d1093901.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3811/optimized_937b70f7-3273-4dfa-b8c6-9762d1093901.png)
*My growing collection of custom skills, all waiting to be invoked. (Source: Katie Parrott.)*

I wasn’t the only one crash-testing Skills shortly after its release. **Nityesh Agarwal**, Every’s engineer on **[Cora](https://cora.computer/)** and an [AI-powered learning](https://every.to/source-code/chatgpt-taught-me-special-relativity-and-changed-how-i-learn) enthusiast, spent a weekend deep in exploration and created an impressive custom skill that improved Claude’s presentation design capabilities.

Skills promise expertise packaged and ready on demand. But there’s a catch: The gap between “I built a skill” and “the skill works reliably” turned out to be wider than expected, especially when thinking about deploying skills across an organization. That said, I’m still using it every day—and so is Nityesh. Here’s what works, what doesn’t (yet), and why it’s worth the learning curve.

## What Skills do

Think of Skills as mini-experts that you can summon when needed—or Claude can invoke for you, if you write the prompt that way. You create a folder containing a SKILL.md file with instructions, optional Python scripts, and reference materials. Zip it, upload it, and Claude can use those instructions to work the way you work.

Need Claude to match your editorial voice? Build a skill. Want it to generate PowerPoints according to your company’s house style? Package those rules as a skill. Have a complex workflow requiring multiple data files and custom codescripts? Skills can bundle all of that together.

The technical innovation is called “progressive disclosure.” Claude doesn’t load all your skills into its conversation space at once. Instead, it sees skill names and descriptions first, like scanning a bookshelf. When you ask Claude to do something—like check a post for alignment with Every’s style guide—it identifies relevant skills and loads only what it needs. So you can package unlimited institutional knowledge without eating up the space Claude uses to track your conversation.

If you’ve used Claude Code’s [subagents](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell), Skills work on a similar principle—specialized capabilities you invoke when needed. The difference is that Skills work across Claude interfaces, including its web interface and API, rather than just in the coding environment.

The key to creating skills is understanding what you need to do versus what Claude can do for you. You provide the specifications—tell Claude what outcome you’d like (“I need a skill that checks drafts for AI writing patterns”), how you want it to behave, what a good output looks like, and any specific rules or preferences. Claude translates that into a skill file with proper formatting and structure. You can write skills yourself manually from scratch, of course. The question is, why would you? (I don’t.)

What’s the difference between Skills and Projects, dedicated workspaces where you can set up custom instructions and add documents? Projects apply their instructions automatically to everything in that workspace. Skills are on-demand capabilities that Claude loads anywhere across your Claude instance—but only when the skill is either invoked by prompting it with “use this skill” or Claude calls it automatically, depending on how the instructions are written. My [Working Overtime Project](https://every.to/working-overtime/i-fed-my-essays-to-chatgpt-until-it-learned-my-voice) contains my writing voice and style. I want that applied to everything. The hook-check skill is something I only need when reviewing a draft’s opening. I prompt, “run a hook check on this draft,” and off we go.

[![I prompted Claude to run a “hook check,” a skill loaded with Every’s best practices for article openings. (Source: Katie Parrott.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3811/optimized_fe46cec1-aa3d-46b4-b327-1c51e42af416.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3811/optimized_fe46cec1-aa3d-46b4-b327-1c51e42af416.png)
*I prompted Claude to run a “hook check,” a skill loaded with Every’s best practices for article openings. (Source: Katie Parrott.)*

Because Skills work across Claude’s web app, Claude Code, and the API, if you build one, you can use it anywhere you use Claude. That’s genuinely useful if you’re bouncing between chatting on the website and coding in Claude Code, but it also locks you into Anthropic’s ecosystem. Your carefully crafted editorial style guide won’t travel to ChatGPT or Gemini.

The feature requires a paid plan: Pro ($20 per month), Max ($100 or $200 per month), Team ($25 per user per month), or Enterprise (custom pricing). Beyond your subscription, there are no additional API costs—Skills don’t rack up extra charges when Claude invokes them, which matters if you’re running them at scale.

## An engineer’s take

It took some experimentation to figure out how to get the most out of Skills, even for my technical testing partner. Nityesh wanted Claude to make a slide deck. The built-in PowerPoint skill created slides that had a functional structure and logical flow, but looked phoned-in: generic layouts, minimal design consideration, and zero visual polish.

[![The deck generated by the built-in PowerPoint skill was too “Deck Building 101” for Nityesh’s taste. (Source: Nityesh Agarwal.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3811/optimized_9f464123-751c-499b-98fa-e3c7c821e0d7.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3811/optimized_9f464123-751c-499b-98fa-e3c7c821e0d7.png)
*The deck generated by the built-in PowerPoint skill was too “Deck Building 101” for Nityesh’s taste. (Source: Nityesh Agarwal.)*

He wondered: Why does this require a skill at all? Why can’t Claude just make a decent presentation?

It turns out that manipulating .pptx files requires either specialized software (like PowerPoint or Google Slides), or the ability to write and run code that edits the file directly. Skills bridges that gap by giving Claude the ability to write Python scripts and execute them, which it can’t do in a normal chat. That’s how it can open, modify, and save presentation files.

[PAYWALL]
