---
title: Windows 7 Reaches RTM
excerpt: "Windows 7 reached RTM in July 2009: the OEM and enterprise preparation period, retail pricing, and why Vista's driver groundwork helped it sell quickly."
date: 2009-09-15
permalink: /posts/2009/09/windows-7-reaches-rtm/
tags:
  - software
  - programming
  - computing-history
---

Windows 7 reached RTM (Release to Manufacturing) on July 22, 2009, with build 7600.16385 signed as the final code. TechNet and MSDN subscribers could download the RTM build on August 6; OEM distribution — Dell, HP, Lenovo, Toshiba, and others receiving the build to preinstall on new PCs — began about two days after RTM, on July 24. The public retail launch was October 22, 2009, with Home Premium priced at $119.99 upgrade / $199.99 full, Professional at $199.99 upgrade / $299.99 full. Microsoft also introduced a temporary three-license "Family Pack" at $149.99 for Home Premium to address household multi-PC licensing.

The RTM milestone triggered a coordinated 90-day preparation period involving OEMs, enterprise IT departments, software vendors, and antivirus companies simultaneously. PC manufacturers needed to validate driver packages, configure factory images, install OEM software bundles (recovery partitions, antivirus trials, branded utilities), and pass Microsoft's certification requirements — all against the fixed RTM build. Enterprise customers needed time to test application compatibility, configure group policies, validate custom applications, and prepare deployment images for SCCM (System Center Configuration Manager). Antivirus vendors needed the final build to update their products. This ecosystem preparation work began in late July and ran through October 22; during this period, a preliminary version of Windows 7 had already been available to millions of beta testers since January 2009, creating a large pool of compatibility reports that informed the OEM validation work.

Windows 7 sold over 60 million licenses by the end of 2009 — faster than any previous Windows version. Microsoft credited the speed partly to Vista driver infrastructure: because Windows 7 used the same WDDM (Windows Display Driver Model) driver generation as Vista, hardware drivers that worked in Vista (including those that had been updated and fixed over Vista's 2.5-year lifespan) required no modification for Windows 7. The contrast with Vista's launch was intentional: Vista had introduced WDDM in January 2007 when few drivers existed, while Windows 7 inherited a mature ecosystem of Vista-validated drivers.

**Sources:** [Windows 7 has been released to manufacturing (Windows Experience Blog)](https://blogs.windows.com/windowsexperience/2009/07/22/windows-7-has-been-released-to-manufacturing/), [When will you get Windows 7 RTM? (Windows Experience Blog)](http://blogs.windows.com/windowsexperience/2009/07/21/when-will-you-get-windows-7-rtm/), [Announcing the Windows 7 Upgrade Option Program and pricing (Windows Experience Blog)](https://blogs.windows.com/windowsexperience/2009/06/25/announcing-the-windows-7-upgrade-option-program-windows-7-pricing-bring-on-ga/)
