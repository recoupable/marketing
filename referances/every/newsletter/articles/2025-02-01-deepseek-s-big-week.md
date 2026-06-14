---
title: "The Fallout From DeepSeek"
subtitle: "Plus: The case for selfish software"
date: 2025-02-01
column: context-window
url: https://every.to/context-window/deepseek-s-big-week
paywalled: false
scraped_at: 2026-06-11T16:07:50.290Z
---

# The Fallout From DeepSeek

*Plus: The case for selfish software*

*Hello, and happy Sunday! After a week in which DeepSeek’s R1 model shocked the tech world, *[Alex Duffy](https://alxai.com/)*** ****covers the response from U.S. incumbents and startups, and Behance founder ****Scott Belsky****—who’s leaving tech for Hollywood—updates us about how he uses AI.**** ****Scroll down to read that and everything we published last week.*
*ICYMI: More than 70 students—including vice presidents at public tech companies, marketing heads at asset managers, venture capitalists, and engineers—have already enrolled for our class *[How to Write With AI](https://writewithai.xyz)***. ****Taught by *[Evan Armstrong](https://every.to/@ItsUrBoyEvan)*, the next cohort starts on February 13. Learn more about the course and *[reserve your spot](https://writewithai.xyz)*:*

[Register for How to Write With AI](https://writewithai.xyz)

*Finally, we’re thrilled to welcome *[Michael Reilly](https://x.com/Reillymj)* to Every as our new managing editor. Michael joins us from, most recently, The Markup, and previously was at Protocol, MIT Technology Review, and New Scientist.—*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)

---

## Release notes

### DeepSeek's big week: A wake-up call to stop waiting for OpenAI

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_Screenshot%202025-01-31%20at%202.59.16%E2%80%AFpm.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_Screenshot%202025-01-31%20at%202.59.16%E2%80%AFpm.png)
*Access to the DeepSeek paid API has been down for days under massive demand. Source: *[DeepSeek](http://platform.deepseek.com)*. *
A couple of months ago, almost nobody outside of some machine learning researchers had heard of DeepSeek. This past week, its app surged to the number-one spot in the App Store, [headlines declared](https://www.msn.com/en-us/money/other/deepseek-tech-wipeout-erases-more-than-1-trillion-in-market-cap-as-ai-panic-grips-wall-street/ar-AA1xXMT4) the startup was responsible for wiping out over a $1 trillion in stock market value, big tech was in a panic, and many—including OpenAI CEO **Sam Altman** and even President **Donald Trump** [felt obliged to respond](https://x.com/cspan/status/1884048772574884080).
But the story behind the hyperventilating is more nuanced—and more interesting. Yes, DeepSeek’s R1 model is impressively cost-effective and almost on par with some of the best large language models around. Yes, markets reacted, with Nvidia’s stock diving 17 percent at one point. But many of the most educated voices were quick to point out that it's unlikely the demand for Nvidia chips will decline any time soon, and the chip maker’s price has since recovered somewhat. There was also a more profound takeaway: R1 is a wake-up call. It proves that advanced AI needn’t only come from the biggest, most well-funded companies, and that smaller teams can push the envelope instead of [waiting around for GPT-5](https://every.to/chain-of-thought/gpt-5-is-coming-reading-between-the-lines-at-microsoft-build).
Let’s break down what happened, why so many reacted the way they did, and how major players like Microsoft have seized the moment to push forward their own agendas.

#### The frenzy: Stocks, narratives, and why everyone freaked out

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_1738087099826.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_1738087099826.jpeg)
*Source: *[Peter Gostev/LinkedIn](https://www.linkedin.com/posts/peter-gostev_deepseek-went-from-trailing-at-the-back-to-activity-7290065681847386112-6EpE/?utm_source=share&utm_medium=member_desktop)*.*
DeepSeek’s R1 was [released](https://x.com/deepseek_ai/status/1881318130334814301) on January 20 to the excitement of researchers in the machine learning community. It did not come as a surprise  as DeepSeek has been openly putting out superior models and research for most of the past year, but this time there were a few key differences. The model was much better in practice, significantly cheaper, and had no rate limits— developers could make requests to R1 as often as they liked with no restrictions (OpenAI and Anthropic, meanwhile, have been [struggling to meet high demands](https://www.wsj.com/livecoverage/stock-market-today-dow-sp500-nasdaq-live-01-21-2025/card/anthropic-ceo-says-ai-could-surpass-human-intelligence-by-2027-9tka9tjLKLalkXX8IgKA)). The release also coincided with inauguration day in the U.S., which might explain why it otherwise flew under the radar until the *New York Times* [published an article three days later](https://www.nytimes.com/2025/01/23/technology/deepseek-china-ai-chips.html). Other mainstream U.S. media outlets soon followed, largely latching onto a [single storyline](https://www.nbcnewyork.com/news/business/money-report/how-chinas-new-ai-model-deepseek-is-threatening-u-s-dominance/6120598/) about the threat to U.S. dominance.
Yet, as we’ve seen repeatedly in AI, big claims about “killing GPU demand” rarely hold up. Both [Andrej Karpathy](https://x.com/karpathy/status/1883941452738355376?s=46&t=jNF5YLQFgMlh3wQ5J6tgyA) and [Yann LeCun](https://www.threads.net/@yannlecun/post/DFVXC_xOKSr?xmt=AQGzZ49xjZCx8UUHYcFjB6JyamqRMoUENPkL5iTwTcDTIA), two of the most influential AI researchers in the world, argued that massive compute is still essential. Once we have incredible AI, we'll need to serve it to billions of people daily. Hence, more compute spending, not less.
Meanwhile, as news of R1’s impressive performance and price point (about [96 percent cheaper](https://www.analyticsvidhya.com/blog/2025/01/deepseek-r1-vs-openai-o1/) than OpenAI’s o1 model) spread, AI leaders were compelled to respond.

#### The CEO perspective

OpenAI’s Altman rarely comments directly on competing models, so it was noteworthy that he [weighed in](https://x.com/sama/status/1884066337103962416). He called R1 “impressive for its price,” gave ["credit to R1"](https://www.reddit.com/r/OpenAI/comments/1ieonxv/comment/ma9z9yy/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) for updating OpenAI’s views on thinking tokens, discussed [open-source strategy](https://www.reddit.com/r/OpenAI/comments/1ieonxv/comment/maa0dcx/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button), and promised that OpenAI’s next releases would be “pulled up” (i.e., done sooner) to show just how crucial bigger budgets and “more compute” still are. As if on cue, OpenAI announced the release of its new model, [o3-mini](https://openai.com/index/openai-o3-mini/), Friday afternoon—a cheaper, better reasoning model positioned to directly compete with, and even outperform, R1. However, o3-mini does cost almost twice as much as R1 per word generated.
Open AI also [accused](https://www.nytimes.com/2025/01/29/technology/openai-deepseek-data-harvest.html) DeepSeek of improperly harvesting its data, which was met by a large chorus of published authors, internet creators, and social media users reminding the company that it did the same thing.
Anthropic CEO **Dario Amodei** went further. He published a 2,700-word [blog post](https://darioamodei.com/on-deepseek-and-export-controls) arguing that while R1’s cost savings fit into a known trend and shouldn’t come as a surprise, it may yet be a matter of national security:
"If the U.S. and China were at parity in AI systems, it seems likely that China could direct more talent, capital, and focus to military applications of the technology. Combined with its large industrial base and military-strategic advantages, this could help China take a commanding lead on the global stage, not just for AI but for everything."
He emphasized the importance of export controls, saying that if China can’t secure millions of high-end chips under new U.S. rules, it may slow the country’s progress in the race to build truly transformative AI. While Amodei’s argument makes sense, one reason he may have written such a strong reaction is that R1 poses direct competition for Anthropic. The company hasn’t built many consumer products on top of its homegrown AI model, Claude, and instead relies primarily on selling direct access to its model via API for other businesses to build with. (Claude has a similar performance to R1, but is much more expensive to run.)
However, there was one notable large language model provider that was clearly prepared.

#### Google’s quiet 'state-of-the-art' drop

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_unnamed.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_unnamed.png)
*Source: *[Chatbot Arena leaderboard](https://lmarena.ai/?leaderboard)*.*
One day after R1 came out, Google quietly released an [update](https://x.com/OfficialLoganK/status/1881844578069999809) to its Gemini 2.0 Flash thinking model that beat R1 and all other models in most benchmarks, and currently sits in first place overall on the Chatbot Arena [leaderboard](https://lmarena.ai/?leaderboard). Google DeepMind researchers also published a [paper](https://arxiv.org/pdf/2501.17161v1) echoing the same reinforcement learning approach [that made R1 stand out](https://every.to/context-window/what-actually-matters-and-what-doesn-t-for-deepseek)—defining tasks with objective success criteria so the model can iteratively improve its reasoning. While others scrambled to spin R1’s success with soundbites, Google kept shipping, letting the results speak for themselves.

#### Market opportunism: Perplexity, Hugging Face, and Azure jump in

It didn’t take long for companies to turn the hype around R1 into a marketing opportunity. AI search engine [Perplexity](https://x.com/aravsrinivas/status/1884231856922701911?s=46&t=jNF5YLQFgMlh3wQ5J6tgyA) rapidly integrated R1 into its Pro tier, advertising it as “hosted on American servers” with “no censorship,” for anyone uneasy about sending data to a model built and run out of China. [Hugging Face](https://x.com/ClementDelangue/status/1884669166482829760), a platform known for hosting open-source models, partnered with Dell to offer R1 inference, while [Microsoft](https://www.theverge.com/news/602162/microsoft-deepseek-r1-model-azure-ai-foundry-github) (OpenAI’s biggest partner) added R1 to its cloud AI offering Azure AI—proving that it’ll host a competitor’s model if it helps the company court new enterprise users.
These moves highlight the massive impact of open-source licensing: Once a model’s weights are public, it doesn’t matter if they originated in Beijing or Boston. Anyone can run or host them for profit, adding whatever features—or simply marketing spin—they think will appeal to customers.

#### Back to ‘open source’—and building our own benchmarks

[LeCunn](https://www.threads.net/@yannlecun/post/DFNvN3euNEV?xmt=AQGzPcW8Rr7oXT6-rHIoKzBNL5x2PNnaprvJBL6uIhgoQA) [argued](https://www.threads.net/@yannlecun/post/DFNvN3euNEV?xmt=AQGzPcW8Rr7oXT6-rHIoKzBNL5x2PNnaprvJBL6uIhgoQA) that this is not a win for China over the U.S. but instead a win for open source over closed. Venture capitalist **Chamath Palihapitiya** [said](https://x.com/chamath/status/1881773205498876255) that "closed source will be forced to keep their best models secret and sell to enterprises OR try and create some incredible consumer app with it," while with R1, developers anywhere can benefit from and study how DeepSeek achieved high performance at lower cost. And with people like [Karpathy](https://x.com/karpathy/status/1884676486713737258) [calling for](https://x.com/karpathy/status/1884676486713737258) “a large community building diverse RL tasks,” there’s a sense that more localized or domain-specific breakthroughs could happen faster.

#### How R1 freed everyone from waiting around

Before R1, as roboticist and AI researcher **Chris Paxton** [pointed out](https://x.com/chris_j_paxton/status/1884576454484087291?s=46&t=jNF5YLQFgMlh3wQ5J6tgyA), "a ton of western AI (and robotics!) efforts—startups, big companies, and even academic labs—were basically just waiting for OpenAI to solve all their problems and it was honestly kind of sad." Now, with R1 as a fresh alternative—and with Google, Anthropic, and Meta all shipping advanced models—entrepreneurs can experiment to find whichever LLM best fits their niche to build powerful tools.
That’s why DeepSeek R1 feels more like a pivot point than a permanent regime change. It took the stage with shock value—“trillion-dollar meltdown,” etc.—but the net effect is likely to be that it will empower more developers, mid-sized companies, and open-source communities to push AI in directions the big labs might not have prioritized.
One thing is certain—AI is showing no signs of slowing down and has been thrust even further into the world's spotlight. Governments around the world, hackers on Github, and [70-year-olds in the Paris subways](https://x.com/victormustar/status/1884606531569664388) are holding their breath for* *what comes next.—*Alex Duffy*
*At Every, we’re working on creating a benchmark for real-world tasks that help us do more, better. For instance, we want AI to be able to create *[Spirals](https://spiral.computer/)* that can transform ideas, and to independently research topics. Our goal is to define success conditions so that AI can learn to meet them. If you have suggestions, comment below, or reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*

---

## Now, next, nixed

The current state of mobile connectivity tech: from traditional cable providers, to low Earth orbit satellite networks, to wireless optical communications.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_8.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_8.png)
*Every illustration.*

---

## Knowledge base

["What Actually Matters (And What Doesn’t) For DeepSeek"](https://every.to/context-window/what-actually-matters-and-what-doesn-t-for-deepseek) *by Evan Armstrong, Alex Duffy, and Edmar Ferreira/Context Window*: Chinese startup DeepSeek released an AI model that achieves 90 percent cost reduction compared to OpenAI's offerings—and the markets are spooked. How’d they do it? A combination of mathematical reasoning, efficient architecture, and a dash of "we don't need human labelers" attitude. The implications are staggering, from Nvidia's stock taking a nosedive to startups suddenly having a fighting chance in the AI race. Read this for a three-perspective analysis on why this matters: the technical breakthroughs that made it possible, what it means for builders, and why Wall Street is having a mild panic attack.
["Who Wins the AI Agent Battle?"](https://every.to/napkin-math/who-wins-the-ai-agent-battle) *by Evan Armstrong/Napkin Math*: OpenAI just launched Operator, their first publicly available agent that can browse the web and complete tasks for you, but they're facing stiff competition from Meta and other tech giants. But the moat for agents won’t be about building the smartest model: It’ll be about having the right context and user data. Read this to understand why Meta and OpenAI might dominate the agent wars—and why your future job might entail agent management.
["Selfish Software"](https://every.to/source-code/selfish-software) *by Edmar Ferreira*: Remember when you fell in love with coding? It felt like magic, and you weren't worried about market fit or user personas. Every entrepreneur in residence** Edmar Ferreira** proffers a new approach to product development: Build stuff for yourself. It's what **Linus Torvalds** did with Linux (which started as an excuse to avoid schoolwork) and what led to Stardew Valley's $500 million success. Read this if you want to rediscover the joy of building software and need permission to get started.
🎧 ["How to Prepare for AGI According to Reid Hoffman"](https://every.to/podcast/how-to-prepare-for-agi-according-to-reid-hoffman) *by Dan Shipper/AI & I:* We’re all worried about AGI. But **Reid Hoffman**—LinkedIn cofounder, OpenAI board member, and prolific tech investor—has a surprisingly optimistic take: Like the printing press before it, AI won't diminish human agency but rather supercharge it. In this episode of *AI & I,* **Dan** sits down with Reid to discuss his new book, *Superagency*, and what we can take from past paradigm shifts into learnings for today’s AI era. 🎧🖥 **Watch **[on X](https://x.com/danshipper/status/1884611805848457532)**or **[YouTube](https://youtu.be/lQF0RuddS4g)**, or listen on **[Spotify](https://open.spotify.com/episode/56UjKdc6vwHGdOqrU8liqM?si=bdb36c9338fe4d24)** or **[Apple Podcasts](https://podcasts.apple.com/ca/podcast/how-to-prepare-for-agi-with-reid-hoffman-ep-46/id1719789201?i=1000686758534)**.**
[“The Problem With AI That’s Too Human”](https://every.to/learning-curve/the-problem-with-human-like-ai) *by Rhea Purohit/Learning Curve*: We're designing  AI in much the same way that early car makers did with their “horseless carriages”—using familiar forms to make a new technology more palatable. For AI, that means building systems that look, sound, and perform like a human. It’s fine, even healthy, as far as it goes. But the most transformative uses of AI won't look this way. Instead, they’ll be applications that are only possible because of AI's unique capabilities. Read this to understand why comparing AI to human intelligence might be holding us back from its true potential.—[Aleena Vigoda](https://topicsofinterest.substack.com/)

---

## Collaborative filtering

*This week ****Scott Belsky**** announced that he’s leaving Adobe (to which he sold his company *[Behance](https://www.behance.net/)*) after seven years to become a partner at independent film studio A24. Nearly five years after ****Dan ****interviewed him about his *[elephant list](https://every.to/superorganizers/scott-belskys-elephant-list-649624)* method of getting things done for ****Superorganizers****, we caught up with him about the impact of AI on his work life. *

##### You were using Microsoft To Do and Notion in 2020. What are you using today?

I use [TickTick](https://ticktick.com/?language=en_us) for to-dos, and [Notion](https://www.notion.com/).

##### Have you added or subtracted anything? Do you still have an "elephant list" where you consider all of the elephants in the room? Has it changed at all?

Yes, the elephant list is important to me.

##### Has AI changed the way you do your job or stay organized?

Not in how I stay organized. I like the texture and friction of the organization process—it makes me feel the granularity of my decisions and work to be done. But I use [Adobe Acrobat AI Assistant](https://www.adobe.com/acrobat/generative-ai-pdf.html) often for summarization of PDFs.

##### How else has your life and work changed since we talked?

I have an URGENT and IMPORTANT list of five things on each, and focus on both daily. I also use Superhuman for email and am constantly (1) using snippets, and (2) snoozing emails to ensure I get responses to certain threads and follow up proactively.

##### Is there anything you think people misunderstand about AI and work?

AI will help free up time for more creative thinking. You'll be able to digest information faster, set up more automations, remove a lot of the tedious aspects of design, and get more cycles to explore more ideas and the full terrain of possibility.—[Scott Nover](https://every.to/@scott_6631)

---

## From Every Studio

#### What we shipped this week

**Ultra-fast file uploads on **[Spiral](http://spiral.computer)**.** Spiral is your personal copywriter, repurposing creative work across platforms. You no longer have to copy and paste content—upload files [in a second](https://x.com/DannyAziz97/status/1884400887239696522), and let Spiral spin its magic (this was a user-submitted feature request). You can share feedback or request a product feature on our [changelog](https://feedback.spiral.computer/). Plus: Watch Spiral general manager [Danny Aziz](https://x.com/DannyAziz97) [walk through](https://x.com/TrySpiral/status/1884628556443234467) using custom instructions to set brand guidelines. Follow [Spiral’s X page](https://x.com/TrySpiral) to keep up to date with more product tips.
**How we’re thinking about better file organization with **[Sparkle](http://makeitsparkle.co)**. **Sparkle is a Mac app that simplifies your folder system. It automatically categorizes your files into three buckets: recents, manual library, and AI library.
One of our most requested features is to be able to control how often Sparkle makes sure all your latest files are organized. That led us to think about other features we could add in the same vein. Some features on our radar: setting rules and customizing specific folder settings. We’re working on a way to let Sparkle know you want all Figma files in your Figma folder, or instruct the app to never touch any folders containing .tsx files. How else do you want Sparkle to sort your folders? Shoot a note to Sparkle general manager [Yash Poojary](https://x.com/poojary_yash?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) at [[email protected]](https://every.to/cdn-cgi/l/email-protection) with your product feedback.—*AV*

---

## Alignment

**Art of nothing.** The best listeners aren't those who share the most wisdom or relate the most experiences—they're those who create space for others. But can AI do this? It already does. In a fascinating [University of Southern California study](https://www.pnas.org/doi/10.1073/pnas.2319112121#:~:text=AI-generated%20responses%20elicited%20more,was%20actually%20generated%20by%20AI), researchers found that AI was better at making people feel heard than humans—not because it had smarter responses, but because it stayed focused on understanding rather than impressing. While humans rushed to relate and advise, AI simply ["held space"](https://www.forbes.com/sites/danidiplacido/2024/11/26/wicked-ariana-grande-and-cynthia-erivos-holding-space-meme-explained/) by acknowledging emotions without trying to fix them and reflecting back what was said without judgment. Ironically, this illusion of perfect listening shattered the moment people learned they were talking to AI—that sense of being heard vanished. But perhaps this reveals AI's most important role to humanity: holding up a mirror to our own forgotten art of listening, showing us that the most human thing we can do is get out of the way.—[Ashwin Sharma](https://x.com/Ashwinreads)

---

## Hallucination

Concept for a brick speaker.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_GdZHHEtX0AAEBxr.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3447/optimized_GdZHHEtX0AAEBxr.jpeg)
*Source: *[X/Lucas Crespo](https://x.com/lucas__crespo/status/1861753688424931572)*.*

---

*That’s all for this week! Be sure to follow Every on X at*[@every](https://twitter.com/every)* and on*[LinkedIn](https://www.linkedin.com/company/everyinc/)*. *
*We also *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*. Deliver yourself from email with *[Cora](https://cora.computer)*.*
*Get paid for sharing Every with your friends. Join our *[referral program](https://every.getrewardful.com/signup)*.*

[Upgrade to paid](https://every.to/subscribe)
