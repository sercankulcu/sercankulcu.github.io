---
title: 'Shannon Information'
permalink: /nature/145-shannon-information/
chapter: 8
chapter_title: 'Information and Representation'
order: 145
tags:
   - shannon-information
   - probability
   - communication
   - entropy
   - bits
---

How much information does a message contain?

The answer depends on what we expected before receiving it.

If a message tells us something certain, it gives us no surprise.

If it resolves one of many possibilities, it gives us more.

Claude Shannon turned this intuition into mathematics.

His theory became the foundation of digital communication.

## Information and Surprise

Suppose an event has probability \(p\).

A rare event is more surprising than a common one.

Shannon defined the information associated with observing an event as:

\[
I(x)=-\log_2 p(x)
\]

The smaller the probability, the larger the information.

## Why a Logarithm?

The logarithm gives an important property.

If two independent events occur, their information adds.

If:

\[
p(x,y)=p(x)p(y)
\]

then:

\[
I(x,y)=I(x)+I(y)
\]

This makes information behave naturally across combined events.

## The Bit

Using base-2 logarithms gives information in **bits**.

If two outcomes are equally likely:

\[
p=rac{1}{2}
\]

then:

\[
I=-\log_2\left(rac{1}{2}ight)=1
\]

One binary choice corresponds to one bit.

## A Fair Coin

A fair coin has two equally likely outcomes.

Heads.

Tails.

Before the toss, uncertainty exists.

After observing the result, one bit of uncertainty has been resolved.

The outcome carries one bit of Shannon information.

## A Biased Coin

Suppose heads occurs 99% of the time.

Observing heads is unsurprising.

Observing tails is rare.

Tails therefore carries more information than heads under Shannon's definition.

Information depends on probability, not importance.

## Information Is Contextual to a Model

The probability distribution matters.

If you expect rain every day, "rain" carries little information.

If rain is extremely rare, the same observation carries much more.

Information is defined relative to an assumed source distribution.

## Entropy

The expected information produced by a source is its **Shannon entropy**:

\[
H(X)=-\sum_x p(x)\log_2 p(x)
\]

Entropy measures average uncertainty before observing the outcome.

It also measures average information gained after observing it.

## Maximum Entropy

For a finite set of possible outcomes, entropy is highest when all outcomes are equally likely.

If one outcome is almost certain, entropy is low.

Uniform uncertainty maximizes potential information.

## A Four-Symbol Source

Suppose a source emits:

\[
A,B,C,D
\]

each with probability:

\[
rac{1}{4}
\]

Then each symbol carries:

\[
-\log_2\left(rac{1}{4}ight)=2
\]

bits.

The entropy is 2 bits per symbol.

## Unequal Probabilities

Now suppose:

- A: 0.7
- B: 0.1
- C: 0.1
- D: 0.1

The average entropy is lower than 2 bits.

The source is more predictable.

Compression can exploit that predictability.

## Coding Theorem

Shannon showed that, under suitable assumptions, the average number of bits needed to encode source messages cannot be reduced arbitrarily below the source entropy.

Entropy therefore sets a fundamental compression limit.

Probability becomes a measure of coding efficiency.

## Redundancy

Natural language is redundant.

Some letters and words are predictable from context.

This makes text compressible.

It also makes communication robust to errors.

You can often understand a sentence even when some letters are missing.

## Conditional Entropy

The uncertainty of one variable can decrease when another variable is known.

This is measured by **conditional entropy**.

Knowing context reduces uncertainty.

Formally, this connects information theory to prediction.

## Mutual Information

**Mutual information** measures how much knowing one variable tells us about another.

If \(X\) and \(Y\) are independent:

\[
I(X;Y)=0
\]

If they are strongly related, mutual information is larger.

This concept is widely used in:

- neuroscience,
- machine learning,
- genetics.

## Communication Channel

Shannon studied communication through channels.

A sender produces symbols.

A channel transmits them.

Noise may corrupt them.

The receiver must infer the intended message.

Information theory asks how much reliable communication is possible.

## Channel Capacity

Every noisy channel has a maximum rate at which information can be transmitted reliably under a given model.

This is the **channel capacity**.

Shannon showed that error rates can be made arbitrarily small below capacity using suitable coding.

This was a revolutionary result.

## Noise

Noise introduces uncertainty between sent and received signals.

The receiver may see:

0

when 1 was sent.

Error-correcting codes add structured redundancy to overcome this.

Information theory quantifies the tradeoff.

## Compression and Error Correction

Compression removes predictable redundancy.

Error correction adds deliberate redundancy.

These sound opposite.

They solve different problems.

Compression saves space.

Error correction increases reliability.

## Semantic Meaning Is Absent

Shannon explicitly abstracted away from meaning.

A transmission system does not care whether the message is:

- poetry,
- stock prices,
- nonsense.

It cares about symbol probabilities and reliable transmission.

This abstraction made the theory universal.

## High Information Can Be Meaningless

A random bit string can have high Shannon information.

It may mean nothing.

A meaningful repeated phrase may have low entropy.

Therefore Shannon information is not a measure of:

- truth,
- usefulness,
- importance,
- wisdom.

## Why the Theory Is So Powerful

Because it ignores semantics, Shannon's framework applies across substrates.

The same mathematics can describe:

- telegraphy,
- radio,
- digital networks,
- genetic sequences,
- quantum communication.

The theory measures distinction and uncertainty.

## Information as Reduction of Uncertainty

A practical summary is:

**Shannon information measures how much uncertainty an observation resolves relative to a probability model.**

This is narrower than everyday information.

But it is precise.

## The Next Question

Shannon called his uncertainty measure "entropy."

That word already existed in thermodynamics.

Was this merely a borrowed name?

Or is there a deeper connection between information and physical entropy?

The next topic is:

**information and entropy.**
