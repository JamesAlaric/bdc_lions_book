# Lions' Book - PWA Offline-First

Application PWA pour transformer les vendeurs BDC en experts produit.

## 🚀 Stack Technique

- **Frontend:** Vite 5 + Preact 10.x + TypeScript
- **PWA:** vite-plugin-pwa avec Workbox 7
- **Styling:** Emotion (CSS-in-JS)
- **Package Manager:** pnpm

## 📦 Installation

```bash
# Installer les dépendances
pnpm install
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement avec HMR
pnpm run dev

# Builder pour la production
pnpm run build

# Prévisualiser le build de production
pnpm run preview
```

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
