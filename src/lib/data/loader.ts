import yaml from 'js-yaml';
import { bulkCreateProducts } from '../storage/catalogue';
import { bulkCreateBrands } from '../storage/brands';
import { updateSyncTimestamp } from '../storage/sync';
import { setCachedStaticData } from '../storage/staticCache';
import type { ProductStore, BrandStore } from '../storage/types';
import type { SegmentsData } from './segments';
import type { ArgumentairesData } from './argumentaires';

type Fetcher = (path: string) => Promise<string>;

export type LoadStage = 'fetching' | 'parsing' | 'importing' | 'complete';

export interface LoadProgress {
  stage: LoadStage;
  current: number;
  total: number;
  percentage: number;
}

export interface LoadOptions {
  fetcher?: Fetcher;
  productPaths?: string[];
  brandPaths?: string[];
  metadataPath?: string;
  onProgress?: (progress: LoadProgress) => void;
}

const DEFAULT_PRODUCT_PATHS = [
  '/data/products/bieres.yaml',
  '/data/products/soft.yaml',
  '/data/products/eaux.yaml',
  '/data/products/vins.yaml',
  '/data/products/spiritueux.yaml',
];

const DEFAULT_BRAND_PATHS = [
  '/data/brands/33-export.yaml',
  '/data/brands/castel.yaml',
  '/data/brands/top.yaml',
  '/data/brands/supermont.yaml',
  '/data/brands/booster.yaml',
];

const DEFAULT_METADATA_PATH = '/data/metadata.yaml';

const ALLOWED_CATEGORIES = new Set(['biere', 'soft', 'eau', 'vin', 'spiritueux']);
const ALLOWED_CANALS = new Set(['CHR', 'PSV', 'TT', 'MT']);

function defaultFetcher(path: string): Promise<string> {
  if (typeof fetch === 'undefined') {
    return Promise.reject(new Error('fetch is not available in this environment'));
  }
  return fetch(path).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
    }
    return res.text();
  });
}

function reportProgress(progress: LoadProgress, cb?: (p: LoadProgress) => void) {
  if (cb) cb(progress);
}

function normaliseProduct(raw: any, fallbackCategory?: string): ProductStore {
  if (!raw.id || !raw.name || !raw.brand) {
    throw new Error('Product is missing mandatory fields (id, name, brand)');
  }
  if (!raw.historique || !raw.positionnement) {
    throw new Error(`Product ${raw.id} is missing historique/positionnement`);
  }

  const category = raw.category ?? fallbackCategory;
  if (!category) {
    throw new Error(`Product ${raw.id} is missing category`);
  }
  if (!ALLOWED_CATEGORIES.has(category)) {
    throw new Error(`Product ${raw.id} has invalid category "${category}"`);
  }

  if (!raw.canal || !ALLOWED_CANALS.has(raw.canal)) {
    throw new Error(`Product ${raw.id} has invalid canal "${raw.canal}"`);
  }

  if (raw.prix === undefined || raw.marge === undefined) {
    throw new Error(`Product ${raw.id} is missing pricing information`);
  }

  const specs = raw.specs ?? {};
  if (specs.contenance === undefined || specs.format === undefined) {
    throw new Error(`Product ${raw.id} is missing specs.contenance/format`);
  }

  return {
    ...raw,
    category: category as ProductStore['category'],
    specs: {
      contenance: specs.contenance,
      format: specs.format,
      nbBouteilles: specs.nbBouteilles,
      alcool: specs.alcool,
    },
    lastUpdated: raw.lastUpdated ?? Date.now(),
  } as ProductStore;
}

function parseProductsYaml(text: string): ProductStore[] {
  const doc: any = yaml.load(text) ?? {};
  const category = doc.category;
  const products: any[] = doc.products ?? [];
  return products.map((p) => normaliseProduct(p, category));
}

function parseBrandYaml(text: string): BrandStore {
  const doc: any = yaml.load(text) ?? {};
  if (!doc.id || !doc.name) {
    throw new Error('Brand is missing mandatory fields (id, name)');
  }
  return {
    ...doc,
    // Argumentaires are sourced from YAML catalog files, not stored in IndexedDB.
    argumentaires: [],
    lastUpdated: doc.lastUpdated ?? Date.now(),
  } as BrandStore;
}

function parseMetadataYaml(text: string): Record<string, any> {
  const doc: any = yaml.load(text) ?? {};
  return doc;
}

function parseMetadataTimestamp(value?: string | Date): number | null {
  if (!value) return null;
  if (value instanceof Date) return value.getTime();
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseMetadataVersion(version?: string | number): number | null {
  if (version === undefined || version === null) return null;
  if (typeof version === 'number') return Number.isNaN(version) ? null : Math.trunc(version);
  const major = parseInt(version.split('.')[0] ?? '', 10);
  return Number.isNaN(major) ? null : major;
}

async function fetchMany(paths: string[], fetcher: Fetcher): Promise<string[]> {
  return Promise.all(paths.map((p) => fetcher(p)));
}

export async function loadInitialCatalogue(options: LoadOptions = {}): Promise<void> {
  const {
    fetcher = defaultFetcher,
    productPaths = DEFAULT_PRODUCT_PATHS,
    metadataPath = DEFAULT_METADATA_PATH,
    onProgress,
  } = options;

  const fetchTargets = [...productPaths, metadataPath];
  reportProgress({ stage: 'fetching', current: 0, total: fetchTargets.length, percentage: 0 }, onProgress);

  const fetchedTexts = await fetchMany(fetchTargets, fetcher);
  const metadataText = fetchedTexts[fetchedTexts.length - 1] ?? '';
  const productTexts = fetchedTexts.slice(0, -1);
  reportProgress(
    { stage: 'fetching', current: fetchTargets.length, total: fetchTargets.length, percentage: 20 },
    onProgress,
  );

  const metadata = parseMetadataYaml(metadataText);
  const parsedProducts = productTexts.flatMap((text) => parseProductsYaml(text));
  reportProgress(
    { stage: 'parsing', current: parsedProducts.length, total: parsedProducts.length, percentage: 50 },
    onProgress,
  );

  const expectedCategories: string[] = metadata.categories ?? [];
  if (expectedCategories.length > 0) {
    const loadedCategories = new Set(parsedProducts.map((product) => product.category));
    const missing = expectedCategories.filter((cat) => !loadedCategories.has(cat as ProductStore['category']));
    if (missing.length > 0) {
      throw new Error(`Missing product categories: ${missing.join(', ')}`);
    }
  }
  if (typeof metadata.totalProducts === 'number' && metadata.totalProducts !== parsedProducts.length) {
    throw new Error(
      `Total products mismatch: metadata=${metadata.totalProducts}, parsed=${parsedProducts.length}`,
    );
  }

  await bulkCreateProducts(parsedProducts);
  reportProgress(
    { stage: 'importing', current: parsedProducts.length, total: parsedProducts.length, percentage: 90 },
    onProgress,
  );

  await updateSyncTimestamp('products', Date.now());
  const metadataTimestamp = parseMetadataTimestamp(metadata.lastUpdate) ?? Date.now();
  await updateSyncTimestamp('catalogue', metadataTimestamp, {
    version: parseMetadataVersion(metadata.version) ?? 1,
    conflictData: {
      sourceVersion: metadata.version,
      checksum: metadata.checksum,
      categories: metadata.categories,
      totalProducts: metadata.totalProducts,
      totalBrands: metadata.totalBrands,
      lastUpdate: metadata.lastUpdate,
    },
  });
  // Preload static data into IDB for offline access
  await preloadStaticData(fetcher);

  reportProgress({ stage: 'complete', current: 1, total: 1, percentage: 100 }, onProgress);
}

async function preloadStaticData(fetcher: Fetcher): Promise<void> {
  try {
    const [segmentsText, argumentairesText] = await Promise.all([
      fetcher('/data/static/catalog/segments-brands.yaml'),
      fetcher('/data/static/catalog/argumentaires.yaml'),
    ]);

    const segments = yaml.load(segmentsText) as SegmentsData;
    const argumentaires = yaml.load(argumentairesText) as ArgumentairesData;

    await Promise.all([
      setCachedStaticData('segments', segments),
      setCachedStaticData('argumentaires', argumentaires),
    ]);
  } catch (err) {
    // Non-critical: segments/argumentaires will be fetched on demand
    console.warn('Failed to preload static data:', err);
  }
}

export async function loadBrands(options: LoadOptions = {}): Promise<void> {
  const {
    fetcher = defaultFetcher,
    brandPaths = DEFAULT_BRAND_PATHS,
    metadataPath = DEFAULT_METADATA_PATH,
    onProgress,
  } = options;

  const fetchTargets = metadataPath ? [...brandPaths, metadataPath] : brandPaths;
  reportProgress({ stage: 'fetching', current: 0, total: fetchTargets.length, percentage: 0 }, onProgress);
  const fetchedTexts = await fetchMany(fetchTargets, fetcher);
  const metadataText = metadataPath ? fetchedTexts[fetchedTexts.length - 1] ?? '' : '';
  const brandTexts = metadataPath ? fetchedTexts.slice(0, -1) : fetchedTexts;
  reportProgress(
    { stage: 'fetching', current: fetchTargets.length, total: fetchTargets.length, percentage: 20 },
    onProgress,
  );

  const metadata = metadataPath ? parseMetadataYaml(metadataText) : {};
  const parsedBrands = brandTexts.map((text) => parseBrandYaml(text));
  reportProgress(
    { stage: 'parsing', current: parsedBrands.length, total: parsedBrands.length, percentage: 50 },
    onProgress,
  );
  if (typeof metadata.totalBrands === 'number' && metadata.totalBrands !== parsedBrands.length) {
    throw new Error(
      `Total brands mismatch: metadata=${metadata.totalBrands}, parsed=${parsedBrands.length}`,
    );
  }

  await bulkCreateBrands(parsedBrands);
  reportProgress(
    { stage: 'importing', current: parsedBrands.length, total: parsedBrands.length, percentage: 90 },
    onProgress,
  );

  await updateSyncTimestamp('brands', Date.now());
  reportProgress({ stage: 'complete', current: 1, total: 1, percentage: 100 }, onProgress);
}

// Helpers exposed for tests
export const __testables = {
  parseProductsYaml,
  parseBrandYaml,
  normaliseProduct,
};
