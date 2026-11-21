---
title: Google Chrome OS Is Publicly Announced
excerpt: "Google's July 2009 Chrome OS announcement: a browser-only Linux OS for netbooks, its security design, and how Chromebooks later took over US schools."
date: 2009-07-15
permalink: /posts/2009/07/google-chrome-os-is-publicly-announced/
tags:
  - software
  - programming
  - computing-history
---

Google publicly announced Chrome OS in a blog post on July 7, 2009, authored by Sundar Pichai (VP of Product Management) and Linus Upson (Engineering Director). The announcement came ten months after Google Chrome browser launched on September 2, 2008 — the OS would be the browser made into a full operating system. The post framed the project around the 2009 netbook market: millions of consumers were buying $299–$399 Windows XP or Windows 7 Starter laptops (Acer Aspire One, ASUS Eee PC) that were slow, prone to malware, and required constant maintenance. Chrome OS targeted that segment directly with a Linux-kernel OS in which the Chrome browser was the only execution environment — no native app installation, no file system users needed to manage.

The design had three core security properties: verified boot (cryptographic signatures on bootloader and OS image checked at every startup), process sandboxing (each browser tab in a separate process with restricted kernel access, using the same model as Chrome browser's sandbox), and automatic silent updates (background downloads applied on next restart, eliminating the user-facing update dialogues that Windows users often deferred indefinitely). User data — documents, photos, bookmarks, settings — would live in Google's cloud services, making any Chrome OS device interchangeable. Google open-sourced the project as Chromium OS on November 19, 2009, allowing developers to inspect the code and build their own images.

The announcement came at a moment of significant netbook momentum: netbooks were selling in the millions, and Microsoft was shipping Windows XP (an OS from 2001) on new hardware to meet the price point because Vista was too heavy. Google's bet was that web applications — Gmail, Google Docs, Picasa Web, YouTube — had become capable enough to replace the desktop software use cases that kept users tied to Windows. The first commercial Chromebooks shipped June 15, 2011 from Samsung and Acer; in the third quarter of 2014, IDC estimated that Chromebooks outshipped iPads in US K–12 schools for the first time.

**Sources:** [Introducing the Google Chrome OS (Official Google Blog)](https://googleblog.blogspot.com/2009/07/introducing-google-chrome-os.html), [IDC: Google Reigns US K-12 Devices with 713K Chromebooks Shipped in Q3 (EdSurge)](https://www.edsurge.com/news/2014-11-10-idc-google-reigns-us-k-12-devices-with-713k-chromebooks-shipped-in-q3)
