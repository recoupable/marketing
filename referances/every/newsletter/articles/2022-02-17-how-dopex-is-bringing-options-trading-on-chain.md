---
title: "How Dopex is Bringing Options Trading On-Chain"
subtitle: "So dope, you’ll need to light some incense"
author: "Nat Eliason"
date: 2022-02-17
column: almanack
url: https://every.to/almanack/how-dopex-is-bringing-options-trading-on-chain
paywalled: false
scraped_at: 2026-06-11T16:08:43.700Z
---

# How Dopex is Bringing Options Trading On-Chain

*So dope, you’ll need to light some incense*

#### Sponsored By: OnJuno

This edition of Almanack is brought to you by [OnJuno](https://onjuno.com/?utm_source=almanack&utm_medium=newsletter&utm_campaign=r1), a new crypto-friendly bank account. OnJuno is a Sequoia-backed startup that helps you earn, save, and invest in crypto directly from your checking account. With OnJuno, you can:

- Set up your direct deposit and get a portion of your paycheck in crypto!

- Buy crypto instantly with zero fees

- Yield 4% on your USDC without any lockups

There’s no catch. OnJuno integrates directly with your direct deposit system, has no transaction fees, and is already being used by employees at Apple, Google, Amazon, Microsoft, and Uber. It's free to open an account and today you can [get $50 added to your first direct deposit](https://onjuno.com/?utm_source=almanack&utm_medium=newsletter&utm_campaign=r1) when you use the code ALMANACK.

[Learn More](https://onjuno.com/?utm_source=almanack&utm_medium=newsletter&utm_campaign=r1)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#d3a0a3bcbda0bca1a0bbbaa3a093b6a5b6a1aafda7bc).

One mental model I’ve found helpful is that if Bitcoin is money, Ethereum is finance.
The ability to build complex financial applications on top of Ethereum is what makes it so powerful as a tool for replacing our current financial infrastructure. Ethereum lets us create decentralized [savings accounts](https://cryptonat.substack.com/p/creating-a-high-yield-savings-account?utm_source=url), currencies, [loans](https://cryptonat.substack.com/p/alchemix-self-paying-loans?utm_source=url), and much more.
The history of DeFi so far could be described as “speed running” finance. It’s gone through many of the same building blocks as our current financial system, progressively extending the set of “money legos” you can combine together into this new paradigm.
Many of these money legos are yet to be built. We don’t have on-chain mortgages yet. You can’t sell your student loans to [AAVE](https://aave.com/). Insuring off-chain assets isn’t available yet. But for anything in the TradFi world that’s not in the DeFi world, the question isn’t “if,” but “when.”
Most [derivatives](https://www.investopedia.com/terms/d/derivative.asp) have yet to come to DeFi. Futures, swaps, options—these either don’t exist or barely exist in DeFi right now, which means most of finance is still locked in TradFi institutions. The global equities market is worth around $38 trillion. But the global derivatives market may be worth as much as $1 quadrillion.
For every dollar in equities, there is as much as $25 in derivatives. So unlocking on-chain derivatives could be a *massive* increase in the size of DeFi. And the protocols that do it successfully could generate insane amounts of revenue.
One of those protocols that’s already making serious headway on bringing this market on-chain is [Dopex](https://www.dopex.io/). An options platform living on [Arbitrum](https://cryptonat.substack.com/p/defriday-3?utm_source=url) that already has $77M of TVL and a market cap of $350M. And if Dopex can successfully build and popularize on-chain options, they have the potential to grow into one of the largest DeFi protocols on the market.
Let’s explore where they are, what they’re building, and where it might take them over the next few years.
I’ll cover:

- An overview of Dopex

- An explanation on their current core product: Single Staking Options Vaults

- Some limitations to these SSOVs

- Additional products they’ll offer in the future

- Their Tokenomics

- Ways to invest & earn yield with Dopex

- What to watch for in the future

## Intro to DOPEX

DOPEX stands for “Decentralized Options Exchange,” and they’re aiming to bring one of the largest derivatives, options, to DeFi.
In short, an *option* in finance gives you the “option” to buy or sell an asset at a certain price at a certain time. A “call” option gives you the right to buy at that price (call for the item), a “put” option gives you the right to sell at that price (put up for sale).
So if I buy a $3,500 Ethereum call option dated for March 25th, I have the right (but not the obligation) to buy 1 ETH for $3,500 on March 25th. If I buy a $3,500 Ethereum put option for the same date, I could sell 1 ETH for that price then. For more on options, check out the [Investopedia intro guide](https://www.investopedia.com/options-basics-tutorial-4583012).
Options have historically been tough to do on Ethereum because they involve more frequent trading than just buying and holding an asset. A savvy options trader might buy a variety of puts and calls spread out across the future at different prices to hedge their exposure, but doing that on the Ethereum mainnet could easily rack up thousands of dollars in gas fees.
So while the Ethereum mainnet might be great for a new stock market, with people buying and holding ERC20 tokens, it’s not great for a new options market. For that we needed Layer 2s.
I’ve [written about Layer 2s before](https://cryptonat.substack.com/p/layer-2), and with the growing [popularity of Arbitrum](https://cryptonat.substack.com/p/defriday-3) there’s now an Ethereum L2 that has the necessary ingredients for a robust options market. Specifically:

1. Large amounts of liquidity (Arbitrum currently has 2.3B in TVL)

2. Extremely fast transactions (Arbitrum transactions settle near-instantly)

3. Low gas fees (Most transactions are $1-2 or less)

4. A proven, robust security model (Arbitrum inherits this from Ethereum)

Pieces of this puzzle have existed on alternative L1s and sidechains, but Arbitrum is the first network to provide the best blend of all four for an options market. And Dopex is leading the charge on building it.
Since options can get quite complex, Dopex is building up their offerings over time. Their core product right now is Single Staking Options Vaults (SSOVs), and you can use them to start trading or earning fees from on-chain options right now.

## How SSOVs Work: Dopex’s Core Product

A Single Staking Options Vault is a self-contained decentralized options market for a single asset.
Let’s use the [ETH Call SSOV](https://app.dopex.io/ssov/manage/ETH) as an example.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_9fEx13Pt_jWVTb0y2bBe2O8LfjxptVB6abe-p8oPKIUwGa4OTHzfNQgvd4gfu7DvTqjOHTV4Mf6mrK0lS22Hjmtbjh3X7x6r8UWYlBLgdakaddtLxQC7T4WIOjXlIXDacwvtSKF_.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_9fEx13Pt_jWVTb0y2bBe2O8LfjxptVB6abe-p8oPKIUwGa4OTHzfNQgvd4gfu7DvTqjOHTV4Mf6mrK0lS22Hjmtbjh3X7x6r8UWYlBLgdakaddtLxQC7T4WIOjXlIXDacwvtSKF_.png?link=true)

In this SSOV, you can do two things:

1. Deposit collateral into the option pool for rewards & fees

2. Buy call options on ETH using the liquidity provided by others

By depositing collateral (ETH) into this SSOV, you’re making it possible for other people to buy call options. In return, you’ll earn a share of the fees they’re paying (premiums) back to you in ETH.
If you buy call options from this vault, you pick the strike price you want to buy the options at and how many you want. Currently, the SSOVs operate on monthly “epochs,” with a limited set of strike prices, so you don’t have a ton of flexibility. But again, this is just the beginning.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_dwlJ1UVXi4MKsR3Zt_oEa9eIIvkLRp_qE3BARrOnAWiMi6tCmAOp6u8v-eEqFK_xR-9Tvu02Zx7rBiaWQ9Kw0SYO4Pm1CJu6W6BL_KdIZ5wz4RSuYZwq3kZy8OMww8pVg_jCrw-B.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_dwlJ1UVXi4MKsR3Zt_oEa9eIIvkLRp_qE3BARrOnAWiMi6tCmAOp6u8v-eEqFK_xR-9Tvu02Zx7rBiaWQ9Kw0SYO4Pm1CJu6W6BL_KdIZ5wz4RSuYZwq3kZy8OMww8pVg_jCrw-B.png?link=true)

Exercising your options with SSOVs is a little different though. Normally with options trading, you can exercise your option at its expiry date to buy the corresponding amount of the underlying asset. So if you had call options for ETH at a strike price of $4,000, and ETH was at $4,300 when the options matured, you would exercise them to buy the ETH at $4,000.
That’s not exactly what happens with SSOVs. Instead, if your options mature in the money (with a market price above the strike price) you can settle them for the difference between the market price and strike price, as denominated in the underlying asset. This infographic explains it best:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_dwlJ1UVXi4MKsR3Zt_oEa9eIIvkLRp_qE3BARrOnAWiMi6tCmAOp6u8v-eEqFK_xR-9Tvu02Zx7rBiaWQ9Kw0SYO4Pm1CJu6W6BL_KdIZ5wz4RSuYZwq3kZy8OMww8pVg_jCrw-B.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_dwlJ1UVXi4MKsR3Zt_oEa9eIIvkLRp_qE3BARrOnAWiMi6tCmAOp6u8v-eEqFK_xR-9Tvu02Zx7rBiaWQ9Kw0SYO4Pm1CJu6W6BL_KdIZ5wz4RSuYZwq3kZy8OMww8pVg_jCrw-B.png?link=true)

So in the I described, where you bought calls with a strike price of $4,000 and ETH was at $4,300 at maturity, you would get (4300 - 4000)/4000 = 0.075 ETH.
As a depositor, your total ETH balance is not protected, but the USD value is. If you deposit 1 ETH at the strike price of $4,000, you will either get back 1 ETH or $4,000 worth of ETH. And in both cases, you’ll also get all the premiums you earned along the way. This is what makes using Dopex as a depositor a little different from selling [covered calls](https://www.investopedia.com/terms/c/coveredcall). You don’t lose your entire principle if the calls you’re selling end up in the money, you only lose the difference.
As a call option buyer, you’ll either get back nothing, or you’ll get back the difference between your strike price and the market price, as denominated in ETH. For example, let’s look at the $2,500 call options from above:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_oFtn56J2Wesisct9wKQhJ7_92697XcR_zyWYjh-496s_orqS8YQSQ4nEjWEdkDzazydsRMk4Mm7LRPfWdLXa6ySJoo1kdQ_FMBf3AX2SzMSh79NBTNXW_HLqCQ7FX42DRmz9djcn.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_oFtn56J2Wesisct9wKQhJ7_92697XcR_zyWYjh-496s_orqS8YQSQ4nEjWEdkDzazydsRMk4Mm7LRPfWdLXa6ySJoo1kdQ_FMBf3AX2SzMSh79NBTNXW_HLqCQ7FX42DRmz9djcn.png?link=true)

These are currently priced at $626.13, which makes sense since the market price of ETH is $3,114. You’re paying $626.13 for the upside on a $2,500 ETH sold on 2/25. So if the current market price holds, the profit would be about $614, so you’d slightly lose money ($626 - $614). But if the price went up to $3,800, you’d end up making money because you’d get $3,800 - $2,500 = $1,300 in profit, minus the $626. But if ETH is below $2,500 on 2/25 you’d get nothing. Womp womp.
If you buy ETH options with a strike price of $4,000, you only pay a fee of $4. So if ETH is worth $4,004 or more on 2/25, you make money:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_irtCzEysdtZw6cYDiUlS00AtYBel6CoaxjxhMd6YXyPe7Qr3hVJAFv7mPJfnkERYtvK4hdZQGe_7AH20yImEOOXYtzgWfbhblBb8qpm289A7tF5e3mc9MZlH3CjbCHrFcIdAH6OY.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_irtCzEysdtZw6cYDiUlS00AtYBel6CoaxjxhMd6YXyPe7Qr3hVJAFv7mPJfnkERYtvK4hdZQGe_7AH20yImEOOXYtzgWfbhblBb8qpm289A7tF5e3mc9MZlH3CjbCHrFcIdAH6OY.png?link=true)

### Limitations of SSOV

SSOVs in their current form are just the starting point for Dopex’s suite of options-related products. And as such, they have some limitations.
First, they’re European-style options, which means they can only be exercised on their day of maturity. Say you buy some ETH calls with a strike price of $4,000 dated for 2/25. If ETH hits $4,200 on 2/22, you can’t exercise your options to claim the profit. You have to wait.
Another limitation is that these options contracts are not liquid. You can’t sell them to someone else once you buy them, you can only hold them and wait.
You’re also limited by the strike prices and dates you can choose. In the current epoch, there’s only one end date, and only four strike prices. I suspect this is partially a demand problem though, and as Dopex becomes more popular, they’ll expand their options.
Most of these limitations come down to the SSOV product being early though. They’ve made it clear that they’re going to expand to American-style and liquid options over time. As a first implementation, it’s quite impressive, and it’s a simple model that could be used by Dopex to provide at least basic options markets on any token on Arbitrum.

### Future Products

SSOVs are only the first in Dopex’s planned suite of options-related products. Their roadmap shows a variety of future things they plan to offer as well, including:
[Atlantic Options](https://drive.google.com/file/d/1r41Ma8NxAMsayUsYQLMAhah8vdc9BG4l/view), with flexible exercise timing and liquidity for buying and selling options contracts.
[Redacted Option Vaults](https://blog.dopex.io/articles/introduction-series/introducing-the-redacted-option-vaults), which would give you a further way to speculate on the [Curve Wars](https://cryptonat.substack.com/p/curve-wars?utm_source=url).
Insured Stablecoin Pools, for lower-risk yield farming on stablecoins.
Leveraged options trading, synthetic assets, and much more.
That’s where Dopex’s product is right now, how you can use it, and where they plan to take it in the future. Now let’s look at them from a crypto investment perspective.

## Dopex’s Tokenomics

The first thing that stands out with Dopex’s [tokenomics](https://cryptonat.substack.com/p/tokenomics-101?r=5cml) is their two-token model. DPX is the core governance and value token, which you might buy if you want to invest in the platform.
rDPX is “rebate” DPX, which is awarded to people who lose money in their options trades, and then can be used for a variety of functions on the platform. rDPX makes option trading on Dopex a little more interesting, since even if your options turn out to be losers, you still get some rDPX as a reward for playing.
DPX has a fixed supply of 500,000 being emitted over 5 years starting in late 2021. Its two uses are to vote on Dopex governance proposals, and to earn fees from the platform.
By staking DPX, you get a share of all the fees generated on the platform. One of the questions with any token is “why should you hold it?” and for DPX, the answer is that it’s worth holding if you believe the fees generated from it will offset or exceed any loss in value from inflation. Considering the potential size of their options market, it does seem as though staking DPX has the potential to generate some serious cashflow:
*“The Dopex protocol collects fees from option pool purchases, swaps, volume pool penalties, strategy vaults etc. All the fees collected would be distributed to DPX token holders at the end of weekly global epochs.” *- from their [tokenomics doc](https://docs.dopex.io/tokenomics).
If DPX is the governance and fee accrual token, what’s the point of rDPX? rDPX does not have a fixed supply, so there’s no inherent scarcity to it. But it does or will have a variety of uses as the platform evolves. From their tokenomics docs again:

- rDPX is how you’ll pay fees for future apps such as vaults.

- rDPX will be usable as collateral for leveraged option positions or to mint synthetic assets.

- Staking rDPX will boost the fees you generate for staking DPX.

These value props are honestly a little less clear. Why give away a token to people who lose money on options, which they can then use to increase the fees they earn from other people trading options? Why does this token have value to borrow against?
I think the main value is minting synthetic assets and using rDPX for paying fees. If rDPX becomes the fee layer for Dopex, then Dopex and DPX holders earn a small additional tax on all transactions that they wouldn’t earn if everything were paid in ETH or USDC. It also has the benefit of not feeling like “real money” since you probably earned a lot of it for free, which should increase activity on the platform.
In terms of emissions and distributions, Dopex is fairly generous. Approximately 20% of their tokens were immediately released to the market, with the rest unlocking somewhat linearly over 5 years:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_cf3kbgrz6dhlwU71MKm3YTSKPzIMI0syjuflJAdbKD_SBPjEeuOVZ6DM11nkW-cXKSiqX9UhIuGTiYWGUqcfHzX32ik34qJNzzjyYcX885UFuVqwQZe83xdYmqaBSQ1QU28TDasy.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2037/optimized_cf3kbgrz6dhlwU71MKm3YTSKPzIMI0syjuflJAdbKD_SBPjEeuOVZ6DM11nkW-cXKSiqX9UhIuGTiYWGUqcfHzX32ik34qJNzzjyYcX885UFuVqwQZe83xdYmqaBSQ1QU28TDasy.png?link=true)

They did have a decent chunk go to investors, but those tokens were either immediately unlocked or vested linearly over 6 months. The team vest is also linear over 2 years. So while there are a good number of tokens going to the team and investors, they’re being dripped out constantly instead of all unlocked at once, so there shouldn’t be any sudden sell pressure events.
Here are the full details on their distribution (again from their docs):

- Operational Allocation: 17%

- Distributed across 5 years. This allocation is used to initially handle governance, incentivize development of community suggestions and help grow the platform with newer features/upgrades and account for other operational costs.

- Farming (Liquidity Mining): 15%

- Farming period is set to 2 years with an initial boosted rewards period of 4 weeks.

- Platform Rewards: 30%

- Distributed over a period of approximately 5 years. These rewards will incentivize the use and upkeep of the Dopex platform.

- Founders Allocation: 12%

- 20% initially staked in liquidity pools

- 80% vested for 2 years distributed using a drip system via a smart contract

- Early Investors & Token Sale: 26%

- Early Investors: 11%

- 50% Vested over 6 months

- Token Sale: 15%

Personally when I see only 12% to the founders, with 45% going out to the community through use, I think that’s a pretty good sign. It could definitely be gamed, since the early investors and team members will have a leg up on the liquidity farming, but anyone with a decent pool of capital could acquire a large stack of DPX tokens.
17% allocated to operations over five years isn’t bad too. And the five-year emissions schedule is also promising—they’re taking their time with this.

## Possible Investing & Yield Earning Plays

There are a few ways you could get exposure to Dopex beyond just buying and holding the token, including another platforms you might look at as competitors or complements. I outline them in the addendum to this post for paying subscribers (tk).

## Things to Watch

Whether or not you’re interested in options trading, or investing in a platform like Dopex, there will be a few things to keep an eye on with them over the next year.
One will be how quickly they can grow the robustness of their options platform. Having a small set of strike prices with only one date is limiting, so if they can find a way to expand their options options (heh) they’ll be able to attract many more participants.
Another will be how aggressively they integrate other partners who want to offer options trading on their tokens. Will they go an Olympus Pro route and eventually offer permissionless options pools for protocols who want to enable further speculation on their tokens?
They also seem to be angling to get involved in the Curve Wars, at least indirectly. What will their Redacted pools look like, and will that affect the best way to engage in the battle for Curve & Convex dominance?
And what will they do with rDPX? Right now it mostly seems like a promise of future utility. Will it end up being worth holding and using for paying fees and minting synthetic assets? What will those synthetic assets be, anyways?
In the meantime, it already offers an exciting new way to speculate on the prices of a few major crypto assets. If you want to try it out, all you need to do is [connect to their app on Arbitrum](https://app.dopex.io/ssov) during one of the end-of-month windows, and deposit some collateral or buy a few options.
At least even if you lose money, you’ll get some free tokens out of it.

## Possible Plays for Investing and Earning Yield

If you want to invest in Dopex, there are a few options that are interesting to me.
First, you can obviously just buy and hold the token. If you think it’s likely to outperform ETH over the next few years, buying it and [staking it for 16%](https://app.dopex.io/farms) on the app isn’t a bad plan.
I personally find the DPX/ETH staking pool a little more interesting. It’s paying 106% APR right now, and the rewards are paid in DPX and rDPX which you could just compound into more LP tokens every week or two.
Plugging some numbers into [DeFi Calcs](https://www.deficalcs.com/), even if DPX doubles against ETH over the next year you would still make more money by LPing than by staking DPX.
Let’s assume no compounding. Staking 10K of DPX would get you to 20K DPX + ~$2,400 in rewards.
Staking 10K of LP would get you to $14,142 in LP + ~$12,071 in rewards. So you’d have $26K vs $22K.
If Dopex triples against ETH then you start to lose money against holding. But also if Dopex drops against ETH, you do much better in the LP situation as well. So for me for now, I’m more interested in being in the LP than the single stake, at least until the rewards get better.
Then there’s the question of what to do with the DPX and rDPX rewards. I don’t see any reason to hold rDPX right now, so I’ll be selling it for more DPX or DPX/ETH liquidity.
My plan for now is to keep compounding all rewards into more liquidity until they:

1. Launch veDPX, where there’s an incentive to lock it up for greater yield

2. Introduce rDPX staking for boosted yield

3. Add more fee generation so there’s a higher yield on DPX

4. Add vote delegation, so there’s a market for veDPX

As those things come onto the horizon, it will likely become more profitable to hold veDPX so I’ll switch over my liquidity to that. Obviously my stance on this might change, but that seems like a good yield-maximizing strategy for now.
Two other things I’m looking at related to this are Premia, and JonesDAO.

### Premia

[Premia](https://app.premia.finance/) (you’ll need to VPN if you’re in the US) also allows for options trading, and they have a larger variety of dates and strike prices. They’re also US-style options, so you can exercise them whenever. Premia’s market cap is 1/10th Dopex’s, and it seems much more under the radar, despite having a seemingly more built-out product.
Why? Well, probably because Dopex has the whole Tetranode economy beyond it, and is part of the broader Olympus ecosystem. That brings a lot of money and attention with it. Dopex also seems to be focusing on enabling options trading for many tokens, in a decentralized, bottom-up manner, whereas Premia seems more focused on creating a Robinhood-esque interface for options trading on major tokens.
I like Premia, and I have a small investment in it as well. Though I’m a little less confident on its ability to win simply because of the energy and money behind Dopex. Given the market cap, though, it feels like a bet with potentially high upside. It is worth mentioning though that Premia’s tokenomics are [much less favorable to the community](https://docs.premia.finance/governance/premia-tokenomics).

### JonesDAO

JonesDAO is [another Arbitrum project](https://jonesdao.io/vaults)where you can deposit ETH or GOHM and they’ll farm yield from Dopex SSOVs for you.
If they can sustain their advertised ~11% yield on ETH, that’s quite good, since it’s on the higher end for ETH yield available on the market.
Their token has taken a massive beating since launch, so it might not be a bad time to go in if you believe they can generate meaningful fees from their active options trading. I could also see them taking a Convex-style approach with trying to corner the market on DPX tokens and Dopex voting, giving the JONES tokens a lot of value down the line.
Staking their token with ETH or USDC is also paying above 100% right now. I’m not invested in JonesDAO currently, but it’s on the shortlist now for things to look at next. If they can be the Convex to Dopex’s Curve, it’ll end up being a pretty powerful protocol.
