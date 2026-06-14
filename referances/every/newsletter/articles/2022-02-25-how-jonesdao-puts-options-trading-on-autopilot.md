---
title: "How JonesDAO Puts Options Trading on Autopilot"
subtitle: "JonesDAO and the Temple of Dopex"
author: "Nat Eliason"
date: 2022-02-25
column: almanack
url: https://every.to/almanack/how-jonesdao-puts-options-trading-on-autopilot
paywalled: false
scraped_at: 2026-06-11T16:08:43.950Z
---

# How JonesDAO Puts Options Trading on Autopilot

*JonesDAO and the Temple of Dopex*

One of my favorite categories of DeFi tools are “Manager” protocols.
These are the apps that can manage your activities for you on other protocols, so you can get exposed to most of the upside without having to do most of the work.
A classic example is autocompounders. Projects like [Pickle](https://pickle.finance/) and [Beefy](https://beefy.finance/) will take in your liquidity tokens, and then autocompound them in incentivized staking contracts to maximize your return while taking a small fee.
The [Llama Airforce Union](https://llama.airforce/) is another example of a Manager. If you don’t want to bother with your [Curve War](https://cryptonat.substack.com/p/curve-wars?utm_source=url) voting, you can delegate your veCVX to them and they’ll handle it for you.
I like these Managers because I’m lazy. I don’t want to deal with constantly compounding my rewards, or cycling my [AAVE](https://aave.com/) lending to maximize the return ([Yearn](https://yearn.finance/) does this), or buying tons of veCRV to increase my Curve LP rewards ([Convex](https://www.convexfinance.com/) handles this). I want someone else to do it!
So after [last week’s post on Dopex](https://cryptonat.substack.com/p/dopex?utm_source=url), one of my first thoughts was, “Options trading sounds exhausting and like a great way to lose a bunch of money. Maybe someone else can handle it for me.”
And sure enough, there’s a Manager for that. It’s called [JonesDAO](https://jonesdao.io/).

## What is JonesDAO

According to [their docs](https://docs.jonesdao.io/jones-dao/): *“Jones DAO is a yield, strategy, and liquidity protocol for options, with vaults that enable 1-click access to institutional-grade options strategies while unlocking liquidity and capital efficiency for DeFi options with yield-bearing options-backed asset tokens.”*
You can deposit assets that have Dopex SSOVs, and then Jones will employ an optimized options trading strategy for you. Each asset has a primary vault that aims at earning a stable-ish yield through all market conditions, and soon there will be more and less aggressive vaults depending on your risk profile.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_K4cngGYclLw46ue1HK6mr1l5DMTtxvh3890eWuqaQX645LZUBG_Wwd9tP9BhltjxpY5fuTfT_x1S-oqomDF1BLxOEm81Vlnp1rJQagmZHuM-pdR3ku1Y15GyJFl5uCoifYbE3OJQ.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_K4cngGYclLw46ue1HK6mr1l5DMTtxvh3890eWuqaQX645LZUBG_Wwd9tP9BhltjxpY5fuTfT_x1S-oqomDF1BLxOEm81Vlnp1rJQagmZHuM-pdR3ku1Y15GyJFl5uCoifYbE3OJQ.png?link=true)

If you deposit ETH into the Jones ETH vault, you get jETH. jETH is an interest-bearing token whose value increases based on the success of the Jones ETH strategies, with a current APY of 11.5%. It’s worth highlighting that this APY is not *really* an “APY” in the normal yield sense, since it’s going to fluctuate based on the success of their options strategies (and could go negative). But suffice it to say, if they can deliver on their strategies, this is one of the highest ETH yields on the market.
At the end of each Dopex epoch, you can trade your jETH in for ETH plus the accrued interest. Or, and this is the kinda interesting part, you can swap your jETH for ETH on Sushi anytime during an epoch.
Why would JonesDAO create a separate liquidity pool for jETH instead of just letting you redeem it for ETH? Well since Dopex options vaults are time locked, you can’t get your ETH out during the middle of an Epoch. So you also have to wait for the end of an epoch to get your ETH out of Jones. But by creating liquidity for jETH, you can trade it for normal ETH anytime.
This should sound familiar from the Curve Wars article. One neat thing that Convex did for CRV stakers is create a liquid market for veCRV. By depositing your CRV into Convex for cvxCRV, you’re earning veCRV yields while being able to cash out your cvxCRV anytime (unlike veCRV, which is locked for four years). Jones is enabling a similar ability with Dopex options vaults, by turning previously locked ETH in SSOVs into liquid ETH you can swap out of before it unlocks.
The other handy aspect of this model is that you don’t have to keep depositing your ETH or keep setting up new options contracts. If you want to use Dopex’s SSOVs on your own, you have to set calendar reminders to go back to Dopex to collect your earnings and deposit funds into new vaults. But since Jones gives you a token that represents your collateral being put to work in SSOVs, you can just hold your jETH or jGOHM and it will keep accruing interest without you having to keep setting up new options strategies.
Right now, the estimated yield on ETH deposited as collateral to Dopex SSOVs is 15.6% and the ETH yield estimated on Jones is 11.51%. So you are giving up about ¼ of your yield, but you get that yield for significantly less effort. Seems like a good deal to me.

## The Jones DAO Roadmap

Since Jones is a Manager, their roadmap is somewhat dependent on what Dopex does. But even given those constraints, they have quite a bit planned that will be valuable additions to the Dopex ecosystem.

### Varied Strategies

Right now, the ETH and GOHM vaults are using a “risk averse” strategy. Jones is planning on adding additional strategies for core assets like these, so if you want to take a more risk-on or blended approach to pursue higher yield, you have that option available as well.

### Lending & Borrowing on jAssets

One exciting plan on the roadmap is JonesDAO’s partnership with [Redacted](https://www.redactedcartel.xyz/) to offer lending & borrowing on jAssets like jETH and jGOHM, which would let you do leveraged options farming.
The current choices for borrowing against yield bearing ETH are quite limited. If jETH is yielding 11.5%, and you can borrow against it at 70% LTV, that’s one of the better ETH leveraging tools on the market.
For comparison, your other best options to do this right now are to borrow against yvcrvSTETH [on Abracadabra](https://cryptonat.substack.com/p/magical-internet-money?utm_source=url), which only yields ~4.5%, or to borrow against wstETH on [MakerDAO](https://makerdao.com/) which also yields around 4.5%. jETH lending would let you borrow against your ETH with almost triple the yield (albeit with extra risks attached).

### Additional Vault Styles

The last plan worth mentioning is some of the other kinds of vaults it looks like they’ll add in the future, like multi-asset vaults, passive strategy vaults (which I assume would have lower fees), and protocol specific vaults with larger DAOs that want custom configurations.
Looking at their current position and their roadmap as a whole, Jones seems like it has the potential to be a major first-of-its-kind DeFi protocol. There’s no reason they couldn’t extend their actively managed vaults to other protocols beyond Dopex, and if they can offer consistently high returns for vault depositors they could drive a lot of additional liquidity to these new financial products.

## Jones Tokenomics

The platform seems cool and all, but how do their tokenomics work?

### Token Emissions

Jones has a straightforward, community-oriented token distribution that should be familiar to anyone who’s read a few posts here. The total supply is only 10,000,000 tokens, allocated like this:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_92zZdqIA1QauD9dYJSZsMxEIzY6Wqcwx-QJPcMf2qostbbpbsk6OjJp_8ZhFJrwxfXh0EVdZu7a0Pbr7GpTt9JNxy8e2E6fIwMexy_L8rM6GSlR0NgdXROSVhBD08s7iGxGqv5Nh.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_92zZdqIA1QauD9dYJSZsMxEIzY6Wqcwx-QJPcMf2qostbbpbsk6OjJp_8ZhFJrwxfXh0EVdZu7a0Pbr7GpTt9JNxy8e2E6fIwMexy_L8rM6GSlR0NgdXROSVhBD08s7iGxGqv5Nh.png?link=true)

They did a private sale to investors for about 10%. Those tokens are locked in a vesting contract with a 3-month cliff and then 6-month drip, and the cliff is on April 30th.
Then they did a public sale for 17% of the supply, which happened in late January and is now fully unlocked. One thing worth noting with the public sale is that they sold 1.7M tokens, but only 1.1M tokens are reported as circulating on Coingecko. Considering the [pre-sale contract](https://arbiscan.io/address/0x5a81abb52d96241d15d8b2bdcd76034e4119829b) doesn’t have much Jones left in it, the circulating supply should be 1.7M, which means the market cap should be higher as well.
As far as I can tell, the Operations allocation and [Olympus](https://cryptonat.substack.com/p/olympus-dao?utm_source=url) allocation aren’t vested, nor is the airdrop, so the actual current unlocked amount of tokens is around 37.5%. Though obviously the treasury wouldn’t casually dump 15% of the token supply and wreck their project. It’s safe to assume Olympus also wouldn’t do that.
Tokens emit slower from now till April 30th when the private sale starts unlocking. Then they’ll be emitted faster from 4/30/22 to 10/30/22, slowing down on 10/30, and then slowing down more on 7/30/23.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_DnAW-LSfLgbOCB1DgA_Wc_hz_BMBDrDln5guXjabQFC4kNtUo8uSHitubsYXggkjpVVNXHHBuBQoNHHCEN-DGiNS-zo73sKtKPB0_Eczw8RECGPPMCMdNYA1SoSwI-WAfeq2Nuvr.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_DnAW-LSfLgbOCB1DgA_Wc_hz_BMBDrDln5guXjabQFC4kNtUo8uSHitubsYXggkjpVVNXHHBuBQoNHHCEN-DGiNS-zo73sKtKPB0_Eczw8RECGPPMCMdNYA1SoSwI-WAfeq2Nuvr.png?link=true)

So the important dates to know are:

- Slower emissions from now till April 30th.

- Fastest emissions from April 30th to October 30th

- Slower again till 7/30/23

- Then slowest emissions from then till 1/30/27 when emissions stop (?)

### Token Utility

But what is the JONES token for? JonesDAO has a 2/20 fee model on their options strategies, where they charge 2% per year on managed funds, and take 20% of the profit earned from any strategy.
This profit will be shared with JONES holders who stake their tokens for veJONES, a vote escrowed lockup model similar to Curve. veJONES holders will also get to vote on which jAsset pools receive the most emissions, so presumably there could be a “JONES wars”-style competition for voting power in the future.
By staking JONES you’ll earn a share of the profits from all the options trading strategies, and you’ll get to vote on where the awards are allocated. If Jones is able to consistently generate profits from their strategies, and if Dopex becomes the main options trading platform on L2s, this could turn into a pretty significant revenue stream.
It’s worth mentioning that this locking mechanism is not in place yet. So the supply shock of tokens getting locked hasn’t come into effect, and if they release it before the April 30th unlocks start, it could offset the supply increase.

## Investing in Jones

You can read a few ideas about investing in Jones in the paid subscribers addendum to this post, including a somewhat counterintuitive way to get exposure to JONES using your ETH.

## Things to Watch

If Jones can deliver on its goal of becoming the lead manager for Dopex options strategies, it could turn into a major platform.
One question will be how dominant Dopex can be in the on-chain options market. If Dopex doesn’t succeed, it’s hard to imagine Jones succeeding. Unless they pivot to servicing other options platforms like [Premia](https://premia.finance/) and [Lyra](https://lyra.finance/), which I don’t see any reason they couldn’t do. Jones’s competitive advantage will be their options strategies, which should work on other options platforms as well.
Another question will be how successful Jones’s strategies are long term. It’s possible that jETH could become undercollateralized if they have some unsuccessful strategies. I’m not sure how they’re mitigating against this, it isn’t discussed in the docs. But a bad period of trading could cause a liquidity run on jETH or another jAsset and end up harming the project.
The peg for jAssets in general will be another theme to keep an eye on. Temporary de-peggings are expected (and could present valuable arbitrage opportunities), but if it breaks peg in a sustained way that would be a significant issue for the project.
On the side of positive signals, I’ll be curious to see how fast they can roll out additional vaults and implement their veJONES token model. The sooner vaults are earning profits for JONES stakers, and the sooner you can lock your JONES tokens for boosts and voting, the sooner the token will be able to accrue much more value.

## Investing in Jones

There are a few ways you could get some exposure to Jones beyond just buying the token.
If you do just want to buy it, you’ll need to get funds over to Arbitrum and then purchase it [on Sushi](https://arbitrum.sushi.com/en/swap). You might have to import the token contract address, which is 0x10393c20975cf177a3513071bc110f7962cd67da.
Once you have the token, you have a few options. You can stake it in the Jones farms for about 19% APR. These are likely temporary emissions until they have veJONES live. You can also provide liquidity to the JONES-ETH or JONES-USDC pools, which have APRs of 87% and 115% respectively.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_hUQkio8SWzKf4gShu9DSP1QY8CoEx_HMUnhDmbA0w6wNvjUNje5is3N8cUioJvZB0_E-E3WgsnXvX24bmGBD_ainzG27ipCHbHQSGRY5AI62b5MAkmnM8Y4sTuM7x8c9OyqOpvsK.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2039/optimized_hUQkio8SWzKf4gShu9DSP1QY8CoEx_HMUnhDmbA0w6wNvjUNje5is3N8cUioJvZB0_E-E3WgsnXvX24bmGBD_ainzG27ipCHbHQSGRY5AI62b5MAkmnM8Y4sTuM7x8c9OyqOpvsK.png?link=true)
Given Jones’s low market cap right now, a 10x in token price is not out of the question. Even a 25x would only put it at a $125M market cap. Though, token supply would be higher in this hypothetical, so maybe more like $250M market cap.
So if you think a 10-20x is possible, depending on how quickly you think it could happen, it might be worth holding pure JONES instead of doing the LP.
We can use DeFi calcs to run some basic scenarios. Let’s say you think JONES will 10x over a year.
If you invest $10K, stake it for 18% (21% compounded), and it 10xs in a year, you’ll have $121,000.
If you invest $10K in LP, stake it for 89% (141% compounded), and JONES 10xs in a year but ETH only 2xs, you’ll have $63,951. Quite a bit less!
But if you still invest $10K of JONES but pair it with $10K of ETH (so $20K in the LP) you’ll have $127,902. The more ETH appreciates along with JONES the better you do from LPing. But the more JONES appreciates against ETH, the more impermanent loss you’ll have, and the better you would have done just holding JONES.
Personally, I’m starting with mostly JONES, and if it has a large appreciation against ETH, sell some of it into ETH and convert it to LP tokens. I think that lets me get the best of both worlds if it appreciates.
The other interesting consideration is the ETH/jETH pair and the GOHM/jGOHM pair. They’re paying nearly 20% and 30% respectively, and should have no impermanent loss. So if you’re bullish on JONES, staking some of your ETH or GOHM in a stable pairing for an above-average APR seems like a pretty good opportunity. There’s almost nowhere you can get such a high APR on an ETH pair like this, and it could be a good way to gain more JONES tokens without having to buy them.
It’s especially interesting since the ETH vault is only 11.5% APR. So if you want to put your ETH to work in the Jones ecosystem right now, you’re better off LPing it with jETH than staking it in the vault. Or you could deposit half in the vault for jETH, then LP it with the rest of your ETH to increase your return.
I’m usually slower to move my ETH around, but considering the APR on GOHM is so high, I might move my GOHM over and farm that as well as farming the JONES token pools. Given Jones’s current small market cap, and how excited this article has made me about what they’re doing, I’m going to invest a little more than usual into their ecosystem.
