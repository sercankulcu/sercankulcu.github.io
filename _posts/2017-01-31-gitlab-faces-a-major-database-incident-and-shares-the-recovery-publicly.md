---
title: GitLab Faces a Major Database Incident and Shares the Recovery Publicly
excerpt: "GitLab's January 2017 accidental deletion of production data, five failed backups, the public livestreamed recovery, and the lessons about restorable backups."
date: 2017-01-31
permalink: /posts/2017/01/gitlab-faces-a-major-database-incident-and-shares-the-recovery-publicly/
tags:
  - technology
  - computing-history
  - history
---

On January 31, 2017 at approximately 11:30 PM UTC, a GitLab database administrator accidentally deleted 300 GB of production PostgreSQL data from db1.cluster.gitlab.com while attempting to wipe the secondary database server. The error occurred while manually remediating a replication lag incident under time pressure: the administrator ran `rm -rf` targeting a directory path but was connected to the primary server rather than the secondary. GitLab's CEO Sid Sijbrandij and the engineering team made an unusual decision: they live-streamed the recovery effort on YouTube, opened a public Google Doc tracking the incident state, and posted updates in real time to Twitter — narrating the disaster as it unfolded rather than waiting until service was restored.

The deletion exposed five backup mechanisms that were all unusable. The pg_dump backups to S3 had been failing because of a version mismatch (pg_dump 9.2 against PostgreSQL 9.6), and the failure alert emails were rejected, so nobody noticed; the S3 bucket was empty. Replication to the secondary was unusable: it had broken earlier, and the secondary had been wiped as part of rebuilding it. Azure disk snapshots had not been enabled for the database servers. LVM snapshots existed, one about 24 hours old and one taken manually about six hours earlier, and the six-hour-old snapshot was the only usable recovery option. The team restored service by copying that snapshot's data from staging, losing at least 5,000 projects, about 5,000 comments, roughly 700 user accounts, and production changes made after 5:20 PM UTC.

GitLab published a detailed postmortem on February 10, 2017 covering every backup that failed and why. The incident became the most-cited real-world example of backup failure modes in DevOps training material: “a backup job that reports success is not the same as a restorable backup,” “replication is not backup,” and “test restores, not just backup jobs.” GitLab subsequently implemented regular restore drills, separate failure-domain storage for backups, monitoring on backup success and recency, and clearer tooling to prevent production-vs-staging confusion. The transparency — livestreaming a catastrophic outage — was itself widely studied as crisis communication, generating coverage that did less reputational damage than the incident might have caused if handled opaquely.

**Sources:** [Postmortem of database outage of January 31 (GitLab)](https://about.gitlab.com/blog/2017/02/10/postmortem-of-database-outage-of-january-31/)
