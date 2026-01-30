# Lions' Book - PWA Offline-First

Application PWA pour transformer les vendeurs BDC en experts produit.

## 🚀 Stack Technique

- **Frontend:** Vite 7.3.1 + Preact 10.28.2 + TypeScript 5.9.3
- **PWA:** vite-plugin-pwa 1.2.0 avec Workbox 7
- **Styling:** Emotion 11.14.x (CSS-in-JS) + Tailwind CSS 3.4.19
- **Routing:** preact-router 4.1.2
- **Storage:** IndexedDB (prévu pour Epic 2)
- **Testing:** Vitest + @testing-library/preact
- **Quality:** ESLint 9.39.2 + Prettier 3.8.1
- **Package Manager:** pnpm

## ✨ Fonctionnalités (Epic 1 - Complété)

### PWA Core
- ✅ Application installable sur mobile/desktop
- ✅ Icônes PWA 192x192, 512x512 aux couleurs BDC (#ffc627, #ff7323)
- ✅ Splash screen automatique avec branding BDC
- ✅ Mode fullscreen (standalone)
- ✅ Support portrait et paysage
- ✅ Service Worker avec cache strategies
- ✅ Offline-ready après premier chargement

### Navigation & UI
- ✅ Routing avec preact-router
- ✅ Menu de navigation fixe (Accueil, Catalogue, Paramètres)
- ✅ Page Paramètres avec version et changelog
- ✅ Design responsive avec Tailwind
- ✅ Effets glassmorphisme avec Emotion

### Mises à jour
- ✅ Système de notification pour nouvelles versions
- ✅ Contrôle manuel des mises à jour (prompt)
- ✅ Notification "Application prête offline"
- 🔜 Rollback et versioning cache (Story 1.6 - À venir)

## � Démarrage

```bash
# Installation des dépendances
pnpm install

# Lancer le serveur de développement
pnpm run dev

# Builder pour production
pnpm run build

# Prévisualiser le build
pnpm run preview

# Lancer les tests
pnpm test

# Vérifier le code (ESLint)
pnpm run lint

# Formatter le code (Prettier)
pnpm run format
```

## 📱 Installation PWA

### Tester l'installation en local

1. **Builder l'application:**
   ```bash
   pnpm run build
   pnpm run preview
   ```

2. **Ouvrir dans le navigateur:**
   - Ouvrir `http://localhost:4173`
   - Chrome/Edge affichera un prompt d'installation
   - Cliquer sur "Installer" dans la barre d'adresse

3. **Vérifier l'installation:**
   - L'application apparaît sur l'écran d'accueil
   - Lance en mode fullscreen (pas de barre d'adresse)
   - Splash screen avec couleurs BDC au démarrage
   - Fonctionne offline après le premier chargement

### Icônes PWA

Les icônes ont été générées avec `@vite-pwa/assets-generator`:
- **64x64** - Favicon et petite icône
- **192x192** - Icône Android standard
- **512x512** - Icône haute résolution et splash screen
- **512x512 maskable** - Icône adaptative Android
- **180x180** - Apple touch icon pour iOS

Toutes les icônes utilisent les couleurs BDC (jaune #ffc627, rouge #ff7323).

## 📁 Structure du Projet

```
src/
├── components/        # Composants Preact réutilisables
│   ├── ui/           # Composants UI de base (glassmorphisme, carousel)
│   ├── features/     # Composants métier (produits, argumentaires)
│   └── layout/       # Layout components (menu flottant, navigation)
├── routes/           # Pages/routes de l'application
├── hooks/            # Custom hooks Preact
├── lib/              # Utilities, helpers
│   ├── search/      # Moteur recherche local
│   ├── sync/        # Logique synchronisation
│   └── storage/     # IndexedDB wrapper
├── assets/           # Images, fonts, static assets
├── styles/           # Styles globaux, thème
└── sw.ts            # Service Worker custom (si nécessaire)
```

## 🎨 Configuration PWA

Le manifest PWA est configuré avec les couleurs BDC:
- **Theme Color:** #ffc627 (Jaune BDC)
- **Background Color:** #fafafa
- **Display:** standalone
- **Orientation:** any (portrait/paysage)

## 🔧 Configuration Emotion

Emotion est configuré avec le plugin Babel pour une performance optimale:
- CSS-in-JS pour le glassmorphisme
- Support des styled components
- Optimisation automatique en production

## 📱 Features PWA

- ✅ Installation sur l'écran d'accueil
- ✅ Service Worker avec auto-update
- ✅ Cache strategies via Workbox
- ✅ Offline support
- ✅ Manifest configuré

## 🧪 Tests

```bash
# Lancer les tests (à configurer)
pnpm test
```

## 📝 Version

Version actuelle: 0.0.0 (Story 1.1 - Setup initial)

## 👥 Équipe

Projet développé pour BDC par Jay
