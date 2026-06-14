---
title: "Proof of Green: How Ethereum 2.0 Solves Crypto's Energy Concerns - DeFriday #8"
subtitle: "Stake? I thought you said Steak! "
author: "Nat Eliason"
date: 2021-07-08
column: almanack
url: https://every.to/almanack/proof-of-stake-ethereum
paywalled: false
scraped_at: 2026-06-11T16:08:55.854Z
---

# Proof of Green: How Ethereum 2.0 Solves Crypto's Energy Concerns - DeFriday #8

*Stake? I thought you said Steak! *

If you’re exposed to any amount of news about cryptocurrency, you’ve probably heard the environmental concerns.
Headlines and politicians will denounce Bitcoin, saying it’s using more energy than the entire country of Denmark or Sweden just so people can send around made-up Internet money.
The actual extent of the environmental impact of crypto [is debatable](https://nymag.com/intelligencer/2021/05/jack-dorsey-says-bitcoin-is-climate-friendly-is-he-right.html). But regardless, Bitcoin and Ethereum do use a lot of energy! And in the grand scheme of things less energy usage is usually better than more, so if we have the option, it’d be cool to get all the benefits of crypto without using so much energy.
Thankfully, we can.
Bitcoin and Ethereum currently derive their security and functionality from a process called “Proof of Work.” But Ethereum plans to switch to a new system called “Proof of Stake” in the next year which will decrease its energy usage by 99.95%.
Let’s explore why the energy usage in Proof of Work is so high right now, and how the switch to Proof of Stake will get it under control.

## Proof of Work: Why Bitcoin and Ethereum are So Energy Intensive

One of the core innovations of Bitcoin is that it created a way for a huge number of people around the world to transact with each other without needing a trusted third party like a bank, government, or escrow to mediate the transactions.
Previously if you and I wanted to do some sort of trade and we weren’t right in front of each other, we would need some trusted third party to facilitate the transaction. That trusted third party could be Stripe, it could be a mutual friend, it could be Venmo, but we’ve always needed one for transactions with people we don’t have a relationship with. Otherwise, the person you’re transacting with could just take your money and run without sending you what you’re paying for, or commit any number of other nefarious deeds.
The technology underlying Bitcoin, Ethereum, and other cryptocurrencies solve that. It does so using a ledger that records the transactions people make between each other. Where previously this ledger might have been kept by a single person or entity—like Venmo or a bank—in Bitcoin or Ethereum the ledger is called a blockchain and it’s kept and maintained by thousands of computers simultaneously.
If you and I do a transaction in Bitcoin, that transaction gets broadcast to the entire Bitcoin network. Everyone working to secure the Bitcoin network (“miners”) sees the transaction, and it gets combined with all the other recent transactions into one rollup called a “block.”
Once the work on that block is done, it’s added to the chain of all the previous blocks in history, making the blockchain. That’s all a blockchain is. A continuous link of combinations of transactions, verified by all the miners on the network.
But how does that verification work? Well instead of a third party, like a bank, looking at all the transactions and saying “yeah this is legit,” the entire Bitcoin network has to look at the transactions and agree that they’re legitimate, but without explicitly communicating with each other.
That happens through “mining.” Once the latest set of transactions have been compiled into a block, everyone on the network starts racing to solve a challenging math problem: finding the right input number so the cryptographic output of the set of transactions in that block fits some criteria, usually having a certain number of zeroes at the beginning.
That’s the most technical part of this and if you want to dive deeper, [here’s a good explanation](http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html). But suffice it to say everyone is racing to solve a really really hard math problem, and if you solve it first, you get Bitcoin as a reward.
Now here’s the cool part. Once someone solves it, they can broadcast that solution to the network and everyone can instantly verify their solution is correct. The solution they found, called the “nonce,” should create the target cryptographic hash for everyone’s list of transactions. If that doesn’t happen, it means whoever broadcasted the nonce is trying to submit fake data to the network, and everyone else in the network can reject it.
The block only gets added to the blockchain if more than 50% of all the miners agree on the nonce, which means they agree on the transaction data since the nonce will only get the same output for everyone if their transaction data is exactly the same.
Phew, okay, long explanation, but it’s helpful to understand how this system works to understand why it’s so energy-intensive. You need thousands of computers to do work solving hard math problems in order to keep creating new blocks on the blockchain. That requires a lot of energy!
But that’s not all. Bitcoin’s architecture explicitly makes the problems these computers have to solve harder over time in order to make it take around 10 minutes for each block to be mined.
That means the hardware needed to compete for the block rewards keeps increasing in complexity and scale, which means it needs more and more energy. As Bitcoin has gotten more valuable, it’s become more economical to do larger and larger mining operations with more and more computing power, and that’s how we ended up with the huge amounts of energy being used that we have today.
That whole system is the “proof of work” you’ve heard about before. The network security is maintained by people doing “work” in the form of mining. Unless the Bitcoin community comes together and decides to change how the Bitcoin blockchain is verified, probably by forking to a new version of Bitcoin, this energy usage will never change.
And it’s not necessarily a bad thing. Using energy to secure the economy is something we’re all engaging with whether it’s mining Bitcoin or funding the military maintaining the Dollar’s status.
But blockchains don’t have to rely on Proof of Work. There’s an alternative system called Proof of Stake which uses dramatically less energy while (hopefully) providing the same level of security.

## Proof of Stake: Ethereum’s Answer to the Energy Concerns

Regardless of the merits of the energy critiques about Bitcoin, the energy usage is there. And if we had the choice, it would be great if we could get all the benefits of crypto technology without the massive energy expenditure.
Thankfully we can. The solution is called Proof of Stake.
The way Proof of Stake works is rather brilliant when you consider the economic incentives. Rather than solving complicated math problems, anyone who wants to help validate the Ethereum network can “stake” their crypto to become a validator.
As a validator, you can be randomly chosen by the network to help validate any given block in the blockchain. Transactions come into the network, your software compiles them into a block, and once the block is done, you submit it to the network.
Everyone selected as a validator should submit the exact same information. If someone’s data doesn’t line up, that suggests they’re trying to submit fake data and they’ll have some or all of their stake taken from them as a punishment. If you’re staking but not selected as a validator for a given set of transactions, you get assigned to review someone else’s work and attest that it looks right.
To be clear, all of this automatically happens with software. You don’t have to review the chain yourself. And assuming you aren’t trying to manipulate the network, you don’t have to do anything besides keep your computer running and connected to an Internet network.
And in return for staking on Ethereum, validators earn interest on the staked ETH, currently around 6%. This is the main way new ETH will enter the market, and it will get burned by the EIP-1559 update [I wrote about last week](https://every.to/almanack/eip-1559-ethereum-bitcoin). This is another part of the economic incentives too. You need at least 32 ETH to be a validator, and trying to sabotage the network would undermine the value of Ethereum. If you have over $100,000 of ETH at stake, you want that value to keep going up and don’t want to risk losing your stake.
What about security? Well, the only way someone could reliably pull off an attack and submit fake transaction data is if they controlled 51% or more of all staked Ethereum. There are currently just over 6,000,000 Ethereum staked by 180,000 validators, so taking control of that would be quite expensive and almost impossible. Lido is the largest staking platform by far, and they have 678,000 ETH staked, or 9% of the total amount. That’s high, but a far cry from 51%.
So just like Proof of Work, it’s very hard for a bad actor or coordinated group to attack the network. In Proof of Work, you’d need 51% of all the mining operations. In Proof of Stake, you’d need 51% of all staked Ethereum. Both almost impossible tasks.
That effort has taken much longer than expected. It was originally planned for 2019, but as of July 2021, it still hasn’t happened. They’re getting closer and have made a ton of progress, and it seems very likely to happen in early 2022, but it’s a delicate process to change consensus models without breaking anything. There’s also the risk it might not happen successfully:  a transition like this is not something any other blockchain has done before.
There were concerns about whether or not Proof of Stake could work, but it’s being used by a number of massive blockchains now like Polygon and Solana and seems to provide the level of security and low energy needs Ethereum hoped it would when they first proposed it.
Also, it’s not immediately obvious though why Proof of Stake will use less energy than Proof of Work. It’s still a bunch of computers validating the network, right? The difference is the amount of processing power needed for the validation.
Bitcoin continually increases the difficulty of validating the network, which means miners need more and more complex rigs and more and more energy.
Ethereum’s Proof of Stake validation does not rely on complicated hashing algorithm puzzles, so the computational needs are much lower. By the foundation’s estimates running validators on their own hardware, it should [reduce Ethereum’s energy usage by 99.95%](https://blog.ethereum.org/2021/05/18/country-power-no-more/).
No complicated math problems means you don’t need crazy hardware to run a validator. Most people with a good laptop and reliable Internet connection should be able to run one if they want. That means significantly less energy being consumed to maintain the network, and it means many more people helping validate it, improving security.
But that all depends on Ethereum making the switch. If that doesn’t happen, Ethereum will be stuck on Proof of Work or crash and burn in the process.

## The Switch

As I mentioned earlier, the transition from Proof of Work to Proof of Stake is no small feat and it’s something the Ethereum team has been working on since the beginning.
Luckily, most of the pieces are in place at this point. Ethereum 2.0, the upgrade that brings Proof of Stake with it, is currently running alongside Ethereum 1.0 and the Ethereum Foundation is running every test they possibly can to simulate the merge and make sure it goes smoothly. The merge won’t happen until they’re confident it can happen without issues, and it’s unclear how long that will take.
And when it does, there could still be some unforeseen issues. It’s hard to say what would happen in that case, but it wouldn’t be good. The merge never happening, or happening and breaking is often pointed to as the biggest challenge and risk to Ethereum right now.
But it’s getting closer. They’re regularly updating [their merge page](https://ethereum.org/en/eth2/merge/), and once EIP-1559 goes through on August 4th the merge will be their primary focus.
And once that happens, the environmental concerns with Ethereum at least will be gone. Will that drive more people to adopt Ethereum over Bitcoin?
It’s hard to say, but unless the environmental critiques of Bitcoin go away or are addressed it will likely always be a thorn in the Bitcoin community’s side.
We’ll just have to see.
