import { useEffect, useState, useRef } from 'preact/hooks';
import type { RouteProps } from 'preact-router';
import { loadSegmentsBrands, type Segment } from '../lib/data/segments';
import { BrandCard } from '../components/catalogue/BrandCard';

export function Catalogue(_props: RouteProps) {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSegmentsBrands()
      .then(data => setSegments(data.segments.sort((a, b) => a.order - b.order)))
      .finally(() => setLoading(false));
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter brands based on active segment and search query
  const filteredBrands = segments
    .filter(s => !activeSegment || s.id === activeSegment)
    .flatMap(s =>
      s.brands
        .filter(b =>
          searchQuery === '' ||
          b.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(b => ({ ...b, segmentName: s.name }))
    );

  const totalBrands = segments.reduce((acc, s) => acc + s.brands.length, 0);
  const activeSegmentData = activeSegment ? segments.find(s => s.id === activeSegment) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-bdc-black flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-200 dark:border-white/10 border-t-bdc-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-12 pb-24">
      {/* Header - glass design */}
      <header className="sticky top-12 z-40 bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="w-full px-4 py-3">
          {/* Title + filter row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-bdc-black dark:text-white font-display">Catalogue</span>
            <div className="flex items-center gap-2">
              {(activeSegment || searchQuery) && (
                <span className="text-[10px] text-gray-400">
                  {filteredBrands.length} résultat{filteredBrands.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Search + Filter row */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-bdc-black/40 dark:text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                className="w-full pl-9 pr-8 py-2 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] rounded-xl text-sm text-bdc-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bdc-blue/30 transition-all"
                placeholder="Rechercher une marque..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-3.5 h-3.5 text-gray-400 hover:text-bdc-black dark:hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
                  activeSegment
                    ? 'bg-bdc-blue text-white border-bdc-blue'
                    : 'bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl text-bdc-black/60 dark:text-gray-400 border-black/[0.06] dark:border-white/[0.08]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
                <svg className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-bdc-black/90 backdrop-blur-2xl rounded-xl shadow-xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden z-50">
                  <div className="p-1.5">
                    <button
                      onClick={() => { setActiveSegment(null); setShowFilters(false); }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeSegment === null
                          ? 'bg-bdc-blue/10 text-bdc-blue'
                          : 'hover:bg-gray-50 dark:hover:bg-white/5 text-bdc-black dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Toutes les marques</span>
                        <span className="text-xs opacity-60">{totalBrands}</span>
                      </div>
                    </button>

                    <div className="my-1 border-t border-gray-100 dark:border-white/10" />

                    {segments.map((segment) => (
                      <button
                        key={segment.id}
                        onClick={() => { setActiveSegment(segment.id); setShowFilters(false); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          activeSegment === segment.id
                            ? 'bg-bdc-blue/10 text-bdc-blue'
                            : 'hover:bg-gray-50 dark:hover:bg-white/5 text-bdc-black dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{segment.name}</span>
                          <span className="text-xs opacity-60">{segment.brands.length}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeSegment && activeSegmentData && (
            <div className="flex items-center gap-2 mt-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bdc-blue/10 text-bdc-blue text-[11px] font-medium rounded-full">
                {activeSegmentData.name}
                <button onClick={() => setActiveSegment(null)} className="hover:bg-bdc-blue/20 rounded-full p-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
            {filteredBrands.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm text-muted dark:text-gray-400 font-medium">
              {searchQuery
                ? `Aucune marque trouvée pour "${searchQuery}"`
                : 'Aucune marque trouvée'
              }
            </p>
            {(searchQuery || activeSegment) && (
              <button
                onClick={() => { setSearchQuery(''); setActiveSegment(null); }}
                className="mt-3 text-xs text-bdc-blue hover:underline"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
