---
title: 'Fuzzy Logic and Degrees of Truth'
permalink: /nature/199-fuzzy-logic-and-degrees-of-truth/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 199
tags:
   - fuzzy-logic
   - vagueness
   - degrees-of-truth
   - logic
   - uncertainty
---

Classical logic usually treats propositions as either:

- true,
- false.

But many everyday concepts are not naturally binary.

A person may be:

- somewhat tall,
- very tall,
- barely tall.

A room may be:

- warm,
- quite warm,
- extremely warm.

**Fuzzy logic** was developed to reason with such graded concepts.

## Fuzzy Truth Values

Instead of restricting truth values to:

\[
0
\]

or:

\[
1
\]

fuzzy logic allows intermediate values such as:

\[
0.2,\ 0.6,\ 0.9
\]

A statement can be true to a degree.

## Example: Tallness

Suppose a fuzzy set represents the predicate:

"Tall."

A person 150 cm tall might have membership:

\[
0.1
\]

A person 180 cm tall:

\[
0.7
\]

A person 200 cm tall:

\[
0.98
\]

These are illustrative membership values, not universal biological facts.

## Membership Functions

A **membership function** maps an object to a value between 0 and 1.

For fuzzy set \(A\):

\[
\mu_A(x) \in [0,1]
\]

The value represents degree of membership.

This is central to fuzzy set theory.

## Fuzzy Sets

In a classical set:

an object is either in the set or not.

In a fuzzy set:

membership can be graded.

This models categories without sharp boundaries.

## Fuzzy Logic Is Not Probability

This distinction is crucial.

Suppose:

\[
\mu_{Tall}(Alice)=0.7
\]

This does **not** mean:

"There is a 70% chance Alice is tall."

It means:

Alice satisfies the fuzzy predicate "tall" to degree 0.7.

Probability measures uncertainty.

Fuzzy membership measures graded applicability.

## Uncertainty vs Vagueness

Imagine we do not know Alice's height.

That is uncertainty.

Suppose we know she is exactly 178 cm but disagree about whether that counts as tall.

That is vagueness.

Probability addresses the first problem.

Fuzzy logic can address the second.

## Fuzzy Negation

A common fuzzy negation is:

\[
\mu_{\neg A}(x)=1-\mu_A(x)
\]

If something is tall to degree 0.8, it may be not-tall to degree 0.2.

This is one possible fuzzy semantics.

Other systems exist.

## Fuzzy AND

One common definition uses minimum:

\[
\mu_{A \land B}(x)=\min(\mu_A(x),\mu_B(x))
\]

If something is red to 0.9 and large to 0.6, then:

red AND large

may be 0.6.

## Fuzzy OR

A common fuzzy disjunction uses maximum:

\[
\mu_{A \lor B}(x)=\max(\mu_A(x),\mu_B(x))
\]

Again, alternative fuzzy operators are possible.

## T-Norms

General fuzzy conjunctions are modeled using **t-norms**.

Examples include:

- minimum,
- product.

The choice depends on the application.

There is no single universal fuzzy AND.

## T-Conorms

Fuzzy OR can be generalized through **t-conorms**.

Examples include:

- maximum,
- probabilistic sum.

Fuzzy logic is a family of formalisms, not one rigid system.

## Linguistic Variables

Fuzzy systems often use linguistic labels such as:

- cold,
- warm,
- hot.

A temperature can belong partly to more than one category.

For example:

25°C may be:

- warm to 0.8,
- hot to 0.3.

This resembles how humans use overlapping categories.

## Fuzzy Rules

A fuzzy controller may contain rules like:

IF temperature is hot
AND humidity is high
THEN fan speed is fast.

The conditions are graded.

The output can also be graded.

## Fuzzy Inference

A fuzzy inference system combines:

1. fuzzification,
2. rule evaluation,
3. aggregation,
4. defuzzification.

Numerical input becomes fuzzy categories.

Rules are applied.

A concrete output is produced.

## Fuzzification

**Fuzzification** converts crisp input into degrees of membership.

Example:

Temperature = 28°C.

The system may assign:

Warm = 0.6.

Hot = 0.7.

One value can activate multiple categories.

## Defuzzification

After fuzzy reasoning, a system often needs a crisp action.

For example:

fan speed = 72%.

**Defuzzification** converts fuzzy output into one numerical decision.

## Control Systems

Fuzzy logic became famous in control engineering.

Applications have included:

- appliances,
- industrial controllers,
- vehicle systems.

It is attractive when expert rules are intuitive but precise mathematical models are difficult.

## Human-Like Rules

An engineer may naturally say:

"If the room is very warm, increase cooling a lot."

Fuzzy logic translates such qualitative rules into computable form.

It bridges natural concepts and numerical control.

## Fuzzy Logic and Vagueness

Fuzzy logic offers one response to the sorites problem.

Instead of asking:

At exactly what height does tallness begin?

we allow gradual transition.

The category boundary becomes a slope rather than a cliff.

## Does Tallness Really Have a Number?

Critics ask whether assigning:

\[
0.73
\]

to tallness reflects genuine truth degree or merely an engineering convenience.

The number may depend on:

- chosen membership function,
- context.

Fuzzy logic can be useful even if its philosophical interpretation remains debated.

## Degree of Membership vs Degree of Truth

These ideas are closely related but not identical.

A fuzzy set gives degrees of membership.

A fuzzy logic interprets propositions with graded truth values.

Applications often connect the two.

## Many-Valued Logic

Fuzzy logic belongs to the broader family of **many-valued logics**.

Classical logic has two truth values.

Other systems may have:

- three values,
- finitely many values,
- infinitely many values.

Fuzzy logic typically uses a continuum.

## Łukasiewicz Logic

Jan Łukasiewicz developed many-valued logics before modern fuzzy logic.

His work showed that classical bivalence is not the only possible logical architecture.

Fuzzy logic later developed a distinct practical and mathematical tradition.

## Fuzzy Logic and AI

Early AI systems used fuzzy logic to handle vague concepts and expert knowledge.

Modern machine learning often learns decision boundaries from data instead.

But fuzzy systems remain valuable when interpretability matters.

## Fuzzy vs Neural Systems

A neural network may learn:

temperature → fan speed.

A fuzzy system may represent explicit rules:

IF hot THEN fast.

The first may be data-driven.

The second is often easier to interpret.

Hybrid systems can combine them.

## Fuzzy Logic and Language

Natural language is filled with graded terms:

- near,
- old,
- expensive,
- similar.

Fuzzy models can approximate these concepts.

But human language also depends on:

- context,
- pragmatics,
- culture.

A membership function does not capture everything.

## Fuzzy Logic and Risk

Suppose an event has:

0.2 probability.

That is probabilistic uncertainty.

Suppose the event counts as "high risk" to degree 0.7.

That is fuzzy classification.

The two values answer different questions.

They can be combined.

## Type-2 Fuzzy Sets

What if the membership degree itself is uncertain?

**Type-2 fuzzy sets** allow uncertainty about membership functions.

This creates a second layer.

Fuzzy systems can model uncertainty in vagueness itself.

## The Philosophical Lesson

Fuzzy logic challenges the assumption that every useful predicate needs a sharp boundary.

It formalizes graded categories without turning them into probabilities.

The central distinction is:

uncertainty about whether P is true

vs

degree to which P applies.

## The Next Question

Reasoning is not only about what is true or how true it is.

Agents must choose.

They face uncertain outcomes, competing values, and limited resources.

How should a rational agent decide?

That leads to:

**decision theory.**
