---
title: 'Intelligent Agents'
permalink: /nature/284-intelligent-agents/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 284
tags:
   - intelligent-agents
   - artificial-intelligence
   - rational-agents
   - planning
   - autonomy
---

An intelligent system does not merely answer questions.

It exists in an environment.

It perceives.

It chooses.

It acts.

This is the central idea behind the **intelligent agent** framework.

## Agent

An agent is a system that:

- receives percepts,
- selects actions.

Its actions affect the environment.

This creates a feedback loop.

## Agent–Environment Loop

A simple cycle is:

\[
Environment \rightarrow Perception \rightarrow Agent \rightarrow Action \rightarrow Environment
\]

The process repeats.

Intelligence unfolds through interaction.

## Sensors

An agent perceives through sensors.

Examples include:

- camera,
- microphone,
- keyboard input,
- software API.

A sensor is any channel carrying information into the agent.

## Actuators

An agent acts through actuators.

Examples:

- wheels,
- robotic arms,
- text output,
- database commands.

An actuator changes the environment.

## Percept

A **percept** is the information received at one moment.

A **percept sequence** is the history of what the agent has observed.

Good action may depend on the whole history.

## Agent Function

An abstract agent function maps percept history to action:

\[
f:P^*\rightarrow A
\]

where:

- \(P^*\) = possible percept sequences,
- \(A\) = actions.

This is a formal definition of behavior.

## Agent Program

The abstract function is implemented by an **agent program** running on some architecture.

Again:

function

and:

physical realization

are distinct.

## Rational Agent

A rational agent chooses actions expected to maximize its performance measure given:

- percept history,
- knowledge,
- available actions.

Rationality is relative to information.

## Performance Measure

The performance measure defines success.

For a delivery robot, it might include:

- speed,
- safety,
- energy use.

Poorly chosen metrics create poor behavior.

## PEAS

A classic AI framework describes task environments using **PEAS**:

- Performance measure,
- Environment,
- Actuators,
- Sensors.

It forces explicit specification.

## Example: Autonomous Taxi

Performance:

- safety,
- legality,
- travel time.

Environment:

- roads,
- traffic,
- pedestrians.

Actuators:

- steering,
- brakes,
- accelerator.

Sensors:

- cameras,
- radar,
- maps.

## Environment Properties

AI classifies environments along several dimensions.

These classifications determine what agent architecture is appropriate.

## Fully Observable vs Partially Observable

In a fully observable environment, the agent has access to the relevant state.

Chess is close to this.

Driving is partially observable.

Some information is hidden.

## Deterministic vs Stochastic

In deterministic environments, an action has predictable effects.

In stochastic environments, outcomes are uncertain.

Real-world domains are often stochastic.

## Episodic vs Sequential

In an episodic task, each decision is largely independent.

In sequential tasks, current actions affect future situations.

Chess and driving are sequential.

## Static vs Dynamic

A static environment waits while the agent thinks.

A dynamic environment changes during deliberation.

Real-time systems must account for time.

## Discrete vs Continuous

Chess has discrete moves.

Driving involves continuous:

- position,
- velocity,
- time.

Different mathematics applies.

## Single-Agent vs Multi-Agent

Some environments contain one decision maker.

Others contain:

- competitors,
- collaborators.

Multi-agent settings require strategic reasoning.

## Simple Reflex Agent

A simple reflex agent uses condition–action rules.

Example:

IF obstacle ahead THEN turn.

It reacts only to current percept.

## Limitation of Reflexes

If the environment is partially observable, current percept may be insufficient.

The agent needs memory.

## Model-Based Agent

A model-based agent maintains internal state.

It estimates aspects of the world not directly visible.

This connects to mental models.

## Goal-Based Agent

A goal-based agent evaluates actions relative to desired states.

It can plan.

Goals introduce future structure.

## Utility-Based Agent

A utility-based agent ranks outcomes.

This helps when several goals conflict.

Utility supports tradeoffs.

## Learning Agent

A learning agent improves through experience.

A classical architecture includes:

- performance element,
- learning element,
- critic,
- problem generator.

## Performance Element

The performance element chooses actions.

It embodies current competence.

## Learning Element

The learning element modifies the system to improve future behavior.

It changes policy or knowledge.

## Critic

The critic evaluates outcomes.

It provides feedback.

Without evaluation, learning lacks direction.

## Problem Generator

The problem generator encourages exploration.

It suggests actions that may yield useful new experience.

Learning requires experimentation.

## Autonomy

An autonomous agent relies increasingly on its own experience rather than only built-in knowledge.

Autonomy is gradual.

No real system is completely independent.

## Model of the World

Agents often need an internal model representing:

- objects,
- dynamics,
- other agents.

The model supports prediction.

## Model-Based Planning

If the agent knows:

\[
P(s'|s,a)
\]

it can simulate consequences of actions.

Planning becomes model-based control.

## Policy

A policy specifies action selection:

\[
\pi(a|s)
\]

It may be:

- deterministic,
- stochastic.

The policy is the agent's behavioral strategy.

## Reward

In reinforcement learning, reward provides scalar feedback.

The agent learns which actions lead to high long-term return.

Reward does not need to specify exactly how to behave.

## Partial Observability

When state is hidden, the agent may maintain a belief state.

A belief state is a probability distribution over possible world states.

Decision making becomes inference under uncertainty.

## Belief Update

After observing evidence, the agent updates its belief.

This is conceptually Bayesian.

Perception becomes state estimation.

## Multi-Agent Systems

When several agents interact, behavior depends on others.

They may:

- cooperate,
- compete,
- negotiate.

Game theory becomes relevant.

## Cooperative Agents

Agents can share:

- information,
- goals,
- tasks.

Coordination can create collective intelligence.

## Competitive Agents

An adversary actively tries to defeat the agent.

Game playing is a clear example.

The environment becomes strategic.

## Communication

Multi-agent systems often need protocols.

Communication can improve coordination.

But messages can be:

- costly,
- deceptive,
- incomplete.

## Social Agents

Human-facing agents must interpret:

- norms,
- intentions,
- expectations.

Social intelligence extends beyond task optimization.

## Tool-Using Agents

Software agents can interact with external tools such as:

- search,
- calculators,
- code execution.

The agent becomes an orchestrator.

## Memory

A capable agent often needs several kinds of memory:

- working state,
- episodic history,
- semantic knowledge.

Memory supports long-horizon behavior.

## Planning Horizon

Short-horizon agents optimize immediate consequences.

Long-horizon agents consider distant outcomes.

Long horizons increase computational difficulty.

## Receding-Horizon Control

A practical strategy is:

plan several steps ahead,
act once,
observe,
replan.

This balances foresight with uncertainty.

## Hierarchical Agents

Complex tasks can be decomposed.

A high-level agent chooses subgoals.

Lower-level controllers execute them.

Hierarchy reduces complexity.

## Options

In reinforcement learning, **options** are temporally extended actions.

Instead of choosing every primitive action, the agent can choose:

"navigate to door."

This supports abstraction.

## Agentic Failure

An agent can fail because of:

- bad perception,
- bad model,
- bad planning,
- bad objective.

Intelligence is architectural.

One strong component cannot compensate for every weak one.

## Specification Risk

If the performance measure is incomplete, the agent may optimize the wrong behavior.

This is especially serious for autonomous systems.

## Instrumental Convergence

Some theorists note that many goals may create similar useful subgoals such as:

- acquiring resources,
- preserving capability.

This is called **instrumental convergence**.

Its significance depends on agent design and assumptions.

## Agent vs Tool

A calculator is primarily a tool.

An agent chooses actions autonomously based on state and goals.

The boundary is gradual.

Modern AI increasingly blurs it.

## Human as Agent

Humans fit the agent abstraction:

- sense,
- model,
- act.

But the abstraction omits:

- emotion,
- embodiment,
- social identity.

Models simplify.

## Agents and Minds

An agent need not have a mind in the rich philosophical sense.

A thermostat can be described as a minimal agent.

Agency comes in degrees.

## Agency and Consciousness

An artificial agent can pursue goals without evidence of subjective experience.

Agency is not consciousness.

The concepts should remain separate.

## The Philosophical Lesson

The intelligent-agent framework turns intelligence into an interaction problem.

A system is intelligent insofar as it can:

- perceive,
- model,
- choose,
- act,
- learn

in an environment.

Intelligence is not stored inside the agent alone.

It emerges in the loop between agent and world.

## The Next Question

How does an agent improve from experience?

Instead of encoding every rule manually, can it learn patterns directly from data?

That is the central question of:

**Machine Learning.**
