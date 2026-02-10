import { useEffect, useState, useRef, useLayoutEffect } from 'preact/hooks';
import { route } from 'preact-router';
import type { RouteProps } from 'preact-router';
import { loadSegmentsBrands } from '../lib/data/segments';
import { logoMap } from '../components/catalogue/BrandCard';
import { Search, LayoutGrid, ReceiptText, X } from '../components/ui/Icon';
import { gsap } from 'gsap';

interface SegmentData {
  id: string;
  name: string;
  brandCount: number;
  brands: { id: string; name: string; discontinued?: boolean }[];
}

const segmentImages: Record<string, string> = {
  bieres: '/images/segments/beer_banner.png',
  'alcools-mix': '/images/segments/alcoolsmix_banner.png',
  'boissons-gazeuses': '/images/segments/bg.png',
  eaux: '/images/segments/eau.png',
  'malts-energy-drink': '/images/segments/energydrink.png',
  spiritueux: '/images/segments/spiritueux.png',
  vins: '/images/segments/vins.png',
};

// Bento layout: [colStart, colSpan, rowStart, rowSpan]
const bentoLayout: [number, number, number, number][] = [
  [1, 2, 1, 2], // bieres - 2x2 large
  [3, 1, 1, 1], // alcools-mix - 1x1
  [4, 1, 1, 2], // boissons-gazeuses - 1x2 tall
  [3, 1, 2, 1], // eaux - 1x1
  [1, 1, 3, 1], // malts-energy - 1x1
  [2, 2, 3, 1], // spiritueux - 2x1 wide
  [4, 1, 3, 1], // vins - 1x1
];

export function Segments(_props: RouteProps) {
  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSegmentsBrands()
      .then((data) => {
        setSegments(
          data.segments.map((s) => ({
            id: s.id,
            name: s.name,
            brandCount: s.brands.length,
            brands: s.brands,
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current || segments.length === 0) return;
    const cards = gridRef.current.querySelectorAll('[data-segment-card]');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [segments.length]);

  const handleImageError = (segmentId: string) => {
    setImageErrors((prev) => new Set(prev).add(segmentId));
  };

  const toggleSegment = (segmentId: string) => {
    setExpandedSegment((prev) => (prev === segmentId ? null : segmentId));
  };

  const expandSearch = () => {
    setSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  const collapseSearch = () => {
    if (!search) {
      setSearchExpanded(false);
    }
  };

  const clearSearch = () => {
    setSearch('');
    setSearchExpanded(false);
  };

  const allBrands = segments.flatMap((s) =>
    s.brands.filter((b) => !b.discontinued).map((b) => ({ ...b, segment: s.name, segmentId: s.id }))
  );

  const filteredBrands = search.trim()
    ? allBrands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    : allBrands;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-bdc-black flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-200 dark:border-white/10 border-t-bdc-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-12 pb-24">
      {/* Sub-header - glass */}
      <header className="sticky top-12 z-40 bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="w-full px-4 h-12 flex items-center justify-between">
          {/* Left: retractable search */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={`flex items-center transition-all duration-300 ease-out overflow-hidden ${
                searchExpanded
                  ? 'flex-1 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl rounded-xl border border-black/[0.06] dark:border-white/[0.08]'
                  : 'w-9 h-9 rounded-xl bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] cursor-pointer'
              }`}
              onClick={!searchExpanded ? expandSearch : undefined}
            >
              {searchExpanded ? (
                <div className="flex items-center w-full px-3 py-2 gap-2">
                  <Search size={15} strokeWidth={2.2} className="text-bdc-black/50 dark:text-white/40 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
                    onBlur={collapseSearch}
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-sm text-bdc-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none min-w-0"
                  />
                  {search && (
                    <button onClick={clearSearch} className="flex-shrink-0 active:scale-90 transition-transform">
                      <X size={14} strokeWidth={2.5} className="text-gray-400" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-9 h-9 flex items-center justify-center">
                  <Search size={16} strokeWidth={2} className="text-bdc-black dark:text-white" />
                </div>
              )}
            </div>

            {!searchExpanded && (
              <span className="text-sm font-bold text-bdc-black dark:text-white font-display truncate">
                Segments
              </span>
            )}
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
            <button
              onClick={() => route('/catalogue')}
              className="w-9 h-9 rounded-xl bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center active:scale-90 transition-all"
              title="Catalogue"
            >
              <LayoutGrid size={16} strokeWidth={1.8} className="text-bdc-black dark:text-white" />
            </button>
            <button
              onClick={() => route('/prix')}
              className="w-9 h-9 rounded-xl bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center active:scale-90 transition-all"
              title="Grille des prix"
            >
              <ReceiptText size={16} strokeWidth={1.8} className="text-bdc-black dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-[10px] text-gray-400 dark:text-gray-500">
          {segments.length} categories &middot; {allBrands.length} marques
        </p>
      </div>

      {search ? (
        <CatalogueListView brands={filteredBrands} search={search} />
      ) : (
        <div className="px-4 relative" ref={gridRef}>
          {/* BENTO GRID - responsive height, fills viewport */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              height: 'calc(100vh - 180px)',
              minHeight: '360px',
            }}
          >
            {segments.map((seg, i) => {
              const layout = bentoLayout[i];
              if (!layout) return null;
              const [colStart, colSpan, rowStart, rowSpan] = layout;
              const image = segmentImages[seg.id];
              const hasImage = image && !imageErrors.has(seg.id);
              const isExpanded = expandedSegment === seg.id;
              const isLarge = colSpan >= 2 || rowSpan >= 2;

              return (
                <button
                  key={seg.id}
                  data-segment-card
                  onClick={() => toggleSegment(seg.id)}
                  className={`relative overflow-hidden rounded-2xl group active:scale-[0.97] transition-all duration-300 text-left ${
                    isExpanded ? 'ring-2 ring-bdc-blue ring-offset-2 ring-offset-gray-50 dark:ring-offset-bdc-black z-10' : ''
                  }`}
                  style={{
                    gridColumn: `${colStart} / span ${colSpan}`,
                    gridRow: `${rowStart} / span ${rowSpan}`,
                  }}
                >
                  {hasImage ? (
                    <img
                      src={image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(seg.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-700 dark:bg-gray-800" />
                  )}

                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-bdc-blue/30'
                        : 'bg-gradient-to-t from-black/70 via-black/20 to-black/5'
                    }`}
                  />

                  <div className="relative h-full flex flex-col justify-end p-3">
                    <h3
                      className={`font-bold text-white font-display leading-tight ${
                        isLarge ? 'text-base' : 'text-[11px]'
                      }`}
                    >
                      {seg.name}
                    </h3>
                    <p className="text-white/60 text-[9px] mt-0.5">{seg.brandCount} marques</p>
                  </div>

                  {isExpanded && (
                    <div className="absolute top-2 right-2">
                      <span className="w-5 h-5 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                        <X size={10} strokeWidth={3} className="text-white" />
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* EXPANDED DRAWER - floats above the grid */}
          {expandedSegment && (() => {
            const seg = segments.find((s) => s.id === expandedSegment);
            if (!seg) return null;
            const image = segmentImages[seg.id];
            const hasImage = image && !imageErrors.has(seg.id);
            const activeBrands = seg.brands.filter((b) => !b.discontinued);

            return (
              <div className="mt-3 relative z-20 animate-scale-in">
                <div className="bg-white/85 dark:bg-white/[0.06] backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xl shadow-black/[0.08] dark:shadow-black/40">
                  <div className="flex min-h-[140px]">
                    {/* Left: segment image */}
                    <button
                      onClick={() => setExpandedSegment(null)}
                      className="w-[110px] flex-shrink-0 relative overflow-hidden active:opacity-80 transition-opacity"
                    >
                      {hasImage ? (
                        <img
                          src={image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={() => handleImageError(seg.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-700" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10" />
                      <div className="relative h-full flex flex-col justify-end p-3">
                        <h3 className="text-xs font-bold text-white font-display leading-tight uppercase">
                          {seg.name}
                        </h3>
                        <p className="text-white/50 text-[8px] mt-0.5">
                          {activeBrands.length} marques
                        </p>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <X size={10} strokeWidth={3} className="text-white" />
                        </span>
                      </div>
                    </button>

                    {/* Right: brand logos - 2 rows, horizontal scroll */}
                    <div className="flex-1 overflow-hidden">
                      <div className="h-full overflow-x-auto scrollbar-hide">
                        <div className="grid grid-rows-2 grid-flow-col auto-cols-[64px] gap-2.5 p-3 min-h-full items-center">
                          {activeBrands.map((brand) => {
                            const logo = logoMap[brand.id];
                            return (
                              <button
                                key={brand.id}
                                onClick={() => route(`/brand/${brand.id}`)}
                                className="flex flex-col items-center gap-1 active:scale-95 transition-all"
                              >
                                <div className="w-[52px] h-[52px] rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-sm">
                                  {logo ? (
                                    <img
                                      src={logo}
                                      alt={brand.name}
                                      className="w-[80%] h-[80%] object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <span className="text-[10px] font-bold text-bdc-black dark:text-white font-display">
                                      {brand.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[7px] text-gray-500 dark:text-gray-400 font-medium text-center leading-tight line-clamp-1 w-full">
                                  {brand.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function CatalogueListView({
  brands,
  search,
}: {
  brands: { id: string; name: string; segment: string; segmentId: string }[];
  search: string;
}) {
  if (brands.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Aucune marque trouvee{search ? ` pour "${search}"` : ''}
        </p>
      </div>
    );
  }

  const grouped = brands.reduce<Record<string, typeof brands>>((acc, brand) => {
    if (!acc[brand.segment]) acc[brand.segment] = [];
    acc[brand.segment].push(brand);
    return acc;
  }, {});

  return (
    <div className="px-4 space-y-4">
      {Object.entries(grouped).map(([segmentName, segBrands]) => (
        <div key={segmentName}>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 px-1">
            {segmentName}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {segBrands.map((brand) => {
              const logo = logoMap[brand.id];
              return (
                <button
                  key={brand.id}
                  onClick={() => route(`/brand/${brand.id}`)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.06] active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <img
                        src={logo}
                        alt={brand.name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-bdc-black dark:text-white font-display">
                        {brand.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium text-center leading-tight line-clamp-2 w-full">
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
