---
title: 'What AI Agents Still Get Wrong'
date: 2026-05-17
permalink: /posts/2026/05/what-ai-agents-still-get-wrong/
tags:
  - artificial-intelligence
  - agents
  - software
---

AI agents have moved from demo to daily use over the past year. The pattern is familiar: an agent receives a goal, plans steps, calls tools — reading files, executing code, querying APIs, sending messages — and continues until the task is complete or it encounters something it cannot handle. The step from "answer a question" to "carry out a task with multiple steps and side effects" seemed like a natural progression. The experience of actually using these systems has revealed where the progression is less natural than it looked.

## The compounding error problem

A single-turn language model response that is wrong costs the user a moment of confusion and a follow-up question. An agent that starts with a misunderstanding and takes forty steps before a human checks the result has compounded that misunderstanding across every subsequent decision.

The mechanism is specific: agents build context from their own previous outputs. Step 3 depends on what step 2 produced. Step 10 depends on the accumulated state of everything before it. If step 2 contained a subtle error — the wrong interpretation of a file name, an incorrect assumption about which API endpoint to call — then steps 3 through 10 may all be internally consistent with step 2 while being collectively wrong relative to the actual goal.

This is different from a wrong answer. It is wrong confidence, compounded over time, producing a result that looks like successful execution.

## Tool hallucination and the verification gap

Agents have access to tools, but their knowledge of what those tools do comes from training data and tool descriptions — not from real-time inspection of the tool's current behavior. An agent can call an API endpoint that has changed its response format, interpret the new response as if it were the old one, and continue building on incorrect data without any error signal.

In testing, agents regularly call tools with plausible-sounding but incorrect parameters. They attempt to use tools that do not exist. They interpret an error response as partial success and continue. The verification that a human would apply automatically — "does this response look right?" — requires explicit design in agent systems. Without it, agents proceed confidently through incorrect states.

## The irreversibility asymmetry

Software that reads information and fails silently can be restarted. Software that acts — that sends an email, commits code to a repository, deletes a record, submits a form — creates state in the world that is not recoverable by rerunning the agent.

The most dangerous agent tasks are those where the action itself provides no feedback that anything was wrong. An agent that books a meeting, sends a message, or modifies database records based on an early misunderstanding may complete the task successfully in the narrow sense that the operations executed while having done something the user did not intend.

This asymmetry argues for designing agent systems with explicit reversibility: prefer operations that can be undone, add confirmation steps before irreversible actions, and log what happened in enough detail to reconstruct the sequence of decisions.

## What calibrated autonomy looks like

The interesting design space is not "agent or not agent" but how much autonomy is appropriate for a given task and a given error cost.

Some tasks are genuinely good candidates for full delegation: generating a first draft, searching a large document set, reformatting data, running a test suite. Mistakes in these tasks are cheap — a wrong draft is still a draft, a missed search result can be recovered, a test failure stops the process.

Other tasks warrant intervention points: before sending anything externally, before modifying files that are not easily restored, before making any decision that depends on an ambiguous requirement the agent has not verified.

The question worth asking for any agent task is not "can the model do this?" but "at what point in this task does an error become expensive, and is there a checkpoint before that point?" Answering that question well is the difference between a useful agent and a confident one that causes problems at the worst possible time.
