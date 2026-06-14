---
title: "Decentralized Exchanges: Why Crypto’s First Killer Apps are So Powerful - DeFriday #12"
subtitle: "Look at me. I'm the bank now."
author: "Nat Eliason"
date: 2021-08-20
column: almanack
url: https://every.to/almanack/decentralized-exchanges
paywalled: false
scraped_at: 2026-06-11T16:08:52.744Z
---

# Decentralized Exchanges: Why Crypto’s First Killer Apps are So Powerful - DeFriday #12

*Look at me. I'm the bank now.*

The Uniswap decentralized exchange does over $1b in daily cryptocurrency exchanges.
It holds $7.55b worth of cryptocurrency in its smart contracts. Not in a bank account, or on a centralized exchange like Coinbase, but in lines of code running on the Ethereum blockchain.
What Coinbase does with 1,700 employees, Uniswap does much of with 13. The protocol runs completely autonomously, trades happen with no human involvement, prices are set automatically, liquidity is added and removed by anyone in the world, and support happens organically in their Discord.
Decentralized Exchanges like Uniswap are one of the first killer apps in crypto. They’re replacing a core piece of the Traditional Finance infrastructure, and doing it with 1/100th the headcount.
And they’ve provided an essential piece of the crypto infrastructure. Before Uniswap and other DEXes came on the market, the only way to buy a new crypto token was if a Centralized Exchange (CEX) like Coinbase listed it.
But today, you can create a new token and add the necessary liquidity to Uniswap, and your token is immediately available to anyone in the world. No gatekeeper approval required.
Many people have heard of Uniswap and have some concept of the idea of Decentralized Exchanges, but you might not know why they’re so cool and how they work. So in this post, I’ll walk through what makes them so valuable and how anyone can use them.
*Brief aside! I’m launching a job board specializing in aggregating the best roles at DeFi, Crypto, and Web3 companies. Almanack's 8k+ person audience includes some of the smartest people in crypto and I want to create a way to connect them to the best possible projects and communities.*
*If you have an open role and want to reach Almanack readers *[you can post a job here](https://pallet.xyz/list/almanack/jobs)*. The best roles will go out every week in the newsletter to our audience. *

## Why DEXes Are So Valuable (and Cool!)

I recently started working with the blockchain video game [Crypto Raiders](https://cryptoraiders.xyz/). It’s a World of Warcraft or Diablo-inspired dungeon crawler, where all the playable characters, items, consumables, and in-game currency are represented by NFTs and cryptocurrency.
We already had the [first batch of characters](https://opensea.io/collection/crypto-raiders-characters) out, and we wanted to launch the in-game currency. Naturally, a blockchain game would use a cryptocurrency, so I came up with a plan for [two different ones](https://cryptoraiders.medium.com/crypto-raiders-tokenomics-and-economy-launch-plan-20ab77f44845). One that represents the overall value of the game economy (RAIDER), and one that’s used for in-game activities (AURUM).
We gave away $2.5m worth of the tokens to early game adopters, but it’s not much use having a crypto token if you can’t trade it. So we needed a way for players to exchange their RAIDER and AURUM for other cryptocurrencies like ETH.
Before DEXes, we would have had to email someone at a centralized exchange like Coinbase and ask them to list us. Then there’d probably be months of discussions, paperwork, debates, and we might not even get listed. It would heavily favor companies with huge bank accounts and money to burn. And it would have been slow.
But thanks to the thriving DEX ecosystem that’s been built over the last few years, we didn’t have to do that. Instead, we were able to create a market for our tokens ourselves.
Since the Crypto Raiders game lives on [the Polygon blockchain](https://every.to/almanack/defriday-2-polygon-s-surge-ethereum-s-future), we created our trading market on SushiSwap, one of the larger DEXes on Polygon.
Creating a new trading market for a token is fairly simple. You need an initial supply of that token, as well as an initial supply of the token you want it to be traded with. Since MATIC is the native token for Polygon (like ETH is the native token on Ethereum), we decided to make our initial trading pairs MATIC + RAIDER and MATIC + AURUM.
When you create a new trading pair on a decentralized exchange, you set the initial trading price based on the ratio between the two tokens that you deposit. If MATIC were at $1.00 and we put in 1000 MATIC and 1000 RAIDER, we’d be setting the initial RAIDER price at $1.00.
The two tokens you deposit into a decentralized exchange go into a “Liquidity Pool” that other people are using to trade between the tokens. You always have to put an equal value of tokens into the Liquidity Pool on a site like Sushi, since it wants to make sure there is an equal value of tokens on both sides of the trade.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_YqJuvymDxCdxQW3vRudTShqteugj_3nqvSLzMaE16HBWbQGAE8pl2ZxO7ACmDzQCOq5wYDTaWIZcKis_12Ie4m8-EPUiJC6NM6Jc5J9cRXD2pTu1TdI4p3HZp2dVZQLRuYNqByQQ.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_YqJuvymDxCdxQW3vRudTShqteugj_3nqvSLzMaE16HBWbQGAE8pl2ZxO7ACmDzQCOq5wYDTaWIZcKis_12Ie4m8-EPUiJC6NM6Jc5J9cRXD2pTu1TdI4p3HZp2dVZQLRuYNqByQQ.png?link=true)

As people trade their MATIC for RAIDER, the supply of MATIC goes up and the supply of RAIDER goes down, which increases the price of RAIDER to balance out the values of the two tokens in the pool. The more RAIDER and MATIC tokens in the pool, the less the price will fluctuate in response to trades, so it helps to have more tokens (aka liquidity) in the pool to prevent crazy price swings.
Normally on a CEX like Coinbase, they own the supply of tokens and they collect all the trading fees. But on a DEX, **anyone can add liquidity and earn a share of the trading fees**. On Sushi for example, 0.25% of every trade goes to the liquidity providers. So if you added all of the RAIDER and MATIC liquidity, you’d earn 0.25% of every trade other people make between the tokens.
This is where things start to get really cool. When we launched the tokens, we only added $100,000 of initial liquidity for each. Since then, tons of other people have added liquidity as well, and now the [RAIDER/MATIC pool](https://analytics-polygon.sushi.com/pairs/0x2e7d6490526c7d7e2fdea5c6ec4b0d1b9f8b25b7) has over $1.6m of liquidity!

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_kRsUTrcnjcDBGEqi1VdThJHi_lZGuGx7ZtRR8sVfVYwTC2thJuB70PEtgUCBMKWlojsMlep54CUBd4ouje7HdBSpra2bYg07vezxxpuzkqUS4x2BCgawQSsTS19MJldQIDuHvcir.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_kRsUTrcnjcDBGEqi1VdThJHi_lZGuGx7ZtRR8sVfVYwTC2thJuB70PEtgUCBMKWlojsMlep54CUBd4ouje7HdBSpra2bYg07vezxxpuzkqUS4x2BCgawQSsTS19MJldQIDuHvcir.png?link=true)

The [AURUM](https://analytics-polygon.sushi.com/pairs/0x91670a2a69554c61d814cd7f406d7793387e68ef) pool isn’t doing too bad either, with $1.2m of liquidity in it:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_MOEGWahrQU9W5R5w-FL9phTOmhCoMaoQnfMCNWKxLg-yJ_RynFy7GV9zUsilc736trRi_PGLU7doCpjdPjTNT3VLKpvL_xf4Cs1HHFAvSz9T0-5bdLZTu8kSSg2RuLwlaCPF1fg8.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_MOEGWahrQU9W5R5w-FL9phTOmhCoMaoQnfMCNWKxLg-yJ_RynFy7GV9zUsilc736trRi_PGLU7doCpjdPjTNT3VLKpvL_xf4Cs1HHFAvSz9T0-5bdLZTu8kSSg2RuLwlaCPF1fg8.png?link=true)

So even though we only started with $100,000 of funds in each of these pools, there’s now almost $3m in them, providing the liquidity necessary for people playing the game to trade between game tokens and other cryptocurrencies. And everyone who added that liquidity is passively earning trading fees whenever people trade among the different tokens.
We were able to do all of this: launch the token, seed the liquidity, and open it up for trading, in one evening. And less than two weeks later, there’s nearly $3m of liquidity deposited, letting people buy and sell these new crypto tokens as easily as any other crypto asset.
Before DEXes, there was no way to do something like this. But now if you have a new crypto platform, game, community, or anything else you want to create a token for, you can immediately put that token up for sale and make it available to the broader crypto ecosystem.
And also before DEXes, if you have a bunch of crypto tokens sitting in your wallet, there weren’t many ways to put them to work. But now you can deposit those assets into liquidity pools and start earning trading fees completely passively, as if you helped fund the bank account of a major exchange like Coinbase.
They’re an incredible tool for democratizing finance and access to financial tools, but they obviously come with some risks and downsides.

## Risks and Downsides of DEXes

The biggest downside with a DEX is that since anyone can add new tokens, anyone *will* add new tokens.
If you’re not careful, someone could send you a link to buy a fake version of a token you’re looking for. Token names aren’t unique, only their contract addresses, so people can create fake versions of major tokens and add them to DEXes to try to scam people. Luckily this is avoidable if you only try to buy tokens listed in DEX itself, or only use purchase links from sources that you trust.
Another risk, specifically for providing liquidity, is something called “[impermanent loss](https://www.youtube.com/watch?v=BmFsT-B02Kw).” The video covers it in more depth, but the short version is that if you put two tokens into a liquidity pool and their relative prices diverge significantly, you might get much less back than what you put in.
Then there’s the cost. DEXes can be very efficient compared to CEXes, but you have to watch out for the Ethereum gas fees. You might only have to pay 0.3% in fees to swap tokens on Uniswap, but you also have to pay the gas fee, and when Ether is expensive and there's lots of activity, that can sometimes be in the hundreds of dollars. Those gas fees unfortunately often make DEXs unusable to anyone who is moving around less than a few thousand dollars worth of crypto at a time. But on networks with cheaper transactions like Polygon, this is much less of a concern.

## How to Use a DEX for the First Time

I cover using DEXes and everything else in [DeFi Orientation](https://learn.nateliason.com/p/defi-orientation), but it’s simple enough to figure out on your own too. Trading cryptocurrency on a decentralized exchange is simple assuming you already have some crypto funds.
First, transfer any funds you're currently storing on a centralized exchange into your MetaMask or Hardware Wallet. Remember: if your funds are on a CEX, they're not really your funds.
Next, go to one of the popular DEXs like Uniswap or Sushi. Connect your wallet in the upper right corner, put in the token you have, and select which token you want to buy:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_B2y6qcoCen2e8FOlhK8XgRUNle0KqySuZ8yT8mGuA7VsZnk86-GShk-uunYYHtsseRPsYPOQIEPZQijHS8nptW6odyL-OzP69GlFv5zJTG8LmoyhspHyqmXkRKLRFhLEXCROxPlk.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1840/optimized_B2y6qcoCen2e8FOlhK8XgRUNle0KqySuZ8yT8mGuA7VsZnk86-GShk-uunYYHtsseRPsYPOQIEPZQijHS8nptW6odyL-OzP69GlFv5zJTG8LmoyhspHyqmXkRKLRFhLEXCROxPlk.png?link=true)

Then click Swap! The transaction will confirm in MetaMask, and once it gets confirmed by the Ethereum network, you'll have your new tokens in your wallet.
Getting comfortable using a decentralized exchange is one of the first, essential parts of joining the world of DeFi. Once it feels natural, you can explore other parts of DeFi like supplying the liquidity behind these trades so you can collect trading fees.
