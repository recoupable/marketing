---
title: "Asset Allocation Autopilot: Earning 15%+ APYs in DeFi"
subtitle: "Why hunt for the best rates when software can do it for you?"
author: "Nat Eliason"
date: 2021-05-20
column: almanack
url: https://every.to/almanack/automatic-savings-optimization
paywalled: false
scraped_at: 2026-06-11T16:08:59.330Z
---

# Asset Allocation Autopilot: Earning 15%+ APYs in DeFi

*Why hunt for the best rates when software can do it for you?*

*Note: I wrote this before the big market crash on Wednesday, May 19th. I’ve added an addendum with some notes on how and if this strategy was affected. *
*Also: This article is not financial advice, and it’s for informational purposes only. It’s not a solicitation or recommendation. Crypto is volatile, changes rapidly, and I’m just some guy on the Internet writing about it. Engage at your own risk.*
In my [last post](https://every.to/almanack/creating-a-high-yield-savings-account-with-crypto-defi), I covered how you can bring some money into the crypto world to set up a “savings account” where you’re earning interest on assets that are pegged to the US Dollar.
But tossing your crypto into an account where it can earn 5 to 10% annually is just the beginning. Using more advanced Decentralized Finance protocols like I’m going to cover here, you can get those numbers up to 15 to 20% by letting software optimize how your savings are allocated.
In the financial world that we’re used to, if you have some money that you want to earn interest for you, you might explore a few banks and see what kind of interest rates they’re offering. After some careful consideration, you could pick Wealthfront or Marcus or Chase—whoever seems like they’re going to pay you the most interest on your savings.
You can do the same thing in the crypto world. You have some cryptocurrency you’d like to earn interest on, so you check out lending protocols like Compound and AAVE for the best rates.
But unlike a traditional bank, the interest rates for different cryptocurrencies on different protocols are changing constantly, depending on how much people want to borrow the type of crypto you’re loaning. Today, you might get 8% APR (yearly interest rate) for your USDC on Compound, but tomorrow that might drop to 3% and AAVE might have the better rate.
In the physical world, there’s no great way to move your savings around daily to get the highest interest rate. And you’d be somewhat insane to try to do it. But in the crypto world, it is possible. Since transactions are fast and permissionless; you *could* wake up every day and reallocate your funds into the platform with the highest rewards.
But you’ll run into two problems. First, time. It would take a ridiculous amount of monitoring and maintenance just to get a few extra interest points.
Second, transaction fees. Especially on Ethereum, transactions are insanely expensive right now, often costing $100 to $300 just to deposit your money in a platform. Unless you’re moving around millions of dollars, those so-called “gas fees” are going to quickly erode any gains to be had by optimizing which platform you use.
Lucky for you, you don’t have to. Programmers in the Decentralized Finance space have built software that can do it for you.
The big project in this space is called [Yearn](https://yearn.finance/). It was started by [Andre Cronje](https://twitter.com/AndreCronjeTech) who was trying to do exactly what I described earlier: he was rotating his savings between different platforms daily and wanted to write code to do it for him.
Now Yearn manages billions of dollars of cryptocurrency and helps their holders get the maximum interest rate possible without having to monitor changing interest rates themselves. Yearn handles common cryptocurrencies like Bitcoin and Ethereum, as well as stable ones like USDC and DAI, which are pegged to the US Dollar. USDC and DAI often earn between 15 and 20 percent APY, significantly higher than you’d average if you tried to swap between lending protocols yourself or put the money in a traditional savings account (sometimes called a “fiat” account, where “fiat” refers to government-issued money).

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_dhd9u6ZxPolxPTHH51x4gObHpgeRVyO3EjefMcv1NWX19uHE9xpjsKsHAKLI3zEa1OyHpTis0VjuePcgCNgoMcC7_I4Jz9r3ATm8MqEHRocdUTzAVV1MNCY_anaSa9OKnfo_9fKo.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_dhd9u6ZxPolxPTHH51x4gObHpgeRVyO3EjefMcv1NWX19uHE9xpjsKsHAKLI3zEa1OyHpTis0VjuePcgCNgoMcC7_I4Jz9r3ATm8MqEHRocdUTzAVV1MNCY_anaSa9OKnfo_9fKo.png?link=true)

But what exactly is going on in the backend? How is Yearn getting these interest rates, and what is the platform doing with your money?

## How Yearn Works

The simplest way to understand Yearn is that it algorithmically provides you exposure to many of the best ways to earn interest on your cryptocurrency online. Similar to how a hedge fund manager might take your capital and allocate it to where they see the highest return, Yearn can take your funds—whether they’re USDC, Ether, Bitcoin, or any of a number of other assets—and allocate them to wherever those funds are going to earn you the highest return on investment.
That return comes from a process called “yield farming.” Yearn hunts around between the different borrowing and lending platforms to find where you’ll get the highest return on your capital, reallocates funds as necessary, and can automatically compound your returns faster than you could on your own.
Most of those opportunities are on protocols like [Compound](https://compound.finance/) and [AAVE](https://aave.com/) which allow you to stake your assets, earn interest on them, and even take out debt against them like [I covered in my last post](https://every.to/almanack/creating-a-high-yield-savings-account-with-crypto-defi).
Those platforms can offer higher returns than you get in traditional finance through a combination of efficiency and demand. On the efficiency front, Compound has about the same amount of assets under management as Wealthfront, but with fewer than 10% of the employees. And although the interest rate to borrow is higher than you’d pay on a mortgage or car loan, it’s lower than you’d likely pay for a private loan.
But beyond efficiency, the real key to higher rates is the fluctuating demand for borrowing crypto. Yearn takes advantage of how DeFi interest rates fluctuate at speeds you don’t see in the physical banking world. DeFi interest rates on different platforms change multiple times an hour depending on how much capital is being supplied or demanded, and you can even look at [how the interest rate curves are calculated](https://compound.finance/markets/USDC).

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_jpACKVVpCY3O8GYwCzl8_1gTYoFjdm0Lv2wo-29s3QMo3zatuwM22tL4Kv0ciEZtTybm5q9r4ka8kStgbHeq6wl7uytwFTDxnnAHqy-4gRntg2VAmVv3QU-4DqGaFenmVBOUOWxn.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_jpACKVVpCY3O8GYwCzl8_1gTYoFjdm0Lv2wo-29s3QMo3zatuwM22tL4Kv0ciEZtTybm5q9r4ka8kStgbHeq6wl7uytwFTDxnnAHqy-4gRntg2VAmVv3QU-4DqGaFenmVBOUOWxn.png?link=true)

The transaction costs or “gas fees” of constantly moving your money around make it cost-prohibitive to do this yourself, but since Yearn is allocating billions of dollars, those gas fees are negligible. That’s because the gas fees are the same whether you’re sending $1,000 or $1,000,000. They’re based on the network congestion, not on the amount you’re sending.
Each “Yearn Vault” allows you to stake a different asset to earn interest on it. That could be a stable coin pegged to the US Dollar like USDC, DAI, and Tether, but you can also stake Ethereum, Bitcoin, and other more volatile assets.
For each Vault, Yearn employs a variety of investing strategies based on market conditions and can rotate between them as prices and interest rates fluctuate. In the traditional finance world, this might be akin to investing your money with a hedge fund or high-frequency trading firm. Those companies have their own strategies they’re executing, and if you can get access, you can potentially earn much more than you would just by investing in index funds. But instead of needing tens of millions of dollars to get access to the best hedge funds, you can deposit as little as a few hundred dollars in Yearn and see similar returns.
The ease of access, and low cost of entry, is one of the great democratizing benefits of these new DeFi protocols. Instead of the best returns on capital being exclusively available to people who are already rich, anyone can join in on something like Yearn and have their money do more for them than it does in the fiat, or traditional, banking system.

## What About Risks?

You can’t get 15 to 20% APY without carrying some risk, so what are the risks associated with using Yearn?
Anything on Ethereum carries a certain amount of platform risk. It’s still possible there could be some platform destroying bug that brings the whole ecosystem down on top of itself, though as people continue working on the Ethereum ecosystem and as it continues to develop, those odds get lower and lower. It’s also always possible people could stop using Ethereum entirely, and the value of whatever cryptocurrencies you own permanently declines.
Layered on top of the Ethereum platform risk is the risk associated with whatever asset you’re choosing to stake on Yearn. If you stake USDC, you’re putting some trust in Coinbase that they’ll continue to manage the peg between USDC and USD effectively. If you use DAI, [you’re trusting MakerDAO](https://en.wikipedia.org/wiki/Dai_(cryptocurrency)) to maintain the peg. So far, USDC and DAI have done an excellent job maintaining their peg to the US Dollar, but it’s always possible that technology could fail at some point in the future.
Finally, you have the Yearn platform risk. It’s possible there could be some bug or exploit we don’t yet know about that allows hackers to drain funds from Yearn, putting your staked funds at risk. Yearn did suffer an exploit earlier this year which [drained 11 million DAI](https://github.com/yearn/yearn-security/blob/master/disclosures/2021-02-04.md) from the vault, but they've upgraded their protocol as a result and [repaid the victims of the hack](https://bitcoinexchangeguide.com/yearn-finance-uses-treasury-to-mints-9-7m-dai-to-repay-ydai-vault-hack-victims/).
So as with most things in the DeFi world, it’s hard to say how risky it is, and you should do your own research to decide for yourself what risk you’re willing to take. I personally am using Yearn for earning interest on some of the stable coins I have in the crypto ecosystem because, when considering the risks and the progress it’s made so far, I personally trust the protocol.

## Using Yearn

Getting started using Yearn is simple enough if you decide you do want to park some money there. In a nutshell, you buy some crypto on Coinbase, then send it to MetaMask, then send it to Yearn. I’ll break that down now.
First, go to Coinbase or Coinbase Pro and purchase a stable coin like DAI or USDC.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_qClvmR-rtM5CjWKwn-OAR4oJzXFtLUtf8dZj_S-hG8-dgdfF-1PQmL4HHrJm0ZcgYsXQkRX8Uu9j1zW0E7Yi1nIJlHtU6zJploZuUBX3LKSFTpF_zlEcohkEP0-k960ZWMy3AUxU.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_qClvmR-rtM5CjWKwn-OAR4oJzXFtLUtf8dZj_S-hG8-dgdfF-1PQmL4HHrJm0ZcgYsXQkRX8Uu9j1zW0E7Yi1nIJlHtU6zJploZuUBX3LKSFTpF_zlEcohkEP0-k960ZWMy3AUxU.png?link=true)

DAI and USDC are coins pegged to the US Dollar, but they live on the Ethereum network. So you can send them to an Ethereum wallet just like you would any Ether you want to move around.
The easiest way to transport your DAI into Yearn will be to use the browser wallet [MetaMask](https://metamask.io/). It gives you a UI for storing, receiving, and sending anything on the Ethereum network, including your DAI.
Once you have MetaMask installed, you can copy your wallet address and paste it into Coinbase for where to send your DAI to:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_u0w4nvVYwjFJa-QCWg6MOtuoXCqRcp2vwtHl7dFpkyqU4yxqioLLhRn3dtZZLWhLNKnu4Vk2cGvgOOWS9fH47cTkTsnzlaUu_7MoPefjftnQv9yac-DdGVpGOmfG0qVjfgBNCzP1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_u0w4nvVYwjFJa-QCWg6MOtuoXCqRcp2vwtHl7dFpkyqU4yxqioLLhRn3dtZZLWhLNKnu4Vk2cGvgOOWS9fH47cTkTsnzlaUu_7MoPefjftnQv9yac-DdGVpGOmfG0qVjfgBNCzP1.png?link=true)

Note that you will also need some Ethereum in this wallet in order to do any transfers out, like when you deposit on Yearn.
After the coin shows up in your MetaMask wallet, you can go to Yearn and deposit them straight into Yearn.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_EXV-FWDrj7_8bRY1dF9Dmsg2ZHE5B60xTg5Z5vuu7ASdnMl38KCyFtDWcFvNrWjFHR8vVOhptWEc4VV5nUQvdnWK1N5wS83SUwYVwwLOd097gx6O8fWIXh4DQzHGlecLgH_E2CQB.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/1669/optimized_EXV-FWDrj7_8bRY1dF9Dmsg2ZHE5B60xTg5Z5vuu7ASdnMl38KCyFtDWcFvNrWjFHR8vVOhptWEc4VV5nUQvdnWK1N5wS83SUwYVwwLOd097gx6O8fWIXh4DQzHGlecLgH_E2CQB.png?link=true)

This will require two transactions: one to give Yearn approval to receive your funds, and one to actually deposit the funds. Gas fees can be somewhat expensive depending on the time of day, so you can always check the [Ethereum Gas Tracker](https://etherscan.io/gastracker) first to see how high they are.
Once that’s done, you don’t need to do anything else. You can check in on how it’s growing, and withdraw your funds, including any gains, any time you want. It’s worth mentioning too that your gains are automatically compounding. You don’t need to re-stake anything.
But just like the last post was one step in the growing decentralized financial system available to us, Yearn is just another step as well. Depending on how crazy you want to get with it, you can use other auto-compounding and yield farming protocols to earn ridiculous returns on capital depending on your risk tolerance. We’ll cover that in a future post.

## Addendum: May 19th Market Crash

As I finished writing this article, the entire crypto market tanked about 30% in a day. Bitcoin dropped from around $45,000 to, at one point, $30,000. Ethereum fell from $3,500 to as low as $2,100. About a trillion dollars in market cap flowed out of the market in one morning, creating the biggest stress test these DeFi protocols have yet endured.
So how did they hold up? Totally fine. The software running AAVE and Compound automatically liquidated anyone who was over-leveraged and the platforms stayed solvent through the drop. Yearn adjusted its strategies accordingly, and as of this morning (5/20), is still offering 12-17% APR on stable coins despite the market decline.
When I was first writing this article, the big caveat in the back of my head was “what happens if the market suddenly tanks?” Now we have some of the best evidence we could ask for that the software works. And that makes me more excited than ever.
*Update 5/24: An earlier version of this article stated that Yearn had not been hacked. It has now been updated to reflect it suffered an exploit earlier this year, which it has since patched and repaid the victims of.*
