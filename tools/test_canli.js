// Canlı sınıf oyunlarının (files/agt/canli/canli.js) oyun mantığı için birim testleri.
//   node tools/test_canli.js
'use strict';
const assert = require('assert');
const path = require('path');
const C = require(path.join(__dirname, '..', 'files', 'agt', 'canli', 'canli.js'));

let gecen = 0;
function test(ad, f) {
  try { f(); gecen++; console.log('  ok   ' + ad); }
  catch (e) { console.log('  HATA ' + ad + '\n       ' + e.message); process.exitCode = 1; }
}
// tekrarlanabilir rastgelelik
function tohum(s) { return function () { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; }
const yakin = (a, b) => Math.abs(a - b) < 1e-9;

console.log('2/3 ortalaması');
test('ortalama, hedef ve tek kazanan', () => {
  const r = C.ortalamaSonuc({ a: 30, b: 60, c: 90 });
  assert.ok(yakin(r.ortalama, 60));
  assert.ok(yakin(r.hedef, 40));
  assert.deepStrictEqual(r.kazananlar, ['a']);
  assert.strictEqual(r.kisi.a.pay, 1);
  assert.strictEqual(r.kisi.b.kazandi, false);
});
test('eşitlikte kazanç paylaşılır', () => {
  // ortalama 30, hedef 20: 10 ve 30 eşit uzaklıkta, 50 uzak
  const r = C.ortalamaSonuc({ a: 10, b: 30, c: 50 });
  assert.ok(yakin(r.hedef, 20));
  assert.deepStrictEqual(r.kazananlar, ['a', 'b']);
  assert.strictEqual(r.kisi.a.pay, 0.5);
  assert.strictEqual(r.kisi.b.pay, 0.5);
});
test('aynı sayıyı söyleyenler birlikte kazanır', () => {
  const r = C.ortalamaSonuc({ a: 0, b: 0, c: 0 });
  assert.deepStrictEqual(r.kazananlar, ['a', 'b', 'c']);
});
test('ondalık tahmin ve 0–90 dışı değerler', () => {
  const r = C.ortalamaSonuc({ a: 22.5, b: 45, c: 95, d: -1 });
  assert.strictEqual(r.n, 2);
  assert.ok(yakin(r.hedef, 22.5));
  assert.deepStrictEqual(r.kazananlar, ['a']);
});
test('histogram 10\'luk aralıklar, 90 son kutuda', () => {
  const r = C.ortalamaSonuc({ a: 0, b: 9.9, c: 10, d: 90, e: 85 });
  assert.deepStrictEqual(r.histogram, [2, 1, 0, 0, 0, 0, 0, 0, 2]);
});
test('boş tur', () => {
  const r = C.ortalamaSonuc({});
  assert.strictEqual(r.n, 0);
  assert.deepStrictEqual(r.kazananlar, []);
});

console.log('Kapalı zarf açık artırma');
test('birinci ve ikinci fiyat, tüm sınıf', () => {
  const r = C.artirmaSonuc([
    { uid: 'a', deger: 70, teklif: 70, zaman: 1 },
    { uid: 'b', deger: 80, teklif: 60, zaman: 2 },
    { uid: 'c', deger: 50, teklif: 45, zaman: 3 }
  ], 'sinif');
  assert.strictEqual(r.gruplar.length, 1);
  const g = r.gruplar[0];
  assert.strictEqual(g.kazanan, 'a');
  assert.deepStrictEqual(g.birinci, { fiyat: 70, kazanc: 0 });
  assert.deepStrictEqual(g.ikinci, { fiyat: 60, kazanc: 10 });   // Bölüm 5: 70 − 60 = 10
  assert.strictEqual(r.kisi.b.birinci.kazanc, 0);
  assert.strictEqual(r.kisi.b.ikinci.kazandi, false);
  assert.strictEqual(r.gelir.birinci, 70);
  assert.strictEqual(r.gelir.ikinci, 60);
});
test('değerinden yüksek teklifle kazanan zarar eder', () => {
  const r = C.artirmaSonuc([
    { uid: 'a', deger: 40, teklif: 90, zaman: 1 },
    { uid: 'b', deger: 80, teklif: 80, zaman: 2 }
  ], 'sinif');
  assert.strictEqual(r.kisi.a.birinci.kazanc, -50);
  assert.strictEqual(r.kisi.a.ikinci.kazanc, -40);
});
test('eşit teklifte önce gönderen kazanır; ikinci fiyat = aynı teklif', () => {
  const r = C.artirmaSonuc([
    { uid: 'a', deger: 90, teklif: 50, zaman: 5 },
    { uid: 'b', deger: 60, teklif: 50, zaman: 3 }
  ], 'sinif');
  assert.strictEqual(r.gruplar[0].kazanan, 'b');
  assert.strictEqual(r.gruplar[0].ikinci.fiyat, 50);
});
test('tek kişilik grupta ikinci fiyat 0', () => {
  const r = C.artirmaSonuc([{ uid: 'a', deger: 30, teklif: 20, zaman: 1 }], 'grup4');
  assert.deepStrictEqual(r.gruplar[0].ikinci, { fiyat: 0, kazanc: 30 });
});
test('4\'erli gruplar: boylar en çok 1 farklı, herkes bir grupta', () => {
  const t = [];
  for (let i = 0; i < 10; i++) t.push({ uid: 'u' + i, deger: i * 10, teklif: i * 9, zaman: i });
  const r = C.artirmaSonuc(t, 'grup4', tohum(7));
  assert.deepStrictEqual(r.gruplar.map(g => g.uyeler.length).sort(), [3, 3, 4]);
  assert.strictEqual(Object.keys(r.kisi).length, 10);
  r.gruplar.forEach(g => {
    const enYuksek = Math.max(...g.uyeler.map(u => r.kisi[u].teklif));
    assert.strictEqual(r.kisi[g.kazanan].teklif, enYuksek);
  });
  assert.deepStrictEqual(C.grupla([1, 2, 3, 4, 5, 6, 7, 8], 4).map(g => g.length), [4, 4]);
  assert.deepStrictEqual(C.grupla([1, 2, 3, 4, 5], 4).map(g => g.length), [3, 2]);
});
test('özel değerler 0–100 tam sayı', () => {
  const d = C.degerAta(['a', 'b', 'c', 'd', 'e'], tohum(3));
  Object.values(d).forEach(v => assert.ok(Number.isInteger(v) && v >= 0 && v <= 100));
});

console.log('Mahkûmun İkilemi');
test('kazanç tablosu Sam–John matrisiyle aynı', () => {
  assert.strictEqual(C.pdKazanc('S', 'S'), -1);
  assert.strictEqual(C.pdKazanc('S', 'I'), -3);
  assert.strictEqual(C.pdKazanc('I', 'S'), 0);
  assert.strictEqual(C.pdKazanc('I', 'I'), -2);
});
test('çift sayıda: herkes bir insanla eşleşir', () => {
  const ids = ['a', 'b', 'c', 'd', 'e', 'f'];
  const e = C.ikilemEslestir(ids, tohum(1));
  ids.forEach(u => { assert.ok(e[u] && e[u] !== C.PC && e[u] !== u); assert.strictEqual(e[e[u]], u); });
});
test('tek sayıda: tam bir kişi bilgisayarla eşleşir', () => {
  const ids = ['a', 'b', 'c', 'd', 'e'];
  const e = C.ikilemEslestir(ids, tohum(2));
  assert.strictEqual(ids.filter(u => e[u] === C.PC).length, 1);
  ids.forEach(u => { if (e[u] !== C.PC) assert.strictEqual(e[e[u]], u); });
});
test('tekrarlı oyun: aynı eşleşme korunur, giden kişinin eşi yeniden eşleşir', () => {
  const once = { a: 'b', b: 'a', c: 'd', d: 'c', e: C.PC };
  const e = C.ikilemEslestir(['a', 'b', 'c', 'e'], tohum(5), once);
  assert.strictEqual(e.a, 'b');
  assert.strictEqual(e.c, 'e');
  assert.strictEqual(e.e, 'c');
});
test('sonuç: dağılım, oranlar, ortalama kazanç', () => {
  const esler = { a: 'b', b: 'a', c: 'd', d: 'c', e: 'f', f: 'e' };
  const r = C.ikilemSonuc(esler, { a: 'S', b: 'S', c: 'S', d: 'I', e: 'I', f: 'I' }, {});
  assert.deepStrictEqual(r.dagilim, { SS: 1, SI: 1, II: 1 });
  assert.deepStrictEqual(r.secim, { S: 3, I: 3 });
  assert.strictEqual(r.kisi.c.kazanc, -3);
  assert.strictEqual(r.kisi.d.kazanc, 0);
  assert.ok(yakin(r.ortKazanc, (-1 - 1 - 3 + 0 - 2 - 2) / 6));
  assert.strictEqual(r.herkesSessiz, -1);
});
test('bilgisayar Tit-for-Tat: ilk tur sessiz, sonra öğrencinin önceki seçimi', () => {
  let r = C.ikilemSonuc({ a: C.PC }, { a: 'I' }, {});
  assert.strictEqual(r.kisi.a.rakipSecim, 'S');
  assert.strictEqual(r.kisi.a.kazanc, 0);
  r = C.ikilemSonuc({ a: C.PC }, { a: 'S' }, { a: 'I' });
  assert.strictEqual(r.kisi.a.rakipSecim, 'I');
  assert.strictEqual(r.kisi.a.kazanc, -3);
  assert.strictEqual(r.n, 1);
});
test('cevap vermeyenin eşi bilgisayara karşı sayılır', () => {
  const r = C.ikilemSonuc({ a: 'b', b: 'a' }, { a: 'S' }, {});
  assert.strictEqual(r.n, 1);
  assert.strictEqual(r.kisi.a.rakip, C.PC);
  assert.strictEqual(r.kisi.a.kazanc, -1);
  assert.strictEqual(r.kisi.b, undefined);
});

console.log('Condorcet oylaması');
test('Condorcet döngüsü (Bölüm 7: A≻B≻C, B≻C≻A, C≻A≻B)', () => {
  const r = C.oylamaSonuc(['012', '120', '201'], 3);
  assert.strictEqual(r.condorcet, null);
  assert.strictEqual(r.dongu, true);
  assert.deepStrictEqual(r.ikili[0][1], 2);  // A, B'yi 2–1 yener
  assert.deepStrictEqual(r.ikili[1][2], 2);  // B, C'yi 2–1 yener
  assert.deepStrictEqual(r.ikili[2][0], 2);  // C, A'yı 2–1 yener
  assert.deepStrictEqual(r.borda.puan, [3, 3, 3]);
  assert.deepStrictEqual(r.irv.kazananlar, [0, 1, 2]);
});
test('Condorcet kazananı, çoğulluk ve Borda farklı çıkabilir', () => {
  // 4: A≻B≻C, 3: C≻B≻A, 2: B≻A≻C
  const s = [].concat(Array(4).fill('012'), Array(3).fill('210'), Array(2).fill('102'));
  const r = C.oylamaSonuc(s, 3);
  assert.deepStrictEqual(r.cogulluk.puan, [4, 2, 3]);
  assert.deepStrictEqual(r.cogulluk.kazananlar, [0]);
  // Borda (2,1,0): A = 8+0+2 = 10, B = 4+3+4 = 11, C = 0+6+0 = 6
  assert.deepStrictEqual(r.borda.puan, [10, 11, 6]);
  assert.deepStrictEqual(r.borda.kazananlar, [1]);
  // B: A'ya karşı 5–4, C'ye karşı 6–3 ⇒ Condorcet kazananı B
  assert.strictEqual(r.condorcet, 1);
  assert.strictEqual(r.dongu, false);
  assert.strictEqual(r.profil['012'], 4);
});
test('anında ikinci tur: en az oy alan elenir, oylar aktarılır', () => {
  // 4: A≻B≻C, 3: C≻B≻A, 2: B≻C≻A ⇒ 1. tur A4 B2 C3, B elenir; B'nin 2 oyu C'ye: C 5 > 9/2
  const s = [].concat(Array(4).fill('012'), Array(3).fill('210'), Array(2).fill('120'));
  const r = C.oylamaSonuc(s, 3);
  assert.deepStrictEqual(r.irv.turlar[0].elenen, [1]);
  assert.deepStrictEqual(r.irv.kazananlar, [2]);
  assert.deepStrictEqual(r.cogulluk.kazananlar, [0]);
});
test('anında ikinci tur: ilk turda salt çoğunluk', () => {
  const r = C.oylamaSonuc(['012', '021', '102'], 3);
  assert.deepStrictEqual(r.irv.kazananlar, [0]);
  assert.strictEqual(r.irv.turlar.length, 1);
});
test('anında ikinci tur: en azda eşitlik, ikisi birlikte elenir', () => {
  // A 2, B 1, C 1 (n = 4): çoğunluk yok, B ve C birlikte elenir, A kalır
  const r = C.oylamaSonuc(['012', '021', '102', '201'], 3);
  assert.deepStrictEqual(r.irv.turlar[0].elenen, [1, 2]);
  assert.deepStrictEqual(r.irv.kazananlar, [0]);
});
test('geçersiz sıralamalar sayılmaz; boş oy', () => {
  const r = C.oylamaSonuc(['011', 'abc', '01', '210'], 3);
  assert.strictEqual(r.n, 1);
  assert.strictEqual(r.condorcet, 2);
  const b = C.oylamaSonuc([], 3);
  assert.strictEqual(b.condorcet, null);
  assert.strictEqual(b.dongu, false);
  assert.deepStrictEqual(b.cogulluk.kazananlar, []);
});

console.log('Yardımcılar');
test('sayı okuma (virgül, boşluk, harf)', () => {
  assert.strictEqual(C.sayiOku('33,5'), 33.5);
  assert.strictEqual(C.sayiOku(' 12 '), 12);
  assert.ok(Number.isNaN(C.sayiOku('12a')));
  assert.ok(Number.isNaN(C.sayiOku('')));
  assert.ok(Number.isNaN(C.sayiOku('-3')));
});
test('oda kodu 4 hane', () => {
  for (let i = 0; i < 200; i++) assert.ok(/^\d{4}$/.test(C.odaKodu()));
});
test('dizi(): Firebase nesnesi ve boş değer', () => {
  assert.deepStrictEqual(C.dizi({ 0: 'a', 1: 'b' }), ['a', 'b']);
  assert.deepStrictEqual(C.dizi(undefined), []);
});

console.log('\n' + gecen + ' test geçti' + (process.exitCode ? ', hatalar var.' : '.'));
