import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'preact/hooks';
import type { RouteProps } from 'preact-router';
import { getAllNews, getAllTags, type NewsItem } from '../lib/data/news';
import { Search } from '../components/ui/Icon';
import { gsap } from 'gsap';

type SortMode = 'recent' | 'oldest';
type DateFilter = 'all' | 'this_month' | 'last_month';
type ViewMode = 'box' | 'list';

export function Promos(_props: RouteProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try { return (localStorage.getItem('news-view') as ViewMode) || 'box'; } catch { return 'box'; }
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const toggleView = (mode: ViewMode) => {
    setViewMode(mode);
    try { localStorage.setItem('news-view', mode); } catch {}
  };

  useEffect(() => {
    setAllNews(getAllNews());
    setTags(getAllTags());
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current || allNews.length === 0) return;
    const cards = gridRef.current.querySelectorAll('[data-news-card]');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 15, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [allNews.length, activeTag, brandFilter, sortMode, dateFilter]);

  const featured = allNews.slice(0, 4);
  const slideCount = featured.length;

  const goToSlide = useCallback((index: number) => {
    setHeroIndex(index);
    if (heroRef.current) {
      const w = heroRef.current.offsetWidth;
      heroRef.current.scrollTo({ left: w * index, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (slideCount <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setHeroIndex((prev) => {
        const next = (prev + 1) % slideCount;
        goToSlide(next);
        return next;
      });
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [slideCount, goToSlide]);

  const uniqueBrands = Array.from(
    new Set(allNews.map((n) => n.brand).filter(Boolean) as string[])
  ).sort();

  const now = new Date();
  const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthStr = `${months[now.getMonth()]} ${now.getFullYear()}`;
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const lastMonthStr = `${months[lastMonth.getMonth()]} ${lastMonth.getFullYear()}`;

  let gridArticles = allNews.filter((n) => {
    if (activeTag && n.tag !== activeTag) return false;
    if (brandFilter && n.brand !== brandFilter) return false;
    if (dateFilter === 'this_month' && n.date !== currentMonthStr) return false;
    if (dateFilter === 'last_month' && n.date !== lastMonthStr) return false;
    return true;
  });

  if (sortMode === 'oldest') {
    gridArticles = [...gridArticles].reverse();
  }

  const clearAllFilters = () => {
    setActiveTag(null);
    setBrandFilter(null);
    setDateFilter('all');
    setSortMode('recent');
  };

  const hasActiveFilters = activeTag || brandFilter || dateFilter !== 'all' || sortMode !== 'recent';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-12 pb-24">
      {/* Sub-header */}
      <header className="sticky top-12 z-40 bg-white/70 dark:bg-bdc-black/70 backdrop-blur-2xl relative">
        <div className="absolute left-0 right-0 top-full h-6 pointer-events-none bg-gradient-to-b from-white/70 dark:from-[rgba(20,20,20,0.7)] to-transparent" />
        <div className="w-full px-4 h-12 flex items-center justify-center">
          <span className="text-sm font-bold text-bdc-black dark:text-white font-display">
            Promos & Actualites
          </span>
        </div>
      </header>

      {/* Hero Carousel */}
      {featured.length > 0 && (
        <div className="px-4 pt-4">
          <div
            ref={heroRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-3xl"
            style={{ scrollbarWidth: 'none' }}
            onScroll={(e) => {
              const el = e.target as HTMLDivElement;
              const idx = Math.round(el.scrollLeft / el.offsetWidth);
              if (idx !== heroIndex && idx >= 0 && idx < slideCount) setHeroIndex(idx);
            }}
          >
            {featured.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-full snap-center">
                <div className="relative h-[220px] rounded-3xl overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800" />
                  )}
                  {/* Glassmorphic overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-[60%]">
                    <div
                      className="absolute inset-0 backdrop-blur-xl"
                      style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.tag && (
                        <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider">
                          {item.tag}
                        </span>
                      )}
                      <span className="text-white/60 text-[10px]">{item.date}</span>
                      {item.brand && <span className="text-white/60 text-[10px]">&middot; {item.brand}</span>}
                    </div>
                    <h3 className="text-lg font-bold text-white font-display leading-tight">{item.title}</h3>
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === heroIndex ? 'w-5 h-1.5 bg-bdc-blue' : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tag filters */}
      <div className="px-4 mt-4 mb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveTag(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
              !activeTag
                ? 'bg-bdc-black dark:bg-white text-white dark:text-bdc-black'
                : 'bg-white/70 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 border border-white/50 dark:border-white/[0.06]'
            }`}
          >
            Tout
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                activeTag === tag
                  ? 'bg-bdc-blue text-white'
                  : 'bg-white/70 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 border border-white/50 dark:border-white/[0.06]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* View toggle + Filters toggle */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-medium"
        >
          <Search size={14} strokeWidth={2} className="text-gray-400" />
          Filtres
          <svg className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          {hasActiveFilters && (
            <button onClick={clearAllFilters} className="text-[11px] text-bdc-red font-medium mr-2">
              Reinitialiser
            </button>
          )}
          {/* Box / List toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-white/[0.06] rounded-lg p-0.5">
            <button
              onClick={() => toggleView('box')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'box' ? 'bg-white dark:bg-white/15 shadow-sm' : 'opacity-40'}`}
              aria-label="Vue grille"
            >
              <svg className="w-3.5 h-3.5 text-bdc-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <button
              onClick={() => toggleView('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-white/15 shadow-sm' : 'opacity-40'}`}
              aria-label="Vue liste"
            >
              <svg className="w-3.5 h-3.5 text-bdc-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="px-4 mb-4 space-y-2.5">
          <div>
            <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
              Marque
            </label>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => setBrandFilter(null)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  !brandFilter ? 'bg-bdc-blue/10 text-bdc-blue' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400'
                }`}
              >
                Toutes
              </button>
              {uniqueBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setBrandFilter(brandFilter === brand ? null : brand)}
                  className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    brandFilter === brand ? 'bg-bdc-blue/10 text-bdc-blue' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Periode</label>
              <div className="flex gap-1.5">
                {([['all', 'Toutes'], ['this_month', 'Ce mois'], ['last_month', 'Mois dernier']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setDateFilter(val as DateFilter)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                      dateFilter === val ? 'bg-bdc-blue/10 text-bdc-blue' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Tri</label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setSortMode('recent')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    sortMode === 'recent' ? 'bg-bdc-blue/10 text-bdc-blue' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Recents
                </button>
                <button
                  onClick={() => setSortMode('oldest')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    sortMode === 'oldest' ? 'bg-bdc-blue/10 text-bdc-blue' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Anciens
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles */}
      <div ref={gridRef} className="px-4">
        {gridArticles.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">Aucun article pour ce filtre</p>
          </div>
        ) : viewMode === 'box' ? (
          <div className="grid grid-cols-2 gap-3">
            {gridArticles.map((item, i) => (
              <NewsBoxCard key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {gridArticles.map((item, i) => (
              <NewsListCard key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Box card — tall immersive card with full image + glassmorphic overlay at bottom */
function NewsBoxCard({ item }: { item: NewsItem }) {
  return (
    <article
      data-news-card
      className="relative rounded-2xl overflow-hidden shadow-sm h-[240px]"
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
        <h3 className="text-[13px] font-bold text-white font-display leading-snug line-clamp-2 mb-1 drop-shadow-sm">
          {item.title}
        </h3>
        <p className="text-white/70 text-[9px] leading-relaxed line-clamp-2 mb-1.5">
          {item.description}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-white/50 text-[8px]">{item.date}</span>
          {item.brand && (
            <>
              <span className="text-white/30 text-[8px]">&middot;</span>
              <span className="text-bdc-yellow/80 text-[8px] font-medium">{item.brand}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

/** List card — horizontal layout: date+text left, image thumbnail right (like Image 1 reference) */
function NewsListCard({ item }: { item: NewsItem }) {
  return (
    <article
      data-news-card
      className="flex gap-4 bg-white dark:bg-white/[0.04] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-3.5 shadow-sm"
    >
      {/* Left: text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{item.date}</span>
          {item.brand && (
            <span className="text-[10px] text-bdc-blue font-medium">{item.brand}</span>
          )}
        </div>
        <h3 className="text-sm font-bold text-bdc-black dark:text-white font-display leading-snug line-clamp-2 mb-1">
          {item.title}
        </h3>
        {item.tag && (
          <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.06] text-[9px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            {item.tag}
          </span>
        )}
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
      {/* Right: thumbnail */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
    </article>
  );
}
