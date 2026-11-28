# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 37 slides: GPU Programming and Parallel Computing — thread model, '
             'memory hierarchy, parallel patterns, speedup, history, neighboring courses, overlaps.'),
    gundem=['CPU and GPU', 'Thread model', 'Memory hierarchy', 'Parallel patterns', 'Measuring performance', 'Neighboring courses'],
    tanim=('GPU programming studies <b>data-parallel</b> computation, which applies the same operation to thousands of '
           'data elements at once. Using a model such as CUDA, the course teaches how to organize threads, use the memory '
           'hierarchy efficiently and measure speedup; this is also the hardware that makes deep learning practical.'),
    tarihce=[
        ('1966', 'Flynn classifies computers as SISD, SIMD, MISD and MIMD.'),
        ('1967', 'Amdahl shows that the remaining sequential part limits parallel speedup (Amdahl\'s law).'),
        ('1999', 'NVIDIA GeForce 256 is marketed under the name "GPU".'),
        ('2007', 'NVIDIA releases CUDA: the GPU becomes general-purpose programmable in a C-like language.'),
        ('2012', 'AlexNet is trained on two GPUs and wins ImageNet; the GPU becomes the engine of deep learning.'),
        ('2017', 'The Volta architecture introduces tensor cores: hardware units dedicated to matrix multiplication.'),
    ],
    kavramlar=[
        ('SIMT and warps', '32 threads execute the same instruction together.'),
        ('Thread organization', 'The grid, block and thread hierarchy.'),
        ('Memory hierarchy', 'Registers, shared memory, global memory.'),
        ('Coalesced access', 'Neighboring threads should access neighboring addresses.'),
        ('Synchronization', 'Barriers, atomic operations and race conditions.'),
        ('Amdahl\'s law', 'The sequential part caps the achievable speedup.'),
        ('Occupancy', 'Enough threads to keep the cores busy.'),
        ('Parallel patterns', 'Map, reduction, prefix sum, stencil.'),
    ],
    akis=[('Find\nparallelism', 'data-parallel\nloops'), ('Copy\ndata', 'CPU → GPU\nmemory'),
          ('Launch\nkernel', 'grid, block,\nthread'), ('Copy\nback', 'GPU → CPU'),
          ('Measure,\noptimize', 'profiling,\nmemory access')],
    akis_ornek=('<b>Example:</b> To add two vectors of two million elements, one thread is assigned to each element: the '
                'arrays are copied to GPU memory, the kernel is launched with 256-thread blocks and the result is copied back. '
                'Measurement often shows that the time goes into copying data, not into computing.'),
    onkosul_ek=[
        ('Programming with C', 'pointers, arrays and memory allocation: the basis of CUDA C', '/teaching/programming-with-c/?lang=en'),
        ('Operating Systems', 'threads, synchronization and race conditions', '/teaching/operating-systems/?lang=en'),
        ('Microprocessors', 'registers, caches and the memory hierarchy', '/teaching/microprocessors/?lang=en'),
    ],
    ayrisma=[
        ('DO', 'Deep learning uses the GPU through ready-made libraries; this course writes the kernels and memory access beneath them.'),
        ('BV', 'Big data systems spread work across many machines; this course makes efficient use of thousands of cores on one device.'),
        ('BGR', 'Computer graphics programs the GPU with shaders to draw images; this course uses it for general-purpose computation.'),
        ('GYZ', 'Embedded AI teaches making do with little power; this course teaches getting peak performance from the largest accelerator.'),
    ],
    uygulamalar=[
        ('Deep learning', 'Matrix multiplication and convolution on tensor cores.'),
        ('Scientific simulation', 'Fluids, climate and molecular dynamics.'),
        ('Image and video', 'Real-time filters, encoding and decoding.'),
        ('Finance', 'Monte Carlo risk and pricing.'),
        ('Bioinformatics', 'Sequence alignment and protein structure computation.'),
        ('Data analytics', 'Table and database operations on the GPU.'),
    ],
    araclar=['CUDA', 'OpenCL', 'OpenMP', 'MPI', 'Numba', 'CuPy', 'NVIDIA Nsight'],
    veri_baslik='Classic example problems',
    veriler=['Vector addition', 'Matrix multiplication', 'Parallel reduction', 'Prefix sum (scan)', 'Histogram', 'N-body simulation'],
    araclar_not='The metric is <b>speedup</b>: a sequential CPU version and a parallel GPU version of the same problem are compared on the same input.',
    yanilgilar=[
        ('A GPU speeds up any program.', 'Only parts with many independent, similar operations speed up; branching and sequential parts do not.'),
        ('Doubling the cores halves the run time.', 'Amdahl\'s law: the sequential part sets an upper bound on the achievable speedup.'),
        ('Computation is the most expensive part.', 'In most GPU programs the bottleneck is memory bandwidth and data transfer between CPU and GPU.'),
        ('Parallel programming is only for deep learning.', 'Simulation, graphics and scientific computing used GPUs long before deep learning.'),
    ],
    meslekler=['GPU software engineer', 'High-performance computing (HPC) specialist', 'ML infrastructure engineer',
               'Game and graphics engine developer', 'Scientific computing researcher'],
    sonra=('GPU programming opens up the engine beneath deep learning and graphics. From here you can move to systems '
           'topics such as distributed training, compilers and accelerator design, or to neighboring courses in the guide '
           'such as big data systems and embedded AI.'),
    kaynaklar=[
        'Kirk, Hwu and El Hajj, <em>Programming Massively Parallel Processors</em>, 4th ed., Morgan Kaufmann, 2022.',
        'Sanders and Kandrot, <em>CUDA by Example</em>, Addison-Wesley, 2010.',
        'Hennessy and Patterson, <em>Computer Architecture: A Quantitative Approach</em>, 6th ed., Morgan Kaufmann, 2017.',
        'Amdahl, "Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities", <em>AFIPS Conference Proceedings</em> 30, 1967.',
    ],
    islenenler=[
        'Parallel architectures: Flynn\'s taxonomy, CPU vs GPU',
        'The CUDA model: grids, blocks and threads',
        'Memory hierarchy and CPU-GPU data transfer',
        'Coalesced access and shared memory',
        'Warp execution, branch divergence, occupancy',
        'Synchronization, atomics and race conditions',
        'Parallel patterns: reduction and prefix sum',
        'Stencils, histograms and sparse matrix operations',
        'Tiled matrix multiplication and tensor cores',
        'Streams, asynchronous copies and multiple GPUs',
        'Profiling: Nsight and the roofline model',
        'OpenMP on the CPU, MPI on clusters',
    ],
    beceriler=['writing CUDA C kernels', 'finding bottlenecks with Nsight', 'Numba and CuPy in Python', 'CPU parallelism with OpenMP', 'measuring speedup correctly'],
    hazirlik=[
        ('Can you manage a dynamic array in C with pointers and malloc?', 'A C programming course'),
        ('Can you explain the race when two threads write the same variable?', 'Threads and synchronization from operating systems'),
        ('Can you explain the speed gap between cache and main memory?', 'A microprocessors or computer architecture course'),
        ('Can you write the product of two matrices with nested loops?', '@DC'),
    ],
    riskler=[
        ('Inflated speedups', 'Leaving out data transfer or comparing against a weak CPU baseline makes the speedup look far larger than it is.'),
        ('Silent race bugs', 'A kernel with missing synchronization is right on most runs and wrong on some; the bug is hard to catch.'),
        ('Floating-point differences', 'Parallel sums change the order of operations, so results differ slightly from the CPU and from run to run.'),
        ('Energy and cost', 'GPU clusters that train large models draw a lot of power; inefficient code inflates that cost for nothing.'),
    ],
)
