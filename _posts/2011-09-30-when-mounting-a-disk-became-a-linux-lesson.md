---
title: "When Mounting a Disk Became a Linux Lesson"
date: 2011-09-30
permalink: /posts/2011/09/when-mounting-a-disk-became-a-linux-lesson/
tags:
   - linux
   - ntfs
   - debugging
   - engineering
   - memories
---

There are technical problems that begin with a sentence so innocent that you already know the evening is lost.

"I just need to write something to this disk."

That was more or less the situation.

The disk was NTFS.

The system was Linux.

The tool involved was `ntfs-3g`.

Nothing about this sounded dramatic.

Mount the disk.

Copy the files.

Continue with life.

Instead, the computer gradually transformed into something that felt less like a workstation and more like a geological formation.

Slow.

Heavy.

Unresponsive.

Every operation seemed to require negotiation.

In September 2011, I wrote an angry little entry about `ntfs-3g`.

My complaint was that because it was operating in user space, it was consuming an uncomfortable amount of CPU on my system.

The situation became especially bad when the disk was around 88 percent full.

Writes became painfully unreliable from my point of view, other programs became difficult to use, and the entire machine felt as if someone had filled the case with wet concrete.

The exact behavior depended on that machine, that software version, that workload, and probably several details I was not measuring carefully at the time.

But the experience was real.

I wanted to write files to a disk.

Instead, I was watching the operating system suffer.

This is one of the first lessons real systems teach you:

A simple operation at the user level may not be simple at all underneath.

"Copy this file" sounds like one action.

It is not.

The filesystem has work to do.

The kernel has work to do.

The storage device has work to do.

Metadata changes.

Buffers fill.

Allocation decisions happen.

Free space matters.

Fragmentation may matter.

A compatibility layer may be involved.

Then all of these details meet the exact hardware and software combination sitting on your desk.

At university, we often learn systems as clean layers.

Application.

Operating system.

Filesystem.

Device.

Hardware.

The diagram is beautiful.

Each layer sits politely on the one below it.

Real machines are less polite.

The layers leak.

You notice the filesystem because the CPU is suddenly busy.

You notice free-space behavior because writes slow down.

You notice implementation choices because the desktop becomes unusable.

Abstraction is wonderful until performance collapses.

Then the hidden layers come upstairs and introduce themselves.

At the time, what annoyed me most about `ntfs-3g` was the feeling that the machine was spending an extraordinary amount of effort doing something that should have been ordinary.

That "should" is dangerous in engineering.

Should according to whom?

The user sees a disk.

The system sees a filesystem format designed elsewhere, compatibility requirements, userspace/kernel transitions, allocation structures, caching, permissions, and all the other machinery needed to make the illusion of "just a disk" work.

The user does not care.

The user wants the file copied.

That gap between what the system must do and what the user thinks it is doing is where many engineering frustrations live.

I did what engineers often do when software annoys them.

I downloaded the source code.

This is one of the cultural differences Linux encourages.

Something behaves badly.

You do not only search for a setting.

You begin considering whether to build the thing yourself.

There is an optimism hidden in this.

Surely if I compile it on my own machine, I will regain control.

Maybe the packaged version is the problem.

Maybe different compiler options will help.

Maybe there is some unnecessary baggage.

Maybe I can make it behave.

This is both the beauty and danger of open systems.

The source is available.

Which means the distance between "this software is annoying me" and "I am now compiling filesystem software at night" can become surprisingly short.

At some point, I built `ntfs-3g` myself.

Then I ran:

`strip ntfs-3g`

And in my old note, I wrote that things seemed to behave somewhat better afterward.

At least, I said, I could keep writing until the disk filled further.

Looking back, I would be much more cautious about the conclusion.

`strip` removes symbol and debugging information from a binary and reduces its size; it is not a magic runtime-performance switch.

Any improvement I observed could have involved binary size, memory behavior, the fresh build itself, caching, different build options, or simply a workload that was not identical.

I did not perform a controlled benchmark.

I was not writing a paper.

I was trying to make the machine usable.

This distinction matters.

Engineers accumulate a lot of knowledge through experiments that are not scientifically clean.

Change something.

Problem improves.

Remember the change.

Later, experience teaches you to ask harder questions.

Did that actually cause the improvement?

What else changed?

Can I reproduce it?

What metric improved?

How many times did I test?

Was the original problem even what I thought it was?

That evolution—from "this fixed it" to "this correlated with it once on my system"—is an important part of becoming better at technical work.

Young engineers often collect rituals.

Run this command.

Restart that service.

Delete this directory.

Recompile with this option.

Move this configuration line.

Sometimes the rituals work.

The danger is forgetting to ask why.

But rituals are often where understanding begins.

You notice a pattern.

Then eventually you learn the mechanism.

The `ntfs-3g` episode belonged to that stage of my life.

I knew enough Linux to be dangerous.

Which is an excellent phase.

You are no longer afraid of the system.

You are also not yet wise enough to avoid turning every problem into an investigation.

A normal user sees a slow disk and says:

This is slow.

An engineer sees a slow disk and thinks:

Interesting.

That word has destroyed many evenings.

Interesting means logs.

Processes.

CPU usage.

Disk usage.

Source packages.

Compiler output.

Configuration files.

Search results.

Experiments.

Then, at some point after midnight, the original task has become almost irrelevant.

You no longer care about the files.

You care about understanding why the files were difficult to copy.

This is one of the pleasures of technical work.

It is also one of its traps.

Curiosity can solve the problem.

Curiosity can also expand the problem until it consumes the day.

The mature skill is knowing which situation you are in.

At work, this matters enormously.

There is always a deeper layer.

You can debug the application.

Then the library.

Then the operating system.

Then the driver.

Then the bus.

Then the hardware.

Then the electrical signal.

At some point, somebody has to say:

This layer is good enough.

Ship it.

That can be emotionally difficult for engineers who enjoy understanding systems.

Incomplete understanding feels uncomfortable.

But complete understanding is rarely available.

You need enough understanding to make the correct decision.

No more is required.

No less is safe.

The disk being 88 percent full also taught another lesson.

Systems often behave differently near boundaries.

A disk with abundant free space and a disk approaching capacity are technically the same disk.

Operationally, they may feel very different.

This principle appears everywhere.

Memory at 40 percent utilization and memory at 98 percent utilization.

A network at 20 percent load and one near saturation.

A queue with three items and one with three million.

A database with a comfortable working set and one that no longer fits in memory.

A CPU with spare capacity and one permanently pinned.

Engineers learn to respect margins.

A system does not need to be completely full to become unhealthy.

That is a broader lesson than filesystems.

Capacity is not merely a maximum.

It is a region.

There is a difference between "technically possible" and "comfortably operable."

A disk may still have free space.

That does not mean the system is happy.

A server may still respond.

That does not mean it has capacity.

A person may still be functioning.

That does not mean there is room for another responsibility.

The same engineering intuition appears in life surprisingly often.

Do not design everything to operate at the edge.

Leave space.

Leave time.

Leave memory.

Leave options.

Margin looks inefficient right up until the moment you need it.

There was also something characteristically Linux-like about the whole episode.

The system was frustrating me.

But it was also teaching me.

That combination is why many engineers become attached to Linux even while complaining constantly about it.

Linux makes mechanisms visible.

Sometimes more visible than you wanted.

You learn about filesystems because something does not mount.

You learn about permissions because something refuses to run.

You learn about drivers because the hardware does nothing.

You learn about kernels because a module will not build.

You learn about processes because one has decided to consume the machine.

It can feel like an operating system designed by a professor who refuses to give you the answer directly.

Every inconvenience becomes homework.

This is exhausting.

It is also educational.

Convenient systems allow you to remain a user.

Less convenient systems periodically force you to become an administrator, developer, or detective.

Whether that is good depends entirely on what you are trying to accomplish.

If you are trying to learn, it can be wonderful.

If you have a deadline and just need the disk to work, the educational opportunity is less charming.

That is perhaps the clearest memory I have of that period.

I was learning the difference between loving computers and needing them to behave.

These are not the same relationship.

When computers are a hobby, a problem is interesting.

When computers are tools for other work, a problem is obstruction.

Professional engineering requires switching between those two modes.

Sometimes investigate deeply.

Sometimes use the boring workaround.

Sometimes replace the component.

Sometimes accept that the root cause is not worth the cost of finding.

In 2011, I was still inclined to investigate.

Download source.

Compile.

Strip the binary.

Try again.

Fill the disk farther.

Watch.

Adjust.

The process itself became the lesson.

I had started with a storage problem.

I ended with a better understanding of how quickly abstractions collapse when resources get tight, how dangerous causal conclusions can be without controlled testing, and how easily curiosity turns maintenance into research.

Not bad for a disk that was supposed to just hold files.

That is probably why I remember it.

The best technical lessons rarely arrive with a syllabus.

They arrive at night, when the computer becomes unbearably slow and you say:

Fine.

Now I need to know why.
