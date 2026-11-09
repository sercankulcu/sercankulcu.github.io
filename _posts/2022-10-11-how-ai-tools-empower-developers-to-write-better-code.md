---
title: 'How AI Tools Empower Developers To Write Better Code'
date: 2022-10-11
permalink: /posts/2022/10/how-ai-tools-empower-developers-to-write-better-code/
tags:
  - artificial-intelligence
  - career
  - software
---

GitHub Copilot went into technical preview in June 2021. By October 2022, it has been available to the general public for several months, and the reports from developers who use it daily are specific enough to form a clearer picture of what it actually changes.

## What Copilot is doing under the hood

Copilot is built on OpenAI Codex, a model derived from GPT-3 and trained specifically on public code from GitHub repositories — tens of billions of lines across dozens of languages. When you type in a file, Copilot sends context (the file content, the current cursor position, sometimes adjacent files) to the model and displays completions inline.

The model has no understanding of your system. It does not know what your API expects, what your database schema looks like, or what your company's security policies require. What it knows is what appears in your current file and what patterns it has seen in similar-looking code during training.

This distinction matters more than it might seem.

## Three situations where it genuinely helps

**Boilerplate you know how to write but do not want to.** Copilot is excellent at generating the seventh REST endpoint in a project where the first six are already visible. It recognizes the pattern from context and fills it in accurately. The developer reviews the result in seconds rather than writing it in minutes.

**API exploration.** When working with an unfamiliar library, Copilot suggestions often reveal possible method calls and parameter shapes. This is faster than switching to documentation constantly. The suggestions may be wrong about specific method names if the library has changed, but they provide a useful starting point.

**Test case generation.** Given a function and some tests, Copilot often suggests additional test cases that cover edge cases you had not explicitly thought of. The quality varies, but it is a prompt for thinking about coverage.

## Where it fails and why

**Security.** Copilot regularly suggests code with SQL injection vulnerabilities, insecure random number generation, hardcoded secrets, and missing input validation. This is not surprising: a model trained on public GitHub code will reproduce common patterns in public GitHub code, and vulnerable code is extremely common in public repositories. Accepting AI-generated code without security review is genuinely dangerous.

**Business logic and domain knowledge.** If the requirement says "calculate the refund amount according to section 4.2 of the company policy," Copilot cannot help. The model has no access to your policy document. It will produce code that looks like it handles refunds, but whether it handles yours correctly is entirely up to you to verify.

**API version drift.** Copilot's training data has a cutoff. Libraries evolve. The suggested usage of a library method may be from a version that is no longer current. This is especially common with rapidly evolving ecosystems like cloud SDKs and JavaScript frameworks.

## The useful mental model

Think of Copilot as a very fast pair-programmer who has read an enormous amount of code but has never worked in your specific codebase or domain. They produce first drafts quickly. Those first drafts need review — not a cursory glance, but the same kind of reading you would apply to any unfamiliar code.

The useful habit is not "is this suggestion correct?" but rather "under what conditions would this suggestion be wrong?" A good suggestion is one where the failure modes are obvious, the edge cases are handled, and the intent is clear. A dangerous suggestion is one that looks correct but embeds an assumption about your system that the model could not actually have.

## The learning question

For students, AI coding assistance creates a real tension. A student who asks Copilot for a solution to a homework problem gets working code. The code may be correct. The student may have learned nothing about why it works.

The ability to generate code and the ability to evaluate code are different skills. The second is more important than it has ever been, and it cannot be developed by accepting suggestions without understanding them.
