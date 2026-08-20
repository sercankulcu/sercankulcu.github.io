---
title: 'Can Behavior Demonstrate Intelligence?'
permalink: /nature/277-can-behavior-demonstrate-intelligence/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 277
tags:
   - intelligence
   - behavior
   - artificial-intelligence
   - cognition
   - evaluation
---

We never observe another mind directly.

We observe:

- speech,
- action,
- error,
- adaptation.

From behavior, we infer intelligence.

But how strong is that inference?

Can behavior demonstrate intelligence?

Or can intelligent-looking behavior be produced without genuine understanding?

## Behavior Is Evidence

Behavior matters because intelligence is partly about competent action.

A system that cannot:

- learn,
- solve,
- adapt,
- respond

is difficult to call intelligent.

Observable performance is therefore indispensable evidence.

## But Evidence Is Not Identity

Behavior may reveal intelligence.

It is not identical to intelligence.

The same behavior can arise from different mechanisms.

A memorized answer and a reasoned answer can look identical.

## The Underdetermination Problem

Suppose two systems answer every question in a test correctly.

System A:

reasons from a general model.

System B:

retrieves stored answers.

The observed outputs match.

The internal competence differs.

Behavior underdetermines mechanism.

## Lookup Tables

An extreme thought experiment imagines a gigantic lookup table containing a response to every possible input.

If the table produced human-like conversation, would it be intelligent?

The example is physically unrealistic at large scale.

But conceptually it exposes a problem:

output alone may not reveal generativity.

## Generativity

An intelligent system should often handle:

- new combinations,
- novel situations,
- unexpected constraints.

Generativity is stronger evidence than repetition.

## Generalization

If a system performs well only on familiar cases, competence may be shallow.

If it succeeds on genuinely new cases, we infer that it has learned structure.

Generalization is therefore central to intelligence evaluation.

## Transfer

An even stronger test asks whether knowledge transfers.

Can a system use a principle learned in one setting to solve a different problem?

Transfer suggests abstraction.

## Adaptation

Intelligence should survive change.

If task rules change slightly, does performance collapse?

Rigid behavior is less impressive than adaptable behavior.

## Robustness

A system should tolerate:

- noise,
- incomplete information,
- distribution shift.

Robustness distinguishes brittle pattern matching from deeper competence.

## Counterfactual Competence

A powerful test asks:

What would the system do if conditions were different?

Intelligence involves correct behavior across possible situations, not only the actual one observed.

## Counterfactuals and Implementation

This mirrors the philosophy of computation.

A system implements a rule not merely because one trajectory matches.

Its behavior across relevant alternatives should also fit.

Intelligence similarly requires dispositional structure.

## One-Shot Demonstration

Sometimes a single behavior can be strong evidence.

If an agent solves a genuinely novel difficult problem with no chance of memorization, that is informative.

Context determines evidential strength.

## Behavioral Equivalence

Two systems can be behaviorally equivalent relative to a limited test.

They may differ under:

- longer interaction,
- adversarial questioning,
- new tasks.

Evaluation must probe beyond one surface.

## Adversarial Testing

A good evaluator deliberately seeks failure modes.

Examples:

- contradictions,
- edge cases,
- novel compositions.

This prevents easy imitation.

## Benchmark Overfitting

If developers optimize directly for a benchmark, performance may rise without broad intelligence.

The benchmark becomes a target.

Goodhart's Law appears again.

## Training Contamination

A model may have encountered:

- benchmark questions,
- close variants

during training.

Then high scores may reflect recall rather than generalization.

Evaluation must control for contamination.

## Hidden Tests

Private test sets help.

But secrecy alone is not enough.

A system can still exploit:

- distributional regularities,
- benchmark artifacts.

The test must measure the intended competence.

## Construct Validity

Psychometrics asks whether a test actually measures the construct it claims to measure.

AI evaluation faces the same issue.

A "reasoning benchmark" may partly measure:

- vocabulary,
- memorization,
- formatting.

## Behavioral Signature

Intelligent processes often leave richer signatures than final accuracy.

Useful measures include:

- learning curves,
- response time,
- confidence,
- error structure.

These reveal internal organization indirectly.

## Error Patterns

Two systems with equal accuracy may fail differently.

Human errors often cluster around:

- cognitive load,
- ambiguity.

Machine errors may cluster around:

- distribution shift,
- prompt sensitivity.

Failure patterns are diagnostic.

## Learning Behavior

Can the system improve from feedback?

A static lookup system cannot easily update.

Adaptive behavior provides stronger evidence of intelligence.

## Interactive Evaluation

Interaction allows evaluators to:

- clarify,
- challenge,
- change conditions.

This is richer than static multiple-choice tests.

Intelligence unfolds over time.

## Long-Horizon Tasks

Many real tasks require:

- memory,
- planning,
- revision,
- persistence.

A system that performs well for one response may fail over hours of coordinated activity.

Long-horizon coherence matters.

## Tool Use

Intelligent agents use external resources.

They may:

- search,
- calculate,
- write code.

Tool use should not automatically count against intelligence.

Humans also extend cognition through tools.

## But Tool Dependence Matters

If a system succeeds only because another component performs the hard reasoning, attribution becomes distributed.

We should ask:

Where is the competence located?

The architecture may be the intelligent unit.

## Collective Intelligence

A team can solve a problem no member can solve alone.

Behavior belongs to the system as a whole.

Intelligence attribution can occur at multiple levels.

## Ant Colony Again

No ant understands the global route optimization.

The colony behaves adaptively.

Behavior can demonstrate collective intelligence even when no individual has the full model.

## Human Intelligence Is Also Distributed

Humans rely on:

- language,
- culture,
- books,
- institutions.

Individual intelligence is scaffolded.

Purely isolated tests may underestimate real cognition.

## The Turing Test Revisited

The Turing Test asks whether behavior is persuasive enough to justify human-like intelligence attribution.

Its insight is epistemic:

behavior is how minds become publicly visible.

Its limitation is mechanistic:

imitation may conceal internal differences.

## Behaviorism

Classical behaviorism tried to build psychology around observable behavior.

It achieved rigor.

But ignoring internal representation made some phenomena difficult to explain.

Cognitive science reintroduced hidden states.

## Functionalism

Functionalism gives behavior a richer role.

Mental states are defined not only by visible output but by their causal relations to:

- input,
- internal states,
- future behavior.

This avoids crude behaviorism.

## Intelligence as Disposition

Calling someone intelligent does not mean:

they are currently solving a problem.

It means they possess a capacity.

Intelligence is dispositional.

Behavior samples that capacity.

## Competence vs Performance

A person can possess competence but perform poorly due to:

- fatigue,
- distraction,
- stress.

Likewise a machine may have capability hidden by interface or resource limits.

Performance is not pure competence.

## Chomsky's Distinction

Linguistics distinguished:

competence

from:

performance.

The broader idea applies here.

Observed behavior is shaped by both ability and circumstance.

## Behavioral Evidence for Animals

We infer animal intelligence mainly through:

- problem solving,
- learning,
- flexible behavior.

We cannot demand verbal explanation.

Behavior is therefore scientifically powerful evidence.

## Clever Hans

The horse Clever Hans appeared to perform arithmetic.

Later investigation showed it was responding to subtle human cues.

This is a classic warning:

apparently intelligent behavior may have an unintended explanation.

## Experimental Control

To attribute intelligence, researchers must eliminate simpler explanations.

Can the animal succeed when:

- handler is absent,
- cues are hidden?

Good experiments test alternative mechanisms.

## Machine Clever Hans Effects

AI systems can also exploit unintended cues.

A vision model may classify images using:

- background,
- watermark,
- camera artifacts

rather than the intended object.

Behavior can be right for the wrong reason.

## Shortcut Learning

This is called **shortcut learning**.

The system finds a predictive feature easier than the intended concept.

High benchmark accuracy may hide weak understanding.

## Interpretability

Inspecting internal representations can complement behavior.

Methods may reveal whether a model relies on:

- relevant features,
- spurious correlations.

Interpretability is imperfect, but useful.

## Causal Intervention

Change an internal component.

Does the behavior change as predicted?

Causal experiments provide stronger mechanistic evidence than passive observation.

## Mechanistic Understanding

A full evaluation ideally combines:

- behavior,
- internal analysis,
- causal testing.

This parallels cognitive neuroscience.

## Understanding

Does intelligent behavior prove understanding?

Not necessarily.

Understanding may require:

- robust representation,
- causal modeling,
- semantic grounding.

But these too are inferred through behavior and mechanism.

## Consciousness

Behavior is even less decisive for consciousness.

A system might act intelligently without subjective experience.

We cannot directly infer qualia from performance alone.

## Other Minds Again

Yet we also infer human consciousness behaviorally.

The difference is that humans share:

- biology,
- development,
- evolutionary history.

This background strengthens the inference.

## Machine Cases Are Harder

With machines, architecture may be radically different.

Behavioral similarity provides evidence.

But the prior assumptions are weaker.

We need more caution.

## Intelligence Attribution Is Graded

There may be no binary threshold.

A system can show:

- narrow competence,
- broad competence,
- robust adaptation.

Intelligence attribution can be proportional to evidence.

## The Philosophical Lesson

Behavior is necessary evidence for intelligence.

But behavior alone may not reveal:

- mechanism,
- understanding,
- consciousness.

Strong evaluation asks whether performance is:

- general,
- adaptive,
- robust,
- causally grounded.

The question is not only:

What did the system do?

It is also:

What capacity made that behavior possible?

## The Next Question

One of the earliest ways AI produced intelligent behavior was by searching through possible actions.

Search became a foundational model of problem solving.

How can a machine explore enormous spaces without checking every possibility?

That leads to:

**Search, Problem Solving, and Planning.**
