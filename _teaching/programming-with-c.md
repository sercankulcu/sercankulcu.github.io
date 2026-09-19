---
title: "Procedural Programming with C"
collection: teaching
type: "Undergraduate"
permalink: /teaching/procedural-programming-with-c
venue: "Giresun University, Computer Engineering"
date: 2023-04-04
location: "Giresun, Turkey"
---

![procedural programming with c](/images/teaching/teaching-procedural-programming-c.webp){: .align-left width="200" style="float: left; margin-right: 10px;"}
C is a general-purpose programming language widely used in systems programming, embedded software, operating systems, compilers, and performance-sensitive applications. It combines portable high-level constructs with low-level access to memory and hardware-related operations. C gives programmers substantial control over data representation, memory allocation, and program execution. This control can enable efficient software, but it also requires careful handling of memory, types, and undefined behavior.

This is a complete course in C, designed to take a reader from no prior programming experience to competent, independent C development. It is organized as 42 weekly topics in three levels. **Basic** builds the language core and the habits of writing correct programs. **Intermediate** covers memory, pointers, aggregate data, and files. **Advanced** covers modular design, data structures, tooling, undefined behavior, portability, and concurrency. Nothing essential to the language or to working with it in practice is left out.

## Ders Öğretim Planı  

---

## Announcements  

---

## Course resources  

* V22.0201 Computer Systems Organization [course](https://cs.nyu.edu/~gottlieb/courses/cso/class-notes.html)

---

## Preliminary Materials: 

* Prerequisites for preparation [html](../files/c/C_Procedural_Programming_Prerequisites.html)
* Key figures who have shaped the field [html](../files/c/C_Procedural_Programming_Important_People.html)

---

## Basic (Weeks 1-14)

### Week 1: Computers, Programs, and the C Toolchain
- How a computer executes a program: processor, memory, and storage
- Compilers, interpreters, and assemblers
- Installing a compiler and setting up an editor or IDE
- Writing, compiling, and running a first program
- Reading and understanding compiler messages

[🗒️Lecture Notes (HTML)](../files/c/Week_01_Computers_and_Toolchain.html)

---

### Week 2: History, Standards, and the Compilation Model
- Origins of C: BCPL, B, and Unix
- K&R C, ANSI C, and ISO standardization
- C89, C99, C11, C17, and C23, and what each added
- Translation phases: preprocessing, compilation, assembly, and linking
- Selecting a standard and useful flags: `-std=`, `-Wall`, `-Wextra`, `-g`

[🗒️Lecture Notes (HTML)](../files/c/Week_02_History_Standards_and_Compilation.html)

---

### Week 3: Program Structure, Style, and Basic Output
- `main`, its return value, and the program entry point
- `#include` and the standard library
- Statements, blocks, semicolons, and braces
- Comments, indentation, naming, and readability
- Producing output with `printf`

[🗒️Lecture Notes (HTML)](../files/c/Week_03_Program_Structure_and_Style.html)

---

### Week 4: Data Representation
- Binary, octal, and hexadecimal number systems
- Bits, bytes, and words
- Two's complement representation of signed integers
- IEEE 754 representation of floating-point numbers
- Character encoding and the ASCII table

[🗒️Lecture Notes (HTML)](../files/c/Week_04_Data_Representation.html)

---

### Week 5: Variables, Types, and Constants
- Identifiers, declarations, and initialization
- `int`, `char`, `float`, `double`, and `_Bool`
- Type modifiers: `short`, `long`, `signed`, `unsigned`
- `sizeof`, `<limits.h>`, and `<float.h>`
- Literals, escape sequences, `const`, and `#define`

[🗒️Lecture Notes (HTML)](../files/c/Week_05_Variables_Types_and_Constants.html)

---

### Week 6: Operators and Expressions
- Arithmetic, relational, and logical operators
- Assignment and compound assignment
- Increment, decrement, and the comma operator
- Precedence, associativity, and parenthesization
- Evaluation order, sequence points, and side effects

[🗒️Lecture Notes (HTML)](../files/c/Week_06_Operators_and_Expressions.html)

---

### Week 7: Type Conversions
- Implicit conversion and integer promotion
- The usual arithmetic conversions
- Explicit conversion with casts
- Mixing signed and unsigned types
- Integer overflow, truncation, and floating-point precision

[🗒️Lecture Notes (HTML)](../files/c/Week_07_Type_Conversions.html)

---

### Week 8: Formatted Input and Output
- `printf` format specifiers, width, precision, and flags
- `scanf` and reading user input
- Input buffer problems and error recovery
- `getchar`, `putchar`, `puts`, `fgets`, and why `gets` must never be used
- Validating user input

[🗒️Lecture Notes (HTML)](../files/c/Week_08_Input_and_Output.html)

---

### Week 9: Conditional Statements
- `if`, `else if`, and `else`
- Nested and chained conditions
- The conditional (ternary) operator
- `switch`, `case`, `default`, and fall-through
- Short-circuit evaluation and common logic errors

[🗒️Lecture Notes (HTML)](../files/c/Week_09_Conditional_Statements.html)

---

### Week 10: Loops and Flow Control
- `for`, `while`, and `do-while`
- Loop counters, invariants, and termination conditions
- Nested loops
- `break`, `continue`, and `goto`
- Infinite loops and off-by-one errors

[🗒️Lecture Notes (HTML)](../files/c/Week_10_Loops_and_Flow_Control.html)

---

### Week 11: Functions
- Declaration, definition, and calling
- Parameters, return values, and `void`
- Function prototypes and their placement
- Pass-by-value semantics and the call stack
- Designing small, single-purpose functions

[🗒️Lecture Notes (HTML)](../files/c/Week_11_Functions.html)

---

### Week 12: One- and Multi-Dimensional Arrays
- Declaring, initializing, and traversing arrays
- Array bounds and out-of-range access
- Two-dimensional arrays and row-major memory layout
- Passing arrays to functions
- Common array algorithms: sum, minimum and maximum, reversal, search

[🗒️Lecture Notes (HTML)](../files/c/Week_12_Arrays.html)

---

### Week 13: Strings and Character Handling
- Character arrays, the null terminator, and string literals
- Reading and printing strings
- `<string.h>`: `strlen`, `strcpy`, `strncpy`, `strcmp`, `strcat`, `strstr`, `strtok`
- `<ctype.h>`: character classification and conversion
- Buffer sizes, truncation, and safe string handling

[🗒️Lecture Notes (HTML)](../files/c/Week_13_Strings_and_Character_Handling.html)

---

### Week 14: The Standard Library Toolbox
- `<math.h>`: numeric functions and linking with `-lm`
- `<stdlib.h>`: `atoi`, `strtol`, `strtod`, `abs`, `div`
- Pseudo-random numbers: `rand`, `srand`, and their limitations
- `<time.h>`: dates, timestamps, and measuring elapsed time
- Reading library documentation and manual pages

[🗒️Lecture Notes (HTML)](../files/c/Week_14_Standard_Library_Toolbox.html)

---

## Intermediate (Weeks 15-28)

### Week 15: Scope, Lifetime, and Storage Classes
- Block, file, and function scope
- Automatic and static storage duration
- Local, global, and `static` variables
- `extern`, internal linkage, and external linkage
- Shadowing, name conflicts, and the cost of global state

[🗒️Lecture Notes (HTML)](../files/c/Week_15_Scope_and_Storage_Classes.html)

---

### Week 16: Recursion
- Base cases and recursive cases
- Call stack behavior and stack frames
- Classic examples: factorial, Fibonacci, Towers of Hanoi, binary search
- Recursion depth, stack overflow, and tail calls
- Recursive versus iterative solutions

[🗒️Lecture Notes (HTML)](../files/c/Week_16_Recursion.html)

---

### Week 17: Introduction to Pointers
- Memory addresses and the address-of operator
- Pointer declaration, initialization, and dereferencing
- Null, uninitialized, and wild pointers
- Pointer types, `void *`, and type safety
- Inspecting memory with a debugger

[🗒️Lecture Notes (HTML)](../files/c/Week_17_Introduction_to_Pointers.html)

---

### Week 18: Pointer Arithmetic and Arrays
- Incrementing, decrementing, and comparing pointers
- Array-to-pointer decay
- Pointer subtraction and `ptrdiff_t`
- Traversing arrays and strings with pointers
- Pointers to pointers and arrays of pointers

[🗒️Lecture Notes (HTML)](../files/c/Week_18_Pointer_Arithmetic_and_Arrays.html)

---

### Week 19: Pointers as Function Parameters
- Emulating pass-by-reference
- Modifying caller variables and output parameters
- `const` pointers versus pointers to `const`
- Returning pointers safely and avoiding dangling returns
- Passing arrays, strings, and multidimensional arrays

[🗒️Lecture Notes (HTML)](../files/c/Week_19_Pointers_as_Parameters.html)

---

### Week 20: Dynamic Memory Allocation
- The heap versus the stack
- `malloc`, `calloc`, `realloc`, and `free`
- Checking allocation failures
- Growable arrays and dynamically allocated two-dimensional arrays
- Ownership, lifetime, and allocation conventions

[🗒️Lecture Notes (HTML)](../files/c/Week_20_Dynamic_Memory_Allocation.html)

---

### Week 21: Memory Errors and Their Diagnosis
- Memory leaks
- Dangling pointers and use-after-free
- Double free and invalid free
- Buffer overruns and out-of-bounds access
- Detecting memory errors with Valgrind and sanitizers

[🗒️Lecture Notes (HTML)](../files/c/Week_21_Memory_Errors.html)

---

### Week 22: Structures
- Declaration, initialization, and designated initializers
- Member access with `.` and `->`
- Nested structures and arrays of structures
- Structures as parameters and return values
- Pointers to structures and self-referential types

[🗒️Lecture Notes (HTML)](../files/c/Week_22_Structures.html)

---

### Week 23: Unions, Enumerations, and Type Aliases
- Enumerated types and their underlying representation
- Type aliases with `typedef`
- Unions, shared storage, and tagged unions
- Padding, alignment, and `offsetof`
- Choosing between a structure, a union, and an enumeration

[🗒️Lecture Notes (HTML)](../files/c/Week_23_Unions_Enums_and_Typedef.html)

---

### Week 24: Bit-Level Operations
- Bitwise AND, OR, XOR, and NOT
- Left and right shifts; arithmetic versus logical shift
- Bit masks: setting, clearing, toggling, and testing flags
- Bit-fields and their portability limitations
- Practical uses: permissions, packing, and checksums

[🗒️Lecture Notes (HTML)](../files/c/Week_24_Bit_Level_Operations.html)

---

### Week 25: File Input and Output
- Streams and the `FILE` type
- `fopen` modes, `fclose`, and text versus binary access
- `fprintf`, `fscanf`, `fgets`, and `fputs`
- `fread` and `fwrite` for binary records
- Reading a file line by line and processing tabular data

[🗒️Lecture Notes (HTML)](../files/c/Week_25_File_Input_and_Output.html)

---

### Week 26: File Positioning, Streams, and Errors
- `fseek`, `ftell`, `rewind`, `fgetpos`, and `fsetpos`
- `feof`, `ferror`, and `clearerr`
- Buffering, `fflush`, and `setvbuf`
- `stdin`, `stdout`, `stderr`, and redirection
- Temporary files, renaming, and removing files

[🗒️Lecture Notes (HTML)](../files/c/Week_26_File_Positioning_and_Streams.html)

---

### Week 27: The Preprocessor
- Object-like and function-like macros
- Macro pitfalls: parenthesization and double evaluation
- Stringification with `#` and token pasting with `##`
- Conditional compilation and predefined macros
- When to prefer a function or a `const` object over a macro

[🗒️Lecture Notes (HTML)](../files/c/Week_27_Preprocessor.html)

---

### Week 28: Modular Programming and Multi-File Projects
- Separating declarations from definitions
- Designing header and source files
- Include guards and `#pragma once`
- Avoiding multiple-definition errors
- Information hiding with `static` and opaque pointers

[🗒️Lecture Notes (HTML)](../files/c/Week_28_Modular_Programming.html)

---

## Advanced (Weeks 29-42)

### Week 29: Building Programs and Libraries
- Compiling and linking multiple translation units
- Writing and maintaining a Makefile
- Static libraries with `ar`
- Shared and dynamic libraries
- Linking order, symbol resolution, and inspection with `nm` and `objdump`

[🗒️Lecture Notes (HTML)](../files/c/Week_29_Building_and_Libraries.html)

---

### Week 30: Function Pointers and Callbacks
- Declaring, assigning, and calling function pointers
- Passing functions as arguments
- `qsort` and `bsearch` with custom comparators
- Arrays of function pointers and dispatch tables
- Simulating polymorphic behavior in C

[🗒️Lecture Notes (HTML)](../files/c/Week_30_Function_Pointers_and_Callbacks.html)

---

### Week 31: Generic and Variadic Programming
- Generic containers with `void *`
- Variable argument lists: `va_list`, `va_start`, `va_arg`, `va_end`
- Writing a custom `printf`-like function
- Type-based selection with `_Generic`
- Macro-based generic data structures and their trade-offs

[🗒️Lecture Notes (HTML)](../files/c/Week_31_Generic_and_Variadic_Programming.html)

---

### Week 32: Program Arguments, Processes, and the Environment
- Program arguments with `argc` and `argv`
- Parsing command-line options
- Program termination: `exit`, `_Exit`, and `atexit`
- Environment variables with `getenv` and `setenv`
- Designing well-behaved command-line tools

[🗒️Lecture Notes (HTML)](../files/c/Week_32_Program_Arguments_and_Processes.html)

---

### Week 33: Linked Data Structures
- Self-referential structures and node allocation
- Singly, doubly, and circular linked lists
- Stacks and queues
- Insertion, deletion, traversal, and reversal
- Memory management and ownership in linked structures

[🗒️Lecture Notes (HTML)](../files/c/Week_33_Linked_Data_Structures.html)

---

### Week 34: Trees, Hash Tables, and Abstract Data Types
- Binary trees and binary search trees
- Traversals and recursive tree algorithms
- Hash functions, collision handling, and hash tables
- Designing an abstract data type with an opaque handle
- Choosing an appropriate structure for a problem

[🗒️Lecture Notes (HTML)](../files/c/Week_34_Trees_Hash_Tables_and_ADTs.html)

---

### Week 35: Algorithms and Complexity
- Linear and binary search
- Bubble, selection, insertion, merge, and quick sort
- Time and space complexity; big-O notation
- The standard library `qsort` and `bsearch`
- Benchmarking and comparing implementations

[🗒️Lecture Notes (HTML)](../files/c/Week_35_Algorithms_and_Complexity.html)

---

### Week 36: Error Handling Strategies
- Compile-time, link-time, and runtime errors
- Checking function return values consistently
- Error reporting with `errno`, `perror`, and `strerror`
- Assertions with `assert` and `_Static_assert`
- Designing error-reporting conventions for a codebase

[🗒️Lecture Notes (HTML)](../files/c/Week_36_Error_Handling.html)

---

### Week 37: Debugging, Testing, and Analysis
- Compiler warnings as the first line of defense
- Interactive debugging with GDB: breakpoints, watchpoints, and backtraces
- Address, undefined-behavior, and leak sanitizers
- Static analysis tools
- Unit testing in C and measuring code coverage

[🗒️Lecture Notes (HTML)](../files/c/Week_37_Debugging_and_Testing.html)

---

### Week 38: Undefined Behavior and Secure Coding
- What undefined behavior is and how compilers exploit it
- Common sources: overflow, aliasing, uninitialized reads, invalid pointers
- Implementation-defined and unspecified behavior
- Buffer overflows, format-string flaws, and integer-overflow vulnerabilities
- Defensive practices and secure-coding guidelines

[🗒️Lecture Notes (HTML)](../files/c/Week_38_Undefined_Behavior_and_Secure_Coding.html)

---

### Week 39: Portability and the Machine Model
- Type sizes and fixed-width types in `<stdint.h>`
- Endianness and byte-order conversion
- Alignment, `_Alignas`, `_Alignof`, and packed data
- Platform, compiler, and library differences
- Character encoding: wide characters, `<wchar.h>`, and UTF-8

[🗒️Lecture Notes (HTML)](../files/c/Week_39_Portability_and_Machine_Model.html)

---

### Week 40: Advanced Language Features
- `volatile`, `restrict`, and `register`
- `inline` and `static inline`
- Compound literals and designated initializers
- Variable-length arrays and their trade-offs
- `_Noreturn` and non-local jumps with `setjmp` and `longjmp`

[🗒️Lecture Notes (HTML)](../files/c/Week_40_Advanced_Language_Features.html)

---

### Week 41: Concurrency, Signals, and Systems Interfaces
- Signals and signal handlers
- Processes and low-level file descriptors
- Threads with C11 `<threads.h>` and POSIX threads
- Race conditions, mutexes, and condition variables
- Atomics and the C memory model

[🗒️Lecture Notes (HTML)](../files/c/Week_41_Concurrency_and_Systems_Interfaces.html)

---

### Week 42: Performance, Project, and Review
- The memory hierarchy, cache behavior, and locality of reference
- Data layout, profiling, and measurement
- Optimization flags and when to trust the compiler
- Course project: designing, implementing, documenting, and testing a complete C program
- Review of the language and directions for further study

[🗒️Lecture Notes (HTML)](../files/c/Week_42_Performance_and_Project.html)
