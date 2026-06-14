---
title: "The End of Excel?"
subtitle: "How Notion, Coda, and Airtable are chipping away at Microsoft's monopoly"
author: "Matthew Guay"
date: 2022-10-25
column: p
url: https://every.to/p/the-end-of-excel
paywalled: true
scraped_at: 2026-06-11T16:08:30.467Z
---

# The End of Excel?

*How Notion, Coda, and Airtable are chipping away at Microsoft's monopoly*

You could squander a good career, trying to compete with Excel. You might as well take up tilting at windmills, or so went the conventional wisdom.

Sun Microsystems’s OpenOffice tried to win hearts for over two decades, convincing governments and universities to switch and escape paying for Microsoft Office, but there was always a sticking spot: Excel.

The [University of Toronto tried](https://www.computerworld.com/article/2558948/sun-faces-challenge-getting-companies-to-switch-to-staroffice-8.html) to switch in 2005 but failed to get everyone on board because Excel supported double as many rows per spreadsheet—and because its students depended on the third-party [Solver](https://www.solver.com/) add-on, an analytics and data modeling tool ubiquitous in statistics classes that was only supported on Excel. Two years later, [Belgium’s Federal Public Service](https://firstmonday.org/ojs/index.php/fm/article/view/2238/2038) also tried and failed to switch office suites. A better ecosystem, along with existing Excel users’ “resistance to change,” scuttled it.

Features and integrations had, over the years since Excel was first bundled into Microsoft Office in 1988, built what seemed an insurmountable moat around the world’s most popular spreadsheet app, as each iteration added more functions and features. You’d consider writing somewhere other than Word; it's possible that presentations, you could imagine, might not require PowerPoint. There was a good chance you’d never used OneNote at all. Excel—that was what kept businesses buying Office. Even on Hacker News, Excel garners praise whenever it comes up.

“Excel is straight up [sic] a good tool,” wrote @screye in a [discussion about alternatives](https://news.ycombinator.com/item?id=21628573). “Fighting Excel is like waging the Drug War,” chimed in @ianphughes. “You can make what appear to be gains while still losing.”

But over the past decade, alternative spreadsheet apps seem to be making solid gains. There’s a spreadsheet built into everything these days. There’s one in [Quip](https://quip.com/), a simpler office suite founded in 2012 and acquired by Salesforce for $750 million in 2016—the same year that [Notion](https://notion.so/) was founded. Notion is a notes app growing fast enough to have raised over $343 million—and its tables, a cross between a database and a spreadsheet, are another tool chipping away at Excel’s dominance. [Coda](https://coda.io/), another notes app that launched in 2014 and has raised $240 million so far, went so far as to liberate spreadsheet functions—like calculating an average—from the sheet and put them in your prose. [Airtable](https://airtable.com/), the database app, is more Microsoft Access-meets-2022 than Excel, yet it, too, is taking over tasks many previously would have been relegated to a spreadsheet.

And those are the big players. There are newer spreadsheet apps that have together raised over $57 million in funding: [Rows](https://rows.com/) launched in 2016 to automate spreadsheets, [Casual](https://www.causal.app/) in 2012 focused on financial planning spreadsheets, [Actiondesk](https://www.actiondesk.io/) in 2018 to put live data in spreadsheets, and [Grid](https://grid.is/) the same year to simplify visualizing spreadsheet data. And lest we forget, Google Sheets and Smartsheet have already managed to survive—thrive, even—for a decade and a half, the former as a core part of Google Workspace, the latter with a $4.4 billion market cap.

It’s like the spreadsheet became generic, as if Excel taught us a new language that we now speak even when using other software.

“Every spreadsheet shared in a business is an angel announcing another SaaS app still needs to be built,” [tweeted Patrick McKenzie](https://twitter.com/patio11/status/655674551615942657?s=21&t=cbjM1vhniCo6ssEvpsXPSA) in 2015 in what became standard startup wisdom. But it’s not just that you can build a better invoice app or budgeting tool than Excel could ever be. Competing with Excel not only seems possible, but like a good idea.

## From clay to Clayton

It wasn’t that Microsoft invented the spreadsheet. The [Sumerians beat them](https://www.reproof.app/blog/strikethrough) to that by a few millennia, with tables of numbers etched into clay tablets. The word took longer to come into being. A [“spread sheet” was originally a sheet of rubber](https://books.google.com/books?id=U0jzAAAAMAAJ&pg=PA198&dq=%22spread+sheet%22&hl=en&sa=X&ved=2ahUKEwjE2vaCtuj4AhWpZ2wGHaYLDIk4ChDoAXoECAIQAg#v=onepage&q=%22spread%20sheet%22&f=false) spread thin by early rubber factories in the early 1900’s. The U.S. government—or someone close by—had borrowed the term by 1945 to [name the tables of facts and figures](https://books.google.com/books?id=nPmyAAAAIAAJ&pg=PA3515&dq=%22spread+sheet%22&hl=en&sa=X&ved=2ahUKEwif767it-j4AhWy7zgGHSJ6A1s4HhDoAXoECAQQAg#v=onepage&q&f=false) that won World War II. Bell Labs’s northern counterpart in Canada computerized them a couple of decades later, when Remy Landau and Rene Pardo built [LANPAR](https://www.renepardo.com/) and taught mainframes to recognize numbers separated by semicolons as rows and columns, to calculate changes on the fly. Three decade after that, Dan Bricklin [dreamed](https://www.npr.org/2015/02/27/389585340/how-the-electronic-spreadsheet-revolutionized-business) of a “blackboard where I could erase a number and write a new number in, and everything would recalculate,” mocked it up in a [reference card](https://reproof.app/blog/document-first-then-build) that recreated the age-old paper spreadsheet on screen, and recruited software engineer Bob Frankston to code the first graphical spreadsheet app—VisiCalc—into a reality that launched in 1979.

“Our model was the spreadsheet—a simple paper grid that would be laid out on a table,” [recalled Frankston](https://www.landley.net/history/mirror/apple2/implementingvisicalc.html) years later. “The goal was to give the user a conceptual model which was unsurprising. We were illusionists synthesizing an experience.”

Thus began tech’s most enduring skeuomorphism.

In the 1980s, Microsoft started putting a computer on every desk in every office and taught the world to `SUM()` and `CONCATENATE()` in Excel (which, in another world, could have been called “[Mr Spreadsheet](https://news.ycombinator.com/item?id=32000400)”).

VisiCalc started out strong, pioneering the spreadsheet interface and [the original 22 functions](http://www.bricklin.com/history/refcard2.htm) (including `SUM()`, `AVERAGE()`, `LOOKUP()`, `ABS()`, and other classics still used today) on DOS, the black-and-white command-based operating system that fueled the first decade of personal computing. Microsoft put the spreadsheet in a window, first on the early Macintosh and then on Windows, and steadily became the standard as DOS gave way to graphical interfaces. It was Microsoft’s game to lose.

It was one of the first times Microsoft would execute its soon-to-be-famous “[embrace, extend, extinguish](https://en.wikipedia.org/wiki/Embrace,_extend,_and_extinguish)” strategy, fueled by being in the right place at the right time:

**Embrace.** Adopt a new technology: take something others are building and make your copy of it.

**Extend.** Make it better: build things that’d make people want to switch to your version and turn it into an ecosystem of connected products.

[PAYWALL]
