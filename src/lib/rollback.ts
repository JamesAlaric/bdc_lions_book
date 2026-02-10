import packageJson from '../../package.json';

export interface VersionInfo {
  current: string;
  previous: string | null;
  canRollback: boolean;
  versions: string[];
}

const VERSION_STORAGE_KEY = 'app_versions';
const MAX_VERSIONS = 2;

export async function getVersionInfo(): Promise<VersionInfo> {
  const versions = getStoredVersions();

  return {
    current: packageJson.version,
    previous: versions.at(-2) ?? null,
    canRollback: versions.length >= 2,
    versions,
  };
}

export async function rollbackToPreviousVersion(): Promise<void> {
  const { previous, canRollback } = await getVersionInfo();

  if (!canRollback || !previous) {
    throw new Error('No previous version available for rollback');
  }

  console.log(`Starting rollback from v${packageJson.version} to v${previous}`);

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      console.log('Unregistering service worker:', registration.scope);
      await registration.unregister();
    }

    const cacheNames = await globalThis.caches.keys();
    for (const cacheName of cacheNames) {
      if (!cacheName.includes(previous)) {
        console.log('Deleting cache:', cacheName);
        await globalThis.caches.delete(cacheName);
      }
    }

    const versions = getStoredVersions();
    versions.pop();
    localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(versions));

    console.log(`Rollback to v${previous} completed. Reloading...`);
    
    globalThis.location.reload();
  } catch (error) {
    console.error('Rollback failed:', error);
    throw new Error(`Rollback failed: ${error}`);
  }
}

export function trackVersion(version: string): void {
  const versions = getStoredVersions();

  if (!versions.includes(version)) {
    versions.push(version);
    
    if (versions.length > MAX_VERSIONS) {
      const removed = versions.shift();
      console.log(`Removed old version from tracking: ${removed}`);
    }
    
    localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(versions));
    console.log(`Tracked version: ${version}. Total versions: ${versions.length}`);
  }
}

function getStoredVersions(): string[] {
  try {
    const stored = localStorage.getItem(VERSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse stored versions:', error);
    return [];
  }
}

export async function clearVersionHistory(): Promise<void> {
  localStorage.removeItem(VERSION_STORAGE_KEY);
  console.log('Version history cleared');
}
