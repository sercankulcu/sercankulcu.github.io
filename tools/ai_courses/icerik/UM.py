# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 13: Üretken Modeller dersinin tanıtımı; olabilirlik, gizil uzay, '
             'VAE, GAN, difüzyon ve özbağlanımlı modeller, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Veri dağılımı', 'Gizil uzay', 'VAE ve GAN', 'Difüzyon', 'Özbağlanımlı modeller', 'Komşu dersler'],
    tanim=('Üretken modeller, verinin olasılık dağılımını öğrenip o dağılımdan <b>yeni örnekler üreten</b> modelleri '
           'inceler. Ayırt edici bir model "bu görüntü kedi mi?" diye sorarken üretken model "kedi görüntüleri nasıl '
           'dağılır, yenisini nasıl çizerim?" diye sorar.'),
    tarihce=[
        ('2013', 'Kingma ve Welling değişimsel otokodlayıcıyı (VAE) önerir.'),
        ('2014', 'Goodfellow ve arkadaşları üretici ile ayırıcının yarıştığı çekişmeli ağları (GAN) tanıtır.'),
        ('2015', 'Sohl-Dickstein ve arkadaşları, gürültüyü adım adım geri alan difüzyon modeli fikrini yayımlar.'),
        ('2018', 'OpenAI\'ın ilk GPT modeli: büyük metin üzerinde önceden eğitilmiş özbağlanımlı dönüştürücü.'),
        ('2020', 'Ho, Jain ve Abbeel\'in DDPM çalışması difüzyon modellerini görüntü üretiminde öne çıkarır.'),
        ('2022', 'Stable Diffusion açık ağırlıklarla yayımlanır; ChatGPT üretken modelleri geniş kitlelere taşır.'),
    ],
    kavramlar=[
        ('Olabilirlik', 'Modelin gerçek veriye verdiği olasılık; eğitim onu büyütür.'),
        ('Gizil uzay', 'Örnekleri özetleyen düşük boyutlu gizli değişkenler.'),
        ('Otokodlayıcı ve VAE', 'Kodla, çöz; VAE gizil uzayı düzenli bir dağılıma zorlar.'),
        ('GAN', 'Üretici sahte örnek üretir, ayırıcı onu gerçekten ayırmaya çalışır.'),
        ('Difüzyon', 'Veriye gürültü ekler, ağ gürültüyü adım adım silmeyi öğrenir.'),
        ('Özbağlanımlı model', 'Her belirteci öncekilere bakarak tahmin eder: GPT.'),
        ('Koşullu üretim', 'Metin, sınıf ya da çizimle yönlendirilen üretim.'),
        ('Değerlendirme', 'FID, şaşkınlık (perplexity) ve insan değerlendirmesi.'),
    ],
    akis=[('Veri\nkümesi', 'görüntü, metin,\nses'), ('Dağılımı\nmodelle', 'VAE, GAN,\ndifüzyon'), ('Eğit', 'olabilirlik,\nçekişme'),
          ('Örnekle', 'gürültüden\nveriye'), ('Değerlendir', 'FID, insan\nyargısı')],
    akis_ornek=('<b>Örnek:</b> Bir difüzyon modeli milyonlarca görüntüye adım adım gürültü ekleyip ağı bu gürültüyü '
                'tahmin etmeye eğitir. Üretim sırasında saf gürültüden başlar, metin isteminin yönlendirmesiyle gürültüyü '
                'onlarca adımda siler ve hiç görülmemiş bir görüntüye varır.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'integral, türev ve olasılık yoğunluklarıyla rahat çalışmak', None),
        ('Programlama', 'Python ve bir derin öğrenme kütüphanesi (PyTorch)', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('DO', 'Derin öğrenme genel araç takımıdır ve çoğunlukla tahmin yapar; bu ders o araçlarla veri dağılımından yeni örnek üretir.'),
        ('OGM', 'Grafik modeller değişkenler arası yapıyı açıkça kurar; bu dersin derin üretken modelleri yapıyı çoğu zaman örtük öğrenir.'),
        ('NLP', 'NLP dili çözümleme ve anlamayı da kapsar; bu ders metni, görüntüyü ve sesi üretmenin ortak ilkelerine bakar.'),
        ('BGR', 'Bilgisayar grafiği görüntüyü sahnenin fiziksel tanımından hesaplar; üretken modeller görüntüyü veriden öğrenerek üretir.'),
    ],
    uygulamalar=[
        ('Metinden görüntü', 'İstemden resim ve illüstrasyon üretmek.'),
        ('Sohbet ve yazım', 'Büyük dil modelleriyle metin üretimi.'),
        ('Ses sentezi', 'Doğal sesli konuşma ve müzik üretimi.'),
        ('Veri artırma', 'Az veri olan sınıflar için yapay örnekler.'),
        ('İlaç tasarımı', 'Yeni molekül adayları önermek.'),
        ('Görüntü düzenleme', 'Eksik bölgeyi doldurma, çözünürlük artırma.'),
    ],
    araclar=['PyTorch', 'Hugging Face Diffusers', 'Hugging Face Transformers', 'JAX', 'Stable Diffusion', 'Weights &amp; Biases'],
    veriler=['MNIST', 'CelebA', 'CIFAR-10', 'LSUN', 'LAION-5B', 'FFHQ'],
    yanilgilar=[
        ('Üretken model eğitim verisini kopyalar.', 'Amaç dağılımı öğrenmektir; yine de ezberleme olabilir ve ayrıca denetlenmelidir.'),
        ('Üretken YZ yalnız sohbet robotlarıdır.', 'Görüntü, ses, video, molekül ve kod üreten modeller de bu dersin konusudur.'),
        ('Gerçekçi görünen çıktı doğru çıktıdır.', 'Model akla yatkın ama yanlış içerik üretebilir; doğruluk ayrıca denetlenir.'),
        ('GAN eski, difüzyon her yerde daha iyi.', 'Her ailenin hız, kalite ve çeşitlilik dengesi farklıdır; GAN tek adımda üretir.'),
    ],
    meslekler=['Üretken YZ mühendisi', 'Araştırmacı', 'Makine öğrenmesi mühendisi', 'Yaratıcı teknoloji uzmanı'],
    sonra=('Üretken modellerden sonra metin üretimi için doğal dil işlemeye, görüntü ve sahne sentezi için bilgisayar '
           'grafiğine ya da modellerin güvenli ve sorumlu kullanımı için açıklanabilir YZ ve etik dersine geçilebilir. '
           'Bilgi kuramı ve olasılıksal grafik modeller ise kuramsal temeli derinleştirir.'),
    kaynaklar=[
        'Foster, <em>Generative Deep Learning</em>, 2. baskı, O\'Reilly, 2023.',
        'Tomczak, <em>Deep Generative Modeling</em>, Springer, 2022.',
        'Goodfellow ve ark., "Generative Adversarial Nets", <em>Advances in Neural Information Processing Systems</em> 27, 2014.',
        'Kingma ve Welling, "Auto-Encoding Variational Bayes", <em>ICLR</em>, 2014.',
        'Ho, Jain ve Abbeel, "Denoising Diffusion Probabilistic Models", <em>Advances in Neural Information Processing Systems</em> 33, 2020.',
    ],
)
