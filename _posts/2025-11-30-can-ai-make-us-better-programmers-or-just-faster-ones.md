---
title: 'Can AI Make Us Better Programmers or Just Faster Ones?'
date: 2025-11-30
permalink: /posts/2025/11/can-ai-make-us-better-programmers-or-just-faster-ones/
tags:
  - artificial-intelligence
  - programming
  - software
---

AI tools have made certain parts of programming faster in ways that are hard to argue with. Generating a function from a description, explaining what an error message means, writing test cases for a known interface, translating code between languages — these tasks take a fraction of the time they did two years ago. That efficiency gain is real and significant.

The harder question is whether faster programming produces better programmers, or just faster ones.

## What faster looks like

GitHub's research on Copilot, published in 2022, found that developers using the tool completed tasks roughly 55% faster in controlled experiments. The tasks in those studies were mostly well-defined, scope-limited, and written in languages well-represented in training data. This is consistent with what most developers report: the speedup is sharpest for the mechanical and predictable parts of programming — boilerplate, standard patterns, converting known logic into code.

The slowdown in understanding comes later. Code that arrives quickly — before the problem is fully clear — can look complete before it is. It may solve the stated problem while missing the unstated constraints. A function that handles the happy path correctly but fails silently on unexpected input is not a solution, but it looks like one.

## The calibration problem

AI assistants in 2025 produce plausible code with a uniform tone of confidence regardless of whether the answer is correct or not. This is a calibration problem: the output of a certain AI-generated explanation looks the same whether it is right, subtly wrong, or completely hallucinated. A developer who receives an explanation and accepts it without checking has not learned anything — they have outsourced the thinking to a system that may have given them a false understanding.

The appropriate response is not skepticism of every word, but the habit of verification: can I trace this code myself? Does this explanation match what I already know? Is there a simpler way to confirm this?

## What actually makes programmers better

Better programming means different things depending on context, but most definitions include: the ability to understand a system well enough to change it predictably, the ability to identify when a proposed solution has a flaw, and the ability to explain what something does and why. These are not the parts that AI has made faster.

Reading code carefully — tracing execution, understanding invariants, noticing what is missing — is a skill that has not been automated. Asking "what is the real problem here?" before writing anything is not a skill that AI prompts you to develop. Deciding that a feature should not be built at all requires judgment that does not come from generating it quickly.

The most useful mental model I have found: AI as a tool that amplifies existing direction. A programmer who already asks the right questions can use AI to implement answers faster. A programmer who skips the questions can now produce larger volumes of questionable code more quickly.

For me, the personal standard is simple: if I cannot explain the main idea of a piece of AI-generated code in my own words, I have not finished working on it. The code may be in the repository, but the understanding is not yet mine. That distinction matters when something breaks at 2am and the AI assistant's suggestion does not help.
