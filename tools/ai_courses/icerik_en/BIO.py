# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 24 slides: Biometric Systems — enrollment, verification and '
             'identification, error rates, liveness detection, history, neighboring courses and overlaps.'),
    gundem=['Biometric traits', 'Verification, identification', 'Error rates', 'Spoofing', 'Privacy', 'Neighboring courses'],
    tanim=('Biometric systems recognize a person by <b>physical and behavioral traits</b> such as face, fingerprint, '
           'iris or voice. The course covers extracting a template from a sample, matching two templates and '
           'accepting or rejecting by a threshold; security and privacy are an inseparable part of that decision.'),
    tarihce=[
        ('1892', 'Galton publishes "Finger Prints": fingerprints are shown to be unique and permanent.'),
        ('1901', 'Scotland Yard starts using fingerprints with the Henry classification system.'),
        ('1991', 'Turk and Pentland publish eigenfaces for face recognition.'),
        ('1993', 'Daugman publishes his iris recognition method, the basis of today\'s iris systems.'),
        ('2013', 'Fingerprint sensors (Touch ID) start to spread in smartphones.'),
        ('2014', 'DeepFace and the deep networks after it approach human level in face verification.'),
    ],
    kavramlar=[
        ('Enrollment', 'Extracting a template from a person\'s sample and storing it.'),
        ('Template', 'The feature vector stored instead of the raw image.'),
        ('Verification (1:1)', '"Is this person who they claim to be?"'),
        ('Identification (1:N)', '"Which enrolled person is this?"'),
        ('FAR and FRR', 'False accept and false reject rates; the threshold trades them off.'),
        ('EER and DET curve', 'The point where both errors are equal; comparing systems.'),
        ('Liveness detection', 'Catching attacks with photos, masks or fake fingers.'),
        ('Multimodal biometrics', 'Combining face with voice, or fingerprint with iris.'),
    ],
    akis=[('Capture', 'camera,\nsensor'), ('Preprocess', 'quality,\nalignment'), ('Features', 'template or\nembedding'),
          ('Match', 'similarity\nscore'), ('Decide', 'threshold:\naccept/reject')],
    akis_ornek=('<b>Example:</b> A phone\'s face unlock captures the face with an infrared camera, detects and aligns it, '
                'extracts an embedding with a deep network, measures similarity to the enrolled template and unlocks '
                'if the score passes the threshold. A liveness check stops a photo from unlocking it.'),
    onkosul_ek=[
        ('Programming', 'reading images and working with vectors in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Data Structures', 'indexing to scan millions of templates quickly in 1:N search', '/teaching/data-structures/?lang=en'),
    ],
    ayrisma=[
        ('OT', 'Pattern recognition assigns a sample to classes; biometrics recognizes people, with as many classes as people, always growing.'),
        ('BG', 'Computer vision tries to understand everything in an image; biometrics is a narrow, security-focused task that asks only identity.'),
        ('SGY', 'AI in cybersecurity catches attacks; biometrics is authentication itself and must resist spoofing attacks.'),
        ('KSI', 'Speech recognition finds what was said; speaker recognition, a biometric, finds who said it.'),
    ],
    uygulamalar=[
        ('Phone unlock', 'Unlocking devices by face and fingerprint.'),
        ('Border control', 'Automated gates using e-passport photos.'),
        ('Forensics', 'Searching crime-scene prints in databases.'),
        ('Banking', 'Remote customer verification, payment approval.'),
        ('Access control', 'Building entry and staff time records.'),
        ('Civil registration', 'Preventing duplicates in national ID systems.'),
    ],
    araclar=['OpenCV', 'dlib', 'InsightFace', 'NIST NBIS', 'SpeechBrain'],
    veriler=['LFW (Labeled Faces in the Wild)', 'VGGFace2', 'FVC2004 (fingerprint)', 'CASIA-Iris', 'VoxCeleb (speaker)'],
    araclar_not='Biometric data is <b>personal data</b>: it falls under KVKK and GDPR; some face datasets were withdrawn for this reason.',
    yanilgilar=[
        ('Biometric systems make no mistakes.', 'Every system makes false accepts and false rejects; the threshold chooses between them.'),
        ('Biometric data can be changed like a password.', 'A face or fingerprint cannot be changed; a leaked template is a permanent risk, so templates need protection.'),
        ('Accuracy is the same for everyone.', 'Performance can vary with age, skin tone and sensor; evaluation is done per group.'),
        ('A match means the person is there.', 'Presentation attacks use photos, masks or recorded voice; liveness detection is needed.'),
    ],
    meslekler=['Biometrics engineer', 'Computer vision engineer', 'Identity and access management specialist', 'Digital forensics specialist'],
    sonra=('Biometrics is where pattern recognition and vision meet security. From here you can move to deep face '
           'recognition and speaker recognition, to cybersecurity through spoof detection, or to explainable AI '
           'and ethics through questions of fairness and privacy.'),
    kaynaklar=[
        'Jain, Ross and Nandakumar, <em>Introduction to Biometrics</em>, Springer, 2011.',
        'Li and Jain (eds.), <em>Handbook of Face Recognition</em>, 2nd ed., Springer, 2011.',
        'Maltoni, Maio, Jain and Feng, <em>Handbook of Fingerprint Recognition</em>, 3rd ed., Springer, 2022.',
        'Daugman, "How Iris Recognition Works", <em>IEEE Transactions on Circuits and Systems for Video Technology</em> 14(1), 2004.',
    ],
)
