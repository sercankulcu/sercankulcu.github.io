# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 34 slides: Information Theory — entropy, mutual information, '
             'compression, channel capacity, error-correcting codes, history, neighbours, overlaps.'),
    gundem=['Entropy', 'Compression', 'Channel capacity', 'Error-correcting codes', 'Measures in ML', 'Neighbouring courses'],
    tanim=('Information theory measures the information in a message by probability: an unlikely event carries more '
           'information, and the average information is called <b>entropy</b>. The course derives the limits on how far '
           'data can be compressed and how fast it can be sent reliably over a noisy channel.'),
    tarihce=[
        ('1928', 'Hartley proposes measuring information by the logarithm of the number of possible messages.'),
        ('1948', 'Shannon defines entropy and channel capacity in "A Mathematical Theory of Communication".'),
        ('1951', 'Kullback and Leibler publish a divergence measure between two probability distributions.'),
        ('1952', 'Huffman publishes the algorithm that builds the prefix code with minimum average length.'),
        ('1977', 'Lempel and Ziv publish the dictionary-based LZ77 compressor, ancestor of ZIP and PNG.'),
        ('1993', 'Turbo codes arrive: a practical code comes within about half a decibel of the Shannon limit.'),
    ],
    kavramlar=[
        ('Entropy', 'Average information per symbol of a source, in bits.'),
        ('Conditional entropy', 'Uncertainty left in one variable once the other is known.'),
        ('Mutual information', 'How much two variables tell about each other.'),
        ('KL divergence', 'Extra cost of coding one distribution with a code built for another.'),
        ('Cross-entropy', 'The most common loss function in classification.'),
        ('Source coding', 'Lossless compression: Huffman, arithmetic coding, LZ.'),
        ('Channel capacity', 'Highest rate that can pass reliably through a noisy channel.'),
        ('Error-correcting codes', 'Adding redundancy to detect and correct errors.'),
    ],
    akis=[('Source', 'message,\nprobabilities'), ('Compress', 'source\ncoding'), ('Protect', 'channel code,\nredundancy'),
          ('Transmit', 'noisy\nchannel'), ('Decode', 'fix errors,\ndecompress')],
    akis_ornek=('<b>Example:</b> A photo sent from a phone is first compressed with JPEG; the wireless channel code then '
                'adds controlled redundancy. Bits corrupted in the air are corrected with that redundancy at the receiver '
                'and the photo opens. Compression and protection look like opposites, yet both come from the same theory.'),
    onkosul_ek=[
        ('Discrete Mathematics', 'logarithms, sets, counting and binary representation', None),
        ('Algorithms', 'greedy algorithms and priority queues: building a Huffman code', '/teaching/algorithms/?lang=en'),
    ],
    ayrisma=[
        ('OI', 'Probability and statistics describe distributions and uncertainty; this course derives information content and transmission limits from them.'),
        ('SSI', 'Signal processing filters and transforms a signal; this course asks how much information it can carry and how fast.'),
        ('MO', 'ML uses cross-entropy as a loss function; this course explains where that measure comes from and what it means.'),
        ('UM', 'Generative models minimize KL divergence in training; this course studies the divergence itself and its link to code length.'),
    ],
    uygulamalar=[
        ('File compression', 'ZIP, gzip and PNG: lossless compression.'),
        ('Image and audio', 'JPEG and MP3: lossy compression.'),
        ('Mobile networks', 'Turbo codes in 4G, LDPC and polar codes in 5G.'),
        ('Data storage', 'Error-correcting codes in QR codes, CDs and SSDs.'),
        ('Machine learning', 'Cross-entropy loss, information gain in decision trees.'),
        ('Feature selection', 'The most informative features by mutual information.'),
    ],
    araclar=['Python', 'NumPy', 'SciPy', 'zlib', 'scikit-learn', 'MATLAB'],
    veri_baslik='Classic example problems',
    veriler=['Loaded die and coin toss', 'Binary symmetric channel', 'Entropy of English text', 'Building a Huffman tree',
             'Twenty questions game', 'Canterbury corpus'],
    araclar_not='Information theory is mostly done with proofs and calculation; code is written to measure entropy and to test compression ratios on real files.',
    yanilgilar=[
        ('Information is measured by the meaning of a message.', 'Shannon information ignores meaning; it measures how unexpected a message is, that is, its probability.'),
        ('A good program can shrink any file.', 'No lossless method shrinks every input; data cannot be compressed below its entropy.'),
        ('Error-free transmission over a noisy channel is impossible.', 'Below capacity the error probability can be made as small as desired (Shannon).'),
        ('KL divergence is a distance.', 'It is not symmetric and violates the triangle inequality: p to q and q to p give different values.'),
    ],
    meslekler=['Communications engineer', 'Compression and codec developer', 'Machine learning researcher',
               'Cryptography specialist', 'Data storage engineer'],
    sonra=('Information theory is the mathematical gateway to ML: cross-entropy, KL divergence and mutual information '
           'reappear in generative models, decision trees and representation learning. On the communications side, '
           'continue with digital signal processing and coding theory.'),
    kaynaklar=[
        'Cover and Thomas, <em>Elements of Information Theory</em>, 2nd ed., Wiley, 2006.',
        'MacKay, <em>Information Theory, Inference, and Learning Algorithms</em>, Cambridge University Press, 2003.',
        'Shannon, "A Mathematical Theory of Communication", <em>Bell System Technical Journal</em> 27, 1948.',
        'Shannon and Weaver, <em>The Mathematical Theory of Communication</em>, University of Illinois Press, 1949.',
    ],
)
