---
title: "How Tokemak Automates Low-Risk Yield Farming - DeFriday #16"
subtitle: "Tokemechs, roll out!"
author: "Nat Eliason"
date: 2021-10-22
column: almanack
url: https://every.to/almanack/tokemak-defriday
paywalled: false
scraped_at: 2026-06-11T16:08:48.807Z
---

# How Tokemak Automates Low-Risk Yield Farming - DeFriday #16

*Tokemechs, roll out!*

*This week’s newsletter is sponsored by On Deck’s new community-backed accelerator, ODX. ODX backs you with $125,000 and an All Access Pass to the On Deck network to hire talent, fundraise, and find customers. Read more details at the bottom of the post or check out the details below.*
[Learn more](https://beondeck.com/x?utm_source=almanack&utm_medium=newsletter&utm_campaign=odx)
There are two primary sources of passive income from crypto assets:
The [first is lending](https://every.to/almanack/creating-a-high-yield-savings-account-with-crypto-defi), where other people pay you interest to borrow your crypto so that they can make leveraged investments of their own.
The second is yield farming, where you provide liquidity to decentralized exchanges in order to earn trading fees, and then stake those liquidity pool positions to earn additional incentives.
With crypto lending, you might earn 2-10% APR even on lower-risk assets like stablecoins. Compared to TradFi that’s an insanely great interest rate, but in the crypto world, it’s nothing too crazy.
The right liquidity pool might pay hundreds, or even thousands, of percent per year in incentives. Now, a 1000% APR is usually not quite real, as I wrote about in “[where does the yield come from?](https://every.to/almanack/defi-yields)” but even if the true APR is 20% that’s still insanely good!
But there are a number of downsides with trying to find these high-yield opportunities for your assets.
**Gas prices are insanely high** right now, and it might cost a few hundred dollars to reallocate your portfolio.
**Interest rates can change suddenly**, especially as other people dilute the yield. What was a great opportunity a week ago might have a mediocre interest rate today.
**Opportunities are popping up constantly**, and if you’re not spending all day chugging coffee hopping between Discord servers you might not catch them.
Altogether, it makes Yield Farming into a high effort, high cost, and not guaranteed to be lucrative activity. And with gas prices the way they are, if you aren’t moving around 6-figures worth of crypto, yield farming on Ethereum might not even be an option for you.
Or at least, it wasn’t an option for you, before [Tokemak](https://www.tokemak.xyz).
Tokemak launched on Ethereum last month, and it aims to solve the challenges presented by yield farming for investors and for protocols.
In short, Tokemak allows you to deposit single assets like ETH and USDC and let Tokemak do the yield farming for you **without worrying about impermanent loss or finding the best opportunities**. And Tokemak insures this with some clever game theory that turns traditional investment risk on its head.
The options are limited for right now, but currently, it’s paying 14% APR on ETH, and 27% APR on USDC. And soon you’ll be able to deposit other crypto assets, like Alchemix ([article here](https://every.to/almanack/alchemix-self-paying-loans)), Olympus ([article](https://every.to/almanack/olympus-dao)), Sushi, Tracer, and Frax.
High APRs from yield farming, without the work of finding the best opportunities and without the risk of impermanent loss? It sounds too good to be true, so what’s going on inside the Tokemak?

## Enter the Tokemak

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1906/optimized_CleanShot%202021-10-22%20at%2011.44.30@2x.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1906/optimized_CleanShot%202021-10-22%20at%2011.44.30@2x.png)

Tokemak is meant to be a set-it-and-forget-it option for DeFi investors with idle tokens they want to earn yield on.
If you have some ETH, ALCX, SUSHI, or other tokens sitting in your wallet, you probably *want* to earn yield on them, but finding the best opportunities is hard, and you don’t want to fall victim to [impermanent loss](https://www.youtube.com/watch?v=BmFsT-B02Kw&t=1s).
So instead, you go to Tokemak. You simply deposit whatever token you want to earn yield on, and then you can come back any time and harvest the yield you’ve earned in the form of “TOKE,” their native token.
You can keep your TOKE staked on their platform to earn a share of all the pools they’re allocating capital towards, you can sell it for more of your underlying asset, or you can just hold it. The choice is yours.
And then if you ever want your original asset back you simply request to withdraw, wait a day, and then get your withdrawal. The delay is in place because the deposited assets are being allocated to liquidity pools, and those positions may need to be closed out to meet withdrawal demands.
Tokemak promises to always protect your initial deposit amount, so barring any catastrophic event, you’ll always be able to get back however much ETH, USDC, SUSHI, or whatever asset you deposited.
And so long as your assets are still deposited, you’ll be able to claim your TOKE earnings every day. Earnings are paid out in TOKE so that the underlying assets can continue to be put to work, and all TOKE issued represents assets stored in the Tokemak liquidity pools, giving some backstop to their value. While not the same process, it’s similar to how the value of OHM is backed by [crypto in the Olympus treasury](https://every.to/almanack/olympus-dao).
It’s deceptively simple on the front end, so how is this all working on the backend?

### What Tokemak Does with Your Tokens

Liquidity deployment hasn’t begun yet, so Tokemak rewards are currently from them issuing tokens to stakers. But in the next few weeks, they’ll start putting those tokens to work, to earn depositors yield from the various opportunities in the market.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1906/optimized_axDwMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwMCCAaEpoSkVOQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGIgaEJqKPnahkuZGNUAGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBn4DQlNCUypyDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwEDUgNBV9rMLaX1izj30YYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGFgwITQlNqcgxwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMBA1IDQVPSxC5U0N6oBMsAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDwGzgiiSfA9Fi22wAAAABJRU5ErkJggg==.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1906/optimized_axDwMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwMCCAaEpoSkVOQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGIgaEJqKPnahkuZGNUAGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBn4DQlNCUypyDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwEDUgNBV9rMLaX1izj30YYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGFgwITQlNqcgxwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMBA1IDQVPSxC5U0N6oBMsAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDwGzgiiSfA9Fi22wAAAABJRU5ErkJggg==.png?link=true)

Once you deposit a token into Tokemak, they allocate it to one of the places where it can earn a good return. As an example, when you deposit ETH, it could end up on [Convex’s](https://convexfinance.com/) stETH pool earning 6-7%, or maybe in the [Alchemix](https://app.alchemix.fi/) alETH Curve Pool earning 12%.
The pools they choose to allocate assets to are voted on by “Liquidity Directors” coordinating through the Tokemak DAO. If you hold TOKE tokens, and stake them on the Tokemak protocol, you become a liquidity director and can vote on where tokens should be allocated to earn the best risk-adjusted return.
As a liquidity director, you get to decide how the protocol allocates its funds, and you get to share in the return of whatever you vote to allocate funds towards.
So by owning a piece of the protocol, you get to share in the profits of its yield farming activities, and you get to influence how those funds are allocated.
If you’re a big protocol or an exchange, it makes sense to hold a chunk of TOKE tokens so you can direct more funds towards your token and your preferred exchanges. And even if you’re a smaller investor, this lets you aggregate your tokens into one place and earn rewards from all of them.
You can stake your assets, or your TOKE, and earn passive rewards from the various yield farming activities the protocol is employing. But how do they protect your original deposit amount, without exposing you to the risk of impermanent loss?

## Tokemak’s Protection Mechanism

By staking your TOKE you earn a share of the protocol fees, but you’re also taking on some of the protocol’s risk.
Tokemak’s goal is to deploy liquidity in a way that protects its deposits from any serious risk, but it’s always possible they could end up in a situation where, due to impermanent loss, they don’t have enough ETH or USDC to return it to all their depositors.
In the event that happens, they first try to pull from any surplus stored in the treasury, but if that’s not sufficient, they can slash some of the staked TOKE. They would claim some of the staked TOKE, sell it for whatever asset they’re deficient in, and then use that to repay the depositors.
The odds of this happening should be low since their goal is to only earn yield in ways where there’s a minimal risk of long-term impermanent loss, but it does add another dimension to staking. Normally, you just stake a protocol’s tokens and earn some passive income off it. But with Tokemak staking, you get to influence the decisions of the protocol, earn passive income from protocol activities, and you’re helping secure the protocol against loss.
It also helps push the risk-taking decisions on to the stakers. If you know your funds might be slashed for making risky moves with other people’s tokens, you’re probably going to be a little more responsible. Unlike in TradFi where a rogue banker mostly loses other people’s money, in Tokemak, **if you do something irresponsible, the depositors still get their money back and your stake gets slashed instead.**
This is what makes Tokemak so interesting to me. It’s like a hive-minded hedge fund where capital allocators earn some extra rewards, but also take on most of the risk. And depositors are protected at the protocol level from having their funds lost. It creates a really virtuous cycle of incentives, where everyone wants everyone else to do as well as possible, since that’s also the individual-maximizing outcome.
Tokemak is just getting started, and plans to begin allocating liquidity in the next few weeks. If you want to get involved, you can check them out [on their site](https://tokemak.xyz/). Even though allocating hasn’t started yet, you can start staking now and earn some TOKE for doing so.

**Sponsored by On Deck**
***A new home for the best founders in the world***
*Startups provide hope of building a better future. *
*They drive economic growth — leading to job creation, improved quality of life, and meaningful progress towards solving society’s biggest problems. *
*We need more startups, but for every founder who starts a company, there are hundreds sitting on the sidelines – a massive waste of human potential. *
*That’s why the launch of ODX is so exciting. It’s a ****$100 million community fund**** designed to put the next generation of global founders in business. *
*ODX backs founders as early as they need with a ****$125,000 and an All Access Pass to the On Deck network**** – thousands of companies, founders, operators, and investors you can tap into for talent, capital and distribution. *
*Alongside ODX, On Deck is introducing ****Runway Grants, a $25,000 advance ****given**** ****on a selected basis for people who haven’t yet committed to starting a company but need to cover living expenses or healthcare during their exploration phase.*
*Whether you’re a seasoned founder or still pre-conviction, I ****highly ****encourage you to check out ODX. *
[Learn more](https://beondeck.com/x?utm_source=almanack&utm_medium=newsletter&utm_campaign=odx)
