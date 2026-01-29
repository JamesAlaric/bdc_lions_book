# Story 1.4: Créer Page Paramètres avec Version et Changelog

Status: ready-for-dev

## Story

As a vendeur,
I want accéder aux paramètres de l'application et voir la version installée,
So that je peux vérifier que j'ai la dernière version.

## Acceptance Criteria

**Given** l'application est lancée
**When** j'accède à la page Paramètres depuis le menu
**Then** je vois le numéro de version actuel (ex: v1.0.0)
**And** je peux consulter le changelog des versions précédentes
**And** les paramètres sont accessibles via une icône dédiée dans le menu principal
**And** la page Paramètres est responsive (portrait/paysage)

## Tasks / Subtasks

- [ ] Créer la page Paramètres (AC: 1, 2, 4)
  - [ ] Créer `src/routes/Settings.tsx`
  - [ ] Créer le layout responsive (portrait/paysage)
  - [ ] Ajouter le titre "Paramètres"
  - [ ] Créer les sections: Version, Changelog, À propos

- [ ] Afficher la version actuelle (AC: 1)
  - [ ] Lire la version depuis `package.json`
  - [ ] Afficher "Version: v1.0.0" dans l'UI
  - [ ] Styliser avec Tailwind/Emotion
  - [ ] Ajouter une icône de version

- [ ] Créer le changelog (AC: 2)
  - [ ] Créer `CHANGELOG.md` à la racine
  - [ ] Parser et afficher le changelog dans l'UI
  - [ ] Organiser par versions (v1.0.0, v0.9.0, etc.)
  - [ ] Afficher les dates de release
  - [ ] Rendre scrollable si long

- [ ] Ajouter navigation vers Paramètres (AC: 3)
  - [ ] Créer un menu principal (si pas existant)
  - [ ] Ajouter une icône Settings (gear/cog)
  - [ ] Lier l'icône à la route `/settings`
  - [ ] Tester la navigation

- [ ] Tester la page Paramètres (AC: 4)
  - [ ] Tester en mode portrait
  - [ ] Tester en mode paysage
  - [ ] Vérifier la lisibilité
  - [ ] Tester la navigation retour

## Dev Notes

### Architecture Context

**Routing:**
Le projet utilise Preact sans router pour l'instant. Options:
1. **preact-router** (recommandé, léger 1.5KB)
2. **wouter** (alternative moderne)
3. **Hash-based routing** (simple, pas de dépendance)

**Version Management:**
```typescript
// Lire depuis package.json
import packageJson from '../package.json';
const version = packageJson.version; // "0.0.0"
```

### Technical Requirements

**Structure de la Page Paramètres:**

```tsx
// src/routes/Settings.tsx
import { h } from 'preact';
import packageJson from '../../package.json';

export function Settings() {
  return (
    <div className="min-h-screen bg-off-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
      </header>

      {/* Section Version */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">Version</h2>
        <p className="text-gray-600">
          Version actuelle: <span className="font-mono font-bold">v{packageJson.version}</span>
        </p>
      </section>

      {/* Section Changelog */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">Historique des versions</h2>
        <div className="space-y-4">
          <ChangelogEntry 
            version="1.0.0"
            date="2026-01-29"
            changes={[
              "Initialisation du projet PWA",
              "Configuration Tailwind + Emotion",
              "Ajout des icônes PWA",
              "Mode fullscreen et splash screen"
            ]}
          />
        </div>
      </section>

      {/* Section À propos */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">À propos</h2>
        <p className="text-gray-600">
          Lions' Book - Guide du vendeur BDC
        </p>
        <p className="text-sm text-gray-500 mt-2">
          © 2026 BDC. Tous droits réservés.
        </p>
      </section>
    </div>
  );
}

function ChangelogEntry({ version, date, changes }: {
  version: string;
  date: string;
  changes: string[];
}) {
  return (
    <div className="border-l-4 border-bdc-yellow pl-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-mono font-bold">v{version}</h3>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <ul className="list-disc list-inside space-y-1">
        {changes.map((change, i) => (
          <li key={i} className="text-gray-600 text-sm">{change}</li>
        ))}
      </ul>
    </div>
  );
}
```

**CHANGELOG.md:**

```markdown
# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

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

### Modifié
- Utilisation de blanc cassé (#fafafa) au lieu de blanc pur

## [0.0.0] - 2026-01-29

### Ajouté
- Setup initial du projet
```

**Navigation Menu:**

```tsx
// src/components/layout/Navigation.tsx
import { h } from 'preact';
import { route } from 'preact-router';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        <NavItem icon="🏠" label="Accueil" path="/" />
        <NavItem icon="📦" label="Catalogue" path="/catalogue" />
        <NavItem icon="⚙️" label="Paramètres" path="/settings" />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, path }: { icon: string; label: string; path: string }) {
  return (
    <button
      onClick={() => route(path)}
      className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-bdc-yellow transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
```

**Installation preact-router:**

```bash
pnpm add preact-router
pnpm add -D @types/preact-router
```

**Configuration Router dans App:**

```tsx
// src/app.tsx
import { Router, Route } from 'preact-router';
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';
import { Navigation } from './components/layout/Navigation';

export function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/settings" component={Settings} />
      </Router>
      <Navigation />
    </>
  );
}
```

### Project Structure Notes

**Fichiers à créer:**
```
src/
├── routes/
│   ├── Settings.tsx          # Page Paramètres
│   └── Home.tsx              # Page d'accueil (refactor app.tsx)
├── components/
│   └── layout/
│       └── Navigation.tsx    # Menu de navigation
└── types/
    └── package.d.ts          # Types pour import package.json

CHANGELOG.md                  # Historique des versions
```

**Fichiers à modifier:**
- `src/app.tsx` - Ajouter le router
- `package.json` - Mettre à jour la version si nécessaire

### Library & Framework Requirements

**Nouvelles dépendances:**
```bash
pnpm add preact-router
pnpm add -D @types/preact-router
```

**Dépendances existantes:**
- `preact`: ^10.27.2 ✅
- `tailwindcss`: ^3.4.19 ✅
- `@emotion/styled`: ^11.14.1 ✅

### Testing Requirements

**Tests à créer:**

```typescript
// src/routes/__tests__/Settings.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Settings } from '../Settings';

describe('Settings', () => {
  it('renders the settings page', () => {
    render(<Settings />);
    expect(screen.getByText(/Paramètres/i)).toBeTruthy();
  });

  it('displays the current version', () => {
    render(<Settings />);
    expect(screen.getByText(/Version actuelle/i)).toBeTruthy();
    expect(screen.getByText(/v\d+\.\d+\.\d+/)).toBeTruthy();
  });

  it('displays the changelog', () => {
    render(<Settings />);
    expect(screen.getByText(/Historique des versions/i)).toBeTruthy();
  });
});
```

### References

- [Source: epics.md#Story 1.4] - Acceptance criteria
- [Source: architecture.md#Code Organization] - Structure routing
- [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/) - Format changelog

### Critical Success Factors

1. **Version affichée** - Lire depuis package.json
2. **Changelog lisible** - Format clair et organisé
3. **Navigation fonctionnelle** - Icône accessible depuis toutes les pages
4. **Responsive** - Fonctionne en portrait et paysage
5. **Tests passent** - Couverture de la page Settings

### Next Stories Dependencies

**Story 1.5 (Système de Mise à Jour)** dépend de cette story:
- Nécessite la page Paramètres existante
- Affichera les notifications de mise à jour

**Story 1.6 (Rollback)** dépend de cette story:
- Nécessite la page Paramètres
- Ajoutera un bouton de rollback

## Dev Agent Record

### Agent Model Used

_À remplir par le dev agent_

### Debug Log References

_À remplir par le dev agent_

### Completion Notes List

_À remplir par le dev agent lors de l'implémentation_

### File List

_À remplir par le dev agent avec la liste des fichiers créés/modifiés_
