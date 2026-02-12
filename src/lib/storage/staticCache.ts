import { getDatabase } from './database';

const STORE_NAME = 'cache_v2';

export async function getCachedStaticData<T>(key: string): Promise<T | undefined> {
  const db = await getDatabase();
  const value = await db.get(STORE_NAME, key);
  return value as T | undefined;
}

export async function setCachedStaticData<T>(key: string, data: T): Promise<void> {
  const db = await getDatabase();
  await db.put(STORE_NAME, data, key);
}

export async function clearStaticCache(): Promise<void> {
  const db = await getDatabase();
  await db.clear(STORE_NAME);
}
