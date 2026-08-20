---
title: 'Knowledge and Epistemic Logic'
permalink: /nature/195-knowledge-and-epistemic-logic/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 195
tags:
   - epistemic-logic
   - knowledge
   - agents
   - possible-worlds
   - reasoning
---

Logic can ask whether a proposition is true.

Epistemic logic asks:

**Who knows it?**

This adds agents to modal reasoning.

A fact may be true.

One person may know it.

Another may not.

A third may know that the second does not know.

Knowledge creates layers.

## Knowledge Operator

A common notation is:

\[
K_a P
\]

meaning:

Agent \(a\) knows that P.

For example:

\[
K_{Alice}(DoorOpen)
\]

means:

Alice knows the door is open.

## Truth vs Knowledge

If P is true, it does not follow that anyone knows P.

Reality can exceed knowledge.

Likewise, if someone believes P, P may be false.

Knowledge and belief must be distinguished.

## Factivity

Knowledge is often treated as **factive**.

If:

\[
K_a P
\]

then:

\[
P
\]

If Alice knows P, P must be true.

This separates knowledge from mere belief.

## Possible-World Semantics

Epistemic logic often uses possible worlds.

From an agent's perspective, several worlds may be indistinguishable.

If P is true in every world compatible with what the agent knows, then the agent knows P.

Knowledge becomes elimination of alternatives.

## Epistemic Accessibility

Each agent has an accessibility relation.

World \(w_1\) may access \(w_2\) for Alice if:

from Alice's information, \(w_2\) is still possible.

Different agents can have different relations.

Knowledge is perspective-dependent.

## Uncertainty as Multiple Worlds

Suppose a coin is hidden.

Alice does not know whether it landed heads or tails.

Her epistemic state includes at least two possibilities:

- world H,
- world T.

She knows only what is true in both.

## Learning

Now reveal the coin.

One world is eliminated.

Knowledge increases because the set of epistemically possible worlds shrinks.

Learning can be modeled as updating accessibility.

## Public Announcements

Suppose someone truthfully announces:

"The coin landed heads."

Every agent who hears and trusts the announcement removes tail-worlds.

This is studied in **dynamic epistemic logic**.

Information changes the model.

## Knowledge About Knowledge

Epistemic logic supports nesting.

\[
K_a K_b P
\]

means:

Agent a knows that agent b knows P.

Higher-order knowledge is essential in communication and coordination.

## Common Knowledge

Sometimes everyone needs to know P.

But that is not enough.

Everyone may need to know that everyone knows P.

And know that everyone knows that everyone knows P.

This infinite hierarchy is called **common knowledge**.

## Why Common Knowledge Matters

Imagine two people coordinating an action at noon.

Each knows the time.

But do they know the other knows?

If coordination depends on synchronized confidence, higher-order knowledge matters.

Social action is epistemically recursive.

## The Coordinated Attack Problem

In distributed computing, two parties may need to coordinate over unreliable communication.

Even repeated acknowledgments may fail to create common knowledge because the final acknowledgment could always be lost.

This is the **coordinated attack problem**.

Communication limits coordination.

## The Muddy Children Puzzle

A classic epistemic puzzle involves children who can see mud on others but not themselves.

A public statement such as:

"At least one child is muddy"

can trigger several rounds of reasoning.

Eventually children infer their own state.

The puzzle demonstrates:

- nested knowledge,
- public information,
- common knowledge.

## Ignorance Can Be Informative

Suppose Alice says:

"I don't know whether P."

Bob may learn something from Alice's ignorance.

Knowledge of non-knowledge is still information.

Epistemic logic makes such reasoning precise.

## Negative Introspection

A strong epistemic system may include:

If an agent does not know P, the agent knows that they do not know P.

Symbolically:

\[
\neg K_a P \rightarrow K_a \neg K_a P
\]

This is **negative introspection**.

Humans do not always satisfy it.

## Positive Introspection

Another principle is:

\[
K_a P \rightarrow K_a K_a P
\]

If an agent knows P, they know that they know P.

This is **positive introspection**.

Again, this may be an idealization.

## System S5 and Knowledge

Idealized epistemic logic often uses S5-like accessibility relations.

These correspond to strong assumptions such as:

- factivity,
- positive introspection,
- negative introspection.

Real human knowledge may violate these ideals.

## Logical Omniscience

Standard epistemic logic creates a notorious problem.

If an agent knows premises and all logical consequences are available, then the agent knows every consequence.

Real agents do not.

They have limited:

- memory,
- time,
- computation.

This is the **logical omniscience problem**.

## Resource-Bounded Knowledge

More realistic models try to represent agents with limited resources.

An agent may have enough information for a conclusion but fail to derive it.

Knowledge and computational ability diverge.

This connects epistemic logic to complexity theory.

## Knowledge vs Justified Belief

Traditional epistemology often analyzes knowledge through:

- truth,
- belief,
- justification.

Epistemic logic abstracts away from many philosophical details.

It formalizes relations among knowledge claims.

The Gettier problem will return later in the belief section.

## Knowledge vs Information

A database may contain P.

Does the database "know" P?

In formal computer science, we may use epistemic language operationally.

Philosophically, genuine knowledge may require:

- belief,
- justification,
- cognition.

The formal operator does not settle that debate.

## Distributed Systems

Epistemic logic is useful in distributed computing.

A process may need to know:

- whether a message arrived,
- whether another process knows it arrived,
- whether consensus has been reached.

Correctness can depend on knowledge states.

## Security Protocols

Security reasoning also uses epistemic ideas.

A protocol should ensure:

- authorized agent knows the secret,
- attacker does not know the secret.

Knowledge becomes a formal security property.

## Games

Game theory depends on what players know about:

- rules,
- payoffs,
- other players' knowledge.

Common knowledge assumptions are often built into equilibrium analysis.

Strategic reasoning is epistemic.

## Social Life

Human coordination constantly depends on layered knowledge.

Examples:

- secrets,
- promises,
- reputation,
- embarrassment.

"I know that you know" can matter more than the underlying fact.

## Knowledge and Self-Reference

An agent can reason about their own knowledge.

This creates epistemic self-reference.

Statements like:

"I know that I am uncertain"

combine:

- introspection,
- meta-representation.

The same structural motifs keep returning.

## The Philosophical Lesson

Epistemic logic turns knowledge into a formal relation between:

- agents,
- propositions,
- possible worlds.

It allows us to reason about:

- ignorance,
- learning,
- common knowledge,
- nested knowledge.

Knowing is not merely possessing a true statement.

It is occupying an informational position.

## The Next Question

Knowledge is factive.

Belief is not.

An agent can sincerely believe something false.

How should logic represent:

- belief,
- confidence,
- mistaken conviction?

That leads to:

**doxastic logic.**
