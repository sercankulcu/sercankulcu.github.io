---
title: CrowdStrike Update Causes a Global Windows Outage
date: 2024-07-15
permalink: /posts/2024/07/crowdstrike-update-causes-a-global-windows-outage/
tags:
  - security
  - software
  - computing-history
---

On July 19, 2024, a faulty CrowdStrike Falcon content update caused millions of Windows systems to crash with blue screens. Airlines, hospitals, banks, broadcasters, and other organizations were disrupted around the world.

Falcon's security software operates with high privileges so it can inspect low-level system activity. The bad update caused a failure in that privileged component during boot. Because affected machines could enter a crash loop before normal remote-management tools became available, recovery often required hands-on intervention or specially prepared automated procedures.

The incident was not a cyberattack. It demonstrated a different systemic risk: trusted security software is itself part of the critical computing supply chain. Staged rollout, validation, rollback design, and recovery access are essential even when the update comes from a legitimate vendor.
