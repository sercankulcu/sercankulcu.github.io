# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 4 slides: Artificial Neural Networks — the artificial neuron, perceptron, '
             'multilayer networks, backpropagation, training, history and neighboring courses.'),
    gundem=['Artificial neuron', 'Perceptron', 'Multilayer networks', 'Backpropagation', 'Training and generalization', 'Neighboring courses'],
    tanim=('Artificial neural networks are models built by connecting, in layers, simple units that take a weighted sum and '
           'pass it through an activation function. Learning means <b>adjusting the weights</b> so as to reduce a loss '
           'function; the main tools for this are backpropagation and gradient descent.'),
    tarihce=[
        ('1943', 'McCulloch and Pitts propose the first artificial neuron model with threshold logic units.'),
        ('1949', 'Hebb suggests that connections between neurons that fire together grow stronger: the Hebbian rule.'),
        ('1957', 'Rosenblatt introduces the perceptron; its weights are tuned from examples.'),
        ('1969', 'Minsky and Papert show that a single-layer perceptron cannot solve problems such as XOR.'),
        ('1982', 'Hopfield publishes a recurrent network that recalls memories by minimizing energy.'),
        ('1986', 'Rumelhart, Hinton and Williams popularize backpropagation; multilayer networks become trainable.'),
    ],
    kavramlar=[
        ('Artificial neuron', 'Weighted sum of inputs, a bias and an output.'),
        ('Activation', 'Sigmoid, tanh, ReLU: adds nonlinearity to the network.'),
        ('Perceptron', 'Single-layer network that separates linearly separable classes.'),
        ('Multilayer network', 'Hidden layers learn nonlinear boundaries.'),
        ('Forward pass', 'Computing the prediction layer by layer from input to output.'),
        ('Backpropagation', 'Finding the gradient of every weight with the chain rule.'),
        ('Gradient descent', 'Moves the weights in small steps where the loss decreases.'),
        ('Regularization', 'Weight penalties and early stopping prevent overfitting.'),
    ],
    akis=[('Initialize\nweights', 'small random\nvalues'), ('Forward\npass', 'compute\nprediction'), ('Measure\nloss', 'error,\ncross-entropy'),
          ('Back-\npropagate', 'gradients'), ('Update', 'learning rate,\nepoch by epoch')],
    akis_ornek=('<b>Example:</b> A small network that reads handwritten digits takes a 28×28-pixel image as 784 inputs, '
                'passes it through a hidden layer and outputs probabilities for 10 classes. A wrong guess means a large loss; '
                'backpropagation computes each weight\'s share and gradient descent corrects the weights a little.'),
    onkosul_ek=[
        ('Calculus', 'derivatives, partial derivatives and the chain rule: the math of backpropagation', None),
        ('Programming', 'arrays, loops and functions in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('MO', 'ML covers many model families from decision trees to SVMs; this course focuses only on networks built from neurons.'),
        ('DO', 'Deep learning moves on to convolutional, recurrent and transformer architectures; this course builds the basic network and training they rest on.'),
        ('OPT', 'Optimization studies gradient methods in general; this course uses them to learn weights.'),
        ('EMO', 'Neuroevolution searches weights or architectures by evolution; this course learns weights by gradients and backpropagation.'),
    ],
    uygulamalar=[
        ('Digit recognition', 'Handwritten digits on ZIP codes and checks.'),
        ('Tabular data', 'Classification tasks such as credit risk or churn.'),
        ('Function approximation', 'Learning nonlinear relations from measurements.'),
        ('Control', 'Simple robot and process controllers.'),
        ('Signal classification', 'Detecting faults or motion from sensor data.'),
        ('Associative memory', 'Completing a corrupted pattern with a Hopfield network.'),
    ],
    araclar=['NumPy', 'PyTorch', 'Keras', 'scikit-learn (MLPClassifier)', 'TensorFlow Playground', 'MATLAB Deep Learning Toolbox'],
    veriler=['XOR problem', 'Iris', 'MNIST', 'Fashion-MNIST', 'Two spirals', 'CIFAR-10'],
    araclar_not='In this course, writing a network <b>by hand in NumPy</b> first is the best way to see what backpropagation really does.',
    yanilgilar=[
        ('Neural networks imitate the brain.', 'Biology is the inspiration, but the artificial neuron is a very crude model and its learning rule differs from the brain\'s.'),
        ('More neurons are always better.', 'A large network can memorize the training data; size is chosen with a validation set.'),
        ('Backpropagation is a separate learning method.', 'Backpropagation only computes the gradient; gradient descent updates the weights.'),
        ('Training gives the same result every time.', 'Random initialization and shuffling can lead to different local minima.'),
    ],
    meslekler=['Machine learning engineer', 'Deep learning engineer', 'Researcher', 'Embedded AI developer'],
    sonra=('This course is the gateway to deep learning: convolutional networks, recurrent networks and transformers are built '
           'on the ideas of neuron, loss and backpropagation introduced here. It also reinforces optimization and linear algebra.'),
    kaynaklar=[
        'Haykin, <em>Neural Networks and Learning Machines</em>, 3rd ed., Pearson, 2009.',
        'Bishop, <em>Neural Networks for Pattern Recognition</em>, Oxford University Press, 1995.',
        'Nielsen, <em>Neural Networks and Deep Learning</em>, Determination Press, 2015 (online book).',
        'Rumelhart, Hinton and Williams, "Learning representations by back-propagating errors", <em>Nature</em> 323, 1986.',
    ],
    islenenler=[
        'Biological and artificial neurons; McCulloch-Pitts',
        'Hebbian learning and the perceptron algorithm',
        'Adaline, least mean squares and the delta rule',
        'Linear separability and the XOR problem',
        'Multilayer networks and activation functions',
        'Backpropagation: computational graphs, chain rule',
        'Loss functions: squared error, cross-entropy',
        'Gradient descent, learning rate and momentum',
        'Weight initialization and vanishing gradients',
        'Generalization: regularization, early stopping',
        'Radial basis function networks',
        'Hopfield networks and self-organizing maps (SOM)',
    ],
    beceriler=['writing a network from scratch in NumPy', 'deriving backpropagation by hand', 'numerical gradient checking',
               'training networks in PyTorch and Keras', 'reading learning curves'],
    hazirlik=[
        ('Can you differentiate a composite function with the chain rule?', 'Derivatives and the chain rule from calculus'),
        ('Can you multiply a matrix by a vector and state the result\'s shape?', '@DC'),
        ('Can you do vectorized operations on NumPy arrays without loops?', 'An intro programming course, then a short NumPy tutorial'),
        ('Can you explain the difference between training and test error?', '@MO'),
    ],
    riskler=[
        ('Memorization and overfitting', 'A large network on a small dataset drives training error to zero and then fails on new examples; without a validation set you never see it.'),
        ('Shortcut learning', 'A network may learn traces of data collection instead of the real feature: a ruler in the photo, the background or a scanner tag.'),
        ('Unstable training', 'Poor initialization or a large learning rate makes the loss blow up; a result from a single random seed may not reproduce.'),
        ('Decisions without reasons', 'Weights do not read as rules; that is a serious problem where a justification is required, as in credit or medical decisions.'),
    ],
)
