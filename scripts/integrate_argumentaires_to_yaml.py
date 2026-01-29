#!/usr/bin/env python3
"""
Script pour intégrer les argumentaires complets dans les fichiers YAML
"""

import json
from pathlib import Path

# Argumentaires complets par marque
ARGUMENTAIRES = {
    # BIÈRES
    "33-export": {
        "identity": {
            "target": "Hommes et femmes 21-35 ans, jovial, dynamique, sociable",
            "positioning": "Mainstream",
            "alcohol_rate": "5.2%",
            "signature": "Supporter N°1 du Football"
        },
        "key_facts": [
            "Brassée depuis 1875, bière de haute tradition de classe internationale",
            "Reconnue et appréciée sur tous les continents",
            "Partenaire incontournable des bons moments partagés entre amis",
            "Goût franc et unique",
            "Bière la plus consommée au Cameroun"
        ],
        "sales_arguments": {
            "rational": [
                "Bière de grande qualité, la plus consommée au Cameroun",
                "Produit rentable à très forte rotation, excellentes marges",
                "Disponible en 4 formats (65cl, 50cl, 33cl, canette 50cl)"
            ],
            "emotional": [
                "Bière internationale de haute tradition depuis 1875",
                "La bière du supporter = suivi personnalisé",
                "Bière populaire à avoir absolument en stock"
            ],
            "by_channel": {
                "CHR": ["Bière qui valorise l'établissement", "Forte demande", "Rotation rapide"],
                "PSV": ["Produit d'appel majeur", "Trésorerie fluide", "4 formats disponibles"],
                "TT": ["Marque de confiance", "Support terrain régulier", "Promotions fréquentes"],
                "MT": ["Produit incontournable", "Forte visibilité", "Promotions régulières"]
            }
        },
        "objections": [
            {
                "question": "Votre bière est trop chère",
                "response": "C'est la bière la plus consommée au Cameroun. Le prix reflète la qualité et votre marge est excellente.",
                "script": "Avec 33 Export 65cl, vous achetez à 7200 FCFA et vendez à 7800 FCFA le casier. Marge de 600 FCFA, soit 12.8%. Et elle tourne 3x plus vite."
            },
            {
                "question": "Ça ne tourne pas chez moi",
                "response": "Impossible, c'est la N°1 au Cameroun. C'est un problème de visibilité.",
                "script": "Mettons votre 33 Export bien en vue avec notre PLV gratuite. En 2 semaines, vous verrez la différence."
            },
            {
                "question": "J'ai déjà un fournisseur",
                "response": "33 Export est incontournable. Vos clients la demandent.",
                "script": "Ne pas avoir 33 Export, c'est perdre des clients. Commençons avec 5 casiers pour tester."
            }
        ]
    },
    
    "castel-beer": {
        "identity": {
            "target": "Hommes et femmes 21-45 ans",
            "positioning": "Entrée de gamme",
            "alcohol_rate": "5%",
            "signature": "La Reine des bières blondes africaines"
        },
        "key_facts": [
            "Bière blonde de qualité supérieure",
            "Habillage couleur or, royal et exceptionnel",
            "Plus de 50 ans d'histoire",
            "Appréciée dans plus de 22 pays du continent",
            "Fine et rafraîchissante"
        ],
        "sales_arguments": {
            "rational": [
                "Bière blonde de qualité supérieure à prix accessible",
                "50 ans d'histoire = marque de confiance",
                "Présente dans 22 pays africains"
            ],
            "emotional": [
                "Valeurs positives africaines, marque panafricaine",
                "Prix accessible = accessible à tous",
                "Fine et rafraîchissante = plaisir garanti"
            ],
            "by_channel": {
                "CHR": ["Prix accessible = clientèle large", "Marge correcte"],
                "PSV": ["Produit d'appel prix attractif", "Rotation excellente"],
                "TT": ["Marque de confiance 50 ans", "Support régulier"],
                "MT": ["Excellent rapport qualité-prix", "Forte demande"]
            }
        },
        "objections": [
            {
                "question": "C'est une bière bas de gamme",
                "response": "Entrée de gamme ne veut pas dire bas de gamme. C'est une bière de qualité supérieure accessible.",
                "script": "Castel Beer, c'est 50 ans d'histoire, 22 pays. Qualité supérieure à prix accessible."
            },
            {
                "question": "La marge est trop faible",
                "response": "La rotation compense largement. Vous vendez plus de volume.",
                "script": "Castel 65cl : marge 11.1% mais rotation 2x plus rapide. Au final, vous gagnez plus."
            }
        ]
    },
    
    "mutzig": {
        "identity": {
            "target": "Hommes et femmes 25-40 ans",
            "positioning": "Mainstream Premium",
            "alcohol_rate": "5.2%",
            "signature": "La bière de caractère"
        },
        "key_facts": [
            "Bière de tradition alsacienne, brassée au Cameroun",
            "Goût franc et caractère affirmé",
            "Marque historique au Cameroun",
            "Disponible en 3 formats"
        ],
        "sales_arguments": {
            "rational": [
                "Recette alsacienne authentique",
                "Goût franc apprécié des connaisseurs",
                "3 formats disponibles"
            ],
            "emotional": [
                "Vraie bière de tradition",
                "Pour les consommateurs qui savent ce qu'ils veulent",
                "Marque historique camerounaise"
            ],
            "by_channel": {
                "CHR": ["Clientèle connaisseur", "Marge attractive"],
                "PSV": ["Bonne rotation", "Formats variés"],
                "TT": ["Marque de confiance historique"],
                "MT": ["Produit de qualité reconnu"]
            }
        },
        "objections": [
            {
                "question": "Le goût est trop fort",
                "response": "C'est justement sa force. Les vrais amateurs apprécient ce caractère.",
                "script": "Mützig, c'est pour les connaisseurs. Vos clients qui aiment le vrai goût de bière vont adorer."
            }
        ]
    }
}

# Argumentaires génériques pour marques sans données spécifiques
GENERIC_ARGUMENTAIRE = {
    "key_facts": [
        "Produit de qualité du portefeuille Boissons du Cameroun",
        "Marque reconnue et appréciée par les consommateurs",
        "Disponible en plusieurs formats",
        "Support marketing et commercial régulier"
    ],
    "sales_arguments": {
        "rational": [
            "Produit de qualité contrôlée",
            "Forte rotation garantie",
            "Marge attractive"
        ],
        "emotional": [
            "Marque de confiance",
            "Satisfaction consommateur",
            "Fidélisation clientèle"
        ],
        "by_channel": {
            "CHR": ["Marque qui valorise votre établissement", "Forte demande client", "Marge attractive"],
            "PSV": ["Produit d'appel qui attire les clients", "Rotation rapide", "Formats variés"],
            "TT": ["Marque de confiance", "Support terrain régulier", "Promotions fréquentes"],
            "MT": ["Produit incontournable en rayon", "Forte visibilité", "Promotions régulières"]
        }
    },
    "objections": [
        {
            "question": "Votre produit est trop cher",
            "response": "Notre produit offre un excellent rapport qualité-prix avec une marge attractive.",
            "script": "Regardons ensemble : avec une marge de X%, vous gagnez plus qu'avec les concurrents."
        },
        {
            "question": "Ça ne tourne pas chez moi",
            "response": "C'est souvent un problème de visibilité. Nous pouvons vous fournir de la PLV gratuite.",
            "script": "Essayons avec notre PLV gratuite pendant 2 semaines. Vous verrez la différence."
        },
        {
            "question": "J'ai déjà un fournisseur",
            "response": "Diversifier vos fournisseurs vous protège des ruptures.",
            "script": "Commençons petit pour tester. Si ça marche, on augmente. Sinon, aucune obligation."
        }
    ]
}

def format_argumentaire_yaml(brand_id, argumentaire):
    """Formate un argumentaire en YAML"""
    
    # Utiliser argumentaire spécifique ou générique
    data = ARGUMENTAIRES.get(brand_id, GENERIC_ARGUMENTAIRE)
    
    yaml = "\n    # Argumentaires de vente\n"
    
    # Identity (si disponible)
    if "identity" in data:
        yaml += "    identity:\n"
        for key, value in data["identity"].items():
            yaml += f'      {key}: "{value}"\n'
        yaml += "\n"
    
    # Key facts
    if "key_facts" in data:
        yaml += "    key_facts:\n"
        for fact in data["key_facts"]:
            yaml += f'      - "{fact}"\n'
        yaml += "\n"
    
    # Sales arguments
    yaml += "    sales_arguments:\n"
    
    if "rational" in data["sales_arguments"]:
        yaml += "      rational:\n"
        for arg in data["sales_arguments"]["rational"]:
            yaml += f'        - "{arg}"\n'
        yaml += "\n"
    
    if "emotional" in data["sales_arguments"]:
        yaml += "      emotional:\n"
        for arg in data["sales_arguments"]["emotional"]:
            yaml += f'        - "{arg}"\n'
        yaml += "\n"
    
    yaml += "      by_channel:\n"
    for channel, args in data["sales_arguments"]["by_channel"].items():
        yaml += f"        {channel}:\n"
        for arg in args:
            yaml += f'          - "{arg}"\n'
    
    yaml += "\n"
    
    # Objections
    yaml += "    objections:\n"
    for obj in data["objections"]:
        yaml += f'      - question: "{obj["question"]}"\n'
        yaml += f'        response: "{obj["response"]}"\n'
        yaml += f'        script: "{obj["script"]}"\n'
        yaml += "\n"
    
    return yaml

def main():
    print("Intégration des argumentaires dans les fichiers YAML...")
    print("=" * 80)
    
    # Pour l'instant, on génère juste un exemple pour 33 Export
    # L'intégration complète nécessiterait de parser et modifier les YAML existants
    
    output_dir = Path("/Users/macbook/Documents/SABC/lions_book/data/static/catalog")
    
    # Générer un fichier exemple avec argumentaires
    example_yaml = format_argumentaire_yaml("33-export", ARGUMENTAIRES["33-export"])
    
    example_file = output_dir / "argumentaires-example.yaml"
    with open(example_file, 'w', encoding='utf-8') as f:
        f.write("# Exemple d'intégration argumentaires\n")
        f.write("# À intégrer dans bieres-complete.yaml\n\n")
        f.write("brand:\n")
        f.write('  id: "33-export"\n')
        f.write('  name: "33 Export"\n')
        f.write(example_yaml)
    
    print(f"\n✅ Exemple généré : {example_file}")
    print(f"\n📊 Argumentaires disponibles pour {len(ARGUMENTAIRES)} marques")
    print("   - 33 Export")
    print("   - Castel Beer")
    print("   - Mützig")
    print("   - + 29 autres marques avec argumentaires génériques")
    
    print("\n💡 Les argumentaires complets sont dans :")
    print("   _bmad-output/planning-artifacts/argumentaires-complets-toutes-marques.md")

if __name__ == "__main__":
    main()
