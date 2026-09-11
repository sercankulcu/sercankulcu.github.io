---
title: Amazon Expands the Idea of Cloud Computing
date: 2007-12-15
permalink: /posts/2007/12/amazon-expands-the-idea-of-cloud-computing/
tags:
  - cloud
  - software
  - distributed-systems
---

Amazon Web Services launched Amazon S3 on March 14, 2006 ($0.15 per GB stored, $0.20 per GB transferred out) and EC2 public beta on October 25, 2006, at $0.10/hour for the smallest (m1.small: 1 vCPU, 1.7 GB RAM) through $0.80/hour for m1.xlarge (4 vCPUs, 15 GB RAM). Both ran on Xen hypervisors in Amazon's data centers, exposing infrastructure that Amazon had built for its own retail operations. In November 2007, Amazon added SimpleDB (a schemaless, eventually-consistent key-value store) as AWS's first managed database service. By the end of 2007, S3 was storing tens of billions of objects, and notable startups including Dropbox (which launched in April 2007 with S3 as its storage backend), SmugMug, Reddit, and Animoto had built their core infrastructure on AWS.

EC2's operational model inverted traditional startup infrastructure. Previously, a new web service required purchasing or leasing dedicated servers — 2–4 week lead times, minimum 1-year contracts at $200–$500/month per server, plus network hardware, rack space, power, and operations staff. EC2 provided a Linux VM in under a minute via API call with no minimum commitment, billed hourly. A startup could provision a single m1.small for $72/month and scale to 100 m1.xlarge instances at $58,000/month during a traffic spike, then return to minimal capacity — all through HTTP API calls. The Xen virtualization layer was invisible to users; EC2 instance types mapped to guaranteed CPU shares and memory allocations on physical hardware shared across multiple customers.

The expansion through 2007 demonstrated AWS's compounding flywheel: more services attracted more developers, who built more applications, who required more services. Amazon SQS (Simple Queue Service) had been available since 2006 for message queuing; CloudFront CDN launched in November 2008; RDS (managed MySQL) and Elastic Load Balancing in October 2009. By Q4 2014, AWS reported $684 million quarterly revenue from 40+ services, the most comprehensive infrastructure cloud available. Google announced Google Cloud Platform (App Engine) in April 2008 and Microsoft Azure in February 2010, both chasing the AWS model AWS had established by the end of 2007.

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in cloud, software, and distributed systems: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
