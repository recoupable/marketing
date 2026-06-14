---
title: "Building Sustainable Web3 Games with Owned Liquidity & Tokenized Assets"
subtitle: "Play and Earn. Not Breed to Earn. "
author: "Nat Eliason"
date: 2022-01-20
column: almanack
url: https://every.to/almanack/building-sustainable-web3-games-with-owned-liquidity-tokenized-assets
paywalled: false
scraped_at: 2026-06-11T16:08:44.986Z
---

# Building Sustainable Web3 Games with Owned Liquidity & Tokenized Assets

*Play and Earn. Not Breed to Earn. *

Part of the magic of [Web3](undefined) gaming is the ability for players to cash out their in-game work. So far, though, most [play-to-earn](https://every.to/c/play-to-earn) games rely on attracting new players to make this possible.
The most famous example is [Axie Infinity](https://every.to/divinations/is-axie-infinity-a-ponzi-scheme). In order to play, prospective gamers have to buy or rent an [Axie](https://every.to/c/axie-infinity) from an existing player. The game economy works because new players buy Axies from old players in hopes of reselling those Axies to newer players who join after them.
This might seem like a good idea on the surface, but it’s not a very sustainable dynamic. For one, it favors investors not gamers. Breeding isn’t a very fun game, but it’s where most of the revenue (and incentive) for Axie players comes from. For another, it builds the in-game economy on a very shaky foundation. Once the flow of new players stops, the demand for new characters stops, the demand for breeding stops, and the demand for the token that facilitates breeding stops. The whole thing collapses. No bueno.
So the question for [crypto](https://every.to/c/crypto) gaming is: how to create a game that is fun to play, rewards gamers for their hard work, and generates enough revenue to fund continued development?
Ideally, the primary revenue driver should be in-game activity amongst existing players. Not selling new characters to new players, since then the health of the game depends on attracting greater and greater numbers of players.
One elegant method is through the combination of tokenized game assets and protocol owned liquidity. This is what we’ve started doing with [Crypto Raiders](https://cryptoraiders.xyz/), and so far it’s working quite well.

## Tokenized Game Assets

Tokenized game assets are the first important innovation for Web3 gaming. When someone plays Crypto Raiders, they own their Raiders as [NFTs](https://every.to/c/nfts), and they can sell those Raiders on the market at any time. If they level them up, and get good gear then those Raiders become more valuable.  A leveled, geared up character often sells for 3-4x the price of a new recruit.
But NFTs are only one part of the tokenized game asset economy. An existing player is unlikely to be constantly buying and selling characters, so trading fees on the character NFTs is not likely to be as strong of a revenue stream once you have a healthy and sustained player base.
The more interesting form of tokenized game assets are all of the in-game gear and materials.
Recently in Crypto Raiders, we’ve introduced an idle playmode where you can send your Raiders on Quests to collect materials that award experience in certain skills, and which will be used to create items for use in-game.
Our first two Quests task players with gathering crafting materials. Players who complete the Quests receive Herbalism experience, as well as an herb, Grimweed, and another ingredient, Eye of Newt. These two ingredients can later be used to craft Health Potions, which players will be able to use in-game to heal their characters during difficult dungeons or the endless dungeon.
This is a typical gaming experience: farm materials, craft potions, and then use those potions during gameplay. Every step of the way, there’s demand for trading with other players. You could choose to farm just one type of material, and buy the other. You could make potions and sell them instead of using them. Or you could skip the whole crafting process and just buy your potions on the open market.
In MMOs this is where the Auction House, Grand Exchange, and other central trading entities came into play. The problem with these centralized exchanges is that: they require players to find someone to trade with, and the game itself has no way to benefit from trades between players.
That’s where Protocol-Owned Liquidity comes into play.

## Protocol-Owned Liquidity

Web3 land, we can lean on the existing infrastructure to facilitate trades amongst players.
All of our crafting materials in Crypto Raiders are ERC-20 tokens. So you can go buy "[Grimweed](https://app.sushi.com/swap?inputCurrency=0x34d4ab47Bee066F361fA52d792e69AC7bD05ee23&outputCurrency=0x06F34105B7DfedC95125348A8349BdA209928730)" and "[Eye of Newt](https://app.sushi.com/swap?inputCurrency=0x34d4ab47Bee066F361fA52d792e69AC7bD05ee23&outputCurrency=0x1346FdB62241e238Be9F84A2FC364c0657757015)" on [Sushiswap](https://every.to/c/sushi) right now. And once you can craft health potions, those will be tradeable as well.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2014/optimized_CleanShot%202022-01-21%20at%2013.20.35@2x.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2014/optimized_CleanShot%202022-01-21%20at%2013.20.35@2x.png)

So not only can a player cash out their characters, but they can also cash out all of the work they do farming materials for the game. Nothing is stopping a player from farming Eye of Newt all week, then selling it for USDC or [ETH](https://every.to/c/ethereum) on Sushiswap.
By leaning on existing Decentralized Exchanges, we can create highly liquid instant-settling trade markets for in-game assets that didn’t exist in past games. You always needed someone on the other side of the trade in WoW or Runescape. In crypto, with [Automated Market Makers](https://every.to/almanack/decentralized-exchanges), you don’t.
This also introduces a system for generating significant revenue over time for the game. In WoW, Blizzard doesn’t make more money the more people trade. In crypto, they could.
In order for trades to happen on a [Decentralized Exchange](https://every.to/almanack/decentralized-exchanges), there needs to be sufficient liquidity for the trading pairs. So when a game or protocol launches a new token, they will often incentivize their users to add liquidity by offering them token rewards over time.
But if a game is adding liquidity for a new asset, as well as their native token, they don’t need anyone else to add liquidity. They can create it themselves. We have [~$750,000 of liquidity](https://www.defined.fi/matic/0x89176dc7b5aebd0d5efffc2592e2068266f4b783?cache=5ab04) for Grimweed right now, but that was free for us to create. We simply minted the initial Grimweed, combined it with AURUM (our in-game currency) in the treasury, and deployed the liquidity.
Now our players have a trading pool with $1m of liquidity in which they can buy and sell their earned Grimweed amongst each other. They have instant access to the ability to buy and sell materials, without needing many other players to take the other side of each trade.
And for us, it provides a meaningful additional revenue stream. With ~50,000 RAIDERS farming Grimweed there could be 1,000,000 new Grimweed generated per week. If Grimweed fell to a price of $0.05 per token, and half of the weekly farmed amount was traded (bought and sold) on the market, that would be $50,000 in trade volume per week on Grimweed.
The trading fee charged on these exchanges is 0.35%, which is then given to the owners of the liquidity. Since we own all the liquidity between Grimweed and Aurum, that would be an additional $1,750 in revenue per week just on this material.
As you expand your market to dozens of tokens, those trading fees start to add up to more and more money. Pretty soon you can have a multi-million dollar a year business just from the trading fees on your in-game assets.
Where it gets even more interesting though is when the game owns the liquidity for their primary tokens.
With ~10,000 active players, the daily volume on our in-game currency AURUM is[~$600k per day](https://www.defined.fi/matic/0xabee7668a96c49d27886d1a8914a54a5f9805041?cache=04270). If we scale up to 100,000 players and that ratio holds, the daily volume would be $6m. If we brought the AURUM/USDC and AURUM/MATIC liquidity into the treasury, that would be $21,000 in revenue per **day **earned from people trading our in-game currency.
And that’s just the in-game token. Trading volume is much higher on the governance token, Raider, which currently does ~2.3m in volume per day. Under the same assumptions, we would generate $80,500 per day in revenue by owning that liquidity.
Issuing a large number of in-game assets as crypto tokens players can trade between where you own the liquidity creates a massive revenue stream for crypto-native games. It may be large enough that there’s no need for microtransactions that we’ve grown accustomed to from F2P and mobile games. And it makes the economy better for players since they can quickly cash out as much of their in-game work as they want.
I suspect we’ll see more games move to bring as much of their liquidity as possible into their own treasury so they can capitalize on this. We’re already in the process of doing this as Crypto Raiders, both by exploring [Olympus Pro style bonding](https://every.to/almanack/olympus-dao) of our outstanding liquidity and issuing more tokens for in-game assets.
It’s an exciting new way to monetize in-game economic activity, without needing to rely on constantly attracting new players. And I hope we see more of it so we’re not stuck in the existing paradigm of Web3 gaming mostly revolving around speculative breeding.
