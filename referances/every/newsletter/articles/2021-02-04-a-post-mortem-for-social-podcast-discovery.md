---
title: "A Post-Mortem for Social Podcast Discovery"
subtitle: "Three reasons why RSS still dominates in audio, but not text."
author: "Nathan Baschez"
date: 2021-02-04
column: divinations
url: https://every.to/divinations/a-post-mortem-for-social-podcast-discovery
paywalled: false
scraped_at: 2026-06-11T16:09:06.819Z
---

# A Post-Mortem for Social Podcast Discovery

*Three reasons why RSS still dominates in audio, but not text.*

I think a lot about how people discover content. It’s an important thing for media companies to understand, for obvious reasons. But it’s also a fascinating instance of the more general question of how distribution channels evolve over time. There’s always a tension between the network effects that keep people coming back to historically entrenched channels, and the innovative new features that pull people towards new ones.
So when I heard that Breaker (a podcast app focused on social discovery of content) was [acquired](https://techcrunch.com/2021/01/04/twitter-acquires-social-podcasting-app-breaker-team-to-help-build-twitter-spaces/) by Twitter, I was intrigued. It was an acqui-hire, so it’s logical to wonder whether something about the “social podcast discovery” thesis was wrong. Do people not want social recommendations for podcasts in the same way we seem to obsess over social recommendations for articles on Twitter and Facebook? Or is there something else keeping us attached to our current apps?
I’ve spent the last month wrestling with these questions in my spare time, and ended up forming three specific hypotheses that should be interesting to anyone who studies media.
Here’s what I got, and how I got there:

## What I believed about podcasting in 2016

Before I ever heard of Breaker, I wanted someone to build a “socially-sorted” podcast app that would help me listen to a wider variety of shows based on episode-level recommendations from friends. I even wrote a [blog post](https://medium.com/@nbashaw/who-s-building-a-social-podcast-app-9113a904514) about it in early 2016, fully convinced this future was inevitable!
Here’s the key line:
*“A decade ago, when blogging was in its infancy, geeks used RSS readers to find out about new content. Then, Facebook and Twitter came along with socially-sorted news feeds, and the RSS readers quickly died. I believe the same thing is about to happen to podcasts.”*
The post was inspired by a [tweet](https://twitter.com/pt/status/713804314301435908) from Parker Thompson, who summed it up perfectly:
*“I don’t want to inbox zero. I want to cherry pick [the] best episodes across more pods.”*
After I published the post, I heard from dozens of people working on similar apps around this time, but Breaker was the best. I loved it from the start even though the social discovery features were still nascent.

![](https://lh5.googleusercontent.com/EyTEaR1YylX-k7J-kmncDy2bc5xP-JW0oQ-_C-jsk46a7elwEZziVMcnYgT94wHiOOjFb7g1oQG1jtg7c1qHWoBXriaCDxxofC9XviPZsYImkd6_XgOG-PGL6MsCkC12MT6ocWJB)

The main feed worked basically like a normal podcast app (a list of episodes from shows you subscribed to) but with a useful twist: you could see how many “likes” each episode got from other people using the app. Useful! There was also a screen to see what episodes were most popular in the app at any given moment, user profiles showing favorite shows and episodes, and better search than any other app. I found a ton of good stuff this way, and I honestly thought it would revolutionize my relationship to podcasts.
But, gradually, as I used the product for a couple years, it became apparent that even though it was a great podcast app, the social features felt more like sprinkles than cake, or even icing. I realized I was listening to the same shows and ignoring the social recommendations. Honestly, it felt like I could switch to a regular podcast app and I wouldn’t miss much.
So what happened? I have three theories:

## 1. Audio RSS > Text RSS

Why did people migrate from RSS readers to Twitter for finding articles, but stick with RSS for podcasts? One reason is that the user experience of audio RSS is much better than the user experience of text RSS. I didn’t realize this, so I overestimated how interested people would be in switching to a new system. But now I think the audio RSS system is actually reasonably good, even though the same couldn’t be said for text. Here’s why.
With text-based websites, RSS was/is an optional step at the bottom of the funnel. You’d visit a link (via search engines, email, etc) and read an article, and if you get really into it, you might add that site to your RSS reader (if you even used one). But with podcasts, RSS is the whole thing. Podcast apps are more analogous to “web browsers for audio” than text-based RSS readers, because they are the beginning and end of pretty much all podcast discovery and consumption.
Because of this, podcast creators optimize their output to fit the constraints and capabilities of podcast apps. This is how they reach the vast majority of their audience, so their top priority is making sure it’s a good experience in RSS-based podcast apps. Everything from the length and frequency of new episodes, to the name of shows, to the design of cover art is determined by the way people will experience it in podcast apps.
The same thing wasn’t true for text publishers, even in the peak age of Google Reader. They cared more about direct traffic to their homepage, search, and word of mouth. Sure, they supported RSS, but for most publishers it was never a priority. They were (and are) happy to make decisions that helped them succeed in the channels that actually mattered to them even if it [traded-off](https://divinations.every.to/p/trade-offs-are-your-friend) with the RSS experience.
So, what happened? Publishers realized that the easiest way to grow was to publish a *ton *of stuff. This overwhelmed our RSS inboxes. Then, because they couldn’t serve programmatic ads in RSS readers, they started to send truncated previews rather than full posts. This added an extra click, and made us wait to load a webpage stuffed with ads. Not every publisher made these trade-offs, but that was mostly indie blogs, and their businesses struggled as the digital advertising market got eaten by Google and Facebook.
I distinctly remember the late 2010’s, when I realized my Google Reader was becoming a dumpster fire. It seemed like every site in my list was either publishing way too much, or not at all.
It’s no wonder we all fled to Twitter and Facebook!
There’s a general principle we can extract from this: **primary distribution channels are sticky**, because suppliers optimize their output to work best there, because that’s where all the users are. And on the demand side, the users keep going to that same primary channel, because that’s where all the suppliers tell them to go, and that’s where everything is designed to fit. It’s a classic two-sided network effect. This doesn’t just apply to content, but literally any kind of product or service.
The corollary of this is that **secondary distribution channels tend to come and go much faster**, because creators are happy to change their product to make it work better in their primary channel—even if that means making it worse in secondary channels.
In the case of podcasts, publishers only care about the experience in the RSS-based ecosystem. If they want to publish more episodes, they have to create more shows, because they don’t want to overwhelm any single feed. They wouldn’t dream of publishing truncated preview episodes in order to get users to click a link and listen somewhere else — instead they figure out creative ways to make their ads business work inside podcast apps.
So that’s one reason it was hard for a socially-sorted feed to displace RSS in audio. The experience is already pretty good, so it’s hard to create a significant improvement.
Ultimately, this is an argument about path dependence. But that’s not the only force at work here. I’ve now come to believe that there’s another, deeper reason we’re not so attracted to socially-driven podcast discovery—one that’s inherent in the medium of audio.

## 2. Audio has a small “dunbar’s number”

Just like we can only maintain so many social relationships, we can only listen to so many podcasts. It’s not just about time—it’s about our ability to hold multiple voices in our head at once.
This isn’t just something I made up. According to Edison Research, [86% of podcast listeners](http://www.edisonresearch.com/wp-content/uploads/2019/04/Edison-Research-Podcast-Consumer-2019.pdf) in the US listen to 1–10 podcasts, and only 14% listen to more than 10. Compare that to how many different publications (or, perhaps more appropriately, authors) you might read articles from in a given week? I’m guessing that number is a lot higher.
If you had shown me that podcast statistic back in 2016, I would have thought that a social podcast app could dramatically widen the set of podcasts the average person listens to. Not necessarily that they’d spend more time listening, but that their listening behavior would be less monogamous. But now I think there’s something deeper going on that makes podcasts so sticky.
It all starts with the job to be done. Why do people listen to podcasts? If you ask people, they’ll tell you they want to learn things and be entertained. But if you observe their behavior (and reflect on your own) I think a more primary driver is to develop “relationships” with interesting personalities. The more time you spend with a show, the more you accumulate references, inside jokes, and positive associations. When you return to the show it’s like returning to a familiar place — it feels good.
In economic terms, the way to describe this phenomena is “increasing marginal utility”—the more episodes of a show you consume, the more value-per-episode you get. This is a somewhat rare phenomenon. In economics class we learned that most products have decreasing marginal utility. For example, if you’re thirsty, the first glass of water is a lot more valuable than the second. But in the case of podcasts, you’re likely to get more utility from the second episode of a show you listen to than the first. This creates a natural [switching cost](https://divinations.every.to/p/why-content-is-king), and is what explains the monogamy of podcasting.
So, what does this mean? Even if there’s a podcast app that does a great job of surfacing a bunch of new, seemingly great stuff, I’m still likely to keep coming back to my favorite shows.
Text is different. Sure, some types of text (like newsletters) are somewhat podcast-like in their functionality, and have a low dunbar number. But there’s a lot out there that’s more utilitarian and is not about building a relationship with an author. (Breaking news, explainers, etc.)
Of course this is not an absolute thing. I listen to one-off episodes at the recommendation of a friend, every once in a while. I also keep returning to the same set of favorite writers. My argument is not binary. Rather, these are reasons why a social discovery mechanism for podcasts is *relatively less *useful than it was for text articles.
But besides the path-dependence of RSS and the low Dunbar’s number of audio, there’s another important distinction that I was totally unaware of in 2016...

## 3. Twitter is not Goodreads

Link sharing is an important part of Twitter, Facebook, and Reddit—but by no means is it the most important part. It’s a mistake to think that article discovery is their main use. Instead, the real purpose is to let people *talk to each other*.
A podcast app that recommends episodes based on what my friends are listening to has more in common with Goodreads and Rotten Tomatoes than Twitter and Facebook. It’s a social content recommendation system, not a social network. There’s a big difference between having a conversation about an article with the link attached as a reference, and a site that shows me articles I might want to read.
Perhaps the closest analog of Breaker in the text world was Nuzzel, which had a lot of usage, but not in the same league as a social network. It was [acquired](https://blog.nuzzel.com/scroll-is-acquiring-nuzzel/) in 2019 by Scroll for an undisclosed price. (I would guess 7-figures, or not much more.) Nuzzel used to be an awesome app that I used religiously, but ultimately succumbed to “death by growth hacking.” I suspect they introduced all those ruinous growth hacks because they hit a natural growth [ceiling](http://www.eugenewei.com/blog/2018/5/21/invisible-asymptotes).
For some reason these kinds of content recommendation apps seem to have limited appeal. Even if they’re useful and reasonably successful, they don’t tend to be indispensable or ubiquitous. I think it’s because people don’t seek out recommendations for more content as often as they want to talk to friends? Also, importantly, you can’t get the content on Twitter anywhere else. But I don’t need to use Goodreads to enjoy books.
Podcast apps have that same problem. You can get all the podcasts in pretty much every podcast app, so it’s hard for them to stand out. This gives default apps like Apple’s a huge advantage.
This explains why so many podcast apps are trying to get exclusive content. Luminary, Spotify, Amazon, and now [perhaps](https://www.theinformation.com/articles/apple-plans-podcasting-subscription-service-in-threat-to-spotify) Apple are hoping exclusive content will create more “indispensability.” Even Breaker dipped their toes in the water! If in 2016, everybody thought the future of podcasts looked like Twitter, in 2021 people think it might look more like Netflix.
They might be right. But as for me, I’ve got a lot more humility this time around. Before I register any predictions, I’ll need to think it through a bit longer :)
