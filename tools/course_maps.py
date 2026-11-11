# -*- coding: utf-8 -*-
"""Ders haritalari; course_map.py bu tanimlardan files/<ders>/ders_haritasi.html uretir.

rows   : satir satir bolum numaralari (ustten alta). Bir satirda en cok 5 dugum.
cols   : istege bagli, {satir: [sutun, ...]} ile dugumleri belirli sutunlara koyar.
edges  : (dayanilan, dayanan[, 'ana']) ; ok yalnizca ayni satirdaki komsular ya da
         ardisik satirlar arasinda. 'ana' kalin vurgulu ok.
hot    : vurgulanan dugumler (dersin birlestigi yer).
table  : (bolum, [dayandigi bolumler], bag aciklamasi) ; her bolum bir kez.
"""

MAPS = {}

MAPS['ds'] = dict(
    title='Veri Yapıları', folder='data_structures', page='data-structures.md',
    rows=[[1, 2], [3, 4], [5, 9], [6, 7, 8, 10, 11], [12, 13, 14]],
    cols={0: [1.5, 2.5], 1: [1.5, 2.5], 2: [1.5, 3], 4: [0.5, 1.5, 3]},
    edges=[(1, 2), (2, 3), (3, 4), (3, 5), (4, 9), (5, 6), (5, 7), (5, 8), (9, 10), (9, 11),
           (6, 12), (12, 13), (8, 14)],
    table=[
        (1, [], 'Verinin bellekte temsili, ilkel ve referans tipler, soyut veri tipi; bütün yapılar bu dille anlatılır.'),
        (2, [1], 'Bir yapıyı seçmek için işlemlerin maliyetini ölçmek gerekir: Büyük O, Omega ve Teta.'),
        (3, [2], 'İlk yapı: bitişik bellek ve indisle O(1) erişim; ekleme ve silmenin bedeli analizle görülür.'),
        (4, [2, 3], 'Problemi daha küçük örneklerine indirmek; çağrı yığını ve yineleme bağıntısıyla analiz.'),
        (5, [3], 'Dizinin sabit boyu ve kaydırma maliyeti düğümlerle aşılır: başa ekleme O(1), rastgele erişim yok.'),
        (6, [3, 5], 'Dizi ve bağlı liste aynı Liste ADT\'sinin iki gerçeklemesidir; Java koleksiyonları ve Iterator.'),
        (7, [3, 5], 'Yalnızca üstten erişilen liste: push ve pop dizi ya da bağlı listeyle O(1).'),
        (8, [3, 5, 7], 'İki uçlu erişim: dairesel dizi ya da bağlı liste; iki yığınla kuyruk.'),
        (9, [4, 5], 'Düğümler artık birden çok çocuğa bağlanır; gezinmeler özyinelemeyle yazılır.'),
        (10, [9], 'Ağaca sıralama koşulu eklenir: arama, ekleme ve silme O(h); denge yüksekliği O(log n) tutar.'),
        (11, [8, 9], 'Kuyruk ADT\'sinin öncelikli biçimi; tam ikili ağacın dizide saklanmasıyla heap.'),
        (12, [3, 6], 'Eşleme ADT\'si; hash tablosu dizi kovaları ve zincirleme listeleriyle ortalama O(1).'),
        (13, [10, 12], 'Küme, değeri olmayan eşlemedir: hash ve ağaç tabanlı gerçeklemeler; ayrık kümeler ağaçla.'),
        (14, [8, 9, 11, 13], 'Ağacın genellemesi: BFS kuyruk, Dijkstra ve Prim öncelikli kuyruk, Kruskal ayrık küme kullanır.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Diziden başlayan yol bağlı yapılara, ağaçlara ve çizgelere ayrılır.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>analiz → dizi → bağlı yapı → ağaç → çizge</strong>. İlk dört bölüm bütün dersin aracıdır: her yapı bir soyut veri tipi olarak tanımlanır ve işlemleri Büyük O ile ölçülür. Dizi ile bağlı liste, sonraki bütün yapıların iki temel gerçekleme biçimidir; yığın, kuyruk ve liste ADT\'si bu ikisinin üzerine kurulur. Özyineleme ağaçlara götürür; arama ağaçları ile hash tabloları eşleme ve kümelerin iki gerçeklemesidir. Çizgeler son bölümde öncekilerin hepsini kullanır: gezinme kuyruğu ve yığını, öncelikli kuyruk ve ayrık kümeler.',
)

MAPS['os'] = dict(
    title='İşletim Sistemleri', folder='os', page='operating-systems.md',
    rows=[[1, 2], [3], [4, 5, 8], [6, 12, 9, 10], [7, 13, 11], [14, 15]],
    cols={0: [1, 2], 1: [1.5], 2: [0.5, 1.5, 2.5], 4: [0, 1.5, 3], 5: [1, 2]},
    edges=[(1, 2), (2, 3), (3, 4), (3, 5), (3, 8), (4, 6), (5, 12), (8, 9), (9, 10),
           (6, 7), (10, 13), (10, 11), (7, 14), (13, 14), (14, 15, 'ana'), (11, 15, 'ana')],
    hot=[15],
    table=[
        (1, [], 'İşletim sisteminin iki rolü: genişletilmiş makine ve kaynak yöneticisi; çekirdek ve kullanıcı kipi.'),
        (2, [1], 'Hizmetler sistem çağrılarıyla sunulur: süreç, adres alanı, dosya ve boru kavramları.'),
        (3, [2], 'Çalışan program: fork, exec ve wait; süreç durumları ve süreç kontrol bloğu.'),
        (4, [3], 'Aynı adres alanında birden çok yürütme akışı; kullanıcı ve çekirdek düzeyi iş parçacıkları.'),
        (5, [3], 'Hazır kuyruğundaki süreçlerden hangisi işlemciyi alır: FCFS, SJF, Round Robin ve geri beslemeli kuyruklar.'),
        (6, [4], 'Paylaşılan veriye eş zamanlı erişim yarış durumu doğurur: kritik bölge, mutex ve semafor.'),
        (7, [6], 'Kilitleri yanlış sırada almak kilitlenmeye götürür: dört koşul, bankacı algoritması.'),
        (8, [2, 3], 'Her sürecin adres alanı: mantıksal ve fiziksel adres, bitişik tahsis, sayfalama.'),
        (9, [8], 'Sayfalamanın talebe bağlı biçimi; sayfa hatası ve sayfa yer değiştirme algoritmaları.'),
        (10, [2, 9], 'Dosya kavramının diskteki karşılığı; bellek eşlemeli dosyalar ve sayfa önbelleği sanal belleği kullanır.'),
        (11, [3, 10], 'Dosya sisteminin altındaki katman: aygıt sürücüleri, kesmeler ve DMA; bloke olan süreç bekleme kuyruğuna geçer.'),
        (12, [5, 6], 'Birden çok işlemcide çizelgeleme ve senkronizasyon: önbellek tutarlılığı, spinlock\'ların ölçeklenmesi.'),
        (13, [2, 10], 'Çekirdek ve kullanıcı kipinden dosya izinlerine kadar koruma; erişim denetim listeleri ve yetenekler.'),
        (14, [7, 12, 13], 'Önceki bölümlerdeki seçimlerin ortak ilkeleri: mekanizma ile politikanın ayrılması, ödünleşimler.'),
        (15, [11, 12, 14], 'Bütün kavramlar gerçek bir sistemde: task_struct, EEVDF çizelgeleyicisi, sanal adres alanı, VFS.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Bütün yollar Süreçler\'den geçer ve Linux\'ta birleşir.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>süreç → paylaşım → bellek → depolama → gerçek sistem</strong>. Süreç kavramı dersin merkezidir; ondan üç dal çıkar. İşlemci dalı çizelgelemeyle, eş zamanlılık dalı iş parçacıkları, senkronizasyon ve kilitlenmeyle, bellek dalı sayfalama ve sanal bellekle ilerler. Sanal bellek dosya sistemine, dosya sistemi de G/Ç katmanına bağlanır. Çok işlemcili sistemler çizelgeleme ile senkronizasyonu birlikte yeniden sorar. Tasarım bölümü bu seçimlerin ortak ilkelerini toplar, Linux bölümü de hepsini çalışan bir çekirdekte gösterir.',
)

MAPS['dsa_c'] = dict(
    title='C ile Veri Yapıları ve Algoritmalar', folder='dsa_c', page='data-structures-and-algorithms-with-c.md',
    rows=[[19, 1, 2, 3], [20, 4, 6, 10], [5, 14, 7, 11, 16], [9, 8, 15, 13, 12], [17, 18]],
    cols={0: [0, 1, 2, 3], 1: [0, 1, 2, 3], 4: [1.5, 2.5]},
    edges=[(1, 19), (1, 2), (2, 3), (19, 20), (2, 4), (3, 6), (3, 10), (4, 5), (4, 14), (6, 7),
           (10, 11), (10, 16), (5, 9), (7, 8), (7, 13), (11, 12), (7, 15), (13, 15), (15, 17), (15, 18)],
    table=[
        (1, [], 'Yazılımın yaşam döngüsü, soyut veri tipinin C başlık dosyasıyla ifadesi ve asimptotik analiz.'),
        (2, [1], 'Dizi ADT\'si ve dizi ile işaretçi ilişkisi; malloc ile dinamik diziler, yapılar.'),
        (3, [1, 2], 'Özyinelemeyi yığın çerçeveleriyle izlemek; sıralı dizide ikili arama, Hanoi ve permütasyon.'),
        (4, [2], 'Dizinin yetersiz kaldığı yerde malloc ve free ile kurulan düğümler.'),
        (5, [2, 4], 'Aynı ADT\'nin iki gösterimi: katsayı ve terim dizileri, bağlı liste; seyrek matrisler.'),
        (6, [2, 3, 4], 'LIFO yapısı: dizi ve struct ile push ve pop; çağrı yığını özyinelemenin yığınıdır.'),
        (7, [6], 'FIFO yapısı: doğrusal kuyruğun kayma sorunu dairesel kuyrukla çözülür.'),
        (8, [6, 7], 'Labirentte geri izleme, infix ifadeyi postfix\'e çevirme ve değerlendirme.'),
        (9, [4, 5], 'Liste ADT\'sinin sözleşmesi; çok değişkenli polinomlar genelleştirilmiş listeye götürür.'),
        (10, [3, 4], 'İkili ağaç, dizi ve bağlı gösterim; gezinmeler özyinelemeyle yazılır.'),
        (11, [3, 10], 'Ağaca sıralama koşulu: ekleme ve arama ikili aramanın ağaçtaki karşılığıdır.'),
        (12, [10, 11], 'Boş kalan n+1 işaretçi kılavuza dönüşür: yığınsız kök ortada gezinme.'),
        (13, [7, 10], 'Kuyruğun öncelikli biçimi; tam ikili ağacın dizide saklanmasıyla heap.'),
        (14, [2, 4], 'Doğrudan adreslemeden hash\'e; açık adresleme dizi, zincirleme bağlı liste kullanır.'),
        (15, [4, 7, 13], 'Komşuluk listesi bağlı listedir; BFS kuyrukla, DFS yığınla gezinir.'),
        (16, [10], 'Ayrık kümeler ata dizisiyle ağaç olarak saklanır; ağırlıklı birleşim ve yol kısaltma.'),
        (17, [13, 15, 16], 'Açgözlü kapsayan ağaç: Kruskal union-find, Prim heap kullanır.'),
        (18, [13, 15], 'Dijkstra, Bellman-Ford ve Floyd-Warshall; AoV ve AoE ağlarında topolojik sıra ve kritik yol.'),
        (19, [1, 2], 'İlk örnek olan seçimli sıralama genellenir: eklemeli ve kabarcık sıralaması, kararlılık.'),
        (20, [3, 13, 19], 'Böl ve fethet ile hızlı ve birleştirme sıralaması; heap sıralaması ve basamağa göre sıralama.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Dizi ve özyinelemeden çıkan yollar doğrusal yapılara, ağaçlara, çizgelere ve sıralamaya ayrılır.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>dizi ve işaretçi → bağlı yapı → ağaç → çizge</strong>. Her konu soyut veri tipinden çalışan bir C gerçeklemesine kadar götürülür; bunun iki aracı dizi ile malloc ve free üzerine kurulan bağlı listedir. Yığın ve kuyruk her iki gerçeklemeyle yazılır ve uygulamalarda birleşir. Özyineleme ağaçlara götürür; heap ve ayrık kümeler ağacın dizideki biçimleridir. Çizgeler bu yapıların hepsini birlikte kullanır: kapsayan ağaç için heap ve union-find, en kısa yol için öncelikli kuyruk. Sıralama ise ilk bölümdeki seçimli sıralamadan başlar ve son bölümde böl ve fethet ile heap\'e dayanır.',
)

MAPS['algorithms'] = dict(
    title='Algoritmalar', folder='algorithms', page='algorithms.md',
    rows=[[1], [2, 3], [6, 4, 5], [12, 14, 8, 7, 9], [13, 11, 10]],
    cols={0: [2], 1: [1.5, 2.5], 2: [0.5, 2, 3.5], 4: [2, 3, 4]},
    edges=[(1, 2), (1, 3), (2, 3), (2, 6), (3, 4), (3, 5), (4, 7), (6, 8), (4, 9),
           (6, 12), (6, 14), (7, 11), (11, 13), (9, 10)],
    table=[
        (1, [], 'Algoritma kavramı ve çalışma süresinin girdi boyutuyla büyümesi: asimptotik gösterimler.'),
        (2, [1], 'İlk büyük problem sınıfı; O(n²) yöntemlerden O(n log n) yöntemlere geçiş analizle ölçülür.'),
        (3, [1, 2], 'Sıralı dizide ikili arama; hash ile ortalama O(1) arama.'),
        (4, [1, 3], 'Arama çizgeye taşınır: DFS ve BFS, güçlü bağlantılı bileşenler, en kısa yollar.'),
        (5, [1, 3], 'Metinde örüntü arama: KMP, Boyer-Moore, Rabin-Karp; sıkıştırma ve dizi hizalama.'),
        (6, [1, 2], 'Birleştirme sıralaması ve hızlı sıralamanın ortak şablonu; yineleme bağıntısı ve Ana Teorem.'),
        (7, [4, 6], 'Her adımda en iyi görünen seçim; Prim, Kruskal ve Dijkstra açgözlü çizge algoritmalarıdır.'),
        (8, [5, 6], 'Böl ve fethetin örtüşen alt problemli hâli: bellekleme ve tablolama; dizgilerde LCS ve düzenleme uzaklığı.'),
        (9, [4], 'Durum uzayı ağacında derinlik öncelikli arama; P, NP ve NP-zor problemlere giriş.'),
        (10, [9], 'Geri izlemeye sınır eklenir: en iyi çözümü içeremeyecek dallar budanır.'),
        (11, [7, 9], 'NP-zor problemlerde kanıtlanmış oranlı çözüm: MST tabanlı 2-yaklaşım, LPT, düğüm kapsama.'),
        (12, [2, 6], 'Rastgele pivotlu hızlı sıralama ve QuickSelect; Las Vegas ve Monte Carlo türleri.'),
        (13, [7, 11], 'Geleceği bilmeden karar: rekabet oranı yaklaşım oranının çevrim içi karşılığıdır; sayfalama.'),
        (14, [1, 6], 'Bağımsız alt problemler paralel çözülür: önek toplamı, paralel birleştirme sıralaması, iş ve derinlik.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Temel problemlerden tasarım paradigmalarına, oradan zor problemlere ve diğer hesaplama modellerine geçilir.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>analiz → temel problemler → tasarım paradigmaları → zor problemler → diğer modeller</strong>. Sıralama ve arama, sonraki bütün bölümlerin hem aracı hem örneğidir. Böl ve fethet sıralamadan doğar ve dinamik programlamaya, rastgele ve paralel algoritmalara açılır. Çizge algoritmaları açgözlü yönteme ve durum uzayı aramasına örnek verir. Geri izleme ile dal sınır en iyi çözümü üstel zamanda arar; yaklaşım algoritmaları bunun yerine kanıtlanmış bir oranla yetinir. Çevrim içi algoritmalar aynı oran fikrini bilinmeyen geleceğe uygular.',
)

MAPS['computer'] = dict(
    title='Bilgisayar ve Programlamaya Giriş', folder='computer', page='computer-and-programming.md', ncols=4,
    rows=[[1], [2, 4], [3, 5], [6], [7, 8], [9, 10, 11], [12]],
    cols={0: [1.5], 1: [1, 2], 2: [0.5, 2], 3: [2], 4: [1.5, 2.5], 5: [1, 2, 3], 6: [1]},
    edges=[(1, 2), (1, 4), (2, 3), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (8, 10), (10, 11), (9, 12)],
    table=[
        (1, [], 'Verinin bitlerle temsili, donanım ve hesaplamalı düşünme; dersin bütün kavramlarının zemini.'),
        (2, [1], 'Donanımı yöneten yazılım: önyükleme, süreç, bellek ve dosya sistemi.'),
        (3, [2], 'İşletim sistemi üzerinde çalışan uygulamalar: Word, Excel ve PowerPoint.'),
        (4, [1], 'Hesaplamalı düşünme algoritmaya dönüşür: sözde kod, akış şeması, arama ve sıralama.'),
        (5, [2, 4], 'Algoritma Java koduna dönüşür: kaynak kod, derleyici, bytecode ve JVM.'),
        (6, [1, 5], 'Verinin programdaki karşılığı: ilkel tipler, taşma, tip dönüşümü ve işleçler.'),
        (7, [6], 'boolean ifadeler programın akışını seçer: if, else if, switch.'),
        (8, [7], 'Koşul doğru kaldıkça tekrar: for, while, do-while; sayaç ve biriktirici.'),
        (9, [8], 'Tekrar eden işi adlandırmak: parametre, dönüş değeri, çağrı yığını.'),
        (10, [8, 9], 'Döngüyle gezilen indisli veri; Algoritmalar bölümündeki arama ve sıralamanın Java kodu.'),
        (11, [9, 10], 'Karakter dizisi: String metotları, değiştirilemezlik ve StringBuilder.'),
        (12, [4, 9], 'Kendini çağıran metot: taban durumu, çağrı yığını, Hanoi ve ikili arama.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Bilgisayarın temellerinden algoritmaya, oradan Java ile programlamaya geçilir.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>bilgisayar → algoritma → program → yapı → yeniden kullanım</strong>. İlk kısım makineyi ve onu yöneten yazılımı tanıtır. Algoritmalar bölümü problem çözme adımlarını dile bağımsız biçimde yazar; Java bölümleri bu adımları sırayla koda çevirir: önce değişken ve işleç, sonra karar ve döngü, en sonda metot. Diziler ve dizgiler döngü ile metodun birlikte kullanıldığı yerdir; özyineleme ise metot çağrısını problemi küçültmenin aracı yapar.',
)

MAPS['java'] = dict(
    title='Java ile Nesne Yönelimli Programlama', folder='java', page='oop-with-java.md', ncols=4,
    rows=[[1, 2, 3], [4], [5, 6, 9], [10, 7, 8], [11]],
    cols={0: [0.5, 1.5, 2.5], 1: [1.5], 2: [0.5, 1.5, 2.5], 3: [0.5, 1.5, 2.5], 4: [2.5]},
    edges=[(1, 2), (2, 3), (3, 4), (4, 5), (4, 6), (4, 9), (5, 10), (6, 7), (6, 8), (8, 11)],
    table=[
        (1, [], 'Bilginin bellekte temsili, saklanan program ve algoritma; programlamanın zemini.'),
        (2, [1], 'Programlama dilinin söz dizimi ve anlamı; Java\'da derleme, tipler ve değişkenler.'),
        (3, [2], 'Akışı yöneten yapılar, metotlar, diziler ve dizgiler; nesnelerden önceki son araçlar.'),
        (4, [3], 'Veri ve davranış sınıfta birleşir: sarmalama, kalıtım, çok biçimlilik, arayüzler.'),
        (5, [4], 'Hazır sınıflar ve arayüzler: List, Set, Map; jenerikler ve karşılaştırıcılar.'),
        (6, [4], 'Hata da bir nesnedir: istisna hiyerarşisi kalıtımla kurulur; try, catch ve finally.'),
        (7, [4, 6], 'Sınıfların davranışını JUnit ile sınamak; beklenen istisnanın testi; hata ayıklama.'),
        (8, [5, 6], 'Akışlar ve dosyalar; G/Ç hataları kontrol edilen istisnalarla bildirilir.'),
        (9, [4], 'Swing bileşenleri kalıtımla genişletilir; olaylar dinleyici arayüzleriyle yakalanır.'),
        (10, [4, 5], 'Runnable arayüzü ve Thread sınıfı; paylaşılan koleksiyonlarda yarış durumu.'),
        (11, [6, 8], 'Kalıcı verinin ikinci biçimi: dosyadan veri tabanına; JDBC ve SQLException.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Programlama temelleri nesnelere, nesneler sağlam programlara ve uygulamalara götürür.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>temeller → nesne → sağlam program → uygulama</strong>. İlk üç bölüm dili ve yapısal programlamayı kurar. Nesneler ve sınıflar bölümü dersin merkezidir: sonraki her bölüm onun bir aracını kullanır. Koleksiyonlar arayüz ve jenerikleri, istisnalar kalıtım hiyerarşisini, grafik arayüzler kalıtım ile dinleyici arayüzlerini kullanır. Test ve istisnalar programın sağlamlığını, giriş çıkış ve veri tabanı ise verinin kalıcılığını ele alır.',
)

MAPS['microprocessors'] = dict(
    title='Mikroişlemciler', folder='microprocessors', page='microprocessors.md', ncols=4,
    rows=[[1, 2, 3], [4, 6], [5, 7], [10, 8, 11], [9]],
    cols={0: [0.5, 1.5, 2.5], 1: [1, 2.5], 2: [0.5, 2], 3: [0, 1.5, 3], 4: [1.5]},
    edges=[(1, 2), (2, 3), (3, 4), (3, 6), (4, 5), (6, 7), (5, 10), (7, 8), (7, 11), (8, 9)],
    table=[
        (1, [], 'Getir, çöz, yürüt döngüsü; ikilik ve onaltılık sayılar, ikiye tümleyen gösterim.'),
        (2, [1], '8086\'nın iç yapısı: BIU ve EU, yazmaçlar, bayraklar ve kesim:bağıl konum adresi.'),
        (3, [2], 'Makine dilinden assembly\'ye: assembler, bağlayıcı ve ilk program.'),
        (4, [2, 3], 'Adresleme modları, etkin ve fiziksel adres; DB, DW, DUP ile değişkenler.'),
        (5, [2, 4], 'INT sırasında FLAGS, CS ve IP yığına yazılır; kesme vektör tablosu bellektedir.'),
        (6, [1, 2, 3], 'Hesabın sonucu bayrakları kurar: CF, ZF, SF, OF; MUL, DIV ve kaydırmalar.'),
        (7, [6], 'Bayrakları okuyan koşullu atlamalar; CMP sonrası karar ve LOOP ile döngü.'),
        (8, [4, 5, 7], 'SS:SP ile yığın; CALL ve RET dönüş adresini yığında saklar; BP ile yığın çerçevesi.'),
        (9, [8], 'Prosedürün metinsel karşılığı: MACRO ile tanım ve açılım, emu8086.inc yordamları.'),
        (10, [2, 5], '40 pinli 8086, yol çevrimleri ve 8259A; IN ve OUT ile aygıt kontrolü.'),
        (11, [4, 6, 7], 'Komutların makine kodu: işlem kodu, D ve W bitleri, ModR/M; REP önekli dizgi komutları.'),
    ],
    caption='Oklar, bir konunun hangi konunun üzerine kurulduğunu gösterir. Mimariden assembly diline, komutlara, sistem hizmetlerine ve donanıma geçilir.',
    spine='Haritanın ana omurgası şöyle okunabilir: <strong>sayı → mimari → assembly → komut → donanım</strong>. İlk üç bölüm işlemciyi ve onu programlamanın dilini kurar. Buradan iki dal çıkar: bellek dalı adresleme ve değişkenlerle başlar, kesmelere ve aygıt kontrolüne varır; komut dalı aritmetik ve bayraklarla başlar, akış kontrolüne ve prosedürlere varır. Yığın iki dalın buluştuğu yerdir: hem CALL ile RET hem INT ile IRET onu kullanır. Komut kodlama bölümü öğrenilen komutların makine kodunda nasıl göründüğünü gösterir.',
)
