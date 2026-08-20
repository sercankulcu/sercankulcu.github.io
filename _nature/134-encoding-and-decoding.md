---
title: 'Encoding and Decoding'
permalink: /nature/134-encoding-and-decoding/
chapter: 8
chapter_title: 'Information and Representation'
order: 134
tags:
   - encoding
   - decoding
   - communication
   - codes
   - representation
---

A message can change form without changing what it represents.

Speech becomes electrical signal.

Text becomes bytes.

An image becomes compressed data.

DNA sequence becomes protein through cellular machinery.

These transformations involve **encoding** and **decoding**.

Encoding maps one representation into another.

Decoding reconstructs or interprets the encoded form.

## Encoding

An encoder takes an input from one representational system and produces output in another.

For example:

character → Unicode code point → UTF-8 bytes.

The same abstract character passes through several layers.

Each layer uses a different alphabet.

## Decoding

A decoder applies the inverse or corresponding interpretation.

Bytes become code points.

Code points become characters.

Characters become words.

Words are interpreted by readers.

Decoding can therefore occur in several stages.

## Invertible Codes

Some encodings are designed to be reversible.

If:

\[
E(x)=y
\]

and decoding satisfies:

\[
D(y)=x
\]

then the original can be recovered exactly.

Lossless file formats aim for this property.

## Lossy Encoding

Not all encoding preserves every detail.

Image and audio compression may deliberately discard information judged less important.

The decoded result approximates the original.

This is **lossy compression**.

The representation is optimized for practical use rather than exact identity.

## Source and Channel

Communication theory separates:

- source,
- encoder,
- channel,
- decoder,
- destination.

A source creates a message.

The encoder prepares it for transmission.

The channel carries it.

The decoder reconstructs it.

Noise may interfere along the way.

## Morse Code

Morse code maps characters to signal sequences.

The word:

`SOS`

becomes a pattern of short and long signals.

The same code can be transmitted using:

- sound,
- light,
- radio.

Encoding is abstract relative to physical medium.

## Text Encoding

A text editor displays characters.

A storage device stores bits.

Between them are encoding standards.

If the wrong encoding is used during decoding, readable text can become garbled.

The data remain present.

The interpretation rule is wrong.

## Mojibake

Corrupted-looking text caused by using the wrong character encoding is sometimes called **mojibake**.

The bytes may be perfectly intact.

The decoder applies the wrong mapping.

This is a concrete reminder:

data does not interpret itself.

## Compression

Encoding can reduce redundancy.

Suppose a message contains long repetitions.

Instead of storing every repetition, a compressed code records a shorter description.

Compression exploits predictable structure.

The decoder reconstructs the original or an approximation.

## Huffman Coding

Huffman coding assigns shorter binary code words to more frequent symbols.

Rare symbols receive longer code words.

The scheme minimizes expected code length under certain assumptions.

Probability becomes part of representation design.

## Run-Length Encoding

A simple compression method stores repetitions compactly.

Instead of:

`AAAAAAA`

store something like:

`7A`

The exact syntax varies.

The principle is clear.

Repeated structure can be represented by count plus symbol.

## Error Detection

Encoding can also add redundancy intentionally.

A parity bit may reveal whether a bit error occurred.

The message becomes longer.

Reliability improves.

Compression removes redundancy.

Error correction adds structured redundancy.

Different goals require different codes.

## Hamming Codes

Hamming codes add carefully chosen parity bits.

They can detect and correct certain bit errors.

The decoder uses the redundancy to infer the intended code word.

Mathematics restores information damaged by the physical channel.

## Reed-Solomon Codes

Reed-Solomon codes protect data against burst errors.

They are used in technologies such as:

- storage,
- communication,
- barcodes.

Error-correcting codes show that information can survive imperfect media through algebraic structure.

## Encryption Is Different

Encoding and encryption are often confused.

### Encoding
Changes representation according to a public scheme.

### Encryption
Transforms data so that recovering it requires a key or secret.

Base64 is encoding.

It is not encryption.

The distinction is practical and conceptual.

## Hashing Is Different Too

A cryptographic hash maps arbitrary input to a fixed-size output.

It is intentionally not generally reversible.

Hashing is not ordinary encoding because decoding the original is not the goal.

Different transformations have different informational purposes.

## Analog Encoding

Encoding is not exclusively digital.

Sound pressure can modulate:

- radio amplitude,
- frequency,
- phase.

Analog systems also represent information through physical variation.

Digital encoding is one special case.

## Sampling

To digitize an analog signal, we often **sample** it.

Measure the signal at discrete times.

Then quantize the amplitudes.

A continuous waveform becomes a sequence of numbers.

This creates a digital representation.

## Sampling Rate

Sampling too slowly can lose information.

The Nyquist-Shannon sampling theorem provides conditions under which band-limited signals can be reconstructed from samples.

Representation quality depends on how the encoding is performed.

## Quantization

Digital systems represent amplitudes with finite precision.

A continuous range is divided into discrete levels.

This introduces **quantization error**.

Encoding always imposes structure.

It can create approximation.

## Images

A digital image is encoded as pixel values.

Each pixel may store channels such as:

- red,
- green,
- blue.

The image we see is reconstructed from numbers.

The pixels are not little pieces of the original scene.

They are samples in a representation.

## Audio

Digital audio stores sampled amplitudes.

Playback converts numbers back into an electrical signal and then sound pressure.

The listener hears a reconstructed waveform.

The representation crosses several physical layers.

## Video

Video combines:

- images,
- timing,
- often audio.

Compression algorithms exploit:

- spatial similarity,
- temporal similarity.

Frames need not be stored independently.

Encoding uses structure across time.

## Biological Encoding

Biology contains code-like mappings.

DNA sequence is transcribed into RNA.

RNA codons are translated into amino acids.

The decoding machinery includes:

- ribosomes,
- transfer RNAs,
- enzymes.

The genetic code is physically implemented.

## Biological Decoding Is Chemical

Cells do not consult a symbolic table.

Molecular interactions realize the mapping.

A codon corresponds to an amino acid because evolved molecular machinery makes the relation happen.

The code is operational.

## One Message, Many Layers

Consider a spoken sentence sent through a phone.

Meaning
→ words
→ phonetic signal
→ digital samples
→ compressed packets
→ electromagnetic transmission
→ packets
→ audio reconstruction
→ heard words
→ interpretation.

At each step, one representation becomes another.

## Errors Can Occur at Different Layers

A communication failure can arise because:

- bits changed,
- packets were lost,
- character encoding was wrong,
- words were ambiguous,
- meaning was misunderstood.

Not all errors are the same kind.

Layered representation creates layered failure modes.

## Encoding Is Not Meaning

A perfect decoder can reproduce the original string without understanding it.

A computer can decompress a novel without knowing the story.

Technical decoding reconstructs representation.

Semantic interpretation is a further process.

## Codes Require Shared Structure

Communication succeeds when sender and receiver share compatible rules.

If one side uses UTF-8 and the other assumes another encoding, failure follows.

Shared code is a form of coordination.

Language itself depends on shared conventions similarly.

## The Next Question

Modern digital systems reduce enormous varieties of information to one very small alphabet:

0 and 1.

Text.

Images.

Sound.

Programs.

All become bit patterns.

Why is binary so powerful?

And what exactly is a bit?

That leads to:

**bits and binary representation.**
