---
title: GDPR Changes How Software Handles Personal Data
date: 2018-05-15
permalink: /posts/2018/05/gdpr-changes-how-software-handles-personal-data/
tags:
  - technology
  - computing-history
  - history
---

The EU's General Data Protection Regulation (GDPR) became enforceable on May 25, 2018, two years after its adoption in April 2016. It applied to any organization processing personal data of EU residents, regardless of where the organization was headquartered — making it effectively a global regulation for any company with EU users. Maximum fines were €20 million or 4% of global annual turnover, whichever was higher. The first major fine came in January 2019: France's CNIL fined Google €50 million for insufficient transparency in its Android onboarding consent flow. British Airways received a £183 million fine (later reduced to £20 million) in 2020 for a 2018 data breach affecting 500,000 customers.

GDPR codified six lawful bases for processing personal data (including consent, legitimate interest, and contractual necessity) and established eight data subject rights: access, rectification, erasure (“right to be forgotten”), restriction of processing, data portability, objection, and rights related to automated decision-making. The right to erasure and right to data portability in particular forced engineering teams to build infrastructure that had previously been deferred: a “delete my account” endpoint that scrubbed data from production databases, analytics pipelines, recommendation models, search indexes, backup archives, and third-party processors required coordinated work across systems that had often been designed without deletion in mind. Data portability required a machine-readable export of all personal data the organization held — prompting many companies to build DSAR (Data Subject Access Request) tooling for the first time.

The consent requirement — that freely given, specific, informed, unambiguous consent was required before placing non-essential cookies — drove the explosion of cookie consent banners visible on websites worldwide. The regulation distinguished between strictly necessary cookies (exempt from consent) and analytics, advertising, and social cookies (requiring explicit opt-in). By 2019, the majority of major websites served visitors a consent modal before loading any analytics or advertising code, a visible and often-criticized user-experience change that became synonymous with GDPR compliance to non-technical users.
