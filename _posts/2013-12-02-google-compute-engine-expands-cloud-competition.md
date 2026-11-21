---
title: Google Compute Engine Expands Cloud Competition
excerpt: "Google Compute Engine reaches general availability in December 2013: VM types, pricing against Amazon EC2 and its place in the IaaS market."
date: 2013-12-02
permalink: /posts/2012/12/google-compute-engine-expands-cloud-competition/
tags:
  - cloud
  - software
  - distributed-systems
---

Google announced Google Compute Engine in preview at Google I/O in June 2012 and made it generally available on December 2, 2013. Compute Engine launched with standard Linux VM types (n1-standard-1 through n1-standard-16, up to 16 vCPUs and 60 GB RAM), persistent disks, and snapshots for backup and clone — directly comparable to Amazon EC2 instance types that Amazon had been selling since 2006. At general availability Google cut the price of standard instances by 10% in all regions.

The technical differentiation Google emphasized was its networking infrastructure. Compute Engine VMs connected to Google's private global fiber network, which linked Google's data centers in the US, Europe, and Asia with lower latency and higher bandwidth than public internet routing. Persistent disk throughput scaled with the size of the disk rather than being a fixed per-VM allocation as Amazon EBS was at the time. Google's data center locations were fewer than Amazon's in 2012 but Google emphasized SLA uptime and networking quality over geographic breadth.

Compute Engine's December 2013 general availability put Google directly in the IaaS (Infrastructure as a Service) market alongside Amazon Web Services (the 2012 market leader with AWS EC2, S3, RDS, and many supporting services) and Microsoft Azure (launched commercially in February 2010). Google Cloud Platform's cloud storage and BigQuery had already been available, but Compute Engine's general availability allowed enterprises to migrate arbitrary virtual machine workloads — a broader footprint than App Engine's managed platform could accommodate. Google's early cloud revenue was a fraction of Amazon's; AWS reported $4.6 billion in revenue for 2014.

**Sources:** [Google Compute Engine is now Generally Available with expanded OS support, transparent maintenance, and lower prices (Google Developers Blog)](https://developers.googleblog.com/2013/12/google-compute-engine-is-now-generally.html), [AWS reveals US$5b annual revenue for first time (iTnews)](https://www.itnews.com.au/news/aws-reveals-us5b-annual-revenue-for-first-time-403105)
