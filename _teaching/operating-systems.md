---
title: "Operating Systems"
lang_toggle: true
collection: teaching
type: "Undergraduate"
permalink: /teaching/operating-systems/
venue: "Giresun University, Computer Engineering"
date: 2026-01-06
location: "Giresun, Turkey"
og_image: https://sercankulcu.github.io/courses-pdfs/covers/isletim-sistemleri.jpg
course_language: [tr, en]
textbook:
  name: "İşletim Sistemleri"
  url: /books/isletim-sistemleri/
---

![operating systems](/images/teaching/teaching-operating-systems.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Operating systems are a fundamental part of modern computing. Operating systems manage hardware resources and provide abstractions and services for application software. They coordinate processor time, memory, storage, devices, and communication while supporting protection, isolation, and controlled resource sharing. An operating system provides a platform for programs to run. It acts as a bridge between hardware and software applications. This ensures that applications can interact with hardware using a standardized interface. The operating system handles tasks like memory management, process scheduling, and input/output operations. Without it, a computer is just a collection of hardware components.


<div data-lt="tr" lang="tr" markdown="1">

---

## Ders Kitabı

[📕 İşletim Sistemleri (PDF, 18 MB)](https://sercankulcu.github.io/courses-pdfs/os/Isletim-Sistemleri.pdf)

---

## Başlangıç Kaynakları

* [İşletim Sistemlerinin Öncüleri (HTML)](/files/os/Pioneers_of_Operating_Systems.html)
* [İşletim Sistemleri İçin Ön Bilgiler (HTML)](/files/os/Prerequisites_for_Operating_Systems.html)
* [Dersin Haritası (HTML)](/files/os/Ders_Haritasi.html)
* [Terim Sözlüğü (HTML)](/files/os/Sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş

İşletim sistemi donanım ile uygulamalar arasında duran ve ikisini birbirine bağlayan yazılımdır. Bu bölümde işletim sisteminin iki rolü (genişletilmiş makine ve kaynak yöneticisi), çekirdek ve kullanıcı modu ile mod geçişi, biriktirme ve kaynak paylaşımı, işletim sistemlerinin nesilden nesile tarihi, işletim sistemi için gereken donanım özeti, G/Ç yöntemlerine genel bakış ve işletim sistemi çeşitleri ele alınır.

- [🖼️Sunum-Giriş (HTML)](/files/os/sunumlar/Bolum_01_Giris.html)
- [📄Sunum-Giriş (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_01_Giris.pdf)
- [📖Ders Notu - Giriş (HTML)](/files/os/notlar/Bolum_01_Giris_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş (HTML)](/files/os/sunumlar/Bolum_01_Giris_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum01)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab01)

---

### Bölüm 2: İşletim Sistemi Yapıları

İşletim sistemi uygulamalara hizmetlerini sistem çağrıları üzerinden sunar. Bölüm; süreç, adres alanı, dosya ve boru gibi temel kavramları, çift modlu çalışma ve zamanlayıcıyla korumayı, sistem çağrılarının işleyişini ve POSIX ile Win32 arayüzlerini, standart C kütüphanesini anlatır. Monolitik, katmanlı, mikro çekirdekli, modüler, hibrit ve exokernel yapılar karşılaştırılır; sanal makinelere kısa bir giriş yapılır ve sistemin açılış süreci adım adım izlenir.

- [🖼️Sunum-İşletim Sistemi Yapıları (HTML)](/files/os/sunumlar/Bolum_02_Isletim_Sistemi_Yapilari.html)
- [📄Sunum-İşletim Sistemi Yapıları (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_02_Isletim_Sistemi_Yapilari.pdf)
- [📖Ders Notu - İşletim Sistemi Yapıları (HTML)](/files/os/notlar/Bolum_02_Isletim_Sistemi_Yapilari_Ders_Notu.html)
- [📝Çalışma Soruları - İşletim Sistemi Yapıları (HTML)](/files/os/sunumlar/Bolum_02_Isletim_Sistemi_Yapilari_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum02)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab02)

---

## Kısım II: Süreç Yönetimi

### Bölüm 3: Süreçler

Süreç, çalışmakta olan bir programdır. Bu bölümde sürecin bellekteki yerleşimi, fork, exec ve wait ile süreç oluşturma, kabuğun çalışma biçimi, süreç sonlandırma, zombi ve yetim süreçler, süreç durumları ve süreç kontrol bloğu, hazır ve bekleme kuyrukları, bağlam değiştirme ve maliyeti incelenir. Paylaşımlı bellek, ileti geçirme, borular ve soketlerle süreçler arası iletişim de bu bölümdedir.

- [🖼️Sunum-Süreçler (HTML)](/files/os/sunumlar/Bolum_03_Surecler.html)
- [📄Sunum-Süreçler (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_03_Surecler.pdf)
- [📖Ders Notu - Süreçler (HTML)](/files/os/notlar/Bolum_03_Surecler_Ders_Notu.html)
- [📝Çalışma Soruları - Süreçler (HTML)](/files/os/sunumlar/Bolum_03_Surecler_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum03)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab03)

---

### Bölüm 4: İş Parçacıkları

İş parçacığı, aynı süreç içinde bağımsız ilerleyen bir yürütme akışıdır. Bölüm; çok iş parçacıklı sunucu tasarımlarını, eş zamanlılık ile paralelliği ve Amdahl yasasını, kullanıcı ve çekirdek düzeyi iş parçacıklarını ve eşleme modellerini, POSIX Pthreads ile Java iş parçacıklarını ve sanal iş parçacıklarını, iş parçacığı havuzu, fork-join ve OpenMP gibi örtük yaklaşımları ve iş parçacıklarının yol açtığı sorunları ele alır.

- [🖼️Sunum-İş Parçacıkları (HTML)](/files/os/sunumlar/Bolum_04_Is_Parcaciklari.html)
- [📄Sunum-İş Parçacıkları (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_04_Is_Parcaciklari.pdf)
- [📖Ders Notu - İş Parçacıkları (HTML)](/files/os/notlar/Bolum_04_Is_Parcaciklari_Ders_Notu.html)
- [📝Çalışma Soruları - İş Parçacıkları (HTML)](/files/os/sunumlar/Bolum_04_Is_Parcaciklari_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum04)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Bolum04/src)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab04)

---

### Bölüm 5: CPU Çizelgeleme

Çizelgeleyici, hazır süreçlerden hangisinin işlemciyi alacağına karar verir. Bu bölümde çizelgeleme ölçütleri, FCFS, SJF, SRTF, öncelik ve Round Robin algoritmaları Gantt şemaları ve bekleme süresi hesaplarıyla, çok düzeyli geri beslemeli kuyruklar, piyango ve stride çizelgeleme anlatılır. Çok işlemcili çizelgelemede afinite ve yük dengeleme, gerçek zamanlı çizelgelemede hız monoton ve EDF ile Liu–Layland testi, son olarak Linux CFS/EEVDF ve Windows çizelgeleyicisi incelenir.

- [🖼️Sunum-CPU Çizelgeleme (HTML)](/files/os/sunumlar/Bolum_05_CPU_Cizelgeleme.html)
- [📄Sunum-CPU Çizelgeleme (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_05_CPU_Cizelgeleme.pdf)
- [📖Ders Notu - CPU Çizelgeleme (HTML)](/files/os/notlar/Bolum_05_CPU_Cizelgeleme_Ders_Notu.html)
- [📝Çalışma Soruları - CPU Çizelgeleme (HTML)](/files/os/sunumlar/Bolum_05_CPU_Cizelgeleme_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum05)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab05)

- [🕹️CPU Çizelgeleme Simülatörü (HTML)](/files/os/sunumlar/Bolum_05_CPU_Scheduling.html)
- [🕹️Gerçek Zamanlı Çizelgeleme Simülatörü (HTML)](/files/os/sunumlar/Bolum_05_Real_Time_Scheduling.html)

---

### Bölüm 6: Senkronizasyon

Paylaşılan veriye eş zamanlı erişim yarış durumlarına yol açar. Bölüm; kritik bölge problemini ve çözümün üç koşulunu, Peterson algoritmasını ve modern işlemcilerde neden bozulduğunu, atomik donanım komutlarını, spinlock ve mutex'i, semaforları, sınırlı tampon, okur-yazar ve yemek yiyen filozoflar problemlerini, monitörleri ve koşul değişkenlerini, POSIX ve Java senkronizasyon araçlarını, öncelik terslemesini ve Mars Pathfinder olayını ele alır.

- [🖼️Sunum-Senkronizasyon (HTML)](/files/os/sunumlar/Bolum_06_Senkronizasyon.html)
- [📄Sunum-Senkronizasyon (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_06_Senkronizasyon.pdf)
- [📖Ders Notu - Senkronizasyon (HTML)](/files/os/notlar/Bolum_06_Senkronizasyon_Ders_Notu.html)
- [📝Çalışma Soruları - Senkronizasyon (HTML)](/files/os/sunumlar/Bolum_06_Senkronizasyon_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum06)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Bolum06/src)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab06)

- [🕹️Senkronizasyon Laboratuvarı (HTML)](/files/os/sunumlar/Bolum_06_Synchronization_Lab.html)

---

### Bölüm 7: Kilitlenme

Kilitlenmede bir grup süreç, her biri ötekinin tuttuğu bir kaynağı beklediği için sonsuza dek bekler. Bu bölümde kilitlenmenin dört koşulu, kaynak tahsis çizgesi, tespit ve kurtarma algoritmaları, güvenli durum ve bankacı algoritmasıyla kaçınma, dört koşula saldırarak önleme, canlı kilit ve açlık incelenir; Java'da kilitlenme örnekleri ve jstack, lockdep gibi bulma araçları da gösterilir.

- [🖼️Sunum-Kilitlenme (HTML)](/files/os/sunumlar/Bolum_07_Kilitlenme.html)
- [📄Sunum-Kilitlenme (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_07_Kilitlenme.pdf)
- [📖Ders Notu - Kilitlenme (HTML)](/files/os/notlar/Bolum_07_Kilitlenme_Ders_Notu.html)
- [📝Çalışma Soruları - Kilitlenme (HTML)](/files/os/sunumlar/Bolum_07_Kilitlenme_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum07)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Bolum07/src)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab07)

- [🕹️Kilitlenme ve Bankacı Algoritması Simülatörü (HTML)](/files/os/sunumlar/Bolum_07_Deadlock_Bankers.html)

---

## Kısım III: Bellek ve Depolama

### Bölüm 8: Bellek Yönetimi

Bellek yöneticisi, süreçlerin belleği güvenle paylaşmasını sağlar. Bölüm; bellek donanımını ve önbelleği, taban ve limit yazmaçlarıyla korumayı, mantıksal ve fiziksel adresi, statik ve dinamik bağlamayı, takası, bitişik tahsisi ve parçalanmayı, boş alan yönetimini, sayfalamayı, TLB ile etkin erişim süresini, çok düzeyli, hash ve ters sayfa tablolarını, kesimlemeyi ve x86, ARM ile RISC-V'deki gerçek düzenleri anlatır.

- [🖼️Sunum-Bellek Yönetimi (HTML)](/files/os/sunumlar/Bolum_08_Bellek_Yonetimi.html)
- [📄Sunum-Bellek Yönetimi (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_08_Bellek_Yonetimi.pdf)
- [📖Ders Notu - Bellek Yönetimi (HTML)](/files/os/notlar/Bolum_08_Bellek_Yonetimi_Ders_Notu.html)
- [📝Çalışma Soruları - Bellek Yönetimi (HTML)](/files/os/sunumlar/Bolum_08_Bellek_Yonetimi_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum08)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab08)

- [🕹️Bellek Tahsisi Simülatörü (HTML)](/files/os/sunumlar/Bolum_08_Memory_Allocation.html)

---

### Bölüm 9: Sanal Bellek

Sanal bellek, süreçlerin fiziksel bellekten büyük adres alanlarıyla çalışmasını sağlar. Bu bölümde talebe bağlı sayfalama ve sayfa hatasının işlenmesi, yazınca kopyalama, bellek eşlemeli dosyalar, FIFO, OPT, LRU, saat ve yaşlandırma gibi sayfa yer değiştirme algoritmaları ve Belady anomalisi, çalışma kümesi ve WSClock, çerçeve tahsisi, thrashing, buddy ve slab ayırıcılarıyla çekirdek belleği ve Linux ile Windows'taki uygulamalar incelenir.

- [🖼️Sunum-Sanal Bellek (HTML)](/files/os/sunumlar/Bolum_09_Sanal_Bellek.html)
- [📄Sunum-Sanal Bellek (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_09_Sanal_Bellek.pdf)
- [📖Ders Notu - Sanal Bellek (HTML)](/files/os/notlar/Bolum_09_Sanal_Bellek_Ders_Notu.html)
- [📝Çalışma Soruları - Sanal Bellek (HTML)](/files/os/sunumlar/Bolum_09_Sanal_Bellek_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum09)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab09)

- [🕹️Sayfa Yer Değiştirme Simülatörü (HTML)](/files/os/sunumlar/Bolum_09_Page_Replacement.html)
- [🕹️Sayfalama ve Adres Çevirisi Simülatörü (HTML)](/files/os/sunumlar/Bolum_09_Address_Translation.html)

---

### Bölüm 10: Dosya Sistemleri

Dosya sistemi, verinin diskte kalıcı ve düzenli biçimde saklanmasını sağlar. Bölüm; dosya ve dizin kavramlarını, yol çözümlemesini, katı ve sembolik bağları, rwx izinlerini, MBR ve GPT disk düzenini, bitişik, bağlı, FAT ve i-node tabanlı tahsis yöntemlerini, ext4 ve NTFS'yi, boş alan yönetimini, tampon önbelleğini, günlükleme, yazınca kopyalama ve fsck ile tutarlılığı, VFS ve NFS'yi ele alır.

- [🖼️Sunum-Dosya Sistemleri (HTML)](/files/os/sunumlar/Bolum_10_Dosya_Sistemleri.html)
- [📄Sunum-Dosya Sistemleri (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_10_Dosya_Sistemleri.pdf)
- [📖Ders Notu - Dosya Sistemleri (HTML)](/files/os/notlar/Bolum_10_Dosya_Sistemleri_Ders_Notu.html)
- [📝Çalışma Soruları - Dosya Sistemleri (HTML)](/files/os/sunumlar/Bolum_10_Dosya_Sistemleri_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum10)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab10)

---

### Bölüm 11: Giriş/Çıkış

G/Ç sistemi, çok farklı hızlardaki aygıtları ortak bir arayüzle yönetir. Bu bölümde aygıt denetleyicileri ve yazmaçları, programlanmış G/Ç, kesmeler ve DMA, G/Ç yazılım katmanları ve aygıt sürücüleri, tamponlama, bloke eden ve eş zamansız G/Ç ile epoll ve io_uring, saatler, manyetik disk geometrisi ve disk kolu çizelgeleme algoritmaları, SSD, NVMe, TRIM, RAID ve kararlı depolama incelenir.

- [🖼️Sunum-Giriş/Çıkış (HTML)](/files/os/sunumlar/Bolum_11_Giris_Cikis.html)
- [📄Sunum-Giriş/Çıkış (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_11_Giris_Cikis.pdf)
- [📖Ders Notu - Giriş/Çıkış (HTML)](/files/os/notlar/Bolum_11_Giris_Cikis_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş/Çıkış (HTML)](/files/os/sunumlar/Bolum_11_Giris_Cikis_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum11)
- [🧪Laboratuvar Çalışması, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab11)

- [🕹️Disk Kolu Çizelgeleme Simülatörü (HTML)](/files/os/sunumlar/Bolum_11_Disk_Scheduling.html)
- [🕹️Kesme, DMA ve G/Ç Akışı Simülatörü (HTML)](/files/os/sunumlar/Bolum_11_IO_Interrupt_DMA.html)

---

## Kısım IV: İleri Konular

### Bölüm 12: Çok İşlemcili Sistemler

Birden çok işlemci, işletim sistemine yeni sorunlar getirir. Bölüm; UMA ve NUMA mimarilerini, önbellek tutarlılığını ve MESI protokolünü, yanlış paylaşımı, çok işlemcili işletim sistemi modellerini, spinlock'ların ölçeklenmesini, alan paylaşımı ve çete çizelgelemeyi, çoklu bilgisayarları ve RPC'yi, hipervizörler, donanım destekli sanallaştırma ve konteynerlerle sanallaştırmayı ve dağıtık sistemlerdeki ara yazılımları ele alır.

- [🖼️Sunum-Çok İşlemcili Sistemler (HTML)](/files/os/sunumlar/Bolum_12_Cok_Islemcili_Sistemler.html)
- [📄Sunum-Çok İşlemcili Sistemler (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_12_Cok_Islemcili_Sistemler.pdf)
- [📖Ders Notu - Çok İşlemcili Sistemler (HTML)](/files/os/notlar/Bolum_12_Cok_Islemcili_Sistemler_Ders_Notu.html)
- [📝Çalışma Soruları - Çok İşlemcili Sistemler (HTML)](/files/os/sunumlar/Bolum_12_Cok_Islemcili_Sistemler_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum12)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Bolum12/src)

- [🕹️Çok Çekirdekli Çizelgeleme ve Yük Dengeleme Simülatörü (HTML)](/files/os/sunumlar/Bolum_12_Multicore_Scheduling.html)

---

### Bölüm 13: Güvenlik

Güvenlik; gizlilik, bütünlük ve erişilebilirliği tehditlere karşı korumaktır. Bu bölümde kriptografinin temelleri ve TLS, koruma etki alanları, erişim denetim listeleri ve yetenekler, Bell-LaPadula ve Biba modelleri, parola saklama, çok etkenli kimlik doğrulama ve geçiş anahtarları, tampon taşması ve savunmaları, kötü amaçlı yazılımlar, korumalı alan ve SELinux, güvenli önyükleme, TPM ve Spectre gibi yan kanal saldırıları incelenir.

- [🖼️Sunum-Güvenlik (HTML)](/files/os/sunumlar/Bolum_13_Guvenlik.html)
- [📄Sunum-Güvenlik (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_13_Guvenlik.pdf)
- [📖Ders Notu - Güvenlik (HTML)](/files/os/notlar/Bolum_13_Guvenlik_Ders_Notu.html)
- [📝Çalışma Soruları - Güvenlik (HTML)](/files/os/sunumlar/Bolum_13_Guvenlik_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum13)

- [🕹️İşletim Sistemi Koruma ve İzinler Laboratuvarı (HTML)](/files/os/sunumlar/Bolum_13_Permissions_Security.html)

---

### Bölüm 14: İşletim Sistemi Tasarımı

İşletim sistemi tasarımı, birbiriyle çatışan hedefler arasında denge kurmayı gerektirir. Bölüm; arayüz tasarımının ilkelerini, sistem yapısı seçeneklerinin ödünleşimlerini, mekanizma ile politikanın ayrılmasını, adlandırma ve bağlama zamanını, dolaylılık ve yeniden kullanım gibi teknikleri, önbelleğe alma ve yerellikle performansı, büyük yazılım projelerinin yönetimini, çekirdek kodunun test edilmesi ve hata ayıklama araçlarını ve işletim sistemlerindeki güncel eğilimleri ele alır.

- [🖼️Sunum-İşletim Sistemi Tasarımı (HTML)](/files/os/sunumlar/Bolum_14_Isletim_Sistemi_Tasarimi.html)
- [📄Sunum-İşletim Sistemi Tasarımı (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_14_Isletim_Sistemi_Tasarimi.pdf)
- [📖Ders Notu - İşletim Sistemi Tasarımı (HTML)](/files/os/notlar/Bolum_14_Isletim_Sistemi_Tasarimi_Ders_Notu.html)
- [📝Çalışma Soruları - İşletim Sistemi Tasarımı (HTML)](/files/os/sunumlar/Bolum_14_Isletim_Sistemi_Tasarimi_Calisma_Sorulari.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum14)

---

### Bölüm 15: Linux

Linux, dersin kavramlarını gerçek bir sistemde bir arada gösterir. Bu bölümde UNIX'ten Linux'a gelişim, kabuk ve boru hatları, çekirdek yapısı ve modüller, task_struct, sinyaller ve clone, EEVDF çizelgeleyicisi ve systemd ile açılış, sanal adres alanı ve SLUB ayırıcısı, aygıt dosyaları ve blok katmanı, VFS, ext4 ve /proc, izin hesapları, ad alanları ve cgroups ile konteynerler ve Android'in Linux üzerine kurduğu yapı incelenir.

- [🖼️Sunum-Linux (HTML)](/files/os/sunumlar/Bolum_15_Linux.html)
- [📄Sunum-Linux (PDF)](https://sercankulcu.github.io/courses-pdfs/os/pdf/Bolum_15_Linux.pdf)
- [📖Ders Notu - Linux (HTML)](/files/os/notlar/Bolum_15_Linux_Ders_Notu.html)
- [📝Çalışma Soruları - Linux (HTML)](/files/os/sunumlar/Bolum_15_Linux_Calisma_Sorulari.html)

- [🕹️Linux Süreç Gezgini (HTML)](/files/os/sunumlar/Bolum_15_Linux_Process_Explorer.html)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/Bolum15)

</div>

<div data-lt="en" lang="en" markdown="1">

---

## Part I: Foundations

### Chapter 1: Introduction

An operating system is the software that sits between the hardware and applications and connects the two. This chapter presents its two roles, as an extended machine and as a resource manager, together with kernel and user mode and the switch between them, spooling and resource sharing. It traces the history of operating systems generation by generation, summarizes the hardware an operating system relies on, gives an overview of I/O methods and surveys the different kinds of operating systems.

- [🖼️Slides – Introduction (HTML)](/files/os/slides/Chapter_01_Introduction.html)

---

### Chapter 2: Operating-System Structures

An operating system offers its services to applications through system calls. The chapter introduces core abstractions such as processes, address spaces, files and pipes, protection through dual-mode operation and the timer, how system calls work, the POSIX and Win32 interfaces and the standard C library. It compares monolithic, layered, microkernel, modular, hybrid and exokernel designs, gives a short introduction to virtual machines and follows the boot process step by step.

- [🖼️Slides – Operating-System Structures (HTML)](/files/os/slides/Chapter_02_Operating_System_Structures.html)

---

## Part II: Process Management

### Chapter 3: Processes

A process is a program in execution. This chapter examines the memory layout of a process, process creation with fork, exec and wait, how a shell works, process termination, and zombie and orphan processes. It continues with process states and the process control block, ready and wait queues, and context switching and its cost, and covers interprocess communication through shared memory, message passing, pipes and sockets.

- [🖼️Slides – Processes (HTML)](/files/os/slides/Chapter_03_Processes.html)

---

### Chapter 4: Threads

A thread is an independent flow of execution within a process. The chapter looks at multithreaded server designs, concurrency versus parallelism and Amdahl's law, user-level and kernel-level threads and the models that map one onto the other. It covers POSIX Pthreads, Java threads and virtual threads, implicit approaches such as thread pools, fork-join and OpenMP, and the problems that threads introduce.

- [🖼️Slides – Threads (HTML)](/files/os/slides/Chapter_04_Threads.html)

---

### Chapter 5: CPU Scheduling

The scheduler decides which ready process gets the processor next. This chapter presents scheduling criteria and the FCFS, SJF, SRTF, priority and round-robin algorithms with Gantt charts and waiting-time calculations, followed by multilevel feedback queues, lottery and stride scheduling. Multiprocessor scheduling brings in affinity and load balancing, real-time scheduling covers rate-monotonic and EDF scheduling with the Liu–Layland test, and the chapter ends with Linux CFS/EEVDF and the Windows scheduler.

- [🖼️Slides – CPU Scheduling (HTML)](/files/os/slides/Chapter_05_CPU_Scheduling.html)

---

### Chapter 6: Synchronization

Concurrent access to shared data leads to race conditions. The chapter states the critical-section problem and the three requirements of a solution, presents Peterson's algorithm and why it breaks on modern processors, and introduces atomic hardware instructions, spinlocks and mutexes, and semaphores. It works through the bounded-buffer, readers-writers and dining-philosophers problems, monitors and condition variables, and the POSIX and Java synchronization tools, closing with priority inversion and the Mars Pathfinder incident.

- [🖼️Slides – Synchronization (HTML)](/files/os/slides/Chapter_06_Synchronization.html)

---

### Chapter 7: Deadlocks

In a deadlock, a group of processes waits forever because each holds a resource another one needs. This chapter covers the four conditions for deadlock, the resource-allocation graph, and detection and recovery algorithms. It then treats avoidance with safe states and the banker's algorithm, prevention by attacking each of the four conditions, and livelock and starvation, with deadlock examples in Java and detection tools such as jstack and lockdep.

- [🖼️Slides – Deadlocks (HTML)](/files/os/slides/Chapter_07_Deadlocks.html)

---

## Part III: Memory and Storage

### Chapter 8: Memory Management

The memory manager lets processes share memory safely. The chapter covers memory hardware and caches, protection with base and limit registers, logical and physical addresses, static and dynamic binding, swapping, contiguous allocation and fragmentation, and free-space management. It then develops paging, the TLB and effective access time, multilevel, hashed and inverted page tables, and segmentation, and looks at the actual layouts used on x86, ARM and RISC-V.

- [🖼️Slides – Memory Management (HTML)](/files/os/slides/Chapter_08_Memory_Management.html)

---

### Chapter 9: Virtual Memory

Virtual memory lets processes work with address spaces larger than physical memory. This chapter examines demand paging and page-fault handling, copy-on-write and memory-mapped files, and page-replacement algorithms such as FIFO, OPT, LRU, clock and aging, together with Belady's anomaly. It continues with the working set and WSClock, frame allocation and thrashing, kernel memory with the buddy and slab allocators, and how Linux and Windows implement these ideas.

- [🖼️Slides – Virtual Memory (HTML)](/files/os/slides/Chapter_09_Virtual_Memory.html)

---

### Chapter 10: File Systems

A file system stores data on disk persistently and in an organized way. The chapter covers files and directories, path resolution, hard and symbolic links, rwx permissions, and the MBR and GPT disk layouts. It compares contiguous, linked, FAT and inode-based allocation, examines ext4 and NTFS, free-space management and the buffer cache, and treats consistency through journaling, copy-on-write and fsck before closing with VFS and NFS.

- [🖼️Slides – File Systems (HTML)](/files/os/slides/Chapter_10_File_Systems.html)

---

### Chapter 11: Input/Output

The I/O system manages devices of very different speeds through a common interface. This chapter covers device controllers and their registers, programmed I/O, interrupts and DMA, the layers of I/O software and device drivers, and buffering. It goes on to blocking and asynchronous I/O with epoll and io_uring, clocks, magnetic disk geometry and disk-arm scheduling algorithms, and ends with SSDs, NVMe, TRIM, RAID and stable storage.

- [🖼️Slides – Input/Output (HTML)](/files/os/slides/Chapter_11_Input_Output.html)

---

## Part IV: Advanced Topics

### Chapter 12: Multiprocessor Systems

Multiple processors raise new problems for the operating system. The chapter covers UMA and NUMA architectures, cache coherence and the MESI protocol, false sharing, multiprocessor operating-system models, scaling spinlocks, and space sharing and gang scheduling. It then turns to multicomputers and RPC, virtualization with hypervisors, hardware-assisted virtualization and containers, and middleware for distributed systems.

- [🖼️Slides – Multiprocessor Systems (HTML)](/files/os/slides/Chapter_12_Multiprocessor_Systems.html)

---

### Chapter 13: Security

Security means protecting confidentiality, integrity and availability against threats. This chapter introduces the basics of cryptography and TLS, protection domains, access control lists and capabilities, and the Bell–LaPadula and Biba models. It covers password storage, multi-factor authentication and passkeys, buffer overflows and their defenses, malware, sandboxing and SELinux, and closes with secure boot, the TPM and side-channel attacks such as Spectre.

- [🖼️Slides – Security (HTML)](/files/os/slides/Chapter_13_Security.html)

---

### Chapter 14: Operating-System Design

Designing an operating system means balancing goals that pull against each other. The chapter discusses principles of interface design, the trade-offs between system structures, separating mechanism from policy, naming and binding time, and techniques such as indirection and reuse. It also covers performance through caching and locality, managing large software projects, testing kernel code and debugging tools, and current trends in operating systems.

- [🖼️Slides – Operating-System Design (HTML)](/files/os/slides/Chapter_14_Operating_System_Design.html)

---

### Chapter 15: Linux

Linux brings the concepts of the course together in a real system. This chapter follows the path from UNIX to Linux, the shell and pipelines, the kernel structure and modules, task_struct, signals and clone, and the EEVDF scheduler and booting with systemd. It continues with the virtual address space and the SLUB allocator, device files and the block layer, VFS, ext4 and /proc, permission checks, namespaces and cgroups for containers, and the way Android is built on top of Linux.

- [🖼️Slides – Linux (HTML)](/files/os/slides/Chapter_15_Linux.html)

</div>
