---
title: "Snowflake: How a Revenue Retention Behemoth was Built"
author: "Evan Armstrong"
date: 2021-07-21
column: napkin-math
url: https://every.to/napkin-math/snowflake-the-righteous-blood-sucker
paywalled: false
scraped_at: 2026-06-11T16:08:54.848Z
---

# Snowflake: How a Revenue Retention Behemoth was Built

**TL;DR**

- This is the second post on a deep dive in GTM metrics with a focus today on Revenue Retention

- Snowflake is a software Dracula. It latches onto its customers and drains their bank accounts dry, but their victims are happy throughout the process. They are a world-class company at “net revenue retention”—a crucial metric for SaaS businesses that describes the tendency for customers to increase their spend over time.

- NRR is important for enterprise SaaS companies because there are a limited number of customers that have the problem they are trying to solve, so the business can flatline quickly unless they find a way to grow revenue through their existing customer base.

- Most companies have 1-2 reasons why their NRR is good. Snowflake has 6.

---

Hi all! This is Part 2 of our Summer of Sales series, where I’m examining the strategies, metrics, and analyses that businesses use to optimize their go-to-market! Today, I’m using stock market darling Snowflake to explore my favorite metric in all of business—Net Revenue Retention. Yes, I have a favorite metric. What, you don’t? If you only got ONE metric to evaluate a business, NRR should be it, and we can learn a lot from Snowflake’s mastery of it. A lot of how Snowflake operates is misunderstood or just unknown to the general public, so for research I interviewed multiple users of the software, data engineers, and software investors. We’ll start off with a quick definition of revenue retention, talk about how the stock market treats top performers, and then dive into why Snowflake is so, so good.

## Revenue Retention’s Definition and Grace

One of the most harrowing experiences at a startup is running out of potential customers to talk to. Picture it: Over the course of six months, you watch helplessly as your leads pipeline slowly dries up. The best account executives leave immediately. The oblivious ones stick around and complain that marketing isn’t pulling their weight. Over on the demand generation team, there is blood in the streets as the cost per lead skyrockets. A VP of some revenue adjacent function is probably fired (even though it isn’t their fault). A thick fog of missed quotas and depressed workers descends on the company. These worries result in a death spiral where all the good talent in the company leaves for companies whose names rhyme with Foogle or Gacebook.
Whether the result of too small a market, too many competitors, or take-your-pick-business-boogeymen, almost every type of company in this scenario is screwed. Retailers? Dead. Consumer Hardware? Smoked. Professional Services? Kablooey.
But there is one type of business that can not only survive having a bad sales pipeline, but ride it out in comfort and style. It is business to business (B2B) software. Differentiation is not found in their product design or technical capabilities, what is truly special is their financial profile. On average, each cohort of customers generates more revenue as time marches on. Whether through adding additional users to existing contracts or convincing their existing users to buy more products, good SaaS companies are built around the calculus of** revenue retention. **This revenue base allows the companies to have the cash and time to pivot their business.
Most subscription businesses see the revenue from a specific cohort of customers—say, people who signed up in May 2019—go down over time. Some people stick around, but not everyone, so there is some churn that decreases the annual revenue from that cohort as time goes on. But certain types of B2B SaaS businesses are different. They actually can make *more* money over time from each cohort. Sure, some customers do churn. But if the ones who stick around *increase* their spend enough, it can actually compensate for the lost customers and then some, leading to a phenomenon known as "negative churn."
The formula that is used to calculate net revenue retention can feel menacingly obtuse, but please, stick with me. I promise it will be worth it. The math goes like this:
***(Existing Annual Recurring Revenue + Expansion - Downgrades - Churn / Existing ARR)***
Ok, some quick definitions:

-
**Existing Annual Recurring Revenue (ARR):** This is the subscription revenue that your customers have paid in the previous time period. For more on why subscription revenue is so magical you can check out my[previous writing on the topic](https://every.to/napkin-math/revenue-it-s-simple-until-it-isn-t) (Paid)

-
**Expansion: **This is the revenue that you add on in the previous year. You can either raise prices, add more users, or sell more products but it is to the same set of customers in the previous set. Note: *If you are looking for a guide on how to determine ideal pricing, humbly suggest the guide I *[published last week](https://every.to/napkin-math/pricing-strategy-is-product-strategy)*!*

-
**Downgrades: **Sometimes customers will actually decrease their contract on a YoY basis. This is that metric.

-
**Churn: **This is the customer revenue that leaves completely.

You put it all together and you’ll have a percentage that tells you how much your revenue base has grown over the previous year. If your company had $100K of ARR, added $25K in expansion, lost $5K in downgrades, and lost $10K in churn, you would have a Revenue Retention of 110%: 100,000 + 25,000 - 5,000 - 10,000) / 100,000 = 1.1*100
Ok that's enough of the definitions! Let’s get to the truly interesting stuff: what this metric looks like in the real world, why some companies are so much better at increasing it than others, and how you can architect your product and go-to-market strategy to get the best NRR.

## Show Me The Charts, Baby!

Much of revenue retention is driven by the size of the customer you are selling too. Expansion and churn are the two power metrics in the equation—both are tied to contract value size. If you are selling to small and medium businesses (SMBs) there is less cash sloshing around so it is tougher to upsell. And by the very definition of the name, SMBs are small so less employees to sell more seats to. Plus, SMB failure rate is higher than larger enterprises. So all of these factors mean SaaS companies selling to SMBs have a tough time cracking the 100% revenue retention mark. Openview’s Benchmark [study](https://f.hubspotusercontent10.net/hubfs/366266/2020_SaaS_benchmarks_deck_vFINAL.pdf) put the median at ~100% across all industries.  Note: *Sometimes you’ll see people use Net Dollar Retention vs Net Revenue Retention. They are *[synonyms](https://kellblog.com/2021/06/10/pulse-2021-slides-net-dollar-retention-ndr-benchmarks-and-thoughts/)*. *

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_J8s8jMQLOPU2FllBkfF1pw-eKnCy0fh9zzm8EiE2vvA0IOwD7GZWsXoEOPQl8027XeMAS152HlxL7Ycm54DDJ5TnKhVDyw9XhzpLKrpVtJqLWToNunLdBXgirbfWo-dOiGpq2Vc3.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_J8s8jMQLOPU2FllBkfF1pw-eKnCy0fh9zzm8EiE2vvA0IOwD7GZWsXoEOPQl8027XeMAS152HlxL7Ycm54DDJ5TnKhVDyw9XhzpLKrpVtJqLWToNunLdBXgirbfWo-dOiGpq2Vc3.png?link=true)

You can also look at it from the perspective of average contract value (a good proxy for customer size). This data from [SaaS Capital](https://www.saas-capital.com/wp-content/uploads/2020/06/2020_B2B_SaaS_Retention_Benchmarks.pdf) pretty clearly illustrates that as contract sizes go up (correlated with selling to larger businesses), NRR also goes up.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_hp_MSSTtVfG3NRWD6IW1-9970uh1s3OHhtws9HYgrhgDGN3uKNWtaHvwOqoxYmWvPhj985niUZpvxYuVOg9gIsb4G-5mkBz8c8k_i9aJwhVAvLFf8UvUVAKLTFdulI1pujqsMMsD.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_hp_MSSTtVfG3NRWD6IW1-9970uh1s3OHhtws9HYgrhgDGN3uKNWtaHvwOqoxYmWvPhj985niUZpvxYuVOg9gIsb4G-5mkBz8c8k_i9aJwhVAvLFf8UvUVAKLTFdulI1pujqsMMsD.png?link=true)

Despite the swing in ACV all these companies still center somewhere around 100% NDR. If you’re not stunned, you should be. These companies are making the same amount of money every year *despite losing customers. *
When you move out of the junior varsity squad and into the public markets, B2B SaaS performance becomes even more impressive. Here the median sits at a cushy 120%.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_iGTbZ6BMKH-VwYX6p6YJLSJXVMvHJBPTA8ndGhTPr0rn0rnaEBMeDDMdsnrhx1DqBKxKdcMMv5I4E1lWOvZedixdyIK57fJVznRE01pgAuM1oWTNXRuoyDhMjSvBz8FkWBZS4ho7.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_iGTbZ6BMKH-VwYX6p6YJLSJXVMvHJBPTA8ndGhTPr0rn0rnaEBMeDDMdsnrhx1DqBKxKdcMMv5I4E1lWOvZedixdyIK57fJVznRE01pgAuM1oWTNXRuoyDhMjSvBz8FkWBZS4ho7.png?link=true)

And while it only has a moderate effect (r=.52), markets tend to reward those companies that are best at having a Net Dollar Retention.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_xkmteFTZUFaiKaBAAf8qkROb7Q3E4VxHF2qAsJNmuFOctiPat435etFraYEYNkMeX1-9P8NuO1dmKO5GG4jHdoDWlv466sCQF2ToMQIyxvylw0JtfEcHPoF7j2z4_PR7aZ9A6QpU.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_xkmteFTZUFaiKaBAAf8qkROb7Q3E4VxHF2qAsJNmuFOctiPat435etFraYEYNkMeX1-9P8NuO1dmKO5GG4jHdoDWlv466sCQF2ToMQIyxvylw0JtfEcHPoF7j2z4_PR7aZ9A6QpU.png?link=true)

In summary, many top-tier software companies will continue to make roughly the same amount of money from every annual cohort of customers. Great ones will generate *more* money from each annual cohort every year. So for every additional year a SaaS company makes it, they generate ever more cash. It is an incredible business model. There is a reason SaaS has become one the best understood and most heavily invested markets for venture capital investors.
If you paid attention through the last two charts you’ll notice that there was one data point that resided high above the others. That special little dot is the case study for today’s piece— Snowflake. Note: *The other special little dot is Twilio, which just so happens to be the subject for next week's piece! :)*

[Subscribe](https://every.to/subscribe?hash=%recipient.hash%)

## The King of Net Dollar Retention

When you open Snowflake’s website, it is packed so full of buzzwords that it looks like a venture capitalist’s “thought leadership” piece on Medium. While there is the typical corporate word vomit—“Scale! Secure! Seamless!”—the phrase most frequently festooned on the site is “The Data Cloud.” This is also meaningless lol. My task here for the next few paragraphs is to try to translate, in as simple a way as possible, what they actually do. Once you have a basic understanding of that, we can talk through why their NDR is so high.
As a company, you make data all the time. As you are making this data, there are essentially two tasks you need to accomplish. One, store it. Two, do analysis on it. And boom, I just invented computers!
Digitization has made every part of the company create data. Reams and reams of the stuff. Everything from sales to finance to product, all are generating millions of data points. This volume and variety of data is so numerous that it is incredibly difficult to store in an organized way, let alone do anything useful with it.
For many years, companies had to have their storage and analysis all on the premise of their company (“on-prem”). Then our very bald, very recently in space retail overlord Jeff Bezos came up with the bright idea to not do that. What if you could store and do analysis on your data *but on someone else’s computer*. You can pay by the hour, enabling you to use wildly powerful machines that have no business setting foot anywhere near your company’s dank closet, generously called the “server room.” Plus, you don’t have to worry about anyone tripping over power cords or spilling coffee on the hardware. When you rent a computer, you wouldn’t really care where it was, it was just, ya know *gesticulates wildly* in the sky. Thus the cloud was born. Amazon made a cloud computing service and in short order so did every other tech giant besides Apple.
*Man, this is boring but please stick with me! Payoff is rapidly approaching. *
While there were a ton of benefits to this, it wasn’t perfect. The cloud gave an easier way to store data, but it didn’t solve the core problem of being able to efficiently analyze it.
Cloud computers are helpful, but they don’t solve the whole problem of storing and analyzing data. First, data gets generated in a lot of different places for big companies. Some of it comes from a CRM like Salesforce, other data might live on their marketing website, and then there’s more data from apps customers use. Oh and don’t forget about help desk software, social media monitoring, live chat… the list goes on. In order to make this data useful, you need to make it all live in one place and be connected together. And then, once you’ve done that, you need to be able to write queries on it that don’t take forever to run. Easier said than done when dealing with billions of rows of data!
Snowflake solves all those issues. It provides a storage facility where you can send all of your data, and it makes it exponentially faster to query that data. To get around the competitive dynamics, it is a multi-cloud product, meaning it uses the cloud services from the big three of Google, Microsoft, and Amazon.
Note: *If you want to go deep into the technology I recommend this *[post](https://hhhypergrowth.com/a-blizzard-on-the-horizon/)* from HHHypergrowth. Alternatively, this post from Scuttleburb is excellent *[too](https://www.scuttleblurb.com/snow/)* (paid).*
It might seem like Snowflake does something incredibly generic, but keep in mind this was by a company that did $592M last year in revenue, doubling from $264M in 2019 while maintaining a market leading NRR. For reference, below is a screenshot of their recent income statement.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_L7vZHq5eRE1MyY_QnTrvNpxs3Gxwyzc1XPCQ0RhmUNL8TargaGdtaC68zPEyxCE8kMtDSKjeFphaz5A9231sjUsQ5ExvBYIexoNZSdZTERlfh1OhqPUpnuq9j448jspdp3j4I2xB.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1775/optimized_L7vZHq5eRE1MyY_QnTrvNpxs3Gxwyzc1XPCQ0RhmUNL8TargaGdtaC68zPEyxCE8kMtDSKjeFphaz5A9231sjUsQ5ExvBYIexoNZSdZTERlfh1OhqPUpnuq9j448jspdp3j4I2xB.png?link=true)

Clearly, something amazing is happening here. But what, exactly? There are six things that are most important, which any type of business can learn from:

## The 6 Reasons Snowflake rules at NDR

Recall back to the formula for net dollar retention:
*Existing Annual Recurring Revenue + Expansion - Downgrades - Churn / Existing ARR *
The key to this model working is expanding existing customer revenue and keeping churn to an absolute minimum. A good SaaS business will have one or two ways to make this happen. Snowflake has SIX.
**The Stuff Just Works, Man**
I can’t emphasize this enough—Snowflake is *fast*. The first time I saw it was at a company-wide meeting of a startup I was working at. The data engineer showing off his new tool ran a query that used to take 30 minutes to process. On Snowflake, it happened in 10 seconds. The entire company’s jaws dropped and people chortled in disbelief. It was one of the most dramatic improvements I’ve ever seen. And that was only on the analysis side! They also offer significant advantages on the storage side which we haven’t had time to fully address today. Net Revenue Retention is reliant on customers actually thinking your product works. Snowflake’s technology is innovative and powerful. Even if they had all of their other tricks, having an incredible product is the baseline for strong NDR.
Note*: You might be wondering, “What makes Snowflake so fast, Evan??” Honestly I don’t know. Ask a computer scientist.  *
**Making Data Accessible to The Entire Org **
To add more expansion revenue, you need to either add more users, sell more products, or raise prices. The difficulty with adding more users is that usually, you can only serve a certain percentage of the company. Marketers don’t need access to Engineering tools, Sales don’t need Design, etc.  Snowflake skirts this problem by having its tool available for a universal skillset. Knowing how to use SQL is something that is necessary in almost every function at a company. By centralizing all data and using SQL to get access to it, Snowflake empowers anyone in the company to answer questions. Their per-company TAM is basically anyone who can do math.
**Aligned, Usage Based Pricing**
If Snowflake had done the typical SaaS thing and priced per seat, then the SQL advantage would’ve been squandered. Companies would be perversely incentivized around data access. Instead, they charge for data storage at cost and charge separately when a customer does a query. Because they making storing data so easy, customers just kinda throw everything in there. Even though most of the data is at rest, Snowflake still charges them, hence the vampire effect. Where they find most of their margin is the separate charges for SQL queries. With SQL making all data available to anyone with access, query usage grows dramatically within companies. Good pricing is driven by directly aligning the amount you charge with the amount of value customers see from the product.
**Being a Strategic Neutral**
The cloud is generally considered to be the way that technology infrastructure should be run. (Note: *There is a counter-argument against cloud reliance being discussed *[right now by a16z](https://a16z.com/2021/05/27/cost-of-cloud-paradox-market-cap-cloud-lifecycle-scale-growth-repatriation-optimization/).) Companies generally have to choose between Google, Amazon, or Microsoft. However, there are a ton of downsides to this choice. Once you start building on one company's infrastructure, it is enormously difficult *and* expensive to switch. Companies are afraid to give up all their negotiating power to vendors. Additionally, the vendors for cloud computing are the biggest, scariest companies on the planet. They will beat you up, take your revenue, destroy your business, and spit on your grandma’s grave if the mood strikes them. They should be held at arm's length. Snowflake is a multi-cloud platform, meaning it is built on top of all these different providers, allowing none of them to hold an axe over your head. Snowflake is just a SaaS tool. They aren’t a retailer, TV company, grocer, freight provider, or any of the other 90 businesses that Amazon is. Companies are hesitant to leave Snowflake and commit to another cloud provider, and in so doing, give more power to a potential competitor. This power dynamic helps keep churn low, keeping customers sticking around because they don’t have a ton of other good options.
**Organizational Molasses**
To pipe in all the data your org has into a warehouse is very, very hard. It is a huge process that can take a mountain of time and effort. Normally, this could be a deal killer! Or at least a deal slower. However, when your choice is doing that process with either Amazon or Snowflake, it becomes more palatable to accept Snowflake’s help. In their Q4 earnings call their CFO stated, “If you're doing a legacy migration, it can take customers six months-plus before we start to recognize any consumption revenue from those customers because they're doing the data migration. And what we find is—so they consume very little in the first six months and then in the remaining six months, they've consumed their entire contract they have. And when we do a renewal, that's when most customers are doing the multiyear renewals once they've proven the use case on Snowflake."
Snowflake keeps their NDR high by—counterintuitively!—being hard to implement. No one wants to go through that process again. And once you’ve committed all the work, you may as well get use out of it! This also acts as a way to keep churn low.
**Two-Sided Marketplace Network Effects **
Once you put all of your data onto the Snowflake Data Cloud, you can make it easily accessible to parties outside of your company. Let me say that again. The data you *used *to not even be able to access yourself you can now sell to outside providers. If you end up buying data, you can run analysis on it in conjunction with your data. This is without imports. Without downloading files. It is all happening in the same environment.  The more businesses that start doing this, the more valuable the Data Cloud becomes. It is a fairly textbook case of network effects. This unique, unreplicable offering acts as another way to increase usage and decrease churn.
Snowflake is a remarkable company. Their best of class NRR has set the bar for all other companies to reach. Of course reading about what they do versus executing their playbook is incredibly difficult. Each of their benefits could also be a reason that a normal company would die. When you are building your product using a service from a company that is your greatest competitor, have a multi-month implementation process, and need to invent highly difficult technology, most companies would fail. Not Snowflake. Instead, the company has executed with excellence. If you are looking for the quickest of takeaways to also have stellar NDR: build something amazing, sell it to large customers, and introduce as many forms of lock-in as you can.
If you want more deep dives into the strategies, stories, and metrics behind the world’s most successful businesses, hit the subscribe button below.

[Subscribe](https://every.to/subscribe?hash=%recipient.hash%)

-e
