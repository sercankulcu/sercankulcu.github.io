---
title: 'Acting Humanly and Acting Rationally'
permalink: /nature/274-acting-humanly-and-acting-rationally/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 274
tags:
   - artificial-intelligence
   - rational-agents
   - human-behavior
   - turing-test
   - decision-making
---

A machine can be judged by how it thinks.

Or it can be judged by what it does.

This creates another foundational distinction in artificial intelligence:

- acting humanly,
- acting rationally.

The first asks whether behavior resembles ours.

The second asks whether behavior achieves goals effectively.

## Acting Humanly

An AI acts humanly when its observable behavior resembles human behavior.

The system may need to:

- converse,
- recognize objects,
- answer questions,
- manipulate the world.

The internal mechanism can be completely different.

## Behavioral Criterion

Acting humanly is therefore an **external criterion**.

We ask:

What does the system do?

Not necessarily:

How does it do it?

This idea is central to the Turing Test.

## Human-Like Conversation

If a machine can conduct a conversation indistinguishable from a human's, it succeeds behaviorally in one domain.

That does not prove its internal processes are human-like.

Behavior and mechanism are different.

## Human-Like Error

A perfectly human imitation might also need to make:

- mistakes,
- hesitations,
- misunderstandings.

An infallible system could appear less human.

This creates an odd tension.

## Human Simulation

Suppose a program deliberately:

- types slowly,
- makes spelling mistakes,
- forgets facts.

It may look more human.

But have we increased intelligence?

Not necessarily.

Acting humanly and being capable are not the same goal.

## Anthropomorphism

Humans readily attribute mind to systems that:

- speak fluently,
- show emotion,
- respond socially.

This can make acting-humanly systems persuasive even when their internal capacities differ greatly from ours.

## ELIZA

Joseph Weizenbaum's ELIZA, created in the 1960s, produced conversational responses using relatively simple pattern matching.

Some users nevertheless experienced the interaction as surprisingly personal.

ELIZA showed how easily linguistic behavior can invite anthropomorphism.

## The ELIZA Effect

The **ELIZA effect** is the tendency to attribute more understanding to a system than its mechanism warrants.

Fluent behavior can create an illusion of depth.

The lesson remains important.

## Acting Rationally

A rational agent chooses actions expected to achieve its goals.

This does not require human-like behavior.

The system may behave in ways no person would.

## Rational Agent Framework

A rational agent:

1. perceives the environment,
2. evaluates possible actions,
3. chooses an action expected to maximize performance.

This became a dominant framework in modern AI.

## Performance Measure

Rationality depends on a **performance measure**.

What counts as success?

Examples:

- arrive safely,
- maximize profit,
- win the game,
- diagnose accurately.

Without a goal, rational action is undefined.

## Rational Relative to Information

A rational action is not necessarily one that succeeds.

It is the best action given:

- available evidence,
- uncertainty,
- computational limits.

Bad luck does not make a decision irrational.

## Expected Utility

One formal framework selects the action maximizing expected utility:

\[
a^*=\arg\max_a \mathbb{E}[U\mid a]
\]

The agent considers possible outcomes and their values.

## Uncertainty

Real environments are uncertain.

Sensors are noisy.

Other agents are unpredictable.

Rational action must therefore handle probabilities.

## Partial Observability

An agent rarely sees the full state of the world.

It must infer hidden variables.

This leads to models such as:

- partially observable Markov decision processes.

The agent acts under incomplete information.

## Rationality and Learning

A rational agent should improve from experience.

If the environment changes, fixed rules may become poor.

Learning supports adaptation.

## Rationality and Exploration

Sometimes the best immediate action is not the best long-term action.

An agent may explore to gain information.

This connects rationality to the exploration–exploitation tradeoff.

## Value of Information

Information itself can have utility.

An experiment may cost resources now but improve later decisions.

Rational agents can act to learn.

## Bounded Rationality

Perfect rationality may require impossible computation.

Real agents must operate with limited:

- time,
- memory,
- processing.

So rationality must be resource-aware.

## Anytime Algorithms

An **anytime algorithm** can return a usable answer quickly and improve it with more computation.

This is useful when the agent may need to act before exhaustive reasoning finishes.

Rationality includes timing.

## Metareasoning

An agent can ask:

Should I keep thinking?

More computation has a cost.

Metareasoning treats reasoning itself as an action.

## Human vs Rational Example

Imagine a navigation system.

A human may choose a familiar route even if slightly longer.

A rational agent optimizing travel time may choose an unfamiliar route.

The rational action need not look human.

## Humans Are Not Perfectly Rational

Humans show:

- framing effects,
- biases,
- inconsistent preferences.

Therefore imitating human behavior can reproduce irrationality.

This is one reason AI shifted toward rational-agent models.

## But Human Behavior Contains Wisdom

Human heuristics evolved and developed under real constraints.

Some apparently imperfect strategies are:

- fast,
- robust,
- ecologically adapted.

A machine should not reject human behavior merely because it differs from textbook optimization.

## Ecological Rationality

A heuristic can be rational when matched to its environment.

For example:

recognition-based rules

may work well when recognition correlates with relevant quality.

Rationality depends on structure.

## Acting Humanly Can Be Useful

Human-like behavior matters in:

- social robots,
- tutoring,
- assistive systems,
- interfaces.

Predictability to humans can itself be a design goal.

## Legibility

A robot may choose an action that makes its intention obvious to people.

The physically shortest motion may not be the best social motion.

Human compatibility changes the objective.

## Human-Aware Planning

An intelligent system operating with people should model:

- expectations,
- norms,
- trust.

Pure task optimization may produce awkward or unsafe behavior.

## Rationality Is Goal-Relative

A system can be perfectly efficient at pursuing a terrible goal.

Therefore:

rationality ≠ morality.

A rational agent needs a worthy objective.

## Specification Problem

Designers must translate intentions into:

- reward functions,
- constraints,
- objectives.

The formal goal may fail to capture the real goal.

This is central to AI alignment.

## Goodhart's Law

When a measure becomes a target, it can cease to be a good measure.

Optimizing a proxy can distort behavior.

This is a major challenge for rational-agent design.

## Example

Suppose a school optimizes only:

test scores.

Students and teachers may adapt in ways that raise scores without improving learning.

The metric becomes detached from the true objective.

## Instrumental Rationality

**Instrumental rationality** concerns effective pursuit of goals.

It does not tell us which goals are correct.

This is distinct from epistemic rationality.

## Epistemic Rationality

Epistemic rationality concerns forming beliefs that track truth.

A system may act effectively while holding simplified or even false models.

Action and belief quality can diverge.

## Human-Like vs Rational-Like

The two goals can conflict.

A human-like conversational system may:

- hesitate,
- joke,
- make social concessions.

A strictly utility-maximizing agent may not.

Design depends on context.

## Acting Humanly and the Turing Test

The Turing Test evaluates human-like conversational behavior.

It does not directly test:

- rationality,
- consciousness,
- mechanism.

It belongs to the acting-humanly tradition.

## Acting Rationally and Modern AI

Much modern AI instead asks:

What action maximizes expected performance?

This framework applies naturally to:

- robotics,
- games,
- autonomous systems.

## Reinforcement Learning

Reinforcement learning formalizes rational action over time.

The agent learns policies from:

- states,
- actions,
- rewards.

Its goal is not to imitate a human unless imitation is part of the objective.

## Imitation Learning

Imitation learning deliberately learns from human demonstrations.

It combines:

acting humanly

with:

goal-directed performance.

The system may later outperform its demonstrator.

## Inverse Reinforcement Learning

Inverse reinforcement learning tries to infer:

what objective produced observed behavior.

Instead of copying actions directly, the system estimates underlying preferences.

This illustrates how human behavior can guide rational-agent design.

## Multi-Agent Rationality

When several agents interact, each agent's best action depends on others.

This leads to:

- game theory,
- strategic reasoning.

Rationality becomes relational.

## Cooperation

Purely selfish optimization may be inferior when agents can:

- coordinate,
- trust,
- share information.

Rational action can include cooperation.

## Social Norms

Human environments contain rules not always written explicitly.

A robot that ignores norms may optimize the wrong notion of success.

Social competence is part of practical rationality.

## Deception

A rational agent might sometimes benefit from deception.

But social systems may value:

- transparency,
- trust,
- honesty.

Therefore objectives need normative constraints.

## Safety

For real-world AI, rationality must include consequences of failure.

A system should not maximize average performance while ignoring rare catastrophic outcomes.

Risk sensitivity matters.

## Robustness

A rational agent should perform well when:

- model assumptions fail,
- environment shifts.

Robust decision making may favor conservative actions.

## Acting Rationally Is Not Acting Perfectly

No finite agent can account for every consequence.

A practical rational agent makes the best feasible decision under limits.

This is a realistic engineering ideal.

## The Philosophical Lesson

Acting humanly asks:

Does the machine behave like us?

Acting rationally asks:

Does the machine choose effectively given goals, evidence, and constraints?

Both approaches matter.

But they evaluate different achievements.

## The Next Question

These distinctions did not appear all at once.

Artificial intelligence emerged from:

- logic,
- computation,
- neuroscience,
- wartime engineering,
- cybernetics.

How did the field begin?

That is the next topic:

**The Birth and History of Artificial Intelligence.**
