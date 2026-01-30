import { describe, it, expect, beforeEach } from 'vitest';
import { performance } from 'node:perf_hooks';
import fs from 'node:fs/promises';
import path from 'node:path';
import { initDatabase, getDatabase } from '../storage/database';
import { getAllProducts } from '../storage/catalogue';
import { getAllBrands } from '../storage/brands';
import { getSyncMetadata } from '../storage/sync';
import { loadInitialCatalogue, loadBrands } from './loader';

const root = path.resolve(process.cwd(), 'public');

const fileFetcher = async (resourcePath: string): Promise<string> => {
  const normalized = resourcePath.startsWith('/')
    ? resourcePath.slice(1)
    : resourcePath;
  const fullPath = path.join(root, normalized);
  return fs.readFile(fullPath, 'utf-8');
};

describe('data loader', () => {
  beforeEach(async () => {
    await initDatabase();
    const db = await getDatabase();
    await db.transaction('products', 'readwrite').store.clear();
    await db.transaction('brands', 'readwrite').store.clear();
  });

  it('loads products from YAML files into IndexedDB', async () => {
    await loadInitialCatalogue({ fetcher: fileFetcher });
    const products = await getAllProducts();
    expect(products.length).toBeGreaterThan(0);

    const categories = new Set(products.map((p) => p.category));
    expect(categories.has('biere')).toBe(true);
    expect(categories.has('soft')).toBe(true);
    expect(categories.has('eau')).toBe(true);
    expect(categories.has('vin')).toBe(true);
    expect(categories.has('spiritueux')).toBe(true);
  });

  it('loads brands from YAML files into IndexedDB', async () => {
    await loadBrands({ fetcher: fileFetcher });
    const brands = await getAllBrands();
    expect(brands.length).toBeGreaterThanOrEqual(4);
    const names = brands.map((b) => b.name);
    expect(names).toContain('33 Export');
    expect(names).toContain('Supermont');
  });

  it('reports progress up to 100%', async () => {
    const steps: number[] = [];
    await loadInitialCatalogue({
      fetcher: fileFetcher,
      onProgress: (p) => steps.push(p.percentage),
    });

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]).toBe(100);
  });

  it('stores catalogue metadata in sync store', async () => {
    await loadInitialCatalogue({ fetcher: fileFetcher });
    const metadata = await getSyncMetadata('catalogue');
    expect(metadata?.lastSyncTimestamp).toBeGreaterThan(0);
    expect(metadata?.conflictData).toMatchObject({
      sourceVersion: '1.0.0',
      totalProducts: 10,
      totalBrands: 5,
    });
  });

  it('persists catalogue across reload (offline usage)', async () => {
    await loadInitialCatalogue({ fetcher: fileFetcher });
    const initial = await getAllProducts();
    expect(initial.length).toBeGreaterThan(0);

    const db = await getDatabase();
    db.close();

    const afterReload = await getAllProducts();
    expect(afterReload.length).toBe(initial.length);
  });

  it('respects performance budget (< 6000ms)', async () => {
    const start = performance.now();
    await loadInitialCatalogue({ fetcher: fileFetcher });
    const durationMs = performance.now() - start;

    expect(durationMs).toBeLessThan(6000);
  });
});
