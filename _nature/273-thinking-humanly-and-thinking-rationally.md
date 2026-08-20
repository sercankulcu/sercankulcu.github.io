---
title: 'Thinking Humanly and Thinking Rationally'
permalink: /nature/273-thinking-humanly-and-thinking-rationally/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 273
tags:
   - artificial-intelligence
   - rationality
   - cognitive-modeling
   - logic
   - human-thinking
---

What should artificial intelligence imitate?

Human thought?

Or ideal rational thought?

These are not the same.

Humans are:

- intelligent,
- biased,
- limited.

A machine designed to think exactly like us may inherit our mistakes.

A machine designed to reason perfectly may cease to resemble us.

## Four Classic Approaches

A common textbook framework distinguishes AI systems that aim to:

- think humanly,
- act humanly,
- think rationally,
- act rationally.

The distinctions organize different research goals.

This essay focuses on the first two cognitive ideals:

**thinking humanly** and **thinking rationally**.

## Thinking Humanly

Thinking humanly asks:

How do people actually think?

The goal is descriptive.

Build models that reproduce human cognitive processes.

## Cognitive Modeling

A cognitive model may try to predict:

- reaction time,
- memory errors,
- choices.

Success means resemblance to human cognition.

It does not require perfect answers.

## Psychology Connection

Thinking-humanly AI overlaps strongly with psychology.

Researchers use:

- experiments,
- behavioral data,
- neuroscience

to constrain models.

AI becomes a theory of cognition.

## Human Error as Data

If people make a systematic mistake, a human-like model should sometimes make it too.

An ideal reasoner would avoid the error.

This highlights the difference between:

descriptive

and:

normative.

## Example: Mental Arithmetic

Humans do not multiply large numbers by executing perfect arbitrary-precision arithmetic.

We use:

- learned procedures,
- working memory,
- shortcuts.

A psychologically realistic model should reflect these limits.

## Reaction Time

A human cognitive model should not only produce the correct answer.

It may need to match:

- how long decisions take,
- which errors occur.

Internal process matters.

## Cognitive Architectures

Systems such as:

- ACT-R,
- Soar

were designed partly to model general cognitive structure.

They include mechanisms for:

- memory,
- goals,
- production rules.

## ACT-R

ACT-R models cognition through interacting modules and production rules.

It aims to explain behavioral timing and learning.

It is both computational and psychological.

## Soar

Soar is a cognitive architecture designed for general intelligent behavior.

It uses:

- problem spaces,
- rules,
- learning mechanisms.

The goal is broad cognitive modeling.

## Brain-Inspired AI

Thinking humanly can also mean modeling neural mechanisms.

Artificial neural networks historically drew inspiration from brains.

Modern systems are often less biologically faithful than the name suggests.

## Neuroscience Constraint

A model that reproduces behavior but uses impossible neural mechanisms may be poor neuroscience.

Psychological realism and neural realism are separate standards.

## Levels Again

A model can be human-like at:

- behavioral level,
- cognitive-algorithmic level,
- neural level.

These need not coincide.

## Thinking Rationally

Thinking rationally asks:

What conclusions should a correct reasoner derive?

This is normative.

The classical ideal is formal logic.

## Laws of Thought

Historically, AI researchers connected intelligence with formal "laws of thought."

If reasoning can be encoded logically, a machine can derive valid conclusions.

## Syllogisms

From:

All humans are mortal.

Socrates is human.

derive:

Socrates is mortal.

This is rational thought in a formal deductive sense.

## Logic as a Model of Rationality

Logic provides:

- validity,
- consistency,
- proof.

It offers rigorous standards.

This made it attractive for early AI.

## Logic Is Not All Rationality

Real decisions involve:

- uncertainty,
- incomplete information,
- changing goals.

Classical logic alone cannot solve every intelligent task.

## Uncertainty

Suppose:

Clouds are dark.

Will it rain?

Logic may not determine the answer.

Probability is more appropriate.

Rationality must include uncertainty management.

## Probability

Bayesian reasoning provides a normative framework for belief updating.

A rational system can represent:

degrees of belief.

This broadens thinking rationally beyond deduction.

## Decision Theory

Rational thought also requires choosing actions.

Decision theory combines:

- probabilities,
- utilities.

An action is evaluated by expected consequences.

## Expected Utility

A simplified rule is:

\[
EU(a)=\sum_s P(s\mid a)U(s)
\]

Choose the action with highest expected utility.

This formalizes one notion of rational choice.

## Perfect Rationality Is Expensive

To compute the optimal action, an agent may need:

- enormous search,
- exact probabilities,
- full utilities.

Real systems cannot do this.

## Bounded Rationality Returns

Human rationality is bounded by:

- time,
- memory,
- computational power.

A machine also has finite resources.

Normative rationality must account for cost.

## Computational Rationality

A system may choose the best reasoning strategy given its computational limits.

This is sometimes called **computational rationality**.

Reasoning itself has a cost.

## Meta-Reasoning

An intelligent system should decide:

How long should I think?

Is more computation worth it?

A perfect analysis that arrives too late may be irrational.

## Human Heuristics

Humans use heuristics because exhaustive reasoning is expensive.

Some biases may be side effects of strategies adapted to limited resources.

Human-like thinking can sometimes be ecologically rational.

## Ecological Rationality

Gerd Gigerenzer and others emphasize that simple heuristics can perform well in the right environments.

Rationality depends partly on environmental structure.

A heuristic is not automatically irrational.

## Formal Rationality vs Practical Success

A system can violate a formal norm yet succeed practically.

Conversely, a formally perfect system may be useless if it cannot act in time.

Rationality has several senses.

## Thinking Humanly vs Thinking Rationally

The contrast can be summarized:

### Thinking humanly
Reproduce actual human cognitive process.

### Thinking rationally
Follow normative standards of correct inference.

They answer different questions.

## A Human-Like Error

Suppose a model reproduces the conjunction fallacy.

For cognitive psychology, this may be a success.

For decision support, it may be a failure.

Evaluation depends on purpose.

## A Nonhuman Rational Strategy

A machine may solve a problem using a method no human could mentally follow.

If the answer is correct and efficient, it may be rational without being human-like.

AI does not need cognitive imitation.

## Explainability

However, radically nonhuman reasoning can be difficult for people to understand.

Human compatibility matters in:

- medicine,
- law,
- science.

Rational output is not the only design value.

## Norms Depend on Goals

Rationality is relative to goals.

A perfectly logical system with a bad objective can behave disastrously.

Inference quality cannot replace value selection.

## Rationality and Morality

An action may be instrumentally rational but morally wrong.

Maximizing a goal does not tell us which goals are worth maximizing.

Ethics lies beyond pure rationality.

## Omniscience Is Not Required

A rational agent need not know everything.

It should act appropriately given:

- evidence,
- uncertainty.

Rationality concerns use of information, not perfect knowledge.

## Human Thinking as Benchmark

Human cognition is historically important because AI was inspired by it.

But human-like behavior is not the only possible intelligence standard.

Machines may exceed us by thinking differently.

## Rational Thinking as Benchmark

Formal rationality provides useful ideals.

But strict logical deduction is too narrow for real-world intelligence.

Modern AI increasingly emphasizes:

- probabilistic inference,
- optimization,
- learning.

## Hybrid Goal

Some systems aim for both:

- psychologically plausible models,
- rational performance.

The balance depends on application.

## Cognitive Science vs Engineering

Thinking humanly is often a scientific goal:

understand minds.

Thinking rationally is often an engineering goal:

build good reasoners.

AI contains both traditions.

## The Philosophical Lesson

Human thought and rational thought are not identical.

Humans are adapted, bounded reasoners.

Formal systems provide norms that human cognition only approximates.

Artificial intelligence must decide whether to:

- imitate us,
- improve on us,
- or pursue another architecture entirely.

## The Next Question

Thinking is only one way to define intelligence.

A system might be judged not by its internal thought process but by its behavior.

Should AI aim to:

act humanly

or:

act rationally?

That is the next distinction.
