# Diagrammes de Séquence UML - Lions' Book

**Date:** 2026-01-29  
**Author:** Jay  
**Type:** UML Sequence Diagrams (Mermaid)

---

## Vue d'Ensemble

Ce document contient les diagrammes de séquence pour les 3 flux critiques de l'application Lions' Book :

1. **Recherche de Produit** - Flux de recherche instantanée < 5 secondes
2. **Synchronisation Offline** - Flux de sync automatique intelligente
3. **Publication de Campagne** - Flux de publication par Brand Manager

---

## 1. Séquence : Recherche de Produit

**Acteur :** Vendeur (Marcel, Aminata, Éric)  
**Objectif :** Trouver un produit en < 5 secondes pendant négociation client  
**Mode :** Online ou Offline

```mermaid
sequenceDiagram
    actor Vendeur
    participant UI as Interface Recherche
    participant SearchService
    participant CacheService
    participant IndexedDB
    participant OfflineService
    participant API as Backend API
    
    Vendeur->>UI: Saisit "Castel Beer"
    activate UI
    
    UI->>SearchService: search("Castel Beer", filters)
    activate SearchService
    
    SearchService->>OfflineService: checkConnectivity()
    activate OfflineService
    OfflineService-->>SearchService: isOnline: true/false
    deactivate OfflineService
    
    alt Mode Offline ou Cache disponible
        SearchService->>IndexedDB: query("Castel Beer")
        activate IndexedDB
        IndexedDB-->>SearchService: products[]
        deactivate IndexedDB
        
        SearchService->>SearchService: applyFilters(products, filters)
        SearchService->>SearchService: rankResults()
        
    else Mode Online et pas de cache
        SearchService->>API: GET /products/search?q=Castel Beer
        activate API
        API-->>SearchService: products[]
        deactivate API
        
        SearchService->>CacheService: cacheResults(products)
        activate CacheService
        CacheService->>IndexedDB: store(products)
        deactivate CacheService
    end
    
    SearchService-->>UI: results[] (< 5 sec)
    deactivate SearchService
    
    UI->>UI: renderResults(results)
    UI-->>Vendeur: Affiche 5 résultats
    deactivate UI
    
    Vendeur->>UI: Clic sur "Castel Beer 65cl"
    activate UI
    
    UI->>SearchService: getProductDetails(productId)
    activate SearchService
    
    SearchService->>CacheService: getCachedProduct(productId)
    activate CacheService
    CacheService->>IndexedDB: get(productId)
    IndexedDB-->>CacheService: product
    CacheService-->>SearchService: product
    deactivate CacheService
    
    SearchService->>SearchService: enrichWithBrandData()
    SearchService->>SearchService: enrichWithArguments()
    
    SearchService-->>UI: productDetails
    deactivate SearchService
    
    UI->>UI: renderProductSheet(productDetails)
    UI-->>Vendeur: Fiche produit complète
    deactivate UI
    
    Note over Vendeur,API: ⚡ Performance: < 5 sec total<br/>✅ Fonctionne 100% offline
```

---

## 2. Séquence : Synchronisation Offline

**Acteur :** Système (automatique) ou Vendeur (manuel)  
**Objectif :** Sync intelligente des données (produits, marques, campagnes)  
**Déclencheur :** Connexion détectée, action manuelle, ou planifié

```mermaid
sequenceDiagram
    actor Vendeur
    participant UI as Interface App
    participant SyncService
    participant OfflineService
    participant CacheService
    participant IndexedDB
    participant API as Backend API
    participant ServiceWorker as Service Worker
    
    Note over Vendeur,ServiceWorker: 🔄 DÉCLENCHEMENT SYNC
    
    alt Sync Automatique (Connexion détectée)
        OfflineService->>OfflineService: detectConnectivity()
        OfflineService->>SyncService: trigger("auto")
    else Sync Manuelle (Vendeur)
        Vendeur->>UI: Clic "Synchroniser"
        UI->>SyncService: syncAll()
    end
    
    activate SyncService
    
    SyncService->>OfflineService: checkConnectivity()
    activate OfflineService
    OfflineService-->>SyncService: isOnline: true
    deactivate OfflineService
    
    alt Pas de connexion
        SyncService->>UI: showError("Pas de connexion")
        UI-->>Vendeur: Toast "Sync impossible"
    else Connexion disponible
        
        Note over SyncService,API: 📦 SYNC PRODUITS (YAML Statique)
        
        SyncService->>IndexedDB: getLastSyncDate("products")
        IndexedDB-->>SyncService: lastSync: 2026-01-20
        
        SyncService->>API: GET /sync/products?since=2026-01-20
        activate API
        API-->>SyncService: products[] (delta)
        deactivate API
        
        SyncService->>CacheService: cacheProducts(products)
        activate CacheService
        CacheService->>IndexedDB: bulkStore(products)
        CacheService->>ServiceWorker: updateCache(products)
        deactivate CacheService
        
        Note over SyncService,API: 🏷️ SYNC MARQUES & ARGUMENTS
        
        SyncService->>API: GET /sync/brands?since=2026-01-20
        activate API
        API-->>SyncService: brands[]
        deactivate API
        
        SyncService->>CacheService: cacheBrands(brands)
        activate CacheService
        CacheService->>IndexedDB: bulkStore(brands)
        deactivate CacheService
        
        SyncService->>API: GET /sync/arguments?since=2026-01-20
        activate API
        API-->>SyncService: arguments[]
        deactivate API
        
        SyncService->>CacheService: cacheArguments(arguments)
        activate CacheService
        CacheService->>IndexedDB: bulkStore(arguments)
        deactivate CacheService
        
        Note over SyncService,API: 🎉 SYNC CAMPAGNES (Incrémental)
        
        SyncService->>API: GET /sync/campaigns?since=2026-01-20
        activate API
        API-->>SyncService: campaigns[]
        deactivate API
        
        SyncService->>CacheService: cacheCampaigns(campaigns)
        activate CacheService
        CacheService->>IndexedDB: bulkStore(campaigns)
        deactivate CacheService
        
        Note over SyncService,API: 🖼️ SYNC MÉDIAS (À la demande)
        
        SyncService->>SyncService: identifyNewMedia(campaigns)
        
        loop Pour chaque média prioritaire
            SyncService->>API: GET /media/{id}/thumbnail
            activate API
            API-->>SyncService: thumbnail (blob)
            deactivate API
            
            SyncService->>CacheService: cacheThumbnail(thumbnail)
            activate CacheService
            CacheService->>ServiceWorker: cacheMedia(thumbnail)
            deactivate CacheService
        end
        
        Note over SyncService,IndexedDB: ✅ FINALISATION
        
        SyncService->>IndexedDB: updateSyncMetadata(now())
        SyncService->>UI: showSuccess("Sync réussie")
        UI-->>Vendeur: Toast "✅ Données à jour"
        
        SyncService->>UI: updateBadges("new")
        UI->>UI: showNewContentBadges()
        
    end
    
    deactivate SyncService
    
    Note over Vendeur,ServiceWorker: ⚡ Sync intelligente:<br/>✅ Delta uniquement (pas full sync)<br/>✅ Médias à la demande<br/>✅ Background sync si échec
```

---

## 3. Séquence : Publication de Campagne

**Acteur :** Brand Manager (Sophie)  
**Objectif :** Publier une campagne promo en 90 minutes (vs 1 semaine)  
**Mode :** Online uniquement (interface admin)

```mermaid
sequenceDiagram
    actor Sophie as Brand Manager
    participant UI as Interface Admin
    participant AuthService
    participant CampaignService
    participant MediaService
    participant NotificationService
    participant DB as Database
    participant Storage as Cloud Storage
    participant API as Backend API
    participant Push as Push Service
    
    Note over Sophie,Push: 🔐 AUTHENTIFICATION
    
    Sophie->>UI: Accède /admin
    activate UI
    
    UI->>AuthService: checkAuth()
    activate AuthService
    
    alt Pas authentifié
        AuthService-->>UI: notAuthenticated
        UI-->>Sophie: Redirect /login
        
        Sophie->>UI: Login (email, password)
        UI->>AuthService: authenticate(email, password)
        AuthService->>DB: verifyCredentials(email, passwordHash)
        activate DB
        DB-->>AuthService: user
        deactivate DB
        
        AuthService->>AuthService: generateToken(user)
        AuthService-->>UI: token, user
        UI->>UI: storeToken(token)
    end
    
    AuthService-->>UI: authenticated
    deactivate AuthService
    
    UI-->>Sophie: Dashboard Admin
    deactivate UI
    
    Note over Sophie,Push: 📝 CRÉATION CAMPAGNE
    
    Sophie->>UI: Clic "Nouvelle Campagne"
    activate UI
    
    UI-->>Sophie: Formulaire campagne
    deactivate UI
    
    Sophie->>UI: Remplit formulaire<br/>(titre, description, dates, marque)
    activate UI
    
    UI->>UI: validateForm()
    
    UI-->>Sophie: Demande upload visuels
    deactivate UI
    
    Note over Sophie,Storage: 🖼️ UPLOAD MÉDIAS
    
    Sophie->>UI: Upload 5 visuels (PLV, affiches, 3D)
    activate UI
    
    loop Pour chaque fichier
        UI->>MediaService: uploadMedia(file)
        activate MediaService
        
        MediaService->>MediaService: validateFile(file)
        MediaService->>MediaService: compressImage(file)
        MediaService->>MediaService: generateThumbnail(file)
        
        MediaService->>Storage: upload(file)
        activate Storage
        Storage-->>MediaService: fileUrl
        deactivate Storage
        
        MediaService->>Storage: upload(thumbnail)
        activate Storage
        Storage-->>MediaService: thumbnailUrl
        deactivate Storage
        
        MediaService-->>UI: mediaId, urls
        deactivate MediaService
        
        UI->>UI: addMediaToList(mediaId)
    end
    
    UI-->>Sophie: Aperçu visuels uploadés
    deactivate UI
    
    Note over Sophie,Push: 🚀 PUBLICATION
    
    Sophie->>UI: Clic "Publier Maintenant"
    activate UI
    
    UI->>CampaignService: createCampaign(campaignData)
    activate CampaignService
    
    CampaignService->>AuthService: checkPermissions(user, brandId)
    activate AuthService
    AuthService-->>CampaignService: hasPermission: true
    deactivate AuthService
    
    CampaignService->>DB: INSERT campaign
    activate DB
    DB-->>CampaignService: campaignId
    deactivate DB
    
    CampaignService->>DB: INSERT media (campaignId, mediaIds)
    activate DB
    DB-->>CampaignService: success
    deactivate DB
    
    CampaignService->>CampaignService: setCampaignStatus("active")
    
    CampaignService->>DB: UPDATE campaign SET status='active'
    activate DB
    DB-->>CampaignService: success
    deactivate DB
    
    Note over CampaignService,Push: 📢 NOTIFICATION VENDEURS
    
    CampaignService->>NotificationService: notifyNewCampaign(campaignId)
    activate NotificationService
    
    NotificationService->>DB: getTargetedUsers(campaign.targetChannels)
    activate DB
    DB-->>NotificationService: users[] (500 vendeurs)
    deactivate DB
    
    NotificationService->>Push: sendPushNotification(users, campaign)
    activate Push
    Push-->>NotificationService: sent: 500
    deactivate Push
    
    NotificationService->>DB: INSERT notifications (users, campaignId)
    activate DB
    DB-->>NotificationService: success
    deactivate DB
    
    NotificationService-->>CampaignService: notificationsSent: 500
    deactivate NotificationService
    
    CampaignService-->>UI: campaignPublished
    deactivate CampaignService
    
    UI->>UI: showSuccess("Campagne publiée!")
    UI-->>Sophie: "✅ 500 vendeurs notifiés"
    deactivate UI
    
    Note over Sophie,Push: 📊 SUIVI ADOPTION
    
    Sophie->>UI: Accède "Statistiques"
    activate UI
    
    UI->>CampaignService: getCampaignStats(campaignId)
    activate CampaignService
    
    CampaignService->>DB: SELECT stats WHERE campaignId
    activate DB
    DB-->>CampaignService: stats (views, downloads)
    deactivate DB
    
    CampaignService-->>UI: stats
    deactivate CampaignService
    
    UI->>UI: renderStats(stats)
    UI-->>Sophie: "84% vendeurs ont consulté"
    deactivate UI
    
    Note over Sophie,Push: ⚡ Time-to-Market:<br/>✅ 90 minutes (vs 1 semaine)<br/>✅ 500 vendeurs notifiés instantanément<br/>✅ Autonomie totale (0 IT)
```

---

## Scénarios d'Erreur

### **Recherche : Pas de Résultats**

```mermaid
sequenceDiagram
    actor Vendeur
    participant UI
    participant SearchService
    participant IndexedDB
    
    Vendeur->>UI: Recherche "Produit Inexistant"
    UI->>SearchService: search("Produit Inexistant")
    SearchService->>IndexedDB: query("Produit Inexistant")
    IndexedDB-->>SearchService: []
    SearchService-->>UI: results: []
    UI->>UI: showNoResults()
    UI-->>Vendeur: "Aucun résultat"<br/>+ Suggestions alternatives
```

### **Sync : Échec Connexion**

```mermaid
sequenceDiagram
    actor Vendeur
    participant UI
    participant SyncService
    participant OfflineService
    participant ServiceWorker
    
    Vendeur->>UI: Clic "Synchroniser"
    UI->>SyncService: syncAll()
    SyncService->>OfflineService: checkConnectivity()
    OfflineService-->>SyncService: isOnline: false
    SyncService->>ServiceWorker: queueBackgroundSync()
    SyncService-->>UI: syncQueued
    UI-->>Vendeur: "Sync en attente de connexion"
    
    Note over ServiceWorker: Attente connexion...
    
    OfflineService->>ServiceWorker: onOnline()
    ServiceWorker->>SyncService: retrySync()
    SyncService-->>UI: syncSuccess
    UI-->>Vendeur: Toast "✅ Sync réussie"
```

### **Publication : Permissions Insuffisantes**

```mermaid
sequenceDiagram
    actor Sophie
    participant UI
    participant CampaignService
    participant AuthService
    
    Sophie->>UI: Publie campagne Marque X
    UI->>CampaignService: createCampaign(campaignData)
    CampaignService->>AuthService: checkPermissions(user, brandX)
    AuthService-->>CampaignService: hasPermission: false
    CampaignService-->>UI: error: "Permission denied"
    UI-->>Sophie: "❌ Vous ne gérez pas cette marque"
```

---

## Métriques de Performance

| Flux | Métrique Cible | Mesure |
|------|---------------|--------|
| **Recherche** | < 5 secondes | P90 (90% des requêtes) |
| **Sync Complète** | < 30 secondes | Moyenne pour 500 produits |
| **Sync Incrémentale** | < 10 secondes | Moyenne pour delta |
| **Publication Campagne** | < 5 secondes | Temps serveur uniquement |
| **Upload Médias** | < 2 secondes/fichier | Pour images < 5MB |
| **Notification Push** | < 10 secondes | Pour 500 vendeurs |

---

## Notes d'Implémentation

### **Optimisations Recherche**

1. **Index Full-Text** sur IndexedDB pour recherche rapide
2. **Debouncing** de 300ms sur la saisie utilisateur
3. **Pagination** des résultats (10 par page)
4. **Cache des recherches fréquentes** (LRU cache)

### **Stratégie Sync**

1. **Sync Delta** : Uniquement les changements depuis lastSync
2. **Batch Processing** : Traitement par lots de 50 items
3. **Background Sync API** : Retry automatique si échec
4. **Compression** : Gzip pour réduire la bande passante

### **Gestion Médias**

1. **Lazy Loading** : Téléchargement à la demande
2. **Progressive JPEG** : Affichage progressif
3. **WebP Format** : Compression optimale (30% plus léger)
4. **Thumbnail First** : Afficher miniature avant full image

---

## Prochaines Étapes

1. ✅ **Diagrammes de Séquence** - Complétés (3 flux critiques)
2. ⏭️ **Diagramme de Composants** - Architecture frontend/backend
3. ⏭️ **Documentation API** - Endpoints REST détaillés
4. ⏭️ **Diagramme de Déploiement** - Infrastructure cloud

---

**Fichier généré automatiquement - Lions' Book MVP**
