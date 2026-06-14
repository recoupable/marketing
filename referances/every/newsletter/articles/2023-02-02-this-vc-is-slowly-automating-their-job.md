---
title: "This VC Is Slowly Automating His Job"
subtitle: "How Yohei Nakajima uses GPT-3 to eliminate repetitive tasks"
author: "Dan Shipper"
date: 2023-02-02
column: chain-of-thought
url: https://every.to/chain-of-thought/this-vc-is-slowly-automating-their-job
paywalled: true
scraped_at: 2026-06-11T16:08:25.485Z
---

# This VC Is Slowly Automating His Job

*How Yohei Nakajima uses GPT-3 to eliminate repetitive tasks*

#### Sponsored By: Vanta

This essay is brought to you by [Vanta](https://links.swapstack.co/jjn), the leading Trust Management Platform. Need SOC-2 Type I? They can help you get it in just two weeks.

[SOC 2 in Two Weeks](https://links.swapstack.co/jjn)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#d4a7a4bbbaa7bba6a7bcbda4a794b1a2b1a6adfaa0bb).

[Yohei Nakajima](https://twitter.com/yoheinakajima) hates repetitive tasks. He hates them so much that he spends a lot of his time building AI bots that eliminate them from his life as much as possible.

Nakajima is a GP at a small venture firm, Untapped Capital, so he has a GPT-3 bot that answers common questions from founders. It emails responses to them and includes a way for him to refine them over time—so it continually improves.

He has another bot that automatically summarizes every email interaction he has. He reviews these before meetings so that he’s always up to date on founders and LPs.

He has another one that, given a startup’s website, can draft an investment memo that includes data like the company’s value proposition, a description of its product, its likely competitors, and even the sentiment from its Product Hunt launch.

It goes beyond his work life, too. He has a bot that summarizes and makes searchable emails from his kids’ schools—so he never has to spend time looking up deadlines or important events again.

He’s so well known for building these tools that the phrase “We should Yohei this” is a common refrain among his LPs, meaning: this task is boring and repetitive, so we should automate it.

In “[AI and the Age of the Individual](https://every.to/chain-of-thought/ai-and-the-age-of-the-individual),” I argued that “rather than replacing individuals, recent advances in AI will *empower* them to make an impact on a scale matching some of the biggest businesses, research labs, and creative organizations of today.”

The tools that Yohei is building for himself are a prime early example of this dynamic in action. He told me that, as a venture capitalist, “Time is the number one blocker. If you can unlock time, you’re instantly better at your job.” That’s exactly what AI is enabling him to do. What might not have been possible for a small VC firm a few years ago might be eminently possible in a year or two if these tools continue to develop.

To be sure, the bots he’s building are early prototypes. They require more work and polish to function perfectly. But they’re already allowing him to spend less time on tasks that he doesn’t want to do—and more on the ones that he’s uniquely good at: sourcing deals and deciding on investments.

We sat down for an interview exploring what he’s building and what it means for the future of venture capital (and venture capitalists).

## Yohei introduces himself

I’m a pre-seed venture capitalist running my own fund, Untapped Capital.

I’ve been working in startups my whole career. Initially, I tried to start my own right out of college. I made every mistake possible, but it helped me get connected with the LA startup scene. From there I worked for TechStars, where I helped to spin up their Disney accelerator, and eventually became their Director of Pipeline, where I was sourcing startups for about 30 accelerator programs.

During that time I realized I wanted to run my own fund. So I went to [Scrum Ventures](https://scrum.vc/) to learn the ropes of what it’s like to be in a venture firm. Eventually, I decided to start my own pre-seed fund called Untapped Capital. It’s a $10 million fund that I run with my co-GP, [Jessica Jackley](https://www.linkedin.com/in/jessicajackley/).  That was a few years ago, and that’s what I’m doing full-time now.

## I don’t like repetitive tasks

I’ve always been one of those people where I don’t like to do a task over and over again. If I’m doing something more than once, I want it to be automated. So I build little tools to help me in my day-to-day work as a VC. A lot of it is moving stuff away from my inbox. It’s either automating it fully or putting it on my to-do list.

Some of the tools I just use personally, and some of them I make available to the founders I invest in. They allow me to do more. I can do more work, answer more questions, make more intros, help more founders. The quality of the work the model does on its own is not going to be as high as if I’m doing it, but I can also help a lot more people at once.

For every VC, time is the number one blocker. If you can unlock time, you’re instantly better at your job. That’s what these tools allow me to do.

## Mini Yohei

One of the first projects I built when I was getting into GPT-3 is what I call Mini Yohei. It’s a little wrapper around GPT-3 that asks questions that founders might usually ask a VC.

Answering those questions is something I do all the time, right? Founders ask me small questions and sometimes I have the answer. But sometimes I have to Google around and do research myself to get an answer—I don’t know or remember everything off the top of my head.

So I thought, “Maybe I could automate that?” That’s how I built Mini Yohei:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2454/optimized_MptcIaJQOSC8oLXwwzTFH-IUI4sDnEAabPqF7IoLPalLIIu1CgdDfJgHUNW1ylDItbxUtKQFkKH8Zwe5-lfZZzxNEpu71EwcFGhPLxVgeOI65H_ot8ID95HZsYh7hb3ZIr6cbCaGfClfvH9gWv7U6M0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2454/optimized_MptcIaJQOSC8oLXwwzTFH-IUI4sDnEAabPqF7IoLPalLIIu1CgdDfJgHUNW1ylDItbxUtKQFkKH8Zwe5-lfZZzxNEpu71EwcFGhPLxVgeOI65H_ot8ID95HZsYh7hb3ZIr6cbCaGfClfvH9gWv7U6M0.png?link=true)

A founder can ask a question like, “Where do you think power will ultimately reside in the AI value chain?” It will email the founder an answer and cc me, too.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2454/optimized_9xMN_5bW2bvF-yG7C57NCk6k-P5Uuu8m8aq7wPz_VAk_lFMlBQl5SL3bci9xzNh1DC4eUE3vTn1lZb45Tb0SoioFttI3IvitRJOo_HcK1EQFYGbZjkyV-1jBF7eUZXOdGORaRCwutm9XPkWxsJuiAGw.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2454/optimized_9xMN_5bW2bvF-yG7C57NCk6k-P5Uuu8m8aq7wPz_VAk_lFMlBQl5SL3bci9xzNh1DC4eUE3vTn1lZb45Tb0SoioFttI3IvitRJOo_HcK1EQFYGbZjkyV-1jBF7eUZXOdGORaRCwutm9XPkWxsJuiAGw.png?link=true)

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2454/optimized_QWB0_82sOVotcJrgIxd_DZpKHZUzRNc2HbrmqzV4ie7exkNueljNeBVZKOxFq-RR6VtBUCISHFmcdue8wAVVAmqD2alscj3-vY1xwMyNE_5HDPSx2mKFIJccC9hJUsdxHQx3cBHLGaL1_TujLREL2vM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2454/optimized_QWB0_82sOVotcJrgIxd_DZpKHZUzRNc2HbrmqzV4ie7exkNueljNeBVZKOxFq-RR6VtBUCISHFmcdue8wAVVAmqD2alscj3-vY1xwMyNE_5HDPSx2mKFIJccC9hJUsdxHQx3cBHLGaL1_TujLREL2vM.png?link=true)

Once Mini Yohei responds to a question, I’ll follow up with my own answer, and the founder and I can talk about it. I end up responding faster to their original question because I have something to respond to. If it says something that’s a little bit off, I can just write a correction rather than having to write an entire answer.

I don't think you should ever, at this point especially, just believe AI flat out. That’s why I’m always cc’d on these. But, realistically, a lot of VC suggestions are generic. A lot of VCs are just reading up on how startups have worked in the past or talking about it with other VCs and founders. We're basically synthesizing that and applying it to whatever question the founder is asking.

A lot of that kind of thinking has been documented as blog posts. So an AI that's been trained on that corpus of text is going to be able to answer the most common questions that founders have. A more recent upgrade I made is Mini Yohei 2.0, which searches through VC blogs and provides answers grounded in those blog posts with citations. And this model gets better every time I use it.

On the backend, I actually have it generate three different answers because I'm trying to fine-tune modes to figure out what works. Some of the models are just prompt engineering to try to get things right. And some of them are trained on a Q&A that I’ve built out and uploaded.

Everything goes into an Airtable where I can mark answers that I think are best, and that goes back into the training set and updates the model:

[PAYWALL]
