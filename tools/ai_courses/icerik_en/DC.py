# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 31 slides: Linear Algebra — vectors and matrices, linear maps, '
             'eigenvalues, SVD, why AI needs it, history and neighboring courses.'),
    gundem=['Vectors and matrices', 'Linear systems', 'Eigenvalues', 'SVD and PCA', 'Where in AI', 'Neighboring courses'],
    tanim=('Linear algebra studies vectors, matrices and <b>linear transformations</b>. In AI and data courses almost '
           'everything is a vector: an image, a word, a user. A neural network layer is, to a large extent, a matrix '
           'multiplication.'),
    tarihce=[
        ('1844', 'Grassmann sets out the idea of a multidimensional vector space systematically for the first time.'),
        ('1858', 'Cayley treats matrices as algebraic objects in their own right; matrix multiplication is defined.'),
        ('1901', 'Pearson finds the lines and planes that best fit data: principal component analysis (PCA).'),
        ('1936', 'Eckart and Young show that the SVD gives the best low-rank approximation of a matrix.'),
        ('1965', 'Golub and Kahan give a numerically stable way to compute the SVD on a computer.'),
        ('1979', 'BLAS is published: the basic matrix operations beneath today\'s scientific and AI libraries.'),
    ],
    kavramlar=[
        ('Vectors and spaces', 'Turning data into a point in many dimensions.'),
        ('Matrix multiplication', 'Applying a transformation or a network layer.'),
        ('Inner product and norm', 'Measuring similarity (cosine) and distance.'),
        ('Rank and basis', 'How many independent directions the data really spans.'),
        ('Linear systems', 'Ax = b; the least squares solution.'),
        ('Eigenvalues, eigenvectors', 'Vectors whose direction a map leaves unchanged.'),
        ('SVD', 'Splitting any matrix into rotate, scale, rotate.'),
        ('Projection', 'The closest point to a vector in a subspace.'),
    ],
    akis=[('Vectorize\ndata', 'features,\nembeddings'), ('Stack into\na matrix', 'samples ×\nfeatures'), ('Transform', 'weight\nmatrix'),
          ('Decompose', 'eigen, SVD'), ('Interpret', 'dim. reduction,\nsimilarity')],
    akis_ornek=('<b>Example:</b> In face recognition each face image is a long vector of pixels. The faces are stacked '
                'into a matrix, the mean is subtracted, SVD finds a few most important directions (eigenfaces), and each '
                'face is represented and compared by its weights on those few directions.'),
    onkosul_ek=[
        ('High school mathematics', 'solving equations, functions and the coordinate plane', None),
        ('Programming', 'arrays and loops: trying matrix operations in code', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('OPT', 'Optimization searches for the best values; linear algebra supplies the gradients, Hessians and system solves used in that search.'),
        ('OI', 'Probability measures uncertainty; linear algebra represents and decomposes the data and the covariance matrix.'),
        ('MO', 'ML learns a model from data; linear algebra is the language of the computation inside that model and learns nothing itself.'),
        ('BGR', 'Computer graphics applies 3D transformation matrices; this course gives the general theory of those matrices.'),
    ],
    uygulamalar=[
        ('Neural networks', 'Layer = matrix product plus activation.'),
        ('PCA', 'Dimensionality reduction and visualization.'),
        ('Recommender systems', 'Factorizing the user-item matrix.'),
        ('Word embeddings', 'Similar meaning = nearby vectors.'),
        ('PageRank', 'Dominant eigenvector of the link matrix.'),
        ('Image processing', 'Transforms, compression and filters.'),
    ],
    araclar=['NumPy', 'SciPy (scipy.linalg)', 'PyTorch', 'MATLAB', 'GNU Octave', 'LAPACK and BLAS'],
    veri_baslik='Classic example problems',
    veriler=['Line fitting by least squares', 'Eigenfaces', 'PageRank eigenvector', 'Image compression with SVD',
             'Netflix Prize matrix factorization', 'Markov chain steady state'],
    araclar_not='Matrix operations are not coded by hand: they run on <b>LAPACK and BLAS</b>, the product of decades of work, which NumPy and PyTorch also call.',
    yanilgilar=[
        ('Linear algebra is just solving equations.', 'Its real power is understanding transformations and decompositions: PCA, SVD and embeddings are built on them.'),
        ('Computing the inverse and multiplying is the right way.', 'In practice you do not invert; you solve with LU, QR or Cholesky, which is faster and more stable.'),
        ('High-dimensional space behaves like 3D.', 'In high dimensions points sit at similar distances from each other; intuition misleads (curse of dimensionality).'),
        ('With libraries around, theory is unnecessary.', 'Rank deficiency, ill-conditioning and shape errors make sense only if you know the theory.'),
    ],
    meslekler=['Machine learning engineer', 'Data scientist', 'Computer graphics developer', 'Numerical computing specialist'],
    sonra=('Linear algebra is a prerequisite for almost every course in the guide. After it you can move comfortably to '
           'optimization, machine learning, neural networks and computer graphics. Numerical linear algebra and GPU '
           'programming teach how to do the same computations fast at scale.'),
    kaynaklar=[
        'Strang, <em>Introduction to Linear Algebra</em>, 6th ed., Wellesley-Cambridge Press, 2023.',
        'Strang, <em>Linear Algebra and Learning from Data</em>, Wellesley-Cambridge Press, 2019.',
        'Trefethen and Bau, <em>Numerical Linear Algebra</em>, SIAM, 1997.',
        'Deisenroth, Faisal and Ong, <em>Mathematics for Machine Learning</em>, Cambridge University Press, 2020.',
    ],
    islenenler=[
        'Vectors, linear combinations and dot products',
        'Linear systems and Gaussian elimination',
        'Matrix operations, inverses and LU factorization',
        'Vector spaces and the four fundamental subspaces',
        'Linear independence, basis, dimension and rank',
        'Orthogonality, projections and least squares',
        'Gram-Schmidt and QR factorization',
        'Determinants and their properties',
        'Eigenvalues, eigenvectors and diagonalization',
        'Symmetric and positive definite matrices',
        'Singular value decomposition (SVD) and PCA',
        'Linear transformations and change of basis',
    ],
    beceriler=[
        'matrix computation with NumPy',
        'solving systems with scipy.linalg',
        'dimensionality reduction with SVD',
        'least squares fitting',
        'writing short proofs',
    ],
    hazirlik=[
        ('Can you solve a system of two equations in two unknowns by elimination?', 'Systems of equations from high school math'),
        ('Can you find the distance between two points in the plane?', 'Coordinate geometry from high school math'),
        ('Can you find an angle of a right triangle with sine and cosine?', 'High school trigonometry'),
        ('Can you multiply two Python lists element by element in a loop and sum them?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('Ill-conditioning', 'With a large condition number, a tiny input error is magnified many times; the answer fills up with meaningless digits.'),
        ('The normal equations trap', 'Forming AᵀA for least squares squares the condition number; solving with QR or SVD is safer.'),
        ('Silent shape errors', 'NumPy broadcasting combines mismatched shapes without an error; the result is wrong but looks fine.'),
        ('Misreading PCA', 'On unscaled features PCA favors the variable with the largest units; a component is not always a meaningful factor.'),
    ],
)
