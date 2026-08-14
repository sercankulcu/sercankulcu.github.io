---
title: Amazon S3 Launches and Changes Web Infrastructure
date: 2006-03-15
permalink: /posts/2006/03/amazon-s3-launches-and-changes-web-infrastructure/
tags:
  - cloud
  - software
  - distributed-systems
---

Amazon launched Simple Storage Service, better known as S3, in March 2006. Instead of renting a server and managing disks, developers could store arbitrary objects through a web API and pay for the storage and bandwidth they actually used.

S3 organized data into buckets and objects identified by keys. It deliberately did not behave like a traditional local file system: there were no directories in the normal POSIX sense, and applications interacted with storage through HTTP requests. That design made it easier for Amazon to replicate data across machines and scale the service independently of any single server.

The launch helped normalize a new idea in software architecture: infrastructure could be consumed as a programmable service. Startups no longer needed to buy enough storage hardware for their future peak demand before they had users. Object storage later became a standard component of cloud systems, backups, data lakes, and web applications.
