---
title: "The Steering Wheel for AI"
subtitle: "Plus: The slippery slope of vibe coding tools, and exploring machine creativity"
author: "Alex Duffy"
date: 2025-03-23
column: context-window
url: https://every.to/context-window/the-steering-wheel-for-ai
paywalled: false
scraped_at: 2026-06-11T16:07:47.077Z
---

# The Steering Wheel for AI

*Plus: The slippery slope of vibe coding tools, and exploring machine creativity*

*Hello, and happy Sunday!  As you rest and reflect on the week past and the week to come, we're thinking about AI benchmarks. We may think of benchmarks as a simple yardstick, but for today's models they are so much more—as our own *[Alex Duffy](https://every.to/@AlxAi)* writes, they're a critical means of giving some direction to the wild AI ride we find ourselves on. Meanwhile, *[Katie Parrott](https://every.to/@katie.parrott12)* wrote a fun first-hand chronicle of how vibe coding tools led her to want to learn to code on her own. And *[Rhea Purohit](https://every.to/@rhea_5618)* wrote a fascinating account of machine creativity that is guaranteed to stoke wonder, perhaps along with your own creative juices.—Michael Reilly*
*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

###

## Benchmarks lead the way

For most of us, driving a car means harnessing a controlled explosion. You sit behind a masterfully engineered hunk of metal that turns burning gasoline into progress at 70 miles per hour. With hands lightly on a steering wheel and a foot on a pedal, you control incredible power.
Benchmarks steer AI the same way. AI is powerful—explosive, even—but without a clear sense of where you want to go, it’s easy to confuse activity with achievement.
Last week, Hugging Face [shut down](https://x.com/clefourrier/status/1900280339613860057?s=42) its famous Open LLM Leaderboard. For two years, the company evaluated more than 13,000 models, helping sort good from great. But as AI evolved, these benchmarks stopped measuring real-world impact. Models have been rapidly gaining new abilities—like reasoning and agents—that the leaderboard didn’t capture. Some teams were even training models for the express purpose of acing these benchmarks—essentially “training on the test,” which was no longer representative of real-world performance.
This week, Metr re-captured the AI community’s attention with a new and well-chosen benchmark. The company's blog post showed off a clear demonstration of AI’s impact in striking terms.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.02.19%20PM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.02.19%20PM.png)

*The length of tasks (measured by how long they take human professionals) that generalist frontier model agents can complete autonomously with 50 percent reliability has been doubling approximately every seven months for the last six years. The shaded region represents 95 percent CI calculated by hierarchical bootstrap over task families, tasks, and task attempts. Source: *[Metr](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/).* *

####

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/807/optimized_coraad.png)](https://cora.computer/?utm_source=standalonead)

**Make email your superpower**

Not all emails are created equal—so why does our inbox treat them all the same? [Cora](https://cora.computer/?utm_source=standalonead) is the most human way to email, turning your inbox into a story so you can focus on what matters and getting stuff done instead of on managing your inbox. Cora drafts responses to emails you need to respond to and briefs the rest.

[Try Cora today](https://cora.computer/?utm_source=standalonead)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#9eedeef1f0edf1ecedf6f7eeeddefbe8fbece7b0eaf1).

Their insight was straightforward: Measure AI progress by the length of tasks that systems can complete autonomously. If AI can do it, how many minutes would it take a human? Right now, an automated system can successfully complete a task that might take a person an hour. Metr showed that AI has been able to double the length of the task it could accomplish every seven months for the past six years. If that trend continues, within five years AI might autonomously handle projects that take humans a month to complete, like major software development or deep-dive research.
Metr relied on two benchmarks, [HCAST](https://metr.org/hcast.pdf) and [RE-Bench](https://arxiv.org/pdf/2411.15114). They look at whether AI systems can tackle substantial, realistic challenges like independent cybersecurity research, writing complex software, or automating parts of AI R&D—because that's the world the company knows. Crucially, their benchmarks directly link AI performance to tangible real-world impact.
Anthropic also released two new benchmarks this week, though [one](https://www.anthropic.com/news/strategic-warning-for-ai-risk-progress-and-insights-from-our-frontier-red-team) has more chilling implications. In the cybersecurity domain, the company said 2024 was at a "zero to one" moment: In close collaboration with academic partners, Anthropic managed to develop LLMs that can autonomously execute cyberattacks. They tested these AI agents, empowered with the Incalmo toolkit, in competitive “Capture the Flag” (CTF) exercises, where teams race to exploit vulnerabilities, defend networks, and secure digital flags.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.05.29%20PM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.05.29%20PM.png)

*One of *[Anthropic’s researchers](https://www.anthropic.com/news/strategic-warning-for-ai-risk-progress-and-insights-from-our-frontier-red-team)* worked with academic partners to develop Incalmo, a set of tools that enable present-day LLMs to be successful cyber attackers in realistic network settings. Figure courtesy of *[Singer et al. (2025)](https://arxiv.org/abs/2501.16466).
At the same time, Anthropic released τ-Bench, showing how and why models get so much better when told to explicitly “think.” τ-Bench evaluates Claude’s ability to navigate realistic conversations, consistently follow detailed guidelines, and use tools.
Examples like these matter—not just as yardsticks of progress, but because they provide clear targets for models to improve). Defining what success looks like is deeply subjective and innately human, but once we do, AI can quickly learn from those examples.Fine-tuning on successful responses through reinforcement learning lets us keep solving harder and more important problems (as DeepSeek [recently](https://every.to/context-window/what-actually-matters-and-what-doesn-t-for-deepseek) exemplified).
That’s why it’s so important to find or define benchmarks that are important to you—whether that's performing complex coding tasks, R&D, or launching a cyberattack.

## Release notes

Here are a few of the relevant and interesting releases I tracked this week:

-
[Mistral Small](https://mistral.ai/news/mistral-small-3-1): Fast, open, and small—ideal for quick experiments and local deployment. Also shows impressive multimodal capabilities, handling a long 128,ooo-token context window of both text and images.

-
[OpenAI o1 Pro](https://platform.openai.com/docs/models/o1-pro) (via API): Strongest reasoning yet, enhanced agent capabilities, excellent coding performance—noticeably better (and pricier).

-
[OpenAI audio models](https://openai.com/index/introducing-our-next-generation-audio-models/): Cleaner voices, fewer errors, and an upgrade for transcription including multilingual.

-
[Gemini updates](https://blog.google/products/gemini/gemini-collaboration-features/): Added audio overview capabilities, a new Canvas to execute and display code visually, and significant improvements to its Deep Research capabilities.

- Claude updates: Finally integrated [web search](https://www.anthropic.com/news/web-search) directly into its interface and introduced improvements in [Claude Code](https://x.com/_catwu/status/1903130881205977320).

- AI and cybersecurity ([Andrej Karpathy’s thoughts](https://karpathy.bearblog.dev/digital-hygiene/) and [Google’s largest acquisition](https://blog.google/inside-google/company-announcements/google-agreement-acquire-wiz/)): Real-world tests show investment is required for clear paths to safer AI—an emerging trend.

- Benchmarks shaping AI ([Carlini](https://nicholas.carlini.com/writing/2025/thoughts-on-future-ai.html) and [Anteriz](https://antirez.com/news/147)): Thoughtful perspectives that add context to on why choosing better benchmarks means better AI outcomes.—[Alex Duffy](https://every.to/@AlxAi)

---

### Knowledge base

["I Tried AI Coding Tools. Now I Want to Learn to Code."](https://every.to/working-overtime/i-tried-ai-coding-tools-now-i-want-to-learn-to-code) *by Katie Parrott/Working Overtime*: “Learn to code” is often the most annoying—or insulting—career advice you can give someone. Katie, once an English and German Literature major, felt the same way—until she tried “vibe coding” with AI tools like Lovable. But instead of making coding obsolete, these AI tools made her want to learn actual programming. Read this if you're curious about how AI is widening the messy middle ground between being a “user” and a “builder.”
["He Built His Own Encyclopedia. He Says Learning Everything Isn’t Everything"](https://every.to/superorganizers/he-built-his-own-encyclopedia-he-says-learning-everything-isn-t-everything) *by Scott Nover/Superorganizers:* The secret to success isn’t just learning more stuff. Years ago, **Ceasar Bautista** took this idea to the extreme by building his own personal encyclopedia with over 3,000 articles. But a decade into his knowledge-hoarding journey, he's had an epiphany: collecting information for the sake of doing so is often a waste of time. Read this to learn more about his new philosophy and how he learned to lean smarter.
🎧 ["We Interviewed New Jersey Governor Phil Murphy About AI"](https://every.to/podcast/we-interviewed-new-jersey-governor-phil-murphy-about-ai)*by Rhea Purohit/AI & I*: When you think “cutting-edge tech hub,” New Jersey probably isn't the first place that comes to mind. But Governor **Phil Murphy** is on a mission to change that. Murphy joined AI & I to share his vision for turning the Garden State into an innovation powerhouse. Read this (or watch the interview) to learn how Murphy is creating a tech ecosystem that blends government, academia, and industry—and why he thinks New Jersey can regain its place in the tech ecosystem. 🎧 Listen on [Spotify](https://open.spotify.com/episode/29cvyHuYHrzw7TwicCm73H) or [Apple Podcasts](https://podcasts.apple.com/ca/podcast/we-interviewed-new-jersey-governor-phil-murphy-about/id1719789201?i=1000699973286), or watch on [X](https://x.com/danshipper/status/1902395792784289793) or [YouTube](https://youtu.be/MwfN8yzCyfA).
["Can the Startup Mindset Save America?"](https://every.to/napkin-math/can-the-startup-mindset-fix-america) *by Evan Armstrong/Napkin Math*: In their new book *Abundance*, **Ezra Klein** and **Derek Thompson** argue that Democrats need to embrace innovative thinking across housing, transportation, healthcare, and energy. Their thesis? The left has been obsessed with subsidizing demand when they should be encouraging supply and jumpstarting competition. Read this if you want to understand how government can actually help technology flourish.
["OpenAI Says Its LLM Can Write Creatively"](https://every.to/learning-curve/openai-says-their-llm-can-write-creatively) *by Rhea Purohit/Learning Curve*: **Sam Altman** is at it again, this time claiming OpenAI has built an LLM that can write creatively. But can a machine that's never tasted a lemon or had its heart broken really create literature? This piece dives into the fascinating theories of creativity—from "combinational" (mixing existing ideas) to "transformational" (completely reimagining a space, like **James Joyce**'s *Ulysses*). Read this if you want to understand what makes writing truly creative, and whether that special sauce is uniquely human or just another illusion we tell ourselves about our own specialness.

---

## From Every Studio

#### Sparkle V2 is (almost) here

We’ve been testing the latest version of [Sparkle](https://makeitsparkle.co/), our digital workspace tidying app, and… it’s kind of a game-changer. Here’s what’s coming up:

-
**Increased stability**: Sparkle now runs smoothly while organizing your files, even during large file moves.

-
**No more file hide-and-seek: **You can see exactly where your files are moving.

-
**Your folders, your schedule: **Customize how frequently Sparkle scans your folders for new files and organizes them.

We’re close to going live with V2—but not done yet. Got a feature you’re craving? Drop it [here](https://sparkle.featurebase.app/).

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.19.47%20PM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.19.47%20PM.png)

*Sparkle V2. Source: Yash Poojary.*

#### Learn how to turn conversations into content with Spiral

**Danny Aziz**, general manager of [Spiral](spiral.computer), is guest lecturing a [free workshop](https://maven.com/p/b61914/convert-your-conversations-into-content-with-spiral?utm_campaign=MzYyNTE3&utm_medium=ll_share_link&utm_source=instructor) on using our content generation app Spiral to transform your daily interactions—from meetings to Slack conversations—into content.
Here's what you'll learn:

-
**Everyday convos are a content goldmine**: Transform ideas from meetings, messages, and casual talks into content to build your business or personal brand.

-
**One idea, endless formats**: Repurpose a single insight across multiple platforms with minimal effort.

-
**Work smarter, not harder:** Use Spiral's tools to publish consistently without the burnout.

See you [there](https://maven.com/p/b61914/convert-your-conversations-into-content-with-spiral?utm_campaign=MzYyNTE3&utm_medium=ll_share_link&utm_source=instructor)!

#### Get AI to use Spiral

Automate your content creation by letting AI drive [Spiral](https://spiral.computer/). [Jason Liu](https://x.com/jxnlco/status/1902462838855365092) created a Model Context Protocol (MCP) server, which developers can use to give LLMs the context they need to call Spiral directly. Now an LLM like Claude can send content to Spiral and receive the transformed output—all without your touching the app at all. Happy [building](https://github.com/jxnl/spiral-mcp)!

#### Yay for users helping users!

We've spotted something awesome on the [Cora Featurebase](https://feedback.cora.computer/) (our hub for questions and feedback from community members): You're jumping in to help each other out!
Shoutout and thank you to **Fardeen Khan**, one of our wonderful Cora users, for contributing. While our team is still here to help, it's pretty cool seeing you share solutions to each other's questions.
Have knowledge, questions, or feature requests? Dive into the [discussion](https://feedback.cora.computer/) with us and other users.—[Vivian Meng](https://every.to/@vivian_3942)

##

### Alignment

**The work is important and mysterious.** The hit Apple TV show *Severance* resonates so deeply because it literalizes what millions already experience: the splitting of self required by modern work culture. Its fictional brain procedure makes hyper-visible the dissociation we've normalized as "professionalism"—that daily transformation where we suppress authentic reactions, manage emotions, and perform workplace personas entirely disconnected from our true selves. When we exhale that heavy, primal sigh of relief at the end of every Friday afternoon, that's the moment we acknowledge the cost of our daily severance. But what makes the show genuinely radical and, in my opinion, ultimately hopeful, is how it refuses to let us look away from our condition. By rendering our workplace dissociation in such stark, literal terms, *Severance* performs a kind of collective intervention. It names the pathology that we've accepted as normal. In therapy, recognition precedes healing, we cannot address what we refuse to see. *Severance* makes us see.—[Ashwin Sharma](https://x.com/Ashwinreads)

### Hallucination

Loading pie:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.20.40%20PM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3496/optimized_Screenshot%202025-03-21%20at%207.20.40%20PM.png)

*Source:*[X/Lucas Crespo.](https://x.com/lucas__crespo/status/1795159375918538764/photo/1)

---

*That’s all for this week! Be sure to follow Every on X at*[@every](https://twitter.com/every)* and on*[LinkedIn](https://www.linkedin.com/company/everyinc/)*. *
*We *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*. Deliver yourself from email with *[Cora](https://cora.computer)*.*
*We also do AI training, adoption, and innovation for companies. *[Work with us](https://every.to/consulting?utm_source=emailfooter)* to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our *[referral program](https://every.getrewardful.com/signup)*.*

[Upgrade to paid](https://every.to/subscribe)
