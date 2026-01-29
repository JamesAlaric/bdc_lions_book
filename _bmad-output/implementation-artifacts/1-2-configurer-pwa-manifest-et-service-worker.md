# Story 1.2: Configurer PWA Manifest et Service Worker

Status: ready-for-dev

## Story

As a vendeur,
I want installer l'application sur l'écran d'accueil de ma tablette,
So that je peux lancer Lions' Book comme une app native.

## Acceptance Criteria

**Given** le projet PWA initialisé (Story 1.1 complétée)
**When** je configure vite-plugin-pwa avec le manifest (nom "Lions' Book", couleurs BDC #ffc627, #ff7323)
**Then** le fichier manifest.webmanifest est généré avec les bonnes métadonnées
**And** les icônes PWA 192x192 et 512x512 sont créées aux couleurs BDC
**And** le Service Worker est généré automatiquement par Workbox
**And** l'application est installable sur Android (prompt d'installation s'affiche)
**And** l'orientation est configurée en "any" pour support portrait/paysage
**And** le splash screen utilise les couleurs BDC

## Tasks / Subtasks

- [ ] Créer les icônes PWA aux couleurs BDC (AC: 1, 2)
  - [ ] Créer icon-192.png (192x192) avec logo/couleurs BDC
  - [ ] Créer icon-512.png (512x512) avec logo/couleurs BDC
  - [ ] Créer apple-touch-icon.png (180x180) pour iOS
  - [ ] Placer les icônes dans `public/`
  - [ ] Vérifier que les icônes sont bien référencées dans le manifest

- [ ] Configurer le PWA Manifest dans vite.config.ts (AC: 1, 3, 4)
  - [ ] Mettre à jour la configuration VitePWA avec manifest complet
  - [ ] Configurer name: "Lions' Book"
  - [ ] Configurer short_name: "Lions Book"
  - [ ] Configurer description appropriée
  - [ ] Configurer theme_color: "#ffc627" (jaune BDC)
  - [ ] Configurer background_color: "#fafafa" (blanc cassé)
  - [ ] Configurer display: "standalone"
  - [ ] Configurer orientation: "any"
  - [ ] Ajouter les icônes dans le manifest

- [ ] Configurer les cache strategies Workbox (AC: 2)
  - [ ] Configurer globPatterns pour assets statiques
  - [ ] Ajouter runtimeCaching pour images (CacheFirst)
  - [ ] Configurer cleanupOutdatedCaches: true
  - [ ] Configurer clientsClaim: true
  - [ ] Tester que le SW se génère correctement

- [ ] Tester l'installation PWA (AC: 3, 4)
  - [ ] Builder l'application: `pnpm run build`
  - [ ] Tester avec `pnpm run preview`
  - [ ] Vérifier que le prompt d'installation apparaît
  - [ ] Vérifier que l'app s'installe correctement
  - [ ] Vérifier le splash screen aux couleurs BDC
  - [ ] Tester en mode portrait et paysage

- [ ] Mettre à jour la documentation (AC: 5)
  - [ ] Ajouter section PWA Installation dans README.md
  - [ ] Documenter comment tester l'installation
  - [ ] Ajouter screenshots si possible

## Dev Notes

### Architecture Context

**PWA Configuration Actuelle (Story 1.1):**
```typescript
// vite.config.ts (état actuel)
VitePWA({
  registerType: 'autoUpdate',
  injectRegister: false,
  pwaAssets: {
    disabled: false,
    config: true,
  },
  manifest: {
    name: "Lions' Book",
    short_name: 'Lions Book',
    description: 'PWA pour transformer vendeurs BDC en experts produit',
    theme_color: '#ffc627',
    background_color: '#fafafa',
    display: 'standalone',
    orientation: 'any',
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },
  devOptions: {
    enabled: false,
    navigateFallback: 'index.html',
    suppressWarnings: true,
    type: 'module',
  },
})
```

**Ce qui manque pour Story 1.2:**
1. ❌ Icônes PWA réelles (192x192, 512x512) aux couleurs BDC
2. ❌ Configuration icons[] dans le manifest
3. ❌ Apple touch icon pour iOS
4. ❌ Cache strategies avancées pour images
5. ❌ Tests d'installation PWA

### Technical Requirements

**Icônes PWA Requises:**

Les icônes doivent utiliser les couleurs BDC:
- **Jaune BDC:** #ffc627
- **Rouge BDC:** #ff7323
- **Blanc cassé:** #fafafa

**Tailles requises:**
- `icon-192.png` - 192x192px (Android, Chrome)
- `icon-512.png` - 512x512px (Android, Chrome, splash screen)
- `apple-touch-icon.png` - 180x180px (iOS Safari)
- `favicon.svg` - Déjà existant (à personnaliser si besoin)

**Outils pour créer les icônes:**

**Option 1: @vite-pwa/assets-generator (Recommandé)**
```bash
# Déjà installé dans devDependencies
pnpm add -D @vite-pwa/assets-generator

# Créer une image source 512x512 ou SVG
# Puis générer toutes les tailles automatiquement
pnpm exec pwa-assets-generator --preset minimal public/logo.svg
```

**Option 2: Création manuelle**
- Utiliser un outil de design (Figma, Canva, GIMP)
- Créer un logo simple avec couleurs BDC
- Exporter aux tailles requises
- Placer dans `public/`

**Configuration Manifest Complète:**

```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  injectRegister: false,
  
  pwaAssets: {
    disabled: false,
    config: true,
  },
  
  manifest: {
    name: "Lions' Book - Guide Vendeur BDC",
    short_name: 'Lions Book',
    description: 'PWA pour transformer vendeurs BDC en experts produit',
    theme_color: '#ffc627',
    background_color: '#fafafa',
    display: 'standalone',
    orientation: 'any',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  },
  
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
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
  },
  
  devOptions: {
    enabled: false,
    navigateFallback: 'index.html',
    suppressWarnings: true,
    type: 'module',
  },
})
```

**Cache Strategies Workbox:**

Selon l'architecture, voici les stratégies recommandées:

1. **Assets Statiques (JS, CSS, fonts):** Précachés automatiquement par globPatterns
2. **Images:** CacheFirst avec expiration 30 jours
3. **API Calls:** Network-First (sera implémenté en Story 2.2)

### Project Structure Notes

**Fichiers à créer:**
```
public/
├── icon-192.png          # Icône PWA 192x192
├── icon-512.png          # Icône PWA 512x512
├── apple-touch-icon.png  # Icône iOS 180x180
└── favicon.svg           # Déjà existant (à personnaliser)
```

**Fichiers à modifier:**
- `vite.config.ts` - Ajouter icons[] et runtimeCaching
- `index.html` - Ajouter <link rel="apple-touch-icon">
- `README.md` - Documenter installation PWA

### Architecture Compliance

**PWA Requirements (Architecture.md):**
- ✅ Service Workers automatiques via Workbox
- ✅ Web App Manifest configuré
- ⏳ Offline support (Story 2.2)
- ⏳ Install prompt fonctionnel (à tester)

**Performance Requirements:**
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse PWA score: 100/100 (objectif)

**Browser Support:**
- Chrome/Edge (Android): Full PWA support
- Safari (iOS): Partial support (pas de prompt, mais installable)
- Firefox: Full PWA support

### Testing Requirements

**Tests Manuels Requis:**

1. **Test Installation Chrome (Android/Desktop):**
   ```bash
   pnpm run build
   pnpm run preview
   # Ouvrir http://localhost:4173
   # Vérifier prompt d'installation
   # Installer l'app
   # Vérifier splash screen
   ```

2. **Test Lighthouse PWA:**
   ```bash
   # Ouvrir DevTools > Lighthouse
   # Cocher "Progressive Web App"
   # Générer rapport
   # Vérifier score 100/100
   ```

3. **Test Offline:**
   ```bash
   # Après installation
   # DevTools > Network > Offline
   # Recharger l'app
   # Vérifier que l'app fonctionne
   ```

4. **Test Orientation:**
   - Tester en mode portrait
   - Tester en mode paysage
   - Vérifier que l'UI s'adapte

**Tests Automatisés:**

Pour cette story, les tests sont principalement manuels car ils nécessitent:
- Vérification visuelle des icônes
- Test d'installation PWA
- Test du splash screen

Des tests E2E avec Playwright pourront être ajoutés en Story 8.1.

### Library & Framework Requirements

**Dépendances Existantes:**
- `vite-plugin-pwa`: ^1.2.0 ✅
- `@vite-pwa/assets-generator`: ^1.0.2 ✅
- `workbox-window`: ^7.4.0 ✅

**Aucune nouvelle dépendance requise.**

### References

- [Source: architecture.md#PWA Configuration] - Configuration complète vite-plugin-pwa
- [Source: architecture.md#Cache Strategies] - Stratégies Workbox détaillées
- [Source: epics.md#Story 1.2] - Acceptance criteria et user story
- [Source: prd.md#PWA Manifest & Installation] - Requirements PWA
- [Source: Story 1.1] - Configuration initiale vite-plugin-pwa

### Critical Success Factors

1. **Icônes aux couleurs BDC** - Identité visuelle cohérente
2. **Installation fonctionnelle** - Prompt d'installation s'affiche
3. **Splash screen BDC** - Expérience professionnelle au lancement
4. **Support portrait/paysage** - Flexibilité d'utilisation
5. **Lighthouse 100/100** - Validation PWA complète

### Next Stories Dependencies

**Story 1.3 (Splash Screen et Fullscreen)** dépend de cette story:
- Nécessite les icônes PWA créées
- Nécessite le manifest configuré
- Nécessite display: "standalone"

**Story 2.2 (Service Worker avec Cache Strategies)** dépend de cette story:
- Nécessite le Service Worker de base fonctionnel
- Nécessite la configuration Workbox

## Dev Agent Record

### Agent Model Used

_À remplir par le dev agent_

### Debug Log References

_À remplir par le dev agent_

### Completion Notes List

_À remplir par le dev agent lors de l'implémentation_

### File List

_À remplir par le dev agent avec la liste des fichiers créés/modifiés_
