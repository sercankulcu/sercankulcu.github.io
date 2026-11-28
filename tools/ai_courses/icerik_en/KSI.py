# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 19 slides: Speech Recognition and Audio Processing — spectrograms, '
             'MFCC, acoustic and language models, speaker recognition, related courses.'),
    gundem=['Digitizing sound', 'Spectrogram and MFCC', 'Acoustic model', 'Language model', 'Speakers and events', 'Related courses'],
    tanim=('Speech recognition and audio processing study how to analyze the sound wave from a microphone and extract words, '
           'the speaker\'s identity or events in the environment. Sound is first converted to time-frequency features; '
           'the <b>acoustic model</b> and the language model together find the most likely text.'),
    tarihce=[
        ('1952', 'Bell Labs\' Audrey system recognizes digits spoken by a single speaker.'),
        ('1962', 'IBM Shoebox is demonstrated, recognizing sixteen spoken English words, including the ten digits.'),
        ('1970s', 'In DARPA-funded projects, Carnegie Mellon\'s Harpy system recognizes about a thousand words.'),
        ('1980s', 'Hidden Markov models (HMMs) become the standard method of speech recognition.'),
        ('2012', 'Deep neural networks begin replacing Gaussian mixtures in acoustic modeling.'),
        ('2022', 'OpenAI\'s Whisper is trained end to end on about 680,000 hours of multilingual data.'),
    ],
    kavramlar=[
        ('Sampling', 'Measuring the sound wave thousands of times per second.'),
        ('Spectrogram', 'A time-frequency image from the short-time Fourier transform.'),
        ('MFCC', 'Features adapted to how the human ear perceives frequency.'),
        ('Acoustic model', 'Predicts the sound unit (phoneme) from a stretch of audio.'),
        ('Language model', 'Says which word sequence is more likely.'),
        ('Decoding', 'Finding the most likely word sequence with beam search.'),
        ('Speaker recognition', 'Verifying or identifying whose voice it is.'),
        ('Word error rate', 'WER: the rate of insertion, deletion and substitution errors.'),
    ],
    akis=[('Record', 'microphone,\n16 kHz'), ('Extract\nfeatures', 'spectrogram,\nMFCC'), ('Acoustic\nmodel', 'phoneme\nprobability'),
          ('Decode', 'lang. model,\nbeam search'), ('Text', 'measured\nby WER')],
    akis_ornek=('<b>Example:</b> A voice assistant records the question "what\'s the weather tomorrow" at 16 kHz, computes a '
                'spectrogram from 25 ms frames, the acoustic model gives phoneme probabilities for each frame, and the language '
                'model turns them into the most likely sentence. The text is passed to NLP for meaning.'),
    onkosul_ek=[
        ('Calculus', 'complex numbers, integrals and an introduction to Fourier series', None),
        ('Programming', 'array operations and reading audio from files in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('SSI', 'Signal processing filters and transforms any kind of signal; this course focuses on features and models specific to audio and speech.'),
        ('NLP', 'NLP assumes it already has text; this course obtains that text from the sound wave and also handles audio events.'),
        ('DO', 'Deep learning offers general network architectures; this course adapts them to the time-frequency structure of sound and the alignment problem.'),
        ('BIO', 'Biometrics uses the voice as proof of identity, like a face or fingerprint; this course also analyzes what is said.'),
    ],
    uygulamalar=[
        ('Voice assistants', 'Understanding commands to control a phone or home.'),
        ('Captioning', 'Turning video, meeting and lecture recordings into text.'),
        ('Call centers', 'Analyzing and routing calls.'),
        ('Speaker verification', 'Voice-based banking and access control.'),
        ('Sound event detection', 'Detecting breaking glass, sirens, coughs.'),
        ('Speech synthesis', 'Turning text into natural-sounding speech.'),
    ],
    araclar=['librosa', 'Kaldi', 'Praat', 'torchaudio', 'ESPnet', 'SpeechBrain', 'Whisper'],
    veriler=['TIMIT', 'LibriSpeech', 'Mozilla Common Voice', 'Switchboard', 'VoxCeleb', 'AudioSet'],
    yanilgilar=[
        ('Speech recognition maps sound directly to words.', 'The same word sounds very different across accents, speeds and noise; the language model resolves the ambiguity.'),
        ('The louder the recording, the better.', 'Clipping and reverberation hurt recognition; a clean, balanced recording is what matters.'),
        ('A model that works well in English works in Turkish too.', 'Each language needs enough data; agglutinative Turkish also has a vocabulary problem to solve.'),
        ('Audio processing is only about speech.', 'Music, environmental sounds and medical sounds (heart, cough) are also part of the course.'),
    ],
    meslekler=['Speech recognition engineer', 'Audio processing engineer', 'Researcher', 'Embedded audio developer'],
    sonra=('After this course you can move on to natural language processing for the meaning of the text, to embedded AI for '
           'on-device voice assistants, or to biometric systems for voice authentication. Digital signal processing deepens '
           'the mathematics behind the subject.'),
    kaynaklar=[
        'Rabiner and Juang, <em>Fundamentals of Speech Recognition</em>, Prentice Hall, 1993.',
        'Huang, Acero and Hon, <em>Spoken Language Processing</em>, Prentice Hall, 2001.',
        'Jurafsky and Martin, <em>Speech and Language Processing</em>, 2nd ed., Prentice Hall, 2009.',
        'Rabiner, "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition", <em>Proceedings of the IEEE</em> 77(2), 1989.',
    ],
    islenenler=[
        'Speech production and perception; phonemes',
        'Digital audio: sampling, framing, windowing',
        'Spectrograms, the mel scale and MFCCs',
        'Hidden Markov models and Gaussian mixtures',
        'Decoding with Viterbi and beam search',
        'N-gram and neural language models',
        'Deep acoustic models',
        'End-to-end recognition: CTC, attention, transducers',
        'Evaluation: word error rate',
        'Speaker recognition and verification',
        'Noise robustness and speech enhancement',
        'Speech synthesis (TTS)',
    ],
    beceriler=['extracting features with librosa', 'transcribing and fine-tuning with Whisper', 'training models with torchaudio',
               'analyzing speech in Praat', 'comparing systems by WER'],
    hazirlik=[
        ('Can you explain how the Fourier transform splits a signal into frequencies?', '@SSI'),
        ("Can you use conditional probability and Bayes' rule?", '@OI'),
        ('Can you explain how a simple neural network is trained?', '@YSA'),
        ('Can you read an audio file in Python and plot its waveform?', 'An intro programming course, then a short NumPy and librosa tutorial'),
    ],
    riskler=[
        ('Voice cloning', 'A voice imitated from a few seconds of recording is used in fraud and to defeat voice authentication.'),
        ('Always-on listening', 'Devices waiting for a wake word can record by mistake, and a voice also carries health and emotion information.'),
        ('Accent and dialect gaps', 'Error rates are clearly higher for some accents and dialects, so these speakers gain less from captions and assistants.'),
        ('Hallucinated transcripts', 'End-to-end models can write sentences nobody said during silence or noise, which is dangerous in medical transcription.'),
    ],
)
