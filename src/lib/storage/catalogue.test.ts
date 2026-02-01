import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase, getDatabase } from './database';
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByBrand,
  bulkCreateProducts,
} from './catalogue';
import type { ProductStore } from './types';

describe('Catalogue Storage', () => {
  beforeEach(async () => {
    await initDatabase();
  });

  afterEach(async () => {
    const db = await getDatabase();
    const tx = db.transaction('products', 'readwrite');
    await tx.store.clear();
    await tx.done;
  });

  it('should create product in IndexedDB', async () => {
    const product: ProductStore = {
      id: '1',
      name: 'Castel Beer',
      brand: 'CASTEL BEER',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'biere',
      canal: 'CHR',
      prix: 500,
      marge: 25,
      specs: {
        alcool: 5.5,
        contenance: 650,
        nbBouteilles: 24,
        format: 'Bouteille',
      },
      lastUpdated: Date.now(),
    };

    await createProduct(product);
    const retrieved = await getProduct('1');
    
    expect(retrieved).toBeDefined();
    expect(retrieved?.name).toBe('Castel Beer');
    expect(retrieved?.brand).toBe('CASTEL BEER');
  });

  it('should update existing product', async () => {
    const product: ProductStore = {
      id: '1',
      name: 'Castel Beer',
      brand: 'CASTEL BEER',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'biere',
      canal: 'CHR',
      prix: 500,
      marge: 25,
      specs: {
        contenance: 650,
        format: 'Bouteille',
      },
      lastUpdated: Date.now(),
    };

    await createProduct(product);
    await updateProduct('1', { prix: 550 });
    
    const updated = await getProduct('1');
    expect(updated?.prix).toBe(550);
  });

  it('should throw error when updating non-existent product', async () => {
    await expect(updateProduct('999', { prix: 100 })).rejects.toThrow('Product 999 not found');
  });

  it('should delete product', async () => {
    const product: ProductStore = {
      id: '1',
      name: 'Test Product',
      brand: 'Test Brand',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'soft',
      canal: 'PSV',
      prix: 300,
      marge: 20,
      specs: {
        contenance: 330,
        format: 'Canette',
      },
      lastUpdated: Date.now(),
    };

    await createProduct(product);
    await deleteProduct('1');
    
    const deleted = await getProduct('1');
    expect(deleted).toBeUndefined();
  });

  it('should list all products', async () => {
    const product1: ProductStore = {
      id: '1',
      name: 'Product 1',
      brand: 'Brand A',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'biere',
      canal: 'CHR',
      prix: 400,
      marge: 20,
      specs: { contenance: 500, format: 'Bouteille' },
      lastUpdated: Date.now(),
    };

    const product2: ProductStore = {
      id: '2',
      name: 'Product 2',
      brand: 'Brand B',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'soft',
      canal: 'PSV',
      prix: 300,
      marge: 15,
      specs: { contenance: 330, format: 'Canette' },
      lastUpdated: Date.now(),
    };

    await createProduct(product1);
    await createProduct(product2);
    
    const products = await getAllProducts();
    expect(products).toHaveLength(2);
  });

  it('should filter products by category', async () => {
    const biere: ProductStore = {
      id: '1',
      name: 'Bière Test',
      brand: 'Brand A',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'biere',
      canal: 'CHR',
      prix: 500,
      marge: 25,
      specs: { contenance: 650, format: 'Bouteille' },
      lastUpdated: Date.now(),
    };

    const soft: ProductStore = {
      id: '2',
      name: 'Soft Test',
      brand: 'Brand B',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'soft',
      canal: 'PSV',
      prix: 300,
      marge: 20,
      specs: { contenance: 330, format: 'Canette' },
      lastUpdated: Date.now(),
    };

    await createProduct(biere);
    await createProduct(soft);
    
    const bieres = await getProductsByCategory('biere');
    expect(bieres).toHaveLength(1);
    expect(bieres[0].name).toBe('Bière Test');
  });

  it('should filter products by brand', async () => {
    const product1: ProductStore = {
      id: '1',
      name: 'Product 1',
      brand: 'CASTEL BEER',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'biere',
      canal: 'CHR',
      prix: 500,
      marge: 25,
      specs: { contenance: 650, format: 'Bouteille' },
      lastUpdated: Date.now(),
    };

    const product2: ProductStore = {
      id: '2',
      name: 'Product 2',
      brand: 'TOP ANANAS',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'soft',
      canal: 'PSV',
      prix: 300,
      marge: 20,
      specs: { contenance: 330, format: 'Canette' },
      lastUpdated: Date.now(),
    };

    await createProduct(product1);
    await createProduct(product2);
    
    const castelProducts = await getProductsByBrand('CASTEL BEER');
    expect(castelProducts).toHaveLength(1);
    expect(castelProducts[0].name).toBe('Product 1');
  });

  it('should bulk create products', async () => {
    const products: ProductStore[] = [
      {
        id: '1',
        name: 'Product 1',
        brand: 'Brand A',
        historique: 'Historique test',
        positionnement: 'Positionnement test',
        category: 'biere',
        canal: 'CHR',
        prix: 500,
        marge: 25,
        specs: { contenance: 650, format: 'Bouteille' },
        lastUpdated: Date.now(),
      },
      {
        id: '2',
        name: 'Product 2',
        brand: 'Brand B',
        historique: 'Historique test',
        positionnement: 'Positionnement test',
        category: 'soft',
        canal: 'PSV',
        prix: 300,
        marge: 20,
        specs: { contenance: 330, format: 'Canette' },
        lastUpdated: Date.now(),
      },
      {
        id: '3',
        name: 'Product 3',
        brand: 'Brand C',
        historique: 'Historique test',
        positionnement: 'Positionnement test',
        category: 'eau',
        canal: 'TT',
        prix: 200,
        marge: 15,
        specs: { contenance: 500, format: 'Bouteille' },
        lastUpdated: Date.now(),
      },
    ];

    await bulkCreateProducts(products);
    
    const allProducts = await getAllProducts();
    expect(allProducts).toHaveLength(3);
  });

  it('should persist data after DB close/reopen', async () => {
    const product: ProductStore = {
      id: '1',
      name: 'Persistent Product',
      brand: 'Test Brand',
      historique: 'Historique test',
      positionnement: 'Positionnement test',
      category: 'vin',
      canal: 'MT',
      prix: 1000,
      marge: 30,
      specs: { contenance: 750, format: 'Bouteille' },
      lastUpdated: Date.now(),
    };

    await createProduct(product);
    
    let db = await getDatabase();
    db.close();
    
    db = await initDatabase();
    const retrieved = await getProduct('1');
    
    expect(retrieved).toBeDefined();
    expect(retrieved?.name).toBe('Persistent Product');
  });
});
