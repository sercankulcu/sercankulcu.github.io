---
title: Cloudflare Launches 1.1.1.1 Public DNS
date: 2018-04-15
permalink: /posts/2018/04/cloudflare-launches-1-1-1-1-public-dns/
tags:
  - hardware
  - software
  - technology-history
---

Cloudflare launched the public DNS resolver 1.1.1.1 on April 1, 2018 in partnership with APNIC. The memorable address gave users an alternative to ISP resolvers and Google's 8.8.8.8 service.

A recursive DNS resolver receives a domain query, checks its cache, and if necessary follows referrals through the DNS hierarchy until it finds the authoritative answer. Cloudflare emphasized both low latency and privacy, promising not to use resolver data for advertising and to delete most logs quickly.

The service also helped popularize encrypted DNS. Cloudflare supported DNS over HTTPS and DNS over TLS, which protect DNS queries from simple observation or modification on the local network. DNS had traditionally been sent in plaintext even when the website itself used HTTPS.
