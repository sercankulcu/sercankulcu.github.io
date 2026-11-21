# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 8 slides: Pattern Recognition — feature extraction, Bayesian decision '
             'theory, classifiers, clustering, history and neighboring courses.'),
    gundem=['Feature extraction', 'Bayes decisions', 'Classifiers', 'Clustering', 'Measuring performance', 'Neighboring courses'],
    tanim=('Pattern recognition studies how to decide which class an object belongs to by looking at a <b>feature vector</b> '
           'extracted from measurements. The course treats the chain from sensor to decision as a whole: preprocessing, '
           'feature selection, classifier design and error analysis.'),
    tarihce=[
        ('1936', 'Fisher publishes linear discriminant analysis; the Iris data from that paper is still the first example.'),
        ('1962', 'Hu introduces moment features invariant to translation, scale and rotation.'),
        ('1967', 'Cover and Hart show that the nearest neighbor rule\'s error is at most twice the Bayes error.'),
        ('1973', 'Duda and Hart publish the field\'s core textbook, "Pattern Classification and Scene Analysis".'),
        ('1991', 'Turk and Pentland build face recognition on PCA with eigenfaces.'),
        ('1998', 'LeCun et al. publish LeNet-5 and the MNIST handwritten digit dataset.'),
    ],
    kavramlar=[
        ('Feature vector', 'Measurements that represent an object: length, color, texture.'),
        ('Feature space', 'Each example is a point; classes are regions in this space.'),
        ('Bayesian decision theory', 'Choose the class with the largest posterior; minimum error.'),
        ('Decision boundary', 'The surface that splits feature space into class regions.'),
        ('Density estimation', 'Parametric (Gaussian) or nonparametric (Parzen).'),
        ('Nearest neighbor', 'Assign a new example to the class of the nearest labeled ones.'),
        ('Dimensionality reduction', 'Few but discriminative features with PCA and LDA.'),
        ('Confusion matrix', 'Shows which class is confused with which.'),
    ],
    akis=[('Sense', 'camera,\nmicrophone'), ('Preprocess', 'noise,\nnormalization'),
          ('Extract\nfeatures', 'discriminative\nmeasures'), ('Classify', 'decision rule'), ('Evaluate', 'error rate,\nconfusion')],
    akis_ornek=('<b>Example:</b> A mail sorting machine scans the postcode on an envelope, binarizes the image and splits it '
                'into digits, extracts shape features from each digit, decides which digit it is with nearest neighbor or an '
                'SVM, and sends misread envelopes to manual sorting.'),
    onkosul_ek=[
        ('Programming', 'arrays, loops and functions in Python or Java', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Linear Algebra', 'vectors, distances, eigenvalues: the language of PCA and LDA', None),
    ],
    ayrisma=[
        ('MO', 'ML studies learning algorithms in general; this course focuses on the design from measurement to class decision and on the Bayes error.'),
        ('BG', 'Computer vision tries to understand the scene in an image; this course treats class decisions from any kind of measurement.'),
        ('GI', 'Image processing enhances and transforms images, and the result is still an image; this course outputs a class label.'),
        ('BIO', 'Biometrics is an application of pattern recognition; this course teaches general decision methods, not person-specific ones.'),
    ],
    uygulamalar=[
        ('Handwriting recognition', 'Reading postcodes, bank checks and forms.'),
        ('Optical character recognition', 'Turning a scanned document into editable text.'),
        ('Face and fingerprint', 'Identity verification and identification.'),
        ('Industrial inspection', 'Rejecting defective products on the line.'),
        ('Medical diagnosis', 'Classifying ECGs, blood tests or tissue samples.'),
        ('Speaker recognition', 'Finding out who is speaking from the voice.'),
    ],
    araclar=['scikit-learn', 'NumPy', 'OpenCV', 'MATLAB Statistics and ML Toolbox', 'Weka', 'PRTools'],
    veriler=['Iris', 'MNIST', 'Optical Recognition of Handwritten Digits (UCI)', 'Wisconsin Breast Cancer', 'AT&amp;T (ORL) face dataset', 'EMNIST'],
    yanilgilar=[
        ('Pattern recognition is the old name for machine learning.', 'The two overlap heavily; pattern recognition is an engineering view that also covers sensing and feature design.'),
        ('Choosing the classifier is the key step.', 'In most problems <b>feature selection</b> decides success; a good classifier cannot rescue bad features.'),
        ('With the right features the error drops to zero.', 'If classes overlap, even the best decision errs as much as the Bayes error.'),
        ('The more features, the better.', 'As dimension grows, examples become sparse (the curse of dimensionality); useless features hurt performance.'),
    ],
    meslekler=['Image and signal processing engineer', 'Machine learning engineer', 'Biometrics specialist', 'Quality inspection systems engineer'],
    sonra=('Pattern recognition is the shared core of computer vision, speech recognition and biometrics. After this course '
           'you can move to a sensing area (vision, audio, biometrics) or go on to deep learning, which also learns the '
           'features from data.'),
    kaynaklar=[
        'Duda, Hart and Stork, <em>Pattern Classification</em>, 2nd ed., Wiley, 2001.',
        'Bishop, <em>Pattern Recognition and Machine Learning</em>, Springer, 2006.',
        'Theodoridis and Koutroumbas, <em>Pattern Recognition</em>, 4th ed., Academic Press, 2009.',
        'Fukunaga, <em>Introduction to Statistical Pattern Recognition</em>, 2nd ed., Academic Press, 1990.',
    ],
    islenenler=[
        'Recognition systems: sensing, features, decision',
        'Bayesian decision theory, risk and loss',
        'The normal distribution and discriminant functions',
        'Parameter estimation: maximum likelihood, Bayesian',
        'Nonparametric density estimation: Parzen windows',
        'Nearest-neighbour rule and distance measures',
        'Linear discriminants and the perceptron',
        'Support vector machines',
        'Feature extraction, selection, curse of dimensionality',
        'PCA and Fisher linear discriminant analysis (LDA)',
        'Evaluating and comparing classifiers',
        'Clustering and Gaussian mixture models',
    ],
    beceriler=['designing features from measurements', 'building a Bayes classifier', 'k-NN and SVM with scikit-learn',
               'extracting image features with OpenCV', 'error analysis with a confusion matrix'],
    hazirlik=[
        ('Can you explain the normal distribution, mean and covariance?', '@OI'),
        ('Can you explain Euclidean distance, eigenvalues and eigenvectors?', '@DC'),
        ('Can you find the minimum of a function by taking its derivative?', 'Derivatives and extrema from calculus'),
        ('Can you load and process a dataset with NumPy arrays in Python?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('Face recognition without consent', 'Face recognition enables covert tracking; Clearview AI was fined in several European countries for faces scraped from the internet.'),
        ('Error gaps between groups', 'In the Gender Shades study, commercial gender classifiers erred far more often on darker-skinned women than on lighter-skinned men.'),
        ('Treating all errors alike', 'If a missed cancer weighs the same as a false alarm, total error looks low while outcomes are dangerous; choose the loss matrix with care.'),
        ('Leakage in feature selection', 'Selecting features on the full dataset and then cross-validating makes the error look far lower than it really is.'),
    ],
)
