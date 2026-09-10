---
title: "Never Use a Floating-Point Loop Counter"
date: 2010-05-16
permalink: /posts/2010/05/never-use-a-floating-point-loop-counter/
tags:
   - programming
   - engineering
   - university
   - memories
   - debugging
---

There are programming mistakes you make once and remember forever. For me, one of them involved a `for` loop and a floating-point variable. Years ago, I wrote a very simple warning: do not use `double` or `float` as the loop variable, otherwise arithmetic may not behave the way you expect, and you may find yourself stuck halfway through the problem. The exact wording was a little dramatic. The lesson was not.

Computers have a talent for taking perfectly reasonable human assumptions and turning them into bugs. To us, numbers look simple: 0.1 is 0.1, 0.2 is 0.2, add them, compare them, continue — what could possibly go wrong? Quite a lot, apparently. When you first learn programming, numbers often feel interchangeable: an integer is a number, a float is a number, a double is a number with more room. At the beginning, the differences can feel like implementation details. Then one day a loop does not terminate when you expect it to, or a comparison fails, or a value that should be exactly equal to another value is only almost equal. That is when the abstraction cracks. You discover that the computer is not storing "the number" in the philosophical sense — it is storing a representation. That distinction matters, a lot.

This is one of the first moments in programming where mathematical intuition and machine behavior stop being the same thing. At school, arithmetic is exact unless the teacher tells you otherwise. In a computer, representation is part of the calculation: some decimal fractions cannot be represented exactly in binary floating point, and the computer stores the nearest available approximation. Usually that approximation is close enough. Sometimes "close enough" is exactly how a bug begins.

Imagine a loop that starts at zero and repeatedly adds a decimal step. The code looks harmless. The intention is obvious. The programmer sees a clean sequence in their head, while the machine sees binary approximations accumulating one step at a time. Eventually the number may not be exactly what the comparison expects, and now the loop that looked like elementary mathematics has become a debugging exercise.

This is the kind of bug that feels insulting. A complicated algorithm failing is understandable — you respect it, there are many moving parts, many places to make a mistake. But when three lines of code refuse to behave, the computer begins to feel personally hostile. You stare at the loop. There is nowhere for the error to hide: initialization, condition, increment. That is it. Still wrong.

The first instinct of a beginner is often to distrust everything except the obvious thing. Maybe the compiler is broken. Maybe the IDE is broken. Maybe the operating system is broken. Maybe there is something strange in memory. The possibility that the number itself is not represented the way you imagined arrives later. Programming is full of these small humiliations. They are useful — every one of them removes a little confidence in intuition and replaces it with a better habit: check, do not assume, print the value, inspect the state, read the documentation, understand the representation.

A good programmer is not someone who never makes wrong assumptions — that person does not exist. A good programmer learns which assumptions are dangerous enough to verify. Floating-point arithmetic belongs high on that list. Comparisons belong there too. So do time calculations, character encodings, array boundaries, concurrency — anything that looks obvious until the machine demonstrates otherwise.

I think this is one reason debugging teaches more than programming itself. Writing code is often an act of confidence: you have an idea, you express it, you expect it to work. Debugging begins when reality refuses the idea. Now you have to replace intention with evidence. What is the value actually? How many times did the loop execute? Which branch was taken? Where did the assumption fail? The machine does not care what you meant. That sentence should probably be printed above every programming laboratory: the machine does not care what you meant. It executes what you wrote, according to rules that existed before your program and will continue existing after it.

There is something almost unfair about this when you are learning. Humans communicate with tolerance — if somebody says something slightly wrong, we often infer the intended meaning. A computer is much less charitable. One character can change everything. One boundary condition, one type, one comparison, one increment — the result can be completely different from what the programmer imagined. At first, this feels like a weakness of computers. Later, you realize it is one of their strengths. Precision forces discipline. A program does not accept "you know what I mean." It requires you to know what you mean.

That is a valuable habit outside programming too. Vague ideas survive easily in conversation. Code has to become concrete: what exactly should happen? Under which condition? How many times? What happens at the boundary? What happens when the value is missing? What happens when the input is larger than expected? What does "equal" really mean here? The innocent `for` loop contains all of these questions in miniature.

That is why small bugs can be memorable — they reveal large principles. A student may forget the exact program, may forget the assignment, may forget the room where they were sitting, but they remember the afternoon a loop refused to stop. Or the first segmentation fault. Or the first time integer division quietly destroyed a calculation. Or the first time an array index went one element too far. These become professional folklore. Every programmer accumulates a private museum of mistakes — some embarrassing, some expensive, some funny only after enough time has passed. But the best ones become rules: do not do this, always check that, never assume this, be careful when you see that pattern.

My old rule was simple: do not use a floating-point value as the loop counter when an integer count will do. Count with integers. Calculate with floating point when you need floating point. Separate the number of iterations from the approximate numeric value. The rule is not universal law — programming rarely gives us rules that simple — but as a default, it is a good way to avoid a class of problems that has annoyed generations of programmers.

What I like most about that old entry is how confidently it compresses the lesson: a few lines, a warning, a small technical scar. That is how practical knowledge often looks. A textbook explains why. Experience says: trust me, don't do that. The best engineers eventually have both — the theory that explains the behavior, and the memory of the night they learned it the hard way.
