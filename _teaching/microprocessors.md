---
title: "Microprocessors"
collection: teaching
type: "Undergraduate"
permalink: /teaching/microprocessors
venue: "Giresun University, Electrical Electronics Engineering"
date: 2024-01-05
location: "Giresun, Turkey"
---

![microprocessor](/images/teaching/teaching-microprocessors.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Microprocessors execute instructions, process data, and coordinate the operations of modern computing systems. The 8086 architecture provides a useful foundation for studying processor organization, registers, memory access, instruction execution, and low-level programming. The 8086 is an early member of the x86 family. Although modern x86-64 processors are substantially more complex, the 8086 remains useful for introducing registers, segmentation, instruction execution, addressing modes, interrupts, and assembly programming.

---

## Başlangıç Kaynakları

* [Mikroişlemcilerde Önemli İsimler (HTML)](../files/microprocessors/Microprocessors_Important_People.html)
* [Mikroişlemciler İçin Ön Bilgiler (HTML)](../files/microprocessors/Microprocessors_Prerequisites.html)
* [Terim Sözlüğü (HTML)](../files/microprocessors/sozluk.html)

---

## Araçlar

- [8086 Emülatörü (ZIP)](../files/microprocessors/8086emulator.zip)
- [🕹️İşlemci Simülatörü (HTML)](../files/microprocessors/slides/CPU_Simulator.html)

---

## Kısım I: Temeller

### Bölüm 1: Mikroişlemcilere Giriş ve Sayı Sistemleri

Mikroişlemci, komutları bellekten getirip çözen ve yürüten bir bilgisayar sisteminin merkezidir. Bölüm mikroişlemci ile mikrodenetleyici ayrımı, getir–çöz–yürüt döngüsü, işlemcinin iç yapısı ve saat hızıyla başlar; CISC, RISC ve EPIC tasarımları, özel amaçlı işlemciler ve 4004'ten günümüze Intel x86 ailesinin gelişimi ele alınır. Sayı sistemleri kısmında onluk, ikili ve onaltılık tabanlar, taban dönüşümleri, bire ve ikiye tümleyen ile işaretli sayılar ve ikili aritmetik işlenir. IEEE 754 kayan nokta biçimi, BCD, Gray kodu ve bayt sıralaması gibi kodlamalarla bölüm tamamlanır.

- [🖼️Sunum-Giriş (HTML)](../files/microprocessors/slides/Bolum_01_Giris.html)
- [📄Sunum-Giriş (PDF)](../files/microprocessors/pdf/Bolum_01_Giris.pdf)
- [📝Çalışma Soruları - Giriş (HTML)](../files/microprocessors/slides/Bolum_01_Giris_Calisma_Sorulari.html)
  - [🕹️İşlemci Simülatörü (HTML)](../files/microprocessors/slides/CPU_Simulator.html)
- [🖼️Sunum-Sayı Sistemleri (HTML)](../files/microprocessors/slides/Bolum_01_Sayi_Sistemleri.html)
- [📄Sunum-Sayı Sistemleri (PDF)](../files/microprocessors/pdf/Bolum_01_Sayi_Sistemleri.pdf)
- [📝Çalışma Soruları - Sayı Sistemleri (HTML)](../files/microprocessors/slides/Bolum_01_Sayi_Sistemleri_Calisma_Sorulari.html)
  - [🕹️İkiye Tümleyen Laboratuvarı (HTML)](../files/microprocessors/slides/Chapter_01_Twos-Complement-Lab.html)

---

### Bölüm 2: 8086 Mimarisi ve Yazmaçlar

Intel 8086, 1978'de tanıtılan ve x86 ailesini başlatan 16 bitlik bir mikroişlemcidir. Bölümde sistem yolları, yol arabirim birimi (BIU) ile yürütme birimi (EU), önden getirme kuyruğu ve kesimli bellek düzeninde 20 bitlik fiziksel adresin hesaplanması anlatılır. Ardından 8086'nın on dört yazmacı gruplarıyla incelenir: AX, BX, CX ve DX genel amaçlı yazmaçları, SP, BP, SI ve DI işaretçi ve indis yazmaçları, kesim yazmaçları ve IP. Durum ve kontrol bayraklarını taşıyan bayrak yazmacı ile bu bayrakları değiştiren komutlar da ele alınır.

- [🖼️Sunum-8086 Mimarisi (HTML)](../files/microprocessors/slides/Bolum_02_8086_Mimarisi.html)
- [📄Sunum-8086 Mimarisi (PDF)](../files/microprocessors/pdf/Bolum_02_8086_Mimarisi.pdf)
- [📝Çalışma Soruları - 8086 Mimarisi (HTML)](../files/microprocessors/slides/Bolum_02_8086_Mimarisi_Calisma_Sorulari.html)
- [🖼️Sunum-8086 Yazmaçlar (HTML)](../files/microprocessors/slides/Bolum_02_8086_Yazmaclar.html)
- [📄Sunum-8086 Yazmaçlar (PDF)](../files/microprocessors/pdf/Bolum_02_8086_Yazmaclar.pdf)
- [📝Çalışma Soruları - 8086 Yazmaçlar (HTML)](../files/microprocessors/slides/Bolum_02_8086_Yazmaclar_Calisma_Sorulari.html)
  - [🕹️Yazmaç Gezgini (HTML)](../files/microprocessors/slides/Chapter_02_Register-Explorer.html)

---

### Bölüm 3: Assembly Dili

Yazılım, makine dilinden yüksek seviyeli dillere uzanan farklı soyutlama seviyelerinde yazılabilir. Bölümde makine dili ve komut biçimi, assembler ile bağlayıcının rolü, farklı platformlardaki assembly dilleri ile derlenen ve yorumlanan diller karşılaştırılır. Assembly kısmında komut satırının etiket, komut, işlenen ve açıklamadan oluşan yapısı, komut ile direktif ayrımı, işlenen türleri ve örtük işlenenler işlenir. Komut süreleri, IP'nin ilerleyişi, bayraklar ve emu8086 ile yazılan ilk programla bölüm tamamlanır.

- [🖼️Sunum-Programlama Dilleri (HTML)](../files/microprocessors/slides/Bolum_03_Programlama_Dilleri.html)
- [📄Sunum-Programlama Dilleri (PDF)](../files/microprocessors/pdf/Bolum_03_Programlama_Dilleri.pdf)
- [📝Çalışma Soruları - Programlama Dilleri (HTML)](../files/microprocessors/slides/Bolum_03_Programlama_Dilleri_Calisma_Sorulari.html)
- [🖼️Sunum-Assembly (HTML)](../files/microprocessors/slides/Bolum_03_Assembly.html)
- [📄Sunum-Assembly (PDF)](../files/microprocessors/pdf/Bolum_03_Assembly.pdf)
- [📝Çalışma Soruları - Assembly (HTML)](../files/microprocessors/slides/Bolum_03_Assembly_Calisma_Sorulari.html)

---

## Kısım II: Bellek ve Sistem Hizmetleri

### Bölüm 4: Bellek Erişimi ve Değişkenler

8086 belleğe kesim ve bağıl konum değerlerinin birleşimiyle erişir. Bölümde BX, SI, DI ve BP yazmaçlarıyla kurulan adresleme modları, etkin adres ve fiziksel adres hesabı, byte ptr ve word ptr ile veri boyutunun belirtilmesi anlatılır; MOV ve XCHG komutlarının geçerli işlenen bileşimleri örneklerle işlenir. Değişkenler kısmında DB, DW ve DD tanımları, bellek yerleşimi, ORG 100h ve .COM programları, DUP ile diziler, LEA ve OFFSET ile adres alma ve EQU sabitleri ele alınır. Değişkenler üzerinde taşıma, toplama ve karşılaştırma yapan örnek programlarla bölüm tamamlanır.

- [🖼️Sunum-Bellek Erişimi (HTML)](../files/microprocessors/slides/Bolum_04_Bellek_Erisimi.html)
- [📄Sunum-Bellek Erişimi (PDF)](../files/microprocessors/pdf/Bolum_04_Bellek_Erisimi.pdf)
- [📝Çalışma Soruları - Bellek Erişimi (HTML)](../files/microprocessors/slides/Bolum_04_Bellek_Erisimi_Calisma_Sorulari.html)
  - [🕹️Kesim:Bağıl Konum Hesaplayıcı (HTML)](../files/microprocessors/slides/Chapter_04_Segment-Offset.html)
  - [🕹️Adresleme Modları (HTML)](../files/microprocessors/slides/Chapter_04_Addressing-Modes.html)
- [🖼️Sunum-Değişkenler (HTML)](../files/microprocessors/slides/Bolum_04_Degiskenler.html)
- [📄Sunum-Değişkenler (PDF)](../files/microprocessors/pdf/Bolum_04_Degiskenler.pdf)
- [📝Çalışma Soruları - Değişkenler (HTML)](../files/microprocessors/slides/Bolum_04_Degiskenler_Calisma_Sorulari.html)

---

### Bölüm 5: Kesmeler ve BIOS/DOS Hizmetleri

Kesme, işlemcinin o anki işini geçici olarak bırakıp özel bir hizmet yordamını çalıştırmasını sağlayan olaydır. Bölümde kesme türleri, kesme vektör tablosu, INT ve IRET sırasında FLAGS, CS ve IP'nin yığına yazılıp geri alınması, işlemci istisnaları ve 8259A ile donanım kesmelerinin maskelenmesi anlatılır. BIOS ve DOS hizmetleri kısmında INT 10h ile ekran çıktısı, INT 16h ile klavye girişi, INT 21h ile karakter ve dizgi işlemleri, tarih ve saat okuma ile INT 1Ah işlenir. Programın doğru biçimde sonlandırılması ve hizmetleri bir araya getiren bir uygulama ile bölüm tamamlanır.

- [🖼️Sunum-Kesmeler (HTML)](../files/microprocessors/slides/Bolum_05_Kesmeler.html)
- [📄Sunum-Kesmeler (PDF)](../files/microprocessors/pdf/Bolum_05_Kesmeler.pdf)
- [📝Çalışma Soruları - Kesmeler (HTML)](../files/microprocessors/slides/Bolum_05_Kesmeler_Calisma_Sorulari.html)
  - [🕹️Kesme Vektör Tablosu (HTML)](../files/microprocessors/slides/Chapter_05_Interrupt-Vector.html)
- [🖼️Sunum-Kesme Fonksiyonları (HTML)](../files/microprocessors/slides/Bolum_05_Kesme_Fonksiyonlari.html)
- [📄Sunum-Kesme Fonksiyonları (PDF)](../files/microprocessors/pdf/Bolum_05_Kesme_Fonksiyonlari.pdf)
- [📝Çalışma Soruları - Kesme Fonksiyonları (HTML)](../files/microprocessors/slides/Bolum_05_Kesme_Fonksiyonlari_Calisma_Sorulari.html)

---

## Kısım III: Komutlar ve Programlama

### Bölüm 6: Aritmetik, Mantık ve Kaydırma Komutları

Aritmetik ve mantık komutları, işlemcinin veri üzerinde hesap yapmasını ve sonuca göre bayrakları kurmasını sağlar. Bölüm CF, ZF, SF, OF, PF ve AF bayraklarının hangi sonuçta kurulduğuyla başlar; iki işlenenli ADD, SUB, CMP, AND, OR, XOR ve TEST komutları, MUL, IMUL, DIV ve IDIV ile çarpma ve bölme ve INC, DEC, NOT ve NEG gibi tek işlenenli komutlar gruplar hâlinde incelenir. Kaydırma ve döndürme komutlarının bitlere ve CF bayrağına etkisi adım adım gösterilir. BCD aritmetiği, dizi toplama ve sıcaklık dönüşümü örnekleriyle bölüm tamamlanır.

- [🖼️Sunum-Aritmetik ve Mantıksal İşlemler (HTML)](../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik.html)
- [📄Sunum-Aritmetik ve Mantıksal İşlemler (PDF)](../files/microprocessors/pdf/Bolum_06_Aritmetik_Mantik.pdf)
- [📝Çalışma Soruları - Aritmetik ve Mantıksal İşlemler (HTML)](../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik_Calisma_Sorulari.html)

- [🕹️Bayrak Laboratuvarı (HTML)](../files/microprocessors/slides/Chapter_06_Flags-Lab.html)
- [🕹️Kaydırma ve Döndürme (HTML)](../files/microprocessors/slides/Chapter_06_Shift-Rotate.html)

---

### Bölüm 7: Akış Kontrolü

Program akışı, IP'nin sıralı ilerleyişinin atlama ve döngü komutlarıyla değiştirilmesiyle yönlendirilir. Bölümde JMP ile koşulsuz atlama, bağıl konumun hesaplanması ve tek bir bayrağı test eden koşullu atlamalar anlatılır. CMP ile karşılaştırmanın ardından işaretsiz sayılar için JA/JB, işaretli sayılar için JG/JL ailesinin seçimi işlenir. LOOP ailesi, JCXZ ve iç içe döngüler örnek programlar üzerinde izlenir.

- [🖼️Sunum-Akış Kontrolü (HTML)](../files/microprocessors/slides/Bolum_07_Akis_Kontrol.html)
- [📄Sunum-Akış Kontrolü (PDF)](../files/microprocessors/pdf/Bolum_07_Akis_Kontrol.pdf)
- [📝Çalışma Soruları - Akış Kontrolü (HTML)](../files/microprocessors/slides/Bolum_07_Akis_Kontrol_Calisma_Sorulari.html)

- [🕹️Koşullu Atlamalar (HTML)](../files/microprocessors/slides/Chapter_07_Jump-Conditions.html)

---

### Bölüm 8: Yığın ve Prosedürler

8086 yığını SS:SP çifti ile adreslenir ve bellekte aşağı doğru büyüyen bir LIFO yapısıdır. Bölümde PUSH ve POP komutları, SP'nin değişimi, yazmaçların saklanması ve takası, PUSHF ve POPF ile bayrakların korunması ve yığın güvenliği anlatılır. Prosedürler kısmında PROC ve ENDP ile tanımlama, CALL ve RET sırasında dönüş adresinin yığına yazılıp geri alınması, yazmaçlar, bellek ve yığın üzerinden parametre geçirme ve BP ile kurulan yığın çerçevesi işlenir. Özyineleme örnekleri ve sık yapılan hatalarla bölüm tamamlanır.

- [🖼️Sunum-Yığın (HTML)](../files/microprocessors/slides/Bolum_08_Yigin.html)
- [📄Sunum-Yığın (PDF)](../files/microprocessors/pdf/Bolum_08_Yigin.pdf)
- [📝Çalışma Soruları - Yığın (HTML)](../files/microprocessors/slides/Bolum_08_Yigin_Calisma_Sorulari.html)
  - [🕹️Yığın, CALL ve RET (HTML)](../files/microprocessors/slides/Chapter_08_Stack-Call.html)
- [🖼️Sunum-Prosedürler (HTML)](../files/microprocessors/slides/Bolum_08_Prosedurler.html)
- [📄Sunum-Prosedürler (PDF)](../files/microprocessors/pdf/Bolum_08_Prosedurler.pdf)
- [📝Çalışma Soruları - Prosedürler (HTML)](../files/microprocessors/slides/Bolum_08_Prosedurler_Calisma_Sorulari.html)

---

### Bölüm 9: Makrolar ve emu8086.inc Kütüphanesi

Makrolar, tekrar eden bir kod parçasına ad verir; prosedürlerden farklı olarak derleyici tarafından kullanıldıkları her noktada metin olarak açılır. Bölümde MACRO ve ENDM ile parametreli makro tanımı, genişletme, parametre tuzakları, LOCAL ile etiket çakışmalarının önlenmesi ve makro ile prosedürün boyut ve hız açısından karşılaştırılması anlatılır; PUTC ve POWER makroları adım adım çalıştırılır. emu8086.inc kütüphanesi kısmında INCLUDE direktifi, PUTC, GOTOXY, PRINT ve PRINTN gibi makrolar ile sayı okuma ve yazma prosedürleri işlenir. Kütüphane makro ve prosedürleriyle yazılmış örnek programlarla bölüm tamamlanır.

- [🖼️Sunum-Makrolar (HTML)](../files/microprocessors/slides/Bolum_09_Makrolar.html)
- [📄Sunum-Makrolar (PDF)](../files/microprocessors/pdf/Bolum_09_Makrolar.pdf)
- [📝Çalışma Soruları - Makrolar (HTML)](../files/microprocessors/slides/Bolum_09_Makrolar_Calisma_Sorulari.html)
- [🖼️Sunum-emu8086.inc Kütüphanesi (HTML)](../files/microprocessors/slides/Bolum_09_Kutuphane.html)
- [📄Sunum-emu8086.inc Kütüphanesi (PDF)](../files/microprocessors/pdf/Bolum_09_Kutuphane.pdf)
- [📝Çalışma Soruları - emu8086.inc Kütüphanesi (HTML)](../files/microprocessors/slides/Bolum_09_Kutuphane_Calisma_Sorulari.html)

---

## Kısım IV: Donanım ve Komut Kodlama

### Bölüm 10: 8086 Donanımı ve Aygıt Kontrolü

8086, 40 pinli bir DIP paket içinde adres, veri, kontrol, durum ve kesme sinyallerini taşır. Bölümde adres ve veri hatlarının çoklanması, ALE ve adres kilitleri, BHE' ile bellek bankaları, T1–T4 durumlarından oluşan okuma ve yazma döngüleri, minimum ve maksimum mod ile 8284A ve 8288 yongaları anlatılır. Aygıt kontrolü kısmında IN ve OUT komutları, yoklama, INT 15h ile bekleme ve yazılımla gecikme işlenir. Trafik ışıkları, step motor, LED ekran, termometre, yazıcı ve robot gibi emu8086 aygıtlarının programlanmasıyla bölüm tamamlanır.

- [🖼️Sunum-8086 Pinler (HTML)](../files/microprocessors/slides/Bolum_10_8086_Pinler.html)
- [📄Sunum-8086 Pinler (PDF)](../files/microprocessors/pdf/Bolum_10_8086_Pinler.pdf)
- [📝Çalışma Soruları - 8086 Pinler (HTML)](../files/microprocessors/slides/Bolum_10_8086_Pinler_Calisma_Sorulari.html)
- [🖼️Sunum-Aygıt Kontrolü (HTML)](../files/microprocessors/slides/Bolum_10_Aygit_Kontrolu.html)
- [📄Sunum-Aygıt Kontrolü (PDF)](../files/microprocessors/pdf/Bolum_10_Aygit_Kontrolu.pdf)
- [📝Çalışma Soruları - Aygıt Kontrolü (HTML)](../files/microprocessors/slides/Bolum_10_Aygit_Kontrolu_Calisma_Sorulari.html)
  - [🕹️Port ile Aygıt Kontrolü (HTML)](../files/microprocessors/slides/Chapter_10_IO-Ports.html)

---

### Bölüm 11: Komut Kodlama ve Dizgi Komutları

8086 komut kümesi veri taşıma, aritmetik ve mantık, kontrol aktarma, dizgi işleme ve işlemci kontrolü gibi işlevsel sınıflara ayrılır. Bölümde bir komutun makine kodunun işlem kodu, D ve W bitleri ve ModR/M baytından nasıl oluştuğu MOV biçimleri ve JMP kodlaması üzerinden anlatılır. MOVS, CMPS, SCAS, LODS ve STOS dizgi komutları REP önekleriyle birlikte DF, SI, DI ve CX değişimi izlenerek işlenir. XLAT, LEA, LDS ve LES komutları, işlemci kontrol komutları ve bayrak etkileri tablosuyla bölüm tamamlanır.

- [🖼️Sunum-Komut Kodlama ve Dizgi Komutları (HTML)](../files/microprocessors/slides/Bolum_11_Komut_Kumesi.html)
- [📄Sunum-Komut Kodlama ve Dizgi Komutları (PDF)](../files/microprocessors/pdf/Bolum_11_Komut_Kumesi.pdf)
- [📝Çalışma Soruları - Komut Kodlama ve Dizgi Komutları (HTML)](../files/microprocessors/slides/Bolum_11_Komut_Kumesi_Calisma_Sorulari.html)

- [🕹️Komut Kodlama (HTML)](../files/microprocessors/slides/Chapter_11_Instruction-Encoding.html)
