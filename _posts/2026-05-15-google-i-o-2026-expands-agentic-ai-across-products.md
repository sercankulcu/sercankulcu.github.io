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

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
