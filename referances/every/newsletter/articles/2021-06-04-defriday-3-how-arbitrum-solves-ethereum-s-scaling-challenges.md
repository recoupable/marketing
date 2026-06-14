---
title: "DeFriday #3: How Arbitrum Solves Ethereum's Scaling Challenges"
subtitle: "Plus: Convex's insane growth, Elon's long game, DOGE, and Esports"
author: "Nat Eliason"
date: 2021-06-04
column: almanack
url: https://every.to/almanack/defriday-3-how-arbitrum-solves-ethereum-s-scaling-challenges
paywalled: false
scraped_at: 2026-06-11T16:08:57.978Z
---

# DeFriday #3: How Arbitrum Solves Ethereum's Scaling Challenges

*Plus: Convex's insane growth, Elon's long game, DOGE, and Esports*

Happy DeFriday!
In case you missed them, you can find[edition 1 on the market crash here](https://every.to/almanack/defriday-1-may-market-meltdown-winners-losers) and[edition 2 about Polygon here](https://every.to/almanack/defriday-2-polygon-s-surge-ethereum-s-future).
This week we're continuing the theme of solving Ethereum's scaling challenges by talking about the launch of [Aribtrum](https://offchainlabs.com/): a Layer 2 rollup that was deployed for developers last week and should be opening up to consumers within the month.

## What is Arbitrum

The biggest bottleneck to broader Ethereum adoption today is gas fees. Unless you're moving around amounts above $10,000, the gas fees can quickly erode any interest you might earn on your capital, creating a significant barrier to entry to DeFi for the vast majority of people.
One solution is to use a completely different blockchain with lower transaction fees, like Solana or Binance Smart Chain.
Another solution is to use a sidechain to Ethereum, like Polygon which I discussed[last week](https://every.to/almanack/defriday-2-polygon-s-surge-ethereum-s-future).
And the third solution that many in the crypto and DeFi space have been waiting for are Layer 2 Rollups: solutions that sit on top of Ethereum and abstract away some of the activity into a less expensive environment, while still retaining the security and reliability of the main Ethereum blockchain.
There are two main types of rollups being developed right now: Zero Knowledge Rollups (also called ZK-Rollups, which I’ll cover in the future), and Optimistic Rollups. Arbitrum is an Optimistic Rollup, so that's the type we need to understand to understand how Arbitrum works.

### How Arbitrum's Optimistic Rollup Works

On Ethereum there are two broad types of transactions: transfers and computations. Transfers move ETH from one wallet to another and are where Ethereum and Bitcoin are essentially the same. But Ethereum also has a computational layer where the network can run the code built into smart contracts just like your computer is running the code built into this website.
Ethereum can be slow because executing the logic in smart contracts requires significantly more computing power than just transferring Ether from one wallet to another. For any given smart contract in an Ethereum application, every single node on the Ethereum mainnet has to run every computation. It’s done this way in order to prevent fraud, but it means that gas fees for Ethereum are expensive and prone to spike during high-traffic periods.
Arbitrum solves this problem by moving Ethereum smart contract computations off-chain. It runs those computations on its own network and then posts the net effect of those computations back to the main Ethereum blockchain. Arbitrum still runs every transaction using the same smart contract code as the Ethereum mainnet, it just doesn’t use up Ethereum computing space to do it.
This could potentially open the door for fraud, but Arbitrum has a solution. Since multiple validators are processing the transactions off-chain, when they post data on-chain, it should all be the same. If it isn't, Arbitrum does a correction round of computations on the Ethereum main chain to resolve it. It's actually a very clever system, here's how one of the founders [describes it](https://medium.com/offchainlabs/scalable-low-cost-computation-of-ethereum-smart-contracts-using-arbitrum-on-the-chainlink-8985c6542d4e):
*"Arbitrum allows for the efficient resolution of the dispute on Ethereum, using a unique on-chain dispute resolution mechanism that guarantees correctness even if there is just one honest validator, referred to as Arbitrum’s AnyTrust Guarantee. If any validator tries to lie about an Arbitrum computation’s behavior, an on-chain contract will identify and penalize the dishonest node by using a highly-efficient challenge-based protocol. The challenge system requires validators to submit proofs on-chain backed by staked collateral until the issue is resolved."*
If your transactions don't line up with everyone else's, anyone can submit their proof of what the truth should be, along with a collateral stake showing confidence in the proof. If your proof turns out to be fraudulent, you lose your collateral. Since any attempt at a fraudulent transaction will immediately get picked up by the other validators and result in the thief losing any collateral they stake, there's no economic incentive to try to cheat the system. You have to put your Ether where your mouth is.
This is a big area where we see the benefits of a Layer 2 over a sidechain. While Aribtrum does process most transactions on its own network, if there's ever a dispute, that dispute is settled on Ethereum. This gives it a more established and battle-tested security layer than sidechains like Polygon, which have to resolve disputes on their own.
When it fully launches, Arbitrum will allow for significantly more and cheaper Ethereum transactions than can currently happen on the Mainnet, all while retaining Ethereum's security layer.
So what are the downsides?

### Arbitrum Downsides

One big downside is that while Arbitrum is built on Ethereum and inherits its security layer, it's still a separate network, which means apps on Aribtrum are not interoperable with apps on Ethereum.
Apps on Ethereum can all interact with each other, and apps on Arbitrum can all interact with each other, but Ethereum apps won't be able to interact with Arbitrum apps. If you[store a bunch of your Ether on Compound](https://every.to/almanack/creating-a-high-yield-savings-account-with-crypto-defi) on the Ethereum mainnet, you won't be able to borrow against it on the Arbitrum network, even if Compound has an identical application on Arbitrum.
So when Arbitrum launches, the apps which launch with it will have to find ways to incentivize people to bring funds over to their Arbitrum versions from the Ethereum mainnet. If Polygon and other networks are any indications, that most likely means there will be significant incentives for people to bring funds over to Arbitrum in its first few months.
The other main downside is simply that it's not yet proven. It's undergone extensive testing and has some of the best people in the Ethereum space behind it, but it hasn't seen the real world yet, and you never know what might break. Hackers and exploiters will certainly be looking for ways to game the off-chain transaction layer, and if they find a way to exploit it, that could have a significant impact on the ecosystem.

### When Can We Use It?

Arbitrum launched for developers last week, and major Ethereum applications have already started copying their code over for their Arbitrum launch. Since Arbitrum uses Solidity like Ethereum, the Arbitrum team says it's extremely simple for existing Ethereum applications to copy their code over for an Arbitrum version.
After a few weeks of developers getting set up and ready for launch, Arbitrum should open up to the public later in June. It's not 100% public which apps will be there at launch, but a few like Sushi, Alchemy, Etherscan, Chainlink, The Graph, and Uniswap have publicly shared their intent to launch, and Arbitrum claims there were[over 250 apps](https://offchain.medium.com/introducing-arbitrum-one-our-mainet-beta-ed0e9b63b435) on the waitlist for the developer test period.
When it does launch later this month, it will be exciting to see just how much activity there is, and what new kinds of apps it enables to be built.
*If you’re curious to read more about Arbitrum, check out Ed Felten’s posts *[here](https://medium.com/offchainlabs/whats-up-with-rollup-db8cd93b314e)* and *[here](https://medium.com/offchainlabs/scalable-low-cost-computation-of-ethereum-smart-contracts-using-arbitrum-on-the-chainlink-8985c6542d4e)*, as well as the Ethereum.org page on *[Layer 2 Rollups](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/)*. *

## App of the Week: Convex

[Convex Finance](https://docs.convexfinance.com/), the new protocol providing staking rewards for [Curve](http://curve.finance) liquidity providers, passed 2.5b in Total Value Locked locked this week.
Considering Convex only [launched two and a half weeks ago](https://convexfinance.medium.com/ready-set-go-69bd68019c5a), this is a pretty insane growth rate. If it were on [DeFi Pulse](https://defipulse.com/) it would already be in the 11th spot! It’s not hard to see why people are flocking to it though, considering the high APY it offers on CRV tokens as well as stable coin pairs:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1719/optimized_TO2VW8rxqbB5sPvx1SlwvQRBFXa_jxoIM9ZbD2NOcNa8TOEOKoJJGGcqlrY1X9npMmPPGOr-xE7HAWDrGJgUaxO2iI-MWFzs6cDQb0G4bAaCPNk4e_JaEvkYYO1vWOmTsjMCFg3-.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1719/optimized_TO2VW8rxqbB5sPvx1SlwvQRBFXa_jxoIM9ZbD2NOcNa8TOEOKoJJGGcqlrY1X9npMmPPGOr-xE7HAWDrGJgUaxO2iI-MWFzs6cDQb0G4bAaCPNk4e_JaEvkYYO1vWOmTsjMCFg3-.png?link=true)

## In Other News

If you’re interested in picking up some Solidity, the programming language powering the smart contracts of Ethereum, Nader Dabit put together [a list of resources](https://twitter.com/dabit3/status/1400784184189325312) he used to learn it for a job over a few months. I’m currently learning Solidity, so I definitely appreciated this.
Croissant on Twitter put together a pretty interesting theory on what [Elon’s end game might be](https://twitter.com/CroissantEth/status/1399828507849527298) with all of his Bitcoin talk. Might be a bit conspiracy-leaning, but it’s definitely something you could see Tesla doing in the future.
After a long resistance to acknowledging DOGE, [Coinbase Pro has decided to add it](https://blog.coinbase.com/dogecoin-doge-is-launching-on-coinbase-pro-1d73bf66dd9d) to their trading platform. It’s not clear if or when they’ll add it to the consumer-focused Coinbase site, but this is certainly a big shift from their historic avoidance of “meme” coins.
FTX, one of the biggest crypto exchanges in the world, is [funding $210 million](https://www.nytimes.com/2021/06/04/sports/esports-name-change-tsm-ftx.html) to the esports team TSM. Considering how much overlap there is in interests between DeFi and video games, this feels like a perfect union.

## Wrap Up

That's all for this week, be sure to subscribe to get future editions!
And if you sign up for the paid membership, you'll also get access to a **private Discord with me** and the other members of the bundle to talk all things Crypto, Finance, Productivity, Business, and more.
