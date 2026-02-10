/**
 * News / Actualites module
 * Shared data for brand news used in BrandDetail and Promos pages
 */

export interface NewsItem {
  date: string;
  title: string;
  description: string;
  tag?: string;
  image?: string;
  brand?: string;
}

export const BRAND_NEWS: Record<string, NewsItem[]> = {
  '33 EXPORT': [
    { date: 'Jan 2026', title: 'Nouveau look 33 Export', description: 'Lancement du nouveau design d\'emballage pour renforcer l\'identite visuelle de la marque sur le marche.', tag: 'Lancement', image: '/images/segments/beer_banner.png' },
    { date: 'Dec 2025', title: 'Campagne festive', description: 'Activation speciale fin d\'annee avec offres promotionnelles sur les formats familiaux.', tag: 'Promo', image: '/images/segments/beer_banner.png' },
  ],
  'BEAUFORT LAGER': [
    { date: 'Jan 2026', title: 'Beaufort Lager renforce sa presence', description: 'Extension de distribution dans les nouveaux points de vente de la region Sud.', tag: 'Distribution', image: '/images/segments/beer_banner.png' },
  ],
  'CASTEL BEER': [
    { date: 'Fev 2026', title: 'Castel Beer Heritage', description: 'Nouvelle communication axee sur l\'heritage brassicole et le savoir-faire Castel.', tag: 'Communication', image: '/images/segments/beer_banner.png' },
  ],
  'MUTZIG': [
    { date: 'Jan 2026', title: 'Mutzig Premium Night', description: 'Evenements nocturnes dans les principales villes pour positionner Mutzig comme la biere premium de reference.', tag: 'Evenement', image: '/images/segments/beer_banner.png' },
  ],
  'HEINEKEN': [
    { date: 'Fev 2026', title: 'UEFA Champions League', description: 'Activation autour du partenariat mondial Heineken x Champions League dans les points de vente.', tag: 'Sponsoring', image: '/images/segments/beer_banner.png' },
  ],
};

// General SABC news (not brand-specific)
export const GENERAL_NEWS: NewsItem[] = [
  {
    date: 'Fev 2026',
    title: 'SABC renforce son engagement RSE',
    description: 'La Societe Anonyme des Brasseries du Cameroun intensifie ses programmes de developpement durable avec de nouvelles initiatives environnementales dans toutes ses usines.',
    tag: 'RSE',
    image: '/images/segments/eau.png',
  },
  {
    date: 'Jan 2026',
    title: 'Nouvelle ligne de production a Douala',
    description: 'Inauguration d\'une ligne de production moderne permettant d\'augmenter la capacite de 30% pour repondre a la demande croissante.',
    tag: 'Industrie',
    image: '/images/segments/bg.png',
  },
  {
    date: 'Jan 2026',
    title: 'Partenariat Distribution Nationale',
    description: 'Accord strategique avec de nouveaux distributeurs pour couvrir les zones rurales et periurbaines du pays.',
    tag: 'Distribution',
    image: '/images/segments/beer_banner.png',
  },
  {
    date: 'Dec 2025',
    title: 'Fetes de fin d\'annee : offres speciales',
    description: 'Packs promotionnels et activations dans les points de vente pour les celebrations de fin d\'annee a travers le Cameroun.',
    tag: 'Promo',
    image: '/images/segments/alcoolsmix_banner.png',
  },
  {
    date: 'Nov 2025',
    title: 'Lancement gamme Eaux Minerales',
    description: 'Extension de la gamme des eaux minerales avec de nouveaux formats adaptes a la consommation nomade.',
    tag: 'Lancement',
    image: '/images/segments/eau.png',
  },
];

/** Get all news combined (brand + general), sorted by date descending */
export function getAllNews(): NewsItem[] {
  const brandNews = Object.entries(BRAND_NEWS).flatMap(([brand, items]) =>
    items.map((item) => ({ ...item, brand }))
  );
  const allItems = [...brandNews, ...GENERAL_NEWS];
  // Simple sort: "Fev 2026" > "Jan 2026" > "Dec 2025" etc.
  const monthOrder: Record<string, number> = {
    Jan: 1, Fev: 2, Mar: 3, Avr: 4, Mai: 5, Jun: 6,
    Jul: 7, Aou: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  allItems.sort((a, b) => {
    const [aMonth, aYear] = a.date.split(' ');
    const [bMonth, bYear] = b.date.split(' ');
    const yearDiff = parseInt(bYear) - parseInt(aYear);
    if (yearDiff !== 0) return yearDiff;
    return (monthOrder[bMonth] || 0) - (monthOrder[aMonth] || 0);
  });
  return allItems;
}

/** Get unique tags from all news */
export function getAllTags(): string[] {
  const allNews = getAllNews();
  const tags = new Set(allNews.map((n) => n.tag).filter(Boolean) as string[]);
  return Array.from(tags).sort();
}
