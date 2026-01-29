---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories']
inputDocuments:
  - /Users/macbook/Documents/SABC/lions_book/_bmad-output/planning-artifacts/prd.md
  - /Users/macbook/Documents/SABC/lions_book/_bmad-output/planning-artifacts/architecture.md
  - /Users/macbook/Documents/SABC/lions_book/_bmad-output/planning-artifacts/ux-design-specification.md
---

# lions_book - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for lions_book, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**FR1**: Vendeurs peuvent consulter le catalogue complet des produits BDC (Bières, Soft, Eaux, Vins & Spiritueux)
**FR2**: Vendeurs peuvent voir les prix produits et marges pour chaque produit
**FR3**: Vendeurs peuvent consulter l'historique et le positionnement de chaque marque
**FR4**: Vendeurs peuvent accéder aux fiches produits avec informations agencées par priorité visuelle
**FR5**: Vendeurs peuvent filtrer les produits par catégorie (Bières, Soft, Eaux, etc.)
**FR6**: Vendeurs peuvent filtrer les produits par marque
**FR7**: Vendeurs peuvent rechercher un produit par nom
**FR8**: Vendeurs peuvent rechercher un produit par marque
**FR9**: Vendeurs peuvent rechercher un produit par catégorie
**FR10**: Vendeurs peuvent rechercher un produit par mot-clé
**FR11**: Vendeurs peuvent voir des suggestions de recherche pendant la saisie
**FR12**: Vendeurs peuvent consulter leur historique de recherche
**FR13**: Vendeurs peuvent marquer des produits en favoris pour accès rapide
**FR14**: Vendeurs peuvent accéder à leurs favoris depuis un raccourci dédié
**FR15**: Vendeurs peuvent filtrer les résultats par canal de vente (CHR, PSV, TT, MT)
**FR16**: Vendeurs peuvent filtrer les résultats par type de client
**FR17**: Vendeurs peuvent filtrer les résultats par gamme de prix
**FR18**: Vendeurs peuvent consulter les argumentaires de vente structurés par marque
**FR19**: Vendeurs peuvent voir les arguments clés hiérarchisés par priorité pour chaque marque
**FR20**: Vendeurs peuvent adapter les argumentaires marques selon le contexte client
**FR21**: Vendeurs peuvent consulter les objections basées sur le recueil d'arguments BDC
**FR22**: Vendeurs peuvent accéder aux réponses types pour l'objection "Trop cher"
**FR23**: Vendeurs peuvent accéder aux réponses types pour l'objection "Ça ne tourne pas chez moi"
**FR24**: Vendeurs peuvent consulter les objections variables selon canal (CHR, Traditional Trade) et type produit (bières, soft drinks)
**FR25**: Vendeurs peuvent voir des scripts de réponse avec exemples concrets définis par vendeurs expérimentés
**FR26**: Vendeurs peuvent consulter les campagnes promotionnelles en cours
**FR27**: Vendeurs peuvent voir les visuels de décorations marque disponibles
**FR28**: Vendeurs peuvent télécharger les visuels d'activations à la demande pour utilisation offline
**FR29**: Vendeurs peuvent consulter des photos d'activations réussies
**FR30**: Vendeurs peuvent accéder aux plans techniques des activations
**FR31**: Vendeurs peuvent voir des rendus 3D des activations (limité)
**FR32**: Vendeurs peuvent consulter les actualités et événements BDC
**FR33**: Vendeurs peuvent voir les offres promotionnelles actives
**FR34**: Vendeurs peuvent voir que les activations sont gratuites pour les détaillants
**FR35**: Vendeurs peuvent utiliser toutes les fonctionnalités de l'app sans connexion internet
**FR36**: Vendeurs peuvent voir l'horodatage de la dernière synchronisation
**FR37**: Vendeurs peuvent déclencher une synchronisation manuelle
**FR38**: Système synchronise automatiquement au démarrage si connexion disponible
**FR39**: Système synchronise automatiquement en arrière-plan quand connexion détectée
**FR40**: Vendeurs reçoivent une alerte si aucune synchronisation depuis 1 mois
**FR41**: Vendeurs peuvent choisir de synchroniser sélectivement par marque/catégorie
**FR42**: Vendeurs peuvent choisir de synchroniser l'intégralité du catalogue
**FR43**: Vendeurs peuvent voir un indicateur de statut connexion (online/offline)
**FR44**: Vendeurs peuvent voir un badge "nouveau" sur le contenu récemment mis à jour
**FR45**: Vendeurs reçoivent des notifications push pour les campagnes urgentes (toutes les campagnes sont urgentes)
**FR46**: Vendeurs reçoivent des rappels s'ils n'ont pas synchronisé depuis X jours
**FR47**: Vendeurs peuvent voir clairement les sections récemment modifiées
**FR48**: Vendeurs peuvent activer/désactiver les notifications dans les paramètres
**FR49**: Brand managers peuvent se connecter à l'interface admin avec authentification sécurisée
**FR50**: Brand managers peuvent modifier uniquement leur section marque (permissions par marque)
**FR51**: Brand managers peuvent uploader des images et visuels pour activations
**FR52**: Brand managers peuvent publier du contenu immédiatement sans workflow de validation
**FR53**: Brand managers peuvent gérer les actualités de leur marque
**FR54**: Brand managers peuvent gérer les campagnes de leur marque
**FR55**: Brand managers peuvent gérer les événements de leur marque
**FR56**: Brand managers peuvent gérer les offres promotionnelles de leur marque
**FR57**: Brand managers peuvent prévisualiser le rendu mobile avant publication
**FR58**: Brand managers peuvent voir la date de dernière modification de leur contenu
**FR59**: Vendeurs peuvent installer l'app sur l'écran d'accueil de leur tablette
**FR60**: Vendeurs peuvent lancer l'app en mode fullscreen sans barre d'adresse
**FR61**: Vendeurs voient un splash screen aux couleurs BDC au lancement
**FR62**: Vendeurs sont notifiés quand une nouvelle version de l'app est disponible
**FR63**: Vendeurs peuvent choisir de recharger l'app pour mettre à jour
**FR64**: Vendeurs peuvent voir le numéro de version dans les paramètres
**FR65**: Vendeurs peuvent consulter le changelog des versions
**FR66**: Vendeurs peuvent accéder aux paramètres de l'application
**FR67**: Vendeurs peuvent voir les informations de leur compte (si authentification future)
**FR68**: Vendeurs peuvent gérer leurs préférences de notifications
**FR69**: Vendeurs peuvent voir l'espace de stockage utilisé par le cache offline et par les médias
**FR70**: Vendeurs peuvent configurer l'auto-téléchargement des médias (uniquement WiFi, WiFi + données mobiles, jamais)
**FR71**: Vendeurs peuvent définir une limite maximale de cache pour les médias
**FR72**: Vendeurs peuvent vider le cache global ou par catégorie (visuels activations, photos produits, etc.)
**FR73**: Vendeurs peuvent voir la taille de chaque catégorie de médias en cache

### NonFunctional Requirements

**NFR-P1**: Temps de Réponse Recherche - La recherche doit retourner des résultats en < 5 secondes pour 90% des requêtes et < 10 secondes pour 99% des requêtes
**NFR-P2**: Temps de Chargement Initial - First Contentful Paint < 1.5s, Largest Contentful Paint < 2.5s, Time to Interactive < 3s
**NFR-P3**: Performance Navigation - Transition entre pages < 300ms, Scroll performance 60 FPS constant
**NFR-P4**: Performance Offline - Performance offline identique à performance online, temps de chargement offline < 2s, recherche offline < 5s
**NFR-P5**: Temps de Synchronisation - Synchronisation catalogue complet < 30s, synchronisation incrémentale < 10s
**NFR-P6**: Performance Réseau Dégradé - Fonctionnement utilisable sur 2G, optimal sur 3G+, timeout réseau 15s avant fallback offline
**NFR-P7**: Taille Bundle & Assets - Bundle JavaScript initial < 500 KB (gzipped), taille totale assets < 5 MB, images produits < 200 KB
**NFR-P8**: Gestion Médias Style Telegram - Téléchargement à la demande avec indicateur progression, compression intelligente, cache médias configurable (défaut 500 MB), purge automatique si limite atteinte
**NFR-R1**: Disponibilité Offline - L'application doit fonctionner 100% offline pour toutes les fonctionnalités core
**NFR-R2**: Taux de Succès Synchronisation - Taux de succès > 95%, retry automatique 3 tentatives avec backoff exponentiel
**NFR-R3**: Gestion Conflits Synchronisation - Stratégie Last-Write-Wins (données serveur prioritaires), aucune perte de données utilisateur
**NFR-R4**: Robustesse Cache - Cache survit à fermeture/réouverture app et redémarrage tablette, capacité 50-100 MB pour catalogue complet
**NFR-R5**: Gestion Erreurs - Aucune erreur JavaScript ne doit bloquer l'application, messages d'erreur clairs et actionnables
**NFR-R6**: Uptime Backend - API backend disponible 99% du temps, dégradation gracieuse si backend indisponible
**NFR-S1**: Transport Security - HTTPS obligatoire (TLS 1.2 minimum), certificat SSL valide, pas de mixed content
**NFR-S2**: Authentification Brand Managers - JWT tokens avec expiration, refresh tokens 7 jours max, logout automatique après 30 min inactivité
**NFR-S3**: Autorisation Granulaire - Brand managers accèdent uniquement à leur section marque, permissions vérifiées côté serveur, audit log des modifications
**NFR-S4**: Protection Données Locales - Prix et marges stockés en clair (pas de chiffrement nécessaire), pas de données personnelles, cache vidable
**NFR-S5**: Protection CSRF/XSS - Protection CSRF sur requêtes authentifiées, sanitization inputs, Content Security Policy configurée
**NFR-SC1**: Charge Utilisateurs Concurrents - Support 500 utilisateurs actifs simultanément, 500 consultations/jour en pic
**NFR-SC2**: Croissance Données - Support 1000+ produits sans dégradation, 100+ campagnes actives simultanément
**NFR-SC3**: Scalabilité Géographique - Architecture permettant expansion multi-pays, support 5000+ utilisateurs pour expansion régionale
**NFR-U1**: Temps de Prise en Main - Vendeur opérationnel en < 5 minutes sans formation, navigation intuitive
**NFR-U2**: Taux d'Erreur Utilisateur - Taux d'erreur < 5% des interactions, aucune action destructive sans confirmation
**NFR-U3**: Feedback Visuel - Feedback immédiat < 100ms pour toute action, loading indicators pour actions > 1s
**NFR-U4**: Responsive Design - Interface optimisée pour landscape 1280x800, support portrait 800x1280
**NFR-U5**: Accessibilité Basique - Contraste minimum 4.5:1, taille texte minimum 16px, touch targets minimum 44x44px
**NFR-M1**: Autonomie Brand Managers - Publication contenu < 24h sans intervention IT, interface admin intuitive < 15 min prise en main
**NFR-M2**: Monitoring & Observabilité - Logging centralisé erreurs, métriques performance automatiques, alertes si dégradation
**NFR-M3**: Déploiement & Rollback - Déploiement nouvelle version < 5 min, rollback < 2 min, zero-downtime deployment
**NFR-M4**: Code Quality - Couverture tests > 70% du code critique, pas de dette technique bloquante
**NFR-C1**: Navigateurs Supportés - Chrome Android 90+, Samsung Internet 14+ (support complet P0), Firefox Android 88+ (basique P2)
**NFR-C2**: Device Requirements - Samsung Tab 6 Android 11+, RAM minimum 3 GB, stockage 200 MB, résolution minimum 1280x800
**NFR-C3**: Backward Compatibility - Nouvelles versions supportent données anciennes, migration automatique cache, pas de perte données

### Additional Requirements

**Architecture - Starter Template:**
- Initialisation du projet avec commande: `npm create @vite-pwa/pwa@latest lions-book -- --template preact-ts`
- Stack technique: Vite + Preact + vite-plugin-pwa + Deno backend
- Configuration Emotion pour CSS-in-JS (glassmorphisme)
- Configuration vite-plugin-pwa pour Service Workers et cache strategies
- Setup Deno backend avec Hono/Oak framework
- Configuration Drizzle ORM pour PostgreSQL
- Déploiement: Vercel (frontend PWA + backend Edge Functions)

**Architecture - Offline-First:**
- Service Workers sophistiqués avec cache stratégies multiples (Cache-First pour assets, Network-First with Cache Fallback pour contenu dynamique)
- IndexedDB pour stockage local du catalogue complet (50-100 MB)
- Background Sync API pour synchronisation automatique
- Détection automatique retour de connexion
- Gestion conflits: Last-Write-Wins (données serveur prioritaires)

**Architecture - Performance:**
- Moteur de recherche local (Fuse.js ou Lunr.js) pour recherche instantanée < 5s
- Code splitting par route et lazy loading composants
- Optimisation assets: WebP avec fallback JPEG, compression gzip/brotli
- Virtual scrolling pour grandes listes
- Debouncing/throttling pour recherche prédictive

**Architecture - Gestion Médias:**
- CDN pour assets médias (Vercel CDN)
- Téléchargement à la demande avec indicateur progression
- Compression intelligente (JPEG progressif, WebP)
- Cache médias avec limite configurable (défaut 500 MB)
- Prévisualisation basse résolution instantanée, haute résolution à la demande

**Architecture - Sécurité:**
- Pas d'authentification pour consultation catalogue (simplicité adoption)
- JWT tokens pour interface admin brand managers
- Permissions granulaires par marque (RBAC léger)
- HTTPS obligatoire, certificat SSL valide

**UX Design - Glassmorphisme Adaptatif:**
- Overlay transparent avec couleurs marque (rouge #ff7323f, jaune #ffc627)
- Contraste optimisé pour lisibilité soleil extérieur + bars sombres
- Carousel 3D interactif pour rotation formats/packs
- Performance fluide même offline

**UX Design - Menu Flottant Innovant:**
- Menu flottant gauche avec animation smooth extension/rétraction
- Navigation à une main optimisée pour usage debout
- Bouton retour + swipe gestures pour fluidité
- Accès rapide sections: Catalogue, Argumentaires, Objections, Activations

**UX Design - Responsive Multi-Orientation:**
- Portrait: Consultation rapide debout, infos empilées
- Paysage: Démonstration client avec division 2/3 ou 1/2, slider gauche + argumentaires droite
- Transition fluide entre orientations sans perte de contexte

**UX Design - Mode Sombre Manuel:**
- Activation/désactivation par utilisateur
- Adaptation contraintes luminosité (soleil extérieur, bars sombres)
- Contraste optimisé dans les deux modes

**UX Design - Interface avec Âme:**
- Animations subtiles 200-300ms et micro-interactions délicates
- Ton de voix chaleureux dans textes (empathie, encouragement)
- Icônes personnalisées uniques (pas Material Design générique)
- Combinaison Folk design + Néo-minimalisme + Bento grid
- Couleurs BDC: 70% blanc, 20% jaune, 10% rouge

### FR Coverage Map

**Epic 1 - Foundation Technique & PWA Setup:**
- FR59: Installation PWA sur écran d'accueil
- FR60: Mode fullscreen sans barre d'adresse
- FR61: Splash screen couleurs BDC
- FR62: Notification nouvelle version
- FR63: Rechargement pour mise à jour
- FR64: Numéro de version dans paramètres
- FR65: Changelog des versions
- FR66: Accès aux paramètres

**Epic 2 - Catalogue Produits & Navigation Offline-First:**
- FR1: Catalogue complet BDC (Bières, Soft, Eaux, Vins & Spiritueux)
- FR2: Prix produits et marges
- FR3: Historique et positionnement marque
- FR4: Fiches produits agencées par priorité visuelle
- FR5: Filtrer par catégorie
- FR6: Filtrer par marque
- FR35: Fonctionnement 100% offline
- FR36: Horodatage dernière synchronisation
- FR37: Synchronisation manuelle
- FR38: Sync automatique au démarrage
- FR39: Sync automatique en arrière-plan
- FR40: Alerte si > 1 mois sans sync
- FR41: Sync sélective par marque/catégorie
- FR42: Sync intégralité catalogue
- FR43: Indicateur statut connexion (online/offline)

**Epic 3 - Recherche Instantanée & Favoris:**
- FR7: Recherche par nom produit
- FR8: Recherche par marque
- FR9: Recherche par catégorie
- FR10: Recherche par mot-clé
- FR11: Suggestions pendant saisie
- FR12: Historique de recherche
- FR13: Marquer produits en favoris
- FR14: Accès favoris depuis raccourci dédié
- FR15: Filtrer par canal de vente (CHR, PSV, TT, MT)
- FR16: Filtrer par type de client
- FR17: Filtrer par gamme de prix

**Epic 4 - Argumentaires de Vente & Gestion Objections:**
- FR18: Argumentaires structurés par marque
- FR19: Arguments clés hiérarchisés par priorité
- FR20: Adaptation argumentaires selon contexte client
- FR21: Objections basées recueil d'arguments BDC
- FR22: Réponse objection "Trop cher"
- FR23: Réponse objection "Ça ne tourne pas chez moi"
- FR24: Objections variables selon canal et type produit
- FR25: Scripts de réponse avec exemples concrets

**Epic 5 - Activations & Promotions avec Médias Offline:**
- FR26: Campagnes promotionnelles en cours
- FR27: Visuels décorations marque disponibles
- FR28: Téléchargement visuels à la demande
- FR29: Photos activations réussies
- FR30: Plans techniques activations
- FR31: Rendus 3D activations (limité)
- FR32: Actualités et événements BDC
- FR33: Offres promotionnelles actives
- FR34: Activations gratuites pour détaillants
- FR67: Informations compte (si authentification future)
- FR69: Espace stockage cache offline et médias
- FR70: Configuration auto-téléchargement médias (WiFi/données/jamais)
- FR71: Limite maximale cache médias
- FR72: Vider cache global ou par catégorie
- FR73: Taille de chaque catégorie médias en cache

**Epic 6 - Notifications & Synchronisation Intelligente:**
- FR44: Badge "nouveau" sur contenu mis à jour
- FR45: Notifications push campagnes urgentes
- FR46: Rappels si pas synchronisé depuis X jours
- FR47: Sections récemment modifiées clairement visibles
- FR48: Activer/désactiver notifications dans paramètres

**Epic 7 - Interface Admin Brand Managers:**
- FR49: Authentification sécurisée admin
- FR50: Permissions par marque (modification section marque uniquement)
- FR51: Upload images et visuels pour activations
- FR52: Publication immédiate sans workflow validation
- FR53: Gérer actualités de leur marque
- FR54: Gérer campagnes de leur marque
- FR55: Gérer événements de leur marque
- FR56: Gérer offres promotionnelles de leur marque
- FR57: Prévisualisation rendu mobile avant publication
- FR58: Date dernière modification de leur contenu
- FR68: Gérer préférences notifications (admin)

## Epic List

### Epic 1: Foundation Technique & PWA Setup
Les vendeurs peuvent installer et lancer Lions' Book comme une application native sur leur tablette Samsung Tab 6, avec une expérience app-like professionnelle aux couleurs BDC.

**FRs couverts:** FR59, FR60, FR61, FR62, FR63, FR64, FR65, FR66

**Valeur utilisateur:** Application installable sans store, splash screen BDC, mises à jour transparentes, gestion paramètres, expérience fullscreen optimisée.

**Implémentation:** PWA avec Vite + Preact + vite-plugin-pwa, Web App Manifest, Service Workers, installation prompt, update prompt, paramètres app.

---

### Epic 2: Catalogue Produits & Navigation Offline-First
Les vendeurs peuvent consulter le catalogue complet BDC avec prix, marges et informations produits, fonctionnant 100% offline même en zones rurales sans connexion.

**FRs couverts:** FR1, FR2, FR3, FR4, FR5, FR6, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42, FR43

**Valeur utilisateur:** Accès catalogue complet offline (Journey Éric), prix et marges pour négociation, synchronisation intelligente automatique, équité urbain/rural.

**Implémentation:** IndexedDB pour stockage local (50-100 MB), Service Workers avec cache strategies, background sync, horodatage, alertes données anciennes, indicateur online/offline.

---

### Epic 3: Recherche Instantanée & Favoris
Les vendeurs trouvent n'importe quel produit en moins de 5 secondes avec recherche intelligente, filtres avancés, suggestions prédictives et favoris.

**FRs couverts:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17

**Valeur utilisateur:** Accès ultra-rapide information pendant négociation client (Journey Marcel), recherche < 5 secondes, filtres contextuels (canal CHR/PSV/TT/MT), favoris pour produits fréquents.

**Implémentation:** Moteur recherche local (Fuse.js ou Lunr.js), indexation catalogue, debouncing recherche prédictive, LocalStorage pour favoris et historique, filtres multi-critères.

---

### Epic 4: Argumentaires de Vente & Gestion Objections
Les vendeurs ont les bons arguments et réponses aux objections pour convaincre les clients avec assurance et professionnalisme.

**FRs couverts:** FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25

**Valeur utilisateur:** Confiance face aux clients (Journey Aminata), scripts de réponse objections ("Trop cher", "Ça ne tourne pas"), argumentaires par marque et canal, pitch instantané.

**Implémentation:** Argumentaires structurés par marque dans catalogue, modal "Speech Rapide", bouton "Gérer les objections", scripts de réponse avec exemples concrets, hiérarchisation arguments.

---

### Epic 5: Activations & Promotions avec Médias Offline
Les vendeurs proposent des activations gratuites avec visuels téléchargeables pour séduire les détaillants, avec gestion médias style Telegram.

**FRs couverts:** FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR67, FR69, FR70, FR71, FR72, FR73

**Valeur utilisateur:** Argument commercial différenciant (Journey Marcel avec activations gratuites), visuels pro téléchargeables, campagnes temps réel, gestion cache médias intelligente.

**Implémentation:** Téléchargement à la demande avec indicateur progression, compression intelligente (WebP, JPEG progressif), cache médias configurable (défaut 500 MB), purge automatique, prévisualisation basse/haute résolution.

---

### Epic 6: Notifications & Synchronisation Intelligente
Les vendeurs sont toujours informés des nouveautés et leurs données restent à jour automatiquement sans intervention manuelle.

**FRs couverts:** FR44, FR45, FR46, FR47, FR48

**Valeur utilisateur:** Fraîcheur contenu sans effort, campagnes urgentes diffusées instantanément (Journey Sophie), badge "nouveau" pour contenu mis à jour, rappels sync.

**Implémentation:** Web Push API + Firebase Cloud Messaging, badge "nouveau" sur contenu récent, notifications push campagnes urgentes, rappels si > X jours sans sync, préférences notifications.

---

### Epic 7: Interface Admin Brand Managers
Les brand managers publient campagnes et activations en moins de 24h sans dépendance IT, avec autonomie totale sur leur section marque.

**FRs couverts:** FR49, FR50, FR51, FR52, FR53, FR54, FR55, FR56, FR57, FR58, FR68

**Valeur utilisateur:** Agilité marketing (Journey Sophie), time-to-market 90 minutes vs 1 semaine, autonomie publication, permissions granulaires par marque.

**Implémentation:** Authentification JWT, RBAC léger permissions par marque, interface admin Deno backend, upload visuels CDN, publication immédiate, prévisualisation mobile, audit log modifications.

## Epic 1: Foundation Technique & PWA Setup

Les vendeurs peuvent installer et lancer Lions' Book comme une application native sur leur tablette Samsung Tab 6, avec une expérience app-like professionnelle aux couleurs BDC.

### Story 1.1: Initialiser le Projet PWA avec Starter Template

As a développeur,
I want initialiser le projet avec le starter template Vite + Preact + PWA,
So that j'ai une base solide pour développer l'application offline-first.

**Acceptance Criteria:**

**Given** un environnement de développement configuré
**When** j'exécute `npm create @vite-pwa/pwa@latest lions-book -- --template preact-ts`
**Then** le projet est initialisé avec Vite, Preact, TypeScript et vite-plugin-pwa
**And** la structure de dossiers suit l'architecture définie (src/components, src/routes, src/lib, etc.)
**And** les dépendances de base sont installées (Preact, Vite, vite-plugin-pwa, TypeScript)
**And** le projet compile et démarre en mode développement avec HMR fonctionnel

### Story 1.2: Configurer PWA Manifest et Service Worker

As a vendeur,
I want installer l'application sur l'écran d'accueil de ma tablette,
So that je peux lancer Lions' Book comme une app native.

**Acceptance Criteria:**

**Given** le projet PWA initialisé
**When** je configure vite-plugin-pwa avec le manifest (nom "Lions' Book", couleurs BDC #ffc627, #ff7323f)
**Then** le fichier manifest.json est généré avec les bonnes métadonnées
**And** les icônes PWA 192x192 et 512x512 sont créées aux couleurs BDC
**And** le Service Worker est généré automatiquement par Workbox
**And** l'application est installable sur Android (prompt d'installation s'affiche)
**And** l'orientation est configurée en "any" pour support portrait/paysage

### Story 1.3: Implémenter Splash Screen et Mode Fullscreen

As a vendeur,
I want voir un splash screen aux couleurs BDC au lancement et utiliser l'app en fullscreen,
So that j'ai une expérience professionnelle et immersive.

**Acceptance Criteria:**

**Given** l'application PWA installée
**When** je lance l'app depuis l'écran d'accueil
**Then** un splash screen s'affiche avec le logo BDC et les couleurs jaune/rouge
**And** l'application se lance en mode fullscreen (display: "standalone")
**And** aucune barre d'adresse n'est visible
**And** le splash screen disparaît après le chargement initial (< 2 secondes)

### Story 1.4: Créer Page Paramètres avec Version et Changelog

As a vendeur,
I want accéder aux paramètres de l'application et voir la version installée,
So that je peux vérifier que j'ai la dernière version.

**Acceptance Criteria:**

**Given** l'application est lancée
**When** j'accède à la page Paramètres depuis le menu
**Then** je vois le numéro de version actuel (ex: v1.0.0)
**And** je peux consulter le changelog des versions précédentes
**And** les paramètres sont accessibles via une icône dédiée dans le menu principal
**And** la page Paramètres est responsive (portrait/paysage)

### Story 1.5: Implémenter Système de Mise à Jour PWA

As a vendeur,
I want être notifié quand une nouvelle version est disponible,
So that je peux mettre à jour l'application facilement.

**Acceptance Criteria:**

**Given** une nouvelle version de l'app est déployée
**When** je lance l'application avec l'ancienne version
**Then** une notification s'affiche "Nouvelle version disponible"
**And** je peux choisir de recharger l'app pour mettre à jour
**And** si je refuse, la notification disparaît et je peux continuer avec l'ancienne version
**And** la mise à jour s'installe en arrière-plan si l'app est fermée
**And** après rechargement, la nouvelle version est active

### Story 1.6: Implémenter Mécanisme de Rollback et Versioning Cache

As a vendeur,
I want pouvoir revenir à une version précédente si la nouvelle est buguée,
So that je ne suis jamais bloqué dans mon travail.

**Acceptance Criteria:**

**Given** une nouvelle version de l'app est installée
**When** la nouvelle version a un bug critique
**Then** je peux revenir à la version précédente depuis les paramètres
**And** le cache IndexedDB est versionné (v1, v2, v3...)
**And** lors d'un rollback, le cache de la version précédente est restauré
**And** maximum 2 versions de cache sont conservées pour économiser l'espace
**And** un mécanisme de migration automatique gère les changements de schéma
**And** si la migration échoue, l'ancienne version du cache reste intacte
**And** un système de feature flags permet de désactiver des fonctionnalités buguées sans rollback complet

## Epic 2: Catalogue Produits & Navigation Offline-First

Les vendeurs peuvent consulter le catalogue complet BDC avec prix, marges et informations produits, fonctionnant 100% offline même en zones rurales sans connexion.

### Story 2.1: Configurer IndexedDB pour Stockage Local Catalogue

As a vendeur,
I want que le catalogue soit stocké localement sur ma tablette,
So that je peux consulter les produits même sans connexion internet.

**Acceptance Criteria:**

**Given** l'application PWA est installée
**When** je lance l'app pour la première fois
**Then** une base de données IndexedDB est créée avec le schéma catalogue (produits, marques, catégories)
**And** la capacité de stockage est configurée pour 50-100 MB minimum
**And** un wrapper TypeScript pour IndexedDB est implémenté (lib/storage/)
**And** les opérations CRUD de base sont fonctionnelles (create, read, update, delete)
**And** la base de données survit au redémarrage de la tablette

### Story 2.2: Implémenter Service Worker avec Cache Strategies

As a vendeur,
I want que l'application fonctionne parfaitement offline,
So that je peux travailler en zones rurales sans connexion.

**Acceptance Criteria:**

**Given** le Service Worker est configuré via vite-plugin-pwa
**When** je configure les cache strategies Workbox
**Then** la stratégie Cache-First est appliquée pour les assets statiques (JS, CSS, fonts)
**And** la stratégie Network-First with Cache Fallback est appliquée pour le contenu dynamique
**And** les assets critiques sont précachés au premier chargement
**And** le cache survit à la fermeture de l'app
**And** l'app fonctionne 100% offline après le premier chargement

### Story 2.3: Créer Modèle de Données Produits et Charger Catalogue Initial

As a vendeur,
I want voir le catalogue complet des produits BDC,
So that je peux consulter toutes les marques disponibles.

**Acceptance Criteria:**

**Given** IndexedDB est configuré
**When** je charge le catalogue initial depuis les fichiers YAML statiques
**Then** tous les produits BDC sont importés (Bières, Soft, Eaux, Vins & Spiritueux)
**And** chaque produit contient: nom, marque, catégorie, prix, marge, historique, positionnement
**And** les données sont structurées selon le schéma défini dans Architecture
**And** le catalogue complet est stocké en IndexedDB (< 100 MB)
**And** je peux consulter la liste complète des produits dans l'interface

### Story 2.4: Afficher Fiches Produits avec Glassmorphisme et Carousel 3D

As a vendeur,
I want consulter des fiches produits visuellement attractives,
So that je peux présenter les produits de manière professionnelle aux clients.

**Acceptance Criteria:**

**Given** un produit est sélectionné
**When** j'ouvre la fiche produit
**Then** la fiche s'affiche avec glassmorphisme adaptatif (overlay transparent, couleurs marque)
**And** un carousel 3D interactif montre les différents formats/packs disponibles
**And** les informations critiques sont ultra-visibles: prix, % alcool, contenance, nombre bouteilles
**And** le fond utilise les couleurs marque (rouge #ff7323f, jaune #ffc627)
**And** la fiche est responsive (portrait/paysage avec layout adaptatif)
**And** les animations sont fluides (200-300ms) même offline

### Story 2.5: Implémenter Filtres par Catégorie et Marque

As a vendeur,
I want filtrer les produits par catégorie ou marque,
So that je peux rapidement trouver les produits d'une gamme spécifique.

**Acceptance Criteria:**

**Given** je suis sur la page catalogue
**When** j'applique un filtre catégorie (Bières, Soft, Eaux, Vins & Spiritueux)
**Then** seuls les produits de cette catégorie s'affichent
**And** je peux combiner filtre catégorie + filtre marque
**And** les filtres fonctionnent instantanément (< 300ms)
**And** le nombre de résultats est affiché
**And** je peux réinitialiser tous les filtres en un tap
**And** les filtres fonctionnent offline

### Story 2.6: Créer Indicateur Statut Connexion et Horodatage Sync

As a vendeur,
I want voir clairement si je suis online ou offline,
So that je sais si mes données sont à jour.

**Acceptance Criteria:**

**Given** l'application est lancée
**When** je consulte l'interface
**Then** un indicateur visible montre le statut connexion (online/offline) avec icône + texte
**And** l'horodatage de la dernière synchronisation est affiché (ex: "Dernière sync: il y a 2 heures")
**And** l'indicateur se met à jour automatiquement quand la connexion change
**And** l'horodatage est visible dans la page Paramètres
**And** le format de date est clair et localisé en français

### Story 2.7: Implémenter Synchronisation Manuelle

As a vendeur,
I want déclencher une synchronisation manuelle,
So that je peux mettre à jour mes données quand je le souhaite.

**Acceptance Criteria:**

**Given** je suis connecté à internet
**When** j'appuie sur le bouton "Synchroniser" dans les paramètres
**Then** la synchronisation démarre immédiatement
**And** un indicateur de progression s'affiche (spinner + pourcentage)
**And** l'horodatage se met à jour après synchronisation réussie
**And** un message de succès s'affiche "Synchronisation réussie"
**And** si la sync échoue, un message d'erreur clair est affiché avec possibilité de réessayer
**And** la sync manuelle fonctionne même si l'app est en arrière-plan

### Story 2.8: Implémenter Synchronisation Automatique au Démarrage

As a vendeur,
I want que l'app se synchronise automatiquement au démarrage,
So that j'ai toujours les données les plus récentes sans effort.

**Acceptance Criteria:**

**Given** je lance l'application
**When** une connexion internet est disponible
**Then** la synchronisation démarre automatiquement en arrière-plan
**And** l'interface reste utilisable pendant la sync (non bloquante)
**And** un badge "nouveau" apparaît sur le contenu mis à jour
**And** si pas de connexion, l'app démarre normalement en mode offline
**And** la sync automatique respecte les préférences utilisateur (WiFi only ou données mobiles)

### Story 2.9: Implémenter Background Sync Automatique

As a vendeur,
I want que l'app se synchronise automatiquement quand la connexion revient,
So that mes données restent à jour sans intervention.

**Acceptance Criteria:**

**Given** je suis en mode offline
**When** la connexion internet revient (détection automatique)
**Then** la synchronisation démarre automatiquement en arrière-plan via Background Sync API
**And** l'utilisateur est notifié discrètement (toast notification)
**And** l'horodatage se met à jour après sync réussie
**And** si la sync échoue, 3 tentatives avec backoff exponentiel (NFR-R2)
**And** la sync en arrière-plan ne consomme pas trop de batterie

### Story 2.10: Implémenter Alertes Données Anciennes et Sync Sélective

As a vendeur,
I want être alerté si mes données sont anciennes et choisir quoi synchroniser,
So that je garde un contrôle sur mon stockage et ma consommation data.

**Acceptance Criteria:**

**Given** je n'ai pas synchronisé depuis plus de 1 mois
**When** j'ouvre l'application
**Then** une alerte claire s'affiche "Vos données datent de plus d'1 mois, synchronisez pour les mettre à jour"
**And** je peux choisir de synchroniser tout le catalogue ou sélectivement par marque/catégorie
**And** dans les paramètres, je vois la taille de chaque marque/catégorie en cache
**And** je peux désélectionner certaines marques pour économiser de l'espace
**And** la sync sélective met à jour uniquement les marques/catégories choisies

### Story 2.11: Implémenter Web Workers pour Synchronisation Non-Bloquante

As a vendeur,
I want que la synchronisation ne bloque jamais l'interface,
So that je peux continuer à travailler pendant que les données se mettent à jour.

**Acceptance Criteria:**

**Given** une synchronisation est en cours
**When** j'utilise l'application
**Then** la synchronisation s'exécute dans un Web Worker dédié
**And** l'interface reste fluide et responsive à 100% (pas de freeze)
**And** je peux naviguer, rechercher et consulter des produits pendant la sync
**And** un indicateur de progression discret montre l'avancement de la sync
**And** la sync en Web Worker ne consomme pas trop de CPU (throttling si nécessaire)
**And** les données sont mises à jour progressivement sans interruption de l'UX

### Story 2.12: Créer Système de Pagination et Lazy Loading Catalogue Initial

As a vendeur,
I want que le catalogue se charge rapidement même avec 1000+ produits,
So that je ne perds pas de temps au premier lancement.

**Acceptance Criteria:**

**Given** je lance l'app pour la première fois
**When** le catalogue initial se charge
**Then** seuls les 50 premiers produits sont chargés immédiatement
**And** les produits suivants sont chargés en arrière-plan par batches de 50
**And** le chargement initial prend < 3 secondes (NFR-P2)
**And** l'utilisateur peut commencer à utiliser l'app immédiatement
**And** un indicateur montre la progression du chargement complet en arrière-plan
**And** la pagination est transparente pour l'utilisateur (infinite scroll)

### Story 2.13: Implémenter Mode Haute Lisibilité pour Utilisation Extérieure

As a vendeur,
I want que l'app soit lisible en plein soleil,
So that je peux travailler dehors sans difficulté.

**Acceptance Criteria:**

**Given** je suis en extérieur avec forte luminosité
**When** j'active le mode haute lisibilité (manuel ou automatique)
**Then** le glassmorphisme est désactivé au profit de fonds opaques
**And** le contraste est augmenté à minimum 7:1 (au-delà de WCAG AAA)
**And** les couleurs sont ajustées pour visibilité maximale (jaune plus saturé, texte noir)
**And** les ombres et effets transparents sont réduits
**And** je peux basculer manuellement entre mode normal et haute lisibilité
**And** le mode sélectionné est mémorisé pour les prochaines sessions

### Story 2.14: Setup Zustand pour Gestion État Global avec Persistence

As a développeur,
I want un système de gestion d'état performant et persistant,
So that l'état de l'app est synchronisé avec IndexedDB automatiquement.

**Acceptance Criteria:**

**Given** l'application nécessite un état global (catalogue, user prefs, sync status)
**When** je configure Zustand avec persist middleware
**Then** Zustand est installé et configuré (bundle < 1 KB)
**And** le store global contient: catalogueState, userPreferences, syncStatus, searchState
**And** le persist middleware synchronise automatiquement avec IndexedDB
**And** les sélecteurs granulaires évitent les re-renders inutiles
**And** Zustand DevTools est configuré pour debugging en développement
**And** la persistence est optimisée (debouncing 500ms pour éviter writes excessifs)
**And** le state est restauré automatiquement au démarrage de l'app

### Story 2.15: Implémenter Monitoring Quota IndexedDB et Cleanup Proactif

As a vendeur,
I want que l'app gère automatiquement l'espace de stockage IndexedDB,
So that je ne suis jamais bloqué par un quota dépassé.

**Acceptance Criteria:**

**Given** l'application utilise IndexedDB pour le catalogue
**When** le quota approche de la limite
**Then** un système de monitoring détecte quand le quota atteint 80% de la limite
**And** une alerte discrète s'affiche proposant de nettoyer les données anciennes
**And** un cleanup automatique supprime les données non utilisées depuis > 90 jours
**And** les données critiques (produits actifs, campagnes en cours) ne sont jamais supprimées
**And** je peux voir l'utilisation du quota dans les paramètres (ex: "45 MB / 100 MB utilisés")
**And** un rapport mensuel suggère des optimisations (ex: "Supprimez 3 marques non consultées pour libérer 15 MB")

### Story 2.16: Implémenter Détection Corruption et Auto-Repair IndexedDB

As a vendeur,
I want que l'app détecte et répare automatiquement les corruptions de données,
So that je ne perds jamais mes données à cause d'un bug.

**Acceptance Criteria:**

**Given** l'application démarre
**When** le système vérifie l'intégrité d'IndexedDB
**Then** un checksum validation est effectué sur les données critiques
**And** si une corruption est détectée, un auto-repair tente de restaurer les données
**And** si l'auto-repair échoue, un fallback vers backup local (dernière version valide) est activé
**And** si aucun backup, une resynchronisation complète est déclenchée automatiquement
**And** l'utilisateur est informé de la corruption et de la réparation (message clair)
**And** un log détaillé de la corruption est envoyé au monitoring pour analyse
**And** l'app reste utilisable pendant la réparation (mode dégradé si nécessaire)

### Story 2.17: Implémenter Adaptive Performance Mode

As a vendeur,
I want que l'app adapte automatiquement ses effets visuels selon la performance,
So that j'ai toujours une expérience fluide même sur tablette ancienne.

**Acceptance Criteria:**

**Given** l'application est lancée sur une tablette
**When** le système détecte les capacités GPU
**Then** le glassmorphisme est activé par défaut sur devices récents (GPU capable)
**And** un monitoring FPS détecte si les performances chutent < 50 FPS
**And** si FPS < 50 pendant 5 secondes, désactivation progressive des effets (blur → ombres → transparence)
**And** si FPS remonte > 55, réactivation progressive des effets
**And** le mode haute lisibilité (Story 2.13) désactive tous les effets immédiatement
**And** l'utilisateur peut forcer le mode performance dans les paramètres (désactive tous les effets)
**And** un badge discret indique le mode actif ("Mode Performance" si effets désactivés)

### Story 2.18: Enrichir Fiches Produits avec Certifications et Qualité

As a vendeur,
I want voir les certifications et garanties qualité sur les fiches produits,
So that je peux rassurer mes clients sur la qualité BDC (retour terrain M. Michel TJOMB).

**Acceptance Criteria:**

**Given** je consulte une fiche produit
**When** j'ouvre les détails
**Then** un badge "Certifié ISO" est clairement visible en haut de la fiche
**And** une section "Qualité garantie BDC" liste les certifications (ISO 9001, ISO 22000, etc.)
**And** les ingrédients constitutifs sont détaillés (composition, origine)
**And** les standards de qualité sont expliqués en langage simple
**And** un argument clé "Produits certifiés, bon à la consommation" est mis en avant
**And** les mots-clés "disponibilité", "qualité", "certification" sont intégrés dans les fiches
**And** je peux partager ces informations qualité avec le client (screenshot ou partage)

### Story 2.19: Ajouter Section Conseils Conservation Produits

As a vendeur,
I want donner des conseils de conservation à mes clients,
So that je les aide à préserver la qualité des produits BDC (retour terrain M. Michel TJOMB).

**Acceptance Criteria:**

**Given** je consulte une fiche produit
**When** j'accède à la section "Conseils pratiques"
**Then** la température optimale de conservation est indiquée (ex: "Conserver entre 4°C et 8°C")
**And** la durée de conservation est précisée (ex: "Consommer dans les 6 mois")
**And** des conseils de présentation au client sont fournis (ex: "Servir frais à 6°C")
**And** des conseils de stockage sont donnés (ex: "Éviter l'exposition directe au soleil")
**And** ces conseils sont adaptés par type de produit (bières, soft, eaux, vins)
**And** je peux imprimer ou partager ces conseils avec le client

### Story 2.20: Implémenter Indicateur Disponibilité Stock Temps Réel

As a vendeur,
I want voir la disponibilité en stock des produits,
So that je ne propose pas un produit en rupture (retour terrain 4 chefs de secteur).

**Acceptance Criteria:**

**Given** je consulte le catalogue ou une fiche produit
**When** je vois un produit
**Then** un badge de disponibilité est affiché: "En stock" (vert), "Stock limité" (orange), "Rupture" (rouge)
**And** le stock est synchronisé en temps réel depuis le backend (API)
**And** si un produit passe en rupture, une notification m'alerte immédiatement
**And** je peux filtrer le catalogue pour voir uniquement les produits "En stock"
**And** l'historique de disponibilité est conservé (ex: "Retour en stock prévu dans 3 jours")
**And** les produits en rupture sont grisés mais restent consultables (pour info client)
**And** un argument "Disponibilité garantie" est mis en avant pour les produits en stock

### Story 2.21: Mettre à Jour Schéma de Données et Architecture Stock

As a développeur,
I want adapter l'architecture pour supporter les nouvelles fonctionnalités terrain,
So that le modèle de données et la stratégie de sync sont cohérents.

**Acceptance Criteria:**

**Given** les nouvelles stories 2.18, 2.19, 2.20 nécessitent des changements architecture
**When** je mets à jour le schéma de données
**Then** le modèle `Product` est étendu avec: `certifications[]`, `ingredients`, `qualityStandards`, `conservationAdvice{}`
**And** un nouveau modèle `StockStatus` est créé: `productId`, `status`, `quantity`, `nextRestockDate`, `lastUpdated`
**And** une stratégie de polling léger (5 min) est implémentée pour le stock uniquement
**And** le cache stock a un TTL court (5-10 minutes) vs catalogue (illimité)
**And** l'architecture reste offline-first pour le catalogue, hybrid pour le stock
**And** si pas de connexion, le dernier statut stock connu est affiché avec warning "Dernière mise à jour: il y a X minutes"
**And** les migrations Drizzle ORM sont créées pour les nouveaux champs
**And** la documentation architecture.md est mise à jour avec ces changements

## Epic 3: Recherche Instantanée & Favoris

Les vendeurs trouvent n'importe quel produit en moins de 5 secondes avec recherche intelligente, filtres avancés, suggestions prédictives et favoris.

### Story 3.1: Implémenter Moteur de Recherche Local avec Indexation

As a vendeur,
I want rechercher un produit par nom, marque ou mot-clé,
So that je trouve rapidement l'information dont j'ai besoin.

**Acceptance Criteria:**

**Given** le catalogue est chargé en IndexedDB
**When** j'implémente le moteur de recherche local (Fuse.js ou Lunr.js)
**Then** tous les produits sont indexés pour recherche rapide
**And** la recherche fonctionne sur: nom produit, marque, catégorie, mots-clés
**And** la recherche est insensible à la casse et aux accents
**And** les résultats sont pertinents et classés par score de pertinence
**And** la recherche fonctionne 100% offline
**And** le temps de réponse est < 5 secondes pour 90% des requêtes (NFR-P1)

### Story 3.2: Créer Interface Recherche avec Suggestions Prédictives

As a vendeur,
I want voir des suggestions pendant que je tape,
So that je trouve plus rapidement ce que je cherche.

**Acceptance Criteria:**

**Given** je suis sur la page recherche
**When** je commence à taper dans la barre de recherche
**Then** des suggestions apparaissent après 2 caractères tapés
**And** les suggestions sont mises à jour en temps réel avec debouncing (300ms)
**And** je peux sélectionner une suggestion en un tap
**And** les suggestions incluent: produits, marques, catégories
**And** maximum 5-8 suggestions affichées pour éviter surcharge
**And** les suggestions fonctionnent offline

### Story 3.3: Implémenter Historique de Recherche

As a vendeur,
I want consulter mon historique de recherche,
So that je peux rapidement refaire une recherche précédente.

**Acceptance Criteria:**

**Given** j'ai effectué des recherches
**When** j'ouvre la barre de recherche
**Then** mes 10 dernières recherches s'affichent
**And** je peux sélectionner une recherche de l'historique en un tap
**And** je peux supprimer une recherche de l'historique (swipe ou icône)
**And** je peux vider tout l'historique depuis les paramètres
**And** l'historique est stocké en LocalStorage
**And** l'historique persiste après fermeture de l'app

### Story 3.4: Créer Système de Favoris avec Accès Rapide

As a vendeur,
I want marquer mes produits favoris,
So that j'accède rapidement aux produits que je vends le plus souvent.

**Acceptance Criteria:**

**Given** je consulte une fiche produit
**When** j'appuie sur l'icône étoile ⭐
**Then** le produit est ajouté à mes favoris
**And** l'icône étoile devient pleine (filled) pour indiquer le statut favori
**And** je peux accéder à mes favoris depuis un raccourci dédié dans le menu
**And** je peux retirer un produit des favoris en appuyant à nouveau sur l'étoile
**And** mes favoris sont stockés en LocalStorage
**And** les favoris persistent après fermeture de l'app

### Story 3.5: Implémenter Filtres Avancés (Canal, Type Client, Prix)

As a vendeur,
I want filtrer les résultats par canal de vente et gamme de prix,
So that je trouve les produits adaptés à mon contexte de vente.

**Acceptance Criteria:**

**Given** je suis sur la page recherche ou catalogue
**When** j'ouvre les filtres avancés
**Then** je peux filtrer par canal de vente (CHR, PSV, TT, MT)
**And** je peux filtrer par type de client (bar, restaurant, snack, etc.)
**And** je peux filtrer par gamme de prix (slider ou ranges prédéfinis)
**And** je peux combiner plusieurs filtres simultanément
**And** le nombre de résultats se met à jour en temps réel
**And** je peux réinitialiser tous les filtres en un tap
**And** les filtres fonctionnent offline et sont performants (< 300ms)

### Story 3.6: Optimiser Performance Recherche et Affichage Résultats

As a vendeur,
I want que la recherche soit ultra-rapide,
So that je ne perds pas de temps pendant mes négociations.

**Acceptance Criteria:**

**Given** je lance une recherche
**When** les résultats sont affichés
**Then** le temps de réponse est < 2 secondes pour 90% des recherches
**And** les résultats s'affichent progressivement (lazy loading si > 50 résultats)
**And** le scroll est fluide à 60 FPS (virtual scrolling si nécessaire)
**And** les images produits sont lazy-loaded
**And** la recherche ne bloque pas l'interface (non bloquante)
**And** les performances sont identiques online/offline (NFR-P4)

### Story 3.7: Optimiser Index de Recherche avec Stratégie Incrémentale

As a vendeur,
I want que la recherche reste rapide même avec 1000+ produits,
So that je respecte toujours la contrainte < 5 secondes.

**Acceptance Criteria:**

**Given** le catalogue contient 1000+ produits
**When** j'implémente l'indexation de recherche
**Then** l'index est construit de manière incrémentale (pas tout d'un coup)
**And** l'index utilise une structure optimisée (inverted index ou trie)
**And** les champs indexés sont limités aux essentiels (nom, marque, catégorie, mots-clés)
**And** l'index est mis à jour de manière incrémentale lors des syncs
**And** la taille de l'index est < 10 MB pour 1000 produits
**And** le temps de recherche reste < 5 secondes pour 90% des requêtes (NFR-P1)
**And** l'index est persisté en IndexedDB pour éviter reconstruction au démarrage

### Story 3.8: Implémenter Migration Conditionnelle Moteur de Recherche

As a développeur,
I want monitorer la performance de recherche et migrer automatiquement si nécessaire,
So that on garantit toujours NFR-P1 même avec croissance du catalogue.

**Acceptance Criteria:**

**Given** le moteur de recherche Fuse.js est implémenté (MVP)
**When** je configure le monitoring de performance
**Then** chaque recherche enregistre son temps d'exécution en mémoire (rolling average 100 dernières recherches)
**And** si le temps moyen dépasse 3 secondes pendant 1 semaine, une alerte est levée
**And** un système de feature flag permet de basculer vers Lunr.js sans redéploiement
**And** la migration Fuse.js → Lunr.js est automatique si temps > 4 secondes
**And** les métriques de performance sont envoyées au monitoring (temps recherche, taille catalogue, taille index)
**And** un dashboard admin montre les performances de recherche en temps réel

### Story 3.9: Implémenter Index Cleanup et Garbage Collection

As a développeur,
I want nettoyer périodiquement l'index de recherche,
So that la taille de l'index reste optimale et la recherche rapide.

**Acceptance Criteria:**

**Given** l'index de recherche est utilisé depuis plusieurs semaines
**When** un cleanup périodique est déclenché (hebdomadaire)
**Then** les entrées obsolètes sont supprimées (produits supprimés, marques désactivées)
**And** l'index est réoptimisé (défragmentation, compression)
**And** la taille de l'index est réduite de 10-20% après cleanup
**And** le cleanup s'exécute en arrière-plan sans bloquer l'app
**And** les métriques de cleanup sont loggées (taille avant/après, durée, entrées supprimées)
**And** un garbage collector supprime les données temporaires de recherche (cache résultats > 7 jours)

### Story 3.10: Implémenter Progressive Loading Résultats Recherche

As a vendeur,
I want voir les résultats de recherche rapidement avec détails progressifs,
So that je ne perds pas de temps à attendre le chargement complet.

**Acceptance Criteria:**

**Given** je lance une recherche avec 100+ résultats
**When** les résultats s'affichent
**Then** Phase 1 (< 1s): Texte uniquement (nom, marque, prix, marge) pour tous les résultats
**And** Phase 2 (progressive): Images lazy-loaded au scroll (viewport + 2 écrans)
**And** Phase 3 (on-demand): Argumentaire court chargé au tap sur résultat
**And** un skeleton loader indique le chargement des images
**And** le scroll reste fluide à 60 FPS pendant le chargement progressif
**And** les images sont mises en cache après chargement pour accès instantané suivant
**And** l'utilisateur peut commencer à interagir immédiatement (Phase 1)

## Epic 4: Argumentaires de Vente & Gestion Objections

Les vendeurs ont les bons arguments et réponses aux objections pour convaincre les clients avec assurance et professionnalisme.

### Story 4.1: Créer Modèle de Données Argumentaires par Marque

As a vendeur,
I want consulter les argumentaires de vente structurés par marque,
So that j'ai les bons arguments pour convaincre mes clients.

**Acceptance Criteria:**

**Given** le catalogue produits est chargé
**When** je crée le modèle de données pour les argumentaires
**Then** chaque marque a ses argumentaires structurés et hiérarchisés
**And** les arguments sont classés par priorité (arguments clés en premier)
**And** les argumentaires sont stockés en IndexedDB avec les produits
**And** je peux accéder aux argumentaires depuis la fiche produit/marque
**And** les argumentaires sont disponibles offline

### Story 4.2: Implémenter Modal "Speech Rapide" pour Pitch Instantané

As a vendeur,
I want accéder rapidement à un argumentaire condensé,
So that je peux pitcher un produit en 30 secondes face au client.

**Acceptance Criteria:**

**Given** je consulte une fiche produit
**When** j'appuie sur le bouton "Speech Rapide"
**Then** une modal s'ouvre avec l'argumentaire condensé de la marque
**And** 3-4 arguments clés ultra-visibles sont affichés
**And** les chiffres de marge et rotation sont inclus
**And** le ton est chaleureux et convaincant
**And** la modal est lisible en 30 secondes maximum
**And** je peux fermer la modal en un tap (bouton X ou tap en dehors)
**And** la modal est responsive (portrait/paysage)

### Story 4.3: Créer Modèle de Données Objections avec Scripts de Réponse

As a vendeur,
I want consulter les objections courantes avec leurs réponses,
So that je suis préparé aux questions difficiles des clients.

**Acceptance Criteria:**

**Given** le catalogue est chargé
**When** je crée le modèle de données pour les objections
**Then** chaque produit/marque a minimum 5 objections types
**And** les objections principales incluent: "Trop cher", "Ça ne tourne pas chez moi", + 3 autres
**And** chaque objection a un script de réponse avec exemples concrets
**And** les objections varient selon canal (CHR, Traditional Trade) et type produit
**And** les objections sont stockées en IndexedDB
**And** les objections sont disponibles offline

### Story 4.4: Implémenter Section "Gérer les Objections" dans Fiche Produit

As a vendeur,
I want accéder rapidement aux réponses aux objections,
So that je peux répondre avec assurance pendant une conversation difficile.

**Acceptance Criteria:**

**Given** je consulte une fiche produit
**When** j'appuie sur le bouton "Gérer les objections"
**Then** une modal ou section s'ouvre avec les objections spécifiques à ce produit/marque
**And** l'objection "Prix trop élevé" est affichée en premier (plus courante)
**And** chaque objection a un script de réponse clair et concis
**And** les arguments chiffrés (marges, rotation) sont inclus
**And** je peux naviguer entre les objections facilement
**And** la section est accessible depuis le menu principal aussi

### Story 4.5: Permettre Adaptation Argumentaires selon Contexte Client

As a vendeur,
I want adapter les argumentaires selon mon type de client,
So that mon discours est toujours pertinent.

**Acceptance Criteria:**

**Given** je consulte un argumentaire
**When** je sélectionne le type de client (CHR, PSV, TT, MT)
**Then** les arguments sont adaptés au contexte sélectionné
**And** les arguments spécifiques au canal sont mis en avant
**And** les exemples concrets correspondent au type de client
**And** je peux basculer entre les contextes facilement
**And** le contexte sélectionné est mémorisé pour la session

### Story 4.6: Créer Arguments Comparatifs Prix et Notoriété BDC

As a vendeur,
I want des arguments sur le prix et la notoriété BDC,
So that je convaincs mes clients avec des faits concrets (retours terrain Mme Clarisse, M. Yves).

**Acceptance Criteria:**

**Given** je consulte les argumentaires
**When** j'accède aux arguments clés
**Then** un argument "Meilleur prix marché" est disponible avec comparaison concurrence
**And** un argument "Notoriété BDC - Leader camerounais depuis 1948" est mis en avant
**And** un argument "Qualité de service BDC - Livraison fiable et rapide" est inclus
**And** un argument "Large gamme de produits - Plus de 50 références" est présent
**And** les mots-clés récurrents sont intégrés: disponibilité, qualité, certification, meilleur prix
**And** des chiffres clés BDC sont fournis (parts de marché, nombre de clients, etc.)
**And** je peux personnaliser ces arguments selon le contexte client (CHR, PSV, TT, MT)

## Epic 5: Activations & Promotions avec Médias Offline

Les vendeurs proposent des activations gratuites avec visuels téléchargeables pour séduire les détaillants, avec gestion médias style Telegram.

### Story 5.1: Créer Modèle de Données Campagnes et Activations

As a vendeur,
I want consulter les campagnes promotionnelles en cours,
So that je peux proposer les offres actuelles aux clients.

**Acceptance Criteria:**

**Given** le système backend est configuré
**When** je crée le modèle de données pour les campagnes
**Then** chaque campagne contient: titre, description, dates, marque, visuels, conditions
**And** les campagnes sont stockées en IndexedDB pour accès offline
**And** je peux voir les campagnes actives filtrées par date
**And** les campagnes expirées sont archivées automatiquement
**And** je peux consulter les actualités et événements BDC
**And** les offres promotionnelles actives sont mises en avant

### Story 5.2: Implémenter Téléchargement Médias à la Demande Style Telegram

As a vendeur,
I want télécharger les visuels d'activations à la demande,
So that je contrôle ma consommation de données et mon espace de stockage.

**Acceptance Criteria:**

**Given** je consulte une campagne avec visuels
**When** je vois les visuels disponibles
**Then** une prévisualisation basse résolution s'affiche instantanément
**And** je peux télécharger la haute résolution en appuyant sur le visuel
**And** un indicateur de progression s'affiche pendant le téléchargement
**And** les visuels téléchargés sont stockés en cache pour accès offline
**And** je peux voir quels visuels sont déjà téléchargés (icône checkmark)
**And** le téléchargement fonctionne en arrière-plan

### Story 5.3: Créer Galerie Visuels Activations avec Formats Multiples

As a vendeur,
I want consulter différents types de visuels d'activations,
So that je peux montrer des exemples variés aux clients.

**Acceptance Criteria:**

**Given** une campagne a des visuels disponibles
**When** j'ouvre la galerie d'activations
**Then** je peux voir: photos activations réussies, plans techniques, rendus 3D (limité)
**And** les visuels sont organisés par catégorie (photos, plans, 3D)
**And** je peux zoomer sur les visuels pour voir les détails
**And** je peux partager un visuel (si fonctionnalité activée)
**And** la galerie est responsive et fluide (swipe gestures)
**And** tous les visuels téléchargés sont accessibles offline

### Story 5.4: Implémenter Gestion Cache Médias avec Compression Intelligente

As a vendeur,
I want gérer l'espace de stockage des médias,
So that je ne sature pas ma tablette.

**Acceptance Criteria:**

**Given** je télécharge des visuels
**When** les médias sont stockés en cache
**Then** la compression intelligente est appliquée (WebP, JPEG progressif) pour réduire la taille
**And** la qualité visuelle est préservée (compression avec perte minimale)
**And** la limite de cache par défaut est 500 MB (configurable)
**And** si la limite est atteinte, les médias les moins utilisés sont purgés automatiquement
**And** je peux voir l'espace utilisé par catégorie dans les paramètres
**And** la taille moyenne des médias respecte NFR-P8

### Story 5.5: Créer Paramètres Gestion Médias (Auto-téléchargement, Limites, Purge)

As a vendeur,
I want configurer comment les médias sont téléchargés,
So that je contrôle ma consommation de données mobiles.

**Acceptance Criteria:**

**Given** je suis dans les paramètres
**When** j'accède à la section "Gestion des médias"
**Then** je peux configurer l'auto-téléchargement: WiFi uniquement, WiFi + données mobiles, jamais
**And** je peux définir une limite maximale de cache pour les médias (100 MB à 2 GB)
**And** je peux vider le cache global ou par catégorie (visuels activations, photos produits)
**And** je vois la taille de chaque catégorie de médias en cache
**And** je vois l'espace total utilisé et disponible
**And** mes préférences sont sauvegardées en LocalStorage

### Story 5.6: Afficher Activations Gratuites comme Argument Commercial

As a vendeur,
I want mettre en avant que les activations sont gratuites,
So that j'utilise cet argument pour convaincre les détaillants.

**Acceptance Criteria:**

**Given** je consulte une campagne ou activation
**When** j'affiche les détails
**Then** un badge "GRATUIT" ou "Activation gratuite" est clairement visible
**And** les conditions de gratuité sont expliquées (offert aux détaillants)
**And** je peux montrer des exemples d'activations réussies
**And** l'argument de gratuité est inclus dans les scripts de vente
**And** les visuels montrent le rendu professionnel des activations

### Story 5.7: Créer Système d'Alertes Proactives et Nettoyage Intelligent Cache

As a vendeur,
I want être alerté avant que ma tablette soit saturée,
So that je peux gérer mon espace de stockage de manière proactive.

**Acceptance Criteria:**

**Given** le cache médias approche de la limite configurée
**When** j'utilise l'application
**Then** une alerte s'affiche quand le cache atteint 80% de la limite
**And** l'alerte propose des actions: vider cache ancien, augmenter limite, ou désactiver auto-téléchargement
**And** un système de nettoyage intelligent purge automatiquement les médias les moins utilisés
**And** les médias sont classés par score: fréquence d'accès × récence
**And** je peux voir quels médias seront purgés avant de confirmer
**And** les médias critiques (campagnes actives) ne sont jamais purgés automatiquement
**And** un rapport mensuel montre l'utilisation du cache et les optimisations possibles

### Story 5.8: Implémenter Retry Automatique et Fallback Local Médias

As a vendeur,
I want que les téléchargements de médias soient fiables,
So that je ne perds pas de temps avec des téléchargements échoués.

**Acceptance Criteria:**

**Given** je télécharge un visuel d'activation
**When** le téléchargement échoue (réseau instable, CDN down)
**Then** le système retry automatiquement 3 fois avec backoff exponentiel (1s, 2s, 4s)
**And** si tous les retries échouent, un fallback vers preview basse résolution est activé
**And** si le CDN est complètement down, un message clair informe l'utilisateur
**And** les téléchargements interrompus (connexion perdue à mi-parcours) reprennent automatiquement
**And** un indicateur montre le statut: "Téléchargement...", "Retry 2/3...", "Échec - Preview disponible"
**And** les téléchargements échoués sont mis en queue et retentés automatiquement au retour de connexion
**And** je peux forcer un retry manuel depuis les paramètres ("Retenter téléchargements échoués")

## Epic 6: Notifications & Synchronisation Intelligente

Les vendeurs sont toujours informés des nouveautés et leurs données restent à jour automatiquement sans intervention manuelle.

### Story 6.1: Configurer Web Push API et Firebase Cloud Messaging

As a vendeur,
I want recevoir des notifications push,
So that je suis informé des campagnes urgentes immédiatement.

**Acceptance Criteria:**

**Given** l'application PWA est installée
**When** je configure Web Push API avec Firebase Cloud Messaging
**Then** le système de notifications push est opérationnel
**And** je peux demander la permission notifications au moment pertinent (pas au lancement)
**And** l'explication de la valeur est claire ("Recevez les nouvelles campagnes")
**And** je peux accepter ou refuser les notifications
**And** les notifications fonctionnent même quand l'app est fermée
**And** la configuration respecte les bonnes pratiques PWA

### Story 6.2: Implémenter Badge "Nouveau" sur Contenu Mis à Jour

As a vendeur,
I want voir clairement quel contenu a été mis à jour,
So that je ne manque aucune nouveauté.

**Acceptance Criteria:**

**Given** du contenu a été synchronisé
**When** je consulte l'interface
**Then** un badge "nouveau" apparaît sur le contenu récemment mis à jour
**And** le badge est visible sur: campagnes, produits, argumentaires, objections
**And** le badge disparaît après consultation du contenu
**And** je peux voir la liste de tous les contenus "nouveaux" dans une section dédiée
**And** le badge est stylé selon le design system BDC
**And** le badge fonctionne offline (basé sur horodatage local)

### Story 6.3: Implémenter Notifications Push pour Campagnes Urgentes

As a vendeur,
I want être notifié immédiatement des campagnes urgentes,
So that je peux les proposer aux clients dès leur lancement.

**Acceptance Criteria:**

**Given** une nouvelle campagne urgente est publiée par un brand manager
**When** la campagne est validée côté backend
**Then** une notification push est envoyée à tous les vendeurs
**And** le titre de la notification est clair (ex: "Nouvelle promo Castel Beer")
**And** le message est concis et actionnable
**And** en tapant sur la notification, je suis redirigé vers la campagne
**And** la notification respecte les préférences utilisateur (activées/désactivées)
**And** toutes les campagnes sont considérées urgentes (selon PRD)

### Story 6.4: Créer Système de Rappels Synchronisation

As a vendeur,
I want être rappelé de synchroniser si je ne l'ai pas fait depuis longtemps,
So that mes données restent à jour.

**Acceptance Criteria:**

**Given** je n'ai pas synchronisé depuis X jours (configurable, défaut 7 jours)
**When** j'ouvre l'application
**Then** une notification ou message me rappelle de synchroniser
**And** le message indique depuis combien de temps je n'ai pas synchronisé
**And** je peux synchroniser directement depuis le message (bouton "Synchroniser")
**And** je peux reporter le rappel ("Plus tard")
**And** la fréquence des rappels est configurable dans les paramètres
**And** les rappels respectent les préférences utilisateur

### Story 6.5: Afficher Sections Récemment Modifiées

As a vendeur,
I want voir clairement quelles sections ont été modifiées,
So that je peux consulter les changements rapidement.

**Acceptance Criteria:**

**Given** du contenu a été synchronisé avec des modifications
**When** je consulte le menu ou tableau de bord
**Then** les sections récemment modifiées sont clairement indiquées (icône ou badge)
**And** je peux voir la date de dernière modification
**And** je peux filtrer pour voir uniquement les sections modifiées
**And** un résumé des modifications est disponible ("3 nouveaux produits, 2 campagnes")
**And** l'affichage est clair et non intrusif

### Story 6.6: Créer Paramètres Notifications (Activer/Désactiver)

As a vendeur,
I want gérer mes préférences de notifications,
So that je contrôle quelles notifications je reçois.

**Acceptance Criteria:**

**Given** je suis dans les paramètres
**When** j'accède à la section "Notifications"
**Then** je peux activer/désactiver les notifications push globalement
**And** je peux activer/désactiver par type: campagnes urgentes, rappels sync, nouveautés
**And** je peux configurer la fréquence des rappels de synchronisation
**And** mes préférences sont sauvegardées en LocalStorage
**And** les changements prennent effet immédiatement
**And** je vois un aperçu des notifications que je recevrai

### Story 6.7: Implémenter Validation Automatique Dates Campagnes

As a vendeur,
I want que les campagnes expirées soient clairement identifiées,
So que je ne propose jamais une promotion expirée à un client.

**Acceptance Criteria:**

**Given** une campagne a une date de fin
**When** la date actuelle dépasse la date de fin
**Then** la campagne est automatiquement grisée dans l'interface (calcul local, pas besoin de sync)
**And** un badge "EXPIRÉ" rouge s'affiche clairement sur la campagne
**And** si je tente d'ouvrir une campagne expirée, une alerte s'affiche: "Cette campagne est expirée depuis X jours"
**And** les campagnes expirées sont déplacées en bas de liste automatiquement
**And** je peux filtrer pour masquer les campagnes expirées (toggle "Masquer expirées")
**And** une notification me prévient 3 jours avant l'expiration d'une campagne que j'ai consultée récemment
**And** les campagnes expirées depuis > 30 jours sont archivées automatiquement

## Epic 7: Interface Admin Brand Managers

Les brand managers publient campagnes et activations en moins de 24h sans dépendance IT, avec autonomie totale sur leur section marque.

### Story 7.1: Configurer Backend Deno avec Hono Framework

As a développeur,
I want configurer le backend Deno pour l'API admin,
So that les brand managers peuvent gérer leur contenu.

**Acceptance Criteria:**

**Given** le projet frontend est initialisé
**When** je configure le backend Deno
**Then** Deno 2.x est installé et configuré
**And** Hono framework est configuré pour les routes API
**And** la structure backend suit l'architecture définie (api/routes, api/middleware, api/services)
**And** le serveur démarre et répond aux requêtes de base
**And** CORS est configuré pour autoriser le frontend
**And** le backend est déployable sur Vercel Edge Functions

### Story 7.2: Implémenter Authentification JWT pour Brand Managers

As a brand manager,
I want me connecter de manière sécurisée,
So that je peux accéder à l'interface admin.

**Acceptance Criteria:**

**Given** le backend Deno est configuré
**When** j'implémente l'authentification JWT
**Then** les brand managers peuvent se connecter avec email/mot de passe
**And** un JWT token est généré après authentification réussie
**And** le token a une expiration configurée (défaut 24h)
**And** un refresh token est fourni pour sessions longue durée (7 jours max, NFR-S2)
**And** le logout automatique après 30 min d'inactivité est implémenté
**And** les tokens sont stockés de manière sécurisée (httpOnly cookies ou localStorage)

### Story 7.3: Configurer Drizzle ORM et PostgreSQL pour Contenu Dynamique

As a développeur,
I want configurer la base de données pour le contenu dynamique,
So that les campagnes et actualités sont stockées de manière persistante.

**Acceptance Criteria:**

**Given** le backend Deno est configuré
**When** je configure Drizzle ORM avec PostgreSQL
**Then** la connexion à PostgreSQL est établie (Vercel Postgres ou Supabase)
**And** le schéma de base de données est défini pour: campagnes, actualités, événements, offres
**And** les migrations Drizzle sont configurées
**And** les queries type-safe fonctionnent via Drizzle ORM
**And** je peux créer, lire, mettre à jour et supprimer du contenu
**And** les relations entre tables sont correctement définies

### Story 7.4: Implémenter Permissions Granulaires par Marque (RBAC)

As a brand manager,
I want modifier uniquement ma section marque,
So that je ne peux pas modifier le contenu d'autres marques.

**Acceptance Criteria:**

**Given** un brand manager est authentifié
**When** j'implémente le système de permissions
**Then** chaque brand manager a des permissions limitées à ses marques assignées
**And** les permissions sont vérifiées côté serveur (pas uniquement frontend)
**And** toute tentative d'accès non autorisé est bloquée avec erreur 403
**And** un audit log enregistre toutes les modifications (qui, quoi, quand)
**And** le système RBAC est léger et performant
**And** les permissions sont stockées en base de données

### Story 7.5: Créer Interface Admin pour Gestion Campagnes

As a brand manager,
I want créer et gérer mes campagnes,
So that je peux diffuser rapidement les promotions aux vendeurs.

**Acceptance Criteria:**

**Given** je suis connecté à l'interface admin
**When** j'accède à la section "Mes Campagnes"
**Then** je peux créer une nouvelle campagne avec: titre, description, dates début/fin, marque
**And** je peux uploader des visuels pour la campagne (photos, plans, 3D)
**And** je peux éditer une campagne existante
**And** je peux supprimer une campagne (avec confirmation)
**And** je peux prévisualiser le rendu mobile avant publication
**And** l'interface est intuitive (prise en main < 15 min, NFR-M1)

### Story 7.6: Implémenter Upload Visuels avec CDN et Sécurité Renforcée

As a brand manager,
I want uploader des images et visuels de manière sécurisée,
So that les vendeurs peuvent les télécharger sans risque de sécurité.

**Acceptance Criteria:**

**Given** je crée ou édite une campagne
**When** j'uploade des visuels
**Then** les images sont uploadées vers un CDN (Vercel CDN)
**And** les formats supportés sont: JPEG, PNG, WebP, PDF (pour plans)
**And** la taille maximale par fichier est 10 MB
**And** validation serveur stricte: vérification MIME type réel (pas juste extension), scan antivirus
**And** les images sont automatiquement optimisées: WebP 85% qualité + JPEG progressif fallback
**And** génération automatique de thumbnails 100x100px pour preview rapide
**And** les URLs CDN sont signées avec expiration 7 jours (signed URLs) pour éviter hotlinking
**And** je vois une prévisualisation après upload
**And** je peux supprimer un visuel uploadé (suppression CDN + DB)
**And** les URLs des visuels sont stockées en base de données avec metadata (format, taille, hash)

### Story 7.7: Implémenter Publication Immédiate sans Workflow Validation

As a brand manager,
I want publier mes campagnes immédiatement,
So that les vendeurs sont informés en moins de 24h.

**Acceptance Criteria:**

**Given** j'ai créé une campagne complète
**When** j'appuie sur le bouton "Publier"
**Then** la campagne est publiée immédiatement sans workflow de validation
**And** une notification push est envoyée à tous les vendeurs
**And** la campagne apparaît dans l'app vendeurs après leur prochaine synchronisation
**And** je vois la date de publication et le statut "Publié"
**And** le time-to-market est < 24h (objectif 90 minutes, NFR-M1)
**And** je peux dépublier une campagne si nécessaire

### Story 7.8: Créer Sections Actualités, Événements et Offres Promotionnelles

As a brand manager,
I want gérer les actualités, événements et offres de ma marque,
So that les vendeurs ont toutes les informations à jour.

**Acceptance Criteria:**

**Given** je suis dans l'interface admin
**When** j'accède aux différentes sections
**Then** je peux créer/éditer/supprimer des actualités BDC
**And** je peux créer/éditer/supprimer des événements (dates, lieux, descriptions)
**And** je peux créer/éditer/supprimer des offres promotionnelles actives
**And** chaque type de contenu a son propre formulaire adapté
**And** je peux voir la date de dernière modification pour chaque élément
**And** toutes les sections suivent la même logique de permissions par marque

### Story 7.9: Implémenter Prévisualisation Mobile avant Publication

As a brand manager,
I want prévisualiser le rendu mobile de mes campagnes,
So that je vérifie que tout s'affiche correctement avant publication.

**Acceptance Criteria:**

**Given** j'ai créé une campagne
**When** j'appuie sur "Prévisualiser"
**Then** une fenêtre modale s'ouvre avec le rendu mobile exact
**And** je peux basculer entre portrait et paysage
**And** je peux tester sur différentes tailles d'écran (Samsung Tab 6)
**And** les visuels s'affichent comme ils apparaîtront aux vendeurs
**And** je peux fermer la prévisualisation et continuer l'édition
**And** la prévisualisation est fidèle à 100% au rendu final

### Story 7.10: Implémenter Onboarding Guidé et Tooltips Contextuels Admin

As a brand manager,
I want être guidé lors de ma première utilisation,
So que je suis opérationnel en moins de 15 minutes sans formation.

**Acceptance Criteria:**

**Given** je me connecte pour la première fois à l'interface admin
**When** j'arrive sur le dashboard
**Then** un guided tour interactif se lance automatiquement
**And** le tour explique les 5 actions principales: créer campagne, uploader visuels, prévisualiser, publier, gérer permissions
**And** je peux sauter le tour ou le reprendre plus tard depuis les paramètres
**And** des tooltips contextuels s'affichent au survol des boutons importants
**And** un centre d'aide intégré est accessible via icône "?" avec FAQ et vidéos courtes
**And** les tooltips disparaissent après 3 utilisations de la fonctionnalité (progressive disclosure)
**And** documentation Deno/Hono intégrée pour l'équipe technique (fallback Node.js si blocage)
**And** le temps de prise en main est < 15 minutes pour 90% des brand managers (NFR-M1)

### Story 7.11: Implémenter Refresh Silencieux JWT et Révocation Tokens

As a brand manager,
I want rester connecté sans interruption,
So que je ne suis jamais déconnecté brutalement pendant mon travail.

**Acceptance Criteria:**

**Given** je suis connecté à l'interface admin
**When** mon JWT token approche de l'expiration (5 min avant)
**Then** un refresh automatique et silencieux du token est déclenché en arrière-plan
**And** le refresh utilise le refresh token stocké de manière sécurisée
**And** si le refresh échoue, une alerte discrète propose de se reconnecter (pas de déconnexion brutale)
**And** au logout, le token est révoqué côté serveur (ajouté à une blacklist)
**And** la blacklist tokens est stockée en Redis avec TTL = durée expiration token
**And** toute requête avec token révoqué est rejetée avec erreur 401
**And** les tokens compromis peuvent être révoqués manuellement par un admin
**And** un audit log enregistre tous les refreshs et révocations de tokens

### Story 7.12: Implémenter Système Rollback Campagne Brand Manager

As a brand manager,
I want pouvoir dépublier une campagne rapidement si j'ai fait une erreur,
So que je corrige mes erreurs sans dépendre de l'IT.

**Acceptance Criteria:**

**Given** j'ai publié une campagne
**When** je réalise qu'il y a une erreur (visuel incorrect, dates erronées)
**Then** je peux dépublier la campagne en 1 clic depuis le dashboard
**And** la dépublication est immédiate (< 5 secondes)
**And** une notification push est envoyée aux vendeurs: "Campagne X retirée temporairement"
**And** la campagne disparaît de l'app vendeurs après leur prochaine sync
**And** je peux modifier la campagne dépubliée et la republier
**And** un historique des publications/dépublications est conservé (audit log)
**And** je peux voir combien de vendeurs ont consulté la campagne avant dépublication
**And** une confirmation est demandée avant dépublication ("Êtes-vous sûr ?")

### Story 7.13: Ajouter Gestion Procédures Commerciales et Répartition Produits

As a vendeur,
I want consulter les procédures commerciales et la répartition des produits,
So that j'explique clairement les modalités aux clients (retour terrain M. Maurice SAAH).

**Acceptance Criteria:**

**Given** je suis dans l'application
**When** j'accède à la section "Procédures commerciales"
**Then** une explication claire des procédures de commande est disponible
**And** la répartition des produits est détaillée (ex: "5 palettes disponibles, 10 casiers de bières")
**And** les modalités de livraison sont expliquées (délais, zones, conditions)
**And** un guide de recontact client est fourni ("Rappeler le client pour confirmer son engagement")
**And** des templates de scripts de confirmation sont disponibles
**And** je peux partager ces procédures avec le client (PDF ou lien)
**And** les procédures sont mises à jour par les brand managers depuis l'interface admin

## Epic 8: Testing & Quality Assurance

L'équipe de développement garantit la qualité, performance et sécurité de l'application avec une couverture de tests > 70% du code critique.

### Story 8.1: Setup Vitest et Playwright pour Tests Automatisés

As a développeur,
I want configurer les frameworks de tests,
So that je peux écrire des tests unitaires et E2E.

**Acceptance Criteria:**

**Given** le projet Vite + Preact est initialisé
**When** je configure Vitest et Playwright
**Then** Vitest est configuré pour tests unitaires (compatible Vite, HMR pour tests)
**And** Playwright est configuré pour tests E2E (Chrome, Firefox, Safari)
**And** la structure de dossiers tests est créée: __tests__/unit, __tests__/e2e, __tests__/integration
**And** les scripts npm sont configurés: npm test, npm run test:e2e, npm run test:coverage
**And** le coverage reporter est configuré (Istanbul) avec seuil minimum 70%
**And** les tests s'exécutent en CI/CD (GitHub Actions ou Vercel)
**And** les tests E2E utilisent des fixtures pour données de test

### Story 8.2: Implémenter Tests Performance Automatisés

As a développeur,
I want tester automatiquement les performances,
So that je garantis le respect des NFRs de performance.

**Acceptance Criteria:**

**Given** l'application est déployée
**When** je configure les tests de performance
**Then** Lighthouse CI est configuré avec seuils: FCP < 1.5s, LCP < 2.5s, TTI < 3s (NFR-P2)
**And** des tests custom mesurent: temps de recherche (< 5s), temps de sync (< 30s), FPS scroll (60 FPS)
**And** les tests de performance s'exécutent à chaque déploiement
**And** les résultats sont trackés dans le temps (dashboard performance)
**And** une alerte est levée si régression > 20% sur une métrique
**And** les tests incluent: chargement initial, recherche 1000 produits, scroll catalogue, sync complète

### Story 8.3: Implémenter Tests Sécurité OWASP

As a développeur,
I want tester automatiquement la sécurité,
So that je détecte les vulnérabilités avant la production.

**Acceptance Criteria:**

**Given** l'interface admin et l'API backend sont développées
**When** je configure les tests de sécurité
**Then** les tests OWASP Top 10 sont automatisés: injection SQL, XSS, CSRF, broken auth
**And** les tests vérifient les permissions RBAC (brand manager ne peut pas modifier autre marque)
**And** les tests vérifient la validation des uploads (MIME type, taille, scan antivirus)
**And** les tests vérifient l'expiration des JWT tokens et refresh tokens
**And** les tests vérifient les signed URLs CDN (expiration, signature valide)
**And** un scan de dépendances détecte les vulnérabilités (npm audit, Snyk)
**And** les tests de sécurité s'exécutent en CI/CD avec rapport détaillé

### Story 8.4: Implémenter Tests Offline et Résilience

As a développeur,
I want tester le comportement offline et la résilience,
So that je garantis NFR-R1 (100% offline) et NFR-R5 (gestion erreurs).

**Acceptance Criteria:**

**Given** l'application PWA est développée
**When** je configure les tests de résilience
**Then** les tests simulent perte de connexion pendant: navigation, recherche, sync
**And** les tests vérifient que l'app reste utilisable 100% offline après premier chargement
**And** les tests simulent cache IndexedDB corrompu et vérifient la récupération
**And** les tests simulent échec de migration de schéma et vérifient le rollback
**And** les tests vérifient les 3 tentatives avec backoff exponentiel pour sync (NFR-R2)
**And** les tests vérifient que les erreurs JavaScript ne bloquent pas l'app (NFR-R5)
**And** les tests incluent: Service Worker offline, IndexedDB quota exceeded, réseau 2G lent

---

**Document Status:** Epics et Stories complétés avec Advanced Elicitation + Retours Terrain Vendeurs
**Total:** 8 Epics, 72 User Stories
**Couverture:** 73 FRs + 30+ NFRs + Additional Requirements + Retours Terrain (4 chefs de secteur)
**Retours Terrain Intégrés:**
- M. Maurice SAAH (Ouest-Dschang): Procédures, répartition produits, recontact client
- M. Michel TJOMB (Centre-Mvan): Certifications ISO, conseils conservation, qualité
- Mme Clarisse TEMGOUA (Littoral-Akwa): Notoriété BDC, service, gamme large
- M. Yves Prosper MBELLA EPEE (Ouest-Bafoussam): Prix marché, caractéristiques produits
