---
title: "The Merge is Done! Now What?"
subtitle: "Explaining the Surge, Verge, Purge, and Splurge"
author: "Nat Eliason"
date: 2022-09-17
column: almanack
url: https://every.to/almanack/the-merge-is-done-now-what
paywalled: false
scraped_at: 2026-06-11T16:08:32.061Z
---

# The Merge is Done! Now What?

*Explaining the Surge, Verge, Purge, and Splurge*

#### Sponsored By: Vanta

This article is brought to you by [Vanta](https://www.vpdae.com/redirect/y0dfhut38beog1dqjjqva36n5ly), the leading automated compliance platform.

[Learn More](https://www.vpdae.com/redirect/gnkpmtaeb9c2axh4s40n5o7czi5)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#bdcecdd2d3ced2cfced5d4cdcefdd8cbd8cfc493c9d2).

Yesterday was a historic event for crypto, particularly Ethereum. The Merge, the long-awaited switchover from Proof of Work to Proof of Stake, went off without a hitch, and Ethereum is now running on 99.5% less energy and with a 90% lower inflation rate. If you’re curious about why the merge was a big deal, check out [the last newsletter](https://crypto.nateliason.com/p/merge).
The Ethereum community has been looking forward to the Merge since Ethereum’s launch in 2017. So now that it’s completed, it’s not unfair to wonder, “now what?” This was a major milestone in Ethereum’s development. However, it’s not done, and there are still some significant upgrades to come to turn it into the extensive, optimal blockchain the community imagines it can be.
Most of those upgrades relate in some way to my central thesis for why blockchains are useful: building [perpetual, decentralized applications that are widely available and inexpensive to use](https://crypto.nateliason.com/p/use-cases). If The Merge was the first big step in that direction, the next four steps (though these are being pursued in parallel, not in sequence) are called:

1. The Surge

2. The Verge

3. The Purge

4. The Splurge

The Merge was a big deal because it was focused on reducing Ethereum’s energy consumption and changing its consensus mechanism. But most of these next focuses contribute to massively scaling what the blockchain can accomplish now that it’s energy efficient. The Ethereum blockchain can currently process 15-20 transactions per second, and after these upgrades are complete, that number should be around 100,000 per second, including all the transactions on rollups.
So how is Ethereum going to 5000x its capacity? Let’s walk through the four areas of upgrades to find out.
I’ll also note that as a non-super-technical wordcel I’ve done my best to explain these concepts, but I will certainly come short in some regard given their complex nature. I’ve included further reading on each topic at the end of each section if you want to geek out.

####

Ready to simplify the time-consuming process of becoming SOC 2 compliant?

Get a free checklist for SOC 2 compliance from [Vanta](https://www.vpdae.com/redirect/gnkpmtaeb9c2axh4s40n5o7czi5), the leading automated compliance and security platform. Attend a demo, and lunch is on Vanta!

[Get the Checklist](https://www.vpdae.com/redirect/gnkpmtaeb9c2axh4s40n5o7czi5)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#6310130c0d100c11100b0a131023061506111a4d170c).

## The Surge

The first of the upgrade categories also happens to be the most far along. The Surge refers to a surge in Ethereum’s computing capacity using Sharding technology.
Sharding is not a new idea. It’s commonly used to scale databases for resource-intensive webapps, or for the same infrastructure to be used across many different applications more efficiently.
Say you have a database with 1,000,000 rows of information that needs to be processed. There are two ways you could speed the process up. You could increase the computing power available to process those 1,000,000 rows, a process called “scaling up.” Or you could split that database horizontally into five shards, each with 200,000 rows, so you can process the information using five separate machines. That’s called “scaling out.”
The latter strategy of splitting the data into shards so multiple machines can process it at once is often easier technically than continuing to speed up a single machine.
If Ethereum tried to scale up by increasing the processing power of the machines validating the network, then it would become harder and more expensive for members of the community to contribute to the security of the network. It would be a return to the same problem that arises with mining; you’d have to continually upgrade your machine to keep up with the demands of the network if you want to be a staker.
By scaling out through sharding, Ethereum can increase its computing power without increasing the computational demands on stakers. Instead of quadrupling the processing power needed to validate the network, they can start by splitting the network into four shards. Then in the future, they could theoretically increase that shard count to any number, giving dedicated shards to major rollups like Optimism and Arbitrum.
The challenge is how to do this while maintaining Ethereum’s security and composability. The best strategies for achieving that are still being debated, but you’ll likely see pieces of it come together in [future EIPs like 4844](https://eips.ethereum.org/EIPS/eip-4844) that are going to start moving the network in this direction.
**Further Reading on Sharding and The Surge:**

- [EIP-4488 Spec](https://github.com/ethereum/EIPs/pull/4488)

- [Ethereum Organization on Sharding](https://ethereum.org/en/upgrades/sharding/)

- [Post by Vitalik on the Eth Foundation about Sharding](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap)

- [Why Sharding is Great from Vitalik](https://vitalik.ca/general/2021/04/07/sharding.html)

- [What is EIP-4844](https://www.alchemy.com/overviews/danksharding)

- [Understanding Database Sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding)

## The Verge

As the steps in The Surge are completed, the size of the historical record for Ethereum will start to swell at an increasing rate. If the processing power is increased 100x through shards, then the rate at which data is recorded to the blockchain will also increase 100x without additional changes.
To run a validator, you must maintain access to the full Ethereum “state,” the historical record of everything that’s happened on the chain. With a full sharding implementation, that state could start growing at 10s of Terabytes per year, which would soon make it prohibitively expensive to maintain a record of it on every validator. You’d need hundreds of terabytes of storage instead of being able to run your validator on a normal laptop easily.
So the solution is to figure out how to move toward stateless network validation so that the processing power can increase and the size of the historical record can swell without bogging down every validator connected to the network. And by moving towards stateless validation, the hardware requirements to validate the network would drop even further, allowing you to run a validator on a simple [Raspberry Pi device or a mobile phone](https://notes.ethereum.org/Yn_mwNa2SeeQHnKsRgekKg).
The core step for achieving this is to shift from the current Merkle-tree-based validation to a newer concept called “Verkle Trees.” Verkle trees dramatically compress the amount of data required to prove the validity of a block based on historical data, which makes them perfect for scaling up efficient validation as the size of the blockchain grows:
*The key property that Verkle trees provide, however, is that they are much more efficient in proof size. If a tree contains a billion pieces of data, making a proof ****in a traditional binary Merkle tree would require about 1 kilobyte, but in a Verkle tree the proof would be less than 150 bytes**** - a reduction sufficient to make stateless clients finally viable in practice. - *Vitalik Buterin, [Verkle Trees](https://vitalik.ca/general/2021/06/18/verkle.html), emphasis mine
Once the Merkle tree proof system is replaced with Verkle trees, that should be a ~10x improvement in processing power for Ethereum. But that alone doesn’t fully solve the statelessness problem; it only lays the foundation for it. With the Verkle tree system introduced, there can be a new “root” or start for the Verkle trees established, and any state from before that point wouldn’t be necessary to maintain to prove the integrity of the network.
With that done, the network can start to focus on “The Purge.”
**For more reading on Verkle Trees and The Verge:**

- [State Expiry EIP](https://notes.ethereum.org/@vbuterin/state_expiry_eip)

- [Ethereum Statelessness Roadmap](https://notes.ethereum.org/Yn_mwNa2SeeQHnKsRgekKg)

- [Verkle Trie for ETH1 State](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)

- [Verkle Trees](https://vitalik.ca/general/2021/06/18/verkle.html)

- [Why it’s Important to Go Stateless](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)

-
[Verkle Trees MIT Presentation](https://math.mit.edu/research/highschool/primes/materials/2019/conf/12-5-Kuszmaul.pdf) (with helpful pictures!)

- [Verkle Tree Structure](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

- [Verkle Trees Paper](https://math.mit.edu/research/highschool/primes/materials/2018/Kuszmaul.pdf)

## The Purge

Once Ethereum has been upgraded to run stateless or near stateless, they can start purging the old state data and reduce the amount of information people need to store to run validators.
The first version of this is to cut down the length of historical data that needs to be maintained by execution clients to one year instead of needing the full history. That has been outlined in [EIP-4444](https://eips.ethereum.org/EIPS/eip-4444) and seems to be a popular first step that’s likely to be implemented.
From there, the current plan is to replace the single state tree with [separate trees](https://notes.ethereum.org/@vbuterin/state_expiry_eip) that each last for one year. So in the vast majority of cases, you never need to work through data older than a year, but it’s still available when needed.
Then the network can implement further changes to prune the state and remove additional features that currently exist in the EVM but aren’t often used or aren’t used properly, like SELFDESTRUCT. The main goal of this portion of the future roadmap, though will depend on getting Ethereum to operate statelessly so this bloat can be removed, and other opportunities to trim the fat will likely arise once it’s started.
**Further Reading on The Purge**

- [EVM features to remove](https://hackmd.io/@vbuterin/evm_feature_removing)

- [EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)

- [State Expiry Simple Summary](https://notes.ethereum.org/@vbuterin/state_expiry_eip)

## The Splurge

Finally, we have the splurge, which is just a grab bag of everything else the Ethereum community wants to build into the blockchain that doesn’t fit in one of the three other major buckets. Most of these are also very technical focused and will increase the performance of the chain but won’t likely be noticed by the users of the network.
Some of the improvements in this category include:
**Proposer / Builder Separation: **Reduce MEV (Maximum Extractable Value) by separating the proposer and builder roles when constructing blocks. [Learn more here](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).
**Data Availability Sampling: **A method for improving access to data across shards and improving the efficiency of validation proofs. [Learn more here](https://hackmd.io/@vbuterin/das).
**EIP-3074**: An improvement to the EVM that would let externally owned accounts delegate control over the account to a smart contract. [Learn more here](https://eips.ethereum.org/EIPS/eip-3074).
**EIP-4337: **Another popular EIP, this one focused on account abstraction to remove the need for consensus-layer agreement on protocol changes. [Learn more here](https://eips.ethereum.org/EIPS/eip-4337).
There will likely be many more that end up in this category, and they might be completed ad-hoc as we wait on other major changes to the network from the first three categories.
You probably noticed, though, that none of these changes are as exciting as the huge Merge change. The network is maturing, and with the major shift to Proof of Stake done, Ethereum can now focus on making incremental improvements to its processing power, enabling all of the user experience and application layer innovation to start happening on the Layer 2s that rely on it.
If you’re looking for exciting new projects that are launching, they likely will be on Layer 2s moving forward. Ethereum is getting closer to fulfilling its goal of being the ideal settlement layer for those execution blockchains. As the current Optimistic Rollups and ZK-Rollups improve, we should see significantly more new and interesting tools and apps to try launching there.
The Merge went off without a hitch. Hopefully, the rest of these improvements go just as smoothly.
