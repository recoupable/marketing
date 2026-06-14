---
title: "How to Design Software With Weight"
subtitle: "A look at the design principles that guided our smart dictation app from desktop to iPhone"
author: "Lucas Fischer, Daniel Rodrigues"
date: 2026-02-26
column: source-code
url: https://every.to/source-code/how-to-design-software-with-weight
paywalled: true
scraped_at: 2026-06-11T16:07:22.399Z
---

# How to Design Software With Weight

*A look at the design principles that guided our smart dictation app from desktop to iPhone*

*TL;DR:**** ****Design has always been core to what we do at Every—it’s a big part of what makes our products feel like ours. ****Daniel Rodrigues**** is Every’s senior designer, and ****Lucas Fischer**** is the design engineer who helped bring our smart dictation app ****[Monologue](https://monologue.to)**** to iOS. This is their first time writing for us, and they’re pulling back the curtain on the design process: studying vintage radios, crouching beside light switches to understand how shadows move, and exploring 20 wrong keyboard concepts to find one right one. If you’ve ever wondered what it takes to make software feel like something you could reach out and touch, this is your read.—[Kate Lee](https://every.to/@kate_1767)*

---

While designing the [iOS app](https://apps.apple.com/us/app/monologue-smart-dictation/id6755956193) for Every’s smart dictation app **[Monologue](https://www.monologue.to/)**, I **([Daniel Rodrigues](https://x.com/darustudio)**, Every’s senior designer**) **did a lot of things I didn’t expect. I studied vintage radios. Design engineer **[Lucas Fischer](https://lucas.love/)** and I worked with a musician to craft the sound a button makes when you tap it. And at one point in January, I found myself crouched beside a light switch in my apartment, pressing it on and off, watching how the shadow moved. I needed to understand how a real button catches light to make a fake one feel real.

Until recently, [Monologue](https://www.monologue.to/) only lived on Mac desktops. A week ago, [we brought it](https://every.to/on-every/introducing-monologue-for-ios) where most people do their typing: their phones. The app is deliberately sparse—few buttons and a restrained color palette—but each element is designed to feel like something you could reach out and touch, like the light switch on the wall.

What follows is an inside look at the design principles and engineering decisions that we used to make a few buttons on a screen feel like something more.

### Decide where quality matters most

I designed [Monologue’s desktop app for Mac](https://every.to/on-every/introducing-monologue-effortless-voice-dictation) with its general manager, **[Naveen Naidu](https://every.to/@naveen_6804)**, in September 2025, so I had an established design language to work from: a love letter to how using tech devices used to feel, with a black-and-white palette and a nostalgic 1990s vibe that resonates with millennials and Generation Z’s pining for the good old days of tech.

The main difference in designing Monologue for iOS was creating an experience that looked—and felt—good on a much smaller screen. This constraint made the work easier because it pushed us to keep the interface minimal and clean while still infusing it with character.

Before I opened Figma, the key design tool I use, the most important decision was figuring out where to focus my energy. Three things stood out: the onboarding flow, the keyboard, and a recorder for long-form notes.

[![The three screens we spent the most time on (left to right): the onboarding flow, keyboard, and recorder for long-form notes. (Source: Daniel Rodrigues.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_6ec3b870-046a-432f-9b97-454170a3503f.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_6ec3b870-046a-432f-9b97-454170a3503f.png)
*The three screens we spent the most time on (left to right): the onboarding flow, keyboard, and recorder for long-form notes. (Source: Daniel Rodrigues.)*

The onboarding is a user’s first contact with the app, and we wanted that moment to be a delightful one. The keyboard is what appears when you hit record with Monologue inside any app—it replaces your standard typing keyboard with one that transcribes your voice. The notes recorder is for longer, more open-ended capture, the place you’d go when inspiration about a side project strikes on a walk, and you need to get it down somewhere, stat. The keyboard and notes recorder are the screens users would use every day, the ones they’d remember.

Everything else—the screen that shows statistics like words dictated and time saved, or the dictionary feature where you can add your own vocabulary to improve transcription—was a translation of what we’d already built on Mac. Important, but not where a user’s heart would be won (or lost).

### Let failed concepts clarify direction

Once I knew where to focus, my first step was abundantly—some might even say wastefully—exploratory. For the keyboard, I ran an internal “keyboard competition” getting input from our creative director **[Lucas Crespo](https://every.to/@lucascrespo)**, Naveen, and Lucas: I designed around 20 different concepts in Figma, knowing full well that most weren’t quite right. Those wrong answers were in no way a wasted effort. When you’re trying to define what you want, it helps enormously to have a clear visual understanding of what you *don’t* want.

[![A few of the contenders in our internal keyboard competition for the iOS app. (Source: Daniel Rodrigues.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_eeca0af5-4b97-4e90-b6f0-15871e94c18a.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_eeca0af5-4b97-4e90-b6f0-15871e94c18a.png)
*A few of the contenders in our internal keyboard competition for the iOS app. (Source: Daniel Rodrigues.)*

From those 20 concepts, we narrowed our options down to about five strong candidates, then started combining elements from each: the button proportions from one, a typographic treatment from another, a specific approach to shadow and depth from a third. The final keyboard design that made it into the app was assembled from the best fragments that survived this process.

[PAYWALL]
