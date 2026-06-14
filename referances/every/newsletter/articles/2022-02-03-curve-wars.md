---
title: "Field Guide to the Curve Wars: DeFi's Fight for Liquidity"
subtitle: "Curve, Convex, Llamas, Butterflies, Token Reactors, and a Big Bag of Stablecoins"
author: "Nat Eliason"
date: 2022-02-03
column: almanack
url: https://every.to/almanack/curve-wars
paywalled: false
scraped_at: 2026-06-11T16:08:44.485Z
---

# Field Guide to the Curve Wars: DeFi's Fight for Liquidity

*Curve, Convex, Llamas, Butterflies, Token Reactors, and a Big Bag of Stablecoins*

[Crypto](https://every.to/c/crypto) is a giant game of incentive design, with billions of dollars on the line.
Projects who design their incentives intelligently win massive power and wealth. Projects with poorly designed incentives see their tokens go to zero.
Most incentive design in [DeFi](https://every.to/c/defi) is focused on solving two problems:

1. Discouraging people from selling your tokens

2. Encouraging people to make your token more liquid

Historically that type of reward structure has been direct: I pay you a steady stream of tokens for the liquidity you’ve created for my token. But now we’re seeing marketplaces for liquidity, where leading protocols can aggregate various opportunities for investors to earn yield income by providing liquidity. And where protocols can pay investors to help them increase the liquidity of their tokens.
This aggregation, and the competition for liquidity that comes with it, is playing out across a variety of platforms but the battle is hottest on [Curve](https://every.to/c/curve) Finance. Thus the competition for liquidity is affectionately known as “The Curve Wars.”
But as we’ll see, Curve is just the beginning. The Liquidity Wars will likely shape the future of DeFi, and define many of the coming investment opportunities.
To understand what’s going on, we need to start with the app that looks like it was built on Windows 95: [Curve](https://curve.fi/).

## What is Curve

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_E_E9u1lX_kXtpWLw_F-EN3dxAKCcrveH8DRrUPa17joKXxGh7jR_a9iyRlyg0K0CKiqUIZm99FOunZq-bHriaNjBONNRSyRg-bJCLsNNLrrX3bgKXj4JvYQ-3eEypUS0EMBViwGG.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_E_E9u1lX_kXtpWLw_F-EN3dxAKCcrveH8DRrUPa17joKXxGh7jR_a9iyRlyg0K0CKiqUIZm99FOunZq-bHriaNjBONNRSyRg-bJCLsNNLrrX3bgKXj4JvYQ-3eEypUS0EMBViwGG.png?link=true)

Curve is a [decentralized exchange](https://every.to/almanack/decentralized-exchanges) like Uniswap or Sushiswap, but with an important caveat: they have their own brand of special swapping mathematics that make them an exceptionally efficient platform compared to other DEXes.
Uniswap led the way for Decentralized Exchanges when they launched their trading platform and introduced the “Constant Product Formula” *x * y = k*.
Uniswap’s Constant Product worked great for trades that only used a small amount of the total liquidity of a given pool, but it had a downside. If a trade was going to use a significant percentage of the liquidity in the pool, it would have a significant price impact.
Say the Uniswap [ETH](https://every.to/c/ethereum) & USDC pool had $1,000,000 of liquidity in it. If you tried to swap $750,000 of ETH for USDC, you’d end up with a lot less than $750,000 because you’d be changing the balance of ETH and USDC in the pool so dramatically.
For stablecoins, this was a particularly bad problem because it made it very expensive to swap between tokens like USDC and DAI which should be worth the same. Small amounts were fine, but larger DeFi protocols didn’t have a good way to swap around millions of stablecoins without losing some in the process.
Enter Curve. Curve took the Constant Product a step further and introduced their “StableSwap Invariant.” The math behind it is rather complex and you can [read about it in their whitepaper](https://curve.fi/files/stableswap-paper.pdf), but here’s the important part:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_smuxDXM2n8xeK9DvwzITTBcDcB2HxjIo0Z5vMYeOy4rGYjc5RIVOX_Yo-FPcuCp57omduw-B3dvm6okQufJF8LUERPBk9n28u9HNRRJEyIksgZR10AKTED7xnFSI6yhGcT2yNOW_.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_smuxDXM2n8xeK9DvwzITTBcDcB2HxjIo0Z5vMYeOy4rGYjc5RIVOX_Yo-FPcuCp57omduw-B3dvm6okQufJF8LUERPBk9n28u9HNRRJEyIksgZR10AKTED7xnFSI6yhGcT2yNOW_.png?link=true)

For large transactions between stable pairs, Curve can dramatically reduce the price slippage and enable much more efficient trades. This made Curve the go-to platform for doing swaps between stablecoins, and they consistently have significantly [more Total Value Locked](https://defillama.com/protocols/Dexes) than their competitors:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_OfLYw5xk-TEgAhvZ1lcRRUxiFTi-JfACxDp4Vqs2cpBYLb1gb4RU7VTP7eIxerfohNVRlkqinaHMfzjk3IeaN9J93EV113wH8y1ubtuNc35aq7aRNzJ2JqKAoW3G2T3IB1LI7RNp.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_OfLYw5xk-TEgAhvZ1lcRRUxiFTi-JfACxDp4Vqs2cpBYLb1gb4RU7VTP7eIxerfohNVRlkqinaHMfzjk3IeaN9J93EV113wH8y1ubtuNc35aq7aRNzJ2JqKAoW3G2T3IB1LI7RNp.png?link=true)

If Curve were just a highly efficient DEX it would still be impressive. But the other part of Curve’s magic is the incentive structure around its governance token: CRV.
When you provide liquidity to a trading pool on Curve, you earn a share of all the trading fees on that pool. But you also earn some CRV tokens, as a bonus incentive to you for providing liquidity to that pool.
For example, the Curve “3Pool” with DAI, USDC, and USDT, is one of the most liquid pools in all of DeFi, currently holding a bit over $4b in stablecoins, and doing $16m of volume in the last 24 hours.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_3sxsICaazsAaeOKEx0MK23z9vLEHSSIR-rUswbII9123K1Wuu1xXDOr8Wv5KaNS1wdYnlfcu2_w4lQ5CTDcKZayzm8mIVACjqCGp9-Y2DRkyiFX3hw4kafXa2Yf88kb_j0gwEDMs.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_3sxsICaazsAaeOKEx0MK23z9vLEHSSIR-rUswbII9123K1Wuu1xXDOr8Wv5KaNS1wdYnlfcu2_w4lQ5CTDcKZayzm8mIVACjqCGp9-Y2DRkyiFX3hw4kafXa2Yf88kb_j0gwEDMs.png?link=true)

If you add some DAI, USDC, or USDT to this pool, you will make about 0.38% APR in trading fees. Not much.

![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_uRY5nFcknKjYhv0RXxLUNGq8Ep1chvg8dBfifcn0THiIbj9zfUbYrLFq4-flVLtp93EHh3pznSUt6zW5v0dITWeyNoGs2ykxPd8Z5oM8_zGoL1ZzuyzsJCanCgjoVXG7gb5GJhCf.png)

But you will also make 0.40% to 1.00% APR in CRV rewards. So your rewards are 2 to 3.6x higher when you factor in the CRV you earn for staking in this pool.
Obviously these are still pretty small numbers. But check out the “Wormhole v2 UST-3Pool” above it. That’s also a pool with all stablecoins, and the total APR is 8.59% to 18.59%!
If this was all there was to the model though, Curve would have a problem. There’s no reason to hold CRV tokens, so people would immediately dump them and the price would go to near zero. Obviously that hasn’t happened though, and that’s because of their veCRV model.

## The veCRV Model

Whenever you do a trade on Curve, you have to pay an exchange fee. For stablecoins within the 3pool, that fee is 0.03%.
Of that 0.03%, 50% goes to the people who provided liquidity. And the other 50% goes to holders of veCRV.
“veCRV” stands for “Vote Escrowed Curve,” and the only way you get it is by, well, escrowing your CRV for voting. Within the Curve UI you have the option to lock your CRV tokens for one to four years to receive a certain amount of veCRV in return.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_nybJN9WrdSpSbX8QCONDpLwhWA43gFM6kpNvYJtXicoEMxwvMI77TIL71gopZ_Ydi9TmBSRZKSgYIZZ0qCyAts7m-G12WXnlSSY4RKR4Dq3NHWKTNvnXx4Hom7QTlmiOkLOcRRiE.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_nybJN9WrdSpSbX8QCONDpLwhWA43gFM6kpNvYJtXicoEMxwvMI77TIL71gopZ_Ydi9TmBSRZKSgYIZZ0qCyAts7m-G12WXnlSSY4RKR4Dq3NHWKTNvnXx4Hom7QTlmiOkLOcRRiE.png?link=true)

The best reward rate comes from locking up your CRV for four years, which currently earns you an APY of 13.24%. This reward passive accrues to you from all the pools on Curve, and you can claim it anytime.
The passive income is just one bonus though. As a veCRV holder, you also get to “boost” your rewards in the different CRV pools. If you remember above, most pools had a range of reward rates. Like the 8.59% to 18.59% for the Wormhole UST-3Pool. You get 8.59% if you have no veCRV. But as you acquire more veCRV, your reward rate increases until it hits the 18.59% max.
So you have a dual incentive to lock up your CRV. It increases how much you’re earning from staking your LP tokens, *and* it gives you passive income from all the pools on Curve.
It’s a brilliant example of [good tokenomics](https://every.to/almanack/tokenomics-101), since Curve manages to consistently emit more CRV [tokens](https://every.to/c/tokenomics) while also incentivizing people not to sell them. If you believe in the Curve ecosystem, it makes the most sense to provide funds to the liquidity pools, claim your CRV rewards often, and then stake them for more veCRV so your reward rate increases and your earnings flywheel goes faster and faster.
But what about the “vote” part? Well the last benefit you get from veCRV is the ability to vote on which pools Curve allocates its CRV rewards to. The more votes a pool gets, the more CRV LP stakers will receive, and so theoretically more people will stake in that pool.
As an individual this isn’t a huge power since you’ll probably just vote for whatever pools you have your funds in. But as a protocol who has a token on Curve, this is massive.
Say I launch a new stablecoin and I want people to be able to trade large amounts of it on Curve. One option is to deposit millions of dollars of stablecoins in the pool so it’s more liquid. But if I can acquire enough veCRV, I can just vote for that pool to get more CRV rewards, which will incentivize other people to put their own millions of dollars of stablecoins into that pool.
For example, let’s look at [Alchemix](https://every.to/almanack/alchemix-self-paying-loans). They want users to be able to easily exchange [Alchemix’s](https://every.to/c/alchemix) stablecoin, alUSD, for other popular stablecoins like USDC and DAI. So the more veCRV Alchemix can acquire, the more CRV rewards it can direct towards the alUSD-3pool, which will encourage more people to put more stablecoins into the alUSD-3pool, which will make it easier for everyone to trade their alUSD.
veCRV votes are very powerful for any protocol that wants to get more liquidity for trading their token, and this is what lays the foundation for the Curve Wars. Accumulating liquidity is one of the main priorities of any DeFi protocol, and the more veCRV you have, the more liquidity you can direct towards your tokens.
There’s more to the story, but let’s quickly recap the base layer of what’s going on:

1. Curve controls more liquidity than any other DEX.

2. If you lock CRV tokens for veCRV, you earn more rewards from the Curve pools you have added liquidity to.

3. veCRV also lets you vote on which Curve pools get more rewards.

4. So protocols who want more liquidity for their tokens want more veCRV so they can make their tokens more liquid.

This was the first battleground of the “Curve Wars,” and unfortunately it’s mostly over. The winner, Convex, is where we turn our attention next.

## Convex Finance

[Convex Finance](https://www.convexfinance.com/) launched a bit under a year ago, initially marketing themselves as an aggregator for Curve yields.
The more veCRV you have, the more rewards you earn from the staking pools you deposit tokens into. But the more you deposit into those pools, the more veCRV you need to get the maximum 2.5x earnings boost.
For example, say I have $10,000 I want to put in the USDC-DAI-USDT 3-Pool. If I want to get the maximum APR on that pool, I would also need to lock 3,700 CRV tokens for veCRV for 4 years. That’s about $12,000 in CRV tokens to get the maximum yield on $10,000. That’s a lot!
[Convex](https://every.to/c/convex) solved this problem for the average investor by aggregating everyone’s veCRV and deposits so you could get the maximum yield rate without needing all the veCRV yourself. If I want the maximum reward rate for my $10,000 on Curve, I need $12,000 in CRV tokens locked. But I can get nearly that same rate on Convex without having to deposit any veCRV at all. And I get some Convex CVX tokens as an additional reward!

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_Qj7lcCI89n6eN1bFvYTbP-VPx4oF6_Fmn_Nk0QwcPmeqzDSbzpqWVcIpVWhMWWFRhfQZSeLeifTuAJdfYDxzGKb58x37QHfgo6IGVxHIlpCk5Sv26G6CtnoZhYN1t16_34aoza5g.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_Qj7lcCI89n6eN1bFvYTbP-VPx4oF6_Fmn_Nk0QwcPmeqzDSbzpqWVcIpVWhMWWFRhfQZSeLeifTuAJdfYDxzGKb58x37QHfgo6IGVxHIlpCk5Sv26G6CtnoZhYN1t16_34aoza5g.png?link=true)

This made Curve much more profitable to farm on for normal [investors](https://every.to/c/investing) who couldn’t afford to buy huge amounts of CRV to maximize their returns. Convex quickly accumulated billions (yes, billions) of Curve LP tokens staked in its platform so people could optimize their Curve returns, Convex was earning 17% fees on all of those rewards, and everyone was happy.
That was just the beginning though. The other innovation Convex launched was a liquid version of locked Curve tokens, called cvxCRV. Here’s how it works:

1. You deposit your CRV tokens into Convex

2. Convex gives you cvxCRV in exchange and stakes your CRV for veCRV (the veCRV being owned by Convex)

3. You can then stake your cvxCRV to earn a share of all the veCRV rewards Convex is earning

4. And you can sell your cvxCRV for CRV or other tokens anytime, without having to worry about the 4-year lockup.

Right now, the APR for depositing your CRV to stake cvxCRV is 54%, significantly higher than the 13% you get for just locking your CRV for veCRV. A lot of that comes from the CVX issued to CRV stakers as an incentive, since this is the main way CVX gets issued to the ecosystem.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_iOY3q_i09pVLRs4lC1BuDD1gbkFB4HWxkoR1CLWBcPt0pGNumtBC84H7TXyr9Bq5BUQ1f_BRUBl4ieqxX_F_04_sDxm1hLH7009lP095ACdkNmovvYwEH2PWc1Gbbyo8F_pCAZZR.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_iOY3q_i09pVLRs4lC1BuDD1gbkFB4HWxkoR1CLWBcPt0pGNumtBC84H7TXyr9Bq5BUQ1f_BRUBl4ieqxX_F_04_sDxm1hLH7009lP095ACdkNmovvYwEH2PWc1Gbbyo8F_pCAZZR.png?link=true)

What’s brilliant about this model is it has allowed Convex to absorb a massive amount of the circulating Curve supply, now owning more than any other protocol. That allows them to give a significant boost to all of the Curve pools their users are depositing liquidity for, and it allows Convex to control where the majority of CRV awards are allocated.
So in summary:

1. Convex created a liquid version of veCRV that lets you earn Curve platform fees without having to lock your tokens for 4 years.

2. That liquid veCRV, cvxCRV, allowed Convex to acquire more veCRV voting power than anyone else.

3. That voting power has allowed Convex to control what pools CRV awards are allocated to, while providing a significant yield boost to everyone using the Convex platform to farm Curve pools

Perhaps you can predict where this is going next. Like Curve, Convex aims to be a decentralized user-owned protocol, which means your CVX tokens give you a certain amount of voting power.
And that voting power allows you to direct how Convex uses its veCRV to allocate CRV rewards.
For protocols who want more liquidity on their token, it now makes more sense to acquire CVX tokens instead of CRV tokens!
To use the Alchemix example from before, it’s now more in their interest to acquire CVX tokens to use to vote for their pools since Convex already controls most of the voting anyway.

1. Alchemix wants more liquidity for alUSD

2. So they need to control more veCRV

3. So they need to control more CVX

One way to do that is to buy a ton of CVX and keep it in the treasury. But another potentially cheaper way is to just pay CVX holders to vote for them.

## The CVX Bribing Economy

Convex has managed to lock around 200m CRV tokens for veCRV since its inception. There are currently 35.9m CVX tokens locked for voting on Convex, which means every CVX token can direct about 5.57 veCRV token votes.
So to control those votes, you either need to buy CVX tokens, or you need to pay people who have CVX tokens to vote for you.
This is where bribes come in. Protocols will pay CVX holders to vote for their pools, based on the assumption that over time it will be cheaper to pay CVX holders than to acquire more CVX. These bribe amounts change semi-weekly based on the competition from other protocols trying to bribe CVX holders, and for the last few months [it ranged from $0.37 to $0.87](https://llama.airforce/#/votium/overview) per CVX vote:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_gJ4TzHjl8Q-n4P7BvIEMZNoAKCgRvvIKeq282pL8tNTl4AJBSmPAT6xt3LSfUKL33n5sxCyPZF6lJ-etU2dqqvyPvJIyu5zGzTXK5BYsoinRKdtGvc36LcFIWtyxu2DbZgaFBxds.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_gJ4TzHjl8Q-n4P7BvIEMZNoAKCgRvvIKeq282pL8tNTl4AJBSmPAT6xt3LSfUKL33n5sxCyPZF6lJ-etU2dqqvyPvJIyu5zGzTXK5BYsoinRKdtGvc36LcFIWtyxu2DbZgaFBxds.png?link=true)

So instead of spending $27 to buy one CVX to vote, protocols can pay CVX holders $0.40-$0.80 per vote. That’s a great deal if your goal is just to maximize the votes to your pools!
And it’s also a great deal for CVX holders. By holding CVX tokens you’re earning a modest APR from the Convex Platform fees, currently 3.81%:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_g5oP_f9HRMuLjogcbuPguxW9aPBstAu7GWn7i9ac4WeN0239rBDU9UIGJNVwd98TEJgzOW1tGDOPXwCNYlegaINMwjWpNl5xHpWykpDveSXWJOGyCPU8cvU-A-u2OCVRw6GCV6a6.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_g5oP_f9HRMuLjogcbuPguxW9aPBstAu7GWn7i9ac4WeN0239rBDU9UIGJNVwd98TEJgzOW1tGDOPXwCNYlegaINMwjWpNl5xHpWykpDveSXWJOGyCPU8cvU-A-u2OCVRw6GCV6a6.png?link=true)

But the APR you earn from bribes is much higher, [currently estimated at 47%](https://llama.airforce/#/convex/flyer):

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_76t2TI8LVQZc99RkSZ57SygabdchxmL1UjQKVNGFf4_QSc74PzPFN7Cw3poSuumWqWoUzd9xPcOkdxf1QGC0DjapvZyjMn-1hLhFzbVAfHdnFPW5efp1UBBwg2EwejxbUjbasUxq.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_76t2TI8LVQZc99RkSZ57SygabdchxmL1UjQKVNGFf4_QSc74PzPFN7Cw3poSuumWqWoUzd9xPcOkdxf1QGC0DjapvZyjMn-1hLhFzbVAfHdnFPW5efp1UBBwg2EwejxbUjbasUxq.png?link=true)

And taking advantage of this as a CVX holder is very easy. You can vote on the weekly allocations to claim the rewards yourself. Or can [go to Votium](https://votium.app/), delegate your votes to them, and then they’ll allocate your votes to the various bribes in order to maximize how many rewards you get.
The downside of this method is that you’ll end up getting a bunch of small amounts of various coins, with some of them being smaller than the gas cost to claim them. For example, I have this $0.93 in DAI rewards that I’ll probably never claim since it would cost much more than that in gas to get it.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_75WtN-Wv9WUuFeFMtGHtsK34l14wmWanY3Bv-Av5d4nzHpkWgYPz9ZXMVYHFLV67k4ND6-weMKqleL1GZugl3EQm6eTTC-xAJ2dSFJq8blXbyg1Z_AhVaaFa_AjqWyBsztU5l7B_.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_75WtN-Wv9WUuFeFMtGHtsK34l14wmWanY3Bv-Av5d4nzHpkWgYPz9ZXMVYHFLV67k4ND6-weMKqleL1GZugl3EQm6eTTC-xAJ2dSFJq8blXbyg1Z_AhVaaFa_AjqWyBsztU5l7B_.png?link=true)

So, once again, there’s another aggregator. You can join the [Llama Airforce Union](https://llama.airforce/#/union/member), and they’ll take over managing your Votium rewards, aggregate them with everyone else’s rewards, and sell them to buy more cvxCRV and stake it for you.
Alright we’ve added a ton of complexity at this point so let’s recap:

1. Convex controls the liquidity incentives on Curve because they own so much veCRV

2. So to direct Curve liquidity, protocols want to control CVX votes

3. To control CVX votes, they can buy CVX or bribe CVX holders

4. As a CVX holder, you can make 47% APR in bribes by locking your CVX, then delegating it to Votium or through the Llama Airforce Union

Okay surely we’re done now, right?
Well, calling this the “Curve Wars” is kind of a misnomer, since it’s primarily the “Convex Wars” now. Convex already won on Curve. So now the question is: who will win the Convex wars?

## REDACTED: A Leading Fighter in the Convex Wars

If Convex won the Curve war by controlling all the veCRV, then whoever controls the veCVX could win the Convex Wars.
[REDACTED Cartel](https://www.redactedcartel.xyz/) is a protocol aiming to do exactly that. On the surface, it looks like another Olympus fork with an insanely high APY. But under the hood, they’re running a highly optimized strategy to control as much of Convex as possible.
One of the primary ways to earn REDACTED’s token, BTRFLY, is by bonding in other assets. And the assets they’re most interested in are CRV and CVX. If you look at the [REDACTED treasury dashboard](https://dune.xyz/ethpanda/Redacted), over 50% of their $76m treasury is CRV and CVX tokens:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_8MJv7HHF0nXo8vs2vTpDQMmKW78u4z0zNNC5-VNyDw_xcGL4UVCgEIrYpDlQSn6Edw06kucmQ3nNRzT1HNp5gogHDdtshDzCce1A_rEsrtUxepqe6z2aNQdXiZXzXfq7Z5URBVoZ.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_8MJv7HHF0nXo8vs2vTpDQMmKW78u4z0zNNC5-VNyDw_xcGL4UVCgEIrYpDlQSn6Edw06kucmQ3nNRzT1HNp5gogHDdtshDzCce1A_rEsrtUxepqe6z2aNQdXiZXzXfq7Z5URBVoZ.png?link=true)

You can think of REDACTED as an actively managed hedge fund trying to win the liquidity wars for its investors, while accumulating more power in the liquidity wars for BTRFLY holders. They’re deploying an optimized version of the consumer CVX bribe strategy outlined above, buying and staking CRV and CVX to earn as much additional CRV and CVX as possible, to control more votes and win the Convex war (and make a healthy profit).

![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_DcBPAYh5ZFTFIIWtm1ZiSVab6IL6G_F-EgWg2eTdycNLTJ6r4H8naKCtzpuL7Y4kzSWewkZgncCLApDckwVgg9-oPzoyMS9HxGthlI84_ma6ai9NAR5vcP7p34LLcbwAdFQaiBjW.png)

So by owning BTRFLY and having it staked on their site, you’re getting exposure to the whole CRV and CVX bribing and cashflow ecosystem without having to manage everything yourself.
But REDACTED isn’t stopping there. Winning the Convex Wars is just their first step. What they really want to win is the emerging liquidity wars.

## Beyond Curve, and Beyond Convex. The Next Era of Liquidity Wars

I previously wrote [a deep-dive on Tokemak](https://every.to/almanack/tokemak-defriday), a new protocol that allows token holders to earn LP fees from their tokens without having to deal with deploying them to various pools and staking them for rewards.
While Convex focuses primarily on Curve, [Tokemak](https://every.to/c/tokemak) allows you to deploy tokens to any of the major DEXes. And by owning TOKE tokens, you can vote on how much liquidity different protocols get, and where they get it:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_9jpa2Hhmss_GiRkv75KGut7Mui7bFybxfFf7zB8Nv3H8UTXqzHQhgnsbdYQN6V1i8oMTHVyT5FIPb4W_TLpN-h1sYIpnxrwRTEDc_oZzAqXHGl6-a5IZMm0oBpPnB9L9YeR1CvaW.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2027/optimized_9jpa2Hhmss_GiRkv75KGut7Mui7bFybxfFf7zB8Nv3H8UTXqzHQhgnsbdYQN6V1i8oMTHVyT5FIPb4W_TLpN-h1sYIpnxrwRTEDc_oZzAqXHGl6-a5IZMm0oBpPnB9L9YeR1CvaW.png?link=true)

This is similar to the veCRV and veCVX model, but available for any token on any exchange. Including CRV! There are some meaningful differences, like how Tokemak isn’t acquiring CRV to optimize staking yields, but they are still a platform where you can vote on how liquidity gets deployed.
This means there will soon be incentives for protocols to also bribe TOKE holders, since TOKE holders get to decide where the $1b+ of funds on Tokemak get allocated.
Enter REDACTED again. They recently acquired [Votemak](https://votemak.com/), a preliminary version of Votium for Tokemak. REDACTED is also bonding in TOKE, and while it’s still a small percentage of their total treasury, they’re working on acquiring more of it so they can control more of the TOKE votes.
Soon, REDACTED will be running an optimized CVX bribing strategy, as well as an optimized TOKE bribing strategy, while acquiring more voting power over both protocols. So they stand to accrue a ton of power over of the future of liquidity if their plan works out.
It’s worth mentioning that Convex, too, isn’t stopping with Curve voting. Whereas Convex originally might have been thought of as a yield aggregator for Curve pools, you can now think of it as a voting power aggregator for veTokens. Convex aims to own significant chunks in any cashflowing protocol with a vote escrowed token, so you can earn CVX bribes for a variety of protocols beyond Curve.
They’ve recently [announced Convex for Frax](https://convexfinance.medium.com/december-update-protocol-expansion-cvx-eth-incentive-migration-2c9327b48259), and I suspect they’ll support more protocols in the future as the veCRV token model becomes more popular.
So we have Convex expanding to control votes on more pools. Tokemak launching to bring vote-driven liquidity to more protocols. REDACTED using a rebasing token to acquire huge shares of CVX, CRV, TOKE, and more. And I suspect this fight for liquidity is just getting started.
Over the next year, it’s going to be fascinating to see how these competing powers shake out, who ends up influencing where liquidity moves in DeFi, and how protocols respond to these variety of incentive structures at their disposal to aid their tokens.

## What’s an Investor to Do?

This isn’t financial advice, but how does a normal retail investor play along in this fight for liquidity?
Simple option one is to just buy CVX, lock it, and then delegate it to the Llama Airforce Union. Then everything auto-compounds for you and you don’t have to worry about much.
Option two is to buy BTRFLY, stake it, and let them figure this whole liquidity war out for you. They could fail obviously and it won’t be as optimal as trying to figure everything out yourself. But I’m following this stuff full-time and I can barely stay on top of everything going on so you can’t feel bad for feeling lost.
As for me, I’m doing both, and I have a position in Tokemak because I think they’re going to provide an interesting competition to Convex’s dominance.
None of these [protocols](https://every.to/c/protocol-analysis) existed a year ago, and surely new things will pop up in the next year that make the liquidity wars more interesting.
As DeFi gets bigger, the fight for liquidity will only get more fierce.
May the best protocol win.
*Disclaimer: I own tokens for every protocol mentioned in this article. This is not financial advice, it’s meant for informational purposes and entertainment only. Please do your own research.*
