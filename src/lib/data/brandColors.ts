/**
 * Brand color themes - Each brand has a primary color derived from its visual identity
 * These colors are used for backgrounds, accents, and depth effects
 */

export interface BrandTheme {
  primary: string;       // Main brand color
  secondary: string;     // Secondary/accent color
  background: string;    // Light background tint
  backgroundDark: string; // Dark mode background
  text: string;          // Text color on primary
  shadowColor: string;   // For depth effects
  isDark: boolean;       // If primary is dark (for contrast)
}

export const brandColors: Record<string, BrandTheme> = {
  // === BIERES ===
  '33-export': {
    primary: '#C41E3A',      // Rouge cardinal (logo 33)
    secondary: '#FFD700',    // Or
    background: '#FEF2F4',
    backgroundDark: '#1A0A0D',
    text: '#FFFFFF',
    shadowColor: 'rgba(196, 30, 58, 0.3)',
    isDark: true,
  },
  'castel-beer': {
    primary: '#1E3A8A',      // Bleu royal (logo Castel)
    secondary: '#FFC627',    // Or
    background: '#EEF2FF',
    backgroundDark: '#0A0F1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(30, 58, 138, 0.3)',
    isDark: true,
  },
  'mutzig': {
    primary: '#B91C1C',      // Rouge Mutzig
    secondary: '#FFFFFF',
    background: '#FEF2F2',
    backgroundDark: '#1A0A0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(185, 28, 28, 0.3)',
    isDark: true,
  },
  'manyan': {
    primary: '#15803D',      // Vert (bière locale)
    secondary: '#FFC627',
    background: '#F0FDF4',
    backgroundDark: '#0A1A0F',
    text: '#FFFFFF',
    shadowColor: 'rgba(21, 128, 61, 0.3)',
    isDark: true,
  },
  'isenbeck': {
    primary: '#1D4ED8',      // Bleu Isenbeck
    secondary: '#FBBF24',
    background: '#EFF6FF',
    backgroundDark: '#0A0F1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(29, 78, 216, 0.3)',
    isDark: true,
  },
  'beaufort-lager': {
    primary: '#0369A1',      // Bleu Beaufort
    secondary: '#FFC627',
    background: '#F0F9FF',
    backgroundDark: '#0A141A',
    text: '#FFFFFF',
    shadowColor: 'rgba(3, 105, 161, 0.3)',
    isDark: true,
  },
  'beaufort-light': {
    primary: '#0EA5E9',      // Bleu clair
    secondary: '#F0F9FF',
    background: '#F0F9FF',
    backgroundDark: '#0A141A',
    text: '#FFFFFF',
    shadowColor: 'rgba(14, 165, 233, 0.3)',
    isDark: false,
  },
  'chill-citron': {
    primary: '#EAB308',      // Jaune citron
    secondary: '#22C55E',
    background: '#FEFCE8',
    backgroundDark: '#1A1A0A',
    text: '#1D1D1D',
    shadowColor: 'rgba(234, 179, 8, 0.3)',
    isDark: false,
  },
  'doppel': {
    primary: '#78350F',      // Brun doré (bière forte)
    secondary: '#FFC627',
    background: '#FEF3C7',
    backgroundDark: '#1A140A',
    text: '#FFFFFF',
    shadowColor: 'rgba(120, 53, 15, 0.3)',
    isDark: true,
  },
  'castle-milk-stout': {
    primary: '#1C1917',      // Noir (stout)
    secondary: '#A16207',
    background: '#F5F5F4',
    backgroundDark: '#0A0A0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(28, 25, 23, 0.4)',
    isDark: true,
  },
  'heineken': {
    primary: '#007229',      // Vert Heineken officiel
    secondary: '#E4002B',
    background: '#F0FDF4',
    backgroundDark: '#0A1A0D',
    text: '#FFFFFF',
    shadowColor: 'rgba(0, 114, 41, 0.3)',
    isDark: true,
  },

  // === ALCOOLS MIX ===
  'booster-whisky-cola': {
    primary: '#7C2D12',      // Brun whisky
    secondary: '#DC2626',
    background: '#FEF2F2',
    backgroundDark: '#1A0D0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(124, 45, 18, 0.3)',
    isDark: true,
  },
  'booster-gin-tonic': {
    primary: '#0D9488',      // Teal (gin)
    secondary: '#FCD34D',
    background: '#F0FDFA',
    backgroundDark: '#0A1A1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(13, 148, 136, 0.3)',
    isDark: true,
  },
  'smirnoff-ice': {
    primary: '#DC2626',      // Rouge Smirnoff
    secondary: '#FFFFFF',
    background: '#FEF2F2',
    backgroundDark: '#1A0A0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(220, 38, 38, 0.3)',
    isDark: true,
  },
  'orijin': {
    primary: '#065F46',      // Vert foncé
    secondary: '#FFC627',
    background: '#ECFDF5',
    backgroundDark: '#0A1A14',
    text: '#FFFFFF',
    shadowColor: 'rgba(6, 95, 70, 0.3)',
    isDark: true,
  },

  // === BOISSONS GAZEUSES ===
  'top': {
    primary: '#F97316',      // Orange Top
    secondary: '#FFC627',
    background: '#FFF7ED',
    backgroundDark: '#1A140A',
    text: '#FFFFFF',
    shadowColor: 'rgba(249, 115, 22, 0.3)',
    isDark: false,
  },
  'top-ananas': {
    primary: '#EAB308',      // Jaune ananas
    secondary: '#22C55E',
    background: '#FEFCE8',
    backgroundDark: '#1A1A0A',
    text: '#1D1D1D',
    shadowColor: 'rgba(234, 179, 8, 0.3)',
    isDark: false,
  },
  'top-pamplemousse': {
    primary: '#F472B6',      // Rose pamplemousse
    secondary: '#FFC627',
    background: '#FDF2F8',
    backgroundDark: '#1A0A14',
    text: '#1D1D1D',
    shadowColor: 'rgba(244, 114, 182, 0.3)',
    isDark: false,
  },
  'top-grenadine': {
    primary: '#DC2626',      // Rouge grenadine
    secondary: '#FFC627',
    background: '#FEF2F2',
    backgroundDark: '#1A0A0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(220, 38, 38, 0.3)',
    isDark: true,
  },
  'top-orange': {
    primary: '#EA580C',      // Orange vif
    secondary: '#FFC627',
    background: '#FFF7ED',
    backgroundDark: '#1A0F0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(234, 88, 12, 0.3)',
    isDark: true,
  },
  'djino-cocktail': {
    primary: '#7C3AED',      // Violet D'jino
    secondary: '#F472B6',
    background: '#FAF5FF',
    backgroundDark: '#140A1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(124, 58, 237, 0.3)',
    isDark: true,
  },
  'orangina': {
    primary: '#F97316',      // Orange Orangina
    secondary: '#FFFFFF',
    background: '#FFF7ED',
    backgroundDark: '#1A140A',
    text: '#FFFFFF',
    shadowColor: 'rgba(249, 115, 22, 0.3)',
    isDark: false,
  },
  'vimto': {
    primary: '#7C3AED',      // Violet Vimto
    secondary: '#EC4899',
    background: '#FAF5FF',
    backgroundDark: '#140A1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(124, 58, 237, 0.3)',
    isDark: true,
  },
  'world-cola': {
    primary: '#1C1917',      // Noir cola
    secondary: '#DC2626',
    background: '#F5F5F4',
    backgroundDark: '#0A0A0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(28, 25, 23, 0.4)',
    isDark: true,
  },
  'youzou': {
    primary: '#059669',      // Vert menthe
    secondary: '#FFC627',
    background: '#ECFDF5',
    backgroundDark: '#0A1A14',
    text: '#FFFFFF',
    shadowColor: 'rgba(5, 150, 105, 0.3)',
    isDark: true,
  },
  'top-soda': {
    primary: '#3B82F6',      // Bleu soda
    secondary: '#FFFFFF',
    background: '#EFF6FF',
    backgroundDark: '#0A0F1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(59, 130, 246, 0.3)',
    isDark: true,
  },
  'top-tonic': {
    primary: '#14B8A6',      // Teal tonic
    secondary: '#FCD34D',
    background: '#F0FDFA',
    backgroundDark: '#0A1A1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(20, 184, 166, 0.3)',
    isDark: true,
  },
  'xxl': {
    primary: '#DC2626',      // Rouge XXL
    secondary: '#1D1D1D',
    background: '#FEF2F2',
    backgroundDark: '#1A0A0A',
    text: '#FFFFFF',
    shadowColor: 'rgba(220, 38, 38, 0.3)',
    isDark: true,
  },

  // === EAUX ===
  'vitale': {
    primary: '#0EA5E9',      // Bleu eau
    secondary: '#FFFFFF',
    background: '#F0F9FF',
    backgroundDark: '#0A141A',
    text: '#FFFFFF',
    shadowColor: 'rgba(14, 165, 233, 0.3)',
    isDark: false,
  },
  'tangui': {
    primary: '#0284C7',      // Bleu Tangui
    secondary: '#22C55E',
    background: '#F0F9FF',
    backgroundDark: '#0A141A',
    text: '#FFFFFF',
    shadowColor: 'rgba(2, 132, 199, 0.3)',
    isDark: true,
  },
  'tangui-naturelle': {
    primary: '#0284C7',
    secondary: '#22C55E',
    background: '#F0F9FF',
    backgroundDark: '#0A141A',
    text: '#FFFFFF',
    shadowColor: 'rgba(2, 132, 199, 0.3)',
    isDark: true,
  },
  'tangui-citron': {
    primary: '#84CC16',      // Vert citron
    secondary: '#0284C7',
    background: '#F7FEE7',
    backgroundDark: '#141A0A',
    text: '#1D1D1D',
    shadowColor: 'rgba(132, 204, 22, 0.3)',
    isDark: false,
  },
  'aquabelle': {
    primary: '#06B6D4',      // Cyan
    secondary: '#FFFFFF',
    background: '#ECFEFF',
    backgroundDark: '#0A1A1A',
    text: '#FFFFFF',
    shadowColor: 'rgba(6, 182, 212, 0.3)',
    isDark: false,
  },
};

// Default theme for unknown brands
export const defaultBrandTheme: BrandTheme = {
  primary: '#1982C4',      // Steel Blue (from palette)
  secondary: '#FFC627',    // Yellow
  background: '#FDFDFF',
  backgroundDark: '#1D1D1D',
  text: '#FFFFFF',
  shadowColor: 'rgba(25, 130, 196, 0.3)',
  isDark: true,
};

/**
 * Get brand theme by brand ID or name
 */
export function getBrandTheme(brandIdOrName: string): BrandTheme {
  // Normalize the brand name/id
  const normalized = brandIdOrName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Direct match
  if (brandColors[normalized]) {
    return brandColors[normalized];
  }

  // Try partial matches
  for (const [key, theme] of Object.entries(brandColors)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return theme;
    }
  }

  // Special cases
  if (normalized.includes('33') || normalized.includes('export')) {
    return brandColors['33-export'];
  }
  if (normalized.includes('smirnoff')) {
    return brandColors['smirnoff-ice'];
  }
  if (normalized.includes('booster')) {
    return normalized.includes('gin')
      ? brandColors['booster-gin-tonic']
      : brandColors['booster-whisky-cola'];
  }
  if (normalized.includes('top-')) {
    return brandColors['top'];
  }

  return defaultBrandTheme;
}

/**
 * Get CSS variables for a brand theme
 */
export function getBrandCSSVars(theme: BrandTheme): Record<string, string> {
  return {
    '--brand-primary': theme.primary,
    '--brand-secondary': theme.secondary,
    '--brand-background': theme.background,
    '--brand-background-dark': theme.backgroundDark,
    '--brand-text': theme.text,
    '--brand-shadow': theme.shadowColor,
  };
}
