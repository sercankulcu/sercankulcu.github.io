---
title: 'GDPR And The Question Of Who Owns Personal Data'
date: 2018-03-25
permalink: /posts/2018/03/gdpr-and-the-question-of-who-owns-personal-data/
tags:
  - privacy
  - web
  - technology
---

The timing of this post is not accidental. This month — March 2018 — the Cambridge Analytica story broke in the New York Times and the Observer, describing how the company had harvested data from up to 87 million Facebook users without their explicit consent, using an academic researcher's app as the collection mechanism. The story arrived two months before the GDPR's enforcement date of May 25, 2018. If there was ever a moment to think carefully about who owns personal data and what obligations come with collecting it, this is it.

## What GDPR requires

The General Data Protection Regulation is a large document — 99 articles and 173 recitals — but the practical obligations reduce to a few questions that organizations now need to answer:

**What lawful basis do you have for processing?** GDPR requires that each processing activity have a legal basis. The six options include consent, contractual necessity, legitimate interest, legal obligation, vital interest, and public task. "We collected it because we could" is not on the list.

**Can users exercise their rights?** The regulation creates specific rights that individuals can invoke:
- **Article 15**: Right of access — a user can request what data an organization holds about them
- **Article 17**: Right to erasure ("right to be forgotten") — a user can request deletion, subject to exceptions
- **Article 20**: Right to data portability — a user can request their data in a machine-readable format for transfer elsewhere
- **Article 22**: Right not to be subject to automated decision-making that significantly affects them

**Is consent meaningful?** A 12,000-word privacy policy in size-7 font that a user must accept to use the service is not meaningful consent under GDPR. Consent must be freely given, specific, informed, and unambiguous. Pre-ticked checkboxes do not count. Bundling consent for multiple purposes into one click does not count.

## What this means for how software is built

For developers, GDPR is a design problem, not just a compliance checkbox. Consider what "delete my account" means in a typical application:

- A row in the users table — easy to delete
- Rows in related tables (orders, comments, reviews, messages) — may be referenced elsewhere
- Backups — data may persist in backups for months after deletion from the primary database
- Logs — access logs, error logs, audit logs may contain email addresses and user IDs
- Analytics data — third-party analytics (Google Analytics, Mixpanel) may have received user activity data
- CDN caches — profile images and user-generated content may be cached
- Third-party processors — email marketing platforms, support ticketing systems, payment processors may hold copies

A request to delete user data reaches all of these places. Most applications were not built with this in mind. Compliance requires either changing how data flows through the system or documenting which data flows are covered by which legal basis and cannot be deleted.

The privacy-by-design principle in GDPR's Article 25 is the more future-facing direction: build systems that minimize data collection by design, rather than retrofitting deletion mechanisms onto systems built to collect everything.

## The penalty structure

GDPR's enforcement mechanism is significant: fines of up to €20 million or 4% of annual global turnover, whichever is greater. For a company with €5 billion in annual revenue, the maximum fine is €200 million. These numbers are intended to be proportionate to large companies — previous European data protection fines were capped at amounts that major platforms could treat as a cost of business.

Whether enforcement will be vigorous remains to be seen. The regulation has just been finalized, and the Data Protection Authorities in each EU member state will be responsible for enforcement within their jurisdictions.

## The question the regulation asks

What GDPR ultimately asks — at the level of philosophy, not just compliance — is whether storing personal data indefinitely is appropriate simply because storage is cheap. The assumption that more data is always better has governed the industry for years. The regulation pushes against that assumption by requiring organizations to articulate why they have data, how long they need it, and what entitles them to have it.

I think this is healthy. Software has become extraordinarily capable of remembering things. People should retain some ability to limit what is remembered about them, and for how long.
