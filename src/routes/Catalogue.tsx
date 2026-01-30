import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { getAllProducts, getProductsByCategory } from '../lib/storage/catalogue';
import type { ProductStore } from '../lib/storage/types';

const CATEGORIES = [
  { id: 'biere', label: 'Bières' },
  { id: 'soft', label: 'Boissons Gazeuses' },
  { id: 'eau', label: 'Eaux' },
  { id: 'vin', label: 'Vins' },
  { id: 'spiritueux', label: 'Spiritueux' },
];

export interface CatalogueProps {
  path?: string;
}

export function Catalogue(_props: CatalogueProps) {
  const [products, setProducts] = useState<ProductStore[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const items =
        activeCategory === null
          ? await getAllProducts()
          : await getProductsByCategory(activeCategory);
      if (!cancelled) {
        setProducts(items);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  const countLabel = useMemo(() => {
    if (activeCategory === null) return 'Tous les produits';
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    return cat ? `Catégorie : ${cat.label}` : 'Filtre actif';
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-bdc-red">Catalogue BDC</h1>
        <p className="text-gray-600 text-sm mt-1">{countLabel}</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        <FilterButton
          label="Tous"
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        />
        {CATEGORIES.map((cat) => (
          <FilterButton
            key={cat.id}
            label={cat.label}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">{products.length} produits</span>
      </div>

      {loading ? (
        <p className="text-gray-600">Chargement du catalogue...</p>
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
            >
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-xs text-white bg-bdc-red rounded-full px-2 py-1">
                  {product.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="text-xl font-bold text-gray-900 mt-2">{product.prix} FCFA</p>
              <p className="text-xs text-gray-500 mt-1">Marge: {product.marge}%</p>
              <div className="text-xs text-gray-500 mt-2 flex gap-2 flex-wrap">
                {product.specs?.contenance ? <span>{product.specs.contenance} ml</span> : null}
                {product.specs?.format ? <span>{product.specs.format}</span> : null}
                {product.canal ? <span>Canal: {product.canal}</span> : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-bdc-yellow text-gray-900 shadow-sm'
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}
