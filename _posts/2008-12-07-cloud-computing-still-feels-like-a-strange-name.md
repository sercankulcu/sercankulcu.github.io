---
title: 'Cloud Computing Still Feels Like A Strange Name'
date: 2008-12-07
permalink: /posts/2008/12/cloud-computing-still-feels-like-a-strange-name/
tags:
  - cloud
  - web
  - technology
---

The phrase "cloud computing" is appearing more often in December 2008, and I am still not sure I like the name. The cloud usually means somebody else's computers, located somewhere I cannot see, providing storage or processing through a network connection. Calling this a cloud does not add clarity — it is a metaphor that obscures the physical infrastructure behind the word.

Still, the thing being named is real and growing.

## What is actually happening

Amazon launched EC2 (Elastic Compute Cloud) in limited beta in August 2006, with a public launch in October 2008 — just weeks before this post. EC2 allows users to rent virtual machines by the hour: choose a configuration, launch an instance, pay for what you use, stop paying when you stop it. Amazon S3 (Simple Storage Service), launched March 2006, offers object storage at similarly granular pricing. The two services together make it possible to run a web application without buying or maintaining physical servers.

Google App Engine launched in April 2008 in limited preview. It takes a different approach: instead of providing virtual machines, it provides a platform where applications run in a managed environment. Developers deploy code; Google handles scaling, load balancing, and infrastructure. The trade-off is that applications must be written to work within App Engine's constraints.

Microsoft announced Azure at its Professional Developers Conference in October 2008 — it is in preview as of December 2008, with a commercial launch expected in 2009.

Salesforce.com has been selling CRM as a service since 1999, predating the cloud computing label. Google Docs and Spreadsheets (2006) demonstrated that mainstream productivity software could run in a browser rather than being installed locally. These earlier examples made the shift toward hosted software familiar; the new wave from Amazon and Google extends the model from application delivery to infrastructure delivery.

## The appeal for developers

For a small developer or a new project, the economics of cloud infrastructure are genuinely attractive. Buying a server for a project that might have zero users for months, then might need ten servers at once if it becomes popular, is a poor use of capital. Cloud pricing makes the infrastructure cost proportional to actual use. If demand grows, more capacity can be added in minutes. If the project fails, there is no hardware to write off.

The 2008 financial crisis is relevant context. Companies are scrutinizing capital expenditures, and the argument that server capacity can be rented rather than owned is easier to make when budgets are tight.

## The trade-offs

Control and dependency are the real costs. A virtual machine running on Amazon infrastructure depends on Amazon's continued operation of the service, its pricing decisions, and its security posture. A change in pricing could make an application economically unviable overnight. A security breach on the provider's infrastructure is a problem for every customer.

Network reliability matters too. An application that stores data in the cloud and requires a network connection to access it is only as reliable as that connection. An office with poor internet access or a mobile user in poor coverage has a different experience than the developer who designed the application in a well-connected city.

The physical reality is worth keeping in mind. The word "cloud" makes the technology sound light and impermanent. The reality is data centers, cooling systems, fiber cables, physical disks, and the people who maintain them. The abstraction is useful — it is the product being sold — but the infrastructure underneath it is very concrete. Understanding the layers below the abstraction helps when something goes wrong, because something always eventually goes wrong.
