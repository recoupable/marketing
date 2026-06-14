---
title: "How to Build Your AI Therapy Bot"
subtitle: "With the right prompts, LLMs can emulate many of the functions—and even feelings—that we human therapists use on our patients"
author: "Mathias Maul"
date: 2025-03-03
column: p
url: https://every.to/p/how-to-build-your-ai-therapy-bot
paywalled: true
scraped_at: 2026-06-11T16:07:48.101Z
---

# How to Build Your AI Therapy Bot

*With the right prompts, LLMs can emulate many of the functions—and even feelings—that we human therapists use on our patients*

*I've been writing about and using AI for personal development and therapy for a few years—in fact, it was one of the original GPT-3 use cases that got me so excited about this generation of AI. But except for isolated cases, I've found that mostly the therapy establishment hasn't engaged with AI as much as I assumed it would. That's why I was excited to read this piece by ****Mathias Maul****. A therapist himself, he's deeply immersed in using AI to help himself and his patients. Read on for some practical tips about how to get language models to perform to help you help yourself.—*[Dan Shipper](https://every.to/@danshipper)* *

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

I was a 1980s teenager with typical 1980s teen issues. I kept mostly to myself, accompanied by my Atari home computer and a shelf full of *Zork* and its ilk: early computer games that let me immerse myself in text-only, first-person stories. Interactive fiction games had me glued to the screen for days on end, so I was curious when I stumbled upon the concept of an “electronic psychologist” in a computer magazine. After an hour of hacking the BASIC code from the magazine pages into my computer, a prompt flickered onto my screen:HI! I'M ELIZA. WHAT'S YOUR PROBLEM?

Until that day, no one had ever asked me this question without a hint of cynicism in their voice. After some back and forth with the program, a strange kind of connection emerged: For the first time in my life, I felt seen.

The replies were anything but perfect. The program did not really “understand” what I said and, for the most part, the responses were more funny than helpful. Because I had typed in the program, I knew that it was limited by 64K of RAM and my 1.77 MHz CPU. (Imagine trying to watch Netflix on your high school calculator.)

Still, this wondrous feeling of connecting with ELIZA stayed with me and shaped my career decisions. I went on to get a master’s degree in linguistics and machine learning/artificial intelligence, and started my education as a coach and psychotherapist as well. Prompted by my history of being a severe stutterer until my twenties, I was determined to help others solve their issues. My first job after graduation in 1999 was programming chatbots, which were just a bit more advanced than ELIZA. I was a developer by morning and afternoon and saw clients in the evenings. Today, I’m working with tech leaders and their teams to improve their interpersonal and emotional skills, augmented with AI.

However, it was only when I began training other coaches and therapists that I understood the limitations we were up against: We will never have enough mental health practitioners to reach even a fraction of the people who need help. The World Health Organization [estimates](https://iris.who.int/bitstream/handle/10665/356119/9789240049338-eng.pdf?sequence=1) that half of the world’s population currently lives with fewer than one psychiatrist for 200,000 people. Even the other half (like me and, most probably, you) struggles to find and pay for therapists.

My early experience working with ELIZA and chatbots gave me a special perspective on computer-based therapy tools. Computer-assisted therapists existed long before the proliferation of LLMs, but were inherently inflexible and bound by restrictions of understanding and producing language. With the advent of LLMs, sophisticated text and image processing capabilities are now widely available. They can help us begin to address the global shortage of access to psychotherapy by offering a judgment-free space where people can work through their thoughts at their own pace, experiment with different approaches to address their challenges, and build the confidence needed to take the next step in their therapeutic journey.

More significantly, generative AI can help us in spite of being incomplete and fallible: “Talking” to an AI can remove barriers of shame and stigma, and create a safe space in which change can become possible. This human-machine space is, of course, different from a human-human space. It’s an additional option, not a replacement. But it’s an option that you, as a person who wants to change, can create yourself.

## A therapist is a conduit for you

In therapy, the human connection does the heavy lifting. Therapeutic methods are mostly training wheels to help us work with you while we balance our vulnerability and boundaries to create what we call a “safe space.” A safe space is a setting in which you can re-enact, without judgment, what hurts you, experiment with new approaches to understanding yourself without the fear of failure, and heal.

As a therapist, I’m no more than an active observer to this process, and happily disposable. My main job is to keep up this safe space—or, as a colleague puts it, “to human” (where “human” is a verb) so you can change yourself.

It might seem like a paradox, but “humaning” is where today’s LLMs can shine. Claude and its kin are not humans—but they do not need to be in order to help us. They can do some of what therapists do best: Create a space for you to shake your unique snow globe and see what emerges. The space between you and Claude or GPT or Mistral will be very different from what might exist between two human beings. But it will still be *a *space, one that might be meaningful to those who have no one to talk to, cannot pay for counseling, or are ostracized by cultures that stigmatize mental and emotional issues.

## Let’s build an AI therapy bot

I’ll start with a disclaimer: This article cannot give, or replace, medical advice. Be especially careful when you suffer from severe trauma or similar issues that make you “lose control.” Certain diagnoses require human intervention, support groups, or hospitalization. While there is [evidence](https://pubmed.ncbi.nlm.nih.gov/38631422/) that LLMs can deliver empathetic therapeutic guidance, the American Psychological Association (APA) [warns](https://www.nytimes.com/2025/02/24/health/ai-therapists-chatbots.html) about using therapeutic chatbots. Generative AI is a new addition to an ages-old toolchain that allows us to [reduce suffering](https://www.nature.com/articles/s44184-024-00097-4) and become the person we aspire to be. It should be subject to the same careful scrutiny given to other therapeutic tools, like self-development seminars, therapists, and medication.

I encourage you to read up on [recent research](https://pubmed.ncbi.nlm.nih.gov/38631422/) and do the steps below in the spirit of curiosity. Also, consider choosing a safe spot (a corner of your sofa, maybe, or a café) that is the only place where you’ll talk with your therapy bot. This helps to “step out” of the sessions just like you would with a human therapist.

The steps I’m outlining are a simplified version of what I’m doing with my workshop participants and clients, and they are meant as a starting point. Ready-made “AI therapy bots” are available, but building your own has benefits that will become obvious as we go along. The word “artificial” in AI relates to “art.” You are the artist who uses an LLM to build a tool to work on yourself. Your result will be a prompt that you can save and paste into a new chat at the beginning of a conversation.

Play with the prompts and the choice of models. At the time of writing, for both myself and my clients, I strongly prefer Claude’s Sonnet 3.5 model above the many others I have tried. (From the beginning, Claude was fine-tuned toward having a “character,” which is evident when talking with Claude in a coaching setting. Doing the same with Google’s Gemini is like talking to a freezer as it tries to be “professional,” which is the last thing a good therapist should emulate. GPT is a bit in between.)

Please experiment which LLM works best for you, and be aware that there is no guarantee of consistency. Try locally installed LLMs as well, and know that just like me and you, AIs can and will change without notice.

The following steps will help you get you started:

### 1. Consider the why

---

**Become a **[paid subscriber to Every](https://every.to/subscribe)** to unlock this piece and learn about:**

- The 8-step process for creating your therapy bot

- Specific templates for use in prompting

- The power of self-reflection and personalization

[Upgrade to paid](https://every.to/subscribe)

[PAYWALL]
