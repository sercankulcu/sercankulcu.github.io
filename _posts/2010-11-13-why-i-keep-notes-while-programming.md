---
title: 'Why I Keep Notes While Programming'
date: 2010-11-13
permalink: /posts/2010/11/why-i-keep-notes-while-programming/
tags:
  - programming
  - productivity
  - life
---

When I am deep inside a programming problem, I often believe I will remember everything. The reason for this strange function is obvious. I am certain I will recall why I changed that setting. The error message will surely stay in my mind — I spent three hours fighting it.

Then a few months pass. I open the project again and feel like a visitor to my own work.

This is why I started keeping notes while programming. It took me longer than it should have to realise this was necessary.

## What is worth writing down

Not everything. The code itself records what was done. Version control records what changed and when. Comments in the code can record why a specific line works the way it does. Notes fill a different gap: they capture context that does not fit naturally into any of those places.

**Decision rationale.** I chose this library over the alternative for a reason that was not obvious from the code. The other library seemed better at first but had a specific limitation that mattered for this project. A note recording that comparison costs two minutes to write and can prevent the same evaluation from being done again six months later. Without it, the evaluation happens again, reaches the same conclusion, and takes the same time. This is pure waste.

**Behavioural quirks.** "This library fails silently when the input list is empty — it returns an empty result instead of an error." This is not something I should add to the code as a comment because it describes the library's behaviour, not the code I wrote. But it is something I will forget and then rediscover at an inconvenient moment without a note. The inconvenient moment is usually a production bug report.

**Environmental dependencies.** "The server expects timestamps in UTC. Sending local time causes records to be stored with wrong dates." The code handles the conversion, but the fact that this conversion is necessary — and the specific server behaviour that required it — is worth writing somewhere explicit. Two years later, when someone wonders why we are converting timestamps at all, the note provides the answer.

**Dead ends.** "Tried approach X on 2010-11-05. Failed because of Y. Would need Z to work." The next time a similar idea seems attractive, I would like to know I already tested it and what the result was. Dead ends are especially valuable to document because they are invisible in the finished code. The code only shows what worked; it cannot show what was tried and why it was abandoned.

**Setup sequences.** "To get the local environment working: (1) set environment variable A to X, (2) run migration, (3) restart service B before running service C, or C fails on startup." This kind of procedural knowledge does not belong in code but disappears from memory faster than anything else.

## Where I keep them

Different people have different systems, and I am not convinced there is one right answer. I use plain text files organised by project, stored alongside the code. The advantage is that they are searchable with any tool, do not depend on any application remaining available, and can be committed to version control alongside the code they describe.

Some people use a wiki — either personal or a team installation of something like MediaWiki or Confluence. This works well when notes are likely to grow, need cross-linking, or when multiple people should contribute. The overhead is higher than a text file, and wikis tend to become disorganised unless someone actively maintains them.

Evernote has been popular for a few years. It captures notes quickly and syncs across devices. I am less certain about keeping important technical notes in a proprietary format stored on someone else's server, but the usability advantage for quick capture is real.

The format matters less than the habit. A note that exists is more useful than a perfect system that is too much work to maintain. The risk of an elaborate note-keeping system is that the overhead becomes a reason not to write anything.

## The pattern I try to follow

When I encounter something that surprised me, I write it down before moving on. When I make a decision that involved real tradeoffs, I write the reasoning. When I spend more than an hour on a problem that turned out to have a non-obvious solution, I write the solution and why it was non-obvious.

This sounds like it would take a lot of time. In practice, most of these notes are one to three sentences. The time cost is small. The time saved when I would otherwise spend two hours rediscovering something I already knew is much larger. The ratio is asymmetric in a way that makes the habit easy to justify once it has been tested even once.

Programming creates many temporary thoughts. We test an idea, discover a limitation, choose one solution, and move on. The code shows what we finally did. Notes are for everything the code cannot show: why we chose this, what we already tried, what we learned, and what future-us will need to know when the context is gone.

The context always goes. Writing it down is the only way to keep it.
