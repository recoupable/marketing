---
title: "5 interesting strategy decisions from WWDC"
subtitle: "Decoding Apple's intentions"
author: "Nathan Baschez"
date: 2020-06-22
column: divinations
url: https://every.to/divinations/5-interesting-strategy-decisions-578795
paywalled: false
scraped_at: 2026-06-11T16:09:26.626Z
---

# 5 interesting strategy decisions from WWDC

*Decoding Apple's intentions*

When Apple introduces a new feature in a keynote presentation, they usually explain it using an admirably consistent three-part structure:

1. Problem

2. Solution

3. How it works

But, for those of us interested in strategy, there’s more to the story. Businesses don’t *just *do things because they’re good for the consumer. They also do things in order to enhance profitability, accelerate growth, and deepen competitive moats.

I like to imagine that every new feature announced today, when originally pitched to some manager inside Apple, had a fourth standard part of the story:

1. Strategic rationale

We’re not going to hear about that kind of thing in a WWDC keynote, but it’s there in the background, animating all their decisions. I personally find them quite fun to deduce :)

From this perspective, some features that are really interesting to me as a user turn out to be kind of boring to me as a strategist. And the inverse is true too: some seemingly boring features turn out to be quite important to Apple’s strategy.

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_dba5d0ee-97fc-4514-936a-add0cf826191_1600x1253.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_dba5d0ee-97fc-4514-936a-add0cf826191_1600x1253.png)

So, without further adieu, let’s roll through the top five most interesting decisions announced today from the *strategic *perspective.

## 1. ARM Macs

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_e8756114-d7e9-4acf-8a3c-379230971571_1600x885.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_e8756114-d7e9-4acf-8a3c-379230971571_1600x885.png)

“When we make bold changes, it’s for one simple yet powerful reason: so we can make much better products.”

Tim Cook said this today, and I don’t doubt it’s mostly true. But also, it doesn’t hurt that this move gives Apple the ability to bypass Intel’s large profit margins, exert greater control over their own destiny, and consolidate their entire device ecosystem around a unified processor architecture.

From the user’s perspective, ARM Macs will be nearly indistinguishable from Intel Macs. They’ll just be a bit faster and get better battery life. Oh, and you’ll be able to run iOS apps on your laptop. But there’s not much interesting from a product perspective here.

From Apple’s perspective, though, this transition is huge. They’re moving from a world where they pay Intel ~$300 per chip, and give up control of R&D direction, to a world where they pay TSMC to ~$30, and own the entire R&D process. Sure, there’s a lot of fixed R&D costs not accounted for in that $30, but much of the cost can be shared between teams developing chips for iPhones, iPads, and Macs.

What will Apple do with all that extra margin? Keep it? Or reinvest in other enhancements to the Mac that keep their unit economics roughly the same?

## 2. App Clips

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_b826da4c-dfc6-42a6-8796-fe3fa298dc78_1600x888.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_b826da4c-dfc6-42a6-8796-fe3fa298dc78_1600x888.png)

My first reaction to App Clips was “why aren’t these just webpages?”

If I walk up to a parking spot I want to use, it is indeed annoying that I have to download an app in order to pay for it. Nobody wants to download an app they don’t anticipate using on a regular basis!

But there is an elegant existing solution to this: web pages.

Of course, the App Clip experience looks much more fast and beautiful than visiting a web page through some sort of QR code. But why didn’t Apple make a really great webpage loading experience?

It’s for the same reasons they don’t make progressive web apps (PWAs) a thing: it works *against *their moat, and it’s arguably a worse user experience.

From Apple’s perspective, it’s best for users to have a tightly controlled experience. The more that flows through App Review the better. And not for purely malicious reasons. Anyone remember how crappy it was to use a Windows PC in the late 90s / early 2000’s? All that malware and junk? We don’t worry about that one bit on our phones, and that is all thanks to App Review.

App Clips are Apple’s attempt to convert a bit more activity that would have happened on the open web into their controlled ecosystem.

## 3. Car Key

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_3208cda2-67dc-40c4-983a-a723267c2de7_1600x892.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_3208cda2-67dc-40c4-983a-a723267c2de7_1600x892.png)

My wife and I don’t own a car. But we do rent them from time to time, and every time we do, we make sure it has CarPlay. It’s literally the only thing we care about, other than decent gas mileage.

And so it dawned on me: cars are now just expensive iPhone accessories.

It sounds extreme, but think about it. If you’re an Apple user, are you more likely to switch from one CarPlay-enabled car to another, or to switch to Android?

It hasn’t been an overnight success. Apple launched CarPlay in 2013, and it required a lot of cajoling to get automakers to introduce competition to their own in-car operating systems that they sunk millions into, but Apple has clearly won. 97% of new cars in the US are CarPlay compatible.

Replacing the car key is the next logical step.

This is great for Apple, even if they earn $0 from car sales, because it routes an ever-increasing percentage of our daily life through their ecosystem.

## 4. Sign in with Apple for existing users

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_7319d26b-7765-420b-8dd1-cf6a4f035f57_1600x892.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_7319d26b-7765-420b-8dd1-cf6a4f035f57_1600x892.png)

Until now if you wanted to use “Sign in with Apple” you could only do it if you created a new account. But most of the time people use the same apps they’ve been using for years. So there wasn’t much utility to “Sign in with Apple” for this use case.

Until now. In the next iOS, apps will be able to let users add “Sign in with Apple” as a login option even after they already created an account some other way.

Of course, if you’re a big developer like Facebook or Google you’re not going to implement this. You’re going to use your own account system. You don’t want to give up that sort of control to Apple.

But many other app developers might think the [trade-off](https://every.to/divinations/trade-offs-are-your-friend-208594) between control and friction is worth it for them. And maybe Apple will require them to support it if they use other login options, the same way they do when users create new accounts. So maybe they’ll have no choice.

Either way, this is an incremental but important move to keep Apple in the middle of the relationship between users and developers. It makes it that much harder to switch to Android when your login info is tied to Apple.

## 5. Privacy nutrition labels

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_03fc8fba-21dc-4c49-92ba-c2d987e12474_1600x895.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1080/optimized_03fc8fba-21dc-4c49-92ba-c2d987e12474_1600x895.png)

Nobody reads privacy policies.

And developers have no incentive to get people to read them, because it would only slow them down and cause some people to potentially fall out of the funnel.

And because nobody reads them, developers have an incentive to make their privacy policies as expansive as possible, that way they don’t need to update it if they want to start tracking or using data they didn’t previously do.

So you end up in a world where nobody is really pushing for privacy, and users eventually revolt.

Apple is using their power to force developers to describe exactly how their data will be used in a simple format, like a nutrition label for privacy. This information will go on every App Store page.

The strategy here is to prioritize users’ needs over developers. In Apple’s word, they come first, users come second, and developers come third.

This is the philosophy that explains their decision to force more apps to use In-App Payments. You could look at it as a totally craven ploy to extract 30% of revenue from developers, and that’s part of the story. But also In-App Payments reduces fraud by putting Apple in the middle of the transaction, taking some control out of developer’s hands and putting it into Apple’s.

Of course developers hate this, and feel entitled to control. But they didn’t make the iPhone. And a world where the iPhone is a total free-for-all wouldn’t be a good one, either.

But that’s a bigger story. More on that later this week :)
