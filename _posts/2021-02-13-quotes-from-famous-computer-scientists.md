---
title: 'Quotes From Famous Computer Scientists'
date: 2021-02-13
permalink: /posts/2021/02/quotes-from-famous-computer-scientists/
tags:
  - career
  - computer-science
---

Computer science has produced many memorable sentences. The best of them are useful not because they settle arguments, but because they reframe questions in ways that make a problem easier to think about. Here are several I return to often, with what I actually think they mean.

## Alan Turing — on beginning before knowing everything

> "We can only see a short distance ahead, but we can see plenty there that needs to be done."

Turing wrote this in his 1950 paper "Computing Machinery and Intelligence" — the same paper that introduced the Turing Test. The sentence appears near the end, in a section about difficulties and objections. Its context is surprisingly humble for a paper that reshaped how people thought about artificial intelligence.

What I take from it is an argument against paralysis. Computing has always involved working at the edge of what is understood. The field advances not because someone mapped the entire territory before moving but because individuals and teams solved the specific problem in front of them. The short distance you can see clearly is enough to begin, and beginning is what produces the longer view.

## Edsger Dijkstra — on the cost of complexity

> "Simplicity is a prerequisite for reliability."

Dijkstra was willing to be severe, and many of his best statements were deliberately provocative. He argued — against the mainstream — that most programmers accept far too much complexity without questioning whether it is necessary.

His point was not aesthetic. Complexity in a program means more paths through which bugs can enter, more assumptions that can fail, more that the next reader must hold in mind simultaneously. Reliability is not achieved through testing alone; a program that is difficult to reason about will contain failures that testing cannot find. Simplicity is not a luxury added after the real work is done — it is the precondition for software that can be trusted.

This is harder to act on than to agree with. Simplicity usually requires more work than complexity, because you have to understand the problem well enough to find the simpler path.

## Donald Knuth — on optimization and its timing

> "Premature optimization is the root of all evil."

This is one of the most frequently cited and most frequently misapplied quotes in software development. Knuth wrote it in a 1974 paper on structured programming, and the full sentence is more careful: "We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%."

The quote is not an argument against caring about performance. It is an argument against optimizing before you know where the problem is. A program slowed by a loop that iterates ten million times needs a different response than a program slowed by a database query that could be indexed. Spending time optimizing the wrong place is not only wasted effort — it makes the code more complicated for no gain.

The useful habit this suggests: measure before optimizing. Know which 3% matters.

## Grace Hopper — on the cost of unchanged assumptions

> "The most dangerous phrase in the language is 'We've always done it this way.'"

Grace Hopper's career was built on questioning premises that others accepted. She argued, decades before it was obvious, that programming languages should look like human language rather than machine code — and she built the first compiler to prove the idea was practical. When colleagues said that computers could not write programs, she built the A-0 compiler in 1952.

The quote is not an argument for change for its own sake. It is a reminder that the reason something is done a certain way is often historical rather than optimal — that the constraints which made the original decision correct may no longer exist.

In software specifically, assumptions about what is computationally possible, what users can handle, what kinds of interfaces are practical, and what problems are worth solving all have expiration dates. The dangerous phrase is not a call to change everything; it is a flag for when the current explanation of "why we do it this way" is "because that's how it's always been done."

## What these quotes share

None of them give instructions. They reorient attention.

Turing points it toward beginning despite uncertainty. Dijkstra points it toward the cost of complexity. Knuth points it toward measurement before action. Hopper points it toward the assumptions embedded in current practice.

A quote becomes decoration when it is cited to win an argument or to signal membership in a tradition. It becomes useful when it makes you stop and look at your own work differently. The questions worth asking: What am I making more complicated than it needs to be? What assumption am I accepting without examining? Where am I optimizing the wrong thing? What am I doing only because it has always been done that way?

The best computer science quotes are not really about computers. They are about how to think clearly in the presence of complexity.
