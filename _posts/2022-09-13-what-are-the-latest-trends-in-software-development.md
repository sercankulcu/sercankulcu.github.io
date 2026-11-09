---
title: 'What Are The Latest Trends In Software Development?'
date: 2022-09-13
permalink: /posts/2022/09/what-are-the-latest-trends-in-software-development/
tags:
  - career
  - software
---

Every year, lists of software development trends appear. Most of them include the same items at different stages of hype. In September 2022, I want to try something different: instead of simply listing what is popular, I want to say what I think is real, what is overstated, and what is worth investing in now.

## What is genuinely becoming normal

**Cloud-native deployment** stopped being a trend years ago and became an expectation. Most new systems are built assuming they will run in a managed cloud environment. Kubernetes for orchestration, managed databases, serverless functions for specific workloads, object storage — these are not cutting-edge choices anymore. They are the default for a large fraction of new projects.

**TypeScript** has moved from "interesting alternative to JavaScript" to "obvious choice for any JavaScript project with more than one contributor." The tooling, the community adoption, and the improvement in refactoring safety have all crossed a threshold where the overhead of using it is clearly worth the cost.

**Infrastructure as code** — defining cloud resources in Terraform, Pulumi, AWS CDK, or similar tools — is following the same path. Teams that manage infrastructure manually are paying a hidden cost in consistency and auditability that becomes obvious after the first serious incident.

**Automated testing and CI/CD** are now expected rather than praised. A project without a CI pipeline feels incomplete in the same way a project without version control would have felt strange ten years ago.

## What is real but still developing

**AI-assisted coding tools.** GitHub Copilot launched broadly in June 2022, and other similar tools are appearing. The honest assessment from developers using them: they are useful for boilerplate, repetitive patterns, and starting something unfamiliar — but they require careful review, and they do not understand the broader context of a codebase. This is a real shift in the developer experience, not hype, but the extent of its impact on software quality is still unclear.

**Rust** is gaining adoption in systems programming, infrastructure tools, and web assembly. Mozilla, AWS, Microsoft, and the Linux kernel project have all made commitments to it. The learning curve is real — the borrow checker takes time to internalize — but the appeal of memory safety without a garbage collector is solving a real problem. This one is slow and steady rather than sudden.

**Platform engineering** as a discipline — internal developer platforms, golden paths, self-service infrastructure — is solving a real coordination problem for larger organizations. When dozens of teams are deploying microservices, having standardized tooling and processes matters. This is less visible than a new language but probably more impactful for most engineering organizations.

## What is overstated right now

**Web3 and NFTs** dominated discussion in late 2021 and early 2022. By mid-2022, cryptocurrency markets had dropped sharply, several major platforms collapsed, and many projects that promised decentralization delivered mainly complexity. The underlying technology — distributed ledgers, smart contracts — may find durable applications, but the predictions from a year ago look significantly overstated.

**The metaverse** as a near-term platform for work and social interaction has not materialized in the way it was presented. Building useful virtual environments is genuinely hard. The hardware is still awkward. The use cases that justify the friction are still limited.

**Low-code platforms** are real and useful for specific things — automating internal workflows, building dashboards, simple forms and integrations. They are not replacing software engineers for applications that require complex logic, custom performance characteristics, or deep integration. The use case is narrower than the marketing suggests.

## What I am personally paying attention to

The combination of mature cloud infrastructure, reliable CI/CD tooling, and increasingly capable AI assistance is creating conditions where individual developers and small teams can build and operate things that previously required much larger groups. That shift in the economics of building software seems more durable and interesting than most of the trend items on this list.

Security in the supply chain — the Log4Shell vulnerability at the end of 2021 was a reminder that a small dependency pulled from a public registry can cause problems at enormous scale — is also an area where practices are still catching up to the real risk. Software Bill of Materials (SBOM), dependency scanning, and signed artifacts are all moving from optional to expected.

I do not think every trend needs to be followed. A trend is useful only when it solves a real problem you actually have. The harder skill is distinguishing between ideas that are genuinely becoming part of the infrastructure and ideas that are generating excitement without delivering proportional value.
