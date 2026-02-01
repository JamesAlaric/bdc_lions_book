import { route } from 'preact-router';
import type { Brand } from '../../lib/data/segments';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  // Generate logo path based on brand ID - map to actual filenames
  const logoMap: Record<string, string> = {
    '33-export': '/assets/brands/33export-logo.png',
    'beaufort-lager': '/assets/brands/beaufort-logo.png',
    'beaufort-light': '/assets/brands/beaufort_light-logo.png',
    'castel-beer': '/assets/brands/castel_beer-logo.png',
    'castle-milk-stout': '/assets/brands/castle_milk_stout-logo.png',
    'chill-citron': '/assets/brands/chill-logo.png',
    'doppel': '/assets/brands/doppel-logo.png',
    'heineken': '/assets/brands/heineken.png',
    'isenbeck': '/assets/brands/isenbeck-logo.png',
    'manyan': '/assets/brands/manyan-logo.png',
    'mutzig': '/assets/brands/mutzig-logo.png',
  };
  
  const logoPath = logoMap[brand.id] || `/assets/brands/${brand.id.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
  
  return (
    <article
      onClick={() => route(`/brand/${brand.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          route(`/brand/${brand.id}`);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Voir les produits ${brand.name}`}
      className="cursor-pointer group m-1"
    >
      {/* Logo - 100x100 */}
      <div className="w-24 h-24 bg-bdc-red/10 rounded-lg flex items-center justify-center group-hover:bg-bdc-red transition-colors mx-auto overflow-hidden">
        <img
          src={logoPath}
          alt={`${brand.name} logo`}
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            // Fallback to initial letter if image not found
            (e.target as HTMLImageElement).style.display = 'none';
            const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
          onLoad={() => {
            // Hide fallback when image loads
            const fallback = (document.querySelector(`[data-fallback="${brand.id}"]`) as HTMLElement);
            if (fallback) fallback.style.display = 'none';
          }}
        />
        {/* Fallback letter */}
        <div 
          data-fallback={brand.id}
          className="w-full h-full flex items-center justify-center"
          style={{ display: 'none' }}
        >
          <span className="text-2xl font-bold text-bdc-red group-hover:text-white transition-colors">
            {brand.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Brand Name - Size 12 */}
      <div className="text-center mt-3">
        <h3 className="text-[12px] font-medium text-bdc-black group-hover:text-bdc-red transition-colors">
          {brand.name}
        </h3>
      </div>
    </article>
  );
}
