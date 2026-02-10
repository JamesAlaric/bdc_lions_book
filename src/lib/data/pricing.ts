/**
 * Pricing data loaded from Excel file
 * Contains all product variants with prices, margins and regions
 */

export interface PricingDistributeur {
  prix_achat: number;
  remise: number;
  frais: number;
  marge: number;
  taux: number;
}

export interface PricingDetailant {
  prix_achat: number;
  ristourne: number;
  frais: number;
  marge: number;
  taux: number;
}

export interface PricingConsommateur {
  prix_unitaire: number;
  prix_casier: number;
}

export interface ProductVariant {
  segment: string;
  brand: string;
  code: string;
  designation: string;
  format: string;
  unite: string;
  emballage: string;
  consigne: number;
  region: string;
  distributeur: PricingDistributeur;
  detaillant: PricingDetailant;
  consommateur: PricingConsommateur;
}

// Import the extracted data
import pricingData from '../../../data/static/catalog/prix-complet.json';

export const allProductVariants: ProductVariant[] = pricingData as ProductVariant[];

/**
 * Get all variants for a specific brand
 */
export function getVariantsByBrand(brandName: string): ProductVariant[] {
  const normalized = normalizeBrandName(brandName);
  return allProductVariants.filter(v =>
    normalizeBrandName(v.brand) === normalized
  );
}

/**
 * Get all available formats for a brand
 */
export function getFormatsByBrand(brandName: string): string[] {
  const variants = getVariantsByBrand(brandName);
  const formats = new Set(variants.map(v => v.format));
  return Array.from(formats).sort((a, b) => {
    // Sort by volume (extract number)
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numA - numB;
  });
}

/**
 * Get all available regions for a brand
 */
export function getRegionsByBrand(brandName: string): string[] {
  const variants = getVariantsByBrand(brandName);
  const regions = new Set(variants.map(v => v.region));
  return Array.from(regions);
}

/**
 * Normalize format for matching (CANETTE -> 50 CL, etc.)
 */
function normalizeFormat(format: string): { format: string; isBoite: boolean } {
  const upper = format.toUpperCase().trim();

  // CANETTE/CAN maps to 50 CL with boîte
  if (upper === 'CANETTE' || upper === 'CAN' || upper.includes('BOITE') || upper.includes('BOÎTE')) {
    return { format: '50 CL', isBoite: true };
  }

  // Normalize format patterns like "33CL" -> "33 CL"
  const match = upper.match(/^(\d+)\s*(CL)?$/);
  if (match) {
    return { format: `${match[1]} CL`, isBoite: false };
  }

  return { format: upper, isBoite: false };
}

/**
 * Get variant by brand and format
 */
export function getVariantByFormat(brandName: string, format: string, region?: string): ProductVariant | undefined {
  const variants = getVariantsByBrand(brandName);
  const { format: normalizedFormat, isBoite } = normalizeFormat(format);

  // Filter by format and optionally by emballage (boîte)
  const formatMatches = variants.filter(v => {
    const formatMatch = v.format === normalizedFormat;
    if (!formatMatch) return false;

    // If looking for boîte/canette, prefer boîte emballage
    if (isBoite) {
      return v.emballage.toUpperCase().includes('BOÎTE') || v.emballage.toUpperCase().includes('BOITE');
    }

    // Otherwise exclude boîte
    return !v.emballage.toUpperCase().includes('BOÎTE') && !v.emballage.toUpperCase().includes('BOITE');
  });

  // If no matches with emballage filter, try without
  const candidates = formatMatches.length > 0 ? formatMatches : variants.filter(v => v.format === normalizedFormat);

  // First try to find exact match with region
  if (region) {
    const exactMatch = candidates.find(v => v.region === region);
    if (exactMatch) return exactMatch;
  }

  // Try to find TOUS region
  const tousMatch = candidates.find(v => v.region === 'TOUS');
  if (tousMatch) return tousMatch;

  // Return first match
  return candidates[0];
}

/**
 * Get pricing for a specific variant
 */
export function getPricing(brandName: string, format: string, region?: string) {
  const variant = getVariantByFormat(brandName, format, region);
  if (!variant) return null;

  return {
    consommateur: {
      unitaire: variant.consommateur.prix_unitaire,
      casier: variant.consommateur.prix_casier,
    },
    distributeur: {
      prix: Math.round(variant.distributeur.prix_achat),
      marge: Math.round(variant.distributeur.marge),
      taux: Math.round(variant.distributeur.taux * 100),
    },
    detaillant: {
      prix: Math.round(variant.detaillant.prix_achat),
      marge: Math.round(variant.detaillant.marge),
      taux: Math.round(variant.detaillant.taux * 100),
    },
    region: variant.region,
    consigne: variant.consigne,
    emballage: variant.emballage,
    unite: variant.unite,
  };
}

/**
 * Normalize brand name for matching
 */
function normalizeBrandName(name: string): string {
  return name
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();
}

/**
 * Format price in FCFA
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('fr-FR');
}

/**
 * Get all unique brands from pricing data
 */
export function getAllBrands(): string[] {
  const brands = new Set(allProductVariants.map(v => v.brand));
  return Array.from(brands).sort();
}

/**
 * Get all products grouped by brand
 */
export function getProductsByBrandGrouped(): Map<string, ProductVariant[]> {
  const grouped = new Map<string, ProductVariant[]>();

  for (const variant of allProductVariants) {
    const existing = grouped.get(variant.brand) || [];
    existing.push(variant);
    grouped.set(variant.brand, existing);
  }

  return grouped;
}
