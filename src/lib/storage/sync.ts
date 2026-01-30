import { getDatabase } from './database';
import type { SyncMetadataStore } from './types';

export async function getLastSyncTimestamp(store: string): Promise<number> {
  const db = await getDatabase();
  const metadata = await db.get('syncMetadata', store);
  return metadata?.lastSyncTimestamp || 0;
}

export async function updateSyncTimestamp(store: string, timestamp: number): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('syncMetadata', store);
  
  const metadata: SyncMetadataStore = {
    store,
    lastSyncTimestamp: timestamp,
    version: existing?.version || 1,
    pendingChanges: existing?.pendingChanges || 0,
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
    };
    await db.put('syncMetadata', metadata);
  }
}
