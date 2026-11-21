# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 17 slides: Image Processing — pixel operations, filters, edge detection, '
             'segmentation, compression, how it differs from computer vision.'),
    gundem=['What is an image?', 'Enhancement', 'Filters and convolution', 'Edges and segmentation', 'Compression', 'Related courses'],
    tanim=('Image processing studies methods that take an image and turn it into <b>a new image</b> or into regions: '
           'reducing noise, boosting contrast, finding edges and object boundaries. Both input and output are images; '
           'understanding what is in the image is the job of computer vision.'),
    tarihce=[
        ('1920s', 'The Bartlane system sends digitally coded newspaper photos across the Atlantic by cable.'),
        ('1957', 'Russell Kirsch makes the first digitally scanned photo: a 176×176-pixel image of his infant son.'),
        ('1964', 'JPL corrects Ranger 7\'s lunar images by computer; digital image processing is born.'),
        ('1979', 'Otsu publishes his method for picking a threshold from the histogram; still the most used thresholding.'),
        ('1986', 'The Canny edge detector appears: noise-robust, thin and continuous edges.'),
        ('1992', 'The JPEG standard is adopted; DCT-based lossy compression becomes the common language of photos.'),
    ],
    kavramlar=[
        ('Pixels and channels', 'An image is a matrix of numbers; color has three channels.'),
        ('Histogram', 'Brightness distribution; contrast via histogram equalization.'),
        ('Spatial filter', 'Convolution with neighboring pixels: blurring, sharpening.'),
        ('Frequency domain', '2D Fourier transform; filtering periodic noise.'),
        ('Edge detection', 'Brightness jumps via gradient, Sobel and Canny.'),
        ('Thresholding', 'Separating foreground from background; Otsu\'s method.'),
        ('Morphology', 'Erosion and dilation: cleaning up binary shapes.'),
        ('Segmentation', 'Splitting an image into regions: region growing, watershed.'),
    ],
    akis=[('Acquire', 'camera,\nscanner'), ('Preprocess', 'noise,\ncontrast'), ('Transform', 'filter,\nFourier'),
          ('Segment', 'threshold,\nedge, region'), ('Image\noutput', 'clean image\nor mask')],
    akis_ornek=('<b>Example:</b> An old scanned document is first cleaned of specks with a median filter, its contrast is '
                'boosted by histogram equalization, it is binarized with Otsu\'s threshold, and the letters are repaired with '
                'morphological operations. The output is a clean image; reading the letters is the job of computer vision.'),
    onkosul_ek=[
        ('Linear algebra and calculus', 'matrix operations, derivatives and gradients: the language of filters and edges', None),
        ('Programming', 'loops over 2D arrays in Python or C', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Data Structures', 'queues and union-find: region growing and connected-component labeling', '/teaching/data-structures/?lang=en'),
    ],
    ayrisma=[
        ('BG', 'In image processing both input and output are images; in computer vision the input is an image and the output is meaning: a label, a box, depth.'),
        ('SSI', 'Signal processing works with a 1D time signal; image processing carries the same convolution and Fourier tools to two dimensions.'),
        ('BGR', 'Graphics produces an image from a scene description; image processing takes an existing image and transforms it.'),
        ('TGI', 'Medical image processing applies this course\'s methods to medical images such as CT and MRI, under clinical constraints.'),
    ],
    uygulamalar=[
        ('Photo editing', 'Brightness, sharpness, noise reduction.'),
        ('Document scanning', 'Deskewing, converting to black and white.'),
        ('Compression', 'JPEG, PNG and video coding.'),
        ('Industrial inspection', 'Isolating scratches and stains on products.'),
        ('Microscopy', 'Segmenting and counting cells.'),
        ('Preprocessing', 'Clean input for vision and medical models.'),
    ],
    araclar=['OpenCV', 'scikit-image', 'Pillow', 'ImageJ / Fiji', 'MATLAB Image Processing Toolbox', 'GIMP'],
    veri_baslik='Classic test images and datasets',
    veriler=['USC-SIPI test images', 'Kodak image set', 'BSDS500 (Berkeley segmentation)', 'DIV2K (super-resolution)', 'Cameraman and Peppers'],
    araclar_not='In image processing <b>a single image</b> is often enough: the method is defined in advance, not learned from data. Large labeled datasets are what computer vision needs.',
    yanilgilar=[
        ('Image processing and computer vision are the same thing.', 'Image processing transforms the image; vision extracts meaning from it. One is a step before the other.'),
        ('Sharpening brings back lost detail.', 'Sharpening accentuates existing edges; detail that was never recorded does not come back.'),
        ('Deep learning does everything now.', 'Classical methods are still essential in calibration, compression, preprocessing and fast industrial inspection.'),
        ('Enlarging an image increases its resolution.', 'Interpolation creates new pixels but no new information; the image just gets bigger.'),
    ],
    meslekler=['Image processing engineer', 'Embedded vision engineer', 'Quality control systems engineer', 'Biomedical imaging specialist'],
    sonra=('Image processing is the common first step for every course that works with images. To extract meaning from images, '
           'move on to computer vision; for applications, to medical image processing or remote sensing. '
           'In the opposite direction, computer graphics studies how to produce images.'),
    kaynaklar=[
        'Gonzalez and Woods, <em>Digital Image Processing</em>, 4th ed., Pearson, 2018.',
        'Jain, <em>Fundamentals of Digital Image Processing</em>, Prentice Hall, 1989.',
        'Burger and Burge, <em>Digital Image Processing: An Algorithmic Introduction</em>, 3rd ed., Springer, 2022.',
        'Canny, "A Computational Approach to Edge Detection", <em>IEEE Transactions on Pattern Analysis and Machine Intelligence</em> 8(6), 1986.',
    ],
    islenenler=[
        'Image formation, sampling and quantization',
        'Point operations and histogram equalization',
        'Spatial filtering: smoothing and sharpening',
        'The 2D Fourier transform and frequency-domain filtering',
        'Image restoration: noise models, the Wiener filter',
        'Colour spaces and colour image processing',
        'Geometric transforms and interpolation',
        'Edge detection: gradients, Sobel, Canny',
        "Thresholding and Otsu's method",
        'Morphological operations',
        'Segmentation: region growing, watershed, labelling',
        'Image compression: the DCT and JPEG',
    ],
    beceriler=['building image pipelines with OpenCV', 'segmentation with scikit-image', 'designing filters and kernels',
               'interpreting histograms and spectra', 'measuring objects in ImageJ'],
    hazirlik=[
        ('Can you visit every element of a matrix with nested loops?', 'An intro programming course, then a short NumPy tutorial'),
        ('Can you explain what a partial derivative and a gradient are?', 'Derivatives and partial derivatives from calculus'),
        ('Can you multiply matrices and take a dot product?', '@DC'),
        ('Can you explain what the frequency components of a signal are?', '@SSI'),
    ],
    riskler=[
        ('Image forgery', 'The same tools can remove or add objects in a photo, and an edited image can be passed off as evidence.'),
        ('Corrupted evidence', 'Lossy JPEG and sharpening change detail in forensic or medical images; the original file must be kept.'),
        ('Invented detail', 'Super-resolution and denoising can produce detail that was never in the scene, and it may be taken as real.'),
        ('Hand-tuned thresholds', 'Thresholds and parameters picked by looking at one image fail silently when the lighting changes.'),
    ],
)
