---
title: "The Dawn of Spatial Computing"
subtitle: "A close look at the breakthroughs in mixed reality tech"
author: "Anna-Sofia Lesiv"
date: 2023-06-28
column: p
url: https://every.to/p/the-dawn-of-spatial-computing
paywalled: false
scraped_at: 2026-06-11T16:08:17.525Z
---

# The Dawn of Spatial Computing

*A close look at the breakthroughs in mixed reality tech*

#### Sponsored By: The Information

This essay is brought to you by [The Information](https://www.theinformation.com/subscribe?offer=now_pro_p%2Cannual-wp%2Cmonthly-wp&utm_campaign=Every_Q12023&utm_medium=paid_newsletter&utm_source=wellput), the biggest dedicated newsroom in tech and business journalism.

The Information offers access to exclusive insights from the industry's top journalists. For a limited time, subscribe and save 25% on your first year.

[Subscribe Today!](https://www.theinformation.com/subscribe?offer=now_pro_p%2Cannual-wp%2Cmonthly-wp&utm_campaign=Every_Q12023&utm_medium=paid_newsletter&utm_source=wellput)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#4734372829342835342f2e373407223122353e693328).

The origins of contemporary computer interfaces date back decades. Douglas Engelbart [designed](https://dougengelbart.org/content/view/162/) the mouse in the 1960s, and Alan Kay created the [graphical user interface](http://worrydream.com/refs/Kay%20-%20User%20Interface,%20a%20Personal%20View.pdf) in the 1970s. Since then, countless alternative visions have been proposed with the goal of integrating computers more seamlessly into our lives.
MIT’s [Hiroshi Ishii](https://tangible.media.mit.edu/person/hiroshi-ishii/), for example, imagined “tangible user interfaces” which would let us manipulate digital information through physical objects. Mark Weiser, the former head of the computer science laboratory at Xerox PARC, [wrote](https://www.ics.uci.edu/~djp3/classes/2012_09_INF241/papers/Weiser-Computer21Century-SciAm.pdf) about building computers that “vanish into the background” and [popularized](https://www.ics.uci.edu/~djp3/classes/2012_09_INF241/papers/Weiser-Computer21Century-SciAm.pdf) the notion of “ubiquitous computing.”
Meanwhile, science fiction authors envisioned futures where computers provide such immersive experiences that they effectively engender new worlds. Neal Stephenson’s 1992 novel Snow Crash was set in an alternate reality where humans existed both in the physical world and the metaverse. These kinds of ideas heavily influenced real-life technologists designing the future of computing. In fact, Michael Abrash, who now serves as chief scientist at Meta’s Reality Labs, was [inspired](https://www.gdcvault.com/play/1017797/Why-Virtual-Reality-Is-Hard) to build such digital worlds after reading Stephenson’s book.
Despite the many possible alternatives advocated for over the years, the graphical user interface and mouse remained the predominant method of interacting with computers. After such a long period under the same paradigm, the idea that head-mounted displays or augmented-reality glasses would replace desktop monitors initially sounded far-fetched. Even in the latest mixed reality headsets, the field of view wasn’t wide enough to do work comfortably nor was the resolution clear enough to read or write text easily. The MetaQuest Pro, released in October 2022, notably [disappointed](https://kguttag.com/2023/01/03/meta-quest-pro-part-1-unbelievably-bad-ar-passthrough/) users who hoped that it could be used for more than playing video games.
In June 2023, Apple, known for consistently releasing category-defining products, unveiled [yet another one](https://every.to/p/how-apple-builds-the-future) — the Vision Pro. It’s a mixed-reality headset that offers clever solutions to many of the technical challenges that bogged down the virtual and augmented reality industry for years.

####

The Information offers access to exclusive insights from the industry's top journalists. Founded in 2013, [The Information](https://www.theinformation.com/subscribe?offer=now_pro_p%2Cannual-wp%2Cmonthly-wp&utm_campaign=Every_Q12023&utm_medium=paid_newsletter&utm_source=wellput) has built the biggest dedicated newsroom in tech journalism and count many of the world’s most powerful business and tech executives as subscribers. Their reporters focus on reporting the people, trends, and forces that are defining the future of technology and business.

As a subscriber, you'll get access to award-winning reporting, exclusive interviews, community conversations, and subscriber events and more, so you can make informed decisions anywhere, anytime. For a limited time, subscribe and save 25% on your first year.

[Subscribe Today!](https://www.theinformation.com/subscribe?offer=now_pro_p%2Cannual-wp%2Cmonthly-wp&utm_campaign=Every_Q12023&utm_medium=paid_newsletter&utm_source=wellput)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#196a6976776a766b6a7170696a597c6f7c6b60376d76).

## The technical challenges of mixed reality

Creating a well-functioning mixed-reality headset is really hard. Why? To produce a believable mixed-reality experience, you need to do two things: generate images that appear real, and display these images in synchronization with the natural head, eye, and body movements of the user. Though the concepts seem straightforward, a wide array of disciplines is required to get them right. To name a few: optics, electrical engineering, chip design, graphics, and display systems.

#### Graphics challenges

The physical objects we interact with in reality have depth. Though our eyes produce two separate 2D images of our environment, our brain does the hard work of merging them to make the world look three-dimensional.
Mimicking the function of our eyes with a head-mounted display can be done through stereoscopy, a technique involving two displays showing slightly distinct 2D images to each eye. Though this works very well at creating an illusion of depth, it is very computationally expensive.
After all, displaying just *one* high-resolution, three-dimensional display is computationally intensive. Generating realistic computer graphics is one of the most involved areas of computer programming. Game engines need to be highly efficient [physics simulators](https://www.youtube.com/watch?v=P6UKhR0T6cs) to produce convincing graphics.
To show how light flitters on a leaf blowing in the wind, for example, calculations need to be done for each ray of light hitting that leaf in order to figure out how they will then refract and hit other surfaces. These kinds of calculations, which need to be done for thousands of rays across thousands of surfaces *every second*, are why high-resolution graphics are so difficult to get right. This is also why the gaming industry has been a leader in the [incredible advances](https://www.youtube.com/watch?v=p8u_k2LIZyo) we’ve seen in algorithm efficiency.

![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_vs1.png)

*Source: *[3DCS](https://community.3dcs.com/help_manual/benefitsofraytracing.htm)
A stereoscopic head-mounted display needs to do all this *twice,* since a slightly altered image needs to be shown to each eye. However, even if the software is good enough at rendering two high-quality images, the display hardware needs to be high-resolution enough to make those images seem realistic.
Display resolution is normally defined by the total number of pixels used to produce an image. A [high-quality 4K](https://www.samsung.com/levant/tvs/tv-buying-guide/what-is-4k-tv/#:~:text=A%204K%20TV%20is%20a,x%202160%22%20for%204K%20TVs.) resolution television, somewhere over 30 inches wide, might have something like 8 million pixels. TVs are best viewed from a distance, because each pixel has fixed width and height. When you get too close, the image quality becomes "pixelated" because you start to see the individual pixels themselves.
The challenge with mixed-reality headsets is that the displays are designed to sit only a few *centimeters* away from users’ eyes. Achieving 4K resolution on such tiny and close-up screens requires extremely small pixels packed very densely — a challenging engineering feat!
The characteristics of the display also determine the field of view. The field of view can be thought of as the size of the window that users will be able to experience the virtual world in. With normal vision, humans have a field of view that spans roughly 220 degrees. With early AR and VR devices, limited display sizes and other factors resulted in a limited field of view, requiring users to rely more on head movements than eye movements — opposite to the real world.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.13.58%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.13.58%20AM.png)

*Source: *[Bernard C. Kress, Optical Architectures](https://www.amazon.com/Architectures-Augmented-Virtual-Mixed-Reality-Headsets/dp/1510634339)

#### Latency challenges

Even if a sufficiently wide field of view is achieved by means of successfully creating a super high-powered stereoscopic display, you’ve only won half the battle. The goal of mixed-reality systems is to immerse the user in the rendered environment, which means that the image seen by the user must correspond to the natural movements the user makes with their body.
If the user’s head moves, the image should reflect the exact same change in perspective. Otherwise, a mismatch between what a user’s eyes are telling them and what they’re sensing via their vestibular system can result in serious discomfort and motion sickness. To ensure this doesn’t happen, head-mounted displays need some kind of tracking system to register the user’s orientation. Even more importantly, they must have very low latency. Tracking where a user’s head is positioned is solvable with the use of gyroscopes or accelerometers. The real challenge is creating a system that tracks a user’s head movements, adjusts the image accordingly, and displays it to the user across both screens *so quickly* that the whole process is imperceptible to the user.
The goldilocks zone for latency low enough to feel realistic to users lies between 1 and 20 milliseconds. This means that the entire process, from the instant a user’s head moves to when a newly rendered image appears on the screen, should happen somewhere within that range.
**
*[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.16.37%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.16.37%20AM.png)*
*Source: *[Michael Abrash, GDC 2013](http://media.steampowered.com/apps/valve/2013/MAbrashGDC2013.pdf)
To illustrate just how fast that is, consider a common refresh rate for modern desktop monitors and laptops. With a 60 Hz frame rate, the screen you’re probably looking at now can update at 60 frames per second, which means that a single frame lasts for 16.6 milliseconds.
With stereoscopic vision, however, you need to render twice the number of pixels for two completely different perspectives — all while taking into account the precise movements of the user’s head, body, and eyes.

#### The state of the art before Apple

Over the last decade, there remained a pretty big discrepancy between the intense technical demands required of a good mixed-reality headset and the hardware that was available for headset manufacturers to use. Companies like Oculus and Magic Leap, which sought to commercialize the technology at scale for the first time, had to choose between a number of trade-offs.
The first Oculus Rift headset [opted](https://spectrum.ieee.org/apple-vision-pro) to do a monoscopic over a stereoscopic display to reduce the necessary compute. The headset was impressive given that it was produced on a frugal [$2 million](https://www.vanityfair.com/news/2015/09/oculus-rift-mark-zuckerberg-cover-story-palmer-luckey) budget scrounged together on Kickstarter by Palmer Luckey. Though somewhat convincing, users complained of discomfort and motion sickness due to high latency and pixelation.
However, it turned out that R&D money is not the limiting factor to creating good mixed-reality experiences. The boom and bust saga of Magic Leap is a good case study illustrating this point. After being founded in 2010 and raising over [$2 billion](https://techcrunch.com/2021/10/11/seven-years-after-raising-542m-at-a-2b-valuation-magic-leap-raises-500m-at-a-2b-valuation/), Magic Leap finally released its first headset, the Magic Leap One, in 2018 – eight years later. The product, which had pixelated graphics, higher-than-expected latency, and a narrow field of view left many disappointed. By 2020, Magic Leap’s famously high $6.4 billion valuation [fell](https://www.theinformation.com/articles/biggest-startup-markdowns-magic-leap-wework-airbnb) to just $450 million.
The main disadvantage faced by these early players was their reliance on off-the-shelf hardware. Creating a mixed-reality product using externally designed displays, chips and other components necessarily meant that they wouldn’t have the control they need over the entire product to ensure a high-quality user experience. As a result, the decade leading up to 2023 in the mixed-reality industry was a slow, frustrating grind of incremental improvement and lukewarm results.
But all that changed with the introduction of Apple’s Vision Pro in June 2023.

## The triumph of the Vision Pro

The clearest difference between Apple’s Vision Pro headset and everything that came before it is that each hardware component of the device was deliberately designed in-house.
On the graphics side, the Vision Pro has a stereoscopic display featuring [two](https://spectrum.ieee.org/apple-vision-pro) 1.4 inch micro-OLED screens. Each screen has over [11 million individual pixels](https://spectrum.ieee.org/apple-vision-pro), which means each pixel is about [7.5 microns wide](https://spectrum.ieee.org/apple-vision-pro), about the diameter of a human blood cell. It also means the Vision Pro has the highest-resolution display on the market. To display high-quality graphics on both screens, Apple used its M2 chip, which was designed in-house and is also used in recent MacBook models (as of 2023).
Another very important trick the Vision Pro uses in rendering is a technique called *foveated rendering*. This leverages the fact that when human eyes look at something, the zone of our focus is rather small – about 3 degrees of our entire 220-degree field of view. This region of focal attention is called the fovea, and it’s the part of our vision that is always in highest resolution. The fovea is entirely dependent on where the eye is looking. The Vision Pro tracks users’ eyes to determine which part of the display they’re focusing on and concentrates on rendering graphics in high resolution only in that small part of the display. This enables the Vision Pro to create a seamless and clear experience for the user and optimizes computation for the M2 chip.
As for latency, the Vision Pro manages to reach a speed of just [12 milliseconds](https://kguttag.com/2023/06/16/apple-vision-pro-part-2-hardware-issues/) from the beginning of user movement to a change in the display. Behind this is a [90Hz](https://www.theverge.com/2023/6/8/23753708/apple-vision-pro-90hz-hdr-display-support) frame rate screen and the R1 chip, which Apple designed in-house specifically for the purpose of processing information from the Vision Pro’s sensors. Those sensors, by the way, include *two* infrared illuminators, *twelve* cameras, and of course, [a lidar system](https://contrary.com/foundations-and-frontiers/lidar).

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.17.13%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.17.13%20AM.png)
*Source: *[Yanko Design](https://www.yankodesign.com/2023/06/07/every-single-sensor-in-the-apple-vision-pro-and-what-its-individually-designed-to-do/)
The Vision Pro is not just a virtual reality headset displaying only generated images. It also does augmented reality and allows users to toggle between these two modes. Though augmented reality is a cousin of virtual reality, and often discussed in the same breath, many that have worked on AR consider its specific challenges to be many times more difficult than those involved in pure virtual reality.
The core of augmented reality involves a blending of what a user sees in their immediate surrounding with digital images layered on top. There are two main designs that have been developed to accomplish this effect: optical AR and passthrough AR. Optical AR is truly stunning optical technology. It involves manufacturing precision optical lenses which can refract an image projected in one area of the glass out toward the user’s eyes, creating the effect that they are seeing another image overlaid on top of the world around them.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.18.36%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.18.36%20AM.png)
*Source: *[RoadtoVR](https://www.roadtovr.com/vuzix-smart-glasses-augmented-reality-glasses/)
Though this technology is incredibly impressive, the field of view achieved by optical AR is also significantly more limited than what can be achieved with immersive headsets.
The other AR approach is called passthrough AR, which is what Apple has opted to include in its Vision Pro. Passthrough AR relies on outward facing cameras that record the outside world and feed it back to the viewer through a digital display. The advantage of passthrough AR is that the user can retain a greater field of view when using AR, and can have the option of toggling to use the more immersive VR mode if they so choose. With all those cameras on the front of the headset, it also means that the Vision Pro can do cool things like record 3D photos and video.

## A brief history of optical illusions

Virtual and mixed reality really sits in the larger family of optical illusion. Since at least the days of  Plato’s [Allegory of the Cave](http://faculty.tamuc.edu/jherndon/documents/plato.pdf), humans have been fascinated by the distinction between what’s illusory and what’s real. The history of visual art is really a gradual study of how reality can be mimicked and distorted.
Throughout the Renaissance, as the great masters were perfecting the skill of displaying proportion and depth on 2D canvasses, they were also studying the importance of perspective. Hans Holbein the Younger’s “The Ambassadors” is a fascinating example of an early work that used projection mapping to achieve a unique effect. Viewed head on, the painting depicts an oddly deformed skull in front of two stately ambassadors. However, when viewed from the side a perfectly proportioned skull is revealed, with the ambassadors distorted in the background.
**
*[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.19.21%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.19.21%20AM.png)*
*Source:  *[Armin Grasnick, Basics of Virtual Reality](https://www.amazon.com/Basics-Virtual-Reality-Discovery-Perspective/dp/366264200X)
The key to learning the properties of human perception was learning about the properties of light. Even though a fundamental understanding of light’s nature eluded us until as recently as one hundred years ago, artists and engineers in the centuries preceding that already had copious clues from mirrors, reflective surfaces, light, and shadow patterns that gave hints to the underlying geometric properties of light’s movements. Even without widespread electric lighting, the 1800s already had contraptions capable of projecting moving images.
**
*[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.19.59%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.19.59%20AM.png)*
*Source:  *[Armin Grasnick, Basics of Virtual Reality](https://www.amazon.com/Basics-Virtual-Reality-Discovery-Perspective/dp/366264200X)
As photography took off in the 19th century, the first devices mimicking three dimensional perception began to be produced as well. The stereoscope became a popular device capable of augmenting the experience of looking at captured images. By taking photographs from slightly different angles and presenting them through appropriate lenses, a user could have the effect of viewing the image in 3D.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.20.16%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.20.16%20AM.png)
*Source: *[Chapman University](https://scalar.chapman.edu/scalar/this-land-is-your-land/stereoscopes)
A similar technique is now used in 3D movies. Traditional blue and red 3D glasses are called anaglyph glasses. The display being viewed consists of two overlapping images, each with a different color. The red lens in the glasses allows only the red image to pass through, while the blue lens allows only the blue image to pass through. By presenting slightly different images to each eye, the illusion of depth is simulated, creating a 3D effect!
As we can see, today’s mixed-reality technology is just the newest iteration in a saga hundreds of years in the making.

## What’s next?

Though it was the gaming industry that really kicked off the growth of virtual and mixed-reality technology, the aspiration for these devices has always been to eventually reach a mass market. This is the apparent aspiration of Apple’s Vision Pro. Its marketing efforts are attempting to dissociate the Vision Pro from the words “virtual” or “augmented reality," since such terms are now common in entertainment—preferring instead the term “spatial computing."
This is because the ultimate goal of headsets like the Vision Pro would be to replace the laptop or desktop computer interface entirely. The high latency and small fields of view of earlier devices made doing work in mixed-reality headsets impractical. However, Apple’s Vision Pro appears to have reached the necessary performance threshold to make its version of spatial computing a viable way to do work and other practical tasks aside from entertainment. If it accomplishes this, the decades-long dream of ubiquitous computing might now be inching closer to reality. Though you still have to wear a headset to do this, Apple is offering Vision Pro users the ability to arrange digital files in physical locations, and interact with them through natural hand movements.
It is worth noting that though Apple’s approach involves a head-mounted display, there are other companies which interpret “spatial computing” differently. Companies like [Humane](https://hu.ma.ne/mission) and [Dynamicland](https://dynamicland.org/), for instance, are working on technologies that can produce something closer to the original intention behind “ubiquitous computing.” They focus primarily on using projection mapping and sensors to display information in the case of Humane, or allow users to manipulate digital information physically, in the case of Dynamicland.
[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.21.56%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2655/optimized_Screen%20Shot%202023-06-28%20at%202.21.56%20AM.png)
*Source: *[Dynamicland](https://dynamicland.org/)
And it’s not the desktop environment that could be transformed through a widespread distribution of headsets. Professionals from architects to doctors may benefit from augmented reality in the workplace, allowing them to visualize building plans more accurately in the case of the former, or enhancing their skills by practicing or rehearsing surgeries in the case of the latter.
The final category of mixed reality that is really exciting, though likely still rather far out in the future, is the ability to enhance natural human senses. Until now, computer interaction was disembodied. We engaged with our computers through screens, and computers were primarily used to enhance our faculties of reason. Though we got better at being able to process greater and greater amounts of information, our other senses like sight, smell, touch, and taste never experienced the same level of enhancement.
High-powered, mobile computing headsets are a first step in changing this. It's easy to imagine how a high-powered headset could one day help improve human vision, allowing us to see microscopically and telescopically all without changing our instruments. Seeing across the electromagnetic spectrum may also soon become possible, and be as easy as changing photo filters on our camera app.
With enhanced vision, we could see better at night, and visually interrogate the world in ways we never thought possible before. There is even work being done with VR headsets to enhance our [olfactory senses](https://spectrum.ieee.org/virtual-reality-smell)!
The time has finally come when mixed-reality headsets are good enough that we can do more than just play games on them. Naturally, very few applications have been built for mixed-reality as of now. However now that the hardware has caught up, it’s only a matter of time until the software follows suit. Mixed-reality headsets promise completely new ways of perceiving and interacting with the world. After over fifty years of 2D screens, keyboards, and mice, it will be exciting to witness just how much our computing interfaces might change.

---

*Author bio: *[Anna-Sofia Lesiv](https://twitter.com/annasofialesiv) is a writer at venture capital firm [Contrary](https://contrary.com/), where she published an earlier version of [this piece](https://contrary.com/foundations-and-frontiers/spatial-computing). She graduated from Stanford with a degree in economics and has spent time at Bridgewater, Founders Fund, and 8VC.
