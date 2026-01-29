# Design Thinking - Validation UX Lions' Book

**Author:** Jay  
**Date:** 2026-01-28  
**Objectif:** Valider les wireframes/mockups existants et identifier les optimisations

---

## 🎯 Défi Design

**Challenge Statement:**
> Comment s'assurer que l'interface Lions' Book permet aux vendeurs terrain (Marcel, Aminata, Éric) de trouver l'information produit en moins de 5 secondes pendant une négociation client, même dans des conditions terrain difficiles (soleil, connexion instable, stress) ?

**Contexte:**
- UX Design complété avec wireframes/mockups
- 3 personas principaux : Marcel (expérimenté), Aminata (nouvelle), Éric (rural)
- Device cible : Samsung Tab 6 (768x1024px portrait, 1024x768px paysage)
- Contraintes : Offline-first, conditions terrain variables, urgence commerciale

**Documents UX existants à valider:**
1. UX Design Specification (73KB)
2. Wireframes structurels
3. Mockups visuels détaillés
4. Guide Excalidraw

---

## 📱 Parcours Critiques à Valider

### **Parcours 1: Recherche Produit Rapide (< 5 sec)**
**Scénario:** Marcel est face au client, besoin urgent du prix 33 Export 65cl

**Flow actuel:**
```
Home → Recherche "33" → Suggestions → Tap "33 Export" → Fiche produit
OU
Home → Tap "Bières" → Catalogue → Tap "33 Export" → Fiche produit
```

**Hypothèses UX à tester:**
- ✓ La recherche glassmorphisme jaune est visible en plein soleil
- ✓ Les suggestions apparaissent en < 2 secondes
- ✓ Le tap sur suggestion mène directement à la fiche
- ✓ L'information prix est visible sans scroll

**Points de friction potentiels:**
- ⚠️ Recherche vs Navigation par segment : lequel est plus rapide ?
- ⚠️ Glassmorphisme jaune : lisible en plein soleil ?
- ⚠️ Suggestions : assez grandes pour tap rapide avec doigts ?
- ⚠️ Fiche produit : info prix visible immédiatement ou besoin scroll ?

---

### **Parcours 2: Gestion Objection Client**
**Scénario:** Client dit "Prix trop élevé" - Aminata doit répondre rapidement

**Flow actuel:**
```
Fiche produit → Bouton "Gérer Objections" → Modal center → Accordéon objections → Script réponse
OU
Home → Accès Rapide "Répondre à Objection" → Liste objections → Script
```

**Hypothèses UX à tester:**
- ✓ Le bouton "Gérer Objections" est visible et accessible
- ✓ Le modal s'ouvre rapidement (< 300ms)
- ✓ Les objections courantes sont en haut de liste
- ✓ Le script est lisible et mémorisable rapidement

**Points de friction potentiels:**
- ⚠️ Modal center vs bottom sheet : lequel est plus rapide d'accès ?
- ⚠️ Accordéon : nécessite trop de taps pour voir le script ?
- ⚠️ Scripts trop longs : difficile à lire rapidement ?
- ⚠️ Pas de raccourci direct depuis fiche produit ?

---

### **Parcours 3: Découverte Campagne/Promo**
**Scénario:** Éric consulte l'app le matin pour voir les nouvelles promos

**Flow actuel:**
```
Home → Carousel Actualités (swipe horizontal) → Tap slide → Détail campagne
OU
Home → Accès Rapide "Promos" → Liste promotions
```

**Hypothèses UX à tester:**
- ✓ Le carousel est visible et attractif
- ✓ Les dots indicators montrent clairement le nombre de slides
- ✓ Le swipe est fluide et intuitif
- ✓ Le détail campagne contient toute l'info nécessaire

**Points de friction potentiels:**
- ⚠️ Carousel auto-play : distrayant ou utile ?
- ⚠️ Trop de slides : utilisateur ne voit pas tout ?
- ⚠️ Détail campagne : manque argumentaire vendeur ?
- ⚠️ Pas de notification pour nouvelles campagnes urgentes ?

---

### **Parcours 4: Accès Rapide Fonctionnalités**
**Scénario:** Marcel veut vérifier un prix rapidement

**Flow actuel:**
```
Home → Accès Rapide (grille 3x2 colorée) → Tap "Vérifier un Prix" → Page prix
```

**Hypothèses UX à tester:**
- ✓ La grille 3x2 est claire et organisée logiquement
- ✓ Les couleurs aident à identifier rapidement chaque fonction
- ✓ Les labels sont courts et compréhensibles
- ✓ Le tap mène directement à la bonne page

**Points de friction potentiels:**
- ⚠️ Grille 3x2 : trop de choix, paralysie décisionnelle ?
- ⚠️ Couleurs : signification claire ou arbitraire ?
- ⚠️ Ordre des boutons : logique métier ou alphabétique ?
- ⚠️ Illustration "Répondre à Objection" : aide ou distraction ?

---

### **Parcours 5: Navigation Segments Produits**
**Scénario:** Aminata cherche un produit dans la catégorie Bières

**Flow actuel:**
```
Home → Portefeuille BDC "Bières" → Catalogue Bières → Filtres → Tap produit → Fiche
```

**Hypothèses UX à tester:**
- ✓ Les segments sont clairement identifiables (emojis + labels)
- ✓ Le catalogue affiche les produits de manière claire
- ✓ Les filtres (Premium, Économique) sont utiles
- ✓ La fiche produit contient toute l'info nécessaire

**Points de friction potentiels:**
- ⚠️ Trop de produits dans catalogue : scroll infini ?
- ⚠️ Filtres : vraiment utilisés ou ignorés ?
- ⚠️ Bento Grid 2 colonnes : trop petit sur tablette ?
- ⚠️ Pas de tri par popularité/marge/rotation ?

---

## 🔍 Hypothèses UX Critiques à Valider

### **Hypothèse 1: Glassmorphisme Jaune**
**Assertion:** Le glassmorphisme jaune BDC (bg-yellow/70, blur 12px) est lisible en plein soleil

**Test:**
- Afficher mockup sur Samsung Tab 6 en extérieur plein soleil
- Demander à Marcel/Aminata/Éric de lire le texte dans la barre de recherche
- Mesurer le temps de lecture et le taux d'erreur

**Critère de succès:**
- ✅ Lisible en < 2 secondes
- ✅ Taux d'erreur < 10%
- ✅ Pas de plainte sur la visibilité

**Plan B si échec:**
- Augmenter l'opacité à 85-90%
- Réduire le blur à 8px
- Ajouter un border plus visible

---

### **Hypothèse 2: Carousel Instagram-Style**
**Assertion:** Le carousel actualités avec swipe horizontal est intuitif et engageant

**Test:**
- Montrer le carousel à 5-7 vendeurs
- Observer s'ils swipent naturellement
- Mesurer le nombre de slides consultées
- Demander s'ils ont compris qu'il y avait plusieurs slides

**Critère de succès:**
- ✅ 80%+ des utilisateurs swipent sans instruction
- ✅ Consultent au moins 2-3 slides
- ✅ Comprennent les dots indicators

**Plan B si échec:**
- Ajouter flèches ← → visibles
- Augmenter la taille des dots
- Ajouter texte "Swipez pour voir plus"

---

### **Hypothèse 3: Grille 3x2 Accès Rapide**
**Assertion:** La grille 3x2 colorée permet d'identifier rapidement la fonction souhaitée

**Test:**
- Donner une tâche : "Trouvez comment vérifier un prix"
- Mesurer le temps de réponse
- Observer les hésitations
- Demander si les couleurs aident

**Critère de succès:**
- ✅ Temps moyen < 3 secondes
- ✅ Taux de succès > 90%
- ✅ Pas d'hésitation visible

**Plan B si échec:**
- Réorganiser l'ordre des boutons (priorité métier)
- Ajouter icônes plus explicites
- Réduire à 4 boutons principaux (2x2)

---

### **Hypothèse 4: Carousel Produit Nike-Style**
**Assertion:** Le carousel avec effet profondeur (blur progressif) aide à visualiser les formats disponibles

**Test:**
- Montrer fiche produit 33 Export avec carousel
- Observer si utilisateurs swipent pour voir autres formats
- Demander s'ils comprennent que les items floutés sont swipables
- Mesurer le temps pour trouver le format 33cl

**Critère de succès:**
- ✅ 80%+ swipent pour voir autres formats
- ✅ Comprennent l'effet de profondeur
- ✅ Trouvent le format en < 5 secondes

**Plan B si échec:**
- Ajouter flèches ← → plus visibles
- Réduire le blur des items ±1 (de 4px à 2px)
- Ajouter labels "Swipez pour voir tous les formats"

---

### **Hypothèse 5: Modal Objections Center Dialog**
**Assertion:** Le modal center avec accordéon permet de trouver rapidement la bonne objection et le script

**Test:**
- Donner scénario : "Client dit prix trop élevé"
- Mesurer temps pour trouver et lire le script
- Observer les difficultés
- Demander si le script est clair et mémorisable

**Critère de succès:**
- ✅ Temps moyen < 10 secondes
- ✅ Script compris et mémorisable
- ✅ Pas de frustration visible

**Plan B si échec:**
- Changer pour bottom sheet (plus rapide d'accès)
- Pré-ouvrir l'objection la plus courante
- Raccourcir les scripts (max 2-3 phrases)
- Ajouter bouton "Copier script" pour partage

---

## 🚨 Points de Friction Identifiés (Analyse Heuristique)

### **Friction 1: Recherche vs Navigation**
**Problème:** Deux chemins pour accéder à un produit (recherche ou navigation par segment)

**Impact:** Confusion possible, surtout pour Aminata (nouvelle)

**Recommandation:**
- Ajouter onboarding rapide (3 écrans) expliquant les deux méthodes
- Tracker l'usage pour voir quelle méthode est préférée
- Optimiser la méthode la plus utilisée

---

### **Friction 2: Trop d'Options Accès Rapide**
**Problème:** 6 boutons dans la grille 3x2 = choix cognitif élevé

**Impact:** Paralysie décisionnelle, temps de réponse augmenté

**Recommandation:**
- Réduire à 4 boutons principaux (2x2)
- Déplacer "Assets" et "Promos" dans la sidebar
- Prioriser : Prix, Fiches, Arguments, Objections

---

### **Friction 3: Glassmorphisme Lisibilité**
**Problème:** Opacité 70% peut être difficile à lire en plein soleil

**Impact:** Frustration, erreurs de lecture, temps perdu

**Recommandation:**
- Tester en conditions réelles (soleil, ombre, intérieur)
- Augmenter opacité à 85% si besoin
- Ajouter mode "Contraste élevé" dans paramètres

---

### **Friction 4: Carousel Auto-Play**
**Problème:** Auto-play peut distraire pendant une négociation

**Impact:** Perte de focus, frustration

**Recommandation:**
- Désactiver auto-play par défaut
- Activer uniquement si utilisateur swipe manuellement
- Ajouter option dans paramètres

---

### **Friction 5: Modal Objections Accordéon**
**Problème:** Accordéon nécessite 2 taps (ouvrir modal + ouvrir accordéon)

**Impact:** Temps perdu, frustration en situation urgente

**Recommandation:**
- Pré-ouvrir la première objection (la plus courante)
- Ou changer pour liste simple sans accordéon
- Ou utiliser bottom sheet avec scroll rapide

---

### **Friction 6: Fiche Produit Scroll**
**Problème:** Info prix peut nécessiter scroll si glassmorphisme box trop haute

**Impact:** Temps perdu, frustration

**Recommandation:**
- Garantir que prix est visible sans scroll (above the fold)
- Réduire hauteur glassmorphisme box si nécessaire
- Tester sur device réel Samsung Tab 6

---

### **Friction 7: Pas de Favoris Rapides**
**Problème:** Pas d'accès rapide aux produits les plus consultés

**Impact:** Temps perdu à rechercher les mêmes produits

**Recommandation:**
- Ajouter section "Récemment consultés" dans Home
- Ajouter bouton ⭐ pour favoris dans fiche produit
- Afficher favoris en haut du catalogue

---

### **Friction 8: Carousel Produit Flou**
**Problème:** Items ±1 avec blur 4px peuvent sembler "cassés" ou "en erreur"

**Impact:** Confusion, perception de bug

**Recommandation:**
- Réduire blur à 2px pour items ±1
- Ajouter animation smooth lors du swipe
- Tester avec utilisateurs réels

---

## 📋 Plan de Test Utilisateur

### **Objectif:**
Valider les wireframes/mockups avec 5-7 vendeurs terrain (mix Marcel/Aminata/Éric)

### **Méthodologie:**
- Tests utilisateurs modérés (1h par personne)
- Prototypes interactifs (Figma ou device réel)
- Observation + Think Aloud
- Questionnaire post-test

---

### **Participants Cibles:**

**Profil Marcel (2 personnes):**
- Vendeur expérimenté (5+ ans)
- Utilise smartphone quotidiennement
- Connaît bien le catalogue produits
- Zone urbaine (Douala/Yaoundé)

**Profil Aminata (2 personnes):**
- Vendeur nouveau (< 1 an)
- Utilisation basique smartphone
- Découvre encore le catalogue
- Zone urbaine

**Profil Éric (1-2 personnes):**
- Vendeur rural
- Connexion instable
- Utilisation occasionnelle smartphone
- Zone rurale

---

### **Scénarios de Test:**

**Scénario 1: Recherche Rapide (Tous profils)**
- "Vous êtes face à un client qui demande le prix du 33 Export 65cl. Trouvez cette information le plus rapidement possible."
- Mesurer : Temps, nombre de taps, hésitations, succès

**Scénario 2: Gestion Objection (Aminata)**
- "Le client dit que le prix est trop élevé. Trouvez comment répondre à cette objection."
- Mesurer : Temps, compréhension du script, mémorisation

**Scénario 3: Découverte Campagne (Éric)**
- "Consultez les nouvelles promotions disponibles ce mois-ci."
- Mesurer : Utilisation carousel, compréhension, engagement

**Scénario 4: Navigation Catalogue (Marcel)**
- "Trouvez toutes les bières premium disponibles."
- Mesurer : Utilisation filtres, compréhension segments, efficacité

**Scénario 5: Accès Rapide (Tous profils)**
- "Vous voulez vérifier rapidement un prix. Comment faites-vous ?"
- Mesurer : Choix entre recherche/navigation/accès rapide, justification

---

### **Métriques de Succès:**

**Quantitatives:**
- ✅ Temps moyen recherche produit : < 5 secondes
- ✅ Taux de succès parcours critiques : > 90%
- ✅ Nombre de taps moyen : < 3 pour parcours simple
- ✅ Taux d'erreur : < 10%

**Qualitatives:**
- ✅ Satisfaction utilisateur : > 4/5
- ✅ Facilité d'utilisation perçue : > 4/5
- ✅ Intention d'utilisation : > 4/5
- ✅ Pas de frustration majeure exprimée

---

### **Questions Post-Test:**

**Satisfaction:**
1. Sur une échelle de 1 à 5, comment évaluez-vous la facilité d'utilisation ?
2. Qu'avez-vous trouvé le plus facile ?
3. Qu'avez-vous trouvé le plus difficile ?

**Compréhension:**
4. Les couleurs de l'Accès Rapide vous ont-elles aidé ?
5. Avez-vous compris comment utiliser le carousel actualités ?
6. Le carousel produit avec effet profondeur était-il clair ?

**Utilité:**
7. Quelles fonctionnalités utiliseriez-vous le plus souvent ?
8. Quelles fonctionnalités manquent selon vous ?
9. Recommanderiez-vous cette app à vos collègues ?

**Contexte Terrain:**
10. Pensez-vous pouvoir utiliser cette app en plein soleil ?
11. Pensez-vous pouvoir utiliser cette app pendant une négociation ?
12. Pensez-vous pouvoir utiliser cette app en zone rurale (offline) ?

---

## 🎨 Optimisations Recommandées

### **Optimisation 1: Accès Rapide Simplifié**
**Problème:** 6 boutons = trop de choix

**Solution:**
- Réduire à 4 boutons principaux (2x2)
- Boutons : Prix, Fiches, Arguments, Objections
- Déplacer "Promos" et "Assets" dans sidebar

**Impact attendu:**
- ⬆️ Vitesse de décision (+30%)
- ⬆️ Satisfaction utilisateur
- ⬇️ Charge cognitive

---

### **Optimisation 2: Glassmorphisme Adaptatif**
**Problème:** Lisibilité variable selon conditions lumineuses

**Solution:**
- Détecter luminosité ambiante (API device)
- Ajuster automatiquement opacité :
  - Plein soleil : 90% opacité, blur 8px
  - Intérieur : 70% opacité, blur 12px
  - Nuit : 60% opacité, blur 16px

**Impact attendu:**
- ⬆️ Lisibilité en toutes conditions
- ⬆️ Satisfaction utilisateur
- ⬇️ Fatigue visuelle

---

### **Optimisation 3: Modal Objections Bottom Sheet**
**Problème:** Modal center + accordéon = 2 taps

**Solution:**
- Changer pour bottom sheet
- Pré-ouvrir objection la plus courante
- Liste simple sans accordéon
- Bouton "Copier script" pour partage

**Impact attendu:**
- ⬇️ Temps d'accès (-50%)
- ⬆️ Efficacité en situation urgente
- ⬆️ Utilisation fonctionnalité

---

### **Optimisation 4: Favoris & Récents**
**Problème:** Pas d'accès rapide aux produits fréquents

**Solution:**
- Ajouter section "Récemment consultés" (3-5 produits) dans Home
- Bouton ⭐ dans fiche produit pour favoris
- Section "Favoris" en haut du catalogue

**Impact attendu:**
- ⬇️ Temps recherche produits fréquents (-70%)
- ⬆️ Efficacité vendeurs expérimentés
- ⬆️ Satisfaction utilisateur

---

### **Optimisation 5: Carousel Produit Simplifié**
**Problème:** Effet profondeur peut sembler "cassé"

**Solution:**
- Réduire blur items ±1 : de 4px à 2px
- Ajouter flèches ← → plus visibles
- Animation smooth lors du swipe
- Label "Swipez pour voir tous les formats"

**Impact attendu:**
- ⬆️ Compréhension interaction
- ⬇️ Perception de bug
- ⬆️ Utilisation fonctionnalité

---

### **Optimisation 6: Carousel Actualités Manuel**
**Problème:** Auto-play distrayant

**Solution:**
- Désactiver auto-play par défaut
- Activer uniquement après premier swipe manuel
- Option dans paramètres pour activer/désactiver

**Impact attendu:**
- ⬇️ Distraction pendant négociation
- ⬆️ Contrôle utilisateur
- ⬆️ Satisfaction

---

### **Optimisation 7: Mode Contraste Élevé**
**Problème:** Accessibilité variable

**Solution:**
- Ajouter toggle "Mode Contraste Élevé" dans paramètres
- Désactiver glassmorphisme
- Augmenter contraste texte/fond
- Bordures plus visibles

**Impact attendu:**
- ⬆️ Accessibilité
- ⬆️ Lisibilité conditions extrêmes
- ⬆️ Inclusion utilisateurs malvoyants

---

### **Optimisation 8: Onboarding Rapide**
**Problème:** Pas d'explication des fonctionnalités clés

**Solution:**
- 3 écrans onboarding au premier lancement :
  1. "Recherchez ou naviguez par segment"
  2. "Accès rapide aux fonctionnalités essentielles"
  3. "Swipez pour découvrir les actualités"
- Skip possible
- Réaffichable depuis paramètres

**Impact attendu:**
- ⬆️ Compréhension fonctionnalités
- ⬇️ Courbe d'apprentissage
- ⬆️ Adoption app

---

## 📊 Prochaines Étapes

### **Étape 1: Créer Prototypes Interactifs**
- Figma ou Framer pour prototypes haute fidélité
- Intégrer les optimisations recommandées
- Préparer 2 versions : actuelle vs optimisée

### **Étape 2: Recruter Participants**
- 5-7 vendeurs BDC (mix profils Marcel/Aminata/Éric)
- Coordonner avec équipe BDC pour disponibilités
- Préparer incentives (compensation temps)

### **Étape 3: Conduire Tests Utilisateurs**
- Sessions 1h par personne
- Observation + Think Aloud
- Enregistrer écran + audio (avec consentement)
- Questionnaire post-test

### **Étape 4: Analyser Résultats**
- Synthétiser insights par parcours
- Identifier patterns communs
- Prioriser optimisations par impact/effort

### **Étape 5: Itérer Design**
- Implémenter optimisations prioritaires
- Mettre à jour wireframes/mockups
- Préparer pour développement

### **Étape 6: Valider avec Stakeholders**
- Présenter insights et optimisations
- Obtenir validation équipe BDC
- Aligner sur priorités MVP

---

## ✅ Critères de Validation Finale

**L'UX est validée si :**
- ✅ Temps moyen recherche produit : < 5 secondes (90%+ utilisateurs)
- ✅ Taux de succès parcours critiques : > 90%
- ✅ Satisfaction utilisateur : > 4/5
- ✅ Facilité d'utilisation perçue : > 4/5
- ✅ Intention d'utilisation quotidienne : > 80%
- ✅ Pas de friction majeure identifiée
- ✅ Lisibilité confirmée en conditions terrain (soleil, ombre)
- ✅ Utilisable en situation de stress (négociation)

---

**Document créé le:** 2026-01-28  
**Prochaine action:** Créer prototypes interactifs et recruter participants pour tests
