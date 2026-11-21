---
title: Anthropic Releases Claude Opus 4.6
excerpt: "Claude Opus 4.6: pricing, context window, agentic coding and tool use, and where it fits among Anthropic's models in February 2026."
date: 2026-02-15
permalink: /posts/2026/02/anthropic-releases-claude-opus-4-6/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Anthropic released Claude Opus 4.6 on February 5, 2026, available through the Claude API at $5 per million input tokens and $25 per million output tokens, with a 200K-token context window in standard usage and a 1M-token context window in beta on the Claude Developer Platform. Claude Opus 4.6 was positioned as Anthropic's most capable model for agentic tasks — long-running workflows where the model executes sequences of tool calls, code execution, web searches, and file operations across sessions measured in minutes or hours rather than single-turn exchanges.

Improvements reported by Anthropic centered on coding and computer use: the model could navigate large software repositories, identify bugs across multiple interdependent files, write and run tests to verify fixes, and maintain consistent context about project architecture without losing track of constraints established at the start of a session. Computer use — controlling a desktop through screenshots and cursor actions — saw reliability improvements on multi-step tasks such as filling multi-page forms, navigating web applications with complex state, and executing repeated actions without drifting from the original instruction. Anthropic reported the highest score on Terminal-Bench 2.0 and a SWE-bench Verified score of about 81 percent.

Alongside the model release, Anthropic said Claude Opus 4.6 showed enhanced cybersecurity abilities and developed six new cybersecurity probes to track them. This reflected Anthropic's dual-use framing: the same capabilities that make a coding agent valuable for security audits — scanning large codebases for logic errors, chaining vulnerability chains across components — reduce the expertise threshold for offensive security research.

**Sources:** [Introducing Claude Opus 4.6 (Anthropic)](https://www.anthropic.com/news/claude-opus-4-6)
