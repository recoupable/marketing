---
title: "One vs. Two Token Models in Crypto Gaming"
subtitle: "And a potential new model unifying the two"
author: "Nat Eliason"
date: 2022-05-27
column: almanack
url: https://every.to/almanack/one-vs-two-token-models-in-crypto-gaming
paywalled: false
scraped_at: 2026-06-11T16:08:37.502Z
---

# One vs. Two Token Models in Crypto Gaming

*And a potential new model unifying the two*

Whether to use a one or two token model is among the most common questions I get from teams designing their crypto game’s economy.
My default response until recently was always to use two tokens, but now I’ve been rethinking that advice. I think you can make a compelling case for either choice, and I’m going to try to explain some of that nuance here. There also may be a way to get the best of both worlds, as I walk through at the end.
This article will primarily focus on gaming, though you could apply similar thoughts to other crypto projects. Gaming is a nice sandbox to think this through in though since it allows for so much more token utility than other projects.
Anyway, let’s dive in.

## What’s a Token For?

The primary use of a token in a crypto game should be to improve the game economy in some way that is not possible without a token.
Tokens are used for many other things like speculation, but as I explained in my “[crypto gaming is broken](https://crypto.nateliason.com/p/fix-crypto-gaming)” article, those other uses can end up hurting the quality or future of the game.
So how can a token improve the game economy in some new way? I believe this primarily occurs through closing the loop on microtransactions. Instead of a one-way street where players make microtransactions to unlock some additional utility in the game, crypto tokens enable a two-way street where players can also pull some of the value of their work out of the game. They allow those who have invested significant time into the game to trade that time for capital, and they allow people with capital a new way to trade some of that capital for saved time.
These transactions can take two forms:
**Application Transactions**: Where players are paying the game itself for access to something like a battle pass, cosmetic, loot box key, or progression in the game.
**Peer-to-Peer Transactions**: Where players are paying each other for resources within the game. These could be NFTs, currencies, or anything else.
Those transactions have existed in games for a long time. We’re all familiar with in-game transactions and auction houses. The one crucial difference a token enables is the ability to create a liquid market between the game and “real money.” A way for the player to redeem their Runescape gold for dollars (with a couple of extra steps).
Any other utilities, in my mind, are secondary. Not that the other utilities don’t exist, but this should always be the *primary* value of introducing a crypto token to a game.
So what are those other utilities? Fundraising is a big one. Speculation another. Governance can be one as well. You could also include cash flows or ownership too, as a more serious version of speculation. But we need to recognize that tokens are often introduced not to make the game better, but as a way to help fund the game. And then the question is if this can be done in a way that *also* benefits the game and community, or if it always ends up being at odds with creating a good game.
Since the two token model is more common right now, let’s start there.

## The Two Token Model

The two token model was pioneered by Axie Infinity with their AXS “governance” token and their SLP “in-game” token.
AXS is the fixed supply token that’s meant to accrue value over time, and SLP is an infinite supply token they can mint and burn as needed to balance out the game.
In this model, AXS is essentially a security. It’s akin to holding stock in the Axie game. Teams can’t really say this, of course, but that’s what it’s doing. Governance is often just a way to feign utility to get around the security concerns. SLP is the real “game” token, since it’s what most of the game economy runs on.

### Benefits to the Two Token Model

What’s great with this model is you can split out the speculation and the game economy. When you launch anything in crypto, people will speculate on it to try to get a nice fast return. Having one token where people can speculate and one token where people can play the game lets these two uses play out separately so that a surge in speculation doesn’t cause a surge in the in-game prices. You don’t want a surge in speculation to suddenly drive up the price of everything in the game.
It also makes fundraising easier. Investors want a fixed supply token they can invest in that has some reason to go up in value over time. A variable supply in-game currency isn’t a great investment asset since the game creators can adjust the emissions, burns, and utility of the token at any time. And they might need to try to push its value in one direction or another to balance out the game.
The two token model of this type is also familiar. People are used to seeing two tokens from Axie and other games that have followed its model, so they intuitively “get” that there’s one token for speculating and one token for playing. It’s also similar to how we think about normal money, like how Gold or Bitcoin is the asset you hold, and Dollars are the asset you spend.

### Downsides to the Two Token Model

While a game is surging in popularity and the market is hot, a two token model looks perfect. One token is staying fairly steady for people to play the game with, and the other one is steadily going up to give people that NGU speculation euphoria.
But when the music stops or slows, people will start to wonder: what’s the point of this governance token exactly? It’s unlikely people will sit on millions of dollars of game tokens just to vote on governance measures. There needs to be more.
This question of “what is the point of the Fixed Supply Token?” is the big downside of the Two Token Model. So there are a few ways to solve it:

### What is the Fixed Supply Token For?

Have a purely speculative Fixed Supply Token (FST) eventually leads to the “hey why are we holding this?” question. Speculation can’t keep the price up forever, so there has to be some point to the token.
Some teams will take the approach of adding cashflows, typically via staking. This can go two routes:
**Dilution Protection**: You stake your token for more of the same token. This isn’t really cash flow, it’s just dilution protection as more tokens get unlocked. But it still looks like “free money” at least.
**Dividends**: Stakers receive some *other* token representing the spending in the game. This is tough to get right though, because if you redistribute funds collected via Application Transactions, then the transactions that *should* be acting as sinks to pull the currency out of the economy stop acting as sinks. They turn ponzinomic instead. So you really only want to redistribute fees from Peer to Peer transactions.
Dividends from Peer to Peer transactions could be quite significant, too. STEPN was making 2-3m a day in transaction fees for much of the past month. There were 600m GMT tokens circulating, so let’s assume 1/2 of those would get staked if they had staking. If they split their transaction fees with GMT holders 50/50, then there would be $1m a day going to 300m GMT staked or about .3 cents per token per day. Given the average GMT price of $1.50 over the last month, that’s a 0.2% per day dividend, or 73% non-dilutive APR. That’s incredible! They didn’t do this, but it does show that dividends on peer-to-peer transactions can be significant.
If a team doesn’t want to add cash flows, or if they want to add something in addition to cash flows, they will add in-game utility for the fixed supply token.
This is what Axie ended up doing, by introducing AXS costs for breeding. In that case, the FST becomes an additional in-game currency, with the difference being that it is a fixed supply vs. the other token’s infinite supply. Game designers can choose whether they want these used tokens to be burned or recirculated, and use that as an additional check on the game economy.
Utility for the FST gets tricky though. What do you use the FST for vs the VST (Variable Supply Token)?
You could draw the line anywhere, but it typically ends up being somewhat arbitrary. There are good arguments for using either as the marketplace token, and for either as the app transaction token.
I think if teams are going to add utility for the FST, then that utility should have some impact on the token’s supply. The point of adding utility is to drive value to the FST, but if it’s just being used as a currency like the VST, then there’s no utility to holding it. You can just buy it as you need it, and sell it when you don’t. But if the FST gets burned when it’s used on special upgrades in the game, for example, then both the FST token *and* the assets that have those upgrades should get more valuable over time as the game gets more popular.
Teams taking the two-token route will eventually run into this problem though. Unless they find a way to add value or utility to the FST, it will get dumped, and a lot of speculators will be left holding the bag.
So what if they try a one token model?

## The One Token Model

Using just one token has been tried much less. But it offers some promise as a way to resolve the issues of the two-token model.
One thing worth keeping in mind is that a one token model doesn’t necessarily mean there’s only one currency in the game. The game could have many currencies, but only have one that acts as the bridge between the game and crypto.
There are a few ways this could be done.

### A VST One Token Model

One option is to create a one token model with just a variable supply token. I haven’t seen a good example of this yet, but it makes sense as a token model for a game trying to strictly follow some of the ideas I had in the “[crypto gaming is broken piece](https://crypto.nateliason.com/p/fix-crypto-gaming).”
It goes back to my point at the start of this article. The purpose of a crypto asset in a game is for people to be able to trade their in-game work for out-of-game money.
If a game studio wanted to do this without messing with complicated tokenomics, here’s an extremely simple method.

1. Build an awesome game with an in-game marketplace (e.g. Runescape, WoW, etc.)

2. Create a bridge between the core currency and the blockchain

3. Add liquidity for that currency with another token (ETH, USDC, etc)

There, you’re done. You made a crypto game. This is deceptively simple but it’s all we need in many cases. Imagine Runescape with a highly liquid Gold <> USDC market. That would be pretty awesome, right?
You don’t even need to make the items NFTs, because let’s be honest, the game items are worthless without the game. Just keep the normal Auction House where players can trade everything for gold, add a gold bridge, and boom, awesome crypto game.
Why haven’t we seen this? Well, because making fun games is extremely hard. There are games that are taking this approach, most of them just aren’t out yet. And when they come out it’s going to be much harder for them to gain traction because they won’t have an exciting ponzinomic loop on top of them. And if we’re being honest, those breeding ponzi loops are an excellent go-to-market strategy for drumming up initial hype.
The other downside of this model is that there’s no token for people to speculate on. And at least for now, succeeding in crypto does seem to require having some opportunity for speculation. It’s also hard to raise money from investors without some fixed supply asset they can hold on to for the long term with some hopes of its value going up.
So let’s consider a Fixed Supply One Token Model next.

### A Fixed Supply One Token Model

Could you build a crypto game where there’s just a fixed supply token? This is the route some of the older crypto gaming platforms that launched took, like Sandbox and Decentraland. And I think we might see it become popular again as an improvement on the two token model.
Here’s one way you might do it. This is somewhat speculative and I’m still workshopping it, so please don’t just copy & paste it and assume it will work.
In this model, you have your fixed supply token which serves as the investable asset as well as the bridge for all in-game money.
But you still need a more variable supply currency in the game so you can balance the economy better. So you still have the VST, it’s just locked in the game without a bridge.
Then you create an in-game DEX between the VST and FST, as well as among any other in-game assets. This is actually a much better technology for trading something like wood for gold, since it creates a SushiSwap or Uniswap style liquid market for being able to immediately trade anything without needing a buyer on the other side.
So players could exchange Gold for the FST at any time and bridge out the FST. Or they could bridge in the FST to buy Gold and Wood and whatever else they want.
Since the FST has a fixed supply, and all the items in the game would be inflationary, the purchasing power of the FST should increase over time without being extractive. Early players would be rewarded with the fruits of their labor being more valuable in FST terms, but later players will still be able to Play and Earn.
Then separate from the resource marketplace, you could have an item marketplace. These items could be extractable as NFTs, or they could be locked in the game. I don’t think it makes a big difference. You could price everything in the marketplace in the FST, and then take a transaction fee either into the treasury or as a burn. If you burn it, then you create some deflation over time, which would also help drive more value to the FST.
Another option is to price the item marketplace in a major crypto asset like ETH. The huge benefit here is that then the transaction fees are in an asset that is not tied to the game performance. If you charge a transaction fee on your own token, you still have to sell that token into the market to have revenue. If you charge a transaction fee on ETH or SOL or USDC, then you have that revenue immediately.
This also requires players to bridge another asset like ETH, SOL, or USDC into the game, which would be stored by the treasury. The treasury could earn yield on these assets while custodying them, creating an additional income stream for the game.
The question then is, how does the FST derive value? Here you could reintroduce the dividend model, but where the dividend is paid in the asset being used in the marketplace. So by staking my FST, I’m earning some ETH or USDC in the game, without having to bother with some complicated on-chain staking system. This would be *extremely* cool and is not something I’ve seen any game try. Though I suppose it would be complicated legally.
Then you could also have it accrue some dividends from the trading fees on all the other swaps. So by locking up your tokens in the game, you’re earning some ETH, some of the in-game VST, and some more of the FST, all from the different trades happening in the game. That would make it a phenomenal investment asset, *and* you’d be increasing the value of the FST over time by having its purchasing power for the inflationary assets increase. If you threw some high-value burns on top of it, you’d have an extremely strong investment thesis for the token.
As I think through this model, I think it’s much stronger than the current popular two token models. It adds a lot of flexibility and ensures there’s one core asset that’s accruing value in the ecosystem. The VST one-token model is ideal if you just want to build a game that has some crypto tie-in. But this FST model lets you retain some of the more speculative side of crypto, as well as the investability over time.
This is purely a thought exercise and definitely needs some refining. But I hope it’s helpful for any team trying to think through how to structure their tokenomics. I’ll keep referring to this and expanding on it as I explore more games, and work with more teams.
And as always, if you’re working on a game and want to collaborate on figuring this out, [hit me up on Twitter](https://twitter.com/nateliason).
