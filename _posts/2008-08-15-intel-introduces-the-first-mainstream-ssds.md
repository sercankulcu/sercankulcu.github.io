---
title: Intel Introduces the First Mainstream SSDs
date: 2008-08-15
permalink: /posts/2008/08/intel-introduces-the-first-mainstream-ssds/
tags:
  - hardware
  - computing
  - history
---

Intel announced the X25-M (M for Mainstream) solid-state drive in August 2008, with retail availability beginning in September 2008 at $595 for 80GB and $945 for 160GB. The X25-M used 50nm multi-level cell (MLC) NAND flash manufactured by the Intel-Micron joint venture IMFT (IM Flash Technologies), with an Intel-designed proprietary controller. Specifications: sequential read 250 MB/s, sequential write 70 MB/s, and — most significantly — 35,000 random 4KB read IOPS. Contemporary 7,200 RPM hard drives delivered approximately 80–120 MB/s sequential with about 80–100 random IOPS, constrained by the physical seek time (averaging 8–12 milliseconds) required to move the read head to a new location. The SSD's NAND flash had no moving parts; a read operation completed in microseconds rather than milliseconds, making the 35,000 IOPS figure roughly 400× better than HDD random access.

The NAND write architecture required controller sophistication. MLC NAND must be erased in 512KB blocks before individual 4KB pages can be written — writing a single small file to a partially-used block requires reading the entire block, modifying the relevant pages in memory, erasing the block, and writing the entire block back (read-modify-write). Intel's controller firmware implemented write-leveling (distributing writes across all flash cells to prevent early wear-out of frequently written cells), garbage collection (reclaiming blocks with mostly-deleted data), and a write cache to aggregate small writes into larger sequential operations. The X25-E (Enterprise) variant used SLC (single-level cell) NAND, which stores one bit per cell instead of two, providing roughly 10× higher write endurance at twice the cost per gigabyte.

The X25-M launched into a storage market where 500GB–1TB hard drives cost $75–$150, making SSDs 8–12× more expensive per gigabyte. Apple had launched the MacBook Air in January 2008 with an optional 64GB SSD ($999 additional cost), establishing SSDs as premium laptop components. Intel's entry validated the market and established a performance baseline: the X25-M remained the benchmark for random read performance through 2010, when the second-generation X25-M (34nm process, $225 for 80GB) made SSD pricing more accessible. By 2012, Samsung's 840 Series pushed MLC NAND SSD prices to $0.70/GB; by 2015, the 850 EVO using 3D V-NAND reached $0.35/GB, and SSDs had replaced HDDs as the default boot drive in new laptops.
