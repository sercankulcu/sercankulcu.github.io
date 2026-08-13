---
title: 'Serverless Computing And The Idea Of Less Maintenance'
date: 2017-03-26
permalink: /posts/2017/03/serverless-computing-and-less-maintenance/
tags:
  - cloud
  - serverless
  - software
---

The word "serverless" is a little funny because the servers do not actually disappear. They simply become less visible to the developer.

Services such as AWS Lambda are making it possible to run small pieces of code without managing a traditional server all the time. We write a function, connect it to an event, and let the cloud platform handle much of the infrastructure. The idea is attractive because servers create work even when the application is simple.

Operating systems need updates. Services need monitoring. Capacity needs planning. A small application can suddenly require knowledge far beyond its main purpose. Serverless computing tries to reduce some of that responsibility.

I like the idea, especially for small tasks and event-driven systems. A file arrives, a function runs. A request comes in, some code responds. But every abstraction has a price.

When the infrastructure becomes invisible, debugging can become more difficult. Costs can be harder to predict. Applications can become closely connected to one cloud provider.

So I do not think "serverless" means "no operations." It means a different kind of operations.

Still, the larger trend is interesting. Developers are moving further away from physical machines. We used to think about hardware, then virtual machines, then containers, and now functions.

Each step hides more details. The important question is whether the hidden details are details we truly want to manage. Sometimes less control is a good trade if it gives us more time to build the thing we actually care about.
