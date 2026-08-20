---
title: 'Search, Problem Solving, and Planning'
permalink: /nature/278-search-problem-solving-and-planning/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 278
tags:
   - search
   - problem-solving
   - planning
   - heuristics
   - artificial-intelligence
---

Many intelligent tasks can be reframed as one question:

Which sequence of actions leads from here to the goal?

This is the language of:

- search,
- problem solving,
- planning.

The idea became foundational in artificial intelligence.

## State Space

A problem can often be represented as a **state space**.

Each state describes a possible situation.

Actions move from one state to another.

## Initial State

The **initial state** is where the agent begins.

Example:

a puzzle configuration.

## Goal State

The **goal state** satisfies the objective.

Example:

the completed puzzle.

## Operators

Actions are represented as **operators**.

An operator transforms one state into another.

Search explores sequences of operators.

## Graph Representation

The state space can be viewed as a graph.

Nodes:

states.

Edges:

actions.

Problem solving becomes pathfinding.

## Path Cost

Different actions may have different costs.

Examples:

- distance,
- time,
- energy.

The best solution may be the least-cost path.

## Breadth-First Search

Breadth-first search explores states by increasing depth.

It is complete for finite branching under standard assumptions.

With equal step costs, it finds a shortest path.

## Depth-First Search

Depth-first search follows one branch deeply before backtracking.

It uses less memory.

But it can waste time in deep irrelevant regions.

## Uniform-Cost Search

Uniform-cost search expands the lowest-cost path found so far.

It generalizes breadth-first search to variable action costs.

Under standard conditions, it finds an optimal path.

## The Explosion Problem

State spaces can become enormous.

If each state has:

b

possible actions,

and solutions have depth:

d,

the number of possible paths can grow roughly like:

\[
b^d
\]

This is exponential growth.

## Combinatorial Explosion

The central problem is not generating possibilities.

It is avoiding too many possibilities.

Intelligent search requires guidance.

## Heuristics

A **heuristic** estimates how promising a state is.

It helps search focus on likely good directions.

Heuristics are informed shortcuts.

## Greedy Best-First Search

Greedy best-first search chooses states appearing closest to the goal according to a heuristic:

\[
h(n)
\]

It can be fast.

It is not necessarily optimal.

## A* Search

A* combines:

- cost so far,
- estimated cost remaining.

Its evaluation is:

\[
f(n)=g(n)+h(n)
\]

where:

- \(g(n)\) = cost from start,
- \(h(n)\) = estimated cost to goal.

## Admissible Heuristic

A heuristic is **admissible** if it never overestimates the true remaining cost.

Under standard conditions, A* with an admissible heuristic finds an optimal solution.

## Consistency

A stronger property is **consistency**:

\[
h(n)\leq c(n,n')+h(n')
\]

This ensures heuristic estimates behave coherently along edges.

## Heuristic Quality

A heuristic closer to the true cost can dramatically reduce search.

Knowledge transforms brute force into intelligent exploration.

## Sliding Puzzle Example

For the 8-puzzle, a heuristic might count:

- misplaced tiles.

A better heuristic uses:

- Manhattan distance.

Both estimate remaining difficulty.

## Problem Representation Matters

The same real problem can generate very different search spaces depending on representation.

Good representation can make search easy.

Bad representation can make it impossible.

## Abstraction

Search can operate on simplified states first.

Plan at high level:

travel from Istanbul to Ankara.

Then refine:

specific roads.

Abstraction reduces complexity.

## Hierarchical Planning

Complex goals can be decomposed into subgoals.

This produces hierarchical planning.

Human problem solving uses this constantly.

## Means–Ends Analysis

Newell and Simon emphasized **means–ends analysis**.

Compare:

current state

with:

goal.

Choose an operation reducing the difference.

This was central to early AI.

## General Problem Solver

The General Problem Solver attempted to apply such strategies across domains.

It was historically important.

Its generality was limited by representation and knowledge.

## Planning

Search asks:

Which state should I explore?

Planning asks:

Which action sequence should I execute?

The concepts overlap.

Planning usually uses an explicit model of actions and consequences.

## Classical Planning

Classical planning often assumes:

- deterministic actions,
- known world,
- discrete states.

Real environments violate these assumptions.

But the formal model is foundational.

## STRIPS

The STRIPS planning language represented actions through:

- preconditions,
- effects.

An action can occur if preconditions hold.

Then specified facts change.

## Example Action

Action:

PickUp(BlockA)

Preconditions:

- hand empty,
- BlockA clear.

Effects:

- holding BlockA,
- BlockA no longer on table.

Formal action models support automated planning.

## Frame Problem Returns

If an action changes one fact, what remains unchanged?

Planning systems must represent persistence efficiently.

This is the frame problem.

## Partial-Order Planning

Some actions do not need a fixed total order.

A plan can specify only necessary ordering constraints.

This allows flexibility.

## Planning Under Uncertainty

Real agents do not know exact outcomes.

Actions may succeed probabilistically.

Planning must reason over possible futures.

## Markov Decision Processes

A Markov decision process, or MDP, formalizes sequential decisions under uncertainty.

It includes:

- states,
- actions,
- transition probabilities,
- rewards.

## Policy

A **policy** maps states to actions:

\[
\pi(s)=a
\]

Rather than one fixed plan, a policy adapts action to observed state.

## Partially Observable Environments

If the true state is hidden, the agent maintains beliefs over possible states.

This leads to POMDPs.

Planning becomes inference plus control.

## Contingency Planning

A robust plan includes branches:

If X happens, do A.

If Y happens, do B.

Plans can be conditional.

## Replanning

In dynamic environments, a long plan may become obsolete.

Agents can:

- act,
- observe,
- replan.

Planning becomes continuous.

## Real-Time Search

An agent may need to act before full search finishes.

Real-time algorithms interleave:

thinking

with:

acting.

This is crucial in robotics and games.

## Iterative Deepening

Iterative deepening repeatedly performs depth-limited search with increasing limits.

It combines:

- low memory,
- completeness.

It became useful in game search.

## Bidirectional Search

If both start and goal are known, search can proceed from both ends.

The frontiers meet.

This can reduce effective depth dramatically.

## Constraint Satisfaction

Some problems are better represented as:

variables,
domains,
constraints.

Examples:

- scheduling,
- Sudoku.

Search then assigns values while maintaining consistency.

## Backtracking

Constraint solvers often use backtracking.

When a partial assignment violates constraints, reverse and try another choice.

Heuristics strongly affect performance.

## Constraint Propagation

Rather than waiting for contradiction, constraints can prune domains early.

This reduces search.

Intelligence often means eliminating impossible branches before exploring them.

## Search and Proof

Theorem proving can be viewed as search through possible derivations.

Logic provides legal moves.

Heuristics determine which proof paths to explore.

## Search and Language

Parsing a sentence can be framed as search through possible grammatical structures.

Ambiguity creates branching.

Context guides selection.

## Search and Science

Scientific discovery can also be viewed loosely as search through:

- hypotheses,
- experiments,
- models.

But representation and creativity matter so much that simple search is not enough.

## Local Search

Sometimes only the final state matters, not the path.

Local search moves among candidate solutions.

Examples include:

- hill climbing,
- simulated annealing.

## Hill Climbing

Hill climbing repeatedly moves to a better neighboring state.

It is simple.

It can get trapped in local optima.

## Local Optimum

A state may be better than every nearby alternative but worse than some distant state.

Local search can mistake local success for global success.

## Simulated Annealing

Simulated annealing sometimes accepts worse moves early.

This allows escape from local optima.

The probability of such moves decreases over time.

## Evolutionary Search

Genetic algorithms search populations of candidate solutions.

Variation and selection explore complex spaces.

They borrow ideas from evolution.

## Beam Search

Beam search keeps only a limited number of promising partial candidates at each stage.

It sacrifices completeness for efficiency.

This is widely useful in sequence generation.

## Search in Modern AI

Modern AI often combines learned models with search.

Examples include:

- game-playing systems,
- theorem proving,
- planning agents.

Learning provides heuristics.

Search provides explicit deliberation.

## Monte Carlo Tree Search

Monte Carlo Tree Search, or MCTS, estimates action value through repeated simulated play.

It balances:

- exploration,
- exploitation.

It became famous through systems such as AlphaGo.

## Learned Heuristics

Neural networks can estimate:

- value,
- policy,
- distance to goal.

These learned estimates guide search.

Old and new AI combine.

## Search Is Not Intelligence by Itself

Brute-force enumeration can solve some problems.

But intelligent search depends on:

- representation,
- heuristics,
- abstraction.

The important question is not whether search occurs.

It is how the search space is structured.

## Planning and Agency

Planning turns models into future-directed action.

It requires:

- goals,
- prediction,
- evaluation.

Planning is therefore a central mechanism of agency.

## The Philosophical Lesson

Problem solving becomes tractable when a system can:

- represent states,
- estimate promising directions,
- prune alternatives,
- revise plans.

Intelligence is often search under severe constraints.

Heuristics are compressed knowledge about where not to look.

## The Next Question

Games became ideal laboratories for these ideas because:

- rules are clear,
- goals are explicit,
- success is measurable.

Checkers and chess played a special role in AI history.

The next essay asks how machines learned to play them:

**Playing Checkers and Chess.**
