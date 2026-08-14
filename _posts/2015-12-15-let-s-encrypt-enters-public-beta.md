---
title: Let's Encrypt Enters Public Beta
date: 2015-12-15
permalink: /posts/2015/12/let-s-encrypt-enters-public-beta/
tags:
  - technology
  - computing-history
  - history
---

Let's Encrypt entered public beta in December 2015 with a goal that sounded simple but had major consequences: make HTTPS certificates free and automate their installation.

Traditional certificate authorities often required manual identity checks, payment, and repeated renewal work. Let's Encrypt used the ACME protocol so a server could prove control of a domain automatically and obtain a short-lived TLS certificate through software.

This removed a major barrier to encrypting ordinary websites. Combined with browser pressure toward HTTPS, automated certificates helped move the web from encryption mainly on login and payment pages toward encryption by default. The project showed how changing deployment tooling can improve security at Internet scale without inventing a new cryptographic algorithm.
