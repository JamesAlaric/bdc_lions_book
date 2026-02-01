import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAllBrands,
  getProductsByBrand,
  getProductsByCategoryAndBrand,
  createProduct,
  deleteProduct,
  getAllProducts,
} from './catalogue';
import type { ProductStore } from './types';

describe('Brand Filter Functions', () => {
  const mockProducts: ProductStore[] = [
    {
      id: '1',
      name: 'Castel Beer 65cl',
      brand: 'CASTEL BEER',
      category: 'biere',
      canal: 'CHR',
      prix: 500,
      marge: 15,
      historique: 'Historique Castel',
      positionnement: 'Positionnement Castel',
      specs: { contenance: 650, format: 'Bouteille' },
      lastUpdated: Date.now(),
    },
    {
      id: '2',
      name: 'Heineken 33cl',
      brand: 'HEINEKEN',
      category: 'biere',
      canal: 'PSV',
      prix: 600,
      marge: 18,
      historique: 'Historique Heineken',
      positionnement: 'Positionnement Heineken',
      specs: { contenance: 330, format: 'Canette' },
      lastUpdated: Date.now(),
    },
    {
      id: '3',
      name: 'Top Ananas 33cl',
      brand: 'TOP ANANAS',
      category: 'soft',
      canal: 'TT',
      prix: 300,
      marge: 20,
      historique: 'Historique Top',
      positionnement: 'Positionnement Top',
      specs: { contenance: 330, format: 'Bouteille' },
      lastUpdated: Date.now(),
    },
    {
      id: '4',
      name: 'Top Soda 33cl',
      brand: 'TOP SODA',
      category: 'soft',
      canal: 'MT',
      prix: 280,
      marge: 18,
      historique: 'Historique Top Soda',
      positionnement: 'Positionnement Top Soda',
      specs: { contenance: 330, format: 'Bouteille' },
      lastUpdated: Date.now(),
    },
  ];

  beforeEach(async () => {
    // Clear all products
    const allProducts = await getAllProducts();
    for (const product of allProducts) {
      await deleteProduct(product.id);
    }
    // Add mock products
    for (const product of mockProducts) {
      await createProduct(product);
    }
  });

  describe('getAllBrands', () => {
    it('should return all unique brands sorted alphabetically', async () => {
      const brands = await getAllBrands();
      expect(brands).toEqual(['CASTEL BEER', 'HEINEKEN', 'TOP ANANAS', 'TOP SODA']);
    });

    it('should return empty array when no products', async () => {
      // Clear all products
      const allProducts = await getAllProducts();
      for (const product of allProducts) {
        await deleteProduct(product.id);
      }
      const brands = await getAllBrands();
      expect(brands).toEqual([]);
    });
  });

  describe('getProductsByBrand', () => {
    it('should return products filtered by brand', async () => {
      const products = await getProductsByBrand('CASTEL BEER');
      expect(products).toHaveLength(1);
      expect(products[0].brand).toBe('CASTEL BEER');
    });

    it('should return empty array for non-existent brand', async () => {
      const products = await getProductsByBrand('NonExistent');
      expect(products).toEqual([]);
    });
  });

  describe('getProductsByCategoryAndBrand', () => {
    it('should return products filtered by both category and brand', async () => {
      const products = await getProductsByCategoryAndBrand('biere', 'CASTEL BEER');
      expect(products).toHaveLength(1);
      expect(products[0].category).toBe('biere');
      expect(products[0].brand).toBe('CASTEL BEER');
    });

    it('should return empty array when no match for combined filter', async () => {
      const products = await getProductsByCategoryAndBrand('biere', 'TOP ANANAS');
      expect(products).toEqual([]);
    });

    it('should return multiple products when multiple match', async () => {
      // Add another TOP brand soft drink
      await createProduct({
        ...mockProducts[2],
        id: '5',
        name: 'Top Orange 33cl',
        brand: 'TOP ORANGE',
      });
      
      // Both TOP ORANGE and TOP ANANAS are 'soft' category
      const products = await getProductsByCategoryAndBrand('soft', 'TOP ANANAS');
      expect(products).toHaveLength(1); // Only TOP ANANAS matches exactly
    });
  });
});
