---
title: SolarWinds Reveals a Major Software Supply Chain Attack
date: 2020-12-15
permalink: /posts/2020/12/solarwinds-reveals-a-major-software-supply-chain-attack/
tags:
  - security
  - software
  - computing-history
---

A major supply-chain compromise involving SolarWinds Orion software was disclosed in December 2020. Attackers had inserted malicious code into legitimate, digitally signed software updates distributed to thousands of organizations.

The implanted component, commonly called SUNBURST, waited before contacting command-and-control infrastructure and attempted to blend into normal network behavior. Because the malicious code arrived through a trusted vendor's update mechanism, traditional perimeter defenses had little reason to block it.

The incident showed why software supply-chain security is difficult. Trust is transitive: an organization may secure its own systems but still execute code built by vendors, package repositories, CI services, and dependencies. Protecting that chain requires build isolation, code signing, provenance, monitoring, and the ability to detect abnormal behavior even from trusted software.
