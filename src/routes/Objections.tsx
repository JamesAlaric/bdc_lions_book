import { useEffect, useState } from 'preact/hooks';
import type { RouteProps } from 'preact-router';
import { loadArgumentaires, type ArgumentaireObjection } from '../lib/data/argumentaires';

interface ObjectionItem {
  brand: string;
  brandId: string;
  objection: ArgumentaireObjection;
}

export function Objections(_props: RouteProps) {
  const [objections, setObjections] = useState<ObjectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadArgumentaires()
      .then((data) => {
        const allObjections: ObjectionItem[] = [];
        data.brands.forEach((brand) => {
          if (brand.objections && brand.objections.length > 0) {
            brand.objections.forEach((obj) => {
              if (obj.question || obj.response) {
                allObjections.push({
                  brand: brand.name,
                  brandId: brand.id,
                  objection: obj,
                });
              }
            });
          }
        });
        setObjections(allObjections);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const brands = Array.from(new Set(objections.map((o) => o.brand)));

  const filteredObjections = objections.filter((o) => {
    const matchesBrand = !selectedBrand || o.brand === selectedBrand;
    const matchesSearch = !searchQuery ||
      o.objection.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.objection.response?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-bdc-black flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-200 dark:border-white/10 border-t-bdc-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-14 pb-24">
      {/* Header */}
      <header className="px-5 pt-5 pb-4">
        <h1 className="text-2xl font-bold text-bdc-black dark:text-white font-display">
          Objections
        </h1>
        <p className="text-xs text-muted dark:text-gray-400 mt-1">
          {filteredObjections.length} réponses préparées
        </p>
      </header>

      {/* Search + Filters */}
      <div className="px-5 mb-4 space-y-3">
        {/* Search bar - Glassmorphic */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une objection..."
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            className="w-full h-11 pl-10 pr-4 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl text-sm text-bdc-black dark:text-white placeholder:text-muted focus:outline-none focus:border-bdc-blue transition-colors"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Brand Filter */}
        {brands.length > 1 && (
          <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !selectedBrand
                    ? 'bg-bdc-blue text-white'
                    : 'bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 text-muted dark:text-gray-400'
                }`}
              >
                Toutes
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedBrand === brand
                      ? 'bg-bdc-blue text-white'
                      : 'bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 text-muted dark:text-gray-400'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Objections List */}
      <div className="px-5 space-y-3">
        {filteredObjections.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <p className="text-sm text-muted dark:text-gray-400 font-medium">Aucune objection trouvée</p>
            <p className="text-xs text-muted dark:text-gray-500 mt-1">Essayez un autre filtre</p>
          </div>
        ) : (
          filteredObjections.map((item, index) => (
            <ObjectionCard
              key={`${item.brandId}-${index}`}
              item={item}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))
        )}
      </div>

      {/* Tip */}
      <div className="px-5 mt-6">
        <div className="bg-bdc-yellow/10 border border-bdc-yellow/20 rounded-xl p-4 flex items-start gap-3">
          <span className="w-8 h-8 rounded-lg bg-bdc-yellow/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-bdc-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold text-bdc-black dark:text-bdc-yellow">Astuce</p>
            <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5 leading-relaxed">
              Personnalisez ces réponses selon le contexte du client.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ObjectionCard({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: ObjectionItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden transition-all">
      {/* Question */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="w-7 h-7 rounded-lg bg-bdc-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold text-bdc-red">{index + 1}</span>
        </span>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-bdc-blue uppercase tracking-wider">
            {item.brand}
          </span>
          <p className="text-sm font-medium text-bdc-black dark:text-white leading-snug mt-0.5">
            {item.objection.question || 'Objection client'}
          </p>
        </div>

        <svg
          className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Response */}
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-0">
          <div className="border-t border-gray-100 dark:border-white/10 pt-3 ml-10">
            <span className="text-[10px] font-semibold text-bdc-blue uppercase tracking-wider block mb-1.5">
              Réponse suggérée
            </span>
            <p className="text-sm text-muted dark:text-gray-300 leading-relaxed">
              {item.objection.response || item.objection.script || 'Pas de réponse disponible.'}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(item.objection.response || item.objection.script || '');
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 rounded-lg text-[11px] font-medium text-muted dark:text-gray-400 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
