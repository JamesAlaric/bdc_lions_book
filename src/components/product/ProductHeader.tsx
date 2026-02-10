import { GlassCard } from './GlassCard';
import type { ProductStore } from '../../lib/storage/types';

interface ProductHeaderProps {
  product: ProductStore;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <GlassCard variant="red" className="wizard-header-card">
      <div className="wizard-header-row">
        <div>
          <div className="wizard-brand">{product.brand}</div>
          <h2 className="wizard-product-name">{product.name}</h2>
        </div>
        <div className="wizard-price-block">
          <span className="wizard-price-label">Sous-total</span>
          <span className="wizard-price-value">{product.prix} FCFA</span>
        </div>
      </div>
      <div className="wizard-header-meta">
        <span>Catégorie: {product.category}</span>
        <span>Canal: {product.canal}</span>
        <span>Marge: {product.marge}%</span>
      </div>
    </GlassCard>
  );
}
