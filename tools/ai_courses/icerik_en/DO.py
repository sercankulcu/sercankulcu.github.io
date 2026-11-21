# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 5 slides: Deep Learning — representation learning, convolutional and '
             'recurrent networks, transformers, training techniques, history and neighboring courses.'),
    gundem=['Representation learning', 'Convolutional networks', 'Recurrent networks', 'Transformers', 'Training techniques', 'Neighboring courses'],
    tanim=('Deep learning studies how multilayer neural networks learn useful intermediate representations from raw data '
           '(pixels, audio, text) on their own, layer by layer. The key idea is <b>representation learning</b> instead of '
           'hand-designed features; big data, GPUs and good architectures make it possible.'),
    tarihce=[
        ('1997', 'Hochreiter and Schmidhuber propose the LSTM: a cure for vanishing gradients on long sequences.'),
        ('1998', 'LeCun et al.\'s LeNet-5 convolutional network recognizes handwritten digits.'),
        ('2006', 'Hinton et al. train deep belief networks with layer-wise pretraining; interest revives.'),
        ('2012', 'AlexNet, a convolutional network trained on GPUs, wins ImageNet by a wide margin.'),
        ('2015', 'He et al.\'s residual networks (ResNet) win ImageNet with 152 layers.'),
        ('2017', 'Vaswani et al. introduce the transformer architecture: attention only.'),
    ],
    kavramlar=[
        ('Representation learning', 'Layers learn ever more abstract features, from edges to objects.'),
        ('Convolution', 'Small filters slide over the image; weights are shared.'),
        ('Pooling', 'Shrinks spatial size, adds robustness to small shifts.'),
        ('Recurrent network', 'RNN and LSTM: process a sequence step by step, carrying a state.'),
        ('Attention', 'Each element weighs which other elements of the sequence to look at.'),
        ('Residual connection', 'A path that skips a layer; makes very deep networks trainable.'),
        ('Normalization', 'Batch and layer normalization stabilize training.'),
        ('Transfer learning', 'Adapting a model trained on big data to a new task.'),
    ],
    akis=[('Raw data', 'pixels, audio,\ntext'), ('Choose\narchitecture', 'CNN, RNN,\ntransformer'), ('Train on\nGPU', 'mini-batch,\nAdam'),
          ('Regularize', 'dropout,\naugmentation'), ('Fine-tune', 'transfer\nlearning')],
    akis_ornek=('<b>Example:</b> An app that recognizes plant diseases collects leaf photos, takes a ResNet pretrained on '
                'ImageNet, replaces its last layer with the disease classes and fine-tunes it on a GPU with data '
                'augmentation. No feature is defined by hand.'),
    onkosul_ek=[
        ('Calculus', 'multivariable derivatives and the chain rule', None),
        ('Programming', 'comfort with Python, NumPy and a deep learning library', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('YSA', 'ANN builds neurons, loss and backpropagation on small networks; this course covers deep architectures and the practice of training them.'),
        ('MO', 'Classic ML works with hand-designed features; deep learning learns features from raw data by itself.'),
        ('BG', 'Computer vision is the problem of understanding images; deep learning is a toolkit shared by vision, language and speech.'),
        ('UM', 'Generative models aim to sample from the data distribution; this course mostly focuses on discriminative, predictive networks.'),
    ],
    uygulamalar=[
        ('Image classification', 'Recognizing an object or a disease in a photo.'),
        ('Speech recognition', 'Turning an audio recording into text.'),
        ('Machine translation', 'Transformer-based translation systems.'),
        ('Object detection', 'Finding pedestrians and vehicles for a self-driving car.'),
        ('Protein structure', 'Predicting 3D structure from an amino acid sequence.'),
        ('Game playing', 'Atari and Go with deep reinforcement learning.'),
    ],
    araclar=['PyTorch', 'TensorFlow', 'Keras', 'JAX', 'Hugging Face', 'CUDA', 'TensorBoard'],
    veriler=['ImageNet', 'CIFAR-10/100', 'MNIST', 'COCO', 'LibriSpeech', 'Wikipedia text'],
    yanilgilar=[
        ('Deep learning is best for every problem.', 'On small tabular data, gradient-boosted trees are often better and cheaper.'),
        ('A deep network is a black box that cannot be inspected.', 'Tools such as gradient-based saliency maps and attention weights give partial explanations.'),
        ('Deep learning was invented in 2012.', 'The ideas are decades old; big data and GPUs brought the 2012 leap.'),
        ('More layers always mean better results.', 'Without residual connections and normalization, very deep networks may not train.'),
    ],
    meslekler=['Deep learning engineer', 'Computer vision engineer', 'Researcher', 'ML infrastructure engineer', 'Applied scientist'],
    sonra=('Deep learning is the most widely used tool on the map today: computer vision, natural language processing, speech '
           'recognition, generative models and deep reinforcement learning are built on it. On the systems side, GPU '
           'programming, embedded AI and MLOps teach how to speed these models up and take them to production.'),
    kaynaklar=[
        'Goodfellow, Bengio and Courville, <em>Deep Learning</em>, MIT Press, 2016.',
        'Zhang, Lipton, Li and Smola, <em>Dive into Deep Learning</em>, Cambridge University Press, 2023.',
        'Prince, <em>Understanding Deep Learning</em>, MIT Press, 2023.',
        'Chollet, <em>Deep Learning with Python</em>, 2nd ed., Manning, 2021.',
        'LeCun, Bengio and Hinton, "Deep learning", <em>Nature</em> 521, 2015.',
    ],
)
