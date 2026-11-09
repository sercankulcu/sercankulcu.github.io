---
title: 'What Makes a Good Programming Assignment?'
date: 2025-09-27
permalink: /posts/2025/09/what-makes-a-good-programming-assignment/
tags:
  - teaching
  - programming
  - education
---

A programming assignment looks simple to describe: write a program that does something, test it, submit it. But the difference between an assignment that produces genuine learning and one that produces submitted code is significant, and it is mostly in the design.

## Start with the learning goal

The first question is always: what should the student understand after completing this task? The answer should name something specific — not "practice programming" but "understand how recursion unfolds by tracing call and return," or "learn to choose a data structure based on access pattern." The assignment is a delivery mechanism for that understanding; every design decision should serve it.

An assignment designed around loops should have a problem where loops are the natural solution, not where recursion would be cleaner. An assignment designed to teach hash tables should present a problem where lookup time matters, not one where a list would work equally well. If the student can complete the assignment correctly without ever confronting the intended concept, the design has failed.

## Scope discipline

Assignments that seem thorough by being large often produce the opposite of thorough learning. When a "data structures" assignment also requires file parsing, a menu loop, error handling for invalid input, a specific output format, and class structure, students spend most of their time fighting requirements that are unrelated to data structures. The cognitive load of managing a wide specification prevents deep engagement with the central concept.

A better assignment is narrow in scope and rich at the center. Make the input simple (a list in the source file, or a tiny format). Remove the menu. Specify output precisely. Focus the available student time on the one thing that matters.

## A small story makes a concept tangible

Abstract problems are harder to enter than concrete ones. A queue is easier to work with when the problem describes people waiting at a service desk and the student sees the behavior they are implementing. A stack becomes more natural when it is framed around browser history or undo operations. The story does not need to be long — a sentence or two — but it gives the data structure a visible role instead of an abstract definition.

## Specification clarity at the start

The first few minutes after reading an assignment description determine whether a student feels oriented or confused. Confusion at the start tends to compound: students make design decisions based on misunderstandings and spend time building the wrong thing.

A concrete worked example — here is input, here is the expected output, here is why — costs little to write and significantly reduces misunderstandings. A precise description of edge cases (what happens with an empty input? what is the maximum size?) removes categories of ambiguity that students otherwise have to resolve through guessing.

At the same time, the specification should not prescribe every implementation detail. Which function to write, how to decompose the problem, what to name variables — leaving these open is how students develop design judgment rather than transcription ability.

## Designing for AI

By September 2025, standard algorithmic problems with known solutions can be generated correctly by AI assistants in seconds. An assignment where "implement insertion sort" is the complete instruction will produce code that students cannot explain when asked. This is not a reason to ban AI — it is a reason to design assignments where the submission of working code is a byproduct of understanding rather than the goal itself.

Assignments that require explanation of design choices, debugging an existing buggy implementation, comparing two approaches and justifying a preference, or extending a solution to handle a new case — these require the student to engage with the code rather than produce it. The submitted program is evidence of reasoning, not a substitute for it.

The most satisfying outcome of an assignment, for a teacher, is a student who adds something that was not required. An extra test case that reveals a subtle edge condition. An optimization that the specification did not ask for. A note in a comment explaining why a particular approach was chosen. These are not frequent, and they cannot be forced. But they are the moment when an assignment stops being homework and becomes, briefly, the student's own problem to solve.
