---
title: Cloudflare Discloses the Cloudbleed Bug
date: 2017-02-15
permalink: /posts/2017/02/cloudflare-discloses-the-cloudbleed-bug/
tags:
  - security
  - software
  - computing-history
---

Cloudflare disclosed Cloudbleed on February 23, 2017, after Google Project Zero researcher Tavis Ormandy reported the bug to Cloudflare five days earlier on February 17 and Cloudflare deployed a fix within hours. The vulnerability had existed in production since September 22, 2016 — 5 months before disclosure — and the worst-case period of highest data leakage ran from February 13 to 18, 2017. Cloudflare estimated it had leaked roughly 1 in every 3,300,000 HTTP responses over the worst period.

The root cause was in Cloudflare's edge HTML parser, written in Ragel (a state-machine compiler). The parser used pointer arithmetic to track its position in a buffer, and a bug caused a pointer to advance past the end of the allocated buffer in certain edge cases — specifically when processing malformed HTML involving Cloudflare features like email obfuscation, server-side excludes, or automatic HTTPS rewrites. When this happened, the worker process continued reading from adjacent heap memory and included that memory in the HTTP response. Because Cloudflare's workers processed requests from millions of different websites in the same process address space, the leaked memory could contain authentication cookies, session tokens, API keys, or plaintext passwords from any user on any other Cloudflare-proxied website that the worker had recently handled. Cloudflare served approximately 2 million websites at the time.

Google, Bing, and other search engines had cached responses containing leaked data; Cloudflare's post-disclosure work involved contacting major search engines to remove affected cached content. Google reported finding approximately 150 cached pages with leaked data before cleanup. The name "Cloudbleed" was coined by Ormandy, comparing it to Heartbleed (the 2014 OpenSSL memory-leak bug), though Cloudbleed's scope was more limited because it required specific Cloudflare feature combinations to trigger. The incident drove industry attention toward memory-safe programming languages — in particular Rust, which was already being adopted by Mozilla and was gaining traction as a systems-programming alternative to C for code handling untrusted input.
