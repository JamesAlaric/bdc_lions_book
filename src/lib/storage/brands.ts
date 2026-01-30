import { getDatabase } from './database';
import type { BrandStore } from './types';

export async function createBrand(brand: BrandStore): Promise<void> {
  const db = await getDatabase();
  await db.put('brands', brand);
}

export async function getBrand(id: string): Promise<BrandStore | undefined> {
  const db = await getDatabase();
  return await db.get('brands', id);
}

export async function updateBrand(id: string, updates: Partial<BrandStore>): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('brands', id);
  if (!existing) {
    throw new Error(`Brand ${id} not found`);
  }
  await db.put('brands', { ...existing, ...updates, lastUpdated: Date.now() });
}

export async function deleteBrand(id: string): Promise<void> {
  const db = await getDatabase();
  await db.delete('brands', id);
}

export async function getAllBrands(): Promise<BrandStore[]> {
  const db = await getDatabase();
  return await db.getAll('brands');
}

export async function bulkCreateBrands(brands: BrandStore[]): Promise<void> {
  const db = await getDatabase();
  const tx = db.transaction('brands', 'readwrite');
  await Promise.all(brands.map(b => tx.store.put(b)));
  await tx.done;
}
