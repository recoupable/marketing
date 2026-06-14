---
title: "How We Built the Internet"
subtitle: "A deep dive into the fundamentals of digital communication infrastructure"
author: "Anna-Sofia Lesiv"
date: 2024-03-19
column: p
url: https://every.to/p/how-we-built-the-internet
paywalled: true
scraped_at: 2026-06-11T16:08:06.093Z
---

# How We Built the Internet

*A deep dive into the fundamentals of digital communication infrastructure*

#### Sponsored By: Composer

Wall Street legend Jim Simons has generated **66 percent returns annually for over 30 years. **His secret? Algorithmic trading.

With [Composer](https://www.composer.trade/?utm_source=every&utm_medium=newsletter&utm_campaign=3-7-24&utm_content=homepage), you can create algorithmic trading strategies that automatically trade for you (no coding required).

- Build the strategy using AI, a no-code editor, or use one of 1,000-plus community strategies

- Test the performance

- Invest in a click

[With $1 billion-plus in trading volume, join Composer today!](https://www.composer.trade/?utm_source=every&utm_medium=newsletter&utm_campaign=3-7-24&utm_content=homepage)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#4734372829342835342f2e373407223122353e693328).

*The internet is like water—we take its existence for granted, but its birth was by no means pre-ordained. A constellation of inventors, organizations, and efforts all contributed to its creation. In one of her signature deep dives, Contrary writer Anna-Sofia Lesiv excavates the history of digital communication infrastructure, from the invention of the telephone to the widespread installation of fiber-optic cable and big tech’s subsidization of undersea cables. Read this chronicle to understand how the internet’s decentralized origins led to its current state as fractured spaces governed by private entities—and its implications for its future accessibility. —*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)

---

The internet is a universe of its own. For one, it codifies and processes the record of our society’s activities in a shared language, a language that can be transmitted across electric signals and electromagnetic waves at light speeds.

The infrastructure that makes this scale possible is similarly astounding—a massive, global web of physical hardware, consisting of more than [5 billion](https://www.mcgill.ca/newsroom/channels/news/pushing-speed-limit-what-will-future-internet-look-348672#:~:text=As%20of%202020%2C%20over%205,diameter%20of%20a%20human%20hair.) kilometers of fiber-optic cable, more than 574 active and planned submarine cables that span a over 1 million kilometers in length, and a constellation of more than 5,400 satellites offering connectivity from low earth orbit (LEO).

According to recent estimates, [328 million terabytes](https://explodingtopics.com/blog/data-generated-per-day) of data are created each day*. *There are billions of smartphone devices sold every year*, *and although it’s difficult to accurately count the total number of individually connected devices, some estimates put this number between [20 and 50](https://www.rcrwireless.com/20190520/internet-of-things/global-iot-connections-reach-50-million-2030-study#:~:text=The%20number%20of%20devices%20connected,22%20billion%20IoT%20connections%20globally.) billion.

“The Internet is no longer tracking the population of humans and the level of human use. The growth of the Internet is no longer bounded by human population growth, nor the number of hours in the day when humans are awake,” [writes](https://www.comsoc.org/publications/ctn/future-internet-through-lens-history) Geoff Huston, chief scientist at the nonprofit Asia Pacific Network Information Center.

But without a designated steward, the internet faces challenges for its continued maintenance—and for the accessibility it provides. These are incredibly important questions. But in order to grasp them, it’s important to understand the internet in its entirety, from its development to where we are today.

## The theory of information

In the analog era, every type of data had a designated medium. Text was transmitted via paper. Images were transmitted via canvas or photographs. Speech was communicated via sound waves.

A major breakthrough occurred when Alexander Graham Bell invented the telephone in 1876. Sound waves that were created on one end of the phone line were converted into electrical frequencies, which were then carried through a wire. At the other end, those same frequencies were reproduced as sound once again. Speech could now transcend physical proximity.

Unfortunately, while this system extended the range of conversations, it still suffered from the same drawbacks as conversations held in direct physical proximity. Just as background noise makes it harder to hear someone speak, electrical interference in the transfer line would introduce noise and scramble the message coming across the wire. Once noise was introduced, there was no real way to remove it and restore the original message. Even repeaters, which amplified signals, had the adverse effect of amplifying the noise from the interference. Over enough distance, the original message could become incomprehensible.

Still, the phone companies tried to make it work. The first transcontinental line was established in 1914, connecting customers between San Francisco and New York. It comprised [3,400](https://about.att.com/newsroom/100_anniversary_of_transcontinental_phone_service.html) miles of wire hung from 130,000 poles.

In those days, the biggest telephone provider was the American Telephone and Telegraph Company (AT&T), which had absorbed the Bell Telephone Company in 1899. As long-distance communications exploded across the United States, Bell Labs, an internal research department of electrical engineers and mathematicians, started to think about expanding the network’s capacity. One of these engineers was Claude Shannon.

In 1941, Shannon arrived at Bell Labs from MIT, where the ideas behind the computer revolution were in their infancy. He studied under Norbert Wiener, the father of cybernetics, and worked on Vannevar Bush’s differential analyzer, a type of mechanical computer that could resolve differential equations by using arbitrarily designed circuits to produce specific calculations.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3010/optimized_fHd6z_ezC3icfuEioQJlIDOxdmqDvNMHpcpw_DrydRIybr-6ip0WF1s2zb-BwGSj3e8oengEGbUHlBoVvz-44_qNeTPI2pGefLxZm26OcTkheGfwKfin5SjDGyOjS0aS4XvzAFfrRgl5SvlReMgxeCw.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3010/optimized_fHd6z_ezC3icfuEioQJlIDOxdmqDvNMHpcpw_DrydRIybr-6ip0WF1s2zb-BwGSj3e8oengEGbUHlBoVvz-44_qNeTPI2pGefLxZm26OcTkheGfwKfin5SjDGyOjS0aS4XvzAFfrRgl5SvlReMgxeCw.jpeg?link=true)

*Source: *[Computer History Museum](https://www.computerhistory.org/revolution/analog-computers/3/143)*.*

It was Shannon’s experience with the differential analyzer that inspired the idea for his master’s thesis. In 1937, he submitted “A Symbolic Analysis of Relay and Switching Circuits.” It was a breakthrough paper that pointed out that boolean algebra could be represented physically in electrical circuits. The beautiful thing about these boolean operators is that they require only two inputs—on and off.

It was an elegant way of standardizing the design of computer logic. And, if the computer’s operations could be standardized, perhaps the inputs the computer operated on could be standardized too.

When Shannon began working at Bell Labs during the Second World War, in part to study cryptographic communications as part of the American war effort, there was no clear definition of information. “Information” was a synonym for meaning or significance, its essence was largely ephemeral. As Shannon studied the structures of messages and language systems, he realized that there was a mathematical structure that underlied *information. *This meant that information could, in fact, be quantified. But to do so, information would need a unit of measurement.

Shannon coined the term “bit” to represent the smallest singular unit of information. This framework of quantification translated easily to the electronic signals in a digital computer, which could only be in one of two states—on or off. Shannon published these insights in his 1948 paper, “[A Mathematical Theory of Communication](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf),” just [one year](https://every.to/p/the-end-of-moore-s-law) after the invention of the transistor by his colleagues at Bell Labs.

The paper didn’t simply discuss information encoding. It also created a mathematical framework to categorize the entire communication process in this way. For instance, Shannon noted that all information traveling from a sender to a recipient must pass through a channel, whether that channel be a wire or the atmosphere.

Shannon’s transformative insight was that every channel has a threshold—a maximum amount of information that can be delivered reliably to a sender. As long as the *quantity* of information carried through the channel fell below the threshold, it could be delivered to the sender intact, even if noise had scrambled some of the message during transmission. He used mathematics to prove that any message could be error-corrected into its original state if it traveled through a large-enough channel.

The enormity of this revolution is difficult to communicate today, mainly because we’re swimming in its consequences. Shannon’s theory implied that text, images, films, and even genetic material could be translated into his informational language of bits. It laid out the rules by which machines could talk to one another—about anything.

At the time that Shannon developed his theory, computers could not yet *communicate *with one another. If you wanted to transfer information from one computer to the other, you would have to physically walk over to the other computer and manually input the data yourself. However, talking machines were now an emerging possibility. And Shannon had just written the handbook for how to start building it.

## Switching to packets

The telephone system was the only interconnected network by the mid-20th century. AT&T was the largest telephone network at the time. It had a monstrous continental web with hanging copper wires criss-crossing across the continent.

The telephone network worked primarily through circuit switching. Every pair of callers would get a dedicated “line” for the duration of their conversation. When it ended, an operator would reassign that line to connect other pairs of callers, and so on.

At the time, it was possible to get computers “on the network” by converting their digital signals into analog signals, and sending the analog signals through the telephone lines. But reserving an entire line for a single computer-to-computer interaction was seen as hugely wasteful.

Leonard Kleinrock, a student of Shannon’s at MIT, began to explore the design for a digital communications network—one that could transmit digital bits instead of analog sound waves.

His solution, which he wrote up as his graduate dissertation, was a packet-switching system that involved breaking up digital messages into a series of smaller pieces known as packets. Packet switching shared resources among connected computers. Rather than having a single computer’s long communiqué take up an entire line, that line could instead be shared among several users’ packets. This design allowed more messages to get to their destinations more efficiently.

For this scheme to work, there would need to be a network mechanism responsible for granting access to different packets very quickly. To prevent bottlenecks, this mechanism would need to know how to calculate the most efficient, opportunistic path to take a packet to its destination. And this mechanism couldn’t be a central point in the system that could get stuck with traffic—it would need to be a distributed mechanism that worked at each node in the network.

Kleinrock approached AT&T and asked if the company would be interested in implementing such a system. AT&T rejected his proposal—most demand was still in analog communications. Instead, they told him to use the regular phone lines to send his digital communications—but that made no economic sense.

[PAYWALL]
