---
title: "EIP-1559: Can Ethereum Replace Bitcoin as Digital Gold? - DeFriday #7"
subtitle: "Is 1559 all hype? Or will it send Ethereum to the moon?"
author: "Nat Eliason"
date: 2021-07-01
column: almanack
url: https://every.to/almanack/eip-1559-ethereum-bitcoin
paywalled: false
scraped_at: 2026-06-11T16:08:56.315Z
---

# EIP-1559: Can Ethereum Replace Bitcoin as Digital Gold? - DeFriday #7

*Is 1559 all hype? Or will it send Ethereum to the moon?*

You may have heard the expression:
"Bitcoin is like gold, Ethereum is like oil."
It captures the essence of what the two big cryptocurrencies do. Bitcoin is a store of value you can hold onto, and Ethereum is a tool for doing things like Decentralized Finance and trading NFTs.
One of the main reasons Bitcoin earns its comparisons to gold is its deflationary nature. There will only ever be 21 million bitcoins in existence. So if demand for bitcoin continues to grow, the price of bitcoin will have to go up.
Ethereum is a little different. We don't know how many Ethereum will exist. In fact, we don’t even know how many exist now. We have some[rough ideas](https://ycharts.com/indicators/ethereum_supply) based on circulating supply, but it doesn't have a hard cap the way Bitcoin does.
Because of that unbounded growth and unknown supply, there isn't the same price pressure on Ethereum as Bitcoin. And as Ethereum critics are right to point out, Ethereum could be subject to many of the same inflationary and price-controlling concerns with fiat money that motivated cryptocurrency in the first place.
But all of that might be about to change. Ethereum Improvement Proposal (EIP) 1559 is set to go into effect sometime in July, and it could give Ethereum the edge it needs to overtake Bitcoin as a deflationary store of value.
Let's explore what this upgrade to the Ethereum network contains, and whether or not the hype around it is justified.
*Quick sidenote: I've just started a "*[DeFi Orientation](https://learn.nateliason.com/p/defi-orientation)*" program for anyone who wants a little push to start exploring DeFi. Check it out! *

## What is EIP 1559

Since Ethereum is a decentralized product without a central controller, the community needs to agree and vote on any changes to the network. The Ethereum Foundation leads much of the work on Ethereum, but they cannot change Ethereum at will.
1559 is one of many[Ethereum Improvement Proposals](https://ethereum.org/en/eips/). These proposals are how the Ethereum network gets upgraded. A proposal can be drafted by anyone and then submitted to the community for review and comments. If the community likes the proposal and decides to move ahead with it, Ethereum core developers will start working on the implementation to be included in a future upgrade to the network.
1559 was[proposed in April 2019](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) by a team of the Ethereum community's more senior leaders, including Ethereum's creator Vitalik Buterin.
Their goal was to make the cost of using the Etheruem network more predictable, while also improving the incentive structure for miners securing the network.
1559 does this primarily through two big adjustments:

- Changing how transaction fees on the network are calculated.

- Changing how miners are rewarded for securing the network.

You’ll notice I didn’t mention making Ethereum deflationary. That’s a potential side effect of 1559, but not the core goal. More on that soon.

## How 1559 Changes Ethereum Transaction Fees

To do anything on Ethereum, you have to pay a transaction fee, usually referred to as gas. Since maintaining the network is resource intensive, there needs to be some financial barriers to using it so it doesn’t get clogged up with tons of junk transactions. The fee you pay is based on an auction system, where the higher price you offer to pay for your transaction, the faster your transaction will go through.
As the authors of 1559 point out though, the wild fluctuations in gas prices do not reflect the value of the economic activity they're paying for. From the proposal:
*"bids to include transactions on mature public blockchains, that have enough usage so that blocks are full, tend to be extremely volatile. It's absurd to suggest that the cost incurred by the network from accepting one more transaction into a block actually is 10x more when the cost per gas is 10 nanoeth compared to when the cost per gas is 1 nanoeth; in both cases, it's a difference between 8 million gas and 8.02 million gas."*
Essentially what they're saying is that in high-demand periods where you might have to pay 10x as much in transaction fees as normal, the Ethereum network isn't doing 10x as much work.
The auction system also often results in people significantly overpaying, since even if you could have bid a lower amount to have your transaction go through, you'll pay whatever amount you bid:
*"The current approach, where transaction senders publish a transaction with a bid a maximum fee, miners choose the highest-paying transactions, and everyone pays what they bid. This is well-known in mechanism design literature to be highly inefficient, and so complex fee estimation algorithms are required. But even these algorithms often end up not working very well, leading to frequent fee overpayment."*
1559 aims to solve these problems by changing how fees are calculated for Ethereum transactions to make them less volatile and to help transactions go through quicker.
Here's how it works.
Instead of Ethereum users submitting a bid with each transaction for how much they're willing to pay, the Ethereum network will set a base fee for each[block](https://ethereum.org/en/developers/docs/blocks/) that says how much it will cost to have your transaction included.
That makes it extremely easy for wallets to automatically calculate how much to spend on gas for a transaction.
Instead of prices adjusting based on the auction system, they'll automatically adjust based on network demand. If there is a ton of demand on the network and blocks start to be filled with transactions above their target capacity, the base fee for the next block goes up. If demand decreases and blocks are below 50% of their target capacity, the base fee for the next block goes down. The price can only move in fixed steps of 12.5%, so the increases and decreases are much easier to predict and adjust for.
By making these changes to the fee structure, Ethereum transaction prices should be more predictable and more economically efficient. It should be much easier to predict when your transaction will go through based on the price you set, and you shouldn't have to wait as long for transactions to clear in periods of high congestion.
Contrary to what many people think though,** it does not necessarily reduce transaction costs**. Transaction fees will adjust in a more predictable manner, but they won't necessarily be lower. We're unlikely to see significant improvements in fees until [Layer 2 solutions](https://every.to/almanack/defriday-3-how-arbitrum-solves-ethereum-s-scaling-challenges) are available, or [sharding is implemented](https://ethereum.org/en/eth2/shard-chains/). The switch to Proof of Stake is exciting as well, but like 1559, it won’t necessarily reduce transaction fees.

## How 1559 Changes Miners Fees (and Ethereum Supply)

Currently, when you make a transaction on Ethereum, the transaction fee you pay goes to the miners securing the Ethereum network. They also earn Ethereum in the form of block rewards, which is the new Ethereum created with each block.
Under 1559, the base fee you pay for your transaction would be burned instead of paid to miners. If you want to offer above the base fee in the form of a tip, that amount would go to the miners, but most users will not need to tip except in periods of very high congestion.
Block rewards would still exist, but now there would be two competing forces on Ethereum's supply. Each block will[print 2 ETH](https://media.consensys.net/the-thirdening-what-you-need-to-know-df96599ad857) in the form of block rewards. But it will also burn an unknown amount of ETH, depending on how much activity there is on the network.
This means there's a potential for Ethereum to become deflationary, even more deflationary than Bitcoin. Bitcoin has a fixed supply cap of 21,000,000 bitcoins, with the final bitcoins being released around 2140. Each Bitcoin block currently pays out 6.25 bitcoin to miners, and that amount gets cut in half every four years. So the supply being issued is decreasing, but there is still more supply being issued.
With 1559, it's possible that Ethereum will start burning more ETH than is being produced, which would decrease the Ethereum supply over time. Some estimates suggest the annual supply decrease will[be around 1.4%](https://docs.google.com/spreadsheets/d/1XmeYkWEmaaZEUZ078A-lolchzNUrnlUllLkVXSGPzAU/edit#gid=0), though it remains to be seen how network demand actually affects things after the release.
This potential for Ethereum to become deflationary is why there's so much hype around 1559. The belief is that if 1559 goes fine and Ethereum becomes deflationary, there will be much more pressure on the price and it should appreciate in value.
But it remains to be seen how much of an effect 1559 has on Ethereum's price. Bitcoin halvings do drive up the price of bitcoin, but it can take months for the market to respond to those supply changes. If Ethereum does surge in price following 1559, it might not be for 6-12 months.

## Risks of 1559

1559 has been in development for two years and has had a lot of time to work through various concerns, but a few still remain:

### 1559 Will Discourage Mining, Which Will Make the Network Less Secure

1559 is estimated to reduce the income Ethereum miners earn by anywhere from 15 to 30%. That could motivate some miners on the network to move to other blockchains, or stop mining entirely, both of which would reduce the number of people helping secure the Ethereum network.
It's a legitimate concern, but miners are already in the process of adjusting their plans for continuing to make money on Ethereum with the upcoming[Proof of Stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) merge, which will get rid of mining entirely. At that point, the block rewards and tips system introduced by 1559 will go to Stakers instead of Miners.

### 1559 Could Break Ethereum

1559 is a big change to how Ethereum operates, so naturally, there are concerns around what might happen to the network that we can't predict.
Thankfully, Ethereum has multiple test networks: Rinkby, Goerli, Ropsten, and Kovan, and 1559 is rolling out there first so people can test it out.
It's been deployed on Ropsten for a couple of weeks now, and in that time it's already burned over $184,000,000 worth of ETH. You can watch the Ethereum burning happen in real-time at[watchtheburn.com](http://watchtheburn.com/) if you're curious.

### 1559 Will Never Ship

This was more of a concern and argument against 1559 last year, but now that it's deployed on testnets and seems to be working, it's become less prominent of an argument.
That said, it is possible we'll find some breaking issues with 1559 as it's tested, and decide to scrap it before it ever gets to mainnet. It seems very unlikely at this point, but you never know.

## When Will 1559 Launch?

It's been a two-year wait, but we're finally getting very close to seeing 1559 go live.
It's currently deployed on the Ropsten and Goerli test networks and should be deployed to the Rinkeby testnet on July 7th.
If all goes well on all three networks, there should be an Ethereum mainnet deployment later in July. That date hasn't been set yet, so we'll have to wait for the official announcement.
In the meantime, if you want to help make sure 1559 doesn't cause any issues, play around on[one of the test networks](https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d)! This is the best way to help stress test the system and make sure nothing goes wrong. Plus, it lets you get some exposure to Ethereum applications for free since the ETH on test networks doesn't cost anything.
But aside from that, all there is to do now is sit back and wait. Maybe 1559 will change Ethereum forever and it will become a deflationary store of value competing with Bitcoin. Only time will tell.
