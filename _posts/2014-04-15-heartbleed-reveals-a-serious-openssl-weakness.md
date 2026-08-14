---
title: Heartbleed Reveals a Serious OpenSSL Weakness
date: 2014-04-15
permalink: /posts/2014/04/heartbleed-reveals-a-serious-openssl-weakness/
tags:
  - security
  - software
  - computing-history
---

Heartbleed was disclosed in April 2014 as a critical bug in OpenSSL, the cryptographic library used by a huge number of HTTPS servers. The flaw was in the TLS heartbeat extension, not in the underlying encryption algorithms.

A heartbeat request included a payload and a claimed payload length. OpenSSL failed to verify that the claimed length matched the actual data provided. An attacker could send a tiny request that claimed to contain much more data, causing the server to copy nearby process memory into the response. Up to about 64 KB could leak per request.

That memory might contain passwords, session cookies, or even private cryptographic keys. Fixing Heartbleed required more than installing a patch: organizations also had to replace potentially compromised keys and certificates and consider forcing password changes.
