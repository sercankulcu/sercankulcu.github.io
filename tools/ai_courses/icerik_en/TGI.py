# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 20 slides: Medical Image Processing — imaging modalities, DICOM, '
             'segmentation, registration, diagnostic support, history and related courses.'),
    gundem=['Imaging modalities', 'DICOM and 3D volumes', 'Segmentation', 'Registration', 'Diagnostic support', 'Related courses'],
    tanim=('Medical image processing enhances, segments, measures and compares X-ray, CT, MRI and ultrasound images to support '
           '<b>diagnosis and treatment</b>. It applies image processing and computer vision methods under the constraints of '
           'little data, expensive labels and patient safety.'),
    tarihce=[
        ('1895', 'Röntgen discovers X-rays; the first medical image is an X-ray of his wife\'s hand.'),
        ('1972', 'Hounsfield\'s computed tomography (CT) scanner is introduced: cross-sections are obtained by computation.'),
        ('1973', 'Lauterbur publishes the first imaging paper using magnetic resonance, laying the foundation of MRI.'),
        ('1993', 'The DICOM 3.0 standard is published; devices from different vendors speak the same file format.'),
        ('2015', 'U-Net is published: an encoder-decoder network for segmentation with few labeled medical images.'),
        ('2018', 'The US FDA authorizes IDx-DR, which screens for diabetic retinopathy without a physician.'),
    ],
    kavramlar=[
        ('Imaging modalities', 'X-ray, CT, MRI, ultrasound, PET: each a different physics.'),
        ('DICOM', 'A standard that carries the image and patient data together.'),
        ('Voxels and volumes', 'CT and MRI are 3D; voxels instead of pixels.'),
        ('Denoising', 'Preserving quality in low-dose CT and in MRI.'),
        ('Segmentation', 'Outlining an organ, tumor or vessel.'),
        ('Registration', 'Aligning two images (before/after, CT/MRI).'),
        ('Computer-aided diagnosis (CAD)','The computer flags suspicious regions for the physician.'),
        ('Clinical evaluation', 'Sensitivity, specificity, Dice; comparison with physicians.'),
    ],
    akis=[('Image', 'CT, MRI,\nX-ray'), ('Preprocess', 'noise,\nnormalization'), ('Segment', 'organ,\nlesion'),
          ('Measure,\nclassify', 'volume,\nrisk'), ('Present', 'report,\nflags')],
    akis_ornek=('<b>Example:</b> Hundreds of slices from a lung CT scan are read as DICOM, the lung region is segmented and a '
                'network flags suspicious nodules. Registered against the previous scan, the growth in nodule volume is '
                'measured. The radiologist makes the final call; the system only draws attention.'),
    onkosul_ek=[
        ('Programming', 'working with multidimensional arrays in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Physics', 'basics of X-ray absorption and magnetic resonance', None),
        ('Intro to anatomy and physiology', 'recognizing organs and how they appear in images', None),
    ],
    ayrisma=[
        ('GI', 'Image processing provides the general methods; this course applies them to 3D medical volumes, with device physics and clinical constraints.'),
        ('BG', 'Vision works with millions of labeled photos; in medical imaging labels are scarce, need experts, and errors are costly.'),
        ('AYE', 'The ethics course treats explainability in general; this course uses it for physician trust and accountability.'),
        ('BIN', 'Bioinformatics looks at sequence and molecular data; medical image processing looks at images of organs and tissue.'),
    ],
    uygulamalar=[
        ('Radiology', 'Finding lung nodules and fractures.'),
        ('Oncology', 'Tumor segmentation, radiotherapy planning.'),
        ('Ophthalmology', 'Screening retinal images for retinopathy.'),
        ('Neurology', 'Lesion and volume measurement in brain MRI.'),
        ('Pathology', 'Counting cells in tissue sections.'),
        ('Surgery', 'Preoperative 3D models and navigation.'),
    ],
    araclar=['3D Slicer', 'ITK / SimpleITK', 'MONAI', 'nnU-Net', 'pydicom', 'NiBabel', 'ITK-SNAP'],
    veriler=['BraTS (brain tumor)', 'LIDC-IDRI (lung CT)', 'ChestX-ray14', 'CheXpert', 'Medical Segmentation Decathlon'],
    araclar_not='Medical datasets are <b>personal health data</b>: they cannot be shared without anonymization, ethics board approval and a data use agreement.',
    yanilgilar=[
        ('AI will soon replace radiologists.', 'Systems support narrow tasks; diagnosis, context and responsibility stay with the physician.'),
        ('High accuracy means clinical success.', 'For rare diseases sensitivity and specificity matter; performance may drop at another hospital.'),
        ('A medical image is an ordinary photo.', 'CT and MRI are often 3D, and pixel values carry physical meaning (Hounsfield units).'),
        ('Collecting lots of data is easy.', 'Labels take expert time, and the data is protected by privacy law.'),
    ],
    meslekler=['Medical imaging engineer', 'Biomedical software developer', 'Clinical AI researcher', 'Medical device regulatory specialist'],
    sonra=('Medical image processing is the most tightly regulated application of image processing and computer vision. From here '
           'you can move on to segmentation with deep learning, to clinical trust with explainable AI, or to the molecular '
           'level with bioinformatics.'),
    kaynaklar=[
        'Suetens, <em>Fundamentals of Medical Imaging</em>, 3rd ed., Cambridge University Press, 2017.',
        'Bankman (ed.), <em>Handbook of Medical Image Processing and Analysis</em>, 2nd ed., Academic Press, 2008.',
        'Ronneberger, Fischer and Brox, "U-Net: Convolutional Networks for Biomedical Image Segmentation", <em>MICCAI</em>, 2015.',
        'Litjens et al., "A Survey on Deep Learning in Medical Image Analysis", <em>Medical Image Analysis</em> 42, 2017.',
    ],
    islenenler=[
        'Imaging physics: X-ray, CT, MRI, ultrasound',
        'DICOM, NIfTI and medical image data',
        'Image reconstruction: filtered back-projection',
        'Denoising and image enhancement',
        'Classical segmentation: thresholds, regions, level sets',
        'Deep segmentation: U-Net and nnU-Net',
        'Rigid and deformable registration',
        'Atlas-based analysis and volumetry',
        'Classification and computer-aided diagnosis',
        'Learning from little data: augmentation, transfer',
        'Clinical validation: Dice, ROC, reader studies',
        'Regulation, privacy and clinical deployment',
    ],
    beceriler=['reading DICOM with pydicom', 'annotating images in 3D Slicer', 'training segmentation models with MONAI',
               'registration with SimpleITK', 'reporting Dice and ROC results'],
    hazirlik=[
        ('Can you apply filtering, thresholding and edge detection to an image?', '@GI'),
        ('Can you explain how a convolutional neural network is trained?', '@DO'),
        ('Can you compute and interpret sensitivity and specificity?', '@OI'),
        ('Can you slice a three-dimensional NumPy array in Python?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('Shortcut learning', 'A model can learn scanner labels or hospital markers instead of disease; this has been shown in chest X-ray models.'),
        ('Failure at another hospital', 'Performance drops with other scanners, protocols and patients; validation at a single site is not enough.'),
        ('Re-identification', 'DICOM headers hold identifiers and faces can be rebuilt from head MRI; anonymization is more than deleting a name.'),
        ('Automation bias', 'Clinicians may miss a lesion the model did not flag; a support tool can loosen human scrutiny.'),
    ],
)
