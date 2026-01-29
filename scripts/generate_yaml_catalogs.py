#!/usr/bin/env python3
"""
Script pour générer les fichiers YAML complets pour tous les segments
à partir des données extraites du fichier Excel
"""

import json
from pathlib import Path

def format_price(value):
    """Formate un prix pour affichage"""
    if value is None:
        return "null"
    if isinstance(value, (int, float)):
        return round(value, 2)
    return value

def generate_bieres_yaml(products_data, output_path):
    """Génère le fichier YAML pour le segment Bières"""
    
    bieres = products_data['bieres']
    brands = bieres['brands']
    
    yaml_content = """# Lions' Book - Catalogue Bières
# Segment : Bières
# Date : 2026-01-26
# Source : ELEMENTS BOOK DCM.xlsx

segment:
  id: "bieres"
  name: "Bières"
  name_en: "Beers"
  icon: "beer"
  order: 1
  description: "Portefeuille complet des bières Boissons du Cameroun"

brands:
"""
    
    # Générer pour chaque marque
    for brand_name in sorted(brands.keys()):
        brand_products = brands[brand_name]
        
        # Nettoyer le nom de la marque
        clean_brand_name = brand_name.replace("'", "").strip()
        brand_id = clean_brand_name.lower().replace(" ", "-")
        
        yaml_content += f"""  - id: "{brand_id}"
    name: "{clean_brand_name}"
    logo_url: "/assets/brands/{brand_id}-logo.png"
    description: "Bière du portefeuille BDC"
    
    products:
"""
        
        # Ajouter chaque produit
        for product in brand_products:
            yaml_content += f"""      - code: "{product['code']}"
        designation: "{product['designation']}"
        format: "{product['format']}"
        packaging_type: "{product['packaging']}"
        unit: "{product['unit']}"
        consigne: {product['consigne']}
        market: ["{product['market']}"]
        
        pricing:
"""
            
            # Ajouter les prix si disponibles
            if 'marketing_to_distributor' in product.get('pricing', {}):
                mtd = product['pricing']['marketing_to_distributor']
                yaml_content += f"""          marketing_to_distributor:
            prix_achat: {format_price(mtd.get('prix_achat'))}
            remise: {format_price(mtd.get('remise'))}
            frais_chr: {format_price(mtd.get('frais_chr'))}
            marge: {format_price(mtd.get('marge'))}
            taux_marge: "{mtd.get('taux_marge', 'N/A')}"
          
"""
            
            if 'distributor_to_retailer' in product.get('pricing', {}):
                dtr = product['pricing']['distributor_to_retailer']
                yaml_content += f"""          distributor_to_retailer:
            prix_achat: {format_price(dtr.get('prix_achat'))}
            ristourne: {format_price(dtr.get('ristourne'))}
            frais_elv: {format_price(dtr.get('frais_elv'))}
            marge: {format_price(dtr.get('marge'))}
            taux_marge: "{dtr.get('taux_marge', 'N/A')}"
          
"""
            
            if 'consumer_price' in product.get('pricing', {}):
                cp = product['pricing']['consumer_price']
                yaml_content += f"""          consumer_price:
            prix_unitaire: {cp.get('prix_unitaire', 'null')}
            prix_casier: {cp.get('prix_casier', 'null')}
        
        images:
          packshot: "/assets/packshots/{product['code'].lower()}-hd.png"
          product: "/assets/products/{product['code'].lower()}.png"
          thumbnail: "/assets/products/{product['code'].lower()}-thumb.png"
      
"""
        
        # Ajouter argumentaires génériques
        yaml_content += f"""    
    sales_arguments:
      general:
        - "Bière de qualité du portefeuille Boissons du Cameroun"
        - "Marque reconnue et appréciée par les consommateurs"
        - "Disponible en plusieurs formats"
        - "Forte rotation garantie"
      
      by_channel:
        CHR:
          - "Marque qui valorise votre établissement"
          - "Forte demande client"
        PSV:
          - "Produit d'appel attractif"
          - "Rotation rapide"
        TT:
          - "Marque de confiance"
          - "Support terrain régulier"
    
    objections:
      - question: "Votre bière est trop chère"
        response: "Notre produit offre un excellent rapport qualité-prix."
        script: "Regardons ensemble la marge que vous réalisez..."
      
      - question: "Ça ne tourne pas chez moi"
        response: "C'est souvent un problème de visibilité."
        script: "Essayons avec notre PLV gratuite..."
      
      - question: "J'ai déjà un fournisseur"
        response: "Diversifier vos fournisseurs vous protège."
        script: "Commençons petit pour tester..."

"""
    
    # Sauvegarder
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(yaml_content)
    
    return len(brands)

def generate_segment_yaml(segment_name, segment_id, products_data, output_path):
    """Génère le fichier YAML pour un segment générique"""
    
    segment_data = products_data[segment_id]
    brands = segment_data['brands']
    
    yaml_content = f"""# Lions' Book - Catalogue {segment_name}
# Segment : {segment_name}
# Date : 2026-01-26
# Source : ELEMENTS BOOK DCM.xlsx

segment:
  id: "{segment_id}"
  name: "{segment_name}"
  icon: "drink"
  order: {2 if segment_id == 'alcools-mix' else 3 if segment_id == 'boissons-gazeuses' else 4}
  description: "Portefeuille {segment_name} Boissons du Cameroun"

brands:
"""
    
    # Générer pour chaque marque
    for brand_name in sorted(brands.keys()):
        brand_products = brands[brand_name]
        
        clean_brand_name = brand_name.strip()
        brand_id = clean_brand_name.lower().replace(" ", "-").replace("'", "")
        
        yaml_content += f"""  - id: "{brand_id}"
    name: "{clean_brand_name}"
    logo_url: "/assets/brands/{brand_id}-logo.png"
    
    products:
"""
        
        for product in brand_products:
            yaml_content += f"""      - code: "{product['code']}"
        designation: "{product['designation']}"
        format: "{product['format']}"
        packaging_type: "{product['packaging']}"
        unit: "{product['unit']}"
        consigne: {product['consigne']}
        market: ["{product['market']}"]
        
        pricing:
"""
            
            if 'marketing_to_distributor' in product.get('pricing', {}):
                mtd = product['pricing']['marketing_to_distributor']
                yaml_content += f"""          marketing_to_distributor:
            prix_achat: {format_price(mtd.get('prix_achat'))}
            remise: {format_price(mtd.get('remise'))}
            marge: {format_price(mtd.get('marge'))}
            taux_marge: "{mtd.get('taux_marge', 'N/A')}"
          
"""
            
            if 'distributor_to_retailer' in product.get('pricing', {}):
                dtr = product['pricing']['distributor_to_retailer']
                yaml_content += f"""          distributor_to_retailer:
            prix_achat: {format_price(dtr.get('prix_achat'))}
            ristourne: {format_price(dtr.get('ristourne'))}
            marge: {format_price(dtr.get('marge'))}
            taux_marge: "{dtr.get('taux_marge', 'N/A')}"
          
"""
            
            if 'consumer_price' in product.get('pricing', {}):
                cp = product['pricing']['consumer_price']
                yaml_content += f"""          consumer_price:
            prix_unitaire: {cp.get('prix_unitaire', 'null')}
            prix_casier: {cp.get('prix_casier', 'null')}
        
        images:
          packshot: "/assets/packshots/{product['code'].lower()}-hd.png"
      
"""
        
        yaml_content += "\n"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(yaml_content)
    
    return len(brands)

def main():
    # Charger les données extraites
    data_path = Path("/Users/macbook/Documents/SABC/lions_book/data/static/catalog/all_products_extracted.json")
    output_dir = Path("/Users/macbook/Documents/SABC/lions_book/data/static/catalog")
    
    with open(data_path, 'r', encoding='utf-8') as f:
        products_data = json.load(f)
    
    print("Génération des fichiers YAML pour tous les segments...")
    print("=" * 80)
    
    # Générer Bières
    print("\n📦 Génération : Bières")
    brands_count = generate_bieres_yaml(products_data, output_dir / "bieres-complete.yaml")
    print(f"  ✅ {brands_count} marques générées")
    
    # Générer Alcools Mix
    print("\n📦 Génération : Alcools Mix")
    brands_count = generate_segment_yaml("Alcools Mix", "alcools-mix", products_data, output_dir / "alcools-mix.yaml")
    print(f"  ✅ {brands_count} marques générées")
    
    # Générer Boissons Gazeuses
    print("\n📦 Génération : Boissons Gazeuses")
    brands_count = generate_segment_yaml("Boissons Gazeuses", "boissons-gazeuses", products_data, output_dir / "boissons-gazeuses.yaml")
    print(f"  ✅ {brands_count} marques générées")
    
    # Générer Eaux
    print("\n📦 Génération : Eaux")
    brands_count = generate_segment_yaml("Eaux", "eaux", products_data, output_dir / "eaux.yaml")
    print(f"  ✅ {brands_count} marques générées")
    
    print("\n" + "=" * 80)
    print("✅ Tous les fichiers YAML ont été générés avec succès !")
    print(f"\nFichiers créés dans : {output_dir}")
    print("  - bieres-complete.yaml")
    print("  - alcools-mix.yaml")
    print("  - boissons-gazeuses.yaml")
    print("  - eaux.yaml")

if __name__ == "__main__":
    main()
