export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  defaultValue: boolean;
}

export const featureFlags: Record<string, FeatureFlag> = {
  newCatalogUI: {
    key: 'newCatalogUI',
    name: 'Nouvelle UI Catalogue',
    description: 'Active la nouvelle interface du catalogue avec glassmorphisme',
    enabled: true,
    defaultValue: true,
  },
  carousel3D: {
    key: 'carousel3D',
    name: 'Carousel 3D',
    description: 'Active le carousel 3D pour les fiches produits',
    enabled: true,
    defaultValue: true,
  },
  offlineSync: {
    key: 'offlineSync',
    name: 'Synchronisation Offline',
    description: 'Active la synchronisation automatique en arrière-plan',
    enabled: true,
    defaultValue: true,
  },
  advancedFilters: {
    key: 'advancedFilters',
    name: 'Filtres Avancés',
    description: 'Active les filtres avancés par canal, type client et prix',
    enabled: true,
    defaultValue: true,
  },
  searchSuggestions: {
    key: 'searchSuggestions',
    name: 'Suggestions de Recherche',
    description: 'Active les suggestions prédictives pendant la recherche',
    enabled: true,
    defaultValue: true,
  },
};

const FEATURE_PREFIX = 'feature_';

export function isFeatureEnabled(key: string): boolean {
  const stored = localStorage.getItem(`${FEATURE_PREFIX}${key}`);
  if (stored !== null) {
    return stored === 'true';
  }
  return featureFlags[key]?.defaultValue ?? false;
}

export function setFeatureEnabled(key: string, enabled: boolean): void {
  localStorage.setItem(`${FEATURE_PREFIX}${key}`, enabled.toString());
  console.log(`Feature flag '${key}' set to ${enabled}`);
}

export function getAllFeatureFlags(): FeatureFlag[] {
  return Object.values(featureFlags).map(flag => ({
    ...flag,
    enabled: isFeatureEnabled(flag.key),
  }));
}

export function resetFeatureFlags(): void {
  Object.keys(featureFlags).forEach(key => {
    localStorage.removeItem(`${FEATURE_PREFIX}${key}`);
  });
  console.log('All feature flags reset to defaults');
}

export function getFeatureFlagStats(): { total: number; enabled: number; disabled: number } {
  const flags = getAllFeatureFlags();
  return {
    total: flags.length,
    enabled: flags.filter(f => f.enabled).length,
    disabled: flags.filter(f => !f.enabled).length,
  };
}
