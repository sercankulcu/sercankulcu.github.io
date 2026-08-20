---
title: 'Layers of Messages'
permalink: /nature/142-layers-of-messages/
chapter: 8
chapter_title: 'Information and Representation'
order: 142
tags:
   - messages
   - layers
   - protocols
   - representation
   - communication
---

A message is rarely just one thing.

When you send a sentence through a messaging app, the visible words are only the top layer.

Underneath them are:

- character encodings,
- application formats,
- network protocols,
- packets,
- electrical or optical signals.

One act of communication becomes a stack of representations.

Each layer treats the layer below as a medium.

## Encapsulation

Computer networks provide a clear example.

An application produces data.

That data is wrapped with additional information for transport.

A simplified chain might be:

message
→ application data
→ transport segment
→ network packet
→ link frame
→ physical signal.

Each stage adds structure.

This is called **encapsulation**.

## Headers

Network layers often add headers containing information such as:

- source,
- destination,
- sequence number,
- protocol type,
- error checks.

The user does not normally see these fields.

But communication depends on them.

A message can contain information about how the message itself should be handled.

## Data About Data

This is **metadata**.

Metadata can describe:

- format,
- origin,
- time,
- length,
- encoding,
- ownership.

A photo contains pixels.

It may also contain metadata about camera, date, and orientation.

The same object contains multiple informational layers.

## HTML

A web page contains visible text.

But it also contains markup:

```html
<strong>Hello</strong>
```

The user sees:

Hello

The browser sees structure:

make this text strong.

The markup is a message to the rendering system about how another message should appear.

## CSS

CSS adds another layer.

HTML describes document structure.

CSS describes presentation.

The same text can be rendered differently without changing its linguistic content.

One representation controls another.

## Programming Languages

Source code also contains layers.

A line of code may be:

- meaningful to a programmer,
- parsed as syntax,
- compiled into machine instructions,
- executed as electrical state transitions.

Each level has its own vocabulary and rules.

Meaning changes with level.

## Comments

A source-code comment can be meaningful to a human programmer while being ignored by the compiler.

The same file therefore contains messages for different interpreters.

One layer addresses humans.

Another addresses machines.

## Natural Language

Human speech also has layers.

A sentence carries:

- lexical meaning,
- grammatical structure,
- tone,
- implication,
- social intention.

The literal words may say one thing.

The pragmatic message may say more.

## "Fine."

Consider the message:

"Fine."

Depending on context, it can mean:

- genuine agreement,
- resignation,
- irritation,
- dismissal.

The lexical layer is tiny.

Prosody and situation carry additional messages.

## Tone as a Channel

Tone does not merely decorate speech.

It conveys information about:

- emotion,
- confidence,
- sarcasm,
- urgency.

The same words with different intonation can produce different interpretations.

## Formatting

Written communication adds its own layers.

ALL CAPS may signal shouting.

Bold may signal emphasis.

Quotation marks may signal distance or irony.

Typography becomes part of the message system.

## Emojis

Emojis can add pragmatic cues missing from plain text.

A sentence followed by 🙂 differs from the same sentence followed by 🙄.

The lexical content is unchanged.

The social interpretation shifts.

## Nested Messages

Messages can contain other messages.

An email can quote an earlier email.

A news article can quote a speech.

A novel can contain a letter written by a character.

The inner and outer messages have different speakers and contexts.

## Quotation

Quotation creates an important distinction.

Compare:

Snow is white.

and:

"Snow is white" has three words.

The first talks about snow.

The second talks about a sentence.

Language can shift between object level and meta level.

Later, self-reference will make this distinction crucial.

## Compression Layers

A file may be:

- text,
- compressed,
- encrypted,
- packetized.

Each layer transforms the previous one.

To recover the original, the receiver reverses the layers in the right order.

Wrong order produces nonsense.

## Encryption and Compression

Suppose data is compressed and then encrypted.

The decoder must:

1. decrypt,
2. decompress.

Trying to decompress ciphertext fails.

Layer order matters.

Representational stacks are procedural.

## Containers

Media formats often act as **containers**.

A video container may hold:

- video stream,
- audio stream,
- subtitles,
- metadata.

One file contains several coordinated messages.

The container provides structure among them.

## Multiplexing

Communication systems can combine multiple signals into one channel.

This is **multiplexing**.

Different messages share the same physical medium.

Later, the receiver separates them.

A medium can carry many logically distinct streams.

## Biological Layers

Biology also contains layers of information.

DNA sequence.

Regulatory regions.

Chromatin state.

RNA processing.

Protein modification.

Cellular signaling.

The effect of one sequence depends on several surrounding layers.

## Genetic Regulation

A gene may exist but remain inactive.

Regulatory signals determine:

- when,
- where,
- how strongly

it is expressed.

The DNA sequence is only one part of the message system.

## Epigenetic Context

Chemical modifications and chromatin structure influence accessibility.

These layers do not rewrite the base sequence.

They alter how the sequence is used.

Biological interpretation is layered.

## Human Communication Layers

When someone says:

"Could you close the window?"

Several layers coexist:

literal question:
are you able?

pragmatic request:
please close it.

social layer:
polite indirectness.

The message is structurally richer than its surface grammar.

## Meta-Messages

A **meta-message** is a message about another message.

Examples:

- "I am joking."
- "This is confidential."
- "Do not take the previous sentence literally."

Meta-messages guide interpretation.

They modify how another layer should be read.

## Framing

Framing is a higher-level interpretive layer.

The same event can be described as:

- loss,
- sacrifice,
- investment,
- risk.

The facts may overlap.

The frame changes relevance and emotional meaning.

Representation organizes perception.

## Protocols

A protocol defines expectations between sender and receiver.

Who speaks first?

How is a message acknowledged?

What happens after an error?

Conversation itself has protocol-like structure.

Communication is not merely content exchange.

## Layers Can Fail Independently

A message can fail at one layer while others remain intact.

The network arrives.

The file opens.

The words display.

But sarcasm is missed.

Technical transmission succeeded.

Pragmatic communication failed.

## Layer Confusion

Many debates arise because people answer questions at different levels.

For example:

"Does DNA contain information?"

At the sequence level, yes in a technical sense.

At the semantic-human-language level, the analogy is limited.

Clarifying the layer often dissolves confusion.

## No Single Privileged Layer

Lower layers are physically necessary.

Higher layers organize function and meaning.

Neither can always replace the other.

Electrical signals explain how a text is transmitted.

They do not explain why the sentence is funny.

Different layers answer different questions.

## The Next Question

Some messages merely describe.

Others cause systems to act.

A voltage transition triggers a gate.

A hormone triggers a response.

A warning changes behavior.

This raises a deeper question:

**When does information become causal?**
