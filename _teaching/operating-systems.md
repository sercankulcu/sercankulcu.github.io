---
title: "Operating Systems"
collection: teaching
type: "Undergraduate"
permalink: /teaching/operating-systems
redirect_from:
  - /files/os/slides/Bolum_14_Coklu_Ortam.html
  - /files/os/slides/Bolum_14_Coklu_Ortam_Calisma_Sorulari.html
  - /files/os/slides/Bolum_14_Coklu_Ortam_Sorular.html
venue: "Giresun University, Computer Engineering"
date: 2026-01-06
location: "Giresun, Turkey"
---

![operating systems](/images/teaching/teaching-operating-systems.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Operating systems are a fundamental part of modern computing. Operating systems manage hardware resources and provide abstractions and services for application software. They coordinate processor time, memory, storage, devices, and communication while supporting protection, isolation, and controlled resource sharing. An operating system provides a platform for programs to run. It acts as a bridge between hardware and software applications. This ensures that applications can interact with hardware using a standardized interface. The operating system handles tasks like memory management, process scheduling, and input/output operations. Without it, a computer is just a collection of hardware components.

---

## Başlangıç Kaynakları

* [İşletim Sistemlerinin Öncüleri (HTML)](../files/os/Pioneers_of_Operating_Systems.html)
* [İşletim Sistemleri İçin Ön Bilgiler (HTML)](../files/os/Prerequisites_for_Operating_Systems.html)
* [Terim Sözlüğü (HTML)](../files/os/sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş

İşletim sistemi donanım ile uygulamalar arasında duran ve ikisini birbirine bağlayan yazılımdır. Bu bölümde işletim sisteminin iki rolü (genişletilmiş makine ve kaynak yöneticisi), çekirdek ve kullanıcı kipi ile kip geçişi, biriktirme ve kaynak paylaşımı, işletim sistemlerinin nesilden nesile tarihi, işletim sistemi için gereken donanım özeti, G/Ç yöntemlerine genel bakış ve işletim sistemi çeşitleri ele alınır.

- [🖼️Sunum-Giriş (HTML)](../files/os/slides/Bolum_01_Giris.html)
- [📄Sunum-Giriş (PDF)](../files/os/pdf/Bolum_01_Giris.pdf)
- [📖Ders Notu - Giriş (HTML)](../files/os/notlar/Bolum_01_Giris_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş (HTML)](../files/os/slides/Bolum_01_Giris_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter01/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab01)

---

### Bölüm 2: İşletim Sistemi Yapıları

İşletim sistemi uygulamalara hizmetlerini sistem çağrıları üzerinden sunar. Bölüm; süreç, adres alanı, dosya ve boru gibi temel kavramları, çift kipli çalışma ve zamanlayıcıyla korumayı, sistem çağrılarının işleyişini ve POSIX ile Win32 arayüzlerini, standart C kütüphanesini anlatır. Monolitik, katmanlı, mikro çekirdekli, modüler, hibrit ve exokernel yapılar karşılaştırılır; sanal makinelere kısa bir giriş yapılır ve sistemin açılış süreci adım adım izlenir.

- [🖼️Sunum-İşletim Sistemi Yapıları (HTML)](../files/os/slides/Bolum_02_Yapilar.html)
- [📄Sunum-İşletim Sistemi Yapıları (PDF)](../files/os/pdf/Bolum_02_Yapilar.pdf)
- [📖Ders Notu - İşletim Sistemi Yapıları (HTML)](../files/os/notlar/Bolum_02_Yapilar_Ders_Notu.html)
- [📝Çalışma Soruları - İşletim Sistemi Yapıları (HTML)](../files/os/slides/Bolum_02_Yapilar_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter02/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab02)

---

## Kısım II: Süreç Yönetimi

### Bölüm 3: Süreçler

Süreç, çalışmakta olan bir programdır. Bu bölümde sürecin bellekteki yerleşimi, fork, exec ve wait ile süreç oluşturma, kabuğun çalışma biçimi, süreç sonlandırma, zombi ve yetim süreçler, süreç durumları ve süreç kontrol bloğu, hazır ve bekleme kuyrukları, bağlam değiştirme ve maliyeti incelenir. Paylaşımlı bellek, ileti geçirme, borular ve soketlerle süreçler arası iletişim de bu bölümdedir.

- [🖼️Sunum-Süreçler (HTML)](../files/os/slides/Bolum_03_Surecler.html)
- [📄Sunum-Süreçler (PDF)](../files/os/pdf/Bolum_03_Surecler.pdf)
- [📖Ders Notu - Süreçler (HTML)](../files/os/notlar/Bolum_03_Surecler_Ders_Notu.html)
- [📝Çalışma Soruları - Süreçler (HTML)](../files/os/slides/Bolum_03_Surecler_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter03/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab03)

---

### Bölüm 4: İş Parçacıkları

İş parçacığı, aynı süreç içinde bağımsız ilerleyen bir yürütme akışıdır. Bölüm; çok iş parçacıklı sunucu tasarımlarını, eş zamanlılık ile paralelliği ve Amdahl yasasını, kullanıcı ve çekirdek düzeyi iş parçacıklarını ve eşleme modellerini, POSIX Pthreads ile Java iş parçacıklarını ve sanal iş parçacıklarını, iş parçacığı havuzu, fork-join ve OpenMP gibi örtük yaklaşımları ve iş parçacıklarının yol açtığı sorunları ele alır.

- [🖼️Sunum-İş Parçacıkları (HTML)](../files/os/slides/Bolum_04_Is_Parcaciklari.html)
- [📄Sunum-İş Parçacıkları (PDF)](../files/os/pdf/Bolum_04_Is_Parcaciklari.pdf)
- [📖Ders Notu - İş Parçacıkları (HTML)](../files/os/notlar/Bolum_04_Is_Parcaciklari_Ders_Notu.html)
- [📝Çalışma Soruları - İş Parçacıkları (HTML)](../files/os/slides/Bolum_04_Is_Parcaciklari_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter04/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab04)

---

### Bölüm 5: CPU Çizelgeleme

Çizelgeleyici, hazır süreçlerden hangisinin işlemciyi alacağına karar verir. Bu bölümde çizelgeleme ölçütleri, FCFS, SJF, SRTF, öncelik ve Round Robin algoritmaları Gantt şemaları ve bekleme süresi hesaplarıyla, çok düzeyli geri beslemeli kuyruklar, piyango ve stride çizelgeleme anlatılır. Çok işlemcili çizelgelemede afinite ve yük dengeleme, gerçek zamanlı çizelgelemede hız monoton ve EDF ile Liu–Layland testi, son olarak Linux CFS/EEVDF ve Windows çizelgeleyicisi incelenir.

- [🖼️Sunum-CPU Çizelgeleme (HTML)](../files/os/slides/Bolum_05_Cizelgeleme.html)
- [📄Sunum-CPU Çizelgeleme (PDF)](../files/os/pdf/Bolum_05_Cizelgeleme.pdf)
- [📖Ders Notu - CPU Çizelgeleme (HTML)](../files/os/notlar/Bolum_05_Cizelgeleme_Ders_Notu.html)
- [📝Çalışma Soruları - CPU Çizelgeleme (HTML)](../files/os/slides/Bolum_05_Cizelgeleme_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter05/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab05)

- [🕹️CPU Çizelgeleme Simülatörü (HTML)](../files/os/slides/Chapter_05_CPU_Scheduling.html)
- [🕹️Gerçek Zamanlı Çizelgeleme Simülatörü (HTML)](../files/os/slides/Chapter_05_Real_Time_Scheduling.html)

---

### Bölüm 6: Senkronizasyon

Paylaşılan veriye eş zamanlı erişim yarış durumlarına yol açar. Bölüm; kritik bölge problemini ve çözümün üç koşulunu, Peterson algoritmasını ve modern işlemcilerde neden bozulduğunu, atomik donanım komutlarını, spinlock ve mutex'i, semaforları, sınırlı tampon, okur-yazar ve yemek yiyen filozoflar problemlerini, monitörleri ve koşul değişkenlerini, POSIX ve Java senkronizasyon araçlarını, öncelik terslemesini ve Mars Pathfinder olayını ele alır.

- [🖼️Sunum-Senkronizasyon (HTML)](../files/os/slides/Bolum_06_Senkronizasyon.html)
- [📄Sunum-Senkronizasyon (PDF)](../files/os/pdf/Bolum_06_Senkronizasyon.pdf)
- [📖Ders Notu - Senkronizasyon (HTML)](../files/os/notlar/Bolum_06_Senkronizasyon_Ders_Notu.html)
- [📝Çalışma Soruları - Senkronizasyon (HTML)](../files/os/slides/Bolum_06_Senkronizasyon_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter06/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab06)

- [🕹️Senkronizasyon Laboratuvarı (HTML)](../files/os/slides/Chapter_06_Synchronization_Lab.html)

---

### Bölüm 7: Kilitlenme

Kilitlenmede bir grup süreç, her biri ötekinin tuttuğu bir kaynağı beklediği için sonsuza dek bekler. Bu bölümde kilitlenmenin dört koşulu, kaynak tahsis çizgesi, tespit ve kurtarma algoritmaları, güvenli durum ve bankacı algoritmasıyla kaçınma, dört koşula saldırarak önleme, canlı kilit ve açlık incelenir; Java'da kilitlenme örnekleri ve jstack, lockdep gibi bulma araçları da gösterilir.

- [🖼️Sunum-Kilitlenme (HTML)](../files/os/slides/Bolum_07_Kilitlenme.html)
- [📄Sunum-Kilitlenme (PDF)](../files/os/pdf/Bolum_07_Kilitlenme.pdf)
- [📖Ders Notu - Kilitlenme (HTML)](../files/os/notlar/Bolum_07_Kilitlenme_Ders_Notu.html)
- [📝Çalışma Soruları - Kilitlenme (HTML)](../files/os/slides/Bolum_07_Kilitlenme_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter07/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab07)

- [🕹️Kilitlenme ve Bankacı Algoritması Simülatörü (HTML)](../files/os/slides/Chapter_07_Deadlock_Bankers.html)

---

## Kısım III: Bellek ve Depolama

### Bölüm 8: Bellek Yönetimi

Bellek yöneticisi, süreçlerin belleği güvenle paylaşmasını sağlar. Bölüm; bellek donanımını ve önbelleği, taban ve limit yazmaçlarıyla korumayı, mantıksal ve fiziksel adresi, statik ve dinamik bağlamayı, takası, bitişik tahsisi ve parçalanmayı, boş alan yönetimini, sayfalamayı, TLB ile etkin erişim süresini, çok düzeyli, hash ve ters sayfa tablolarını, kesimlemeyi ve x86, ARM ile RISC-V'deki gerçek düzenleri anlatır.

- [🖼️Sunum-Bellek Yönetimi (HTML)](../files/os/slides/Bolum_08_Bellek_Yonetimi.html)
- [📄Sunum-Bellek Yönetimi (PDF)](../files/os/pdf/Bolum_08_Bellek_Yonetimi.pdf)
- [📖Ders Notu - Bellek Yönetimi (HTML)](../files/os/notlar/Bolum_08_Bellek_Yonetimi_Ders_Notu.html)
- [📝Çalışma Soruları - Bellek Yönetimi (HTML)](../files/os/slides/Bolum_08_Bellek_Yonetimi_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter08/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab08)

- [🕹️Bellek Tahsisi Simülatörü (HTML)](../files/os/slides/Chapter_08_Memory_Allocation.html)

---

### Bölüm 9: Sanal Bellek

Sanal bellek, süreçlerin fiziksel bellekten büyük adres alanlarıyla çalışmasını sağlar. Bu bölümde talebe bağlı sayfalama ve sayfa hatasının işlenmesi, yazınca kopyalama, bellek eşlemeli dosyalar, FIFO, OPT, LRU, saat ve yaşlandırma gibi sayfa yer değiştirme algoritmaları ve Belady anomalisi, çalışma kümesi ve WSClock, çerçeve tahsisi, thrashing, buddy ve slab ayırıcılarıyla çekirdek belleği ve Linux ile Windows'taki uygulamalar incelenir.

- [🖼️Sunum-Sanal Bellek (HTML)](../files/os/slides/Bolum_09_Sanal_Bellek.html)
- [📄Sunum-Sanal Bellek (PDF)](../files/os/pdf/Bolum_09_Sanal_Bellek.pdf)
- [📖Ders Notu - Sanal Bellek (HTML)](../files/os/notlar/Bolum_09_Sanal_Bellek_Ders_Notu.html)
- [📝Çalışma Soruları - Sanal Bellek (HTML)](../files/os/slides/Bolum_09_Sanal_Bellek_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter09/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab09)

- [🕹️Sayfa Yer Değiştirme Simülatörü (HTML)](../files/os/slides/Chapter_09_Page_Replacement.html)
- [🕹️Sayfalama ve Adres Çevirisi Simülatörü (HTML)](../files/os/slides/Chapter_09_Address_Translation.html)

---

### Bölüm 10: Dosya Sistemleri

Dosya sistemi, verinin diskte kalıcı ve düzenli biçimde saklanmasını sağlar. Bölüm; dosya ve dizin kavramlarını, yol çözümlemesini, katı ve sembolik bağları, rwx izinlerini, MBR ve GPT disk düzenini, bitişik, bağlı, FAT ve i-node tabanlı tahsis yöntemlerini, ext4 ve NTFS'yi, boş alan yönetimini, tampon önbelleğini, günlükleme, yazınca kopyalama ve fsck ile tutarlılığı, VFS ve NFS'yi ele alır.

- [🖼️Sunum-Dosya Sistemleri (HTML)](../files/os/slides/Bolum_10_Dosya_Sistemleri.html)
- [📄Sunum-Dosya Sistemleri (PDF)](../files/os/pdf/Bolum_10_Dosya_Sistemleri.pdf)
- [📖Ders Notu - Dosya Sistemleri (HTML)](../files/os/notlar/Bolum_10_Dosya_Sistemleri_Ders_Notu.html)
- [📝Çalışma Soruları - Dosya Sistemleri (HTML)](../files/os/slides/Bolum_10_Dosya_Sistemleri_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter10/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab10)

---

### Bölüm 11: Giriş/Çıkış

G/Ç sistemi, çok farklı hızlardaki aygıtları ortak bir arayüzle yönetir. Bu bölümde aygıt denetleyicileri ve yazmaçları, programlanmış G/Ç, kesmeler ve DMA, G/Ç yazılım katmanları ve aygıt sürücüleri, tamponlama, bloke eden ve eş zamansız G/Ç ile epoll ve io_uring, saatler, manyetik disk geometrisi ve disk kolu çizelgeleme algoritmaları, SSD, NVMe, TRIM, RAID ve kararlı depolama incelenir.

- [🖼️Sunum-Giriş/Çıkış (HTML)](../files/os/slides/Bolum_11_Giris_Cikis.html)
- [📄Sunum-Giriş/Çıkış (PDF)](../files/os/pdf/Bolum_11_Giris_Cikis.pdf)
- [📖Ders Notu - Giriş/Çıkış (HTML)](../files/os/notlar/Bolum_11_Giris_Cikis_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş/Çıkış (HTML)](../files/os/slides/Bolum_11_Giris_Cikis_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter11/src)
- [💻Kod Örnekleri, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab11)

- [🕹️Disk Kolu Çizelgeleme Simülatörü (HTML)](../files/os/slides/Chapter_11_Disk_Scheduling.html)
- [🕹️Kesme, DMA ve G/Ç Akışı Simülatörü (HTML)](../files/os/slides/Chapter_11_IO_Interrupt_DMA.html)

---

## Kısım IV: İleri Konular

### Bölüm 12: Çok İşlemcili Sistemler

Birden çok işlemci, işletim sistemine yeni sorunlar getirir. Bölüm; UMA ve NUMA mimarilerini, önbellek tutarlılığını ve MESI protokolünü, yanlış paylaşımı, çok işlemcili işletim sistemi modellerini, spinlock'ların ölçeklenmesini, alan paylaşımı ve çete çizelgelemeyi, çoklu bilgisayarları ve RPC'yi, hipervizörler, donanım destekli sanallaştırma ve konteynerlerle sanallaştırmayı ve dağıtık sistemlerdeki ara yazılımları ele alır.

- [🖼️Sunum-Çok İşlemcili Sistemler (HTML)](../files/os/slides/Bolum_12_Cok_Islemcili_Sistemler.html)
- [📄Sunum-Çok İşlemcili Sistemler (PDF)](../files/os/pdf/Bolum_12_Cok_Islemcili_Sistemler.pdf)
- [📖Ders Notu - Çok İşlemcili Sistemler (HTML)](../files/os/notlar/Bolum_12_Cok_Islemcili_Sistemler_Ders_Notu.html)
- [📝Çalışma Soruları - Çok İşlemcili Sistemler (HTML)](../files/os/slides/Bolum_12_Cok_Islemcili_Sistemler_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter12/src)

- [🕹️Çok Çekirdekli Çizelgeleme ve Yük Dengeleme Simülatörü (HTML)](../files/os/slides/Chapter_12_Multicore_Scheduling.html)

---

### Bölüm 13: Güvenlik

Güvenlik; gizlilik, bütünlük ve erişilebilirliği tehditlere karşı korumaktır. Bu bölümde kriptografinin temelleri ve TLS, koruma etki alanları, erişim denetim listeleri ve yetenekler, Bell-LaPadula ve Biba modelleri, parola saklama, çok faktörlü kimlik doğrulama ve geçiş anahtarları, tampon taşması ve savunmaları, kötü amaçlı yazılımlar, korumalı alan ve SELinux, güvenli önyükleme, TPM ve Spectre gibi yan kanal saldırıları incelenir.

- [🖼️Sunum-Güvenlik (HTML)](../files/os/slides/Bolum_13_Guvenlik.html)
- [📄Sunum-Güvenlik (PDF)](../files/os/pdf/Bolum_13_Guvenlik.pdf)
- [📖Ders Notu - Güvenlik (HTML)](../files/os/notlar/Bolum_13_Guvenlik_Ders_Notu.html)
- [📝Çalışma Soruları - Güvenlik (HTML)](../files/os/slides/Bolum_13_Guvenlik_Calisma_Sorulari.html)
- [💻Kod Örnekleri, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter13/src)

- [🕹️İşletim Sistemi Koruma ve İzinler Laboratuvarı (HTML)](../files/os/slides/Chapter_13_Permissions_Security.html)

---

### Bölüm 14: İşletim Sistemi Tasarımı

İşletim sistemi tasarımı, birbiriyle çatışan hedefler arasında denge kurmayı gerektirir. Bölüm; arayüz tasarımının ilkelerini, sistem yapısı seçeneklerinin ödünleşimlerini, mekanizma ile politikanın ayrılmasını, adlandırma ve bağlama zamanını, dolaylılık ve yeniden kullanım gibi teknikleri, önbelleğe alma ve yerellikle performansı, büyük yazılım projelerinin yönetimini, çekirdek kodunun test edilmesi ve hata ayıklama araçlarını ve işletim sistemlerindeki güncel eğilimleri ele alır.

- [🖼️Sunum-İşletim Sistemi Tasarımı (HTML)](../files/os/slides/Bolum_14_Isletim_Sistemi_Tasarimi.html)
- [📄Sunum-İşletim Sistemi Tasarımı (PDF)](../files/os/pdf/Bolum_14_Isletim_Sistemi_Tasarimi.pdf)
- [📖Ders Notu - İşletim Sistemi Tasarımı (HTML)](../files/os/notlar/Bolum_14_Isletim_Sistemi_Tasarimi_Ders_Notu.html)
- [📝Çalışma Soruları - İşletim Sistemi Tasarımı (HTML)](../files/os/slides/Bolum_14_Isletim_Sistemi_Tasarimi_Calisma_Sorulari.html)

---

### Bölüm 15: Linux

Linux, dersin kavramlarını gerçek bir sistemde bir arada gösterir. Bu bölümde UNIX'ten Linux'a gelişim, kabuk ve boru hatları, çekirdek yapısı ve modüller, task_struct, sinyaller ve clone, EEVDF çizelgeleyicisi ve systemd ile açılış, sanal adres alanı ve SLUB ayırıcısı, aygıt dosyaları ve blok katmanı, VFS, ext4 ve /proc, izin hesapları, ad alanları ve cgroups ile konteynerler ve Android'in Linux üzerine kurduğu yapı incelenir.

- [🖼️Sunum-Linux (HTML)](../files/os/slides/Bolum_15_Linux.html)
- [📄Sunum-Linux (PDF)](../files/os/pdf/Bolum_15_Linux.pdf)
- [📖Ders Notu - Linux (HTML)](../files/os/notlar/Bolum_15_Linux_Ders_Notu.html)
- [📝Çalışma Soruları - Linux (HTML)](../files/os/slides/Bolum_15_Linux_Calisma_Sorulari.html)

- [🕹️Linux Süreç Gezgini (HTML)](../files/os/slides/Chapter_15_Linux_Process_Explorer.html)
