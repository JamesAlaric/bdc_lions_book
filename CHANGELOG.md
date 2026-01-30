# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.1.0] - 2026-01-30

### Added
- Système de versioning avec IndexedDB (cache_v1, cache_v2)
- Mécanisme de rollback vers version précédente
- Système de migration automatique pour changements de schéma
- Feature flags pour désactiver fonctionnalités sans rollback complet
- UI de gestion des versions dans Paramètres
- Mode développeur avec toggles pour feature flags
- Tracking automatique des 2 dernières versions
- Cleanup automatique des anciennes versions de cache
- Gestion d'erreur avec UI de fallback au démarrage

### Changed
- Settings.tsx: Ajout sections Gestion des versions et Feature Flags
- main.tsx: Initialisation asynchrone avec DB et migrations
- Bundle size: 74.21 KB (28.59 KB gzippé) - +13 KB

### Technical
- Ajout dépendance: idb@8.0.3
- 4 nouveaux modules: database.ts, migrations.ts, rollback.ts, featureFlags.ts
- Support de 5 feature flags configurables

## [1.0.0] - 2026-01-29

### Ajouté
- Initialisation du projet avec Vite + Preact + PWA
- Configuration Emotion CSS-in-JS pour glassmorphisme
- Configuration Tailwind CSS pour utility-first styling
- Icônes PWA 192x192 et 512x512 aux couleurs BDC
- Mode fullscreen et splash screen automatique
- ESLint, Prettier, Vitest pour qualité du code
- Tests unitaires avec @testing-library/preact
- Page Paramètres avec version et changelog
- Routing avec preact-router
- Navigation menu avec icônes

### Modifié
- Utilisation de blanc cassé (#fafafa) au lieu de blanc pur

## [0.0.0] - 2026-01-29

### Ajouté
- Setup initial du projet
