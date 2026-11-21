# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 13 slides: Generative Models — likelihood, latent space, VAEs, GANs, '
             'diffusion and autoregressive models, history and neighboring courses.'),
    gundem=['Data distribution', 'Latent space', 'VAEs and GANs', 'Diffusion', 'Autoregressive models', 'Neighboring courses'],
    tanim=('Generative models learn the probability distribution of data and <b>generate new samples</b> from it. A '
           'discriminative model asks "is this image a cat?", while a generative model asks "how are cat images '
           'distributed, and how do I draw a new one?"'),
    tarihce=[
        ('2013', 'Kingma and Welling propose the variational autoencoder (VAE).'),
        ('2014', 'Goodfellow and colleagues introduce generative adversarial networks (GANs), pitting a generator against a discriminator.'),
        ('2015', 'Sohl-Dickstein and colleagues publish the idea of diffusion models that undo noise step by step.'),
        ('2018', 'OpenAI\'s first GPT: an autoregressive transformer pretrained on a large text corpus.'),
        ('2020', 'Ho, Jain and Abbeel\'s DDPM brings diffusion models to the front of image generation.'),
        ('2022', 'Stable Diffusion is released with open weights; ChatGPT brings generative models to a wide audience.'),
    ],
    kavramlar=[
        ('Likelihood', 'The probability the model assigns to real data; training increases it.'),
        ('Latent space', 'Low-dimensional hidden variables that summarize samples.'),
        ('Autoencoder and VAE', 'Encode, decode; a VAE forces the latent space into a regular distribution.'),
        ('GAN', 'A generator makes fake samples, a discriminator tries to tell them from real ones.'),
        ('Diffusion', 'Adds noise to data; a network learns to remove it step by step.'),
        ('Autoregressive model', 'Predicts each token from the previous ones: GPT.'),
        ('Conditional generation', 'Generation guided by text, a class or a sketch.'),
        ('Evaluation', 'FID, perplexity and human evaluation.'),
    ],
    akis=[('Dataset', 'images, text,\naudio'), ('Model the\ndistribution', 'VAE, GAN,\ndiffusion'), ('Train', 'likelihood,\nadversarial'),
          ('Sample', 'from noise\nto data'), ('Evaluate', 'FID, human\njudgment')],
    akis_ornek=('<b>Example:</b> A diffusion model adds noise step by step to millions of images and trains a network to '
                'predict that noise. At generation time it starts from pure noise, removes it over dozens of steps guided '
                'by a text prompt, and arrives at an image never seen before.'),
    onkosul_ek=[
        ('Calculus', 'working comfortably with integrals, derivatives and probability densities', None),
        ('Programming', 'Python and a deep learning library (PyTorch)', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('DO', 'Deep learning is the general toolkit and mostly makes predictions; this course uses those tools to generate new samples from a data distribution.'),
        ('OGM', 'Graphical models build the structure between variables explicitly; the deep generative models here usually learn it implicitly.'),
        ('NLP', 'NLP also covers parsing and understanding language; this course looks at the shared principles of generating text, images and audio.'),
        ('BGR', 'Computer graphics computes images from a physical description of a scene; generative models produce images by learning from data.'),
    ],
    uygulamalar=[
        ('Text-to-image', 'Pictures and illustrations from a prompt.'),
        ('Chat and writing', 'Text generation with large language models.'),
        ('Audio synthesis', 'Natural-sounding speech and music.'),
        ('Data augmentation', 'Synthetic samples for classes with little data.'),
        ('Drug design', 'Proposing new candidate molecules.'),
        ('Image editing', 'Inpainting missing regions, super-resolution.'),
    ],
    araclar=['PyTorch', 'Hugging Face Diffusers', 'Hugging Face Transformers', 'JAX', 'Stable Diffusion', 'Weights &amp; Biases'],
    veriler=['MNIST', 'CelebA', 'CIFAR-10', 'LSUN', 'LAION-5B', 'FFHQ'],
    yanilgilar=[
        ('A generative model copies its training data.', 'The goal is to learn the distribution; memorization can still happen and must be checked.'),
        ('Generative AI is just chatbots.', 'Models that generate images, audio, video, molecules and code are also part of this course.'),
        ('Realistic-looking output is correct output.', 'A model can produce plausible but wrong content; correctness is checked separately.'),
        ('GANs are outdated; diffusion is always better.', 'Each family trades off speed, quality and diversity differently; a GAN generates in one step.'),
    ],
    meslekler=['Generative AI engineer', 'Researcher', 'Machine learning engineer', 'Creative technologist'],
    sonra=('After generative models you can take Natural Language Processing for text generation, Computer Graphics for '
           'image and scene synthesis, or Explainable AI and AI Ethics for safe and responsible use of models. Information '
           'Theory and Probabilistic Graphical Models deepen the theoretical basis.'),
    kaynaklar=[
        'Foster, <em>Generative Deep Learning</em>, 2nd ed., O\'Reilly, 2023.',
        'Tomczak, <em>Deep Generative Modeling</em>, Springer, 2022.',
        'Goodfellow et al., "Generative Adversarial Nets", <em>Advances in Neural Information Processing Systems</em> 27, 2014.',
        'Kingma and Welling, "Auto-Encoding Variational Bayes", <em>ICLR</em>, 2014.',
        'Ho, Jain and Abbeel, "Denoising Diffusion Probabilistic Models", <em>Advances in Neural Information Processing Systems</em> 33, 2020.',
    ],
)
