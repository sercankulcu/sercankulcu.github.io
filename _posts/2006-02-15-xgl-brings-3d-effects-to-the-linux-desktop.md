---
title: XGL Brings 3D Effects to the Linux Desktop
date: 2006-02-15
permalink: /posts/2006/02/xgl-brings-3d-effects-to-the-linux-desktop/
tags:
  - software
  - programming
  - computing-history
---

In early 2006, Novell demonstrated Xgl, an experimental X server that used OpenGL to render the Linux desktop. Together with the Compiz window manager, it produced effects that looked unusual for desktop Linux at the time: transparent windows, smooth animations, live thumbnails, and the famous rotating desktop cube.

The technical idea was more important than the visual tricks. Traditional X11 desktops had been designed around mostly 2D drawing. Xgl redirected desktop rendering through OpenGL, allowing the GPU to composite windows instead of relying mainly on the CPU. This made effects such as scaling and transparency much smoother.

Xgl itself did not become the permanent foundation of the Linux graphics stack, but it helped demonstrate that GPU-accelerated compositing could be practical. Compiz became popular, and the broader Linux desktop eventually moved toward compositing window managers and newer graphics infrastructure.
