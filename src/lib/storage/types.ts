export interface ProductStore {
  id: string;
  name: string;
  brand: string;
  category: 'biere' | 'soft' | 'eau' | 'vin' | 'spiritueux';
  canal: 'CHR' | 'PSV' | 'TT' | 'MT';
  prix: number;
  marge: number;
  specs: {
    alcool?: number;
    contenance: number;
    nbBouteilles?: number;
    format: string;
  };
  certifications?: string[];
  ingredients?: string[];
  conservation?: string;
  lastUpdated: number;
}

export interface BrandStore {
  id: string;
  name: string;
  histoire: string;
  positionnement: string;
  argumentaires: string[];
  lastUpdated: number;
}

export interface ObjectionStore {
  id: string;
  productId: string;
  objection: string;
  reponse: string;
  canal?: string;
  lastUpdated: number;
}

export interface CampaignStore {
  id: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  mediaIds: string[];
  lastUpdated: number;
}

export interface MediaStore {
  id: string;
  url: string;
  blob: Blob | null;
  thumbnail: Blob | null;
  size: number;
  cached: boolean;
  lastAccessed: number;
}

export interface UserDataStore {
  id: string;
  type: 'favorite' | 'history' | 'preference';
  data: object;
  lastUpdated: number;
}

export interface SyncMetadataStore {
  store: string;
  lastSyncTimestamp: number;
  version: number;
  pendingChanges: number;
  status: 'synced' | 'pending' | 'conflict';
  conflictData?: object;
}
