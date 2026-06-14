---
title: "Solana's Fast & Cheap Answer to Ethereum's Gas Wars - DeFriday #13"
subtitle: "What is this? A gas fee for ANTS?"
author: "Nat Eliason"
date: 2021-09-09
column: almanack
url: https://every.to/almanack/solana-defi
paywalled: false
scraped_at: 2026-06-11T16:08:51.223Z
---

# Solana's Fast & Cheap Answer to Ethereum's Gas Wars - DeFriday #13

*What is this? A gas fee for ANTS?*

When I started writing DeFriday, you could do most Ethereum transactions for under $10-$20.
That was still a slightly annoying price since TradFi money movements are essentially free, but it was an acceptable price to pay for [self-repaying loans](https://every.to/almanack/alchemix-self-paying-loans) or unusually [high yield savings accounts](https://every.to/almanack/creating-a-high-yield-savings-account-with-crypto-defi).
Unfortunately, since then, the gas fee landscape has changed pretty significantly. With the surge in NFT popularity and the rising price of Ether, the Ethereum network has gotten extremely congested and expensive to do DeFi on.
If you wanted to follow the advice in earlier articles, you'd be looking at hundreds if not thousands in total gas fees. Ouch!
Thankfully you don't have to do everything on the Ethereum Mainnet. One option is to use Polygon: a sidechain to Ethereum [I wrote about a few months ago](https://every.to/almanack/defriday-2-polygon-s-surge-ethereum-s-future).
Another option that's quickly growing is [Arbitrum](https://every.to/almanack/defriday-3-how-arbitrum-solves-ethereum-s-scaling-challenges): a Layer 2 solution for Ethereum that recently launched and is quickly releasing more and more applications.
These Layer 2s and sidechains are great because you can bounce back and forth among them fairly quickly, and they offer many of the same applications. But they're not so great because you still have to get to them in the first place, and right now, that means going through the Ethereum mainnet and often paying $200+ in gas just to bridge your funds over.
Thankfully, there's another option. Solana has been all over the news recently with its insane price surge, but what sets Solana apart from other cryptocurrencies that have recently run up like Cardano is that Solana *actually has a fully functional DeFi ecosystem*.
I'm not going to spend too much time on how Solana works or how it compares to Ethereum technically here. All you need to know for exploring the Solana DeFi ecosystem is:

1.
**It's insanely fast**. Transactions settle in seconds.

2.
**It's insanely cheap**. You never have to think about gas fees.

3.
**It's independent**. You don't have to deal with bridging assets from Ethereum.

And most importantly: you can do pretty much everything I've written about doing on Ethereum on Solana as well. There aren't as many options, and there are some odd limitations, but if you wanted to start moving more of your financial life into crypto, the Solana ecosystem might be a better place to start right now.
So in today's DeFriday I'll cover:

- Differences between the Solana and Ethereum DeFi Ecosystem

- How to Get Setup in the Solana Ecosystem

- Using Decentralized Exchanges on Solana

- Lending & Borrowing on Solana

- Yield Farming on Solana

- What the Future Might Hold for the Solana & Ethereum Relationship

Also if you prefer video demonstrations for all of this, I have a whole section about Solana now in[DeFi Orientation](https://learn.nateliason.com/p/defi-orientation).
Let's dive in!

## Solana vs. Ethereum DeFi Ecosystems

As the first blockchain to support smart contracts, and the most widely adopted smart contract blockchain, Ethereum has led the way with most Web3 innovations including DeFi.
DeFi ecosystems have popped up on other blockchains like Binance Smart Chain, Polygon, and Fantom, but since those chains are all compatible with the Ethereum Virtual Machine (EVM).  This has several important implications. First, it means that developers who have built skills in Solidity and the Ethereum ecosystem can easily use those skills to build applications on these alternate chains. Second, it means that applications already written on Ethereum are extremely simple to stand up because you can literally just copy and paste the smart contracts over and they’ll run just fine. This has led to a number of benefits for these blockchains, like being able to grow their DeFi ecosystems extremely quickly. But it’s also led to tons of scammy products and "rug pulls," since it's so easy to re-deploy an existing product, tweak a few variables, and trick a bunch of people out of their money.
Solana is different. It’s the first smart contract enabled blockchain with significant adoption that *isn't* EVM compatible. You cannot simply copy the Uniswap smart contracts and deploy your own version of it. You have to build something that's native to Solana.
This obviously creates some barriers to entry. Since it uses an entirely different programming language (Rust instead of Solidity), you have to pick up a new programming language and then rebuild your application if you want to extend to Solana. That's likely why applications like AAVE have Polygon and (soon) Arbitrum support, but haven't launched on Solana. It's a lot more work. Even Sushi, which supports over a dozen blockchains, isn't on Solana yet.
But as much as it's a barrier, it's also a benefit. Polygon and BSC are overrun with copycat DeFi applications that offer no real innovation over what you can do on Ethereum beyond cheaper gas fees. Since Solana requires you to start from scratch, there are some interesting new applications and experiments there.
There are also, at least so far, seemingly fewer scams. Polygon and BSC for a while were awash with scams and exploits, and that doesn't seem to be the case with Solana, at least not yet. Scammers are typically fairly lazy, so not being able to copy and paste existing contracts from Ethereum probably helps create some good barriers to people trying to make a quick buck.
So that means there are some cool new kinds of applications on Solana you don't see in the Ethereum ecosystem, and they run as fast and cheap as applications on Polygon. And given how complicated it is to get started, it at least feels a little safer so far.
But before we move on, there is one other big downside here: lack of security history. Everything on Solana is so new and untested that we don't know what kinds of security exploits might be waiting to be discovered. There were tons of hacks and exploits on the early DeFi smart contracts that we now know how to prevent. But since Solana can't completely lean on that experience, there may be some added risk there we aren't yet aware of.
So as always, exercise caution when diving into this new domain. It's the best DeFi user experience by far right now. But there might be some hidden risks that come with that we aren't totally aware of.

## How to Get Setup in the Solana Ecosystem

When I say Solana has the best blockchain user experience right now, half of the credit goes to Phantom.
It's a browser wallet similar to MetaMask... but a lot nicer. It updates your balances better, keeps track of all your different tokens, shows you all of your NFTs, and even lets you do some basic token swaps within it.
Getting set up for DeFi is as simple as installing Phantom in your browser, then transferring in some SOL tokens from an exchange like Coinbase. The fees and time to do this are pretty minimal, so if you have any funds sitting in Coinbase you could go do this in a few minutes.
Once the funds have arrived, you'll be ready to start using some of the DeFi apps!
One note: other assets like USDC also live on Solana, but the versions on Coinbase and most exchanges are the Ethereum versions. So you won't be able to transfer those assets directly to Solana. You'll have to just transfer in SOL tokens for now.

## Decentralized Exchanging on Solana

Since you can't move most assets into Solana from an exchange, you have to do the exchanging once you get there.
Decentralized Exchanges on Solana work [very similarly to the ones on Ethereum](https://every.to/almanack/decentralized-exchanges). You put in the asset you want to swap and what you want to receive, it shows you a price, and you can swap it. The most popular one for most swaps is [Raydium](https://raydium.io/), though you can also check out [Serum](https://dex.projectserum.com/#/) if you're outside the US.
So if you want to exchange your SOL tokens for other DeFi tokens like RAY, SRM, and SBR, Raydium is a great place to do it. As you do a few trades, you'll notice that transactions settle extremely fast and for a negligible fee. You can pretty much do as much swapping as you want without ever having to worry about gas fees.
Okay, now what if you want to generate some yield on your assets? Well Solana also has some infrastructure in place for lending and borrowing.

## Lending & Borrowing on Solana

As I wrote about in my "high yield savings account" article, people are willing to pay a decent interest rate to borrow assets in DeFi. And since people are willing to pay more to borrow, you can earn more by lending out your assets than you would in TradFi.
[Mango Markets](https://trade.mango.markets/account) is one great platform for this, where you can deposit a variety of assets to earn interest on them. Rates vary quite a bit depending on the day, but it's not uncommon to see stablecoins like USDC earning 5-10% APR:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_-JEmQA3WPgqGVAUSkJFlr54jG6eQr8EYtF7ghcVEnF6PWYDK_36rPY_XeZVvtxNnPUg8VxlFn2HPAB-A_Prb1LSc9fkNrLbiht3twDA003AyJj6SSA3OCkv3Yfkbbd9uFGAL9rxr=s0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_-JEmQA3WPgqGVAUSkJFlr54jG6eQr8EYtF7ghcVEnF6PWYDK_36rPY_XeZVvtxNnPUg8VxlFn2HPAB-A_Prb1LSc9fkNrLbiht3twDA003AyJj6SSA3OCkv3Yfkbbd9uFGAL9rxr=s0.png?link=true)

Mango also lets you borrow those same assets against your collateral, so if you wanted to take a leveraged bet on Solana's price going up, you could borrow USDC against your SOL deposits to buy more SOL.
Mango offers pretty good deposit rates, but you can also look at a site like SolFarm if you want to find something with a higher return. [SolFarm](https://solfarm.io/) is a good example of a product you don't see on Ethereum: leveraged yield farming. It can automate borrowing assets against your staked collateral to boost the APR of your yield farming, and since people are willing to pay a lot more for debt that's making them money, you can earn a pretty good APR by lending your assets to the people taking on debt. And since SolFarm automatically liquidates them if they get overleveraged, the assets you're lending to them are protected in a sudden market downturn.
Lending stablecoins on SolFarm tends to give a higher rate than Mango, currently around 10%:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_POYQod3ksMCC-V8EHONsMQKQVXuJSEypOq4VktsgZoNAGP-_lp7SK4l7Iff7OJ8aKAwc66TAsJ6JUACr0wxq-yDGlmKmf2iGqS_zUJO-LMIihpXWWmhkAH-qTmpnjaqTvBy6Bd6c=s0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_POYQod3ksMCC-V8EHONsMQKQVXuJSEypOq4VktsgZoNAGP-_lp7SK4l7Iff7OJ8aKAwc66TAsJ6JUACr0wxq-yDGlmKmf2iGqS_zUJO-LMIihpXWWmhkAH-qTmpnjaqTvBy6Bd6c=s0.png?link=true)

Though, unlike Mango, you can't then borrow against your assets. So you lose that flexibility.

## Yield Farming on Solana

Now for the fun part. If you want to put some of your assets to work in more interesting ways on Solana, there are a lot of opportunities popping up every day with some pretty interesting incentives.
Providing liquidity to different trading pairs is an easy way to earn more crypto, since you're getting a cut of all the trading fees. The DEXes like Raydium give you an estimate of how much different liquidity pools generate in fees, which tells you how much interest you might earn by supplying tokens to those pools:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_-VDKwA0wT8Ic_lkvB8IIvgs1m1qfWV0unlZinynFaVgXqh1tNZ8mgs00ShHTRx925hGz3-ty-3Tb8bBlUKLV5Pwc1yf2UVD5TjjYx8IgCVrJagiU3zbF-u_L5fUydfzlzx0PiWOR=s0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_-VDKwA0wT8Ic_lkvB8IIvgs1m1qfWV0unlZinynFaVgXqh1tNZ8mgs00ShHTRx925hGz3-ty-3Tb8bBlUKLV5Pwc1yf2UVD5TjjYx8IgCVrJagiU3zbF-u_L5fUydfzlzx0PiWOR=s0.png?link=true)

But they're also incentivizing some of the pools, which means you can earn additional RAY tokens for providing liquidity. The "RAY/SOL" pool for example has a base APR of 33.57%, but if you then stake your liquidity position on Raydium, you'll earn RAY tokens as well which brings the APR up to 69.25% (nice):

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_-VDKwA0wT8Ic_lkvB8IIvgs1m1qfWV0unlZinynFaVgXqh1tNZ8mgs00ShHTRx925hGz3-ty-3Tb8bBlUKLV5Pwc1yf2UVD5TjjYx8IgCVrJagiU3zbF-u_L5fUydfzlzx0PiWOR=s0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1864/optimized_-VDKwA0wT8Ic_lkvB8IIvgs1m1qfWV0unlZinynFaVgXqh1tNZ8mgs00ShHTRx925hGz3-ty-3Tb8bBlUKLV5Pwc1yf2UVD5TjjYx8IgCVrJagiU3zbF-u_L5fUydfzlzx0PiWOR=s0.png?link=true)

We're getting into the kinda crazy APR territory on some of these so it's worth reading my "[where does the yield come from](https://every.to/almanack/defi-yields)" article so you know what's going on. All of these APRs are propped up by increasing values of the underlying tokens, so if the Solana DeFi market crashes, these APRs will crash as well.
If the coming months on Solana are anything like the insanity that happened on Ethereum during 2020, it could be a wild few months of insane price swings, ridiculous APRs, and some huge crashes.
If you don't want to be exposed to that volatility, playing it safe with something like[Marinade.Finance](https://marinade.finance/) which lets you stake your SOL tokens and earn ~6% on them is a much calmer option.

## The Future of Solana and Ethereum

Solana has a massive opportunity right now. More and more people are curious about DeFi, and Ethereum is too prohibitively expensive of a starting point.
Tons of DeFi newcomers will start on Solana with their lower fees and faster transactions, and then it will remain to be seen how well Solana can retain that market share.
Once there are easier ways to go directly onto Ethereum Layer 2s and Sidechains, some of Solana's competitive advantage will be gone. But if it can amass enough market share before that happens, it might not matter.
Whatever the future holds, this is the first time a non-EVM blockchain is putting up serious competition to the Ethereum ecosystem. That's exciting for increasing the breadth of options we have available, and also because it might mean much faster development on Ethereum now that they have a competitor to worry about.
But there's no reason it has to be a winner-take-all situation. Microsoft and Apple, Pepsi and Coke, Biggie & Tupac, most big industries are at least duopolies and that competition makes everyone better.
Maybe Ethereum just got its wakeup call.
