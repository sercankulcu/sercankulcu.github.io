---
title: Google Releases Blink as a New Browser Engine
date: 2013-04-15
permalink: /posts/2013/04/google-releases-blink-as-a-new-browser-engine/
tags:
  - software
  - programming
  - computing-history
---

Google announced Blink in April 2013 as a fork of WebKit's WebCore rendering engine for Chrome and Chromium. Chrome had originally adopted WebKit because it was mature and standards-oriented, but Google's browser architecture was diverging from Apple's priorities.

Maintaining a shared engine required both projects to carry code and abstractions needed mainly by the other. By forking, Google could simplify integration with Chrome's multi-process design and make rendering-engine changes without coordinating every architectural decision with WebKit.

The split was important for the web because browser engines implement HTML, CSS, layout, accessibility, and many APIs developers depend on. Blink later became the engine behind Chrome, Edge, Opera, and many embedded browsers, giving it enormous influence over which web features reach users.
