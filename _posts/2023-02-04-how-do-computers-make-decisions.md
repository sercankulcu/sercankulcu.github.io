---
title: 'How Do Computers Make Decisions?'
date: 2023-02-04
permalink: /posts/2023/02/how-do-computers-make-decisions/
tags:
  - computer-science
  - logic
  - hardware
---

Computers do not make decisions in the human sense. They follow logical rules with perfect consistency and no understanding of why those rules exist. The interesting question is how that simple foundation — binary logic operating on electrical signals — scales up to the decision-making behavior we observe in real systems.

## The gates at the bottom

At the hardware level, decisions are implemented using logic gates. Each gate is a circuit that takes binary inputs (0 or 1, represented as low or high voltage) and produces a binary output according to a fixed rule:

- An **AND gate** outputs 1 only when both inputs are 1
- An **OR gate** outputs 1 when at least one input is 1
- A **NOT gate** inverts its single input: 0 becomes 1, 1 becomes 0

These three operations are sufficient to implement any logical function. A combination of AND and NOT gates (NAND), or OR and NOT gates (NOR), is functionally complete — every other logical operation can be built from either combination alone.

A comparator circuit — which answers "is A greater than B?" — is built from these gates. An adder that sums two binary numbers is built from these gates. The arithmetic logic unit in a processor, which performs addition, subtraction, and comparison, is a large collection of these gates arranged to produce the right outputs for the right inputs.

## The jump from gates to code

When a programmer writes:

```java
if (password.equals(storedHash)) {
    grantAccess();
} else {
    denyAccess();
}
```

this high-level instruction goes through several layers before it reaches the hardware.

The Java compiler turns this into bytecode. The JVM or a native compiler turns the bytecode into machine instructions. For this particular condition, the compiled result includes a **conditional jump instruction** — something like `JNE` (jump if not equal) in x86 assembly. The processor compares two values, sets a flag in a status register based on the result, and then the jump instruction either continues to the next instruction or skips forward, depending on that flag.

The full trace from a high-level `if` to a gate:

1. `if (password.equals(storedHash))` — programmer intent
2. Bytecode: `if_acmpne` — branch if not equal references
3. Machine code: `CMP` followed by `JNE` — compare and conditional jump
4. In the processor's ALU: XOR the two values and check if the result is zero
5. XOR is implemented in gates: for each bit position, one AND gate, two NOT gates, and one OR gate

The decision "are these two values equal?" reduces, at the lowest level, to whether a specific set of transistor-based gates produce a 1 or a 0.

## What changes with machine learning

Traditional programming requires a human to write every rule explicitly. If the rule is "grant access if the password matches," that rule must be written. If the rule is "detect fraudulent transactions," every condition for fraud must be specified — amount, merchant category, time of day, unusual patterns — and the programmer must think of every case.

Machine learning changes how the rule is produced, not how it is executed. A neural network for fraud detection still runs as arithmetic on hardware — billions of multiplications and additions. The difference is that the parameters (the weights that determine how inputs combine) were learned from data rather than specified by a human.

A network trained on millions of labeled transactions develops internal parameters that distinguish fraudulent from legitimate transactions better than explicit rules usually can. But the computation is still: take input values, multiply by weights, apply a threshold, produce an output. Gates and arithmetic, all the way down.

## The meaning problem

What this means is that a computer executing an `if` statement does not know why the condition matters. The processor that branches based on a password comparison does not know that granting access means a person can now read private messages. The neural network classifying a transaction as fraudulent does not know what fraud means to the people affected by it.

The meaning exists outside the machine — in the programmer's intention, in the consequences of the output in the world, in the person reading the result. The machine computes. The meaning is something we give to the result.

This is not a limitation waiting to be fixed. It is a description of what computation is. Understanding it clearly is useful both for building systems that behave well and for thinking carefully about what "decision-making" actually means in the context of automated systems.
