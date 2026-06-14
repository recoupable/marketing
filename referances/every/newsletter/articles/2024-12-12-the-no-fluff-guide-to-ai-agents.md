---
title: "The No-fluff Guide to AI Agents"
subtitle: "The next generation of AI is coming—here’s how they work"
author: "Mike Taylor"
date: 2024-12-12
column: also-true-for-humans
url: https://every.to/also-true-for-humans/the-no-fluff-guide-to-ai-agents
paywalled: true
scraped_at: 2026-06-11T16:07:52.667Z
---

# The No-fluff Guide to AI Agents

*The next generation of AI is coming—here’s how they work*

*In ****Michael Taylor****’s work as a prompt engineer, he’s found that many of the issues he encounters in managing AI tools—such as their inconsistency, tendency to make things up, and lack of creativity—are ones he used to struggle with when he ran a marketing agency. It’s all about giving these tools the right context to do the job, just like with humans. In the latest piece in his series *[Also True for Humans](https://every.to/also-true-for-humans)*, about managing AIs like you'd manage people, Michael explores the inner workings of AI agents—the next generation of assistive AI technology—and what they need to succeed. He goes in-depth on the reason and act (ReAct) pattern, one of the first attempts to give large language models the tools they need to be truly helpful.—*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

When I was in high school, I never understood why we couldn’t use calculators on tests.My teacher used to say, “You might not always have a calculator in your pocket.” I was annoyed, but I can’t blame her for not predicting the smartphone.

I’m not naturally gifted at doing multiplication in my head, but armed with a calculator app on my phone, I can be faster and more accurate than someone who doesn’t have a calculator. Having access to tools can make such a difference to our own abilities that using a calculator on a test can be seen as “cheating.” But, of course, when you finish school and get a job, your employer expects you to use a calculator to do your work as efficiently as possible. There’s no time for doing math in your head, and errors can be costly in the real world.

Teachers are concerned about students using ChatGPT to do their homework, but when those students graduate, their employers might expect them to be able to use AI to do their work. Using generative artificial intelligence has already been shown to [improve workers’ productivity 40 percent](https://verbit.ai/enterprise/how-smart-application-of-generative-ai-can-improve-productivity/), according to one estimate, and if the rate of progress holds, we can expect AI models to get [10 times better for the same cost](https://www.reddit.com/r/LocalLLaMA/comments/1gpr2p4/llms_cost_is_decreasing_by_10x_each_year_for/) year after year.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3376/optimized_1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3376/optimized_1.png)

*Source: *[Reddit](https://www.reddit.com/r/LocalLLaMA/comments/1gpr2p4/llms_cost_is_decreasing_by_10x_each_year_for/)*. *

The rate of progress in AI has had an immediate impact on [knowledge workers](https://every.to/working-overtime/the-once-and-future-history-of-knowledge-work) such as marketers, graphic designers, and software engineers, who work primarily with text or images that can be generated with AI technology. Less impacted are jobs that require interaction with the physical world, or [knowledge workers](https://every.to/working-overtime/the-once-and-future-history-of-knowledge-work) whose jobs aren’t as accessible programmatically. For example, I used to pay people to manually pull advertising data and format it into weekly reports for our clients because (perhaps counter-intuitively) it was significantly cheaper than paying the software vendors that automate this task.

[AI agents](https://every.to/napkin-math/what-are-ai-agents-and-who-profits-from-them) are already being built that are capable of taking sophisticated action on your behalf without having to pay engineers to maintain expensive automations. Instead of paying a human to do manual data entry, imagine if I could give web-browsing access to an AI agent that could log into each advertising platform for me and put the relevant data into a spreadsheet, just like a human would. Most agents are at the prototype phase, as current LLMs aren't yet good enough at reasoning to operate at length without getting stuck. However, I've learned that with AI, anything that nearly works now might be fully functional—and feel like magic—in only six months, and could be ubiquitous in a year. The term “AI agents” is already surpassing “prompt engineering” in Google Search Trends, signaling a shift in the primary mechanism for getting better results from AI.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3376/optimized_2.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3376/optimized_2.png)

*Source: Google Search Trends.*

The prototypes of today won’t be prototypes for much longer. A new era of AI is coming. Let’s dive into how AI models use tools and the implications of your workplace being cohabited by AI agents.

## How LLMs can take action by themselves

---

**Become a **[paid subscriber to Every](https://every.to/subscribe)** to unlock this piece and learn about:**

- How language models become capable of real-world actions

- The dawn of AI agents that can navigate human interfaces

- Trading manual labor for creative freedom through AI automation

[Upgrade to paid](https://every.to/subscribe)

[PAYWALL]
