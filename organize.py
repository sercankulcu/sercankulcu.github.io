from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
POSTS = ROOT / "_posts"

MOVES = {
    "_fun": [
        "2006-02-14-age-of-empires-II.md",
        "2006-02-20-hamurabi.md",
        "2006-03-01-jeux-denfants.md",
        "2006-03-08-los-amantes-del-circulo-polar.md",
    ],

    "_memory": [
        "2006-10-14-late-nights-in-front-of-a-computer.md",
    ],

    "_thoughts": [
        "2007-11-18-why-i-like-learning-from-manuals.md",
    ],
}


def remove_date_prefix(filename: str) -> str:
    # 2006-02-14-example.md -> example.md
    parts = filename.split("-", 3)
    if len(parts) == 4:
        return parts[3]
    return filename


def move_file(source_name: str, target_folder: str):
    source = POSTS / source_name
    target_dir = ROOT / target_folder
    target_dir.mkdir(exist_ok=True)

    new_name = remove_date_prefix(source_name)
    target = target_dir / new_name

    if not source.exists():
        print(f"SKIP  : bulunamadı: {source}")
        return

    if target.exists():
        print(f"SKIP  : hedef zaten var: {target}")
        return

    shutil.move(str(source), str(target))
    print(f"MOVED : {source_name} -> {target_folder}/{new_name}")


def move_ataturk_posts():
    target_dir = ROOT / "_thoughts"
    target_dir.mkdir(exist_ok=True)

    for source in sorted(POSTS.glob("*-remembering-ataturk-on-november-10-*.md")):
        new_name = remove_date_prefix(source.name)
        target = target_dir / new_name

        if target.exists():
            print(f"SKIP  : hedef zaten var: {target}")
            continue

        shutil.move(str(source), str(target))
        print(f"MOVED : {source.name} -> _thoughts/{new_name}")


def main():
    if not POSTS.exists():
        print("HATA: _posts klasörü bulunamadı.")
        print("Scripti repository kök dizininde çalıştır.")
        return

    for target_folder, files in MOVES.items():
        for filename in files:
            move_file(filename, target_folder)

    move_ataturk_posts()

    print("\nTamamlandı.")


if __name__ == "__main__":
    main()