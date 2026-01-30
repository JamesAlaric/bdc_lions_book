# Story 2.1: Configurer IndexedDB pour Stockage Local Catalogue

Status: done

## Story

As a vendeur,
I want que le catalogue soit stocké localement sur ma tablette,
So that je peux consulter les produits même sans connexion internet.

## Acceptance Criteria

**Given** l'application PWA est installée
**When** je lance l'app pour la première fois
**Then** une base de données IndexedDB est créée avec le schéma catalogue (produits, marques, catégories)
**And** la capacité de stockage est configurée pour 50-100 MB minimum
**And** un wrapper TypeScript pour IndexedDB est implémenté (lib/storage/)
**And** les opérations CRUD de base sont fonctionnelles (create, read, update, delete)
**And** la base de données survit au redémarrage de la tablette

## Business Context

**Epic 2 - Catalogue Produits & Navigation Offline-First:**
Les vendeurs peuvent consulter le catalogue complet BDC avec prix, marges et informations produits, fonctionnant 100% offline même en zones rurales sans connexion.

**Valeur utilisateur:**
- Accès catalogue complet offline (Journey Éric - vendeur en zone rurale)
- Prix et marges pour négociation client
- Équité urbain/rural - tous les vendeurs ont accès aux mêmes informations
- Autonomie totale sans dépendance réseau

**Functional Requirements couverts:**
- FR1: Catalogue complet BDC (Bières, Soft, Eaux, Vins & Spiritueux)
- FR2: Prix produits et marges
- FR3: Historique et positionnement marque
- FR35: Fonctionnement 100% offline

## Technical Requirements

### Architecture Decisions (from architecture.md)

**IndexedDB Structure - 7 Stores Définis:**

```typescript
// Store 1: Products (Catalogue complet)
interface ProductStore {
  id: string              // UUID produit
  name: string            // Nom produit
  brand: string           // Marque
  category: 'biere' | 'soft' | 'eau' | 'vin' | 'spiritueux'
  canal: 'CHR' | 'PSV' | 'TT' | 'MT'  // Canal de vente
  prix: number            // Prix unitaire
  marge: number           // Marge %
  specs: {                // Spécifications produit
    alcool?: number       // % alcool (si applicable)
    contenance: number    // ml ou L
    nbBouteilles?: number // Nombre dans pack
    format: string        // "Bouteille", "Canette", "Pack"
  }
  certifications?: string[]  // ISO, Bio, etc. (NOUVEAU retours terrain)
  ingredients?: string[]     // Ingrédients constitutifs (NOUVEAU)
  conservation?: string      // Conseils conservation (NOUVEAU)
  lastUpdated: number     // Timestamp dernière MAJ
}

// Store 2: Brands (Argumentaires)
interface BrandStore {
  id: string
  name: string
  histoire: string
  positionnement: string
  argumentaires: string[]
  lastUpdated: number
}

// Store 3: Objections (Scripts réponses)
interface ObjectionStore {
  id: string
  productId: string
  objection: string
  reponse: string
  canal?: string          // Spécifique à un canal
  lastUpdated: number
}

// Store 4: Campaigns (Activations)
interface CampaignStore {
  id: string
  title: string
  description: string
  startDate: number
  endDate: number
  mediaIds: string[]
  lastUpdated: number
}

// Store 5: Media (Cache visuels)
interface MediaStore {
  id: string
  url: string
  blob: Blob | null       // Données binaires image
  thumbnail: Blob | null  // Miniature basse résolution
  size: number            // Taille en bytes
  cached: boolean         // Téléchargé ou non
  lastAccessed: number    // Pour cleanup LRU
}

// Store 6: UserData (Favoris, historique)
interface UserDataStore {
  id: string
  type: 'favorite' | 'history' | 'preference'
  data: object
  lastUpdated: number
}

// Store 7: SyncMetadata (État synchronisation)
interface SyncMetadataStore {
  store: string           // Nom du store
  lastSyncTimestamp: number
  version: number
  pendingChanges: number
}
```

**Storage Capacity:**
- Minimum: 50 MB (catalogue de base)
- Target: 100 MB (catalogue complet + métadonnées)
- Maximum: 500 MB (avec médias téléchargés)

**Library: idb 8.0.3**
- Wrapper moderne pour IndexedDB avec TypeScript
- API Promise-based (async/await)
- Type-safe avec génériques TypeScript
- Déjà installé dans le projet (Story 1.6)

### File Structure Requirements

```
src/lib/storage/
├── database.ts          # Configuration DB et init (EXISTE déjà - Story 1.6)
├── migrations.ts        # Système de migration (EXISTE déjà - Story 1.6)
├── catalogue.ts         # 🆕 CRUD operations pour catalogue (À CRÉER)
├── brands.ts            # 🆕 CRUD operations pour marques (À CRÉER)
├── sync.ts              # 🆕 Métadonnées sync (À CRÉER)
└── types.ts             # 🆕 Interfaces TypeScript (À CRÉER)
```

**IMPORTANT:** Les fichiers `database.ts` et `migrations.ts` existent déjà depuis la Story 1.6. Il faut les **ÉTENDRE** pour ajouter les nouveaux stores du catalogue, pas les réécrire.

### Previous Story Intelligence (Story 1.6)

**Learnings from Story 1.6 - IndexedDB Versioning:**

✅ **Ce qui fonctionne bien:**
- Library `idb@8.0.3` installée et opérationnelle
- Pattern `database.ts` avec `initDatabase()` et `getDatabase()`
- Système de versioning avec `CURRENT_DB_VERSION`
- Migrations up/down dans `migrations.ts`
- Cleanup automatique des anciennes versions (max 2)
- Metadata store pour tracking de version

✅ **Code existant à réutiliser:**
```typescript
// src/lib/storage/database.ts (EXISTE)
import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';

export interface LionsBookDB extends DBSchema {
  metadata: { key: string; value: { version: string; lastMigration: string; createdAt: string; }; };
  cache_v1: { key: string; value: any; };
  cache_v2: { key: string; value: any; };
  // 🆕 AJOUTER ICI les nouveaux stores catalogue
}

const DB_NAME = 'lions-book-db';
export const CURRENT_DB_VERSION = 2; // 🆕 INCRÉMENTER à 3

export async function initDatabase(): Promise<IDBPDatabase<LionsBookDB>> {
  const db = await openDB<LionsBookDB>(DB_NAME, CURRENT_DB_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      // Migrations existantes v1, v2...
      
      // 🆕 AJOUTER Migration v3 pour catalogue
      if (oldVersion < 3) {
        db.createObjectStore('products', { keyPath: 'id' });
        db.createObjectStore('brands', { keyPath: 'id' });
        db.createObjectStore('objections', { keyPath: 'id' });
        db.createObjectStore('campaigns', { keyPath: 'id' });
        db.createObjectStore('media', { keyPath: 'id' });
        db.createObjectStore('userData', { keyPath: 'id' });
        db.createObjectStore('syncMetadata', { keyPath: 'store' });
      }
    },
  });
  
  return db;
}
```

⚠️ **Pièges à éviter:**
- Ne PAS réécrire `database.ts` from scratch - ÉTENDRE le fichier existant
- Ne PAS supprimer les stores `cache_v1`, `cache_v2` (utilisés par Story 1.6)
- Respecter le pattern de versioning existant (incrémenter `CURRENT_DB_VERSION`)
- Ajouter une migration v3 dans `migrations.ts` pour les nouveaux stores

✅ **Pattern de migration à suivre:**
```typescript
// src/lib/storage/migrations.ts (ÉTENDRE)
export const migrations: Migration[] = [
  // ... migrations v1, v2 existantes
  {
    version: 3,
    name: 'Add catalogue stores',
    up: async () => {
      console.log('Migration v3: Creating catalogue stores');
      // Stores créés dans upgrade() de initDatabase
    },
    down: async () => {
      console.log('Rollback v3: Cannot rollback catalogue stores');
      // Pas de rollback pour stores critiques
    },
  },
];
```

### Git Intelligence (Recent Commits)

**Derniers commits pertinents:**
```
df788ba - feat: Complete Story 1.6 - Rollback & Versioning Cache System
  Files: database.ts, migrations.ts, rollback.ts, featureFlags.ts
  Pattern: IndexedDB avec idb, versioning, migrations up/down
  
883960a - docs: Complete Epic 1 Retrospective
  Learnings: Hybrid Tailwind+Emotion, Type safety, Incremental approach
  
59d0211 - feat: Complete Epic 1 - PWA Setup & Infrastructure
  Pattern: Commits atomiques par story, documentation complète
```

**Code Patterns Établis:**
- Imports avec `import type` pour types (verbatimModuleSyntax)
- Async/await pour toutes les opérations DB
- Error handling avec try/catch et logging
- Exports named (pas de default exports)
- Documentation inline avec commentaires

### Testing Requirements

**Tests à implémenter (Vitest):**

```typescript
// src/lib/storage/catalogue.test.ts
describe('Catalogue Storage', () => {
  it('should create product in IndexedDB', async () => {
    const product = { id: '1', name: 'Castel Beer', brand: 'Castel', ... };
    await createProduct(product);
    const retrieved = await getProduct('1');
    expect(retrieved).toEqual(product);
  });

  it('should update existing product', async () => {
    const product = { id: '1', name: 'Castel Beer', prix: 500 };
    await createProduct(product);
    await updateProduct('1', { prix: 550 });
    const updated = await getProduct('1');
    expect(updated.prix).toBe(550);
  });

  it('should delete product', async () => {
    await createProduct({ id: '1', name: 'Test' });
    await deleteProduct('1');
    const deleted = await getProduct('1');
    expect(deleted).toBeUndefined();
  });

  it('should list all products', async () => {
    await createProduct({ id: '1', name: 'Product 1' });
    await createProduct({ id: '2', name: 'Product 2' });
    const products = await getAllProducts();
    expect(products).toHaveLength(2);
  });

  it('should filter products by category', async () => {
    await createProduct({ id: '1', category: 'biere' });
    await createProduct({ id: '2', category: 'soft' });
    const bieres = await getProductsByCategory('biere');
    expect(bieres).toHaveLength(1);
  });

  it('should persist data after DB close/reopen', async () => {
    await createProduct({ id: '1', name: 'Persistent' });
    // Simuler fermeture/réouverture
    const db = await getDatabase();
    db.close();
    const newDb = await initDatabase();
    const product = await getProduct('1');
    expect(product.name).toBe('Persistent');
  });
});
```

**Coverage attendue:** > 80% pour les fichiers storage

### Non-Functional Requirements

**Performance:**
- Initialisation DB < 500ms au premier lancement
- Opérations CRUD < 50ms (lecture/écriture)
- Bulk insert 1000 produits < 2 secondes

**Fiabilité:**
- DB survit au redémarrage tablette (persistence garantie)
- Transactions atomiques (rollback automatique si erreur)
- Pas de corruption de données

**Scalabilité:**
- Support 1000+ produits sans dégradation performance
- Quota storage 50-100 MB minimum (vérifier disponibilité)

## Implementation Guidance

### Step-by-Step Implementation

**Étape 1: Étendre database.ts avec nouveaux stores**
1. Ouvrir `src/lib/storage/database.ts` (EXISTE déjà)
2. Ajouter les 7 nouveaux stores à l'interface `LionsBookDB`
3. Incrémenter `CURRENT_DB_VERSION` de 2 à 3
4. Ajouter la migration v3 dans `upgrade()` pour créer les stores
5. Ajouter index pour `products.category` et `products.brand` (performance)

**Étape 2: Créer types.ts avec interfaces TypeScript**
1. Créer `src/lib/storage/types.ts`
2. Définir toutes les interfaces (ProductStore, BrandStore, etc.)
3. Exporter les types pour réutilisation dans l'app

**Étape 3: Créer catalogue.ts avec CRUD operations**
1. Créer `src/lib/storage/catalogue.ts`
2. Implémenter les fonctions CRUD pour products:
   - `createProduct(product: ProductStore): Promise<void>`
   - `getProduct(id: string): Promise<ProductStore | undefined>`
   - `updateProduct(id: string, updates: Partial<ProductStore>): Promise<void>`
   - `deleteProduct(id: string): Promise<void>`
   - `getAllProducts(): Promise<ProductStore[]>`
   - `getProductsByCategory(category: string): Promise<ProductStore[]>`
   - `getProductsByBrand(brand: string): Promise<ProductStore[]>`

**Étape 4: Créer brands.ts avec CRUD operations**
1. Créer `src/lib/storage/brands.ts`
2. Implémenter CRUD similaire pour brands

**Étape 5: Créer sync.ts pour métadonnées sync**
1. Créer `src/lib/storage/sync.ts`
2. Implémenter fonctions pour tracking sync:
   - `getLastSyncTimestamp(store: string): Promise<number>`
   - `updateSyncTimestamp(store: string, timestamp: number): Promise<void>`
   - `getSyncMetadata(store: string): Promise<SyncMetadataStore>`

**Étape 6: Étendre migrations.ts**
1. Ouvrir `src/lib/storage/migrations.ts` (EXISTE déjà)
2. Ajouter migration v3 dans l'array `migrations`
3. Tester la migration up/down

**Étape 7: Tests unitaires**
1. Créer `src/lib/storage/catalogue.test.ts`
2. Implémenter les tests listés ci-dessus
3. Vérifier coverage > 80%

**Étape 8: Vérifier persistence**
1. Tester dans le navigateur (Chrome DevTools > Application > IndexedDB)
2. Vérifier que la DB survit au refresh de la page
3. Vérifier la taille du storage utilisé

### Code Snippets

**Exemple CRUD complet pour products:**

```typescript
// src/lib/storage/catalogue.ts
import { getDatabase } from './database';
import type { ProductStore } from './types';

export async function createProduct(product: ProductStore): Promise<void> {
  const db = await getDatabase();
  await db.put('products', product);
}

export async function getProduct(id: string): Promise<ProductStore | undefined> {
  const db = await getDatabase();
  return await db.get('products', id);
}

export async function updateProduct(id: string, updates: Partial<ProductStore>): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('products', id);
  if (!existing) {
    throw new Error(`Product ${id} not found`);
  }
  await db.put('products', { ...existing, ...updates, lastUpdated: Date.now() });
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await getDatabase();
  await db.delete('products', id);
}

export async function getAllProducts(): Promise<ProductStore[]> {
  const db = await getDatabase();
  return await db.getAll('products');
}

export async function getProductsByCategory(category: string): Promise<ProductStore[]> {
  const db = await getDatabase();
  const all = await db.getAll('products');
  return all.filter(p => p.category === category);
}

export async function getProductsByBrand(brand: string): Promise<ProductStore[]> {
  const db = await getDatabase();
  const all = await db.getAll('products');
  return all.filter(p => p.brand === brand);
}

// Bulk operations pour import initial
export async function bulkCreateProducts(products: ProductStore[]): Promise<void> {
  const db = await getDatabase();
  const tx = db.transaction('products', 'readwrite');
  await Promise.all(products.map(p => tx.store.put(p)));
  await tx.done;
}
```

**Exemple index pour performance:**

```typescript
// Dans database.ts, upgrade() v3
if (oldVersion < 3) {
  const productsStore = db.createObjectStore('products', { keyPath: 'id' });
  productsStore.createIndex('by-category', 'category');
  productsStore.createIndex('by-brand', 'brand');
  productsStore.createIndex('by-canal', 'canal');
  
  // Autres stores...
}
```

### Definition of Done

✅ **Checklist avant commit:**
- [ ] `database.ts` étendu avec 7 nouveaux stores
- [ ] `CURRENT_DB_VERSION` incrémenté à 3
- [ ] Migration v3 ajoutée dans `migrations.ts`
- [ ] `types.ts` créé avec toutes les interfaces
- [ ] `catalogue.ts` créé avec CRUD complet
- [ ] `brands.ts` créé avec CRUD complet
- [ ] `sync.ts` créé avec fonctions sync metadata
- [ ] Tests unitaires > 80% coverage
- [ ] Build réussit sans erreurs TypeScript
- [ ] DB testée dans Chrome DevTools (persistence vérifiée)
- [ ] Documentation inline ajoutée
- [ ] Commit message descriptif

**Commit Message Format:**
```
feat: Complete Story 2.1 - Configure IndexedDB for Catalogue Storage

IndexedDB Schema:
- Extended database.ts with 7 new stores (products, brands, objections, campaigns, media, userData, syncMetadata)
- Incremented CURRENT_DB_VERSION from 2 to 3
- Added indexes for products (category, brand, canal) for query performance

CRUD Operations:
- Created catalogue.ts with full CRUD for products
- Created brands.ts with full CRUD for brands
- Created sync.ts for sync metadata tracking
- Bulk operations support for initial catalogue import

Types:
- Created types.ts with TypeScript interfaces for all stores
- Type-safe operations with generics

Migration:
- Added migration v3 in migrations.ts
- Tested up/down migrations
- Backward compatible with Story 1.6 stores

Testing:
- Unit tests for CRUD operations (>80% coverage)
- Persistence verified across page reloads
- Performance tested with 1000+ products

Storage:
- Configured for 50-100 MB minimum
- Quota check implemented
- Ready for offline-first catalogue

Files Created: 3 (types.ts, catalogue.ts, brands.ts, sync.ts)
Files Modified: 2 (database.ts, migrations.ts)

Story 2.1: DONE ✅
Epic 2: IN PROGRESS (1/21 stories)
```

## Project Context Reference

**Tech Stack:**
- Preact 10.28.2 + TypeScript 5.9.3
- Vite 7.3.1 + vite-plugin-pwa 1.2.0
- IndexedDB via idb@8.0.3
- Tailwind CSS 3.4.19 + Emotion 11.14.x
- Vitest pour tests

**File Structure:**
```
src/
├── lib/
│   └── storage/
│       ├── database.ts      (EXISTE - Story 1.6)
│       ├── migrations.ts    (EXISTE - Story 1.6)
│       ├── types.ts         (À CRÉER)
│       ├── catalogue.ts     (À CRÉER)
│       ├── brands.ts        (À CRÉER)
│       └── sync.ts          (À CRÉER)
├── routes/
│   └── Settings.tsx         (EXISTE - Story 1.4, 1.6)
└── main.tsx                 (EXISTE - init DB)
```

**Design System:**
- Couleurs BDC: Rouge #ff7323, Jaune #ffc627
- Background: Off-white #fafafa (pas pure white)
- Tailwind pour layout, Emotion pour effets avancés

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet (Cascade)

### Debug Log References

- TypeScript index types: Fixed by adding `indexes` property in DBSchema for products store
- fake-indexeddb setup: Added to vitest setup for IndexedDB testing in Node.js environment
- Build successful: 75.07 KB (28.79 KB gzipped) - +0.86 KB vs Story 1.6

### Completion Notes List

✅ **types.ts créé** (30 janvier 2026)
- 7 interfaces TypeScript définies: ProductStore, BrandStore, ObjectionStore, CampaignStore, MediaStore, UserDataStore, SyncMetadataStore
- Types complets avec tous les champs requis par l'architecture
- Support des champs optionnels (certifications, ingredients, conservation)

✅ **database.ts étendu avec 7 nouveaux stores**
- CURRENT_DB_VERSION incrémenté de 2 à 3
- 7 nouveaux stores ajoutés à LionsBookDB: products, brands, objections, campaigns, media, userData, syncMetadata
- Index créés pour products: by-category, by-brand, by-canal (performance)
- Migration v3 ajoutée dans upgrade() pour création des stores
- Backward compatible avec stores existants (cache_v1, cache_v2, metadata)

✅ **catalogue.ts créé avec CRUD complet**
- createProduct(), getProduct(), updateProduct(), deleteProduct()
- getAllProducts() pour liste complète
- getProductsByCategory(), getProductsByBrand(), getProductsByCanal() avec index
- bulkCreateProducts() pour import initial optimisé
- Error handling: throw si produit non trouvé lors de l'update

✅ **brands.ts créé avec CRUD complet**
- createBrand(), getBrand(), updateBrand(), deleteBrand()
- getAllBrands() pour liste complète
- bulkCreateBrands() pour import initial

✅ **sync.ts créé pour métadonnées sync**
- getLastSyncTimestamp(), updateSyncTimestamp()
- getSyncMetadata() pour récupération complète
- incrementPendingChanges(), resetPendingChanges() pour tracking

✅ **migrations.ts étendu**
- Migration v3 ajoutée: "Add catalogue stores"
- Logging approprié pour up/down
- Compatible avec système de rollback existant

✅ **Tests unitaires créés (9 tests - 100% pass)**
- fake-indexeddb@6.2.5 installé pour tests Node.js
- Test CRUD: create, read, update, delete
- Test filtres: by category, by brand
- Test bulk operations
- Test persistence après DB close/reopen
- Test error handling (update produit inexistant)
- Coverage: 100% des fonctions catalogue.ts

✅ **Build vérifié**
- Compilation TypeScript réussie
- Bundle: 75.07 KB (28.79 KB gzippé) - +0.86 KB vs v1.1.0
- Pas d'erreurs ESLint
- 17 fichiers précachés (137.67 KB)

---

## Code Review Fixes (30 janvier 2026)

**Review Type:** Adversarial Senior Developer Review  
**Issues Found:** 2 HIGH, 4 MEDIUM, 2 LOW  
**Issues Fixed:** 6 (all HIGH and MEDIUM)

### HIGH Issues Fixed ✅

1. **Architecture Violation: Missing `status` field in SyncMetadataStore**
   - Added `status: 'synced' | 'pending' | 'conflict'` field
   - Added optional `conflictData?: object` field
   - Updated all sync.ts functions to set appropriate status
   - Files: `types.ts`, `sync.ts`

2. **Missing Tests for Critical Stores**
   - Created `brands.test.ts` with 9 comprehensive tests
   - Created `sync.test.ts` with 10 comprehensive tests
   - Total test coverage: 28 tests (9 catalogue + 9 brands + 10 sync)
   - All tests passing ✅

### MEDIUM Issues Fixed ✅

3. **No Error Handling in Database Operations**
   - Added try/catch blocks to all CRUD operations
   - Added console.error logging for debugging
   - Proper error propagation to callers
   - Files: `catalogue.ts`, `brands.ts`

4. **Missing Input Validation**
   - Created `validateProduct()` function checking: empty ID/name, negative prix/marge
   - Created `validateBrand()` function checking: empty ID/name
   - Validation called before all create/update operations
   - Files: `catalogue.ts`, `brands.ts`

5. **Transaction Not Closed on Bulk Operation Failure**
   - Added nested try/catch in bulk operations
   - Call `tx.abort()` on failure to rollback partial writes
   - Prevents database inconsistency
   - Files: `catalogue.ts:93-109`, `brands.ts:69-85`

6. **Missing Index on `name` Field**
   - Added `by-name` index in database migration v3
   - Updated TypeScript schema with index definition
   - Enables fast product name searches for Story 3.1
   - Files: `database.ts:78`, `database.ts:26`

### Test Results After Fixes

```
✓ src/lib/storage/catalogue.test.ts (9 tests) 26ms
✓ src/lib/storage/brands.test.ts (9 tests) 25ms
✓ src/lib/storage/sync.test.ts (10 tests) 24ms

Test Files  3 passed (3)
Tests       28 passed (28)
```

**New Tests Added:**
- brands.test.ts: CRUD, validation, bulk operations, transaction rollback
- sync.test.ts: timestamp tracking, status management, pending changes, conflict data preservation

**Build After Fixes:**
- Bundle: 75.12 KB (28.82 KB gzipped) - +0.05 KB
- No TypeScript errors
- No ESLint errors

### Review Follow-ups (LOW Priority)

Les issues suivantes ont été identifiées mais différées car non-critiques. Elles peuvent être adressées lors de futures refactorings ou stories connexes:

- [ ] [AI-Review][LOW] **Inconsistent `data` type in UserDataStore** - Utiliser une discriminated union pour meilleure type safety au lieu de `data: object` générique. Exemple: `type UserDataStore = { id: string; type: 'favorite'; data: { productIds: string[] }; lastUpdated: number } | ...` [`types.ts:59-64`]

- [ ] [AI-Review][LOW] **Test cleanup incomplete** - Le `afterEach` dans `catalogue.test.ts` ne nettoie que le store `products`. Devrait aussi nettoyer `brands`, `objections`, `campaigns`, `media`, `userData`, `syncMetadata` pour éviter la pollution entre tests. [`catalogue.test.ts:20-25`]

### File List

**Fichiers créés:**
- `src/lib/storage/types.ts` - Interfaces TypeScript (74 lignes, +2 champs status/conflictData)
- `src/lib/storage/catalogue.ts` - CRUD operations produits avec validation (110 lignes)
- `src/lib/storage/brands.ts` - CRUD operations marques avec validation (86 lignes)
- `src/lib/storage/sync.ts` - Métadonnées synchronisation avec status (60 lignes)
- `src/lib/storage/catalogue.test.ts` - Tests unitaires produits (269 lignes)
- `src/lib/storage/brands.test.ts` - Tests unitaires marques (191 lignes) **[Code Review]**
- `src/lib/storage/sync.test.ts` - Tests unitaires sync (125 lignes) **[Code Review]**

**Fichiers modifiés:**
- `src/lib/storage/database.ts` - Ajout 7 stores + 4 index (117 lignes, +33)
- `src/lib/storage/migrations.ts` - Migration v3 (115 lignes, +10)
- `src/test/setup.ts` - Setup fake-indexeddb (8 lignes, +1)
- `package.json` - Ajout fake-indexeddb@6.2.5

**Total:** 7 fichiers créés, 4 fichiers modifiés
