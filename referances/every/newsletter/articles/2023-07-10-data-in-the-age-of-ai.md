---
title: "Data and Compute Are the Ultimate Flywheel"
subtitle: "What’s valuable—and why—in an AI-driven world"
author: "Abraham Thomas"
date: 2023-07-10
column: p
url: https://every.to/p/data-in-the-age-of-ai
paywalled: true
scraped_at: 2026-06-11T16:08:17.277Z
---

# Data and Compute Are the Ultimate Flywheel

*What’s valuable—and why—in an AI-driven world*

#### Sponsored By: Scrintal

This essay is brought to you by [Scrintal](https://www.scrintal.com/?utm_source=NL&utm_medium=PNS&utm_campaign=A10169&d=EVERY10), a visual-first knowledge management tool that lets you organize and connect all your thoughts in one place. Get 10% off when you use the code **EVERY10**.

[Get Started](https://www.scrintal.com/?utm_source=NL&utm_medium=PNS&utm_campaign=A10169&d=EVERY10)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#cebdbea1a0bda1bcbda6a7bebd8eabb8abbcb7e0baa1).

The 2010s was the decade of data explosion. The world began to create, log, and use more data than ever before, and the big winners in the tech industry—whether social media companies like Meta or e-commerce giants like Amazon—made the most of it.

But the dawning AI era is changing the playing field. Data and compute have created a flywheel—driven by language models—that generates more digital information than ever before. This shifts where value sits in software ecosystems, and presents key opportunities for large incumbents and new startups.

Let’s explore the sweeping downstream implications for the future.

## Memory is destiny: the data explosion

I taught myself to code on an IBM PC clone running MS-DOS on an 8086. This was in the late 1980s; the computer was cheap, functional and remarkably ugly, but it worked. And it had what was—for its time—a princely amount of storage: 30 whole megabytes of hard disk space.

A decade later, working my first job as a programmer, storage was easier to come by, but it was never out of my mind. I cared about memory leaks and access times and efficiency. Creating a clever data structure to hold yield curves for rapid derivatives pricing was one of my prouder achievements at the time. We didn't store everything, only what we needed to.

Another decade later, I didn't care. At Quandl, the fintech data startup I founded, we saved everything. Not just the data assets that formed the core of our business, with all their updates and vintages and versions, but also all our usage logs, and API records, and customer reports, and website patterns. Everything.

What happened? Well, [this](https://ourworldindata.org/grapher/historical-cost-of-computer-memory-and-storage):

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2692/optimized_8Dd3V6yk51qRLLnQVHGqafmVltrkyqaeD5S5COFDviGfyPF_rAKjX5philvrJbaZmmrMDBVMq6Cpr_Ms19M2v6GNvkptIt1jTyy2s7b_FOtMTOWZy33xjI1QUm9d.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2692/optimized_8Dd3V6yk51qRLLnQVHGqafmVltrkyqaeD5S5COFDviGfyPF_rAKjX5philvrJbaZmmrMDBVMq6Cpr_Ms19M2v6GNvkptIt1jTyy2s7b_FOtMTOWZy33xjI1QUm9d.jpg)

It turns out it wasn't just Quandl that stored all its data; it was everyone, everywhere, all at once. Driven by falling hardware costs, and—equally as important—by business models that made said hardware easy to access (shoutout to [Amazon S3](https://aws.amazon.com/s3/)!), data became a critical competitive advantage.

A majority of the business models that “won” the last decade are downstream of the data explosion:

- the entire content-adtech-social ecosystem

- the entire ecommerce-delivery-logistics ecosystem

- the infrastructure required to support these ecosystems

- the devtools to build that infrastructure

How so?

Consider advertising, still the largest economic engine of the internet. Facebook, Reddit, YouTube, Instagram, TikTok, and Twitter all rely on the exact same loop, linking users, content and advertisers:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2692/optimized_Q9FLgy6EGgvZ99rm2b7GhiC6mD2VZZMCrjWQ6p6L_QrYPEjCODq-nncY1IpO8iVW6CEK2uKz6TUoNjnfEYtWdRqZ0MuPbuPNGRQddJueyjTHzM8EfP21S0badvHY.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2692/optimized_Q9FLgy6EGgvZ99rm2b7GhiC6mD2VZZMCrjWQ6p6L_QrYPEjCODq-nncY1IpO8iVW6CEK2uKz6TUoNjnfEYtWdRqZ0MuPbuPNGRQddJueyjTHzM8EfP21S0badvHY.jpg)

Companies are able to offer users unlimited free storage for photos, videos, blog posts, updates, and music; the content attracts more users, who attract advertisers, who subsidize the platform, and the cycle continues. None of this is possible without cheap, plentiful storage.

Or consider delivery and logistics. It's easy to take for granted today, but the operational chops required to power same-day e-commerce, or ride-sharing, or global supply chains, are simply staggering. The famous [Amazon](https://www.samseely.com/posts/the-amazon-flywheel-part-1) and [Uber](https://andrewchen.com/ubers-virtuous-cycle-5-important-reads-about-uber/) flywheels are just special cases of a data learning loop:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2692/optimized_EhomdHDwI_jAuDHYjUHuRIakKXOtidzVuomKhf3mhcj4vH02MiwJqw3RG94U1r3Cgk4QkmiDtVTxR-BTEZz-cpxWI9jYGkiqP1sSUWsjJ5xY9eMVUf1TX0iopkuT.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2692/optimized_EhomdHDwI_jAuDHYjUHuRIakKXOtidzVuomKhf3mhcj4vH02MiwJqw3RG94U1r3Cgk4QkmiDtVTxR-BTEZz-cpxWI9jYGkiqP1sSUWsjJ5xY9eMVUf1TX0iopkuT.jpg)

These flywheels require up-to-date knowledge of customer locations, purchase and travel habits, store inventories and route geographies, driver and car availability, and a whole lot more. Again, none of this is possible without cheap, plentiful data.

Incidentally, these flywheels are not just powered by data; they generate new data in turn. The data explosion is not just an explosion; it's a genuine chain reaction. Data begets data.

## Falling data costs and rising software costs

All of these flywheel, data-based business models are, essentially, software. That's no surprise—data and software are two sides of the same coin.

The software used to optimize businesses is useless without data to apply itself to. And data is worthless without software to interpret and act on. More generally, tools are useless without materials; materials don't have value unless worked on with tools.

[PAYWALL]
