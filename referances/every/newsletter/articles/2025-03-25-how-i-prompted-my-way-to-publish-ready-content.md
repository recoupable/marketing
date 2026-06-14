---
title: "How I Prompted My Way to Publish-ready Content"
subtitle: "4 tactics for production-grade outputs"
author: "Lewis Kallow"
date: 2025-03-25
column: p
url: https://every.to/p/how-i-prompted-my-way-to-publish-ready-content
paywalled: true
scraped_at: 2026-06-11T16:07:46.557Z
---

# How I Prompted My Way to Publish-ready Content

*4 tactics for production-grade outputs*

***Lewis Kallow**** first captured our attention with his piece *["The Ultramarathon Mindset,"](https://every.to/p/building-an-unstoppable-mindset) *and now he's back with insights into prompt engineering. After lending his expertise to help Every build [Spirals](https://every.to/c/ai-guides)—the AI content generation workflows in our content-repurposing application (and creating the “contrarian” tweet generator that’s now the platform’s most popular)—Lewis is sharing some of the techniques he’s found useful for fine-tuning AI prompts. If you’re curious about how to craft better Spirals or enhance your prompts in other projects, this one is for you.—*[Danny Aziz](https://every.to/source-code/i-left-my-job-to-run-an-ai-wrapper-at-every)

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

In March 1976, Libyan dictator **Muammar Gaddafi **was about to declare war.

When his inspectors were sent to investigate reports of advanced military technology on the border with neighboring Tunisia, their worst fears were confirmed: They were greeted by a gigantic, futuristic, tank-like machine that appeared to be under construction. But despite the vehicle’s ominous appearance, the inspectors quickly found that open conflict was not imminent. The vehicle wasn’t a tank at all—it was a “sandcrawler,” a prop in the first *Star Wars* movie.

But almost sparking a regional war was the least of the* Star Wars* crew’s worries. During the first few weeks of shooting the film, they had to endure freak rainstorms, sandstorms, malfunctioning robots, and widespread sickness among the cast and crew. **George Lucas** was [“desperately unhappy”](https://www.amazon.com/George-Lucas-Brian-Jay-Jones/dp/0316257443) with the shoot, and yet, he did somehow get the footage he needed out of his two weeks in Tunisia.

One reason that helps to explain why Lucas’s scrappy team was able to snatch victory from the jaws of defeat is because they were in total alignment. Prior to the shoot, Lucas sat them down and had them watch four films that embodied his desired vibe for *Star Wars*: *2001*, *Silent Running*, *Once Upon a Time In the West*, and *Satyricon*.

Armed with these examples, Lucas's crew had a clear vision of what was required and were able to deliver blockbuster results even as chaos broke out on set. Lucas understood that showing people examples of what you want is one of the most efficient ways to drive alignment and produce awesome results.

Lucas isn’t alone, and I’ve [written elsewhere](https://www.actiondigest.com/p/a-prototype-is-worth-100-meetings) about how the world’s greatest creatives are obsessed with using examples to communicate. And while I wouldn’t go quite as far as describing myself as the modern-day George Lucas, I did manage to use his technique to write this tweet for Every CEO **Dan Shipper** that got 200,000 impressions:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_Screenshot%202025-03-25%20at%2011.01.37%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_Screenshot%202025-03-25%20at%2011.01.37%20AM.png)

*Source: *[X/Dan Shipper](https://x.com/danshipper/status/1823790134745289106)*.*

Well, technically *I* didn’t write it.

I just shared examples of viral tweets with an AI that then wrote the tweet for me.

This technique is called a “few-shot prompt” (about which Every [published](https://every.to/also-true-for-humans/the-key-to-great-ai-prompting-show-don-t-tell) a piece by prompt engineer **Michael Taylor **last year). In a nutshell, few-shot prompting is when you work with your AI of choice like Lucas worked with his crew: You share examples of the output you want to achieve rather than trying to describe it.

As someone who writes for a living, having a library of few-shot prompts has saved me hours of time every week. Take the above tweet as an example. It would have taken me at least 10 times longer if I had tried explaining to ChatGPT what I wanted and even longer if I tried writing it myself from scratch.

Each piece of content you or your team regularly produces now represents hours of time you could reclaim by using a production-grade few-shot prompt.

Working with high-quality, few-shot prompts allows me to create and repurpose content six times faster, saving around eight hours every week. Here’s how I do it.

## Overcoming few-shot friction

There is one problem I’ve noticed with example-based prompting:

Most creators and businesses aren’t using it.

I think this is because you have to overcome three major inconveniences before you start to take advantage of few-shot prompting on a consistent basis:

1.
**Upfront effort**: A few-shot prompt is only as good as the examples you provide. Cultivating a set of high-quality examples can take a lot of initial time and effort.

2.
**Organizational disarray**: Once you have your few-shot prompts, you have to save them somewhere, remember where you saved them, remember to use them, and then copy and paste them into an LLM each time you want to use one.

3.
**Skill issue**: Examples are effective but insufficient. If you want “production-ready” content like the tweet I shared above, you need to combine your examples with a little bit of prompt engineering (more on that in a second).

I’ve struggled with all three of these obstacles myself, and I’ve picked up a few tricks for overcoming them.

The first is a shortcut. The prompt I used to write Dan’s tweet above was created with the help of (plug alert!) Every’s prompt-building application [Spiral](https://app.spiral.computer/), which goes a long way in solving the first two few-shot prompting hurdles of effort and inconvenience.

Here’s a quick breakdown of how it works, using the tweet I made for Dan as an example.

After I’d found a number of examples of viral tweets that I wanted AI to replicate (my equivalent of Lucas’s four reference movies), I saved them inside of a “Spiral,” a kind of customized template for the content you want to create:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_1.png)

*Spiral screenshots courtesy of the author.*

The Spiral analyzed the style of my tweets and wrote a style guide for me.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_2.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_2.png)
After just a little bit of copying and pasting, I have a prompt that includes my examples along with a style guide that’s saved in the cloud. All I have to do when I want to compose a pithy tweet is drop an article into my Spiral and hit “Run.”

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_3.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_3.png)
This takes care of the problem of organizational inconvenience. I no longer need to figure out where to save all of my prompts or copy and paste them into ChatGPT every time I want to use them. Whenever you create a Spiral, it will ask you to label the input you’ll be adding along with the output you want it to create. sp your library will automatically stay organized.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_4.png)
The final result is a prompt with roughly the following anatomy:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_5.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3498/optimized_5.png)

[PAYWALL]
