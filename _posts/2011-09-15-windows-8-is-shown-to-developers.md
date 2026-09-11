---
title: Windows 8 Is Shown to Developers
date: 2011-09-15
permalink: /posts/2011/09/windows-8-is-shown-to-developers/
tags:
  - software
  - programming
  - computing-history
---

Microsoft unveiled Windows 8 at the BUILD developer conference September 13–16, 2011 in Anaheim, California, and gave all 5,000 attendees a Samsung Series 7 Slate tablet preloaded with a Windows 8 Developer Preview build. The conference was led by Steven Sinofsky (president of Windows division) and introduced the Metro interface publicly for the first time: a full-screen, tile-based Start screen designed for touch, replacing the Start menu that had been in Windows since Windows 95 in 1995. The tiles were live — updating dynamically with news, weather, email counts, and photos without opening the full application.

The Windows Runtime (WinRT) was the new application development platform beneath Metro. WinRT was a COM-based API surface (not Win32) exposable through language projections into C++/CX, C# with .NET, Visual Basic .NET, and JavaScript with HTML/CSS — a deliberate decision to let web developers build Metro apps using existing HTML skills. WinRT apps ran sandboxed: they declared capabilities (access to camera, microphone, location, contacts, calendar) in a manifest that Windows enforced at runtime, similar to iOS app sandboxing. Apps could be suspended when off-screen (conserving battery on tablets) and resumed instantly. The Windows Store would be the exclusive distribution channel for Metro apps — a 30% revenue share model matching Apple's App Store.

The developer preview Build gave developers six weeks' notice before the Consumer Preview (Beta) in February 2012, a compressed schedule compared to the three-year Vista cycle. Sinofsky's blog posts before BUILD (the "Building Windows 8" Engineering blog) published detailed architectural rationale — memory usage, boot time measurements, ARM compatibility — setting a transparency standard for Microsoft OS development communication. The BUILD conference effectively replaced PDC (Professional Developers Conference) as Microsoft's primary developer event, and Windows 8 as shown in September 2011 was structurally close to what shipped at RTM on August 1, 2012.

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in software, programming, and computing history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
