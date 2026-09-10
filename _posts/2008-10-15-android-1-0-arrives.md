---
title: Android 1.0 Arrives
date: 2008-10-15
permalink: /posts/2008/10/android-1-0-arrives/
tags:
  - hardware
  - software
  - technology-history
---

Android 1.0 launched on October 22, 2008 with the T-Mobile G1 (HTC Dream) — the first commercial Android device, sold at $179 with a two-year T-Mobile contract or $399 unlocked. The hardware was built around a Qualcomm MSM7201A processor at 528 MHz with 192 MB RAM and 256 MB internal storage, a 3.17-inch 320×480 touchscreen, and a physical QWERTY keyboard that slid out from beneath the display (Android 1.0 had no virtual keyboard). The Android Market launched the same day with approximately 50 available applications, using a 70/30 revenue split (developer/Google) matching the App Store's model. Google Maps, Gmail, YouTube, and Google Talk were preinstalled, with native Google Calendar and Contacts sync through Google's servers.

Android's software architecture ran each application in a separate Linux process with a unique user ID, enforcing process isolation at the kernel level. The Dalvik virtual machine executed .dex (Dalvik Executable) bytecode — a register-based format (unlike the JVM's stack-based bytecode) optimized for devices with 64–192 MB RAM, where loading multiple class files simultaneously was constrained. Applications declared required permissions (ACCESS_NETWORK_STATE, READ_CONTACTS, ACCESS_FINE_LOCATION) in a manifest file that Android displayed to users at install time. Intents — the messaging system for inter-app communication — allowed any app to invoke capabilities from any other app (email, maps, camera) without requiring the first app to implement them, a deliberate open design contrast to iOS's sandboxed compartmentalization.

Android 1.0 lacked many features the iPhone 2.0 (launched July 11, 2008, three months earlier) already had: no Bluetooth A2DP audio streaming, no video recording, and limited third-party app capabilities. But the open hardware licensing allowed Samsung, Motorola, LG, and Sony Ericsson to build Android phones without licensing fees, while Apple's iOS remained iPhone-exclusive. Android 1.5 (Cupcake, April 2009) added a virtual keyboard and video recording; Android 2.0 (Eclair, October 2009) added multi-touch support. Android surpassed iPhone in US quarterly smartphone unit sales in Q4 2010 (26.9% vs 25.1% market share), driven by availability across dozens of carrier-subsidized handsets at multiple price points. Google had acquired Android Inc. in July 2005 for approximately $50 million; Andy Rubin, Android's co-founder and post-acquisition leader at Google, led the platform through its first decade.
