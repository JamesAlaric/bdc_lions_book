import { getDatabase } from './database';
import type { BrandStore } from './types';

function validateBrand(brand: Partial<BrandStore>): void {
  if (brand.id !== undefined && brand.id.trim() === '') {
    throw new Error('Brand ID cannot be empty');
  }
  if (brand.name !== undefined && brand.name.trim() === '') {
    throw new Error('Brand name cannot be empty');
  }
}

export async function createBrand(brand: BrandStore): Promise<void> {
  try {
    validateBrand(brand);
    const db = await getDatabase();
    await db.put('brands', brand);
  } catch (error) {
    console.error('Failed to create brand:', error);
    throw error;
  }
}

export async function getBrand(id: string): Promise<BrandStore | undefined> {
  try {
    const db = await getDatabase();
    return await db.get('brands', id);
  } catch (error) {
    console.error('Failed to get brand:', error);
    throw error;
  }
}

export async function updateBrand(id: string, updates: Partial<BrandStore>): Promise<void> {
  try {
    validateBrand(updates);
    const db = await getDatabase();
    const existing = await db.get('brands', id);
    if (!existing) {
      throw new Error(`Brand ${id} not found`);
    }
    await db.put('brands', { ...existing, ...updates, lastUpdated: Date.now() });
  } catch (error) {
    console.error('Failed to update brand:', error);
    throw error;
  }
}

export async function deleteBrand(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    await db.delete('brands', id);
  } catch (error) {
    console.error('Failed to delete brand:', error);
    throw error;
  }
}

export async function getAllBrands(): Promise<BrandStore[]> {
  try {
    const db = await getDatabase();
    return await db.getAll('brands');
  } catch (error) {
    console.error('Failed to get all brands:', error);
    throw error;
  }
}

export async function bulkCreateBrands(brands: BrandStore[]): Promise<void> {
  try {
    brands.forEach(validateBrand);
    const db = await getDatabase();
    const tx = db.transaction('brands', 'readwrite');
    try {
      await Promise.all(brands.map(b => tx.store.put(b)));
      await tx.done;
    } catch (error) {
      tx.abort();
      throw error;
    }
  } catch (error) {
    console.error('Failed to bulk create brands:', error);
    throw error;
  }
}
