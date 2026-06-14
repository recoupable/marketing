---
title: "A Dynamic Framework for Making Product Decisions"
subtitle: "Frustrated with product frameworks that feel static and forced, I built one that can evolve along with my thought process"
author: "Edmar Ferreira"
date: 2025-03-04
column: source-code
url: https://every.to/source-code/introducing-vice-a-dynamic-framework-for-making-product-decisions
paywalled: true
scraped_at: 2026-06-11T16:07:48.395Z
---

# A Dynamic Framework for Making Product Decisions

*Frustrated with product frameworks that feel static and forced, I built one that can evolve along with my thought process*

Having built products for over a decade, I've encountered my fair share of challenges when it comes to prioritization. Whether it's deciding which features to build next or figuring out how to allocate resources, it often boils down to balancing intuition with structured [frameworks](https://every.to/c/ai-frontiers).

I've experimented with various methods, from gut-driven decisions to widely-used scoring systems like RICE (Reach, Impact, Confidence, Effort), a framework that was popularized by the customer support software firm Intercom and is now used at companies like Spotify and DoorDash. You score your proposed product decision from 0 to 10 for each category and use those category scores to compute a final score. Features that score the highest should be prioritized.

While these scoring methods bring much-needed structure to decision-making—helping teams quantify and compare different opportunities—I've always felt they miss a critical element: the subtle interplay of human judgment and context.

Why do we try to reduce complex, multi-dimensional decisions to absolute scores? These scores often feel like a facade—an attempt to rationalize instinct rather than genuinely informing our choices. So I decided to explore how we might evolve these frameworks, maintaining their structural benefits while embracing a more dynamic and intuitive process.

Driven by these frustrations—and inspired by the principles of selfish software—I built my own prioritization tool. I called it VICE**: **Vibe, Impact, Confidence, Effort.

VICE is designed to reflect the nuances of human judgment, intuition, and evolving context. And like the best [selfish software](https://every.to/source-code/selfish-software), it started as a tool I built purely for myself. Now, I’m excited to share it—because I believe prioritization should feel intuitive, flexible, and genuinely useful, not just structured and rationalized.

## The limits of absolute scoring

The RICE (Reach, Impact, Confidence, Effort) product prioritization framework works by giving scores for each of its attributes and computing a final score. For example:

-
**Reach:** How many people will this feature impact? (Estimate within a defined time period.)

-
**Impact:** How much impact will this feature have on each person? (Massive = 3x, high = 2x,medium = 1x, low = 0.5x, minimal = 0.25x)

-
**Confidence:** How confident are you in your estimates? (High = 100%, medium = 80%, low = 50%)

-
**Effort: **How many “person-months” will this take? (Use whole numbers and a minimum of half a month. Don’t get into the weeds of estimation.)

Score = (Reach * Impact * Confidence)/Effort

Let’s use this formula in two examples that we’re considering building:

1.
**A simpler onboarding tutorial** that’s quicker to build and directly addresses user drop-off.

2. A **chatbot upgrade** that improves user interaction and requires significant development time.

#### Example 1: Onboarding tweak

-
**Reach:** 5,000 new users per month who go through the onboarding process

-
**Impact:** High (2x)—significant improvement to user understanding and retention

-
**Confidence:** Medium (80%)—based on similar changes and user feedback

-
**Effort:** 0.5 person-months (a relatively quick implementation)

RICE score calculation:

- Score = (Reach × Impact × Confidence)/Effort

- Score = (5,000 × 2 × 0.8)/0.5

- Score = 16,000

#### Example 2: Advanced chatbot integration

-
**Reach:** 12,000 users per month who use customer support

-
**Impact:** Medium (1x)—improved support experience

-
**Confidence:** Low (50%)—new technology with uncertain adoption

-
**Effort:** 4 person-months (substantial development effort)

RICE score calculation:

- Score = (Reach × Impact × Confidence)/Effort

- Score = (12,000 × 1 × 0.5)/4

- Score = 1,500

According to the RICE framework, the onboarding tweak (score: 16,000) would be prioritized over the chatbot integration (score: 1,500). The onboarding tweak affects a substantial number of users, has a high impact and good confidence, and requires minimal effort, resulting in the highest overall score.

Frameworks like RICE provide structure and clarity, forcing you to think critically about the impact, confidence, and the effort necessary to achieve an outcome. When I first adopted the RICE framework in my role at a previous company, we had a backlog overflowing with ideas, each backed by passionate team members. By scoring each idea with RICE, we discovered that our excitement had previously blinded us—some high-effort tasks had low projected impact. One initiative, that seemingly modest onboarding tweak we’d overlooked, surfaced as a clear winner. We prioritized it, and within weeks our user retention jumped nearly 15 percent. RICE cut through our biases, showing us what mattered most.

But they also come with significant limitations:

**Assigning absolute scores to features is rarely an objective process.** Personal biases and incomplete data can easily influence how we evaluate a feature's impact or the effort it requires. Stakeholders may overestimate the impact of initiatives they champion while underestimating technical complexity they don't fully understand. That can lead to skewed prioritization decisions that don't reflect true value.

**Predicting precise values for attributes like impact or reach is inherently difficult,** especially for innovative or unprecedented features. Scores may be more guesswork than grounded reality. Without historical data or comparable reference points, teams resort to speculation and assumptions, undermining the framework's purpose of bringing objectivity to the process.

**Scores can oversimplify complex trade-offs**, leading teams to prioritize the "highest score" rather than what's truly valuable. Therein lies one of the principal dangers in letting numbers dictate decision-making: It often results in short-sighted decisions that look good on paper but fail to address deeper user needs or business objectives.

[PAYWALL]
