---
title: "PARA Part 3: RandomNote – Building an Idea Generator"
author: "Tiago Forte"
date: 2017-07-14
column: forte-labs
url: https://every.to/forte-labs/para-part-3-randomnote-building-an-540242
paywalled: false
scraped_at: 2026-06-11T16:09:40.700Z
---

# PARA Part 3: RandomNote – Building an Idea Generator

What if you could push a button and immediately be given an idea?

Not just any idea. A *good *idea. An idea relevant to your interests, your goals, and your current projects.

What if every time you pushed this button, you also made it more likely that even better ideas would be surfaced in the future?

I’ve found a way.

It started when I began thinking about ways to inject randomness into my workflow. Books like *Antifragile*, *Seeing Like a State*, and *Incomplete Nature* have given me a deep appreciation for the power of randomness to produce resilience, strength, and creativity.

But it’s difficult to program randomness, to schedule it in a neat slot in your calendar. By its very definition it seems to resist attempts at control. It lurks like a predator on the periphery of our thinking, showing up as entropy, the force we are always fighting.

In unit 6 of my online course, [Building a Second Brain](http://www.buildingasecondbrain.com/), I teach various methods of retrieving ideas from a digital note-taking program, such as Evernote. We discuss proven techniques for outlining, planning, categorizing, summarizing, searching, filtering, prioritizing, commenting on, tracking, hacking, reframing, restructuring, redesigning, and scaling up or down the scope of the notes in your collection.

But all these diverse methods have a common theme: they rely on imposing order on information to make it more legible. This gives them a common weakness: they cannot benefit from unexpected surprises, from serendipity. They all operate on the assumption that ever-increasing order will always make your ideas better.

As our world gets more complex, chaotic, and unpredictable, this assumption gets riskier and riskier. The downsides of not benefitting from randomness become ever greater. That’s because the greatest breakthroughs usually come from connections that are unexpected, unusual, and unorthodox. When we impose too much order on our ideas, it is these very connections that slip through the cracks.

Injecting *pure* randomness into your work is easy. Just do a Google search for a random word every day. Turn to a random page of the dictionary as a brainstorming exercise. Even horoscopes are a form of using random information to stimulate insights. These methods have their place.

But I wanted to make randomness a part of my *workflow*. I wanted it to be an operational, tactical tool. This requires limiting the scope: providing small nudges and constraints to increase the chance that whatever gets surfaced is relevant to my needs *right now*.

### THE SCRIPT

I worked with [Benjamin Mosior](https://medium.com/u/81e616c6fc2e) to write a script with a simple function: show me a random note from my Evernote collection. There’s long been [such a script](https://discussion.evernote.com/topic/18398-request-random-display-of-notes/?page=2#comment-290804) floating around on the Evernote forums, but with a catch: you couldn’t specify *stacks* (groupings of notebooks), only *individual* notebooks. This doesn’t work with a dynamic, responsive organizational system like I detailed in [P.A.R.A. I](https://every.to/praxis/the-para-method-a-universal-system-540221) and [II](https://every.to/praxis/para-part-2-operations-manual-540234), because your notebooks should be constantly evolving and changing. It doesn’t work to have to go modify the code every time a notebook changes, is added, or moved to archives.

There’s another reason this script won’t work with P.A.R.A.: because we’re always moving inactive notebooks to Archives (instead of deleting them), Archives quickly becomes larger than the other 3 categories combined. Using the above script and pulling from all notebooks equally, I found that 2 out of 3 randomly surfaced notes were from old, archived projects, which weren’t relevant enough to be worth the effort.

Ben added something to the script that, as far as I know, is novel — the ability to specify which stacks to draw from, not just notebooks (specifically, the ability to *exclude *stacks is not normally supported by Evernote’s search syntax). This allows you to set the scope at a level that never changes (the 4 P.A.R.A. categories), while leaving the level below it (the constituent notebooks) free to morph and evolve as much as they want. It’s like being able to rely on a panel of subject matter experts whose knowledge is constantly changing, but whose relationships to you and each other stay the same.

You can try it by downloading this application, moving it to your Applications folder, and running it (it only works on MacOS and with Evernote):

**[RandomNote Download](https://gitlab.com/fortelabs/evernote-random/uploads/dcf6f8e3064960d954167824b2a30ff6/RandomNote.zip)**

If you add it to your dock, it looks like this:

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/778/optimized_bb2cac37-185b-4158-9d03-2dabc285e851_349x171.png)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/778/optimized_bb2cac37-185b-4158-9d03-2dabc285e851_349x171.png)

Clicking the lightbulb icon will immediately show you a note drawn randomly from the “1 Projects”, “2 Areas”, and “3 Resources” stacks only (they have to be titled exactly like that for it to work). You don’t have to be online, and it doesn’t rely on any external services, APIs, or special plugins.

Here is the [Gitlab repository for the project](https://gitlab.com/fortelabs/evernote-random), in case you don’t feel comfortable downloading the one I’ve created, want to modify it for your own purposes, or are curious how it works. I’m also seeking implementations that work for other operating systems and other note-taking apps. Send them to me and I’ll add them to this post.

### MY EXPERIENCE

When I first installed this script, I figured it would become part of my [weekly review](https://fortelabs.co/the-weekly-review-is-an-operating-system-8e8e04f885ab). An infrequent, only occasionally useful exercise to remember notes I’d previously saved.

What I’ve found has been very different. I click the icon probably 20–30 times each day, and as a result my whole conception of the relationship between memory, ideation, and creativity has changed.

Let me try to explain what I think is happening.

First, I believe that this little script activates many of the same triggers and habits normally targeted by social media.

About half of the time I previously spent on social media is now spent looking at, modifying, and deleting old notes. I think there is something about the human mind that requires micro-breaks — brief flashes of attention on something different, something new, something a little stimulating. The usual default is social apps, which quickly suck us in with their seductive, never-ending feeds.

What if this tendency to occasionally scan the environment was treated as an opportunity, not a threat? I’ve noticed that often all I need to make a decision or see a solution is to switch my attention to something else for just a moment. I find my cursor drifting toward Chrome to open Facebook, but seeing that little yellow lightbulb hijacks that instinct, leading me instead back into my best thinking.

Second, randomly surfacing notes provides many, many more chances than usual to tweak, add to, or summarize notes. Using notes *opportunistically *requires that you encounter many such opportunities. Many of the notes that get surfaced I retitle, tag, move, or delete, which means I’m constantly pruning and curating my collection for my future self. Every interaction with my notes serves a [dual purpose](https://fortelabs.co/mood-as-extrapolation-engine-using-emotions-to-generate-momentum-65a2e5940aae): giving me ideas *now*, and giving me even more condensed ideas *in the future*. This is tremendously rewarding. Addicting even.

The paradox at the heart of “designing” notes is that the moment you get familiar enough with a note to know what it’s about, you also lose the objectivity to know which changes to make. By quickly flashing notes in front of me, I’m able to make quick, intuitive, System 1 judgments about how to make them more discoverable or understandable, before my critical System 2 kicks in and starts nitpicking the spelling and punctuation.

Third, what this little app has reinforced for me is that it’s much, much more powerful to know that a note exists and what it’s generally about, than to know exactly what it contains. This is what differentiates this practice from [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) (systematically surfacing notes just as you’re about to forget them): I want to remember as little as possible, not as much as possible. Every idea I’ve offloaded to my second brain for *storage*, frees up a little bandwidth in my first brain for *thinking*.

What I do when a note appears is *get the gist*. This is greatly facilitated by [Progressive Summarization](https://fortelabs.co/progressive-summarization-a-practical-technique-for-designing-discoverable-notes-3459b257d3eb?source=linkShare-7b122207920c-1515045561), because it allows me to jump to only the most relevant parts I’ve identified in advance. If these parts are relevant to a problem at hand, I may add another layer of summarization, or move this note to an active project notebook, or add a link to it to my task manager, or send it to someone I know it would be useful for, or tweet it. In other words, further interaction that is further embedding the information in my thinking.

I’m not seeking to load the contents of this note into long-term memory or even short-term memory. I don’t want to remember it or even fully understand it. If I’m going to use my most limited resource — thinking bandwidth — it had better be spent relieving the demands on future thinking bandwidth. One of the few things worth sending through the bottleneck is tasks that add capacity to the bottleneck. This is how flywheels are made.

Fourth, there’s something magical about *just* the right level of relevance and actionability. I initially chose to draw from only the Projects stack, thinking it would be better to stay focused on current objectives. But since I was highly engaged with these notes on a weekly basis anyway, it felt like a waste of time seeing them again. And as I said previously, drawing from Archives occasionally produced nuggets, but not often enough to justify the time.

The sweet spot is combining Project notebooks with Areas and Resources. All the work you’ve done to sort notebooks into stacks, notes into notebooks, and to add layers of summarization pays off in a huge way when you put these notes together, like magnets suddenly reaching proximity and snapping together. The signal in the noise of each note trains you to look for certain patterns, making the signals in *other *notes that much easier to detect.

### AN EXPERIMENT

Let’s do a little experiment. I’ll post links to the next 10 notes I randomly surface using the RandomNote app, with a brief commentary on what they give me.

#1 [Fooled by Randomness book notes](https://www.evernote.com/l/AMzWwC78kfFLS71UztyN3FefpPLJ2NvIpaM)

*Coincidentally, the very first note is from a book by Taleb, the author I mentioned previously. I find that such “coincidences” occur continuously now. This quote is a good reminder of the power of satisficing, which I can always use.*

#2 [Screen Shot 2015-11-11 at 3.56.37 PM](https://www.evernote.com/l/AMwhvdR0ULlDla8LQqjE438IgI3_0sF89jg)

*I have no idea where this comes from, but I remember why I saved it — it’s an example of how a mere background can evoke meaning, not just look pretty.*

#3 [Spritz QS talk](https://www.evernote.com/l/AMz92RnMesxJVI8v6LpYfttXHx9p-KaS9GQ)

*My notes on a talk I watched on the Spritz high-speed reading method. A friend just mentioned this to me this past weekend. This note is a good reminder of “what I know” about it.*

#4 [Two types of emergence](https://www.evernote.com/l/AMwVcFUg-UlLvbXgNBh3SGXbftFvLlQODeA)

*My notes on a source I read for a blog post about emergence, from over a year ago. This reminds me to continue my reading on emergence, as there’s still so much left to explore.*

#5 [Episode 1: Tiago Forte – RadReads](https://www.evernote.com/l/AMwEZo-1be1KkJLaooInNIb211fDZkAF8Kk)

*This is a webclip of a podcast I did recently with Khe Hy. I save these purely for archival purposes, but it’s a good reminder to catch up with Khe soon.*

#6 [Fidelis Education](https://www.evernote.com/l/AMyAYytN2wxLE6zHxBz2WBN9afOe_hNaBiw)

*Another webclip, of the website of a “Learning Relationship Management” company I got a demo from about two years ago. I’m sure the site is out of date by now, but this prompts me to check in with them to see if there’s anything new.*

#7 [Additional Notes on “Drawing Dynamic Visualizations”](https://www.evernote.com/l/AMzNEZBclS9DsJFTEd2j_9_gBDxzqcQh7oc)

*Another “coincidence” — I’d just been experimenting with Tableau to make data visualizations for an upcoming blog post. This is a good reminder that I have some existing notes on the topic.*

#8 [The future of biosensing wearables « Rock Health](https://www.evernote.com/l/AMyduB_iX_RL1p8e4PtAhtG5Rfkbt8B5iyY)

*I can see from the notebook this is in that it was from a long-past research project. I can either move this into the Archive notebook for that project, or just delete it as it’s no longer relevant.*

#9 [What’s the best, most effective way to take notes? notes](https://www.evernote.com/l/AMzRz049M2RLvoP3PH9faNFcVhsRGhn3_Cs)

*Whoa! This is what I call a “strike” (as in finding gold) — a high-value, well-structured and summarized note highly relevant to a current project. I’ll move this to the Building a Second Brain notebook.*

#10 [Notes on sleep from 4HB](https://www.evernote.com/l/AMyUYVHkkhxN4q8BSnm18gH_5J-DxtQDhyA)

*A few small notes from the book The Four-Hour Body. Not much of relevance here. It’s a miss, but I’ll keep it.*

What you may have noticed is that a variety of things can spring from my interaction with these notes, however brief: a new idea, a new version of an old idea, an old version of a new idea, a decision, a memory, an immediate action, a future action, a question, an open loop, etc.

There’s no formula here. No checklist that could produce this serendipity on demand. This is non-linear action and reaction: many times the seemingly least important note (the business card of a used car salesperson) activates the most important or urgent open loop (I need to get my oil changed!).

Hierarchies of importance break down, freeing you to look everywhere for insight. The sense of possibility starts to increase as you realize the quality of the final output has very little to do with the brilliance of the original idea. You can use *anything*.

I have the gratifying sense that I am navigating a system bigger than myself. It is not fully under my control, but that means it is released from the bottlenecks of my time, my intelligence, and my attention. I am the conductor, not the whole orchestra.

Building systems for externalizing your thinking is not about better, faster, stronger. It is about getting out of your own way, gaining more control by letting go of inferior forms of control.

#### TO LEARN MORE, CHECK OUT [BUILDING A SECOND BRAIN](http://www.buildingasecondbrain.com/), OUR ONLINE BOOTCAMP ON LEVERAGING DIGITAL TOOLS TO ENHANCE YOUR CREATIVITY, PRODUCTIVITY, AND LEARNING.

---

***Follow us for updates on [Twitter](https://twitter.com/fortelabs/), [Facebook](https://www.facebook.com/fortelabs/), [Instagram](https://www.instagram.com/fortelabsco/), [LinkedIn](https://www.linkedin.com/in/tiagoforte/), or [YouTube](https://www.youtube.com/user/simulacrumsquared/).***
