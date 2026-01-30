import { getDatabase } from './database';
import type { SyncMetadataStore } from './types';

export async function getLastSyncTimestamp(store: string): Promise<number> {
  const db = await getDatabase();
  const metadata = await db.get('syncMetadata', store);
  return metadata?.lastSyncTimestamp || 0;
}

export interface SyncUpdateOptions {
  version?: number;
  conflictData?: object;
}

export async function updateSyncTimestamp(
  store: string,
  timestamp: number,
  options: SyncUpdateOptions = {},
): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('syncMetadata', store);
  
  const mergedConflictData =
    options.conflictData && typeof options.conflictData === 'object'
      ? { ...(existing?.conflictData ?? {}), ...options.conflictData }
      : existing?.conflictData;

  const metadata: SyncMetadataStore = {
    store,
    lastSyncTimestamp: timestamp,
    version: options.version ?? existing?.version ?? 1,
    pendingChanges: existing?.pendingChanges || 0,
    status: 'synced',
    conflictData: mergedConflictData,
  };
  
  await db.put('syncMetadata', metadata);
}

export async function getSyncMetadata(store: string): Promise<SyncMetadataStore | undefined> {
  const db = await getDatabase();
  return await db.get('syncMetadata', store);
}

export async function incrementPendingChanges(store: string): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('syncMetadata', store);
  
  const metadata: SyncMetadataStore = {
    store,
    lastSyncTimestamp: existing?.lastSyncTimestamp || 0,
    version: existing?.version || 1,
    pendingChanges: (existing?.pendingChanges || 0) + 1,
    status: 'pending',
    conflictData: existing?.conflictData,
  };
  
  await db.put('syncMetadata', metadata);
}

export async function resetPendingChanges(store: string): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('syncMetadata', store);
  
  if (existing) {
    const metadata: SyncMetadataStore = {
      ...existing,
      pendingChanges: 0,
      status: 'synced',
    };
    await db.put('syncMetadata', metadata);
  }
}
