# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 16 slides: Digital Signal Processing — sampling, convolution, '
             'Fourier transform, filter design, history, prerequisites and related courses.'),
    gundem=['Sampling', 'Linear systems', 'Fourier and FFT', 'Filter design', 'Spectral analysis', 'Related courses'],
    tanim=('Digital signal processing analyzes, filters and transforms audio, vibration, ECG or radio signals that have been '
           '<b>sampled</b> at regular intervals, using mathematical transforms. The course rests on exact mathematics, not '
           'learning; it is the common foundation of the audio, image and communications courses.'),
    tarihce=[
        ('1822', 'In his book on heat, Fourier proposes writing functions as sums of sinusoids.'),
        ('1949', 'Shannon publishes sampling theory: a band-limited signal sampled fast enough is recovered exactly.'),
        ('1965', 'Cooley and Tukey publish the fast Fourier transform (FFT); computing spectra becomes practical.'),
        ('1974', 'Ahmed, Natarajan and Rao introduce the discrete cosine transform (DCT); JPEG and MP3 build on it.'),
        ('1975', 'Oppenheim and Schafer\'s Digital Signal Processing appears; the field becomes a standard course.'),
        ('1978', 'Texas Instruments\' Speak &amp; Spell brings single-chip digital speech synthesis into homes.'),
    ],
    kavramlar=[
        ('Sampling', 'Measuring a continuous signal at equal intervals to get a sequence of numbers.'),
        ('Nyquist criterion', 'Sample faster than twice the highest frequency.'),
        ('Aliasing', 'With undersampling, a high frequency shows up as a low one.'),
        ('Quantization', 'Rounding amplitude to a finite number of levels; bit depth.'),
        ('Convolution', 'The response of a linear time-invariant system to its input.'),
        ('Fourier and FFT', 'A fast way to split a signal into frequency components.'),
        ('FIR and IIR filters', 'Low-pass, high-pass and band-pass digital filters.'),
        ('z-transform', 'Poles and zeros of a filter; stability analysis.'),
    ],
    akis=[('Sample', 'ADC, sampling\nrate'), ('Transform', 'FFT,\nspectrum'), ('Filter', 'FIR / IIR\nfilter'),
          ('Analyze', 'peaks, energy,\nfeatures'), ('Convert\nback', 'DAC or\nnext step')],
    akis_ornek=('<b>Example:</b> An ECG device samples the heart signal 360 times per second. The spectrum shows 50 Hz '
                'mains noise; a notch filter suppresses only that frequency. R peaks are found in the cleaned signal and '
                'heart rate is computed from the time between them. No step involves learning.'),
    onkosul_ek=[
        ('Calculus', 'integrals, series and complex numbers: the language of the Fourier transform', None),
        ('Differential Equations', 'behavior and stability of linear systems', None),
        ('Programming with C', 'to write real-time filters on embedded devices', '/teaching/programming-with-c/?lang=en'),
    ],
    ayrisma=[
        ('GI', 'Signal processing works with one-dimensional, time-dependent signals; image processing carries the same tools to a 2D pixel grid.'),
        ('KSI', 'Signal processing provides general tools; speech recognition combines them with language models and learning to output words.'),
        ('ZS', 'Both look at time-dependent data; time series analysis needs forecasting and statistics, signal processing needs frequency and filters.'),
        ('BK', 'Information theory gives the measure of information and the limits of compression; signal processing gives the algorithms that act on the signal.'),
    ],
    uygulamalar=[
        ('Audio and music', 'Equalizers, noise suppression, MP3 compression.'),
        ('Communications', 'Modems, Wi-Fi, 4G/5G modulation.'),
        ('Biomedical', 'Filtering ECG and EEG, finding peaks.'),
        ('Radar and sonar', 'Measuring range and speed from echoes.'),
        ('Vibration monitoring', 'Detecting machine faults from the spectrum.'),
        ('Image and video', 'Transforms in JPEG and video coding.'),
    ],
    araclar=['MATLAB', 'GNU Octave', 'NumPy', 'SciPy (scipy.signal)', 'librosa', 'GNU Radio'],
    veri_baslik='Sample signals and datasets',
    veriler=['MIT-BIH Arrhythmia (ECG)', 'PhysioNet', 'TIMIT (speech)', 'CWRU bearing vibration data', 'Synthetic sines and noise'],
    araclar_not='In class a <b>synthetic signal</b> is often enough: summing known frequencies and adding noise shows clearly what a filter does.',
    yanilgilar=[
        ('A higher sampling rate is always better.', 'Beyond the Nyquist limit you gain no information; only data and computation grow.'),
        ('The FFT is a different transform from the Fourier transform.', 'The FFT is an algorithm that computes the discrete Fourier transform (DFT) fast; the result is the same.'),
        ('A filter tells noise from signal and removes it.', 'A filter separates by frequency; if noise shares the signal\'s band, the filter cannot separate it.'),
        ('Deep learning has made signal processing obsolete.', 'Audio and sensor models usually take a spectrogram or a filtered signal as input.'),
    ],
    meslekler=['DSP engineer', 'Audio software engineer', 'Communications engineer', 'Embedded systems engineer', 'Biomedical engineer'],
    sonra=('Digital signal processing is the gateway to the third part: extended to two dimensions it becomes image processing, '
           'combined with language models it becomes speech recognition. Time series analysis and information theory also use '
           'its tools. On the hardware side, you can move on to embedded AI and communications.'),
    kaynaklar=[
        'Oppenheim and Schafer, <em>Discrete-Time Signal Processing</em>, 3rd ed., Pearson, 2010.',
        'Proakis and Manolakis, <em>Digital Signal Processing: Principles, Algorithms, and Applications</em>, 4th ed., Pearson, 2007.',
        'Smith, <em>The Scientist and Engineer\'s Guide to Digital Signal Processing</em>, California Technical Publishing, 1997.',
        'Cooley and Tukey, "An Algorithm for the Machine Calculation of Complex Fourier Series", <em>Mathematics of Computation</em> 19(90), 1965.',
    ],
    islenenler=[
        'Discrete-time signals and systems',
        'Linear time-invariant systems and convolution',
        'Sampling, aliasing and reconstruction',
        'Discrete-time Fourier transform, frequency response',
        'The z-transform: poles, zeros and stability',
        'The discrete Fourier transform (DFT) and the FFT',
        'Windowing and spectral leakage',
        'FIR filter design: the window method',
        'IIR filter design: Butterworth, Chebyshev',
        'Sample-rate conversion: decimation, interpolation',
        'Short-time Fourier transform and spectrograms',
        'Quantization noise and fixed-point implementation',
    ],
    beceriler=['designing filters with scipy.signal', 'plotting spectra in MATLAB or Octave', 'reading pole-zero diagrams',
               'choosing a suitable sampling rate', 'filtering and interpreting a real signal'],
    hazirlik=[
        ("Can you write a complex number in polar form and explain Euler's formula?", "Complex numbers and Euler's formula from calculus"),
        ('Can you read the amplitude, frequency and phase of a sinusoid from its plot?', 'A quick review of trigonometry and sinusoid graphs'),
        ('Can you evaluate a sum (Σ) and a simple integral?', 'Series and integrals from calculus'),
        ('Can you generate an array in Python or MATLAB and plot it?', 'Intro programming, then a short NumPy and Matplotlib tutorial'),
    ],
    riskler=[
        ('Aliasing', 'Without a low-pass filter before sampling, high frequencies show up as fake low ones and cannot be undone.'),
        ('Unstable IIR filters', 'A pole outside the unit circle makes the output blow up; coefficient rounding in fixed point can push it there.'),
        ('Spectral leakage', 'An FFT taken without a suitable window shows frequency components that are not there and leads to wrong diagnoses.'),
        ('Phase distortion', 'The nonlinear phase of an IIR filter distorts waveforms such as ECG, which can affect a diagnosis.'),
    ],
)
