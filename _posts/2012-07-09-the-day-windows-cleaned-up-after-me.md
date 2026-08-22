---
title: "The Day Windows Cleaned Up After Me"
date: 2012-07-09
permalink: /posts/2012/07/the-day-windows-cleaned-up-after-me/
tags:
   - linux
   - windows
   - programming
   - embedded-systems
   - engineering
---

For years, I had been trained to respect Linux.

At university, I had professors who loved it.

Later, at work, I spent a great deal of time on embedded systems.

So Linux was not some exotic operating system I occasionally installed out of curiosity.

It was part of the technical world I knew.

Windows development, on the other hand, was something I had done much less of.

Then, in 2012, I had to use it.

And because engineers are apparently incapable of simply using a new environment normally, I decided to experiment.

I wrote a small program badly.

Not accidentally badly.

Deliberately badly.

I wanted it to terminate without cleaning up properly.

I left resources unreleased.

I left a file open.

Then I killed the program.

This was the kind of behavior that years of systems programming had trained me not to do.

Close what you open.

Release what you allocate.

Know what belongs to whom.

Clean up after yourself.

Otherwise, eventually, the machine teaches you manners.

So I ran the program again.

The resources I had failed to release were available again.

Windows had cleaned up after me.

Then I checked the file I had not closed properly.

The data I had written was there.

Again, the system had done more for me than I expected.

My reaction was not purely admiration.

It was closer to professional confusion.

Wait.

You are allowed to do that?

Where was the punishment?

Where was the mysterious failure that would cost me half a day?

Where was the lesson?

I had spent years developing a particular relationship with operating systems.

The operating system was powerful.

But it was not your mother.

If you made a mess, you cleaned it.

If you forgot something, perhaps you would pay for it.

If you wanted guarantees, you needed to understand what the system was actually doing.

That way of thinking becomes a personality after a while.

You stop trusting convenience.

When something happens automatically, part of you becomes suspicious.

What is it hiding?

What did it cost?

When will it fail?

Where is the catch?

This instinct is useful in embedded development.

Embedded systems have a way of punishing assumptions.

Resources may be limited.

Hardware may be unusual.

Drivers may be old.

The operating system may be old because one required driver works only with that version.

The device may need to run for a very long time.

The failure that is harmless on a desktop can become expensive somewhere else.

So discipline matters.

But discipline can slowly turn into ideology.

That was the uncomfortable part.

For years, I had heard the familiar cultural message:

Serious systems use Linux.

If you say you are using Windows in an embedded product, somebody will laugh.

The joke often arrives before the analysis.

Linux equals serious engineering.

Windows equals something less serious.

But engineering is supposed to ask a more annoying question:

Why?

Why is one choice better here?

What requirement does it satisfy?

What problem does the other choice create?

If the answer is merely:

Because everybody knows Linux is better,

then we have stopped engineering and started belonging to a tribe.

My little Windows experiment irritated that tribal instinct.

I had intentionally written sloppy code.

The system protected me from part of my own sloppiness.

That did not make Windows universally better.

It did make one thing obvious:

Convenience is also an engineering feature.

This sounds trivial now.

It did not feel trivial when I had spent years thinking that knowing the lower-level mechanism was part of doing things properly.

There is pleasure in control.

Linux offers enormous amounts of it.

You can choose.

Configure.

Replace.

Compile.

Patch.

Inspect.

Change.

There is always another layer you can open.

That freedom is real.

But freedom creates a strange paradox.

The more choices a system gives you, the more knowledge you may need before those choices become useful.

A beginner sees freedom.

An experienced user sees responsibility.

Which kernel?

Which distribution?

Which library version?

Which driver?

Which compiler?

Which configuration option?

Which patch applies to this release?

Theoretically, you can change everything.

Practically, one unsupported hardware driver may decide your entire platform for you.

That was one of my frustrations.

People talked about Linux as freedom.

Then real hardware entered the story.

The board manufacturer supported only certain versions.

A software vendor supported another set.

An open-source package compiled perfectly for someone on the internet and refused to compile on your system.

A driver tied you to an older kernel.

Another component wanted a newer one.

Now your freedom looked like choosing which incompatibility you preferred.

That is a very engineering kind of disappointment.

The theory is elegant.

The actual product contains vendors.

I had experienced enough of this by 2012 to become irritated.

You could download the source.

Wonderful.

Then it did not build.

You could modify it.

Wonderful.

Now you needed to understand someone else's code, your kernel version, the build system, the toolchain, and whatever undocumented assumption had been made three years earlier.

Technically free.

Practically, your afternoon was gone.

This is where hobby and profession begin to separate.

As a hobby, spending six hours making something work can be enjoyable.

You learn.

You explore.

You finally solve it.

Victory.

At work, the same six hours have a cost.

There is a schedule.

A customer.

A test plan.

Another engineer waiting for your output.

Suddenly the intellectually pure solution has to compete with the boring solution that already works.

That can be painful for engineers.

We like elegant systems.

Projects like finished systems.

These are not always the same thing.

My old entry was harsher about Linux than I would write today.

It came from accumulated frustration.

And some of the technical behavior I was reacting to was more nuanced than my irritated summary made it sound.

Operating systems buffer I/O.

Resources have different ownership rules.

Abrupt termination changes what cleanup can be guaranteed.

The real world is more complicated than:

Windows cleans everything, Linux leaves you holding the pieces.

But the experience behind the complaint mattered.

I had encountered a system that did more defensive housekeeping than I expected.

And that forced me to reconsider what I had been calling good engineering.

Was good engineering making the programmer understand everything?

Or was good engineering designing the platform so that common mistakes caused less damage?

Obviously, both matter.

But younger engineers often admire difficulty.

We confuse friction with depth.

If a tool requires expertise, it feels serious.

If a tool makes something easy, we suspect it is hiding something important.

Sometimes it is.

Sometimes it is simply well designed.

Automatic memory management produced the same argument.

High-level languages produced the same argument.

Integrated development environments produced the same argument.

Frameworks.

Libraries.

Containers.

Cloud services.

Every generation of abstraction creates people who say:

But then you do not really understand what is happening underneath.

They are not entirely wrong.

Understanding underneath is valuable.

But there is no bottom.

You use a compiler without designing the CPU.

You use a filesystem without implementing the storage controller.

You trust libraries you did not write.

Engineering always involves deciding which layers you need to understand deeply and which layers you can trust.

The important question is not whether abstraction exists.

It always does.

The question is whether the abstraction fails in ways you can tolerate.

That was the more mature version of the question I was asking in 2012.

At the time, however, my question was simpler:

If Linux gives me all this freedom, why do I keep getting trapped by versions?

That frustration was real.

Embedded Linux development could become a museum of dependencies.

One hardware component locked you to one kernel.

Another package wanted something else.

The phrase "just upgrade" sounded wonderful until the upgrade broke the only driver you actually needed.

Then you discovered the cruel truth of production systems:

Old software is often not old because nobody knows newer software exists.

It is old because something important still depends on it.

This lesson appears everywhere in engineering.

A system is not a collection of individually best components.

It is a collection of components that must work together.

You can improve one part and make the whole thing worse.

Compatibility is a feature.

Boring is a feature.

Predictability is a feature.

Support is a feature.

These are easy to underestimate when you are young and technically curious.

The newest kernel is interesting.

The supported kernel ships the product.

There is also an ego trap in low-level work.

When you spend a long time mastering difficult tools, the difficulty becomes part of your identity.

You know how to compile the kernel.

You know how to patch the driver.

You know why the filesystem behaves that way.

Then someone uses a platform where none of that effort is necessary.

A small part of the ego wants to say:

That is cheating.

But the customer does not pay extra because your suffering was authentic.

A solution does not become better because the engineer had a harder week.

This may be one of the most useful professional lessons I learned.

Technical suffering is not a deliverable.

Sometimes the sophisticated engineer is the one who knows how to do the hard thing.

Sometimes it is the one who knows not to.

I still value Linux enormously.

The knowledge I gained from working close to the system was not wasted.

Quite the opposite.

Understanding resources, filesystems, processes, drivers, kernels, and the behavior of real hardware made me a better engineer.

But understanding a mechanism should make you better at choosing abstractions.

It should not force you to reject them.

That small Windows program in 2012 did not convert me from one camp to another.

It did something more useful.

It made the camps look silly.

The operating system was a tool.

The product had requirements.

The engineer's job was not to defend an identity.

It was to choose what worked.

Still, I remember the surprise.

I had written the program badly on purpose.

I ran it again.

The resources were there.

I looked at the file.

The data was there.

For a moment, it felt as if the operating system had looked at my code, sighed, and said:

Fine.

I'll clean this up.

And after years of being trained to clean up after the machine, I had to admit:

That was rather nice.
