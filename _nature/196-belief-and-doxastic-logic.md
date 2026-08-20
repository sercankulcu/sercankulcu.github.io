---
title: 'Belief and Doxastic Logic'
permalink: /nature/196-belief-and-doxastic-logic/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 196
tags:
   - belief
   - doxastic-logic
   - epistemic-logic
   - agents
   - reasoning
---

Knowledge is factive.

Belief is not.

A person can believe something false.

That difference is enough to require a different logic.

**Doxastic logic** studies formal reasoning about belief.

## Belief Operator

A common notation is:

\[
B_a P
\]

meaning:

Agent \(a\) believes that P.

For example:

\[
B_{Alice}(Raining)
\]

means:

Alice believes it is raining.

The proposition may be true or false.

## Belief vs Knowledge

Knowledge usually satisfies:

\[
K_a P \rightarrow P
\]

Belief does not.

We do not assume:

\[
B_a P \rightarrow P
\]

People are mistaken.

That simple difference is philosophically enormous.

## Possible-World Semantics

Doxastic logic often uses possible-world semantics.

A world is doxastically accessible if it is compatible with what the agent believes.

Then:

\[
B_a P
\]

means:

P is true in all worlds the agent considers possible according to their belief state.

## False Beliefs

Suppose the actual world has no rain.

Alice believes it is raining.

Her belief-accessible worlds may all contain rain.

The actual world need not be among them.

This is how false belief differs from knowledge.

## Consistent Belief

Many formal systems idealize agents as having consistent beliefs.

If an agent believes:

\[
P
\]

and:

\[
\neg P
\]

their belief set is inconsistent.

Classical idealizations often try to exclude such states.

Humans do not.

## Human Beliefs Are Messy

People can simultaneously believe things that do not fit together.

They may:

- compartmentalize,
- forget,
- fail to notice contradiction.

Doxastic logic often models idealized belief rather than psychological reality.

## KD45

A standard doxastic system is often called **KD45**.

Very roughly, it encodes assumptions like:

- beliefs are consistent,
- agents know what they believe,
- agents know what they do not believe.

These are strong idealizations.

## Consistency Axiom

One common principle is:

\[
B_a P \rightarrow \neg B_a \neg P
\]

If the agent believes P, they do not also believe not-P.

This rules out direct contradictory belief.

## Positive Introspection

Another principle is:

\[
B_a P \rightarrow B_a B_a P
\]

If the agent believes P, they believe that they believe P.

Real people may fail this.

Formal agents are cleaner.

## Negative Introspection

A further principle is:

\[
\neg B_a P \rightarrow B_a \neg B_a P
\]

If the agent does not believe P, they believe that they do not believe P.

Again, this is idealized self-knowledge.

## Belief Without Certainty

Belief need not mean absolute conviction.

Ordinary language uses "believe" across degrees.

Doxastic logic is often binary:

believes P

or does not.

This can be too coarse.

## Graded Belief

Probability theory offers a richer model.

Instead of:

\[
B_a P
\]

we may represent:

\[
P_a(P)=0.8
\]

The agent assigns 80% credence to P.

This connects belief logic to Bayesian reasoning.

## Credence

A **credence** is a degree of belief.

Credences can express uncertainty much better than binary belief.

An agent may be:

- nearly certain,
- moderately confident,
- unsure.

Probability turns belief into graded structure.

## Belief Revision

What happens when evidence contradicts belief?

A rational agent should update.

But updating is not trivial.

Which beliefs should be abandoned?

Which should be preserved?

This is the problem of **belief revision**.

## AGM Theory

A famous formal framework for belief revision is associated with Alchourrón, Gärdenfors, and Makinson.

AGM theory studies operations such as:

- expansion,
- contraction,
- revision.

Belief change becomes formal.

## Expansion

**Expansion** adds a new belief without removing old ones.

This can create inconsistency.

It is the simplest update.

## Contraction

**Contraction** removes commitment to a belief.

The problem is deciding what else must change with it.

Beliefs form networks.

Removing one proposition can affect many implications.

## Revision

**Revision** adds new information while restoring consistency.

If new evidence conflicts with old belief, something must give.

Rational revision tries to minimize unnecessary change.

## Confirmation Bias

Humans often fail ideal belief revision.

We may prefer evidence that preserves existing commitments.

This is confirmation bias.

Doxastic rationality and actual psychology diverge.

## Entrenchment

Some beliefs are more resistant to revision than others.

Basic assumptions may be deeply entrenched.

Peripheral beliefs may change easily.

Formal belief revision can represent degrees of entrenchment.

## Belief and Evidence

A belief can be:

- true,
- false,
- justified,
- unjustified.

These dimensions are separate.

Doxastic logic tracks belief structure.

Epistemology asks whether beliefs deserve acceptance.

## Belief About Belief

We can nest belief operators:

\[
B_a B_b P
\]

Alice believes that Bob believes P.

This matters in:

- games,
- negotiations,
- deception.

Strategic reasoning often depends on beliefs about others' beliefs.

## False Belief Tasks

Psychology studies whether children understand that another person can hold a false belief.

This ability is central to theory of mind.

To predict another person's behavior, we must model their beliefs, not just reality.

## Deception

Deception deliberately manipulates another agent's belief state.

A liar wants:

\[
B_{other} P
\]

while knowing:

\[
\neg P
\]

Social intelligence is partly doxastic engineering.

## Belief and Common Belief

Groups can share beliefs.

But group belief is complex.

Everyone believing P does not automatically imply:

everyone believes that everyone believes P.

Higher-order structure matters just as in knowledge.

## Rumors

Rumors propagate beliefs without guaranteed truth.

A belief network can amplify false claims.

Doxastic logic separates:

- transmission,
- truth.

This is essential for understanding misinformation.

## Belief and Action

Beliefs interact with desires.

If an agent believes:

the restaurant is closed,

they may not go.

Action depends not only on what is true but on what the agent thinks is true.

Decision theory therefore needs belief states.

## Bayesian Agents

A Bayesian agent represents uncertainty probabilistically.

New evidence updates prior beliefs using Bayes' theorem.

This is one formal ideal of rational belief change.

But real agents have limited data and computation.

## Logical Omniscience Returns

Standard doxastic systems can imply that agents believe all logical consequences of their beliefs.

Humans clearly do not.

We may believe premises without noticing what follows.

Resource-bounded belief models try to address this.

## Belief and Self-Deception

Can a person believe P while also, at some level, knowing not-P?

Self-deception challenges clean logical models.

Human belief is layered.

Different cognitive systems may encode incompatible commitments.

## The Philosophical Lesson

Belief is weaker than knowledge because belief can be false.

Doxastic logic gives us tools for reasoning about:

- mistaken agents,
- nested beliefs,
- revision,
- uncertainty.

It formalizes not the world itself, but how agents take the world to be.

## The Next Question

Agents do not only believe.

They also act under rules.

Some actions are:

- required,
- permitted,
- forbidden.

How can logic represent obligation?

That leads to:

**deontic logic.**
