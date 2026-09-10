---
title: Google Introduces Android Studio
date: 2013-05-15
permalink: /posts/2013/05/google-introduces-android-studio/
tags:
  - hardware
  - software
  - technology-history
---

Google announced Android Studio at Google I/O on May 15, 2013 as a replacement for the Eclipse + ADT (Android Development Tools) plugin combination that had been the official Android development environment since Android's first SDK release in 2008. The preview (version 0.1) was available immediately for download; Android Studio 1.0 stable shipped on December 8, 2014. The choice of JetBrains' IntelliJ IDEA Community Edition as the base was a departure from Eclipse, which Google had promoted since 2008 but which suffered well-known performance problems under heavy Android project loads — long startup times, memory pressure on projects with many modules, and frequent crashes under refactoring operations.

Android Studio replaced Eclipse's Ant-based build system with Gradle (built by Gradleware, now part of the Gradle organization). Gradle's build scripts, written in Groovy DSL (and later Kotlin DSL from Gradle 5.0 in 2018), allowed declarative definition of product flavors (different app variants with different resources, package IDs, or API integrations), build types (debug builds with test keys and logging, release builds with ProGuard/R8 shrinking and signing), and dependency management through Maven coordinates (compile 'com.squareup.retrofit2:retrofit:2.0.0') rather than manually managed JAR files. The Gradle Android plugin introduced the concept that a single Android project could produce dozens of distinct APK variants (free/paid × debug/release × phone/tablet resource sets) from a shared codebase — a significant developer productivity improvement over the Eclipse ADT model where each variant required a separate project configuration.

The integrated development environment quality improvements from IntelliJ IDEA included context-aware code completion (understanding XML resource references, Android API deprecations, and Android-specific patterns), real-time lint analysis (Android Lint checks for performance, security, and internationalization issues displayed inline as code was typed), and a layout editor with interactive WYSIWYG preview of Android XML layouts across multiple screen configurations simultaneously. Google's Visual Layout Editor rendered the same XML file at phone, tablet, and specific device screen sizes in split panels. Android Studio 2.0 (April 2016) added Instant Run (hot-patching code changes to a running device without a full rebuild). Android Studio 3.0 (October 2017) added first-class Kotlin support as Google announced Kotlin as a first-class Android language. Google deprecated Eclipse ADT officially in December 2015, and the majority of Android developers had migrated to Android Studio by 2016.
