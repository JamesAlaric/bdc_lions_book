import { getDatabase } from './database';
import type { ProductStore } from './types';

function validateProduct(product: Partial<ProductStore>): void {
  if (product.id !== undefined && product.id.trim() === '') {
    throw new Error('Product ID cannot be empty');
  }
  if (product.name !== undefined && product.name.trim() === '') {
    throw new Error('Product name cannot be empty');
  }
  if (product.historique !== undefined && product.historique.trim() === '') {
    throw new Error('Product historique cannot be empty');
  }
  if (product.positionnement !== undefined && product.positionnement.trim() === '') {
    throw new Error('Product positionnement cannot be empty');
  }
  if (product.prix !== undefined && product.prix < 0) {
    throw new Error('Product price cannot be negative');
  }
  if (product.marge !== undefined && product.marge < 0) {
    throw new Error('Product margin cannot be negative');
  }
}

export async function createProduct(product: ProductStore): Promise<void> {
  try {
    validateProduct(product);
    const db = await getDatabase();
    await db.put('products', product);
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
}

export async function getProduct(id: string): Promise<ProductStore | undefined> {
  try {
    const db = await getDatabase();
    return await db.get('products', id);
  } catch (error) {
    console.error('Failed to get product:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<ProductStore | undefined> {
  return getProduct(id);
}

export async function updateProduct(id: string, updates: Partial<ProductStore>): Promise<void> {
  try {
    validateProduct(updates);
    const db = await getDatabase();
    const existing = await db.get('products', id);
    if (!existing) {
      throw new Error(`Product ${id} not found`);
    }
    await db.put('products', { ...existing, ...updates, lastUpdated: Date.now() });
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    await db.delete('products', id);
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

export async function getAllProducts(): Promise<ProductStore[]> {
  try {
    const db = await getDatabase();
    return await db.getAll('products');
  } catch (error) {
    console.error('Failed to get all products:', error);
    throw error;
  }
}

export async function getProductsByCategory(category: string): Promise<ProductStore[]> {
  const db = await getDatabase();
  const index = db.transaction('products').store.index('by-category');
  return await index.getAll(category);
}

export async function getProductsByBrand(brand: string): Promise<ProductStore[]> {
  const db = await getDatabase();
  const index = db.transaction('products').store.index('by-brand');
  return await index.getAll(brand);
}

/**
 * Get all unique brands from products using cursor for memory efficiency
 */
export async function getAllBrands(): Promise<string[]> {
  const db = await getDatabase();
  const brands = new Set<string>();
  
  // Use cursor to iterate without loading all products into memory
  const tx = db.transaction('products', 'readonly');
  const store = tx.store;
  
  let cursor = await store.openCursor();
  while (cursor) {
    brands.add(cursor.value.brand);
    cursor = await cursor.continue();
  }
  
  return Array.from(brands).sort();
}

/**
 * Get products by category AND brand (combined filter)
 */
export async function getProductsByCategoryAndBrand(
  category: string,
  brand: string
): Promise<ProductStore[]> {
  const db = await getDatabase();
  // Use category index first (more selective), then filter by brand
  const index = db.transaction('products').store.index('by-category');
  const products = await index.getAll(category);
  return products.filter(p => p.brand === brand);
}

export async function getProductsByCanal(canal: string): Promise<ProductStore[]> {
  const db = await getDatabase();
  const index = db.transaction('products').store.index('by-canal');
  return await index.getAll(canal);
}

export async function bulkCreateProducts(products: ProductStore[]): Promise<void> {
  try {
    products.forEach(validateProduct);
    const db = await getDatabase();
    const tx = db.transaction('products', 'readwrite');
    try {
      await Promise.all(products.map(p => tx.store.put(p)));
      await tx.done;
    } catch (error) {
      tx.abort();
      throw error;
    }
  } catch (error) {
    console.error('Failed to bulk create products:', error);
    throw error;
  }
}
