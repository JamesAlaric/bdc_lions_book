# Story 2.6: Créer Indicateur Statut Connexion et Horodatage Sync

Status: done

## Dev Agent Record

### Agent Model Used

GPT-4

### Debug Log References

- Build: pnpm vite build (success)

### Completion Notes List

- Created ConnectionIndicator.tsx with online/offline detection
- Created LastSyncIndicator.tsx with French relative time formatting
- Integrated both indicators into Settings page with dedicated section
- Added ConnectionIndicator to Navigation header (top bar)
- Used navigator.onLine API with event listeners
- Formatted timestamps as relative time ("il y a X minutes/heures/jours")
- Added accessibility attributes (aria-label, role="status")
- Build successful
- **FIXED (Code Review):** Fixed stale closure bug in LastSyncIndicator using useRef
- **FIXED (Code Review):** Added SSR safety check for navigator in ConnectionIndicator

### File List

- src/components/ui/ConnectionIndicator.tsx (new - connection status indicator)
- src/components/ui/LastSyncIndicator.tsx (new - last sync display)
- src/routes/Settings.tsx (modified - added connection and sync section)
- src/components/layout/Navigation.tsx (modified - added top bar with connection status)

## Story

As a vendeur,
I want voir clairement si je suis online ou offline,
So that je sais si mes données sont à jour.

## Acceptance Criteria

**Given** l'application est lancée
**When** je consulte l'interface
**Then** un indicateur visible montre le statut connexion (online/offline) avec icône + texte
**And** l'horodatage de la dernière synchronisation est affiché (ex: "Dernière sync: il y a 2 heures")
**And** l'indicateur se met à jour automatiquement quand la connexion change
**And** l'horodatage est visible dans la page Paramètres
**And** le format de date est clair et localisé en français

## Tasks / Subtasks

### Task 1: Create Connection Status Component
- [ ] Create `ConnectionIndicator.tsx` component
- [ ] Implement online/offline detection using navigator.onLine
- [ ] Add visual indicator (icon + text) for connection status
- [ ] Style with BDC colors (green for online, red for offline)
- [ ] Add to main layout/navigation

### Task 2: Create Last Sync Display Component
- [ ] Create `LastSyncIndicator.tsx` component
- [ ] Format timestamp as relative time (e.g., "il y a 2 heures")
- [ ] Handle French localization
- [ ] Update display when sync occurs

### Task 3: Integrate with Settings Page
- [ ] Add connection status to Settings page
- [ ] Add last sync timestamp to Settings page
- [ ] Show detailed sync information

### Task 4: Testing and Validation
- [ ] Test online/offline detection
- [ ] Test timestamp formatting
- [ ] Test French localization
- [ ] Verify offline functionality

### Task 5: Documentation
- [ ] Update story with completion notes
- [ ] Update sprint-status.yaml (2.6: done)

## Dev Notes

### Technical Implementation

**Connection Detection:**
```typescript
// Using navigator.onLine API
const isOnline = navigator.onLine;

// Event listeners for connection changes
window.addEventListener('online', () => setIsOnline(true));
window.addEventListener('offline', () => setIsOnline(false));
```

**Relative Time Formatting (French):**
```typescript
// Format: "il y a X minutes/heures/jours"
function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  // Implementation for French relative time
}
```

**Files to Create/Modify:**
- `src/components/ui/ConnectionIndicator.tsx` - Connection status indicator
- `src/components/ui/LastSyncIndicator.tsx` - Last sync display
- `src/routes/Settings.tsx` - Add to settings page
- `src/components/layout/Navigation.tsx` - Integrate into navigation

### Design System

**Colors:**
- Online: Green indicator (#22c55e)
- Offline: Red indicator (#ef4444)
- Text: Gray (#6b7280)

**Icons:**
- Online: WiFi/Signal icon
- Offline: No signal icon

## Dev Agent Record

### Agent Model Used

_A compléter_

### Debug Log References

_A compléter_

### Completion Notes List

_A compléter_

### File List

_A compléter_
