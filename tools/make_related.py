# -*- coding: utf-8 -*-
"""Uygulama ve oyun sayfalarinin altindaki "Benzer araclar / Diger oyunlar" seridi.

    python tools/make_related.py

make_app_pages.py ve make_game_pages.py'deki GROUPS'tan _data/related_tools.yml yazar:
her sayfa icin ayni gruptan siradaki 4 sayfa (grup kucukse sonraki gruptan tamamlanir) ve
hub adresi. _includes/related-tools.html bu veriyi without-sidebar duzeninde icerigin altina
basar. Yeni uygulama ya da oyun eklendiginde hub betikleriyle birlikte bunu da calistirin.
"""
import io, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import make_app_pages as A
import make_game_pages as G

N = 4

# Turkish names shown in the strip when the interface is Turkish (each page's own Turkish h1)
TR_TITLES = {
    "/apps/cognitive-reasoning-test/": "Bilişsel Akıl Yürütme Testi",
    "/apps/document-scanner/": "Belge Tarayıcı",
    "/apps/favicon-generator/": "Favicon Oluşturucu",
    "/apps/fortune-teller/": "Mistik Fal Küresi",
    "/apps/image-background-remover/": "Arka Plan Silici",
    "/apps/image-color-palette/": "Görsel Renk Paleti",
    "/apps/image-compressor-resizer/": "Görsel Sıkıştırıcı ve Boyutlandırıcı",
    "/apps/image-format-converter/": "Görsel Biçim Dönüştürücü",
    "/apps/image-metadata-viewer/": "Görsel Meta Verisi",
    "/apps/image-redactor/": "Görsel Karartıcı",
    "/apps/image-to-a4-pdf/": "Görselden A4 PDF",
    "/apps/images-to-pdf/": "Görsellerden PDF",
    "/apps/memory-test/": "Bellek Testi",
    "/apps/minimal-timer/": "Minimal Sayaç",
    "/apps/office-metadata-viewer/": "Office Meta Verisi",
    "/apps/password-generator/": "Şifre Üreteci",
    "/apps/pdf-compressor/": "PDF Sıkıştırıcı",
    "/apps/pdf-diff/": "PDF Karşılaştırma",
    "/apps/pdf-form-filler/": "PDF Form Doldurucu",
    "/apps/pdf-merger/": "PDF Birleştirici",
    "/apps/pdf-metadata-viewer/": "PDF Meta Verisi",
    "/apps/pdf-page-organizer/": "PDF Sayfa Düzenleyici",
    "/apps/pdf-review-integrity-scanner/": "PDF Hakem Bütünlüğü Tarayıcı",
    "/apps/pdf-signer/": "PDF İmzalayıcı",
    "/apps/pdf-splitter/": "PDF Bölücü",
    "/apps/pdf-to-a4/": "PDF'yi A4'e Sığdır",
    "/apps/pdf-to-image/": "PDF'den Görsele",
    "/apps/personality-test/": "Kişilik Kelime Testi",
    "/apps/pomodoro-timer/": "Pomodoro Sayacı",
    "/apps/qr-code-generator/": "QR Kod Oluşturucu",
    "/apps/reaction-time-test/": "Tepki Süresi Testi",
    "/apps/signature-maker/": "İmza Oluşturucu",
    "/apps/tarot/tarot-reader/": "Tarot Okuyucu",
    "/apps/unit-converter/": "Birim Dönüştürücü",
    "/game/basketball/": "Basketbol",
    "/game/bulls-and-cows/": "Boğa ve İnek",
    "/game/capital-city-quiz/": "Başkent Quiz",
    "/game/car-race/": "Araba Yarışı",
    "/game/connectfour/": "Dört Taş",
    "/game/connections/": "Bağlantılar",
    "/game/fastreflex/": "Hızlı Refleks",
    "/game/flagquiz/": "Bayrak Quiz",
    "/game/mathmaster/": "Matematik Ustası",
    "/game/memory/": "Hafıza Oyunu",
    "/game/minesweeper/": "Mayın Tarlası",
    "/game/movie-quiz/": "Film Quiz",
    "/game/squid/": "Kırmızı Işık, Yeşil Işık",
    "/game/tictactoe/": "XOX",
    "/game/yazitura/": "Yazı Tura",
}


def title(url):
    return A.read_meta(url)[0]


def groups():
    apps = [[(ico, url) for ico, url in g[5] if url.startswith('/')] for g in A.GROUPS]
    games = [[(ico, '/game/%s/' % name) for ico, name, _ in g[4]] for g in G.GROUPS]
    return [('/apps/', apps), ('/games/', games)]


def build():
    out = {}
    for hub, gs in groups():
        gs = [g for g in gs if g]
        for gi, g in enumerate(gs):
            for i, (ico, url) in enumerate(g):
                picks = [g[(i + k) % len(g)] for k in range(1, len(g))][:N]
                j = gi
                while len(picks) < N:
                    j = (j + 1) % len(gs)
                    if j == gi:
                        break
                    picks += [x for x in gs[j] if x not in picks and x[1] != url][:N - len(picks)]
                out[url] = {'hub': hub, 'items': [[u, ic, title(u), TR_TITLES.get(u, title(u))] for ic, u in picks]}
    lines = ['# make_related.py yazar; elle degistirmeyin.']
    for url in sorted(out):
        lines.append('%s:' % json.dumps(url))
        lines.append('  hub: %s' % json.dumps(out[url]['hub']))
        lines.append('  items:')
        for it in out[url]['items']:
            lines.append('    - %s' % json.dumps(it, ensure_ascii=False))
    text = '\n'.join(lines) + '\n'
    assert '{{' not in text and '{%' not in text
    path = os.path.join(A.REPO, '_data', 'related_tools.yml')
    old = io.open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != text:
        io.open(path, 'w', encoding='utf-8', newline='\n').write(text)
        print('yazildi _data/related_tools.yml (%d sayfa)' % len(out))


if __name__ == '__main__':
    build()
