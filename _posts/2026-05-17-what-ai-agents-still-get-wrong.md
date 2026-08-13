---
title: 'What AI Agents Still Get Wrong'
date: 2026-05-17
permalink: /posts/2026/05/what-ai-agents-still-get-wrong/
tags:
  - artificial-intelligence
  - agents
  - software
---

AI agents are one of the most discussed ideas in software right now. Instead of asking a model one question and receiving one answer, an agent can plan several steps, use tools, read files, call services, and continue working toward a larger goal.

The demos can be impressive. An agent may inspect a codebase, modify several files, run tests, and correct some of its mistakes. Another may search documents, collect information, and prepare a report. The interaction starts to feel more like delegating a task than using autocomplete.

The weaknesses also become clearer as tasks become longer. A small misunderstanding at the beginning can influence many later steps. Agents can choose the wrong tool, repeat work, lose track of constraints, or confidently complete the wrong task.

This is different from a single bad answer. When software can act, errors have consequences. Writing the wrong paragraph is inconvenient. Deleting the wrong file or sending the wrong message is a different category of failure.

Good agent systems therefore need boundaries, permissions, checkpoints, and ways to verify results. Human review remains especially important before irreversible actions.

I think the interesting future is not complete autonomy. It is adjustable autonomy. Some tasks can be delegated completely because mistakes are cheap and easy to detect. Other tasks should stop and ask before every important action.

The question "Can the model do this?" is becoming less useful.

A better question is, "How much freedom should we give it before checking?"
