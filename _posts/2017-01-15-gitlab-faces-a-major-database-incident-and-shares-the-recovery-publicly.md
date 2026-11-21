---
title: GitLab Faces a Major Database Incident and Shares the Recovery Publicly
date: 2017-01-15
permalink: /posts/2017/01/gitlab-faces-a-major-database-incident-and-shares-the-recovery-publicly/
tags:
  - technology
  - computing-history
  - history
---

On January 31, 2017 at approximately 5:20 PM UTC, a GitLab database administrator accidentally deleted 300 GB of production PostgreSQL data from db1.cluster.gitlab.com while attempting to remove a directory on a staging server. The error occurred while manually remediating a replication lag incident under time pressure: the administrator ran `rm -rf` targeting a directory path but was connected to the production server rather than staging. GitLab's CEO Sid Sijbrandij and the engineering team made an unusual decision: they live-streamed the recovery effort on YouTube, opened a public Google Doc tracking the incident state, and posted updates in real time to Twitter — narrating the disaster as it unfolded rather than waiting until service was restored.

The deletion exposed five backup mechanisms that were all unusable. The most recent automated pg_dump backup was from six hours earlier — and was itself unusable because the backup server's disk had filled silently, causing backups to fail for days without alerting anyone. Database replication to a secondary had propagated the deletion within seconds. An LVM snapshot was too old. Azure disk snapshots had not been configured on the production servers. A staging environment database was hours stale but was the only usable recovery option. The team restored service using the staging database, losing approximately 5,037 projects, 4,893 comments, 707 user accounts, and 6 hours of production changes created between 5:20 PM and the restoration point.

GitLab published a detailed postmortem within 24 hours covering every backup that failed and why. The incident became the most-cited real-world example of backup failure modes in DevOps training material: “a backup job that reports success is not the same as a restorable backup,” “replication is not backup,” and “test restores, not just backup jobs.” GitLab subsequently implemented regular restore drills, separate failure-domain storage for backups, monitoring on backup success and recency, and clearer tooling to prevent production-vs-staging confusion. The transparency — livestreaming a catastrophic outage — was itself widely studied as crisis communication, generating coverage that did less reputational damage than the incident might have caused if handled opaquely.
