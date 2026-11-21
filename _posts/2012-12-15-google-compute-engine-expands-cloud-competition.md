---
title: Google Compute Engine Expands Cloud Competition
date: 2012-12-15
permalink: /posts/2012/12/google-compute-engine-expands-cloud-competition/
tags:
  - cloud
  - software
  - distributed-systems
---

Google announced Google Compute Engine in preview at Google I/O in June 2012 and expanded it to a limited general availability in December 2012, removing the invitation requirement and allowing any Google account to create virtual machines. Compute Engine launched with standard Linux VM types (n1-standard-1 through n1-standard-16, up to 16 vCPUs and 60 GB RAM), persistent disks, and snapshots for backup and clone — directly comparable to Amazon EC2 instance types that Amazon had been selling since 2006. Google priced standard instances approximately 10% below Amazon's equivalent pricing at launch.

The technical differentiation Google emphasized was its networking infrastructure. Compute Engine VMs connected to Google's private global fiber network, which linked Google's data centers in the US, Europe, and Asia with lower latency and higher bandwidth than public internet routing. Persistent disk throughput scaled with the size of the disk (up to 720 MB/s per disk in later generations) rather than being a fixed per-VM allocation as Amazon EBS was at the time. Google's data center locations were fewer than Amazon's in 2012 (US-central-1 and US-east-1 initially, with Europe added in 2013) but Google emphasized SLA uptime and networking quality over geographic breadth.

Compute Engine's December 2012 expansion to general availability put Google directly in the IaaS (Infrastructure as a Service) market alongside Amazon Web Services (the 2012 market leader with AWS EC2, S3, RDS, and many supporting services) and Microsoft Azure (launched commercially in February 2010). Google Cloud Platform's cloud storage and BigQuery had already been available, but Compute Engine's general availability allowed enterprises to migrate arbitrary virtual machine workloads — a broader footprint than App Engine's managed platform could accommodate. Google's early cloud revenue was a fraction of Amazon's; AWS reported $684 million in Q4 2014 revenue, while Google Cloud (combined) reported its first annual revenue of approximately $500 million in 2015.
