---
title: "Vibe Check: Claude 3.7 Sonnet and Claude Code"
subtitle: "All about the newest tools from Anthropic"
author: "Vivian Meng"
date: 2025-03-08
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-3-7-sonnet-and-claude-code
paywalled: false
scraped_at: 2026-06-11T16:07:47.933Z
---

# Vibe Check: Claude 3.7 Sonnet and Claude Code

*All about the newest tools from Anthropic*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Last week, Anthropic released Claude 3.7 Sonnet, the first “hybrid reasoning” model on the market, and Claude Code, its first agentic coding tool that lives in your terminal. [Hybrid reasoning](https://www.anthropic.com/news/claude-3-7-sonnet), a term the company has coined, referring to the model’s dual modes of thinking  (more on that in a second).
We’ve been playing around with them at Every since they first came out. Based on our experience with ChatGPT-4.5—on which we were [initially lukewarm](https://every.to/chain-of-thought/gpt-4-5-won-t-blow-your-mind-it-might-befriend-it-instead) before [it grew on us](https://every.to/context-window/gpt-4-5-wants-to-be-your-friend)—we wanted a bit more time to develop our point of view. We’ve now done a vibe check with the [Studio team](https://every.to/p/introducing-every-studio) about their first impressions of each, as well as from the tech landscape.
The all-around consensus: These tools are incredibly powerful, especially for coding. But in order to use them well, you need to know how they’re meant to be used, and what they still struggle with. **[Cora](https://cora.computer)** general manager **[Kieran Klaassen](https://every.to/podcast/an-inside-look-at-building-an-email-client-in-three-months)** summed them both up well: “3.7 is great, but not yet ready to get work done—it's too wild. But for new projects, Claude Code is very impressive.”
Here’s what’s new, what the team thinks, and what everyone else thinks.

## What is 3.7 Sonnet?

3.7 Sonnet is a hybrid AI model that combines two distinct thinking approaches in one system: quick standard responses and in-depth extended thinking.

1.
**Standard mode: **An upgraded version of 3.5 Sonnet that delivers rapid responses to straightforward queries with improved accuracy and performance.

2.
**Extended thinking mode: **A new feature that enables Claude to demonstrate [chain of thought reasoning](https://every.to/also-true-for-humans/7-22), breaking down complex problems step-by-step and showing its deliberative process on a visible “scratchpad” before providing a final answer.

Unlike other models that specialize only in reasoning, or require users to opt in for reasoning over quick responses, 3.7 Sonnet can [automatically detect](https://www.fastcompany.com/91283751/anthropic-new-claude-3-7-sonnet-ai-chain-of-thought) which thinking style is required for the prompt. As a result, you can fluidly move between simple queries and complex reasoning tasks in one conversation, just as you would with a person.

## Real-world applications

3.7 Sonnet’s reasoning capabilities are optimized for real-world tasks designed around how businesses use LLMs, rather than for embodying the persona of, say, a [Math Olympiad winner](https://www.infoq.com/news/2025/02/deepmind-alphageom2/#:~:text=Google%20DeepMind's%20AlphaGeometry2%20AI%20Achieves%20Gold%2DMedal%20Math%20Olympiad%20Performance,-Feb%2025%2C%202025). The result: It’s more practical for the everyday workplace user.
Here are a few of its capabilities:

1.
**It’s a coding whiz. **3.7 Sonnet, the model that serves as the foundation for Claude Code, is specifically trained for real-world coding. According to Every’s **[Alex Duffy](https://every.to/@AlxAi)**, “Sonnet 3.7 is clearly optimized for code over anything else, probably because they saw over one-third of all requests [made were] [related to math and/or code](https://www.anthropic.com/news/the-anthropic-economic-index).

2.
**It plays Pokémon. **3.7 Sonnet has improved “action scaling,” allowing it to focus and accomplish open-ended tasks, applicable to both real-world tasks and milestones in Pokémon Red. It’s able to iteratively call functions, respond to environmental changes, and work until it’s complete.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3482/optimized_Screenshot%202025-03-07%20at%205.21.05%20PM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3482/optimized_Screenshot%202025-03-07%20at%205.21.05%20PM.png)

*Source: Anthropic.*

1.
**A developer’s dream. **GitHub is integrated into the interface, allowing developers to connect their code repositories and easily give Claude all the information it needs about their code, alongside their prompts—saving you the time of copying and pasting your files into an insanely long prompt, explaining to Claude how they work and interact, and *then* asking your question.

## Let’s talk about Claude Code

Anthropic simultaneously announced the release of Claude Code, the company’s first agentic coding tool, which works directly with your codebase in your terminal, instead of in an integrated development environment (IDE), such as VSCode.
It’s Anthropic’s answer to the growing popularity of agentic coding assistants like Cursor and Devin. It enables engineers to delegate tasks to Claude in their terminal. No more copy-pasting your code back and forth between your IDE and browser—just prompt straight in your command line, and get to “Clauding” away.

#### Claude Code and Cursor both use 3.7 Sonnet, but Claude Code is better

A new version of coding agent Cursor was released around the same time, but according to Every’s Klaassen, it’s not as good. “Cursor’s new version succumbs to 3.7 Sonnet’s power and goes off in wild directions, not following instructions nor reading the right files,” he says. “Claude Code is tamed better, but they use the same model under the hood. So it's really about how they use the model and the tool calling structure on top..”

## How does it work?

Let’s say you’ve downloaded a starter template for a side project you’re building from somewhere like [GitHub](https://github.com/michaelshimeles/nextjs-starter-kit) or v0. Claude can:

1.
**Explain your codebase:** Claude can analyze the code structure and give you a clear explanation of how everything works—"Here's how the app stores tasks, this is how the UI components are organized, and this is how data flows between components."

2.
**Implement and update functionality: **Claude can find the right files to update and write new lines of code.

3.
**Design and run tests:** Claude can test your code to make sure the changes it implemented are working correctly.

4.
**Compile your code:** Claude can build, debug, and run your code until it works.

5.
**Push and commit your changes to GitHub: Claude can help you manage version control.**

At each step along the way, Claude asks you to accept or reject the changes it's making, so you’re still in the loop.

## How much does it all cost?

3.7 Sonnet is available to all users, though extended thinking mode is not part of the free tier, and is only available to subscribers of Claude’s paid plans.
For API users, in both extended and standard thinking mode, Claude runs the same price as all of its predecessors: $3 per million input tokens and $15 per million output tokens—including thinking tokens.
Claude Code does not have a separate pricing structure, and runs on the same token costs outlined above. Still, it’s expensive: “It's just tough when you spend 25 percent of your monthly Cursor subscription on a single problem with Claude Code,”* *Duffy says.

## What everyone at Every is thinking

##### Sonnet 3.7 is too eager to help

“It's great for starting from scratch but terrible when you need it to follow specific instructions on existing projects. The model's newfound agency means less prompting but more boundary-setting—you'll spend half your time saying, ‘Wait, that's not what I meant.’"—***[Kieran Klaassen](https://every.to/podcast/an-inside-look-at-building-an-email-client-in-three-months)****, general manager of Cora*

##### Analysis > writing

“3.7 is a good analyzer, 3.5 is a better writer.”—***[Evan Armstrong](https://every.to/@ItsUrBoyEvan)****, writer of [Napkin Math](https://every.to/napkin-math)*

##### Build a game with Sonnet 3.7 in less than 10 minutes

“I used Sonnet 3.7 to build a few games in one-shot prompts from my phone while I couldn't sleep. I was really impressed by the level of completeness and 360-type thinking that the model was able to extrapolate. I gave it a basic prompt about a game, and it came up with the game dynamics, the front end design, the rules, and interactions and in a few minutes I had a working prototype deployed on the web (without leaving bed).”—***[Lucas Crespo](https://every.to/@lucascrespo)****, creative lead*

##### Claude Code is the only agentic coding tool shaping its own model

“Claude Code is better than anything that I have used on the agent front. Anthropic was using it as an internal tool with 3.5 Sonnet and, when using Claude Code, saw some problems with the base model that they actually improved for 3.7 Sonnet.
This is a first, and it’s important because every other coding agent—Cursor, Windsurf, Devin— can only go so far as building on top of the model with better workflows, techniques, and prompts. However, if you’re Anthropic or OpenAI and you own the model, you can change the model itself to fit your application better based on the limitations you discover.
Claude Code is not only good because Anthropic knows the model well and created great prompts and scaffolding, [but] because they changed the model to work with Claude Code.”*—****[Edmar Ferreira](https://every.to/@edmar)****, entrepreneur in residence*

##### Prompting is still crucial

“If there's a hard problem that Cursor can't solve, I've found that Claude Code usually is very good at it. It's surprising since [Cursor] uses the same model [Claude 3.7], but I think it goes to show how important prompting is because every function call, every process is designed by a human, and Anthropic's team is pretty great at that.”—***[Alex Duffy](https://every.to/@AlxAi)****, consulting lead and staff writer*
“Anthropic probably knows 3.7 Sonnet better, so they can prompt it better.”—*Kieran Klaassen*

##### Claude Code requires context to prevent hallucinations

“My issue with Claude Code right now is that I can't feed it documentation easily, whereas in Cursor I can just paste links, and I'm running into a lot more hallucinations with Sonnet 3.7 inside Claude Code than I am in Cursor.”—***[Danny Aziz](https://every.to/@dannyaziz97)****, general manager of Spiral, on his first experience with Claude Code*
“I have an addition. Claude Code is *bloody brilliant*. I decided to use it for a full session last night and realized that as long as I give it the context of documentation and access to MCPs [model context protocols] so it can browse the web so it doesn't hallucinate, it's a powerhouse.”—*Danny Aziz, the next day*

## What everyone else is thinking…

### …About Claude 3.7 Sonnet

##### It needs steering

It’s so powerful that it needs to be reined in, according to developer **[Nick Dobos](https://x.com/NickADobos/status/1895564632921907370)**, and have its hand held "as a leash" so it doesn’t take off wildly, says developer **[Harrison Kinsley](https://x.com/Sentdex/status/1895165102657282495)**.

##### Forget vibe coding—it’s chaos coding now

It can make an entire product from a vague prompt, as shown by Hyperwrite CEO **[Matt Shumer](https://x.com/mattshumer_/status/1895896169080934882).**

##### A ton of use cases

It can be used to build infographics, network graphs, a real-time browser video editor, an interactive 3D city, an animated periodic table, and a simulated ant colony, to name just a few, says Menlo Ventures’s **[Deedy Das](https://x.com/deedydas/status/1895900613571199305).**

##### It has the best sense of humor

3.7 Sonnet tried to replace GPT-4 with itself for the model of choice in one developer’s code, which **[Andrej Karpathy](https://x.com/karpathy/status/1895549465463009309)** judged to be the most humorous LLM output he’s seen so far.

### …About Claude Code

##### It’s not just for coding

It’s great [for writing](https://x.com/krishnanrohit/status/1897155050029638128), too, and you can ask for output in Markdown, as discovered by writer **[Rohit Krishnan](https://x.com/krishnanrohit)**.

##### You can run it on your Obsidian notes

**[Dwarkesh Patel](https://x.com/dwarkesh_sp/status/1894147173782360221)** used it in his Obsidian directory to transform reading notes into interview questions.

##### It’s a competitive advantage

[Mandatory employee training](https://x.com/andrew_n_carr/status/1896705642943168714) and onboarding is being instituted by **[Andrew Carr](https://x.com/andrew_n_carr/),** founder of Cartwheel, and formerly at OpenAI and GoogleAI.

##### It’s expensive

**[John Shahawy](https://x.com/johnbuilds/status/1896943484659011834)**, the founder of Rogue, estimates that it’ll end up costing about the same amount as Devin; **[Matt Popovich](https://x.com/mpopv/status/1894115438323208614)**, a staff engineer at Forge, says it costs the same amount as a developer.

---

*Read Every's first [vibe check](https://every.to/context-window/vibe-check-openai-s-sora), on OpenAI's Sora.*

---

***Vivian Meng**** is a producer and operator who produces the Every podcast *[AI & I](https://every.to/podcast)*. You can follow her on X at [@vivnettes](https://x.com/vivnettes) and on [LinkedIn](https://www.linkedin.com/in/vivian-meng/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Automate repeat writing with ****[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Write something great with ****[Lex](https://lex.page/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
[Subscribe](https://every.to/subscribe?source=post_button)
