---
title: "Seven Functions, and It Worked"
date: 2011-04-21
tags:
   - software
   - programming
   - simplicity
   - engineering
   - thoughts
---

In April 2011, I wrote a tiny entry about PortAudio.

I called it perhaps the most basic audio library a person could encounter.

Its API, I wrote, had exactly seven functions.

Then came the review:

Does it work?

It works.

That was enough.

The line stayed with me because software has a powerful tendency to grow.

A library begins with one problem.

Play audio.

Record audio.

Open stream.

Close stream.

Then more platforms arrive.

More hardware.

More options.

More abstraction.

More edge cases.

More configuration.

More helpers.

More convenience layers.

Soon the simple tool becomes a world.

Growth is not automatically bad.

Complex problems deserve complexity.

But programmers often confuse capability with quality.

A larger API feels more serious.

More professional.

More complete.

Yet every additional concept is another thing a user must learn, remember, configure, debug, and eventually maintain.

Simplicity is not absence.

It is the presence of only what is necessary.

That is difficult.

Adding a function is easy.

Not adding it can require confidence.

The PortAudio entry was almost admiringly rude.

Seven functions.

That is it.

And the important part:

it worked.

Engineering has a special respect for tools that do not perform for attention.

No ceremony.

No architecture presentation.

No need to understand an ideology before making the first call.

You use the interface.

The result happens.

A tool like that becomes invisible.

And invisibility is often a sign of success.

Users do not wake up wanting to admire APIs.

They want to achieve something.

Open audio.

Write samples.

Read samples.

Continue.

A well-designed interface compresses the internal complexity enough that the user can think about their own problem instead.

That is one of abstraction's central promises.

Unfortunately, abstractions can become self-important.

The framework that was supposed to hide complexity introduces its own vocabulary.

Lifecycle.

Context.

Provider.

Factory.

Manager.

Builder.

Configuration object.

Plugin.

Adapter.

Now the user is solving the framework before solving the original problem.

The abstraction has become a new domain.

Sometimes this is justified.

Large systems need structure.

But small systems can be damaged by architecture designed for imaginary scale.

This is where “seven functions” becomes almost philosophical.

How small can the interface remain while still expressing the useful operations?

That is a design question worth asking before every API grows.

The danger of minimalism is under-specification.

Too few functions can force users into awkward workarounds.

A beautiful tiny interface may hide complexity badly.

So function count alone is not a quality metric.

The old entry did not prove that seven was mathematically ideal.

It expressed a feeling:

this is refreshingly straightforward.

The second sentence is the test.

It works.

Minimalism without usefulness is just deprivation.

Minimalism plus usefulness is elegance.

This principle applies far beyond code.

A remote control with five buttons can be better than one with fifty if the five cover real use.

A form with three fields can be better than one with fifteen.

A course syllabus can be clearer with fewer objectives.

A presentation can improve when half the slides disappear.

The challenge is knowing what to remove.

Removal requires understanding.

Beginners often add because addition feels like progress.

Experts are more willing to delete because they can distinguish essential structure from defensive clutter.

This is why mature design can look simple without being simple to produce.

A seven-function API may rest on thousands of lines of implementation.

The user does not need to see them.

That asymmetry is valuable.

Complexity should live where it can be managed best.

Inside the implementation.

Not spread across every caller.

This is one of the fundamental promises of a good library:

we absorbed complexity so you do not have to.

When a library exposes all of its internal decisions to the user, it is transferring work rather than abstracting it.

Software history is full of tools that became successful because they reduced the number of concepts required before first success.

The first run matters.

Can a new user do something meaningful quickly?

Not understand everything.

Do something.

This creates momentum.

Then deeper concepts can be learned when necessary.

If the first task requires a day of setup, the tool has already imposed a tax.

That tax may be worth paying in professional systems.

But it should be intentional.

PortAudio, as I remembered it, imposed almost none.

There is also a psychological pleasure in finite APIs.

You can imagine knowing the whole thing.

Seven functions.

Maybe today you know two.

Tomorrow all seven.

The system is mentally containable.

Large frameworks create another feeling:

you will never fully know this.

You will search documentation forever.

That may be unavoidable in large ecosystems, but it changes the relationship between programmer and tool.

A small API invites mastery.

A huge one invites navigation.

Both are valid modes.

I personally value tools that let mastery remain possible.

Knowing the whole surface area changes debugging.

You can reason.

What could have happened?

Only a few paths exist.

Complexity increases possible states.

Possible states increase uncertainty.

Uncertainty increases debugging cost.

This is why simple systems often feel disproportionately reliable.

Not because simple code cannot fail.

Because the space of failure is easier to understand.

The phrase “does it work? it works” also expresses an old engineering impatience with ornamental sophistication.

A tool can have beautiful design patterns and terrible behavior.

Another can be ugly internally and dependable.

Users encounter behavior first.

Reliability earns forgiveness.

This does not excuse bad architecture.

Bad internal design eventually creates maintenance problems.

But elegance that does not produce dependable outcomes is decorative.

The world is full of technically impressive systems nobody enjoys using.

Working remains a powerful feature.

Perhaps the mature version of the 2011 entry needs one caveat.

Simplicity is contextual.

A seven-function API for basic audio may be wonderful.

A seven-function API trying to model an entire enterprise may hide too much and become dangerous.

Minimalism should match the problem.

The goal is not fewer functions at any cost.

The goal is lower conceptual load without losing necessary control.

That is much harder.

Still, the old review remains one of the cleanest software criteria I ever wrote.

Seven functions.

Works.

Ship it.
