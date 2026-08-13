---
title: 'HTTPS Is Becoming Everyones Problem'
date: 2015-12-13
permalink: /posts/2015/12/https-is-becoming-everyones-problem/
tags:
  - security
  - web
  - https
---

For years, HTTPS has been associated mainly with banks, shopping sites, and login pages. A simple personal website or blog often stayed on ordinary HTTP because encryption seemed unnecessary and certificates were inconvenient.

That attitude is changing.

HTTPS protects more than passwords. It prevents people on the network from easily reading or modifying the connection between a browser and a website. Even a public page can be altered in transit, and the list of pages a person reads may reveal private interests.

Browsers and search engines are also beginning to encourage encryption more strongly. The web is slowly moving toward the idea that secure transport should be normal rather than a special feature.

One practical obstacle has always been certificates. They cost money, expire, and can be confusing to configure. Let's Encrypt is trying to change this by providing free certificates and automated tools. Its public beta started this month, and the idea feels important even if the service is still young.

Automation may be the real breakthrough. Security practices often fail because the correct process is difficult enough that people postpone it. If obtaining and renewing a certificate becomes simple, many small websites can use HTTPS without turning certificate management into a yearly project.

Encryption does not make a site completely secure. A server can still contain vulnerable software. Passwords can still be weak. An application can still have bugs. HTTPS solves a particular problem: protecting data while it moves between two points and helping the browser verify which server it is talking to.

I think the web is moving toward a useful default. Instead of asking, "Does this page contain something important enough to encrypt?" we may eventually ask why any connection should be sent openly when encryption is practical.

Good security often becomes invisible after it becomes normal.

Maybe the lock icon will eventually become so ordinary that we stop celebrating its presence and start worrying about its absence.
