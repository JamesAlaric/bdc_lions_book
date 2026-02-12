import { useEffect, useState, useMemo, useCallback, useRef, useLayoutEffect } from 'preact/hooks';
import { gsap } from 'gsap';
import { route } from 'preact-router';
import { packshotAssets, type PackshotAsset } from '../lib/data/packshots';
import { findArgumentaireBrand, loadArgumentaires, type ArgumentaireBrand } from '../lib/data/argumentaires';
import { loadSegmentsBrands } from '../lib/data/segments';
import { getAllProducts, getProductsByBrand } from '../lib/storage/catalogue';
import type { ProductStore } from '../lib/storage/types';
import { getPricing, getFormatsByBrand } from '../lib/data/pricing';
import { BRAND_NEWS } from '../lib/data/news';
import { BrandDetailSkeleton, SkeletonImage, OfflineBanner } from '../components/ui/Skeleton';

interface BrandDetailProps {
  id?: string;
  path?: string;
}

// ============================================
// ARGUMENTAIRE MOTIVATIONS GRID
// ============================================

type ArgumentRow = {
  motivation: string;
  fact: string;
  proof: string;
  benefit: string;
  fullText: string;
};

type ArgumentGroupData = {
  id: string;
  title: string;
  subtitle: string;
  tone: 'rational' | 'emotional';
  rows: ArgumentRow[];
};


// BRAND_NEWS imported from '../lib/data/news'
// ============================================
// UTILITY FUNCTIONS
// ============================================

function buildArgumentGroups(argumentaire?: ArgumentaireBrand | null): ArgumentGroupData[] {
  if (!argumentaire) return [];

  const rationalRows = argumentaire.sales_arguments_table?.rational?.length
    ? argumentaire.sales_arguments_table.rational.map((row) => ({
        motivation: row.motivation,
        fact: row.fact,
        proof: row.proof,
        benefit: row.benefit,
        fullText: [row.motivation, row.fact, row.proof, row.benefit].filter(Boolean).join(' '),
      }))
    : buildArgumentRows(argumentaire.sales_arguments?.rational);

  const emotionalRows = argumentaire.sales_arguments_table?.emotional?.length
    ? argumentaire.sales_arguments_table.emotional.map((row) => ({
        motivation: row.motivation,
        fact: row.fact,
        proof: row.proof,
        benefit: row.benefit,
        fullText: [row.motivation, row.fact, row.proof, row.benefit].filter(Boolean).join(' '),
      }))
    : buildArgumentRows(argumentaire.sales_arguments?.emotional);
  const groups: ArgumentGroupData[] = [];

  if (rationalRows.length > 0) {
    groups.push({
      id: 'rational',
      title: 'Rationnelles',
      subtitle: buildMotivationSubtitle(rationalRows),
      tone: 'rational',
      rows: rationalRows,
    });
  }

  if (emotionalRows.length > 0) {
    groups.push({
      id: 'emotional',
      title: 'Irrationnelles',
      subtitle: buildMotivationSubtitle(emotionalRows),
      tone: 'emotional',
      rows: emotionalRows,
    });
  }

  return groups;
}

function buildMotivationSubtitle(rows: ArgumentRow[]) {
  return rows.map((row) => row.motivation).filter(Boolean).join(' • ');
}

function buildArgumentRows(entries?: string[]): ArgumentRow[] {
  if (!entries || entries.length === 0) return [];
  return entries.map((entry, index) => parseArgumentRow(entry, index));
}

const MOTIVATION_LABELS: Array<{ key: string; label: string }> = [
  { key: 'securite', label: 'Sécurité' },
  { key: 'argent', label: 'Argent' },
  { key: 'commodite', label: 'Commodité' },
  { key: 'commodites', label: 'Commodité' },
  { key: 'competitivite', label: 'Compétitivité' },
  { key: 'orgueil', label: 'Orgueil' },
  { key: 'imitation', label: 'Imitation' },
  { key: 'nouveaute', label: 'Nouveauté' },
  { key: 'sympathie', label: 'Sympathie' },
];

const PROOF_TOKENS = new Set([
  'elle',
  'il',
  'ils',
  'cest',
  'voir',
  'donner',
  'produite',
  'produit',
  'consommee',
  'consomme',
  'appreciee',
  'apprecie',
  'mise',
  'disponible',
  'evolution',
  'evolue',
  'reconnue',
  'present',
  'presente',
]);

const BENEFIT_TOKENS = new Set([
  'bonne',
  'bonnes',
  'grand',
  'grande',
  'choix',
  'pratique',
  'espoir',
  'fidelisation',
  'client',
  'clients',
  'consommateur',
  'consommateurs',
  'amelioration',
  'gain',
  'marge',
  'rotation',
  'rapport',
  'qualite',
  'prix',
  'marque',
  'support',
  'visibilite',
  'demande',
  'profit',
]);

function parseArgumentRow(text: string, index: number): ArgumentRow {
  const trimmed = text.replaceAll(/\s+/g, ' ').trim();
  const { label, rest } = extractMotivation(trimmed, index);
  const { fact, proof, benefit } = splitArgumentTriptych(rest);
  return {
    motivation: label,
    fact,
    proof,
    benefit,
    fullText: trimmed,
  };
}

function extractMotivation(text: string, index: number) {
  const tokens = text.split(/\s+/);
  const firstWord = tokens[0] ?? '';
  const normalized = normalizeToken(firstWord);
  const match = MOTIVATION_LABELS.find((item) => item.key === normalized);
  if (match) {
    return { label: match.label, rest: tokens.slice(1).join(' ') };
  }
  const fallbackLabel = firstWord || `Motivation ${index + 1}`;
  return { label: fallbackLabel, rest: tokens.slice(1).join(' ') };
}

function splitArgumentTriptych(text: string) {
  const clean = text.replaceAll(/\s+/g, ' ').trim();
  if (!clean) return { fact: '', proof: '', benefit: '' };

  const separatorSplit = clean.split(/\s\|\s|\s•\s|\s\/\s/).filter(Boolean);
  if (separatorSplit.length >= 3) {
    return {
      fact: separatorSplit[0] ?? '',
      proof: separatorSplit[1] ?? '',
      benefit: separatorSplit.slice(2).join(' '),
    };
  }

  const words = clean.split(' ');
  if (words.length <= 6) {
    return { fact: clean, proof: '', benefit: '' };
  }

  const proofIndex = findSplitIndex(
    words,
    PROOF_TOKENS,
    Math.floor(words.length * 0.25),
    Math.floor(words.length * 0.6)
  );
  const benefitIndex = findSplitIndex(
    words,
    BENEFIT_TOKENS,
    proofIndex > 0 ? proofIndex + 1 : Math.floor(words.length * 0.6),
    Math.floor(words.length * 0.9)
  );

  if (proofIndex > 0 && benefitIndex > proofIndex + 1) {
    return {
      fact: words.slice(0, proofIndex).join(' '),
      proof: words.slice(proofIndex, benefitIndex).join(' '),
      benefit: words.slice(benefitIndex).join(' '),
    };
  }

  const first = Math.max(1, Math.round(words.length * 0.34));
  const second = Math.max(first + 1, Math.round(words.length * 0.67));
  return {
    fact: words.slice(0, first).join(' '),
    proof: words.slice(first, second).join(' '),
    benefit: words.slice(second).join(' '),
  };
}

function findSplitIndex(words: string[], tokens: Set<string>, start: number, end: number) {
  const last = Math.min(end, words.length - 1);
  for (let i = Math.max(start, 1); i <= last; i++) {
    const normalized = normalizeToken(words[i]);
    if (tokens.has(normalized)) {
      return i;
    }
  }
  return -1;
}

function normalizeToken(value: string) {
  return value
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/g, '');
}

function normalizeTokens(value: string) {
  return normalizeBrand(value).split(' ').filter(Boolean);
}

function getPositioningScore(value: string) {
  if (!value) return { value: 50, label: 'Milieu de gamme' };

  const normalized = value.toLowerCase().trim();

  // Premium segment (80-100)
  if (/(premium|haut de gamme|luxe|prestige|superieur)/.test(normalized)) {
    return { value: 90, label: 'Premium' };
  }

  // Top Mainstream segment (60-80)
  if (/(top mainstream|top|haut|niche|artisanal|craft|specialite)/.test(normalized)) {
    return { value: 70, label: 'Top Mainstream' };
  }

  // Milieu de gamme segment (40-60)
  if (/(milieu|moyen|equilibre|standard)/.test(normalized)) {
    return { value: 50, label: 'Milieu de gamme' };
  }

  // Mainstream segment (20-40)
  if (/(mainstream|main stream|grand public|populaire|mass|accessible)/.test(normalized)) {
    return { value: 30, label: 'Mainstream' };
  }

  // Entrée de gamme segment (0-20)
  if (/(entree|entrée|economique|premier prix|basique|local)/.test(normalized)) {
    return { value: 10, label: 'Entrée de gamme' };
  }

  // Default to middle
  return { value: 50, label: 'Milieu de gamme' };
}

function normalizeFormat(value?: string | null) {
  if (!value) return null;
  const normalized = value.toLowerCase();
  if (normalized.includes('can')) return 'canette';
  if (normalized.includes('pet')) return 'pet';
  if (normalized.includes('bouteille') || normalized.includes('btl') || normalized.includes('bte')) {
    return 'bouteille';
  }
  return normalized;
}

const UNIT_MULTIPLIERS: Record<string, number> = { ML: 1, CL: 10, L: 1000 };

function convertToMl(value: number, unit: string): number | null {
  const multiplier = UNIT_MULTIPLIERS[unit];
  if (multiplier == null) return null;
  return Math.round(value * multiplier);
}

function inferFromRaw(raw: number): number | null {
  if (raw >= 1000) return raw;
  if (raw >= 100 && raw % 10 === 0) return raw;
  if (raw >= 20 && raw <= 99) return raw * 10;
  return null;
}

function extractVolumeMl(text: string) {
  if (!text) return null;
  const normalized = text.toUpperCase().replace(',', '.');
  const unitMatch = /(\d+(?:\.\d+)?)\s*(CL|ML|L)\b/.exec(normalized);
  if (unitMatch) {
    const value = Number.parseFloat(unitMatch[1]);
    if (Number.isNaN(value)) return null;
    return convertToMl(value, unitMatch[2]);
  }
  const fallbackMatch = /\b(\d{2,4})\b/.exec(normalized);
  if (!fallbackMatch) return null;
  const raw = Number.parseInt(fallbackMatch[1], 10);
  return Number.isNaN(raw) ? null : inferFromRaw(raw);
}

function extractFormatHint(text: string) {
  if (!text) return null;
  const normalized = text.toUpperCase();
  if (/\\bCANETTE\\b/.test(normalized) || /\\bCAN\\b/.test(normalized)) return 'canette';
  if (/\\bPET\\b/.test(normalized)) return 'pet';
  if (/\\bBOUTEILLE\\b/.test(normalized) || /\\bBTE\\b/.test(normalized) || /\\bBTL\\b/.test(normalized)) {
    return 'bouteille';
  }
  return null;
}

function matchPackshotToProduct(packshot: PackshotAsset, products: ProductStore[]) {
  if (!products.length) return undefined;

  const descriptor = [packshot.group, packshot.name].filter(Boolean).join(' ');
  const volumeMl = extractVolumeMl(descriptor);
  const formatHint = extractFormatHint(descriptor);

  const formatFiltered = formatHint
    ? products.filter((product) => normalizeFormat(product.specs?.format) === formatHint)
    : products;
  const volumeFiltered = volumeMl
    ? formatFiltered.filter((product) => product.specs?.contenance === volumeMl)
    : formatFiltered;

  if (volumeFiltered.length === 1) return volumeFiltered[0];
  if (volumeFiltered.length > 1) return volumeFiltered[0];

  if (volumeMl) {
    const byVolume = products.filter((product) => product.specs?.contenance === volumeMl);
    if (byVolume.length > 0) return byVolume[0];
  }

  if (formatHint) {
    const byFormat = products.filter((product) => normalizeFormat(product.specs?.format) === formatHint);
    if (byFormat.length > 0) return byFormat[0];
  }

  return undefined;
}

function isSubset(small: Set<string>, large: Set<string>) {
  for (const token of small) {
    if (!large.has(token)) {
      return false;
    }
  }
  return true;
}

function brandMatches(left: string, right: string) {
  const leftTokens = new Set(normalizeTokens(left));
  const rightTokens = new Set(normalizeTokens(right));
  if (!leftTokens.size || !rightTokens.size) {
    return false;
  }
  return isSubset(leftTokens, rightTokens) || isSubset(rightTokens, leftTokens);
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    biere: 'Biere',
    soft: 'Boisson Soft',
    eau: 'Eau',
    vin: 'Vin',
    spiritueux: 'Spiritueux',
  };
  return labels[category] || category;
}

function normalizeBrand(value: string) {
  return value
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .replaceAll(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toUpperCase();
}

function toBrandLabel(brandId: string) {
  return brandId.replaceAll('-', ' ').trim().toUpperCase();
}

// Territoire d'expression mapping per brand
const TERRITOIRE_EXPRESSION: Record<string, string> = {
  '33 EXPORT': 'Football',
  'CASTEL BEER': 'Reussite',
  'MANYAN': 'Cameroun',
  'BEAUFORT LAGER': 'Fraicheur',
  'BEAUFORT LIGHT': 'Bien-etre',
  'BEAUFORT TANGO': 'Tendance',
  'MUTZIG': 'Premium Night Life',
  'HEINEKEN': 'Champions League',
  'ISENBECK': 'Distinction',
  'DOPPEL': 'Force',
  'CASTLE MILK STOUT': 'Richesse',
  'PELFORTH': 'Caractere',
  'TOP': 'Reves',
  'DJINO': 'Fruits',
  'ORANGINA': 'Originalite',
  'MALTA TONIC': 'Vitalite',
  'XXL ENERGY': 'Energie',
};

// Surface d'expression mapping per brand
const SURFACE_EXPRESSION: Record<string, string> = {
  '33 EXPORT': "L'amitie, les rencontres entre amis",
  'CASTEL BEER': 'La volonte de reussir, le travail',
  'MANYAN': 'La solidarite, la fierte locale',
  'BEAUFORT LAGER': 'Les moments de fraicheur entre connaisseurs',
  'BEAUFORT LIGHT': 'Profiter de la vie en restant leger',
  'BEAUFORT TANGO': 'Les sorties entre amis, la tendance',
  'MUTZIG': 'Les soirees premium, la nuit',
  'HEINEKEN': 'Le sport, les grands evenements',
  'ISENBECK': 'Les moments distingues',
  'DOPPEL': 'La virilite, le dynamisme',
  'CASTLE MILK STOUT': 'Les origines, la personnalite',
  'PELFORTH': "L'audace, la confiance en soi",
  'TOP': 'La joie, les reves de jeunesse',
  'DJINO': "L'explosion fruitee",
  'ORANGINA': 'La naturalite, la fraicheur',
  'MALTA TONIC': "L'energie au quotidien",
  'XXL ENERGY': 'Repousser ses limites',
};

// Brand-specific background colors for product hero — contrasting, on-brand
const BRAND_COLORS: Record<string, { bg: string; darkBg: string }> = {
  '33-export': { bg: '#D4A017', darkBg: '#8B6914' },           // golden amber
  'beaufort-lager': { bg: '#1B6B2A', darkBg: '#0F3D18' },      // deep green
  'beaufort-light': { bg: '#4CAF50', darkBg: '#2E7D32' },      // lighter green
  'beaufort-tango': { bg: '#E65100', darkBg: '#BF360C' },      // orange
  'castel-beer': { bg: '#8B1A1A', darkBg: '#5C1010' },         // deep red
  'castle-milk-stout': { bg: '#2C1810', darkBg: '#1A0E0A' },   // dark brown
  'manyan': { bg: '#6D4C2E', darkBg: '#3E2C1A' },              // earthy brown
  'mutzig': { bg: '#1A237E', darkBg: '#0D1250' },              // navy blue
  'heineken': { bg: '#00843D', darkBg: '#005A2A' },            // Heineken green
  'isenbeck': { bg: '#2E4057', darkBg: '#1A2636' },            // steel blue
  'doppel': { bg: '#7B1F1F', darkBg: '#4A1212' },              // dark crimson
  'pelforth': { bg: '#C17A2F', darkBg: '#8B5A1E' },            // amber copper
  'chill-citron': { bg: '#A0C850', darkBg: '#6B8A30' },        // lime green
  // Boissons gazeuses
  'top': { bg: '#F57C00', darkBg: '#E65100' },                 // orange
  'djino': { bg: '#2E7D32', darkBg: '#1B5E20' },               // tropical green
  'orangina': { bg: '#FF8F00', darkBg: '#E65100' },            // orange
  'vimto': { bg: '#6A1B9A', darkBg: '#4A148C' },               // purple
  'world-cola': { bg: '#B71C1C', darkBg: '#7F0000' },          // cola red
  'youzou': { bg: '#00897B', darkBg: '#00695C' },              // teal
  // Eaux
  'tangui': { bg: '#0277BD', darkBg: '#01579B' },              // water blue
  'tangui-citron': { bg: '#00ACC1', darkBg: '#00838F' },       // cyan
  'aquabelle': { bg: '#0288D1', darkBg: '#01579B' },           // sky blue
  'vitale': { bg: '#039BE5', darkBg: '#0277BD' },              // bright blue
  // Malts & Energy
  'malta-tonic': { bg: '#5D4037', darkBg: '#3E2723' },         // dark malt
  'xxl': { bg: '#1A1A2E', darkBg: '#0A0A1A' },                 // electric dark
  // Alcools Mix
  'booster-cola': { bg: '#3E2723', darkBg: '#1B0F0B' },        // dark cola
  'booster-tonic': { bg: '#33691E', darkBg: '#1B5E20' },       // green
  'orijin': { bg: '#1B3A1B', darkBg: '#0D1F0D' },              // dark herbal
  'racine': { bg: '#4E342E', darkBg: '#2C1B17' },              // root brown
  'smirnoff-black-ice': { bg: '#212121', darkBg: '#0D0D0D' },  // black
  'smirnoff-pineapple-ice': { bg: '#F9A825', darkBg: '#F57F17' }, // pineapple gold
  // Spiritueux
  'absolut-vodka': { bg: '#1565C0', darkBg: '#0D47A1' },       // blue
  'ballantines': { bg: '#8D6E3F', darkBg: '#5D4524' },         // whisky gold
  'chivas-regal': { bg: '#8B6914', darkBg: '#5C4410' },        // regal gold
  'jameson': { bg: '#2E5F2E', darkBg: '#1B3C1B' },             // Irish green
  'martell': { bg: '#6D3A0A', darkBg: '#4A2706' },             // cognac
  'gh-mumm': { bg: '#B71C1C', darkBg: '#7F0000' },             // champagne red
  // Vins
  'baron-de-lestac': { bg: '#4A0E0E', darkBg: '#2C0808' },     // wine red
  'maison-castel': { bg: '#5C1818', darkBg: '#3A0E0E' },       // bordeaux
  'chateau-cavalier': { bg: '#E8C4A0', darkBg: '#8B7355' },    // rose gold
  'chateau-ferrande': { bg: '#4A1028', darkBg: '#2E0A1A' },    // deep wine
  'chateau-tour-prignac': { bg: '#5C1A2A', darkBg: '#3A1018' },// claret
  'chateau-d-arcins': { bg: '#3E1020', darkBg: '#260A14' },    // dark wine
  'chateau-de-haut-coulon': { bg: '#6B2D3E', darkBg: '#4A1E2C' }, // plum
  'chateau-du-bousquet': { bg: '#8B4513', darkBg: '#5C2E0E' }, // saddle brown
  'monbazillac': { bg: '#DAA520', darkBg: '#B8860B' },         // sweet gold
};

const DEFAULT_BRAND_COLOR = { bg: '#E5E7EB', darkBg: '#374151' };

function getBrandColor(brandId: string): { bg: string; darkBg: string } {
  return BRAND_COLORS[brandId] || DEFAULT_BRAND_COLOR;
}

function getTerritoireExpression(brand: string): string | undefined {
  const key = Object.keys(TERRITOIRE_EXPRESSION).find(
    (k) => k.toUpperCase() === brand.toUpperCase()
  );
  return key ? TERRITOIRE_EXPRESSION[key] : undefined;
}

function getSurfaceExpression(brand: string): string | undefined {
  const key = Object.keys(SURFACE_EXPRESSION).find(
    (k) => k.toUpperCase() === brand.toUpperCase()
  );
  return key ? SURFACE_EXPRESSION[key] : undefined;
}

async function detectSegmentCategory(brandId: string): Promise<ProductStore['category']> {
  try {
    const data = await loadSegmentsBrands();
    for (const seg of data.segments) {
      if (seg.brands.some((b) => b.id === brandId)) {
        const map: Record<string, ProductStore['category']> = {
          bieres: 'biere',
          'boissons-gazeuses': 'soft',
          eaux: 'eau',
          vins: 'vin',
          spiritueux: 'spiritueux',
          'alcools-mix': 'spiritueux',
          'malts-energy-drink': 'soft',
        };
        return map[seg.id] || 'biere';
      }
    }
  } catch {}
  return 'biere';
}

function formatToFriendlyLabel(label: string): string {
  const upper = label.toUpperCase().trim();
  if (upper.includes('CANETTE') || upper === 'CAN') return 'Canette';
  if (upper.includes('PET')) return 'PET';
  return label;
}

function buildDynamicTitle(brand: string, formatLabel?: string, fallbackName?: string) {
  if (formatLabel) {
    const friendly = formatToFriendlyLabel(formatLabel);
    return `${brand} ${friendly}`;
  }
  return fallbackName || brand;
}


export function BrandDetail({ id, path }: Readonly<BrandDetailProps>) {
  const brandId = id || (path ? path.replace('/brand/', '') : '');
  const [products, setProducts] = useState<ProductStore[]>([]);
  const [argumentaire, setArgumentaire] = useState<ArgumentaireBrand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [priceAnimating, setPriceAnimating] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    globalThis.addEventListener('online', goOnline);
    globalThis.addEventListener('offline', goOffline);
    return () => {
      globalThis.removeEventListener('online', goOnline);
      globalThis.removeEventListener('offline', goOffline);
    };
  }, []);

  // Reset heroImageLoaded when image changes
  useEffect(() => {
    setHeroImageLoaded(false);
  }, [selectedImageIndex]);

  const openImageModal = useCallback((index: number) => {
    setModalImageIndex(index);
    setShowImageModal(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setShowImageModal(false);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadProductForBrand() {
      if (!brandId) {
        setError('ID marque manquant');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setProducts([]);
      // Brand info is sourced from YAML; no IndexedDB storage.

      try {
        let brandEntry: { name: string } | undefined;
        try {
          const segmentsData = await loadSegmentsBrands();
          brandEntry = segmentsData.segments
            .flatMap((segment) => segment.brands)
            .find((brand) => brand.id === brandId);
        } catch (err) {
          console.warn('Failed to load brand catalogue:', err);
        }

        const candidateNames = new Set<string>();
        if (brandEntry?.name) {
          candidateNames.add(brandEntry.name);
        }
        candidateNames.add(toBrandLabel(brandId));

        const matchedProducts = new Map<string, ProductStore>();
        for (const candidate of candidateNames) {
          const products = await getProductsByBrand(candidate);
          products.forEach((product) => matchedProducts.set(product.id, product));
        }

        if (matchedProducts.size === 0) {
          const allProducts = await getAllProducts();
          const normalizedCandidates = new Set(
            Array.from(candidateNames).map((candidate) => normalizeBrand(candidate))
          );
          const matches = allProducts.filter((productItem) =>
            normalizedCandidates.has(normalizeBrand(productItem.brand))
          );
          matches.forEach((product) => matchedProducts.set(product.id, product));
        }

        if (matchedProducts.size === 0) {
          // Create minimal placeholder so the page always renders
          const segCategory = await detectSegmentCategory(brandId);
          const minimalProduct: ProductStore = {
            id: brandId,
            name: brandEntry?.name || toBrandLabel(brandId),
            brand: brandEntry?.name || toBrandLabel(brandId),
            historique: '',
            positionnement: '',
            category: segCategory,
            canal: 'TT',
            prix: 0,
            marge: 0,
            specs: { contenance: 0, format: '' },
            lastUpdated: Date.now(),
          };
          matchedProducts.set(brandId, minimalProduct);
        }

        if (isActive) {
          const sortedProducts = Array.from(matchedProducts.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setProducts(sortedProducts);
          setSelectedImageIndex(0);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : 'Erreur inconnue');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadProductForBrand();

    return () => {
      isActive = false;
    };
  }, [brandId]);

  useEffect(() => {
    let isActive = true;

    async function loadArgumentaire() {
      if (!brandId && products.length === 0) {
        setArgumentaire(null);
        return;
      }

      try {
        const data = await loadArgumentaires();
        const brandName = products[0]?.brand;
        const match = findArgumentaireBrand(data, { id: brandId, name: brandName });
        if (isActive) {
          setArgumentaire(match ?? null);
        }
      } catch (err) {
        console.warn('Failed to load argumentaires:', err);
        if (isActive) {
          setArgumentaire(null);
        }
      }
    }

    void loadArgumentaire();

    return () => {
      isActive = false;
    };
  }, [brandId, products]);

  const handleBack = () => {
    route('/catalogue');
  };

  if (loading) {
    return <BrandDetailSkeleton />;
  }

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-bdc-black flex flex-col items-center justify-center px-6 font-sans pt-12 pb-24">
        {isOffline && <OfflineBanner />}
        <p className="text-muted dark:text-gray-400 mb-6 text-center">{error}</p>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-bdc-red text-white text-sm font-semibold rounded-xl hover:bg-bdc-red/90 transition-colors"
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  const baseProduct = products[0];
  const packshotCandidates = [baseProduct.brand, argumentaire?.name, toBrandLabel(brandId)].filter(
    Boolean
  ) as string[];
  const matchedPackshots = packshotCandidates.length
    ? packshotAssets
        .filter((packshot) =>
          packshotCandidates.some((candidate) => brandMatches(packshot.brand, candidate))
        )
        .sort((a, b) => {
          const groupCompare = (a.group ?? '').localeCompare(b.group ?? '', 'fr', {
            numeric: true,
            sensitivity: 'base',
          });
          if (groupCompare !== 0) {
            return groupCompare;
          }
          return a.name.localeCompare(b.name, 'fr', { numeric: true, sensitivity: 'base' });
        })
    : [];

  const productImages =
    matchedPackshots.length > 0
      ? matchedPackshots.map((packshot) => ({
          id: packshot.id,
          src: packshot.url,
          alt: packshot.name,
          label: packshot.group,
          product: matchPackshotToProduct(packshot, products) ?? baseProduct,
        }))
      : [{
          id: 'placeholder',
          src: '/images/products/placeholder.svg',
          alt: baseProduct.name,
          label: undefined,
          product: baseProduct,
        }];

  const safeImageIndex = Math.min(selectedImageIndex, productImages.length - 1);
  const selectedImage = productImages[safeImageIndex];
  const activeProduct = selectedImage?.product ?? baseProduct;

  const packshotGroups = matchedPackshots
    .map((packshot) => packshot.group)
    .filter((group): group is string => Boolean(group));

  const uniquePackshotGroups = Array.from(new Set(packshotGroups));

  const positioning = getPositioningScore(activeProduct.positionnement);

  // Get available formats from pricing data
  const availableFormats = useMemo(() => getFormatsByBrand(activeProduct.brand), [activeProduct.brand]);

  // Current format (from selection or from image label)
  const currentFormat = selectedFormat || selectedImage?.label || availableFormats[0] || '65 CL';

  // Get dynamic pricing based on selected format
  const currentPricing = useMemo(() => {
    const pricing = getPricing(activeProduct.brand, currentFormat);
    if (pricing) return pricing;

    // Fallback to product data
    return {
      consommateur: { unitaire: activeProduct.prix, casier: activeProduct.prix * 12 },
      distributeur: {
        prix: Math.round(activeProduct.prix * (1 - activeProduct.marge / 100)),
        marge: Math.round(activeProduct.prix * activeProduct.marge / 100),
        taux: activeProduct.marge,
      },
      detaillant: {
        prix: Math.round(activeProduct.prix * (1 - activeProduct.marge / 100)),
        marge: Math.round(activeProduct.prix * activeProduct.marge / 100),
        taux: activeProduct.marge,
      },
      region: 'TOUS',
      consigne: 3600,
      emballage: '',
      unite: 'C12',
    };
  }, [activeProduct.brand, activeProduct.prix, activeProduct.marge, currentFormat]);

  const argumentGroups = buildArgumentGroups(argumentaire);

  const brandColor = getBrandColor(brandId);

  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-bdc-black transition-colors duration-300">
      {/* Sticky Sub-Header */}
      <div className="sticky top-12 z-[55] bg-white/80 dark:bg-bdc-black/80 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="h-11 px-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/10 rounded-xl text-bdc-black dark:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="text-xs font-medium">Retour</span>
          </button>
          <span className="text-sm font-black text-bdc-black dark:text-white font-display tracking-tight">
            {activeProduct.brand}
          </span>
        </div>
      </div>

      <main className="w-full">
        {/* Hero Section - Edge-to-edge */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 lg:gap-10">
            {/* Image Gallery */}
            <div className="space-y-0">
              {/* Main Image Container - Brand-colored, edge-to-edge */}
              <button
                type="button"
                className="relative overflow-hidden cursor-pointer w-full text-left block"
                onClick={() => openImageModal(safeImageIndex)}
                style={{ background: brandColor.bg }}
              >
                {/* Dark mode overlay */}
                <div
                  className="absolute inset-0 hidden dark:block pointer-events-none"
                  style={{ background: brandColor.darkBg }}
                />

                {/* Specs overlay - Glassmorphic floating pills */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  {activeProduct.category && (
                    <span className="px-3 py-1.5 bg-white/25 backdrop-blur-2xl text-white text-[11px] font-semibold rounded-full border border-white/20 shadow-sm">
                      {getCategoryLabel(activeProduct.category)}
                    </span>
                  )}
                  {selectedImage?.product?.specs?.contenance !== undefined && selectedImage.product.specs.contenance > 0 && (
                    <span className="px-3 py-1.5 bg-white/25 backdrop-blur-2xl text-white text-[11px] font-semibold rounded-full border border-white/20 shadow-sm">
                      {selectedImage.product.specs.contenance} ml
                    </span>
                  )}
                  {selectedImage?.product?.specs?.alcool !== undefined && (
                    <span className="px-3 py-1.5 bg-white/25 backdrop-blur-2xl text-white text-[11px] font-semibold rounded-full border border-white/20 shadow-sm">
                      {selectedImage.product.specs.alcool}% alc.
                    </span>
                  )}
                </div>

                {selectedImage?.product?.specs?.format && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 bg-white/25 backdrop-blur-2xl text-white text-[11px] font-semibold rounded-full border border-white/20 shadow-sm">
                      {selectedImage.product.specs.format}
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative aspect-[3/4] flex items-center justify-center p-12 lg:p-16 z-[1]">
                  {!heroImageLoaded && (
                    <SkeletonImage className="absolute inset-0 m-12 lg:m-16 rounded-2xl" />
                  )}
                  {productImages.length > 0 && (
                    <img
                      src={encodeURI(selectedImage?.src ?? '/images/products/placeholder.svg')}
                      alt={selectedImage?.alt ?? activeProduct.name}
                      className={`max-w-[70%] max-h-[85%] object-contain transition-all duration-500 hover:scale-105 mx-auto ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.2))',
                      }}
                      onLoad={() => setHeroImageLoaded(true)}
                    />
                  )}
                </div>


                {/* Tap hint */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-black/20 backdrop-blur-xl rounded-full">
                  <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                  <span className="text-white/80 text-[10px] font-medium">Agrandir</span>
                </div>
              </button>

              {/* Thumbnails - Format selector */}
              {productImages.length > 1 && (
                <div className="space-y-2 px-5 -mt-6 relative z-10">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                    Choisissez le format
                  </span>
                  <div className="grid grid-cols-4 gap-2.5">
                    {productImages.map((img, index) => {
                      const handleThumbnailClick = () => {
                        setSelectedImageIndex(index);
                        if (img.label && img.label !== selectedFormat) {
                          setPriceAnimating(true);
                          setSelectedFormat(img.label);
                          setTimeout(() => setPriceAnimating(false), 300);
                        }
                      };

                      return (
                        <button
                          key={img.id}
                          onClick={handleThumbnailClick}
                          className={`relative aspect-square rounded-2xl border-2 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center transition-all overflow-hidden shadow-sm ${
                            index === selectedImageIndex
                              ? 'border-bdc-blue ring-2 ring-bdc-blue/20 shadow-lg shadow-bdc-blue/10'
                              : 'border-white/60 dark:border-white/10 hover:border-bdc-blue/50 hover:shadow-md'
                          }`}
                        >
                          <img src={encodeURI(img.src)} alt="" className="w-full h-full object-contain p-1.5" />
                          {img.label && (
                            <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[8px] font-bold rounded transition-all ${
                              index === selectedImageIndex ? 'bg-bdc-blue text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}>
                              {img.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info Panel */}
            <div className="space-y-5 px-5">
              {/* Title - Dynamic based on selected format */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-bdc-black dark:text-bdc-white tracking-tight font-display leading-tight">
                  {buildDynamicTitle(activeProduct.brand, selectedImage?.label, activeProduct.name)}
                </h1>
                {argumentaire?.identity?.signature && (
                  <p className="mt-1.5 text-sm text-bdc-blue dark:text-bdc-blue/80 font-medium italic">
                    {argumentaire.identity.signature}
                  </p>
                )}
                {activeProduct.positionnement && (
                  <p className="mt-1 text-sm text-muted dark:text-white/60 leading-relaxed">
                    {activeProduct.positionnement}
                  </p>
                )}
                {/* Dynamic spec tags: alcohol, format, volume */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeProduct.category && (
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-[11px] font-medium text-gray-600 dark:text-gray-300">
                      {getCategoryLabel(activeProduct.category)}
                    </span>
                  )}
                  {(() => {
                    const specSource = selectedImage?.product ?? activeProduct;
                    return (
                      <>
                        {specSource.specs?.contenance !== undefined && specSource.specs.contenance > 0 && (
                          <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-[11px] font-medium text-gray-600 dark:text-gray-300">
                            {specSource.specs.contenance} ml
                          </span>
                        )}
                        {specSource.specs?.alcool !== undefined && (
                          <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-[11px] font-medium text-gray-600 dark:text-gray-300">
                            {specSource.specs.alcool}% alc.
                          </span>
                        )}
                        {specSource.specs?.format && (
                          <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-[11px] font-medium text-gray-600 dark:text-gray-300">
                            {specSource.specs.format}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Positioning Spectrum Gauge with Cible & Territoire */}
              <PositioningGauge
                value={positioning.value}
                label={positioning.label}
                target={argumentaire?.identity?.target || undefined}
                territoire={getTerritoireExpression(activeProduct.brand)}
                surfaceExpression={getSurfaceExpression(activeProduct.brand)}
              />

              {/* Region Badge */}
              {currentPricing.region && currentPricing.consommateur.unitaire > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {currentPricing.region === 'TOUS' ? 'Toutes régions' : `Région ${currentPricing.region}`}
                  </span>
                </div>
              )}

              {/* Price Box - Dynamic with Animation */}
              {currentPricing.consommateur.unitaire > 0 && <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-lg shadow-black/5 overflow-hidden transition-all duration-300 ${priceAnimating ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}>
                {/* Prix Consommateur - Main */}
                <div className="p-4 border-b border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium block mb-1">Prix Consommateur</span>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold font-display text-bdc-blue transition-all duration-300 ${priceAnimating ? 'blur-sm' : ''}`}>
                          {currentPricing.consommateur.unitaire.toLocaleString('fr-FR')}
                        </span>
                        <span className="text-lg text-gray-500 font-medium">FCFA</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Casier</span>
                      <span className={`text-base font-bold text-bdc-black dark:text-white transition-all duration-300 ${priceAnimating ? 'blur-sm' : ''}`}>
                        {currentPricing.consommateur.casier.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prix Distributeur & Détaillant */}
                <div className="grid grid-cols-2 divide-x divide-white/30 dark:divide-white/10">
                  {/* Prix Distributeur */}
                  <div className="p-3">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium block mb-1">
                      Distributeur
                    </span>
                    <span className={`text-xl font-bold text-bdc-black dark:text-white font-display transition-all duration-300 ${priceAnimating ? 'blur-sm' : ''}`}>
                      {currentPricing.distributeur.prix.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">FCFA</span>
                    <div className="mt-1.5">
                      <span className="text-xs text-green-600 dark:text-green-400 tracking-wide">
                        +{currentPricing.distributeur.marge.toLocaleString('fr-FR')} ({currentPricing.distributeur.taux}%)
                      </span>
                    </div>
                  </div>

                  {/* Prix Détaillant */}
                  <div className="p-3">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium block mb-1">
                      Détaillant
                    </span>
                    <span className={`text-xl font-bold text-bdc-black dark:text-white font-display transition-all duration-300 ${priceAnimating ? 'blur-sm' : ''}`}>
                      {currentPricing.detaillant.prix.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">FCFA</span>
                    <div className="mt-1.5">
                      <span className="text-xs text-green-600 dark:text-green-400 tracking-wide">
                        +{currentPricing.detaillant.marge.toLocaleString('fr-FR')} ({currentPricing.detaillant.taux}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consigne & Emballage */}
                <div className="px-4 py-3 bg-white/30 dark:bg-white/5 border-t border-white/30 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-muted">Consigne: <span className="font-semibold text-bdc-black dark:text-white">{currentPricing.consigne.toLocaleString('fr-FR')} FCFA</span></span>
                  <span className="text-muted">Unité: <span className="font-semibold text-bdc-black dark:text-white">{currentPricing.unite}</span></span>
                </div>
              </div>}

              {/* Available Formats Visual */}
              {uniquePackshotGroups.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted uppercase tracking-wider font-medium">Packshots:</span>
                  {uniquePackshotGroups.map((group) => (
                    <span
                      key={group}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-lg"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              )}

              {/* Compact Info Row */}
              <div className="flex flex-wrap gap-4 p-4 bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/[0.06]">
                {/* Conservation */}
                {activeProduct.conservation && (
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{activeProduct.conservation}</span>
                  </div>
                )}

                {/* Certifications */}
                {activeProduct.certifications && activeProduct.certifications.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    {activeProduct.certifications.map((cert) => (
                      <span key={cert} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Ingredients */}
              {activeProduct.ingredients && activeProduct.ingredients.length > 0 && (
                <div className="p-4 bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/[0.06]">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium mb-2.5">Ingredients</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProduct.ingredients.map((ingredient) => (
                      <span key={ingredient} className="px-2.5 py-1 bg-gray-100 dark:bg-white/[0.06] text-bdc-black dark:text-white text-xs rounded-lg font-medium">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Content Sections - Full Width with padding */}
        <div className="w-full px-5 pb-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Historique Section - BEFORE Arguments */}
            {activeProduct.historique && (
              <section className="animate-fade-in">
                <div className="mb-4">
                  <h2 className="text-[22px] font-bold text-bdc-black dark:text-white font-display tracking-tight">Historique</h2>
                </div>
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-sm p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{activeProduct.historique}</p>
                </div>
              </section>
            )}

            {/* À Savoir Section */}
            {argumentaire?.key_facts && argumentaire.key_facts.length > 0 && (
              <section className="animate-fade-in">
                <div className="mb-4">
                  <h2 className="text-[22px] font-bold text-bdc-black dark:text-white font-display tracking-tight">À savoir</h2>
                </div>
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-sm divide-y divide-white/30 dark:divide-white/10">
                  {argumentaire.key_facts.map((fact, factIdx) => (
                    <div key={`fact-${fact.slice(0, 20)}`} className="p-4 flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-bdc-yellow/20 text-bdc-black dark:text-bdc-yellow flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                        {factIdx + 1}
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Arguments Section - Motivations Client */}
            {argumentGroups.length > 0 && (
              <section className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[22px] font-bold text-bdc-black dark:text-white font-display tracking-tight">Motivations client</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Le fait &middot; La preuve &middot; L'avantage</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.06] text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {argumentGroups.reduce((sum, group) => sum + group.rows.length, 0)}
                  </span>
                </div>

                <div className="space-y-6">
                  {argumentGroups.map((group) => (
                    <ArgumentGroup key={group.id} group={group} brandName={activeProduct.brand} currentPricing={currentPricing} />
                  ))}
                </div>
              </section>
            )}

            {/* Actualites sur la marque */}
            <BrandNews brandName={activeProduct.brand} brandId={brandId} />

                      </div>
        </div>
      </main>

      {/* Image Preview Modal — Assets-style */}
      {showImageModal && (
        <ProductImagePreview
          images={productImages}
          initialIndex={modalImageIndex}
          brandName={activeProduct.brand}
          onClose={closeImageModal}
          onIndexChange={setModalImageIndex}
        />
      )}

    </div>
  );
}


function BrandNews({ brandName }: Readonly<{ brandName: string; brandId?: string }>) {
  const newsKey = Object.keys(BRAND_NEWS).find(
    (key) => key.toUpperCase() === brandName.toUpperCase()
  );
  const news = newsKey ? BRAND_NEWS[newsKey] : null;

  if (!news || news.length === 0) return null;

  return (
    <section className="animate-fade-in">
      <div className="mb-4">
        <h2 className="text-[22px] font-bold text-bdc-black dark:text-white font-display tracking-tight">Actualites</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {news.map((item) => (
          <div
            key={item.title}
            className="flex-shrink-0 w-[260px] snap-start relative rounded-2xl overflow-hidden shadow-sm h-[220px]"
          >
            {/* Full bleed image */}
            {item.image ? (
              <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gray-700" />
            )}

            {/* Frosted glass zone at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none">
              <div
                className="absolute inset-0 backdrop-blur-sm"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)',
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-lg"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 25%, black 70%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 25%, black 70%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </div>

            {/* Tag badge */}
            {item.tag && (
              <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider border border-white/10">
                {item.tag}
              </span>
            )}

            {/* Content overlaid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <h3 className="text-sm font-bold text-white font-display leading-snug line-clamp-2 mb-1 drop-shadow-sm">{item.title}</h3>
              <p className="text-white/70 text-[10px] leading-relaxed line-clamp-2 mb-1.5">{item.description}</p>
              <span className="text-white/50 text-[9px]">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArgumentGroup({ group, currentPricing }: Readonly<{ group: ArgumentGroupData; brandName?: string; currentPricing?: any }>) {
  const tone =
    group.tone === 'rational'
      ? {
          border: 'border-emerald-200 dark:border-emerald-700/30',
          header: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
          badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
          chip: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
        }
      : {
          border: 'border-bdc-red/15 dark:border-bdc-red/25',
          header: 'bg-bdc-red/10 text-bdc-red dark:bg-bdc-red/20',
          badge: 'bg-bdc-red/10 text-bdc-red dark:bg-bdc-red/20',
          chip: 'bg-bdc-yellow/20 text-bdc-black dark:bg-bdc-yellow/30 dark:text-bdc-yellow',
        };

  return (
    <div className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border ${tone.border} shadow-sm p-4`}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full ${tone.header}`}>
          {group.title}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{group.subtitle}</span>
        <span className={`ml-auto text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${tone.chip}`}>
          {group.rows.length} motivations
        </span>
      </div>

      <div className="space-y-3">
        {group.rows.map((row, index) => {
          const isArgent = row.motivation.toLowerCase().includes('argent');
          return (
            <div
              key={`${group.id}-${row.motivation}-${index}`}
              title={row.fullText}
              className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/40 dark:border-white/10 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${tone.badge}`}>
                  {row.motivation}
                </span>
                {isArgent && (
                  <button
                    onClick={() => route('/prix')}
                    className="ml-auto flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-bdc-blue hover:text-bdc-blue/80 transition-colors rounded-md hover:bg-bdc-blue/5"
                    title="Voir la grille tarifaire"
                  >
                    <span>Grille tarifaire</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <ArgumentCell label="Le fait" text={row.fact} />
                <ArgumentCell label="La preuve" text={row.proof} />
                <ArgumentCell label="L'avantage" text={row.benefit} />
              </div>

              {/* Mini margin recap for Argent motivation */}
              {isArgent && currentPricing && (
                <div className="mt-2.5 flex items-center gap-3 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg border border-emerald-200 dark:border-emerald-800/20">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-medium">Marges:</span>
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    Dist. +{currentPricing.distributeur.marge.toLocaleString('fr-FR')} ({currentPricing.distributeur.taux}%)
                  </span>
                  <span className="text-emerald-300 dark:text-emerald-700">|</span>
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    Det. +{currentPricing.detaillant.marge.toLocaleString('fr-FR')} ({currentPricing.detaillant.taux}%)
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArgumentCell({ label, text }: Readonly<{ label: string; text: string }>) {
  const content = text?.trim() ? text.trim() : '—';
  const isEmpty = content === '—';

  return (
    <div className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 p-2.5">
      <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium mb-1">{label}</p>
      <p className={`text-xs leading-relaxed ${isEmpty ? 'text-gray-300 dark:text-gray-600 italic' : 'text-gray-700 dark:text-gray-300'}`}>
        {content}
      </p>
    </div>
  );
}

// ============================================
// PRODUCT IMAGE PREVIEW — Assets-style modal
// ============================================

interface ProductImagePreviewProps {
  images: Array<{ id: string; src: string; alt: string; label?: string }>;
  initialIndex: number;
  brandName: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

function ProductImagePreview({ images, initialIndex, brandName, onClose, onIndexChange }: Readonly<ProductImagePreviewProps>) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    }
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }
  }, []);

  const handleClose = () => {
    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, { opacity: 0, scale: 0.9, duration: 0.2 });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, delay: 0.05, onComplete: onClose });
    } else {
      onClose();
    }
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
    onIndexChange(index);
  };

  const currentImage = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Card container */}
      <div
        ref={cardRef}
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
          <img
            src={encodeURI(currentImage?.src ?? '/images/products/placeholder.svg')}
            alt={currentImage?.alt ?? brandName}
            className="max-w-full max-h-[55vh] object-contain"
          />
        </div>

        {/* Image name */}
        <p className="text-white/80 text-sm font-medium mt-3 text-center font-display">
          {currentImage?.alt ?? brandName}
        </p>

        {/* Variant thumbnails */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-4 overflow-x-auto scrollbar-hide max-w-[90vw] px-2">
            {images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => selectImage(index)}
                className={`relative flex-shrink-0 w-14 h-14 rounded-xl border-2 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all overflow-hidden ${
                  index === currentIndex
                    ? 'border-white ring-2 ring-white/30 scale-110'
                    : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={encodeURI(img.src)} alt="" className="w-full h-full object-contain p-1" />
                {img.label && (
                  <span className={`absolute bottom-0 left-0 right-0 text-center text-[6px] font-bold py-0.5 ${
                    index === currentIndex ? 'bg-white text-bdc-black' : 'bg-black/40 text-white/80'
                  }`}>
                    {img.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// POSITIONING SPECTRUM GAUGE (Neutral, compact)
// ============================================

function PositioningGauge({ value, target, territoire, surfaceExpression }: Readonly<{ value: number; label: string; target?: string; territoire?: string; surfaceExpression?: string }>) {
  // Neutral spectrum - no judgment, just shows where the product sits
  const segments = [
    { id: 'entree', label: 'Entree', range: [0, 20] },
    { id: 'mainstream', label: 'Mainstream', range: [20, 40] },
    { id: 'milieu', label: 'Milieu', range: [40, 60] },
    { id: 'top', label: 'Top', range: [60, 80] },
    { id: 'premium', label: 'Premium', range: [80, 100] },
  ];

  const activeIndex = segments.findIndex(
    (seg) => value >= seg.range[0] && value < seg.range[1]
  );
  const activeSegment = activeIndex >= 0 ? activeIndex : segments.length - 1;
  const activeLabel = segments[activeSegment]?.label || '';

  return (
    <div className="p-4 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-sm space-y-3">
      {/* Header: Positionnement label + value in bdc-blue on same line */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Positionnement</span>
        <span className="text-xs font-semibold text-bdc-blue">{activeLabel}</span>
      </div>

      {/* Neutral gray/blue gradient spectrum */}
      <div className="flex gap-px rounded-lg overflow-hidden">
        {segments.map((seg, index) => {
          const isActive = index === activeSegment;

          return (
            <div
              key={seg.id}
              className={`relative flex-1 h-8 transition-all duration-200 flex items-center justify-center ${
                isActive ? 'bg-bdc-blue' : 'bg-gray-200 dark:bg-gray-700'
              }`}
              title={seg.label}
            >
              <span className={`text-[9px] font-semibold uppercase tracking-tight ${
                isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {seg.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-bdc-blue" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cible - label on same line as icon */}
      {target && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-0.5">
            <svg className="w-4 h-4 text-bdc-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Cible</span>
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pl-6 block">{target}</span>
        </div>
      )}

      {/* Territoire + Surface d'expression on same line with vertical separator */}
      {(territoire || surfaceExpression) && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-0.5">
            <svg className="w-4 h-4 text-bdc-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Territoire d'expression</span>
            {surfaceExpression && (
              <>
                <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
                <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Surface d'expression</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-0 flex-wrap text-xs text-gray-700 dark:text-gray-300 leading-relaxed pl-6">
            {territoire && <span className="font-medium">{territoire}</span>}
            {territoire && surfaceExpression && (
              <span className="mx-2 w-px h-3.5 bg-gray-300 dark:bg-gray-600 inline-block" />
            )}
            {surfaceExpression && <span className="text-gray-500 dark:text-gray-400">{surfaceExpression}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
