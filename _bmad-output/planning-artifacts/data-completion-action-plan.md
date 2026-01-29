# Lions' Book - Plan d'Action pour Complétion des Données
## Roadmap MVP - Deadline : 31 Janvier 2026

**Date :** 2026-01-26  
**Jours restants :** 5 jours  
**Priorité :** CRITIQUE

---

## ✅ Travail Accompli

### Documents Créés
1. ✅ **Product Brief complet** (569 lignes) - Vision, utilisateurs, métriques, scope MVP
2. ✅ **Spécifications Techniques MVP** - Architecture, design, contraintes
3. ✅ **Analyse Contenu & Structure** - Extraction PDFs, architecture données
4. ✅ **Données Prix & Marges** - 79 produits extraits, structure de prix à 3 niveaux
5. ✅ **Structure YAML Bières** - Exemple complet "33 Export" avec pricing, arguments, objections

### Données Extraites
- **79 produits** identifiés (12 marques bières, 4 alcools mix, 6 soft drinks, 3 eaux)
- **Structure de prix** à 3 niveaux (Marketing→Distributeur→Détaillant→Consommateur)
- **Marges** : Distributeur 6-17%, Détaillant 12-18%
- **Formats** : 65cl, 50cl, 33cl, canettes 50cl
- **Consignes** : 3600 FCFA (bouteilles), 0 FCFA (canettes)

---

## 🎯 Données Manquantes - Priorisation MVP

### CRITIQUE (Bloquant MVP - À faire AUJOURD'HUI)

#### 1. Images Produits Essentielles
**Besoin :**
- **Logos marques** (12 bières minimum) - Format PNG transparent, haute résolution
- **Packshots produits** (au moins les 4 formats de "33 Export") - Format PNG/JPG, HD

**Action :**
- [ ] Contacter équipe Marketing BDC pour récupérer assets existants
- [ ] Si non disponibles : photographier les produits ou utiliser placeholders temporaires
- [ ] Organiser dans `/assets/brands/` et `/assets/packshots/`

**Deadline :** 26 janvier soir

#### 2. Complétion Prix pour Toutes les Marques Bières
**Besoin :**
- Prix complets pour les 12 marques de bières (actuellement seul "33 Export" est complet)
- Extraction manuelle du PDF ELEMENTS BOOK DCM pages 5-8

**Action :**
- [ ] Analyser manuellement les pages de prix du PDF
- [ ] Créer tableau Excel avec tous les prix
- [ ] Compléter les fichiers YAML pour chaque marque

**Deadline :** 27 janvier matin

#### 3. Argumentaires de Base (5 marques prioritaires)
**Besoin :**
- Argumentaires complets pour : 33 Export ✅, Castel Beer, Mützig, Beaufort, Isenbeck
- Minimum 3 arguments généraux + 2 par canal (CHR, PSV)
- Minimum 3 objections avec réponses

**Action :**
- [ ] Extraire du PDF "Argumentaires marques FAP All Brand V2.pdf"
- [ ] Compléter avec connaissance terrain (interviews vendeurs si possible)
- [ ] Intégrer dans fichiers YAML

**Deadline :** 27 janvier après-midi

---

### HAUTE (Important MVP - À faire 27-28 Janvier)

#### 4. Segments Soft Drinks & Eaux
**Besoin :**
- Structure YAML pour TOP, World Cola, Youzou, Orangina, D'jino, Vimto
- Structure YAML pour Tangui, Vitale, Aquabelle
- Prix et formats de base

**Action :**
- [ ] Créer `/data/static/catalog/soft-drinks.yaml`
- [ ] Créer `/data/static/catalog/eaux.yaml`
- [ ] Extraire prix du PDF ELEMENTS BOOK DCM
- [ ] Ajouter descriptions et argumentaires de base

**Deadline :** 28 janvier matin

#### 5. Historique Marques (Top 5)
**Besoin :**
- Historique détaillé pour 33 Export ✅, Castel Beer, Mützig, TOP, Tangui
- Année de création, évolution, positionnement

**Action :**
- [ ] Rechercher informations en ligne (sites BDC, Castel, etc.)
- [ ] Demander à l'équipe Marketing BDC
- [ ] Rédiger 2-3 paragraphes par marque

**Deadline :** 28 janvier après-midi

---

### MOYENNE (Nice to have MVP - À faire 29-30 Janvier)

#### 6. Activations en Cours
**Besoin :**
- Liste des campagnes actives (Booster 33, etc.)
- Visuels PLV disponibles
- Mécaniques et périodes

**Action :**
- [ ] Demander à l'équipe Marketing/Trade BDC
- [ ] Créer structure dans BD dynamique
- [ ] Uploader visuels PLV

**Deadline :** 29 janvier

#### 7. Images Merchandising
**Besoin :**
- Photos bonnes pratiques (frigos, linéaires, activations)
- Planogrammes par type de PDV

**Action :**
- [ ] Récupérer photos existantes équipe Trade
- [ ] Si nécessaire : prendre photos sur le terrain
- [ ] Organiser dans `/assets/best-practices/`

**Deadline :** 30 janvier

---

### BASSE (V2 - Après MVP)

#### 8. Vins & Spiritueux
- Catalogue complet
- Prix et marges
- Argumentaires

#### 9. Merchandising Complet
- Planogrammes détaillés
- Règles de placement par canal
- Checklists PDV

#### 10. Outils Téléchargeables
- Packshots HD
- Templates réseaux sociaux
- Fiches PDF partageables

---

## 📋 Plan d'Action Détaillé (5 Jours)

### Jour 1 - 26 Janvier (AUJOURD'HUI)
**Focus : Images & Prix Bières**

**Matin :**
- [x] Extraction données PDF ELEMENTS BOOK DCM
- [x] Création structure YAML "33 Export"
- [ ] Contact équipe Marketing pour logos/packshots

**Après-midi :**
- [ ] Récupération assets visuels
- [ ] Organisation dossiers `/assets/`
- [ ] Extraction manuelle prix bières (pages 5-8 PDF)

**Soir :**
- [ ] Création tableau Excel prix complets
- [ ] Validation données prix

**Livrables :**
- Logos 12 marques bières
- Packshots 33 Export (4 formats minimum)
- Tableau Excel prix toutes bières

---

### Jour 2 - 27 Janvier
**Focus : Complétion Bières & Argumentaires**

**Matin :**
- [ ] Complétion fichiers YAML pour 5 marques prioritaires (Castel, Mützig, Beaufort, Isenbeck, Manyan)
- [ ] Intégration prix dans YAML
- [ ] Test chargement données

**Après-midi :**
- [ ] Extraction argumentaires PDF "Argumentaires marques FAP All Brand V2.pdf"
- [ ] Rédaction objections types (minimum 3 par marque)
- [ ] Intégration argumentaires dans YAML

**Soir :**
- [ ] Validation structure données bières
- [ ] Tests API consultation (si dev commencé)

**Livrables :**
- 5 marques bières complètes (prix, arguments, objections)
- Fichier `bieres.yaml` finalisé

---

### Jour 3 - 28 Janvier
**Focus : Soft Drinks & Eaux**

**Matin :**
- [ ] Création structure YAML soft drinks
- [ ] Extraction prix TOP, World Cola, Youzou, Orangina, D'jino, Vimto
- [ ] Intégration données de base

**Après-midi :**
- [ ] Création structure YAML eaux
- [ ] Extraction prix Tangui, Vitale, Aquabelle
- [ ] Rédaction historiques marques (Top 5)

**Soir :**
- [ ] Validation données soft drinks & eaux
- [ ] Tests chargement catalogue complet

**Livrables :**
- Fichiers `soft-drinks.yaml` et `eaux.yaml`
- Historiques 5 marques principales

---

### Jour 4 - 29 Janvier
**Focus : Activations & Merchandising**

**Matin :**
- [ ] Collecte informations activations en cours
- [ ] Récupération visuels PLV
- [ ] Création structure BD dynamique campagnes

**Après-midi :**
- [ ] Intégration activations dans système
- [ ] Upload visuels PLV
- [ ] Collecte photos merchandising

**Soir :**
- [ ] Organisation assets merchandising
- [ ] Tests affichage activations

**Livrables :**
- Activations en cours intégrées
- Photos merchandising organisées

---

### Jour 5 - 30 Janvier
**Focus : Validation & Polish**

**Matin :**
- [ ] Validation complète catalogue
- [ ] Tests recherche sur toutes les marques
- [ ] Vérification cohérence prix

**Après-midi :**
- [ ] Corrections dernières minutes
- [ ] Optimisation images (compression)
- [ ] Tests mode offline avec catalogue complet

**Soir :**
- [ ] Validation finale
- [ ] Préparation déploiement
- [ ] Documentation technique

**Livrables :**
- Catalogue MVP complet et validé
- Prêt pour intégration dans PWA

---

## 🎯 Objectifs de Complétion MVP

### Données Minimales Requises (Go/No-Go)

**Segment Bières (CRITIQUE) :**
- ✅ 12 marques identifiées
- ⏳ 5 marques complètes (33 Export, Castel, Mützig, Beaufort, Isenbeck)
- ⏳ Prix pour toutes les marques
- ⏳ Argumentaires pour 5 marques prioritaires
- ⏳ Objections types (3 minimum par marque)

**Segment Soft Drinks (IMPORTANT) :**
- ✅ 6 marques identifiées
- ⏳ Prix pour toutes les marques
- ⏳ Descriptions de base
- ⏳ 2 marques complètes (TOP, World Cola)

**Segment Eaux (IMPORTANT) :**
- ✅ 3 marques identifiées
- ⏳ Prix pour toutes les marques
- ⏳ Descriptions de base
- ⏳ 1 marque complète (Tangui)

**Assets Visuels (CRITIQUE) :**
- ⏳ Logos 15 marques minimum
- ⏳ Packshots 20 produits minimum
- ⏳ 5 photos merchandising

**Activations (IMPORTANT) :**
- ⏳ 2 campagnes actives minimum
- ⏳ Visuels PLV associés

---

## 📊 Métriques de Succès

### Complétude Catalogue MVP

**Cible Minimale (Go MVP) :**
- 60% des produits avec prix complets
- 40% des marques avec argumentaires
- 50% des marques avec images

**Cible Idéale (MVP Optimal) :**
- 80% des produits avec prix complets
- 60% des marques avec argumentaires
- 70% des marques avec images

**État Actuel (26 Janvier) :**
- ✅ 79 produits identifiés
- ✅ 1 marque complète (33 Export)
- ⏳ 0% images collectées
- **Complétude globale : ~15%**

**Objectif 31 Janvier :**
- **Complétude globale : 70%+ (MVP Optimal)**

---

## 🚨 Risques & Mitigations

### Risque 1 : Assets Visuels Non Disponibles
**Impact :** Élevé - Interface MVP moins attractive  
**Probabilité :** Moyenne  
**Mitigation :**
- Utiliser placeholders temporaires de qualité
- Photographier produits disponibles
- Créer logos simples si nécessaire

### Risque 2 : Données Prix Incomplètes
**Impact :** Critique - Fonctionnalité clé manquante  
**Probabilité :** Faible  
**Mitigation :**
- Extraction manuelle PDF garantie
- Validation avec équipe BDC
- Utiliser prix approximatifs si nécessaire (à valider)

### Risque 3 : Argumentaires Insuffisants
**Impact :** Moyen - Valeur MVP réduite  
**Probabilité :** Moyenne  
**Mitigation :**
- Prioriser 5 marques principales
- Rédiger arguments génériques si nécessaire
- Compléter en V2

### Risque 4 : Délai Trop Court
**Impact :** Élevé - MVP incomplet  
**Probabilité :** Moyenne  
**Mitigation :**
- Focus strict sur priorités CRITIQUE
- Accepter MVP à 70% si nécessaire
- Planifier complétion rapide post-MVP

---

## 📞 Contacts Clés

**Équipe BDC à Contacter :**
- **Marketing** : Assets visuels, historiques marques, activations
- **Trade** : Photos merchandising, planogrammes, bonnes pratiques
- **Commercial** : Validation prix, argumentaires terrain, objections courantes
- **IT** : Validation technique, accès systèmes

---

## 📁 Organisation Fichiers

```
/Users/macbook/Documents/SABC/lions_book/
├── data/
│   └── static/
│       └── catalog/
│           ├── bieres.yaml ✅
│           ├── soft-drinks.yaml ⏳
│           ├── eaux.yaml ⏳
│           └── alcools-mix.yaml ⏳
├── assets/
│   ├── brands/ ⏳
│   │   ├── 33-export-logo.png
│   │   ├── castel-beer-logo.png
│   │   └── ...
│   ├── packshots/ ⏳
│   │   ├── exp65c-hd.png
│   │   ├── exp50c-hd.png
│   │   └── ...
│   ├── products/ ⏳
│   ├── plv/ ⏳
│   └── best-practices/ ⏳
└── scripts/
    ├── extract_pdf_content.py ✅
    └── parse_elements_book.py ✅
```

---

## ✅ Checklist Finale MVP

### Données
- [ ] 79 produits avec codes et formats
- [ ] 60%+ produits avec prix complets
- [ ] 40%+ marques avec argumentaires
- [ ] 30+ objections types avec réponses
- [ ] 5+ historiques marques

### Assets
- [ ] 15+ logos marques
- [ ] 20+ packshots produits
- [ ] 5+ photos merchandising
- [ ] 2+ visuels PLV activations

### Structure
- [ ] Fichiers YAML validés
- [ ] API consultation fonctionnelle
- [ ] Mode offline testé
- [ ] Recherche opérationnelle

### Documentation
- [ ] Guide utilisation données
- [ ] Documentation API
- [ ] Process mise à jour contenu

---

**Document créé le : 2026-01-26**  
**Dernière mise à jour : 2026-01-26**  
**Version : 1.0 - Data Completion Action Plan**  
**Statut : EN COURS - Jour 1/5**
