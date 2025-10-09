#!/usr/bin/env python3
from pathlib import Path

root_dir = Path("./wiki")
exclude_dir = {".vitepress", "public"}


def generate_structure():
    lines = []
    # 遍历根目录，跳过非笔记目录
    for category_dir in sorted(
        (
            entry
            for entry in root_dir.iterdir()
            if entry.is_dir() and entry.name not in exclude_dir
        ),
        key=lambda x: x.name,
    ):
        category_name = category_dir.name
        lines.append(f"# {category_name}\n")
        # 遍历子目录，找到所有笔记
        for note_dir in sorted(
            (subdir for subdir in category_dir.iterdir() if subdir.is_dir()),
            key=lambda x: x.name,
        ):
            note_folder = note_dir.name
            indexmd_path = note_dir / "index.md"
            note_title = note_folder
            # 获取每个笔记的标题
            if indexmd_path.exists() and indexmd_path.is_file():
                try:
                    content = indexmd_path.read_text(encoding="utf-8")
                    for line in content.splitlines():
                        line = line.strip()
                        if line.startswith("# "):
                            note_title = line[2:].strip()
                            break
                except Exception as e:
                    print(f"err in {indexmd_path}:{e}")
            lines.append(f"- [{note_title}](/{category_name}/{note_folder}/)\n")

    return "\n".join(lines)


def insert_into_index(content):
    index_path = root_dir / "index.md"
    if not index_path.exists():
        existing_lines = []
    else:
        existing_lines = index_path.read_text(encoding="utf-8").splitlines(
            keepends=True
        )

    keep = existing_lines[:4] if len(existing_lines) >= 4 else existing_lines
    new_lines = keep + [content + "\n"]
    index_path.write_text("".join(new_lines), encoding="utf-8")


if __name__ == "__main__":
    structure = generate_structure()
    insert_into_index(structure)
    print("Update index successfully\n")
