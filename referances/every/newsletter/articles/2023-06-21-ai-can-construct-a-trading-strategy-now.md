---
title: "AI Can Construct a Trading Strategy Now"
subtitle: "And it means there are big changes ahead for what software can do"
author: "Evan Armstrong"
date: 2023-06-21
column: napkin-math
url: https://every.to/napkin-math/ai-can-construct-a-trading-strategy-now
paywalled: true
scraped_at: 2026-06-11T16:08:17.986Z
---

# AI Can Construct a Trading Strategy Now

*And it means there are big changes ahead for what software can do*

If you have ever worked for an asshole, you’re likely familiar with the 9pm email entitled, “Pls fix.” Your boss, busy with the drive between the lake house and the beach house, is unable to give you feedback on a deliverable;’ they simply want you to “make it better.” I’ve gotten that email. You’ve gotten that email. And we lowly knowledge labor serfs, united in our poverty and consternation, have probably had the same response: “Fix *what*?”

Essentially, your boss is asking you to understand their intentions based on historical context and your personal capability. A good boss will highlight the sentences they want changed, the icons they want adjusted, the companies they want you to invest in. They’ll tell you exactly what they want and you can respond appropriately.  Unfortunately, bad bosses outnumber good bosses by exactly 2.2B to one, so most people will never experience the euphoria of satisfaction in the workplace.

However, if you’ve ever been a manager, you know that a “good” direct report is able to magically transform your vague idea into a really great outcome. You can say, “find me a stock to invest in,” and a good employee will come back with something dazzling. The less time you have to spend specifying what you are looking for, the more valuable that employee becomes.

This feedback and deliverables input/output dynamic is not restricted to the overworked zealots of finance. In programming, the computer is the employee and the software user is the manager. However, the computer is a rather peculiar and frustrating direct report—it only understands incredibly precise commands. In return, you get incredibly precise outputs. There are no surprises, only inevitabilities.

However, what makes large language models fascinating is that they represent the first time you can give computers a generic, natural language prompt input and receive a directionally accurate but rarely-exactly-what-you-were-thinking output. Previously, in programming a computer you had to think step by step. Now you can give a computer a starting point and an end goal, and it will fill in the steps for you—this is a big deal.

This is a fundamental improvement in the way we interact with technology. Just as C++ is an abstraction layer on top of binary, AI is an *abstraction layer over lower level thinking. *In other words, with AI you don’t have to be as specific as programming or as precise as an excel formula. Instead, you can give a somewhat generic prompt and  still get a useful output. You can be a bad manager and still get the results you need from your robot employee.

This gets even more awe-inducing when we consider these systems’ breadth and depth of capability. In previous experiments, I have used GPT-4 to create financial models with prompts like [“let’s do a dcf.”](https://every.to/napkin-math/meet-your-new-finance-intern-gpt-4) (discounted cash flow). I’ve had it check data quality in an audit, with the prompt (and I promise this is how I typed it) “[yo is the data good?](https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance)” In both cases the AI was able to translate my poorly communicated intentions into a quality analysis.

Now, using productivity software to accomplish more information labor isn’t a new practice. In the last ten years, places like ServiceNow (workflow platforms) or UIPath (robotic process automation) popularized workflow automation, but those all relied on some manual setup. The tools are powerful—but they are confusing. To really make them work, you have the same problem as programming: very specific inputs to get very specific outputs.

However, AI can change all that. Previous software paradigms aren’t nearly as flexible, powerful, or imaginative as AI systems are. Once LLMs are fully deployed in productivity software, there will be a fundamental reimagining of what labor is and what it looks like. There will be a much tighter relationship between underlying databases and the labor done on top.

I’ve tried dozens and dozens of tools, trying to get an example that proved this thesis and I’ve finally found it. My proof is [Composer](https://www.composer.trade/). It does two things:

1. Use LLMs to easily automate investing workflows

2. Use LLMs to automate lower level thinking to tell you what workflows to build

### Automating workflows

Composer is a tool for investing.

The average retail trader doesn't have access to the technology that allows for really complex trades. Composer solved that problem by building software that allows consumers to build, backtest, and then execute trades. If Robinhood is for drooling lemmings addicted to the adrenaline rush that comes from gambling your life savings, then Composer is for physics PhDs trying to make enough side money to justify spending 15 years in uni. The company has been around for three-ish years and has done over $1B in trading volume and 900K+ trades.

Before they integrated AI, if you wanted to build a trade in Composer, your primary tool would be a flow chart.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2649/optimized_3KVLpTC_uKiQRkjOMAQn-IEcRuCUExPC-prrxvRlMvedjwO2SpRYWPltRiIAyN1mluXa3mgKlvbWsKuA-_WiWmnSbYOLPhw_acBseYN5zTbJ2my5GjYS0sYKKr-80Nxhw3TN896pMuPPoC9j_0bTZpU.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2649/optimized_3KVLpTC_uKiQRkjOMAQn-IEcRuCUExPC-prrxvRlMvedjwO2SpRYWPltRiIAyN1mluXa3mgKlvbWsKuA-_WiWmnSbYOLPhw_acBseYN5zTbJ2my5GjYS0sYKKr-80Nxhw3TN896pMuPPoC9j_0bTZpU.png?link=true)

Then that trade would get compiled into a set of programming instructions. Let’s say you want to build a trade that profits whether inflation goes up or down. The code looks something like this:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2649/optimized_OMh2zEIRYqvJuskayzSBja24ZHrDtB6thLmpHYiA2B6FgyJgV5FGy5tuATHlawaYGHA2X1-EX_jru3uKhBmNDDrXpSfkqZehvETiWNs_Opq1wbzNnlCuUVmgzvw0tak3t6IiuvsQ_6XrxSHODQEdJrk.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2649/optimized_OMh2zEIRYqvJuskayzSBja24ZHrDtB6thLmpHYiA2B6FgyJgV5FGy5tuATHlawaYGHA2X1-EX_jru3uKhBmNDDrXpSfkqZehvETiWNs_Opq1wbzNnlCuUVmgzvw0tak3t6IiuvsQ_6XrxSHODQEdJrk.png?link=true)

[PAYWALL]
