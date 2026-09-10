---
title: Google I-O 2026 Expands Agentic AI Across Products
date: 2026-05-15
permalink: /posts/2026/05/google-i-o-2026-expands-agentic-ai-across-products/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Google I/O 2026 ran May 19–20 in Mountain View, with Sundar Pichai's keynote focused almost entirely on agentic AI applications. Google announced Gemini 3.5 Flash — a lightweight, low-latency model optimized for real-time interaction — and Gemini Omni, positioned as a model that could natively generate, edit, and reason across text, images, audio, video, and code in a single model pass rather than routing to separate specialist models for each modality. Gemini Omni was available initially to Gemini Advanced subscribers and through Vertex AI.

Google expanded Project Mariner — its web-browsing agent — from an experimental feature into a beta available to Gemini app users, enabling multi-step tasks such as booking travel, completing purchase flows, filling government forms, and researching comparative information across multiple websites. Antigravity, Google's agent-first development environment (integrated into Google Cloud and IDEs), added real-time multi-agent coordination: a user could define a workflow involving a research agent, a code-generation agent, and a testing agent operating in parallel on different subtasks, with results merged by an orchestrator agent. Google Workspace added agentic features to Gmail (drafting and sending follow-up sequences based on email threads), Drive (automatically organizing and summarizing new files), and Calendar (scheduling across multiple participant availability windows using natural-language constraints).

Agentic AI introduced different engineering requirements from conversational AI: a model controlling browser sessions or writing files needed persistent session state across many tool calls, error recovery when a webpage returned unexpected content, and explicit checkpoints where the user could review and approve consequential actions before they were taken. Google announced standardized agent permission scopes — "can read but not write," "can purchase up to $X," "can only act within this folder" — that developers could configure per agent deployment. The I/O sessions addressed prompt injection (malicious content on webpages instructing the agent to take unauthorized actions) as a primary security concern for browser-using agents.
