---
title: XGL Brings 3D Effects to the Linux Desktop
excerpt: "How Xgl and Compiz brought GPU-composited 3D desktop effects to Linux in 2006, why AIGLX won out, and how that led to Compiz Fusion and Wayland."
date: 2006-02-15
permalink: /posts/2006/02/xgl-brings-3d-effects-to-the-linux-desktop/
tags:
  - software
  - programming
  - computing-history
---

Novell engineer David Reveman released Xgl and the Compiz window manager in early 2006, and a video of the demo spread rapidly on the early internet — showing Linux desktop effects that looked more advanced than what Windows XP offered: windows that wobbled like jelly when moved, a rotating cube exposing four virtual desktops, transparent window decorations, and smooth minimizing animations that collapsed windows into the taskbar with a fire effect. The demo reached millions of viewers through Google Video and early YouTube, generating significant attention for desktop Linux among users who had never seen 3D compositing in any OS.

Xgl was a new X server implementation in which OpenGL provided the rendering back-end. Traditional X11 had been designed in the 1980s around 2D drawing primitives — rectangles, text, bitmaps — with compositing extensions added later as patches. Xgl ran the full X server inside an OpenGL context, redirecting all window rendering to GPU texture memory. This allowed Compiz (a compositing window manager) to treat every window as an OpenGL texture and transform, blend, and animate it at GPU speeds. The GPU compositing meant effects that would have consumed 30–50% CPU on a software renderer ran at a fraction of a percent CPU while holding 60 fps, because the GPU pipeline for texture blending was the same operation whether rendering a game or a desktop.

The competing approach, AIGLX (Accelerated Indirect GLX), came from Red Hat and the X.Org Foundation: it extended the existing X server to support OpenGL compositing without replacing the X server entirely. The AIGLX approach won technically — it required fewer architectural changes and worked with existing X11 infrastructure — and was adopted in Fedora 5 (March 2006) and later in Ubuntu 7.04 (April 2007), which offered Compiz only as an optional Desktop Effects feature. Ubuntu 7.10 (October 2007) shipped Compiz effects on by default for any hardware with supported drivers. Compiz merged with its community fork Beryl in 2007 to become Compiz Fusion. The compositing model Xgl demonstrated became the default Linux desktop architecture, with Wayland (first released 2008, production-adopted by major distributions in 2021–2022) taking the architectural principle further by redesigning the display server from scratch around GPU compositing.
