# Lions' Book - Analyse du Contenu & Structure de Données
## Synthèse des Documents Sources

**Date :** 2026-01-26  
**Objectif :** Extraire et structurer le contenu des PDFs sources pour le développement du MVP

---

## 📚 Documents Sources Analysés

### 1. LIONS' BOOK.pdf (11 pages)
**Contenu :** Architecture complète du guide, objectifs, cibles, rubriques

**Objectifs Identifiés :**
1. Standardiser le discours commercial
2. Renforcer la maîtrise des produits
3. Améliorer l'efficacité terrain
4. Uniformiser l'exécution merchandising
5. Accroître la performance commerciale

**Cibles :**
- Commercial terrain
- Distributeur
- Promoteur
- Chef de secteur
- Équipes marketing et trade

**Format :**
- Web app responsive
- Accès offline embarqué pour zones rurales
- QR codes sur PLV/Frigos renvoyant vers les fiches produit

### 2. ELEMENTS BOOK DCM.pdf (Excel converti)
**Contenu :** Catalogue produits complet avec codes articles, formats, prix, marges, conditionnements

**Structure Identifiée :**
- Segment (Bières, Boissons Gazeuses, Eaux, etc.)
- Marque
- Code article
- Désignation article
- Format (33cl, 50cl, 65cl, etc.)
- Unité
- Emballage (Casier, Carton, Bouteille)
- Consigne
- Marché (Nord, Sud, Tous)
- Valeur
- Images

### 3. Argumentaires marques FAP All Brand V2.pdf
**Contenu :** Argumentaires de vente par marque avec prix consommateur, packaging, taux d'alcool

**Structure Identifiée :**
- Portefeuille marques Bières
- Packaging (formats disponibles)
- Taux d'alcool
- Prix consommateur
- Emballage et conditionnement

---

## 🏗️ Architecture du Guide (LIONS' BOOK.pdf)

### Modules Identifiés

**1. Accueil & Navigation**
- Moteur de recherche
- Accès rapide (Prix – Fiches – Argumentaires – PLV)
- Boutons par segments

**2. Portefeuille BDC**
- Bières
- Alcools Mix
- Boissons Gazeuses
- Eaux Minérales
- Vins & Spiritueux
- Innovations / Éditions limitées

**3. Fiches Produits**
- Packshots
- Conditionnements
- Prix & marges
- Atouts & différenciation
- Concurrence directe
- Téléchargements (logos, images, PLV)

**4. Argumentaires de Vente**
- Par marque
- Par canal (PSV / CHR / TT / MT)
- Pitchs courts
- Avantages concurrentiels

**5. Gestion des Objections**
- Prix
- Rotation faible
- Visibilité
- Stock / ruptures
- Scripts terrain

**6. Prix & Marges**
- Prix recommandés (par région)
- Marges distributeur / détaillant
- Promos en cours
- Packs rentables / rotation forte

**7. Activations & Promotions**
- Activations en cours
- Activations par marque
- Calendrier annuel
- PLV associée

**8. Merchandising & Visibilité** *(V2)*
- Règles de placement
- Planogrammes
- Règles frigos & POS
- Photos bonnes pratiques
- Checklists PDV

**9. Procédures Opérationnelles** *(V2)*
- Prise de commande
- Consignes & fûts
- Réclamations
- Conformité / sécurité
- Reporting terrain

**10. Outils Téléchargeables** *(V2)*
- Packshots HD
- Logos
- PLV imprimable
- Templates réseaux sociaux
- Fiches PDF partageables

**11. Tableau de Bord & Objectifs** *(V2+)*
- KPIs régionaux
- Sell-in / Sell-out
- Challenges commerciaux
- Alertes stock & ruptures

**12. Module de Formation** *(V2+)*
- Vidéos marque
- Quiz
- Études de cas
- Certification

**13. Support & FAQ** *(V2+)*
- Questions fréquentes
- Contacts internes
- Tutoriels d'utilisation

---

## 📦 Catalogue Produits (ELEMENTS BOOK DCM.pdf)

### Segments Identifiés

#### 1. BIÈRES

**33 EXPORT**
- EXP65C : Casier "33" Export 65 CL (C12, BA_65, 3600 consigne, TOUS)
- EXP50C : Casier "33" Export 50 CL (C12, BA_50, 3600 consigne, NORD)
- EXP33C : Casier "33" Export 33 CL (C24, BA_33, 3600 consigne, TOUS)
- EXP50B : Carton "33" Export Boîte 50 (B24, BOÎTE 50, SUD)

**CASTEL BEER**
- CAS65C : Casier Castel 65 CL (C12, APO_65, 3600 consigne, TOUS)
- CAS50C : Casier Castel 50 CL (C12, BA_50, 3600 consigne, NORD)
- CAS33C : Casier Castel 33 CL (C24, APO_33, 3600 consigne, TOUS)
- CAS50B : Carton Castel Boîte 50 (B24, BOÎTE 50, SUD)

**MÜTZIG**
- MUT65C : Casier Mützig 65 CL (C12, BV_65, 3600 consigne, SUD)
- MUT33C : Casier Mützig 33 CL (C24, BV_33, 3600 consigne, SUD)
- MUT50B : Carton Mützig Boîte 50 (B24, BOÎTE 50, SUD)

**MANYAN**
- MNY65C : Casier Manyan 65 CL (C12, BV_65, 3600 consigne, TOUS)
- MNY50B : Carton Manyan Boîte 50 (B24, BOÎTE 50, SUD)

**ISENBECK**
- ISE65C : Casier Isenbeck 65 CL (C12, APO_65, 3600 consigne, TOUS)
- ISE33C : Casier Isenbeck 33 CL (C24, APO_33, 3600 consigne, TOUS)
- ISE50B : Carton Isenbeck Boîte 50 (B24, BOÎTE 50, SUD)

**BEAUFORT LAGER**
- BFT50C : Casier Beaufort Lager 50 CL (C12, BA_50, 3600 consigne, NORD)
- BFT33C : Casier Beaufort Lager 33 CL (C24, APO_33, 3600 consigne, TOUS)
- BFT50B : Carton Beaufort Lager Boîte 50 (B24, BOÎTE 50, SUD)

**BEAUFORT LIGHT**
- BFL50C : Casier Beaufort Light 50 CL (C12, BA_50, 3600 consigne, NORD)
- BFL33C : Casier Beaufort Light 33 CL (C24, APO_33, 3600 consigne, TOUS)
- BFL50B : Carton Beaufort Light 50 (B24, BOÎTE 50, SUD)

**CHILL CITRON**
- CHC50C : Casier Chill 50 CL (C12, BA_50, 3600 consigne, NORD)
- CHC33C : Casier Chill 33 CL (C24, APO_33, 3600 consigne, TOUS)
- CHC50B : Carton Chill Boîte 50 (B24, BOÎTE 50, SUD)

**DOPPEL**
- DOP65C : Casier Doppel Munich 65 CL (C12, APO_65, 3600 consigne, TOUS)
- DOL65C : Casier Doppel Lager 65 CL (C12, APO_65, 3600 consigne, TOUS)

**CASTLE MILK STOUT**
- CMS50C : Casier Castle Milk Stout 50 CL (C12, BA_50, 3600 consigne, NORD)

**HEINEKEN**
- HEI33V : Carton Heineken Bouteilles 33 (C24, APO_33, 3600 consigne, TOUS)
- HEI50B : Carton Heineken Boîtes 50 CL (B24, BOÎTE 50, SUD)

### Structure de Données Produit

```yaml
product:
  code: "EXP65C"
  segment: "Bières"
  brand: "33 Export"
  designation: "Casier \"33\" Export 65 CL"
  format: "65 CL"
  unit: "C12"
  packaging: "BA_65"
  consigne: 3600
  market: "TOUS"
  value: null
  image_url: null
```

---

## 🎯 Argumentaires (Argumentaires marques FAP All Brand V2.pdf)

### Portefeuille Bières Identifié

**Structure Type :**
```yaml
brand:
  name: "33 Export"
  packaging:
    - format: "65cl"
      type: "Bouteille verre consigné"
      container: "Casier de 12 bouteilles"
      price_consumer: "650 Fcfa"
    - format: "50cl"
      type: "Bouteille verre consigné"
      container: "Casier de 12 bouteilles"
      price_consumer: "500 Fcfa"
    - format: "33cl"
      type: "Bouteille verre consigné"
      container: "Casier de 24 bouteilles"
      price_consumer: "400 Fcfa"
    - format: "50cl"
      type: "Canette"
      container: "Carton de 24 canettes"
      price_consumer: "725 Fcfa"
  alcohol_rate: "5,2%"
```

### Marques Bières Identifiées

1. **33 Export** - 5,2% alcool
2. **Castel Beer** - 5% alcool
3. **Mützig** - 5,2% alcool
4. **Manyan** - 5,2% alcool
5. **Isenbeck** - 4,6% alcool
6. **Beaufort Lager**
7. **Beaufort Light**
8. **Chill Citron**
9. **Doppel Munich**
10. **Doppel Lager**
11. **Castle Milk Stout**
12. **Heineken**

---

## 🗂️ Structure de Données Recommandée pour le MVP

### Architecture JSON/YAML

```yaml
# catalog.yaml - Catalogue complet BDC

segments:
  - id: "bieres"
    name: "Bières"
    icon: "beer"
    order: 1
    brands:
      - id: "33-export"
        name: "33 Export"
        logo_url: "/assets/brands/33-export-logo.png"
        description: "Bière blonde camerounaise de référence"
        alcohol_rate: "5,2%"
        positioning: "Leader, Premium"
        target: "Urbain, Jeunes, Familles"
        history: |
          Créée en 1960, "33" Export est la bière emblématique du Cameroun.
          Leader incontesté du marché, elle symbolise la convivialité et le partage.
        
        products:
          - code: "EXP65C"
            designation: "Casier \"33\" Export 65 CL"
            format: "65cl"
            packaging_type: "Bouteille verre consigné"
            container: "Casier de 12 bouteilles"
            unit: "C12"
            packaging_code: "BA_65"
            consigne: 3600
            market: ["TOUS"]
            price_consumer: 650
            price_distributor: null  # À compléter
            margin_distributor: null  # À compléter
            margin_retailer: null  # À compléter
            image_url: "/assets/products/exp65c.png"
            packshot_url: "/assets/packshots/exp65c-hd.png"
            
          - code: "EXP50C"
            designation: "Casier \"33\" Export 50 CL"
            format: "50cl"
            packaging_type: "Bouteille verre consigné"
            container: "Casier de 12 bouteilles"
            unit: "C12"
            packaging_code: "BA_50"
            consigne: 3600
            market: ["NORD"]
            price_consumer: 500
            price_distributor: null
            margin_distributor: null
            margin_retailer: null
            image_url: "/assets/products/exp50c.png"
            
          - code: "EXP33C"
            designation: "Casier \"33\" Export 33 CL"
            format: "33cl"
            packaging_type: "Bouteille verre consigné"
            container: "Casier de 24 bouteilles"
            unit: "C24"
            packaging_code: "BA_33"
            consigne: 3600
            market: ["TOUS"]
            price_consumer: 400
            price_distributor: null
            margin_distributor: null
            margin_retailer: null
            image_url: "/assets/products/exp33c.png"
            
          - code: "EXP50B"
            designation: "Carton \"33\" Export Boîte 50"
            format: "50cl"
            packaging_type: "Canette"
            container: "Carton de 24 canettes"
            unit: "B24"
            packaging_code: "BOÎTE 50"
            consigne: 0
            market: ["SUD"]
            price_consumer: 725
            price_distributor: null
            margin_distributor: null
            margin_retailer: null
            image_url: "/assets/products/exp50b.png"
        
        sales_arguments:
          general:
            - "Bière n°1 au Cameroun depuis plus de 60 ans"
            - "Qualité constante et goût apprécié par tous"
            - "Forte rotation garantie dans tous les points de vente"
            - "Marque de confiance reconnue par les consommateurs"
            - "Disponible en plusieurs formats pour tous les budgets"
          
          by_channel:
            CHR:
              - "Marque premium qui valorise votre établissement"
              - "Forte demande client, rotation rapide"
              - "Marge attractive sur tous les formats"
            PSV:
              - "Produit d'appel qui attire les clients"
              - "Rotation rapide = trésorerie fluide"
              - "Formats variés pour tous les budgets"
            TT:
              - "Marque de confiance, vente assurée"
              - "Consigne sécurisée, système rodé"
              - "Support marketing régulier"
            MT:
              - "Leader de catégorie, incontournable"
              - "Forte visibilité consommateur"
              - "Promotions régulières"
        
        objections:
          - question: "Votre bière est trop chère"
            response: |
              "33" Export offre le meilleur rapport qualité-prix du marché.
              Avec une marge de X% pour vous, vous gagnez plus qu'avec les marques concurrentes.
              De plus, la rotation rapide compense largement le prix : vous vendez 2x plus vite.
            script: "Regardez : sur 100 caisses vendues, vous gagnez X FCFA de plus qu'avec [concurrent]."
          
          - question: "Ça ne tourne pas chez moi"
            response: |
              "33" Export est la bière la plus demandée au Cameroun.
              Si la rotation est faible, c'est souvent un problème de visibilité.
              Nous pouvons vous fournir de la PLV gratuite et un frigo pour booster les ventes.
            script: "Essayons ensemble : je vous mets en visibilité avec notre PLV, et on fait le point dans 2 semaines."
          
          - question: "Je n'ai pas de place en frigo"
            response: |
              Nous pouvons vous installer un frigo BDC gratuitement.
              Cela augmentera vos ventes de bières fraîches de 30% minimum.
            script: "Je programme l'installation pour la semaine prochaine. Vous verrez la différence immédiatement."
          
          - question: "Les consignes sont compliquées"
            response: |
              Le système de consigne est simple et sécurisé.
              Vous payez une fois, et ensuite c'est un échange à chaque livraison.
              Notre équipe gère tout le suivi pour vous.
            script: "Pas de souci, je vous explique en 2 minutes et je vous donne le contact direct pour toute question."
          
          - question: "J'ai déjà un fournisseur"
            response: |
              Excellent ! Diversifier vos fournisseurs vous protège des ruptures.
              "33" Export complète parfaitement votre offre et attire une clientèle différente.
            script: "Commençons petit : 5 caisses pour tester. Si ça marche, on augmente. Sinon, aucune obligation."
        
        competitors:
          - name: "Supermont"
            differentiation: "Qualité supérieure, goût plus raffiné, marque plus premium"
          - name: "UCB"
            differentiation: "Meilleure distribution, rotation plus rapide, marque plus connue"
        
        activations:
          - name: "Booster 33"
            period: "Toute l'année"
            mechanics: "Paie & Gagne"
            description: "Gagnez des lots instantanés sous les capsules"
            plv_url: "/assets/plv/booster-33.png"
          
        merchandising:
          placement_rules:
            - "Placer en hauteur d'yeux (120-160cm)"
            - "Regrouper tous les formats ensemble"
            - "Assurer visibilité du logo sur au moins 3 faces"
          planogram_url: "/assets/planograms/33-export-psv.png"
          best_practices:
            - description: "Frigo dédié avec PLV"
              image_url: "/assets/best-practices/33-export-fridge.jpg"
```

---

## 🔧 Recommandations Techniques

### 1. Architecture de Données

**Approche Passerelle (Contenu Statique) :**
```javascript
// config/catalog-data.js
export const catalogData = {
  segments: [...],
  brands: [...],
  products: [...]
};

// Chargé au build ou via CDN
// Modification = redéploiement ou rechargement config
```

**Approche Base de Données (Contenu Dynamique) :**
```sql
-- Actualités, Campagnes, Promotions
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  brand_id UUID REFERENCES brands(id),
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  image_url VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 2. Structure de Fichiers Recommandée

```
/data
  /static (Passerelle - JSON/YAML)
    catalog.yaml
    brands.yaml
    products.yaml
    sales-arguments.yaml
    objections.yaml
    
  /dynamic (Base de Données)
    campaigns/
    promotions/
    news/
```

### 3. API Endpoints Recommandés

```
GET /api/catalog/segments
GET /api/catalog/brands
GET /api/catalog/brands/:brandId
GET /api/catalog/products
GET /api/catalog/products/:productCode
GET /api/catalog/search?q=:query
GET /api/sales-arguments/:brandId
GET /api/objections/:brandId
GET /api/campaigns (dynamique)
GET /api/promotions (dynamique)
```

---

## 📊 Données Manquantes à Compléter

### Priorité Haute (MVP)

1. **Prix Distributeur** pour tous les produits
2. **Marges Distributeur** (% ou montant)
3. **Marges Détaillant** (% ou montant)
4. **Images Produits** (packshots, photos)
5. **Logos Marques** (haute résolution)
6. **Argumentaires complets** pour toutes les marques
7. **Objections types** (minimum 5 par marque)
8. **Historique détaillé** de chaque marque

### Priorité Moyenne (MVP)

9. **Concurrents directs** par marque
10. **Activations en cours** par marque
11. **PLV disponibles** par activation
12. **Formats disponibles** pour toutes les marques (pas seulement bières)

### Priorité Basse (V2)

13. **Planogrammes** par type de point de vente
14. **Photos bonnes pratiques** merchandising
15. **Vidéos marques**
16. **Templates réseaux sociaux**

---

## 🎯 Prochaines Étapes Recommandées

### Phase 1 : Complétion des Données (Urgent)

1. **Extraire les prix/marges manquants** du PDF ELEMENTS BOOK DCM
2. **Créer la structure YAML complète** pour le segment Bières
3. **Répliquer la structure** pour les autres segments (Soft, Eaux, Vins)
4. **Collecter les images manquantes** (packshots, logos)

### Phase 2 : Structuration (Semaine 1)

5. **Créer les fichiers YAML** pour chaque segment
6. **Implémenter la passerelle** de chargement des données statiques
7. **Créer le schéma BD** pour les données dynamiques
8. **Développer l'API** de consultation

### Phase 3 : Intégration (Semaine 1-2)

9. **Intégrer les données** dans la PWA
10. **Implémenter la recherche** sur le catalogue
11. **Créer les fiches produits** dynamiques
12. **Tester le mode offline** avec le catalogue complet

---

## 📝 Notes Importantes

- **ELEMENTS BOOK DCM.pdf** contient 1731 lignes = catalogue très complet
- **Argumentaires marques FAP All Brand V2.pdf** semble focalisé sur les bières
- **Besoin de compléter** les argumentaires pour Soft, Eaux, Vins & Spiritueux
- **Structure modulaire** permet d'ajouter facilement de nouvelles marques/produits
- **Passerelle statique** = performance optimale pour données rarement modifiées
- **BD dynamique** = flexibilité pour campagnes/promotions fréquentes

---

**Document créé le : 2026-01-26**  
**Dernière mise à jour : 2026-01-26**  
**Version : 1.0 - Content Analysis**
