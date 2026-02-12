import { useState, useMemo } from 'preact/hooks';
import { route } from 'preact-router';
import type { RouteProps } from 'preact-router';
import {
  allProductVariants,
  getProductsByBrandGrouped,
  formatPrice,
  type ProductVariant,
} from '../lib/data/pricing';
import { packshotAssets } from '../lib/data/packshots';
import { Search, ChevronDown, ChevronUp, ChevronRight } from '../components/ui/Icon';

interface ShelfBrand {
  brand: string;
  segment: string;
  variants: ProductVariant[];
}

// Find packshot URL for a brand+format combo
function findPackshot(brand: string, format: string): string {
  const normalizedBrand = brand.toUpperCase().replace(/[^A-Z0-9\s]/g, '').trim();

  const match = packshotAssets.find((p) => {
    const pBrand = p.brand.toUpperCase().replace(/[^A-Z0-9\s]/g, '').trim();
    const brandMatch = pBrand === normalizedBrand || normalizedBrand.includes(pBrand) || pBrand.includes(normalizedBrand);
    if (!brandMatch) return false;

    if (!p.group) return true;
    const pGroup = p.group.toUpperCase();
    const fUpper = format.toUpperCase();

    if (fUpper.includes('CANETTE') || fUpper.includes('CAN')) {
      return pGroup.includes('CAN') || pGroup.includes('CANETTE');
    }
    const volumeMatch = fUpper.match(/(\d+)/);
    const groupMatch = pGroup.match(/(\d+)/);
    if (volumeMatch && groupMatch) {
      return volumeMatch[1] === groupMatch[1];
    }
    return false;
  });

  return match?.url || '/images/products/placeholder.svg';
}

// Deduplicate variants: keep one per format (prefer TOUS region)
function deduplicateVariants(variants: ProductVariant[]): ProductVariant[] {
  const byFormat = new Map<string, ProductVariant>();
  for (const v of variants) {
    const key = `${v.format}|${v.emballage}`;
    const existing = byFormat.get(key);
    if (!existing || v.region === 'TOUS') {
      byFormat.set(key, v);
    }
  }
  return Array.from(byFormat.values()).sort((a, b) => {
    const numA = parseInt(a.format) || 0;
    const numB = parseInt(b.format) || 0;
    return numA - numB;
  });
}

// Get unique segments from pricing data
function getSegments(): string[] {
  const segments = new Set(allProductVariants.map((v) => v.segment));
  return Array.from(segments).sort();
}

export function PricingGrid(_props: RouteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false);

  const segments = useMemo(() => getSegments(), []);

  const shelfBrands = useMemo<ShelfBrand[]>(() => {
    const grouped = getProductsByBrandGrouped();
    const brands: ShelfBrand[] = [];

    for (const [brand, variants] of grouped) {
      const segment = variants[0]?.segment || '';
      brands.push({
        brand,
        segment,
        variants: deduplicateVariants(variants),
      });
    }

    return brands.sort((a, b) => {
      if (a.segment !== b.segment) return a.segment.localeCompare(b.segment);
      return a.brand.localeCompare(b.brand);
    });
  }, []);

  const filteredBrands = useMemo(() => {
    return shelfBrands.filter((b) => {
      if (selectedSegment && b.segment !== selectedSegment) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return b.brand.toLowerCase().includes(q);
      }
      return true;
    });
  }, [shelfBrands, selectedSegment, searchQuery]);

  // Group filtered brands by segment
  const groupedBySegment = useMemo(() => {
    const groups = new Map<string, ShelfBrand[]>();
    for (const brand of filteredBrands) {
      const existing = groups.get(brand.segment) || [];
      existing.push(brand);
      groups.set(brand.segment, existing);
    }
    return groups;
  }, [filteredBrands]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-12 pb-24 font-sans">
      {/* Sub-Header - glass design */}
      <header className="sticky top-12 z-40 bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl relative">
        <div className="absolute left-0 right-0 top-full h-6 pointer-events-none bg-gradient-to-b from-white/60 dark:from-[rgba(20,20,20,0.6)] to-transparent" />
        <div className="w-full px-4 py-3">
          {/* Title row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-bdc-black dark:text-white font-display">
              Grille des prix
            </span>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              {filteredBrands.length} marque{filteredBrands.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Search + Segment filter */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={15} strokeWidth={2.2} className="absolute left-3 top-1/2 -translate-y-1/2 text-bdc-black/40 dark:text-white/40" />
              <input
                type="text"
                placeholder="Rechercher une marque..."
                value={searchQuery}
                onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                className="w-full pl-9 pr-4 py-2 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] rounded-xl text-sm text-bdc-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bdc-blue/30 transition-all"
              />
            </div>

            {/* Segment Filter */}
            <div className="relative">
              <button
                onClick={() => setShowSegmentDropdown(!showSegmentDropdown)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
                  selectedSegment
                    ? 'bg-bdc-blue text-white border-bdc-blue'
                    : 'bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl text-bdc-black/60 dark:text-gray-400 border-black/[0.06] dark:border-white/[0.08]'
                }`}
              >
                <span className="text-xs font-medium max-w-[80px] truncate">
                  {selectedSegment || 'Segment'}
                </span>
                <ChevronDown size={14} className={selectedSegment ? 'text-white' : 'text-gray-400'} />
              </button>

              {showSegmentDropdown && (
                <div className="absolute right-0 top-full mt-1.5 w-56 bg-white/90 dark:bg-bdc-black/90 backdrop-blur-2xl rounded-xl shadow-xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden z-50">
                  <div className="p-1.5">
                    <button
                      onClick={() => { setSelectedSegment(''); setShowSegmentDropdown(false); }}
                      className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        !selectedSegment ? 'text-bdc-blue font-medium bg-bdc-blue/10' : 'text-bdc-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      Tous les segments
                    </button>
                    {segments.map((seg) => (
                      <button
                        key={seg}
                        onClick={() => { setSelectedSegment(seg); setShowSegmentDropdown(false); }}
                        className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${
                          selectedSegment === seg ? 'text-bdc-blue font-medium bg-bdc-blue/10' : 'text-bdc-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {seg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Shelves */}
      <div className="px-4 space-y-6 mt-4">
        {Array.from(groupedBySegment.entries()).map(([segment, brands]) => (
          <div key={segment}>
            {/* Segment Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] text-bdc-black/60 dark:text-white/40 uppercase tracking-widest font-bold font-display">
                {segment}
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/[0.06]" />
              <span className="text-[10px] text-gray-400 dark:text-gray-500">
                {brands.length}
              </span>
            </div>

            {/* Brand Shelves */}
            <div className="space-y-3">
              {brands.map((brandData) => (
                <BrandShelf
                  key={brandData.brand}
                  data={brandData}
                  expanded={expandedBrand === brandData.brand}
                  onToggle={() =>
                    setExpandedBrand(expandedBrand === brandData.brand ? null : brandData.brand)
                  }
                />
              ))}
            </div>
          </div>
        ))}

        {filteredBrands.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-sm">Aucune marque trouvee</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// BRAND SHELF COMPONENT
// ============================================

function BrandShelf({
  data,
  expanded,
  onToggle,
}: {
  data: ShelfBrand;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.07] rounded-2xl overflow-hidden stagger-item">
      {/* Brand header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-[13px] font-bold text-bdc-black dark:text-white font-display">
              {data.brand}
            </h3>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              {data.variants.length} format{data.variants.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button
          onClick={() => route(`/brand/${data.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
          className="flex items-center gap-0.5 text-[11px] text-bdc-blue font-medium active:opacity-60 transition-opacity"
        >
          <span>Fiche</span>
          <ChevronRight size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* Shelf - Products displayed horizontally */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-0 px-2 pb-2 min-w-min">
            {data.variants.map((variant) => (
              <ShelfProduct key={`${variant.code}-${variant.format}`} variant={variant} brand={data.brand} />
            ))}
          </div>
        </div>

        {/* Shelf edge */}
        <div className="h-1.5 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 shadow-[0_2px_6px_rgba(0,0,0,0.1)]" />
      </div>

      {/* Expandable details toggle */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 hover:text-bdc-blue active:text-bdc-blue transition-colors"
      >
        <span>{expanded ? 'Masquer' : 'Prix distributeur & detaillant'}</span>
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {/* Expanded pricing details */}
      {expanded && (
        <div className="px-3 pb-3 animate-scale-in">
          <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.06]">
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[480px]">
                <thead>
                  <tr className="bg-gray-50/80 dark:bg-white/[0.03]">
                    <th className="px-3 py-2 text-left text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Format</th>
                    <th className="px-3 py-2 text-right text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Distrib.</th>
                    <th className="px-3 py-2 text-right text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Marge</th>
                    <th className="px-3 py-2 text-right text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Detail.</th>
                    <th className="px-3 py-2 text-right text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Marge</th>
                    <th className="px-3 py-2 text-right text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Consigne</th>
                  </tr>
                </thead>
                <tbody>
                  {data.variants.map((v, idx) => (
                    <tr
                      key={`${v.code}-detail`}
                      className={`border-t border-gray-50 dark:border-white/[0.04] ${
                        idx % 2 === 0 ? 'bg-white/50 dark:bg-transparent' : 'bg-gray-50/40 dark:bg-white/[0.02]'
                      }`}
                    >
                      <td className="px-3 py-2 font-medium text-bdc-black dark:text-white">{v.format}</td>
                      <td className="px-3 py-2 text-right text-bdc-black dark:text-white font-medium">{formatPrice(Math.round(v.distributeur.prix_achat))}</td>
                      <td className="px-3 py-2 text-right">
                        <span className="inline-flex px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-semibold">
                          {Math.round(v.distributeur.taux * 100)}%
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right text-bdc-black dark:text-white font-medium">{formatPrice(Math.round(v.detaillant.prix_achat))}</td>
                      <td className="px-3 py-2 text-right">
                        <span className="inline-flex px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-semibold">
                          {Math.round(v.detaillant.taux * 100)}%
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right text-gray-400">{formatPrice(v.consigne)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// SHELF PRODUCT ITEM
// ============================================

function ShelfProduct({ variant, brand }: { variant: ProductVariant; brand: string }) {
  const packshotUrl = findPackshot(brand, variant.format);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 w-[86px] flex flex-col items-center px-1.5 pt-2 pb-1">
      {/* Product image */}
      <div className="w-12 h-[72px] flex items-end justify-center mb-1.5">
        <img
          src={imgError ? '/images/products/placeholder.svg' : encodeURI(packshotUrl)}
          alt={variant.designation}
          className="max-w-full max-h-full object-contain drop-shadow-md"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Format label */}
      <span className="text-[8px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
        {variant.format}
      </span>

      {/* Price */}
      <span className="text-[13px] font-bold text-bdc-black dark:text-white font-display leading-tight">
        {formatPrice(variant.consommateur.prix_unitaire)}
      </span>
      <span className="text-[7px] text-gray-400 uppercase tracking-wider">FCFA</span>
    </div>
  );
}
