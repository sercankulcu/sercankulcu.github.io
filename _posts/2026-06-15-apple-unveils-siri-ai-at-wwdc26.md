---
title: Apple Unveils Siri AI at WWDC26
date: 2026-06-15
permalink: /posts/2026/06/apple-unveils-siri-ai-at-wwdc26/
tags:
  - hardware
  - computing
  - history
---

Apple previewed a redesigned Siri at WWDC26 on June 8, 2026, alongside iOS 27, iPadOS 27, macOS 27 (Tahoe), watchOS 27, visionOS 27, and tvOS 27. The updated Siri replaced the older intent-parsing pipeline with a model capable of maintaining multi-turn conversational context — remembering what a user said two exchanges earlier and acting on cumulative instructions without requiring each request to be self-contained. Apple demonstrated examples such as "add the restaurant my sister mentioned in her last email to my Maps list," a task requiring Siri to access Mail, parse unstructured text, identify an entity, and act across two apps with a single spoken instruction.

Apple continued the Apple Intelligence framework introduced with iOS 18 in 2024, which split request routing between on-device models running on the Neural Engine and Private Cloud Compute nodes — Apple-operated servers using Apple silicon that process requests without retaining data and whose software can be verified against a published binary. The routing decision remained opaque to users: simple requests like setting a timer ran locally; requests requiring broader knowledge or access to larger models used the Private Cloud Compute path, with a privacy indicator showing when a request left the device.

For third-party developers, Apple expanded the App Intents API introduced in iOS 16 to support a new App Entity Exposure model, allowing applications to declare their data objects (contacts, documents, purchases, reservations) as types Siri could reason over across applications. A travel app could expose a flight booking as a typed entity; Siri could then cross-reference it with the user's Calendar and offer to add check-in reminders without either application explicitly coordinating the workflow. The permission model required explicit app declarations for what data was exposed, and on-device model inference always ran within the app's sandbox — the system intelligence layer could orchestrate but not exfiltrate.
