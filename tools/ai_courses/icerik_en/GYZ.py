# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 36 slides: Embedded AI — resource limits, quantization, pruning, '
             'distillation, efficient architectures, TinyML, history, neighboring courses, overlaps.'),
    gundem=['Resource limits', 'Quantization', 'Pruning and distillation', 'Efficient architectures', 'Devices and accelerators', 'Neighboring courses'],
    tanim=('Embedded AI studies running trained models on devices with limited memory, compute and energy, such as '
           'phones, cameras or microcontrollers. The course covers shrinking a model by <b>quantization</b>, pruning and '
           'distillation, moving it onto the device, and measuring latency and energy; the extreme form is called TinyML.'),
    tarihce=[
        ('2015', 'Hinton, Vinyals and Dean introduce knowledge distillation: a large model\'s knowledge passes to a small one.'),
        ('2016', 'Han et al. combine pruning and quantization in Deep Compression, shrinking networks by tens of times.'),
        ('2017', 'MobileNets is published and TensorFlow Lite announced: deep networks on phones become routine.'),
        ('2018', 'Google announces the Edge TPU accelerator for edge devices.'),
        ('2019', 'The first tinyML Summit is held; Warden and Situnayake publish the book TinyML.'),
        ('2020', 'MCUNet runs ImageNet classification on a microcontroller with over 70% accuracy.'),
    ],
    kavramlar=[
        ('Quantization', '8-bit or smaller integers instead of 32-bit floats.'),
        ('Pruning', 'Removing unimportant weights, channels or layers.'),
        ('Knowledge distillation', 'A small student model mimics a large teacher.'),
        ('Efficient architectures', 'MobileNet, depthwise separable convolution.'),
        ('Inference engine', 'The thin software layer that runs the model on the device.'),
        ('Accelerators', 'NPU, DSP, Edge TPU: hardware built for neural networks.'),
        ('Memory budget', 'A few hundred KB of SRAM and flash for weights and activations.'),
        ('Latency and energy', 'Two performance metrics as important as accuracy.'),
    ],
    akis=[('Train', 'on a server,\nfull precision'), ('Shrink', 'quantize,\nprune'), ('Convert', 'TFLite, ONNX'),
          ('Deploy', 'MCU, phone,\ncamera'), ('Run and\nmeasure', 'latency,\nenergy')],
    akis_ornek=('<b>Example:</b> A small keyword-spotting network is trained on a computer with 32-bit floats, quantized '
                'to 8-bit integers and loaded onto a microcontroller with a few hundred kilobytes of memory. The device '
                'listens all the time, never sends audio to the cloud and uses very little power.'),
    onkosul_ek=[
        ('Microprocessors', 'memory, registers, interrupts and peripherals: understanding device limits', '/teaching/microprocessors/?lang=en'),
        ('Programming with C', 'the language of embedded software; pointers and static memory management', '/teaching/programming-with-c/?lang=en'),
    ],
    ayrisma=[
        ('DO', 'Deep learning grows the model for accuracy; this course shrinks the same model while losing little accuracy.'),
        ('GPU', 'GPU programming gets peak performance from large accelerators; this course runs inference on devices drawing a few milliwatts.'),
        ('MLOPS', 'MLOps deploys and monitors models on servers; this course embeds the model in devices that may have no connection.'),
        ('ROB', 'Robotics treats perception, localization and motion as a whole; this course makes the robot\'s model run in real time.'),
    ],
    uygulamalar=[
        ('Wake words', 'An always-listening model in speakers and phones.'),
        ('Smart cameras', 'Object detection without sending images to the cloud.'),
        ('Wearables', 'Fall, step and heart rhythm analysis on a watch.'),
        ('Predictive maintenance', 'Catching fault signs in motor vibration.'),
        ('On-phone AI', 'Photo enhancement, offline translation.'),
        ('Farming and environment', 'Sound and pest detection on battery sensors.'),
    ],
    araclar=['TensorFlow Lite', 'ONNX Runtime', 'ExecuTorch', 'Edge Impulse', 'CMSIS-NN', 'Arduino', 'NVIDIA Jetson'],
    veriler=['Speech Commands', 'Visual Wake Words', 'MNIST', 'CIFAR-10', 'ImageNet', 'MLPerf Tiny'],
    araclar_not='Success is not measured by accuracy alone: model size, peak memory, latency and energy go in the same table.',
    yanilgilar=[
        ('Models are trained on the small device.', 'Training is mostly done on a server; only inference runs on the device.'),
        ('Quantization always ruins accuracy.', '8-bit quantization costs most models very little accuracy; quantization-aware training reduces the loss further.'),
        ('Fewer parameters means a faster model.', 'Speed depends on memory access, operation types and hardware support; parameter count is not enough.'),
        ('Embedded AI is only needed without internet.', 'For privacy, latency and energy, on-device processing is preferred even when a connection exists.'),
    ],
    meslekler=['Embedded software engineer', 'Edge AI engineer', 'Machine learning engineer',
               'Hardware-software co-designer', 'IoT solutions architect'],
    sonra=('Embedded AI connects deep learning to hardware: from here you move on to robotics, autonomous vehicles and '
           'Internet of Things applications. For more depth in hardware, accelerator design and compilers come next; '
           'on the software side, MLOps and updating fleets of devices.'),
    kaynaklar=[
        'Warden and Situnayake, <em>TinyML</em>, O\'Reilly, 2019.',
        'Sze, Chen, Yang and Emer, <em>Efficient Processing of Deep Neural Networks</em>, Morgan &amp; Claypool, 2020.',
        'Han, Mao and Dally, "Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding", <em>ICLR</em>, 2016.',
        'Howard et al., "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications", <em>arXiv:1704.04861</em>, 2017.',
        'Hinton, Vinyals and Dean, "Distilling the Knowledge in a Neural Network", <em>arXiv:1503.02531</em>, 2015.',
    ],
    islenenler=[
        'Embedded hardware: MCUs, memory and energy budgets',
        'Sensor data collection and preprocessing',
        'Small neural networks and efficient architectures',
        'Post-training quantization',
        'Quantization-aware training',
        'Pruning and sparse networks',
        'Knowledge distillation',
        'Model conversion: TensorFlow Lite and ONNX',
        'Inference on microcontrollers: TFLite Micro, CMSIS-NN',
        'Accelerators: NPUs, DSPs and the Edge TPU',
        'Measuring latency, memory, energy; MLPerf Tiny',
        'On-device learning and over-the-air model updates',
    ],
    beceriler=['converting models with TensorFlow Lite', 'applying 8-bit quantization', 'deploying a model to Arduino', 'an end-to-end project in Edge Impulse', 'measuring latency, memory and energy'],
    hazirlik=[
        ('Can you train a convolutional network and report its validation accuracy?', '@DO'),
        ('Can you write C code with pointers and without dynamic memory allocation?', 'A C programming course'),
        ('Can you flash a program to a microcontroller and read data from a sensor?', 'A microprocessors course and an Arduino starter kit'),
        ('Can you explain how a number is represented as an 8-bit integer?', 'Binary numbers and fixed point from digital design'),
    ],
    riskler=[
        ('The hidden cost of shrinking', 'Quantization and pruning barely move average accuracy, yet rare classes and minority groups can lose far more.'),
        ('Devices that cannot be updated', 'A faulty or vulnerable model spread over thousands of devices in the field is hard to recall.'),
        ('Unnoticed surveillance', 'Always-listening microphones and cameras can monitor bystanders unawares, even when data stays on the device.'),
        ('Model theft', 'The model file on a device can be read and copied, and reverse engineering opens it to adversarial attacks.'),
    ],
)
