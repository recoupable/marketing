---
title: "Vibe Check: o3 Is Here—And It’s Great"
subtitle: "The highest praise I can give is that I’m already using it all the time"
author: "Dan Shipper"
date: 2025-04-16
column: vibe-check
url: https://every.to/vibe-check/vibe-check-o3-is-out-and-it-s-great
paywalled: false
scraped_at: 2026-06-11T16:07:45.502Z
---

# Vibe Check: o3 Is Here—And It’s Great

*The highest praise I can give is that I’m already using it all the time*

*Looking for the next episode of *[AI & I](https://every.to/podcast)*? We'll be back with a new one tomorrow.*
*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

One of the pleasures of this job is that I get to try new AI models before they come out.
One of the weirdnesses of this job is that if they’re not good, it’s awkward.
It’s like your date making you try her shrimp-raisin risotto. You yeet it into your napkin, as politely as possible, and then, catching her eye, marionette your mouth into a smile.
You’re rooting for it, but you have to be honest if you hate it.
Luckily, my experience with [o3](https://every.to/c/ai-frontiers)—the newest reasoning model from OpenAI and [launching publicly](https://www.youtube.com/watch?v=sq8GBPUb3rk) today—is pretty much 100 percent pleasure, 0 percent awkward.
It’s a great model. In just the last week, it flagged every single time I sidestepped conflict in my meeting transcripts, spun up a bite‑size ML course it pings me about every morning, found a stroller brand from one blurry photo, coded a new custom AI benchmark, and X‑rayed an Annie Dillard classic for writing tricks I’d never noticed before. It even analyzed Every’s org chart to tell me what we’ll be good at shipping, and what our weaknesses are.
Here’s the quick low-down:

-
**It’s agentic.** Someone at OpenAI referred to o3 as [deep research](https://every.to/chain-of-thought/we-tried-openai-s-new-deep-research-here-s-what-we-found)-lite to me, and that’s exactly what it is. Set it to do a task, and come back in 30 seconds or three minutes and get a thorough answer. It can use tools like web search, [code interpreter](https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance), reminders, and memory in a loop so you can have it code complex features, answer tricky research queries over long documents, or even build you a course that it reminds you to take every day.

-
**It’s fast.** Speed is a dimension of intelligence. Maybe your model can unify physics, but if it doesn’t happen in this lifetime I don’t care. In my testing, o3 was consistently faster than Anthropic’s and Google’s frontline reasoning models ([3.7 Sonnet](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code) and Gemini 2.5 Pro, respectively) on this dimension. It feels *smooth*.

-
**It’s *very* smart.*** *I don’t have access to benchmarks as of this writing, but I fed it expert-level Sudoku problems and it solved them on the first try. Gemini 2.5 Pro and 3.7 Sonnet both failed.

-
**It busts some old ChatGPT limitations.** Because it’s agentic, the old rules don’t apply. You don’t have to be as wary of web search because it doesn’t summarize the first spam blog post it finds in a Google search. You can give it many files and expect coherent, complete answers—I had it read an entire book and outline it, for example. When you use it for coding it will automatically do multiple searches through the web to find up-to-date documentation, which cuts down errors a *lot*. Basically, it makes ChatGPT way more useful.

-
**It’s not as socially awkward as o1, and it’s not a try-hard like 3.7 Sonnet.** I found myself coding with it a lot this weekend, and I really liked it. It understands what you mean and does what it’s told to at high quality. It doesn’t plow ahead and try to build the Taj Mahal when you tell it to fix a bug, like Sonnet does. It also seems a little more vibe-y than other o-series models. It’s more fun to talk to; not as good a writer as [GPT 4.5](https://every.to/chain-of-thought/gpt-4-5-won-t-blow-your-mind-it-might-befriend-it-instead) (RIP) or Sonnet 3.5, but still good.

My highest compliment for o3 is that in one week, it has become my go-to model for most tasks. I still use GPT 4.5 for writing and 3.7 Sonnet for coding in Windsurf, but other than that, I’m all o3, all the time.
(OpenAI actually dropped two models today: o3 and o4‑mini, a smaller version of the next-generation o4. I’ve taken both for a spin, but because o4‑mini is primarily better at coding, I've decided to wait on reviewing it until I've had more time to use it on hard programming tasks.)
Now let’s get down to business: Use cases. You come to Every because we actually use these models every day to build stuff. I’m going to take you through what I used o3 for, so you can use it to the fullest too.

####

#### [![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/847/optimized_Screenshot%202025-04-16%20at%208.49.48%20AM.png)](https://windsurf.com/?utm_source=newsletter&utm_campaign=every)

#### Code as fast as you think

Tech moves fast. Your company should move faster. With Windsurf, you can auto-generate code while you shower, or ship a whole new feature while you make yourself breakfast. The future of coding is here—now, with an improved Tab update to autocomplete your work. [Sign up today](https://windsurf.com/?utm_source=newsletter&utm_campaign=every) and get started for free.

[Sign up for free](https://windsurf.com/?utm_source=newsletter&utm_campaign=every)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#92e1e2fdfce1fde0e1fafbe2e1d2f7e4f7e0ebbce6fd).

## Multi-step tasks like a Hollywood supersleuth

It’s a classic crime show scene: The investigators are hours behind the anti-GMO bioterrorist and frantically searching for clues. Just when it seems the bad guy will get away, the character played by a Seth Green lookalike says, “WAIT!” and pulls up grainy black-and-white security footage of the suspect leaving a farmer’s market.
“ENHANCE!” he says, and the system automatically zooms in, crops, rotates, and zooms again. Finally, in the reflection of the suspect’s wrap-around Oakleys, we see the license plate number of the lavender Prius he’s about to get into. Disaster averted; genetically-modified corn survives another day in the heartland.
I don’t know about you, but I’ve always wanted to yell, “ENHANCE!” and have a computer do something useful. Now we can. I took a picture of my piano setup and asked o3 to read the handwritten title of the song on my notebook:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_1.png)

*All images courtesy of Dan Shipper/o3.*
o3 automatically uses its tools to crop and resize the image until it gets a clear view of the notebook—and then reads the title out correctly.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_3.gif)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_3.gif)

This use case may not be the most practical, but it shows you why o3 is so powerful. It’s not just the model—it’s the model and *the built-in tools *it can use many times in a row before it returns an answer. This helps unlock its power in an obvious way, right out of the box: You can set it loose on any task and feel more confident that it will return the correct answer, not just the *first* answer that it comes up with, like previous models.
I’ve been saying for a while that we haven’t come close to using the full power of frontier models. It’s like we’ve invented jet engines, but we haven’t invented a jet. If you drop a jet engine on my doorstep, I probably wouldn’t be able to do much with it. But attach it to a plane and give me a pilot’s license… now we’re talking.
With o3 inside of ChatGPT, it finally feels like the engine and airframe have matched up.

## Agentic web search for podcast research

One of my top use cases for AI is research tasks, and o3 is an incredible research assistant.
I interviewed Kevin Kelly, the founding editor of *Wired *magazine,* *for my podcast [AI & I](https://every.to/podcast) last week. He’s one of my heroes, and I wanted to make sure the conversation went great.
As part of the interview prep, I needed to know what he’d said and written previously about AI tools, so I asked o3. In normal ChatGPT, it would do a web search to find the top link or two and confidently summarize the results for me—not that useful. Instead, o3 did multiple searches across Kelly’s personal website, X, and many other news sources before returning a comprehensive result:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_4.png)

This output is similar to what I would get with deep research—which itself is powered by a version of o3—but it’s much faster. Deep research sometimes feels like sending a probe into space. You’re going to get a good answer, but it takes 10-20 minutes, and there’s not a lot of room to course correct. By contrast, o3 will return comparable results in anywhere from 10 seconds to around five minutes, so you can do many back-and-forths with it in the time it would take a single deep research query to return.
Another example: I watched [OpenAI’s recent podcast](https://www.youtube.com/watch?v=6nJZopACRuQ) with the research team behind GPT-4.5, and they said something toward the end that caught my attention: the idea that intelligence is compression. I asked it to find that segment of the show and break it down for me:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_5.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_5.png)

It found a way to get at the video transcript and identify the point I was referring to, and gave me a detailed explanation presented in a table (it seems to love tables). Then I went down a rabbit hole with it, talking about different philosophers and scientists who have argued for and against this point, and relating it to my own writing.
You could do this with earlier models, but it wouldn’t have been nearly as comprehensive as with o3.

## Coding my own personal AI benchmark

My conversation with o3 led me to another interesting point from the OpenAI podcast: that the best way to measure a new model is by how accurately it can predict what comes next in your company's own code.
Your code doesn’t appear anywhere in public datasets, and it’s always changing, so it functions well as an unpolluted benchmark. I felt inspired by this idea, so in the same chat I decided to create a related benchmark: How well could a new model predict what would be said next in an internal Every meeting? Just a few prompts later, I had a quick and dirty benchmark.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_6.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_6.png)

It’s a little hard to interpret, but given a section of transcript, it checks to see how good each model is at predicting the next token. GPT-4.5 got it right five percent of the time, while GPT 3.5-turbo got it right 20 percent of the time. Why? That’s a story for a new piece (stay tuned).
Again, this would’ve been possible with 3.7 Sonnet in Windsurf, but o3 is a lot better at giving me what I want, quickly. And because it has built-in web search in ChatGPT, it’s less likely to use out-of-date libraries without my having to explicitly ask it to search.
But that’s not all.

## Mini-courses, every day, right in your chat history

That same OpenAI podcast turned me on to a paper about intelligence as compression and the idea of motifs in machine learning. (Motifs are recurring patterns that appear in machine learning models, similar to how chords repeat in songs.)
I didn’t want to forget about it, so I asked ChatGPT to build a short course for me to learn a little bit about it every day. It used its reminder tool to remember to send me a new nugget of information every morning:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_7.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_7.png)

But o3 isn’t just good for going down information rabbit holes—it can also tell you more about who you are.

## Predicting your future

I’ve been asking ChatGPT to predict my future since 2022, and o3 is the best at it. Combined with ChatGPT’s new memory feature, it’s incredible:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_8.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_8.png)

Not only does it come up with some really interesting predictions, it gives odds. Who knows if it’s right, but we’ll check back in a year.

## Analyze meeting transcripts for leadership analysis

One of my favorite things to use o3 for is leadership coaching. Because it’s agentic, it can read extremely long files and pull out detailed and insightful analysis. At the end of last week, I fed it a file containing transcripts from every meeting I was in over the past five days and asked for its thoughts:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_9.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_9.png)

It does an incredible job of pulling out themes, helping me understand what I’m focusing the team on and where I might be falling short by, for example, avoiding conflict. And because it can reference the exact points in the transcript where this is happening, it helps me sharpen my skills in context—a huge (and hugely expensive) lift for a traditional leadership coach.

## Analyze an org chart to decode your company’s strengths

o3 isn’t just good at helping you understand yourself. It can also help you understand your company. [Conway’s law](https://en.wikipedia.org/wiki/Conway%27s_law) says that “you ship your org chart, ” i.e., the product you make is shaped like the team that built it. But it can be hard to get an objective view of what your org chart is designed for—until now.
I asked o3 to take a look at the [team page](https://every.to/team) on our website and tell me what Every was designed for:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_10.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_10.png)

It told me we’re naturally designed to ship high-frequency, high-quality editorial output and rapidly build lightweight software experiments:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_11.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_11.png)

But that we’ll struggle to build highly scaled systems or proprietary AI models:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_12.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_12.png)

It capped off its analysis with a summary calling us “structurally wired to be an idea factory”:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_13.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_13.png)

This is indeed, exactly, what I’ve been trying to build over the years. It also nails where the company needs to grow if we want to get to the next level: a growth function and more engineering power.

## Custom YouTube playlists

The first generation of scaled internet platforms like YouTube and Facebook used AI algorithms that acted on your revealed preferences. If you clicked on a cat video, it assumed you liked cats, and served you more cats. If your 10-year-old nephew borrowed your phone and clicked on a cat video, it assumed you liked cats, and served you more cats. There was no way to explain to the algorithm what the behavior it saw actually meant, so your YouTube is wall-to-wall cats until the heat death of the universe—or until you click on a flat-earth conspiracy theory video out of morbid curiosity at 2 a.m., whichever comes first.
Algorithms based on revealed preferences tend to lean toward serving more sensational, more polarized, more conspiratorial, and sexier content—whatever makes you more likely to click. And because they were “revealed” by your behavior, they made us think that this is what people really want.
But now we can talk to algorithms—we can state our preferences. I used o3 to generate a YouTube playlist that reflects what I actually want to watch (like I said, it loves tables):

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_14.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_14.png)

Then I clicked on those videos to tell YouTube what to serve me, and voila—instant feed cleanse. I can’t tell you how good this feels. It makes my internet experience more likely to serve up content that is actually enriching and uplifting, not just what I impulsively click on.

## Read an entire book

If you’ve been reading Every for any length of time, you’ll know that Annie Dillard is my favorite writer. I’m always looking for ways to better understand how she works as a writer, and o3 gave me a lens into her most famous work that I’d never seen before.
I asked it to read her book *Pilgrim at Tinker Creek* front to back, make an outline, and point out things that people usually miss:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_15.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_15.png)

It didn’t disappoint. For example, it found that she “amputates the predicate,” meaning that she uses sentences that contain the subject without their object to emphasize moments of pure perception:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_16.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_16.png)

It also found patterns in the way she uses the sounds of words to emphasize the subject of any particular passage. It gets very specific in its analysis (for example, it says Dillard is using “liquid l-runs and soft nasals” to emphasize deliberate, careful observation), and I certainly wouldn’t take every word as gospel. But it’s crafting plausible arguments at a level of sophistication that it would take a professor of literature, or even Dillard herself, to verify:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_17.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_17.png)

If you’re a writer, or work in a creative field of any kind, this type of research assistant is wildly useful—and fun.

## Refusals—it knows more about what it doesn’t know

As compared to other models, o3 is less likely to pretend it knows something. For example, when I fed it the transcripts of all of my meetings for the week in the earlier example, I asked it how I did in a meeting with a particular venture capitalist.
But rather than give me an answer, it said it didn’t have enough information and asked me to provide it:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_18.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3553/optimized_18.png)

I thought I’d caught it in a mistake, but I realized I was the one who’d made the error: I hadn’t included the transcript of that meeting in the file I gave it.
This is an impressive development. Most models would make something up if you ask them a hard question about a really long file. It makes me more confident in its answers—it knows more about what it knows.

## The limitations

Of course, o3 is not perfect. For example, its predilection for tables is a little pathological. It makes tables to display every kind of response it can give you. Fewer tables, please.
Its agentic image recognition features are also not perfect. When I asked it to name the stroller brand, it took a few tries. It would sometimes veer off into examining the wall next to the stroller instead of the logo, and then give me a plausible but incorrect answer. It got the right answer two out of three times I tried it, though.
It also still sometimes hallucinates when it’s working with extra-long files. And it tends to get lazy when chats have been going on for many hours back and forth.
None of these, though, rise above any limitations you’ll find in other models. In fact, it’s safe to say at this point that qualitatively, o3 makes fewer mistakes. I assume these rough edges will be shaved off in further improvements to this model and in new releases.

## The verdict

This is the biggest “wow” moment I’ve had with a new OpenAI model since GPT-4. The company has successfully lengthened the leash that an AI gets in order to do its tasks. Now you can reliably let it work for minutes at a time to get higher quality answers, with no intervention.
But what makes o3 especially powerful is the integration between the model and ChatGPT. It has tools like web search, reminders, memories, and code interpreter that allow users to access more of its power with less hassle.  This is a very valuable strategic position for OpenAI to be in, one that will further its lead as [the destination chatbot](https://every.to/chain-of-thought/will-google-s-bard-be-a-destination-chatbot) of choice for this AI era.
o3 is also a lesson in the seasons of change that companies go through. For about a year after Sam Altman’s firing, OpenAI was slow to release new products, and analysts were prognosticating about its downfall.
With this release stacked on its deep research and GPT-4.5 recently, OpenAI is back on a tear.

---

***Dan Shipper**** is the cofounder and CEO of Every, where he writes the *[Chain of Thought](https://every.to/chain-of-thought)* column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at *[@danshipper](https://twitter.com/danshipper)* and on *[LinkedIn](https://www.linkedin.com/in/danshipper/)*, and Every on X at *[@every](https://twitter.com/every)* and on *[LinkedIn](https://www.linkedin.com/company/everyinc/)*.*
*We *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*. Deliver yourself from email with *[Cora](https://cora.computer/)*.*
*We also do AI training, adoption, and innovation for companies. *[Work with us](https://every.to/consulting?utm_source=emailfooter)* to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our *[referral program](https://every.getrewardful.com/signup)*.*

[Subscribe](https://every.to/subscribe)
