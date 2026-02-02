import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { getProductById } from '../lib/storage/catalogue';
import type { ProductStore } from '../lib/storage/types';

interface ProductDetailProps {
  id?: string;
  path?: string;
}

export function ProductDetail({ id }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      setError('ID produit manquant');
      setLoading(false);
      return;
    }

    async function loadProduct(productId: string) {
      try {
        const productData = await getProductById(productId);
        if (productData) {
          setProduct(productData);
          setError(null);
        } else {
          setError('Produit non trouvé dans le catalogue');
          console.error(`Product ${productId} not found in IndexedDB`);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(`Erreur lors du chargement: ${errorMessage}`);
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct(id);
  }, [id]);

  const handleBack = () => {
    route('/catalogue');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-folk-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-folk-sand border-t-folk-terracotta rounded-full animate-spin mx-auto mb-4" />
          <p className="text-folk-brown/60 text-sm tracking-wide">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-folk-cream flex flex-col items-center justify-center px-6">
        <p className="text-folk-brown/60 mb-6 text-center">{error || 'Produit non trouvé'}</p>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-folk-brown text-white text-sm tracking-wide rounded-full hover:bg-folk-brown/90 transition-colors"
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  const productImages = [
    { id: '1', src: '/images/products/placeholder.svg', alt: product.name },
  ];

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      biere: 'Biere',
      soft: 'Boisson Soft',
      eau: 'Eau',
      vin: 'Vin',
      spiritueux: 'Spiritueux',
    };
    return labels[category] || category;
  };

  const getCanalLabel = (canal: string) => {
    const labels: Record<string, string> = {
      CHR: 'CHR',
      PSV: 'PSV',
      TT: 'TT',
      MT: 'MT',
    };
    return labels[canal] || canal;
  };

  return (
    <div className="min-h-screen bg-folk-cream pb-24">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-folk-cream/95 backdrop-blur-sm border-b border-folk-sand/50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-folk-brown hover:text-folk-terracotta transition-colors"
            aria-label="Retour au catalogue"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="text-sm tracking-wide">Catalogue</span>
          </button>
          <span className="text-xs text-folk-brown/40 uppercase tracking-widest">{product.brand}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        {/* Product Image Gallery */}
        <section className="px-4 pt-6">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-square flex items-center justify-center p-8">
              <img
                src={productImages[selectedImageIndex].src}
                alt={productImages[selectedImageIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2 p-4 border-t border-folk-sand/30">
                {productImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex 
                        ? 'border-folk-terracotta' 
                        : 'border-transparent hover:border-folk-sand'
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Product Info */}
        <section className="px-4 pt-8">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-folk-sage/20 text-folk-sage text-xs uppercase tracking-wider rounded-full">
              {getCategoryLabel(product.category)}
            </span>
            <span className="px-3 py-1 bg-folk-sand text-folk-brown/70 text-xs uppercase tracking-wider rounded-full">
              {getCanalLabel(product.canal)}
            </span>
          </div>

          {/* Product Name & Brand */}
          <h1 className="text-2xl font-medium text-folk-brown tracking-tight mb-1">
            {product.name}
          </h1>
          <p className="text-folk-brown/50 text-sm mb-6">{product.brand}</p>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-3xl font-light text-folk-brown">
              {product.prix.toLocaleString('fr-FR')} <span className="text-lg">FCFA</span>
            </span>
            <span className="text-sm text-folk-sage bg-folk-sage/10 px-3 py-1 rounded-full">
              Marge {product.marge}%
            </span>
          </div>

          {/* Specifications */}
          <div className="border-t border-folk-sand/50 pt-8 mb-8">
            <h2 className="text-xs uppercase tracking-widest text-folk-brown/40 mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {product.specs?.format && (
                <SpecCard label="Format" value={product.specs.format} />
              )}
              {product.specs?.contenance && (
                <SpecCard label="Contenance" value={`${product.specs.contenance} ml`} />
              )}
              {product.specs?.alcool !== undefined && (
                <SpecCard label="Alcool" value={`${product.specs.alcool}%`} />
              )}
              {product.specs?.nbBouteilles && (
                <SpecCard label="Quantite" value={`${product.specs.nbBouteilles} bouteilles`} />
              )}
            </div>
          </div>

          {/* Description Sections */}
          {product.historique && (
            <div className="border-t border-folk-sand/50 pt-8 mb-8">
              <h2 className="text-xs uppercase tracking-widest text-folk-brown/40 mb-4">
                Historique
              </h2>
              <p className="text-folk-brown/80 leading-relaxed text-sm">
                {product.historique}
              </p>
            </div>
          )}

          {product.positionnement && (
            <div className="border-t border-folk-sand/50 pt-8 mb-8">
              <h2 className="text-xs uppercase tracking-widest text-folk-brown/40 mb-4">
                Positionnement
              </h2>
              <p className="text-folk-brown/80 leading-relaxed text-sm">
                {product.positionnement}
              </p>
            </div>
          )}

          {/* Conservation */}
          {product.conservation && (
            <div className="border-t border-folk-sand/50 pt-8 mb-8">
              <h2 className="text-xs uppercase tracking-widest text-folk-brown/40 mb-4">
                Conservation
              </h2>
              <p className="text-folk-brown/80 leading-relaxed text-sm">
                {product.conservation}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="border-t border-folk-sand/50 pt-8 mb-8">
              <h2 className="text-xs uppercase tracking-widest text-folk-brown/40 mb-4">
                Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white border border-folk-sand text-folk-brown/70 text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="border-t border-folk-sand/50 pt-8 mb-8">
              <h2 className="text-xs uppercase tracking-widest text-folk-brown/40 mb-4">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-folk-sage/10 text-folk-sage text-sm rounded-full flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

interface SpecCardProps {
  label: string;
  value: string;
}

function SpecCard({ label, value }: SpecCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-folk-sand/30">
      <span className="block text-xs text-folk-brown/40 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span className="text-folk-brown font-medium">
        {value}
      </span>
    </div>
  );
}
