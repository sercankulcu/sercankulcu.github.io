---
title: 'How To Be A Good Software Developer'
date: 2016-08-14
permalink: /posts/2016/08/how-to-be-a-good-software-developer/
tags:
  - career
  - productivity
  - self-improvement
---

Becoming a good software developer is not only about learning more programming languages. Languages matter. Tools matter. Frameworks matter. But after spending enough time around software, I think the deeper skills are more stable and harder to replace.

## Build on fundamentals

Data structures, algorithms, databases, operating systems, and networking may not appear by name in every task, but they shape how you think about problems. When I first tried to understand why a query was slow, knowing about index lookups made the answer obvious. When a thread-safety bug appeared in production, knowing what shared mutable state meant helped me find the cause quickly. These concepts transfer. Specific frameworks come and go.

In 2016, JavaScript is everywhere and new frameworks appear faster than many developers can evaluate them. React, Angular, Ember, Backbone — each one promises to be the right way to build user interfaces. Developers who understand the underlying DOM, event loop, and state management have a real advantage. They can learn a new framework in days rather than weeks because they already know what problem it is solving.

## Practice by building real things

Reading is useful. Courses are useful. But programming is learned by programming. The projects that taught me the most were the ones where I had no idea how to start.

Build something you actually want to use. Keep it small enough to finish but real enough to break. When it breaks — and it will break — the debugging process teaches you more than any clean exercise.

Open-source code is also worth reading. Not every line, but enough to see how experienced developers structure a project, name things, and handle errors. The difference between a toy project and production code often shows up in the parts nobody writes tutorials about: configuration, logging, deployment, edge cases.

## Write code for the next person

Clever code can feel satisfying to write. But software usually lives longer than we expect, and the next person reading it may be you, six months later, with no memory of what you were thinking.

Compare these two approaches to the same logic:

```java
// Clever
return items.stream().filter(i -> i.v > 0).mapToInt(i -> i.v).sum();

// Clear
return items.stream()
    .filter(item -> item.getValue() > 0)
    .mapToInt(Item::getValue)
    .sum();
```

The second version takes a few more characters. It also takes far less time to understand. Good naming, consistent structure, and short functions cost almost nothing and save real time during review and maintenance.

## Communication is technical work

Most professional software is not written alone. We read other people's code, explain decisions in pull requests, discuss requirements, and sometimes disagree about the right approach.

A technically correct argument that nobody follows is not a solution. Getting comfortable with written communication — clear commit messages, short explanations, honest status updates — is part of the craft, not separate from it.

## Invest in reliability habits

Testing, version control, documentation, and careful debugging are not the exciting parts of software development. They are also the parts that prevent the 2 AM incident.

Checking code into version control before a risky change takes thirty seconds. Having a test that catches a regression before it reaches users is worth more than the time it took to write. These habits compound. A codebase maintained with discipline for two years is much easier to work in than one treated carelessly.

## Keep learning without chasing everything

Technology in 2016 changes quickly enough that nobody can follow all of it. New languages, new frameworks, new deployment approaches, new ideas about architecture. Trying to follow everything is exhausting and mostly counterproductive.

The goal is not to know all technologies. The goal is to stay capable of learning the next one. A strong foundation in fundamentals, a habit of building real things, and genuine curiosity about how systems work will carry further than any particular set of tools.

For me, that is what makes software development worth the effort. You are never completely finished, but you are also never starting from zero.
