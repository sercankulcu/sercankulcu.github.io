---
title: 'Why do computers use 1s and 0s?'
date: 2023-02-03
permalink: /posts/2023/02/why-do-computers-use-one-and-zeros/
tags:
  - career
  - software
---

<img width="220" alt="binary system" src="/images/posts/why-do-computers-use-one-and-zeros.jpg" style="float: left; margin-right: 20px;" /> Binary is a number system that uses only two digits to represent a quantitative value, 0 and 1. Computers rely on binary because it is based on micro transistors, which are tiny electronic switches that can be on or off with a weak electrical charge. These switches are arranged in logical circuits to perform calculations, store data, and control operations in a computer.

Binary is more efficient than tally marks and has an exponential increase in the amount of things it can represent compared to base 10, which uses ten digits. In base 10, each digit represents a power of 10, and as the value of the number increases, the number of digits required to represent it also increases. However, in binary, each digit represents a power of 2, so the number of digits required to represent a value grows exponentially.

The rules we use to count in the decimal number system still apply to binary, making it easy to understand. For example, adding a binary number is similar to adding a decimal number, except that we carry over to the next place value when the sum of two digits is 2. Subtracting a binary number is also similar to subtracting a decimal number, except that we borrow from the next place value when the minuend is smaller than the subtrahend.

What is Binary?:
---

* Binary is a system of counting using only two digits: 0 and 1.
* Binary is based on positional notation, just like base 10, but each digit represents an increasing power of two instead of ten.
* Each digit in binary represents a power of two, starting with 2^0 = 1, 2^1 = 2, 2^2 = 4, and so on.
* Binary is exponentially more efficient than tally marks because adding a new digit doubles the amount of things that can be represented.

Counting in Decimal
---

* To count in decimal, we start with the smallest value, which is 0, and increment by 1 as we move to the next value.
* When we reach 9, we reset the column to 0 and increment the next column by 1.
* Every decimal digit has an implicit infinite amount of zeros to the left of it.

Counting in Binary
---

* To count in binary, we start with the smallest value, which is 0, and increment by 1 as we move to the next value.
* When we reach 1, we reset the column to 0 and increment the next column by 1.
* Just like in decimal, every binary digit has an implicit infinite amount of zeros to the left of it.

Converting Binary to Decimal
---

* To convert a binary number to decimal, we need to multiply each digit by the corresponding power of 2 and add the results.
* For example, the binary number 1011 is equal to (1 x 2^3) + (0 x 2^2) + (1 x 2^1) + (1 x 2^0) = 8 + 0 + 2 + 1 = 11 in decimal.

Converting Decimal to Binary
---

* To convert a decimal number to binary, we need to repeatedly divide the number by 2 and record the remainder until we reach 0.
* For example, to convert the decimal number 11 to binary, we divide 11 by 2 to get a quotient of 5 and a remainder of 1. We record the remainder as the rightmost digit of the binary number. We repeat the process with the quotient, 5, to get a quotient of 2 and a remainder of 1, which becomes the second digit of the binary number. We repeat again with the quotient, 2, to get a quotient of 1 and a remainder of 0, which becomes the third digit of the binary number. Finally, we repeat with the quotient, 1, to get a quotient of 0 and a remainder of 1, which becomes the leftmost digit of the binary number. The resulting binary number is 1011.

Transistors and Binary:
---

* Computers use micro transistors, tiny switches that can be on or off with a weak electrical charge, to perform operations.
* Transistors can be used to represent binary digits: 1 for on and 0 for off.
* Using binary, computers can represent any number between 0 and 255 with one byte, or eight bits.
* A byte is eight bits in a row, and any number between 0 and 255 can be represented with a byte.
* ASCII, the American Standard Code for Information Interchange, is a way to convert a computer's data into letters and symbols for humans to work with.

16-Bit Systems:
---

* With only 255 representable values, binary was limiting for computers.
* 16-bit systems, which use two bytes to represent one number, expanded the range of representable numbers from 0 to 65535.
* A 16-bit system doesn't necessarily mean it is exponentially more powerful than an 8-bit system, but it does increase the range of representable numbers.
