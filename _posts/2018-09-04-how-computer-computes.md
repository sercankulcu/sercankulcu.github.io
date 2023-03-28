---
title: 'How computer computes?'
date: 2018-09-04
permalink: /posts/2018/09/how-computer-computes/
tags:
  - general
  - self-improvement
---

<img width="200" alt="schema" src="/images/posts/how-computer-computes.png" style="float: left; margin-right: 10px;" /> Computers run on a combination of hardware and software. The hardware, or physical components, include the central processing unit (CPU), memory (RAM), storage (hard drive or solid state drive), and various peripheral devices such as a keyboard and monitor. The CPU, also known as the "brain" of the computer, is responsible for executing instructions, or code, that make up a program. Programs are written in various programming languages, such as C++, Python, or Java, and are then compiled or interpreted into machine code, which the CPU can understand and execute.

The CPU retrieves instructions from memory (RAM) and stores any necessary data in memory as well. RAM is a type of memory that is faster and more temporary than storage, and is used to hold data and instructions that the CPU is currently using or processing. Storage, such as a hard drive or SSD, is used to hold more permanent data such as the operating system and installed programs.

Peripheral devices, such as a keyboard or mouse, are connected to the computer through ports, and allow for user input. The monitor displays output from the computer. Overall, the computer uses the hardware and software to receive input, process data, and provide output in order to perform various tasks such as running programs, browsing the internet, or storing files.

The CPU uses a set of registers to hold data and perform calculations. Registers are small, fast storage locations within the CPU that can be accessed and modified quickly. The CPU also uses an arithmetic logic unit (ALU) to perform mathematical and logical operations on the data stored in the registers. The CPU also has a control unit that coordinates the fetching and execution of instructions, and manages the flow of data between the registers, memory, and peripheral devices.

Addition
---

When a program requests an addition operation, the instruction is passed to the CPU. The CPU, through its control unit, retrieves the operands (the numbers that are being added) from memory and stores them in registers. The registers are small, fast storage locations within the CPU that can be accessed and modified quickly.

The CPU then uses its arithmetic logic unit (ALU) to perform the addition operation. The ALU is a specialized circuit designed to perform mathematical and logical operations on data. In the case of addition, the ALU will take the two operands from the registers, add them together, and store the result in one of the registers. The result of the addition is then stored back in memory, and the CPU continues to execute the next instruction in the program.

It's worth noting that the process of addition is not just limited to integer values, it can also be applied to floating-point values and other types of data. Also, depending on the architecture of the CPU, the process may be slightly different. For instance, in some architectures, the addition may be performed in parallel using multiple ALUs, and in other architectures, the addition may be performed in a pipeline fashion where the different stages of the addition are performed simultaneously.

When performing addition using bitwise operators, the process can be broken down into the following steps:

1. Initialize a variable, called "carry" to 0. This variable will be used to keep track of any carry-over from one bit position to the next.
2. Iterate through each bit position of the operands, starting from the least significant bit (LSB).
3. For the current bit position, perform a bitwise AND operation on the operands and the carry. This will yield a sum bit for that position, which will be 0 if there is no carry-over or no 1s in that position for the operands, or 1 if there is a carry-over or a 1 in that position for both operands.
4. Perform a bitwise XOR operation on the operands and the carry to yield a carry bit for the next position. This will be 1 if there is a carry-over, or if there is a 1 in that position for one operand and not the other.
5. Shift the carry bit to the left by one position, so that it can be used as the carry for the next bit position.
6. Repeat steps 3-5 for each bit position of the operands, until all bit positions have been processed.
7. The sum of the operands can be found in the variable holding the sum bits.

It's worth noting that this method is a bit-level operation, so it may not be as readable as other methods of addition, and it's usually used in low-level operations such as device drivers, compilers, and other systems that need to work with binary data directly.

Subtraction
---

Computers can perform subtraction using addition by taking advantage of the mathematical property that subtraction is the inverse of addition. In other words, if we have a subtraction operation of the form "A - B", we can achieve the same result by adding the negative of B to A.

To perform subtraction using addition, the CPU first retrieves the operands, A and B, from memory and stores them in registers. It then negates the value of B, which can be done by inverting the bits and adding 1. This is known as two's complement representation.

The CPU then performs an addition operation on the two operands, A and the negated value of B, using its arithmetic logic unit (ALU). The result of this operation is the same as the result of the original subtraction operation, A - B.

For example, if A = 5 and B = 3, the subtraction operation A - B would yield 2. But if we negate the value of B, it becomes -3. Then, if we perform the addition operation A + (-B) = 5 + (-3) = 2, which is the same result as A - B = 2.

It's important to note that this method of performing subtraction using addition is efficient and widely used in digital electronic circuit design, as it allows for the use of a single instruction for both addition and subtraction operations.

Multiplication
---

Computers can perform multiplication using addition by repeatedly adding one of the operands, the multiplicand, a certain number of times, as specified by the other operand, the multiplier. This method is known as repeated addition or "grade-school" multiplication.

To perform multiplication using addition, the CPU first retrieves the operands, A and B, from memory and stores them in registers. It then uses a loop construct, controlled by the value of the multiplier, to repeatedly add the multiplicand to a running total. Each iteration of the loop adds the multiplicand to the running total, and decrements the multiplier by 1 until it reaches zero.

For example, if A = 5 and B = 3, the multiplication operation A * B would yield 15. But if we use repeated addition, we can achieve the same result by adding A, which is 5, 3 times: 5 + 5 + 5 = 15.

It's worth noting that this method of performing multiplication using addition is not as efficient as other methods such as the shift-and-add method or the booth's algorithm. These methods take advantage of the properties of binary numbers and use bit shifting and bit manipulation to perform the multiplication in fewer steps. However, the repeated addition method is simple to understand and can be used as a fallback method in some cases where more efficient methods are not available or too complex to implement.

Division
---

Computers can perform division using addition by taking advantage of the mathematical property that division is the inverse of multiplication. In other words, if we have a division operation of the form "A / B", we can achieve the same result by multiplying A with the reciprocal of B, which is 1/B.

To perform division using addition, the CPU first retrieves the operands, A and B, from memory and stores them in registers. It then calculates the reciprocal of B, which can be done by using a reciprocal approximation algorithm such as Newton-Raphson or reciprocal lookup table.

The CPU then performs a multiplication operation on the two operands, A and the reciprocal of B, using its arithmetic logic unit (ALU). The result of this operation is the same as the result of the original division operation, A / B.

For example, if A = 10 and B = 3, the division operation A / B would yield 3.33 repeating. But if we calculate the reciprocal of B, it becomes 0.33 repeating. Then, if we perform the multiplication operation A * (1/B) = 10 * (1/3) = 3.33 repeating, which is the same result as A / B = 3.33 repeating.

It's worth noting that this method of performing division using addition is not as efficient as hardware-based division techniques, such as the restoring or non-restoring division algorithm, but it may be used in some cases or in some architectures where a hardware-based division is not available or too expensive to implement.
