import type { IDBPDatabase } from 'idb';
import type { LionsBookDB } from './database';

export interface Migration {
  version: number;
  name: string;
  up: (db: IDBPDatabase<LionsBookDB>) => Promise<void>;
  down: (db: IDBPDatabase<LionsBookDB>) => Promise<void>;
}

export const migrations: Migration[] = [
  {
    version: 1,
    name: 'Initial schema',
    up: async () => {
      console.log('Migration v1: Initial schema created');
    },
    down: async () => {
      console.log('Rollback v1: Cannot rollback initial schema');
    },
  },
  {
    version: 2,
    name: 'Add cache_v2 for future product catalog',
    up: async () => {
      console.log('Migration v2: cache_v2 store ready for product data');
    },
    down: async () => {
      console.log('Rollback v2: Reverting to cache_v1');
    },
  },
];

export async function runMigrations(db: IDBPDatabase<LionsBookDB>): Promise<void> {
  try {
    const metadata = await db.get('metadata', 'version');
    const currentVersion = metadata ? parseInt(metadata.version) : 0;

    console.log(`Running migrations from version ${currentVersion}`);

    for (const migration of migrations) {
      if (migration.version > currentVersion) {
        console.log(`Applying migration ${migration.version}: ${migration.name}`);
        
        try {
          await migration.up(db);
          
          await db.put('metadata', {
            version: migration.version.toString(),
            lastMigration: new Date().toISOString(),
            createdAt: metadata?.createdAt || new Date().toISOString(),
          }, 'version');
          
          console.log(`Migration ${migration.version} completed successfully`);
        } catch (error) {
          console.error(`Migration ${migration.version} failed:`, error);
          
          if (migration.version > 1) {
            console.log(`Attempting rollback for migration ${migration.version}`);
            await migration.down(db);
          }
          
          throw new Error(`Migration ${migration.version} failed: ${error}`);
        }
      }
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration process failed:', error);
    throw error;
  }
}

export async function rollbackMigration(
  db: IDBPDatabase<LionsBookDB>,
  targetVersion: number
): Promise<void> {
  const metadata = await db.get('metadata', 'version');
  const currentVersion = metadata ? parseInt(metadata.version) : 0;

  if (targetVersion >= currentVersion) {
    throw new Error('Target version must be lower than current version');
  }

  console.log(`Rolling back from version ${currentVersion} to ${targetVersion}`);

  const migrationsToRollback = migrations
    .filter(m => m.version > targetVersion && m.version <= currentVersion)
    .sort((a, b) => b.version - a.version);

  for (const migration of migrationsToRollback) {
    console.log(`Rolling back migration ${migration.version}: ${migration.name}`);
    await migration.down(db);
  }

  await db.put('metadata', {
    version: targetVersion.toString(),
    lastMigration: new Date().toISOString(),
    createdAt: metadata?.createdAt || new Date().toISOString(),
  }, 'version');

  console.log(`Rollback to version ${targetVersion} completed`);
}
