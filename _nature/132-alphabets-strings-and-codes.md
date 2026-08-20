---
title: 'Alphabets, Strings, and Codes'
permalink: /nature/132-alphabets-strings-and-codes/
chapter: 8
chapter_title: 'Information and Representation'
order: 132
tags:
   - alphabets
   - strings
   - codes
   - formal-languages
   - representation
---

Before information can be stored or transmitted, we need distinguishable symbols.

Collect a finite set of symbols.

Arrange them in sequences.

Assign rules or interpretations.

From these simple ingredients we get:

- text,
- numbers,
- programs,
- genetic sequences,
- digital files.

The basic concepts are **alphabet**, **string**, and **code**.

## Alphabet

In formal language theory, an **alphabet** is a finite set of symbols.

For example:

\[
\Sigma=\{0,1\}
\]

is the binary alphabet.

Another alphabet might be:

\[
\Sigma=\{A,C,G,T\}
\]

which resembles the four DNA bases.

The symbols need not be letters in the ordinary linguistic sense.

## Symbol Identity

Symbols must be distinguishable.

If a system cannot tell two states apart, they cannot function as separate symbols.

A physical implementation therefore needs reliable differences.

For digital electronics, voltage ranges may represent 0 and 1.

## Strings

A **string** is a finite sequence of symbols from an alphabet.

Using:

\[
\Sigma=\{0,1\}
\]

examples include:

\[
0
\]

\[
101
\]

\[
001101
\]

Order matters.

`01` and `10` are different strings.

## The Empty String

Formal systems include the **empty string**, usually written:

\[
\epsilon
\]

It contains zero symbols.

It is not the same as no concept at all.

The empty string is a legitimate formal object.

Earlier, the empty set played a similar role in mathematics.

## Length

The length of a string \(w\) is written:

\[
|w|
\]

For:

\[
w=10110
\]

we have:

\[
|w|=5
\]

Length counts symbol positions, not meaning.

## Concatenation

Strings can be joined.

If:

\[
x=01
\]

and:

\[
y=110
\]

then concatenation gives:

\[
xy=01110
\]

This simple operation is fundamental to formal languages.

## All Strings

Given alphabet \(\Sigma\), the notation:

\[
\Sigma^*
\]

means the set of all finite strings over that alphabet, including the empty string.

A finite alphabet can therefore generate infinitely many possible strings.

This connects directly to recursion.

## Binary Alphabet

Digital computing often reduces information to two symbolic states:

\[
\{0,1\}
\]

Why binary?

Because two-state physical systems are easy to distinguish reliably.

Binary representation is simple, robust, and universal enough to encode many forms of data.

## More Than Binary

Information need not be binary.

We can use alphabets with:

- 3 symbols,
- 4 symbols,
- 10 digits,
- thousands of characters.

Binary is a practical foundation for modern digital systems, not a metaphysical requirement.

## Codes

A **code** maps symbols or messages from one representation into another.

For example:

letter → binary pattern.

A code is a rule of correspondence.

It allows the same information to be represented differently.

## Morse Code

Morse code maps characters into sequences of:

- short signals,
- long signals.

The letter A becomes one pattern.

B becomes another.

The physical carrier may be:

- sound,
- light,
- electrical pulse.

The code is independent of the medium.

## Character Encoding

Computers need numerical representations of text.

Character encodings map characters to numbers.

Modern systems commonly use Unicode standards to represent a huge range of writing systems.

The symbolic character and its binary encoding are different layers.

## ASCII

ASCII historically assigned numbers to a limited set of characters.

For example, the uppercase letter `A` corresponds to decimal 65 in ASCII.

That number can then be represented in binary.

The visible letter is separated from its machine representation by several coding layers.

## Unicode

Unicode expands the idea dramatically.

It assigns **code points** to characters from many scripts and symbol systems.

Encoding schemes such as UTF-8 then represent those code points as byte sequences.

Character identity and byte representation are not the same thing.

## Code Points vs Glyphs

A code point represents an abstract character.

A **glyph** is a visual rendering.

The same character can appear in different:

- fonts,
- styles,
- sizes.

Representation has layers even inside writing.

## Numerical Codes

Numbers themselves need representations.

The number ten can be written:

\[
10
\]

in decimal.

Or:

\[
1010
\]

in binary.

Or:

\[
A
\]

in hexadecimal notation.

The underlying number is distinguished from its symbolic representation.

## Codes Are Conventions

Nothing about the letter A forces it to correspond to decimal 65.

The mapping is conventional.

Another encoding could choose another number.

What matters is consistency between encoder and decoder.

## Encoding

**Encoding** converts information into a chosen representation.

Text → bytes.

Audio → digital samples.

Image → pixel values.

The output must follow a known scheme.

## Decoding

**Decoding** reverses the mapping.

Bytes → text.

Signals → symbols.

The receiver must know or infer the code.

Without the correct decoding rule, the same data may produce another interpretation.

## Prefix Codes

Some codes are designed so that no valid code word is the prefix of another.

These are **prefix codes**.

They allow symbols to be decoded unambiguously from a stream.

Huffman coding is a famous example.

## Variable-Length Codes

Frequent symbols can be assigned shorter code words.

Rare symbols receive longer ones.

This reduces average message length.

Compression begins with probabilistic structure.

Shannon's ideas make this precise.

## Error-Detecting Codes

Codes can include redundancy to detect errors.

Suppose one bit flips during transmission.

Extra structure can reveal that the received word is invalid.

This is why redundancy is not always waste.

It can buy reliability.

## Error-Correcting Codes

More sophisticated codes can reconstruct the intended message even after some errors.

Examples include:

- Hamming codes,
- Reed-Solomon codes.

Error correction is essential in:

- storage,
- communication,
- space missions.

Information survives imperfect physical channels through mathematical structure.

## DNA as an Alphabet

Biology uses four nucleotide bases:

\[
\{A,C,G,T\}
\]

DNA sequences can therefore be treated formally as strings.

This abstraction is extremely useful.

But biological meaning depends on cellular context.

A DNA alphabet is not merely a human codebook.

It is part of an evolved biochemical system.

## Codons

Protein-coding regions are read in groups of three nucleotides called **codons**.

Different codons correspond to amino acids or control signals in the translation system.

This mapping is often called the **genetic code**.

It is one of nature's clearest code-like systems.

## Same String, Different Interpretation

A bit string can represent:

- integer,
- text,
- pixel,
- machine instruction.

The string itself does not contain its interpretation visibly.

The code determines the mapping.

This will become central in the next essays.

## Formal Languages

A **formal language** is a set of strings over an alphabet.

Not every possible string must be valid.

A grammar or rule system determines membership.

Programming languages and logical calculi are built this way.

## Syntax Before Meaning

At the formal level, we can ask:

Is this string valid?

without asking:

What does it mean?

This separation between syntax and semantics is one of the foundations of computer science and logic.

## Coding Creates Layers

A text message may pass through many layers:

idea → words → characters → code points → bytes → electrical signals.

At the receiver, the process reverses.

Meaning survives because mappings remain coordinated.

Communication is layered representation.

## The Next Question

A symbol can stand for something else.

A string can encode a message.

But representation itself deserves closer examination.

How can one thing stand for another?

What makes a map represent a city, a word represent an object, or a number represent a quantity?

The next question is:

**What is representation?**
