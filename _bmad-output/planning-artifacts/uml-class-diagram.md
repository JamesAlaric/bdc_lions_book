# Diagramme de Classes UML - Lions' Book

**Date:** 2026-01-29  
**Author:** Jay  
**Type:** UML Class Diagram (Mermaid)

---

## Vue d'Ensemble

Ce diagramme représente les classes principales de l'application Lions' Book avec leurs attributs, méthodes et relations.

---

## Diagramme de Classes

```mermaid
classDiagram
    class Product {
        -UUID id
        -String name
        -Text description
        -UUID categoryId
        -UUID brandId
        -Decimal priceCHR
        -Decimal pricePSV
        -Decimal priceTT
        -Decimal priceMT
        -Decimal marginCHR
        -Decimal marginPSV
        -String format
        -String packaging
        -Decimal alcoholContent
        -JSON certifications
        -Text ingredients
        -Text conservation
        -StockStatus stockStatus
        -DateTime createdAt
        -DateTime updatedAt
        +getPriceByChannel(channel: Channel): Decimal
        +getMarginByChannel(channel: Channel): Decimal
        +isAvailable(): Boolean
        +getFullDetails(): ProductDetails
        +toJSON(): Object
    }

    class Brand {
        -UUID id
        -String name
        -String logoUrl
        -String colorPrimary
        -String colorSecondary
        -Text history
        -Text positioning
        -JSON values
        -DateTime createdAt
        -DateTime updatedAt
        +getProducts(): Product[]
        +getArguments(): Argument[]
        +getCampaigns(): Campaign[]
        +getBrandIdentity(): BrandIdentity
        +toJSON(): Object
    }

    class Category {
        -UUID id
        -String name
        -String icon
        -Integer displayOrder
        -UUID parentId
        -DateTime createdAt
        -DateTime updatedAt
        +getProducts(): Product[]
        +getSubcategories(): Category[]
        +getParentCategory(): Category
        +isRootCategory(): Boolean
        +toJSON(): Object
    }

    class Argument {
        -UUID id
        -UUID brandId
        -String title
        -Text content
        -Channel channel
        -ArgumentType argumentType
        -Integer displayOrder
        -JSON objections
        -DateTime createdAt
        -DateTime updatedAt
        +getObjections(): Objection[]
        +getResponseForObjection(objection: String): String
        +filterByChannel(channel: Channel): Boolean
        +toJSON(): Object
    }

    class Campaign {
        -UUID id
        -UUID brandId
        -String title
        -Text description
        -DateTime startDate
        -DateTime endDate
        -CampaignStatus status
        -String heroImageUrl
        -JSON visuals
        -JSON targetChannels
        -Priority priority
        -UUID publishedBy
        -DateTime createdAt
        -DateTime updatedAt
        +isActive(): Boolean
        +getMedia(): Media[]
        +publish(userId: UUID): Boolean
        +archive(): Boolean
        +getTargetedProducts(): Product[]
        +toJSON(): Object
    }

    class User {
        -UUID id
        -String email
        -String name
        -UserRole role
        -String passwordHash
        -DateTime lastLogin
        -JSON managedBrands
        -DateTime createdAt
        -DateTime updatedAt
        +authenticate(password: String): Boolean
        +canManageBrand(brandId: UUID): Boolean
        +getManagedBrands(): Brand[]
        +publishCampaign(campaign: Campaign): Boolean
        +toJSON(): Object
    }

    class Media {
        -UUID id
        -UUID campaignId
        -String fileUrl
        -FileType fileType
        -Integer fileSize
        -String thumbnailUrl
        -DateTime createdAt
        +download(): Blob
        +getThumbnail(): String
        +isImage(): Boolean
        +isPDF(): Boolean
        +is3D(): Boolean
        +toJSON(): Object
    }

    class SearchService {
        -IndexedDB db
        -SearchIndex index
        +search(query: String, filters: SearchFilters): Product[]
        +searchByName(name: String): Product[]
        +searchByBrand(brandId: UUID): Product[]
        +searchByCategory(categoryId: UUID): Product[]
        +applyFilters(products: Product[], filters: SearchFilters): Product[]
        +getSuggestions(query: String): String[]
        +saveSearchHistory(query: String): void
        +getSearchHistory(): String[]
    }

    class SyncService {
        -ServiceWorker sw
        -IndexedDB db
        -SyncQueue queue
        +syncAll(): Promise~void~
        +syncProducts(): Promise~void~
        +syncBrands(): Promise~void~
        +syncCampaigns(): Promise~void~
        +checkForUpdates(): Promise~Boolean~
        +getLastSyncDate(): DateTime
        +isDataStale(): Boolean
        +queueSync(syncType: String): void
    }

    class CacheService {
        -Cache cache
        -CacheStrategy strategy
        +cacheProduct(product: Product): Promise~void~
        +getCachedProduct(id: UUID): Promise~Product~
        +cacheMedia(media: Media): Promise~void~
        +getCachedMedia(id: UUID): Promise~Blob~
        +clearCache(): Promise~void~
        +getCacheSize(): Promise~Integer~
        +evictOldEntries(): Promise~void~
    }

    class OfflineService {
        -Boolean isOnline
        -EventEmitter events
        +checkConnectivity(): Boolean
        +enableOfflineMode(): void
        +disableOfflineMode(): void
        +onOnline(callback: Function): void
        +onOffline(callback: Function): void
        +getNetworkStatus(): NetworkStatus
    }

    %% Relations
    Product "N" --> "1" Brand : belongs to
    Product "N" --> "1" Category : belongs to
    Argument "N" --> "1" Brand : describes
    Campaign "N" --> "1" Brand : promotes
    Campaign "N" --> "1" User : published by
    Campaign "1" --> "N" Media : contains
    Category "N" --> "1" Category : parent

    %% Service Dependencies
    SearchService ..> Product : searches
    SearchService ..> Brand : filters by
    SearchService ..> Category : filters by
    SyncService ..> Product : syncs
    SyncService ..> Brand : syncs
    SyncService ..> Campaign : syncs
    CacheService ..> Product : caches
    CacheService ..> Media : caches
    OfflineService ..> SyncService : triggers
```

---

## Enums et Types

```mermaid
classDiagram
    class Channel {
        <<enumeration>>
        CHR
        PSV
        TT
        MT
    }

    class StockStatus {
        <<enumeration>>
        IN_STOCK
        LOW_STOCK
        OUT_OF_STOCK
        DISCONTINUED
    }

    class ArgumentType {
        <<enumeration>>
        QUALITY
        PRICE
        AVAILABILITY
        BRAND_HERITAGE
        TECHNICAL
    }

    class CampaignStatus {
        <<enumeration>>
        DRAFT
        ACTIVE
        ENDED
        ARCHIVED
    }

    class Priority {
        <<enumeration>>
        LOW
        MEDIUM
        HIGH
        URGENT
    }

    class UserRole {
        <<enumeration>>
        ADMIN
        BRAND_MANAGER
    }

    class FileType {
        <<enumeration>>
        IMAGE
        PDF
        MODEL_3D
    }
```

---

## Classes de Valeur (Value Objects)

```mermaid
classDiagram
    class ProductDetails {
        +Product product
        +Brand brand
        +Category category
        +Argument[] arguments
        +Campaign[] activeCampaigns
        +toJSON(): Object
    }

    class BrandIdentity {
        +String name
        +String logoUrl
        +String colorPrimary
        +String colorSecondary
        +getColorScheme(): Object
    }

    class SearchFilters {
        +Channel[] channels
        +UUID[] brandIds
        +UUID[] categoryIds
        +Decimal minPrice
        +Decimal maxPrice
        +StockStatus[] stockStatuses
        +apply(products: Product[]): Product[]
    }

    class Objection {
        +String objection
        +String response
        +toJSON(): Object
    }

    class NetworkStatus {
        +Boolean isOnline
        +String connectionType
        +Integer bandwidth
        +DateTime lastChecked
    }

    class SyncStatus {
        +DateTime lastSync
        +Boolean isSyncing
        +Integer itemsSynced
        +Integer itemsTotal
        +getProgress(): Float
    }
```

---

## Notes d'Implémentation

### **Patterns Utilisés**

1. **Repository Pattern**
   - `ProductRepository`, `BrandRepository`, `CampaignRepository`
   - Abstraction de la couche de données (YAML vs DB)

2. **Service Layer**
   - `SearchService`, `SyncService`, `CacheService`, `OfflineService`
   - Logique métier centralisée

3. **Value Objects**
   - `ProductDetails`, `BrandIdentity`, `SearchFilters`
   - Objets immuables sans identité

4. **Strategy Pattern**
   - `CacheStrategy` (CacheFirst, NetworkFirst, StaleWhileRevalidate)
   - Différentes stratégies de cache selon le type de contenu

### **Principes SOLID**

- ✅ **Single Responsibility** : Chaque classe a une responsabilité unique
- ✅ **Open/Closed** : Extensions via interfaces (ex: CacheStrategy)
- ✅ **Liskov Substitution** : Hiérarchie Category respecte le principe
- ✅ **Interface Segregation** : Services avec interfaces spécifiques
- ✅ **Dependency Inversion** : Services dépendent d'abstractions

### **Gestion Offline-First**

```typescript
// Exemple d'utilisation
class ProductService {
  constructor(
    private cacheService: CacheService,
    private syncService: SyncService,
    private offlineService: OfflineService
  ) {}

  async getProduct(id: UUID): Promise<Product> {
    // 1. Essayer le cache d'abord
    const cached = await this.cacheService.getCachedProduct(id);
    if (cached) return cached;

    // 2. Si online, fetch depuis le serveur
    if (this.offlineService.checkConnectivity()) {
      const product = await this.fetchFromServer(id);
      await this.cacheService.cacheProduct(product);
      return product;
    }

    // 3. Si offline, retourner erreur ou fallback
    throw new OfflineError('Product not available offline');
  }
}
```

---

## Relations Clés

| Relation | Type | Cardinalité | Description |
|----------|------|-------------|-------------|
| Product → Brand | Association | N:1 | Chaque produit appartient à une marque |
| Product → Category | Association | N:1 | Chaque produit appartient à une catégorie |
| Argument → Brand | Association | N:1 | Arguments organisés par marque |
| Campaign → Brand | Association | N:1 | Campagnes liées à une marque |
| Campaign → User | Association | N:1 | Campagnes publiées par un brand manager |
| Campaign → Media | Composition | 1:N | Campagne contient plusieurs médias |
| Category → Category | Association | N:1 | Hiérarchie de catégories (parent/enfant) |

---

## Méthodes Critiques

### **Product**
- `getPriceByChannel(channel)` : Retourne le prix selon le canal de distribution
- `getMarginByChannel(channel)` : Retourne la marge selon le canal
- `isAvailable()` : Vérifie la disponibilité en stock

### **SearchService**
- `search(query, filters)` : Recherche multi-critères < 5 secondes
- `getSuggestions(query)` : Suggestions prédictives pendant la saisie
- `applyFilters(products, filters)` : Application des filtres avancés

### **SyncService**
- `syncAll()` : Synchronisation complète (produits, marques, campagnes)
- `checkForUpdates()` : Vérification incrémentale des mises à jour
- `isDataStale()` : Détection données anciennes (> 1 mois)

### **CacheService**
- `cacheProduct(product)` : Mise en cache d'un produit
- `getCacheSize()` : Taille du cache pour gestion stockage
- `evictOldEntries()` : Éviction des entrées anciennes (LRU)

---

## Prochaines Étapes

1. ✅ **Diagramme de Classes** - Complété
2. ⏭️ **Diagrammes de Séquence** - Recherche, Sync, Publication
3. ⏭️ **Diagramme de Composants** - Architecture frontend/backend
4. ⏭️ **Documentation API** - Endpoints REST/GraphQL
5. ⏭️ **Diagramme de Déploiement** - Infrastructure

---

**Fichier généré automatiquement - Lions' Book MVP**
