---
title: "Just-In-Time PM #11: Late Starts on the Critical Path"
author: "Tiago Forte"
date: 2018-05-27
column: forte-labs
url: https://every.to/forte-labs/just-in-time-pm-11-late-starts-on-539304
paywalled: false
scraped_at: 2026-06-11T16:09:39.051Z
---

# Just-In-Time PM #11: Late Starts on the Critical Path

In [Part 10](https://every.to/praxis/just-in-time-pm-10-structure-features-539296), I argued that digital knowledge work was fundamentally different than other kinds of work, because its structure, features, and purpose could be added or changed *after* it was built.

Principle #4 of Digital Knowledge Work is therefore to “Start everything as late as possible.”

## #4 Start everything as late as possible

This practice is known as “late starts,” and is taken directly from Critical Chain Project Management (CCPM), a methodology developed by business management guru Eliyahu Goldratt, based on his Theory of Constraints.

CCPM proposes that *attention* and *people* are now the most important constraints in projects, instead of time, machines, or raw materials. It is one of the first PM methodologies to put human psychology at the center of its recommendations, appearing in the last 3 editions of the Project Management Body of Knowledge, the authoritative guide to the industry.

To understand why and how, we first need to understand the concept of “critical path.”

Consider the process of making drip coffee as an example. There are a number of necessary steps:

- Heat water (3 minutes)

- Pour and grind beans (1 minute)

- Prepare dripper (30 seconds)

- Prepare cream and sugar (30 seconds)

- Pour water (1 minute)

- Add cream and sugar and stir (30 seconds)

Let’s represent this visually, with the length of each bar corresponding to roughly how long each step takes:

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_1e52ad12-93a3-4d2e-9835-21fbba5cf2c2_900x506.jpeg)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_1e52ad12-93a3-4d2e-9835-21fbba5cf2c2_900x506.jpeg)

Notice that we have some flexibility in how we perform these steps, but not much. Most of the tasks have *dependencies* – they can’t be done until other tasks are done first:

- You can’t grind the beans until you’ve poured them into the grinder

- You can’t put the grounds in the filter until you’ve placed it in the dripper

- You can’t pour the water until you’ve done all the previous steps

When making coffee, we understand intuitively that the tasks that take the longest (such as boiling the water) should be started first, and only then should we grind the beans and prepare the dripper:

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_ddfe2ad8-ae76-46c0-b5fa-798ec58152f6_900x506.jpeg)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_ddfe2ad8-ae76-46c0-b5fa-798ec58152f6_900x506.jpeg)

It wouldn’t make sense to do all the quick tasks first, and only then start the water boiling. That would increase the total time required to make coffee by a whopping 66%, from 4.5 minutes to 6.75 minutes:

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_1eaaaa26-5298-43d9-b69d-443f3f2b8aaf_900x506.jpeg)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_1eaaaa26-5298-43d9-b69d-443f3f2b8aaf_900x506.jpeg)

The sequence of tasks in red below is what we call the “critical path” (CP). It is defined as “the longest chain of dependent tasks.”

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_481b2a92-1fac-4005-bd22-e7e927478cb1_900x506.jpeg)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_481b2a92-1fac-4005-bd22-e7e927478cb1_900x506.jpeg)

Identifying the critical path gives us major benefits:

- It tells us **where to start** (starting with anything other than boiling water would significantly delay project completion)

- It tells us **what to prioritize** (whichever task is currently on the critical path)

- It tells us the **soonest possible completion date** for the project as a whole (notice that there is no way to make coffee faster than the critical path)

Even with something as simple as making coffee, the *sequence of tasks alone* has a 66% impact on the total time required.

Now consider a real project with 10 collaborators. The default approach is to use “early starts,” kicking off a new project with a flurry of activity as everyone gets to work. This seems only natural – there’s a lot to do, everyone’s excited to start, and no roadblocks have yet been encountered.

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_cc52b800-a769-4339-80b6-804811b19d22_900x506.jpeg)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_cc52b800-a769-4339-80b6-804811b19d22_900x506.jpeg)

This *feels* like progress, because everyone is busy and tasks are being completed left and right.  But CCPM argues that early starts are the root cause of many problems in modern projects:

**With so much activity going on early in the project, it’s easy to lose focus on the tasks that will have the greatest impact on final delivery – the critical path**

For example, we might forget that user research will take a long time, so it should be started as early as possible.

**By pulling many people onto the project early, the total cost balloons immediately, raising the stakes for “getting it right” and possibly stifling experimentation**

As opposed to starting a core team on the critical path first, and then slowly adding others as they’re needed.

**The critical path is often the longest path because it includes ambiguous tasks like research, testing, and discovery**

These are also the tasks that produce the most learning. By performing the bulk of the work early in the project, it doesn’t benefit from that learning, often necessitating expensive changes later on to correct mistakes.

With late starts, we push tasks as late as possible on the timeline. This tends to create clusters of tasks just before key milestones, represented here by diamonds:

[![](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_27fb352d-f2dd-4aef-97b1-6e4ce5156ca1_900x506.jpeg)](http://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/805/optimized_27fb352d-f2dd-4aef-97b1-6e4ce5156ca1_900x506.jpeg)

This produces powerful benefits:

**The amount of time needed to perform tasks is reduced, by limiting the amount of time available to work on them**

Parkinson’s Principle states that work expands to fill the time available – by restricting the amount of time available, we can help people reign in the scope of their work (as discussed in [Part 5](https://every.to/praxis/just-in-time-pm-5-the-iron-triangle-538671)).

**By adding people to the project as late as possible, you avoid yanking them from other projects, only to wait around with nothing to do as the critical path finishes**

With late starts, they get pulled onto the project late in the game, and have as much information and learning as possible available to them.

**It creates a collaborative culture where everyone understands the importance of the critical path**

Instead of optimizing for task completion (whether or not that task is on the critical path), it focuses everyone’s attention on the critical path, like a football team working together to get the football to the end zone. This is a culture where important tasks are prioritized over urgent ones, by *making* important tasks the urgent ones.

But the best reason to adopt late starts is… everyone does it anyway! Think about it: who actually begins working on something in earnest before they have to?

Instead of rushing to meet a deadline, and then pretending that “We’ll definitely start sooner next time,” what if we acknowledge the reality that this is how humans work? Forcing people to start on something before they have the information they need not only wastes effort, it is tremendously demotivating: what is more discouraging than seeing your best work go to waste because it was completed too early?

---

***Follow us for updates on [Twitter](https://twitter.com/fortelabs/), [Facebook](https://www.facebook.com/fortelabs/), [Instagram](https://www.instagram.com/fortelabsco/), [LinkedIn](https://www.linkedin.com/in/tiagoforte/), or [YouTube](https://www.youtube.com/user/simulacrumsquared/).***
