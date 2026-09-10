---
title: Facebook Opens Registration Beyond Colleges
date: 2006-09-15
permalink: /posts/2006/09/facebook-opens-registration-beyond-colleges/
tags:
  - technology
  - computing-history
  - history
---

Facebook opened registration to anyone aged 13 or older with a valid email address on September 26, 2006. At that moment, the service had approximately 9.5 million registered users, almost entirely university and high school students. Myspace had approximately 100 million registered users at the same time and was the dominant social network; Friendster had peaked and was declining; LinkedIn served professionals. The open-registration decision came three weeks after a product change that would define Facebook's growth: the News Feed, launched September 5, 2006, which displayed a continuous stream of friends' activity (status updates, photo uploads, relationship changes, group joins) on the home page — replacing the model of navigating to individual profiles to discover activity.

News Feed generated immediate backlash: a student group called "Students Against Facebook News Feed" collected 700,000 members within days, arguing that the feature exposed private behavior without consent. Mark Zuckerberg posted a response on September 8 titled "Calm down. Breathe. We hear you." and added granular privacy controls, but kept the News Feed — a decision that proved critical because News Feed's engagement mechanics, showing users what their friends were doing rather than requiring them to seek it out, drove the usage patterns that separated Facebook from prior social networks. The combination of open registration and News Feed transformed Facebook's growth curve: from 9.5 million users in September 2006 to 12 million by year-end 2006, 50 million by October 2007, and 100 million by August 2008.

Facebook's technical stack in 2006 was PHP on MySQL with Memcached (distributed caching). Memcached had been open-sourced by Danga Interactive in 2003 and Facebook adopted it aggressively — by 2008 Facebook was running the world's largest Memcached deployment with hundreds of servers caching database query results. The social graph — billions of friend relationships, each connection bidirectional, each requiring joins across profiles and activity tables — stressed relational databases in ways that drove Facebook's engineering investment in custom systems. Cassandra (a distributed wide-column store designed to handle Facebook's Inbox search) was developed internally and open-sourced in 2008. Facebook's infrastructure engineering, necessitated by the explosive growth that open registration enabled, produced distributed systems contributions that influenced the entire industry.
