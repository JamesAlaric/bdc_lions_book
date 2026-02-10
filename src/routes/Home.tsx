import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'preact/hooks';
import { route } from 'preact-router';
import type { RouteProps } from 'preact-router';
import { loadSegmentsBrands, type Brand } from '../lib/data/segments';
import { logoMap } from '../components/catalogue/BrandCard';
import { getAllNews, type NewsItem } from '../lib/data/news';
import { Search, BookOpen, DollarSign, MessageCircle, Bookmark, FileText, Settings } from '../components/ui/Icon';
import { gsap } from 'gsap';

export function Home(_props: RouteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [greeting, setGreeting] = useState('Bonjour');
  const [heroIndex, setHeroIndex] = useState(0);
  const [newsDialog, setNewsDialog] = useState<NewsItem | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon apres-midi');
    else setGreeting('Bonsoir');

    loadSegmentsBrands()
      .then((data) => {
        const allBrands = data.segments.flatMap((s) => s.brands);
        setBrands(allBrands.filter((b) => !b.discontinued).slice(0, 20));
      })
      .catch(console.error);

    setNews(getAllNews());
  }, []);

  // Featured news for hero carousel (top 5)
  const featured = news.slice(0, 5);
  const slideCount = featured.length;

  const goToSlide = useCallback((index: number) => {
    setHeroIndex(index);
    if (heroScrollRef.current) {
      const w = heroScrollRef.current.offsetWidth;
      heroScrollRef.current.scrollTo({ left: w * index, behavior: 'smooth' });
    }
  }, []);

  // Auto-play hero
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

  // GSAP entrance
  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const sections = pageRef.current.querySelectorAll('[data-section]');
    if (sections.length) {
      gsap.fromTo(
        sections,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', delay: 0.3 }
      );
    }
  }, [brands.length]);

  const handleSearch = (e: Event) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      route(`/catalogue?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Quick access: deep pages not in nav
  const quickActions = [
    { label: 'Catalogue', desc: 'Toutes les marques', path: '/catalogue', icon: Bookmark },
    { label: 'Grille des prix', desc: 'Tarifs & formats', path: '/prix', icon: DollarSign },
    { label: 'Objections', desc: 'Arguments de vente', path: '/objections', icon: MessageCircle },
    { label: 'Argumentaires', desc: 'Fiches marques', path: '/segments', icon: FileText },
    { label: 'Notre Histoire', desc: 'Depuis 1948', path: '/segments', icon: BookOpen },
    { label: 'Reglages', desc: 'Parametres', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pb-24 overflow-x-hidden">
      <div ref={pageRef}>

        {/* Search bar at very top */}
        <div className="fixed top-12 left-0 right-0 z-30 px-4 pt-2 pb-2 bg-white/60 dark:bg-bdc-black/60 backdrop-blur-2xl">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une marque..."
                value={searchQuery}
                onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                className="w-full h-10 pl-10 pr-4 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-white/60 dark:border-white/[0.06] rounded-2xl text-sm text-bdc-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bdc-blue/30 transition-all"
              />
            </div>
          </form>
        </div>

        {/* HERO: News carousel with frosted glass transition */}
        <div className="pt-[100px] relative">
          {featured.length > 0 && (
            <div className="px-4">
              <div
                ref={heroScrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-3xl"
                style={{ scrollbarWidth: 'none' }}
                onScroll={(e) => {
                  const el = e.target as HTMLDivElement;
                  const idx = Math.round(el.scrollLeft / el.offsetWidth);
                  if (idx !== heroIndex && idx >= 0 && idx < slideCount) {
                    setHeroIndex(idx);
                  }
                }}
              >
                {featured.map((item, i) => (
                  <div key={i} className="flex-shrink-0 w-full snap-center">
                    <button
                      className="relative w-full h-[360px] rounded-3xl overflow-hidden text-left"
                      onClick={() => setNewsDialog(item)}
                    >
                      {/* Full image — sharp, not masked */}
                      {item.image ? (
                        <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gray-800" />
                      )}

                      {/* Frosted glass zone — bottom 45%, blur increases progressively */}
                      <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none">
                        {/* Layer 1: light blur starting early */}
                        <div
                          className="absolute inset-0 backdrop-blur-sm"
                          style={{
                            maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
                          }}
                        />
                        {/* Layer 2: medium blur */}
                        <div
                          className="absolute inset-0 backdrop-blur-md"
                          style={{
                            maskImage: 'linear-gradient(to bottom, transparent 20%, black 75%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, black 75%)',
                          }}
                        />
                        {/* Layer 3: heavy blur at very bottom */}
                        <div
                          className="absolute inset-0 backdrop-blur-xl"
                          style={{
                            maskImage: 'linear-gradient(to bottom, transparent 40%, black 90%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black 90%)',
                          }}
                        />
                        {/* Subtle color tint to match page bg */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/40 dark:from-bdc-black/40 via-transparent to-transparent" />
                      </div>

                      {/* Tag badge top-left */}
                      {item.tag && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider border border-white/10">
                            {item.tag}
                          </span>
                        </div>
                      )}

                      {/* Text content — sits in the frosted zone */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <h2 className="text-xl font-black text-bdc-black dark:text-white font-display leading-tight mb-1.5 drop-shadow-sm">
                          {item.title}
                        </h2>
                        <p className="text-bdc-black/70 dark:text-white/70 text-xs leading-relaxed line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-bdc-black/50 dark:text-white/50 text-[10px]">{item.date}</span>
                          {item.brand && (
                            <>
                              <span className="text-bdc-black/30 dark:text-white/30 text-[10px]">&middot;</span>
                              <span className="text-bdc-blue text-[10px] font-medium">{item.brand}</span>
                            </>
                          )}
                        </div>

                        {/* Carousel dots — inside the card, above frosted zone */}
                        <div className="flex items-center gap-1.5 mt-3">
                          {featured.map((_, di) => (
                            <span
                              key={di}
                              className={`rounded-full transition-all duration-300 ${
                                di === heroIndex
                                  ? 'w-5 h-1.5 bg-bdc-blue'
                                  : 'w-1.5 h-1.5 bg-bdc-black/20 dark:bg-white/25'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HISTOIRE BUTTON - just after hero */}
        <div data-section className="px-4 mt-5 mb-4">
          <button
            onClick={() => route('/segments')}
            className="w-full relative overflow-hidden bg-white/60 dark:bg-white/[0.05] backdrop-blur-2xl border border-white/50 dark:border-white/[0.08] rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-bdc-red/10 dark:bg-bdc-red/15 flex items-center justify-center flex-shrink-0">
              <BookOpen size={20} strokeWidth={1.8} className="text-bdc-red" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-bold text-bdc-black dark:text-white font-display">Notre Histoire</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Depuis 1948, le leader camerounais des boissons</p>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* BRANDS strip */}
        <div data-section className="mb-5">
          <div className="flex items-center justify-between mb-2.5 px-4">
            <h3 className="text-xs font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider">
              Nos marques
            </h3>
            <button onClick={() => route('/catalogue')} className="text-[11px] text-bdc-blue font-semibold">
              Tout voir
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-3">
              {brands.slice(0, 16).map((brand) => {
                const logo = logoMap[brand.id];
                return (
                  <button
                    key={brand.id}
                    onClick={() => route(`/brand/${brand.id}`)}
                    className="flex-shrink-0 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/[0.06] backdrop-blur-xl border border-white/60 dark:border-white/[0.08] flex items-center justify-center mb-1.5 group-active:scale-90 transition-all overflow-hidden shadow-sm">
                      {logo ? (
                        <img src={logo} alt={brand.name} className="w-9 h-9 object-contain" />
                      ) : (
                        <span className="text-sm font-bold text-bdc-black dark:text-white font-display">
                          {brand.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <p className="text-[8px] text-center text-gray-500 font-medium truncate w-14">
                      {brand.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* QUICK ACCESS */}
        <div data-section className="px-4 mb-8">
          <h3 className="text-xs font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-3">
            Acces rapide
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => route(item.path)}
                  className="bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/50 dark:border-white/[0.06] rounded-2xl px-2.5 py-3.5 flex flex-col items-center gap-2 active:scale-[0.95] transition-all text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-bdc-blue/8 dark:bg-bdc-blue/10 flex items-center justify-center">
                    <IconComp size={18} strokeWidth={1.6} className="text-bdc-blue" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-bdc-black dark:text-white block leading-tight">{item.label}</span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 block mt-0.5 leading-tight">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* News context dialog */}
      {newsDialog && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end justify-center p-4"
          onClick={() => setNewsDialog(null)}
        >
          <div
            className="w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview */}
            <div className="p-5 border-b border-gray-100 dark:border-white/10">
              <p className="text-xs text-bdc-blue font-semibold mb-1">{newsDialog.tag || 'Actualite'}</p>
              <h3 className="text-base font-bold text-bdc-black dark:text-white font-display leading-tight">
                {newsDialog.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{newsDialog.description}</p>
            </div>
            {/* Actions */}
            <button
              onClick={() => {
                setNewsDialog(null);
                if (newsDialog.brand) {
                  const brandSlug = newsDialog.brand.toLowerCase().replace(/\s+/g, '-');
                  route(`/brand/${brandSlug}`);
                } else {
                  route('/promos');
                }
              }}
              className="w-full px-5 py-3.5 text-sm font-semibold text-bdc-blue text-center border-b border-gray-100 dark:border-white/10 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
            >
              {newsDialog.brand ? `Voir ${newsDialog.brand}` : "Lire l'article"}
            </button>
            <button
              onClick={() => {
                setNewsDialog(null);
                route('/promos');
              }}
              className="w-full px-5 py-3.5 text-sm font-medium text-bdc-black dark:text-white text-center border-b border-gray-100 dark:border-white/10 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
            >
              Toutes les actualites
            </button>
            <button
              onClick={() => setNewsDialog(null)}
              className="w-full px-5 py-3.5 text-sm font-medium text-gray-500 text-center active:bg-gray-50 dark:active:bg-white/5 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
