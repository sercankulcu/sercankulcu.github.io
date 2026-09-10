---
title: Anthropic Releases Claude Opus 4.6
date: 2026-02-15
permalink: /posts/2026/02/anthropic-releases-claude-opus-4-6/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Anthropic released Claude Opus 4.6 on February 5, 2026, available through the Claude API at $15 per million input tokens and $75 per million output tokens, with a 200K-token context window in standard usage and a 1M-token context window in beta for enterprise customers with large codebase or document-analysis requirements. Claude Opus 4.6 was positioned as Anthropic's most capable model for agentic tasks — long-running workflows where the model executes sequences of tool calls, code execution, web searches, and file operations across sessions measured in minutes or hours rather than single-turn exchanges.

Improvements reported by Anthropic centered on coding and computer use: the model could navigate large software repositories, identify bugs across multiple interdependent files, write and run tests to verify fixes, and maintain consistent context about project architecture without losing track of constraints established at the start of a session. Computer use — controlling a desktop through screenshots and cursor actions — saw reliability improvements on multi-step tasks such as filling multi-page forms, navigating web applications with complex state, and executing repeated actions without drifting from the original instruction. SWE-bench Verified scores placed Claude Opus 4.6 among the top models for autonomous software engineering tasks.

Alongside the model release, Anthropic published research from its Responsible Scaling Policy (RSP) evaluation process showing that more capable coding models could discover and demonstrate exploitation paths for serious software vulnerabilities in controlled test environments with less human guidance than previous model generations. The research reflected Anthropic's dual-use framing: the same capabilities that make a coding agent valuable for security audits — scanning large codebases for logic errors, chaining vulnerability chains across components — reduce the expertise threshold for offensive security research. Anthropic used these findings to set deployment restrictions on vulnerability-research-adjacent uses and to update safeguards in Claude's system prompt guidelines for API operators.
