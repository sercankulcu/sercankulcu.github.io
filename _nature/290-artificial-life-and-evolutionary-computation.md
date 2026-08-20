---
title: 'Artificial Life and Evolutionary Computation'
permalink: /nature/290-artificial-life-and-evolutionary-computation/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 290
tags:
   - artificial-life
   - evolutionary-computation
   - genetic-algorithms
   - emergence
   - evolution
---

Biology did not design intelligence directly.

Evolution produced it.

This suggests another strategy for artificial intelligence:

Do not program the final solution.

Create a system in which useful structures can evolve.

This idea connects **Artificial Life** with **Evolutionary Computation**.

## Artificial Life

Artificial Life, often abbreviated **ALife**, studies life-like processes in:

- software,
- robots,
- synthetic systems.

The goal is not merely to simulate organisms.

It is to understand principles of:

- adaptation,
- reproduction,
- emergence.

## Strong and Weak ALife

A useful distinction is:

### Weak ALife
Simulate properties of living systems.

### Strong ALife
Claim that appropriate artificial systems could literally be alive.

The second is philosophical and controversial.

## Life as Process

ALife encourages a process view of life.

Instead of asking:

What material is life made of?

ask:

What organization allows:

- self-maintenance,
- reproduction,
- evolution?

This parallels functionalism.

## Cellular Automata

Cellular automata became important ALife models.

Simple local rules can generate:

- stable structures,
- oscillators,
- moving patterns.

Conway's Game of Life is the classic example.

## Emergence

No central designer commands a glider to move.

Movement emerges from local updates.

ALife therefore connects strongly to:

- emergence,
- self-organization.

## Self-Reproduction

Von Neumann studied theoretical self-reproducing automata.

His work asked:

What logical architecture allows a machine to construct a copy of itself?

This linked computation and biological reproduction.

## Tierra

Thomas Ray's **Tierra** created self-replicating digital programs competing for computational resources.

Programs could mutate and evolve.

The environment became a digital ecology.

## Avida

Avida developed this tradition with digital organisms performing computational tasks.

Researchers used it to study evolutionary dynamics in controlled artificial environments.

## Digital Evolution

Digital organisms can:

- reproduce,
- mutate,
- compete.

Evolution then operates on software.

The substrate changes.

The logic of variation and selection remains.

## Genetic Algorithms

A **genetic algorithm** searches by maintaining a population of candidate solutions.

Typical steps:

1. initialize population,
2. evaluate fitness,
3. select,
4. recombine,
5. mutate,
6. repeat.

## Representation

Each candidate solution has a **genotype**.

The genotype encodes a possible solution.

Its realized behavior is analogous to phenotype.

Representation strongly affects evolution.

## Fitness Function

A fitness function measures success.

Candidates with higher fitness contribute more to future generations.

This is artificial selection.

## Selection

Selection amplifies successful variants.

Common mechanisms include:

- tournament selection,
- roulette-wheel selection,
- rank selection.

Different mechanisms change evolutionary pressure.

## Mutation

Mutation introduces variation.

Examples:

- flip a bit,
- perturb a number,
- alter structure.

Without variation, search stagnates.

## Crossover

Crossover combines information from two parents.

Parts of representations are exchanged.

Whether this is useful depends heavily on encoding.

## Schema Intuition

Early genetic-algorithm theory discussed **schemas**:

patterns shared by subsets of candidate strings.

Selection and recombination may amplify useful partial structures.

The theory is more subtle than simple building-block slogans.

## Fitness Landscapes

Imagine each candidate solution as a point.

Fitness gives height.

Optimization becomes movement through a **fitness landscape**.

Landscapes can contain:

- peaks,
- valleys,
- plateaus.

## Local Optima

Evolution can become trapped around locally good solutions.

Mutation, diversity, and population structure help exploration.

The problem resembles local search.

## Evolution Strategies

**Evolution Strategies** optimize numerical parameters using mutation and selection.

They became influential in continuous optimization.

Modern variants include methods such as CMA-ES.

## Evolutionary Programming

Evolutionary programming historically emphasized evolving behavioral strategies.

The broader evolutionary-computation family contains several overlapping traditions.

## Genetic Programming

**Genetic programming** evolves programs or expressions.

Instead of tuning numbers, evolution changes executable structure.

Candidate solutions may be represented as trees.

## Symbolic Regression

Genetic programming can search for mathematical expressions fitting data.

This is **symbolic regression**.

The output can be interpretable equations.

## Evolution as Search

Evolutionary algorithms do not compute gradients.

They search through populations using variation and selection.

This makes them useful when:

- objective is nondifferentiable,
- representation is discrete,
- many local optima exist.

## Black-Box Optimization

Evolutionary methods can optimize systems even when internal gradients are unavailable.

Only performance needs to be measured.

This is powerful but often sample-intensive.

## Neuroevolution

**Neuroevolution** uses evolutionary methods to optimize neural networks.

Evolution may change:

- weights,
- architecture,
- learning rules.

This combines two nature-inspired approaches.

## NEAT

NeuroEvolution of Augmenting Topologies, or NEAT, evolves both:

- network structure,
- weights.

It allows complexity to grow gradually.

## Evolution vs Learning

Evolution changes populations across generations.

Learning changes an individual during its lifetime.

Biological intelligence uses both.

Artificial systems can combine them too.

## Baldwin Effect

The **Baldwin effect** describes how learning can influence evolutionary trajectories without acquired traits being directly inherited.

Learnable environments can favor genotypes that learn effectively.

This connects adaptation across timescales.

## Lamarckian Algorithms

Some artificial evolutionary systems directly write learned improvements back into inherited representations.

This is computationally possible even if it differs from ordinary biological inheritance.

## Coevolution

When populations evolve in response to one another, fitness itself changes.

Examples:

- predator vs prey,
- attacker vs defender.

This creates arms races.

## Competitive Coevolution

A strategy improves because opponents improve.

No fixed objective captures the entire challenge.

The environment becomes adaptive.

## Cooperative Coevolution

Different populations can evolve specialized components that work together.

This decomposes complex problems.

Evolution becomes collaborative.

## Open-Ended Evolution

Biological evolution did not converge on one final optimum.

It keeps generating novelty.

ALife researchers ask whether artificial evolution can become similarly **open-ended**.

This is difficult.

## Why Open-Endedness Is Hard

Artificial environments often have:

- fixed goals,
- limited resources,
- simple representations.

Evolution quickly discovers good solutions and stalls.

Biology operates in a far richer world.

## Novelty Search

Instead of rewarding only objective performance, **novelty search** rewards behavioral difference.

The system explores new regions of possibility.

This can escape deceptive objectives.

## Quality Diversity

Quality-diversity algorithms seek many different high-performing solutions.

The goal is not one optimum.

It is a repertoire.

MAP-Elites is a well-known example.

## MAP-Elites

MAP-Elites divides behavior space into niches.

It stores the best solution found in each niche.

Evolution produces diverse competence.

## Evolutionary Robotics

Robot controllers and morphologies can be evolved.

The process may discover designs humans would not invent.

Evolution becomes an engineering method.

## Evolving Bodies

If body structure evolves together with control, morphology and intelligence co-adapt.

This mirrors biological evolution more closely.

## Simulation Problem

Evolutionary robotics often relies on simulation because physical evaluation is expensive.

But evolved solutions may exploit simulation artifacts.

The sim-to-real gap returns.

## Evolution Exploits Everything

Optimization finds whatever increases fitness.

If the simulator contains a bug, evolution may exploit it.

This is a striking example of specification gaming.

## Evolutionary Surprise

Human designers may find evolved solutions:

- strange,
- unintuitive,
- elegant.

Search explores regions outside human design habits.

This can look creative.

## Artificial Ecosystems

ALife studies systems with multiple interacting digital organisms.

Interesting phenomena may include:

- competition,
- parasitism,
- cooperation.

Ecology creates higher-level dynamics.

## Symbiosis

Different artificial organisms may develop mutually beneficial interactions.

This shows cooperation can emerge without central planning.

## Parasitism

Exploitative strategies can also evolve.

Open environments create unanticipated behavior.

This is both scientifically interesting and challenging.

## Self-Organization

ALife overlaps with studies of self-organization.

Order can emerge from local interactions without a designer specifying the final structure.

This reconnects Part XV to earlier complexity themes.

## Evolutionary Computation and Creativity

Evolution can generate designs that are:

- novel,
- useful,
- unexpected.

Does that count as creativity?

It satisfies some functional criteria.

Questions of intention and authorship remain.

## Fitness Is Not Meaning

An evolutionary system optimizes a fitness function.

That does not mean it understands the goal.

Successful adaptation and semantic understanding are separate.

## Evolution Without Foresight

Natural selection has no plan.

It does not see future goals.

It retains variations that reproduce better under current conditions.

Artificial evolutionary algorithms operate similarly unless designers add foresight.

## Teleonomy

Biological organisms appear purpose-driven because evolution shaped goal-directed mechanisms.

This is sometimes called **teleonomy**.

Purpose-like behavior can emerge without cosmic purpose.

## ALife and the Definition of Life

If a digital organism:

- reproduces,
- mutates,
- evolves,

is it alive?

The answer depends on which properties we treat as essential.

The question exposes ambiguity in "life."

## Substrate Independence Again

If life is fundamentally organization, then silicon or software could potentially realize life-like processes.

If metabolism and material embodiment are essential, pure software may not qualify.

The debate parallels machine-mind questions.

## Artificial Selection and Human Intent

Unlike natural evolution, evolutionary computation usually has a designer choosing:

- representation,
- fitness,
- environment.

The search is autonomous only inside designed boundaries.

## Evolution as Discovery Tool

Evolutionary computation is useful when we know:

what success looks like

but not:

how to build it.

We specify evaluation.

The system discovers structure.

## The Philosophical Lesson

Artificial Life and evolutionary computation show that intelligence-like organization need not be written explicitly.

Variation, selection, competition, and cooperation can discover structures the designer never imagined.

The price is unpredictability.

Evolution optimizes what is selected, not what was intended.

## The Next Question

Evolution searches by variation.

Humans often solve new problems another way:

We notice that one situation has the same structure as another.

We reason by **analogy**.

Can machines do that too?

The next essay asks:

**Analogy and Machine Reasoning.**
