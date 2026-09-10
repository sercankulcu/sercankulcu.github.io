---
title: 'Open Source Changed How I Learn'
date: 2008-03-30
permalink: /posts/2008/03/open-source-changed-how-i-learn/
tags:
  - open-source
  - programming
  - learning
---

One of the nicest things about programming is that sometimes we can look inside the thing we use. With a textbook example, the code exists to illustrate a concept and has been cleaned and simplified for that purpose. With open-source software, the code exists to solve a real problem and carries the marks of that: old decisions left in place because changing them is risky, variable names chosen in 2003 that nobody has renamed since, workarounds for bugs in other people's software, patches contributed by people who never met each other.

For a student, seeing this kind of code is important in a way that clean examples cannot be.

## The projects that taught me

In 2008, the open-source landscape is large and accessible in ways it was not a decade ago. The Linux kernel is readable on kernel.org. Apache's web server, which handles the majority of internet traffic, has been publicly available since 1995. Firefox is available through Mozilla's public repository. VLC, which plays almost any media format, is maintained by VideoLAN with public source. These are not toy projects. They are production systems that run on millions of machines.

What they have in common is that they are large, which is exactly what makes them useful as learning material. A project with five files teaches syntax. A project with five thousand files teaches how software actually organizes itself at scale — how modules communicate, how interfaces are defined, how testing is separated from implementation, how build systems manage dependencies.

## How to approach a large codebase

The first time I opened a large source tree, it felt impossible. Too many directories. Names that assumed knowledge I did not have. No obvious place to begin.

The approach that works, I have found, is starting with something you can observe from the outside and following it inward:

- Find a string that appears in the user interface and search the source for it. This leads to the code that generates the output, which leads to the logic behind it.
- Find one function in the documentation and trace every function it calls. Three levels of tracing usually reveals a meaningful slice of how the system works.
- Find a small, recent commit in the version history and read the change. The commit message usually explains why; the diff shows exactly what changed. A small bug fix often reveals more about how the surrounding system works than a lecture could.

The goal is not to understand everything. It is to understand one path through the system. One path, understood clearly, makes the rest less intimidating.

## What open source changes about learning

Books and courses explain concepts in isolation. They show how a hash table works in theory. Open-source code shows what decisions get made when a hash table has to work with threading, or handle a corner case that the textbook never mentions, or remain compatible with code that was written ten years ago for a different purpose.

The code is also reviewable at any point. If something about a function does not make sense, the commit history shows when it was added and why. The mailing list archive shows the discussion that preceded the decision. This context — the reasoning behind the code — is almost never present in a textbook.

Open source also changed what "contributing" can mean early in a learning path. A documentation improvement, a test case, a small bug fix — these are real contributions to software that real people use. The gap between student and contributor is smaller when the project is public and the barrier to participation is low.

None of this is automatic. Public code can still be poor code. Communities can be unwelcoming. Projects can be abandoned mid-development. But the opportunity — to read how experienced programmers actually solved problems, in the actual code they used to solve them — is one of the most direct learning resources a programmer has. It was not always this available.
