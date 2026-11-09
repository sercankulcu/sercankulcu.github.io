---
title: 'AI Coding Assistants Are Becoming Part Of The Editor'
date: 2024-03-24
permalink: /posts/2024/03/ai-coding-assistants-are-becoming-part-of-the-editor/
tags:
  - artificial-intelligence
  - programming
  - software
---

GitHub Copilot launched technical preview in June 2021 and became generally available in June 2022. In the roughly two years since, it has gone from curiosity to part of the daily development environment for many teams. By March 2024, GitHub reports over a million paying users and adoption at the majority of Fortune 500 companies. ChatGPT and Claude have expanded the use case beyond inline completion to conversational assistance — asking questions about code, requesting explanations, and generating complete functions in a chat interface. Cursor, a VS Code fork with deeper model integration, has emerged in 2023-2024 as a model for what tight AI-editor integration can look like.

The useful change is not that these tools can write complete programs. In real projects, complete programs are rarely what developers need. The common cases are: one function with a specific signature, one test for a function that already exists, one regular expression that matches a specific format, one SQL migration, or an explanation of what existing code does.

## What they handle well and where they fail

AI assistants are consistently useful for:

- **Boilerplate and scaffolding:** setting up a new class, implementing a standard interface, writing getters and setters. These are mechanical and well-represented in training data.
- **Standard library exploration:** "how do I parse a date in JavaScript", "what is the pandas function for groupby + aggregate". The assistant often gives correct, specific answers faster than documentation search.
- **Test generation:** given a function with known inputs and expected outputs, generating a set of test cases. The tests still need to be read and judged, but the initial draft is fast.

They fail in specific ways that matter:

- **Invented APIs:** a model trained on code will invent plausible-looking function names and parameters that do not exist in the library's actual documentation. This happens most often with libraries that changed API between versions in the training data.
- **Security issues:** SQL injection, insecure deserialization, hard-coded credentials, and missing input validation all appear in generated code. The code is syntactically correct and logically coherent — it just contains the same classes of bugs that appear throughout internet code.
- **Business logic and project context:** the model has no access to the rest of your codebase, your data model, your organizational requirements, or the constraints your team has agreed on. Generated code for "add a user settings page" may be architecturally incompatible with your existing auth system in ways that are invisible to the model.

## The skill shift

Two years of Copilot deployment has made one thing clearer: the developer needs enough knowledge to review the result. A strong programmer can use AI assistance to move faster because they can judge what arrives. A developer with weak fundamentals can now produce code that looks professional but contains errors they cannot identify, because the code arrives with confidence and correct formatting.

This shifts which skill matters most. Writing code from scratch has become cheaper. Reading code carefully, understanding what it actually does rather than what it claims to do, and making architectural decisions about what belongs in a system — these have not become cheaper.

The learning concern is real. Struggling with a problem — trying an approach, seeing why it fails, revising — creates a kind of understanding that receiving an answer does not. A student who asks the assistant for the solution before attempting the problem has skipped the part that builds judgment. Used differently, the same tool can explain a concept in smaller steps or show a simplified example without giving away the answer. The tool does not determine the outcome; how it is used does.

The direction the technology is heading is toward invisibility. Autocomplete once felt like a feature worth noticing; now it is just part of typing. AI assistance in editors is likely to follow the same path — it will become infrastructure rather than a distinct tool, simply another layer that was always there. When that happens, the question of whether to use it will dissolve, and the question of how to judge what it produces will be all that remains.
