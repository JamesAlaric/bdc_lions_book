# Lions' Book - Spécifications Techniques MVP
## Deadline : 31 Janvier 2026 (< 2 semaines)

---

## 🎯 Contraintes Critiques

### Timeline & Ressources
- **Deadline MVP** : 31 Janvier 2026
- **V2** : 2 mois après lancement MVP
- **Équipe** : 1 développeur + agents IA
- **Budget** : Pas de contraintes

### Utilisateurs Cibles
- **~500 vendeurs terrain** Boissons du Cameroun
- **Équipement** : Samsung Tab 6 (Android)
- **Répartition** : 70% zones urbaines, 30% zones rurales
- **Charge** : 500 consultations/jour en pic

---

## 🎨 Design & UX - Différenciateur Clé MVP

### Style Visuel
- **Approche** : Équilibre entre Folk design + Néo-minimalisme + Bento grid
  - **Folk design** : Chaleur, authenticité, connexion humaine
  - **Néo-minimalisme** : Clarté, épure, respiration
  - **Bento grid** : Organisation modulaire, hiérarchie visuelle
- **Objectif** : Interface ultra belle, moderne, intuitive avec âme
- **Inspiration** : Équilibre proportions, identité claire, parcours fluide
- **Anti-pattern** : Éviter rigidité visuelle, interfaces plates sans âme

### Charte Graphique BDC
**Couleurs Principales :**
- **Rouge BDC** : #ff7323f (PANTONE Red 032 C)
- **Jaune BDC** : #ffc627 (PANTONE 123 C)
- **Noir BDC** : #1d1d1b (PANTONE Black 7 C)
- **Gris tramé 70%** : RGB(115, 116, 116)

**Proportions :**
- 70% blanc
- 20% jaune
- 10% rouge

**Logo :**
- Version web : H 30-55mm
- Utilisation sur fond blanc uniquement
- Lion rouge dans capsule de bière

---

## 🏗️ Architecture Technique

### Mode Offline - Critique
**Stratégie :**
- Fonctionnement complet sans connexion
- Synchronisation quotidienne recommandée
- Alerte après 1 mois sans sync
- Cache sélectif par marque/catégorie + option globale

**Données Statiques (Passerelle - Pas de BD) :**
- Prix produits
- Marges
- Historique marques
- Argumentaires de base
- **Modification centralisée via fichier/config** (pas de stockage BD)

**Données Dynamiques (BD) :**
- Actualités
- Campagnes
- Événements
- Offres promotionnelles

### Authentification
**Accès Catalogue :**
- **Pas d'authentification** pour consultation
- Accès libre à tout le contenu pour tous les vendeurs

**Authentification Requise :**
- Édition de contenu (brand managers)
- Publication actualités/campagnes

### Gestion de Contenu
**Contenu Initial (Développeur) :**
- Toutes les marques du portefeuille BDC
- Prix et marges (via passerelle statique)
- Fiches produits complètes
- Argumentaires par canal (CHR, PSV, TT/MT)
- Gestion objections (minimum 5 par produit)
- Historique marques

**Contenu Dynamique (Brand Managers) :**
- Actualités marques
- Campagnes en cours
- Événements
- Offres promotionnelles
- **Publication immédiate** (pas de workflow validation)

---

## 📦 Fonctionnalités MVP

### 1. Catalogue Produits
**Contenu :**
- Toutes marques BDC (Bières, Soft, Eaux, Vins & Spiritueux)
- Prix inclus (via passerelle statique)
- Marges incluses (via passerelle statique)
- Historique marque (référence : lions_book.pdf)
- Fiches parfaitement agencées

**Sources de Données :**
- `assets/Elements book dcm.pdf` (Excel converti) pour prix/marges
- `assets/lions_book.pdf` pour historique et structure

### 2. Argumentaires de Vente
**Segmentation :**
- Par marque
- Par canal : CHR (Cafés/Hôtels/Restaurants), PSV (Point de Vente), TT (Traditional Trade), MT (Modern Trade)
- Arguments clés hiérarchisés

### 3. Gestion des Objections
**Couverture :**
- Minimum 5 objections types par produit/marque
- Objections principales : "Trop cher", "Ça ne tourne pas chez moi", + 3 autres
- Réponses définies par Marketing/Vendeurs expérimentés (à préciser)
- Évolution selon feedback terrain

### 4. Recherche Instantanée
**Fonctionnalités :**
- Recherche par produit, marque, catégorie, mot-clé
- **Filtres** : par canal, type de client, gamme de prix
- **Suggestions** : recherche prédictive
- **Historique** de recherche
- **Favoris** pour accès rapide ⭐

### 5. Mode Offline Robuste
**Implémentation :**
- Fonctionnement complet sans connexion
- Sync quotidienne recommandée
- Alerte après 1 mois sans sync
- Horodatage visible
- Cache intelligent (sélectif + global)

### 6. Activations & Promotions
**Contenu :**
- Campagnes en cours
- Visuels : Photos, rendus 3D (limité), plans techniques
- Galerie d'exemples d'activations réussies
- Support visuel pour négociation

**Gestion Visuels :**
- Affichage photo simple (optimisation offline)
- Pas de personnalisation vendeur (V2)

### 7. Interface Admin Brand Managers
**Fonctionnalités :**
- Modification section marque uniquement
- Upload images/visuels
- **Publication immédiate** (pas de validation)
- Workflow simple et clair

### 8. Système de Notifications
**Types :**
- Badge "nouveau" pour mises à jour
- **Notifications push** pour campagnes urgentes
- **Rappels** si pas de sync depuis X jours
- Pas d'alertes email

---

## 📊 Métriques & Analytics

### Métriques MVP
**Adoption :**
- Objectif : 80%+ utilisation quotidienne à 1 mois
- 500 consultations/jour en pic
- Taux rétention 90%+ après 1 mois

**Impact :**
- Réduction temps formation : 12h → 6h (50%)
- Nouveaux vendeurs autonomes 2x plus vite
- Baseline conversion : 10% → amélioration progressive

**Analytics V1 (Basique) :**
- Nombre total de consultations
- Pages les plus consultées
- Pas de tracking individuel par vendeur (V2)

**Analytics V2 (Avancé) :**
- Tracking par vendeur
- Analytics détaillés par brand manager
- Données terrain remontées aux managers

---

## 🔧 Spécifications Techniques Détaillées

### Plateforme
- **Type** : Progressive Web App (PWA)
- **OS Cible** : Android (Samsung Tab 6)
- **Déploiement** : Pas de store, installation directe

### Performance
- **Temps de recherche** : < 2 secondes
- **Temps de chargement page** : < 2 secondes
- **Taux de synchronisation** : > 95%

### Données Statiques (Passerelle)
**Approche Recommandée :**
- Fichiers JSON/YAML centralisés
- Chargés au build ou via CDN
- Modification = redéploiement ou rechargement config
- Pas de fetch BD constant
- Administrateur désigné peut modifier via interface dédiée

**Avantages :**
- Performance optimale
- Simplicité maintenance
- Pas de charge BD pour données rarement modifiées

### Données Dynamiques (BD)
- Actualités
- Campagnes
- Événements
- Promotions
- Sync quotidienne

---

## 🎯 Priorités Développement

### Phase 1 : Foundation (Semaine 1)
1. **Architecture PWA** + mode offline
2. **Design system** BDC (couleurs, composants bento grid)
3. **Structure données** statiques (passerelle)
4. **Catalogue produits** (toutes marques)

### Phase 2 : Core Features (Semaine 1-2)
5. **Recherche** + filtres + favoris
6. **Argumentaires** par canal
7. **Gestion objections**
8. **Activations/promotions**

### Phase 3 : Admin & Polish (Semaine 2)
9. **Interface admin** brand managers
10. **Notifications** push
11. **Polish UX/UI** (différenciateur clé)
12. **Tests** + optimisations

---

## 📚 Sources de Données

### Documents de Référence
1. **`assets/Elements book dcm.pdf`** (Excel converti)
   - Prix produits
   - Marges
   - Structure catalogue

2. **`assets/lions_book.pdf`**
   - Historique marques
   - Structure argumentaires
   - Contenu détaillé

3. **`assets/Argumentaires marques FAP All Brand V2-1.pdf`**
   - Argumentaires par marque
   - À analyser pour structure

### Charte Graphique
- Images fournies : couleurs, logo, proportions
- Logo sur fond blanc uniquement
- Versions web : H 30-55mm

---

## 🚀 Prochaines Étapes Immédiates

### 1. Analyse Documents Sources
- Extraire structure de `Elements book dcm.pdf`
- Analyser `lions_book.pdf` pour contenu
- Parser `Argumentaires marques FAP All Brand V2-1.pdf`

### 2. Setup Projet
- Initialiser PWA (React/Next.js recommandé)
- Setup design system BDC
- Architecture offline-first

### 3. Création Contenu Initial
- Structurer données statiques (JSON/YAML)
- Créer passerelle de chargement
- Alimenter catalogue complet

### 4. Développement MVP
- Suivre priorités phases 1-3
- Focus UX/UI exceptionnelle
- Tests continus sur Samsung Tab 6

---

## ⚠️ Risques & Mitigations

### Risque 1 : Timeline Serrée (< 2 semaines)
**Mitigation :**
- Focus absolu sur MVP core features
- Utiliser agents IA pour accélérer
- Design system réutilisable
- Pas de scope creep

### Risque 2 : Volume Données Offline
**Mitigation :**
- Optimisation images/visuels
- Cache intelligent sélectif
- Compression assets
- Lazy loading

### Risque 3 : UX Exceptionnelle = Temps
**Mitigation :**
- Design system dès le départ
- Composants réutilisables
- Inspiration benchmarks existants
- Itérations rapides

---

## 📝 Notes Importantes

- **Pas de cloisonnement par équipe** dans MVP
- **Managers ne voient pas qui utilise l'app** (V2)
- **Catalogue accessible sans auth** = simplicité adoption
- **Publication immédiate** = agilité campagnes
- **Contenu statique via passerelle** = performance + simplicité
- **MVP visuellement abouti** = différenciateur clé adoption

---

**Document créé le : 2026-01-22**  
**Dernière mise à jour : 2026-01-22**  
**Version : 1.0 - MVP Specifications**
