---
title: 'Grady Booch, A Pioneer Of Computing Technology'
date: 2021-09-12
permalink: /posts/2021/09/grady-booch-a-pioneer-of-computing-technology/
tags:
  - career
  - software
---

Grady Booch is one of the most influential people in the history of software engineering, but his contributions are sometimes reduced to "he helped create UML," which understates both what he built and what he argued for. I want to give his work more space.

## The Booch method and the problem it addressed

In the late 1980s and early 1990s, object-oriented programming was growing rapidly in adoption, but there was no agreed way to describe OO systems visually. Different researchers used different notations. Rumbaugh's OMT (Object Modeling Technique) had its own diagram vocabulary. Jacobson's Objectory method used use cases as a central concept. Booch's own method had a different set of diagrams and a different emphasis on process.

The Booch method was distinctive in how it organized the development process — iterative, architecture-centered, and focused on the idea that a design should be documented and reviewed before the code commits you to a direction. His book *Object-Oriented Analysis and Design with Applications*, first published in 1991, was one of the first substantial treatments of OO design that went beyond syntax into structure.

## The Three Amigos and UML

In the mid-1990s, Booch, Jacobson, and James Rumbaugh joined Rational Software and began the work of unifying their methods. The result was the Unified Modeling Language, first released in 1996 and standardized by the OMG in 1997.

Each brought a different emphasis:
- **Rumbaugh** contributed OMT's strong data modeling and class diagram notation
- **Jacobson** contributed use case diagrams — the idea of describing behavior from the perspective of actors who interact with a system
- **Booch** contributed the overall architectural perspective and the component and deployment diagram concepts

UML gave the industry a common visual vocabulary: class diagrams showing structure, sequence diagrams showing interactions over time, state diagrams showing behavior, component diagrams showing physical architecture. For teams building large systems, having a shared notation meant that a developer in one country could read a diagram produced by a team in another.

A class diagram in UML might look like this in text form:

```
┌─────────────────┐         ┌─────────────────┐
│    Order        │         │   Customer      │
├─────────────────┤  places │─────────────────┤
│ - id: int       │◄────────│ - name: String  │
│ - date: Date    │         │ - email: String │
├─────────────────┤         ├─────────────────┤
│ + total(): int  │         │ + orders(): List│
└─────────────────┘         └─────────────────┘
```

This conveys the relationship between Order and Customer — that a Customer places Orders, and the attributes and methods of each — without a line of code.

## The argument about modeling that still matters

UML's reputation became complicated. In the 2000s, heavyweight processes that mandated extensive UML diagrams before any code was written fell out of favor. The Agile movement reacted against documentation-heavy processes. Some developers concluded that UML was the problem.

Booch was always more nuanced than this. His argument was not "diagram everything before coding." It was that a model is useful when it helps people think together about a design before decisions become expensive to reverse. A sketch on a whiteboard that helps two engineers agree on the structure of a module before writing it is a model. The question is not whether to model but which representations help at which stage.

I think this argument was largely correct and was somewhat lost in the reaction against heavyweight process. Informal models — architecture sketches, data flow diagrams, sequence diagrams for complex interactions — remain genuinely useful even in teams that would never identify as UML users.

## His larger argument about software

Beyond UML, Booch's sustained contribution is an argument about software architecture and the long-term cost of complexity. His writing returns repeatedly to the idea that software is not only made to run — it is made to be understood, maintained, and changed by people over time.

A system that works but that nobody on the team can confidently describe is in a precarious position. The next change is more likely to introduce bugs. The next person to join the team will be slower to contribute. Architectural decisions that were reasonable three years ago may now be constraints that nobody knows how to change because nobody fully understands them.

Making software understandable — which is not the same as making it simple — is a deliberate design goal that Booch argued for throughout his career. In 2021, as systems grow larger and teams turn over faster, that argument has not aged at all.
