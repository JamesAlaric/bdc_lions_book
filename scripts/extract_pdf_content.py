#!/usr/bin/env python3
"""
Script pour extraire le contenu des PDFs sources de Lions' Book
"""

import sys
import os

def extract_pdf_with_pymupdf(pdf_path):
    """Extrait le texte d'un PDF avec PyMuPDF (fitz)"""
    try:
        import fitz  # PyMuPDF
        doc = fitz.open(pdf_path)
        text = ""
        for page_num in range(len(doc)):
            page = doc[page_num]
            text += f"\n\n--- PAGE {page_num + 1} ---\n\n"
            text += page.get_text()
        doc.close()
        return text
    except ImportError:
        return None

def extract_pdf_with_pdfplumber(pdf_path):
    """Extrait le texte d'un PDF avec pdfplumber"""
    try:
        import pdfplumber
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                text += f"\n\n--- PAGE {i + 1} ---\n\n"
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        return text
    except ImportError:
        return None

def extract_pdf_content(pdf_path):
    """Essaie différentes méthodes pour extraire le contenu d'un PDF"""
    
    if not os.path.exists(pdf_path):
        return f"ERROR: File not found: {pdf_path}"
    
    # Essayer PyMuPDF en premier (plus rapide et meilleur)
    text = extract_pdf_with_pymupdf(pdf_path)
    if text:
        return text
    
    # Essayer pdfplumber en second
    text = extract_pdf_with_pdfplumber(pdf_path)
    if text:
        return text
    
    return "ERROR: No PDF library available. Install with: pip install PyMuPDF or pip install pdfplumber"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf_content.py <pdf_file>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    content = extract_pdf_content(pdf_path)
    print(content)
