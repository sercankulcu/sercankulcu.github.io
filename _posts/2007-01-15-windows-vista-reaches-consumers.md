---
title: Windows Vista Reaches Consumers
date: 2007-01-15
permalink: /posts/2007/01/windows-vista-reaches-consumers/
tags:
  - software
  - programming
  - computing-history
---

Windows Vista launched at retail for consumers on January 30, 2007, following a November 30, 2006 release for volume-license business customers. Retail editions: Home Basic ($199 upgrade), Home Premium ($239 upgrade), Business ($299 upgrade), and Ultimate ($399 upgrade). Vista "Premium Ready" hardware required a 1 GHz CPU, 1 GB RAM, 128 MB dedicated VRAM, and a DirectX 9-capable GPU with WDDM driver support for Aero Glass transparency effects — specifications that exceeded the average PC sold in 2005–2006, when many machines shipped with 512 MB RAM and integrated graphics.

Vista's development stretched from 2001 (starting as "Longhorn") through August 2004, when Microsoft reset the entire codebase onto the Windows Server 2003 SP1 foundation after the ambitious WinFS transactional filesystem proved undeliverable. The five-year development cycle produced genuine architectural advances: the WDDM (Windows Display Driver Model) moved GPU driver execution to user mode and allowed the scheduler to preempt GPU operations, enabling the Aero Glass compositing and making display driver crashes recoverable without rebooting; the audio stack moved from kernel mode to WASAPI (Windows Audio Session API) enabling per-application volume control but breaking many audio applications that depended on kernel-mode WDM; BitLocker full-disk encryption in Enterprise and Ultimate editions added hardware-backed data protection using a TPM chip; the TCP/IP stack was completely rewritten with native dual IPv4/IPv6 support and auto-tuning receive window scaling. User Account Control (UAC) limited applications to standard user privilege by default and displayed consent prompts for administrative operations — an approach correct in principle but calibrated too aggressively, generating 4–6 elevation prompts in a typical 15-minute session.

Vista sold 100 million copies in the first year, a faster pace than Windows XP in 2001. But enterprise adoption was dramatically slower: corporations that had deployed XP on stable hardware had no compelling reason to upgrade, and Vista's driver requirements meant hardware replacement costs alongside software licensing. Apple's "Get a Mac" advertising campaign (launched June 2006) specifically attacked Vista's compatibility problems and UAC prompts. Windows 7, released October 22, 2009, kept Vista's NT 6.x kernel, WDDM driver model, BitLocker, and rewritten audio and network stacks — benefiting from Vista's two years of driver and ecosystem maturation — while reducing UAC frequency and improving performance. Most major enterprises deployed Windows 7 directly, skipping Vista entirely.
