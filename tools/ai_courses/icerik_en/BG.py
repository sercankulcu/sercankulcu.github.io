# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 18 slides: Computer Vision — recognition, object detection, '
             'segmentation, camera geometry, how it differs from image processing.'),
    gundem=['Meaning from images', 'Features', 'Recognition and detection', 'Cameras and 3D', 'Video and motion', 'Related courses'],
    tanim=('Computer vision studies how to <b>extract meaning</b> from an image or video: which objects are there, where they '
           'are, what 3D structure the scene has. The input is an image but the output is not; it is a label, a box, a mask '
           'or depth. Transforming the image is the job of image processing.'),
    tarihce=[
        ('1963', 'Larry Roberts\'s PhD thesis recovers 3D blocks from line drawings: the field\'s first work.'),
        ('1966', 'MIT\'s "Summer Vision Project" expects to solve vision in one summer; it does not.'),
        ('1982', 'Marr\'s book Vision appears, describing vision as a layered computational process.'),
        ('1999', 'Lowe introduces SIFT features: local point matching invariant to scale and rotation.'),
        ('2001', 'Viola and Jones publish a real-time face detector; it ships in digital cameras.'),
        ('2012', 'AlexNet wins ImageNet by a wide margin; the deep learning era in vision begins.'),
    ],
    kavramlar=[
        ('Local features', 'Corners and keypoints: Harris, SIFT, ORB.'),
        ('Classification', 'One label for the whole image: "cat".'),
        ('Object detection', 'A box and label per object: YOLO, Faster R-CNN.'),
        ('Semantic segmentation', 'A class for every pixel: road, pedestrian, car.'),
        ('Camera model', 'Pinhole model, calibration, intrinsics and extrinsics.'),
        ('Multi-view geometry', 'Stereo, epipolar geometry, structure from motion.'),
        ('Motion and tracking', 'Optical flow; following an object frame to frame.'),
        ('Convolutional networks', 'CNNs and vision transformers (ViT).'),
    ],
    akis=[('Capture', 'camera,\nvideo'), ('Preprocess', 'image proc.\nsteps'), ('Extract\nfeatures', 'features,\nCNN'),
          ('Interpret', 'class, box,\ndepth'), ('Decide', 'brake, alarm,\ncount')],
    akis_ornek=('<b>Example:</b> A driver assistance system grabs a frame from the front camera, balances brightness, '
                'extracts features with a convolutional network and marks pedestrians with boxes; it also estimates their '
                'distance from a stereo camera. The output is not an image but the fact "pedestrian at 8 meters"; the system '
                'issues a brake warning accordingly.'),
    onkosul_ek=[
        ('Linear algebra', 'matrices, eigenvalues and projection: the language of camera geometry', None),
        ('Programming', 'array operations and using libraries in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Algorithms', 'search, matching and complexity: feature matching and tracking', '/teaching/algorithms/?lang=en'),
    ],
    ayrisma=[
        ('GI', 'In image processing both input and output are images; in computer vision the input is an image and the output is meaning: a label, a box, depth.'),
        ('DO', 'Deep learning is a general tool; vision uses it together with camera geometry, multi-view and motion knowledge.'),
        ('BGR', 'Graphics produces an image from a scene description; vision does the reverse, rebuilding the scene from the image.'),
        ('OT', 'Pattern recognition classifies any kind of measurement; vision treats classification together with spatial structure, position and 3D.'),
    ],
    uygulamalar=[
        ('Autonomous driving', 'Detecting lanes, pedestrians and traffic signs.'),
        ('Face recognition', 'Phone unlock, access control.'),
        ('Retail', 'Checkout-free stores, shelf monitoring.'),
        ('Augmented reality', 'Locating the camera and adding objects to the scene.'),
        ('Industry', 'Spotting defective products and removing them from the line.'),
        ('Sports analytics', 'Tracking players and the ball, statistics.'),
    ],
    araclar=['OpenCV', 'PyTorch / torchvision', 'Ultralytics YOLO', 'Detectron2', 'COLMAP', 'Open3D'],
    veriler=['ImageNet', 'COCO', 'PASCAL VOC', 'KITTI', 'Cityscapes', 'ADE20K'],
    araclar_not='Unlike image processing, vision needs <b>many labeled images</b>; in COCO the box and mask of every object were drawn by hand.',
    yanilgilar=[
        ('Computer vision is another name for image processing.', 'Image processing transforms the image; vision extracts meaning from it. Vision uses image processing as a first step.'),
        ('Vision is a solved problem.', 'Networks still fail noticeably under lighting, weather or cameras that differ from the training data.'),
        ('Vision is just deep learning.', 'Calibration, stereo, SLAM and 3D reconstruction rest largely on geometry.'),
        ('A model "sees" an object the way a human does.', 'Networks can over-rely on texture and context; a small pixel change can flip a decision.'),
    ],
    meslekler=['Computer vision engineer', 'Autonomous systems engineer', 'AR/VR developer', 'Robotics perception engineer', 'Researcher'],
    sonra=('Computer vision is the center of the third part: robotics, biometrics, medical image processing and remote sensing '
           'apply its methods to their own domains. To go deeper, continue with deep learning and generative models; on the '
           'geometry side, with computer graphics and robotics.'),
    kaynaklar=[
        'Szeliski, <em>Computer Vision: Algorithms and Applications</em>, 2nd ed., Springer, 2022.',
        'Hartley and Zisserman, <em>Multiple View Geometry in Computer Vision</em>, 2nd ed., Cambridge University Press, 2004.',
        'Prince, <em>Computer Vision: Models, Learning, and Inference</em>, Cambridge University Press, 2012.',
        'Marr, <em>Vision</em>, W. H. Freeman, 1982.',
    ],
    islenenler=[
        'Image formation and the camera model',
        'Filters and edge detection (image processing review)',
        'Local features: corners, SIFT, ORB',
        'Feature matching and RANSAC',
        'Homographies and panorama stitching',
        'Camera calibration and stereo vision',
        'Structure from motion and multi-view geometry',
        'Optical flow and object tracking',
        'Classification with convolutional networks',
        'Object detection: the R-CNN family, YOLO',
        'Semantic and instance segmentation',
        'Vision-language models and current trends',
    ],
    beceriler=['OpenCV', 'using and fine-tuning pretrained models in PyTorch', 'camera calibration', 'preparing labeled data',
               'evaluating with IoU and mAP'],
    hazirlik=[
        ('Can you explain matrix multiplication, inverses and eigenvalues?', '@DC'),
        ('Do you know that an image is a matrix of pixels, and what convolution does?', '@GI'),
        ('Can you explain how a neural network is trained with a loss and gradient descent?', '@YSA'),
        ('Can you work with NumPy arrays in Python?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('Face recognition and surveillance', 'Identifying people in a crowd can turn into tracking without consent; many countries restrict its use in public spaces.'),
        ('Unequal performance', 'Error rates can be markedly higher for skin tones and age groups that are under-represented in the training data.'),
        ('Adversarial examples', 'A small sticker the human eye ignores can make a model read a stop sign as a different sign.'),
        ('Safety-critical failures', 'In self-driving, a single missed pedestrian is a cost that average accuracy does not show.'),
    ],
)
