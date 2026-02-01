import { ChevronDown, ChevronRight, Filter } from '../ui/Icon';
import type { Segment } from '../../lib/data/segments';

interface SidebarProps {
  segments: Segment[];
  activeSegment: string | null;
  onSegmentChange: (segmentId: string | null) => void;
  expandedSegments: Set<string>;
  onToggleSegment: (segmentId: string) => void;
}

export function Sidebar({ 
  segments, 
  activeSegment, 
  onSegmentChange, 
  expandedSegments, 
  onToggleSegment 
}: SidebarProps) {
  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-full sticky top-16">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} className="text-bdc-red" />
          <h2 className="text-sm font-semibold text-bdc-black uppercase tracking-wider">
            Filtres
          </h2>
        </div>

        {/* All Brands */}
        <div className="mb-6">
          <button
            onClick={() => onSegmentChange(null)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              activeSegment === null
                ? 'bg-bdc-red text-white shadow-lg shadow-bdc-red/25'
                : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Toutes les marques</span>
              <span className="text-xs opacity-75">
                {segments.reduce((acc, s) => acc + s.brands.length, 0)}
              </span>
            </div>
          </button>
        </div>

        {/* Segments */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Catégories
          </h3>
          {segments.map((segment) => (
            <div key={segment.id} className="mb-2">
              <button
                onClick={() => onToggleSegment(segment.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSegment === segment.id
                    ? 'bg-bdc-red text-white shadow-lg shadow-bdc-red/25'
                    : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                <span className="font-medium">{segment.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-75">{segment.brands.length}</span>
                  {expandedSegments.has(segment.id) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </button>

              {/* Expanded Brands */}
              {expandedSegments.has(segment.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {segment.brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => onSegmentChange(segment.id)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-bdc-red hover:bg-bdc-red/5 rounded-lg transition-all duration-200"
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Statistiques
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total marques</span>
                <span className="font-semibold text-bdc-black">
                  {segments.reduce((acc, s) => acc + s.brands.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Catégories</span>
                <span className="font-semibold text-bdc-black">{segments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
