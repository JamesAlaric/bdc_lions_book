import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase, getDatabase } from './database';
import {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  bulkCreateBrands,
} from './brands';
import type { BrandStore } from './types';

describe('Brands Storage', () => {
  beforeEach(async () => {
    await initDatabase();
  });

  afterEach(async () => {
    const db = await getDatabase();
    const tx = db.transaction('brands', 'readwrite');
    await tx.store.clear();
    await tx.done;
  });

  it('should create brand in IndexedDB', async () => {
    const brand: BrandStore = {
      id: '1',
      name: 'Castel',
      histoire: 'Founded in 1949',
      positionnement: 'Premium African beer',
      argumentaires: ['Quality', 'Tradition', 'Local'],
      lastUpdated: Date.now(),
    };

    await createBrand(brand);
    const retrieved = await getBrand('1');
    
    expect(retrieved).toBeDefined();
    expect(retrieved?.name).toBe('Castel');
    expect(retrieved?.argumentaires).toHaveLength(3);
  });

  it('should throw error when creating brand with empty ID', async () => {
    const brand: BrandStore = {
      id: '',
      name: 'Test Brand',
      histoire: 'Test',
      positionnement: 'Test',
      argumentaires: [],
      lastUpdated: Date.now(),
    };

    await expect(createBrand(brand)).rejects.toThrow('Brand ID cannot be empty');
  });

  it('should throw error when creating brand with empty name', async () => {
    const brand: BrandStore = {
      id: '1',
      name: '',
      histoire: 'Test',
      positionnement: 'Test',
      argumentaires: [],
      lastUpdated: Date.now(),
    };

    await expect(createBrand(brand)).rejects.toThrow('Brand name cannot be empty');
  });

  it('should update existing brand', async () => {
    const brand: BrandStore = {
      id: '1',
      name: 'Castel',
      histoire: 'Founded in 1949',
      positionnement: 'Premium',
      argumentaires: ['Quality'],
      lastUpdated: Date.now(),
    };

    await createBrand(brand);
    await updateBrand('1', { positionnement: 'Premium African beer' });
    
    const updated = await getBrand('1');
    expect(updated?.positionnement).toBe('Premium African beer');
  });

  it('should throw error when updating non-existent brand', async () => {
    await expect(updateBrand('999', { name: 'Test' })).rejects.toThrow('Brand 999 not found');
  });

  it('should delete brand', async () => {
    const brand: BrandStore = {
      id: '1',
      name: 'Test Brand',
      histoire: 'Test',
      positionnement: 'Test',
      argumentaires: [],
      lastUpdated: Date.now(),
    };

    await createBrand(brand);
    await deleteBrand('1');
    
    const deleted = await getBrand('1');
    expect(deleted).toBeUndefined();
  });

  it('should list all brands', async () => {
    const brand1: BrandStore = {
      id: '1',
      name: 'Castel',
      histoire: 'Test',
      positionnement: 'Test',
      argumentaires: [],
      lastUpdated: Date.now(),
    };

    const brand2: BrandStore = {
      id: '2',
      name: 'Coca-Cola',
      histoire: 'Test',
      positionnement: 'Test',
      argumentaires: [],
      lastUpdated: Date.now(),
    };

    await createBrand(brand1);
    await createBrand(brand2);
    
    const brands = await getAllBrands();
    expect(brands).toHaveLength(2);
  });

  it('should bulk create brands', async () => {
    const brands: BrandStore[] = [
      {
        id: '1',
        name: 'Brand 1',
        histoire: 'Test',
        positionnement: 'Test',
        argumentaires: [],
        lastUpdated: Date.now(),
      },
      {
        id: '2',
        name: 'Brand 2',
        histoire: 'Test',
        positionnement: 'Test',
        argumentaires: [],
        lastUpdated: Date.now(),
      },
    ];

    await bulkCreateBrands(brands);
    
    const allBrands = await getAllBrands();
    expect(allBrands).toHaveLength(2);
  });

  it('should rollback transaction on bulk create failure', async () => {
    const brands: BrandStore[] = [
      {
        id: '1',
        name: 'Valid Brand',
        histoire: 'Test',
        positionnement: 'Test',
        argumentaires: [],
        lastUpdated: Date.now(),
      },
      {
        id: '',
        name: 'Invalid Brand',
        histoire: 'Test',
        positionnement: 'Test',
        argumentaires: [],
        lastUpdated: Date.now(),
      },
    ];

    await expect(bulkCreateBrands(brands)).rejects.toThrow();
    
    const allBrands = await getAllBrands();
    expect(allBrands).toHaveLength(0);
  });
});
