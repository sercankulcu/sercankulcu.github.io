---
title: "C Is a Manual Transmission"
date: 2010-07-09
permalink: /posts/2010/07/c-is-a-manual-transmission/
tags:
   - programming
   - c
   - java
   - engineering
   - memories
---

Years ago, I tried to explain the difference between C and Java with cars.

C, I wrote, was like driving a manual transmission.

Java was like driving an automatic.

The comparison was not academically complete.

It was not supposed to be.

It was the kind of explanation you give when you have spent enough time with both languages to stop thinking only about syntax and start thinking about how they feel.

C was harder.

That was obvious.

But the difficulty was part of the pleasure.

With a manual car, you are more involved in what the machine is doing.

You choose the gear.

You control the clutch.

You can make good decisions.

You can also make very bad ones.

You can shift into third when second would have been better.

You can drop into second when the engine would strongly prefer that you did not.

The car gives you more control.

It also gives you more opportunities to be the cause of your own problems.

That was how C felt to me.

Java removed some of that danger.

It handled more things for you.

The language and runtime stood between you and several categories of mistakes.

That made many tasks easier.

It also changed the relationship between programmer and machine.

C constantly reminds you that memory exists.

Addresses exist.

Representation matters.

The machine underneath the abstraction is still there.

You can ignore it for a while.

Eventually it will introduce itself.

Usually through a bug.

A pointer is wrong.

Memory has been overwritten.

An array index has wandered somewhere it should not.

Something compiles beautifully and then collapses at runtime.

The program does not politely explain that your mental model was slightly inaccurate.

It simply stops cooperating.

This can be infuriating.

It can also be educational.

There are languages that allow you to remain comfortably above the machinery for a long time.

C is less patient.

Sooner or later it asks:

Do you actually know what this value is?

Where is it stored?

Who owns this memory?

How large is this object?

What happens if you go one byte farther?

These are not always questions you want to answer.

C does not care.

That is why learning C can feel like learning to drive in an old manual car.

You do not only learn how to reach the destination.

You learn what the machine demands from you along the way.

At first, this seems unnecessary.

Why should I manage all of this myself?

Why should the programmer care?

Why not let the language handle it?

That is a perfectly reasonable question.

In many applications, letting the language and runtime handle more things is exactly the right engineering decision.

The goal of software development is not to suffer artistically.

If a safer, clearer, more productive tool solves the problem, use it.

But there is another kind of value in working closer to the machine.

You begin to understand the cost of abstractions.

An object is not magic.

Memory is finite.

Function calls have mechanics.

Data has representation.

Performance comes from somewhere.

The operating system is doing real work below your program.

The processor is doing even more.

C makes it difficult to forget all of that.

Java, at least in the contrast I had in mind in 2010, felt more forgiving.

You could focus on the program at a higher level.

Garbage collection removed much of the manual memory management.

The language prevented or reduced several dangerous operations.

The environment provided a more managed world.

You still needed to know what you were doing.

But there were guardrails.

And guardrails are useful.

Manual-transmission enthusiasts sometimes talk as if greater difficulty automatically means greater purity.

Programmers can do the same thing.

Real programmers use C.

Real programmers manage memory themselves.

Real programmers suffer.

This is mostly nonsense.

Difficulty is not a virtue by itself.

A tool is good when it fits the job.

Nobody should write a payroll application in assembly merely to prove character.

Still, I understand why people become attached to tools that expose more of the mechanism.

There is satisfaction in understanding what is happening.

A manual car makes the driver participate in the transfer of power.

C makes the programmer participate in details that higher-level languages deliberately hide.

When it works, you feel responsible for more of the result.

When it breaks, unfortunately, you are also responsible for more of the result.

That is the agreement.

Freedom and responsibility arrive together.

This may be the most important part of the analogy.

C gives you the freedom to do things that are clever, efficient, elegant, dangerous, unnecessary, or catastrophic.

Sometimes all in the same function.

The compiler may warn you.

Sometimes it will not.

The language assumes a certain level of trust.

You asked to do this.

Very well.

Let us see what happens.

That is a powerful educational environment.

It teaches respect.

You begin with confidence.

Then you corrupt memory once or twice.

Confidence becomes caution.

Caution becomes habit.

Check the bounds.

Initialize the variable.

Know who allocated the memory.

Know who frees it.

Understand the lifetime.

Do not trust a pointer just because it is non-null.

Tiny disciplines accumulate.

They change the way you think even when you later work in other languages.

That may be why C remains important even for programmers who do not use it every day.

It exposes ideas that other languages still depend on.

The higher levels do not erase the lower levels.

They organize and hide them.

Abstraction is not the disappearance of complexity.

It is complexity placed somewhere else.

Java places a great deal somewhere else for you.

That can be wonderful.

A good automatic transmission is not inferior because it prevents the driver from making certain mistakes.

For most people, most of the time, easier operation is an advantage.

The question is what you want to learn and what you need to control.

If your goal is to understand the machine more deeply, removing every difficult detail can also remove some useful lessons.

I think that is what younger me was responding to when I wrote that C was harder but had a different kind of pleasure.

The pleasure was not pain.

It was involvement.

You were closer to cause and effect.

When the program worked, you knew more about why.

When it failed, the failure often forced you to learn something you had successfully avoided until that moment.

There is a particular satisfaction in fixing those bugs.

Not because they should have existed.

Because after fixing them, your model of the computer is slightly better.

The machine becomes less mysterious.

The error message that once looked like nonsense begins to point somewhere meaningful.

A segmentation fault stops being a curse from the compiler gods and becomes evidence.

Somewhere, the program touched memory incorrectly.

Now investigate.

This is how technical maturity develops.

Errors become information.

The younger programmer asks:

Why is this stupid computer doing that?

The more experienced programmer eventually asks:

What assumption of mine has just been disproved?

C is extremely good at disproving assumptions.

Java disproves plenty too, of course.

Every language does.

The failures simply tend to happen at different levels.

That is why language comparisons are rarely as simple as harder versus easier.

Languages encourage different habits.

They make some mistakes easy and others difficult.

They make certain ideas visible and others invisible.

Choosing one is partly choosing which problems you want the tool to solve for you.

My old manual-versus-automatic comparison survives because it captures that feeling better than a long feature table.

In a manual car, more of the operation is explicitly yours.

That can be satisfying.

It can also mean stalling at a traffic light.

In C, more of the machine is explicitly your responsibility.

That can be satisfying too.

It can also mean spending an evening searching for the one pointer that quietly destroyed everything.

Would I always choose the manual transmission?

No.

Would I always choose C?

Also no.

Engineering is not loyalty to difficulty.

It is choosing the right level of control for the problem.

But I still understand the pleasure.

Sometimes you do not want the machine to make every decision for you.

Sometimes changing the gear yourself is part of why you enjoy driving.
