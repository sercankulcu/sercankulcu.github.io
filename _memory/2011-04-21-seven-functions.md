---
title: "Seven Functions"
date: 2011-04-21
tags:
   - software
   - programming
   - simplicity
   - engineering
   - thoughts
---

I opened the documentation for an audio library expecting the usual ceremony.

Audio programming sounded like the kind of subject that should require several layers of preparation. Devices, streams, formats, buffers, callbacks, platform differences — enough vocabulary to make a simple sound feel like an engineering project.

Then I looked at the API.

Seven functions.

I checked again.

Seven.

There was something almost suspicious about it. Software libraries were supposed to grow forests of functions until the programmer needed another library simply to understand the first one.

This one appeared to have missed the meeting.

I wrote the shortest review I could think of:

Does it work?

It works.

That was all I needed from it.

I initialized the library, opened what I needed, moved audio through it, and continued with my actual problem. The tool did not insist that I first learn a new philosophy of software development. It did not introduce five objects whose only purpose was to create three other objects.

It simply stood between my program and the audio system and did its job.

The experience stayed with me because programmers are easily impressed by visible complexity. A large API looks powerful. A long manual looks serious. A framework with its own vocabulary can make a small project feel as if it has joined an important institution.

But every new concept has a price.

Somebody must understand it.

Somebody must remember it.

Somebody will eventually debug it at two in the morning.

Seven functions felt different because I could hold the whole surface of the tool in my head. There was a beginning and an end. I could imagine knowing all of it rather than permanently searching through it.

Of course, the implementation beneath those seven functions was not seven lines. Somebody else had dealt with operating systems, devices, timing, hardware, and all the ugly details.

That was precisely the point.

Their complexity stayed on their side.

Mine stayed on mine.

Years later, I have used much larger systems and understood why many of them needed to be large. Not every problem should fit inside seven functions.

But that small library gave me a standard I still like.

Do not show me complexity merely because you had to suffer through it.

Absorb it.

Give me the part I need.

And above all:

when I call the function, let it work.
