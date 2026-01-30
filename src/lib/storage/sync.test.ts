import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase, getDatabase } from './database';
import {
  getLastSyncTimestamp,
  updateSyncTimestamp,
  getSyncMetadata,
  incrementPendingChanges,
  resetPendingChanges,
} from './sync';

describe('Sync Metadata Storage', () => {
  beforeEach(async () => {
    await initDatabase();
  });

  afterEach(async () => {
    const db = await getDatabase();
    const tx = db.transaction('syncMetadata', 'readwrite');
    await tx.store.clear();
    await tx.done;
  });

  it('should return 0 for non-existent store timestamp', async () => {
    const timestamp = await getLastSyncTimestamp('products');
    expect(timestamp).toBe(0);
  });

  it('should update sync timestamp', async () => {
    const now = Date.now();
    await updateSyncTimestamp('products', now);
    
    const timestamp = await getLastSyncTimestamp('products');
    expect(timestamp).toBe(now);
  });

  it('should set status to synced when updating timestamp', async () => {
    const now = Date.now();
    await updateSyncTimestamp('products', now);
    
    const metadata = await getSyncMetadata('products');
    expect(metadata?.status).toBe('synced');
  });

  it('should get full sync metadata', async () => {
    const now = Date.now();
    await updateSyncTimestamp('products', now);
    
    const metadata = await getSyncMetadata('products');
    expect(metadata).toBeDefined();
    expect(metadata?.store).toBe('products');
    expect(metadata?.lastSyncTimestamp).toBe(now);
    expect(metadata?.version).toBe(1);
    expect(metadata?.pendingChanges).toBe(0);
    expect(metadata?.status).toBe('synced');
  });

  it('should increment pending changes', async () => {
    await updateSyncTimestamp('products', Date.now());
    
    await incrementPendingChanges('products');
    await incrementPendingChanges('products');
    
    const metadata = await getSyncMetadata('products');
    expect(metadata?.pendingChanges).toBe(2);
  });

  it('should set status to pending when incrementing changes', async () => {
    await updateSyncTimestamp('products', Date.now());
    await incrementPendingChanges('products');
    
    const metadata = await getSyncMetadata('products');
    expect(metadata?.status).toBe('pending');
  });

  it('should reset pending changes to 0', async () => {
    await updateSyncTimestamp('products', Date.now());
    await incrementPendingChanges('products');
    await incrementPendingChanges('products');
    
    await resetPendingChanges('products');
    
    const metadata = await getSyncMetadata('products');
    expect(metadata?.pendingChanges).toBe(0);
  });

  it('should set status to synced when resetting changes', async () => {
    await updateSyncTimestamp('products', Date.now());
    await incrementPendingChanges('products');
    
    await resetPendingChanges('products');
    
    const metadata = await getSyncMetadata('products');
    expect(metadata?.status).toBe('synced');
  });

  it('should preserve conflictData when updating', async () => {
    const now = Date.now();
    await updateSyncTimestamp('products', now);
    
    const db = await getDatabase();
    const existing = await db.get('syncMetadata', 'products');
    if (existing) {
      await db.put('syncMetadata', {
        ...existing,
        conflictData: { test: 'data' },
      });
    }
    
    await updateSyncTimestamp('products', now + 1000);
    
    const metadata = await getSyncMetadata('products');
    expect(metadata?.conflictData).toEqual({ test: 'data' });
  });

  it('should handle multiple stores independently', async () => {
    const now = Date.now();
    
    await updateSyncTimestamp('products', now);
    await updateSyncTimestamp('brands', now + 1000);
    
    const productsTimestamp = await getLastSyncTimestamp('products');
    const brandsTimestamp = await getLastSyncTimestamp('brands');
    
    expect(productsTimestamp).toBe(now);
    expect(brandsTimestamp).toBe(now + 1000);
  });
});
