import { route } from 'preact-router';
import type { Brand } from '../../lib/data/segments';

interface BrandCardProps {
  brand: Brand;
  discontinued?: boolean;
}

// Map brand IDs to their actual logo file paths (organized by segment folder)
export const logoMap: Record<string, string> = {
  // Bières
  '33-export': '/assets/brands/bieres/33export-logo.webp',
  'beaufort-lager': '/assets/brands/bieres/beaufort-logo.webp',
  'beaufort-light': '/assets/brands/bieres/beaufort_light-logo.webp',
  'beaufort-tango': '/assets/brands/bieres/beaufort_tango-logo.webp',
  'castel-beer': '/assets/brands/bieres/castel_beer-logo.webp',
  'castle-milk-stout': '/assets/brands/bieres/castle_milk_stout-logo.webp',
  'chill-citron': '/assets/brands/bieres/chill-logo.webp',
  'doppel': '/assets/brands/bieres/doppel-logo.webp',
  'heineken': '/assets/brands/bieres/heineken.webp',
  'isenbeck': '/assets/brands/bieres/isenbeck-logo.webp',
  'manyan': '/assets/brands/bieres/manyan-logo.webp',
  'mutzig': '/assets/brands/bieres/mutzig-logo.webp',
  'pelforth': '/assets/brands/bieres/pelforth.webp',
  // Alcools Mix
  'booster-cola': '/assets/brands/alcoolsMix/booster-cola.webp',
  'booster-tonic': '/assets/brands/alcoolsMix/booster-tonic.webp',
  'orijin': '/assets/brands/alcoolsMix/orijin.webp',
  'racine': '/assets/brands/alcoolsMix/racine.webp',
  'smirnoff-black-ice': '/assets/brands/alcoolsMix/smirnoff-black-ice.webp',
  'smirnoff-pineapple-ice': '/assets/brands/alcoolsMix/smirnoff-pineapple-ice.webp',
  // Boissons Gazeuses
  'djino': '/assets/brands/bg/djino.webp',
  'orangina': '/assets/brands/bg/orangina.webp',
  'top': '/assets/brands/bg/top.webp',
  'vimto': '/assets/brands/bg/vimto.webp',
  'world-cola': '/assets/brands/bg/worldcola.webp',
  'youzou': '/assets/brands/bg/youzou.webp',
  // Eaux
  'aquabelle': '/assets/brands/eaux/aquabelle.webp',
  'tangui-citron': '/assets/brands/eaux/tangui-citron.webp',
  'tangui': '/assets/brands/eaux/tangui.webp',
  'vitale': '/assets/brands/eaux/vitale.webp',
  // Malts & Energy Drink
  'malta-tonic': '/assets/brands/Malts&energyDrink/malta-tonic.webp',
  'xxl': '/assets/brands/Malts&energyDrink/xxl.webp',
  // Spiritueux
  'absolut-vodka': '/assets/brands/spirtitueux/absolut-vodka.webp',
  'ballantines': '/assets/brands/spirtitueux/ballantines.webp',
  'chivas-regal': '/assets/brands/spirtitueux/chivas-regal.webp',
  'gh-mumm': '/assets/brands/spirtitueux/gh_mumm-champagne.webp',
  'jameson': '/assets/brands/spirtitueux/jameson-whiskey.webp',
  'martell': '/assets/brands/spirtitueux/martell-cognac.webp',
  // Vins
  'baron-de-lestac': '/assets/brands/vins/baronDeLestac.webp',
  'chateau-cavalier': '/assets/brands/vins/chateauCavalier.webp',
  'chateau-de-haut-coulon': '/assets/brands/vins/chateauDeHautCoulon.webp',
  'chateau-du-bousquet': '/assets/brands/vins/chateauDuBousquet.webp',
  'chateau-ferrande': '/assets/brands/vins/chateauFerrande.webp',
  'chateau-tour-prignac': '/assets/brands/vins/chateauTourPrignac.webp',
  'chateau-d-arcins': '/assets/brands/vins/chateaudArcins.webp',
  'maison-castel': '/assets/brands/vins/maisonCastel.webp',
  'monbazillac': '/assets/brands/vins/monbazillac.webp',
};

export function BrandCard({ brand, discontinued }: BrandCardProps) {
  const isDiscontinued = discontinued || brand.discontinued;
  const logoPath = logoMap[brand.id] || `/assets/brands/${brand.id}.webp`;

  const handleClick = () => {
    if (!isDiscontinued) {
      route(`/brand/${brand.id}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isDiscontinued && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      route(`/brand/${brand.id}`);
    }
  };

  return (
    <article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDiscontinued ? -1 : 0}
      role={isDiscontinued ? undefined : 'button'}
      aria-label={isDiscontinued ? `${brand.name} (non distribué)` : `Voir les produits ${brand.name}`}
      className={`flex flex-col items-center ${isDiscontinued ? 'opacity-40 cursor-default' : 'cursor-pointer group'}`}
    >
      {/* Logo Container */}
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border overflow-hidden transition-all duration-200 ${
        isDiscontinued
          ? 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 grayscale'
          : 'bg-white/70 dark:bg-white/5 backdrop-blur-md border-gray-100 dark:border-white/10 group-hover:border-bdc-blue/30 group-hover:shadow-lg group-hover:shadow-bdc-blue/10'
      }`}>
        <img
          src={logoPath}
          alt={`${brand.name} logo`}
          className={`w-full h-full object-contain p-3 transition-transform duration-200 ${isDiscontinued ? '' : 'group-hover:scale-105'}`}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
          onLoad={() => {
            const fallback = document.querySelector(`[data-fallback="${brand.id}"]`) as HTMLElement;
            if (fallback) fallback.style.display = 'none';
          }}
        />
        {/* Fallback letter */}
        <div
          data-fallback={brand.id}
          className="w-full h-full flex items-center justify-center"
          style={{ display: 'none' }}
        >
          <span className={`text-2xl font-bold transition-colors ${isDiscontinued ? 'text-gray-300 dark:text-gray-600' : 'text-bdc-blue/70 group-hover:text-bdc-blue'}`}>
            {brand.name.charAt(0)}
          </span>
        </div>

        {/* Discontinued badge */}
        {isDiscontinued && (
          <div className="absolute bottom-0 inset-x-0 bg-bdc-black/60 dark:bg-black/70 py-0.5">
            <p className="text-[8px] text-white text-center font-semibold uppercase tracking-wider">Arrêté</p>
          </div>
        )}
      </div>

      {/* Brand Name */}
      <div className="text-center mt-2 px-1">
        <h3 className={`text-xs font-medium transition-colors line-clamp-2 ${
          isDiscontinued
            ? 'text-gray-400 dark:text-gray-600 line-through'
            : 'text-muted dark:text-gray-300 group-hover:text-bdc-blue'
        }`}>
          {brand.name}
        </h3>
      </div>
    </article>
  );
}
