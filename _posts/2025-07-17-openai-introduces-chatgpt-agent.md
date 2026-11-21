---
title: OpenAI Introduces ChatGPT Agent
excerpt: "ChatGPT Agent combined browsing, code execution and files into one stateful workflow; how OpenAI handled reliability and prompt-injection risk."
date: 2025-07-17
permalink: /posts/2025/07/openai-introduces-chatgpt-agent/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

OpenAI launched ChatGPT Agent on July 17, 2025, combining Operator's web interaction, deep research's synthesis and ChatGPT's conversational ability with a set of tools — visual and text-based web browsers, a terminal, direct API access and connectors such as Gmail and GitHub — into a product designed to complete multi-step tasks with minimal user prompting per step. Unlike the earlier Operator (launched January 2025 for browser-only tasks) or Code Interpreter (launched in 2023 for data analysis in a stateless sandbox), ChatGPT Agent maintained state across a full session: it could browse the web, download a CSV file, write a Python script to process it, debug an error in the script, generate a chart, and return the result in one continuous workflow without the user re-explaining context between steps.

The engineering challenge in agentic systems is reliability across long action sequences. A model generating a single response can recover from a flawed sentence by simply producing the next one correctly; an agent executing tool calls accumulates errors — a misread webpage leads to a wrong API call, which leads to incorrect data, which corrupts the final output. OpenAI addressed this with confirmation requests before consequential actions such as purchases, a Watch Mode that requires active supervision for tasks like sending emails, and a takeover mode in which the user logs in to sites personally.

ChatGPT Agent launched to ChatGPT Pro subscribers ($200/month) in July 2025 and rolled out to Plus ($20/month) and Team users over the following days. Prompt injection — malicious content on webpages or in documents designed to redirect the agent away from its original instruction — became a recognized adversarial attack class as browser-using agents became widely deployed. OpenAI said it trained and tested the agent to resist such attacks and used monitoring and confirmation requirements to limit the damage, acknowledging that capability delegation to AI systems introduced accountability and security obligations that purely conversational systems had not required.

**Sources:** [Introducing ChatGPT agent (OpenAI)](https://openai.com/index/introducing-chatgpt-agent/)
