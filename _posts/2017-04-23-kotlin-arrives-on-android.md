---
title: 'Kotlin Arrives On Android'
date: 2017-04-23
permalink: /posts/2017/04/kotlin-arrives-on-android/
tags:
  - kotlin
  - android
  - programming
---

Java has been the main language of Android development since the first Android SDK in 2008. It has worked, but it has also accumulated frustrations that Android developers have complained about for years. Kotlin — designed by JetBrains and reaching version 1.0 in February 2016 — has been gaining serious traction as an alternative, and the community momentum suggests this is no longer a niche experiment.

## What the language actually changes

The most immediate difference is boilerplate reduction. A Java class that holds data typically requires constructors, getters, setters, `equals()`, `hashCode()`, and `toString()` — often fifty lines for a class that logically represents a few fields. Kotlin's data class collapses this:

```kotlin
data class User(val name: String, val email: String, val age: Int)
```

That single line generates equals, hashCode, toString, and copy automatically.

Null safety is the other change that matters daily. In Java, the possibility that any reference might be null is implicit and unchecked. NullPointerExceptions are one of the most common runtime crashes in Android applications — JetBrains' own analysis of crash reports from major applications found null dereferences were the leading category.

In Kotlin, nullability is part of the type system. A variable declared as `String` cannot hold null. A variable that might be null must be declared as `String?`, and the compiler forces the developer to handle that case before using the value. Null errors that previously appeared in production crash logs become compile errors.

Extension functions allow adding methods to existing classes without subclassing:

```kotlin
fun String.isPalindrome(): Boolean = this == this.reversed()
```

This is not just syntactic convenience — it enables a more readable style where operations on a type can be expressed as methods on that type, even types you did not write.

## The interoperability argument

The most important practical decision JetBrains made was full interoperability with Java. Kotlin code compiles to JVM bytecode. A Kotlin class can extend a Java class. A Java class can call Kotlin functions. Android libraries written in Java — all of them, including the Android SDK itself — work without modification from Kotlin.

This means adoption does not require rewriting an existing application. A team can write new features in Kotlin while existing Java files continue unchanged. The migration path is low-risk, which is unusual for a language change.

Gradle build files need to add the Kotlin plugin — a few lines — and Android Studio has supported Kotlin with autocompletion and refactoring tools since the JetBrains plugin was released.

## What the learning curve looks like

The risk of gradual adoption is writing Kotlin as if it were shorter Java. Developers new to the language often miss the more idiomatic features: `when` expressions instead of switch chains, `let`/`apply`/`run`/`also` scope functions, coroutines for asynchronous code (currently in an early experimental library, though promising).

The language design has ideas behind it that reward engagement. Kotlin is opinionated about immutability (`val` versus `var`), about nullable versus non-nullable types, and about preferring expressions over statements. Treating it only as shorter Java means using it while leaving most of the actual design improvements behind.

## The larger pattern

Kotlin's approach to Android is interesting beyond the specific features. It demonstrates that a language can improve a developer experience by replacing the surface language while leaving the underlying platform — the JVM, the Android SDK, the existing toolchain — intact. This is different from platforms that require their own runtime, their own build tools, and their own library ecosystem.

Whether Android developers adopt Kotlin widely will depend partly on whether Google makes it an official first-class language for the platform. That question has not been answered yet. But the momentum is real, and the interoperability design means there is no forcing event — individual developers and teams can adopt it at their own pace.
