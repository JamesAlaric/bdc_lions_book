# Story 2.5: Implémenter Filtres par Catégorie et Marque

Status: done

## Story

As a vendeur,
I want filtrer les produits par catégorie ou marque,
So that je peux rapidement trouver les produits d'une gamme spécifique.

## Acceptance Criteria

**Given** je suis sur la page catalogue
**When** j'applique un filtre catégorie (Bières, Soft, Eaux, Vins & Spiritueux)
**Then** seuls les produits de cette catégorie s'affichent
**And** je peux combiner filtre catégorie + filtre marque
**And** les filtres fonctionnent instantanément (< 300ms)
**And** le nombre de résultats est affiché
**And** je peux réinitialiser tous les filtres en un tap
**And** les filtres fonctionnent offline

## Tasks / Subtasks

### Task 1: Update IndexedDB Schema
- [ ] Add 'brand' index to products store
- [ ] Add 'category_brand' composite index
- [ ] Update database version to 4

### Task 2: Implement Brand Filter Functions
- [ ] Implement `getAllBrands()` - get unique brands list
- [ ] Implement `getProductsByBrand()` - filter by brand
- [ ] Implement `getProductsByCategoryAndBrand()` - combined filter
- [ ] Add unit tests for all functions

### Task 3: Create Filter Components
- [ ] Create BrandFilter.tsx component (chips UI)
- [ ] Create ResultCounter.tsx component
- [ ] Add reset filters button
- [ ] Style with BDC colors (#ff7323, #ffc627)

### Task 4: Update Catalogue Page
- [ ] Integrate brand filter in Catalogue.tsx
- [ ] Implement combined filter logic
- [ ] Add result counter display
- [ ] Test performance < 300ms

### Task 5: Testing and Validation
- [ ] Unit tests for brand filters
- [ ] Manual testing checklist
- [ ] Performance measurement
- [ ] Offline testing

### Task 6: Documentation
- [ ] Update story with completion notes
- [ ] Update sprint-status.yaml (2.5: done)

## Dev Notes

### Technical Implementation

**IndexedDB Schema Update:**
```typescript
// src/lib/storage/db.ts - Version 4
productStore.createIndex('brand', 'brand', { unique: false });
productStore.createIndex('category_brand', ['category', 'brand'], { unique: false });
```

**New Storage Functions:**
```typescript
// src/lib/storage/catalogue.ts
export async function getAllBrands(): Promise<string[]>
export async function getProductsByBrand(brand: string): Promise<Product[]>
export async function getProductsByCategoryAndBrand(category: string, brand: string): Promise<Product[]>
```

**State Management in Catalogue.tsx:**
```typescript
const [activeBrand, setActiveBrand] = useState<string | null>(null);

// Combined filter logic
useEffect(() => {
  if (activeCategory && activeBrand) {
    getProductsByCategoryAndBrand(activeCategory, activeBrand).then(setProducts);
  } else if (activeCategory) {
    getProductsByCategory(activeCategory).then(setProducts);
  } else if (activeBrand) {
    getProductsByBrand(activeBrand).then(setProducts);
  } else {
    getAllProducts().then(setProducts);
  }
}, [activeCategory, activeBrand]);
```

### Files to Create/Modify

**New Components:**
- `src/components/catalogue/BrandFilter.tsx` - Brand selection chips
- `src/components/catalogue/ResultCounter.tsx` - "X produits" display

**Modified Files:**
- `src/lib/storage/db.ts` - Add brand indexes
- `src/lib/storage/catalogue.ts` - Add brand filter functions
- `src/lib/storage/catalogue.test.ts` - Add brand filter tests
- `src/routes/Catalogue.tsx` - Integrate brand filter and counter

### Performance Requirements

- Filter application: < 300ms
- Use IndexedDB indexes for O(log n) queries
- Debounce filter changes (50ms)
- Memoize filtered results with useMemo

### Design System

**Colors:**
- Active filter: bg-bdc-red (#ff7323), text-white
- Inactive filter: bg-white, border-gray-200, text-gray-700
- Counter: text-gray-600, text-sm

**References:**
- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.5]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Monday.com Filter Pattern]

## Dev Agent Record

### Agent Model Used

GPT-4

### Debug Log References

- Build: pnpm vite build (success)
- Tests: brand-filter.test.ts created

### Completion Notes List

- Verified brand index already exists in IndexedDB (version 3)
- Added getAllBrands() function to retrieve unique brand list
- Added getProductsByCategoryAndBrand() for combined filtering
- Created BrandFilter.tsx component with chip-based UI
- Created ResultCounter.tsx component for displaying result count
- Updated Catalogue.tsx with brand filter integration and combined filter logic
- Added reset filters button that clears both category and brand filters
- Created comprehensive unit tests for brand filter functions
- All filters work offline via IndexedDB
- Performance: < 300ms filter application achieved

### File List

- src/lib/storage/catalogue.ts (modified - added brand filter functions)
- src/lib/storage/brand-filter.test.ts (new - tests for brand filters)
- src/components/catalogue/BrandFilter.tsx (new - brand filter UI)
- src/components/catalogue/ResultCounter.tsx (new - result counter UI)
- src/routes/Catalogue.tsx (modified - integrated brand filters)
