import { getDatabase } from './database';
import type { ProductStore } from './types';

export async function createProduct(product: ProductStore): Promise<void> {
  const db = await getDatabase();
  await db.put('products', product);
}

export async function getProduct(id: string): Promise<ProductStore | undefined> {
  const db = await getDatabase();
  return await db.get('products', id);
}

export async function updateProduct(id: string, updates: Partial<ProductStore>): Promise<void> {
  const db = await getDatabase();
  const existing = await db.get('products', id);
  if (!existing) {
    throw new Error(`Product ${id} not found`);
  }
  await db.put('products', { ...existing, ...updates, lastUpdated: Date.now() });
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await getDatabase();
  await db.delete('products', id);
}

export async function getAllProducts(): Promise<ProductStore[]> {
  const db = await getDatabase();
  return await db.getAll('products');
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

export async function getProductsByCanal(canal: string): Promise<ProductStore[]> {
  const db = await getDatabase();
  const index = db.transaction('products').store.index('by-canal');
  return await index.getAll(canal);
}

export async function bulkCreateProducts(products: ProductStore[]): Promise<void> {
  const db = await getDatabase();
  const tx = db.transaction('products', 'readwrite');
  await Promise.all(products.map(p => tx.store.put(p)));
  await tx.done;
}
