---
title: "Nouvelles Sections Produit - Conservation & Caractéristiques"
date: 2026-01-28
source: "Feedback terrain 4 chefs secteur"
status: "Spécification validée"
---

# Nouvelles Sections Produit - Conservation & Caractéristiques Techniques

**Source :** Feedback terrain des chefs de secteur (Maurice SAAH, Michel TJOMB, Clarisse TEMGOUA, Yves Prosper MBELLA EPEE)

**Besoin identifié :** Les vendeurs ont besoin d'informations pratiques sur la conservation et les caractéristiques techniques pour conseiller efficacement leurs clients détaillants.

---

## 1. Section Conservation

### Objectif
Fournir aux chefs de secteur des conseils pratiques de conservation qu'ils peuvent transmettre aux détaillants pour optimiser la qualité des produits et réduire les pertes.

### Cas d'usage
**Scénario :** Chef de secteur chez un épicier qui se plaint de produits périmés
- Vendeur consulte section Conservation
- Donne conseils température, stockage, rotation
- Aide le détaillant à optimiser son merchandising
- Réduit les pertes, améliore satisfaction

### Structure de données

```yaml
conservation:
  temperature:
    ideale: "4-8°C"
    maximum: "25°C"
    recommandations:
      - "Éviter exposition directe au soleil"
      - "Stocker dans endroit frais et sec"
      - "Éloigner des sources de chaleur"
  
  duree:
    avantOuverture: "6 mois"
    apresOuverture: "24-48h (si applicable)"
    dlc: "Date limite visible sur emballage"
  
  stockage:
    bonnesPratiques:
      - "Stocker debout (pour les bières)"
      - "À l'abri de la lumière"
      - "Dans un endroit sec"
      - "Rotation FIFO (First In, First Out)"
    mauvaises Pratiques:
      - "Près de sources de chaleur"
      - "Exposition directe au soleil"
      - "Environnement humide"
      - "Empilage excessif"
  
  conseilsMerchandising:
    - "Vérifier dates régulièrement (hebdomadaire)"
    - "Nettoyer rayons avant réapprovisionnement"
    - "Placer nouveaux produits derrière les anciens"
    - "Retirer produits proches péremption"
    - "Maintenir température constante"
  
  signesDeterioration:
    - "Changement de couleur"
    - "Odeur inhabituelle"
    - "Emballage gonflé ou endommagé"
    - "Date dépassée"
```

### Interface utilisateur

```
┌─────────────────────────────────┐
│ CASTEL 65cl                     │
│                                 │
│ [Tabs]                          │
│ • Argumentaire                  │
│ • Objections                    │
│ • Conservation 🆕               │  ← Nouveau
│ • Caractéristiques              │
│ • Activations                   │
└─────────────────────────────────┘

[Quand on tape sur Conservation]
↓

┌─────────────────────────────────┐
│ 💡 CONSEILS CONSERVATION        │
│                                 │
│ 🌡️ TEMPÉRATURE                 │
│ • Idéale : 4-8°C                │
│ • Maximum : 25°C                │
│ • ⚠️ Éviter soleil direct       │
│                                 │
│ ⏱️ DURÉE                        │
│ • Avant ouverture : 6 mois      │
│ • Après ouverture : 24-48h      │
│                                 │
│ 📦 STOCKAGE                     │
│ ✅ À faire :                    │
│ • Endroit frais et sec          │
│ • Debout (bières)               │
│ • Rotation FIFO                 │
│                                 │
│ ❌ À éviter :                   │
│ • Sources de chaleur            │
│ • Exposition soleil             │
│ • Environnement humide          │
│                                 │
│ 🏪 CONSEILS MERCHANDISING       │
│ • Vérifier dates chaque semaine │
│ • Nettoyer rayons régulièrement │
│ • Nouveaux produits derrière    │
│                                 │
│ ⚠️ SIGNES DÉTÉRIORATION         │
│ • Changement couleur            │
│ • Odeur inhabituelle            │
│ • Emballage gonflé              │
└─────────────────────────────────┘
```

### Contenu par catégorie

#### Bières
```yaml
temperature:
  ideale: "4-8°C"
  maximum: "25°C"
duree: "6 mois"
stockage:
  - "Debout pour préserver carbonatation"
  - "À l'abri de la lumière (éviter oxydation)"
conseils:
  - "Ne jamais recongeler après décongélation"
  - "Servir fraîche (4-6°C) pour meilleur goût"
```

#### Soft Drinks
```yaml
temperature:
  ideale: "10-15°C"
  maximum: "30°C"
duree: "12 mois"
stockage:
  - "Debout ou couché selon emballage"
  - "Éviter chaleur excessive (perte carbonatation)"
conseils:
  - "Agiter doucement avant ouverture si longue conservation"
  - "Consommer rapidement après ouverture"
```

#### Eaux
```yaml
temperature:
  ideale: "Température ambiante"
  maximum: "35°C"
duree: "24 mois"
stockage:
  - "À l'abri de la lumière et odeurs fortes"
  - "Emballage hermétique"
conseils:
  - "Eau absorbe odeurs environnantes"
  - "Conserver dans endroit propre"
```

#### Vins & Spiritueux
```yaml
temperature:
  ideale: "12-18°C (vins), 15-20°C (spiritueux)"
  maximum: "25°C"
duree: "Variable selon type"
stockage:
  - "Bouteilles couchées (vins avec bouchon liège)"
  - "Debout (spiritueux)"
  - "Obscurité totale recommandée"
conseils:
  - "Éviter vibrations"
  - "Température constante critique"
```

---

## 2. Section Caractéristiques Techniques

### Objectif
Fournir transparence sur composition produits pour répondre aux questions détaillants et consommateurs finaux sur ingrédients, valeurs nutritionnelles, et process de fabrication.

### Cas d'usage
**Scénario :** Détaillant demande "C'est fait avec quoi exactement ?"
- Vendeur consulte Caractéristiques techniques
- Montre ingrédients, process de fabrication
- Rassure sur qualité et transparence
- Renforce confiance

### Structure de données

```yaml
caracteristiques:
  ingredients:
    principaux:
      - "Eau"
      - "Malt d'orge"
      - "Houblon"
      - "Levure"
    additifs: []
    allergenes:
      - "Gluten (orge)"
  
  valeursNutritionnelles:
    portionReference: "100ml"
    energie: "43 kcal"
    glucides: "3.5g"
    proteines: "0.5g"
    lipides: "0g"
    alcool: "5.0% vol"
  
  processusFabrication:
    etapes:
      - "Brassage du malt"
      - "Fermentation contrôlée"
      - "Maturation (21 jours minimum)"
      - "Filtration"
      - "Embouteillage"
    duree: "4-6 semaines"
    origine: "Brassé au Cameroun"
  
  certifications:
    - name: "ISO 9001"
      description: "Management de la qualité"
      annee: "2015"
    - name: "HACCP"
      description: "Sécurité alimentaire"
      annee: "2018"
  
  emballage:
    type: "Bouteille verre"
    volume: "65cl"
    recyclable: true
    consigneDisponible: true
```

### Interface utilisateur

```
┌─────────────────────────────────┐
│ 🔬 CARACTÉRISTIQUES TECHNIQUES  │
│                                 │
│ 🧪 INGRÉDIENTS                  │
│ • Eau                           │
│ • Malt d'orge                   │
│ • Houblon                       │
│ • Levure                        │
│                                 │
│ ⚠️ Allergènes : Gluten (orge)  │
│                                 │
│ 📊 VALEURS NUTRITIONNELLES      │
│ (pour 100ml)                    │
│ • Énergie : 43 kcal             │
│ • Glucides : 3.5g               │
│ • Protéines : 0.5g              │
│ • Alcool : 5.0% vol             │
│                                 │
│ 🏭 PROCESSUS FABRICATION        │
│ 1. Brassage du malt             │
│ 2. Fermentation contrôlée       │
│ 3. Maturation (21 jours min)    │
│ 4. Filtration                   │
│ 5. Embouteillage                │
│                                 │
│ Durée totale : 4-6 semaines     │
│ 🇨🇲 Brassé au Cameroun          │
│                                 │
│ ✅ CERTIFICATIONS               │
│ • ISO 9001 (Qualité) - 2015     │
│ • HACCP (Sécurité) - 2018       │
│                                 │
│ 📦 EMBALLAGE                    │
│ • Bouteille verre 65cl          │
│ • ♻️ Recyclable                 │
│ • 💰 Consigne disponible        │
└─────────────────────────────────┘
```

### Contenu par catégorie

#### Bières
```yaml
ingredients:
  - "Eau purifiée"
  - "Malt d'orge/maïs"
  - "Houblon"
  - "Levure"
allergenes: ["Gluten"]
processusFabrication: "Brassage traditionnel, fermentation 21 jours"
certifications: ["ISO 9001", "HACCP"]
```

#### Soft Drinks
```yaml
ingredients:
  - "Eau gazéifiée"
  - "Sucre/édulcorants"
  - "Arômes naturels"
  - "Acidifiants"
  - "Conservateurs"
allergenes: []
processusFabrication: "Mélange, carbonatation, embouteillage aseptique"
certifications: ["ISO 9001", "HACCP"]
```

#### Eaux
```yaml
ingredients:
  - "Eau de source naturelle"
allergenes: []
origine: "Source [Nom], Cameroun"
processusFabrication: "Captage, filtration naturelle, embouteillage"
certifications: ["ISO 9001", "Certification source"]
```

#### Vins & Spiritueux
```yaml
ingredients:
  - "Raisins/céréales"
  - "Levures"
  - "Sulfites (conservateur)"
allergenes: ["Sulfites"]
processusFabrication: "Fermentation, vieillissement, mise en bouteille"
certifications: ["ISO 9001"]
```

---

## 3. Implémentation Technique

### Modèle de données TypeScript

```typescript
// Conservation
interface Conservation {
  temperature: {
    ideale: string;
    maximum: string;
    recommandations: string[];
  };
  duree: {
    avantOuverture: string;
    apresOuverture?: string;
    dlc: string;
  };
  stockage: {
    bonnesPratiques: string[];
    mauvaisesPratiques: string[];
  };
  conseilsMerchandising: string[];
  signesDeterioration: string[];
}

// Caractéristiques
interface Caracteristiques {
  ingredients: {
    principaux: string[];
    additifs?: string[];
    allergenes: string[];
  };
  valeursNutritionnelles?: {
    portionReference: string;
    energie: string;
    glucides: string;
    proteines: string;
    lipides: string;
    alcool?: string;
  };
  processusFabrication: {
    etapes: string[];
    duree: string;
    origine: string;
  };
  certifications: Certification[];
  emballage: {
    type: string;
    volume: string;
    recyclable: boolean;
    consigneDisponible?: boolean;
  };
}

interface Certification {
  name: string;
  description: string;
  annee: string;
}

// Produit complet
interface Product {
  // ... autres champs existants
  conservation: Conservation;
  caracteristiques: Caracteristiques;
}
```

### Fichiers à créer

```
src/
├── features/
│   ├── product-detail/
│   │   ├── tabs/
│   │   │   ├── ConservationTab.tsx       🆕
│   │   │   ├── CaracteristiquesTab.tsx   🆕
│   │   │   ├── ArgumentaireTab.tsx
│   │   │   ├── ObjectionsTab.tsx
│   │   │   └── ActivationsTab.tsx
│   │   └── ProductDetailTabs.tsx
│   └── ...
├── types/
│   ├── conservation.ts                    🆕
│   ├── caracteristiques.ts                🆕
│   └── product.ts
└── ...
```

---

## 4. Priorisation MVP

### Inclus dans MVP (31 Janvier 2026)
✅ **Conservation - Version basique**
- Température idéale/maximum
- Durée conservation
- 3-5 bonnes pratiques stockage
- 3-5 conseils merchandising

✅ **Caractéristiques - Version basique**
- Ingrédients principaux
- Allergènes
- Certifications principales (ISO 9001, HACCP)
- Origine fabrication

### Post-MVP (V2)
⏳ **Conservation - Version complète**
- Signes détérioration détaillés
- Vidéos tutoriels merchandising
- Calcul pertes évitées

⏳ **Caractéristiques - Version complète**
- Valeurs nutritionnelles complètes
- Processus fabrication détaillé
- Traçabilité complète
- Comparaisons nutritionnelles

---

## 5. Validation Terrain

### Questions à poser aux chefs de secteur
1. Ces informations répondent-elles aux questions fréquentes des détaillants ?
2. Le niveau de détail est-il adapté (trop/pas assez) ?
3. Quelles autres informations pratiques seraient utiles ?
4. Comment utiliseriez-vous ces sections pendant une visite ?

### Critères de succès
- ✅ 70%+ des vendeurs consultent ces sections au moins 1x/semaine
- ✅ Réduction des questions "Comment conserver ?" et "C'est fait avec quoi ?"
- ✅ Feedback positif des détaillants sur conseils conservation
- ✅ Amélioration perception professionnalisme vendeurs BDC

---

## 6. Exemples de contenu réel

### Exemple : Castel 65cl

```yaml
conservation:
  temperature:
    ideale: "4-8°C"
    maximum: "25°C"
    recommandations:
      - "Conserver au frais pour préserver qualité"
      - "Éviter exposition directe au soleil"
      - "Éloigner des sources de chaleur"
  duree:
    avantOuverture: "6 mois à partir de la date de production"
    apresOuverture: "Consommer dans les 24h après ouverture"
    dlc: "Voir date sur étiquette"
  stockage:
    bonnesPratiques:
      - "Stocker debout pour préserver carbonatation"
      - "Dans un endroit frais et sec"
      - "À l'abri de la lumière"
      - "Rotation FIFO (First In, First Out)"
      - "Vérifier dates hebdomadairement"
    mauvaisesPratiques:
      - "Près de sources de chaleur (fours, générateurs)"
      - "Exposition directe au soleil"
      - "Environnement humide"
      - "Empilage excessif (max 5 casiers)"
  conseilsMerchandising:
    - "Placer en zone fraîche du magasin"
    - "Nouveaux casiers derrière les anciens"
    - "Nettoyer rayons avant réapprovisionnement"
    - "Retirer produits < 1 mois de péremption"
    - "Maintenir température constante"
  signesDeterioration:
    - "Changement de couleur (brunissement)"
    - "Odeur aigre ou inhabituelle"
    - "Capsule bombée ou rouillée"
    - "Dépôt anormal au fond"

caracteristiques:
  ingredients:
    principaux:
      - "Eau purifiée"
      - "Malt d'orge"
      - "Maïs"
      - "Houblon"
      - "Levure"
    additifs: []
    allergenes:
      - "Gluten (orge)"
  valeursNutritionnelles:
    portionReference: "100ml"
    energie: "43 kcal (180 kJ)"
    glucides: "3.5g"
    proteines: "0.5g"
    lipides: "0g"
    alcool: "5.0% vol"
  processusFabrication:
    etapes:
      - "Brassage du malt à température contrôlée"
      - "Fermentation avec levures sélectionnées (7-10 jours)"
      - "Maturation en cuve (21 jours minimum)"
      - "Filtration pour clarté optimale"
      - "Embouteillage aseptique"
    duree: "4-6 semaines du brassage à l'embouteillage"
    origine: "Brassée à Douala, Cameroun"
  certifications:
    - name: "ISO 9001:2015"
      description: "Management de la qualité"
      annee: "2015"
    - name: "HACCP"
      description: "Analyse des dangers et points critiques"
      annee: "2018"
  emballage:
    type: "Bouteille verre ambré"
    volume: "65cl (650ml)"
    recyclable: true
    consigneDisponible: true
```

---

## 7. Notes d'implémentation

### Priorités
1. **Phase 1 (MVP)** : Conservation + Caractéristiques basiques pour top 20 produits
2. **Phase 2 (Post-MVP)** : Extension à tout le catalogue
3. **Phase 3 (Future)** : Enrichissement contenu (vidéos, comparaisons)

### Sources de données
- **Conservation** : Standards BDC + bonnes pratiques industrie
- **Caractéristiques** : Fiches techniques produits BDC existantes
- **Certifications** : Département qualité BDC
- **Process fabrication** : Documentation brasserie

### Maintenance
- Mise à jour annuelle ou lors changement formulation
- Validation par département qualité BDC
- Feedback terrain intégré trimestriellement
