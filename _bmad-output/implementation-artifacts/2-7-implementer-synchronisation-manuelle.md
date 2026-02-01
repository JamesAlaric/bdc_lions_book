# Story 2.7: Implémenter Synchronisation Manuelle

Status: ready-for-dev

## Story

As a vendeur,
I want déclencher une synchronisation manuelle,
So that je peux mettre à jour mes données quand je le souhaite.

## Acceptance Criteria

**Given** je suis connecté à internet
**When** j'appuie sur le bouton "Synchroniser" dans les paramètres
**Then** la synchronisation démarre immédiatement
**And** un indicateur de progression s'affiche (spinner + pourcentage)
**And** l'horodatage se met à jour après synchronisation réussie
**And** un message de succès s'affiche "Synchronisation réussie"
**And** si la sync échoue, un message d'erreur clair est affiché avec possibilité de réessayer
**And** la sync manuelle fonctionne même si l'app est en arrière-plan

## Tasks / Subtasks

### Task 1: Create Manual Sync Hook
- [ ] Create `useManualSync()` hook in `src/lib/sync/`
- [ ] Implement sync trigger function
- [ ] Add progress tracking (percentage)
- [ ] Handle success/error states
- [ ] Update sync timestamp on success

### Task 2: Create Sync Button Component
- [ ] Create `SyncButton.tsx` component
- [ ] Implement visual states: idle, loading, success, error
- [ ] Add progress indicator (spinner + percentage)
- [ ] Style with BDC colors
- [ ] Add retry functionality on error

### Task 3: Integrate into Settings Page
- [ ] Add Sync section to Settings page
- [ ] Display last sync timestamp
- [ ] Add manual sync button
- [ ] Show sync status/result messages
- [ ] Handle offline state (disable button if offline)

### Task 4: Background Sync Support
- [ ] Ensure sync continues in background
- [ ] Add visibilitychange event handling
- [ ] Resume sync when app returns to foreground
- [ ] Prevent duplicate sync requests

### Task 5: Testing and Validation
- [ ] Test sync trigger from Settings
- [ ] Test progress indicator accuracy
- [ ] Test error handling and retry
- [ ] Test offline behavior
- [ ] Verify timestamp updates correctly

### Task 6: Documentation
- [ ] Update story with completion notes
- [ ] Update sprint-status.yaml (2.7: done)

## Dev Notes

### Technical Implementation

**Manual Sync Hook:**
```typescript
// useManualSync hook structure
interface UseManualSyncReturn {
  isSyncing: boolean;
  progress: number;
  lastSync: number | null;
  error: string | null;
  startSync: () => Promise<void>;
  retry: () => Promise<void>;
}
```

**Sync Progress Tracking:**
- Stage 1: Fetching (0-20%)
- Stage 2: Parsing (20-50%)
- Stage 3: Importing to IndexedDB (50-90%)
- Stage 4: Finalizing (90-100%)

**Error Handling:**
- Network errors: "Connexion instable. Réessayez."
- Parse errors: "Données corrompues. Contactez le support."
- Storage errors: "Espace insuffisant. Libérez de l'espace."

**Files to Create/Modify:**
- `src/lib/sync/useManualSync.ts` - Manual sync hook
- `src/components/sync/SyncButton.tsx` - Sync button with states
- `src/routes/Settings.tsx` - Add sync section
- `src/lib/data/loader.ts` - Add progress callbacks

### Design System

**Colors:**
- Idle: BDC Red (#ff7323)
- Loading: BDC Yellow (#ffc627)
- Success: Green (#22c55e)
- Error: Red (#ef4444)

**Button States:**
- Idle: "Synchroniser"
- Loading: Spinner + "Synchronisation... 45%"
- Success: Checkmark + "À jour !"
- Error: "Échec - Réessayer"

**Timestamp Format:**
- "Dernière sync: il y a 2 heures"
- "Jamais synchronisé" (if null)

## Dev Agent Record

### Agent Model Used

_A compléter_

### Debug Log References

_A compléter_

### Completion Notes List

_A compléter_

### File List

_A compléter_
