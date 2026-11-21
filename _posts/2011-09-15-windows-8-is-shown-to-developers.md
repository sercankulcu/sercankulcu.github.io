---
title: Windows 8 Is Shown to Developers
excerpt: "At BUILD 2011 Microsoft showed Windows 8 with the tile-based Metro interface, the WinRT app platform and a Windows Store, and gave attendees a tablet."
date: 2011-09-15
permalink: /posts/2011/09/windows-8-is-shown-to-developers/
tags:
  - software
  - programming
  - computing-history
---

Microsoft unveiled Windows 8 at the BUILD developer conference September 13–16, 2011 in Anaheim, California, and gave all 5,000 attendees a Samsung Series 7 Slate tablet preloaded with a Windows 8 Developer Preview build. The conference was led by Steven Sinofsky (president of Windows division) and introduced the Metro interface to developers in a hands-on build: a full-screen, tile-based Start screen designed for touch, replacing the Start menu that had been in Windows since Windows 95 in 1995. The tiles were live — updating dynamically with news, weather, email counts, and photos without opening the full application.

The Windows Runtime (WinRT) was the new application development platform beneath Metro. WinRT was a COM-based API surface (not Win32) exposable through language projections into C++/CX, C# with .NET, Visual Basic .NET, and JavaScript with HTML/CSS — a deliberate decision to let web developers build Metro apps using existing HTML skills. WinRT apps ran sandboxed: they declared capabilities (access to camera, microphone, location, contacts, calendar) in a manifest that Windows enforced at runtime, similar to iOS app sandboxing. Apps could be suspended when off-screen (conserving battery on tablets) and resumed instantly. The Windows Store would be the exclusive distribution channel for Metro apps — with a revenue-share model whose terms Microsoft detailed that December.

The developer preview Build came about five and a half months before the Consumer Preview (Beta) in February 2012, a compressed schedule compared to the three-year Vista cycle. Sinofsky's blog posts before BUILD (the "Building Windows 8" Engineering blog) published detailed architectural rationale — memory usage, boot time measurements, ARM compatibility — setting a transparency standard for Microsoft OS development communication. The BUILD conference effectively replaced PDC (Professional Developers Conference) as Microsoft's primary developer event, and Windows 8 as shown in September 2011 was structurally close to what shipped at RTM on August 1, 2012.

**Sources:** [Microsoft Reimagines Windows, Presents Windows 8 Developer Preview (Microsoft News Center)](https://news.microsoft.com/source/2011/09/13/microsoft-reimagines-windows-presents-windows-8-developer-preview/), [5,000 Microsoft developers get Samsung preview tablets (Computerworld)](https://www.computerworld.com/article/1420084/5-000-microsoft-developers-get-samsung-preview-tablets.html)
