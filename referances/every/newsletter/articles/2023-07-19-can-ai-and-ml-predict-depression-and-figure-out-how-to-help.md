---
title: "Can AI and ML Predict Depression?"
subtitle: "An interview with researcher Dr. Eiko Fried"
author: "Dan Shipper"
date: 2023-07-19
column: chain-of-thought
url: https://every.to/chain-of-thought/can-ai-and-ml-predict-depression-and-figure-out-how-to-help
paywalled: true
scraped_at: 2026-06-11T16:08:17.130Z
---

# Can AI and ML Predict Depression?

*An interview with researcher Dr. Eiko Fried*

If there’s one question I’ve been obsessed with for the past six months, it’s this:

How might AI change the way scientific progress happens? In particular, how might it help us make progress in areas of science where progress has historically been slow, like psychology or other fields of social science?

I’m not the only one thinking about this. Demis Hassabis, the founder of DeepMind who is currently leading AI at Google, is [famous for saying](https://techcrunch.com/2021/11/04/isomorphic-labs-is-alphabets-play-in-ai-drug-discovery/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAADF6XUT_vMi779D4xFP5xhjSAD76fxIWKu7HqILiLn3bjZIwIxgOQrjz7rW4_ZgLHk_7r3IUn6cGAi8m_-oR7ju4I-PXJio2AJWvqM1nh6BSpSs1Ad05AxWjls7X5g8Os7VQbPGa9Wnv9LjJ8ORqhVSrI1BVCLM0wHQu71nzqWt-), “Just as mathematics turned out to be the right description language for physics, we think AI will prove to be the right method for understanding biology.”

I love the idea of AI as a *new* language for describing and solving problems in the world that traditional scientific methods have had a hard time cracking, which I’ve been [writing about](https://every.to/chain-of-thought/against-explanations) a lot lately. AI allows us to predict phenomena in the world before we have scientific explanations for them. For example, there is no unifying scientific theory for depression. But AI and machine learning techniques might be able to predict when someone is going to experience depression, which could help with prevention and treatment. This is a significant advance because we can make progress on the disease without needing to uncover a universal underlying theory for what it is.

I’ve been looking for researchers who are going down this path—and I found [Eiko Fried](https://twitter.com/EikoFried?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor). Dr. Fried is an associate professor in clinical psychology at Leiden University in the Netherlands who works on how to understand, measure, model, and classify mental health problems. His current research is a five-year project called [WARN-D](https://warn-d.eiko-fried.com) that uses statistics and machine learning techniques to try to predict depression before it happens. Eiko and his team have followed 2,000 students living in the Netherlands for two years, using the students’ smartwatches and smartphones to gather moment-by-moment data about them. They hope that once this project is done they’ll be able to more reliably predict when depression might occur—before it does.

Dr. Fried’s research focuses on the view that depression and other mental illnesses are complex, dynamical systems, rather than clear-cut categories with simple causes.

We had a wide-ranging conversation about the role of explanations and predictions in science, why many areas of science—particularly psychology—have struggled to make progress, the role of machine learning and AI in scientific research, and how his research is advancing our ability to both predict—and explain mental illnesses.

If you want to listen to this interview as a podcast, it’s available here:

[Listen to this interview](https://soundcloud.com/everymedia/eiko-fried)

*This conversation has been lightly edited for clarity.*

---

**DS: Y**our research is about understanding, measuring, modeling, and classifying what mental disorders are. What are mental illnesses?

**EF: **What is the nature of mental illness? [That’s] the holy grail in our field that many scholars have ignored actually to some degree, because it's probably very tricky to answer. I think mental health problems are emergent. So they come out of systems of things that interact with each other. And these things that interact with each other are complex systems, and the elements are biological, psychological, and social. And I think most folks would agree with it, actually, it's not necessarily a very controversial idea, but putting this into sort of research or clinical practice is quite tricky because you have all these elements and systems, and then you have all these nonlinear relationships in which these elements interact with each other. And then where do you draw the boundary around the system?

There's the person system, so to speak, with your thoughts and behaviors and feelings, and your genetic setup and so forth. But there's your partner who influences you and your family history and your folks and life events and stressors, and all of that is part of what I think to be the mental health system of a person and your current state.

**DS: **That makes sense. It's so interesting because I think everyone sort of agrees with that story, or not everyone, but a lot of people would say they're emergent and it's sort of bio-psychosocial. It's a combination of all these things, and the combination is probably different for different people.

If you ask me what the orbits of the moon is, I have an equation. Do you think we'll ever get to a place where we're going to get down to that level, or that there's this very high-level story you can tell and then the details for each individual person are so complicated that having an explanation is going to be hard? An explanation that's compressible is going to be hard to find, or are you looking for that explanation?

**EF:** Right. So I have two answers. They're quite different answers. The first answer is that there are folks who are working on formal theories of mental health or mental disorders. They don't take everything into account and they probably will never be like Newton's theory of gravitation—which also ended up to be false, by the way. So maybe that's also okay in a way. In addition I think our models or theories are probably going to be useful idealizations. I like to use the map of Rome or the tube map of London as an example, where the map is useful for the purpose that you designed [it] to be, such as navigating the Metro system in London or finding your next Starbucks in Rome. So a good model is one that sort of leaves out unimportant stuff. But, of course, then the question is, what is unimportant to leave out? But the main point is that there is work happening right now on formal theorizing. We have a paper on panic disorder led by [Don Robinaugh](https://robinaugh.weebly.com/), for example, which is basically a system of eight or nine nodes or bio-psychosocial variables that have been shown to be really relevant to panic disorder.

We worked on panic disorder first because if you draw 50 random researchers on panic disorder from around the world to the table, most of them will actually agree on the etiology and phenomenology of panic disorder, which is not the case for some other mental problems. So we started there, and the model is basically a formal theory, a formal model, and their equations. And then you can simulate data from the model. And then you can see if the data you get for a person with panic attacks, for example, corresponds to data we observe in the real world. You can see, [what] does the phenomenology of panic attacks look like? OK, they're brief, check that they should be pretty brief. Panic attacks don't last for half an hour or three hours.

Can you simulate interventions using behavioral therapy on the system, and panic attacks become less? Yeah, you can actually do that. But we also find, for example, that there are people who have panic attacks without developing panic disorder. And in our model, everybody who gets panic attacks gets panic disorder. So [we’re] showing you that there's also limits to these theories, and it's a very initial model. But in principle, there's work on theorizing using differential equations.

And I think that work is promising, although it is far away from being a Einstein's theory of relativity. I think it is a model to begin with. And it was indeed quite tricky to decide what's in the model, what's not, what is just important enough to warrant modeling. That's my first answer.

The second answer is, there's work on dynamic properties of systems. This work argues that it actually doesn't matter too much what particular nodes you assess in your system, as long as all of these nodes tap into the dynamics of the system, because it is measuring the dynamics that give you information about the system and not necessarily all the rest.

A researcher in our field has a really cool paper talking about the two worlds of psychopathology. In it, he shows that he has a couple dozen people undergoing psychotherapy. They use a system where they ask people once or maybe multiple times a day about their moods, feelings, thoughts, behaviors, and ecological momentary assessment. They track them for multiple weeks. And the cool thing is that every person gets different variables assessed. Everybody's different. They all agree with their own clinician on what is most central to their psychopathology, even if the diagnosis is the same. Some folks sleep too little, some sleep too much, even if they have the same diagnosis. Some people are sad, others are suicidal and so forth. The analysis in the paper shows that you can, independent of the content of the network or the system, use these dynamical principles to see if people are going to get better or not.

Now, this needs to be replicated, obviously, and we need better methods and other tools to look into this. But I think [it’s] also a nice approach to look into this general idea of complex dynamics rather than the content of the system.

**DS: **That's really interesting. I hear you on, rather than looking at the content of the nodes, so rather than looking at, for me, maybe I sleep too little. I know that I sleep too little. And if I sleep too little, that increases my symptoms. You're actually looking at, it sounds like, the relationship between nodes. What are some examples of nodes? And then what are some examples of relationships? How would you look at the relationships independent of the nodes as a way to assess things?

**EF:** So nodes in the system, such as the ones in the paper, and also the work we do, is thoughts, feelings, behaviors, and mental health-related, usually—affect states, sad mood, anger, sleep problems, activity, maybe even using a smartwatch. [It] doesn't always have to be smartphone data. It doesn't have to be self-reported. It can also be somewhat more objective digital phenotyping data. And then you can, in a system, model the relationships between these things. I can see that whenever I sleep really well, I'm relaxed the next morning. Whenever I'm outside or exercise, I'm less active at the next measurement moment. Things like this. You can model contiguous relationships at the moment, but also temporal relationships over time. This works fairly well, using these sort of network psychometric tools that we've developed.

A good example for these dynamics are an early warning sign called “[critical slowing down](https://iopscience.iop.org/article/10.1209/0295-5075/132/18001#:~:text=Critical%20slowing%20down%20is%20considered,biology%2C%20sociology%2C%20and%20finance.)” in the ecology literature, which has been talked about a bit in psychology, but there haven't been super-convincing studies. There're early studies in small populations, but that's part of the reason I think I got my study funded—to see if this early warning sign can be replicated in a large sample for forecasting depression.

The way critical slowing down works, without being super-technical about it, is that when a system transitions from one stable state into another stable state, and when this transition is abrupt, this is important. We'll talk about this later, perhaps because there's also slow transitions, and it doesn't really work that well then. But if the transition is abrupt, like a catastrophic shift, then there's evidence in ecology and cancer biology and economics and other climate science, that the elements of the system change their autocorrelations over time. The system becomes more predictable, and the system moves slower, so to speak.

That's why you say critical slowing down. So translating this to my mental health example, if I know your current mood or sleepiness or concentration or suicidal state right now, and I see that your state tomorrow will become more and more predictable from your current state, we're talking about critical slowing down, which is an early warning sign for an upcoming transition. This has been shown a couple of times in data with depression, for example, in usually just one particular person. There's other dynamic principles, connectivity, and so forth. But this early warning, critical slowing down, is one of the ones that has been discussed the most. If you think of a system like a river, and you can measure the speed of the river using different types of thermometers, this ideographic argument where the content doesn't really matter, the dynamic principles matter. [That] translates into, well, as long as you put your thermometer somewhere in the river, and you pick up some part of the system, that will give you enough information to pick up on changes, and for example, autocorrelations to tap into critical slowing down. If that works or not, we don't know.

**DS: **That makes a lot of sense. So it sounds like what you're saying is you have a system of interconnected parts. And what you've observed is that there's an abrupt or catastrophic change from one regime to another in the system. Thereafter, that system will slow down, or it will not change as quickly.

**EF: **Before.

**DS: **Before. I see.

**EF:** So the goal of our R&D study is to use these markers as a forecast for an upcoming transition.

[PAYWALL]
