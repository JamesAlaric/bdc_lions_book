import { GlassCard } from './GlassCard';
import type { ProductStore } from '../../lib/storage/types';

interface ProductHeaderProps {
  product: ProductStore;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <GlassCard variant="red">
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '8px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        {product.name}
      </h1>
      <p
        style={{
          fontSize: '1rem',
          opacity: 0.9,
          marginBottom: '16px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        }}
      >
        {product.brand}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          {product.prix} FCFA
        </span>
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 12px',
            borderRadius: '20px',
          }}
        >
          Marge: {product.marge}%
        </span>
      </div>
    </GlassCard>
  );
}
