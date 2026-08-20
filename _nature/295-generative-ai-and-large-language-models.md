---
title: 'Generative AI and Large Language Models'
permalink: /nature/295-generative-ai-and-large-language-models/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 295
tags:
   - generative-ai
   - large-language-models
   - transformers
   - foundation-models
   - artificial-intelligence
---

Artificial intelligence once focused heavily on classification.

Is this image a cat?

Is this email spam?

Generative AI asks a different question:

Can a machine produce something new?

- text,
- image,
- code,
- music,
- video.

Large language models became one of the most visible forms of this shift.

## Generative vs Discriminative

A discriminative model often estimates something like:

\[
P(y|x)
\]

Given input \(x\), predict label \(y\).

A generative model instead learns structure that allows it to produce or model data itself.

## Language Modeling

A language model assigns probabilities to sequences.

Using the chain rule:

\[
P(w_1,\ldots,w_n)=\prod_{t=1}^{n}P(w_t|w_1,\ldots,w_{t-1})
\]

Autoregressive models learn to predict the next token.

Generation follows naturally.

## Tokens

Modern language models usually process tokens rather than whole words.

Tokens may represent:

- words,
- subwords,
- punctuation.

A tokenizer converts text into numerical IDs.

## Embeddings

Each token ID is mapped into a vector.

This vector is not a dictionary definition.

It is a learned representation useful for computation.

## Contextual Representation

The same token can acquire different internal meaning depending on context.

"bank" in:

river bank

and:

bank account

produces different contextual representations.

This is crucial for language.

## Transformer Architecture

Most modern large language models are based on the transformer family.

A transformer repeatedly applies:

- attention,
- nonlinear transformations,
- residual connections,
- normalization.

These operations build context-sensitive representations.

## Self-Attention

Self-attention lets each token selectively incorporate information from other tokens.

A simplified form is:

\[
Attention(Q,K,V)=softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V
\]

The exact implementation varies.

## Why Attention Matters

Language contains long-range dependencies.

A pronoun may refer to a noun many words earlier.

Attention provides a direct mechanism for relating distant tokens.

## Feed-Forward Layers

Between attention operations, transformers use learned nonlinear transformations.

These layers help build and transform features.

Attention is not the entire model.

## Residual Stream

Residual connections allow information to flow through many layers.

Later computations modify an evolving internal representation rather than repeatedly rebuilding it from scratch.

## Training Objective

For an autoregressive model, training often minimizes next-token prediction loss.

The model sees context.

It predicts a probability distribution over the next token.

Errors update parameters.

## Cross-Entropy

The objective rewards assigning high probability to the actual continuation.

Over huge corpora, this simple objective forces the model to learn many regularities.

## What Must Be Learned to Predict Text?

Good prediction benefits from knowledge of:

- grammar,
- style,
- facts,
- discourse,
- code,
- common reasoning patterns.

A narrow objective can create broad internal competence.

## Self-Supervision

No human needs to label every sentence.

The text provides its own target:

given the past,
predict what comes next.

This allows enormous training datasets.

## Pretraining

The first major stage is usually **pretraining**.

The model learns statistical structure from broad data.

Pretraining creates a general-purpose base model.

## Scale

Modern LLM capability depends strongly on:

- model capacity,
- data,
- compute.

Increasing these often improves predictive loss and downstream performance.

Scale is not the only factor.

## Scaling Laws

Empirical scaling laws describe relatively smooth relationships between resources and loss across ranges of training.

They help predict efficient allocation.

They do not guarantee specific higher-level abilities.

## Parameters

A parameter is a learned numerical value.

Large models can contain billions or more.

Parameter count alone does not determine intelligence.

Architecture, training data, optimization, and inference matter.

## Context Window

At inference time, the model receives a finite context.

This may include:

- instructions,
- conversation,
- documents.

The model conditions generation on this context.

## In-Context Learning

A model can infer patterns from examples placed directly in the prompt.

No weight update is required.

This is called **in-context learning**.

## Prompting

Prompts configure behavior.

They can specify:

- task,
- style,
- constraints.

Prompting is a form of temporary program specification through language.

## Few-Shot Examples

A prompt can contain demonstrations.

The model infers the pattern and continues it.

This can produce rapid task adaptation.

## Post-Training

A pretrained model predicts text.

A useful assistant must also follow:

- instructions,
- preferences,
- safety constraints.

Post-training shapes behavior.

## Supervised Fine-Tuning

One approach trains on examples of desirable responses.

The model learns instruction-following patterns.

This changes behavior without rebuilding the whole model from scratch.

## Preference Optimization

Humans can compare candidate responses.

A system can learn from these preferences.

Several modern methods use such feedback to improve helpfulness and alignment.

## Reinforcement Learning from Human Feedback

RLHF is one family of methods that uses human preference judgments to shape model behavior.

Broadly:

1. collect comparisons,
2. learn a preference or reward signal,
3. optimize the model toward preferred behavior.

Implementations vary.

## Direct Preference Optimization

Other methods optimize preference data more directly without a separate reinforcement-learning loop.

The technical landscape changes rapidly.

The underlying goal is similar:

shape outputs toward desired behavior.

## Alignment Is More Than Politeness

Alignment includes:

- following legitimate instructions,
- avoiding harmful behavior,
- respecting constraints.

It is a control problem over a highly capable generative model.

## Foundation Models

A large pretrained model can serve as a base for many tasks.

This is the **foundation model** idea.

One learned representation supports:

- writing,
- coding,
- reasoning,
- retrieval.

## Multimodality

Generative systems increasingly process multiple modalities:

- text,
- images,
- audio,
- video.

A model can learn shared representations across them.

## Vision–Language Models

A vision-language system connects images with text.

It can:

- describe,
- compare,
- answer visual questions.

Language becomes an interface to perception.

## Image Generation

Generative image models learn distributions over visual structure.

Diffusion models became especially influential.

They iteratively transform noise into structured images.

## Diffusion Intuition

Training teaches the model how to reverse gradual corruption.

Generation begins with noise.

Repeated denoising produces an image consistent with conditioning.

## Latent Diffusion

Instead of operating directly on full-resolution pixels, some systems generate in a compressed latent space.

This reduces computational cost.

## Generative Audio and Video

Similar generative ideas extend to:

- speech,
- music,
- video.

Modeling temporal coherence becomes increasingly difficult.

## Code Generation

Programming languages are structured symbolic systems.

Large models can learn:

- syntax,
- APIs,
- common algorithms.

Code generation turns language modeling into software assistance.

## Tool Use

A language model need not contain every capability internally.

It can call:

- calculator,
- search,
- database,
- code interpreter.

The model becomes a controller of external tools.

## Retrieval-Augmented Generation

**RAG** combines retrieval with generation.

The system searches an external source and conditions its answer on retrieved material.

This improves access to specific or updated information.

## Parametric vs External Memory

A model stores patterns in parameters.

External systems store explicit information in:

- documents,
- databases.

Modern architectures increasingly combine both.

## Agents

A language model can be placed inside an agent loop.

The system may:

1. interpret goal,
2. plan,
3. call tools,
4. inspect results,
5. revise.

This extends generation into action.

## Long-Horizon Tasks

One response is easy.

Coordinating dozens of steps is harder.

Long-horizon systems need:

- memory,
- error recovery,
- state tracking.

Agentic competence is not identical to language fluency.

## Hallucination

A generative model can produce a fluent but false statement.

This is often called a **hallucination**.

The term is metaphorical.

The key issue is ungrounded generation.

## Why Hallucination Happens

The model optimizes for probable continuation.

It is not inherently a database with guaranteed factual verification.

Plausibility can outrun truth.

## Verification

Reliable systems can add:

- retrieval,
- calculators,
- formal checkers,
- citations.

Generation can be separated from verification.

## Calibration

A good system should know when uncertainty is high.

But language models may express confidence poorly.

Verbal confidence and actual correctness can diverge.

## Reasoning

LLMs can solve many reasoning problems.

But performance is uneven.

They may succeed on complex tasks and fail on simple variants.

This suggests multiple mechanisms rather than one stable reasoning engine.

## Chain-of-Thought-Like Computation

Providing intermediate reasoning steps can improve some tasks.

More broadly, allocating extra computation at inference time can improve performance.

The mechanism need not mirror human inner speech.

## Search at Inference Time

Modern systems may generate several candidate solutions and:

- compare,
- verify,
- revise.

This reconnects LLMs with classical search.

Generative AI does not replace older AI ideas.

## Memorization

Large models can memorize some training material.

This is expected in high-capacity systems.

But they also generalize beyond exact memorization.

The challenge is distinguishing the two.

## Compression View

One way to understand pretraining is as lossy compression of statistical structure in culture.

The model cannot store every training token explicitly.

It learns reusable regularities.

## Cultural Distillation

Training data contains traces of:

- science,
- literature,
- software,
- everyday conversation.

The model therefore learns from accumulated human culture.

Its intelligence is historically scaffolded.

## Bias

The same data contains:

- prejudice,
- misinformation,
- imbalance.

Models can reproduce these patterns.

Large-scale learning inherits both strengths and defects of culture.

## Copyright and Provenance

Generative systems raise questions about:

- training-data rights,
- attribution,
- derivative outputs.

Technical generation and legal ownership are separate issues.

## Energy and Infrastructure

Large models require substantial:

- computation,
- hardware,
- electricity.

AI capability is not immaterial.

It depends on physical infrastructure.

## Data Centers

The apparent simplicity of a chat interface hides:

- accelerators,
- networks,
- cooling,
- storage.

Generative AI is a planetary-scale computational technology.

## Economics of Scale

Training frontier models can be expensive.

This creates concentration around organizations with access to:

- capital,
- compute,
- data.

Technical architecture influences institutional structure.

## Open Models

Openly available models can broaden experimentation.

They can also reduce centralized control.

Openness introduces both:

- innovation benefits,
- misuse risks.

## Evaluation

LLMs are evaluated on:

- knowledge,
- coding,
- math,
- reasoning,
- instruction following.

No single benchmark defines intelligence.

## Benchmark Contamination

If evaluation material appears in training data, scores can overstate generalization.

Fresh and interactive tests are increasingly important.

## Emergent-Looking Capabilities

Some skills appear suddenly as models scale.

But thresholded metrics can exaggerate discontinuity.

Capability growth should be analyzed carefully.

## Is Next-Token Prediction Enough?

The surprising fact is that next-token prediction can produce very broad abilities.

But broad ability does not prove:

- human-like understanding,
- consciousness,
- agency.

Those are additional questions.

## Stochastic Parrot Critique

Critics have described large language models as systems that recombine linguistic patterns without genuine understanding.

This critique highlights:

- grounding,
- meaning,
- training-data dependence.

But the metaphor can also underestimate learned abstraction.

## Capability Is Empirical

Whether a model can:

- reason,
- generalize,
- use tools

should be tested.

Labels alone do not settle competence.

We need behavior and mechanism.

## Architecture Is Not Destiny

A transformer can support very different systems depending on:

- training,
- tools,
- memory,
- post-training.

"LLM" does not describe one fixed level of intelligence.

## The Philosophical Lesson

Generative AI shows that learning to predict structured data at scale can produce systems with unexpectedly broad capabilities.

Large language models are:

- statistical,
- computational,
- cultural artifacts.

Their outputs can look deeply meaningful.

The next question is whether that meaning belongs only to us as interpreters—or also to the model.

## The Next Question

A language model can:

- answer,
- explain,
- translate,
- reason.

But does it **understand** what it says?

That is the next topic:

**Do Language Models Understand?**
