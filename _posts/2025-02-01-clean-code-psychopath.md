---
title: 'Clean Code Psychopath'
date: 2025-02-01
permalink: /posts/2025/02/clean-code-psychopath/
tags:
  - software
  - programming
  - clean-code
---

John Woods wrote something that has stayed with me: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." The quote is usually cited as a case for clean code. But there is a darker inversion of the same pressure that I have been thinking about — the developer who becomes so committed to an idea of clean code that the code stops serving the project.

## What the problem looks like

The clean code psychopath is not someone who writes bad code. They often write technically impressive code. The problem is a set of priorities that have become untethered from context.

Names must follow one perfect rule, regardless of whether the resulting name communicates anything clearly in this specific context. Functions must be short — not because long functions are hard to understand here, but because "a function should do one thing" is the rule. Every pattern must match a book. An abstraction that does not exist yet must be invented to avoid two similar lines.

A practical solution — one that works, is readable, and fits the team's existing patterns — becomes unacceptable because it does not conform to the principle. The code review becomes a lecture. The pull request discussion centers on aesthetics rather than correctness or maintainability. The codebase slowly accumulates elaborate structures that solve problems the project does not have.

## Where clean code principles come from

The principles worth defending — meaningful names, short functions, single responsibility, avoiding deep nesting — come from real observations about what makes code maintainable. Robert Martin's *Clean Code* collected and articulated many of them clearly. Martin Fowler's refactoring catalog provides practical techniques for improving messy code. These are genuinely useful.

The problem is not the principles. It is applying them without reading the context.

A 50-line shell script run once a month to process a report has different needs from a payment processing service used by millions of people. A prototype built to test whether an idea is worth pursuing has different needs from code expected to live in production for ten years. A team of two experienced engineers working closely together can tolerate different conventions than a large distributed team with regular turnover.

## The cases where duplication wins

Consider this situation: you have two slightly similar functions. One handles file uploads. The other handles avatar image uploads. They share some logic — validation, error handling, size limits — but not all of it. A clean code adherent may immediately reach for an abstraction that unifies them.

But what happens when the file upload requirements change in a direction the avatar upload does not need? Now you are modifying a shared abstraction that serves two different use cases. The abstraction that felt clean at the start has become a coupling that makes both flows harder to change independently.

Two similar functions, maintained separately, are sometimes easier to evolve than one unified function handling cases that are only superficially alike. The principle "don't repeat yourself" describes a cost. It does not describe the only cost. Abstraction has a cost too.

## Rules as tools

I like clean code principles when they serve the people working in the code. I become concerned when the principle becomes more important than the purpose. A function that is slightly longer than some ideal length but clearly communicates what it does is better than a shorter function that requires three levels of indirection to understand. A name that breaks a naming convention but matches how the domain actually describes the thing is better than a compliant name that confuses everyone.

In 2025, there is an additional dimension: AI-assisted code generation is part of many teams' workflow now. Code that is "clean" in the sense of following stylistic conventions is not automatically easier for a language model to understand or to extend correctly. What matters — for humans and for tools — is whether the intent is clear and the behavior is predictable.

The best code is not the code that looks most principled. It is code that works correctly, can be understood by the next person who needs to change it, can be tested reliably, and fits the actual reality of the project and team. Rules help get there. They are not the destination.
