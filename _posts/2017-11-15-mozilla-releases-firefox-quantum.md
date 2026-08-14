---
title: Mozilla Releases Firefox Quantum
date: 2017-11-15
permalink: /posts/2017/11/mozilla-releases-firefox-quantum/
tags:
  - software
  - programming
  - computing-history
---

Mozilla released Firefox 57, branded Firefox Quantum, in November 2017 after a major performance effort. The browser incorporated technology from Mozilla's experimental Servo project and increased parallelism in parts of the rendering engine.

One major component was Stylo, a CSS engine that could process style information across multiple CPU cores while preserving browser correctness. Firefox also adopted a new extension model based on WebExtensions, dropping many older add-ons that had deep access to browser internals.

Quantum was Mozilla's attempt to close the speed gap with Chrome without simply adopting Chromium. It showed how difficult browser-engine modernization can be: performance improvements have to preserve compatibility with millions of websites whose behavior depends on years of implementation details.
