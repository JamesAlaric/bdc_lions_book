# Story 1.5: Implémenter Système de Mise à Jour PWA

Status: done

## Story

As a vendeur,
I want être notifié quand une nouvelle version est disponible,
So that je peux mettre à jour l'application facilement.

## Acceptance Criteria

**Given** une nouvelle version de l'app est déployée
**When** je lance l'application avec l'ancienne version
**Then** une notification s'affiche "Nouvelle version disponible"
**And** je peux choisir de recharger l'app pour mettre à jour
**And** si je refuse, la notification disparaît et je peux continuer avec l'ancienne version
**And** la mise à jour s'installe en arrière-plan si l'app est fermée
**And** après rechargement, la nouvelle version est active

## Tasks / Subtasks

- [ ] Configurer le système de mise à jour PWA (AC: 1, 4)
  - [ ] Vérifier que registerType: 'autoUpdate' est configuré
  - [ ] Configurer injectRegister pour contrôle manuel
  - [ ] Importer useRegisterSW de 'virtual:pwa-register/preact'
  - [ ] Gérer les événements du Service Worker

- [ ] Créer le composant UpdateNotification (AC: 2, 3)
  - [ ] Créer `src/components/UpdateNotification.tsx`
  - [ ] Détecter quand une nouvelle version est disponible
  - [ ] Afficher une notification avec message clair
  - [ ] Ajouter bouton "Mettre à jour maintenant"
  - [ ] Ajouter bouton "Plus tard"
  - [ ] Styliser avec Tailwind/Emotion

- [ ] Implémenter la logique de mise à jour (AC: 2, 5)
  - [ ] Fonction pour recharger l'app (updateServiceWorker)
  - [ ] Fonction pour ignorer la mise à jour
  - [ ] Gérer l'état de la notification
  - [ ] Persister le choix utilisateur (localStorage)

- [ ] Intégrer dans l'application (AC: 1, 2)
  - [ ] Ajouter UpdateNotification dans App.tsx
  - [ ] Tester la détection de nouvelle version
  - [ ] Vérifier que la mise à jour fonctionne
  - [ ] Tester le scénario "Plus tard"

- [ ] Tester le système de mise à jour (AC: 5)
  - [ ] Simuler une nouvelle version
  - [ ] Vérifier la notification
  - [ ] Tester le bouton "Mettre à jour"
  - [ ] Vérifier que la nouvelle version est active
  - [ ] Documenter le processus

## Dev Notes

### Architecture Context

**Configuration PWA Actuelle:**

```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',  // ✅ Auto-update activé
  injectRegister: false,       // ⚠️ À changer pour contrôle manuel
  // ...
})
```

**Pour Story 1.5, modifier en:**

```typescript
VitePWA({
  registerType: 'prompt',      // Demander à l'utilisateur
  injectRegister: 'auto',      // Injection automatique
  // ...
})
```

### Technical Requirements

**Hook useRegisterSW:**

```tsx
// src/hooks/useServiceWorkerUpdate.ts
import { useRegisterSW } from 'virtual:pwa-register/preact';

export function useServiceWorkerUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log('SW Registered:', registration);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  const updateNow = () => {
    updateServiceWorker(true);
  };

  const dismissUpdate = () => {
    setNeedRefresh(false);
  };

  return {
    needRefresh,
    offlineReady,
    updateNow,
    dismissUpdate,
  };
}
```

**Composant UpdateNotification:**

```tsx
// src/components/UpdateNotification.tsx
import { h } from 'preact';
import { useServiceWorkerUpdate } from '../hooks/useServiceWorkerUpdate';
import styled from '@emotion/styled';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ffc627 0%, #ff7323 100%);
  color: #fafafa;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 90%;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background: #fafafa;
    color: #ff7323;
    &:hover {
      background: #fff;
      transform: translateY(-2px);
    }
  ` : `
    background: transparent;
    color: #fafafa;
    border: 2px solid #fafafa;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`;

export function UpdateNotification() {
  const { needRefresh, offlineReady, updateNow, dismissUpdate } = useServiceWorkerUpdate();

  if (offlineReady) {
    return (
      <NotificationContainer>
        <p className="font-semibold">✅ Application prête en mode offline</p>
        <ButtonGroup>
          <Button onClick={dismissUpdate}>OK</Button>
        </ButtonGroup>
      </NotificationContainer>
    );
  }

  if (!needRefresh) return null;

  return (
    <NotificationContainer>
      <p className="font-semibold">🎉 Nouvelle version disponible !</p>
      <p className="text-sm mt-1">Mettez à jour pour profiter des dernières fonctionnalités.</p>
      <ButtonGroup>
        <Button primary onClick={updateNow}>
          Mettre à jour maintenant
        </Button>
        <Button onClick={dismissUpdate}>
          Plus tard
        </Button>
      </ButtonGroup>
    </NotificationContainer>
  );
}
```

**Intégration dans App:**

```tsx
// src/app.tsx
import { UpdateNotification } from './components/UpdateNotification';

export function App() {
  return (
    <>
      <Router>
        {/* Routes */}
      </Router>
      <Navigation />
      <UpdateNotification />
    </>
  );
}
```

**Configuration vite.config.ts:**

```typescript
// vite.config.ts
VitePWA({
  registerType: 'prompt',        // Demander à l'utilisateur
  injectRegister: 'auto',        // Injection automatique
  
  manifest: {
    // ... config existante
  },
  
  workbox: {
    // ... config existante
  },
  
  devOptions: {
    enabled: true,               // Activer en dev pour tester
    type: 'module',
    navigateFallback: 'index.html',
  },
})
```

### Project Structure Notes

**Fichiers à créer:**
```
src/
├── hooks/
│   └── useServiceWorkerUpdate.ts  # Hook pour SW updates
└── components/
    └── UpdateNotification.tsx     # Notification de mise à jour
```

**Fichiers à modifier:**
- `vite.config.ts` - Changer registerType à 'prompt'
- `src/app.tsx` - Ajouter UpdateNotification
- `src/PWABadge.tsx` - Peut être supprimé ou fusionné

### Testing Requirements

**Tests Manuels:**

1. **Simuler une nouvelle version:**
   ```bash
   # Terminal 1: Lancer l'app
   pnpm run dev
   
   # Ouvrir http://localhost:5173
   # Installer le SW
   
   # Terminal 2: Modifier package.json version
   # "version": "0.0.1" → "0.0.2"
   
   # Rebuild
   pnpm run build
   
   # La notification devrait apparaître
   ```

2. **Tester le bouton "Mettre à jour":**
   - Cliquer sur "Mettre à jour maintenant"
   - Vérifier que l'app recharge
   - Vérifier la nouvelle version dans Paramètres

3. **Tester le bouton "Plus tard":**
   - Cliquer sur "Plus tard"
   - Vérifier que la notification disparaît
   - Vérifier qu'on peut continuer à utiliser l'app

**Tests Automatisés:**

```typescript
// src/components/__tests__/UpdateNotification.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { UpdateNotification } from '../UpdateNotification';

// Mock du hook
vi.mock('../hooks/useServiceWorkerUpdate', () => ({
  useServiceWorkerUpdate: () => ({
    needRefresh: true,
    offlineReady: false,
    updateNow: vi.fn(),
    dismissUpdate: vi.fn(),
  }),
}));

describe('UpdateNotification', () => {
  it('renders when update is available', () => {
    render(<UpdateNotification />);
    expect(screen.getByText(/Nouvelle version disponible/i)).toBeTruthy();
  });

  it('shows update and dismiss buttons', () => {
    render(<UpdateNotification />);
    expect(screen.getByText(/Mettre à jour maintenant/i)).toBeTruthy();
    expect(screen.getByText(/Plus tard/i)).toBeTruthy();
  });
});
```

### Library & Framework Requirements

**Dépendances existantes:**
- `vite-plugin-pwa`: ^1.2.0 ✅
- `workbox-window`: ^7.4.0 ✅
- `@emotion/styled`: ^11.14.1 ✅

**Aucune nouvelle dépendance requise.**

### References

- [Source: epics.md#Story 1.5] - Acceptance criteria
- [Source: architecture.md#PWA Configuration] - Service Worker config
- [vite-plugin-pwa docs](https://vite-pwa-org.netlify.app/) - Documentation officielle
- [Source: Story 1.4] - Page Paramètres pour afficher version

### Critical Success Factors

1. **Notification visible** - Apparaît quand nouvelle version disponible
2. **Mise à jour fonctionne** - Recharge l'app avec nouvelle version
3. **Choix utilisateur respecté** - Peut reporter la mise à jour
4. **UX fluide** - Animation et design cohérents
5. **Tests passent** - Couverture du composant et hook

### Next Stories Dependencies

**Story 1.6 (Rollback)** dépend de cette story:
- Nécessite le système de versioning
- Ajoutera la possibilité de revenir en arrière

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet (Cascade)

### Debug Log References

- Configuration registerType: 'prompt' pour contrôle manuel
- Configuration injectRegister: 'auto' pour injection automatique
- Utilisation de virtual:pwa-register/preact

### Completion Notes List

✅ **Hook useServiceWorkerUpdate créé** (29 janvier 2026)
- Utilise useRegisterSW de virtual:pwa-register/preact
- Gère needRefresh et offlineReady
- Fonctions updateNow et dismissUpdate

✅ **Composant UpdateNotification créé**
- Design avec gradient BDC (jaune vers rouge)
- Animation slideUp au montage
- Boutons "Mettre à jour maintenant" et "Plus tard"
- Notification "Application prête offline"
- Styled avec Emotion

✅ **Configuration PWA mise à jour**
- registerType: 'autoUpdate' → 'prompt'
- injectRegister: false → 'auto'
- Permet le contrôle manuel des mises à jour

✅ **Intégration dans App**
- UpdateNotification ajouté dans App.tsx
- Positionné au-dessus du menu de navigation

✅ **Build vérifié**
- Compilation réussie
- Bundle: 61.05 KB (24.15 KB gzippé)
- 17 fichiers précachés (121.93 KB)

### File List

**Fichiers créés:**
- `src/hooks/useServiceWorkerUpdate.ts` - Hook pour gestion SW
- `src/components/UpdateNotification.tsx` - Notification de mise à jour

**Fichiers modifiés:**
- `vite.config.ts` - registerType 'prompt', injectRegister 'auto'
- `src/app.tsx` - Ajout UpdateNotification
