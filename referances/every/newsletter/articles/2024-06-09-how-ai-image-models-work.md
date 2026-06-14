---
title: "How AI Image Models Work"
subtitle: "An entirely non-technical explanation of image generators"
author: "Nir Zicherman"
date: 2024-06-09
column: p
url: https://every.to/p/how-ai-image-models-work
paywalled: false
scraped_at: 2026-06-11T16:08:02.854Z
---

# How AI Image Models Work

*An entirely non-technical explanation of image generators*

*The details of today’s AI wave are many and can be difficult to understand, but they are built on basic and intuitive ideas. That’s why I love stories like ****Nir Zicherman****’s. He breaks down a subject that seems intimidating and complicated into *[something simple](https://every.to/p/how-ai-works)*. In today’s world, understanding how AI works is power—and that’s why I’m to excited publish this story to help make that understanding more widespread.—*[Dan Shipper](https://every.to/@danshipper)
*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

I can vividly recall the day I got access to the DALL-E beta. It was the summer of 2022. For months, I’d been on the waitlist, hearing about this magical new tool that could take *any* description and output a matching image.
One of the first images I created used the prompt “80s tv commercial showing a hippo fighting a pegasus.” This was the output:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXf-a9T2iSUXMbTa5gP5h2BkH8_T198f6xPvF_9ZeJA1KVkQq1yOggsHRRtZomL6NoW1wDq9vY0ObZPVZjOCI4r6axks64oAhjhOTHq4klgcNBsNzmUggP0H.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXf-a9T2iSUXMbTa5gP5h2BkH8_T198f6xPvF_9ZeJA1KVkQq1yOggsHRRtZomL6NoW1wDq9vY0ObZPVZjOCI4r6axks64oAhjhOTHq4klgcNBsNzmUggP0H.png)
*All images courtesy of the author.*
Fast-forward to today, less than two years after the advent of that mind-blowing capability. The same prompt, in [ChatGPT](https://every.to/c/ai-frontiers) 4o, yields this:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXdEmxEFfcy6FifsVqxQPVLsZNOXwImffOJ7aXTaYP_SzUrE0zowsKc1e7Zd2YWr5zpF7s7LcOhs_eHdeaqWUK2ntHHnY4NYODaPU721_1uDobL21qeMzWhw.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXdEmxEFfcy6FifsVqxQPVLsZNOXwImffOJ7aXTaYP_SzUrE0zowsKc1e7Zd2YWr5zpF7s7LcOhs_eHdeaqWUK2ntHHnY4NYODaPU721_1uDobL21qeMzWhw.png)

Despite persistent flaws and hallucinations (that hippo has three legs!), it is mind-boggling how far we’ve come in such a short period of time. Dream up *anything*, with any text description, and a machine will create a matching image in seconds.
Yet despite the technology’s sudden ubiquity, few people who regularly use it understand how it works or how these improvements come about.
Several months ago, I published a primer that explained [how large language models (LLMs) work](https://every.to/p/how-ai-works) using no technical language. I’d like to do the same now for image generators. As with LLMs, I believe that the core concepts are straightforward. The fancy calculus and ground-breaking computing power used to train these models is simply the application of something we can explain with an analogy to a kids’ game.

## The story plot game

Let's imagine inventing a new game intended to teach children how to unleash their creativity and come up with fictional stories. Left to their own devices, children will typically write about topics that interest them. But our intention is to broaden their horizons and encourage them to think outside the box, to be comfortable ideating and crafting stories about *any* topic.
We're going to teach this incrementally. We’ll begin with a skill that (at first glance) might seem unrelated: identifying *existing* story plots.
The children will be presented with a sentence containing a single typo. If they find the typo, they will uncover the plot of a well-known film. Here it goes:
*A princess with magical towers accidentally sets off an eternal winter in her kingdom.*
I imagine most children would successfully identify that the outlying word is *towers* and that the word with which it should be replaced is *powers*. (The film, of course, is *Frozen*.)
Let's make it a bit harder. This time, the error won't be a rhyming word but an entirely different word altogether. For instance:
*A clown fish gets separated from his banana and must find his way home.*
This time, a child familiar with *Finding Nemo *will hopefully recognize the word *banana* as a typo and replace it with the word *father* to decipher the correct plot. But here's an interesting implication that comes with this second example: Had the child replaced *banana *with *best friend*, the resulting sentence would be perfectly logical and the plot perfectly plausible, even if it did not accurately summarize any particular Pixar film.

## Getting noisier

We may seem far removed from our eventual goal of mirroring generative image models, but there is more happening here than it might seem at first glance. We’re teaching the children to identify compelling story plots hidden somewhere in a summary rife with errors.
Let's give these errors another name: noise. And let's turn the difficulty up a notch and replace two words in a given plot:
*An outcast lion faces his barbecues and returns home to challenge the popsicle who killed his father.*
This time, a child might make several attempts. Eventually, they might get the answer right and correctly replace *barbecues *with *fears* and *popsicle* with *uncle*. But they just as well could replace *barbecues* with *critics* and *popsicle* with *tiger*, and the plot would be perfectly plausible (despite no longer being that of *The Lion King*).
The children have now learned to break down the task into multiple steps, uncovering plots (even if they aren’t precise descriptions of existing movies) by detecting erroneous words (i.e., noise).
And this process can continue. What about a plot where *most* of the words are wrong?
*A jumping omelet escapes a bass and stands effectively.*
Don’t ask me what plot this is meant to represent! But place this sentence in front of a creative child and tell them to replace individual words until a compelling plot emerges, and I’m confident you’ll have a blockbuster hit on your hands.
The game eventually reaches the stage in which *all* of the words in the sentence are wrong. The sentence, in other words, is pure noise:
*Gold scissor out headphone neat typewriter spinach.*
By learning to succeed at this game, the children have inadvertently been taught to do something special: Given a random sequence of words, they will uncover a coherent and compelling plot within it.

## Connecting the dots

This juvenile game we’ve invented is similar to how image models are trained. Engineers at OpenAI and other companies take real images (for example, photographs or paintings), and add a little noise to them in the form of randomly colored dots (pixels). Just as the children in our game were asked to uncover the hidden plot, the model is instructed to remove the noisy pixels and return a coherent image:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXf7OLKgw0V3BWJ0DFzKj3sjSGSxhLovWipLDSgVlNjotw8wDXf0HKLdUwY2DBqEww6WT1BokIee-3XaKXIlvn-r1W7QGDX_MaspNDEJJkEQAJ6BRvCh8pgN.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXf7OLKgw0V3BWJ0DFzKj3sjSGSxhLovWipLDSgVlNjotw8wDXf0HKLdUwY2DBqEww6WT1BokIee-3XaKXIlvn-r1W7QGDX_MaspNDEJJkEQAJ6BRvCh8pgN.png)
After many iterations and sample data, a computer can become quite adept at cleaning up the input and returning the original image. At that stage, we can add even more noise. The children learned to replace individual words in the unintelligible sentences until a substantive plot emerged. The model too can iterate through several steps of noise removal:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXfjh5o1NRfb7TKBqE0tLb_wgGTbeOTrF10OS4h5xptvbGWakdZb7hehGTtFGkZ8vVEPYNjKMn93EW4emjB0sTFneKpx1u6alGYQ8JXA87ErWNQm6bmzxsXd.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXfjh5o1NRfb7TKBqE0tLb_wgGTbeOTrF10OS4h5xptvbGWakdZb7hehGTtFGkZ8vVEPYNjKMn93EW4emjB0sTFneKpx1u6alGYQ8JXA87ErWNQm6bmzxsXd.png)
Doing this enough times teaches an AI model to find rational images in noise. After a few dozen de-noising iterations, pure noise can be turned into a cat:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXcHO7Dwa2H2Jg0YzgjBYaz_TTMgBBm-4YSUdpNOMm4JPW1E-SQvLNLJhEp3hL4awTZs-JhUoR3cuL601ZNE8jsbnzyD0ShXRtU3Z8ohs1J5k2lqKgk8NrKW.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXcHO7Dwa2H2Jg0YzgjBYaz_TTMgBBm-4YSUdpNOMm4JPW1E-SQvLNLJhEp3hL4awTZs-JhUoR3cuL601ZNE8jsbnzyD0ShXRtU3Z8ohs1J5k2lqKgk8NrKW.png)
You can build basic versions of this on your own computer using open source tools and libraries.
The big secret behind all of these revolutionary image generators? They’re passing random noise into a model and telling it to find an image within, just as we asked children in our game to find plots in a random sequence of words.

## Moving beyond cats

Of course, there’s a bit more to it than that. We don’t just want cats, do we? We want the model to specifically find our described image in the noise. How can an AI system remove noisy pixels through an iterative process that moves closer to, say, *80s tv commercial showing a hippo fighting a pegasus*?
Let’s return to our story plot game. We can encourage the children to look at the input sentence with a given genre in mind. Rather than outputting *any* plot they can dream up, their creative output will now be a bit more directed. If a child is told to find *a mystery that takes place in France* in the nonsense sentence I referenced above—
*Gold scissor out headphone neat typewriter spinach.*
—they may lean toward replacing *headphone* with *France* and *scissor *with *stolen*—
*Gold stolen out France neat typewriter spinach*.
—and subsequently clean up a few other words—
*Gold stolen in France causes police investigation*.
They didn’t even need to replace the word gold, which fit nicely into the plot of our Parisian film noir.
In [my original article about LLMs](https://every.to/p/how-ai-works), I described how machine learning systems can model non-mathematical concepts (such as food) in a mathematical way. Specifically, they are trained to cluster concepts sharing similar qualities on a graph called a vector space.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXd07SYx4QzdohGh_fTsUFt_BGvc651XZzu86fyNs3yrSNsLBkXxfPX2XMiUgL7piUSqi5GtmwTLKZKkzfE_Ih0uOTl3oeXsf0mQFINax0zGuQaAy96uhpNo.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXd07SYx4QzdohGh_fTsUFt_BGvc651XZzu86fyNs3yrSNsLBkXxfPX2XMiUgL7piUSqi5GtmwTLKZKkzfE_Ih0uOTl3oeXsf0mQFINax0zGuQaAy96uhpNo.png)
Just as an LLM can find the next word in its output by knowing roughly where in the vector space to look for it, we can instruct our image generating model to focus its de-noising in a particular region of the vector space. We do this by first using the LLM technology I previously explored to convert a text prompt into coordinates. This is akin to giving it a hint about what kind of underlying image to find, just as we nudged the child playing our story plot game toward a particular genre.
For example, if our image description details *italian food*, the image generator will know to look for output that would generally fit in this part of the vector space:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXeOGY4udA-oeo9TBlD2kOjQxEfV4PbFC0EiDvdTCQ5jE4iU8jV3dOKjQaH9NYWMMdCK-tWXZySofCu1dA4dXrAsrg7ufj0TPfEtWhoOXn699HSkuQO86PHs.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXeOGY4udA-oeo9TBlD2kOjQxEfV4PbFC0EiDvdTCQ5jE4iU8jV3dOKjQaH9NYWMMdCK-tWXZySofCu1dA4dXrAsrg7ufj0TPfEtWhoOXn699HSkuQO86PHs.png)
The more specific the description, the smaller that target area becomes.
This also helps explain why image generators are non-deterministic (meaning no two inputs will ever yield identical outputs). First, the target zone in the vector space is an area, not a particular point. Second, the noise in which the model looks for that target Italian food is randomly generated each and every time.

## Finding the hidden pictures

As I had [previously written](https://every.to/p/how-ai-works), “Of course, there’s a bit more nuance. There’s some fancy math and complex computing. But the fundamentals truly are no different than those in the meal-planning example.”
The same is true here. These image generators are effectively doing what our story plot game accomplished. Given some noisy input and a gentle hint at what it should be looking for in them, very inventive outputs can be made.
I’m reminded of those [autostereograms](https://en.wikipedia.org/wiki/Autostereogram) I used to struggle with as a child—the rainbow-colored sprinkling of dots that revealed an image if you stared at them long enough. Who would have thought that those childhood games were previewing such a revolution in human ingenuity?
I was never good at finding the hidden picture in those autostereograms. Turns out, I didn’t need to be. I can now just teach a computer to do it for me instead.

---

***Nir Zicherman**** is a writer and entrepreneur. He was the cofounder of Anchor and the vice president of audiobooks at Spotify. He also writes the free weekly newsletter *[Z-Axis](http://www.zaxis.page/)*.*
*To read more essays like this, subscribe to *[Every](https://every.to/subscribe)*, and follow us on X at *[@every](http://twitter.com/every)* and on *[LinkedIn](https://www.linkedin.com/company/everyinc/)*.*

[Upgrade to paid to join 70,000+ readers of the best tech writing on the internet](https://every.to/subscribe)
