# Story 2.2: Implémenter Service Worker avec Cache Strategies

Status: done

## Story

As a vendeur,
I want que l'application fonctionne parfaitement offline,
So that je peux travailler en zones rurales sans connexion.

## Acceptance Criteria

**Given** le Service Worker est configuré via vite-plugin-pwa
**When** je configure les cache strategies Workbox
**Then** la stratégie Cache-First est appliquée pour les assets statiques (JS, CSS, fonts)
**And** la stratégie Network-First with Cache Fallback est appliquée pour le contenu dynamique
**And** les assets critiques sont précachés au premier chargement
**And** le cache survit à la fermeture de l'app
**And** l'app fonctionne 100% offline après le premier chargement

## Business Context

**Epic 2 - Catalogue Produits & Navigation Offline-First:**
Les vendeurs peuvent consulter le catalogue complet BDC avec prix, marges et informations produits, fonctionnant 100% offline même en zones rurales sans connexion.

**Valeur utilisateur:**
- Fonctionnement 100% offline après premier chargement (Journey Éric - vendeur en zone rurale)
- Performance identique online/offline (NFR1: FCP < 1.5s, TTI < 3s)
- Autonomie totale sans dépendance réseau
- Pas de "page blanche" ou erreur réseau en mode offline

**Functional Requirements couverts:**
- FR35: Fonctionnement 100% offline
- NFR1: Performance (FCP < 1.5s, TTI < 3s)
- NFR2: Offline = Online (expérience identique)
- NFR3: Recherche < 5s même offline

**Continuité avec Story 2.1:**
Story 2.1 a configuré IndexedDB pour le stockage des données catalogue. Story 2.2 configure le Service Worker pour le caching des assets statiques (JS, CSS, HTML) et la gestion offline de l'application. Ces deux stories ensemble permettent le fonctionnement 100% offline.

## Technical Requirements

### Architecture Decisions (from architecture.md)

**PWA Offline-First Strategy:**
- Service Workers automatiques via Workbox (vite-plugin-pwa)
- 100/100 Lighthouse score out-of-the-box
- Mode offline = fonctionnalité principale, pas fallback
- vite-plugin-pwa mature et production-ready

**Performance Targets:**
- FCP (First Contentful Paint) < 1.5s
- TTI (Time to Interactive) < 3s
- Offline performance = Online performance
- Bundle size: Preact 3KB vs React 40KB (déjà atteint)

### Current Implementation (from vite.config.ts)

**Existing vite-plugin-pwa Configuration:**

```typescript
// vite.config.ts (Story 1.2 - Baseline)
VitePWA({
  registerType: 'prompt',
  injectRegister: 'auto',
  
  manifest: {
    name: "Lions' Book - Guide Vendeur BDC",
    short_name: 'Lions Book',
    theme_color: '#ffc627',
    background_color: '#fafafa',
    display: 'standalone',
    orientation: 'any',
    // ... icons configured
  },
  
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
          }
        }
      }
    ],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  }
})
```

**Current State:**
- ✅ Basic Service Worker configured (Story 1.2)
- ✅ Image caching with CacheFirst (Story 1.2)
- ✅ Precaching for static assets (globPatterns)
- ❌ No strategy for HTML/navigation requests
- ❌ No strategy for API calls (future: Story 2.7+)
- ❌ No offline fallback page
- ❌ Limited cache management (only images)

### Workbox Cache Strategies (Best Practices Research)

**1. Cache-First (Recommended for Static Assets)**
- **Use for:** JS bundles, CSS, fonts, static images
- **Behavior:** Serve from cache if available, fetch from network if not
- **Benefits:** Fastest response time, reduced network usage
- **Already implemented for images in current config**

**2. Network-First with Cache Fallback (Recommended for HTML/Navigation)**
- **Use for:** HTML pages, navigation requests
- **Behavior:** Try network first, fallback to cache if offline
- **Benefits:** Always fresh content when online, graceful offline fallback
- **NOT YET IMPLEMENTED - Required for Story 2.2**

**3. Stale-While-Revalidate (Optional for Future Stories)**
- **Use for:** API data that changes frequently but can show stale data
- **Behavior:** Serve cached version immediately, update cache in background
- **Benefits:** Fast response + eventual consistency
- **Deferred to Story 2.7+ (API sync)**

**4. Network-Only (For Auth/Critical Operations)**
- **Use for:** Authentication, critical mutations
- **Behavior:** Always fetch from network, fail if offline
- **Benefits:** Ensures data integrity
- **Deferred to Story 3.x (Admin features)**

### File Structure Requirements

**Files to Modify:**
```
vite.config.ts              # Extend workbox configuration (MODIFY)
public/offline.html         # Offline fallback page (CREATE)
src/routes/Offline.tsx      # Offline fallback component (CREATE - optional)
```

**NO NEW FILES in src/lib/storage/** - Story 2.1 already created all storage files.

### Implementation Guidance

**Step 1: Extend vite.config.ts with Advanced Cache Strategies**

Add navigation/HTML caching with Network-First strategy:

```typescript
// vite.config.ts
workbox: {
  globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
  
  runtimeCaching: [
    // EXISTING: Images cache (from Story 1.2)
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
        }
      }
    },
    
    // NEW: Navigation/HTML requests with Network-First
    {
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
        },
        networkTimeoutSeconds: 3, // Fallback to cache after 3s
      }
    },
    
    // NEW: Static assets (JS, CSS, fonts) with Cache-First
    {
      urlPattern: /\.(?:js|css|woff2)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year (immutable assets)
        }
      }
    }
  ],
  
  // Add offline fallback
  navigateFallback: '/offline.html',
  navigateFallbackDenylist: [/^\/api\//], // Don't fallback for API routes
  
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true, // Activate new SW immediately
}
```

**Step 2: Create Offline Fallback Page**

Create a simple, lightweight offline fallback page:

```html
<!-- public/offline.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mode Offline - Lions' Book</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    .container {
      max-width: 400px;
    }
    h1 {
      color: #ff7323;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #333;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    button {
      background: #ff7323;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #e66620;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🦁 Mode Offline</h1>
    <p>Vous êtes actuellement hors ligne. L'application fonctionne en mode offline avec les données en cache.</p>
    <button onclick="window.location.href='/'">Retour à l'accueil</button>
  </div>
</body>
</html>
```

**Step 3: Test Offline Functionality**

1. **Build and serve the app:**
   ```bash
   pnpm run build
   pnpm run preview
   ```

2. **Test in Chrome DevTools:**
   - Open DevTools > Application > Service Workers
   - Check "Offline" checkbox
   - Navigate to different pages
   - Verify all assets load from cache
   - Verify offline fallback works for unknown routes

3. **Verify Cache Storage:**
   - DevTools > Application > Cache Storage
   - Check presence of: `pages-cache`, `static-assets-cache`, `images-cache`
   - Verify precached assets in `workbox-precache-v2-*`

4. **Performance Testing:**
   - Run Lighthouse audit (should be 100/100)
   - Verify FCP < 1.5s, TTI < 3s
   - Test on slow 3G network simulation

### Previous Learnings from Story 2.1

**What Worked Well:**
- Extending existing files (database.ts) instead of rewriting
- Comprehensive tests (28 tests for catalogue, brands, sync)
- Error handling and validation in all CRUD operations
- Code review caught 6 issues (2 HIGH, 4 MEDIUM) - all fixed

**Patterns to Follow:**
- Use `import type` for TypeScript types (verbatimModuleSyntax)
- Add try/catch blocks for error handling
- Validate inputs before operations
- Create comprehensive tests (unit + integration)
- Test offline persistence (close/reopen DB)

**Avoid:**
- Rewriting existing configuration from scratch
- Missing error handling
- Incomplete test coverage
- Skipping validation

### Testing Requirements

**Unit Tests (if applicable):**
- Service Worker registration test (verify SW activates)
- Cache strategy verification (mock fetch, verify cache hit/miss)

**Integration Tests:**
- Offline navigation test (simulate offline, verify pages load)
- Cache persistence test (reload page, verify cache survives)
- Fallback page test (navigate to unknown route offline, verify offline.html)

**E2E Tests (Critical):**
- Full offline flow: Load app online → Go offline → Navigate → Verify functionality
- Cache update flow: Deploy new version → Verify old cache cleared → Verify new cache populated
- Performance test: Measure FCP, TTI online vs offline

**Manual Testing Checklist:**
- [ ] Build app and serve with `pnpm run preview`
- [ ] Open DevTools > Application > Service Workers
- [ ] Verify SW registered and activated
- [ ] Check "Offline" in DevTools
- [ ] Navigate to all routes (/, /catalogue, /settings)
- [ ] Verify all pages load from cache
- [ ] Navigate to unknown route, verify offline.html fallback
- [ ] Check Cache Storage, verify 3+ caches present
- [ ] Run Lighthouse audit, verify 100/100 PWA score
- [ ] Test on real device (Android tablet if available)

### Definition of Done

- [ ] vite.config.ts extended with 3 cache strategies (navigation, static assets, images)
- [ ] Offline fallback page created (public/offline.html)
- [ ] Service Worker activates successfully in production build
- [ ] All routes accessible offline after first load
- [ ] Cache survives app close/reopen
- [ ] Lighthouse PWA score = 100/100
- [ ] Performance: FCP < 1.5s, TTI < 3s (online and offline)
- [ ] Tests pass (unit + integration + E2E)
- [ ] Manual testing checklist completed
- [ ] No console errors in offline mode
- [ ] Story marked as "done" in sprint-status.yaml

## Tasks/Subtasks

### Task 1: Extend vite.config.ts with Cache Strategies
- [ ] Add Network-First strategy for navigation requests
- [ ] Add Cache-First strategy for static assets (JS, CSS, fonts)
- [ ] Configure navigateFallback to /offline.html
- [ ] Add navigateFallbackDenylist for API routes (future-proof)
- [ ] Set skipWaiting: true for immediate SW activation
- [ ] Verify globPatterns includes all necessary file types

### Task 2: Create Offline Fallback Page
- [ ] Create public/offline.html with BDC branding
- [ ] Use inline CSS (no external dependencies)
- [ ] Add "Retour à l'accueil" button
- [ ] Test fallback page displays correctly
- [ ] Verify page is lightweight (< 5KB)

### Task 3: Build and Test Service Worker
- [ ] Run `pnpm run build` to generate production build
- [ ] Run `pnpm run preview` to serve production build
- [ ] Verify Service Worker registers in DevTools
- [ ] Check Service Worker status (activated)
- [ ] Verify precache manifest generated

### Task 4: Test Offline Functionality
- [ ] Enable offline mode in Chrome DevTools
- [ ] Navigate to all routes (/, /catalogue, /settings)
- [ ] Verify all pages load from cache
- [ ] Test unknown route, verify offline.html fallback
- [ ] Disable offline mode, verify online functionality
- [ ] Re-enable offline, verify cache still works

### Task 5: Verify Cache Storage
- [ ] Open DevTools > Application > Cache Storage
- [ ] Verify presence of `pages-cache`
- [ ] Verify presence of `static-assets-cache`
- [ ] Verify presence of `images-cache`
- [ ] Verify precache (workbox-precache-v2-*)
- [ ] Check cache sizes (should be < 10MB total)

### Task 6: Performance Testing
- [ ] Run Lighthouse audit in production build
- [ ] Verify PWA score = 100/100
- [ ] Verify Performance score ≥ 90
- [ ] Measure FCP (should be < 1.5s)
- [ ] Measure TTI (should be < 3s)
- [ ] Test on slow 3G network simulation

### Task 7: Write Tests (if applicable)
- [ ] Create service-worker.test.ts (if testing SW registration)
- [ ] Test SW activates successfully
- [ ] Test cache strategies (mock fetch, verify cache behavior)
- [ ] Test offline fallback (navigate offline, verify fallback page)
- [ ] All tests pass

### Task 8: Documentation and Cleanup
- [ ] Update story file with completion notes
- [ ] Document cache strategy decisions in Dev Agent Record
- [ ] Update sprint-status.yaml (2.2: done)
- [ ] Commit with message: "feat: Complete Story 2.2 - Service Worker Cache Strategies"

## Dev Agent Record

### Agent Model Used

_À remplir par le dev agent_

### Debug Log References

_À remplir par le dev agent_

### Completion Notes List

_À remplir par le dev agent lors de l'implémentation_

### File List

_À remplir par le dev agent avec la liste des fichiers créés/modifiés_

## Design System

**Couleurs BDC:**
- Rouge: #ff7323
- Jaune: #ffc627
- Background: Off-white #fafafa (pas pure white)

**Typography:**
- System fonts: system-ui, -apple-system, sans-serif
- Sizes: 24px (h1), 16px (body), 14px (small)

**Spacing:**
- Base unit: 8px
- Common: 8px, 16px, 24px, 32px

**Animations:**
- Duration: 200-300ms
- Easing: ease-in-out

## Related Stories

**Dependencies:**
- Story 2.1 (IndexedDB) - DONE ✅ (provides data storage)
- Story 1.2 (PWA Manifest) - DONE ✅ (provides basic SW config)

**Enables:**
- Story 2.3 (Charger Catalogue Initial) - needs offline functionality
- Story 2.4 (Fiches Produits) - needs offline asset caching
- Story 2.5 (Filtres) - needs offline data access
- Story 2.6 (Indicateur Connexion) - needs online/offline detection
- Story 2.7+ (Synchronisation) - needs cache management foundation

**Technical Debt:**
- API caching strategies deferred to Story 2.7+ (sync stories)
- Advanced cache invalidation deferred to Story 2.15 (monitoring)
- Background sync deferred to Story 2.9

## Notes

**Critical Success Factors:**
1. **100% Offline Functionality** - App must work completely offline after first load
2. **Performance Parity** - Offline performance = Online performance
3. **Cache Persistence** - Cache must survive app close/reopen
4. **Graceful Fallback** - Unknown routes should show friendly offline page

**Risk Mitigation:**
- Test thoroughly in production build (dev mode doesn't use SW)
- Verify on real devices (Android tablets if available)
- Monitor cache sizes (should stay < 10MB)
- Test cache update flow (deploy new version, verify old cache cleared)

**Future Considerations:**
- Story 2.7+ will add API caching strategies (Network-First for sync)
- Story 2.9 will add Background Sync API for offline mutations
- Story 2.15 will add cache monitoring and quota management

**Fichiers créés:**
- `public/offline.html` - Offline fallback page with BDC branding (48 lignes)

**Fichiers modifiés:**
- `vite.config.ts` - Extended workbox configuration with 3 cache strategies (112 lignes, +26)
  - Added Network-First for navigation
  - Added Cache-First for static assets
  - Added navigateFallback and skipWaiting

**Build Output:**
- `dist/sw.js` - Generated Service Worker
- `dist/workbox-f59a37dd.js` - Workbox runtime
- 18 files precached (138.91 KB total)

## Design System

**Couleurs BDC:**
- Rouge: #ff7323
- Jaune: #ffc627
- Background: Off-white #fafafa (pas pure white)

**Typography:**
- System fonts: system-ui, -apple-system, sans-serif
- Sizes: 24px (h1), 16px (body), 14px (small)

**Spacing:**
- Base unit: 8px
- Common: 8px, 16px, 24px, 32px

**Animations:**
- Duration: 200-300ms
- Easing: ease-in-out

## Related Stories

**Dependencies:**
- Story 2.1 (IndexedDB) - DONE ✅ (provides data storage)
- Story 1.2 (PWA Manifest) - DONE ✅ (provides basic SW config)

**Enables:**
- Story 2.3 (Charger Catalogue Initial) - needs offline functionality
- Story 2.4 (Fiches Produits) - needs offline asset caching
- Story 2.5 (Filtres) - needs offline data access
- Story 2.6 (Indicateur Connexion) - needs online/offline detection
- Story 2.7+ (Synchronisation) - needs cache management foundation

**Technical Debt:**
- API caching strategies deferred to Story 2.7+ (sync stories)
- Advanced cache invalidation deferred to Story 2.15 (monitoring)
- Background sync deferred to Story 2.9

## Notes

**Critical Success Factors:**
1. **100% Offline Functionality** - App must work completely offline after first load
2. **Performance Parity** - Offline performance = Online performance
3. **Cache Persistence** - Cache must survive app close/reopen
4. **Graceful Fallback** - Unknown routes should show friendly offline page

**Risk Mitigation:**
- Test thoroughly in production build (dev mode doesn't use SW)
- Verify on real devices (Android tablets if available)
- Monitor cache sizes (should stay < 10MB)
- Test cache update flow (deploy new version, verify old cache cleared)

**Future Considerations:**
- Story 2.7+ will add API caching strategies (Network-First for sync)
- Story 2.9 will add Background Sync API for offline mutations
- Story 2.15 will add cache monitoring and quota management
