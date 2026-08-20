---
title: 'What Is a Dynamical System?'
permalink: /nature/107-what-is-a-dynamical-system/
chapter: 7
chapter_title: 'Chaos, Fractals, and Recursion'
order: 107
tags:
   - dynamical-systems
   - mathematics
   - state-space
   - evolution
   - modeling
---

Nature changes.

Planets move.

Populations grow.

Pendulums swing.

Weather evolves.

Neurons fire.

To study change systematically, mathematics uses the idea of a **dynamical system**.

A dynamical system is a rule for how a state changes over time.

This simple idea becomes the foundation for:

- stability,
- oscillation,
- chaos,
- attractors,
- bifurcations.

## State

A system begins with a **state**.

The state contains enough information, according to the model, to determine how the system evolves.

For a pendulum, a state might include:

- angle,
- angular velocity.

For a population model:

- population size.

For weather:

- temperature,
- pressure,
- wind,
- humidity

across many locations.

## State Variables

The quantities defining the state are **state variables**.

Choosing them is part of modeling.

Too few variables:

important dynamics are missed.

Too many:

the model becomes unnecessarily complicated.

A good state representation captures the information relevant to future evolution.

## State Space

All possible states form a **state space**.

A pendulum with two state variables has a two-dimensional state space.

Each point represents one possible condition of the system.

As time passes, the system traces a path through this space.

This path is called a **trajectory**.

## Trajectories

A trajectory represents the evolution of the system.

Instead of imagining a pendulum physically, we can watch its point move through state space.

This abstraction reveals structure.

Different starting points may:

- converge,
- diverge,
- cycle,
- wander.

State space turns dynamics into geometry.

## Continuous Time

Some systems evolve continuously.

Differential equations describe how variables change at every instant.

For example:

\[
rac{dx}{dt}=f(x)
\]

The function \(f\) tells us the instantaneous rate of change.

Classical mechanics commonly uses continuous-time dynamics.

## Discrete Time

Other systems update in steps.

A population may be modeled generation by generation.

A computer simulation may update once per cycle.

A discrete system can be written:

\[
x_{n+1}=f(x_n)
\]

The next state is obtained by applying a rule to the current state.

This simple form will become central in the logistic map.

## Deterministic Systems

A dynamical system is **deterministic** when the current state uniquely determines the future state according to the model.

Same state.

Same rules.

Same future.

Classical mechanics is often modeled deterministically.

But determinism does not guarantee practical predictability.

That distinction will soon become crucial.

## Stochastic Systems

Some models include randomness.

The next state may be drawn from a probability distribution.

Examples include:

- radioactive decay,
- population processes,
- financial models.

These are **stochastic dynamical systems**.

Randomness and dynamics can coexist.

## Differential Equations

Many physical laws are dynamical laws.

Newton's equations.

Maxwell's equations.

Fluid equations.

Population-growth equations.

They do not merely describe what exists.

They specify how states evolve.

A dynamical law is a rule of change.

## Fixed Points

A **fixed point** is a state that does not change.

If:

\[
f(x^*)=x^*
\]

in a discrete system, then \(x^*\) remains fixed.

In continuous systems, the corresponding rate of change is zero.

Fixed points can be stable or unstable.

## Stable Fixed Points

A stable fixed point attracts nearby states.

Push the system slightly.

It returns.

A marble at the bottom of a bowl is an intuitive example.

Stability means small disturbances die out.

## Unstable Fixed Points

An unstable fixed point repels nearby states.

A marble balanced on top of a hill is a classic image.

A tiny disturbance grows.

The state may be mathematically possible but physically difficult to maintain.

## Oscillations

Some systems do not settle to one point.

They cycle.

Pendulums.

Predator-prey populations.

Biological rhythms.

In state space, periodic motion forms a closed loop called a **limit cycle** in many contexts.

## Attractors

An **attractor** is a set of states toward which trajectories tend to evolve.

Attractors can be:

- fixed points,
- cycles,
- more complicated structures.

They capture long-term behavior.

Later, chaos will introduce **strange attractors**.

## Basins of Attraction

Different starting states may lead to different attractors.

The set of starting conditions leading to one attractor is its **basin of attraction**.

This matters in systems with multiple stable outcomes.

Small differences in starting state can determine which future regime appears.

## Phase Portraits

A **phase portrait** shows trajectories in state space.

Instead of plotting variable versus time, it shows how states flow.

Phase portraits reveal:

- equilibria,
- cycles,
- separatrices,
- attractors.

They are visual maps of dynamical possibility.

## Parameters

A dynamical rule often contains **parameters**.

For example:

growth rate,
damping,
temperature,
coupling strength.

Parameters are not state variables.

They define which dynamical system we are studying.

Changing a parameter can alter behavior qualitatively.

## Bifurcations

When a small parameter change causes a qualitative change in dynamics, we have a **bifurcation**.

One stable state may split into two.

A fixed point may become unstable.

A cycle may appear.

Bifurcations are gateways to chaos.

## Initial Conditions

The initial state matters.

Two systems obeying the same law can behave differently because they start differently.

This distinction is fundamental:

**laws constrain evolution; initial conditions select a trajectory.**

Many cosmological and physical questions depend on both.

## Boundary Conditions

In spatial systems, boundary conditions matter too.

A vibrating string behaves differently depending on how its ends are fixed.

Fluid flow depends on container geometry.

Dynamical behavior is shaped by laws plus constraints.

## Modeling Choices

No model includes everything.

A pendulum model may ignore:

- air resistance,
- flexibility,
- thermal noise.

A good dynamical model isolates the variables that dominate the behavior of interest.

Simplification is essential.

## Qualitative Analysis

Exact solutions are often impossible.

Dynamical-systems theory therefore asks qualitative questions:

- Is the state stable?
- Does the system oscillate?
- Does it approach an attractor?
- Does behavior become chaotic?

We can understand dynamics without solving every equation exactly.

## Dynamical Systems Across Science

The framework appears everywhere.

Physics:

- mechanics,
- fluids.

Biology:

- populations,
- epidemics,
- gene networks.

Neuroscience:

- neural activity.

Economics:

- growth and cycles.

Ecology:

- predator-prey systems.

The mathematics travels across domains because change has common structures.

## Feedback

Feedback creates especially rich dynamics.

Positive feedback amplifies.

Negative feedback stabilizes.

Delayed feedback can create oscillation.

Nonlinear feedback can create chaos.

Dynamical systems provide the mathematical language for these processes.

## Time as Rule Application

At an abstract level, dynamics means:

state + rule → next state.

This idea links physics, computation, and recursion.

A system repeatedly applies a transformation.

Simple repetition can generate enormous complexity.

## The Next Question

Some dynamical systems are easy to understand because effects add proportionally.

Others are not.

In nonlinear systems, interactions create thresholds, feedback, and unexpected behavior.

The next distinction is one of the most important in complexity science:

**What is the difference between linear and nonlinear worlds?**
