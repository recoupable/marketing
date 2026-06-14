---
title: "Melting Iron: How to Lose $2b in One Day - DeFriday #5"
subtitle: "The spectacular rise and fall of TITAN, IRON, and Mark Cuban"
author: "Nat Eliason"
date: 2021-06-18
column: almanack
url: https://every.to/almanack/iron-titan-crash
paywalled: false
scraped_at: 2026-06-11T16:08:56.988Z
---

# Melting Iron: How to Lose $2b in One Day - DeFriday #5

*The spectacular rise and fall of TITAN, IRON, and Mark Cuban*

Becoming a millionaire is easy.
Invest one billion into an algorithmic stablecoin!
I kid, I kid. If you had invested $1 billion in the hot stablecoin protocol of this past week, you wouldn’t have $1 million. You might have $0.
In what must be the biggest protocol blowup ever, Iron Finance’s TITAN token ran up over the course of 2 weeks to a fully diluted market cap of $60 billion, then crashed to zero in one afternoon.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_IT1hU1C2PgH73PeZAbOwCZaQN94lyADQgQPifqs3lUiiDb4yXsUt8IriM_mROaaNlUyEBlQZ1fkOu5iR0VbB3f-xWec_j-eKPTXSETV5RqrIL6ov2nSwJjZcub2Q5BJZfgpOE3uh.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_IT1hU1C2PgH73PeZAbOwCZaQN94lyADQgQPifqs3lUiiDb4yXsUt8IriM_mROaaNlUyEBlQZ1fkOu5iR0VbB3f-xWec_j-eKPTXSETV5RqrIL6ov2nSwJjZcub2Q5BJZfgpOE3uh.png?link=true)

And what’s worse, IRON, the stablecoin that was supposed to be fixed at $1, broke peg and is now worth only $0.74:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_Q6mW0p2Hburs3iNwEYEH9hUOMSlMs5tzsiCGgCgfIT4C322YGesJVa6nl3Wj3f7ovN3mv2RsomD-i8dTlKnhOBLwiEvr6yuW9O7Aav0SOs2XtrL4TOC45eZnNeBuFcfKnv36UVdE.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_Q6mW0p2Hburs3iNwEYEH9hUOMSlMs5tzsiCGgCgfIT4C322YGesJVa6nl3Wj3f7ovN3mv2RsomD-i8dTlKnhOBLwiEvr6yuW9O7Aav0SOs2XtrL4TOC45eZnNeBuFcfKnv36UVdE.png?link=true)

So, what happened? And what does this teach us about the risks and failure modes of stablecoins specifically and DeFi generally?
Let’s dive in.

## Dissecting the IRON / TITAN Market Crash

The terms and names get a little confusing in this post, so for clarity:

- “Iron” refers to the whole protocol created by Iron Finance to create IRON and TITAN, and keep IRON pegged at $1.

- “IRON” refers specifically to the IRON stablecoin created by Iron.

- “TITAN” refers to the TITAN coin also created by Iron, a more speculative coin whose price fluctuations helped incentivize creating or burning IRON.

Before the crash, investors flocked en masse to IRON, cashing in on their incentivized liquidity pools which were paying 1% to 4.5% per day in TITAN rewards. Over $2.3 billion was locked in the IRON protocol, earning TITAN for helping maintain the peg and providing liquidity for people who wanted to buy IRON or TITAN.
But as it turns out, when things seem too good to be true, they probably are. As more and more people jumped on the bandwagon, investors started to get uneasy about TITAN’s price growth and the insane ROI they were earning. A protocol with a few million dollars locked paying out almost 5% per day might be sustainable for a bit. But paying 1.5-5% per day on 2 billion? No way.
So, these nervous investors started exiting en-masse and caused a bank run that broke the entire protocol.
Now there’s only $21,000,000 locked, down 99.1% from peak, most of it probably stuck from people who can’t exit their positions. The TITAN token is worthless, IRON has permanently fallen off peg, and people lost huge amounts of money, including Mark Cuban who had written positively about TITAN the day before (and may have caused the sudden influx of capital).

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_PFDXdQSgHj9aq0lq71lCiIcDPy_zFk8XMBHaEOQVvtDdmPaPUg44v8FnR_Fwrqj6ZOse9yvYn9Ru_AFRhXd0lilbc0b43sr7JGGrVhfoC2eY8xF0TE_LWsvfm6NI1foSNSe4YwzH.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_PFDXdQSgHj9aq0lq71lCiIcDPy_zFk8XMBHaEOQVvtDdmPaPUg44v8FnR_Fwrqj6ZOse9yvYn9Ru_AFRhXd0lilbc0b43sr7JGGrVhfoC2eY8xF0TE_LWsvfm6NI1foSNSe4YwzH.png?link=true)

### How Iron Worked

Iron is the latest in a long series of experiments with algorithmic stablecoins. Most of them have blown up, though not quite as spectacularly as Iron did.
The goal of an algorithmic stablecoin is to use smart contracts and financial incentives to keep the value of the stablecoin pegged at some fixed price, usually $1 USD.
This is different from conventional stablecoins like USDC and DAI that keep the value of a stablecoin fixed by backing it with collateral. DAI is backed by a variety of assets on Ethereum. USDC is backed by US Dollars.
By contrast, IRON is only partially-collateralized. That means it was partially backed by USDC, but only about 75% of its value. The rest was supposed to be backed by TITAN, with the price of TITAN in the market helping maintain the IRON peg.
Here’s how IRON explains it in their docs:
*“For**** fractionalized or partial-collateralized stablecoins****, the capital required to mint is only partially denominated in other stable assets. The remaining portion is denominated in a volatile asset, which is required as collateral. This requirement creates both a natural demand for the volatile asset, as well as a value capture. In the case of IRON, this volatile asset is TITAN (Polygon) or STEEL (BSC). The nature of this value capture means that there is a direct relationship between the value of TITAN and the circulating supply of IRON. Additionally, the ****collateralization ratio**** for IRON is a floating number — meaning that if the peg performs well, it is a more effective value capture for TITAN.”*
They also relied on arbitrage to help maintain the peg:
*“Another mechanism to support the price peg is the arbitrage opportunity offered by the minting and redeeming functions.*
*If the price of the IRON token is less than one U.S. Dollar, then anyone can purchase it on the open market and redeem it for approximately one USD worth of value when there is a profitable arbitrage opportunity.*
*If the price of the IRON token is more than one U.S. Dollar, then anyone can mint it with the protocol for approximately one USD worth of value and sell it on the open market when there is a profitable arbitrage opportunity.”*
To get IRON originally, you had to mint it by supplying USDC and TITAN, or just USDC. Based on the price of TITAN and how much USDC you supplied, you would receive the appropriate amount of IRON tokens:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_5D4buRtNDFLmQcTaqvy8mv1YWpxEwryKKSumpEl4UOzCqVx9FEoDgm3h5-RxnWsk6R3q_CTYHc9ouppZ50Cec75xnyKUhm5di6Ou4jP75uDm4dzw4XUVlHCRDVuKeWHkXtLus5h4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_5D4buRtNDFLmQcTaqvy8mv1YWpxEwryKKSumpEl4UOzCqVx9FEoDgm3h5-RxnWsk6R3q_CTYHc9ouppZ50Cec75xnyKUhm5di6Ou4jP75uDm4dzw4XUVlHCRDVuKeWHkXtLus5h4.png?link=true)

Then at any point, you could go back and redeem your IRON tokens for some amount of USDC and TITAN, again depending on the current ratio of USDC and TITAN in the collateral vault, and the current price of TITAN:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_5D4buRtNDFLmQcTaqvy8mv1YWpxEwryKKSumpEl4UOzCqVx9FEoDgm3h5-RxnWsk6R3q_CTYHc9ouppZ50Cec75xnyKUhm5di6Ou4jP75uDm4dzw4XUVlHCRDVuKeWHkXtLus5h4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_5D4buRtNDFLmQcTaqvy8mv1YWpxEwryKKSumpEl4UOzCqVx9FEoDgm3h5-RxnWsk6R3q_CTYHc9ouppZ50Cec75xnyKUhm5di6Ou4jP75uDm4dzw4XUVlHCRDVuKeWHkXtLus5h4.png?link=true)

The amount of TITAN and USDC you received, or had to pay, for Minting and Redeeming IRON was based on the Effective Collateralization Ratio (ECR), and the Target Collateralization Ratio (TCR). The ECR says how much collateral there actually is to support the current supply of IRON, and the TCR says how much there should be in order to maintain peg.
An ECR of 75% means the value of IRON is backed 75% by USDC. The protocol adjusts the TCR based on the price of IRON. If IRON drops below $1, the TCR is increased so it requires more USDC to mint IRON, or so you get more USDC for redeeming it. When the price of IRON is above $1, the reverse happens, increasing the TITAN required.
In theory, everything should work beautifully. When IRON is below peg, people can redeem it for more than it’s worth in the market, and the burned supply corrects the price. When it’s above peg, people can create more of it and sell it for more than they paid to make it, increasing the supply and bringing the price back in line.
Unfortunately, there was at least one big issue they didn’t account for.

### How Iron Melted

Let’s walk through how these incentives ended up creating the TITAN crash. First, there was a ton of demand for TITAN since the Iron Finance protocol was giving heavy rewards for supplying TITAN liquidity. Like I mentioned in the intro, you could earn 4.5% per day holding TITAN. Plus, with the price running up, there was tons of speculative purchasing happening.
So the price of TITAN starts going up. You can only get TITAN by buying it on the open market, or redeeming IRON for it. But since Iron Finance was heavily incentivizing holding IRON and TITAN, most people were buying it on the open market, then staking it on Iron Finance in return for more TITAN.
There wasn’t enough TITAN supply for the demand, so the price kept going up. Eventually it hit a peak around $60 and people started selling en masse. The price of TITAN dropped by 50% in a couple hours, which led to many people worrying about IRON’s ability to stay on peg.
So people started wanting to get out of IRON, too. To exit IRON, you had two options: redeem it for a combination of USDC and TITAN based on the Effective Collateralization Ratio, or sell it to someone else in the market.
As people started trying to sell their IRON, the price started to drop a bit below $1. Once the price was below $1, it made more sense to use the Redemption mechanism instead of selling on the open market, since the redemption mechanism should always pay out $1 per IRON while the market might have only given you $0.98 for it.
So people started redeeming en masse, which is exactly what Iron Finance wanted them to do. That process burns IRON tokens, decreasing the supply, and increasing the price to bring it back to peg. But in the process it also prints more TITAN tokens, based on the ECR and the price of TITAN.
The price of TITAN that Iron Finance used for the redemption mechanism is based on a 10 minute Time Weighted Average Price oracle. So it takes the average price over the past 10 minutes from a variety of sources, and uses that as the value of TITAN used for redeeming IRON.
Here’s where they got into trouble. Let’s say the price of TITAN is falling 6% per hour. A 10-minute TWAP will see the price dropping 1% over the last 10 minutes, but since it’s taking an average over the past 10 minutes, it will actually think the price is a little higher than it is. So based on the amount of IRON you’re redeeming, you maybe *should* get $100 of TITAN, but you’re only going to get $99.50 since the price was dropping faster than the oracle could keep up with and it thinks TITAN is more valuable than it is.
So whether you redeem on the market or through the redemption mechanism, you were getting less than $1 per $1 of IRON. You either sold your IRON on the open market, decreasing the value of IRON further, or you redeemed it for TITAN and sold your TITAN as fast as possible, further dropping the price of TITAN.
That feedback loop kept accelerating, and by the end of the day the TITAN token was worthless.

### Was Iron Finance Doomed From the Start?

Iron Finance was a fork of FRAX: an algorithmic stablecoin on Ethereum that’s maintained decently good stability since December:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_mfbkuapl3iiypgDOIkc5EnPYDx8ipX6pFhJMvpPpiLXrD21NC_GOWWq9HpSel2rwrZGWfs4R66a2I5VgUDvJmtKtP0Jw4s5U4qD0b3XadbQSo4FunmSAzr_u-qNGwuvltX6PJgEw.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1737/optimized_mfbkuapl3iiypgDOIkc5EnPYDx8ipX6pFhJMvpPpiLXrD21NC_GOWWq9HpSel2rwrZGWfs4R66a2I5VgUDvJmtKtP0Jw4s5U4qD0b3XadbQSo4FunmSAzr_u-qNGwuvltX6PJgEw.png?link=true)

So if Iron Finance was just copying their code, what happened? Well, one culprit might have been Iron’s heavily incentivized liquidity pools. Iron attracted over 2 billion in total value locked over the course of a month because they were paying people 1.5% per day for staking combinations of USDC and IRON, and were paying 4.5% per day for people staking USDC and TITAN.
If everything went perfectly, you could stake $100 of USDC and $100 of IRON, which both should retain their value perfectly, and make about $3 a day. Compound that over a year, and you’d have $45,800. No red flags there, right?
The heavily incentivized liquidity pools meant people were rushing to buy TITAN and IRON so they could stake it for rewards, but it also meant there was tons of liquidity off-platform meaning the price could fluctuate more aggressively since there was less need for the Redemption and Mint mechanisms if you wanted to cash out some IRON or TITAN.
More people trading off-platform meant the Redemption and Mint mechanisms couldn’t manage the prices and supplies as well, which may have led to the increased volatility eventually creating the bank run that wrecked TITAN.
It’s hard to say for sure if Iron Finance was doomed from the start, but looking at the liquidity pool incentive structure is definitely a good place to start. Volatility and wild swings in demand aren’t good for an algorithmic stablecoin, and creating such strong incentives for capital to come into the system may have caused both its wild rise and disastrous crash.
There’s also the question of whether or not an algorithmic stablecoin on Polygon can work with a 10-minute price oracle. Averaging the price over the last 10 minutes might be fine on Ethereum where transactions often take a few minutes, but on Polygon, transactions often clear in seconds. The faster transactions clear, the faster prices can change, so you might need much more recent price data in order to maintain an algorithmic stablecoin on Polygon.

### Are Other Stablecoins at Risk?

It’s important to distinguish between “collateral backed” and “algorithmic” stablecoins.
DAI, the popular stablecoin on Ethereum, is over-collateralized with various Ethereum assets in the MakerDAO protocol. The value of the assets stored in MakerDAO is over 100% of the value of all the DAI in circulation.
USDC, another popular stablecoin, is backed 100% by US Dollars held by Coinbase. For every $1 of USDC, there’s one real US dollar in a bank account.
Collateral-backed stablecoins have worked out so far, and held up remarkably well during the [May market crash](https://every.to/almanack/defriday-1-may-market-meltdown-winners-losers). Those kinds of stablecoins can’t really be compared to something like IRON, and there’s no reason to think Iron’s crash should create unease around collateral-backed stablecoins.
What about other algorithmic stablecoins? Their goal is to be able to maintain their peg without needing 100% of the collateral. And so far… it hasn’t gone great. FRAX is still doing well, as is FEI (though after a [scary launch](https://www.coindesk.com/1b-fei-stablecoins-rocky-start-is-a-wake-up-call-for-defi-investors)), but most algorithmic stablecoins have blown up.
Does that mean all future ones will blow up? No, someone will probably figure it out eventually, but each crash like this definitely increases the skepticism around future launches.
There’s also a broader risk of regulation. Tokens claiming to be worth $1 crashing isn’t a good look, and it may attract consideration from regulators who want to help prevent people losing money on projects like IRON. I wouldn’t be surprised if we saw some sort of regulatory agency require anything claiming to be “stable” be at least 100% collateralized. We’ll see, though.

### What’s Next for Iron

Iron published a post-mortem [on their blog](https://ironfinance.medium.com/iron-finance-post-mortem-17-june-2021-6a4e9ccf23f5), and they’ve hired a third party to investigate the crash and try to figure out what happened.
They’re also working on a V2 of their protocol which will hopefully be better suited to prevent bank runs like this, but we’ll have to see if they can regain enough trust to launch it.

## In Other News

Badger, a protocol for earning yield on Bitcoin on Ethereum, is launching [new Curve pools](https://badgerdao.medium.com/overview-f9e404f08882) that don’t rely on heavily selling CRV tokens. This seems to be part of a broader strategy by Curve who wants to discourage farming strategies that earn money by selling Curve tokens.
Mark Cuban’s article about DeFi that may have accelerated the Iron crash [is rather good](https://blogmaverick.com/2021/06/13/the-brilliance-of-yield-farming-liquidity-providing-and-valuing-crypto-projects/), if you want to give it a read.
Alchemix, which I covered [last week](https://every.to/almanack/alchemix-self-paying-loans), launched their new Ethereum protocol where you can store Ether to earn interest on it, and borrow their new “alETH” token against it. But thanks to a bug in their code, they accidentally gave users [$6.5 million worth of Ether for free](https://forum.alchemix.fi/public/d/137-incident-report-06162021).
Gitcoin has opened up its next set of grants, awarding funds to various makers and contributors to [the crypto ecosystem](https://gitcoin.co/grants/). They also recently [airdropped a huge amount](https://airdrops.io/gitcoin/) of their new governance token to people who’d previously used the protocol, a neat way to reward early adopters.

## Wrap Up

That's all for this week, be sure to subscribe to get future editions!
If you sign up for the paid membership, you'll also get access to a private Discord with me and the other members of the bundle to talk about all things Crypto, Finance, Productivity, Business, and more.
Aside from there if you have any questions or want to say hi,[you can reach me on Twitter](https://twitter.com/nateliason).
