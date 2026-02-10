import { route } from 'preact-router';
import type { Brand } from '../../lib/data/segments';

interface BrandCardProps {
  brand: Brand;
  discontinued?: boolean;
}

// Map brand IDs to their actual logo file paths (organized by segment folder)
export const logoMap: Record<string, string> = {
  // Bières
  '33-export': '/assets/brands/bieres/33export-logo.png',
  'beaufort-lager': '/assets/brands/bieres/beaufort-logo.png',
  'beaufort-light': '/assets/brands/bieres/beaufort_light-logo.png',
  'beaufort-tango': '/assets/brands/bieres/beaufort_tango-logo.png',
  'castel-beer': '/assets/brands/bieres/castel_beer-logo.png',
  'castle-milk-stout': '/assets/brands/bieres/castle_milk_stout-logo.png',
  'chill-citron': '/assets/brands/bieres/chill-logo.png',
  'doppel': '/assets/brands/bieres/doppel-logo.png',
  'heineken': '/assets/brands/bieres/heineken.png',
  'isenbeck': '/assets/brands/bieres/isenbeck-logo.png',
  'manyan': '/assets/brands/bieres/manyan-logo.png',
  'mutzig': '/assets/brands/bieres/mutzig-logo.png',
  'pelforth': '/assets/brands/bieres/pelforth.png',
  // Alcools Mix
  'booster-cola': '/assets/brands/alcoolsMix/booster-cola.png',
  'booster-tonic': '/assets/brands/alcoolsMix/booster-tonic.png',
  'orijin': '/assets/brands/alcoolsMix/orijin.png',
  'racine': '/assets/brands/alcoolsMix/racine.png',
  'smirnoff-black-ice': '/assets/brands/alcoolsMix/smirnoff-black-ice.png',
  'smirnoff-pineapple-ice': '/assets/brands/alcoolsMix/smirnoff-pineapple-ice.png',
  // Boissons Gazeuses
  'djino': '/assets/brands/bg/djino.png',
  'orangina': '/assets/brands/bg/orangina.png',
  'top': '/assets/brands/bg/top.png',
  'vimto': '/assets/brands/bg/vimto.png',
  'world-cola': '/assets/brands/bg/worldcola.png',
  'youzou': '/assets/brands/bg/youzou.png',
  // Eaux
  'aquabelle': '/assets/brands/eaux/aquabelle.png',
  'tangui-citron': '/assets/brands/eaux/tangui-citron.png',
  'tangui': '/assets/brands/eaux/tangui.png',
  'vitale': '/assets/brands/eaux/vitale.png',
  // Malts & Energy Drink
  'malta-tonic': '/assets/brands/Malts&energyDrink/malta-tonic.png',
  'xxl': '/assets/brands/Malts&energyDrink/xxl.png',
  // Spiritueux
  'absolut-vodka': '/assets/brands/spirtitueux/absolut-vodka.png',
  'ballantines': '/assets/brands/spirtitueux/ballantines.png',
  'chivas-regal': '/assets/brands/spirtitueux/chivas-regal.png',
  'gh-mumm': '/assets/brands/spirtitueux/gh_mumm-champagne.png',
  'jameson': '/assets/brands/spirtitueux/jameson-whiskey.png',
  'martell': '/assets/brands/spirtitueux/martell-cognac.png',
  // Vins
  'baron-de-lestac': '/assets/brands/vins/baronDeLestac.png',
  'chateau-cavalier': '/assets/brands/vins/chateauCavalier.png',
  'chateau-de-haut-coulon': '/assets/brands/vins/chateauDeHautCoulon.png',
  'chateau-du-bousquet': '/assets/brands/vins/chateauDuBousquet.png',
  'chateau-ferrande': '/assets/brands/vins/chateauFerrande.png',
  'chateau-tour-prignac': '/assets/brands/vins/chateauTourPrignac.png',
  'chateau-d-arcins': '/assets/brands/vins/chateaudArcins.png',
  'maison-castel': '/assets/brands/vins/maisonCastel.png',
  'monbazillac': '/assets/brands/vins/monbazillac.png',
};

export function BrandCard({ brand, discontinued }: BrandCardProps) {
  const isDiscontinued = discontinued || brand.discontinued;
  const logoPath = logoMap[brand.id] || `/assets/brands/${brand.id}.png`;

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
