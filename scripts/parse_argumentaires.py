#!/usr/bin/env python3
"""
Script pour parser les argumentaires du PDF et les structurer
"""

import json
import re

def parse_argumentaires(text_content):
    """Parse le contenu des argumentaires"""
    
    argumentaires = {}
    current_brand = None
    current_section = None
    
    lines = text_content.split('\n')
    
    # Marques à détecter
    brands_patterns = {
        "'33' EXPORT": "33 Export",
        "CASTEL": "Castel Beer",
        "MÜTZIG": "Mützig",
        "MANYAN": "Manyan",
        "ISENBECK": "Isenbeck",
        "BEAUFORT": "Beaufort",
        "CHILL": "Chill Citron",
        "DOPPEL": "Doppel",
        "CASTLE MILK STOUT": "Castle Milk Stout"
    }
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        # Détecter une nouvelle marque
        for pattern, brand_name in brands_patterns.items():
            if pattern in line.upper() and ("Argumentaire" in line or "Fiche d'identité" in line):
                current_brand = brand_name
                if current_brand not in argumentaires:
                    argumentaires[current_brand] = {
                        'identity': {},
                        'arguments': [],
                        'motivations': {}
                    }
                break
        
        # Extraire les informations d'identité
        if current_brand and "Coeur de cible" in line:
            # Lire les lignes suivantes pour l'identité
            if i + 1 < len(lines):
                argumentaires[current_brand]['identity']['target'] = lines[i + 1].strip()
        
        if current_brand and "Taux d'alcool" in line:
            if i + 1 < len(lines):
                argumentaires[current_brand]['identity']['alcohol_rate'] = lines[i + 1].strip()
        
        if current_brand and "Positionnement" in line:
            if i + 1 < len(lines):
                argumentaires[current_brand]['identity']['positioning'] = lines[i + 1].strip()
        
        # Extraire les arguments à savoir
        if current_brand and "à savoir" in line:
            current_section = 'arguments'
        
        if current_section == 'arguments' and line.startswith('►'):
            argument = line.replace('►', '').strip()
            if argument and current_brand:
                argumentaires[current_brand]['arguments'].append(argument)
    
    return argumentaires

def create_generic_arguments():
    """Crée des argumentaires génériques pour les marques sans données"""
    
    generic = {
        'general': [
            "Produit de qualité du portefeuille Boissons du Cameroun",
            "Forte rotation garantie dans tous les points de vente",
            "Marque reconnue et appréciée par les consommateurs",
            "Disponible en plusieurs formats pour tous les budgets",
            "Support marketing et commercial régulier"
        ],
        'by_channel': {
            'CHR': [
                "Marque qui valorise votre établissement",
                "Forte demande client = rotation rapide",
                "Marge attractive"
            ],
            'PSV': [
                "Produit d'appel qui attire les clients",
                "Rotation rapide = trésorerie fluide",
                "Formats variés pour tous les budgets"
            ],
            'TT': [
                "Marque de confiance = vente assurée",
                "Support terrain régulier",
                "Promotions fréquentes"
            ],
            'MT': [
                "Produit incontournable en rayon",
                "Forte visibilité consommateur",
                "Promotions régulières"
            ]
        },
        'objections': [
            {
                'question': "Votre produit est trop cher",
                'response': "Notre produit offre un excellent rapport qualité-prix avec une marge attractive pour vous.",
                'script': "Regardons ensemble : avec une marge de X%, vous gagnez plus qu'avec les concurrents."
            },
            {
                'question': "Ça ne tourne pas chez moi",
                'response': "C'est souvent un problème de visibilité. Nous pouvons vous fournir de la PLV gratuite.",
                'script': "Essayons avec notre PLV gratuite pendant 2 semaines. Vous verrez la différence."
            },
            {
                'question': "J'ai déjà un fournisseur",
                'response': "Diversifier vos fournisseurs vous protège des ruptures et améliore vos conditions.",
                'script': "Commençons petit pour tester. Si ça marche, on augmente. Sinon, aucune obligation."
            }
        ]
    }
    
    return generic

if __name__ == "__main__":
    # Lire le contenu extrait
    with open('/tmp/argumentaires_content.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parser les argumentaires
    argumentaires = parse_argumentaires(content)
    
    print("Argumentaires extraits :")
    print("=" * 80)
    for brand, data in argumentaires.items():
        print(f"\n{brand}:")
        print(f"  Arguments : {len(data['arguments'])}")
        if data['identity']:
            print(f"  Identité : {data['identity']}")
    
    # Créer argumentaires génériques
    generic = create_generic_arguments()
    
    # Sauvegarder
    output = {
        'extracted': argumentaires,
        'generic': generic
    }
    
    with open('/tmp/argumentaires_parsed.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\n\nArgumentaires sauvegardés dans : /tmp/argumentaires_parsed.json")
