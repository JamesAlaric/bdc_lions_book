---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-e-01-discovery
  - step-e-02-review
  - step-e-03-edit
inputDocuments:
  - /Users/macbook/Documents/SABC/lions_book/_bmad-output/planning-artifacts/product-brief-lions_book-2026-01-22.md
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/alcools-mix.yaml
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/argumentaires-example.yaml
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/bieres-complete.yaml
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/bieres.yaml
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/boissons-gazeuses.yaml
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/eaux.yaml
  - /Users/macbook/Documents/SABC/lions_book/data/static/catalog/all_products_extracted.json
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 7
classification:
  projectType: "Progressive Web App (PWA)"
  domain: "Sales Enablement / Field Force Automation"
  complexity: "Medium"
  projectContext: "greenfield"
workflowType: 'prd'
workflow: 'edit'
project_name: lions_book
user_name: Jay
date: 2026-01-26
lastEdited: 2026-01-28
editHistory:
  - date: 2026-01-28
    changes: "Intégration insights terrain 4 chefs secteur - Hiérarchie arguments terrain (Disponibilité, Qualité, Prix prioritaires), Nouvelles sections Conservation et Caractéristiques techniques, Structure fiche produit alignée feedback vendeurs"
  - date: 2026-01-28
    changes: "Intégration découvertes terrain - Executive Summary ajouté, Objections variables par canal/produit, Argumentaires basés marques, Visuels téléchargeables, Activations gratuites, Campagnes urgentes, Tracking conversion clarifié, Gestion médias style Telegram, Journey Marcel corrigé (CA externe), 73 FRs + 1 NFR ajoutés"
---

# Product Requirements Document - lions_book

**Author:** Jay
**Date:** 2026-01-26

## Executive Summary

### Vision

Lions' Book transforme les vendeurs terrain de BDC en experts produit instantanés grâce à une PWA mobile-first qui donne accès à l'information critique en < 5 secondes, 100% offline. Chaque vendeur, novice ou expérimenté, urbain ou rural, dispose du même niveau d'expertise au moment crucial de la négociation avec un client.

### Problem Statement

500 vendeurs BDC au Cameroun sont désavantagés face aux clients par:
- Information éparpillée dans fichiers Excel obsolètes et non accessibles
- Nouveaux vendeurs perdus pendant 3-4 semaines sans support terrain
- Zones rurales coupées de l'information par connectivité intermittente
- Brand managers incapables de diffuser campagnes rapidement (1 semaine vs besoin temps réel)

Le coût: Taux de conversion stagne à 10%, turnover élevé, opportunités commerciales perdues.

### Target Users

**Marcel (Vendeur Expérimenté)** - 35 ans, 8 ans chez BDC, visite 15-20 clients/jour zone urbaine. Besoin: Accès instantané infos à jour pour négocier avec assurance.

**Aminata (Nouvelle Vendeuse)** - 24 ans, 3 mois chez BDC, 8-10 visites/jour. Besoin: Monter en compétence rapidement, confiance face aux clients.

**Éric (Vendeur Rural)** - 42 ans, 10 ans expérience, 10-12 clients/jour zones rurales. Besoin: Même niveau d'information que collègues urbains malgré connexion intermittente.

**Sophie (Brand Manager)** - 32 ans, responsable 2-3 marques. Besoin: Diffuser campagnes aux 500 vendeurs en < 24h sans dépendance IT.

### Key Differentiators

1. **Offline-First Radical** - 100% des fonctionnalités accessibles sans connexion, performance identique zones urbaines/rurales
2. **UX Émotionnelle B2B** - Interface avec âme (Folk design + Néo-minimalisme + Bento grid) qui donne envie d'utiliser l'app
3. **Time-to-Market 90 Minutes** - Brand managers publient campagnes en 90 minutes vs 1 semaine (112x plus rapide)
4. **Prise en Main Instantanée** - < 5 minutes pour être opérationnel, zéro formation nécessaire

### Success Definition

**MVP (31 Janvier 2026):** 80%+ adoption à 1 mois, NPS > 50, prise en main < 5 min, recherche < 5 sec, performance identique online/offline.

**Business Impact (3 mois):** +20% taux de conversion (10% → 12%), standardisation 100%, montée en compétence 2x plus rapide.

**Vision (2-3 ans):** Plateforme de référence pour équipes commerciales terrain en Afrique, expansion régionale (Côte d'Ivoire, Sénégal), white-label pour autres distributeurs.

## Success Criteria

### User Success

**Critère fondamental : Le moment "Aha!"**
Le succès utilisateur se mesure quand Marcel, Aminata ou Éric réalisent que l'app leur donne un avantage concurrentiel immédiat face au client.

**Métriques par persona :**

**Marcel (Vendeur Expérimenté) :**
- Temps de recherche d'information < 5 secondes pour 90% des requêtes
- Utilisation quotidienne : 80%+ des vendeurs
- Score NPS > 50
- Fréquence : 1-2 consultations par vendeur par jour

**Aminata (Nouvelle Vendeuse) :**
- Temps de montée en compétence réduit de 50% (12h → 6h de formation)
- Autonomie opérationnelle en < 5 minutes de prise en main
- Taux de rétention 90%+ après 1 mois
- Confiance renforcée : réduction situations d'embarras face clients

**Éric (Vendeur Rural Offline) :**
- Disponibilité offline : 100% des fonctionnalités accessibles sans connexion
- Taux de synchronisation > 95% quand connexion disponible
- Équité d'accès : même niveau de performance que vendeurs urbains
- Aucune frustration liée à la connectivité

**Sophie (Brand Manager) :**
- Time-to-market campagne < 24h entre publication et utilisation terrain
- Taux d'adoption contenu : 80%+ des vendeurs consultent nouvelles campagnes
- Autonomie publication : 0 dépendance IT pour mises à jour courantes
- Fraîcheur contenu : 100% des vendeurs ont accès aux infos les plus récentes

### Business Success

**Objectifs à 3 mois (post-lancement MVP) :**
1. **Adoption massive** : 80%+ de l'équipe terrain (~400/500 vendeurs) utilise quotidiennement
2. **Standardisation discours** : 100% des vendeurs utilisent les argumentaires standardisés
3. **Efficacité terrain** : Réduction de 70% du temps de recherche d'information
4. **Performance commerciale** : +20% de taux de conversion prospects → clients (10% → 12%)

**Objectifs à 12 mois :**
1. **Adoption totale** : 100% de l'équipe terrain active quotidiennement
2. **Formation accélérée** : Nouveaux vendeurs opérationnels en 1 semaine vs 3-4 semaines actuellement
3. **Message unifié** : Cohérence des messages commerciaux sur tout le territoire
4. **Conversion** : +50% de taux de conversion (10% → 15%)
5. **Agilité marketing** : Capacité à lancer campagnes nationales en < 24h vs plusieurs semaines

**ROI Démontré Par :**
- Message commercial standardisé à 100%
- 100% d'adoption de l'équipe terrain
- Réduction 50% du temps de formation (12h → 6h)
- Amélioration taux de conversion (+20% à 3 mois, +50% à 12 mois)

### Technical Success

**Performance :**
- Temps de recherche < 5 secondes pour 90% des recherches
- Taux de succès recherche : 95%+ des recherches aboutissent
- Performance offline : Temps de chargement identique online/offline
- Temps de chargement initial < 2 secondes

**Fiabilité :**
- Disponibilité : < 1% d'erreurs techniques
- Taux de synchronisation : > 95% de syncs réussies
- Mode offline robuste : Fonctionne parfaitement en zones rurales
- Alertes données anciennes : Notification après 1 mois sans sync

**Scalabilité :**
- Support ~500 vendeurs simultanés
- 500 consultations/jour en pic sans dégradation
- Gestion catalogue complet BDC (Bières, Soft, Eaux, Vins & Spiritueux)

**Expérience :**
- Prise en main < 5 minutes pour nouveaux utilisateurs
- 0 formation nécessaire (interface ultra intuitive)
- Interface avec âme qui donne envie de revenir

### Measurable Outcomes

**Adoption (1 mois post-lancement) :**
- 80%+ de l'équipe terrain utilise quotidiennement
- 500 consultations/jour en pic
- Taux de rétention 90%+ après 1 mois
- Prise en main instantanée < 5 minutes

**Engagement :**
- Fréquence : 1-2 consultations par vendeur par jour
- Taux de retour : 70%+ reviennent quotidiennement
- Utilisation favoris : 50%+ créent des favoris
- Recherches par session : 2-3 en moyenne

**Impact Business :**
- Nouveaux vendeurs : Montée en compétence 2x plus rapide
- Brand Managers : Mises à jour publiées et synchronisées < 24h
- Standardisation : 100% utilisent argumentaires standardisés
- Conversion : +20% à 3 mois (10% → 12%)

**Signal Go/No-Go pour V2 :**
- ✅ **GO V2** : Si adoption > 80% ET feedback positif → Développer Merchandising & Téléchargeables dans 2 semaines
- ⚠️ **PAUSE** : Si adoption 50-80% → Optimiser UX/contenu avant V2
- ❌ **PIVOT** : Si adoption < 50% → Revoir fondamentaux avant d'ajouter features

## Product Scope

### MVP - Minimum Viable Product (Deadline : 31 Janvier 2026)

**Fonctionnalités Core :**

1. **Catalogue Produits Complet**
   - Toutes les marques BDC (Bières, Soft, Eaux, Vins & Spiritueux)
   - **Hiérarchie arguments terrain** (basée sur feedback 4 chefs secteur) :
     1. **Disponibilité** (100% vendeurs) : Stock, délais livraison, rotation
     2. **Qualité certifiée** (100% vendeurs) : ISO 9001, certifications, standards
     3. **Prix compétitif** (50% vendeurs) : Prix détaillant + Marges négociation
     4. **Large gamme BDC** (50% vendeurs) : Diversité catalogue, complémentarité
     5. **Service BDC** (50% vendeurs) : Notoriété, qualité service
   - **Conseils conservation** (nouveau - demande terrain) : Température, durée, stockage, merchandising
   - **Caractéristiques techniques** (nouveau - demande terrain) : Ingrédients, valeurs nutritionnelles, process fabrication
   - Historique marque et positionnement
   - Fiches produits parfaitement agencées selon priorités terrain
   - Design qui met les éléments dans le champ de l'œil

2. **Argumentaires de Vente**
   - Argumentaires structurés par marque (source principale)
   - **Arguments terrain prioritaires** (ordre validé par 4 chefs secteur) :
     - Disponibilité & livraison (argument #1 universel)
     - Qualité & certifications (argument #2 universel)
     - Prix & marges (argument business)
     - Large gamme & complémentarité
     - Service & notoriété BDC
   - Vendeurs adaptent argumentaires marques selon contexte client
   - Arguments clés hiérarchisés selon feedback terrain
   - **Mots-clés terrain intégrés** : "disponibilité", "qualité", "certification", "meilleur prix", "large gamme"
   - **Note:** Pas de segmentation stricte par canal - vendeurs se basent sur argumentaires marques et les personnalisent

3. **Gestion des Objections**
   - Objections basées sur recueil d'arguments existant BDC
   - Objections principales : "Trop cher", "Ça ne tourne pas chez moi"
   - Objections varient selon canal (CHR vs Traditional Trade) et type de produit (bières vs soft drinks)
   - Réponses définies par vendeurs expérimentés, évoluent selon feedback terrain
   - Scripts de réponse avec exemples concrets
   - **Note MVP:** Contenu initial basé sur interviews vendeurs pour capturer objections réelles et réponses éprouvées

4. **Recherche Instantanée & Navigation**
   - Moteur de recherche performant (< 5 secondes)
   - Recherche par produit, marque, catégorie, mot-clé
   - Filtres avancés : canal, type client, gamme de prix
   - Suggestions et recherche prédictive
   - Historique de recherche
   - Favoris pour accès rapide ⭐

5. **Mode Offline Robuste**
   - Fonctionnement complet sans connexion (critique pour zones rurales)
   - Synchronisation quotidienne recommandée
   - Alerte après 1 mois sans sync
   - Horodatage visible pour fraîcheur données
   - Cache intelligent : sélectif par marque/catégorie + option globale
   - Sync automatique dès connexion disponible

6. **Activations & Promotions**
   - Campagnes en cours accessibles temps réel
   - **Visuels téléchargeables** pour proposer décorations marque (argument commercial clé)
   - **Activations gratuites** offertes aux détaillants (valeur ajoutée majeure)
   - Formats : Photos, plans techniques, rendus 3D (limité)
   - Galerie d'exemples d'activations réussies
   - **Gestion médias style Telegram** : Téléchargement à la demande, cache intelligent, compression qualité
   - Paramètres de gestion : Auto-téléchargement (WiFi/données), limite cache médias, vider cache par catégorie
   - Optimisation pour téléchargement et affichage offline
   - Fréquence typique : 1-2 campagnes par marque par an, durée max 3 mois
   - Notification immédiate : Toutes les campagnes sont urgentes, vendeurs informés dès validation

7. **Interface Admin Brand Managers**
   - Accès sécurisé pour responsables marketing
   - Modification de leur section marque uniquement (permissions par marque)
   - Upload d'images et visuels pour activations
   - Publication immédiate (pas de workflow validation)
   - Gestion actualités, campagnes, événements, offres promotionnelles

8. **Système de Notifications**
   - Badge "nouveau" quand contenu mis à jour
   - Notifications push pour campagnes urgentes
   - Rappels si vendeur n'a pas synchronisé depuis X jours
   - Indication claire des sections récemment modifiées

**Architecture Technique :**
- PWA Android (Samsung Tab 6)
- Pas d'authentification pour consultation catalogue
- Authentification requise uniquement pour édition (brand managers)
- Contenu statique via passerelle (prix/marges)
- Contenu dynamique en BD (actualités, campagnes, promotions)
- ~500 vendeurs, 500 consultations/jour en pic

**Expérience Utilisateur Optimisée (Différenciateur Clé) :**
- **UX optimisée dès le MVP** - Interface finalisée au lancement, ajustements uniquement selon retours utilisateurs
- Style visuel : Folk design + Néo-minimalisme + Bento grid
- Interface ultra belle aux couleurs BDC (70% blanc, 20% jaune #ffc627, 10% rouge #ff7323f)
- Navigation ultra fluide sans friction
- Prise en main ultra intuitive - Zéro formation nécessaire
- Design qui met les éléments dans le champ de l'œil
- Interface avec âme qui donne envie de revenir

**Moment "Aha!" du MVP :**
Quand Aminata ou Marcel découvrent que la fiche produit est parfaitement agencée, avec une interface ultra intuitive qui met les éléments recherchés exactement où ils en ont besoin, dans une navigation fluide et une prise en main instantanée.

### Growth Features (Post-MVP - V2 dans 2 semaines après lancement)

**Merchandising & Planogrammes :**
- Règles de merchandising par canal
- Planogrammes visuels pour agencement produits
- Menu visible dans MVP mais grisé avec mention "Bientôt disponible"

**Outils Téléchargeables :**
- Bibliothèque d'assets marketing téléchargeables
- Packshots haute résolution
- Logos et éléments de marque
- PLV (Publicité sur Lieu de Vente)
- Section visible dans menus MVP avec état "À venir"

**Analytics Avancés :**
- Tracking individuel par vendeur
- Analytics détaillés par brand manager
- Données terrain remontées aux managers
- Dashboards de consultation

**Personnalisation Visuels :**
- Annotation ou personnalisation des visuels par vendeurs
- Édition d'images dans l'app

### Vision (Future - 6-24 mois)

**Court Terme (6-12 mois - V3+) :**
- **Note:** Tracking conversion géré par outil séparé existant - Lion's Book se concentre sur sales enablement, pas tracking ventes
- Gamification : Badges, classements, récompenses
- Formation intégrée : Vidéos produits, quiz de certification
- Communauté vendeurs : Partage de best practices, forum d'entraide

**Moyen Terme (12-24 mois - Écosystème) :**
- CRM intégré : Historique client, notes de visite, suivi prospects
- Gestion stocks : Visibilité temps réel des stocks distributeurs
- Prise de commandes : Commandes directement depuis l'app
- BI & Reporting : Dashboards pour managers, prévisions ventes
- IA contextuelle : Recommandations intelligentes

**Long Terme (2-3 ans - Plateforme Régionale) :**
- Expansion géographique : Déploiement autres pays (Côte d'Ivoire, Sénégal, etc.)
- White-label : Solution packagée pour autres entreprises de distribution
- Marketplace partenaires : Intégration fournisseurs, services tiers
- Intelligence collective : Machine learning sur meilleures pratiques de vente
- Écosystème ouvert : API pour intégrations tierces, plugins communautaires

**Vision Transformationnelle :**
Lions' Book devient la plateforme de référence pour les équipes commerciales terrain en Afrique, transformant chaque vendeur en expert produit connecté et performant.

## User Journeys

### Journey 1 : Marcel négocie avec un détaillant (CHR)

**Persona :** Marcel - Vendeur Terrain Expérimenté
- 35 ans, 8 ans d'expérience chez BDC
- Connaît bien les produits mais a besoin d'infos à jour
- Visite 15-20 clients par jour en zone urbaine (Douala/Yaoundé)
- Équipé d'une tablette Samsung Tab 6

**Contexte :** Mardi après-midi, Marcel visite un bar-restaurant qui hésite à référencer une nouvelle bière premium. Le gérant est sceptique sur le prix et la rotation potentielle.

**Opening Scene - Le défi :**
Marcel entre dans le bar "Chez Pauline" à 14h30. Le gérant, Paul, est derrière son comptoir. Marcel lui présente la nouvelle bière premium. Paul fronce les sourcils : "Votre bière est trop chère pour ma clientèle. Ça ne va pas tourner chez moi."

**Rising Action - La recherche :**
1. Marcel sort sa tablette et ouvre Lions' Book
2. Recherche instantanée : tape le nom de la marque
3. Accède à la fiche produit complète en 3 secondes
4. Affiche l'historique de la marque, le positionnement, les prix et les marges
5. Navigue vers la section "Objections > Prix"
6. Trouve les arguments clés et le script de réponse adapté au CHR

**Climax - Le moment décisif :**
Marcel connaît son client : bon CA, emplacement stratégique (centre-ville), les bières premium s'écoulent bien ici. Il sait exactement comment positionner son offre grâce à Lions' Book.

"Regardons ensemble la marge que vous réalisez. Vous achetez à 8300 FCFA et vendez à 9000 FCFA le casier. Marge de 700 FCFA, soit 12.3%. Et regardez..." Il swipe vers les visuels d'activation et télécharge les photos pour les montrer. "On vous offre toute cette décoration de marque **gratuitement** pour mettre en valeur votre espace. Zéro coût pour vous."

Paul se penche, intéressé. "Gratuit? Vraiment?" Les visuels sont attrayants, professionnels. L'argument de gratuité fait la différence.

**Resolution - La transformation :**
Paul commande 5 casiers pour tester. Marcel note la commande, satisfait. En sortant, il pense : "Sans Lions' Book, j'aurais perdu cette vente. L'app m'a donné exactement les bons arguments au bon moment."

**Valeur créée :** Vente conclue grâce à l'accès instantané aux bons arguments, aux marges précises et aux visuels d'activation. Marcel a converti un prospect sceptique en client.

**Capacités révélées par ce journey :**
- Recherche instantanée performante (< 5 secondes)
- Fiches produits complètes avec prix et marges
- Gestion des objections par canal (CHR)
- Visuels d'activations accessibles offline
- Navigation fluide entre sections

### Journey 2 : Aminata prépare sa journée de visites

**Persona :** Aminata - Nouvelle Vendeuse en Formation
- 24 ans, 3 mois chez BDC
- Motivée mais submergée par la quantité d'informations à mémoriser
- Visite 8-10 clients par jour, souvent accompagnée d'un senior
- Besoin de monter en compétence rapidement

**Contexte :** Lundi matin 7h30, Aminata prépare sa première semaine de visites en autonomie. Elle a 8 visites prévues dont 3 nouveaux prospects. Elle est anxieuse.

**Opening Scene - L'anxiété :**
Aminata se réveille avec un nœud au ventre. Aujourd'hui, c'est son premier jour seule, sans son mentor. Elle a la liste de ses 8 clients, mais elle ne se souvient pas de tous les argumentaires. "Et s'ils me posent une question que je ne sais pas répondre ?"

**Rising Action - La préparation :**
1. **7h45** - Aminata ouvre Lions' Book sur sa tablette
2. **Synchronisation automatique** - Badge "nouveau" sur 2 campagnes lancées ce week-end
3. **Découverte** - "Oh, il y a une nouvelle promotion sur Castel Beer !"
4. **Consultation** - Elle lit les fiches des 5 produits qu'elle va proposer aujourd'hui
5. **Favoris** - Elle marque les argumentaires clés en favoris pour accès rapide
6. **Scripts** - Elle relit les réponses aux objections "Trop cher" et "Ça ne tourne pas"
7. **Confiance** - "OK, je suis prête. J'ai tout sous la main."

**Climax - Le test terrain :**
10h30, première visite. Le gérant d'un snack lui demande : "Pourquoi je prendrais Beaufort plutôt que la concurrence ?" 

Aminata sourit, sort sa tablette. En 10 secondes, elle affiche la fiche Beaufort avec les arguments par canal PSV. Elle lit avec assurance : "Beaufort vous offre une marge de 15.3%, c'est 3 points de plus que la moyenne. Et regardez, rotation rapide garantie."

Le gérant est impressionné par son professionnalisme.

**Resolution - La transformation :**
Fin de journée, 17h30. Aminata a converti 2 prospects sur 3. Elle se sent confiante, compétente. "Lions' Book, c'est comme avoir mon mentor dans ma poche. Je ne suis plus seule."

**Valeur créée :** Montée en compétence accélérée, confiance renforcée, autonomie opérationnelle. Aminata est passée de l'anxiété à l'assurance en une journée.

**Capacités révélées par ce journey :**
- Synchronisation automatique au démarrage
- Système de notifications (badge "nouveau")
- Favoris pour accès rapide
- Fiches produits avec argumentaires par canal
- Scripts de réponse aux objections
- Interface intuitive (prise en main < 5 minutes)

### Journey 3 : Éric en zone rurale sans connexion

**Persona :** Éric - Vendeur Rural Offline
- 42 ans, 10 ans d'expérience
- Couvre des zones rurales avec connexion internet intermittente
- Visite 10-12 clients par jour avec de longs trajets entre chaque
- Doit être autonome sans connexion pendant plusieurs jours

**Contexte :** Mardi matin, Éric part pour 3 jours de tournée en zone rurale. Il sait qu'il n'aura pas de connexion internet pendant tout ce temps.

**Opening Scene - Le départ :**
6h00, bureau BDC de Bafoussam. Éric connecte sa tablette au WiFi du bureau. Lions' Book se synchronise automatiquement. "Dernière sync : il y a 2 minutes. Toutes les données à jour." Il sourit. "Parfait, je suis paré."

**Rising Action - En zone blanche :**
1. **7h30** - Éric quitte la ville, prend la route de brousse
2. **8h00** - Le signal 4G disparaît. Sa tablette affiche "Mode Offline"
3. **9h15** - Première visite dans un village. Éric ouvre Lions' Book
4. **Surprise** - L'app fonctionne parfaitement, comme s'il était en ligne
5. **Recherche** - Il cherche "Manyan 65cl", résultat instantané
6. **Navigation** - Toutes les infos sont là : prix, marges, argumentaires, objections
7. **Confiance** - "C'est exactement comme au bureau. Aucune différence."

**Climax - L'égalité retrouvée :**
Jeudi après-midi, 3ème jour de tournée. Éric visite un bar isolé. Le gérant est difficile, pose beaucoup de questions techniques sur les produits. 

Éric utilise Lions' Book comme ses collègues urbains : recherche instantanée, fiches détaillées, réponses aux objections. Le gérant est impressionné par son professionnalisme. "Tu es aussi bien équipé que les vendeurs de Douala !"

Éric sourit. "Oui, maintenant on a les mêmes outils."

**Resolution - La transformation :**
Vendredi 16h, retour au bureau. Lions' Book se synchronise automatiquement. "Sync réussie : 3 jours de données synchronisées." 

Éric pense : "Avant, j'étais désavantagé par rapport aux collègues urbains. Maintenant, on est à égalité. Lions' Book fonctionne partout, même en brousse."

**Valeur créée :** Équité d'accès à l'information, performance maintenue en zone blanche, aucune frustration liée à la connectivité. Éric a le même niveau de service que les vendeurs urbains.

**Capacités révélées par ce journey :**
- Mode offline robuste (100% des fonctionnalités)
- Synchronisation automatique intelligente
- Horodatage visible de la dernière sync
- Performance identique online/offline
- Cache complet du catalogue
- Sync automatique au retour de connexion

### Journey 4 : Sophie lance une nouvelle campagne

**Persona :** Sophie - Brand Manager Marketing
- 32 ans, responsable de 2-3 marques du portefeuille BDC
- Crée les campagnes et activations
- Besoin de diffuser rapidement les nouveautés aux vendeurs terrain

**Contexte :** Jeudi matin, Sophie doit lancer une promotion flash sur Isenbeck pour le week-end. Elle a 48h pour que 500 vendeurs soient informés et équipés.

**Opening Scene - L'urgence :**
9h00, bureau marketing BDC Douala. Sophie reçoit un email de sa direction : "Promotion flash Isenbeck ce week-end. Objectif : +30% de ventes. Briefez le terrain d'ici demain soir."

**Toutes les campagnes sont urgentes chez BDC.** La direction valide, Sophie doit diffuser immédiatement. Avant Lions' Book, ça prenait 1 semaine minimum. Sophie stresse.

**Rising Action - La création :**
1. **9h30** - Sophie prépare les visuels de la campagne (affiches, PLV)
2. **10h00** - Elle rédige l'argumentaire promotionnel
3. **10h30** - Elle se connecte à l'interface admin de Lions' Book
4. **Navigation** - Section "Ma Marque > Isenbeck > Promotions"
5. **Upload** - Elle uploade les 5 visuels de campagne
6. **Rédaction** - Elle saisit l'argumentaire dans l'éditeur
7. **Prévisualisation** - Elle vérifie le rendu sur mobile
8. **Publication** - Un clic sur "Publier"

**Climax - La diffusion instantanée :**
11h00, Sophie clique sur "Publier". Un message de confirmation s'affiche : "Campagne publiée avec succès. 500 vendeurs seront notifiés à leur prochaine synchronisation."

Elle sourit. "C'est fait. En 90 minutes."

12h00, les premiers vendeurs synchronisent leur tablette. Badge "nouveau" sur Isenbeck. Ils consultent la campagne.

14h00, Sophie reçoit les premiers retours terrain : "Super, la nouvelle promo Isenbeck ! Je la propose dès cet après-midi."

**Resolution - La transformation :**
Vendredi 17h00, 24h après publication. Sophie consulte les stats : 420 vendeurs sur 500 ont consulté la campagne. Taux d'adoption : 84%.

Elle pense : "Avant, il fallait 1 semaine et passer par l'IT. Maintenant, je publie en 90 minutes et le terrain est équipé le jour même. C'est un game-changer."

**Valeur créée :** Agilité marketing, time-to-market réduit drastiquement (1 semaine → 90 minutes), autonomie totale (0 dépendance IT), impact mesurable.

**Capacités révélées par ce journey :**
- Interface admin sécurisée
- Permissions par marque
- Upload d'images et visuels
- Éditeur de contenu simple
- Prévisualisation mobile
- Publication immédiate (pas de workflow validation)
- Système de notifications push
- Synchronisation automatique côté vendeurs

### Journey Requirements Summary

**Capacités Core révélées par les journeys :**

**Recherche & Navigation :**
- Moteur de recherche instantané (< 5 secondes)
- Recherche par produit, marque, catégorie
- Navigation fluide entre sections
- Favoris pour accès rapide

**Catalogue & Contenu :**
- Fiches produits complètes (prix, marges, historique)
- Argumentaires de vente par canal (CHR, PSV, TT, MT)
- Gestion des objections avec scripts de réponse
- Visuels d'activations et promotions

**Mode Offline :**
- Fonctionnement 100% offline
- Synchronisation automatique intelligente
- Horodatage visible de dernière sync
- Performance identique online/offline
- Cache complet du catalogue

**Notifications & Sync :**
- Badge "nouveau" pour contenu mis à jour
- Notifications push pour campagnes urgentes
- Synchronisation automatique au démarrage
- Sync automatique au retour de connexion

**Interface Admin :**
- Accès sécurisé pour brand managers
- Permissions par marque
- Upload d'images et visuels
- Éditeur de contenu simple
- Publication immédiate
- Prévisualisation mobile

**Expérience Utilisateur :**
- Prise en main < 5 minutes (Aminata)
- Interface intuitive, zéro formation
- Navigation fluide sans friction
- Design qui met les éléments dans le champ de l'œil

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. UX Émotionnelle dans le B2B Terrain**

Lions' Book applique une approche radicalement différente de l'UX traditionnelle des outils B2B :

**Innovation :** "Interface avec âme qui donne envie de revenir"
- Les outils B2B terrain sont généralement fonctionnels mais froids, sans personnalité
- Lions' Book emprunte aux standards consumer (Folk design, Néo-minimalisme, Bento grid)
- Objectif : Créer une connexion émotionnelle avec un outil professionnel
- Résultat attendu : Les vendeurs *veulent* utiliser l'app, pas seulement *doivent* l'utiliser

**Ce qui rend cela innovant :**
- Rare dans le secteur B2B de viser l'émotion et le plaisir d'usage
- Combinaison de styles visuels modernes (Folk + Néo-minimalisme + Bento) dans un contexte africain
- Pari que l'UX exceptionnelle est un différenciateur business, pas un "nice-to-have"

**Validation :**
- Taux de rétention 90%+ après 1 mois (vs 60-70% typique pour outils B2B)
- Score NPS > 50 (vs 20-30 typique)
- Feedback qualitatif : "J'aime utiliser cette app" vs "C'est utile"

**2. Offline-First pour Contexte Africain**

Lions' Book repense l'architecture PWA pour le contexte de connectivité africain :

**Innovation :** Mode offline comme fonctionnalité première, pas comme fallback
- Architecture inversée : Offline d'abord, online comme bonus
- Performance identique online/offline (pas de dégradation)
- Synchronisation intelligente et transparente
- Équité totale entre vendeurs urbains et ruraux

**Ce qui rend cela innovant :**
- La plupart des PWA traitent l'offline comme un mode dégradé
- Lions' Book fait de l'offline le mode principal, l'online est l'optimisation
- Adaptation contextuelle poussée : zones rurales camerounaises comme cas d'usage primaire, pas edge case
- Résultat : Éric (vendeur rural) a exactement la même expérience que Marcel (vendeur urbain)

**Validation :**
- 100% des fonctionnalités accessibles offline
- Taux de synchronisation > 95%
- Aucune frustration liée à la connectivité (feedback utilisateurs)
- Performance mesurée identique en zone urbaine vs rurale

**3. Démocratisation Marketing : De 1 Semaine à 90 Minutes**

Lions' Book transforme radicalement le workflow de publication de campagnes :

**Innovation :** Autonomie totale des brand managers (0 dépendance IT)
- Avant : 1 semaine pour publier une campagne (dépendance IT, validation, déploiement)
- Après : 90 minutes de la création à l'utilisation terrain
- Time-to-market divisé par 112 (168h → 1.5h)

**Ce qui rend cela innovant :**
- Suppression complète du goulot d'étranglement IT
- Publication immédiate sans workflow de validation
- Interface admin aussi simple qu'un CMS consumer
- Impact mesurable : Sophie peut réagir à une opportunité marché en temps réel

**Validation :**
- Time-to-market < 24h pour 100% des campagnes
- Taux d'adoption terrain : 80%+ dans les 24h
- 0 ticket IT pour publication de contenu
- Agilité marketing : Capacité à lancer campagnes flash le jour même

**4. Combinaison Unique : Sales Enablement + PWA + Offline + UX Exceptionnelle**

Lions' Book combine des éléments existants d'une manière nouvelle :

**Innovation de combinaison :**
- **Sales Enablement** : Argumentaires, objections, fiches produits
- **PWA** : Installation, notifications, performance
- **Offline-First** : Fonctionnement complet sans connexion
- **UX Consumer** : Interface avec âme, design émotionnel
- **Contexte Africain** : Adaptation zones rurales, connectivité intermittente

**Ce qui rend cela innovant :**
- Chaque élément existe séparément, mais la combinaison est unique
- Adaptation contextuelle poussée (Cameroun, zones rurales, 500 vendeurs terrain)
- Pari sur l'UX comme différenciateur dans un secteur (distribution boissons) peu digitalisé

**Validation :**
- Adoption 80%+ à 1 mois (vs 40-50% typique pour outils terrain)
- Conversion +20% à 3 mois grâce à l'accès instantané aux bons arguments
- Montée en compétence 2x plus rapide (12h → 6h)

### Market Context & Competitive Landscape

**Contexte Marché Africain :**
- Secteur distribution boissons en Afrique : Peu digitalisé, outils Excel dominants
- Connectivité : Intermittente en zones rurales, coût data élevé
- Équipes terrain : 500+ vendeurs, turnover élevé, besoin formation rapide
- Concurrence : Pas de solution équivalente adaptée au contexte africain

**Solutions Existantes (Lacunes) :**

1. **CRM/SFA Classiques (Salesforce, HubSpot)** :
   - ❌ Pas offline-first (mode dégradé)
   - ❌ UX complexe, formation longue
   - ❌ Coût prohibitif pour marché africain
   - ❌ Pas adapté au contexte connectivité intermittente

2. **Outils Sales Enablement (Seismic, Highspot)** :
   - ❌ Conçus pour marchés occidentaux (connectivité stable)
   - ❌ Pas de mode offline robuste
   - ❌ UX B2B traditionnelle (fonctionnelle mais froide)
   - ❌ Coût et complexité inadaptés

3. **Solutions Maison (Excel, PDF)** :
   - ❌ Pas de recherche instantanée
   - ❌ Fichiers éparpillés, versions multiples
   - ❌ Pas de mise à jour temps réel
   - ❌ Expérience utilisateur médiocre

**Positionnement Unique de Lions' Book :**
- ✅ Offline-first natif (pas un fallback)
- ✅ UX consumer dans un contexte B2B
- ✅ Adapté au contexte africain (connectivité, zones rurales)
- ✅ Time-to-market campagne : 90 minutes vs 1 semaine
- ✅ Coût optimisé pour marché africain
- ✅ Prise en main < 5 minutes (vs jours/semaines pour CRM)

**Opportunité Marché :**
- Potentiel d'expansion régionale (Côte d'Ivoire, Sénégal, etc.)
- White-label pour autres secteurs distribution (brasseries, FMCG)
- Référence pour digitalisation équipes terrain en Afrique

### Validation Approach

**Phase 1 : MVP Validation (31 Janvier 2026)**

**Hypothèses à valider :**
1. **UX Émotionnelle** : Les vendeurs *veulent* utiliser l'app quotidiennement
2. **Offline-First** : Performance identique online/offline en zones rurales
3. **Time-to-Market** : Brand managers publient campagnes en < 24h sans IT
4. **Adoption Rapide** : 80%+ d'adoption à 1 mois sans formation formelle

**Métriques de Validation :**

| Hypothèse | Métrique | Seuil Succès | Seuil Échec |
|-----------|----------|--------------|-------------|
| UX Émotionnelle | Score NPS | > 50 | < 30 |
| UX Émotionnelle | Taux rétention 1 mois | > 90% | < 70% |
| Offline-First | Performance zones rurales | = urbaines | -20% |
| Offline-First | Taux sync réussies | > 95% | < 85% |
| Time-to-Market | Délai publication campagne | < 24h | > 48h |
| Time-to-Market | Tickets IT pour publication | 0 | > 5/mois |
| Adoption Rapide | Utilisation quotidienne | > 80% | < 50% |
| Adoption Rapide | Prise en main | < 5 min | > 15 min |

**Méthodes de Validation :**

1. **Tests Utilisateurs Terrain (Semaine 1-2)** :
   - 20 vendeurs pilotes (10 urbains, 10 ruraux)
   - Observation directe en situation réelle
   - Feedback qualitatif : "Qu'est-ce qui vous plaît/déplaît ?"
   - Mesure temps de prise en main

2. **Déploiement Progressif (Semaine 3-4)** :
   - Rollout par vagues : 100 → 250 → 500 vendeurs
   - Monitoring adoption quotidienne
   - Tracking performance offline vs online
   - Feedback brand managers sur autonomie publication

3. **Mesure Impact Business (Mois 1-3)** :
   - Taux de conversion avant/après
   - Temps de montée en compétence nouveaux vendeurs
   - Fréquence mises à jour campagnes (avant/après)
   - ROI : Coût développement vs gains efficacité

**Phase 2 : V2 Validation (2 Semaines Après MVP)**

**Hypothèses V2 :**
- Merchandising & Téléchargeables augmentent engagement de 20%+
- Analytics donnent insights actionnables aux brand managers

**Signal Go/No-Go V2 :**
- ✅ **GO** : Adoption MVP > 80% + NPS > 50 + Feedback positif
- ⚠️ **PAUSE** : Adoption 50-80% → Optimiser MVP avant V2
- ❌ **PIVOT** : Adoption < 50% → Revoir fondamentaux

### Risk Mitigation

**Risque 1 : UX Trop Ambitieuse (Over-Design)**

**Risque :** L'interface "avec âme" devient trop complexe ou distrayante
- Impact : Temps de prise en main > 5 minutes, confusion utilisateurs
- Probabilité : Moyenne (30%)

**Mitigation :**
- Tests utilisateurs dès maquettes (avant développement)
- Principe : "Simple d'abord, âme ensuite" (pas l'inverse)
- Validation : Si prise en main > 5 min en tests, simplifier impitoyablement
- Fallback : Revenir à une interface plus classique si nécessaire

**Risque 2 : Mode Offline Trop Complexe Techniquement**

**Risque :** Synchronisation échoue, conflits de données, bugs offline
- Impact : Frustration utilisateurs, données obsolètes, perte de confiance
- Probabilité : Élevée (50%) - Offline-first est techniquement complexe

**Mitigation :**
- Architecture offline testée dès POC (avant MVP)
- Tests intensifs en conditions réelles (zones rurales)
- Stratégie de sync conservative : Préférer données anciennes à erreurs
- Monitoring : Alertes automatiques si taux sync < 95%
- Fallback : Mode "online-only" temporaire si sync défaillante

**Risque 3 : Adoption Insuffisante (< 80%)**

**Risque :** Les vendeurs n'adoptent pas l'app malgré l'UX optimisée
- Impact : ROI non atteint, échec du projet
- Probabilité : Moyenne (30%)

**Mitigation :**
- Champions terrain : Identifier 20 early adopters enthousiastes
- Feedback loops : Ajustements rapides selon retours terrain
- Incentives : Reconnaissance vendeurs qui utilisent l'app efficacement
- Communication : Montrer success stories (Marcel, Aminata, Éric)
- Fallback : Si adoption < 50% à 1 mois, pause et analyse root cause

**Risque 4 : Time-to-Market Brand Managers Pas Atteint**

**Risque :** Publication campagnes prend toujours > 24h malgré interface admin
- Impact : Promesse d'agilité marketing non tenue
- Probabilité : Faible (20%)

**Mitigation :**
- Tests interface admin avec Sophie dès maquettes
- Workflow publication ultra simplifié (3 étapes max)
- Formation brand managers (1h) sur l'interface
- Support dédié les 2 premières semaines
- Fallback : Assistance IT temporaire si blocages

**Risque 5 : Performance Zones Rurales Insuffisante**

**Risque :** L'app est lente en zones rurales malgré mode offline
- Impact : Inégalité urbain/rural persiste, frustration Éric
- Probabilité : Moyenne (30%)

**Mitigation :**
- Tests performance sur Samsung Tab 6 en conditions réelles
- Optimisation assets : Images compressées, cache intelligent
- Benchmark : Performance mesurée urbain vs rural dès pilote
- Monitoring : Temps de chargement par zone géographique
- Fallback : Version "light" pour zones rurales si nécessaire

**Plan de Contingence Global :**

Si plusieurs risques se matérialisent simultanément :
1. **Pause immédiate** du rollout
2. **Analyse root cause** avec vendeurs pilotes
3. **Ajustements rapides** (sprint 1 semaine)
4. **Re-test** avec pilotes avant reprise rollout
5. **Communication transparente** : Mieux vaut retarder que décevoir

## Progressive Web App (PWA) Specific Requirements

### Project-Type Overview

Lions' Book est une **Progressive Web App (PWA)** optimisée pour tablettes Android, conçue pour fonctionner principalement offline avec synchronisation asynchrone. L'architecture privilégie la performance, la fiabilité et l'expérience utilisateur fluide sur Samsung Tab 6.

**Choix architectural clés :**
- **SPA (Single Page Application)** pour navigation fluide sans rechargement
- **Offline-first** avec Service Worker robuste
- **Installation PWA** sur écran d'accueil pour expérience app-like
- **Synchronisation asynchrone** en arrière-plan

### Technical Architecture Considerations

**1. Architecture SPA**

**Framework & Stack :**
- Framework JavaScript moderne (React, Vue, ou Svelte recommandé)
- Router client-side pour navigation sans rechargement
- State management pour gestion état offline/online
- Build optimisé pour performance (code splitting, lazy loading)

**Structure :**
- Shell applicatif minimal chargé en premier
- Composants chargés à la demande (lazy loading)
- Cache agressif des assets statiques
- Pré-chargement des routes critiques

**2. Service Worker & Offline Strategy**

**Service Worker robuste :**
- Stratégie **Cache-First** pour assets statiques (shell, CSS, JS)
- Stratégie **Network-First with Cache Fallback** pour contenu dynamique
- Stratégie **Background Sync** pour synchronisation différée
- Gestion intelligente des versions de cache

**Offline Data Management :**
- **IndexedDB** pour stockage local du catalogue complet
- **LocalStorage** pour préférences utilisateur et favoris
- **Cache API** pour assets et images
- Capacité : ~50-100 MB de données offline (catalogue complet)

**Synchronisation :**
- Sync automatique au démarrage si connexion disponible
- Background Sync API pour sync en arrière-plan
- Détection automatique du retour de connexion
- Gestion des conflits : Last-Write-Wins (données serveur prioritaires)

**3. PWA Manifest & Installation**

**Web App Manifest :**
```json
{
  "name": "Lions' Book",
  "short_name": "Lions' Book",
  "description": "Catalogue produits BDC pour vendeurs terrain",
  "start_url": "/",
  "display": "standalone",
  "orientation": "landscape",
  "theme_color": "#ffc627",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Installation :**
- Prompt d'installation au premier lancement
- Icône sur écran d'accueil (home screen)
- Expérience fullscreen (pas de barre d'adresse)
- Splash screen aux couleurs BDC

### Browser & Platform Requirements

**Browser Matrix :**

| Navigateur | Version Minimum | Support | Priorité |
|------------|----------------|---------|----------|
| Chrome Android | 90+ | ✅ Full | P0 (Critique) |
| Samsung Internet | 14+ | ✅ Full | P0 (Critique) |
| Firefox Android | 88+ | ⚠️ Basique | P2 (Nice-to-have) |
| Safari iOS | N/A | ❌ Non supporté | Out of scope MVP |
| Desktop Chrome | N/A | ❌ Non supporté | Out of scope MVP |

**Device Requirements :**
- **Cible primaire** : Samsung Tab 6 (Android 11+)
- **Résolution** : 1280x800 minimum (orientation landscape privilégiée)
- **RAM** : 3 GB minimum
- **Stockage** : 200 MB disponibles pour cache offline

**PWA Features Support :**
- ✅ Service Workers (obligatoire)
- ✅ Web App Manifest (obligatoire)
- ✅ IndexedDB (obligatoire)
- ✅ Push Notifications (obligatoire)
- ✅ Background Sync (obligatoire)
- ⚠️ Web Share API (nice-to-have)
- ❌ Bluetooth/NFC (pas nécessaire)

### Performance Targets

**Loading Performance :**
- **First Contentful Paint (FCP)** : < 1.5 secondes
- **Largest Contentful Paint (LCP)** : < 2.5 secondes
- **Time to Interactive (TTI)** : < 3 secondes
- **First Input Delay (FID)** : < 100 ms

**Runtime Performance :**
- **Recherche instantanée** : < 5 secondes pour 90% des requêtes
- **Navigation entre pages** : < 300 ms (transition fluide)
- **Scroll performance** : 60 FPS constant
- **Temps de synchronisation** : < 30 secondes pour catalogue complet

**Offline Performance :**
- **Performance identique online/offline** (pas de dégradation)
- **Temps de chargement offline** : < 2 secondes
- **Recherche offline** : < 5 secondes (identique online)

**Network Performance :**
- **Fonctionnement 2G** : Dégradé mais utilisable
- **Fonctionnement 3G** : Performance optimale
- **Fonctionnement 4G** : Performance maximale
- **Taille bundle initial** : < 500 KB (gzipped)
- **Taille totale assets** : < 5 MB (hors images produits)

**Optimisations :**
- Code splitting par route
- Lazy loading des images
- Compression gzip/brotli
- Minification CSS/JS
- Tree shaking pour éliminer code mort
- Images WebP avec fallback JPEG

### SEO Strategy

**SEO : Non applicable**

Lions' Book est une application interne B2B sans besoin d'indexation par moteurs de recherche :
- ❌ Pas de SEO nécessaire
- ❌ Pas de sitemap
- ❌ Pas de meta tags SEO
- ❌ Pas de structured data

**Distribution :**
- URL directe communiquée aux vendeurs
- Installation PWA sur écran d'accueil
- Pas de découvrabilité publique nécessaire

### Accessibility Level

**Niveau cible : WCAG 2.1 Level A (Minimum)**

**Exigences critiques :**

1. **Contraste visuel** :
   - Ratio minimum 4.5:1 pour texte normal
   - Ratio minimum 3:1 pour texte large
   - Lisibilité en plein soleil (usage extérieur)

2. **Taille de texte** :
   - Texte minimum 16px (lisible sur tablette)
   - Possibilité de zoomer jusqu'à 200%
   - Pas de perte de contenu au zoom

3. **Navigation** :
   - Navigation clavier possible (tab, enter, esc)
   - Focus visible sur éléments interactifs
   - Ordre de tabulation logique

4. **Couleur** :
   - Pas de dépendance couleur seule pour information
   - Badge "nouveau" : icône + couleur
   - États (online/offline) : texte + icône

5. **Touch targets** :
   - Taille minimum 44x44 pixels
   - Espacement suffisant entre éléments cliquables
   - Gestes tactiles simples (tap, swipe)

**Non requis pour MVP :**
- ❌ Screen reader support (WCAG AA/AAA)
- ❌ Transcriptions audio/vidéo
- ❌ Sous-titres
- ❌ Mode haut contraste

**Justification :**
- Utilisateurs terrain avec vision normale
- Usage tablette tactile (pas de handicap moteur)
- Contexte professionnel (pas grand public)

### Responsive Design

**Orientation privilégiée : Landscape (Paysage)**

Lions' Book est optimisé pour usage tablette en mode paysage :
- **Landscape (1280x800)** : Layout principal optimisé
- **Portrait (800x1280)** : Layout adapté mais secondaire

**Breakpoints :**
- **Tablet Landscape** : 1024px - 1366px (cible principale)
- **Tablet Portrait** : 768px - 1024px (support secondaire)
- **Mobile** : < 768px (non supporté MVP)

**Layout adaptatif :**
- Bento grid responsive selon orientation
- Navigation latérale en landscape, bottom nav en portrait
- Fiches produits optimisées pour lecture landscape
- Images adaptées à la résolution de l'écran

### Implementation Considerations

**1. Notifications Push**

**Stratégie :**
- **Web Push API** pour notifications
- **Firebase Cloud Messaging (FCM)** comme backend
- Notifications opt-in au premier lancement

**Use cases :**
- Nouvelle campagne publiée par brand manager
- Rappel synchronisation (si > 7 jours sans sync)
- Alerte contenu obsolète (si > 30 jours sans sync)

**Permissions :**
- Demande permission au moment pertinent (pas au lancement)
- Explication claire de la valeur (nouvelles campagnes)
- Possibilité de désactiver dans paramètres

**2. Gestion des Versions**

**Stratégie de mise à jour :**
- Détection automatique de nouvelle version
- Prompt utilisateur : "Nouvelle version disponible, recharger ?"
- Mise à jour en arrière-plan si app fermée
- Pas de mise à jour forcée (sauf critique)

**Versioning :**
- Semantic versioning (1.0.0, 1.1.0, 2.0.0)
- Version affichée dans paramètres
- Changelog accessible dans l'app

**3. Monitoring & Analytics**

**Métriques techniques :**
- Performance (FCP, LCP, TTI, FID)
- Taux de succès synchronisation
- Erreurs JavaScript (Sentry ou équivalent)
- Taux d'installation PWA

**Métriques usage :**
- Adoption quotidienne
- Fréquence de recherche
- Sections les plus consultées
- Taux d'utilisation offline vs online

**4. Sécurité**

**HTTPS obligatoire :**
- PWA nécessite HTTPS (Service Workers)
- Certificat SSL valide
- Pas de mixed content (HTTP/HTTPS)

**Authentification Brand Managers :**
- JWT tokens pour interface admin
- Refresh tokens pour session longue durée
- Logout automatique après inactivité

**Données sensibles :**
- Prix et marges stockés localement (pas de chiffrement nécessaire)
- Pas de données personnelles utilisateurs
- Pas de données financières sensibles

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach : Problem-Solving MVP**

Lions' Book adopte une approche **Problem-Solving MVP** centrée sur la résolution d'un problème concret et urgent des vendeurs terrain BDC :

**Problème à résoudre :**
- Vendeurs démunis face aux questions clients
- Information éparpillée dans fichiers Excel obsolètes
- Nouveaux vendeurs perdus pendant 3-4 semaines
- Zones rurales désavantagées par manque d'accès à l'information

**Hypothèses MVP à valider :**
1. **Utilité immédiate** : Vendeur trouve réponse pertinente en < 5 secondes
2. **Fiabilité offline** : Performance identique en zones rurales vs urbaines
3. **Adoption naturelle** : Prise en main < 5 minutes sans formation formelle
4. **Agilité marketing** : Brand managers publient campagnes en < 24h sans IT

**Philosophie MVP :**
- **Lean & Focused** : Fonctionnalités essentielles parfaitement exécutées
- **UX optimisée dès le départ** : Pas d'ajustements post-lancement sauf retours utilisateurs
- **Offline-first** : Architecture robuste dès MVP (pas de compromis technique)
- **Validation rapide** : 1 mois pour prouver adoption 80%+ et NPS > 50

**Resource Requirements :**

**Équipe MVP (Deadline 31 Janvier 2026) :**
- **1 Product Manager** : Coordination, priorisation, validation utilisateurs
- **2-3 Développeurs Frontend** : React/Vue/Svelte, PWA, Service Workers
- **1 Développeur Backend** : API, base de données, synchronisation
- **1 UX/UI Designer** : Interface émotionnelle, design system, prototypes
- **1 QA/Testeur** : Tests terrain, zones rurales, validation offline

**Compétences critiques :**
- Expertise PWA & Service Workers (offline-first)
- Expérience IndexedDB & synchronisation
- Design system moderne (Folk, Néo-minimalisme, Bento grid)
- Tests en conditions réelles (zones rurales camerounaises)

**Timeline MVP :**
- **Semaine 1-2** : Architecture & Design system
- **Semaine 3-4** : Développement core features
- **Semaine 5** : Tests pilotes (20 vendeurs)
- **Semaine 6** : Ajustements & déploiement progressif

### MVP Feature Set (Phase 1 - Deadline 31 Janvier 2026)

**Core User Journeys Supported :**

✅ **Journey 1 - Marcel négocie avec détaillant** : Recherche instantanée, fiches produits, objections, visuels activations
✅ **Journey 2 - Aminata prépare sa journée** : Synchronisation auto, notifications, favoris, scripts objections
✅ **Journey 3 - Éric en zone rurale offline** : Mode offline 100%, sync intelligente, performance identique
✅ **Journey 4 - Sophie lance campagne** : Interface admin, upload visuels, publication immédiate

**Must-Have Capabilities :**

**1. Catalogue Produits Complet**
- Toutes marques BDC (Bières, Soft, Eaux, Vins & Spiritueux)
- Prix produits + Marges (essentiel négociations)
- Historique marque et positionnement
- Fiches produits parfaitement agencées
- Design qui met éléments dans champ de l'œil

**2. Argumentaires de Vente**
- Argumentaires structurés par marque
- Segmentation par canal (CHR, PSV, TT, MT)
- Arguments clés hiérarchisés
- Adaptation discours selon type client

**3. Gestion des Objections**
- Minimum 5 objections types par produit/marque
- Objections principales : "Trop cher", "Ça ne tourne pas", + 3 autres
- Réponses types prêtes à l'emploi
- Scripts de réponse avec exemples concrets

**4. Recherche Instantanée & Navigation**
- Moteur de recherche performant (< 5 secondes)
- Recherche par produit, marque, catégorie, mot-clé
- Filtres avancés : canal, type client, gamme prix
- Suggestions et recherche prédictive
- Historique de recherche
- Favoris pour accès rapide ⭐

**5. Mode Offline Robuste (CRITIQUE)**
- Fonctionnement complet sans connexion
- Synchronisation quotidienne recommandée
- Alerte après 1 mois sans sync
- Horodatage visible pour fraîcheur données
- Cache intelligent : sélectif par marque/catégorie + option globale
- Sync automatique dès connexion disponible

**6. Activations & Promotions**
- Campagnes en cours accessibles temps réel
- Visuels pour proposer décorations marque
- Formats : Photos, plans techniques, rendus 3D (limité)
- Galerie d'exemples d'activations réussies
- Optimisation pour affichage offline

**7. Interface Admin Brand Managers**
- Accès sécurisé pour responsables marketing
- Modification de leur section marque uniquement (permissions par marque)
- Upload d'images et visuels pour activations
- Publication immédiate (pas de workflow validation)
- Gestion actualités, campagnes, événements, offres promotionnelles

**8. Système de Notifications**
- Badge "nouveau" quand contenu mis à jour
- Notifications push pour campagnes urgentes
- Rappels si vendeur n'a pas synchronisé depuis X jours
- Indication claire des sections récemment modifiées

**Expérience Utilisateur Exceptionnelle (Différenciateur MVP) :**
- **UX optimisée dès le MVP** - Interface finalisée au lancement
- Style visuel : Folk design + Néo-minimalisme + Bento grid
- Interface ultra belle aux couleurs BDC (70% blanc, 20% jaune #ffc627, 10% rouge #ff7323f)
- Navigation ultra fluide sans friction
- Prise en main ultra intuitive - Zéro formation nécessaire
- Design qui met éléments dans champ de l'œil
- Interface avec âme qui donne envie de revenir

**Architecture Technique MVP :**
- PWA Android (Samsung Tab 6)
- Pas d'authentification pour consultation catalogue
- Authentification requise uniquement pour édition (brand managers)
- Contenu statique via passerelle (prix/marges)
- Contenu dynamique en BD (actualités, campagnes, promotions)
- ~500 vendeurs, 500 consultations/jour en pic

**Critères de Succès MVP (1 mois post-lancement) :**
- ✅ Adoption 80%+ de l'équipe terrain (~400/500 vendeurs)
- ✅ Score NPS > 50
- ✅ Taux de rétention 90%+ après 1 mois
- ✅ Prise en main < 5 minutes
- ✅ Temps de recherche < 5 secondes (90% des cas)
- ✅ Taux de synchronisation > 95%
- ✅ Performance identique online/offline
- ✅ Time-to-market campagnes < 24h

### Post-MVP Features

**Phase 2 : Growth Features (2 semaines après MVP)**

**Signal Go/No-Go V2 :**
- ✅ **GO V2** : Si adoption MVP > 80% ET NPS > 50 ET feedback positif
- ⚠️ **PAUSE** : Si adoption 50-80% → Optimiser MVP avant V2
- ❌ **PIVOT** : Si adoption < 50% → Revoir fondamentaux

**Features V2 (si GO) :**

**1. Merchandising & Planogrammes**
- Règles de merchandising par canal
- Planogrammes visuels pour agencement produits
- Photos de bonnes pratiques merchandising
- Checklist merchandising par type de point de vente
- Menu visible dans MVP mais grisé avec mention "Bientôt disponible"

**2. Outils Téléchargeables**
- Bibliothèque d'assets marketing téléchargeables
- Packshots haute résolution
- Logos et éléments de marque
- PLV (Publicité sur Lieu de Vente)
- Fiches techniques produits PDF
- Section visible dans menus MVP avec état "À venir"

**3. Analytics Avancés**
- Tracking individuel par vendeur
- Analytics détaillés par brand manager
- Données terrain remontées aux managers
- Dashboards de consultation
- Produits les plus consultés
- Taux d'utilisation par fonctionnalité

**4. Personnalisation Visuels**
- Annotation ou personnalisation des visuels par vendeurs
- Édition d'images dans l'app
- Ajout de notes personnelles sur fiches produits

**Objectifs V2 :**
- Augmenter engagement de 20%+
- Donner insights actionnables aux brand managers
- Renforcer merchandising terrain

**Phase 3 : Expansion Features (6-12 mois)**

**Court Terme (6-12 mois - V3+) :**

**1. Système de Tracking Conversion**
- Lien avec CRM/système de ventes
- Suivi prospects → clients
- Attribution ventes aux vendeurs
- ROI mesurable par campagne

**2. Gamification**
- Badges et récompenses
- Classements vendeurs
- Challenges mensuels
- Reconnaissance top performers

**3. Formation Intégrée**
- Vidéos produits
- Quiz de certification
- Parcours d'apprentissage
- Suivi progression formation

**4. Communauté Vendeurs**
- Partage de best practices
- Forum d'entraide
- Success stories
- Tips & tricks terrain

**Moyen Terme (12-24 mois - Écosystème) :**

**1. CRM Intégré**
- Historique client
- Notes de visite
- Suivi prospects
- Pipeline de ventes

**2. Gestion Stocks**
- Visibilité temps réel stocks distributeurs
- Alertes ruptures
- Prévisions besoins

**3. Prise de Commandes**
- Commandes directement depuis l'app
- Validation automatique
- Suivi livraisons

**4. BI & Reporting**
- Dashboards pour managers
- Prévisions ventes
- Analyse performance territoire

**5. IA Contextuelle**
- Recommandations intelligentes
- Prédiction objections
- Suggestions argumentaires personnalisés

**Long Terme (2-3 ans - Plateforme Régionale) :**

**1. Expansion Géographique**
- Déploiement Côte d'Ivoire
- Déploiement Sénégal
- Autres pays Afrique de l'Ouest
- Adaptation contextes locaux

**2. White-Label**
- Solution packagée pour autres entreprises distribution
- Personnalisation par client
- Multi-tenant architecture

**3. Marketplace Partenaires**
- Intégration fournisseurs
- Services tiers
- Écosystème ouvert

**4. Intelligence Collective**
- Machine learning sur meilleures pratiques
- Optimisation argumentaires basée sur données
- Prédiction tendances marché

**5. Écosystème Ouvert**
- API pour intégrations tierces
- Plugins communautaires
- Developer platform

**Vision Transformationnelle (2-3 ans) :**
Lions' Book devient la plateforme de référence pour les équipes commerciales terrain en Afrique, transformant chaque vendeur en expert produit connecté et performant.

### Risk Mitigation Strategy

**Technical Risks**

**Risque 1 : Mode Offline Trop Complexe Techniquement**
- **Probabilité** : Élevée (50%)
- **Impact** : Critique (échec MVP si offline défaillant)

**Mitigation :**
- Architecture offline testée dès POC (avant MVP)
- Tests intensifs en conditions réelles zones rurales
- Stratégie sync conservative : Préférer données anciennes à erreurs
- Monitoring : Alertes automatiques si taux sync < 95%
- Fallback : Mode "online-only" temporaire si sync défaillante
- Équipe avec expertise PWA/Service Workers obligatoire

**Risque 2 : Performance Zones Rurales Insuffisante**
- **Probabilité** : Moyenne (30%)
- **Impact** : Élevé (inégalité urbain/rural persiste)

**Mitigation :**
- Tests performance sur Samsung Tab 6 en conditions réelles
- Optimisation assets : Images compressées, cache intelligent
- Benchmark : Performance mesurée urbain vs rural dès pilote
- Monitoring : Temps de chargement par zone géographique
- Fallback : Version "light" pour zones rurales si nécessaire

**Market Risks**

**Risque 3 : Adoption Insuffisante (< 80%)**
- **Probabilité** : Moyenne (30%)
- **Impact** : Critique (ROI non atteint, échec projet)

**Validation Approach :**
- Tests utilisateurs terrain dès semaine 1-2 (20 vendeurs pilotes)
- Déploiement progressif : 100 → 250 → 500 vendeurs
- Feedback loops : Ajustements rapides selon retours
- Champions terrain : Identifier 20 early adopters enthousiastes
- Communication : Montrer success stories (Marcel, Aminata, Éric)

**Mitigation :**
- Incentives : Reconnaissance vendeurs qui utilisent l'app efficacement
- Formation légère : 30 minutes max pour nouveaux vendeurs
- Support dédié : Assistance terrain les 2 premières semaines
- Fallback : Si adoption < 50% à 1 mois, pause et analyse root cause

**Risque 4 : UX Trop Ambitieuse (Over-Design)**
- **Probabilité** : Moyenne (30%)
- **Impact** : Moyen (temps de prise en main > 5 min)

**Mitigation :**
- Tests utilisateurs dès maquettes (avant développement)
- Principe : "Simple d'abord, âme ensuite" (pas l'inverse)
- Validation : Si prise en main > 5 min en tests, simplifier impitoyablement
- Fallback : Revenir à interface plus classique si nécessaire

**Resource Risks**

**Risque 5 : Deadline 31 Janvier Non Tenable**
- **Probabilité** : Moyenne (30%)
- **Impact** : Élevé (retard lancement)

**Contingency Approach :**
- **Plan A** : Équipe complète (2-3 dev frontend, 1 backend, 1 designer, 1 QA)
- **Plan B** : Si retard, réduire scope V2 (merchandising reporté à V3)
- **Plan C** : Si retard critique, lancer MVP réduit sans interface admin (publication manuelle temporaire)
- **Communication** : Transparence avec stakeholders dès détection risque

**Risque 6 : Équipe Insuffisante ou Compétences Manquantes**
- **Probabilité** : Faible (20%)
- **Impact** : Critique (MVP non livrable)

**Contingency Approach :**
- Recrutement anticipé : Identifier profils PWA/Service Workers dès maintenant
- Formation équipe : Montée en compétence sur offline-first si nécessaire
- Expertise externe : Consultant PWA si blocage technique
- Fallback : Réduire ambition offline (mode dégradé acceptable) si expertise insuffisante

**Plan de Contingence Global :**

Si plusieurs risques se matérialisent simultanément :
1. **Pause immédiate** du développement
2. **Analyse root cause** avec équipe + vendeurs pilotes
3. **Décision Go/No-Go** : Continuer, pivoter, ou reporter
4. **Ajustements rapides** (sprint 1 semaine max)
5. **Re-test** avec pilotes avant reprise
6. **Communication transparente** : Mieux vaut retarder que décevoir

## Functional Requirements

### Catalogue & Fiches Produits

- **FR1**: Vendeurs peuvent consulter le catalogue complet des produits BDC (Bières, Soft, Eaux, Vins & Spiritueux)
- **FR2**: Vendeurs peuvent voir les prix produits et marges pour chaque produit
- **FR3**: Vendeurs peuvent consulter l'historique et le positionnement de chaque marque
- **FR4**: Vendeurs peuvent accéder aux fiches produits avec informations agencées par priorité visuelle
- **FR5**: Vendeurs peuvent filtrer les produits par catégorie (Bières, Soft, Eaux, etc.)
- **FR6**: Vendeurs peuvent filtrer les produits par marque

### Recherche & Navigation

- **FR7**: Vendeurs peuvent rechercher un produit par nom
- **FR8**: Vendeurs peuvent rechercher un produit par marque
- **FR9**: Vendeurs peuvent rechercher un produit par catégorie
- **FR10**: Vendeurs peuvent rechercher un produit par mot-clé
- **FR11**: Vendeurs peuvent voir des suggestions de recherche pendant la saisie
- **FR12**: Vendeurs peuvent consulter leur historique de recherche
- **FR13**: Vendeurs peuvent marquer des produits en favoris pour accès rapide
- **FR14**: Vendeurs peuvent accéder à leurs favoris depuis un raccourci dédié
- **FR15**: Vendeurs peuvent filtrer les résultats par canal de vente (CHR, PSV, TT, MT)
- **FR16**: Vendeurs peuvent filtrer les résultats par type de client
- **FR17**: Vendeurs peuvent filtrer les résultats par gamme de prix

### Argumentaires de Vente

- **FR18**: Vendeurs peuvent consulter les argumentaires de vente structurés par marque
- **FR19**: Vendeurs peuvent voir les arguments clés hiérarchisés par priorité pour chaque marque
- **FR20**: Vendeurs peuvent adapter les argumentaires marques selon le contexte client

### Gestion des Objections

- **FR21**: Vendeurs peuvent consulter les objections basées sur le recueil d'arguments BDC
- **FR22**: Vendeurs peuvent accéder aux réponses types pour l'objection "Trop cher"
- **FR23**: Vendeurs peuvent accéder aux réponses types pour l'objection "Ça ne tourne pas chez moi"
- **FR24**: Vendeurs peuvent consulter les objections variables selon canal (CHR, Traditional Trade) et type produit (bières, soft drinks)
- **FR25**: Vendeurs peuvent voir des scripts de réponse avec exemples concrets définis par vendeurs expérimentés

### Activations & Promotions

- **FR26**: Vendeurs peuvent consulter les campagnes promotionnelles en cours
- **FR27**: Vendeurs peuvent voir les visuels de décorations marque disponibles
- **FR28**: Vendeurs peuvent télécharger les visuels d'activations à la demande pour utilisation offline
- **FR29**: Vendeurs peuvent consulter des photos d'activations réussies
- **FR30**: Vendeurs peuvent accéder aux plans techniques des activations
- **FR31**: Vendeurs peuvent voir des rendus 3D des activations (limité)
- **FR32**: Vendeurs peuvent consulter les actualités et événements BDC
- **FR33**: Vendeurs peuvent voir les offres promotionnelles actives
- **FR34**: Vendeurs peuvent voir que les activations sont gratuites pour les détaillants

### Mode Offline & Synchronisation

- **FR35**: Vendeurs peuvent utiliser toutes les fonctionnalités de l'app sans connexion internet
- **FR36**: Vendeurs peuvent voir l'horodatage de la dernière synchronisation
- **FR37**: Vendeurs peuvent déclencher une synchronisation manuelle
- **FR38**: Système synchronise automatiquement au démarrage si connexion disponible
- **FR39**: Système synchronise automatiquement en arrière-plan quand connexion détectée
- **FR40**: Vendeurs reçoivent une alerte si aucune synchronisation depuis 1 mois
- **FR41**: Vendeurs peuvent choisir de synchroniser sélectivement par marque/catégorie
- **FR42**: Vendeurs peuvent choisir de synchroniser l'intégralité du catalogue
- **FR43**: Vendeurs peuvent voir un indicateur de statut connexion (online/offline)

### Notifications & Alertes

- **FR44**: Vendeurs peuvent voir un badge "nouveau" sur le contenu récemment mis à jour
- **FR45**: Vendeurs reçoivent des notifications push pour les campagnes urgentes (toutes les campagnes sont urgentes)
- **FR46**: Vendeurs reçoivent des rappels s'ils n'ont pas synchronisé depuis X jours
- **FR47**: Vendeurs peuvent voir clairement les sections récemment modifiées
- **FR48**: Vendeurs peuvent activer/désactiver les notifications dans les paramètres

### Interface Admin Brand Managers

- **FR49**: Brand managers peuvent se connecter à l'interface admin avec authentification sécurisée
- **FR50**: Brand managers peuvent modifier uniquement leur section marque (permissions par marque)
- **FR51**: Brand managers peuvent uploader des images et visuels pour activations
- **FR52**: Brand managers peuvent publier du contenu immédiatement sans workflow de validation
- **FR53**: Brand managers peuvent gérer les actualités de leur marque
- **FR54**: Brand managers peuvent gérer les campagnes de leur marque
- **FR55**: Brand managers peuvent gérer les événements de leur marque
- **FR56**: Brand managers peuvent gérer les offres promotionnelles de leur marque
- **FR57**: Brand managers peuvent prévisualiser le rendu mobile avant publication
- **FR58**: Brand managers peuvent voir la date de dernière modification de leur contenu

### Installation & Mise à Jour PWA

- **FR59**: Vendeurs peuvent installer l'app sur l'écran d'accueil de leur tablette
- **FR60**: Vendeurs peuvent lancer l'app en mode fullscreen sans barre d'adresse
- **FR61**: Vendeurs voient un splash screen aux couleurs BDC au lancement
- **FR62**: Vendeurs sont notifiés quand une nouvelle version de l'app est disponible
- **FR63**: Vendeurs peuvent choisir de recharger l'app pour mettre à jour
- **FR64**: Vendeurs peuvent voir le numéro de version dans les paramètres
- **FR65**: Vendeurs peuvent consulter le changelog des versions

### Paramètres & Préférences

- **FR66**: Vendeurs peuvent accéder aux paramètres de l'application
- **FR67**: Vendeurs peuvent voir les informations de leur compte (si authentification future)
- **FR68**: Vendeurs peuvent gérer leurs préférences de notifications
- **FR69**: Vendeurs peuvent voir l'espace de stockage utilisé par le cache offline et par les médias
- **FR70**: Vendeurs peuvent configurer l'auto-téléchargement des médias (uniquement WiFi, WiFi + données mobiles, jamais)
- **FR71**: Vendeurs peuvent définir une limite maximale de cache pour les médias
- **FR72**: Vendeurs peuvent vider le cache global ou par catégorie (visuels activations, photos produits, etc.)
- **FR73**: Vendeurs peuvent voir la taille de chaque catégorie de médias en cache

## Non-Functional Requirements

### Performance

**NFR-P1: Temps de Réponse Recherche**
- La recherche doit retourner des résultats en **< 5 secondes pour 90% des requêtes**
- La recherche doit retourner des résultats en **< 10 secondes pour 99% des requêtes**
- Mesure : P90 et P99 des temps de réponse recherche

**NFR-P2: Temps de Chargement Initial**
- **First Contentful Paint (FCP)** : < 1.5 secondes
- **Largest Contentful Paint (LCP)** : < 2.5 secondes
- **Time to Interactive (TTI)** : < 3 secondes
- Mesure : Core Web Vitals sur Samsung Tab 6 en conditions réelles

**NFR-P3: Performance Navigation**
- Transition entre pages : **< 300 ms**
- Scroll performance : **60 FPS constant**
- Aucun lag perceptible lors de la navigation
- Mesure : Frame rate monitoring et temps de transition

**NFR-P4: Performance Offline**
- Performance offline **identique** à performance online (pas de dégradation)
- Temps de chargement offline : **< 2 secondes**
- Recherche offline : **< 5 secondes** (identique online)
- Mesure : Comparaison métriques online vs offline

**NFR-P5: Temps de Synchronisation**
- Synchronisation catalogue complet : **< 30 secondes**
- Synchronisation incrémentale : **< 10 secondes**
- Synchronisation en arrière-plan sans bloquer l'interface
- Mesure : Durée sync complète et incrémentale

**NFR-P6: Performance Réseau Dégradé**
- Fonctionnement **utilisable** sur connexion 2G (dégradé mais pas bloquant)
- Fonctionnement **optimal** sur connexion 3G+
- Timeout réseau : **15 secondes** avant fallback offline
- Mesure : Tests sur connexions throttled (2G, 3G, 4G)

**NFR-P7: Taille Bundle & Assets**
- Bundle JavaScript initial : **< 500 KB (gzipped)**
- Taille totale assets (hors images produits) : **< 5 MB**
- Images produits optimisées : **< 200 KB par image**
- Mesure : Analyse bundle size et asset size

**NFR-P8: Gestion Médias Style Telegram**
- Téléchargement à la demande avec indicateur de progression
- Compression intelligente préservant qualité visuelle (JPEG progressif, WebP)
- Cache médias avec limite configurable par utilisateur (défaut : 500 MB)
- Purge automatique des médias les moins utilisés si limite atteinte
- Prévisualisation basse résolution instantanée, haute résolution à la demande
- Mesure : Taille cache moyenne, taux de compression, temps téléchargement

### Reliability & Availability

**NFR-R1: Disponibilité Offline**
- L'application doit fonctionner **100% offline** pour toutes les fonctionnalités core
- Aucune fonctionnalité critique ne doit nécessiter connexion internet
- Mesure : Tests fonctionnels complets en mode avion

**NFR-R2: Taux de Succès Synchronisation**
- Taux de succès synchronisation : **> 95%**
- Retry automatique en cas d'échec : **3 tentatives avec backoff exponentiel**
- Alerte utilisateur si échec après 3 tentatives
- Mesure : Ratio syncs réussies / syncs tentées

**NFR-R3: Gestion Conflits Synchronisation**
- Stratégie de résolution conflits : **Last-Write-Wins** (données serveur prioritaires)
- Aucune perte de données utilisateur (favoris, historique)
- Mesure : Tests de conflits simulés

**NFR-R4: Robustesse Cache**
- Cache doit survivre à fermeture/réouverture app
- Cache doit survivre à redémarrage tablette
- Capacité cache : **50-100 MB** pour catalogue complet
- Mesure : Tests persistence après redémarrage

**NFR-R5: Gestion Erreurs**
- Aucune erreur JavaScript ne doit bloquer l'application
- Messages d'erreur clairs et actionnables pour l'utilisateur
- Logging automatique des erreurs pour debugging
- Mesure : Monitoring erreurs JavaScript (Sentry ou équivalent)

**NFR-R6: Uptime Backend**
- API backend disponible : **99% du temps** (tolérance 7h downtime/mois)
- Dégradation gracieuse : App continue offline si backend indisponible
- Mesure : Uptime monitoring API

### Security

**NFR-S1: Transport Security**
- Toutes les communications HTTPS obligatoire (TLS 1.2 minimum)
- Certificat SSL valide sans exception
- Pas de mixed content (HTTP/HTTPS)
- Mesure : SSL Labs test A+ rating

**NFR-S2: Authentification Brand Managers**
- Authentification par **JWT tokens** avec expiration
- Refresh tokens pour sessions longue durée (7 jours max)
- Logout automatique après **30 minutes d'inactivité**
- Mesure : Tests authentification et expiration tokens

**NFR-S3: Autorisation Granulaire**
- Brand managers accèdent **uniquement** à leur section marque
- Permissions vérifiées côté serveur (pas uniquement frontend)
- Audit log des modifications par brand manager
- Mesure : Tests d'accès non autorisés (doivent échouer)

**NFR-S4: Protection Données Locales**
- Prix et marges stockés en clair (pas de chiffrement nécessaire - données non sensibles)
- Pas de données personnelles utilisateurs stockées
- Cache vidable par utilisateur si nécessaire
- Mesure : Audit stockage local

**NFR-S5: Protection CSRF/XSS**
- Protection CSRF sur toutes les requêtes authentifiées
- Sanitization inputs utilisateur (recherche, formulaires admin)
- Content Security Policy (CSP) configurée
- Mesure : Tests sécurité automatisés (OWASP Top 10)

### Scalability

**NFR-SC1: Charge Utilisateurs Concurrents**
- Support **500 utilisateurs actifs** simultanément
- Support **500 consultations/jour en pic** sans dégradation
- Mesure : Load testing avec 500 utilisateurs simulés

**NFR-SC2: Croissance Données**
- Support **1000+ produits** dans le catalogue sans dégradation performance
- Support **100+ campagnes actives** simultanément
- Mesure : Tests performance avec datasets réalistes

**NFR-SC3: Scalabilité Géographique (V3+)**
- Architecture doit permettre expansion multi-pays sans refonte
- Support **5000+ utilisateurs** pour expansion régionale
- Mesure : Architecture review pour scalabilité future

### Usability

**NFR-U1: Temps de Prise en Main**
- Vendeur doit être opérationnel en **< 5 minutes** sans formation
- Navigation intuitive sans consulter documentation
- Mesure : Tests utilisateurs chronométrés avec nouveaux vendeurs

**NFR-U2: Taux d'Erreur Utilisateur**
- Taux d'erreur utilisateur : **< 5%** des interactions
- Aucune action destructive sans confirmation
- Undo/Redo pour actions critiques (favoris, cache)
- Mesure : Analytics erreurs utilisateurs

**NFR-U3: Feedback Visuel**
- Feedback immédiat (< 100ms) pour toute action utilisateur
- Loading indicators pour actions > 1 seconde
- États clairs : online/offline, synchronisation en cours, erreur
- Mesure : Tests UX avec feedback timing

**NFR-U4: Responsive Design**
- Interface optimisée pour **landscape 1280x800** (Samsung Tab 6)
- Support **portrait 800x1280** (dégradé acceptable)
- Pas de support mobile < 768px (hors scope MVP)
- Mesure : Tests visuels sur résolutions cibles

**NFR-U5: Accessibilité Basique**
- Contraste minimum **4.5:1** pour texte normal
- Taille texte minimum **16px**
- Touch targets minimum **44x44 pixels**
- Navigation clavier fonctionnelle
- Mesure : WCAG 2.1 Level A compliance

### Maintainability

**NFR-M1: Autonomie Brand Managers**
- Brand managers publient contenu **< 24h** sans intervention IT
- Interface admin intuitive (prise en main < 15 minutes)
- Pas de workflow validation nécessaire
- Mesure : Time-to-publish moyen par brand manager

**NFR-M2: Monitoring & Observabilité**
- Logging centralisé des erreurs JavaScript
- Métriques performance collectées automatiquement
- Alertes automatiques si métriques critiques dégradées
- Mesure : Dashboard monitoring opérationnel

**NFR-M3: Déploiement & Rollback**
- Déploiement nouvelle version : **< 5 minutes**
- Rollback version précédente : **< 2 minutes**
- Zero-downtime deployment
- Mesure : Temps déploiement et rollback

**NFR-M4: Code Quality**
- Couverture tests automatisés : **> 70%** du code critique
- Pas de dette technique bloquante pour évolution V2
- Documentation technique à jour
- Mesure : Code coverage reports

### Compatibility

**NFR-C1: Navigateurs Supportés**
- **Chrome Android 90+** : Support complet (P0)
- **Samsung Internet 14+** : Support complet (P0)
- **Firefox Android 88+** : Support basique (P2)
- Safari iOS, Desktop browsers : Non supportés MVP
- Mesure : Tests cross-browser automatisés

**NFR-C2: Device Requirements**
- **Samsung Tab 6** (Android 11+) : Cible primaire
- RAM minimum : **3 GB**
- Stockage disponible : **200 MB** pour cache
- Résolution minimum : **1280x800**
- Mesure : Tests sur devices cibles

**NFR-C3: Backward Compatibility**
- Nouvelles versions doivent supporter données anciennes versions
- Migration automatique du cache si changement structure
- Pas de perte données utilisateur lors mise à jour
- Mesure : Tests migration entre versions
