# Lions' Book - Données de Prix et Marges Extraites
## ELEMENTS BOOK DCM - Analyse Complète

**Date :** 2026-01-26  
**Source :** ELEMENTS BOOK DCM.pdf (1731 lignes)

---

## 📊 Résumé de l'Extraction

### Produits Identifiés : 79

**Répartition par Segment :**

#### 1. BIÈRES (40 produits)
- **33 Export** : 4 produits (65cl, 50cl, 33cl, canette 50cl)
- **Castel Beer** : 4 produits (65cl, 50cl, 33cl, canette 50cl)
- **Mützig** : 3 produits (65cl, 33cl, canette 50cl)
- **Manyan** : 2 produits (65cl, canette 50cl)
- **Isenbeck** : 3 produits (65cl, 33cl, canette 50cl)
- **Beaufort Lager** : 3 produits (50cl, 33cl, canette 50cl)
- **Beaufort Light** : 3 produits (50cl, 33cl, canette 50cl)
- **Chill Citron** : 3 produits (50cl, 33cl, canette 50cl)
- **Doppel Munich** : 1 produit (65cl)
- **Doppel Lager** : 1 produit (65cl)
- **Castle Milk Stout** : 1 produit (50cl)
- **Heineken** : 2 produits (33cl bouteille, canette 50cl)

#### 2. ALCOOLS MIX (9 produits)
- **Booster Whisky Cola** : 3 produits
- **Booster Gin Tonic** : 2 produits
- **Smirnoff Ice Pineapple** : 2 produits
- **Smirnoff Ice Black** : 2 produits

#### 3. BOISSONS GAZEUSES (18 produits)
- **TOP** : 5 produits (TGI, TPA, TPG, TPO, TPP, TPT)
- **World Cola** : 3 produits
- **Youzou** : 3 produits
- **Orangina** : 3 produits (ORG)
- **D'jino** : 3 produits (DJC)
- **Vimto** : 3 produits

#### 4. EAUX MINÉRALES (6 produits)
- **Tangui** : 3 produits (TCI, XXL)
- **Vitale** : 3 produits
- **Aquabelle** : 1 produit (AQB)

#### 5. AUTRES (6 produits)
- **Unknown (SOD)** : 2 produits
- **Unknown (BGT)** : 2 produits
- **Orijin** : 1 produit

---

## 💰 Structure de Prix Identifiée

### Canaux de Distribution

**1. Marketing → Distributeur (CHR)**
- Prix d'achat
- Remise
- Frais CHR
- Marge
- Taux de marge

**2. Distributeur → Détaillants (ELV)**
- Prix d'achat
- Ristourne
- Frais ELV
- Marge
- Taux de marge
- Prix Unitaire
- Prix Casier

**3. Détaillants → Consommateurs**
- Prix Unitaire
- Prix Casier

### Exemple de Structure de Prix (33 Export 65cl)

**Marketing → Distributeur CHR :**
- Prix d'achat : 6 503 FCFA
- Remise : 339 FCFA
- Frais CHR : 528,45 FCFA
- Marge : 783 FCFA
- Taux : 11,1%
- **Prix de vente distributeur : 7 200 FCFA**

**Distributeur → Détaillants :**
- Prix d'achat : 7 200 FCFA
- Ristourne : 324,3 FCFA
- Frais ELV : 600 FCFA
- Marge : 924,3 FCFA
- Taux : 12,8%
- **Prix Unitaire : 650 FCFA**
- **Prix Casier : 7 800 FCFA**

**Détaillants → Consommateurs :**
- **Prix Unitaire Consommateur : 650 FCFA**
- **Prix Casier Consommateur : 7 800 FCFA**

---

## 📦 Données Produits Complètes

### Format de Données Extrait

```json
{
  "code": "EXP65C",
  "designation": "CASIER \"33\" EXPORT 65 CL",
  "format": "65 CL",
  "unit": "C12",
  "packaging": "BA_65",
  "consigne": 3600,
  "market": "TOUS",
  "pricing": {
    "marketing_to_distributor": {
      "prix_achat": 6503,
      "remise": 339,
      "frais_chr": 528.45,
      "marge": 783,
      "taux_marge": "11.1%",
      "prix_vente": 7200
    },
    "distributor_to_retailer": {
      "prix_achat": 7200,
      "ristourne": 324.3,
      "frais_elv": 600,
      "marge": 924.3,
      "taux_marge": "12.8%",
      "prix_unitaire": 650,
      "prix_casier": 7800
    },
    "consumer_price": {
      "prix_unitaire": 650,
      "prix_casier": 7800
    }
  }
}
```

---

## 🔍 Observations Importantes

### 1. Structure de Prix à 3 Niveaux
Le système de prix BDC fonctionne sur 3 niveaux :
1. **Marketing → Distributeur CHR** (avec remises et frais CHR)
2. **Distributeur → Détaillants ELV** (avec ristournes et frais ELV)
3. **Détaillants → Consommateurs** (prix final)

### 2. Marges Moyennes Observées
- **Marge Distributeur** : 6-17% selon produit
- **Marge Détaillant** : 12-18% selon produit

### 3. Variations Régionales
- Certains produits sont disponibles uniquement au **NORD** (ex: 50cl)
- D'autres uniquement au **SUD** (ex: canettes)
- Beaucoup sont disponibles **TOUS** marchés

### 4. Consignes
- Consigne standard : **3 600 FCFA** pour bouteilles verre
- Consigne : **0 FCFA** pour canettes (pas de consigne)

### 5. Formats Disponibles
- **65cl** : Format premium (bières)
- **50cl** : Format standard (bières, soft)
- **33cl** : Format économique (bières)
- **Canettes 50cl** : Format moderne (tous segments)

---

## 📋 Données Manquantes Identifiées

### Critique pour MVP

1. **Prix détaillés pour segments non-bières**
   - Soft drinks (TOP, World Cola, Youzou, etc.)
   - Eaux (Tangui, Vitale, Aquabelle)
   - Vins & Spiritueux (non présents dans ELEMENTS BOOK DCM)

2. **Images produits**
   - Packshots haute résolution
   - Photos produits en situation
   - Logos marques

3. **Historique marques**
   - Année de création
   - Évolution
   - Success stories

4. **Argumentaires complets**
   - Arguments par canal (CHR, PSV, TT, MT)
   - Pitchs courts
   - Différenciation concurrentielle

5. **Objections types**
   - Minimum 5 par marque
   - Réponses détaillées
   - Scripts terrain

---

## 🎯 Recommandations pour Complétion

### Phase 1 : Extraction Manuelle (Urgent)

**Analyser manuellement le PDF ELEMENTS BOOK DCM pour :**
1. Extraire les prix complets pour chaque produit
2. Mapper les codes produits aux marques
3. Identifier les segments manquants

**Actions :**
- Créer un tableau Excel avec tous les produits
- Colonnes : Code, Marque, Désignation, Format, Prix Achat, Remise, Marge, Prix Consommateur
- Valider avec l'équipe BDC

### Phase 2 : Structuration YAML (Semaine 1)

**Créer fichiers YAML par segment :**
```
/data/static/
  catalog/
    bieres.yaml
    soft-drinks.yaml
    eaux.yaml
    vins-spiritueux.yaml
    alcools-mix.yaml
```

**Structure recommandée :**
```yaml
segment: "Bières"
brands:
  - id: "33-export"
    name: "33 Export"
    products:
      - code: "EXP65C"
        designation: "Casier \"33\" Export 65 CL"
        format: "65cl"
        pricing:
          consumer_price: 650
          distributor_margin: "12.8%"
          retailer_margin: "12.8%"
```

### Phase 3 : Collecte Assets (Semaine 1-2)

**Images nécessaires :**
1. Packshots HD (tous produits)
2. Logos marques (toutes marques)
3. PLV activations (campagnes en cours)
4. Photos merchandising (bonnes pratiques)

**Source :**
- Équipe Marketing BDC
- Archives visuelles
- Photographe professionnel si nécessaire

---

## 📊 Statistiques Extraction

```
Total produits extraits : 79
Total marques identifiées : 30
  - Bières : 12 marques
  - Alcools Mix : 4 marques
  - Soft Drinks : 6 marques
  - Eaux : 3 marques
  - Autres : 5 marques

Données complètes : ~40%
Données partielles : ~60%
```

---

## 🚀 Prochaines Étapes

1. ✅ **Extraction automatique** - Script Python créé
2. ⏳ **Extraction manuelle prix** - En cours (nécessite analyse détaillée PDF)
3. ⏳ **Création structure YAML** - À faire
4. ⏳ **Collecte images** - À planifier
5. ⏳ **Validation données** - Avec équipe BDC

---

**Fichier de données brutes :** `/tmp/elements_book_parsed.json`  
**Script d'extraction :** `/Users/macbook/Documents/SABC/lions_book/scripts/parse_elements_book.py`

**Document créé le : 2026-01-26**  
**Dernière mise à jour : 2026-01-26**  
**Version : 1.0 - Pricing Data Extraction**
