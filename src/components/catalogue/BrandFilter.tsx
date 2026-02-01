interface BrandFilterProps {
  brands: string[];
  activeBrand: string | null;
  onBrandChange: (brand: string | null) => void;
  loading?: boolean;
  error?: string | null;
}

export function BrandFilter({ 
  brands, 
  activeBrand, 
  onBrandChange, 
  loading = false, 
  error = null 
}: BrandFilterProps) {
  // Show loading skeleton
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="px-3 py-2 rounded-lg bg-gray-200 animate-pulse w-32 h-10"></div>
        <div className="px-3 py-2 rounded-lg bg-gray-200 animate-pulse w-24 h-10"></div>
        <div className="px-3 py-2 rounded-lg bg-gray-200 animate-pulse w-28 h-10"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-red-600">{error}</span>
      </div>
    );
  }

  // Show empty state
  if (brands.length === 0) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {/* TODO(i18n): filters.noBrandsAvailable */}
        <span className="text-sm text-gray-500">Aucune marque disponible</span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onBrandChange(null)}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeBrand === null
            ? 'bg-bdc-red text-white shadow-sm'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        {/* TODO(i18n): filters.allBrands */}
        Toutes les marques
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => onBrandChange(brand)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeBrand === brand
              ? 'bg-bdc-red text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}
