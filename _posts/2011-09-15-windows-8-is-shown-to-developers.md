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
