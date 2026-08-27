"""
Rename every file/folder containing 'dubai' -> 'lahore'
and replace the word Dubai/dubai/DUBAI in site text with Lahore/lahore/LAHORE.
"""
from __future__ import annotations

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "node_modules", "tools", ".cursor"}


def should_skip_dir(name: str) -> bool:
    return name in SKIP_DIRS


def replace_dubai_token(text: str) -> str:
    """Case-aware Dubai -> Lahore replacement."""

    def repl(m: re.Match) -> str:
        token = m.group(0)
        if token.isupper():
            return "LAHORE"
        if token[0].isupper():
            return "Lahore"
        return "lahore"

    return re.sub(r"dubai", repl, text, flags=re.IGNORECASE)


def rename_path_component(name: str) -> str:
    return replace_dubai_token(name)


def collect_paths(root: str):
    files = []
    dirs = []
    for dirpath, dirnames, filenames in os.walk(root, topdown=False):
        # prune skip dirs when walking top-down isn't used; filter here
        parts = set(os.path.relpath(dirpath, root).replace("\\", "/").split("/"))
        if parts & SKIP_DIRS:
            continue
        # also skip if any parent is tools etc.
        rel = os.path.relpath(dirpath, root)
        if any(p in SKIP_DIRS for p in rel.replace("\\", "/").split("/")):
            continue

        for fn in filenames:
            if "dubai" in fn.lower():
                files.append(os.path.join(dirpath, fn))
        base = os.path.basename(dirpath)
        if dirpath != root and "dubai" in base.lower():
            dirs.append(dirpath)
    return files, dirs


def unique_dest(path: str) -> str:
    if not os.path.exists(path):
        return path
    root, ext = os.path.splitext(path)
    i = 2
    while True:
        candidate = f"{root}-lahore{i}{ext}" if False else f"{root}_{i}{ext}"
        # simpler: append _n before extension
        candidate = f"{root}_{i}{ext}"
        if not os.path.exists(candidate):
            return candidate
        i += 1


def rename_files(files: list[str]) -> int:
    count = 0
    # deepest first already from walk topdown=False
    for src in files:
        directory, name = os.path.split(src)
        new_name = rename_path_component(name)
        if new_name == name:
            continue
        dest = os.path.join(directory, new_name)
        if os.path.abspath(src) == os.path.abspath(dest):
            continue
        if os.path.exists(dest):
            dest = unique_dest(dest)
            print("collision ->", dest)
        os.rename(src, dest)
        count += 1
    return count


def rename_dirs(dirs: list[str]) -> int:
    count = 0
    # deepest first
    dirs_sorted = sorted(dirs, key=lambda p: p.count(os.sep), reverse=True)
    for src in dirs_sorted:
        parent, name = os.path.split(src)
        new_name = rename_path_component(name)
        if new_name == name:
            continue
        dest = os.path.join(parent, new_name)
        if os.path.exists(dest):
            dest = unique_dest(dest)
            print("dir collision ->", dest)
        os.rename(src, dest)
        count += 1
    return count


TEXT_EXTS = {
    ".html",
    ".js",
    ".css",
    ".xml",
    ".txt",
    ".json",
    ".mjs",
    ".md",
    ".svg",
    ".webmanifest",
    ".htaccess",
    ".csv",
    ".map",
}


def rewrite_text_files(root: str) -> int:
    changed = 0
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]
        rel = os.path.relpath(dirpath, root)
        if any(p in SKIP_DIRS for p in rel.replace("\\", "/").split("/")):
            continue
        for fn in filenames:
            # also rewrite .htaccess (no ext)
            ext = os.path.splitext(fn)[1].lower()
            if ext not in TEXT_EXTS and fn not in {".htaccess", "htaccess"}:
                continue
            path = os.path.join(dirpath, fn)
            try:
                with open(path, "r", encoding="utf-8", errors="surrogateescape") as f:
                    text = f.read()
            except Exception as e:
                print("skip read", path, e)
                continue
            if "dubai" not in text.lower():
                continue
            new_text = replace_dubai_token(text)
            if new_text != text:
                with open(path, "w", encoding="utf-8", errors="surrogateescape", newline="") as f:
                    f.write(new_text)
                changed += 1
    return changed


def main():
    print("ROOT", ROOT)
    files, dirs = collect_paths(ROOT)
    print(f"Files to rename: {len(files)}")
    print(f"Dirs to rename: {len(dirs)}")
    n_files = rename_files(files)
    print(f"Renamed files: {n_files}")
    # re-collect dirs after file renames (paths still valid if only file names changed)
    _, dirs2 = collect_paths(ROOT)
    n_dirs = rename_dirs(dirs2)
    print(f"Renamed dirs: {n_dirs}")
    n_text = rewrite_text_files(ROOT)
    print(f"Text files updated: {n_text}")

    # Verification
    leftover_files = 0
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]
        if any(p in SKIP_DIRS for p in os.path.relpath(dirpath, ROOT).replace("\\", "/").split("/")):
            continue
        for fn in filenames + dirnames:
            if "dubai" in fn.lower():
                leftover_files += 1
                if leftover_files <= 10:
                    print("LEFTOVER NAME:", os.path.join(dirpath, fn))
    print("Leftover paths with dubai in name:", leftover_files)


if __name__ == "__main__":
    main()
