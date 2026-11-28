# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 3 slides: Machine Learning — supervised and unsupervised learning, '
             'models and loss, generalization, evaluation, history and neighboring courses.'),
    gundem=['Types of learning', 'Model and loss', 'Generalization', 'Evaluation', 'Core algorithms', 'Neighboring courses'],
    tanim=('Machine learning studies algorithms that <b>learn from examples</b> without being explicitly programmed and '
           'generalize what they learn to new examples. In Mitchell\'s definition, a program learns if its performance on '
           'task T, measured by P, improves with experience E.'),
    tarihce=[
        ('1957', 'Rosenblatt introduces the perceptron, one of the first models to tune its weights from examples.'),
        ('1959', 'Samuel\'s checkers program improves by playing itself; the term "machine learning" spreads.'),
        ('1986', 'Quinlan publishes the ID3 decision tree; the same year backpropagation revives neural networks.'),
        ('1995', 'Cortes and Vapnik publish support vector machines (SVM).'),
        ('2001', 'Breiman introduces random forests: a vote among many trees.'),
        ('2012', 'AlexNet wins the ImageNet challenge by a wide margin; the deep learning era begins.'),
    ],
    kavramlar=[
        ('Supervised learning', 'Classification and regression from labeled examples.'),
        ('Unsupervised learning', 'Clustering and dimensionality reduction on unlabeled data.'),
        ('Model and hypothesis', 'The form and parameters of the function to be learned.'),
        ('Loss function', 'Measures how wrong a prediction is; training minimizes it.'),
        ('Generalization', 'Correct predictions on examples not seen in training.'),
        ('Overfitting', 'Memorizing the training data; the bias-variance tradeoff.'),
        ('Validation', 'Training, validation and test sets; cross-validation.'),
        ('Features', 'Turning raw data into numbers a model can use.'),
    ],
    akis=[('Collect\ndata', 'sample,\nlabels'), ('Prepare', 'cleaning,\nfeatures'), ('Train', 'minimize\nthe loss'),
          ('Evaluate', 'held-out\ntest set'), ('Deploy and\nmonitor', 'production,\ndata drift')],
    akis_ornek=('<b>Example:</b> A spam filter collects past messages and their labels, turns word counts into features, '
                'trains a logistic regression, measures accuracy on held-out test messages and classifies new incoming '
                'mail. No rules are written by hand; they are learned from data.'),
    onkosul_ek=[
        ('Programming', 'reading data, loops and functions in Python or Java', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Calculus', 'derivatives, partial derivatives and the chain rule: the language of gradient descent', None),
    ],
    ayrisma=[
        ('YZ', 'AI is the framework; ML focuses only on learning from data within it.'),
        ('VM', 'They share algorithms; ML aims to predict new examples, data mining to discover patterns in data.'),
        ('OI', 'Statistics emphasizes a model\'s meaning and uncertainty, ML its predictive performance.'),
        ('DO', 'Deep learning is a branch of ML; it learns features from raw data instead of hand-designing them.'),
    ],
    uygulamalar=[
        ('Spam filtering', 'Classifying emails by their content.'),
        ('Credit scoring', 'Predicting an applicant\'s risk of default.'),
        ('Recommendation', 'Products or content a user is likely to enjoy.'),
        ('Medical prediction', 'Estimating disease risk from patient data.'),
        ('Demand forecasting', 'Sales and inventory planning.'),
        ('Fraud detection', 'Catching unusual card transactions.'),
    ],
    araclar=['scikit-learn', 'pandas', 'NumPy', 'XGBoost', 'Weka', 'R'],
    veriler=['Iris', 'MNIST', 'UCI Machine Learning Repository', 'Titanic (Kaggle)', 'Adult (income)', 'Wine'],
    yanilgilar=[
        ('A more complex model is always better.', 'A complex model can memorize the training data (overfitting) and do worse on new data.'),
        ('Training accuracy shows success.', 'Success is measured on test data never used in training.'),
        ('More data solves every problem.', 'More biased or noisy data only multiplies the errors.'),
        ('The model learns cause and effect.', 'ML finds correlations; causation needs experiments or causal inference.'),
    ],
    meslekler=['Machine learning engineer', 'Data scientist', 'Researcher', 'MLOps engineer'],
    sonra=('Machine learning is the crossroads of the map: neural networks and reinforcement learning are its branches; '
           'MLOps, cybersecurity and bioinformatics apply its methods. After this course you can go deeper (neural '
           'networks, deep learning) or move on to an application area.'),
    kaynaklar=[
        'Mitchell, <em>Machine Learning</em>, McGraw-Hill, 1997.',
        'Bishop, <em>Pattern Recognition and Machine Learning</em>, Springer, 2006.',
        'Hastie, Tibshirani and Friedman, <em>The Elements of Statistical Learning</em>, 2nd ed., Springer, 2009.',
        'Alpaydın, <em>Introduction to Machine Learning</em>, 4th ed., MIT Press, 2020.',
        'Géron, <em>Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow</em>, 3rd ed., O\'Reilly, 2022.',
    ],
    islenenler=[
        'The learning problem; supervised and unsupervised learning',
        'Linear regression and gradient descent',
        'Logistic regression and classification',
        'Evaluation: train/test split, cross-validation',
        'Overfitting, regularization, bias-variance',
        'Decision trees',
        'Ensembles: random forests, gradient boosting',
        'Support vector machines and kernels',
        'k-nearest neighbors and naive Bayes',
        'Clustering: k-means, hierarchical clustering',
        'Dimensionality reduction: PCA',
        'Feature engineering and model selection',
    ],
    beceriler=['Python and NumPy', 'data preparation with pandas', 'scikit-learn', 'cross-validation', 'choosing the right metric',
               'reporting results with plots and tables'],
    hazirlik=[
        ('Can you take a derivative and a partial derivative?', 'Derivatives and the chain rule from calculus'),
        ('Can you multiply matrices and take a dot product?', '@DC'),
        ('Can you explain mean, variance and conditional probability?', '@OI'),
        ('Can you write loops and functions in Python and read a CSV file?', 'An intro programming course, then a short pandas tutorial'),
    ],
    riskler=[
        ('Biased data, biased decisions', 'Discrimination in historical data passes straight into the model: hiring or credit models can systematically exclude some groups.'),
        ('Data leakage', 'When test information leaks into training, a model looks flawless on paper and fails in the field.'),
        ('Privacy', 'Personal information in the training data can be extracted from the model; GDPR and similar laws limit how data may be used.'),
        ('Misplaced confidence', 'High accuracy collapses when the data distribution shifts, and the model looks just as confident on cases it does not know.'),
    ],
)
