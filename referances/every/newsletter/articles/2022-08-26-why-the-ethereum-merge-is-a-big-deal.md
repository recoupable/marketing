---
title: "Why the Ethereum Merge is a Big Deal"
subtitle: "Reasons to be hyped, and reasons to be concerned"
author: "Nat Eliason"
date: 2022-08-26
column: almanack
url: https://every.to/almanack/why-the-ethereum-merge-is-a-big-deal
paywalled: false
scraped_at: 2026-06-11T16:08:33.267Z
---

# Why the Ethereum Merge is a Big Deal

*Reasons to be hyped, and reasons to be concerned*

#### Sponsored By: Vanta

This article is brought to you by [Vanta](https://vpdae.com/redirect/wmdvqof7tubhlkrua982dblktf), the leading automated compliance and security platform.

With[Vanta](https://vpdae.com/redirect/wmdvqof7tubhlkrua982dblktf) you can be ready for a security audit in weeks not months, saving you 70% of the time it usually takes. Attend a demo and lunch is on Vanta!

[Lunch on Vanta](https://vpdae.com/redirect/wmdvqof7tubhlkrua982dblktf)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#1c6f6c73726f736e6f74756c6f5c796a796e65326873).

If you’re remotely exposed to crypto, then you might have some idea of some big event coming up called The Merge.
It is arguably the most significant event to happen in the crypto ecosystem in the last few years, maybe since the launch of Ethereum.
Much of the hype is around what it might do to Ethereum’s price. And, yes, it might push it up over time. I’ll explain why later. But The Merge is more exciting from a technological standpoint, and less has been said about that to the non-crypto-native folks.
If you’re already jazzed about the merge and need a good way to explain your enthusiasm to your friends, this is that post. If you’ve heard of the merge and aren’t sure why you should care beyond some potential Number Go Up effects, this is that post. If you’re already kinda excited about the merge and want to know more about why you should be excited, this is also that post.
Let’s start with what the merge actually is.

## What Is the Merge

When Ethereum was launched in 2015, the goal was for the network to be secured by a novel Proof of Stake consensus protocol, replacing the then-standard Proof of Work style security used by Bitcoin and its derivatives. But because Proof of Stake was a new concept, Ethereum opted to launch with Proof of Work and transition to Proof of Stake later, once they were confident they’d ironed out the kinks.
To ensure the Proof of Stake chain would operate smoothly before launching it to the public, they launched it as a separate [Beacon chain](https://ethereum.org/en/upgrades/beacon-chain/). “The Merge” is when the Beacon chain merges with the current Proof of Work chain, completing the shift to Proof of Stake. The plan is to do this instantaneously with no network downtime, which has already been done successfully on all of the Ethereum testnets.
Changing the consensus protocol in the middle of the day without interrupting any transactions is why it’s sometimes described as “changing the engines of a plane in mid-flight.” Nothing quite like it has ever been done before in crypto. It’s a significant technological challenge, with some risks I’ll discuss more later.

####

[Vanta](https://vpdae.com/redirect/wmdvqof7tubhlkrua982dblktf) helps companies scale security practices and automate compliance for the most sought-after standards: SOC 2, ISO 27001, HIPAA, CCPA, and more!

With[Vanta](https://vpdae.com/redirect/wmdvqof7tubhlkrua982dblktf) you can be ready for a security audit in weeks not months, saving you 70% of the time it usually takes. Attend a demo and lunch is on Vanta!

[Lunch on Vanta](https://vpdae.com/redirect/wmdvqof7tubhlkrua982dblktf)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#93e0e3fcfde0fce1e0fbfae3e0d3f6e5f6e1eabde7fc).

## Why Switch to Proof of Stake

The Ethereum Proof of Work chain is working fine right now, so why bother doing this at all?
Proof of Work is trusted and reliable, but it has its downsides. One is energy consumption. It secures the network by having the validators, also called “miners,” race to solve cryptographic equations to verify the next batch of transactions. If you win the race, you get paid a little bit of Ether or Bitcoin or whatever token the network uses.
If you don’t have state-of-the-art hardware, you won’t win the computational race, and you’ll drive up your electric bill for nothing. Since hardware is so essential, you end up with some mining operations looking like this:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2282/optimized_fd39234a-c596-435e-90bd-4970f2c743c7_720x406.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2282/optimized_fd39234a-c596-435e-90bd-4970f2c743c7_720x406.png)

Those operations consume an exorbitant amount of power. Granted, it’s much less power than is consumed to defend the US dollar or Gold as world currencies and monies, but it’s still a lot of power.
Basically, if you want to help secure a Proof of Work network, you must invest a lot of money into hardware and electricity. Anyone who can’t afford the hardware or who lives somewhere where energy is expensive is cut out. And I think we can reasonably agree that if we could have equally good security while using 1/1000th as much power, that would be a good thing.
That is a big part of what The Merge is doing. When Ethereum switches from Proof of Work to Proof of Stake, energy usage will drop by an estimated 99.98%. There won’t be any need for massive mining operations, anyone with a decently powerful laptop could run a staking validator if they wanted to, and they aren’t racing to solve computationally intensive problems anymore so there’s no unusual amount of energy consumption. A computer running a validating node wouldn’t use much more energy than it would from normal use.
**That’s reason number one: **significantly less energy usage.
If you don’t need crazy hardware or energy, what do you need? The main barrier to setting up a validating node on the Proof of Stake network is owning enough Ether. You need 32 ETH as the minimum staking amount on your own node.
That is a lot of money, just over $50,000 at the time of writing. But by staking that amount, you’re saying you’ll be an honest processor of network transactions. Proof of stake operates by trusting the different members of the community running validator nodes to be honest and record transactions accurately, and if you try to lie and process false transactions, your staked amount can be slashed or taken away entirely. So while it is expensive to have to stake that much Ether, it’s also how the network ensures no one is submitting false transactions.
The other big difference between having to stake 32 ETH, and having to buy tons of hardware and use a lot of electricity, is that you’re not losing the ETH when you stake it. You can always stop staking and withdraw it, albeit with a short delay, so you’re not really losing money the same way you are if you have to spend a ton on a mining setup. There are ways to do it with less, like setting up a [Rocketpool Node](https://rocketpool.net/) for 16 ETH.
All you need to become a network validator is 16 to 32 ETH, and some reasonable computer hardware. So the Proof of Stake network is more accessible for anyone who wants to help validate it, which should increase the number of network participants helping ensure its security and decentralization. Currently, there are 240,000 validators set up on the Beacon Network, and presumably, many more will join once the merge is complete.
**That’s reason number two: **easier validator requirements should increase network participation, which helps increase security and decentralization.
Since you don’t have a monthly hardware and electricity bill to stay on top of, the Proof of Stake network doesn’t need to pay nearly as much to the validators securing it.
Currently, the Ethereum Proof of Work network pays miners approximately 13,500 ETH daily. After the merge, that will drop by around 90%, significantly reducing the inflation rate of Ethereum. And since some ETH is burned with each transaction since the implementation of the [EIP-1559 upgrade](https://crypto.nateliason.com/p/eip-1559-ethereum-bitcoin), there could be more ETH burned than is issued on particularly active days. Estimates suggest that if the gas fee on the network is at least 15 to 30 gwei, Ethereum is burning more ETH than it’s issuing.
This is the other reason the merge is so exciting for Ethereum from a financial perspective. The inflation rate on the token supply is going to change from roughly 4.3% per year to somewhere between 0.4% and -2% depending on network activity. During periods of high transaction volume like last year, Ethereum can easily be burning one to two percent of its supply each year, creating deflationary pressure on the token price.
Right now, 13,500 ETH are being given out to miners to help them pay for hardware and electricity, so most of it is probably being sold. Post merge, only 10% of that will be given out daily, and there aren’t the same daily expenses to stay on top of when you’re running a staking node, so you don’t have the same pressure to sell it. It’s hard to imagine such a dramatic supply shift not impacting the price.
**That’s reason number three:** a 90% reduction in ETH given out per day.
So let’s put it all together:
In sum, The Merge will reduce Ethereum’s energy usage by 99.98%, increase security and decentralization through greater validator diversity, and reduce the inflation rate by 90% or more, possibly making it deflationary. On top of those quantitative benefits, it will also be a massive technological achievement for a decentralized network. That’s why The Merge is exciting.
If you’ve read my post on [Crypto Use Cases](https://crypto.nateliason.com/p/use-cases), this transition makes Ethereum a significantly stronger home for the future development of Perpetual Decentralized Applications.

## What’s Not Happening

I should also highlight a few things that don’t come with Proof of Stake.
**First, gas fees for transactions will not get cheaper**. They likely won’t change at all. They’ll increase during periods of high activity and drop during periods of low activity, and nothing about the switch from PoW to PoS will affect that.
Ethereum’s goal is not to be a low-cost, high-speed chain. Its goal is to support very high-value transactions and to be the security and settlement layer for various Layer 2 chains like Arbitrum and Optimism. Gas fees are already 90% lower on those chains, and they’ll drop another 99% or more in the next few years as additional speed, and bundling improvements are rolled out on that layer.
**Second, transactions will not go through faster.** This is also in line with Ethereum’s goals to be a security and settlement layer instead of a high-speed transaction chain. The switch to Proof of Stake won’t impact how fast transactions go through, it’s just a common misconception since the other chains that have launched with a Proof of Stake consensus protocol tend to adopt the high-speed, low-cost approach.
**Third, Ethereum will not necessarily be deflationary. **There’s also a misconception that the merge *guarantees* the ETH supply will start decreasing. That’s not true. It all depends on how high the gas fees are, and if there isn’t much network activity, there won’t be any deflation. It is possible, for example, that the bulk of network activity moves on to L2s and ETH gas fees remain low for years until the gas spent by the L2s starts to drive up the fees on the main chain. For the past week, for example, gas has rarely broken above 15 gwei, so Ethereum would likely not be deflationary.
**Fourth, ETH does not become a governance token.** Finally, there’s an odd myth that with Proof of Stake, the amount of ETH you have means you can vote on the direction of the network and what changes happen to it in the future as you might be able to do with the governance tokens of an on-chain application. This isn’t true. Chain upgrades will still be decided by consensus of validators and the implementation of Ethereum Improvement Proposals.
Now let’s also go over some of the concerns since The Merge isn’t without risk.

## Concerns about The Merge and Proof of Stake

### Centralized Power & 51% Attacks

The biggest concern to start with is how **staking could centralize power**. With staking as a service from companies like Lido and Coinbase, a huge amount of ETH is getting locked up by fewer and fewer validators. There are 240,000 validators on the Beacon Chain, but the vast majority of staked ETH is with only a handful of stakers. Lido alone has something like 30% of the staked supply.
Is this a problem? It could be. [51% attacks](https://www.investopedia.com/terms/1/51-attack.asp) still exist on Proof of Stake chains, so if someone managed to accumulate 51% of all the staked ETH, or if a few stakers colluded, they could conduct a hostile takeover of the rest of the chain.
There isn’t a clear way to prevent this right now besides individuals choosing to diversify who they stake their ETH with or opting to run a validator node of their own. Lido was the only liquid staking option for a long time, but now with other options becoming available like Rocket Pool and Coinbase’s coming cbETH liquid staking token, there should be enough options to decrease Lido’s control of the market.
This, to me, is probably the biggest concern and is one that the Ethereum community will need to figure out some solution for sooner rather than later. Lido hasn’t done anything to suggest it would be a malicious actor, but there’s no reason to let so much power accumulate to so few network operators.

### Potentially Less Censorship Resistance

One concern that’s come up especially strongly in the last few weeks is the potential that with fewer, large centralized staking providers like Coinbase and Lido, they could be forced by a government only to validate a censored version of the Ethereum blockchain, such as one that blocks certain applications or addresses from using the network.
This could certainly happen, and it might not even be that surprising if it did. But there is already a reasonable way for the community to combat this, through what’s called a “[User Activated Soft Fork](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7).”
In short, if Coinbase decided to start censoring transactions, the Ethereum community could respond by switching to a slightly modified version of the blockchain where Coinbase loses some or all of the ETH they have staked. Naturally, that would destroy Coinbase’s business and be a rather large mess for everyone involved, so with the threat of that kind of reaction looming, most of these companies would likely opt to stop offering their staking services instead of complying with sanction requirements, since without the staking services, they wouldn’t be validators who need to comply with anything.

### Staking Chain Reliability

This is a somewhat odd one, but it’s worth mentioning: the only two massively popular blockchains that have never had downtime are Bitcoin and Ethereum. Almost all other popular blockchains use a Proof of Stake style consensus mechanism, and almost all of them have had periods of downtime in the last couple of years.
Does that mean that Proof of Stake is less reliable than Proof of Work? Not necessarily, and the Beacon Chain has never had any downtime since its launch in 2020, but some people have raised this question about the network’s reliability post-transition.
Ultimately there’s nothing to indicate that there might be less network reliability post-merge though, so I’m not sure how seriously to take this concern. It might just be FUD.

### Rich Get Richer Effects

Under Proof of Stake, you earn passive yield by staking your ETH. The more ETH you have to stake, the more ETH you’ll get paid in return (though with the same APR for everyone). So the richer you are now, the richer you’ll be in the future.
This argument honestly seems a little silly, though, since under Proof of Work, the more money you have to invest in mining equipment, the more money you can make there as well. I’m not sure why this is any different.

### There are No Decentralized Proof of Stake Networks

Ethereum will be the first fully decentralized proof of stake network, which does make the shift a little scary but also exciting.
If they pull it off successfully, it will be a massive achievement for a decentralized autonomous team of contributors. Arguably more momentous than the original Bitcoin launch due to the added complexity of a Proof of Stake system like this.
But it’s also never been done before! So pulling it off without a hitch is far from a sure thing. It wouldn’t be terribly surprising if something went wrong, but they’ve been test-running it so much for the last year and a half that it seems like they’ve done a good job covering all their bases.
Ultimately there’s no way to know for sure, though. But The Merge should be happening around September 15th, and it will be an exciting day when it does.
