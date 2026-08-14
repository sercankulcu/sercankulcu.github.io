---
title: GitLab Faces a Major Database Incident and Shares the Recovery Publicly
date: 2017-01-15
permalink: /posts/2017/01/gitlab-faces-a-major-database-incident-and-shares-the-recovery-publicly/
tags:
  - technology
  - computing-history
  - history
---

GitLab suffered a serious database incident in January 2017 after production data was accidentally deleted during troubleshooting. The event became famous because the company documented the recovery process publicly in real time instead of hiding the failure.

The deletion exposed a worse problem: several backup mechanisms were not usable when they were actually needed. Some had failed silently, others had never been fully tested, and replication could not help because destructive changes had already propagated.

GitLab eventually restored most data from a staging database, losing several hours of production changes. The incident became a classic operations lesson: a backup is not real merely because a job says “success.” Recovery procedures must be tested, monitored, and separated from the same failure domains as production systems.
