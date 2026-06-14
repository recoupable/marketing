---
title: "Tokenomics 104"
subtitle: "How to Launch a Token (Tactics, Questions, Wen, etc)"
author: "Nat Eliason"
date: 2022-04-22
column: almanack
url: https://every.to/almanack/tokenomics-104-how-to-launch-a-token-tactics-questions-wen-etc
paywalled: false
scraped_at: 2026-06-11T16:08:39.729Z
---

# Tokenomics 104

*How to Launch a Token (Tactics, Questions, Wen, etc)*

When you start designing the tokenomics for a project, or when you’re looking at a project’s tokenomics, one important question is how the tokens are going to get into people’s hands.
The way tokens are released into the wild can have a significant impact on the long term success of the project, so it’s not something you want to overlook. And if you’re a founder planning your launch, you need to make sure you have a good plan for releasing your token so people can purchase it, without destroying the health of the project.
So whether you’re planning a token launch, or looking at the tokenomics of a project, here’s everything to think about around getting tokens in people’s hands.
We’ll break it into three sections:
**Considerations for Launching**: Including how many tokens to initially put into circulation, liquidity requirements, incentives, timing, token pairs, and when to launch.
**Tactics for Launching: **Including Initial Coin Offerings, Initial Dex Offerings, Liquidity Bootstrapping, Incentivized Liquidity, Liquidity Bonding, Usage Rewards, and Airdrops.
**Example Launches: **Breaking down a few projects initial distribution strategies and what I think they did well.
By the end, you should have everything you need to launch a token or evaluate a new token’s launch strategy.

## Considerations for Launching

Unless you have the money and connections to get immediately listed on Coinbase or another big exchange, you’ll have to start by launching your token purely on-chain using a [decentralized exchange](https://cryptonat.substack.com/p/decentralized-exchanges?s=w).
Your primary goal is for people to be able to buy that token, without it being unnecessarily complicated, expensive, or volatile.
That means you need:

1. A recognized, easy exchange for people to buy the token on

2. A popular second token people can trade for your token

3. Sufficient liquidity for most people to be able to buy your token

And you also need to figure out:

1. How many tokens to release into the wild

2. How to initially price it

3. If you need other people to help seed liquidity for the token

4. When you should launch it

### A Recognized, Easy Way for People to Buy Your Token

The first question you’ll have to ask is: what chain am I releasing this on?
You probably already have an idea, but in case you don’t, take some time and look at the various options you have available to you based on what you want to optimize for.
If you want maximum security and liquidity (good for DeFi), you probably need to be on Ethereum. Or maybe [Arbitrum](https://every.to/almanack/defriday-3-how-arbitrum-solves-ethereum-s-scaling-challenges).
If you’re a game and you want fast cheap transactions, you probably want [Polygon](https://every.to/almanack/defriday-2-polygon-s-surge-ethereum-s-future), [Solana](https://every.to/almanack/solana-defi), or Avalanche.
Or maybe you’re feeling adventurous and want to try to bring people to Moonriver, Celo, Harmony, or elsewhere. I don’t recommend it, but if they’re giving you a bunch of money or you have some reason to believe you can attract people over, go for it.
After you pick a chain, you need to pick the exchange. [Uniswap](https://uniswap.org/) and [Sushiswap](https://www.sushi.com/) are always safe choices. Second to those, you could pick the leading native exchange for whatever chain you’re building on, such as [QuickSwap](https://quickswap.exchange/) for Polygon, [Trader Joe](https://traderjoexyz.com/) for Avalanche, or [Raydium](https://raydium.io/) for Solana.
At the start it’s usually best to pick just one exchange so you don’t fracture your liquidity too much. It’s tempting to try to be in a bunch of places at once, but that’ll just make it harder for people to trade large amounts of your tokens. Keep it simple to start.
Once you’ve picked where you are going to launch, the next question is: what token to pair yours with?

### Picking a Token Pair for Trading

Any trade on a decentralized exchange requires two tokens: the token you’re trying to buy, and the token you’re trading for it.
When you launch your token, you’ll have to choose another token to pair yours with. The main things you need to optimize this decision around are:
**First: How easy it makes it for people to buy your token.** If you pick a common, highly liquid pair token like ETH, it’ll be very easy for people to buy your token because they probably already have ETH. If you pick an obscure pair, it makes it more annoying since people might have to buy that other token first.
**Second: How it affects the price movement of your token. **Token prices on decentralized exchanges are set by the ratio between the two tokens in the trading pool. So whatever token you pair your token with will cause your token’s price to change, based on the other token changing in value.
Imagine your trading pair is ETH. If there are 1000 ETH, and 10,000 YourToken, in the trading pool, then YourToken is worth 0.1 ETH. If ETH goes up 10% in USD value, and no trades happen in the pool, then YourToken will also automatically go up 10% in USD value since it’s still worth the same amount of ETH.
So if you want your token to track the broader crypto market, you should pick a trading pair like ETH. If you want it to be more stable or move on its own, pair it with USDC.
Once you have that chosen, there needs to be enough liquidity to trade within.

### Sufficient Liquidity for Trading In

When you add your token to a DEX, you’ll have to provide the initial liquidity for trading that token.
The more popular your launch is, the more liquidity you’ll need for people to trade within. If someone wants to buy $10,000 worth, for example, then you need enough of your token and of ETH in the pool for them to make that trade without experiencing a huge amount of slippage.
So whatever the largest trade you think someone will make, you probably need *at least *10-20x that amount in liquidity. The smaller your project, the less you need. But if you’ve been building a lot of hype, you might need a deep pool of funds.
If you’re going to incentivize other people adding liquidity (which we’ll cover in a bit), then you don’t need to bring as much to the table. But if you want to own all of your liquidity and not have to pay other people to contribute, then you’ll need quite a bit of funds to get started.
Assume you want your token to have at least $2 to $5m of liquidity. More if it’s a very hyped launch. That means you need at least $1m ETH (or whatever your trading pair is) to pair with your token for the initial liquidity.
So you need to already have deep pockets, raise money from investors, or bootstrap some initial liquidity (maybe only $100-250k) and incentivize other people to add the rest.
Built into this question will be the next important topic to figure out: how many tokens you want to release into the wild.

### How Many Tokens to Initially Release

This is a deceptively tough question because it requires you to balance your target initial price, your liquidity limitations, your inflation rate, and your community ownership goals.
For example, say you only have $250,000 of ETH to pair with your token. If you initially release 10% of it via the LP, then you’re setting a FDV of $2,500,000, which is quite low for a crypto project.
Someone could come spend $50,000 on your token, and they’d now own 2% of the supply. That’s a lot of control!
So maybe you want a higher initial FDV so a whale can’t buy everything and dump on people later. You only release 2.5% of the tokens initially, so now the FDV is $10,000,000. Well you’ve solved the whale problem, but now you need to figure out how to emit the other 97.5% of the tokens.
With only 2.5% of your tokens circulating, you’re almost guaranteed to have a massive inflation rate punishing early buyers. It’ll be hard for the token to sustain its price with so many new tokens coming into the market, so you’ve kinda punished early buyers.
Okay so you want to release 10%, and you want the $10,000,000 FDV. Well now you need $1m of liquidity to pair it with! See the problem?
Your choices are, essentially:

1. Risk giving up a lot of control early to reduce inflation and limit liquidity requirements

2. Get a ton of initial liquidity so you can manage inflation and control

3. Maintain control and use limited liquidity, but have a high inflation rate that punishes early buyers

Those are the tradeoffs and there’s really no way around them unfortunately. You’ll have to pick your poison.
On that topic though, how should you decide what price to target?

### What Price to Target

This is arguably the hardest question here to answer, since you’re guaranteed to get it wrong in one direction or the other.
You might price it too low, and you’ll miss out on millions you could have earned from better pricing.
Or you’ll price it too high, and anyone getting tokens will immediately dump them, no one will buy, and you’ll lose your initial liquidity.
I have a couple mental frameworks that help though.
First, I think it’s better to price it on the lower side. People will be happier, you’ll still get the upside from the rest of the tokens you hold, and it’ll scratch that exciting “we’re early” itch.
Second, assuming you don’t want to do an ICO type launch, I think you should start with your liquidity available and a target initial percentage then see where the price shakes out. If you have $500,000 to put towards liquidity, and only want to initially release 10% of your tokens, then there you go, your FDV is $5,000,000.
Third, it’s worth considering how else you want the initial batch of tokens to get in people’s hands. Are you going to do a liquidity bootstrapping pool? A pre-sale? Those can both give you an initial price to target. Or if you’re doing an airdrop, then you have to consider what price is sufficiently low that it won’t encourage everyone to immediately dump their airdropped tokens.
From thinking through this part, you might realize you really need other people to help provide the liquidity. So let’s talk about that next.

### Do You Need Other People to Help Provide Liquidity?

Maybe you did the math up above and realized you just don’t have enough funds to make the pool sufficiently deep for people to trade in, and you need outside funds to get there.
You have a few options. You could do a pre-sale or ICO (though we don’t call it that now) type launch initially, to raise some funds, then use those funds to create the initial liquidity.
You could also use a liquidity bootstrapping pool (which I cover below) to raise funds in a way that directly helps fund liquidity, and helps figure out what price the token should start at.
Or you could do incentivized liquidity right after you launch. This is a good option if you only have 100-250k of funds, but you know there are people in the community with funds who would want to farm your token, and you’re fine with a few days of a very spiky chart. I honestly like this strategy the best for bootstrapped teams, and I’ll explain why later.
Alright time for the last consideration: wen.

### Wen Token?

There’s no perfect answer here, so I’ll say: as late as possible given your needs for function and funding.
If you’re a bootstrapped team with limited funds, you may have to launch it earlier to fund development. Many teams have done this and it’s gone well, many have done this then fallen apart and it’s looked like a rug.
Another question is the [utility of the token](https://every.to/almanack/tokenomics-103-utility). If it’s needed for some in-app activity, you’ll obviously need to launch it when or before that feature launches. If it’s a governance or value token that represents the overall economy, you may be able to launch it later.
But I would definitely caution against trying to launch it right away. If you don’t need it, and if you can afford to build for a while without it, there’s no reason to launch it earlier. The longer you wait the less of your ownership you’ll give up, the more stable the project will be, and the longer you get to build without the distraction of a token price. Once there’s a token price affecting the mood of the community, building gets very different.
So, wait as long as possible. If you don’t need the money or utility, wait.
Alright, you now know everything you need to consider for your token launch:

1. Where to launch it

2. What to pair it with

3. How much liquidity to add

4. How many to release

5. What price to target

6. Whether you need outside help

7. When to launch it

Next let’s talk through some of the strategies and tools at your disposal to do it.

## Tactics for Launching

These are the individual pieces you might incorporate into your token launch strategy. They’re different ways to get your tokens into the wild, raise funds, and reward your community for using or supporting what you’re building.
We’ll cover:

1. Initial Coin Offerings

2. Initial Dex Offerings

3. Liquidity Bootstrapping

4. Incentivized Liquidity

5. Liquidity Bonding

6. Usage Rewards

7. Airdrops

Onward!

### Initial Coin Offerings (ICOs)

This was the original way of getting coins into the wild, and we rarely see it anymore. You spun up a website, set a price in ETH, and then people could trade their ETH for your tokens.
It’s now generally considered a security sale and legally risky, so you don’t see it much anymore. It’s also kinda uninspired since then there’s no market price for the token, and there’s no liquidity after the sale is done.
One way we *do* still see this is with private sales. Some projects will raise a certain amount of money from investors before launch, on the promise of receiving vested tokens after launch. This is a common way to solve the initial liquidity problem, since you can then use the funds you raised to seed your liquidity for your public launch.
Another is through what are creatively called “donation events.” You “donate” some ETH to a contract, and then you receive some tokens later as a gift. It’s basically an ICO with extra steps. Though you can get creative with it, which I’ll explain in the examples.

### Initial DEX Offering (IDOs)

When I talked about “adding liquidity” above, this is what I’m referring to. You go to an exchange like Sushi or Uniswap, and add your token with your paired token so people can start trading on it.
This is the “launch” of your token being tradeable, which is why it uses the “IDO” moniker. Instead of initially offering it for sale directly on your site, you’re making it available to trade on a DEX.
In almost all cases this is considered the point where your token launches these days. Even if you airdrop some tokens beforehand (usually a bad idea, will explain below), those tokens aren’t worth anything until there’s liquidity to trade them with.
So in almost all cases, your IDO is when you launch your token. That’s when people can trade on it, and it’s when you lock in the questions and considerations above.
It’s a big moment! Celebrate briefly, then enjoy months of anxiety as you see your company’s value fluctuate by massive amounts on an hourly basis.

### Liquidity Bootstrapping Pools

Liquidity Bootstrapping Pools are an elegant solution for when you don’t have enough liquidity to do an IDO at the price you’re targeting.
Instead of having to do a private financing round, or launching a smaller pool with tons of volatility, or risking severely mispricing your launch, you can do a liquidity bootstrapping event to raise funds for your initial liquidity and allow the market to set your initial token price.
[Copper Launch](https://docs.alchemist.wtf/copper/lbps/what-is-a-liquidity-bootstrapping-pool) is a popular tool for doing this. You add some initial liquidity at a very high token price, then as more people add liquidity the price comes down over time until it settles at a point where people no longer feel like it’s worth adding funds to get some share of tokens.
At that point, your market price has been roughly found, and you can close the pool to claim the funds and distribute the tokens. Then you can use those newly claimed funds to seed the pool for everyone to trade within.
The upside to this strategy is that you’ll find a good market price for your token launch, and early supporters will get to buy in at a good price. The downside is that you will end up giving out some tokens early, so you’ll have to do some redemption mechanism for your *real* token to avoid the risk of someone front-running your liquidity.
You also now have a potentially large number of tokens floating around unvested, so you’ll have to figure out how to set the parameters of the launch pool so that the early buyers don’t immediately dump their tokens. It adds some complexity to the strategy, but it is a neat way to raise funds and solve the “what price” question.

### Incentivized Liquidity

This is an extremely common tool to use for distributing your token and for solving the issues of not having enough liquidity. Instead of trying to create all the trading liquidity yourself, you create some initial amount, and then you pay people to add more liquidity.
The way it works is:

1. I launch NAT token

2. I pair it with ETH, and add $250k of liquidity

3. I allocate 10% of total NAT tokens to incentivized liquidity over 4 years via staking

4. So now you buy NAT tokens, pair it with ETH to add to the liquidity pool, then stake that liquidity position on my site to earn a passive stream of NAT tokens as a reward

In this model, you’re renting liquidity from your users by paying them over time for helping fund your liquidity pool. It’s great for quickly increasing your liquidity position (Crypto Raiders went from ~$200k of liquidity to over $10m of liquidity this way), but it can get expensive over time. Depending on how many tokens you’re giving away to stakers, you might be losing a massive amount of money just to maintain your current amount of liquidity.
That said, it’s a great way to build liquidity in the beginning. You just need a way to transition off of it.
And the common way to do that is liquidity bonding!

### Liquidity Bonding

Bonds are the answer to the problems of renting liquidity, [popularized by Olympus](https://cryptonat.substack.com/p/olympus-dao?s=w).
The way liquidity bonds work is you offer your tokens at a slight discount to people in exchange for some of their liquidity position.
So instead of constantly paying people your tokens just to maintain the same amount of liquidity, they have to trade their liquidity position to you for more tokens.
This allows your community members to still get a good ROI by providing liquidity to your token, but it allows you to build up ownership of your liquidity over time instead of renting it and risking your community taking your token liquidity away.
It’s much more sustainable in the long term, but it’s a harder way to start. There needs to be enough liquidity for people to trade within before they can start selling liquidity back to you, so you’ll often start with normal incentivized liquidity then transition to bonds over time.
And while there are many different ways to do incentivized liquidity, the simplest way to do liquidity bonding is to partner with [Olympus Pro](https://pro.olympusdao.finance/). They take a small fee, but it’s worth it to lean on their team to handle the logistics and security of the whole thing.
These are all the ways people can pay to get access to your tokens, but there are also a couple ways you might give people access for free.
The first is through usage rewards.

### Usage Rewards

Awarding people your token for using your app is integral to the ethos of crypto. If there’s any way you can build this into your app, you should. It’s just part of the whole Web3 spirit, you know?
The question is *how* and *how much*. There are infinite permutations on this, but I’ll give you a few jumping off points.
First, I like it when I see this as the biggest source of emissions from a team. In [my STEPN article](https://cryptonat.substack.com/p/stepn?s=w) I mentioned how nice it is to see them giving away 30% of their tokens to people using the app. [Convex and Curve](https://cryptonat.substack.com/p/curve-wars?s=w) both did great jobs of this too, rewarding people who were supplying liquidity to their platforms.
There’s probably an obvious way you can reward top users of your platform with tokens, so definitely think about how you can do it in a way that will encourage more use, and not just encourage mining tokens and dumping. If you want some more ideas on this, check out [103 on Utility](https://cryptonat.substack.com/p/tokenomics-103-utility?s=w).
Second, it’s often nice if it starts off faster and tapers off over time. The higher early emissions will attract many people to your app and reward them for being early. Then you can let it taper off from there, so later people are still rewarded for joining, just not as heavily as your earliest supporters.
Finally, if you can find a way to lock up rewards slightly, that will help prevent farming and dumping. One option for example would be a one-week vesting on rewards, which earners have to initiate before they can claim them. [Tokemak](https://cryptonat.substack.com/p/tokemak-defriday?s=w) does a good job of this, only making rewards available after a few days, and requiring you to wait up to a week to unlock your tokens you’re farming with.
And then aside from actively rewarding usage, the second way you might give away tokens is via an airdrop.

### Airdrops

Everyone loves free money. So if you have some way to give free money to your early supporters without risking your project’s health, go for it.
This can be based on historic app usage, holding an NFT, being part of another project, or even just being early in the Discord.
The main thing you want to watch out for is airdropping tokens to people in a way that they don’t immediately dump them. Building in some kind of initial lock, or vesting, can help prevent this. Or having some incentive for people receiving the airdrop to immediately restake their tokens can aid slowing down this surge of inflation, too.
The other thing you have to be careful of is avoiding creating a situation where people could sybil attack your airdrop using multiple wallets. Announcing your airdrop beforehand will invite people to try to game it, so you typically don’t want to announce it until after you already have the snapshot of people who are receiving it. And figuring out how to balance it based on engagement so someone can’t spin up 10 wallets to game it will help make it fairer as well.
You now know most of the questions you need to ask yourself going into a token launch, as well as many of the tactics you have at your disposal to get your token out into the wild.

## Token Launch Examples

Now let’s now look at how a few projects have done their token launch to give some examples and ideas.

### Saddle Exchange: Vesting Airdrops

[Saddle](https://saddle.exchange/) is a fork of Curve on Ethereum, Fantom, Optimism and Arbitrum, used for swapping between coins that should always be the same value.
Saddle operated and attracted liquidity for over 6 months with no mention of a token. Then, when they released their Tokenomics plan, they allocated a significant portion of the tokens to people who had previously provided liquidity:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_pPySz2RozDJLsKGIXAsQydC9Zg6AoDdfaP6XdoRUaeXYiI-rmtcZAsYCjnnqkyg2sqzy97Bin1R6tqOLc0Sm8ojvAQ3pwHMaDJUDotmRdxw3TQ1j57m8eaBfolG_CUFPGxbPFe9f.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_pPySz2RozDJLsKGIXAsQydC9Zg6AoDdfaP6XdoRUaeXYiI-rmtcZAsYCjnnqkyg2sqzy97Bin1R6tqOLc0Sm8ojvAQ3pwHMaDJUDotmRdxw3TQ1j57m8eaBfolG_CUFPGxbPFe9f.png?link=true)

15% of their total tokens were allocated to past liquidity providers. But you couldn’t just claim them and sell them: the tokens are vested over two years, and there has to be a community governance vote to make them tradeable.
I love this as a way to do the airdrop. It’s a very slow release so you’re not giving away tons of tokens at once, and it requires people to continually come back and at least check on the platform to claim their unlocking tokens.
Compare that to more normal airdrops where people get all their tokens at once. That often doesn’t go very well:
[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_BCRXE5rJoow03-54KWqX1j6SJxrac4y_f-N4P6r9a5SHQzEBRvOxwYlKhk_w48VBZGVRm2unDWkGeTX0uUGvr39zExzOWq3l6tVWSAii_Olu8HtvzExoLQsm-K3DgMa305Itv6Ie.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_BCRXE5rJoow03-54KWqX1j6SJxrac4y_f-N4P6r9a5SHQzEBRvOxwYlKhk_w48VBZGVRm2unDWkGeTX0uUGvr39zExzOWq3l6tVWSAii_Olu8HtvzExoLQsm-K3DgMa305Itv6Ie.png?link=true)

So if you’re going to do an airdrop, consider incorporating something like Saddle’s vesting strategy.

### JPEG’d: Donations

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_9Rzqn5u_yFRgsA4wdqqKmS9dpkSLRPh96aabrIE3h2JjG7KAIIw7fpXdKDoGMoxGfi1eEte8aud6OTWEKR3XltH_VKHxf_Xy9l-c8XP9j0Eu6XzzhfHp_WhJe1O6zgWK62TPCNbA.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_9Rzqn5u_yFRgsA4wdqqKmS9dpkSLRPh96aabrIE3h2JjG7KAIIw7fpXdKDoGMoxGfi1eEte8aud6OTWEKR3XltH_VKHxf_Xy9l-c8XP9j0Eu6XzzhfHp_WhJe1O6zgWK62TPCNbA.png?link=true)

When [JPEG’d](https://jpegd.io/) launched their token, they initially sold 30% of the supply via [a “donation” event](https://medium.com/@jpegd/token-generation-event-3b808e21a9b3).
You sent ETH in to a contract for a share of the 30% of the tokens, then once all the donations were collected, you received JPEG based on how much you donated relative to the total.
It was important for them to take a strategy like this because they needed a massive war chest for being able to hold NFTs as collateral. If people are borrowing against their NFTs, JPEG needed to be able to liquidate those NFTs quickly, so it made sense to have a large reserve of capital which they were able to raise via the donation event.
And by doing it in this style where everyone puts money into the contract, then gets a share of tokens based on how much they contributed relative to everyone else, they were able to do a more natural price discovery.

### Convex: Airdrop and Usage Rewards

I can’t write a tokenomics article without mentioning Convex. They focused their rewards heavily on new and existing Curve liquidity providers, which brought tons of liquidity in to Convex’s new platform.
First, they airdropped 1% of CVX tokens to holders of veCRV. But then they allocated 50% of all CVX to be emitted as platform usage rewards for people staking their Curve liquidity tokens, and with a steadily decreasing rate of emissions:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_BCRXE5rJoow03-54KWqX1j6SJxrac4y_f-N4P6r9a5SHQzEBRvOxwYlKhk_w48VBZGVRm2unDWkGeTX0uUGvr39zExzOWq3l6tVWSAii_Olu8HtvzExoLQsm-K3DgMa305Itv6Ie.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_BCRXE5rJoow03-54KWqX1j6SJxrac4y_f-N4P6r9a5SHQzEBRvOxwYlKhk_w48VBZGVRm2unDWkGeTX0uUGvr39zExzOWq3l6tVWSAii_Olu8HtvzExoLQsm-K3DgMa305Itv6Ie.png?link=true)

So it benefitted you to be early and deposit your liquidity in to Convex, but then as the emissions tapered off the value of CVX started going up, and so even though you were receiving fewer tokens you were still getting a good bonus APR for keeping your Curve LP there.
Since their goal was to attract as much of the curve liquidity as possible, this was a perfect way for them to release their tokens.

### Redacted: Bonding Strategic Assets

Redacted Cartel took an interesting strategy building on Olympus’s bonding program. They released their BTRFLY token into the wild primarily by letting people bond in other assets they wanted to execute their [Curve Wars](https://cryptonat.substack.com/p/curve-wars?s=w) strategy:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_K-Fj-34tKEfmvCNqXWPecg6zaJuwgNzh0lGrS2Petu2t8viT0P440Hs7t2ENqIMYaKHHSaJG9I7OkCeBDK8SJSLI1yKMz8zJ4H81jUM4GtNMmdooQMtcvkRB5qRN-fvpRoV7OE_D.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_K-Fj-34tKEfmvCNqXWPecg6zaJuwgNzh0lGrS2Petu2t8viT0P440Hs7t2ENqIMYaKHHSaJG9I7OkCeBDK8SJSLI1yKMz8zJ4H81jUM4GtNMmdooQMtcvkRB5qRN-fvpRoV7OE_D.png?link=true)
So instead of doing normal liquidity bonds for their own token, and instead of just selling their token for ETH, they let people trade in other tokens like CVX and CRV for BTRFLY at a discount.
This has let them become [among the largest holders](https://dune.com/funky/Redacted-Policy-Metrics) for many of these tokens:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_w_f6VzbOE2a-ByEbopbgU7O1SaybPxJXce0XEAr14kLc-sIjqmCmAGb9vHDQdXyrinaji9TFsmxVtlAMoZop5mOVwWIC8m0TMdnpRFJe-qeHW7tgrvYelG4eNEXlyzC1GfHjoAwY.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2132/optimized_w_f6VzbOE2a-ByEbopbgU7O1SaybPxJXce0XEAr14kLc-sIjqmCmAGb9vHDQdXyrinaji9TFsmxVtlAMoZop5mOVwWIC8m0TMdnpRFJe-qeHW7tgrvYelG4eNEXlyzC1GfHjoAwY.png?link=true)

Those are some of the more interesting token release styles I’ve seen recently, and there are more creative strategies happening every week.
Now that you know the basic questions to ask, and the tactics you can use to release your token, you should be in a good position to plan a token launch, evaluate one, and see what other teams are thinking as they bring their tokens online.
