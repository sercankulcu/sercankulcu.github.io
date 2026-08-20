---
title: 'Bits and Binary Representation'
permalink: /nature/135-bits-and-binary-representation/
chapter: 8
chapter_title: 'Information and Representation'
order: 135
tags:
   - bits
   - binary
   - digital-computing
   - representation
   - information
---

Modern computers reduce astonishing diversity to two symbols:

\[
0
\]

and

\[
1
\]

Text.

Images.

Music.

Video.

Programs.

All can be represented as binary sequences.

This does not mean reality itself is made of zeros and ones.

It means two distinguishable states are enough to build a universal digital representation system.

## What Is a Bit?

A **bit** is a binary digit.

It can take one of two logical values:

\[
0
\]

or

\[
1
\]

The bit is abstract.

A physical device must realize it using distinguishable states.

## Physical Realization

A bit might be represented by:

- high vs low voltage,
- magnetization direction,
- charge vs no charge,
- optical state.

Different technologies implement the same abstract bit.

This is another example of substrate independence.

## Why Binary?

Two-state systems are attractive because they are easy to distinguish reliably in noisy physical environments.

A circuit can define broad voltage ranges:

low → 0

high → 1.

Exact voltage does not matter.

Only the logical category does.

## Noise Margin

Digital circuits tolerate small fluctuations.

A voltage may vary slightly without changing its interpreted bit.

This **noise margin** makes digital systems robust.

Binary computing succeeds partly because representation ignores irrelevant physical detail.

## Bit vs Physical State

A transistor is not literally a 0 or 1.

It occupies a physical state that the system interprets as one of those values.

The logical and physical levels are distinct.

This distinction becomes important throughout computer science.

## Binary Numbers

Binary positional notation works like decimal notation but with base 2.

For example:

\[
1011_2
\]

means:

\[
1\cdot2^3+0\cdot2^2+1\cdot2^1+1\cdot2^0
\]

which equals:

\[
11_{10}
\]

The string and the number are not identical.

The string represents the number under a convention.

## Place Value

Each binary position represents a power of two:

\[
\ldots, 2^3,2^2,2^1,2^0
\]

This makes arithmetic systematic.

Binary is not inherently less expressive than decimal.

It simply uses fewer symbols and more positions.

## Bytes

A **byte** usually contains eight bits.

For example:

\[
01000001
\]

A byte can represent 256 different bit patterns.

Because:

\[
2^8=256
\]

Bytes became a standard unit of digital storage.

## Octets

In networking and standards contexts, the word **octet** explicitly means eight bits.

This avoids historical ambiguity because early computing systems did not always use eight-bit bytes.

Today, byte and octet are often effectively equivalent in common systems.

## Hexadecimal

Long binary strings are hard for humans to read.

Hexadecimal uses sixteen symbols:

\[
0,1,\ldots,9,A,B,C,D,E,F
\]

Each hexadecimal digit corresponds exactly to four bits.

This makes conversion compact.

## Example

Binary:

\[
11111111
\]

can be grouped:

\[
1111\ 1111
\]

Each group is:

\[
F
\]

so the hexadecimal representation is:

\[
FF
\]

Humans gain readability without changing the underlying bit pattern.

## Signed Integers

Computers need to represent negative numbers.

A common system is **two's complement**.

It allows:

- positive,
- negative,
- zero

to share efficient binary arithmetic.

The same physical bits receive meaning through a numerical representation rule.

## Floating-Point Numbers

Real-valued calculations often use floating-point formats.

A bit pattern is divided into fields representing:

- sign,
- exponent,
- significand.

This allows a huge numerical range.

But many real numbers cannot be represented exactly.

## Precision

The decimal number:

\[
0.1
\]

does not have a finite exact binary expansion.

So ordinary floating-point computers store an approximation.

This can produce surprising arithmetic results.

Representation affects computation.

## Text as Bits

A character such as `A` can be assigned a code point.

That code point is encoded as bytes.

Those bytes are binary patterns.

So text becomes bits through several representational mappings.

There is no letter shape inside the memory cell.

## Images as Bits

An image can be represented as a grid of pixel values.

Each channel is stored numerically.

The numbers become binary.

A photograph becomes a large bit string interpreted under an image format.

The same bits under another interpretation might be meaningless.

## Sound as Bits

Audio is sampled.

Each sample amplitude is represented numerically.

The numbers become bits.

Playback reverses the process.

Binary representation can encode continuous-looking sound through discrete samples.

## Programs as Bits

Machine instructions are also binary patterns.

Some bit sequences mean:

- load,
- add,
- jump,
- store.

The processor's architecture defines the interpretation.

Data and instructions can therefore share the same physical memory.

## Same Bits, Different Meaning

Consider:

\[
01000001
\]

It could represent:

- decimal 65,
- the ASCII character `A`,
- part of an image,
- part of a machine instruction.

Nothing inside the bit pattern chooses one interpretation.

Context does.

This will be the next major topic.

## Bit Strings Have No Built-In Type

At the hardware level, memory is often just bits.

Software supplies type information.

The same 32 bits may be interpreted as:

- integer,
- floating-point number,
- instruction,
- address.

Representation is layered.

## Endianness

Even byte order can depend on convention.

Multi-byte numbers may be stored:

- most significant byte first,
- least significant byte first.

These are often called big-endian and little-endian representations.

The abstract number remains the same.

The byte sequence changes.

## Binary Logic

Bits also support Boolean logic.

0 and 1 can represent:

- false and true.

Logic gates implement operations such as:

- AND,
- OR,
- NOT.

Digital computation builds complex operations from simple binary distinctions.

## Transistors and Logic Gates

Transistors implement physical switching behavior.

Groups of transistors form logic gates.

Logic gates form circuits.

Circuits implement arithmetic and memory.

Higher-level computation emerges from physical state transitions.

## Binary Is Not Required for Computation

Computers could use:

- ternary,
- decimal,
- analog states.

Historical machines have explored alternatives.

Binary dominates because it is practical, robust, and compatible with electronic switching.

It is an engineering success, not a logical necessity.

## Information Capacity

A system with \(n\) independent bits can represent:

\[
2^n
\]

distinct patterns.

Ten bits:

\[
2^{10}=1024
\]

possibilities.

A modest number of bits creates enormous representational capacity.

## Combinatorial Growth

With 100 bits:

\[
2^{100}
\]

possible strings exist.

This number is astronomically large.

Simple binary alphabets produce vast state spaces.

Finite symbols again generate enormous worlds.

## Entropy and Bits

If two outcomes are equally likely, distinguishing them requires one bit of Shannon information.

More generally, the expected number of bits needed depends on probability distribution.

Binary representation and information theory fit naturally together.

## Bits Are Not Meaning

A bit measures or represents a distinction.

It does not carry semantic meaning by itself.

Meaning emerges only when a system maps bit patterns to:

- characters,
- numbers,
- actions,
- images.

This distinction must remain clear.

## Digital Does Not Mean Exact

Digital systems are robust but finite.

They have:

- limited precision,
- finite storage,
- sampling limits.

A digital representation can approximate reality extremely well without reproducing every physical detail.

## Binary as Universal Medium

The power of binary comes from representational universality.

Anything that can be encoded into discrete symbols can, in principle, be translated into bit strings.

This makes binary a common substrate for:

- communication,
- storage,
- computation.

## The Next Question

If the same bit pattern can represent a number, a letter, an image, or an instruction, then the bits alone cannot determine meaning.

The physical pattern is unchanged.

Only the interpretation changes.

That leads directly to:

**Why can the same bits mean different things?**
