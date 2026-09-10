---
title: Google Announces the Go Programming Language
date: 2009-11-15
permalink: /posts/2009/11/google-announces-the-go-programming-language/
tags:
  - software
  - programming
  - computing-history
---

Google announced Go as an open-source project on November 10, 2009, releasing the initial source code at golang.org. The language was created by Robert Griesemer, Rob Pike, and Ken Thompson — Pike and Thompson were the principal designers of Unix at Bell Labs in 1969 and Plan 9, and had strong opinions about language design informed by decades of systems programming. The project began September 21, 2007 as an internal Google effort motivated by frustration with C++ compilation times: a large Google service could take 30–45 minutes to compile in C++, making development iteration slow and build farms expensive. Go targeted C++-scale systems programming with compilation speeds measured in seconds.

Go's design choices were deliberate subtractions from C++ and Java. There is no class inheritance — only interfaces defined by method sets, satisfied implicitly (structural typing) rather than explicit declaration. There are no exceptions — only multiple return values including error types, forcing explicit error handling. There are no templates or generics (until Go 1.18 in 2022). There is garbage collection (automatic memory management without manual free()), making many categories of C++ bugs impossible. Goroutines provided lightweight concurrent execution: each goroutine started with a 2–8 KB stack (compared to 1–8 MB for an OS thread), allowing hundreds of thousands of goroutines in a single process, scheduled cooperatively by Go's runtime scheduler across available OS threads (M:N threading). Channels, implementing Communicating Sequential Processes (CSP) from Tony Hoare's 1978 paper, provided structured message-passing between goroutines as the preferred alternative to shared-memory synchronization.

Go 1.0 was released March 28, 2012 with a compatibility guarantee: all code written for Go 1.0 would compile unchanged with future Go 1.x versions. Docker (released March 20, 2013 by Solomon Hykes) was written entirely in Go and became the project that introduced Go to the broader developer community. Kubernetes (June 2014) further established Go as the language of cloud-native infrastructure. By 2016, Go was the primary language used for writing Kubernetes, Docker, Terraform, Prometheus, gRPC, and CockroachDB — a concentration in infrastructure tooling that made Go knowledge practically essential for DevOps and platform engineering roles.
