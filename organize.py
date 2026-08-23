from pathlib import Path
import shutil
import re

ROOT = Path(__file__).resolve().parent
POSTS = ROOT / "_posts"


# ------------------------------------------------------------
# SINIFLANDIRMA
# ------------------------------------------------------------

MOVES = {

    "_fun": [
        # Games
        "2006-02-14-age-of-empires-II.md",
        "2006-02-20-hamurabi.md",

        # Movies
        "2006-03-01-jeux-denfants.md",
        "2006-03-08-los-amantes-del-circulo-polar.md",
        "2008-12-31-brief-encounter.md",
        "2009-04-27-los-amantes-del-circulo-polar.md",
        "2010-05-02-jeux-denfants.md",
        "2011-08-06-issiz-adam.md",
        "2019-08-13-movie-suggestions-for-software-engineers.md",
    ],

    "_memory": [
        "2006-10-14-late-nights-in-front-of-a-computer.md",
        "2009-01-27-ankara-and-loneliness.md",
        "2010-06-24-breakfast-in-a-student-apartment.md",
        "2010-07-17-my-first-password-15211.md",
        "2012-06-24-having-two-names.md",
    ],

    "_thoughts": [
        "2007-11-18-why-i-like-learning-from-manuals.md",
        "2010-07-04-you-do-not-choose-to-forget.md",
        "2010-10-06-unpacking-emotional-baggage.md",
        "2011-03-30-going-to-the-cinema-alone.md",
        "2011-04-05-the-paradox-of-forgetting.md",
        "2019-03-22-embracing-lottery-of-lifes.md",
        "2020-08-01-the-importance-of-having-a-friend.md",
        "2022-06-28-navigating-pain.md",
        "2022-08-11-you-at-the-center-of-your-universe.md",
        "2025-07-20-why-we-return-to-old-hobbies.md",
        "2025-10-26-the-comfort-of-familiar-places.md",
    ],
}


# ------------------------------------------------------------
# YARDIMCI FONKSİYONLAR
# ------------------------------------------------------------

DATE_PREFIX = re.compile(r"^\d{4}-\d{2}-\d{2}-")


def remove_date_prefix(filename: str) -> str:
    """
    2010-06-24-breakfast.md
        ->
    breakfast.md
    """
    return DATE_PREFIX.sub("", filename)


def remove_permalink(path: Path):
    """
    YAML front matter içindeki explicit permalink satırını kaldırır.
    """
    text = path.read_text(encoding="utf-8")

    new_text = re.sub(
        r"(?m)^[ \t]*permalink:[^\n]*(?:\n|$)",
        "",
        text
    )

    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        print(f"PERMALINK REMOVED : {path.relative_to(ROOT)}")


def find_existing_destination(folder: Path, new_name: str):
    """
    Aynı isimli hedef dosya var mı?
    """
    target = folder / new_name

    if target.exists():
        return target

    return None


def move_file(source_name: str, target_folder_name: str):

    source = POSTS / source_name

    if not source.exists():
        print(f"SKIP    : bulunamadı: {source_name}")
        return

    target_folder = ROOT / target_folder_name
    target_folder.mkdir(parents=True, exist_ok=True)

    new_name = remove_date_prefix(source.name)
    target = target_folder / new_name

    # --------------------------------------------------------
    # Aynı isimli film/yazı çakışmaları olabilir.
    #
    # Örnek:
    # 2006-03-01-jeux-denfants.md
    # 2010-05-02-jeux-denfants.md
    #
    # İkisini sessizce birbirinin üzerine yazmıyoruz.
    # --------------------------------------------------------

    existing = find_existing_destination(target_folder, new_name)

    if existing:
        year = source.name[:4]

        stem = Path(new_name).stem
        suffix = Path(new_name).suffix

        target = target_folder / f"{stem}-{year}{suffix}"

        if target.exists():
            print(
                f"SKIP    : hedef zaten mevcut: "
                f"{target.relative_to(ROOT)}"
            )
            return

        print(
            f"COLLISION: {new_name} mevcut, "
            f"{target.name} kullanılacak."
        )

    # Önce permalink temizle
    remove_permalink(source)

    # Sonra taşı
    shutil.move(str(source), str(target))

    print(
        f"MOVED   : {source_name}"
        f" -> {target.relative_to(ROOT)}"
    )


# ------------------------------------------------------------
# ATATÜRK YAZILARI
# ------------------------------------------------------------

def move_ataturk_posts():

    target_folder = ROOT / "_thoughts"
    target_folder.mkdir(parents=True, exist_ok=True)

    pattern = "*-remembering-ataturk-on-november-10-*.md"

    for source in sorted(POSTS.glob(pattern)):

        new_name = remove_date_prefix(source.name)
        target = target_folder / new_name

        if target.exists():
            print(
                f"SKIP    : {target.relative_to(ROOT)} zaten var"
            )
            continue

        remove_permalink(source)

        shutil.move(str(source), str(target))

        print(
            f"MOVED   : {source.name}"
            f" -> {target.relative_to(ROOT)}"
        )


# ------------------------------------------------------------
# DAHA ÖNCE TAŞINMIŞ DOSYALARI TEMİZLE
# ------------------------------------------------------------

def clean_existing_collections():

    collections = [
        "_fun",
        "_memory",
        "_thoughts",
    ]

    for collection_name in collections:

        folder = ROOT / collection_name

        if not folder.exists():
            continue

        for path in folder.rglob("*.md"):
            remove_permalink(path)


# ------------------------------------------------------------
# MAIN
# ------------------------------------------------------------

def main():

    print("=" * 60)
    print("POST ORGANIZER")
    print("=" * 60)

    if not POSTS.exists():
        print()
        print("HATA: _posts klasörü bulunamadı.")
        print("Scripti repository kök dizininde çalıştır.")
        return

    # Önceden taşınmış dosyalardaki permalinkleri temizle
    print("\nExisting collections temizleniyor...\n")
    clean_existing_collections()

    # Normal taşıma
    print("\nPosts taşınıyor...\n")

    for target_folder, filenames in MOVES.items():

        for filename in filenames:
            move_file(filename, target_folder)

    # Atatürk yazıları
    print("\nAtatürk yazıları taşınıyor...\n")
    move_ataturk_posts()

    print()
    print("=" * 60)
    print("TAMAMLANDI")
    print("=" * 60)


if __name__ == "__main__":
    main()