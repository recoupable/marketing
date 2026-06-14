---
title: "Why Bitcoin Lightning is So Exciting"
subtitle: "Instant Free Payments for Everyone"
author: "Nat Eliason"
date: 2022-09-25
column: almanack
url: https://every.to/almanack/why-bitcoin-lightning-is-so-exciting
paywalled: false
scraped_at: 2026-06-11T16:08:31.904Z
---

# Why Bitcoin Lightning is So Exciting

*Instant Free Payments for Everyone*

#### Sponsored By: Laika

This essay is brought to you by [Laika](https://www.vpdae.com/redirect/2vbgr1ni2sigxjpqssnmomwm382), the complete compliance platform for simpler, faster, and cost-effective SOC 2.

[Get the SOC 2 Guide](https://www.vpdae.com/redirect/2vbgr1ni2sigxjpqssnmomwm382)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#ea999a85849985989982839a99aa8f9c8f9893c49e85).

The original promise of Bitcoin was a “[Peer-to-Peer](https://bitcoin.org/bitcoin.pdf) Electronic Cash System.”
It was meant to enable sending online payments directly from one party to another without having to route through a trusted third party.
In the physical world, we can pay each other without needing to trust some third party using cash. When we use Venmo, Paypal, or any other non-crypto online service, we trust that service to protect our money and reimburse us for it later.
We haven’t been able to make peer-to-peer payments online since there’s no digital analog for giving someone cash. You could promise to mail them the cash, but it would be hard to build a business on that trust and delayed payment time. So instead, we use services like Stripe and VISA to handle the payments for us and pay them around 3% of every transaction for the service.
In its infancy, Bitcoin functioned well as a form of digital cash. Payments were cheap, and settlement happened in around 10 minutes instead of the two days it takes a credit card transaction to settle.
But as the network gained popularity, those transaction fees increased, and now it’s far too expensive to use the Bitcoin network for anything besides large transactions. Sending a BTC payment to someone today would cost $65, so unless you’re buying something in the thousands of dollars, the payment processing fees from VISA or Stripe, or other third-party services are much more reasonable.
That doesn’t mean the promise of a Peer-to-Peer Electronic Cash system is dead, though. The network just needs to adapt. The main Bitcoin network may have failed to provide a low-cost payment infrastructure for small transactions. Still, it created the most robust, stable security system for a decentralized payments infrastructure.
And now that the security and stability of Bitcoin’s base layer are well established, other layers can be built on top of it, similar to the [Layer 2 networks](https://crypto.nateliason.com/p/layer-2) being built on top of Ethereum.
The most promising and exciting of those on Bitcoin right now is [Lightning](https://lightning.network/): “a decentralized system for instant, high-volume micropayments,” which settles back to the Bitcoin network. Using Lightning, it’s possible to send fractions of a cent near instantaneously with negligible fees, providing the first glimpse of a true peer-to-peer electronic cash system.
In this article, I’ll explain what it is and how it works, then cover some of the exciting applications using it today and what it might enable in the future.

####

Your business needs SOC 2. But building compliance from scratch is complicated, time-consuming, and the cost can be crippling. [Laika](https://www.vpdae.com/redirect/2vbgr1ni2sigxjpqssnmomwm382) has you covered. Uncomplicate SOC 2 with our guide for growth-minded founders.[In this guide by Laika](https://www.vpdae.com/redirect/2vbgr1ni2sigxjpqssnmomwm382) you’ll learn:

- What SOC 2 compliance is and why it matters for your startup

- How to close more deals faster by becoming SOC 2 compliant

- How to prepare for SOC 2 compliance

- What to expect in terms of time and cost

- What to do after the report is in

What makes Laika the[authority on SOC 2](https://www.vpdae.com/redirect/2vbgr1ni2sigxjpqssnmomwm382)? They’re the only compliance automation solution that was built by compliance experts. Learn how to turn compliance from a pain point into a secret edge over your competitors.

[Get the SOC 2 Guide](https://www.vpdae.com/redirect/2vbgr1ni2sigxjpqssnmomwm382)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#2655564948554954554e4f565566435043545f085249).

## What is Lightning?

Instead of recording every single transaction on the main Bitcoin blockchain, Lightning allows two parties to set up a payments channel between them where they can record the payments back and forth and then settle the net of those transactions later.
So if you wanted to pay me $0.10 per day for access to this blog, that would be cost prohibitive on the Bitcoin network. But on Lightning, we could open up that payment channel and have it send the $0.10 per day every day until you end your subscription, at which point the payments between us could be settled onto the main Bitcoin network.
It gets better, though. While you need a payment channel link between anyone you want to exchange funds with, it does not need to be a direct link. If A and B have a payments channel, and B and C have a payments channel, then A and C can pay each other by routing through B. They don’t need to set up a separate channel between the two of them.
Each of those payments on the Lightning network costs so little as to be hardly noticeable, and you can transfer as little as 0.00000001 bitcoin (currently about $0.0002). The network can also process millions of transactions per second, which is far and above VISA’s capacity for approximately 25,000 TPS. [Solana](https://crypto.nateliason.com/p/solana-defi), another competitor in the fast & cheap payments space, can only do 60,000 TPS. So Lightning has a significant advantage here.
You might be tempted to say: “so what?” What’s exciting about fast, free payments that can scale down to fractions of a cent? Is it just for micropayments? International remittances? But I think the answer is that it could not only replace all of our existing payment infrastructures, but it could make it radically more efficient.
On the one hand, it does open up international payments in a way that doesn’t exist easily today. You can buy things with credit cards overseas, but even with a well-established service like Wise, you’re still going to pay hefty fees for paying individuals. So it can further improve how well we pay and work with people in various countries.
Then there are the types of payments it enables. Very small payments do not make sense with our current credit and debit card systems, and especially not with ACH, so there’s no opportunity for micropayments or small streaming payments. It’s unclear whether this will ever be a popular form of payment, but we don’t know yet because we haven’t been able to test it out. If we can send people half a dollar for free for reading an article, will we do it? Maybe.
But the biggest benefit is in removing the payments processing tax and lag that exists in the system today. You currently lose around 3% of every payment you process using the credit and debit card system and have to wait a day or two for it to settle. If it can settle instantly with zero fees, that’s a massive step up in payment efficiency for digital businesses. Considering many businesses operate with only 10-15% profit margins, this could be a 20-30% increase in their profitability.
The potential gets a little more obvious when you look at how the technology is already being used. Several teams have started building products on Lightning, so let’s explore those next.

## What’s Being Built on Lightning

By providing the infrastructure for free instantaneous peer-to-peer payments, quite a few applications have appeared around Lightning to leverage that technology in various ways.
It’s a great example of how a core, deceptively simple innovation can spawn an incredible number of new applications. If a smart contract platform enables “[perpetual decentralized applications](https://crypto.nateliason.com/p/use-cases),” then maybe the core of Lightning is “instant free payments.”
So what are teams doing with that, and how can you play around with it?

### Lightning Wallets

The first and simplest way to experience Lightning is to install a Lightning wallet and make a payment to someone else or send someone else an invoice for payment.
I use the [BlueWallet](https://bluewallet.io/) app on my phone (though there are quite a few you could play around with), and for anyone who has experience using crypto but hasn’t tried Lightning, I highly recommend giving this a go. Download the wallet app, set up a Lightning wallet, and send someone an invoice for payment, Ideally someone near you in person. Seeing how quickly it settles feels magical compared to anything on the main Bitcoin network or smart contract networks like Ethereum. It is *insanely* fast. It doesn’t even feel like crypto.
Okay, that’s pretty basic, though, so what else.

### Crypto Venmo

This is the natural next step because, as I explained above, you don’t necessarily want to open a direct payment channel with everyone. It’s more efficient to link them together so you can more easily pay and receive payment from anyone you want to transact with.
[Strike](https://invite.strike.me/AI9M7L) is a Lightning-native Cash App or Venmo competitor that lets you pay people directly in crypto using the lightning network and even receive your paychecks into their app to be partially converted into Bitcoin. They’ve also integrated with services like Twitter to allow Lightning network tipping and with Shopify to allow merchants to accept Bitcoin payments while receiving dollars. There was no way to do these kinds of smaller transactions using Bitcoin before, so it’s a great use case for how Lightning is improving the number of places the network can be used.

### Crypto Social Media & Messaging

[Sphinx](https://sphinx.chat/) has taken a really interesting approach to a crypto-native chat and monetization platform.
First, it’s entirely Lightning native, including all the messaging, which is peer-to-peer encrypted so no one can access your messages. But then, on top of that, there’s a tiny transaction fee associated with each message to discourage spamming or botting from happening on the network. For normal human users, those costs get refunded.
Finally, you can gate any content you want to share with an audience or with a customer and take payment in Bitcoin over the lightning network, so if you wanted to build a Patreon-type following, you’d be able to do it there as well.

### Micropayments Apps

Since Lightning allows you to charge very small amounts of money for single transactions, instead of needing to get someone on a subscription or recurring monthly bill to add it all up, it does enable some new types of applications to exist.
One that is particularly fun is a [DALLE-2 Lightning Bot](https://t.me/dalle2lightningbot). You send it a DALLE-2 image generation prompt, it sends you a Lightning invoice for about $0.20, and then once you pay the invoice, you get your image.
It all happens automatically over Telegram too, and if you’re using a wallet like BlueWallet, it can automatically scan a QR code in your Clipboard so paying the invoices is extremely quick. It’s a neat way to access AI-generated art if you aren’t using DALLE-2 or Midjourney yet.

### More Advanced Financial Services

Lightning can’t support full DeFi applications, but it can provide the financial rails for anyone worldwide to quickly and cheaply access centralized financial services. That allows for somewhat hybrid approaches to exist of semi-custodial services that you can access and exit via Lightning and require some trust but which don’t require you to go through the normal lengthy documentation process you would with a TradFi institution.
One of those services is [Kollider](https://kollider.xyz/), which lets you trade derivates on up to 20x margin using your Lightning wallet to fund and exit the positions. What’s particularly cool about their offering is you don’t need to prefund a trading account at all. You create whatever position you want to open, pay the invoice from your wallet, and the position is opened. Whenever you close it, the funds get sent back to your wallet. So they only need to custody your funds when you have a position open. You don’t need to deposit anything with them in the interim.
Currently, you can only trade BTC and ETH, but they’re planning on adding significantly more derivatives in the future.
If you want to find more applications to check out, the [Stacker News Top Posts](https://stacker.news/top/posts/forever)history is a great place to get started. There’s also a great [roundup from DarthCoin](https://darthcoin.substack.com/p/lightning-network-is-awesome), and they also have a good [Getting Started Guide](https://darthcoin.substack.com/p/getting-started-ln).

## Instant Free Payments

Lighting is still in its infancy, but the number of applications that have already popped up to take advantage of what you can do with fast, free payments is quite exciting.
It’s one of those efficiency improvements that seem small on the surface but could enable an entirely new world of digital commerce that we haven’t seen before, so I’ll be curious to see how it develops.
As it stands, Lightning is far beyond any other crypto offering for fast, free, extremely small payments. If it can maintain that lead, it could dominate this new area of commerce and be the foundation for a new payment infrastructure for the Internet.
