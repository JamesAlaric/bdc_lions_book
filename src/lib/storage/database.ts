import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { ProductStore, BrandStore, ObjectionStore, CampaignStore, MediaStore, UserDataStore, SyncMetadataStore } from './types';

export interface LionsBookDB extends DBSchema {
  metadata: {
    key: string;
    value: {
      version: string;
      lastMigration: string;
      createdAt: string;
    };
  };
  cache_v1: {
    key: string;
    value: any;
  };
  cache_v2: {
    key: string;
    value: any;
  };
  products: {
    key: string;
    value: ProductStore;
    indexes: {
      'by-name': string;
      'by-category': string;
      'by-brand': string;
      'by-canal': string;
    };
  };
  brands: {
    key: string;
    value: BrandStore;
  };
  objections: {
    key: string;
    value: ObjectionStore;
  };
  campaigns: {
    key: string;
    value: CampaignStore;
  };
  media: {
    key: string;
    value: MediaStore;
  };
  userData: {
    key: string;
    value: UserDataStore;
  };
  syncMetadata: {
    key: string;
    value: SyncMetadataStore;
  };
}

const DB_NAME = 'lions-book-db';
export const CURRENT_DB_VERSION = 3;

export async function initDatabase(): Promise<IDBPDatabase<LionsBookDB>> {
  const db = await openDB<LionsBookDB>(DB_NAME, CURRENT_DB_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      console.log(`Upgrading database from v${oldVersion} to v${newVersion}`);

      if (oldVersion < 1) {
        db.createObjectStore('metadata');
        db.createObjectStore('cache_v1');
        console.log('Created metadata and cache_v1 stores');
      }

      if (oldVersion < 2) {
        db.createObjectStore('cache_v2');
        console.log('Created cache_v2 store');
      }

      if (oldVersion < 3) {
        const productsStore = db.createObjectStore('products', { keyPath: 'id' });
        productsStore.createIndex('by-name', 'name');
        productsStore.createIndex('by-category', 'category');
        productsStore.createIndex('by-brand', 'brand');
        productsStore.createIndex('by-canal', 'canal');
        
        db.createObjectStore('brands', { keyPath: 'id' });
        db.createObjectStore('objections', { keyPath: 'id' });
        db.createObjectStore('campaigns', { keyPath: 'id' });
        db.createObjectStore('media', { keyPath: 'id' });
        db.createObjectStore('userData', { keyPath: 'id' });
        db.createObjectStore('syncMetadata', { keyPath: 'store' });
        
        console.log('Created catalogue stores: products, brands, objections, campaigns, media, userData, syncMetadata');
      }
    },
  });

  const existingMetadata = await db.get('metadata', 'version');
  
  await db.put('metadata', {
    version: CURRENT_DB_VERSION.toString(),
    lastMigration: new Date().toISOString(),
    createdAt: existingMetadata?.createdAt || new Date().toISOString(),
  }, 'version');

  console.log(`Database initialized at version ${CURRENT_DB_VERSION}`);
  
  return db;
}

export async function getDatabase(): Promise<IDBPDatabase<LionsBookDB>> {
  return openDB<LionsBookDB>(DB_NAME, CURRENT_DB_VERSION);
}

export async function cleanupOldVersions(): Promise<void> {
  const db = await getDatabase();
  await db.get('metadata', 'version');

  const storeNames = db.objectStoreNames;
  const cacheStores = Array.from(storeNames).filter(name => name.startsWith('cache_v'));

  const versionsToKeep = 2;
  const sortedStores = cacheStores
    .map(name => {
      const version = parseInt(name.replace('cache_v', ''));
      return { name, version };
    })
    .sort((a, b) => b.version - a.version);

  const storesToDelete = sortedStores.slice(versionsToKeep);

  for (const store of storesToDelete) {
    console.log(`Cleaning up old cache store: ${store.name}`);
  }

  console.log(`Kept ${versionsToKeep} most recent cache versions`);
}
