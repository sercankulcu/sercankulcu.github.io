---
title: 'Automated Reasoning and Theorem Proving'
permalink: /nature/282-automated-reasoning-and-theorem-proving/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 282
tags:
   - automated-reasoning
   - theorem-proving
   - logic
   - artificial-intelligence
   - proof
---

If reasoning follows formal rules, perhaps a machine can perform it automatically.

This idea is older than modern artificial intelligence.

But computers made it practical.

**Automated reasoning** asks whether machines can derive valid conclusions from formal knowledge.

**Automated theorem proving** applies this especially to mathematics and logic.

## Reasoning as Symbol Manipulation

A formal proof consists of:

- symbols,
- axioms,
- inference rules.

A machine can manipulate symbols exactly.

This makes theorem proving a natural computational task.

## From Logic to Algorithm

Suppose we know:

\[
P
\]

and:

\[
P\rightarrow Q
\]

Then modus ponens gives:

\[
Q
\]

An automated reasoner can apply this rule mechanically.

## Proof Search

The challenge is not usually verifying one inference.

It is finding a useful sequence of inferences among enormous possibilities.

Theorem proving becomes:

**search.**

## Search Space of Proofs

A theorem may have many possible derivations.

Most are irrelevant.

A prover must decide:

Which rule should I apply?

To which expression?

In what order?

## Forward Chaining

**Forward chaining** starts from known facts.

It repeatedly applies rules to derive new facts.

Example:

Facts:
A.

Rules:
A → B.
B → C.

Derive:
B,
then C.

## Backward Chaining

**Backward chaining** starts from a goal.

If we want:

C,

and know:

B → C,

we ask whether B can be established.

Then continue backward.

This is goal-directed reasoning.

## Logic Programming

Languages such as Prolog use forms of backward chaining and unification.

A program can be expressed as logical relationships.

Execution becomes proof search.

## Unification

**Unification** finds substitutions making symbolic expressions match.

Example:

\[
Human(x)
\]

and:

\[
Human(Socrates)
\]

unify with:

\[
x=Socrates
\]

This is fundamental in automated logic.

## Substitution

Once variables are unified, rules can be instantiated.

For example:

\[
Human(x)\rightarrow Mortal(x)
\]

with:

\[
x=Socrates
\]

becomes:

\[
Human(Socrates)\rightarrow Mortal(Socrates)
\]

## Resolution

**Resolution** is a powerful inference rule used in automated theorem proving.

It operates especially naturally on clauses in conjunctive normal form.

## Simple Resolution Example

Suppose:

\[
P\lor Q
\]

and:

\[
\neg P\lor R
\]

Resolution on P gives:

\[
Q\lor R
\]

The complementary literals disappear.

## Refutation

Many theorem provers work by contradiction.

To prove:

T,

add:

\[
\neg T
\]

to the premises.

If this produces contradiction, T follows.

This is **refutation completeness** in suitable logical systems.

## Clausal Form

First-order formulas are often transformed into clause form before resolution.

Typical steps include:

- eliminating implications,
- moving negations,
- standardizing variables,
- Skolemization,
- conjunctive normal form.

## Skolemization

Existential variables can be replaced using new constants or functions.

This preserves satisfiability in the relevant sense.

It enables mechanical clause reasoning.

## Completeness

Resolution for first-order logic is complete in the refutation sense.

If a set of first-order clauses is unsatisfiable, systematic resolution can in principle derive contradiction.

This is a profound result.

## But Search Can Explode

Completeness does not mean efficiency.

The number of possible proof steps can grow enormously.

The central engineering problem becomes proof guidance.

## Heuristics

Automated provers use heuristics to choose:

- promising clauses,
- useful substitutions,
- likely lemmas.

As with chess, intelligence lies partly in pruning.

## Logic Theorist

The Logic Theorist by Newell, Simon, and Shaw proved theorems from *Principia Mathematica*.

It was one of the earliest major AI systems.

The program treated proof as heuristic search.

## General Problem Solver

The same tradition inspired the General Problem Solver.

Researchers hoped general search mechanisms could solve many intellectual tasks.

Knowledge later proved just as important as generic search.

## Automated Theorem Provers

Systems such as:

- E,
- Vampire,
- SPASS

perform highly sophisticated first-order theorem proving.

They combine logic with powerful search strategies.

## SAT Solving

A SAT solver determines whether a Boolean formula has a satisfying assignment.

SAT is NP-complete.

Yet modern solvers handle many huge practical instances efficiently.

## DPLL

The Davis–Putnam–Logemann–Loveland algorithm, or DPLL, is a foundational SAT-solving procedure.

It combines:

- branching,
- propagation,
- backtracking.

## Unit Propagation

If a clause has one remaining unassigned literal, that literal must be true for the clause to be satisfied.

This is **unit propagation**.

It prunes search aggressively.

## CDCL

Modern SAT solvers often use **Conflict-Driven Clause Learning**, or CDCL.

When a contradiction occurs, the solver learns a new clause preventing similar failure.

The system learns from mistakes.

## SMT Solving

**Satisfiability Modulo Theories**, or SMT, extends Boolean satisfiability with theories such as:

- arithmetic,
- arrays,
- bit vectors.

SMT solvers are widely used in verification.

## Proof Assistants

A proof assistant helps humans construct formal proofs.

Examples include:

- Coq,
- Lean,
- Isabelle.

The human provides high-level guidance.

The machine verifies correctness.

## Interactive Theorem Proving

In interactive systems, proving becomes collaboration.

The human supplies:

- lemmas,
- strategies,
- abstractions.

The machine checks formal details.

## Automated vs Interactive

Full automation is attractive.

But difficult mathematics often requires representation changes and new concepts.

Interactive proof lets humans contribute creative structure.

## Curry–Howard Correspondence

Under Curry–Howard:

propositions correspond to types,

proofs correspond to programs.

Constructing a proof can construct a program.

Logic and computation become deeply connected.

## Type Checking

A proof assistant can verify that a proof term has the required type.

This gives machine-checked certainty relative to:

- formal system,
- trusted kernel.

## Trust

Formal verification does not eliminate all trust.

We still rely on:

- hardware,
- compiler,
- proof checker.

But small kernels can greatly reduce the trusted base.

## Formalized Mathematics

Large bodies of mathematics have been formalized.

Examples include:

- algebra,
- number theory,
- topology.

Formalization exposes hidden assumptions.

## Four Color Theorem

The Four Color Theorem became famous partly because computer-assisted checking played a central role in its proof.

This raised philosophical questions about what counts as an understandable proof.

## Kepler Conjecture

Thomas Hales's proof of the Kepler conjecture relied heavily on computation.

Later, the Flyspeck project formally verified the proof.

This demonstrated large-scale proof engineering.

## Proof and Understanding

A machine can verify a proof containing millions of steps.

But can a human understand why the theorem is true?

Proof correctness and explanatory insight are distinct.

## Automated Discovery

Theorem provers can sometimes discover proofs humans did not anticipate.

This raises a deeper question:

Is proof search a form of mathematical creativity?

The answer depends on what creativity requires.

## Neural Theorem Proving

Modern systems use machine learning to guide proof search.

Neural networks can predict:

- useful lemmas,
- next tactics.

Learning supplies heuristics.

Logic supplies correctness.

## Large Language Models and Proof

Language models can propose proof steps or formal code.

But generated text is not automatically correct.

Formal verification provides a strong external checker.

This creates a productive hybrid architecture.

## Search Plus Verification

A powerful pattern appears:

generate candidate solution,

then verify formally.

This separates:

creative search

from:

rigorous checking.

## Automated Reasoning Beyond Mathematics

Logical inference is used in:

- planning,
- diagnosis,
- verification,
- databases.

Theorem proving is one special case of structured reasoning.

## Knowledge Bases

A reasoner can infer new facts from explicit knowledge.

Example:

Parent(Alice, Bob)

and:

Parent(Bob, Carol)

plus a rule for grandparent

allow deriving:

Grandparent(Alice, Carol)

## Nonmonotonic Reasoning

Classical theorem proving assumes monotonic logic.

But commonsense reasoning often retracts conclusions.

Automating everyday reasoning therefore requires richer systems.

## Probabilistic Reasoning

Uncertain domains require:

- Bayesian inference,
- probabilistic logic.

Deductive proof is only one mode of reasoning.

## Incompleteness and Undecidability

Formal reasoning has limits.

First-order validity is only semi-decidable.

Gödel and Church showed deeper boundaries.

Automated reasoning cannot escape computability theory.

## Semi-Decidability

If a first-order statement is valid, systematic proof search may eventually find a proof.

If it is invalid, search may continue forever.

This is a fundamental asymmetry.

## Proof Search as Intelligence

Theorem proving reveals a recurring AI theme.

Formal rules can be simple.

Finding the right sequence can be extraordinarily difficult.

Intelligence lies in:

- representation,
- search control,
- abstraction.

## Humans Use Lemmas

Mathematicians rarely search directly from axioms to theorem.

They invent intermediate results.

A lemma compresses search.

This is analogous to creating better representations.

## Abstraction Again

A new definition can transform a proof problem.

Creative mathematics often changes the language of the problem.

Pure brute-force search misses this.

## Formal Certainty

Automated reasoning has one enormous advantage:

when a proof is checked by a sound kernel, confidence can be exceptionally high.

The machine does not get tired.

It does not overlook a line.

## The Philosophical Lesson

Automated reasoning shows that parts of rational thought can be mechanized with extraordinary precision.

But the hard problem is rarely one inference.

It is choosing:

- representation,
- lemma,
- search direction.

Formal logic gives correctness.

Intelligence gives direction.

## The Next Question

Early AI tried to capture human expertise using:

- facts,
- rules,
- inference engines.

These systems became known as:

**Expert Systems.**
