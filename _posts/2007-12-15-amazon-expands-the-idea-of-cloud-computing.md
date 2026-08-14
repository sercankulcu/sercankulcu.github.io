---
title: Amazon Expands the Idea of Cloud Computing
date: 2007-12-15
permalink: /posts/2007/12/amazon-expands-the-idea-of-cloud-computing/
tags:
  - cloud
  - software
  - distributed-systems
---

By the end of 2007, Amazon Web Services had turned “cloud computing” from a vague phrase into a practical development model. S3 offered object storage, while EC2 let developers rent virtual machines by the hour instead of buying physical servers.

EC2 instances ran on Amazon's infrastructure using virtualization, so customers could start and stop compute capacity through APIs. Combined with S3, this separated application design from ownership of physical hardware. A small team could launch a service, increase capacity during traffic spikes, and reduce it later without negotiating for new servers.

This changed the economics of experimentation. Infrastructure spending could become an operating expense tied to actual use rather than a large up-front purchase. The model also created new engineering problems—automation, stateless design, failure recovery, and cost control—but those problems would define modern cloud architecture.
