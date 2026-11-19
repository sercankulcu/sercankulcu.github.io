# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 19: Konuşma Tanıma ve Ses İşleme dersinin tanıtımı; spektrogram, '
             'MFCC, akustik ve dil modeli, konuşmacı tanıma, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Sesin sayısallaşması', 'Spektrogram ve MFCC', 'Akustik model', 'Dil modeli', 'Konuşmacı ve olay', 'Komşu dersler'],
    tanim=('Konuşma tanıma ve ses işleme, mikrofondan gelen ses dalgasını çözümleyip ondan sözcükleri, konuşmacının '
           'kimliğini ya da ortamdaki olayları çıkarmayı inceler. Ses önce zaman-frekans özniteliklerine çevrilir; '
           '<b>akustik model</b> ve dil modeli birlikte en olası metni bulur.'),
    tarihce=[
        ('1952', 'Bell Laboratuvarları\'nın Audrey sistemi tek bir konuşmacının söylediği rakamları tanır.'),
        ('1962', 'IBM Shoebox, on altı İngilizce sözcüğü ve rakamları tanıyarak tanıtılır.'),
        ('1970\'ler', 'DARPA destekli projelerde Carnegie Mellon\'ın Harpy sistemi yaklaşık bin sözcük tanır.'),
        ('1980\'ler', 'Saklı Markov modelleri (HMM) konuşma tanımanın standart yöntemi olur.'),
        ('2012', 'Derin sinir ağları akustik modellemede Gauss karışımlarının yerini almaya başlar.'),
        ('2022', 'OpenAI\'ın Whisper modeli yaklaşık 680 bin saatlik çok dilli veriyle uçtan uca eğitilir.'),
    ],
    kavramlar=[
        ('Örnekleme', 'Ses dalgasını saniyede binlerce kez ölçüp sayıya çevirmek.'),
        ('Spektrogram', 'Kısa zamanlı Fourier dönüşümüyle zaman-frekans görüntüsü.'),
        ('MFCC', 'İnsan kulağının frekans algısına uyarlanmış öznitelikler.'),
        ('Akustik model', 'Ses parçasından ses birimini (fonem) tahmin eder.'),
        ('Dil modeli', 'Hangi sözcük dizisinin daha olası olduğunu söyler.'),
        ('Kod çözme', 'Işın aramasıyla en olası sözcük dizisini bulmak.'),
        ('Konuşmacı tanıma', 'Sesin kime ait olduğunu doğrulamak ya da bulmak.'),
        ('Sözcük hata oranı', 'WER: ekleme, silme ve değiştirme hatalarının oranı.'),
    ],
    akis=[('Kaydet', 'mikrofon,\n16 kHz'), ('Öznitelik\nçıkar', 'spektrogram,\nMFCC'), ('Akustik\nmodel', 'ses birimi\nolasılığı'),
          ('Kod çöz', 'dil modeli,\nışın araması'), ('Metin', 'WER ile\nölç')],
    akis_ornek=('<b>Örnek:</b> Bir sesli asistan "yarın hava nasıl" sorusunu 16 kHz\'te kaydeder, 25 ms\'lik çerçevelerden '
                'spektrogram çıkarır, akustik model her çerçeve için ses birimi olasılıkları verir ve dil modeli bunları '
                'en olası cümleye dönüştürür. Metin, anlam için NLP\'ye aktarılır.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'karmaşık sayılar, integral ve Fourier serilerine giriş', None),
        ('Programlama', 'Python ile dizi işlemleri ve dosyadan ses okuma', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('SSI', 'Sinyal işleme her türlü sinyali süzer ve dönüştürür; bu ders ses ve konuşmaya özgü öznitelik ve modellere odaklanır.'),
        ('NLP', 'NLP elinde metin olduğunu varsayar; bu ders o metni ses dalgasından elde eder ve ses olaylarını da işler.'),
        ('DO', 'Derin öğrenme genel ağ mimarileri sunar; bu ders onları sesin zaman-frekans yapısına ve hizalama sorununa uyarlar.'),
        ('BIO', 'Biyometri sesi yüz ve parmak izi gibi bir kimlik kanıtı olarak kullanır; bu ders sesin içeriğini de çözümler.'),
    ],
    uygulamalar=[
        ('Sesli asistanlar', 'Komutları anlayıp telefonu ya da evi yönetmek.'),
        ('Altyazı ve döküm', 'Video, toplantı ve ders kayıtlarını metne dökmek.'),
        ('Çağrı merkezi', 'Görüşmeleri çözümlemek, yönlendirmek.'),
        ('Konuşmacı doğrulama', 'Sesle bankacılık ve erişim denetimi.'),
        ('Ses olayı tespiti', 'Cam kırılması, siren, öksürük algılama.'),
        ('Konuşma sentezi', 'Metni doğal sesli konuşmaya çevirmek.'),
    ],
    araclar=['librosa', 'Kaldi', 'Praat', 'torchaudio', 'ESPnet', 'SpeechBrain', 'Whisper'],
    veriler=['TIMIT', 'LibriSpeech', 'Mozilla Common Voice', 'Switchboard', 'VoxCeleb', 'AudioSet'],
    yanilgilar=[
        ('Konuşma tanıma sesi doğrudan sözcüğe eşler.', 'Aynı sözcük farklı ağız, hız ve gürültüde çok farklı ses verir; dil modeli belirsizliği çözer.'),
        ('Kayıt ne kadar yüksek sesliyse o kadar iyi.', 'Kırpılma (clipping) ve yankı tanımayı bozar; temiz ve dengeli kayıt önemlidir.'),
        ('İngilizcede iyi çalışan model Türkçede de çalışır.', 'Her dil için yeterli veri gerekir; eklemeli Türkçede sözcük dağarcığı sorunu ayrıca çözülür.'),
        ('Ses işleme yalnız konuşmadır.', 'Müzik, çevre sesleri ve tıbbi sesler (kalp, öksürük) de dersin konusudur.'),
    ],
    meslekler=['Konuşma tanıma mühendisi', 'Ses işleme mühendisi', 'Araştırmacı', 'Gömülü ses yazılımcısı'],
    sonra=('Bu dersten sonra metnin anlamı için doğal dil işlemeye, cihaz üzerinde çalışan sesli asistanlar için gömülü '
           'YZ\'ye ya da sesle kimlik doğrulama için biyometrik sistemlere geçilebilir. Sayısal sinyal işleme bilgisi ise '
           'konunun matematiğini derinleştirir.'),
    kaynaklar=[
        'Rabiner ve Juang, <em>Fundamentals of Speech Recognition</em>, Prentice Hall, 1993.',
        'Huang, Acero ve Hon, <em>Spoken Language Processing</em>, Prentice Hall, 2001.',
        'Jurafsky ve Martin, <em>Speech and Language Processing</em>, 2. baskı, Prentice Hall, 2009.',
        'Rabiner, "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition", <em>Proceedings of the IEEE</em> 77(2), 1989.',
    ],
)
