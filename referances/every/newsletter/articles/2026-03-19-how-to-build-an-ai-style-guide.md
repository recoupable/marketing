---
title: "How to Build an AI Style Guide "
subtitle: "A step-by-step guide to teaching a language model to write like you"
author: "Katie Parrott"
date: 2026-03-19
column: guides
url: https://every.to/guides/how-to-build-an-ai-style-guide
paywalled: false
scraped_at: 2026-06-11T16:07:20.899Z
---

# How to Build an AI Style Guide 

*A step-by-step guide to teaching a language model to write like you*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

In 1893, a printer named **Horace Hart** pinned a piece of paper to the wall of the Oxford University Press room where books were printed. It told his compositors—the workers who assembled metal letters by hand into the trays that would be inked and pressed against paper—how to handle the decisions that came up hundreds of times a day. When to capitalize. Where to put a comma. How to abbreviate, hyphenate, and spell.
That piece of paper grew into a 200-page manual, which people called [Hart’s Rules](https://en.wikipedia.org/wiki/Hart%27s_Rules). It’s now one of the oldest continuously maintained style guides in print.
The term “style guide” itself didn’t [appear in print](https://books.google.com/ngrams/graph?content=%22style+guide%22&year_start=1800&year_end=2019&smoothing=0) until the 1930s. For most of publishing history, people said “style manual” or “style sheet.” But whatever you called it, the function was the same: Make the rules explicit so the output stays consistent, no matter who—or what—is producing it.
When we hear the word “style guide,” we tend to think about rulings on the Oxford comma or how to abbreviate “United States.” But Hart was solving a machine problem. Oxford was printing [272 books a year](https://en.wikipedia.org/wiki/Horace_Hart), and dozens of compositors worked the presses. His guide made sure output stayed consistent no matter who was at the press that day.
Every time a new machine changed how writing was produced and distributed, someone wrote a style guide to bridge the gap between what the writer intended and what the technology could do. When the telegraph [arrived in newsrooms](https://www.britannica.com/topic/Associated-Press) and could cut off mid-transmission, reporters learned to front-load the essential information, producing the[inverted pyramid](https://www.poynter.org/reporting-editing/2003/birth-of-the-inverted-pyramid-a-child-of-technology-commerce-and-history/)—the journalistic principle that the most urgent idea in a story should come first, followed by less pressing details. Eventually, we got the [AP Stylebook](https://en.wikipedia.org/wiki/AP_Stylebook). When screens [changed how people read](https://www.nngroup.com/articles/how-users-read-on-the-web/), web style guides made everything shorter and scannable.

####

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/944/optimized_d2a6fe3e-cac6-431f-80c6-3a7036c457b8.png)](https://retool.com/agents?utm_source=every_ai&utm_medium=newsletter&utm_content=ad_2&rcid=701Ql00000sb4ojIAA)

#### AI maturity in practice: From experimentation to enterprise production

Join us on March 17 at 10 a.m. PDT as Kevin McCurdy (AWS) and Abhishek Gupta (Retool) unpack a practical AI maturity progression that takes you from early experimentation to agent-driven, production-grade workflows. We’ll cover:

1.
The phases of AI maturity: what it takes to move from experimentation to enterprise-scale outcomes.

2.
How to tie AI to business outcomes: strategies for measuring real impact across capacity, cost, and throughput

3.
Scaling AI responsibly on AWS: embedding intelligence into core workflows in a way that’s governed, measured, and built to last.

Retool is trusted by 10,000+ companies, like Ramp, which saved $8M and increased efficiency 20%.

[Sign up today](https://srv.buysellads.com/ads/long/x/TFH7XQSQTTTTTTF2FBUCLTTTTTTD2LRK26TTTTTTB3HB5BVTTTTTTRD5CQVHEKLBV7ZDVBDGP2UN4MB7Q7PCKEBJF3BT?source=post_button)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#cfbcbfa0a1bca0bdbca7a6bfbc8faab9aabdb6e1bba0).

Language models have opened a new gap. They can generate writing, but they [can’t generate](https://every.to/p/the-science-of-why-ai-still-can-t-write-like-you)*[yours](https://every.to/p/the-science-of-why-ai-still-can-t-write-like-you)*. Left to their defaults, they converge on the same polished, generic, interchangeable prose—the kind that opens with “In today’s rapidly evolving landscape” and closes with a three-part summary no one asked for. And once again, the solution is a good style guide. Like Hart’s Rules or the AP Stylebook before it, an AI style guide takes what the writer knows and puts it in terms the machine can use.

### Surfacing the hidden patterns

Previous style guides focused on issues that were solvable with conscious, mechanical decisions. Hart could tell his compositors to spell “colour” with a *u,* and the job was done. The AP could tell reporters to lead with the most important fact.
In contrast, the most distinctive markers of a writer’s style [tend to be subconscious](https://every.to/p/the-science-of-why-ai-still-can-t-write-like-you): word choice, sentence rhythms, and patterns that fall into place while you’re focused on meaning. Researchers have found that humans are roughly twice as linguistically varied as machines, sentence to sentence. The gap narrows with better models, but it doesn’t close.
The only way to make a model approximate your unique voice is to surface those hidden patterns, name them, and write them down as instructions.
I stumbled into this when I started [feeding my essays to ChatGPT](https://every.to/working-overtime/i-fed-my-essays-to-chatgpt-until-it-learned-my-voice) and asking it what it noticed. Over weeks, it surfaced patterns I’d never consciously seen, such as how I structure an argument to progress from personal experience to broader stakes, or tend to favor long, winding sentence structures (a temptation I’ve calibrated my style guide to help correct). I copied what felt true into a Google document and continued the conversation, pushing back on some observations and adding in details I knew I wanted my writing to avoid. Eventually, I uploaded it all to a Claude Project, and the writing that came back started to sound like me.
It’s surprisingly hard to describe your own voice from a blank page. You know what your writing sounds like. You can recognize it instantly. You just can’t explain it in terms a model can use—and vague descriptors like “smart” and “conversational” don’t make the AI better at approximating you.
It’s all well and good to say, “You should make a style guide,” but we also know that when you’re trying to get somewhere, it helps to have a map. So we wrote a step-by-step guide to building your own AI style guide from scratch—what it is, what goes in one, how to build one by letting AI interview you, and how the practice can grow with you and your writing process. It draws on the systems we’ve built at Every and for **[Spiral](https://writewithspiral.com)**, our AI writing tool. By the end, you’ll have a working document you can hand to your chatbot, agent, or OpenClaw assistant and test on your next draft.
Hart’s compositors didn’t need to understand why they spelled “colour” with a u. They followed the rule. But writing an AI style guide forces you to answer a harder question: *Why do I write the way I do?* The document you end up with may be addressed to a machine, but the person who learns the most from it is you.
[Read the guide](https://every.to/guides/ai-style-guide?source=post_button)

---

***[Katie Parrott](https://every.to/@katie.parrott12)*** *is a staff writer and AI editorial lead at Every. You can read more of her work in* *[her newsletter](https://katieparrott.substack.com/). To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*
[Subscribe](https://every.to/subscribe?source=post_button)
