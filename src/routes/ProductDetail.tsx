import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { getProductById } from '../lib/storage/catalogue';
import { ProductHeader } from '../components/product/ProductHeader';
import { Carousel3D } from '../components/product/Carousel3D';
import { GlassCard } from '../components/product/GlassCard';
import type { ProductStore } from '../lib/storage/types';

interface ProductDetailProps {
  id?: string;
  path?: string;
}

export function ProductDetail({ id }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // TODO(i18n): Move all French strings to translation files
  // See: docs/i18n.md for implementation guide

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #ff7323',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          {/* i18n: loading.message */}
          <p style={{ color: '#666' }}>Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          padding: '24px',
        }}
      >
        {/* i18n: error.productNotFound */}
        <p style={{ color: '#666', marginBottom: '16px' }}>{error || 'Produit non trouvé'}</p>
        <button
          onClick={handleBack}
          style={{
            padding: '12px 24px',
            background: '#ff7323',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          {/* i18n: navigation.backToCatalog */}
          Retour au catalogue
        </button>
      </div>
    );
  }

  // Prepare carousel images (placeholder for now)
  const carouselImages = [
    {
      id: '1',
      src: '/images/products/placeholder.svg',
      alt: product.name,
      format: product.specs?.format,
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fafafa',
      }}
    >
      {/* Header with Back Button */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#fafafa',
          padding: '16px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={handleBack}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            fontSize: '1.25rem',
          }}
        >
          ‹
        </button>
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            margin: 0,
            color: '#1a1a1a',
          }}
        >
          Fiche Produit
        </h1>
      </div>

      {/* Main Content */}
      <div style={{ padding: '16px' }}>
        {/* Product Header with Glassmorphism */}
        <div style={{ marginBottom: '24px' }}>
          <ProductHeader product={product} />
        </div>

        {/* 3D Carousel */}
        <div style={{ marginBottom: '24px' }}>
          <Carousel3D images={carouselImages} />
        </div>

        {/* Specifications */}
        <GlassCard variant="yellow">
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#1a1a1a',
            }}
          >
            Spécifications
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <SpecItem label="Catégorie" value={product.category} />
            <SpecItem label="Canal" value={product.canal} />
            {product.specs?.alcool !== undefined && (
              <SpecItem label="Alcool" value={`${product.specs.alcool}%`} />
            )}
            {product.specs?.contenance && (
              <SpecItem label="Contenance" value={`${product.specs.contenance}ml`} />
            )}
            {product.specs?.format && <SpecItem label="Format" value={product.specs.format} />}
            {product.specs?.nbBouteilles && (
              <SpecItem label="Qté" value={`${product.specs.nbBouteilles} bouteilles`} />
            )}
          </div>
        </GlassCard>

        {/* Historique & Positionnement */}
        {(product.historique || product.positionnement) && (
          <div style={{ marginTop: '24px' }}>
            <GlassCard variant="red">
              {product.historique && (
                <div style={{ marginBottom: '16px' }}>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#fff',
                    }}
                  >
                    Historique
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.95 }}>
                    {product.historique}
                  </p>
                </div>
              )}
              {product.positionnement && (
                <div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#fff',
                    }}
                  >
                    Positionnement
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.95 }}>
                    {product.positionnement}
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}

interface SpecItemProps {
  label: string;
  value: string;
}

function SpecItem({ label, value }: SpecItemProps) {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        padding: '12px',
        borderRadius: '8px',
      }}
    >
      <span
        style={{
          display: 'block',
          fontSize: '0.75rem',
          color: '#666',
          marginBottom: '4px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#1a1a1a',
        }}
      >
        {value}
      </span>
    </div>
  );
}
