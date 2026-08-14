---
title: Cloudflare Discloses the Cloudbleed Bug
date: 2017-02-15
permalink: /posts/2017/02/cloudflare-discloses-the-cloudbleed-bug/
tags:
  - security
  - software
  - computing-history
---

Cloudflare disclosed a serious memory-leak bug in February 2017 that became known as Cloudbleed. Under unusual combinations of HTML parsing features, parts of Cloudflare's edge software could read past the end of a buffer and include unrelated memory in HTTP responses.

The leaked memory could contain cookies, authentication tokens, passwords, or other data from completely different customer requests handled by the same process. Search engines had cached some affected pages, making cleanup more complicated.

The bug was caused by a bounds-checking mistake in code generated from a parser. It resembled Heartbleed in one important way: a small memory-safety error inside widely deployed infrastructure could expose data belonging to many unrelated users. Cloudflare worked with search engines to remove cached leaked content after fixing the software.
