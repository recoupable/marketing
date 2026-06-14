---
title: "The Culture of AI Engineering"
subtitle: "A framework for getting humans, agents, and everything in between to build the same vision"
author: "Noah Brier"
date: 2026-05-08
column: thesis
url: https://every.to/thesis/the-culture-of-ai-engineering
paywalled: false
scraped_at: 2026-06-11T16:07:16.734Z
---

# The Culture of AI Engineering

*A framework for getting humans, agents, and everything in between to build the same vision*

***Noah Brier**** cofounded Percolate in 2011 and learned the CEO’s hardest job: keeping a whole company pointed in the same direction. Now, at his AI consultancy* *[Alephic](https://www.alephic.com/)—and in his own work, where he uses Claude Code as a* *[second brain](https://www.youtube.com/watch?v=8V9tZwgjiRs)—he’s facing that same problem with agents in the mix. AI was supposed to make coordination easier. Instead, Noah argues, it has created new coordination problems of its own. In this piece, he pushes back on the “software factory” metaphor and offers a framework, drawn from ****Stewart Brand****’s pace layers, for getting carbon and silicon to build the same thing.—[Kate Lee](https://every.to/@kate_1767)*

---

Strong DM is a software company whose three-person AI team calls their system for autonomous code generation a [“Software Factory.”](https://factory.strongdm.ai/) Entrepreneur **Dan Shapiro’**s [widely circulated framework for AI coding](https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/) culminates in “the Dark Factory,” named after a Japanese robotics plant that [runs with the lights off](https://en.wikipedia.org/wiki/Lights_out_(manufacturing)). [Factory.ai](http://factory.ai), which has raised millions from Sequoia and Khosla Ventures, has built an entire business around the metaphor—its autonomous coding agents are called Droids.
I’ve been incorporating many of StrongDM’s concepts about agentic software development into our work at [Alephic](https://www.alephic.com/), the consulting company I co-founded—but I have one fundamental disagreement: I think factory is the wrong metaphor.
If the hardest problem is making something people want, then the process of building software looks a lot more like **Andy Warhol**’s factory than **Henry Ford**’s. Both are focused on throughput, but Ford’s is focused on mechanization and stamping out identical cars with as little variance as possible. Warhol, on the other hand, was concerned with ensuring all work aligned with a single creative vision.
Ford’s factory—or more specifically, the assembly lines inside it—was designed to eliminate imperfections. [Six Sigma](https://en.wikipedia.org/wiki/Six_Sigma), the quality methodology made famous by General Electric and beloved of manufacturers, is literally a measure of the defect rate. Quality starts with deciding what to build. This is why [product-market fit](https://pmarchive.com/guide_to_startups_part4.html) is the lingua franca of startups: If you haven’t built something the market needs, nothing else—including the quality of your code—matters.
Too much of the industry treats software as a problem to be optimized and solved. That may be true for code writing and testing, but the better metaphor is staring us in the face: It’s a software *company*, not a software *factory*.
Just as in the days before AI, the hardest problem for a business is still creating this vision and alignment around it—how to keep an entire team of humans, and now humans and agents (and humans with agents), building toward the same vision, from the system architecture down to the individual lines of code. As I’ve learned long before agents existed, achieving this is much more akin to building a startup than assembling a car. What follows is my attempt at a framework for keeping an entire system of humans and agents building the same thing.

####

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/1075/optimized_c219a1d2-58b0-4ce6-80b6-c32c3a12c51a.png)](https://www.braintrust.dev/foundations?utm_source=newsletter,%20utm_medium=every,%20utm_campaign=evals_course)

####

#### Stop shipping AI on vibes

A lot of people are using AI blind. They build with LLMs, deploy prompt changes, and hope they improve things. There aren’t any measurement frameworks. Braintrust fixes this. They just launched an Evals Course, which is a hands-on curriculum for moving past guesswork. Learn how to build eval datasets from production logs, manage agent workflows, and analyze failures systematically. Based on real workflows from teams at Notion, Stripe, and Ramp. Try it now.

[Start the course](https://www.braintrust.dev/foundations?utm_source=newsletter%2C+utm_medium%3Devery%2C+utm_campaign%3Devals_course&source=post_button)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#d5a6a5babba6baa7a6bdbca5a695b0a3b0a7acfba1ba).

## The alignment problem isn’t new—and AI didn’t solve it

I ran into this alignment problem years ago, when I cofounded the company Percolate, a content marketing platform, in 2011. As we grew the business from zero to 100 people in less than three years, my job as CEO shifted from building the product to building a company capable of building the product. My agents were people, and my job was to design the system they worked within. Culture, I concluded, was one of the strongest levers I had.
As **[Ben Horowitz](https://www.welcometothejungle.com/en/articles/ben-horowitz-culture-corporate-book)**[put it](https://www.welcometothejungle.com/en/articles/ben-horowitz-culture-corporate-book), culture is “how your company makes decisions when you’re not there.” This was exactly what I needed: documents, tools, and rituals that helped each individual make the best possible decision without having to run every decision up the chain. I probably spent half my time on this, building a [living culture document](https://review.firstround.com/this-startup-built-internal-tools-to-fuel-major-growth-heres-their-approach/), running onboarding sessions for every new hire, and developing [internal tools](https://review.firstround.com/this-startup-built-internal-tools-to-fuel-major-growth-heres-their-approach/) that automatically routed knowledge to the right people.
Every new technology promises to solve these coordination problems. But of course, nothing is that simple. What they do in reality is reshape the landscape around them and, in the process, create new problems that didn’t exist before. AI is no different.
Open-source software offers an early glimpse of the kind of unexpected problems that AI can create: Whereas the primary challenge a few years ago was finding maintainers willing to contribute code on goodwill alone, today’s challenge is sifting through hundreds of crappy [AI-generated pull requests flooding GitHub](https://boristane.com/blog/slop-creep-enshittification-of-software/).
Now, 15 years later, my audience at [Alephic](http://alephic.com) is not just the humans who work with me. Those humans are often paired with agents, and, increasingly, the agents themselves are delivering work independently. Yet the core problem is identical.
If you’ve used a coding agent for more than a week, you’ve already experienced this: The code works, but it often feels written by someone most definitely not you—ignoring obvious abstractions and stylistic norms that are present in the codebase. It looks, in other words, like a new engineer on the team who hasn’t been properly onboarded. We write onboarding documents and do training for our human colleagues, but most people don’t do this for agents. Yet.

## Pace layers of AI engineering

I still have an onboarding document and set of activities every new hire goes through during their first week, including building a module in our homegrown learning system as their first coding task (a few recent editions were GPUs, [quantization](https://huggingface.co/docs/optimum/concept_guides/quantization), and [agentic commerce protocols](https://developers.openai.com/commerce)).
But I am also building tools that go further and ensuring our code is maintainable, consistent, and built the way we’d want it built.
I think about our tooling as a kind of cultural stack, where standards inform architectures, which in turn inform specs, plans, and code. The layers are inspired by counterculture systems thinker **[Stewart Brand](https://jods.mitpress.mit.edu/pub/issue3-brand/release/2)**’[s pace layers framework](https://jods.mitpress.mit.edu/pub/issue3-brand/release/2). It’s a model for how society changes at different speeds, from nature, which shifts over millennia, to fashion, which can change by the day. The lower layers move slowly; the upper ones move fast.

[![Stewart Brand’s Pace Layers framework offers a vision of how society works, from nature (changes over millennia) to fashion (changes daily). (Source: Stewart Brand.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_cbd5b1ab-97c5-4ec3-9cb9-b3639a1ceb31.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_cbd5b1ab-97c5-4ec3-9cb9-b3639a1ceb31.png)
*Stewart Brand’s Pace Layers framework offers a vision of how society works, from nature (changes over millennia) to fashion (changes daily). (Source: Stewart Brand.)*

Brand argued that much of societal tension exists where the layers meet—when fashion reshapes culture (think about how social media rewired our norms about privacy) or culture becomes governance (how shifting attitudes towards marriage equality became law). Fashion, in Brand’s framing, isn’t trivial—it’s the froth layer where society experiments quickly and irresponsibly, and the occasional good idea sifts down to reshape the slower layers below. All things are ultimately reliant on the layer beneath them. Culture is subject to the laws of nature, governance to the laws of culture.
Those boundaries can and do shift, but recognizing the layers and the differing speeds at which they move is central to understanding why systems resist change, and what it takes to change them.

[![The “pace layers” of AI engineering help both humans and agents move in the same direction. (Credit: Noah Brier.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_afca7054-7a7f-4cc9-9547-32d46ec547ab.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_afca7054-7a7f-4cc9-9547-32d46ec547ab.png)
*The “pace layers” of AI engineering help both humans and agents move in the same direction. (Credit: Noah Brier.)*

Here’s how I’ve been thinking about the “pace layers” of AI engineering and how we’re building tooling at Alephic to help both humans and agents move in the same direction:

1.
**Code is fashion now**. Whereas it once sat deeper in the stack, where it was slower moving and insulated by other layers, in a world of AI, code is free to produce and reproduce. The challenge is how to do it right: free of bugs at the macro level, and aligned with your own vision and best practices at the micro level. By the time we get to this layer, we have to trust that the layers beneath are strong enough to steer the system to the places we need it to go.

2.
**Plans sit beneath code**. Before an agent writes anything, it should pause to survey the problem—[what are the possible approaches](https://every.to/source-code/stop-coding-and-start-planning-be0b4fd1-5898-4b09-bfda-0b00ea0004fd), and what are the trade-offs? Only after completing this step should the agent pick a direction and build. Many algorithms in computer science rely on the explore-exploit shift—when you time-box a broad search phase before zeroing in on a solution to run with—and this plan phase is no different. A plan doesn’t have to be a formal document, but it must separate the [thinking from the doing](https://www.noahbrier.com/archives/2019/03/exploration-vs-exploitation). Without this pause, exploration and execution get mashed together.

3.
**Specs sit beneath plans**. A good plan needs a good specification. That can be a ticket (a task that needs doing), a document, or just a conversation, but it explains what we are building, why we are building it, how you know you’ve done it right, and, critically, what we are not tackling right now. That last bit is particularly important for overeager AI that wants to please by building everything you wanted and a little more. There’s a [good debate](https://haskellforall.com/2026/03/a-sufficiently-detailed-spec-is-code) in the engineering community about what constitutes a good spec. It’s the simplest set of directives that shrink the planning space: a goal, a set of acceptance criteria, and an explicit list of out-of-scope problems.

4.
**Architecture is the theory of the system**. I’ve been keeping an ARCHITECTURE.md doc in all my codebases for a while now, borrowing from computer scientist **Peter Naur**’s [idea](https://cekrem.github.io/posts/programming-as-theory-building-naur/) that the real program isn’t the code, it’s the mental model the developers carry. The document shows how the business problem maps to the codebase, so you can predict where to find the code that solves this problem. It captures the key decisions and why they were made, and lays out the rules that must always hold, such as “no database queries outside the repository layer” and “no framework imports in the business logic.” Critically, it also names what’s still an open question, so AI doesn’t silently make architectural decisions for you, taking the codebase somewhere you didn’t intend.

5.
**Standards** **are the foundation.** Some are general principles of good software-building; others reflect our specific beliefs about how software should be built. One of the insights that drove me to start the company was when, years ago, I asked a developer I had worked with for a decade if I could have all his [configuration files](https://www.alephic.com/glossary/linting), the ones that encode his rules for how code should be written. When I applied this rulebook to my own work, I became a significantly better developer. His strict approach to linting, or automated rules that reject code with unused imports or superfluous definitions, meant my code wouldn’t even run unless it met his standards. Cutting corners was no longer an option. At Alephic, we enforce many of these standards with tools like tests and static analysis, which let the computer check your code automatically. But a lot of this guidance also lives in skills we distribute across the company, so people can use it in whatever harness they choose. The code-organization skill memorializes how we want team members to organize their codebases, and coding-best-practices hardcodes the stylistic and technical preferences our platform engineering team has established.

With AI, we can take these ideas beyond the mechanisms of cultural exchange I had in my Percolate days (like documents and meetings) and encode them into tools that every person can interact with every day.
The layers at the bottom move the slowest, so they should get updated the least frequently. For instance, I could start keeping a document in a single project as a way to give agents context on how the codebase was organized. If it works well enough, I turn it into a [skill](https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button) so the rest of the team can adopt the pattern across their projects. Then, I can decide that it’s a fundamental piece of how we build and, eventually, a best practice I want to enforce for the entire team.

## Companies > factories

While Henry Ford may be famous for the assembly line, he’s arguably more famous for his ([likely](https://quoteinvestigator.com/2011/07/28/ford-faster-horse/) apocryphal) quip about how if he asked people what they wanted, they’d say faster horses. Assembly lines exist to serve factories, just like factories exist to serve products, and products exist to serve companies. You don’t build a factory without an idea worth building it for.
The factory is one piece in a larger organization, where layers of co-dependent systems interact and move at different speeds. The interesting problems around alignment occur at the seams, where layers rub against each other: Is this a problem that should be solved with a meeting, a document, a skill, or a test? When does something graduate from a pattern in a codebase to something that should be established in all codebases?
At first glance, AI seems to smooth over these frictions. But that’s only true if you don’t scratch below the surface. What you find there is that the same problems that plague companies plague agents: incomplete information, overeager employees trying to solve the wrong problem, not wanting to admit you don’t know. The difference is speed. As **[Mario Zechner](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/)**, who built open-source coding agent [Pi](https://github.com/badlogic/pi-mono), recently observed, the mess that used to take a large organization years to accumulate now arrives in weeks with a two-person team and a fleet of agents.
That is not a reason to retreat to being obsessed with defects. It’s a reason to take the harder problem seriously: how to keep an entire system of humans, agents, and the layers between them aligned. This problem has a decidedly human shape. Civilizations have been organizing large groups of autonomous agents to do good work for a very long time. The agents were just carbon instead of silicon.

---

## The man underneath the layers

As part of this thesis, Every chatted to Noah about how he works and what inspires him.
**If there’s a chessboard out:** there’s a good chance [my kids and I] will do that instead of reverting to less enriching activities like being on screens. That chess set was designed by some friends and inspired by the [New York City outdoor chess scene](https://nymzo.world/).

[![All photos courtesy of Sarah Jay Halliday for Every.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_cef7d2c0-5e7a-4d8c-b7be-dbc4e3219386.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_cef7d2c0-5e7a-4d8c-b7be-dbc4e3219386.jpg)
*All photos courtesy of Sarah Jay Halliday for Every.*

**To keep me from checking email during calls: **I like to take notes on paper, currently with a [Campus notebook](https://www.kokuyostore.com/en_GB/campus/?srsltid=AfmBOopp2h0Wcth1923nAfxJcdA_TPDjD543sImOlcbLjsdLXkeMnUrv) and [rOtring 600 pen](https://www.rotring.co.uk/pens-pencils/ballpoint-pens/rotring-600-ballpoint-pen/SP_1532012.html).
**Re-reading the *[Simple Sabotage Field Manual](https://www.alephic.com/sabotage)***[:](https://www.alephic.com/sabotage) a 1944 document by the precursor to the CIA, I was struck by how closely the instructions for sabotage match the realities of corporate life in America. I hired a designer and printed a few hundred beautifully bound copies, which I gave away at [my conference](https://www.alephic.com/sabotage)**. **
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_d918b4ad-c088-4f28-9f6d-77c31b1faa14.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_d918b4ad-c088-4f28-9f6d-77c31b1faa14.jpg)

**A few books I’ve pulled off the shelf recently:** *Toyota Production System* (I’m thinking a lot about how we can take inspiration from these kinds of organizing principles [to align agents)](https://www.forwarddeployed.com/), *The Medium Is the Message* (Marshall McLuhan is a hero of mine and this comes off the shelf frequently when I just want to bump my brain a bit), and *[Orchestrating Ambiguity](https://www.desunbound.com/chapter/chapter-7)* (recently recommended to me, it’s a book of books about how to design for emergence in organizations).
**I really love working:** before anyone else has woken up, but that also requires that I wake up before then. So mostly it’s just morning time after I get my kids on the bus.
**My dog’s name:** is Kaiya. She’s two and a half, and very much a mutt.
[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_937d56b3-ff0e-4d82-b02a-97b94eb80dbe.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4190/optimized_937d56b3-ff0e-4d82-b02a-97b94eb80dbe.jpg)

---

*Noah Brier is the co-founder of Alephic. *
*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*
[Subscribe](https://every.to/subscribe?source=post_button)

‘
**’’**
