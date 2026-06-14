---
title: "The Race for New Payment Rails"
subtitle: "Who is building the next Visa?"
author: "Reggie Young"
date: 2022-04-13
column: napkin-math
url: https://every.to/napkin-math/the-race-for-new-payment-rails
paywalled: false
scraped_at: 2026-06-11T16:08:40.499Z
---

# The Race for New Payment Rails

*Who is building the next Visa?*

#### Sponsored By: Flatfile

Your team is wasting days or even weeks trying to import customer data, which is typically unstructured and filled with validation errors. The result? A poor customer onboarding experience, and wasting countless hours on wrangling spreadsheets.

**Enter **[Flatfile](https://flatfile.com/return-on-investment/?utm_source=partner&utm_medium=email&utm_campaign=everyto-sponsored-email-napkinmath_q1-2022-flatfile-promotion-april-1&utm_content=traffic&utm_term=worlds-best_tofu_variant-1_header)**.**

Onboard customers faster, decrease time-to-value, and slash churn with [Flatfile](https://flatfile.com/return-on-investment/?utm_source=partner&utm_medium=email&utm_campaign=everyto-sponsored-email-napkinmath_q1-2022-flatfile-promotion-april-1&utm_content=traffic&utm_term=worlds-best_tofu_variant-1_header), a data onboarding platform with HIPAA, GDPR, SOC II Type II compliance out the box.

- Import customer data in as little as 60 seconds.

- Free your team from cleaning spreadsheets for hours.

- Provide a world-class data onboarding experience.

Since launching in 2018, Flatfile has onboarded data for over 2.2 million customers spanning 400+ of the best companies around the world. In just a few clicks, Flatfile intelligently imports, transforms, and validates your customers’ data, solving the most critical part of onboarding, in seconds.

[View the Platform](https://flatfile.com/return-on-investment/?utm_source=partner&utm_medium=email&utm_campaign=everyto-sponsored-email-napkinmath_q1-2022-flatfile-promotion-april-1&utm_content=traffic&utm_term=worlds-best_tofu_variant-1_header)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#84f7f4ebeaf7ebf6f7ecedf4f7c4e1f2e1f6fdaaf0eb).

*Hey y’all! I have a special guest writer publishing to the list today—Reggie Young. He is writing about how new payment rails might be built and which companies have the best chance of succeeding. Reggie normally writes at *[FinTech Law TL;DR](https://fintechtldr.substack.com/)*, which explains top legal/regulatory news in fintech, written for non-lawyers. He also works as product counsel at *[Lithic](https://lithic.com/)*, where they’re building an API for businesses that want to use cards to send $$, spend $$, or sponsor their own card program. You can connect with him on Twitter *[@ReggieCYoung](https://twitter.com/ReggieCYoung)* or *[subscribe to his newsletter](https://fintechtldr.substack.com/)*. *

---

In the pursuit of yachts, CEOs tend to go after markets where they can make lots of money. An obvious target is, well, markets with lots of money in them. In the current tech landscape, the yacht/market of the moment is payments.
The payments industry is pretty massive. Within it, there are five modalities that currently matter for moving money in the US: cash, check, ACH, wires, and cards.
Just one of those methods handles a gobsmacking amount of money. The two main card networks, Visa and Mastercard, handled $[10.4](https://s29.q4cdn.com/385744025/files/doc_downloads/Visa-Inc_-Fiscal-2021-Annual-Report.pdf) and $[7.7](https://s25.q4cdn.com/479285134/files/doc_financials/2021/ar/2021-Annual-Report-NO-EMAIL-ALERTS.pdf) *trillion*** **in global payments volume during their 2021 fiscal years, respectively, and earned $24 and $19 *billion *in fees.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_byrvVsikzBNrqsmuE2T0lkv2Qi_A89TB0yiDXie2A8Mm4MfBmfkmhSaFIIwKM737RbueYfzxZVPxAgMzPdJo4RvghPWogzQGverk2YSW9VhCx8dDWFXvzeMjFZKzAsErecpPed8G.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_byrvVsikzBNrqsmuE2T0lkv2Qi_A89TB0yiDXie2A8Mm4MfBmfkmhSaFIIwKM737RbueYfzxZVPxAgMzPdJo4RvghPWogzQGverk2YSW9VhCx8dDWFXvzeMjFZKzAsErecpPed8G.png?link=true)
[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_NwIgYBw5zPMqaplBkwFrreQ1iX2n24wUWJYCGJd6DFefPpIxDNAZCUW_fKMq77OjZlA8rt-aA5i5SrD1qHLi-EJWOE3aw1STVkwWncWPzYWUJTkkM3y3McjsvoHSoK56k-Vzg19B.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_NwIgYBw5zPMqaplBkwFrreQ1iX2n24wUWJYCGJd6DFefPpIxDNAZCUW_fKMq77OjZlA8rt-aA5i5SrD1qHLi-EJWOE3aw1STVkwWncWPzYWUJTkkM3y3McjsvoHSoK56k-Vzg19B.png?link=true)

*Fewer transactions are sent via wire, but wire has the biggest average transaction size.*
If a tech company can build another payment method (or “rail,” as we call it), it can take market share from the card networks and other existing payment methods, and potentially even enable and capture new payments that aren’t currently happening. And that’s why folks in fintech see becoming the next payment rail as the holy grail.
To give you an idea of scale, Visa’s market cap ranges $400-500B right now. And cards only process a fraction of payments; [Glenbrook](https://www.amazon.com/Payments-Systems-U-S-Third-Professional-ebook/dp/B074PB7T1K/ref=sr_1_1?crid=3425ZFUSCIAYN&keywords=glenbrook+payments&qid=1646754427&sprefix=glenbrook+ayment%2Caps%2C140&sr=8-1) estimates that cards only processed around 7.4% of all 2015 US payment volume. The potential is *staggering*.
This piece is about how to pick apart what’s needed to become a payment rail. But the questions and process apply beyond fintech to any network. We’ll start by walking through the capabilities you need and then apply them to a few case studies of bigger players (Square, Stripe, PayPal, and Walmart).  And as you’ll see, there’s at least one big fintech, Stripe, that’s not as well-positioned as most folks think. Given how lucrative being a payment rail—or any network—can be, you’ll walk away with a better sense of what to look for when building your own network, sizing up investment opportunities, or wherever else networks may come up.

### Tactics & Capabilities

There are *tactics*, which focus on solving the chicken-or-egg problem inherent in creating a network. Like how Visa (originally BankAmericard) kickstarted its network by mailing 60,000 ready-to-use cards to Fresno residents. That made it easier for Visa to get businesses on board because, well, there were already tens of thousands of cardholders.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_8vuAS2ao0CAxKwopxgfvxtF_4tSQc_KA6WCpV6hi53f8QJDSWpDHbml1MQdZt1DG6_KfDKpQYa30ov0NFOBGqwYqEAcLVWLtEI4yEH020FNjoLqnJvbl0p_IU2OIjeDJQy0KAs9n.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_8vuAS2ao0CAxKwopxgfvxtF_4tSQc_KA6WCpV6hi53f8QJDSWpDHbml1MQdZt1DG6_KfDKpQYa30ov0NFOBGqwYqEAcLVWLtEI4yEH020FNjoLqnJvbl0p_IU2OIjeDJQy0KAs9n.jpeg?link=true)

Most conversations about networks focus on those tactics (see, e.g., Andrew Chen’s book [The Cold Start Problem](https://every.to/divinations/the-three-systems-beneath-network-effects)).
But tactics aren’t worth much if you don’t have the necessary *capabilities*. What I mean here is the functional capacity to meet the bare minimum market needs. For example, you can’t start a rental car company without cars. If you’re a startup with all tactics and no capabilities, your “tactics” are actually just donating venture capital money to AWS and Google Ads. So let’s run through some case studies on who has the capabilities to build the next payment rail.

### MVCs

When trying to determine a network’s needed capabilities, the easiest way is to ask: *who needs what, when, where, and how? *
What and when are easy here: money and whenever I want to send it. But who’s involved? And where?
You. Me. Individuals. Consumers. We need to send money to other people. But we also need to pay for happy hour, or the newest pair of Yeezys. Which means sending money to a business. And businesses need to send money to each other for, say, supplies. So for the “who” question, we’ve got consumers and businesses as payment rail users.
But *where* do they need to pay? You pay for that happy hour *in person*. But you’re probably paying for those Yeezys *online*.
So we end up with “consumer + commercial” and “online + in person.” There are some other capabilities that help. Geography, for example; the more countries someone can use your rails in, the more useful it’ll be. Or trust; the more you build trust with users, the more likely they’ll use your rails.
But the consumer/commercial + online/in-person vectors are the *minimum viable capabilities* for a new payment rail. If you don’t have those, your network can’t start.
But not all capabilities are created equal. So let’s run through a few case studies to suss out which capabilities (or quadrants in the grid below) are the best wedges to start from.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.28.59%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.28.59%20AM.png)

### Stripe

A great way to start digging into our quadrants some more is by looking at the company some consider to be fintech’s version of The Godfather. Y’know. Stripe. The private fintech [valued at $95B](https://www.bloomberg.com/news/articles/2021-03-14/stripe-raises-600-million-valuing-company-at-95-billion). They’ve gotta be a contender, right?
Stripe is an online-payments focused company. Here’s a glimpse at some relevant Stripe products:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.30.10%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.30.10%20AM.png)

As wild as it may seem, this isn’t even half of their total available products. But the ones above are some of their most important:

-
**Payments**: Their original product, an API that lets businesses accept payments online.

-
**Issuing**: An API that lets businesses create virtual or physical cards. Issuing is hard to grok in the abstract, but we’re building something similar at Lithic so here are some examples based on what I see: you want to build an online bank that offers debit cards, you want to send insurance payouts fast via cards, or you want to split a single purchase across other cards.

-
**Terminal**: Hardware that lets businesses accept payments in person.

Stripe’s grid shows us they’re heavily on the business side, and lean towards the “online-business” quadrant. This makes sense; their [mission statement](https://stripe.com/about) is “to increase the GDP of the internet.”
Their card issuing product is the main way they interact with consumers. But there’s a problem with Stripe Issuing as a network capability. (We’ll get to that in a second)

### Square

What about Square? While Stripe was created to make it easier for businesses to accept payments online, Square was founded to give businesses an easy way to accept payments in person. But they’ve expanded so that about [half of their 2021 gross profit](https://s29.q4cdn.com/628966176/files/doc_financials/2021/q4/Block-Investor-Presentation-December-2021.pdf) came from their consumer products.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.37.39%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.37.39%20AM.png)

Some call outs:

-
**Seller**: Hardware and software that lets businesses accept payments in person and online. Square’s original product, the Square Reader, was here. Seller also offers software to help manage a business.

-
**Cash App**: Mobile app that lets individuals send money, and lets you pay businesses for online or in-person purchases. Also includes a bank-like account and stock/crypto investing.

-
**Business Banking**: Bank accounts and loans for businesses.

-
**AfterPay**: A Buy Now, Pay Later product that lets consumers split their purchases into installments. Businesses can increase their conversion rates by offering BNPL, and promoting their products on AfterPay’s marketplace.

So what does this tell us? First, Square has the online and in-person business quadrants covered with products that let them hold money and handle transactions (Banking, Seller, Cash App, and AfterPay). But they also have online and IRL consumer offerings that let them hold money and handle transactions (Cash App, AfterPay).
Additionally, there are common threads that *can be used across all quadrants*: Cash App and After Pay. And Square knows it’s important; their [Q3 shareholder letter](https://s29.q4cdn.com/628966176/files/doc_financials/2021/q3/SQ-3Q-2021-Shareholder-Letter.pdf) specifically says they think their acquisition of AfterPay will better connect the Seller (business-focused) and Cash App (consumer-focused) ecosystems.
How does this compare to Stripe?
Stripe Issuing spans all of the quadrants. But there’s one way it doesn’t *really* check the box on the consumer side: Stripe may operate the tech, but they *don’t own the consumer relationship*.
Stripe’s customers—the ones offering the cards to consumers—own the relationship. A consumer using a card issued by Stripe likely has no idea Stripe was involved! They just think “I have a [insert neobank] card.” Stripe may have consumer-used products, but they don’t have Stripe-owned consumers.
In this sense, Stripe’s strength—a developer-friendly, API suite—is its weakness. They’ve built a company for builders, not consumers. In contrast, Square both operates the tech and owns all its relationships with consumers directly. And that’s why Stripe can’t offer new payment rails (at least, based on their current tech).

### PayPal

PayPal’s early history is a bit…complicated (see Jimmy Soni’s [The Founders](https://www.amazon.com/dp/B08BZXPTGJ/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)), but the company started out building a P2P service that quickly expanded to give eBay buyers and sellers a way to send payments online. Nowadays, online payments are still their core business, primarily via PayPal and Venmo, but they’ve tried to expand. Here’s a peek at some PayPal products:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.39.28%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.39.28%20AM.png)

-
**Venmo & PayPal**: Digital wallets that can be used P2P, B2C, and B2B, online and in-person (via QR codes).

-
**Debit, Credit & Prepaid Cards**: Cards for consumers and businesses. The debit cards are funded from PayPal or Venmo wallets.

-
**Checkout: **Lets businesses accept payment online using PayPal or Venmo.

-
**Zettle: **Hardware that lets businesses accept payments IRL.

-
**Xoom: **International money transfer for consumers.

-
**Honey**: Browser extension that applies online coupons. Used by consumers (to get discounts) and businesses (to promote their products).

What can we learn from this? PayPal has all quadrants covered. Users (consumers) can send money to friends (other consumers) or buy things from businesses online or in-person without the money ever leaving PayPal.
But there’s more to it; PayPal has common threads across all quadrants with Venmo and PayPal. This means *they functionally already have their own payment rails*; in PayPal’s 2021 fiscal year, they handled $[1.25](https://s1.q4cdn.com/633035571/files/doc_financials/2021/q4/Q4-FY-21-PayPal-Earnings-Release.pdf) *trillion *of volume (compared with Visa’s and Mastercard’s $10.4 and $7.7 trillion, respectively). Note, too, that this applies to Square, too–they have common threads across all quadrants which means they functionally have the start of a payment rail.

### Walmart

What about a company founded on in-person, consumer payment products? There are dozens you could consider (Apple, Starbucks, Costco), but let’s look at Walmart.
Walmart grew out of a physical-first business and still is one (online sales made up less than 12% of their U.S. net revenue for 2021, based on [their 10-K](https://www.corporatereport.com/walmart/2021/ar/FY21_Walmart_Form_10-K.pdf)). And it has a history of flirting with financial services; it tried to become a “light touch” bank in the mid-2000s, triggering a brouhaha that ended with the FDIC putting that bank option [on ice](https://archive.fdic.gov/view/fdic/2982) for a while.
Here’s a look at some of their financial products:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.39.28%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.39.28%20AM.png)

Let's call out a few:

-
**Prepaid Cards**: Think of prepaid cards like a bank account on a card. Walmart cardholders can reload them with cash or checks, withdraw cash, get paychecks early, and send money to other cardholders.

-
**Digital Wallets**: A Walmart digital wallet similar to Apple Pay or Google Pay, used to pay in person.

-
**One**: In early 2022, Walmart announced it’s acquiring two fintech companies to build a neobank called One that hopes to become an all-in-one financial app. While the acquisitions are still underway, it’s hard to imagine Walmart won’t offer One bank accounts and cards that cover both online and in-person needs.

-
**Business Credit Cards**: Both Walmart and Sam’s Club (owned by Walmart) offer a business credit card.

-
**Business Supplies**: Sam’s Club has a robust platform for purchasing business supplies.

-
**Clover POS**: Sam’s Club has partnered with Clover to offer special deals on Clover’s hardware that lets businesses accept in-person payments.

We can see Walmart has solid consumer payment options. But the more interesting conversation is on the business side. Sure, Walmart offers business credit cards, business supplies, and partners with Clover to offer in-person checkout hardware. But the more potent point is Walmart, as a business that needs to accept payments itself, is potentially big enough to jumpstart a payment network. Like, [over 100M](https://www.cnbc.com/2022/01/26/walmart-backed-start-up-is-acquiring-two-fintech-companies-even-and-one.html)* weekly U.S. shoppers* big.
But more than that, Walmart is a *massive* connector for business spend (via business credit cards, Sam’s Club supplier platform, and its own suppliers). It also has partnerships with companies like [Shopify](https://marketplace.walmart.com/building-on-a-successful-partnership-with-shopify/#:~:text=A%20year%20ago%2C%20we%20announced,and%20sell%20on%20Walmart%20Marketplace.) and [Affirm](https://www.affirm.com/shopping/stores/walmart) and can use its connector status to incentivize adoption of a new payment system. You can easily imagine Walmart offering a discount for suppliers that are paid via its system, for example.
But there’s one big problem.
On both consumer and business fronts, Walmart owns the consumer relationships, but hasn’t built and doesn’t own the technical capability itself. For example, its business cards are handled by a bank partner, and just branded by Walmart and Sam’s Club. This is, in effect, the opposite of the Stripe problem: Walmart owns the relationship but not the tech.

### When to Wedge

So we’re back to our original grid:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.28.59%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2123/optimized_Screen%20Shot%202022-04-14%20at%2010.28.59%20AM.png)

But which quadrant is the best to start building in? As we lawyers like to say: it depends. Let’s walk through some considerations.
**Consumer <> Business**
Starting with consumers is likely easier. The key here is that businesses tend to be driven more rationally by revenues and costs. A business needs a *very *good reason ($$$) for the distraction and time cost of adding a new payment method. But consumers are quick to join a P2P app like Venmo or Cash App for a $10 referral code from their friends or because they like the community and [culture](https://newsletter.fintechtakes.com/p/cash-app?s=r) associated with an app. And once you have that consumer base, you can give businesses better incentives for accepting your payment method. Plus, if you start with consumer, you’re less likely to fall into the Stripe trap of not owning your consumer relationship.
**Online <> In-Person**
If you start with in-person, you’ll (probably) have to implement hardware, which is harder and more expensive than software. It’s *theoretically* possible if you’ve got the funding, but the existing competitors are pretty strong (e.g. Square). And even if you have the funds, hardware is *hard*; scaling and distribution can kill you. Even companies [like Amazon](https://www.cnn.com/2020/03/10/tech/square-amazon-jim-mckelvey/index.html) have tried and failed to build payments hardware. The flip side, of course, is in-person payment hardware is a better moat if you can pull it off.
If you start with online, software is usually faster to build than hardware. So if you want to move faster with your first wedge, starting online is likely better. That said, software can be more easily mimicked than hardware.

### Who Wins?

My money’s on Square. They’ve got the capabilities, and they’re consistently finding ways to bridge the consumer and business sides. And their in-person business hardware has deeply penetrated the US for a while.
Square also agreed to pay $29B in stock for AfterPay (ultimately closing for around $13B since the market cooled off before the deal closed). You don’t shell out that kind of stock (around 25% of Square’s market cap at the time announced) unless you think an acquisition has serious upside.
Sure, PayPal already has a network. But once you have the minimum capabilities, all the other stuff starts to matter, and it’s all stuff Square is great at and PayPal less so. Like how to grow customers quickly (e.g., how Cash App [successfully blew past](https://aika.substack.com/p/cashapp-is-king?s=r) PayPal’s Venmo for downloads). Or how to use culture to supercharge the brand (see Cash App’s [clothing line](https://cash.app/cashbycashapp), Square’s [music](https://squareup.com/us/en/press/tidal) [investments](https://www.rollingstone.com/pro/news/cash-app-studios-music-movies-influencers-1240642/), and [crypto](https://cash.app/investing)). Though I admit I’m thinking US-centric here, and PayPal is still a significant cross-border payments player.
Walmart has some interesting angles but I don’t think they’ll venture much past setting up a bank because their competence is consumer-facing retail, not behind-the-scenes infrastructure. And, as we’ve talked about, Stripe’s a business that’s geared towards businesses and developers. Consumer products require a very different mindset that Stripe historically just hasn’t tried or cared about.
But it’s not a done deal. Even if Square becomes a new payment rail, payments are constantly evolving. The network features needed today may be very different from what we need in 5 years. So it’s possible a company that hasn’t even been founded yet could come to dominate payments in the next few years.

### Cross-Subsidizing Wedge

It’s also worth noting that these companies have other products that *aren’t* part of a network’s minimum viable capabilities. But they are relevant once a network is running.
For example, as a consumer using PayPal, you can get discounts via Honey. Or, as a business, you can use PayPal’s invoice management system or get loans. That all supports the ecosystems’ stickiness.
But it also provides *revenue that could cross-subsidize the cost of a payment rail* to a degree Visa and Mastercard don’t have. Business trade groups often rail (pun intended) [against Visa / Mastercard interchange fees](https://merchantspaymentscoalition.com/merchants-ad-campaign-highlights-harm-of-credit-card-swipe-fees-ahead-of-1-2-billion-increase/) since those fees can add up. Being able to cross-subsidize with other products may help convince businesses to move to your new rails via lower pricing.
In fact, according to a source of mine, Jack Dorsey supposedly used to walk around Square talking about this exact thing: let’s drive the fees small businesses have to pay for using card networks down to 0% via cross-subsidized software revenue.

### Closing Out

For starting a network, our takeaways from looking at payments are:

- Start with “who needs what when, where, and how?”

- For each answer, do you really “operate” the capability? Or are you like Walmart, just slapping your brand on others’ capabilities?

- For each answer, do you really “own” the solution? Or are you intermediated like Stripe?

- What are your strengths, resources, and near-term goals? How do they stack up against the different wedges you could start with?

[All models are wrong](https://www.lacan.upc.edu/admoreWeb/2018/05/all-models-are-wrong-but-some-are-useful-george-e-p-box/) but I hope this one gives you a stronger foundation for breaking down potential networks, whether for building your own, making investments, or whatever else.
If you want to learn more about the fast-moving regulatory stuff that shapes what fintechs can do, subscribe to [FinTech Law TL;DR](https://fintechtldr.substack.com/) or come say hi on Twitter [@ReggieCYoung](https://twitter.com/ReggieCYoung).
