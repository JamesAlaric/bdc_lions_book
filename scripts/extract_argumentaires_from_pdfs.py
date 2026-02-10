#!/usr/bin/env python3
"""
Extract argumentaires content from PDF documents into a structured JSON file.
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import pdfplumber

ROOT = Path("/Users/macbook/Documents/SABC/lions_book")
FULL_PDF = ROOT / "data/static/Argumentaires marques FAP All Brand V2.pdf"
BRIEF_PDF = ROOT / "data/static/Argumentaires marques FAP All Brand V2-BRIEF.pdf"
OUTPUT = ROOT / "data/static/catalog/argumentaires-extracted.json"


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def normalize_key(value: str) -> str:
    value = unicodedata.normalize("NFD", value or "")
    value = "".join(ch for ch in value if unicodedata.category(ch) != "Mn")
    value = re.sub(r"[^a-zA-Z0-9]+", " ", value).strip().lower()
    return value


def extract_brand_name(text: str) -> Optional[str]:
    for line in text.splitlines():
        line = normalize_text(line)
        if not line:
            continue
        if re.match(r"(?i)^argumentaire\b", line):
            name = re.sub(r"(?i)^argumentaire\b", "", line).strip()
            name = re.sub(r"(?i)\s*[:：]\s*.*$", "", name)
            name = re.sub(r"(?i)\s*(?:à|a)\s+savoir.*$", "", name)
            name = re.sub(r"[“”\"'’‘]", "", name).strip()
            return name or None
    return None


def group_words_by_line(words, tolerance: float = 2.0):
    lines = []
    for word in sorted(words, key=lambda w: (w["top"], w["x0"])):
        if not lines or abs(word["top"] - lines[-1]["top"]) > tolerance:
            lines.append({"top": word["top"], "words": [word]})
        else:
            lines[-1]["words"].append(word)
    return lines


def find_header_positions(words):
    header_word = next((w for w in words if normalize_key(w["text"]) == "motivations"), None)
    if not header_word:
        return None
    header_top = header_word["top"]
    header_words = [w for w in words if abs(w["top"] - header_top) < 2.5]
    if not header_words:
        return None

    def find_x(token: str, contains: bool = False) -> Optional[float]:
        for w in header_words:
            key = normalize_key(w["text"])
            if (contains and token in key) or (not contains and key == token):
                return w["x0"]
        return None

    x_mot = header_word["x0"]
    x_fact = find_x("le") or find_x("fait") or None
    x_proof = find_x("la") or find_x("preuve") or None
    x_benefit = find_x("avantage", contains=True) or None

    if x_fact is None or x_proof is None or x_benefit is None:
        x_positions = sorted({w["x0"] for w in header_words})
        if len(x_positions) >= 4:
            x_fact = x_fact or x_positions[1]
            x_proof = x_proof or x_positions[2]
            x_benefit = x_benefit or x_positions[3]
        else:
            return None

    return x_mot, x_fact, x_proof, x_benefit


MOTIVATION_MAP = {
    "securite": "Sécurité",
    "argent": "Argent",
    "commodite": "Commodité",
    "commodites": "Commodité",
    "competitivite": "Compétitivité",
    "orgueil": "Orgueil",
    "imitation": "Imitation",
    "nouveaute": "Nouveauté",
    "sympathie": "Sympathie",
}


def normalize_motivation(value: str) -> Optional[str]:
    key = normalize_key(value).replace(" ", "")
    if key in MOTIVATION_MAP:
        return MOTIVATION_MAP[key]
    return None


def extract_motivations_table(page) -> Optional[Dict[str, List[Dict[str, str]]]]:
    words = page.extract_words(x_tolerance=1, y_tolerance=2, keep_blank_chars=False)
    if not words:
        return None
    header_positions = find_header_positions(words)
    if not header_positions:
        return None

    x_mot, x_fact, x_proof, x_benefit = header_positions
    b1 = (x_mot + x_fact) / 2
    b2 = (x_fact + x_proof) / 2
    b3 = (x_proof + x_benefit) / 2

    lines = group_words_by_line(words)
    groups = {"rational": [], "emotional": []}
    current_group = None
    current_row = None

    def flush_row():
        nonlocal current_row
        if current_row:
            groups[current_group].append(current_row)
            current_row = None

    for line in lines:
        cols = ["", "", "", ""]
        for w in sorted(line["words"], key=lambda w: w["x0"]):
            x = w["x0"]
            idx = 0 if x < b1 else 1 if x < b2 else 2 if x < b3 else 3
            cols[idx] = (cols[idx] + " " + w["text"]).strip()
        line_text = " ".join(c for c in cols if c).strip()
        if not line_text:
            continue
        if "IRRATIONNEL" in line_text.upper():
            flush_row()
            current_group = "emotional"
            continue
        if "RATIONNEL" in line_text.upper():
            flush_row()
            current_group = "rational"
            continue
        if current_group is None:
            continue

        motivation_label = normalize_motivation(cols[0])
        if motivation_label:
            flush_row()
            current_row = {
                "motivation": motivation_label,
                "fact": cols[1].strip(),
                "proof": cols[2].strip(),
                "benefit": cols[3].strip(),
            }
            continue

        if current_row:
            if cols[1].strip():
                current_row["fact"] = normalize_text(current_row["fact"] + " " + cols[1])
            if cols[2].strip():
                current_row["proof"] = normalize_text(current_row["proof"] + " " + cols[2])
            if cols[3].strip():
                current_row["benefit"] = normalize_text(current_row["benefit"] + " " + cols[3])

    if current_row and current_group:
        groups[current_group].append(current_row)

    if not groups["rational"] and not groups["emotional"]:
        return None
    return groups


def extract_key_facts(text: str) -> List[str]:
    lines = [normalize_text(line) for line in text.splitlines()]
    facts = []
    current = ""
    for line in lines:
        if line.startswith("►") or line.startswith("•") or line.startswith("-"):
            if current:
                facts.append(current.strip())
            current = line.lstrip("►•- ").strip()
            continue
        if current:
            current = normalize_text(current + " " + line)
    if current:
        facts.append(current.strip())
    return [fact for fact in facts if fact]


def merge_wrapped_lines(lines: List[str]) -> List[str]:
    merged: List[str] = []
    for line in lines:
        if not line:
            continue
        if not merged:
            merged.append(line)
            continue
        if merged[-1].endswith((".", "!", "?", ":")):
            merged.append(line)
        else:
            merged[-1] = normalize_text(f"{merged[-1]} {line}")
    return merged


def extract_brief_sections(text: str) -> Dict[str, List[str] | str]:
    lines = [normalize_text(line) for line in text.splitlines() if normalize_text(line)]
    key_lines = [line.lower() for line in lines]

    def find_index(patterns: Tuple[str, ...]):
        for idx, line in enumerate(key_lines):
            if all(pattern in line for pattern in patterns):
                return idx
        return None

    idx_savoir = find_index(("ce qu", "savoir"))
    idx_dire = find_index(("ce qu", "dire"))
    idx_format = find_index(("format", "prix")) or find_index(("formats", "prix"))

    if idx_savoir is None:
        return {}

    end_savoir = idx_dire or idx_format or len(lines)
    savoir_lines = lines[idx_savoir + 1 : end_savoir]

    end_dire = idx_format or len(lines)
    dire_lines = lines[idx_dire + 1 : end_dire] if idx_dire is not None else []

    format_lines = lines[idx_format + 1 :] if idx_format is not None else []

    return {
        "a_savoir": merge_wrapped_lines(savoir_lines),
        "a_dire": merge_wrapped_lines(dire_lines),
        "formats_prix": normalize_text(" ".join(format_lines)) if format_lines else "",
    }


def extract_full_pdf() -> Dict[str, Dict]:
    data: Dict[str, Dict] = {}
    with pdfplumber.open(FULL_PDF) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            if not text.strip():
                continue
            brand = extract_brand_name(text)
            if not brand:
                continue
            key = normalize_key(brand)
            entry = data.setdefault(key, {"name": brand})

            if "MOTIVATIONS" in text.upper():
                table = extract_motivations_table(page)
                if table:
                    entry["motivations_table"] = table

            if "à savoir" in text.lower() or "a savoir" in text.lower():
                facts = extract_key_facts(text)
                if facts:
                    entry["key_facts"] = facts
    return data


def extract_brief_pdf() -> Dict[str, Dict]:
    data: Dict[str, Dict] = {}
    with pdfplumber.open(BRIEF_PDF) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            if not text.strip():
                continue
            if "ce qu" not in text.lower():
                continue
            brand = extract_brand_name(text)
            if not brand:
                continue
            key = normalize_key(brand)
            entry = data.setdefault(key, {"name": brand})
            sections = extract_brief_sections(text)
            if sections:
                entry["brief"] = sections
    return data


def main():
    if not FULL_PDF.exists():
        raise SystemExit(f"Missing PDF: {FULL_PDF}")
    if not BRIEF_PDF.exists():
        raise SystemExit(f"Missing PDF: {BRIEF_PDF}")

    full = extract_full_pdf()
    brief = extract_brief_pdf()

    output = {"full": {"brands": full}, "brief": {"brands": brief}}
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
