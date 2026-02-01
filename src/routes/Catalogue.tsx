import { useEffect, useState } from 'preact/hooks';
import type { RouteProps } from 'preact-router';
import { loadSegmentsBrands, type Segment } from '../lib/data/segments';
import { Header } from '../components/catalogue/Header';
import { Sidebar } from '../components/catalogue/Sidebar';
import { BrandCard } from '../components/catalogue/BrandCard';
import { Loader2 } from '../components/ui/Icon';

export function Catalogue(_props: RouteProps) {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSegments, setExpandedSegments] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSegmentsBrands()
      .then(data => setSegments(data.segments.sort((a, b) => a.order - b.order)))
      .finally(() => setLoading(false));
  }, []);

  const toggleSegment = (segmentId: string) => {
    const newExpanded = new Set(expandedSegments);
    if (newExpanded.has(segmentId)) {
      newExpanded.delete(segmentId);
    } else {
      newExpanded.add(segmentId);
    }
    setExpandedSegments(newExpanded);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-bdc-red">
          <Loader2 size={24} className="animate-spin" />
          <span className="font-medium">Chargement des marques...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          segments={segments}
          activeSegment={activeSegment}
          onSegmentChange={setActiveSegment}
          expandedSegments={expandedSegments}
          onToggleSegment={toggleSegment}
        />

        {/* Main Grid */}
        <main className="flex-1 p-6">
          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
            
            {searchQuery && (
              <div className="text-sm text-gray-500">
                Recherche: "{searchQuery}"
              </div>
            )}
          </div>

          {/* Brands Grid */}
          {filteredBrands.length > 0 ? (
            <div className="p-4">
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8">
                {filteredBrands.map((brand) => (
                  <BrandCard 
                    key={brand.id} 
                    brand={{ id: brand.id, name: brand.name }} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchQuery 
                  ? `Aucune marque trouvée pour "${searchQuery}"`
                  : 'Aucune marque trouvée'
                }
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
