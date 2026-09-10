---
title: Oracle Completes Major Changes Around Java and Sun
date: 2010-08-15
permalink: /posts/2010/08/oracle-completes-major-changes-around-java-and-sun/
tags:
  - software
  - programming
  - computing-history
---

Oracle completed its $7.4 billion acquisition of Sun Microsystems on January 27, 2010, nine months after announcing the deal in April 2009 (delayed by EU antitrust review). Sun's portfolio included Java (language, JVM, and OpenJDK), MySQL (then the world's most widely used open-source database), Solaris OS, ZFS, VirtualBox, and SPARC server hardware. Oracle CEO Larry Ellison framed the acquisition as adding strategic technology assets to Oracle's enterprise software and database stack; the most commercially sensitive asset was Java, given its ubiquity in enterprise applications, Android's toolchain, and university education — and Oracle's pending legal strategy.

In August 2010, Oracle filed a lawsuit against Google claiming that Android's use of 37 Java API packages infringed Oracle's Java copyrights and patents, seeking up to $8.8 billion in damages. The case centered on whether Java's API specifications (method names, signatures, and organization) were copyrightable — a question with implications for interoperability across software broadly. Oracle won on copyright at the district court level, lost on fair use; after years of appeals, the U.S. Supreme Court ruled 6-2 in Oracle v. Google in April 2021 that Google's use of the Java APIs constituted fair use, but the decade-long litigation chilled Java ecosystem relationships. Community reactions to Oracle's stewardship prompted immediate forks: LibreOffice split from OpenOffice.org in September 2010 (the Document Foundation; Oracle eventually donated OpenOffice.org to Apache in 2011), and the Jenkins CI project forked from Hudson in January 2011 after Oracle retained the "Hudson" trademark. MySQL drew a MariaDB fork from original creator Michael "Monty" Widenius in 2009 in anticipation of the acquisition.

Java itself progressed under Oracle: Java 7 (July 2011, the first Oracle-led JDK release) added try-with-resources, diamond operator, and NIO.2 file I/O. Java 8 (March 2014) added lambda expressions, the Stream API, and java.time — the most developer-significant Java release in a decade, and a direct competitive response to Scala and Groovy features. Oracle moved to a six-month release cadence in 2017 with Java 9, accelerating Java evolution but splitting the community between LTS releases (Java 11, 2018; Java 17, 2021) and short-lived feature releases. The Eclipse Foundation (steward of Eclipse IDE) and Red Hat maintained separate OpenJDK distributions (Adoptium/Temurin, Red Hat OpenJDK) as alternatives to Oracle's binary distribution after Oracle changed its licensing model in 2019.
