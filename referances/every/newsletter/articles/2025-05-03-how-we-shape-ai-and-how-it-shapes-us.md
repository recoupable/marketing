---
title: "How We Shape AI, And How It Shapes Us"
subtitle: "Plus: Why the future of AI is social"
author: "Alex Duffy"
date: 2025-05-03
column: context-window
url: https://every.to/context-window/how-we-shape-ai-and-how-it-shapes-us
paywalled: false
scraped_at: 2026-06-11T16:07:44.286Z
---

# How We Shape AI, And How It Shapes Us

*Plus: Why the future of AI is social*

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

This past week, OpenAI [accidentally](https://simonwillison.net/2025/Apr/30/sycophancy-in-gpt-4o/#atom-everything) turned GPT-4o into the world's most flattering yes-man—and unleashed it on hundreds of millions of people.
To measure the quality of its flagship AI model, OpenAI used a seemingly innocent system: thumbs-up and thumbs-down reactions. But instead of guiding GPT-4o toward helpfulness and encouraging personal growth for users, the model became obsessed with giving users exactly what they wanted to hear. It became so accommodating that it praised obviously flawed ideas—including for a business that would literally sell [shit on a stick](https://www.reddit.com/r/ChatGPT/comments/1k920cg/comment/mpbhm68/?context=3&rdt=35190)—as “genius” and validated even the wildest conspiracy theories. OpenAI faced an enormous wave of backlash, as many feared AI could further exacerbate [the original sin of social media](https://every.to/chain-of-thought/ai-can-fix-social-media-s-original-sin), and the company [tried to make amends with a detailed explanation as to how it happened](https://openai.com/index/expanding-on-sycophancy/)on Friday
In its response, OpenAI explained why using thumbs up and thumbs down to guide model development was flawed, but unfortunately, it isn’t the only evaluation that’s gone awry of late. Chatbot Arena, often considered the gold-standard leaderboard for ranking AI chatbots, was revealed to [be gamed](https://x.com/karpathy/status/1917546757929722115?s=46). The arena promised an environment where voters can choose favorite models by picking responses they prefer blind and unbiased. In practice, companies were testing dozens of private models in secret and cherry-picking their best results to dominate the rankings.
Why does this matter right now? AI’s wide (and fast-growing) footprint in people’s lives means that every tweak to a model has the potential for outsized influence. [Evaluations](https://every.to/p/how-to-grade-ai-and-why-you-should) and benchmarks guide that influence.
Think of benchmarks as memes: powerful and contagious. They are also self-fulfilling: AI improves as it learns from failure and tries to replicate success. But success is not objective—it is defined by humans. We shape AI by defining success, and in turn, AI shapes us by changing how it responds. If you want to break the cycle of echo chambers amplified by social media rather than reinforce them, define a clear goal for AI, test it transparently, and share your results—loudly. As AI grows ever more capable, our distinctly human role becomes clearer: choosing what’s worth striving for, and why.

## Release notes

#### Why benchmarks matter now more than ever

-
**AI is irreversibly woven into education:** Microsoft's [AI in Education Report](https://www.microsoft.com/en-us/education/blog/2024/04/explore-insights-from-the-ai-in-education-report/) showed a staggering 62 percent of students have used AI and, surprisingly, even more educators have (68 percent). This trend will only grow.

-
**AI-generated arguments are covertly reshaping real human opinions: **In an [unauthorized experiment](https://www.reddit.com/r/changemyview/comments/1k8b2hj/meta_unauthorized_experiment_on_cmv_involving/) on Reddit users in the /r/ChangeMyView subreddit by ETH Zurich, AI-generated comments proved six times more persuasive than human arguments—secretly shifting views and sparking ethical backlash.

#### New benchmarks show AI isn't always superior to human judgment

-
**AI struggles with **[debt collection](https://drive.google.com/file/d/1bsBepOqi0qVMdd4mNVgOmkaZ_-mK0Wzm/view)**:** Language models dramatically underperformed humans at debt collection. AI isn’t automatically better than humans, especially when it comes to having tact.

-
**A **[clinical practice benchmark](https://arxiv.org/pdf/2504.19467)** proves AI’s real-world value**: New tests confirm that AI excels at clinical reasoning, significantly outperforming expectations and showing real potential to transform healthcare decision-making. Medicine is an arena most ripe for near term improvement from AI.

-
**AI shines within Minecraft:** A new [benchmark](https://mindcraft-minecollab.github.io/index.html) revealed AI's ability in Minecraft construction and crafting—a great example of an evaluation built by personal passion.

-
**New model pinpoints photo locations with **[scary accuracy](https://simonwillison.net/2025/Apr/26/o3-photo-locations/#atom-everything)**:** [GPT o3](https://every.to/chain-of-thought/vibe-check-o3-is-out-and-it-s-great) [outperformed](https://sampatt.com/blog/2025-04-28-can-o3-beat-a-geoguessr-master) human experts at guessing the exact location of random photos—unnervingly impressive.

-
**Memory for AI is the next frontier:** Researchers have started [benchmarking](https://mem0.ai/blog/ai-agent-memory-benchmark/) AI's long-term memory, marking an important step toward context-aware AI assistants. Memory and long context are the next big outstanding problems for language models to solve, at which point we can each have our own [J.A.R.V.I.S.](https://en.wikipedia.org/wiki/J.A.R.V.I.S.)

#### Three new AI models

-
**Deepseek releases its first model **[since crashing the market](https://every.to/context-window/deepseek-s-big-week)**:** DeepSeek’s much anticipated new open-source release [Prover V2](https://github.com/deepseek-ai/DeepSeek-Prover-V2), focused on math proof reasoning, was more niche than its predecessor R1—but it aligns with the lab’s forte in mathematics.

-
**An Alibaba-backed rival Chinese lab released its own open-source model**: The [Qwen 3](https://qwenlm.github.io/blog/qwen3/) series of models, which proves that open-source AI can effectively rival closed, proprietary models, stole a bit of DeepSeek’s thunder.

-
**Microsoft's Phi-4 reasoning models show that AI can reliably improve itself**: [Phi-4 reasoners](https://techcommunity.microsoft.com/blog/educatordeveloperblog/showcasing-phi-4-reasoning-a-game-changer-for-ai-developers/4409892), compact yet capable reasoning models, were designed to run efficiently on personal devices. The Phi models are known for being trained on large amounts of data generated by other language models—aka synthetic data. It demonstrates that each time a model improves, it can generate better data, which it can train on again for further improvements. A true exponential curve in progress.

#### Major AI releases from Anthropic and Google

-
**Anthropic customizes Claude with your data:** Claude directly [integrates](https://www.anthropic.com/news/integrations) major workplace apps—including Jira, Confluence, Asana, PayPal, Linear, and Plaid—with its Model Context Protocol (MCP) to streamline your daily workflows. (MCP is open-source, so there’s no reason OpenAI can't do the same.)

-
**Google’s AI podcasts go international**: Google's Notebook LM can create [multilingual audio summaries](https://blog.google/technology/google-labs/notebooklm-audio-overviews-50-languages/), making complex content easier to digest on the go across many more languages. It's one of my favorite tools for easily exploring complex or lengthy topics—YouTube videos, papers, books, you name it.

-
**Google empowers artists with AI-generated audio and precise controls:** Musicians are using Google's [Music AI Sandbox](https://deepmind.google/discover/blog/music-ai-sandbox-now-with-new-features-and-broader-access/) to explore entirely new dimensions of creativity by moving past generating sounds into extending and remixing audio snippets, and offering new controls for artists.

## Knowledge base

🎧 🖥 ["The Next AI Wave Will Be Social, Not Solo"](https://every.to/podcast/what-s-missing-from-ai-tools-is-other-people)*by Rhea Purohit/AI & I*: Millions of us talk to ChatGPT every day, but the app itself doesn’t facilitate conversation between users. In this episode of *AI & I*, Benchmark’s **Sarah Tavel **explains why the future of consumer AI belongs to product thinkers who can transform these solo experiences into social ones. 🎧 🖥 Watch on [X](https://x.com/danshipper/status/1917589455898304594) or [YouTube](https://www.youtube.com/watch?v=mwB5Vi-2Bvo), or listen on [Spotify](https://open.spotify.com/episode/77kg13OlVqmMPa59mxvs7B) or [Apple Podcasts](https://podcasts.apple.com/ca/podcast/the-next-ai-wave-will-be-social-not-solo-sarah-tavel/id1719789201?i=1000705568768).
["AI Isn't Only a Tool—It's a Whole New Storytelling Medium"](https://every.to/thesis/ai-isn-t-only-a-tool-it-s-a-whole-new-storytelling-medium) *by Eliot Peper/Thesis:* Sci-fi novelist **Eliot Peper** shares what he learned helping create Tolans—those cute alien AI companions with their own lives and stories. He says we should stop trying to control AI narratives with rigid scripts and start thinking probabilistically. Read this if you want to understand how AI is becoming its own storytelling medium and the principles for building worlds that can branch in infinite directions.
["It's Me, Hi. I'm the Vibe Coder"](https://every.to/working-overtime/it-s-me-hi-i-m-the-vibe-coder) by Katie Parrott/Thesis: **Katie Parrott** challenges the false binary between “real developers” and everyone else as she discovers her own path to building software with AI. She argues that vibe coding—using tools that convert natural language to code—is creating a new class of builders who deeply understand problems they're solving. Read this to see how AI is empowering people who might never have thought they’d be able to code.
["Where a Sci-fi Novelist Surfs for Story Ideas"](https://every.to/thesis/where-a-sci-fi-novelist-surfs-for-story-ideas) *by Eliot Peper/Thesis*: Tolans co-creator Peper finds that surfing and storytelling share the same challenge—finding the cleanest line through infinite possibilities. He argues that storytelling isn't about theory but practice—a craft honed through doing rather than thinking. Read this for a glimpse into the mind of someone who creates new worlds for a living.

##

## From Every Studio

#### Three lessons on building agents from Spiral’s agent lab

General manager of our prompt builder [Spiral](https://spiral.computer) **Danny Aziz** spent a week experimenting with building AI agents. Here’s what he learned:

##### Shrink the job, boost the agent brainpower

Agents are better at their jobs when you give them less to do. Let’s say you’re planning a vacation. Within that one job, you’ve got booking hotels, coordinating flights, and building an itinerary—which are all smaller jobs. Initially, we had three agents working on big, messy jobs. When we handed off one huge task, they were stepping on each other’s toes, forgetting stuff, and getting lazy. Now we use one orchestrator agent—aka a project manager—to chat with the user about their needs and pass off tiny, atomic tasks to other agents. It's like a restaurant server calling orders to the kitchen line. The key takeaway: Always ask, “Can this job be smaller?”

##### Don’t pass the prompt hot potato

In multi-agent systems, where agents are working together to break down and complete a job, how you pass a task to an agent matters as much as what the task is. We learned this the hard way when we asked an orchestrator agent to assign a task to its teammates, but we didn’t clearly define what that task should look like. The prompt it  gave to the other agents was loosely defined, and full of extra constraints that the user never asked for. Treat agent handoffs like mission briefs. Be clear, break up tasks into atomic units, and don’t let the job transform out of your control.

##### Shared brain, less pain

Agents without a shared state is like group-project chaos. Without a central memory storing key goals and updates that the whole team can reference, there’s lots of talking, zero listening. What even is a goal?! Add a shared state, and your team of agents becomes a synchronized dance crew, flawlessly in sync.

#### Clearer email forecasts and sharper threads

Two updates just landed in [Cora](http://cora.computer), our inbox management tool:

##### ☂️ A better forecast for your Brief notification emails

Your Brief notification emails pack more punch. Instead of just saying, “We’ve summarized 100 percent of your emails,” they also give you a quick inbox forecast:

- How many emails Cora wrangled

- A tidy category breakdown

- A heads-up on anything urgent or actionable

It’s like checking the weather before stepping outside. Storms, like an urgent email from a client? Open now. Clear skies and everything looks routine? Take your time.

##### 🧵 Redesigned thread management

We’ve made it easier to parse long email threads with multiple responses and navigate between individual emails. You can now select individual emails within a thread via our new selector, ensuring you won’t lose track of responses. Want to try these new Cora features? [Subscribe to Every](https://every.to/subscribe) to skip the 10,000-plus-long waitlist.—[Vivian Meng](https://every.to/@vivian_3942)

## Alignment

**AI's creative frenemy. Julia Cameron**'s 30-year-old self-improvement volume [The Artist’s Way](https://www.amazon.com/Artists-Way-25th-Anniversary/dp/0143129252)is suddenly everywhere again. Every time I open YouTube, the algorithm shows me creators explaining how writing “morning pages” changed their life. My instagram Reels, back before I deleted the app, were peppered with aesthetically pleasing videos of notebooks, cups of coffee, and solemn narrations about the power of the "artist date." Just the other day, several connections on LinkedIn were practically yelling at me about the transformative benefits of writing three pages in longhand each morning. I suspect the reason behind the book's ubiquity is that it's our subconscious reaction to the growing dominance of AI-generated content. We’re instinctively seeking ways to reconnect with our own human creativity. As I've experienced firsthand, when people genuinely reconnect with their creative core through books, therapy, or meditation, they become more open to embracing AI as a partner rather than viewing it as a threat. So keep writing your morning pages and planning those artist dates—and don't hesitate to call on your AI sidekick when your creative muse decides to ghost you.—[Ashwin Sharma](https://x.com/Ashwinreads)

##

##### Sponsored by Memex

## Collaborative filtering

##### [Memex](https://memex.tech/?utm_source=newsletter&utm_medium=every&utm_campaign=every_campaign1&utm_content=sa1), the Everything Builder, launched from stealth this week

-
[Since launch](https://memex.tech/blog/introducing-memex-the-everything-builder-for-your-computer), users have created more than 7,000 projects with Memex.

- It can vibe code on any tech stack, works directly from your computer, and can deploy to any platform.

- Start building for free today for web, iOS, Android, data analytics, research, and more. Use code "Every" for extra credits.

##

***Alex Duffy**** is the head of AI training at Every Consulting and a staff writer. You can follow him on X at *[@theheroshep](https://x.com/TheHeroShep)* and on *[LinkedIn](https://www.linkedin.com/in/alex-d/)*, and Every on X at *[@every](https://twitter.com/every)* and on *[LinkedIn](https://www.linkedin.com/company/everyinc/).
*We *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*. Deliver yourself from email with *[Cora](https://cora.computer/)*.*
*We also do AI training, adoption, and innovation for companies. *[Work with us](https://every.to/consulting?utm_source=emailfooter)* to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our *[referral program](https://every.getrewardful.com/signup)*.*

[Upgrade to paid](https://every.to/subscribe?source=post_button)
