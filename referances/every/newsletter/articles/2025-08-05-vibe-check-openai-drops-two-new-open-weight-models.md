---
title: "Vibe Check: OpenAI Drops Two New Open-weight Models"
subtitle: "OpenAI President Greg Brockman: ‘The team cooked with this one’"
author: "Dan Shipper"
date: 2025-08-05
column: vibe-check
url: https://every.to/vibe-check/vibe-check-openai-drops-two-new-open-weight-models
paywalled: false
scraped_at: 2026-06-11T16:07:37.933Z
---

# Vibe Check: OpenAI Drops Two New Open-weight Models

*OpenAI President Greg Brockman: ‘The team cooked with this one’*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

If your life’s dream is to be able to [vibe code](https://www.google.com/search?q=every.to+vibe+coding&sourceid=chrome&ie=UTF-8) on a deserted island, or in a cabin in the woods during a power outage, or on a long-haul flight with no WiFi, rejoice! Dreams do come true.
Today, OpenAI is releasing its first open-weight models since GPT-2 in 2019: **gpt-oss-120b **and **gpt-oss-20b**. Because they’re [open-](https://chatgpt.com/share/6892256e-e13c-8012-9851-e76c4a4a7d53)[weight](https://every.to/c/ai-frontiers), you can run them yourself, on your laptop or on your own cloud, instead of in OpenAI’s cloud through its API. So you can take them with you anywhere—to a cabin in the woods—and use them at any time—at 40,000 feet with no WiFi.
The** 20b** is the small version that’s tiny enough for you to run on a MacBook. It’s about as powerful for coding and other reasoning tasks as [o3-mini](https://every.to/context-window/high-agency-and-great-ai-expectations)[.](https://every.to/context-window/high-agency-and-great-ai-expectations) Let me repeat: You can now run an o3-mini-level model on a MacBook.
The** 120b** is the more powerful model designed to run on a single GPU in your private cloud. According to OpenAI’s internal benchmarks, it matches or exceeds [o4-mini](https://every.to/vibe-check/vibe-check-openai-s-o3-gpt-4-1-and-o4-mini) on reasoning tasks like competition coding, general problem solving, and tool calling.
Usually I like to be hands-on with [vibe checks](https://every.to/vibe-check), but unfortunately I couldn’t try these models before their release. However, based on OpenAI’s internal benchmarks, both of them appear to push the current frontier for other open models of their size, like [Meta’s Llama](https://every.to/napkin-math/can-anyone-compete-with-meta-s-new-ai-model) and Alibaba’s Qwen. As **Greg Brockman**, OpenAI cofounder and president, said during a call with journalists yesterday, “The team cooked with this one.”
Both models are being released today for free under an Apache 2.0 open-source software license, so you can use, modify, or sell them yourself.
The big questions are: What are these models useful for? And why? What’s the strategy?

####

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/807/optimized_coraad.png)](https://cora.computer/?utm_source=standalonead)

**Make email your superpower**

Not all emails are created equal—so why does our inbox treat them all the same? [Cora](https://cora.computer/?utm_source=standalonead) is the most human way to email, turning your inbox into a story so you can focus on what matters and getting stuff done instead of on managing your inbox. Cora drafts responses to emails you need to respond to and briefs the rest.

[Try Cora today](https://cora.computer/?utm_source=standalonead)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#0576756a6b766a77766d6c757645607360777c2b716a).

## What are these models useful for?

I can think of a few ways right off the bat where we’re going to start experimenting with these models internally (aside from vibe coding at 40,000 feet).
First, Every has a [consulting practice](https://every.to/consulting) with hedge funds and private equity firms that are bound by significant privacy and security regulations. I imagine this is going to be immediately interesting for these businesses because they can now run the models themselves in the security of their own data centers. While open-weight models are free to use, the majority already have enterprise contracts with OpenAI for ChatGPT.
Previously, they may have *wanted* to use open-weight models like Kimi K2 or Qwen, but for firms with strict regulatory and compliance requirements, there’s no better way to make your head of IT break out in hives than to try to install Chinese-developed AI in your secure private cloud. OpenAI’s oss-series models boast the same open-weight flexibility and security benefits—without the geopolitical drama.
Second, Every has a suite of Mac apps that could use these models to offer AI features with a better security and privacy profile. **[Sparkle](https://makeitsparkle.co/),** our AI file organizer, sends your filenames to OpenAI’s cloud—a no-go for security-conscious users. Similarly, **[Monologue](https://monologue.to/)**, our AI dictation app currently in beta, sends your dictation transcript to the cloud for processing.
We’ve experimented with on-device processing for both of these apps (Monologue uses on-device Whisper for its transcriptions). But speed and reliability haven’t been good enough to release it.
We’ll be testing these thoroughly over the next few weeks and update you as we learn more.

## Open weights as ecosystem distribution

One clever thing about OpenAI’s open-weight models is that they use the same API and prompt format as its cloud models. Anything you’ve already built for an OpenAI model will work seamlessly on these new local models—and anything you build locally can move to the cloud without changes.
Open weights are now a core part of the AI ecosystem, and the line between cloud and on-device use is blurring fast. Especially with the recent boom in high-quality open-source models like Qwen and Kimi K2, most customers will want both options. By releasing open-weight models that plug directly into its existing API, OpenAI keeps those customers inside its ecosystem no matter where—or how—they run the model.
So that’s why they’ve pulled an Oprah and started leaving free models under everybody’s seats.
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3721/optimized_2a84c61d-09d4-49b6-9265-2ec77caea130.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3721/optimized_2a84c61d-09d4-49b6-9265-2ec77caea130.jpeg)

Open weights is how OpenAI becomes available everywhere—on laptops and private clouds—and keeps its bigger frontier models—that customers actually pay for—just a line of code away.
You can download them now on HuggingFace, read OpenAI’s blog post, or join our Discord to discuss.

---

***Dan Shipper**** is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Automate repeat writing with ****[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer/)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
[Subscribe](https://every.to/subscribe?source=post_button)
