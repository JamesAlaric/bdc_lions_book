#!/usr/bin/env python3
"""
Script pour parser le PDF ELEMENTS BOOK DCM et extraire les prix et marges
"""

import re
import json

def parse_elements_book(text_content):
    """Parse le contenu extrait du PDF ELEMENTS BOOK DCM"""
    
    products = []
    current_product = {}
    
    lines = text_content.split('\n')
    
    # État du parser
    in_product_section = False
    in_price_section = False
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        # Détecter les codes produits (format: XXX##X)
        if re.match(r'^[A-Z]{3}\d{2}[A-Z]$', line):
            # Sauvegarder le produit précédent si existe
            if current_product:
                products.append(current_product.copy())
            
            current_product = {'code': line}
            in_product_section = True
            
        # Extraire la désignation (ligne suivant le code)
        elif in_product_section and 'code' in current_product and 'designation' not in current_product:
            if line and not re.match(r'^\d', line):
                current_product['designation'] = line
        
        # Extraire le format (ex: 65 CL, 50 CL, 33 CL)
        elif re.match(r'^\d{2,3}\s*CL$', line):
            current_product['format'] = line
        
        # Extraire l'unité (ex: C12, C24, B24)
        elif re.match(r'^[CB]\d{2}$', line):
            current_product['unit'] = line
        
        # Extraire le packaging (ex: BA_65, APO_33, BOÎTE 50)
        elif re.match(r'^(BA_\d{2,3}|APO_\d{2,3}|BV_\d{2,3}|BOÎTE\s*\d{2})$', line):
            current_product['packaging'] = line
        
        # Extraire la consigne
        elif line.isdigit() and len(line) == 4:
            if 'consigne' not in current_product:
                current_product['consigne'] = int(line)
        
        # Extraire le marché (NORD, SUD, TOUS)
        elif line in ['NORD', 'SUD', 'TOUS']:
            current_product['market'] = line
        
        # Détecter section prix
        elif line == "Prix d'achat":
            in_price_section = True
            current_product['pricing'] = {}
        
        # Extraire prix d'achat
        elif in_price_section and 'Prix d\'achat' not in current_product.get('pricing', {}):
            if line.isdigit():
                current_product['pricing']['prix_achat'] = int(line)
        
        # Extraire remise
        elif 'Remise' in line or (in_price_section and 'remise' not in current_product.get('pricing', {})):
            # Chercher le nombre sur la ligne suivante
            if i + 1 < len(lines) and lines[i + 1].strip().isdigit():
                current_product['pricing']['remise'] = int(lines[i + 1].strip())
        
        # Extraire marge
        elif 'Marge' in line:
            # Chercher le nombre sur la ligne suivante
            if i + 1 < len(lines) and lines[i + 1].strip().isdigit():
                current_product['pricing']['marge'] = int(lines[i + 1].strip())
        
        # Extraire taux de marge
        elif 'Taux' in line or re.match(r'^\d+[,\.]\d+%$', line):
            match = re.match(r'^(\d+[,\.]\d+)%$', line)
            if match:
                current_product['pricing']['taux_marge'] = match.group(1).replace(',', '.')
        
        # Extraire prix unitaire
        elif 'Prix Unitaire' in line:
            if i + 1 < len(lines) and lines[i + 1].strip().isdigit():
                current_product['pricing']['prix_unitaire'] = int(lines[i + 1].strip())
        
        # Extraire prix casier
        elif 'Prix Casier' in line:
            if i + 1 < len(lines) and lines[i + 1].strip().isdigit():
                current_product['pricing']['prix_casier'] = int(lines[i + 1].strip())
    
    # Ajouter le dernier produit
    if current_product:
        products.append(current_product)
    
    return products

def extract_brands_from_products(products):
    """Extrait les marques à partir des codes produits"""
    
    brand_mapping = {
        'EXP': '33 Export',
        'CAS': 'Castel Beer',
        'MUT': 'Mützig',
        'MNY': 'Manyan',
        'ISE': 'Isenbeck',
        'BFT': 'Beaufort Lager',
        'BFL': 'Beaufort Light',
        'CHC': 'Chill Citron',
        'DOP': 'Doppel Munich',
        'DOL': 'Doppel Lager',
        'CMS': 'Castle Milk Stout',
        'HEI': 'Heineken',
        'TOP': 'TOP',
        'WCO': 'World Cola',
        'YOU': 'Youzou',
        'ORA': 'Orangina',
        'DJI': 'D\'jino',
        'VIM': 'Vimto',
        'TAN': 'Tangui',
        'VIT': 'Vitale',
        'AQU': 'Aquabelle'
    }
    
    brands = {}
    
    for product in products:
        code = product.get('code', '')
        if len(code) >= 3:
            brand_code = code[:3]
            brand_name = brand_mapping.get(brand_code, f'Unknown ({brand_code})')
            
            if brand_name not in brands:
                brands[brand_name] = []
            
            brands[brand_name].append(product)
    
    return brands

if __name__ == "__main__":
    # Lire le contenu extrait
    with open('/tmp/elements_book_content.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parser les produits
    products = parse_elements_book(content)
    
    # Grouper par marque
    brands = extract_brands_from_products(products)
    
    # Afficher résumé
    print(f"Total produits extraits: {len(products)}")
    print(f"Total marques identifiées: {len(brands)}")
    print("\nMarques:")
    for brand_name, brand_products in sorted(brands.items()):
        print(f"  - {brand_name}: {len(brand_products)} produits")
    
    # Sauvegarder en JSON
    output_data = {
        'products': products,
        'brands': brands,
        'summary': {
            'total_products': len(products),
            'total_brands': len(brands)
        }
    }
    
    with open('/tmp/elements_book_parsed.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nDonnées sauvegardées dans: /tmp/elements_book_parsed.json")
    
    # Afficher exemple de produit
    if products:
        print("\nExemple de produit extrait:")
        print(json.dumps(products[0], indent=2, ensure_ascii=False))
