---
title: Google Wave Is Revealed
date: 2009-05-15
permalink: /posts/2009/05/google-wave-is-revealed/
tags:
  - technology
  - computing-history
  - history
---

Google revealed Wave at Google I/O on May 27–28, 2009, in an 80-minute live demo by Lars Rasmussen — the same engineer who had previously co-created Google Maps with his brother Jens at Where 2 Technologies before Google acquired it in 2004. A “wave” was a hybrid object combining a shared document, a conversation thread, and a live collaboration session. Every participant saw other users' keystrokes appear character by character in real time as they typed, rather than waiting for messages to be sent. Waves were nestled: sub-conversations (wavelets) could branch inside a parent wave, and any participant could edit any message in the conversation's history, unlike email's immutable sent-message model.

The technical core was Operational Transformation (OT), an algorithm for merging concurrent document edits from multiple clients into a consistent shared state. OT resolves conflicts by transforming each incoming operation against all operations that have been applied since the branching point — for example, if two users insert characters at position 5 simultaneously, OT adjusts one insertion's position to account for the other. Google published the Wave protocol as an open federation specification, intended to allow organizations to run their own Wave servers that interoperated with Google's (similar to email's SMTP federation model). The Wave client was built entirely in GWT (Google Web Toolkit), compiling Java to JavaScript, and used a custom XMPP-based protocol for server communication. Approximately 100,000 developer invitations went out in September 2009, followed by a public preview in May 2010.

Google discontinued Wave on August 4, 2010, citing insufficient user adoption — less than 14 months after the I/O announcement. The explanation was consistent with user feedback: Wave was technically sophisticated but conceptually difficult. Existing email users had established habits for asynchronous communication; Wave's real-time character-by-character visibility required both parties to be present simultaneously, creating anxiety about being “watched” while composing. The open-source Apache Wave project continued development after Google shut down Wave servers on January 31, 2012. Operational Transformation itself survived and expanded: Google Docs had already acquired OT capability through the EtherPad acquisition in November 2009 (just months after Wave's debut), and real-time collaborative editing became standard in Google Docs, Microsoft Office 365, and Notion — the Wave vision realized in products that didn't try to replace email entirely.
