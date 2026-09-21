---
title: "Programming with C"
collection: teaching
type: "Undergraduate"
permalink: /teaching/programming-with-c
redirect_from:
  - /teaching/procedural-programming-with-c/
  - /teaching/procedural-programming-with-c
venue: "Giresun University, Computer Engineering"
date: 2024-09-19
location: "Giresun, Turkey"
---

![procedural programming with c](/images/teaching/teaching-procedural-programming-c.webp){: .align-left width="200" style="float: left; margin-right: 10px;"}
C is a general-purpose programming language widely used in systems programming, embedded software, operating systems, compilers, and performance-sensitive applications. It combines portable high-level constructs with low-level access to memory and hardware-related operations. C gives programmers substantial control over data representation, memory allocation, and program execution. This control can enable efficient software, but it also requires careful handling of memory, types, and undefined behavior.

This is a complete course in C, designed to take a reader from no prior programming experience to competent, independent, professional C development. It is organized as 56 weekly topics in four levels. **Basic** builds the language core, early programming habits, and the first command-line programs, ending with pointers and strings. **Intermediate** covers memory, aggregate data, files, error handling, modular design, and project workflow. **Advanced** covers libraries and tooling, data structures, performance, undefined behavior, portability, low-level systems interfaces, network programming, and concurrency. **Professional** covers working in existing codebases, collaboration and review, library distribution, language interoperability, scalable I/O, security testing, embedded and bare-metal development, and long-term maintenance. Each topic assumes only what earlier topics have already established.

Every week is anchored to a worked example that is built and explained in the lecture notes. The examples form a chain rather than a set of isolated exercises: the growable array of week 19 becomes the reusable module of week 28, the library of week 29, the installable package of week 45, and the target of a foreign-language binding in week 46; the socket server of week 40 becomes the event loop of week 47. The embedded material in weeks 49-55 targets an ARM Cortex-M image running under QEMU, so every example can be built and run without physical hardware.

## Ders Öğretim Planı  

[Ders Öğretim Planı (HTML)](../files/c/Ders_Ogretim_Plani.html)

---

## The book

The whole course as a single PDF: 758 pages, fifty-six chapters in four parts, with the
worked examples, the figures and the self-check questions and answers in place.

[📕 Programming with C (PDF, 8.7 MB)](../files/c/Programming-with-C.pdf)

It is generated from the notes on this site, so the two never drift apart; the listings are
the same ones the companion repository compiles on every change.

---

## Code repository

Every program in the lecture notes lives in a repository, one directory per week, each with a Makefile and a README that links back to the week it came from.

```bash
git clone https://github.com/sercankulcu/programming-with-c
cd programming-with-c
make week01
```

[💻 sercankulcu/programming-with-c](https://github.com/sercankulcu/programming-with-c)

Most weeks are plain standard C and build the same way on Linux, macOS and Windows. Weeks 31, 39-41, 47 and 48 use POSIX interfaces that Windows does not provide in a form that would teach the same lesson, so run those under WSL — which week 1 already sets up. Weeks 49-55 cross-compile for ARM Cortex-M and run under QEMU, so they need no hardware.

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

**Worked example:** a first program compiled and run from the command line, then broken on purpose so the compiler's diagnostics can be read and understood.

[🗒️Lecture Notes (HTML)](../files/c/Week_01_Computers_and_Toolchain.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week01_computers_programs_and_the_c_toolchain)

---

### Week 2: History, Standards, and the Compilation Model
- Origins of C: BCPL, B, and Unix
- K&R C, ANSI C, and ISO standardization
- C89, C99, C11, C17, and C23, and what each added
- Translation phases: preprocessing, compilation, assembly, and linking
- Selecting a standard and useful flags: `-std=`, `-Wall`, `-Wextra`, `-g`

**Worked example:** one source file compiled under `-std=c89` and `-std=c23`, with the preprocessed, assembled, and linked output inspected at each stage.

[🗒️Lecture Notes (HTML)](../files/c/Week_02_History_Standards_and_Compilation.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week02_history_standards_and_the_compilation_model)

---

### Week 3: Program Structure, Style, and Basic Output
- `main`, its return value, `EXIT_SUCCESS`, and `EXIT_FAILURE`
- `#include` and the standard library
- Statements, blocks, semicolons, and braces
- Comments, indentation, naming, formatting, and readability
- Producing output with `printf`
- Basic source-code workflow: folders, files, Git repositories, commits, and `.gitignore`

**Worked example:** a badly formatted program rewritten for readability and placed under version control with a meaningful first commit.

[🗒️Lecture Notes (HTML)](../files/c/Week_03_Program_Structure_and_Style.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week03_program_structure_style_and_basic_output)

---

### Week 4: Data Representation
- Binary, octal, and hexadecimal number systems
- Bits, bytes, and words
- Two's complement representation of signed integers
- IEEE 754 representation of floating-point numbers
- Character encoding and the ASCII table

**Worked example:** a program that prints an integer in binary, octal, and hexadecimal, and dumps the raw bytes of a `float` to expose its sign, exponent, and mantissa.

[🗒️Lecture Notes (HTML)](../files/c/Week_04_Data_Representation.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week04_data_representation)

---

### Week 5: Variables, Types, and Constants
- Identifiers, declarations, and initialization
- `int`, `char`, `float`, `double`, `_Bool`, and `<stdbool.h>`
- Type modifiers: `short`, `long`, `signed`, `unsigned`
- `sizeof`, `size_t`, `<limits.h>`, and `<float.h>`
- Literals, escape sequences, `const`, and `#define`

**Worked example:** a program that reports the size and value range of every basic type on the host machine, compared with the minimum guarantees the standard actually makes.

[🗒️Lecture Notes (HTML)](../files/c/Week_05_Variables_Types_and_Constants.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week05_variables_types_and_constants)

---

### Week 6: Operators and Expressions
- Arithmetic, relational, and logical operators
- Assignment and compound assignment
- Increment, decrement, and the comma operator
- Precedence, associativity, and parenthesization
- Evaluation order, sequence points, and side effects

**Worked example:** a set of expressions whose values are predicted on paper and then checked against the program, including one whose evaluation order the standard does not fix.

[🗒️Lecture Notes (HTML)](../files/c/Week_06_Operators_and_Expressions.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week06_operators_and_expressions)

---

### Week 7: Type Conversions
- Implicit conversion and integer promotion
- The usual arithmetic conversions
- Explicit conversion with casts
- Mixing signed and unsigned types
- Integer overflow, truncation, and floating-point precision
- Floating-point comparison, accumulated error, and the special values `NaN` and infinity

**Worked example:** a program in which a signed-unsigned comparison loops forever and a sum of decimal fractions fails an equality test, with both diagnosed and repaired.

[🗒️Lecture Notes (HTML)](../files/c/Week_07_Type_Conversions.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week07_type_conversions)

---

### Week 8: Formatted Input and Output
- `printf` format specifiers, width, precision, and flags
- `scanf` and reading user input
- Input buffer problems and error recovery
- Character-at-a-time input and output with `getchar` and `putchar`
- Validating user input and reporting input errors clearly

**Worked example:** an interactive prompt that reads numbers, rejects malformed input, clears the input buffer, and never spins forever on bad data.

[🗒️Lecture Notes (HTML)](../files/c/Week_08_Input_and_Output.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week08_formatted_input_and_output)

---

### Week 9: Conditional Statements
- `if`, `else if`, and `else`
- Nested and chained conditions
- The conditional (ternary) operator
- `switch`, `case`, `default`, and fall-through
- Short-circuit evaluation and common logic errors

**Worked example:** a classifier written twice, once as an `if`/`else if` chain and once as a `switch`, with the trade-offs of each made explicit.

[🗒️Lecture Notes (HTML)](../files/c/Week_09_Conditional_Statements.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week09_conditional_statements)

---

### Week 10: Loops and Flow Control
- `for`, `while`, and `do-while`
- Loop counters, invariants, and termination conditions
- Nested loops
- `break`, `continue`, and `goto`
- Infinite loops and off-by-one errors

**Worked example:** a prime sieve and a formatted multiplication table, with the loop invariant of each stated explicitly and every boundary case checked.

[🗒️Lecture Notes (HTML)](../files/c/Week_10_Loops_and_Flow_Control.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week10_loops_and_flow_control)

---

### Week 11: Functions
- Declaration, definition, and calling
- Parameters, return values, and `void`
- Function prototypes and their placement
- Pass-by-value semantics and the call stack
- Designing small, single-purpose functions with clear success and failure behavior

**Worked example:** a monolithic program decomposed into named functions, ending with a swap function that fails and a first look at why it cannot work yet.

[🗒️Lecture Notes (HTML)](../files/c/Week_11_Functions.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week11_functions)

---

### Week 12: One- and Multi-Dimensional Arrays
- Declaring, initializing, and traversing arrays
- Indexing with `size_t` and respecting array bounds
- Out-of-range access and its consequences
- Two-dimensional arrays and row-major memory layout
- Common array algorithms: sum, minimum and maximum, reversal, linear search

**Worked example:** a matrix transpose with explicit bounds checking, and a demonstration of exactly what an out-of-range write corrupts.

[🗒️Lecture Notes (HTML)](../files/c/Week_12_Arrays.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week12_one_and_multi_dimensional_arrays)

---

### Week 13: Introduction to Pointers
- Memory addresses and the address-of operator
- Pointer declaration, initialization, and dereferencing
- `NULL`, uninitialized, and wild pointers
- Pointer types, `void *`, and type safety
- Array-to-pointer decay, passing arrays to functions, and why `sizeof` changes inside them

**Worked example:** the failed swap function from week 11 made to work, plus an array-length bug caused by `sizeof` on a parameter, found and explained.

[🗒️Lecture Notes (HTML)](../files/c/Week_13_Introduction_to_Pointers.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week13_introduction_to_pointers)

---

### Week 14: Strings and Character Handling
- Character arrays, the null terminator, and string literals
- Reading and printing strings with `fgets` and `puts`, and why `gets` must never be used
- `<string.h>`: `strlen`, `strcpy`, `strncpy`, `strcmp`, `strcat`, `strchr`, `strstr`, `strtok`
- Block memory operations: `memcpy`, `memmove`, `memset`, and `memcmp`
- `<ctype.h>` classification, buffer sizes, truncation, and safe string building with `snprintf`

**Worked example:** a small string toolkit — length, copy, compare, search — written by hand and then replaced with the library versions, including the crash that follows from writing to a string literal.

[🗒️Lecture Notes (HTML)](../files/c/Week_14_Strings_and_Character_Handling.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week14_strings_and_character_handling)

---

## Intermediate (Weeks 15-28)

### Week 15: Pointer Arithmetic and Arrays
- Incrementing, decrementing, and comparing pointers
- Pointer subtraction and `ptrdiff_t`
- Traversing arrays and strings with pointers
- Pointers to pointers and arrays of pointers
- Pointer-based versus index-based idioms

**Worked example:** an array traversal rewritten from indexing to pointer walking, with the readability and the generated code of both versions compared.

[🗒️Lecture Notes (HTML)](../files/c/Week_15_Pointer_Arithmetic_and_Arrays.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week15_pointer_arithmetic_and_arrays)

---

### Week 16: Pointers as Function Parameters
- Emulating pass-by-reference
- Modifying caller variables and output parameters
- `const` pointers, pointers to `const`, and `const` correctness as a discipline
- Returning pointers safely and avoiding dangling returns
- Passing strings and multidimensional arrays
- Reading and writing complex declarations: the right-left rule and the `cdecl` tool

**Worked example:** a parse function that returns a status code and writes its result through an output parameter, plus a set of hairy declarations decoded one qualifier at a time.

[🗒️Lecture Notes (HTML)](../files/c/Week_16_Pointers_as_Parameters.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week16_pointers_as_function_parameters)

---

### Week 17: Scope, Lifetime, and Program Memory Layout
- Block, file, and function scope
- Automatic and static storage duration
- Local variables, global variables, and `static` locals
- The memory layout of a running program: text, rodata, data, bss, stack, and heap
- The call stack: frames, parameters, locals, and return addresses
- Shadowing, name conflicts, and the cost of global state

**Worked example:** a program that prints the address of a local, a `static`, a global, a string literal, and a heap block, revealing the whole memory map of the process in a single run.

[🗒️Lecture Notes (HTML)](../files/c/Week_17_Scope_and_Program_Memory_Layout.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week17_scope_lifetime_and_program_memory_layout)

---

### Week 18: Recursion
- Base cases and recursive cases
- Call stack behavior and stack frames
- Classic examples: factorial, Fibonacci, Towers of Hanoi, and binary search
- Recursion depth, stack overflow, and tail calls
- Recursive versus iterative solutions

**Worked example:** Towers of Hanoi and a recursive binary search stepped through in a debugger, watching the stack frames from week 17 grow and unwind.

[🗒️Lecture Notes (HTML)](../files/c/Week_18_Recursion.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week18_recursion)

---

### Week 19: Dynamic Memory Allocation
- The heap versus the stack
- `malloc`, `calloc`, `realloc`, and `free`
- Checking allocation failures
- Growable arrays and dynamically allocated two-dimensional arrays
- Ownership, lifetime, allocation conventions, and `init`/`destroy` pairs

**Worked example:** a growable array that doubles its capacity with `realloc` and frees cleanly — the data structure the rest of the course keeps coming back to.

[🗒️Lecture Notes (HTML)](../files/c/Week_19_Dynamic_Memory_Allocation.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week19_dynamic_memory_allocation)

---

### Week 20: Memory Errors and Their Diagnosis
- Memory leaks
- Dangling pointers and use-after-free
- Double free and invalid free
- Buffer overruns and out-of-bounds access
- Detecting memory errors with sanitizers and Valgrind

**Worked example:** the week 19 array seeded with a leak, a use-after-free, and a one-byte overrun, each found and fixed with a different tool.

[🗒️Lecture Notes (HTML)](../files/c/Week_20_Memory_Errors.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week20_memory_errors_and_their_diagnosis)

---

### Week 21: Structures
- Declaration, initialization, and designated initializers
- Member access with `.` and `->`
- Nested structures and arrays of structures
- Structures as parameters and return values
- Pointers to structures and self-referential types

**Worked example:** a record type held in an array of records, passed both by value and by pointer, with the copying cost of each measured.

[🗒️Lecture Notes (HTML)](../files/c/Week_21_Structures.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week21_structures)

---

### Week 22: Unions, Enumerations, and Type Aliases
- Enumerated types and their underlying representation
- Type aliases with `typedef`
- Unions, shared storage, and tagged unions
- Structure padding and `offsetof`
- Choosing between a structure, a union, and an enumeration

**Worked example:** a tagged union that holds an integer, a double, or a string, and a demonstration of how reordering struct members changes `sizeof`.

[🗒️Lecture Notes (HTML)](../files/c/Week_22_Unions_Enums_and_Typedef.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week22_unions_enumerations_and_type_aliases)

---

### Week 23: Program Arguments and Input
- Program arguments with `argc` and `argv`
- String-to-number conversion: `atoi`, `strtol`, `strtod`, and the `endptr` argument
- Validating arguments and rejecting malformed input
- Taking input from arguments versus from `stdin`
- Writing programs that compose well in a shell pipeline

**Worked example:** a numeric filter that takes its parameters as arguments, validates every one of them, and reads its data from standard input.

[🗒️Lecture Notes (HTML)](../files/c/Week_23_Program_Arguments_and_Input.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week23_program_arguments_and_input)

---

### Week 24: The Standard Library Toolbox
- `<math.h>`: numeric functions, linking with `-lm`, and floating-point pitfalls
- `<time.h>`: `time_t`, `struct tm`, formatting, and measuring elapsed time
- Pseudo-random numbers: `rand`, `srand`, and their limitations
- What the standard library does and does not provide, and when to reach for a third-party library
- Reading manual pages, library documentation, and the text of the standard itself

**Worked example:** a program that generates a random data set, computes statistics over it, and reports how long the computation took.

[🗒️Lecture Notes (HTML)](../files/c/Week_24_Standard_Library_Toolbox.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week24_the_standard_library_toolbox)

---

### Week 25: Bit-Level Operations
- Bitwise AND, OR, XOR, and NOT
- Left and right shifts; arithmetic versus logical shift
- Bit masks: setting, clearing, toggling, and testing flags
- Bit-fields and their portability limitations
- Practical uses: permissions, packing, and checksums

**Worked example:** a permission-flag system and a population-count routine, with several implementations compared for clarity and for speed.

[🗒️Lecture Notes (HTML)](../files/c/Week_25_Bit_Level_Operations.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week25_bit_level_operations)

---

### Week 26: Files and Streams
- Streams, the `FILE` type, `fopen` modes, and `fclose`
- Text versus binary access; `fprintf`, `fscanf`, `fgets`, and `fputs`
- `fread` and `fwrite` for binary records
- Positioning with `fseek`, `ftell`, `rewind`, `fgetpos`, and `fsetpos`
- Stream state and buffering: `feof`, `ferror`, `clearerr`, `fflush`, and `setvbuf`
- `stdin`, `stdout`, `stderr`, redirection, temporary files, and portable file-processing pitfalls

**Worked example:** a program that reads a delimited text file line by line, and a second that stores the same data as fixed-size binary records and seeks directly to any one of them.

[🗒️Lecture Notes (HTML)](../files/c/Week_26_Files_and_Streams.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week26_files_and_streams)

---

### Week 27: Error Handling Strategies
- Compile-time, link-time, and runtime errors
- Checking function return values consistently
- Error reporting with `errno`, `perror`, and `strerror`
- Assertions with `assert` and `_Static_assert`
- Resource cleanup with the `goto` idiom, error-reporting conventions, and API-level error contracts

**Worked example:** the file reader from week 26 rewritten around a single error contract with one cleanup path, leaking no handle on any failure route.

[🗒️Lecture Notes (HTML)](../files/c/Week_27_Error_Handling.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week27_error_handling_strategies)

---

### Week 28: The Preprocessor and Modular Programming
- Object-like and function-like macros; parenthesization and double evaluation
- Stringification with `#`, token pasting with `##`, conditional compilation, and predefined macros
- Separating declarations from definitions; designing header and source files
- Include guards, `#pragma once`, `extern`, linkage, and multiple-definition errors
- Information hiding with `static` and opaque pointers
- Project layout, public versus private headers, API documentation, and ownership comments

**Worked example:** the growable array of week 19 turned into a reusable module with a public header, a hidden implementation, and debug logging the preprocessor can switch off entirely.

[🗒️Lecture Notes (HTML)](../files/c/Week_28_Preprocessor_and_Modular_Programming.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week28_the_preprocessor_and_modular_programming)

---

## Advanced (Weeks 29-42)

### Week 29: Building Programs and Libraries
- Compiling and linking multiple translation units
- Writing and maintaining a Makefile
- Project configuration with CMake
- Static libraries with `ar`, and shared and dynamic libraries
- Debug and release builds, sanitizer builds, test targets, and warning profiles
- Linking order, symbol resolution, and inspection with `nm` and `objdump`

**Worked example:** the week 28 module built as both a static and a shared library, driven first by a Makefile and then by an equivalent CMake configuration.

[🗒️Lecture Notes (HTML)](../files/c/Week_29_Building_and_Libraries.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week29_building_programs_and_libraries)

---

### Week 30: Function Pointers, Callbacks, and Generic Programming
- Declaring, assigning, and calling function pointers
- Passing functions as arguments; `qsort` and `bsearch` with custom comparators
- Arrays of function pointers, dispatch tables, and simulating polymorphic behavior
- Generic containers with `void *`
- Variable argument lists: `va_list`, `va_start`, `va_arg`, `va_end`, and writing a `printf`-like function
- Type-based selection with `_Generic` and macro-based generic data structures

**Worked example:** the week 19 array generalized to hold any element type through `void *` and a comparison callback, then sorted with `qsort`.

[🗒️Lecture Notes (HTML)](../files/c/Week_30_Function_Pointers_and_Generic_Programming.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week30_function_pointers_callbacks_and_generic_programming)

---

### Week 31: Command-Line Interfaces and the Environment
- Parsing command-line options by hand and with `getopt`
- Program termination: `exit`, `_Exit`, and `atexit`
- Environment variables with `getenv` and `setenv`
- Configuration through arguments, files, and environment variables
- Designing scriptable, testable interfaces: exit status, `stdout` versus `stderr`, and clear diagnostics

**Worked example:** a filter tool with short and long options, a `--help` screen, configuration layered from file and environment, and exit codes a shell script can act on.

[🗒️Lecture Notes (HTML)](../files/c/Week_31_Command_Line_Interfaces_and_Environment.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week31_command_line_interfaces_and_the_environment)

---

### Week 32: Linked Data Structures
- Self-referential structures and node allocation
- Singly, doubly, and circular linked lists
- Stacks and queues
- Insertion, deletion, traversal, and reversal
- The cost of list operations and when a list beats an array

**Worked example:** a doubly linked list and a queue built on one node type, benchmarked against the week 19 array for insertion in the middle.

[🗒️Lecture Notes (HTML)](../files/c/Week_32_Linked_Data_Structures.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week32_linked_data_structures)

---

### Week 33: Trees, Hash Tables, and Abstract Data Types
- Binary trees and binary search trees
- Traversals and recursive tree algorithms
- Hash functions, collision handling, and hash tables
- Time and space complexity: big-O notation and practical cost
- Designing an abstract data type with an opaque handle and a stable API boundary

**Worked example:** a hash table and a binary search tree placed behind the same opaque interface, with lookup cost measured against each other as the data set grows.

[🗒️Lecture Notes (HTML)](../files/c/Week_33_Trees_Hash_Tables_and_ADTs.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week33_trees_hash_tables_and_abstract_data_types)

---

### Week 34: Performance and Memory Layout
- The memory hierarchy, cache behavior, and locality of reference
- Data layout, structure packing, and their effect on speed
- Optimization levels and when to trust the compiler
- Reading the compiler's generated assembly with Compiler Explorer and `objdump`
- Profiling and measurement with `perf`, `gprof`, and `callgrind`
- Trade-offs between clarity and speed

**Worked example:** a cache-hostile matrix loop rewritten for locality, with the speedup measured and the generated assembly of both versions read side by side.

[🗒️Lecture Notes (HTML)](../files/c/Week_34_Performance_and_Memory_Layout.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week34_performance_and_memory_layout)

---

### Week 35: Debugging, Testing, and Analysis
- Compiler warnings as the first line of defense
- Interactive debugging with GDB: breakpoints, watchpoints, and backtraces
- Static analysis tools
- Unit testing in C and measuring code coverage
- Reducing a failure to a minimal reproducible case
- Continuous integration concepts: automated builds, tests, warnings, and sanitizer runs

**Worked example:** a test suite for the week 33 abstract data type, run under sanitizers with coverage reporting in a continuous integration configuration.

[🗒️Lecture Notes (HTML)](../files/c/Week_35_Debugging_and_Testing.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week35_debugging_testing_and_analysis)

---

### Week 36: Undefined Behavior and Secure Coding
- What undefined behavior is and how compilers exploit it
- Common sources: overflow, uninitialized reads, and invalid pointers
- Strict aliasing, type punning, and the role of `restrict`
- Implementation-defined and unspecified behavior
- Buffer overflows, format-string flaws, and integer-overflow vulnerabilities
- Defensive practices and secure-coding guidelines

**Worked example:** a program that behaves correctly at `-O0` and incorrectly at `-O2` because of undefined behavior, diagnosed with a sanitizer and then corrected.

[🗒️Lecture Notes (HTML)](../files/c/Week_36_Undefined_Behavior_and_Secure_Coding.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week36_undefined_behavior_and_secure_coding)

---

### Week 37: Portability and the Machine Model
- Type sizes and fixed-width types in `<stdint.h>`
- Endianness and byte-order conversion
- Alignment with `_Alignas` and `_Alignof`, and packed data
- Platform, compiler, and library differences
- Character encoding: wide characters, `<wchar.h>`, and UTF-8
- Portable serialization: binary file formats, padding, and versioned records

**Worked example:** a binary record format written on one machine and read back correctly on a machine with the opposite byte order and different alignment rules.

[🗒️Lecture Notes (HTML)](../files/c/Week_37_Portability_and_Machine_Model.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week37_portability_and_the_machine_model)

---

### Week 38: Type Qualifiers, Inlining, and Modern C
- `volatile`, `restrict`, and `register`
- `inline` and `static inline`
- Compound literals, and anonymous structures and unions
- Variable-length arrays and their trade-offs
- `_Noreturn` and non-local jumps with `setjmp` and `longjmp`

**Worked example:** a hot loop compiled with and without `restrict`, the difference read straight from the generated assembly, and a lookup table built as a compound literal.

[🗒️Lecture Notes (HTML)](../files/c/Week_38_Type_Qualifiers_and_Modern_C.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week38_type_qualifiers_inlining_and_modern_c)

---

### Week 39: Processes, Signals, and Low-Level I/O
- File descriptors and the `open`, `read`, `write`, and `close` interface
- Creating processes with `fork` and `exec`
- Waiting on child processes, exit status, and `system`
- Signals, signal handlers, and async-signal safety
- Pipes and redirection

**Worked example:** a miniature shell that forks, executes a command, connects two commands with a pipe, and handles an interrupt without leaving zombies behind.

[🗒️Lecture Notes (HTML)](../files/c/Week_39_Processes_Signals_and_Low_Level_IO.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week39_processes_signals_and_low_level_i_o)

---

### Week 40: Network Programming with Sockets
- The client–server model, TCP versus UDP, and the Berkeley socket API
- Addresses, ports, byte-order conversion with `htons` and `htonl`, and name resolution with `getaddrinfo`
- Writing a TCP client: `socket`, `connect`, `send`, and `recv`
- Writing a TCP server: `bind`, `listen`, `accept`, and serving clients with a forked child per connection
- Message framing, partial reads and writes, timeouts, and network error handling

**Worked example:** a line-based TCP server and a matching client talking to each other over a real socket, with partial reads and writes handled correctly.

[🗒️Lecture Notes (HTML)](../files/c/Week_40_Network_Programming_with_Sockets.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week40_network_programming_with_sockets)

---

### Week 41: Concurrency and the C Memory Model
- Threads with C11 `<threads.h>` and POSIX threads
- Race conditions, mutexes, and condition variables
- Thread-local storage with `_Thread_local`
- Atomics, `<stdatomic.h>`, and the C memory model
- Reentrancy and thread safety in the standard library: `errno`, `strtok_r`, and `localtime_r`
- Deadlock, starvation, and debugging concurrent programs

**Worked example:** a producer–consumer pipeline guarded by a mutex and a condition variable, with a real data race first exposed by a thread sanitizer and then eliminated.

[🗒️Lecture Notes (HTML)](../files/c/Week_41_Concurrency_and_Memory_Model.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week41_concurrency_and_the_c_memory_model)

---

### Week 42: Reading Excellent C
- Why C looks the way it does: array decay, null-terminated strings, and declaration-mimics-use
- Why undefined behavior exists, and what the standard deliberately leaves to the implementation
- Reading real codebases: sqlite, musl, lua, redis, and git
- Recognizing house style, error conventions, and ownership conventions in unfamiliar code
- Extracting idioms worth borrowing, and recognizing ones that should not be

**Worked example:** one self-contained module from a well-regarded open-source C project read end to end, with its memory-ownership rules reconstructed from the code alone.

[🗒️Lecture Notes (HTML)](../files/c/Week_42_Reading_Excellent_C.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week42_reading_excellent_c)

---

## Professional (Weeks 43-56)

### Week 43: Working in an Existing Codebase
- Navigating unfamiliar C with `grep`, `ctags`, language servers, and call graphs
- Reading before writing: entry points, data flow, and hidden invariants
- Following conventions, naming, and error-handling contracts you did not choose
- Locating a regression with `git bisect`
- Making a minimal, reviewable change to code you did not write

**Worked example:** a real defect located and fixed in an unfamiliar open-source C project, with the change kept as small as the fix allows.

[🗒️Lecture Notes (HTML)](../files/c/Week_43_Working_in_an_Existing_Codebase.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week43_working_in_an_existing_codebase)

---

### Week 44: Collaborative Development and Code Review
- Branching, merging, rebasing, and resolving conflicts
- Pull requests and the review workflow
- Reviewing C for memory safety, ownership, and undefined behavior
- Commit hygiene, changelogs, and semantic versioning
- Issue reports, reproduction cases, and regression tests

**Worked example:** a change submitted as a pull request with a regression test, and a review written on someone else's C patch against a memory-safety checklist.

[🗒️Lecture Notes (HTML)](../files/c/Week_44_Collaborative_Development_and_Code_Review.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week44_collaborative_development_and_code_review)

---

### Week 45: Packaging and Distributing C Libraries
- Designing a stable public API and a versioning policy
- Shared library versioning: `soname`, symbol versioning, and ABI compatibility
- Installation layouts, `pkg-config`, and consuming a library from another project
- Header hygiene for published headers: namespacing, includes, and visibility
- Deprecation, migration paths, and backward compatibility

**Worked example:** the week 29 library given a version number, a `pkg-config` file, and an install target, then consumed from a separate project that sees only the public header.

[🗒️Lecture Notes (HTML)](../files/c/Week_45_Packaging_and_Distributing_Libraries.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week45_packaging_and_distributing_c_libraries)

---

### Week 46: ABI and Interfacing with Other Languages
- Calling conventions, stack frames, and the platform ABI
- Name mangling, `extern "C"`, and linking C with C++
- Exposing a C API to Python with `ctypes` and CFFI, to Rust, and to Java with JNI
- Passing structures, callbacks, and memory ownership across a language boundary
- Inline assembly and compiler intrinsics

**Worked example:** the week 45 library called from Python and from C++, with ownership of every allocation made explicit at the boundary.

[🗒️Lecture Notes (HTML)](../files/c/Week_46_ABI_and_Language_Interoperability.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week46_abi_and_interfacing_with_other_languages)

---

### Week 47: Event-Driven and Scalable I/O
- Blocking versus non-blocking file descriptors
- Multiplexing with `select`, `poll`, and `epoll` or `kqueue`
- Structuring an event loop
- Timers and signal handling inside an event loop: `signalfd` and the self-pipe trick
- Thread pools versus event loops, and the C10K problem

**Worked example:** the week 40 server rewritten as a single-threaded event loop serving thousands of simultaneous connections, then measured against the forking version.

[🗒️Lecture Notes (HTML)](../files/c/Week_47_Event_Driven_and_Scalable_IO.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week47_event_driven_and_scalable_i_o)

---

### Week 48: Fuzzing and Security Testing
- Coverage-guided fuzzing with libFuzzer and AFL++
- Writing a fuzz target and building a seed corpus
- Combining fuzzing with sanitizers and assertions
- Triaging crashes, minimizing inputs, and reporting vulnerabilities
- Threat modeling and conducting a security review of C code

**Worked example:** a fuzz target for the input parser of week 23, run until it produces a crash, with the failing input minimized and the defect fixed.

[🗒️Lecture Notes (HTML)](../files/c/Week_48_Fuzzing_and_Security_Testing.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week48_fuzzing_and_security_testing)

---

### Week 49: Embedded C and Cross-Compilation
- Microcontroller architecture: flash, SRAM, and peripherals
- Cross-compilers, target triples, and toolchain setup with `arm-none-eabi-gcc`
- Freestanding versus hosted environments, and life without a full standard library
- Startup code, the reset vector, and how `main` is reached
- Building a bare-metal image and running it under QEMU, with no physical hardware required

**Worked example:** a blinking-LED program cross-compiled for an ARM Cortex-M target, run under `qemu-system-arm`, and traced from the reset vector to the first line of `main`.

[🗒️Lecture Notes (HTML)](../files/c/Week_49_Embedded_C_and_Cross_Compilation.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week49_embedded_c_and_cross_compilation)

---

### Week 50: Memory-Mapped I/O and Hardware Registers
- The memory map and peripheral register blocks of the emulated machine
- Why hardware registers require `volatile` and what the compiler may otherwise do
- Register access with bit masks, bit-fields, and register-description structures
- Writing simple GPIO, timer, and UART drivers
- Reading a datasheet and a reference manual

**Worked example:** a UART driver written directly against the emulated machine's hardware registers, and the same driver breaking as soon as `volatile` is removed.

[🗒️Lecture Notes (HTML)](../files/c/Week_50_Memory_Mapped_IO_and_Registers.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week50_memory_mapped_i_o_and_hardware_registers)

---

### Week 51: Interrupts and Real-Time Behavior
- The interrupt vector table and interrupt service routines
- Priorities, nesting, and interrupt latency
- Sharing data between an ISR and main code: `volatile`, atomics, and critical sections
- Polling versus interrupts, and input debouncing
- Measuring and bounding response time in simulated cycles

**Worked example:** a button handler implemented first by polling and then by interrupt, with the response latency of each measured in simulated cycles.

[🗒️Lecture Notes (HTML)](../files/c/Week_51_Interrupts_and_Real_Time_Behavior.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week51_interrupts_and_real_time_behavior)

---

### Week 52: Linker Scripts and Firmware Memory Layout
- Sections: `.text`, `.rodata`, `.data`, and `.bss`
- Linker scripts and placing code and data in specific memory regions
- The startup sequence: copying `.data` and zeroing `.bss`
- Stack and heap placement, and detecting stack overflow
- Inspecting an image with `size`, `objdump`, and map files

**Worked example:** a firmware image taken apart section by section, its map file read, and a variable deliberately relocated into a different memory region.

[🗒️Lecture Notes (HTML)](../files/c/Week_52_Linker_Scripts_and_Firmware_Layout.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week52_linker_scripts_and_firmware_memory_layout)

---

### Week 53: Constrained-Resource Programming
- Programming without `malloc`: static allocation, memory pools, and ring buffers
- Fixed-point arithmetic and avoiding floating point
- Lookup tables, code size, and optimizing for space with `-Os`
- Power management and low-power modes
- Watchdog timers, brown-out detection, and fault handlers

**Worked example:** a fixed-size memory pool and a fixed-point filter running with no heap at all, with the code-size cost of each design choice measured.

[🗒️Lecture Notes (HTML)](../files/c/Week_53_Constrained_Resource_Programming.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week53_constrained_resource_programming)

---

### Week 54: Real-Time Operating Systems
- The bare-metal superloop versus an RTOS
- Tasks, scheduling policies, and priorities
- Queues, semaphores, and mutexes in an RTOS
- Priority inversion and how to avoid it
- Choosing between a superloop, an RTOS, and an event-driven design

**Worked example:** the same device firmware written first as a superloop and then as a set of FreeRTOS tasks running under the simulator, with the timing behavior of both compared.

[🗒️Lecture Notes (HTML)](../files/c/Week_54_Real_Time_Operating_Systems.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week54_real_time_operating_systems)

---

### Week 55: Embedded Debugging and Testing
- Source-level debugging of a running image with GDB attached to the simulator's gdb server
- Tracing on constrained targets: semihosting, logging, and trace buffers
- Hardware abstraction layers that make firmware testable on a host
- Host-side unit tests and simulator-in-the-loop testing
- Observing timing and peripheral traffic with simulator tracing and instruction counting

**Worked example:** the week 50 driver refactored behind a hardware abstraction layer, unit-tested on the host, and then stepped through inside the simulator under GDB.

[🗒️Lecture Notes (HTML)](../files/c/Week_55_Embedded_Debugging_and_Testing.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week55_embedded_debugging_and_testing)

---

### Week 56: Maintaining Long-Lived C Codebases
- Reading and modernizing legacy and K&R-era code
- Writing characterization tests before refactoring
- Refactoring incrementally without changing observable behavior
- Migrating between C standards, compilers, and platforms
- Managing technical debt, deprecation, and long-term support

**Worked example:** a piece of legacy C brought under characterization tests, then refactored and migrated to a modern standard with the tests proving the behavior never changed.

[🗒️Lecture Notes (HTML)](../files/c/Week_56_Maintaining_Long_Lived_Codebases.html) · [💻 Code (GitHub)](https://github.com/sercankulcu/programming-with-c/tree/main/week56_maintaining_long_lived_c_codebases)
