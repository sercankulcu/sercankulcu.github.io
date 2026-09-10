---
title: 'The Quiet Value Of Making Backups'
date: 2010-12-19
permalink: /posts/2010/12/the-quiet-value-of-making-backups/
tags:
  - computers
  - productivity
  - life
---

Backups are one of the least exciting parts of using a computer. Nothing new appears when a backup works. There is no faster program, no new feature, no visual change at all. We only create another copy of something we already have.

That is probably why most people understand backups properly only after losing data.

## What actually fails

The causes of data loss are mundane and varied. Hard drives have a mechanical failure rate that increases with age — most consumer drives are designed for three to five years of use, but failures can occur at any point. A laptop that is dropped can damage a drive immediately. A power surge can corrupt a drive's file system. A theft removes both the computer and everything stored on it simultaneously. A file deleted by mistake — yours or a piece of malware's — is gone unless another copy exists.

The worst aspect of each of these scenarios is that you cannot know when one will happen. A hard drive that has worked reliably for four years gives no warning before failing. Data loss is not gradual; it is sudden, and it happens at random moments that are never convenient.

## Why one copy is not safe

The most common backup mistake is treating a single copy as a backup. A document that exists only on a laptop is not backed up. If the laptop's hard drive fails, the document is gone. A document that exists on the laptop and on a USB drive plugged into the laptop is barely better — if the laptop is stolen, both are taken together. If there is a fire, both are in the same room.

The principle that addresses this is often called the 3-2-1 rule: three copies of any important data, on at least two different types of media, with one copy stored off-site. Three copies because one will be the original and two will be backups — if one backup fails during a restore, you have another. Two media types because failures often affect similar media simultaneously (a power surge can damage both a computer and an attached external drive). Off-site because physical disasters — fire, flood, theft — can destroy everything in one location.

In December 2010, the practical options are:

- **External hard drives** for a second local copy, preferably on an automated schedule using software like Windows Backup or Time Machine on a Mac
- **Online backup services** — Mozy and Carbonite are the established options — which upload files continuously in the background. Upload speed is the limitation; a first backup of a large drive can take weeks. The privacy question is real for sensitive files
- **A second computer** in a different location running scheduled synchronization

## Automation matters more than intention

A backup plan that depends on memory will fail. People follow a manual routine for a while and then miss it during a busy period, and then miss it again. Software running on a schedule is more reliable than intention.

Time Machine on a Mac, once configured, backs up to an attached drive every hour with no further action required. Mozy and Carbonite run in the background and upload changed files continuously. The configuration is a one-time effort; the protection is continuous.

## The part most people skip

The final piece — the hardest lesson — is testing whether the backup can actually be restored. A backup is not confirmed until something has been restored from it. Software can report "backup completed" after writing to a disk that has developed read errors. An online service can show green checkmarks while the account is in a state that prevents downloads.

Restoring a sample of files from the backup once a year takes twenty minutes and confirms that the system is actually working. Without this test, a backup is something closer to a hope.

I like backups as a metaphor for quiet preparation. Much of good engineering is invisible when it works — the fallback that never activates, the safety margin that is never needed, the documentation that sits unread until the person who wrote it is unavailable. These things look unnecessary on normal days. Their value appears on the abnormal day, which is the only day when it is too late to begin.
