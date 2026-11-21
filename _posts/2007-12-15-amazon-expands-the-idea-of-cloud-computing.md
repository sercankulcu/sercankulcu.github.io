---
title: Amazon Expands the Idea of Cloud Computing
excerpt: "How Amazon S3, EC2 and SimpleDB turned rented infrastructure into pay-by-the-hour services, and how that changed what a startup needed to launch."
date: 2007-12-15
permalink: /posts/2007/12/amazon-expands-the-idea-of-cloud-computing/
tags:
  - cloud
  - software
  - distributed-systems
---

Amazon Web Services launched Amazon S3 on March 14, 2006 ($0.15 per GB stored, $0.20 per GB transferred out) and EC2 public beta on August 24, 2006, at $0.10/hour for the smallest (m1.small: 1 vCPU, 1.7 GB RAM) through $0.80/hour for m1.xlarge (4 vCPUs, 15 GB RAM). Both ran on Xen hypervisors in Amazon's data centers, exposing infrastructure that Amazon had built for its own retail operations. In December 2007, Amazon added SimpleDB (a schemaless, eventually-consistent key-value store) as AWS's first managed database service. By the end of 2007, S3 was storing tens of billions of objects, and notable startups including SmugMug and Animoto had built their core infrastructure on AWS.

EC2's operational model inverted traditional startup infrastructure. Previously, a new web service required purchasing or leasing dedicated servers — 2–4 week lead times, minimum 1-year contracts at $200–$500/month per server, plus network hardware, rack space, power, and operations staff. EC2 provided a Linux VM in under a minute via API call with no minimum commitment, billed hourly. A startup could provision a single m1.small for $72/month and scale to 100 m1.xlarge instances at $58,000/month during a traffic spike, then return to minimal capacity — all through HTTP API calls. The Xen virtualization layer was invisible to users; EC2 instance types mapped to guaranteed CPU shares and memory allocations on physical hardware shared across multiple customers.

The expansion through 2007 demonstrated AWS's compounding flywheel: more services attracted more developers, who built more applications, who required more services. Amazon SQS (Simple Queue Service) had been available since 2006 for message queuing; CloudFront CDN launched in November 2008; Elastic Load Balancing in May 2009 and RDS (managed MySQL) in October 2009. In 2014, AWS reported $4.6 billion in revenue, the most comprehensive infrastructure cloud available. Google announced Google Cloud Platform (App Engine) in April 2008 and Microsoft Azure in February 2010, both chasing the AWS model AWS had established by the end of 2007.

**Sources:** [Announcing Amazon Elastic Compute Cloud (Amazon EC2) - Beta](https://aws.amazon.com/about-aws/whats-new/2006/08/24/announcing-amazon-elastic-compute-cloud-amazon-ec2---beta), [Announcing Amazon SimpleDB (limited beta)](https://aws.amazon.com/about-aws/whats-new/2007/12/13/announcing-amazon-simpledb-limited-beta), [AWS reveals US$5b annual revenue for first time (iTnews)](https://www.itnews.com.au/news/aws-reveals-us5b-annual-revenue-for-first-time-403105)
