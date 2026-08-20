---
title: 'Playing Checkers and Chess'
permalink: /nature/279-playing-checkers-and-chess/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 279
tags:
   - chess
   - checkers
   - game-playing
   - search
   - artificial-intelligence
---

Games became some of artificial intelligence's earliest laboratories.

They offered something science rarely gets:

- precise rules,
- clear states,
- measurable success.

Checkers and chess became proving grounds for ideas about:

- search,
- heuristics,
- learning.

They also changed what people thought machines could do.

## Why Games?

A board game is a simplified world.

The agent knows:

- legal moves,
- goal,
- current state.

There is no ambiguity about what counts as winning.

This makes games ideal for algorithmic study.

## But Games Are Hard

Simple rules can generate enormous possibility spaces.

Chess has a finite board.

Yet the number of possible game trajectories is astronomical.

Intelligence appears in how search is controlled.

## Claude Shannon

In 1950, Claude Shannon published a foundational paper on programming a computer to play chess.

He distinguished strategies resembling:

- broad shallow search,
- selective deeper search.

Chess became a model of machine intelligence.

## Game Trees

A chess position generates legal moves.

Each move generates responses.

The result is a **game tree**.

Nodes are positions.

Edges are moves.

## Minimax

For two-player zero-sum games, **minimax** provides a basic decision rule.

The maximizing player chooses the move with best worst-case outcome.

The opponent is assumed to respond optimally.

## Recursive Definition

A simplified minimax value is:

\[
V(s)=
\begin{cases}
U(s), & \text{if terminal}\\
\max_a V(T(s,a)), & \text{our turn}\\
\min_a V(T(s,a)), & \text{opponent's turn}
\end{cases}
\]

The idea is conceptually simple.

The tree is enormous.

## Search Depth

A program cannot usually search to the end of every chess game.

It stops at a limited depth.

Then it estimates position quality.

This introduces the **evaluation function**.

## Evaluation Function

A chess evaluation may consider:

- material,
- king safety,
- mobility,
- pawn structure.

The function approximates future winning chances.

Heuristic knowledge replaces impossible full search.

## Horizon Effect

Limited search can miss consequences just beyond the cutoff.

A program may postpone a loss until outside the visible horizon.

This is the **horizon effect**.

## Quiescence Search

One response extends search through tactically unstable positions until reaching a more stable state.

This is **quiescence search**.

Evaluation is delayed until the position is quieter.

## Alpha–Beta Pruning

Minimax explores many branches unnecessarily.

**Alpha–beta pruning** eliminates branches that cannot affect the final decision.

It preserves the minimax result while reducing search.

## Why Alpha–Beta Works

Suppose one branch is already worse than an alternative available to the opponent.

There is no reason to explore it further.

Rational elimination saves computation.

## Move Ordering

Alpha–beta becomes dramatically more effective if promising moves are examined first.

Again:

heuristics improve search.

Ordering knowledge matters.

## Iterative Deepening

Chess programs often search:

depth 1,
then 2,
then 3,
and so on.

This **iterative deepening** provides a usable move if time runs out.

It also improves move ordering.

## Transposition Tables

Different move sequences can reach the same position.

A **transposition table** stores previously evaluated positions.

This avoids repeated computation.

Memory converts a tree into a graph.

## Opening Books

Historically, chess programs often used databases of strong opening moves.

This reduced search in well-studied early positions.

Knowledge and computation were combined.

## Endgame Tablebases

For positions with sufficiently few pieces, all possibilities can be solved exactly in advance.

An **endgame tablebase** gives perfect play for those states.

Some parts of chess become fully computed.

## Samuel's Checkers Program

Arthur Samuel developed influential checkers programs beginning in the 1950s.

His work was important because the system improved its evaluation through experience.

It became an early landmark in machine learning.

## Learning from Play

Samuel's program adjusted how it evaluated positions.

Instead of relying only on fixed human-written knowledge, it could improve through games.

This was a major conceptual shift.

## Self-Play

A system can generate training experience by playing against itself.

No external opponent is required for every example.

Self-play later became central in many game-playing systems.

## Checkers Is Solved

In 2007, Jonathan Schaeffer and collaborators announced that checkers had been weakly solved.

With perfect play from the standard initial position, the game is a draw.

This illustrates how computation can eventually exhaust a large but finite strategic domain.

## Chess Is Not Solved

Chess remains unsolved.

The complete game-theoretic value of the standard initial position is unknown.

The search space is too large for exhaustive solution with current methods.

## Deep Blue

IBM's Deep Blue defeated world chess champion Garry Kasparov in a six-game match in 1997.

The event became a cultural milestone.

A machine had defeated the world's leading human player under standard match conditions.

## What Deep Blue Used

Deep Blue combined:

- massive search,
- sophisticated evaluation,
- specialized hardware,
- chess knowledge.

It was not merely brute force.

Nor was it human-like cognition.

## Brute Force Myth

Calling chess engines "just brute force" hides important design.

Search requires:

- pruning,
- evaluation,
- move ordering,
- memory.

Intelligence can lie in deciding what not to search.

## Human Chess

Humans cannot examine millions of positions per second.

Strong players use:

- pattern recognition,
- strategic understanding,
- selective calculation.

Humans and machines reach strong play differently.

## Chunking

Expert chess players recognize meaningful board patterns.

They do not see isolated pieces.

This is a classic example of chunking and expertise.

## Different Intelligence Profiles

Machines excel at:

- tactical calculation,
- consistency.

Humans historically excelled at:

- strategic intuition,
- explanation.

Modern engines are strong in both play dimensions, though their mechanism remains different.

## Chess as AI Benchmark

For decades, chess symbolized intelligence.

Many assumed that mastering chess would require human-like reasoning.

When machines succeeded, the cultural benchmark moved.

## The AI Effect Again

Once computers dominated chess, chess was increasingly described as:

"just search."

This illustrates the AI effect.

Achievements stop looking intelligent after they become familiar.

## Game-Specific Intelligence

A chess engine can be superhuman at chess while lacking:

- commonsense,
- language,
- physical skill.

Game mastery does not imply general intelligence.

## Go Changed the Story

Chess still allowed strong search with engineered evaluation.

Go has a much larger branching factor and evaluation was historically more difficult.

This made Go a different challenge.

## AlphaGo

AlphaGo combined:

- policy networks,
- value networks,
- Monte Carlo Tree Search.

Learning guided search.

The architecture united machine learning with classical planning ideas.

## Policy Network

A policy network predicts promising moves.

It reduces the branching factor.

Search becomes selective.

## Value Network

A value network estimates the probability of winning from a position.

It replaces expensive rollouts or deep search in some cases.

Evaluation is learned.

## Monte Carlo Tree Search

MCTS samples possible futures.

It gradually concentrates computation on promising branches.

Search is adaptive rather than uniform.

## AlphaZero

AlphaZero learned chess, shogi, and Go largely through self-play from game rules, without relying on handcrafted opening books in the traditional sense.

It combined:

- neural networks,
- MCTS,
- reinforcement learning.

This marked another shift toward learned game intelligence.

## Learned Evaluation

Where earlier systems relied heavily on human-designed features, modern systems can learn representations automatically.

The architecture becomes less dependent on explicit expert coding.

## Search Did Not Disappear

Deep learning did not replace search.

It improved it.

The strongest game systems often combine:

learning

with:

deliberate search.

This is a recurring AI pattern.

## Games as Controlled Science

Games allow researchers to test:

- planning,
- evaluation,
- learning,
- competition.

They are clean experimental worlds.

But real life is messier.

## Missing Real-World Problems

Chess does not require:

- uncertain rules,
- ambiguous goals,
- changing physics.

Real intelligence must handle all of these.

Game success therefore has limits as evidence.

## Explainability

A chess engine may recommend an excellent move without explaining it in human strategic terms.

Performance and explanation can separate.

This foreshadows modern AI interpretability problems.

## Creativity in Games

Machine moves can surprise experts.

Some were initially described as:

creative.

This raises a later question:

Can machines create genuinely novel strategies?

## Human–Machine Collaboration

Chess eventually developed forms such as centaur or advanced chess, where humans and computers cooperate.

The strongest decision process need not be purely human or purely machine.

Hybrid intelligence matters.

## Search as Thought

Chess engines reveal something philosophical.

Reasoning can be:

systematic exploration of counterfactual futures.

The machine asks, in effect:

If I move here, what can happen next?

Search becomes mechanized imagination.

## Evaluation as Value

Search alone cannot choose.

Positions must be ranked.

This mirrors general intelligence:

prediction requires valuation.

Game playing combines:

model,
search,
goal.

## The Philosophical Lesson

Checkers and chess taught AI that intelligence can emerge from the combination of:

- search,
- heuristic evaluation,
- learning,
- memory.

They also taught us a cultural lesson:

we often mistake an unsolved task for a uniquely human capacity.

Once the task is mechanized, our definition of intelligence moves elsewhere.

## The Next Question

Games have explicit boards and legal moves.

The real world does not arrive pre-labeled.

An intelligent system must represent:

- objects,
- relations,
- events,
- facts.

How can a machine store what it knows?

That leads to:

**How Machines Represent Knowledge.**
