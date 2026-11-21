---
title: Mozilla Releases Firefox Quantum
date: 2017-11-15
permalink: /posts/2017/11/mozilla-releases-firefox-quantum/
tags:
  - software
  - programming
  - computing-history
---

Mozilla released Firefox 57 — branded Firefox Quantum — on November 14, 2017, describing it as the biggest improvement to Firefox in over a decade. The release incorporated Stylo, a parallel CSS engine written in Rust and derived from Mozilla's experimental Servo browser project. Stylo processed style recalculation across multiple CPU cores simultaneously, taking advantage of modern multi-core CPUs that the original Firefox engine (Gecko) had been written before were common. Mozilla reported Firefox 57 used 30% less memory than Firefox 52 and was twice as fast on the Speedometer browser benchmark, while internal testing showed it catching up to Chrome on most common web page rendering tasks.

Firefox 57 also dropped support for legacy XUL/XPCOM extensions — a large library of add-ons with deep access to Firefox internals that had enabled highly customized setups but made Gecko engine modernization difficult. Extensions now had to use the WebExtensions API, the same model Chrome used. Popular add-ons like Tab Groups and many UI-modifying extensions stopped working, causing some long-term users to leave. Mozilla committed to extending WebExtensions to cover more customization use cases over subsequent releases.

By 2017, Chrome held roughly 60% of the desktop browser market, Firefox roughly 12%, and Internet Explorer/Edge combined roughly 14%. Firefox had peaked near 32% market share around 2010 and declined steadily as Chrome's speed and Google account integration drove adoption. Quantum was Mozilla's attempt to reverse the slide through performance rather than features. Mozilla reported a download surge after Quantum's release, though sustained market-share recovery proved elusive: Chrome's distribution advantages through Google's properties (search homepage default, Android default browser, Google.com download prompts) and the installed base of Chrome users who rarely switched limited how much performance gains alone could move the needle.
