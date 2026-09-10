---
title: Mozilla Releases Firefox 3
date: 2008-06-15
permalink: /posts/2008/06/mozilla-releases-firefox-3/
tags:
  - software
  - programming
  - computing-history
---

Mozilla released Firefox 3 on June 17, 2008, accompanied by a “Download Day” campaign that set a Guinness World Record for most software downloads in a single 24-hour period: 8,002,530 downloads. Firefox 3 had been in development for nearly two years since Firefox 2 shipped in October 2006 and incorporated a rebuilt Gecko 1.9 rendering engine with full compliance for CSS 2.1, SVG, and Canvas, a new Places bookmarking system storing history and bookmarks in SQLite rather than flat MRK files, and the Awesome Bar (formally the Location Bar) — an autocomplete field that searched URLs, page titles, and tags simultaneously, presenting results by frecency (a combination of frequency and recency) rather than only alphabetically.

Memory usage was the most-discussed engineering problem Firefox 3 addressed. Firefox 2 had gained a reputation for memory leaks in long browser sessions — opening 20+ tabs and leaving the browser running for hours could cause memory usage to grow past 500MB before a restart was needed. The Gecko 1.9 cycle refactored reference counting across JavaScript objects, layout, and DOM nodes to recover leaked memory more aggressively. Benchmarks comparing Firefox 2 and Firefox 3 on memory showed improvements of 30–50% in typical usage, though performance remained competitive with Internet Explorer 7 rather than decisively better.

Google announced Chrome on September 1, 2008, three months after Firefox 3 shipped, and released it on September 2. Chrome's V8 JavaScript engine was 10–30× faster than Gecko's SpiderMonkey on benchmarks like SunSpider and V8 Benchmark Suite, which measured math-heavy JavaScript of the kind emerging in web applications. Firefox 3.5 (released June 2009) added TraceMonkey (a just-in-time compiler for SpiderMonkey) and closed most of the performance gap, but the JavaScript engine race between V8 and SpiderMonkey/JägerMonkey became a defining feature of browser competition through 2012.
