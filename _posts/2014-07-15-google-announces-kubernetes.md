---
title: Google Announces Kubernetes
excerpt: "Kubernetes in 2014: its Borg roots, Pods, Deployments and Services, the declarative control loop, and the CNCF donation that made it standard."
date: 2014-07-15
permalink: /posts/2014/07/google-announces-kubernetes/
tags:
  - cloud
  - software
  - distributed-systems
---

Google announced Kubernetes as an open-source project on June 10, 2014 at DockerCon, under the Apache 2.0 license. The project was created by Joe Beda, Brendan Burns, and Craig McLuckie, who drew on Google's decade of experience running its internal Borg cluster manager — which by 2014 was scheduling hundreds of thousands of jobs across Google's data centers. Docker had popularized Linux containers in 2013, but it addressed packaging and running single containers, not orchestrating thousands of them across many machines.

Kubernetes organized containers into Pods (the smallest deployable unit, one or more containers sharing network and storage), grouped Pods into Deployments (which maintained a desired replica count), and exposed them via Services (a stable IP and DNS name that load-balanced across the Pods behind it). A user or CI pipeline declared the desired state — "run 5 replicas of this container image, replace any that fail, allow rolling updates to the next image version" — and Kubernetes' controllers continuously reconciled actual cluster state toward that specification. The control-loop model meant failure recovery, scaling, and rollouts required no explicit scripting: the system re-converged on its own.

Google donated Kubernetes to the newly formed Cloud Native Computing Foundation (CNCF) in July 2015, when Kubernetes 1.0 was released. By 2018 Amazon EKS, Azure AKS, and Google GKE all offered managed Kubernetes services, making it the de-facto standard for deploying containerized applications at scale. Projects built on top of it — Helm for package management, Istio for service mesh, Prometheus for monitoring — formed the broader cloud-native ecosystem that CNCF coordinated.

**Sources:** [An update on container support on Google Cloud Platform (Google Cloud Platform Blog)](https://cloudplatform.googleblog.com/2014/06/an-update-on-container-support-on-google-cloud-platform.html), [As Kubernetes Hits 1.0, Google Donates Technology To Newly Formed Cloud Native Computing Foundation (TechCrunch)](https://techcrunch.com/2015/07/21/as-kubernetes-hits-1-0-google-donates-technology-to-newly-formed-cloud-native-computing-foundation-with-ibm-intel-twitter-and-others/amp/), [10 Years of Kubernetes (kubernetes.io)](https://kubernetes.io/blog/2024/06/06/10-Years-of-Kubernetes/)
