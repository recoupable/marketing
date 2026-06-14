---
title: "The Ultimate Guide to Prompt Engineering"
subtitle: "Prompting AI tools is a new form of management science"
author: "Mike Taylor"
date: 2024-01-21
column: p
url: https://every.to/p/the-ultimate-guide-to-prompt-engineering
paywalled: true
scraped_at: 2026-06-11T16:08:08.548Z
---

# The Ultimate Guide to Prompt Engineering

*Prompting AI tools is a new form of management science*

*Whenever someone tells me they think ChatGPT isn’t useful, I always assume they just don’t know how to prompt it. Good prompting is the difference between AI that feels like magic and AI that feels mundane. But there are few well-written resources that teach you how to do it properly.*

*That’s why I’m so excited to have Michael Taylor write this guide for us. He was one of the best TAs in our *[first chatbot course cohort](https://www.chatbot-course.com/)*, and he’s writing a book about prompting for O’Reilly, so he really knows his stuff. If you want to become a great prompt engineer, this guide is a good place to start. —*[Dan](https://twitter.com/danshipper)* *

---

ChatGPT’s output is the average of the internet. It has seen the best and worst of human work, from angsty teenage fan fiction to the collected works of Ernest Hemingway, and everything in between. But because it is the average, the default response you get is often undifferentiated and bland. ChatGPT is capable of doing almost anything—you just need to ask in the right way.

Finding the right way to ask, or prompt, the model is known as prompt engineering. With the GPT-3 beta in early 2020, you had to hack the prompt to find the right combination of magic words or phrases to trick the model into giving you what you wanted.

As OpenAI released smarter, more sophisticated models like GPT-3.5 and GPT-4, many of these old tricks became unnecessary. As someone who freelances as a prompt engineer and created a [popular course](https://www.udemy.com/course/prompt-engineering-for-ai/) on the topic (we just passed 50,000 students!), many people ask me if prompt engineering will even be needed in the future when GPT-5 or GPT-6 comes out.

Sam Altman, the founder of OpenAI, certainly doesn’t think so. “I don’t think we’ll still be doing prompt engineering in five years,” [he said in October 2022](https://web.archive.org/web/20230203074340/https://greylock.com/greymatter/sam-altman-ai-for-the-next-era/). OpenAI’s stated goal is to build AGI, or artificial general intelligence: a computer that performs at a human level across every task. When it reaches that point, we can ask the computer to do whatever we want in natural language, and it’ll be sophisticated enough to anticipate our needs.

Yet I don’t believe prompt engineering will disappear. It’s an important skill. Look around at your coworkers (or if you’re working from home, take a look at your Slack or Teams messages). Everybody you work with is, by definition, already at AGI—but they still need to be prompted.

You’re communicating a prompt every time you brief your designer, explain how to do something in Excel to an intern, or give a presentation to your manager. Every manager is a prompt engineer, using their communication and data analysis skills to align the team toward a common set of goals. Even your employment contract is a prompt: a standardized template of language designed to align your behavior with the commercial goals of the organization.

While we might not call it “prompt engineering” in five years, we’ll always need mechanisms to give direction to our AI—and human—coworkers. Those who get good at this set of skills will have an unfair advantage over those who don’t. Let’s dive into how to engineer prompts for text using five simple principles, as well as learn the basics of image generation.

## The five pillars of prompting

As AI models get better, a consistent set of useful principles have emerged. It’s no coincidence that these principles are useful for both working with humans and AI. As these models approach human-level intelligence, the techniques that work for them will converge with what works for humans, too.

I first put these [prompt engineering principles](https://www.saxifrage.xyz/post/prompt-engineering) together in July 2022 and was relieved to see they mapped closely to [OpenAI’s prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering), which came out a year later. The principles are as follows:

1. **Give direction:** Describe the desired style in detail or reference a relevant persona.

2. **Specify format:** Define what rules to follow and establish the structure of the response.

3. **Provide examples:** Supply a diverse set of test cases where the task was done correctly.

4. **Evaluate quality:** Identify errors and rate responses, testing what drives performance.

5. **Divide labor:** Split tasks into multiple steps, chained together for complex goals.

Use these principles as a checklist to run down as you improve your prompt. If you get sufficient results applying the first few principles, you probably don’t need to keep going down the list unless you need the prompt to be extremely robust. Robustness is a requirement if you plan to use it every day or are implementing it in a product.

Let’s work through an example using ChatGPT Plus (GPT-4), starting with a simple prompt for a common task:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.29.39%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.29.39%20AM.png)
In this case, we’re going to make the topic “productivity with time blocking.” Let’s replace the topic variable in curly brackets in the template.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.35.10%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.35.10%20AM.png)
ChatGPT creates a blog post on our topic, but it’s not worth publishing. If we’re just regurgitating the default answer from ChatGPT without adding anything of our own, we’re not contributing anything useful to the internet. So let’s turn to our principles.

### 1. Give direction: Describe the desired style in detail, or reference a relevant persona.

A common technique in prompt engineering is to copy the style of a famous persona. This is also common when briefing humans on, say, a project. For example, a brand will typically provide a style guide for its agency to follow when creating ad campaigns. ChatGPT is no different: It needs to know what sort of style you like.

We can emulate almost any style that is available in the training data. It’s more likely that a style will be present if there are multiple examples of it on the internet. In this case, we want to emulate the style of Jocko Willink, former Navy SEAL and author of *Extreme Ownership*.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.35.35%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.35.35%20AM.png)
ChatGPT is trained to avoid violating copyright, and often litters text with caveats and disclaimers to do so. We’ll have to include a few tricks to get around this, such as specifying that we don’t want to mention Willink’s name. It still outputs a disclaimer at the start, but the article itself is of higher quality than before.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.39.21%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.39.21%20AM.png)
This already fetches us better results than a generic prompt. By specifying a persona, we’ve fed ChatGPT a specific angle. Whether or not we choose to go with the military-inspired approach, we’ve found some inspiration and contributed something to the content.

From here, we can get more creative by [unbundling](https://bakztfuture.substack.com/p/dall-e-2-unbundling) some of the attributes that we liked from Jocko Willink and remixing them with other styles to get something new. First, we need to unpack the specific attributes into bullet points, using the following prompt:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.36.43%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.36.43%20AM.png)

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.39.55%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.39.55%20AM.png)
Once we know what makes up the style we like, we can use these details to create something new. For example, we might like the motivational aspects of Jocko’s writing but plan to address an audience that works in tech, values a more relaxed vibe, and connects with pop culture references. Make these changes to the writing style bullet points, and insert them in the prompt.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.41.38%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.41.38%20AM.png)
This will take some experimentation. You’ll often find that ChatGPT goes over the top to try and please you. Keep trying different ways to describe your style in the prompt, and you’ll eventually land on something that’s more accurate.

### [![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.42.03%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.42.03%20AM.png)2. Specify format: Define what rules to follow and the required structure of the response.

Giving ChatGPT direction improves the quality of its output, or at least differentiates it from what’s already out there. However, direction is rarely enough to get you the exact format of output you’re hoping for. With the previous prompt, the blog posts we generate are around 500 words, which is too short to rank on Google.

Just like you would brief a writer on word count or structure, you will need to tell ChatGPT how long you want your post to be. Unfortunately, ChatGPT is surprisingly bad at math and can’t count words, so we’ll need to resort to prompt engineering trickery. Ask it to generate an outline first. Then, prompt it to write each section with a minimum number of paragraphs. You can’t get a precise word count, but you can get more or less in the right zone.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.42.31%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_Screen%20Shot%202024-01-22%20at%2010.42.31%20AM.png)

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_65wf7gru15HjfYlZlZk--tysspBcIyRiH5axRNhq9b3OlaWTKGpxZH8cIcY5zmKLAH1if5o4rBCDRcyodbdJMGtcICGRNLHJDeb7NT3aTTsUnLNAOFlChQSlOGnGBvHS2--9aWO2QUnJvgWj.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2924/optimized_65wf7gru15HjfYlZlZk--tysspBcIyRiH5axRNhq9b3OlaWTKGpxZH8cIcY5zmKLAH1if5o4rBCDRcyodbdJMGtcICGRNLHJDeb7NT3aTTsUnLNAOFlChQSlOGnGBvHS2--9aWO2QUnJvgWj.png?link=true)
The resulting blog post is over 700 words, which is 40 percent longer than what we had before. We’ll address lengthening it soon, but for now, this is good enough.

For most requirements, it’s enough to provide direction and specify format. I rarely need to move onto these next principles. However, if we’re planning to write not just one blog post but 100 or 1,000, we should work on optimizing the prompt further. If you can get 10 to 20 percent more traffic from spending the extra time on prompting, that can add up to tens of thousands of visits across hundreds of blog posts. In addition, having fewer errors saves thousands of dollars spent editing mistakes after the posts are generated.

[PAYWALL]
