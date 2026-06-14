---
title: "How to Win at AI and Influence People"
subtitle: "Plus: Introducing ‘TLDR’"
date: 2024-12-14
column: context-window
url: https://every.to/context-window/how-to-win-at-ai-and-influence-people
paywalled: false
scraped_at: 2026-06-11T16:07:52.580Z
---

# How to Win at AI and Influence People

*Plus: Introducing ‘TLDR’*

*Hello, and happy Sunday! Tech companies are racing toward the end of the year by seemingly launching all of their AI products at once. (Merry Shipmas, I guess.) Between OpenAI, Google, Meta, Anthropic, and others, at least 15 products were released last week along with major updates to Google’s NotebookLM and Apple’s AI-powered operating system. Read on for more about that, along with everything we published and our take on the latest tech and business news.—*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)
*Was this newsletter forwarded to you?*[Sign up](https://every.to/account)* to get it in your inbox.*

## Knowledge base

["How to Build a Truly Useful AI Product"](https://every.to/thesis/how-to-build-a-truly-useful-ai-product) *by Chris Pedregal/Thesis:* Building an AI startup is like playing a video game at twice the speed while your competitors have access to all your cheat codes. Chris Pedregal, CEO of note-taking app Granola, explains why traditional startup wisdom often fails in AI and shares his playbook for creating successful AI products in a world where the tech moves quicker than your developers ship features. Read this to learn why consumer AI startups should embrace high costs per user, and why solving today's problems might be tomorrow's waste of time.
🎧 ["The Secret to Building Sticky AI Products"](https://every.to/podcast/the-secret-to-building-sticky-ai-products)* by Dan Shipper/AI & I*: We've used enough bland chatbots to last a lifetime—what we’re craving are AI products with personality. In this episode of *AI & I*, Granola’s Chris builds on his Thesis essay to dive into how his meeting notes app has cracked the code, bringing in 5,000 weekly active users and 50 percent retention after 10 weeks. His approach? Build with strong opinions, talk directly to users, and bet on AI costs dropping in the future. Read this if you're trying to build AI products that stick around in users' lives beyond the initial "wow" factor. 🎧 🖥 **Watch **[on X](https://x.com/danshipper/status/1867230799206162883)**or **[YouTube](https://youtu.be/9fzlurQY6GA)**, or listen on **[Spotify](https://open.spotify.com/episode/1bAWV2U4L8Ua9PQunJHTQ8?si=56b16141a80b4a8f)** or **[Apple Podcasts](https://podcasts.apple.com/ca/podcast/the-secret-to-building-sticky-ai-products-ep-42-with/id1719789201?i=1000680148710)**.**
[“Vibe Check: OpenAI’s Sora”](https://every.to/context-window/vibe-check-openai-s-sora)** ***by Aleena Vigoda/Context Window: *OpenAI *finally* dropped Sora Turbo, and it's not just another AI video generator—it's a complete creative platform that aspires to be the next Adobe Premiere Pro. By incorporating features like Remix, Re-cut, and Storyboard, plus a built-in social feed for creators, OpenAI is betting that controlling the application layer is as important as the underlying tech. We polled Every Studio and rounded up early reactions to the launch. Read this for a pulse check on the AI video generation space.
**🔏 **[“The No-fluff Guide to AI Agents”](https://every.to/also-true-for-humans/the-no-fluff-guide-to-ai-agents) *by Michael Taylor/Also True for Humans*: We've entered the era where AI isn't just thinking—it's doing. Drawing from his experience as a prompt engineer, Michael Taylor reveals how AI agents use a sophisticated loop of Thought, Action, and Observation to accomplish real-world tasks. Read this to understand why your next colleague might be artificial (and surprisingly competent).
["Introducing Our First Synthetic Show: ‘TLDR’"](https://every.to/p/introducing-our-first-synthetic-show-tldr) *by Dan Shipper:* Our latest Studio experiment is *TLDR*, which turns team conversations into snackable 3–5 minute episodes you can listen to on your morning commute. Think of it as your company's own personal documentary series, complete with key decisions, action items, and the juiciest moments—no endless Slack scrolling required. Read this if you’re curious about turning daily meetings into your team’s personal podcast series. 🖌[Apply to be a design partner](https://modern-ton-234.notion.site/150ca4f355ac80f3b57fedd296b7c856)** if you want to bring *TLDR* to your team.***—*[Aleena Vigoda](https://topicsofinterest.substack.com/)*  *

## Now, next, nixed

The current state of under-the-radar video generation tools.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3377/optimized_15.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3377/optimized_15.png)

*Source: Every illustration.*

---

## Release notes

##### Google ships the future—with training wheels

If you blinked, you missed that Google is gaining on OpenAI—fast. This week brought (a confusingly large number) of releases [centered around Gemini 2.0](https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/#building-responsibly), the company’s next-generation AI model.
Flash 1.5 was faster and cheaper than [Gemini 1.5 Pro](https://every.to/chain-of-thought/i-spent-a-week-with-gemini-pro-1-5-it-s-fantastic) but not as good on any benchmarks. Now Gemini 2.0 Flash is better than 1.5 Pro by almost every metric:

- Cheaper than 1.5 Pro

- Twice the speed of 1.5 Pro

- Significantly better performance across benchmarks than 1.5 Pro

In short: Cheaper, faster, better, and with agents sprinkled in.
Project Mariner is a prototype that can navigate web interfaces directly, achieving an 83.5 percent success rate on complex web tasks. Project Astra functions as a genuine AI assistant, remembering conversation context for 10 minutes and seamlessly integrating with Google's ecosystem. Both were upgraded with 2.0 Flash, and it’s made a difference.
You can even use Gemini 2.0 Flash to [level up your gaming.](https://www.youtube.com/watch?v=IKuGNHJBGsc) It’s also natively multimodal—it can take in text, audio, images, and video. In fact, Google's multimodal capabilities are second to none. It was already the best at understanding images and video. Gemini 2.0 doesn't just understand images and video; it can reason about them in real time—no more waiting for a response. The streaming API supports concurrent audio/video sessions (15-20 minutes of audio, 2-3 minutes video per session). For many developers, these are net new capabilities, and I expect to see some new tools built that we’ve never seen before.
Google also released [Deep Research](https://blog.google/products/gemini/google-gemini-deep-research/), which is a truly useful agentic AI tool. Give it a research topic, and it'll spider through hundreds of websites, refining its search based on what it learns, before delivering a comprehensive report with citations. It's not perfect (the writing still feels AI-generated), but it's transforming three-hour research tasks into three-minute ones.
Pricing hasn't been announced, but if Google's previous models are any indication, expect it to be aggressively competitive. You can try Gemini 2.0 in [AI Studio](https://aistudio.google.com/) and Deep Research in [Gemini Advanced](http://gemini.google/advanced).
The sleeping giant isn’t sleeping any longer. (For more on Google, see below.)—[Alex Duffy](https://alxai.com/)

---

## Fine-tuning

[Google unveiled Willow](https://fortune.com/2024/12/11/google-willow-chip-quantum-computing/)**, a quantum computing chip **that can complete calculations in minutes that would take supercomputers billions of years. While not yet ready for commercial use, this breakthrough brings quantum computing closer to practical applications such as weather forecasting, drug discovery, and supply chain optimization—all while using less energy than traditional supercomputers.
[Tencent launched Hunyuan,](https://www.scmp.com/tech/big-tech/article/3289260/tencent-launches-its-answer-openais-sora-text-video-tool)** an open-source AI video generation model,** just days before OpenAI released Sora. While Sora excels at photorealism but struggles with capturing fluid movements, Hunyuan—the largest public video model yet—better captures realistic motion showing people surfing waves and balloons floating away.
[General Motors shut down Cruise](https://www.washingtonpost.com/technology/2024/12/10/gm-cruise-scraps-robotaxi/)**, its robotaxi service that rivaled Waymo,** as the market gets increasingly competitive. [Elon Musk’s Cybercab](https://www.theguardian.com/technology/2024/oct/11/elon-musk-unveils-tesla-cybercab-self-driving-robotaxi) is one up-and-coming contender in the space. Instead, the company plans to reallot its $10 billion in autonomous vehicles [toward personal cars](https://coverager.com/gm-to-shut-down-cruise/) rather than fleet services.
[Friend, the controversial AI wearable](https://www.theverge.com/2024/12/9/24315126/friend-pendant-artificial-intelligence-companionship-avi-schiffmann)** combatting loneliness, **raised an extra $5.4 million. CEO Avi Schiffman gained notoriety this summer when Friend launched and spent [$1.8 million on a domain](https://www.404media.co/ai-friend-company-spent-1-8-million-and-most-its-funds-on-domain-name/)—Friend.com—out of its original $1.9 million investment. Since then, the social app has gained attention for its questionable AI chatbot characters.
[Meta announced Motivo](https://www.reuters.com/technology/artificial-intelligence/meta-releases-ai-model-enhance-metaverse-experience-2024-12-13/), an AI model designed for creating life-like movements in digital avatars and non-playable characters across digital worlds. The company also [introduced](https://ai.meta.com/blog/meta-fair-updates-agents-robustness-safety-architecture/) its Large Concept Model (LCM), trained to predict the next abstract “concept,” instead of predicting the next semantic token.
[WaveForms raised $40 million](https://www.axios.com/2024/12/09/audio-ai-startup-waveform)** to build AI that understands emotion in speech.** Led by former OpenAI researcher Alexis Conneau, the startup aims to solve the “Speech [Turing Test](https://en.wikipedia.org/wiki/Turing_test)” by building AI that captures the emotional nuances in how we talk.
[Midjourney is experimenting with Patchwork](https://x.com/midjourney/status/1866964271948763553),** **a collaborative storytelling app and “worldbuilding tool,” where each “world” is represented by its [own infinite canvas](https://venturebeat.com/ai/midjourney-is-launching-a-multiplayer-collaborative-worldbuilding-tool/) shared with up to 100 creators. Patchwork is still in the research phase—its AI generated characters and custom narratives and settings features cater to game designers, brand strategists, and other creative professionals.
[Character.AI built a new chatbot](https://www.theverge.com/2024/12/12/24319050/character-ai-chatbots-teen-model-training-parental-controls)** for teens, **following two recent lawsuits alleging that the platform contributed to the self-harm of minors. The teen-specific model, launching early next year, is more conservative, filtering out romantic content and including features like suicide prevention resources and parental controls.
[Harvard and Google are planning to produce](https://www.wired.com/story/harvard-ai-training-dataset-openai-microsoft/)** an open-source AI training dataset **of 1 million public-domain books—five times the size of the [dataset used to train](https://www.wired.com/story/battle-over-books3/) Meta’s open-source Llama model. The goal for this dataset—which is backed by Harvard Law School’s Institutional Data Initiative (IDI), a research project bringing academic researchers closer to AI—is to [“level the playing field”](https://techcrunch.com/2024/12/12/harvard-and-google-to-release-1-million-public-domain-books-as-ai-training-dataset/) for anyone looking to train LLMs.
**Both **[Devin](https://www.cognition.ai/blog/devin-generally-available)** and **[Replit’s Agent](https://blog.replit.com/new-ai-assistant-announcement)** launched publicly**. The former is an AI software engineering assistant produced by Cognition Labs while the latter is an AI coding tool that enables end-to-end software creation through chat alone. The products pit two competing visions for the future of coding: Devin's hands-off automation versus Replit's interactive approach.
**On the first seven days of OpenAI’s Shipmas**, in which the company is shipping one new feature a day for 12 days, OpenAI gifted to us: [o1 and ChatGPT Pro](https://m.youtube.com/watch?v=iBfQTnA2n2s&t=15s&pp=ygUGb3BlbmFp), [model fine-tuning](https://www.youtube.com/watch?app=desktop&v=yCIYS9fx56U&ab_channel=OpenAI) for developers, AI video generation tool [Sora](https://every.to/context-window/vibe-check-openai-s-sora), open access to ChatGPT’s [Canvas interface](https://openai.com/index/introducing-canvas/), a chat integration with Apple, and [ChatGPT Projects](https://www.youtube.com/watch?v=FcB97h3vrzk&ab_channel=OpenAI). Also, [“Santa Mode” is open](https://arstechnica.com/information-technology/2024/12/openai-introduces-santa-mode-to-chatgpt-for-ho-ho-ho-voice-chats/) to all.—*AV*

## Alignment

**Stop trying so hard. **Last week I discovered life's greatest irony in a coffee shop at 2 p.m., over-caffeinated and buzzing with excitement about a book titled [Why Greatness Cannot Be Planned](https://www.amazon.co.uk/Why-Greatness-Cannot-Planned-Objective/dp/3319155237), a treatise on living a life without objectives. What happened next honestly felt like a cosmic joke. My unfiltered brain dump about this book on X—this celebration of purposelessness—reached [5.4 million people](https://x.com/Ashwinreads/status/1865419965190328488) and shot the book to No. 2 on Amazon's AI book charts. The perfect irony was achieving viral “success” while reading about why I shouldn't chase success. This “accident” taught me that the moment you start engineering for virality is precisely when you kill your chances of going viral. It's like trying to be cool—the harder you try, the less cool you become.—[Ashwin Sharma](https://x.com/Ashwinreads)

##

## Collaborative filtering

**Spend your weekend shipping.** Dan sat down with Late Checkout CEO Greg Eisenberg on the latter’s *Startup Ideas Podcast*. Together, they brainstormed new AI products and opportunities for hopeful builders. Imagine voice notes you can talk to and AI-translated classic literature for students, or build your startup around personalized datasets.

[Watch the episode](https://www.youtube.com/watch?reload=9&v=7gUG10e_rPw&source=post_button)

## Hallucination

Apple Ring.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3377/optimized_unnamed.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3377/optimized_unnamed.png)

*Source:*[X/Lucas Crespo](https://x.com/lucas__crespo/status/1864062321234006233)

###

*That’s all for this week! Be sure to follow Every on X at*[@every](https://twitter.com/every)* and on*[LinkedIn](https://www.linkedin.com/company/everyinc/)*. *
*We also *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*.*

[Upgrade to paid](https://every.to/subscribe?source=post_button)
