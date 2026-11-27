# -*- coding: utf-8 -*-
"""Dil/icerik denetimi onerilerini uygular.

Kullanim:  python tools/proof/apply.py <oneriler.jsonl> [--dry]

Her satir bir JSON nesnesi:
  {"file": "files/algorithms/notes/Chapter_01_..._Lecture_Notes.html",
   "old": "...", "new": "...", "type": "error|style|term|content", "why": "..."}

Kurallar (biri tutmazsa oneri atlanir ve nedeni yazilir):
- file depo kokune gore goreli yol ve var olmali;
- old dosyada TAM BIR KEZ gecmeli (belirsiz oneriler uygulanmaz);
- old ve new'deki HTML etiketleri ayni sirada ayni olmali (yapi bozulmaz);
- type 'content' degilse old ve new'deki sayilar ayni olmali (yanlislikla sayi degismez);
- new icinde '{{' ya da '{%' olamaz.
Uygulanan ve atlanan oneriler <oneriler>.applied.jsonl ve .skipped.jsonl dosyalarina yazilir.
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TAG = re.compile(r'<[^>]+>')
NUM = re.compile(r'\d+(?:[.,]\d+)*')


def check(s, old, new, typ):
    n = s.count(old)
    if n != 1:
        return 'old %d kez geciyor' % n
    if TAG.findall(old) != TAG.findall(new):
        return 'etiketler degisiyor'
    if typ != 'content' and NUM.findall(TAG.sub('', old)) != NUM.findall(TAG.sub('', new)):
        return 'sayilar degisiyor (type content degil)'
    if '{{' in new or '{%' in new:
        return 'Liquid isareti'
    return None


def main():
    path = sys.argv[1]
    dry = '--dry' in sys.argv
    rows = [json.loads(l) for l in io.open(path, encoding='utf-8') if l.strip()]
    applied, skipped, cache = [], [], {}
    for r in rows:
        f = os.path.join(ROOT, r['file'])
        if not os.path.exists(f):
            skipped.append(dict(r, reason='dosya yok')); continue
        if f not in cache:
            cache[f] = io.open(f, encoding='utf-8', newline='').read()
        s = cache[f]
        why = check(s, r['old'], r['new'], r.get('type', 'style'))
        if why:
            skipped.append(dict(r, reason=why)); continue
        cache[f] = s.replace(r['old'], r['new'], 1)
        applied.append(r)
    if not dry:
        for f, s in cache.items():
            io.open(f, 'w', encoding='utf-8', newline='').write(s)
    base = os.path.splitext(path)[0]
    for name, lst in (('applied', applied), ('skipped', skipped)):
        with io.open('%s.%s.jsonl' % (base, name), 'w', encoding='utf-8') as out:
            for r in lst:
                out.write(json.dumps(r, ensure_ascii=False) + '\n')
    print('%d uygulandi, %d atlandi%s' % (len(applied), len(skipped), ' (deneme)' if dry else ''))


if __name__ == '__main__':
    main()
