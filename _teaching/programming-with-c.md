---
title: "Procedural Programming with C"
collection: teaching
type: "Undergraduate"
permalink: /teaching/procedural-programming-with-c
venue: "Giresun University, Computer Engineering"
date: 2024-09-19
location: "Giresun, Turkey"
---

![procedural programming with c](/images/teaching/teaching-procedural-programming-c.webp){: .align-left width="200" style="float: left; margin-right: 10px;"}
C is a general-purpose programming language widely used in systems programming, embedded software, operating systems, compilers, and performance-sensitive applications. It combines portable high-level constructs with low-level access to memory and hardware-related operations. C gives programmers substantial control over data representation, memory allocation, and program execution. This control can enable efficient software, but it also requires careful handling of memory, types, and undefined behavior.

This is a complete course in C, designed to take a reader from no prior programming experience to competent, independent, professional C development. It is organized as 56 weekly topics in four levels. **Basic** builds the language core, early programming habits, and the first command-line programs, ending with pointers and strings. **Intermediate** covers memory, aggregate data, files, error handling, modular design, and project workflow. **Advanced** covers libraries and tooling, data structures, performance, undefined behavior, portability, low-level systems interfaces, network programming, and concurrency. **Professional** covers working in existing codebases, collaboration and review, library distribution, language interoperability, scalable I/O, security testing, embedded and bare-metal development, and long-term maintenance. Each topic assumes only what earlier topics have already established.

## Ders Öğretim Planı  

[Ders Öğretim Planı (HTML)](../files/c/Ders_Ogretim_Plani.html)

---

## Announcements  

There are currently no announcements.

---

## Course resources  

- **references**  
  [cppreference — C](https://en.cppreference.com/w/c) | 
  [Beej's Guide to C Programming](https://beej.us/guide/bgc/) | 
  [comp.lang.c FAQ](http://c-faq.com)

- **course webpages**  
  [V22.0201 Computer Systems Organization](https://cs.nyu.edu/~gottlieb/courses/cso/class-notes.html)

- **standards**  
  [ISO/IEC JTC1/SC22/WG14 — the C standards committee](https://www.open-std.org/jtc1/sc22/wg14/)

- **tools**  
  [GCC documentation](https://gcc.gnu.org/onlinedocs/) | 
  [GDB documentation](https://sourceware.org/gdb/documentation/) | 
  [Valgrind](https://valgrind.org) | 
  [Compiler Explorer](https://godbolt.org)

- **practice**  
  [Learn-C.org](https://www.learn-c.org) | 
  [Exercism C track](https://exercism.org/tracks/c)

---

## Preliminary Materials

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
- `main`, its return value, `EXIT_SUCCESS`, and `EXIT_FAILURE`
- `#include` and the standard library
- Statements, blocks, semicolons, and braces
- Comments, indentation, naming, formatting, and readability
- Producing output with `printf`
- Basic source-code workflow: folders, files, Git repositories, commits, and `.gitignore`

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
- `int`, `char`, `float`, `double`, `_Bool`, and `<stdbool.h>`
- Type modifiers: `short`, `long`, `signed`, `unsigned`
- `sizeof`, `size_t`, `<limits.h>`, and `<float.h>`
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
- Character-at-a-time input and output with `getchar` and `putchar`
- Validating user input and reporting input errors clearly

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
- Designing small, single-purpose functions with clear success and failure behavior

[🗒️Lecture Notes (HTML)](../files/c/Week_11_Functions.html)

---

### Week 12: One- and Multi-Dimensional Arrays
- Declaring, initializing, and traversing arrays
- Indexing with `size_t` and respecting array bounds
- Out-of-range access and its consequences
- Two-dimensional arrays and row-major memory layout
- Common array algorithms: sum, minimum and maximum, reversal, linear search

[🗒️Lecture Notes (HTML)](../files/c/Week_12_Arrays.html)

---

### Week 13: Introduction to Pointers
- Memory addresses and the address-of operator
- Pointer declaration, initialization, and dereferencing
- `NULL`, uninitialized, and wild pointers
- Pointer types, `void *`, and type safety
- Array-to-pointer decay, passing arrays to functions, and why `sizeof` changes inside them

[🗒️Lecture Notes (HTML)](../files/c/Week_13_Introduction_to_Pointers.html)

---

### Week 14: Strings and Character Handling
- Character arrays, the null terminator, and string literals
- Reading and printing strings with `fgets` and `puts`, and why `gets` must never be used
- `<string.h>`: `strlen`, `strcpy`, `strncpy`, `strcmp`, `strcat`, `strchr`, `strstr`, `strtok`
- Block memory operations: `memcpy`, `memmove`, `memset`, and `memcmp`
- `<ctype.h>` classification, buffer sizes, truncation, and safe string building with `snprintf`

[🗒️Lecture Notes (HTML)](../files/c/Week_14_Strings_and_Character_Handling.html)

---

## Intermediate (Weeks 15-28)

### Week 15: Pointer Arithmetic and Arrays
- Incrementing, decrementing, and comparing pointers
- Pointer subtraction and `ptrdiff_t`
- Traversing arrays and strings with pointers
- Pointers to pointers and arrays of pointers
- Pointer-based versus index-based idioms

[🗒️Lecture Notes (HTML)](../files/c/Week_15_Pointer_Arithmetic_and_Arrays.html)

---

### Week 16: Pointers as Function Parameters
- Emulating pass-by-reference
- Modifying caller variables and output parameters
- `const` pointers versus pointers to `const`
- Returning pointers safely and avoiding dangling returns
- Passing strings and multidimensional arrays

[🗒️Lecture Notes (HTML)](../files/c/Week_16_Pointers_as_Parameters.html)

---

### Week 17: Scope, Lifetime, and Storage Duration
- Block, file, and function scope
- Automatic and static storage duration
- Local variables, global variables, and `static` locals
- Shadowing and name conflicts
- The cost of global state and how to avoid it

[🗒️Lecture Notes (HTML)](../files/c/Week_17_Scope_and_Storage_Duration.html)

---

### Week 18: Recursion
- Base cases and recursive cases
- Call stack behavior and stack frames
- Classic examples: factorial, Fibonacci, Towers of Hanoi, and binary search
- Recursion depth, stack overflow, and tail calls
- Recursive versus iterative solutions

[🗒️Lecture Notes (HTML)](../files/c/Week_18_Recursion.html)

---

### Week 19: Dynamic Memory Allocation
- The heap versus the stack
- `malloc`, `calloc`, `realloc`, and `free`
- Checking allocation failures
- Growable arrays and dynamically allocated two-dimensional arrays
- Ownership, lifetime, allocation conventions, and `init`/`destroy` pairs

[🗒️Lecture Notes (HTML)](../files/c/Week_19_Dynamic_Memory_Allocation.html)

---

### Week 20: Memory Errors and Their Diagnosis
- Memory leaks
- Dangling pointers and use-after-free
- Double free and invalid free
- Buffer overruns and out-of-bounds access
- Detecting memory errors with sanitizers and Valgrind

[🗒️Lecture Notes (HTML)](../files/c/Week_20_Memory_Errors.html)

---

### Week 21: Structures
- Declaration, initialization, and designated initializers
- Member access with `.` and `->`
- Nested structures and arrays of structures
- Structures as parameters and return values
- Pointers to structures and self-referential types

[🗒️Lecture Notes (HTML)](../files/c/Week_21_Structures.html)

---

### Week 22: Unions, Enumerations, and Type Aliases
- Enumerated types and their underlying representation
- Type aliases with `typedef`
- Unions, shared storage, and tagged unions
- Structure padding and `offsetof`
- Choosing between a structure, a union, and an enumeration

[🗒️Lecture Notes (HTML)](../files/c/Week_22_Unions_Enums_and_Typedef.html)

---

### Week 23: Program Arguments and the Standard Library Toolbox
- Program arguments with `argc` and `argv`
- String-to-number conversion: `atoi`, `strtol`, `strtod`, and the `endptr` argument
- `<math.h>`: numeric functions and linking with `-lm`
- `<time.h>`, pseudo-random numbers with `rand` and `srand`, and their limitations
- Reading library documentation, manual pages, and standard-library reference material

[🗒️Lecture Notes (HTML)](../files/c/Week_23_Program_Arguments_and_Standard_Library.html)

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
- Reading a file line by line, processing tabular data, and handling malformed input

[🗒️Lecture Notes (HTML)](../files/c/Week_25_File_Input_and_Output.html)

---

### Week 26: File Positioning, Streams, and Errors
- `fseek`, `ftell`, `rewind`, `fgetpos`, and `fsetpos`
- `feof`, `ferror`, and `clearerr`
- Buffering, `fflush`, and `setvbuf`
- `stdin`, `stdout`, `stderr`, and redirection
- Temporary files, renaming, removing files, and portable file-processing pitfalls

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
- `extern`, internal and external linkage, and multiple-definition errors
- Information hiding with `static` and opaque pointers
- Project layout, public versus private headers, API documentation, and ownership comments

[🗒️Lecture Notes (HTML)](../files/c/Week_28_Modular_Programming.html)

---

## Advanced (Weeks 29-42)

### Week 29: Building Programs and Libraries
- Compiling and linking multiple translation units
- Writing and maintaining a Makefile
- Project configuration with CMake
- Static libraries with `ar`, and shared and dynamic libraries
- Debug and release builds, sanitizer builds, test targets, and warning profiles
- Linking order, symbol resolution, and inspection with `nm` and `objdump`

[🗒️Lecture Notes (HTML)](../files/c/Week_29_Building_and_Libraries.html)

---

### Week 30: Function Pointers, Callbacks, and Generic Programming
- Declaring, assigning, and calling function pointers
- Passing functions as arguments; `qsort` and `bsearch` with custom comparators
- Arrays of function pointers, dispatch tables, and simulating polymorphic behavior
- Generic containers with `void *`
- Variable argument lists: `va_list`, `va_start`, `va_arg`, `va_end`, and writing a `printf`-like function
- Type-based selection with `_Generic` and macro-based generic data structures

[🗒️Lecture Notes (HTML)](../files/c/Week_30_Function_Pointers_and_Generic_Programming.html)

---

### Week 31: Command-Line Interfaces and the Environment
- Parsing command-line options by hand and with `getopt`
- Program termination: `exit`, `_Exit`, and `atexit`
- Environment variables with `getenv` and `setenv`
- Configuration through arguments, files, and environment variables
- Designing scriptable, testable interfaces: exit status, `stdout` versus `stderr`, and clear diagnostics

[🗒️Lecture Notes (HTML)](../files/c/Week_31_Command_Line_Interfaces_and_Environment.html)

---

### Week 32: Linked Data Structures
- Self-referential structures and node allocation
- Singly, doubly, and circular linked lists
- Stacks and queues
- Insertion, deletion, traversal, and reversal
- The cost of list operations and when a list beats an array

[🗒️Lecture Notes (HTML)](../files/c/Week_32_Linked_Data_Structures.html)

---

### Week 33: Trees, Hash Tables, and Abstract Data Types
- Binary trees and binary search trees
- Traversals and recursive tree algorithms
- Hash functions, collision handling, and hash tables
- Time and space complexity: big-O notation and practical cost
- Designing an abstract data type with an opaque handle and a stable API boundary

[🗒️Lecture Notes (HTML)](../files/c/Week_33_Trees_Hash_Tables_and_ADTs.html)

---

### Week 34: Performance and Memory Layout
- The memory hierarchy, cache behavior, and locality of reference
- Data layout, structure packing, and their effect on speed
- Optimization levels and when to trust the compiler
- Profiling and measurement with `perf`, `gprof`, and `callgrind`
- Trade-offs between clarity and speed

[🗒️Lecture Notes (HTML)](../files/c/Week_34_Performance_and_Memory_Layout.html)

---

### Week 35: Error Handling Strategies
- Compile-time, link-time, and runtime errors
- Checking function return values consistently
- Error reporting with `errno`, `perror`, and `strerror`
- Assertions with `assert` and `_Static_assert`
- Resource cleanup with the `goto` idiom, error-reporting conventions, and API-level error contracts

[🗒️Lecture Notes (HTML)](../files/c/Week_35_Error_Handling.html)

---

### Week 36: Debugging, Testing, and Analysis
- Compiler warnings as the first line of defense
- Interactive debugging with GDB: breakpoints, watchpoints, and backtraces
- Static analysis tools
- Unit testing in C and measuring code coverage
- Reducing a failure to a minimal reproducible case
- Continuous integration concepts: automated builds, tests, warnings, and sanitizer runs

[🗒️Lecture Notes (HTML)](../files/c/Week_36_Debugging_and_Testing.html)

---

### Week 37: Undefined Behavior and Secure Coding
- What undefined behavior is and how compilers exploit it
- Common sources: overflow, aliasing, uninitialized reads, invalid pointers
- Implementation-defined and unspecified behavior
- Buffer overflows, format-string flaws, and integer-overflow vulnerabilities
- Defensive practices and secure-coding guidelines

[🗒️Lecture Notes (HTML)](../files/c/Week_37_Undefined_Behavior_and_Secure_Coding.html)

---

### Week 38: Portability and the Machine Model
- Type sizes and fixed-width types in `<stdint.h>`
- Endianness and byte-order conversion
- Alignment with `_Alignas` and `_Alignof`, and packed data
- Platform, compiler, and library differences
- Character encoding: wide characters, `<wchar.h>`, and UTF-8
- Portable serialization: binary file formats, padding, and versioned records

[🗒️Lecture Notes (HTML)](../files/c/Week_38_Portability_and_Machine_Model.html)

---

### Week 39: Advanced Language Features
- `volatile`, `restrict`, and `register`
- `inline` and `static inline`
- Compound literals, and anonymous structures and unions
- Variable-length arrays and their trade-offs
- `_Noreturn` and non-local jumps with `setjmp` and `longjmp`

[🗒️Lecture Notes (HTML)](../files/c/Week_39_Advanced_Language_Features.html)

---

### Week 40: Processes, Signals, and Low-Level I/O
- File descriptors and the `open`, `read`, `write`, and `close` interface
- Creating processes with `fork` and `exec`
- Waiting on child processes, exit status, and `system`
- Signals, signal handlers, and async-signal safety
- Pipes and redirection

[🗒️Lecture Notes (HTML)](../files/c/Week_40_Processes_Signals_and_Low_Level_IO.html)

---

### Week 41: Network Programming with Sockets
- The client–server model, TCP versus UDP, and the Berkeley socket API
- Addresses, ports, byte-order conversion with `htons` and `htonl`, and name resolution with `getaddrinfo`
- Writing a TCP client: `socket`, `connect`, `send`, and `recv`
- Writing a TCP server: `bind`, `listen`, `accept`, and serving clients with a forked child per connection
- Message framing, partial reads and writes, timeouts, and network error handling

[🗒️Lecture Notes (HTML)](../files/c/Week_41_Network_Programming_with_Sockets.html)

---

### Week 42: Concurrency and the C Memory Model
- Threads with C11 `<threads.h>` and POSIX threads
- Race conditions, mutexes, and condition variables
- Thread-local storage with `_Thread_local`
- Atomics, `<stdatomic.h>`, and the C memory model
- Deadlock, starvation, and debugging concurrent programs

[🗒️Lecture Notes (HTML)](../files/c/Week_42_Concurrency_and_Memory_Model.html)

---

## Professional (Weeks 43-56)

### Week 43: Working in an Existing Codebase
- Navigating unfamiliar C with `grep`, `ctags`, language servers, and call graphs
- Reading before writing: entry points, data flow, and hidden invariants
- Following conventions, naming, and error-handling contracts you did not choose
- Locating a regression with `git bisect`
- Making a minimal, reviewable change to code you did not write

[🗒️Lecture Notes (HTML)](../files/c/Week_43_Working_in_an_Existing_Codebase.html)

---

### Week 44: Collaborative Development and Code Review
- Branching, merging, rebasing, and resolving conflicts
- Pull requests and the review workflow
- Reviewing C for memory safety, ownership, and undefined behavior
- Commit hygiene, changelogs, and semantic versioning
- Issue reports, reproduction cases, and regression tests

[🗒️Lecture Notes (HTML)](../files/c/Week_44_Collaborative_Development_and_Code_Review.html)

---

### Week 45: Packaging and Distributing C Libraries
- Designing a stable public API and a versioning policy
- Shared library versioning: `soname`, symbol versioning, and ABI compatibility
- Installation layouts, `pkg-config`, and consuming a library from another project
- Header hygiene for published headers: namespacing, includes, and visibility
- Deprecation, migration paths, and backward compatibility

[🗒️Lecture Notes (HTML)](../files/c/Week_45_Packaging_and_Distributing_Libraries.html)

---

### Week 46: ABI and Interfacing with Other Languages
- Calling conventions, stack frames, and the platform ABI
- Name mangling, `extern "C"`, and linking C with C++
- Exposing a C API to Python with `ctypes` and CFFI, to Rust, and to Java with JNI
- Passing structures, callbacks, and memory ownership across a language boundary
- Inline assembly and compiler intrinsics

[🗒️Lecture Notes (HTML)](../files/c/Week_46_ABI_and_Language_Interoperability.html)

---

### Week 47: Event-Driven and Scalable I/O
- Blocking versus non-blocking file descriptors
- Multiplexing with `select`, `poll`, and `epoll` or `kqueue`
- Structuring an event loop
- Timers and signal handling inside an event loop: `signalfd` and the self-pipe trick
- Thread pools versus event loops, and the C10K problem

[🗒️Lecture Notes (HTML)](../files/c/Week_47_Event_Driven_and_Scalable_IO.html)

---

### Week 48: Fuzzing and Security Testing
- Coverage-guided fuzzing with libFuzzer and AFL++
- Writing a fuzz target and building a seed corpus
- Combining fuzzing with sanitizers and assertions
- Triaging crashes, minimizing inputs, and reporting vulnerabilities
- Threat modeling and conducting a security review of C code

[🗒️Lecture Notes (HTML)](../files/c/Week_48_Fuzzing_and_Security_Testing.html)

---

### Week 49: Embedded C and Cross-Compilation
- Microcontroller architecture: flash, SRAM, and peripherals
- Cross-compilers, target triples, and toolchain setup
- Freestanding versus hosted environments, and life without a full standard library
- Startup code, the reset vector, and how `main` is reached
- Building, flashing, and running code on a target board

[🗒️Lecture Notes (HTML)](../files/c/Week_49_Embedded_C_and_Cross_Compilation.html)

---

### Week 50: Memory-Mapped I/O and Hardware Registers
- The memory map and peripheral register blocks
- Why hardware registers require `volatile` and what the compiler may otherwise do
- Register access with bit masks, bit-fields, and register-description structures
- Writing simple GPIO, timer, and UART drivers
- Reading a datasheet and a reference manual

[🗒️Lecture Notes (HTML)](../files/c/Week_50_Memory_Mapped_IO_and_Registers.html)

---

### Week 51: Interrupts and Real-Time Behavior
- The interrupt vector table and interrupt service routines
- Priorities, nesting, and interrupt latency
- Sharing data between an ISR and main code: `volatile`, atomics, and critical sections
- Polling versus interrupts, and input debouncing
- Measuring and bounding response time

[🗒️Lecture Notes (HTML)](../files/c/Week_51_Interrupts_and_Real_Time_Behavior.html)

---

### Week 52: Linker Scripts and Firmware Memory Layout
- Sections: `.text`, `.rodata`, `.data`, and `.bss`
- Linker scripts and placing code and data in specific memory regions
- The startup sequence: copying `.data` and zeroing `.bss`
- Stack and heap placement, and detecting stack overflow
- Inspecting an image with `size`, `objdump`, and map files

[🗒️Lecture Notes (HTML)](../files/c/Week_52_Linker_Scripts_and_Firmware_Layout.html)

---

### Week 53: Constrained-Resource Programming
- Programming without `malloc`: static allocation, memory pools, and ring buffers
- Fixed-point arithmetic and avoiding floating point
- Lookup tables, code size, and optimizing for space with `-Os`
- Power management and low-power modes
- Watchdog timers, brown-out detection, and fault handlers

[🗒️Lecture Notes (HTML)](../files/c/Week_53_Constrained_Resource_Programming.html)

---

### Week 54: Real-Time Operating Systems
- The bare-metal superloop versus an RTOS
- Tasks, scheduling policies, and priorities
- Queues, semaphores, and mutexes in an RTOS
- Priority inversion and how to avoid it
- Choosing between a superloop, an RTOS, and an event-driven design

[🗒️Lecture Notes (HTML)](../files/c/Week_54_Real_Time_Operating_Systems.html)

---

### Week 55: Embedded Debugging and Testing
- On-chip debugging over JTAG and SWD with a hardware debugger
- Tracing on constrained targets: semihosting, logging, and trace buffers
- Hardware abstraction layers that make firmware testable on a host
- Host-side unit tests and hardware-in-the-loop testing
- Observing timing with a logic analyzer and an oscilloscope

[🗒️Lecture Notes (HTML)](../files/c/Week_55_Embedded_Debugging_and_Testing.html)

---

### Week 56: Maintaining Long-Lived C Codebases
- Reading and modernizing legacy and K&R-era code
- Writing characterization tests before refactoring
- Refactoring incrementally without changing observable behavior
- Migrating between C standards, compilers, and platforms
- Managing technical debt, deprecation, and long-term support

[🗒️Lecture Notes (HTML)](../files/c/Week_56_Maintaining_Long_Lived_Codebases.html)
