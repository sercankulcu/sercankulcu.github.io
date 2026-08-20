---
title: 'Information Processing'
permalink: /nature/226-information-processing/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 226
tags:
   - information-processing
   - computation
   - representation
   - systems
   - computer-science
---

Computers process information.

Brains appear to process information.

Cells respond to signals.

Organizations transform records into decisions.

The phrase **information processing** is everywhere.

But what exactly is being processed?

And when does physical change count as information processing rather than merely change?

## Information Requires Distinctions

At minimum, information processing involves distinguishable states.

A system may distinguish:

- 0 from 1,
- signal from no signal,
- one symbol from another.

If no distinctions can be made, there is nothing to transform informationally.

## State

A system has a **state** when some description captures its current configuration.

For a finite-state machine, the state may be one of:

\[
q_0,q_1,q_2,\ldots
\]

For a computer, state includes:

- memory contents,
- registers,
- instruction position.

Processing changes state.

## Input

Information processing often begins with input.

Examples:

- keyboard events,
- sensor readings,
- network packets,
- chemical concentrations.

Input is not just matter or energy.

It is matter or energy interpreted within a system of distinctions.

## Output

Processing produces output.

Examples:

- a number,
- a classification,
- a motor command,
- a changed internal state.

Output may itself become input to another system.

## Transformation

A simple model is:

\[
Input \rightarrow Transformation \rightarrow Output
\]

But this hides internal structure.

Real systems often involve:

- memory,
- feedback,
- branching,
- recurrent processing.

## Stateless Processing

Some transformations depend only on current input.

Example:

\[
f(x)=2x
\]

The same input always produces the same output.

No memory is needed.

## Stateful Processing

Other systems depend on history.

A password checker may lock an account after repeated failures.

The next output depends on:

- current input,
- previous state.

Computation then becomes temporal.

## Memory

Memory lets a system preserve distinctions across time.

Without memory, every input is treated in isolation.

With memory, the past can influence the future.

This greatly expands computational power.

## Representation Returns

A bit pattern such as:

`01000001`

might represent:

- 65,
- the letter A,
- a pixel value,
- part of an instruction.

Processing depends on how the state is interpreted.

The physical bits do not contain one intrinsic meaning.

## Syntax and Information Processing

At the machine level, a processor manipulates formal patterns.

It does not need semantic understanding.

Rules operate on syntax.

Meaning belongs to higher interpretive layers.

## Information Processing vs Meaning Processing

A spell checker can detect an invalid word pattern.

It may not understand the sentence.

A parser can analyze syntax.

It may not know whether the text is true.

Information processing does not imply semantic comprehension.

## Signals

A signal is a physical variation used to carry information.

Examples:

- voltage,
- light pulse,
- sound wave,
- molecular concentration.

The same physical medium can encode many symbol systems.

## Noise

Noise disrupts distinctions.

A communication system must preserve enough structure to recover intended information.

This connects information processing to Shannon's theory.

## Error Correction

Digital systems combat noise using redundancy.

For example, error-correcting codes add structure that lets a receiver detect or repair corrupted bits.

Information processing includes maintaining information, not only transforming it.

## Compression

Another operation is compression.

A redundant representation can be replaced by a shorter one.

Lossless compression preserves exact recoverability.

Lossy compression preserves selected features while discarding others.

Processing always reflects priorities.

## Filtering

A system may remove unwanted components.

Examples:

- smoothing sensor data,
- blocking spam,
- extracting frequencies.

Filtering changes which distinctions remain relevant.

## Classification

A classifier maps an input into a category.

For example:

\[
image \rightarrow cat
\]

Classification is information processing because a rich input state is transformed into a more compact label.

## Prediction

A predictive system maps:

past observations

to:

an estimate of future states.

Prediction is a form of information transformation under a model.

## Control

A control system uses information about the current state to influence future state.

Thermostat:

temperature reading

→ decision

→ heating action.

Information enters causal loops.

## Feedback

Feedback occurs when output affects later input.

This creates self-correcting dynamics.

Examples:

- thermostats,
- biological homeostasis,
- adaptive algorithms.

Information processing becomes circular rather than one-way.

## Shannon Information

Shannon information quantifies uncertainty reduction.

If a message tells us which event occurred, it changes our probability distribution.

Information processing can therefore be measured in bits.

## But Shannon Information Is Not Meaning

A random sequence can contain high Shannon information.

It may still mean nothing to a reader.

Processing formal information and processing semantic meaning are different notions.

## Computation and Information Processing

Computation is often described as information processing.

This is useful when computational states are treated as information-bearing structures.

But the concepts are not perfectly identical.

A physical process may carry information without implementing a programmable computation.

## Analog Processing

An analog circuit may transform voltage continuously.

If voltage represents a quantity, the circuit processes information.

Information processing is therefore not restricted to digital symbols.

## Neural Processing

Neurons transform:

- electrical,
- chemical

signals.

They integrate inputs and produce outputs.

Calling this information processing is natural.

But describing the brain only in information terms may omit:

- metabolism,
- anatomy,
- embodiment.

## Sensory Processing

Vision begins with light.

Neural systems transform retinal signals into representations related to:

- edges,
- motion,
- color,
- objects.

Each stage reorganizes information.

Perception is not passive recording.

## Biological Signaling

Cells process signals through molecular networks.

A receptor binds a molecule.

Internal pathways amplify or suppress responses.

Genes may change expression.

The system maps environmental distinctions into biological action.

## Gene Regulation

Gene regulatory networks integrate many inputs.

A gene may activate only if:

- signal A is present,
- signal B is absent.

This resembles logical computation.

But biological mechanisms are noisy, chemical, and historically evolved.

## Immune System

The immune system discriminates among molecular patterns.

It:

- detects,
- remembers,
- adapts.

Information-processing language can illuminate these functions.

But it should not erase biological specificity.

## Social Information Processing

Organizations also process information.

Reports are collected.

Rules transform them into decisions.

Institutions have:

- memory,
- channels,
- filters.

The analogy can be useful when mechanisms are specified.

## Markets

Prices aggregate dispersed information about:

- supply,
- demand,
- expectations.

Calling markets information-processing systems can reveal coordination mechanisms.

But price formation also involves institutions and power.

No metaphor should replace detail.

## Representation at Multiple Levels

Consider a photo on a computer.

At one level:

electrical states.

At another:

bits.

At another:

compressed image data.

At another:

pixels.

At another:

a face.

Information processing can be described at many levels.

## Which Level Is the Computation?

There may be several correct answers.

A transistor-level description explains physical implementation.

An algorithm-level description explains logical transformation.

A user-level description explains function.

Levels are complementary.

## Marr's Three Levels

David Marr famously distinguished:

- computational level: what problem is solved?
- algorithmic/representational level: how is it represented and processed?
- implementation level: how is it physically realized?

This framework remains influential in cognitive science.

## Computational-Level Question

At the computational level, ask:

What mapping is being achieved?

Example:

Given an image, estimate depth.

This describes the problem independently of implementation.

## Algorithmic Level

Now ask:

What representations and procedures accomplish the mapping?

Possible answers include:

- feature extraction,
- matching,
- probabilistic inference.

This is closer to conventional computer science.

## Implementation Level

Finally:

What physical substrate realizes the process?

Examples:

- silicon,
- neurons.

The same abstract function may have different implementations.

## Information Flow

Complex systems can be analyzed by tracking where information moves.

Examples:

- sensor → controller → actuator,
- DNA → RNA → protein,
- client → server → database.

Information-flow analysis reveals dependencies.

## Information Bottlenecks

A channel may have limited capacity.

If more information arrives than can be transmitted or processed, details are lost.

Bottlenecks occur in:

- networks,
- perception,
- organizations.

Capacity shapes behavior.

## Attention as Allocation

Attention can be understood partly as allocating limited processing capacity.

The system cannot process every signal equally.

Some information becomes foreground.

Other information is suppressed.

Figure-ground returns in computational form.

## Processing Costs Energy

Real information processing is physical.

Changing, storing, and erasing physical states requires resources.

Computation therefore has:

- energy costs,
- time costs,
- spatial costs.

Information is not detached from matter.

## Landauer's Principle

Landauer's principle connects logically irreversible information erasure to thermodynamic cost.

Erasing one bit has a minimum heat cost proportional to:

\[
kT\ln 2
\]

under idealized conditions.

Information processing has physical consequences.

## Reversible Computing

If computation is logically reversible, some forms of energy dissipation associated with erasure can in principle be reduced.

This links logical architecture to thermodynamics.

Computation is both abstract and physical.

## Information Processing as Explanation

Calling something an information processor is useful when it identifies:

- states,
- representations,
- transformations,
- causal roles.

Without these, the phrase can become vague.

Good explanation requires specifying the mechanism.

## The Philosophical Lesson

Information processing is structured transformation of distinguishable, often representational states.

It can occur in:

- computers,
- brains,
- cells,
- engineered control systems.

But the concept earns explanatory value only when the information-bearing states and transformations are made explicit.

## The Next Question

If computation can describe so many systems, perhaps it is more than a practical tool.

Could computation be a general principle for understanding nature?

Could laws, organisms, minds, and even physical reality be interpreted computationally?

That is the next question:

**Computation as a Principle, Not Just a Tool.**
