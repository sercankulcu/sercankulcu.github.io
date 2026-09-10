---
title: 'HTTPS Is Becoming Everyones Problem'
date: 2015-12-13
permalink: /posts/2015/12/https-is-becoming-everyones-problem/
tags:
  - security
  - web
  - https
---

For years, HTTPS was associated mainly with banks, shopping carts, and login pages — places where passwords and credit card numbers obviously needed protection. A simple personal website or blog routinely stayed on plain HTTP. Certificates cost money, expired annually, required configuration, and for a blog about recipes or software notes, the effort seemed disproportionate.

That reasoning is becoming harder to sustain in December 2015.

## What HTTPS actually protects

HTTPS does more than protect passwords in transit. It encrypts the entire connection between a browser and a server, preventing network observers — whether that is a coffee shop owner, an ISP, or a government — from reading the content of any page or modifying it before it reaches the browser. Even a page containing only publicly readable text is meaningful to protect: the pattern of pages a person reads reveals interests, political views, health questions, and relationships that the person may not want disclosed.

The other function of HTTPS is authentication: the certificate proves to the browser that the server it is talking to is the server at the claimed domain, not a server that has inserted itself into the path. Without this, a network between you and the destination can serve different content than what the destination intended.

Two developments in 2015 are accelerating the shift. In August 2014, Google announced HTTPS as a ranking signal — HTTPS sites receive a small ranking boost in search results. In September 2015, Chrome 45 began marking HTTP pages with password fields as "Not Secure." The signal is subtle now; the direction is clear.

HTTP/2, standardized in May 2015, provides significant performance improvements over HTTP/1.1 — multiplexed connections, header compression, server push. In practice, browsers only implement HTTP/2 over TLS, meaning switching to HTTPS is effectively required to benefit from the new protocol's performance gains.

## Let's Encrypt and the automation problem

One practical barrier to HTTPS adoption was always certificates. Domain validation certificates cost $10–100 per year from commercial CAs, expire annually, and require configuration steps that are easy to get wrong.

Let's Encrypt began its public beta on December 3, 2015 — ten days before this post. Backed by the EFF, Mozilla, Cisco, Akamai, and others, it provides free domain validation certificates through an automated protocol (ACME) that can handle issuance and renewal without manual steps. The Certbot client can run on a server, verify domain ownership, install the certificate, and schedule automatic renewal — a process that previously required reading documentation and managing calendar reminders.

Automation is the real change. Security practices that require manual steps, even simple ones, tend to be deferred until something breaks. A process that runs automatically once configured eliminates the category of failures that come from forgetting.

## What HTTPS does not fix

A site with HTTPS is not automatically secure. A vulnerable web application, weak session management, or inadequate server configuration can all be exploited through an HTTPS connection. HTTPS protects data in transit between client and server; it does not protect data that is incorrectly stored, incorrectly handled, or readable by software that should not have access to it.

The lock icon means the channel is encrypted and authenticated. It does not mean the destination is trustworthy. These are different claims, and conflating them creates a false sense of safety.

The useful direction for the web is treating HTTPS as a default expectation rather than a special feature reserved for sensitive content. The question should shift from "does this page contain something worth protecting?" to "is there any good reason to send this connection in plaintext when encryption is free?"
