---
title: 'Natural Language Processing'
permalink: /nature/288-natural-language-processing/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 288
tags:
   - natural-language-processing
   - language
   - semantics
   - transformers
   - artificial-intelligence
---

Language is one of the richest products of human intelligence.

It combines:

- symbols,
- grammar,
- meaning,
- context,
- social intention.

Teaching machines to process language became one of AI's oldest and hardest ambitions.

This field is called **Natural Language Processing**, or NLP.

## What NLP Tries to Do

NLP includes tasks such as:

- translation,
- summarization,
- question answering,
- information extraction,
- dialogue.

Each task requires different aspects of language competence.

## Language Is Structured

A sentence is not a bag of words.

Word order matters.

Compare:

Dog bites man.

Man bites dog.

The words are similar.

The relation changes.

## Tokenization

Before processing text, systems divide it into units called **tokens**.

Tokens may be:

- words,
- subwords,
- characters.

Modern models often use subword units.

## Why Subwords?

A fixed word vocabulary struggles with:

- rare words,
- morphology,
- new terms.

Subwords let models compose unfamiliar words from reusable pieces.

## Syntax

Syntax concerns structural relationships among words.

A parser may determine:

- subject,
- verb,
- object,
- modifier.

Syntax supports interpretation.

## Constituency Parsing

A constituency parser groups words into nested phrases.

Example:

```text
[NP The student]
[VP read
    [NP the book]]
```

This represents hierarchical grammar.

## Dependency Parsing

Dependency parsing represents direct grammatical relations between words.

Example:

read ← subject — student

read ← object — book

This gives a relational graph.

## Semantics

Semantics concerns meaning.

A system should distinguish:

The dog chased the cat.

from:

The cat chased the dog.

Structural relations determine semantic roles.

## Semantic Role Labeling

A system may identify:

- agent,
- patient,
- instrument,
- location.

This asks:

Who did what to whom?

It connects language to event representation.

## Pragmatics

Meaning depends on context and intention.

"Can you open the window?"

usually functions as a request.

Literal semantics is insufficient.

## Coreference

Consider:

Alice gave Mary the book because she had finished it.

Who does:

she

refer to?

NLP systems must resolve such references.

## Ambiguity

Language is full of ambiguity.

A word can have multiple meanings.

A sentence can have multiple parses.

Context selects among possibilities.

## Word Sense Disambiguation

The word:

bank

may refer to:

- finance,
- river edge.

A system must infer the intended sense.

This requires context.

## Named Entity Recognition

NLP systems identify entities such as:

- people,
- places,
- organizations.

This supports information extraction.

## Information Extraction

A system can convert text into structured facts.

Example:

"Marie Curie was born in Warsaw."

becomes:

```text
person: Marie Curie
relation: born-in
place: Warsaw
```

Text becomes knowledge representation.

## Machine Translation

Machine translation maps text between languages.

This requires more than word substitution.

It must preserve:

- meaning,
- grammar,
- context.

## Early Rule-Based Translation

Early systems used:

- dictionaries,
- grammar rules.

They required extensive manual engineering.

Coverage was limited.

## Statistical Machine Translation

Later systems learned translation patterns from bilingual corpora.

Probability replaced many handcrafted rules.

This was a major shift.

## Neural Machine Translation

Neural networks learned end-to-end mappings between languages.

Sequence-to-sequence models greatly improved fluency.

Attention improved handling of long-range relations.

## Language Models

A language model estimates probability over sequences.

A basic objective is:

\[
P(w_1,w_2,\ldots,w_n)
\]

Using the chain rule:

\[
P(w_1,\ldots,w_n)=\prod_t P(w_t|w_{<t})
\]

Prediction becomes the training task.

## N-Gram Models

Older language models estimated probability from short word histories.

A trigram model approximates:

\[
P(w_t|w_{t-2},w_{t-1})
\]

This captures local patterns.

Long-range context is limited.

## Sparsity

Natural language has enormous combinatorial variety.

Many valid sequences never appear in training.

N-gram models suffer from sparse data.

Smoothing helps but does not solve deep structure.

## Distributed Word Representations

Neural NLP introduced word embeddings.

Words with similar contexts acquire similar vectors.

Meaning becomes geometric.

## Word2Vec

Methods such as Word2Vec learned embeddings from prediction objectives.

Famous vector analogies attracted attention.

The deeper contribution was distributed semantic representation.

## Contextual Embeddings

A fixed word vector cannot distinguish:

bank of a river

from:

bank account.

Contextual models assign different representations depending on sentence context.

## Transformers

Transformers made contextual representation dramatically more effective.

Self-attention allows every token to interact with other relevant tokens.

This supports long-range dependency modeling.

## Pretraining

Large models are trained on broad text corpora using self-supervised objectives.

Then they can be adapted to many tasks.

This shifted NLP from:

task-specific systems

to:

general pretrained models.

## Masked Language Modeling

Some models learn by predicting hidden tokens.

Example:

"The cat sat on the [MASK]."

The model uses context to infer likely words.

## Autoregressive Modeling

Autoregressive models predict the next token:

\[
P(w_t|w_1,\ldots,w_{t-1})
\]

Generation follows by repeatedly sampling or selecting next tokens.

## Next-Token Prediction Looks Simple

The objective appears narrow.

Yet succeeding at large scale requires learning structure about:

- grammar,
- facts,
- style,
- reasoning patterns.

The training objective can induce broad internal representations.

## Sequence Generation

At inference time, a model generates token by token.

Choices may use:

- greedy decoding,
- beam search,
- sampling.

Decoding affects output quality.

## Temperature

Sampling temperature changes randomness.

Lower temperature:

more concentrated predictions.

Higher temperature:

more diverse output.

The underlying model is unchanged.

## Beam Search

Beam search keeps several promising partial sequences.

It is common in structured generation tasks.

It trades diversity for high-probability outputs.

## Large Language Models

Large language models, or LLMs, extend transformer language modeling with scale.

They can perform:

- writing,
- coding,
- question answering,
- translation.

This broad competence was surprising to many observers.

## In-Context Learning

A model can sometimes infer a task from examples placed directly in the prompt.

Parameters need not change.

The context itself configures behavior.

This is **in-context learning**.

## Few-Shot Prompting

Provide a few examples.

The model continues the pattern.

This resembles rapid adaptation.

The exact mechanism is an active research topic.

## Instruction Following

Models can be trained to respond to natural-language instructions.

This transforms a language model into a more general user-facing system.

Behavior becomes aligned with conversational goals.

## Retrieval

A model can be connected to external retrieval systems.

This provides access to:

- documents,
- databases,
- current information.

Retrieval reduces dependence on fixed internal memory.

## Tool Use

Language models can also call:

- calculators,
- search engines,
- code interpreters.

Language becomes a control interface for external computation.

## Hallucination

A language model can generate fluent false statements.

Why?

Its core objective is to generate plausible continuations.

Truth and likelihood are related but not identical.

## Factuality

Improving factuality may require:

- retrieval,
- verification,
- calibrated uncertainty.

Fluency alone is insufficient.

## Semantic Understanding

Do language models understand language?

This depends on what we mean by:

understand.

Functional competence is clear in many domains.

Phenomenal or human-like understanding is a deeper question.

## Symbol Grounding Again

Text-only systems learn relations among symbols produced by humans.

Do they connect those symbols to the world?

Multimodal and tool-using systems provide richer grounding.

The philosophical issue remains.

## Distributional Semantics

A classic idea says:

You shall know a word by the company it keeps.

Meaning can be inferred partly from usage patterns.

Modern language models implement this principle at enormous scale.

## Is Distribution Enough?

Usage captures a great deal.

But critics argue meaning also depends on:

- embodiment,
- reference,
- social practice.

Distributional learning may be necessary without being sufficient.

## Pragmatics and Social Meaning

Conversation requires modeling:

- intent,
- politeness,
- implication.

Modern models learn many pragmatic patterns statistically.

They can still fail in unusual social contexts.

## Dialogue

A dialogue system must maintain:

- conversational history,
- user goals,
- references.

This requires state across turns.

Language is interactive.

## Long Context

Modern systems can process increasingly long contexts.

But access to more tokens does not guarantee perfect memory or reasoning across them.

Context management remains an engineering problem.

## Summarization

Summarization requires deciding:

- what is important,
- what can be omitted.

This is not merely compression.

It is relevance modeling.

## Question Answering

Question answering can involve:

- retrieval,
- reasoning,
- synthesis.

A system may answer from internal representation or external sources.

The mechanism matters for reliability.

## Information Retrieval vs Language Modeling

Search retrieves existing documents.

Language models generate new sequences.

Modern systems increasingly combine both.

This reduces the old boundary between retrieval and generation.

## Evaluation

NLP evaluation includes:

- accuracy,
- BLEU,
- ROUGE,
- human judgment.

Automatic metrics capture only parts of quality.

Meaning is difficult to reduce to one number.

## Benchmark Saturation

As systems improve, benchmarks can become too easy.

Performance no longer discriminates capabilities.

New evaluations must probe deeper generalization.

## Adversarial Language

Small wording changes can alter model behavior.

This reveals sensitivity to:

- phrasing,
- context,
- instruction hierarchy.

Robust language understanding is difficult.

## Multilingual NLP

Language technology must handle structural diversity.

Languages vary in:

- morphology,
- word order,
- scripts.

English-centric assumptions do not generalize universally.

## Low-Resource Languages

Many languages have limited digital data.

Large models may perform much worse there.

Data availability creates linguistic inequality.

## Bias in Language Models

Training text contains human stereotypes and prejudice.

Models can reproduce them.

Language learning is cultural learning.

It inherits culture's problems.

## NLP and Thought

Language models raise an ancient question in a new form:

Can sophisticated linguistic behavior exist without thought?

The answer depends on how thought is defined.

## NLP and Intelligence

Language is an unusually broad testbed.

To use it well, systems need some combination of:

- memory,
- knowledge,
- reasoning,
- social modeling.

This is why NLP became central to modern AI.

## The Philosophical Lesson

Natural Language Processing attempts to mechanize the movement from:

symbols

to:

structure,
meaning,
context,
interaction.

Modern neural models have achieved extraordinary fluency.

But the deepest question remains:

Does successful language use amount to understanding?

## The Next Question

Language is only one sensory domain.

Intelligent systems must also interpret:

- images,
- motion,
- physical scenes.

And they must act in the world.

The next essay turns to:

**Computer Vision and Robotics.**
